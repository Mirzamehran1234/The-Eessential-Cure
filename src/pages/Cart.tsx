import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2, User, Phone, MapPin, Home, ChevronRight, CheckCircle2, Package, XCircle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import heroProduct2 from "@/assets/hero-product-2.png";

type Order = {
    id: string;
    date: string;
    quantity: number;
    total: number;
    status: 'Processing' | 'Cancelled';
    customerInfo: {
        name: string;
        phone: string;
        city: string;
        address: string;
    };
    cancelReason?: string;
};

const Cart = () => {
    const [quantity, setQuantity] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const price = 1700;

    const [viewState, setViewState] = useState<'cart' | 'orders'>('cart');
    const [orders, setOrders] = useState<Order[]>([]);
    const [cancelReason, setCancelReason] = useState("");
    const [showCancelModal, setShowCancelModal] = useState<string | null>(null);
    const [lastOrder, setLastOrder] = useState<Order | null>(null);

    // Form state
    const [form, setForm] = useState({
        name: "",
        phone: "",
        city: "",
        address: "",
        notes: "",
    });

    useEffect(() => {
        const savedOrders = localStorage.getItem('myOrders');
        if (savedOrders) {
            try {
                setOrders(JSON.parse(savedOrders));
            } catch (e) {
                console.error("Failed to parse orders", e);
            }
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newOrder: Order = {
            id: `ORD-${Math.floor(1000000 + Math.random() * 9000000)}`,
            date: new Date().toISOString(),
            quantity,
            total: price * quantity,
            status: 'Processing',
            customerInfo: {
                name: form.name,
                phone: form.phone,
                city: form.city,
                address: form.address,
            }
        };

        const updatedOrders = [newOrder, ...orders];
        setOrders(updatedOrders);
        localStorage.setItem('myOrders', JSON.stringify(updatedOrders));

        setLastOrder(newOrder);
        setOrderPlaced(true);
        setIsEmpty(true);
    };

    const handleRemove = () => {
        setIsEmpty(true);
    };

    const handleCancelOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!showCancelModal || !cancelReason.trim()) return;

        const updatedOrders = orders.map(o =>
            o.id === showCancelModal ? { ...o, status: 'Cancelled' as const, cancelReason } : o
        );

        setOrders(updatedOrders);
        localStorage.setItem('myOrders', JSON.stringify(updatedOrders));
        setShowCancelModal(null);
        setCancelReason("");
    };

    // Render Orders View
    if (viewState === 'orders') {
        return (
            <div className="min-h-screen bg-gradient-cream pt-24 pb-12 font-body">
                <div className="container mx-auto px-6 max-w-4xl">
                    <AnimatedSection className="flex items-center justify-between mb-8">
                        <button
                            onClick={() => setViewState('cart')}
                            className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            <span>Back to Cart</span>
                        </button>
                        <h1 className="font-heading text-3xl font-bold flex items-center gap-3 text-foreground">
                            <Package size={28} className="text-primary" /> My Orders
                        </h1>
                    </AnimatedSection>

                    {orders.length === 0 ? (
                        <AnimatedSection className="glass-card rounded-3xl p-12 text-center shadow-luxury">
                            <Package size={48} className="text-primary/40 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold mb-2 text-foreground">No Orders Yet</h2>
                            <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
                            <button
                                onClick={() => setViewState('cart')}
                                className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-card font-semibold px-8 py-3.5 rounded-full shadow-luxury hover:scale-105 transition-all duration-300"
                            >
                                Start Shopping
                            </button>
                        </AnimatedSection>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={order.id}
                                    className="glass-card rounded-2xl p-6 shadow-sm border border-border"
                                >
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 border-b border-border pb-4">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-bold text-lg text-foreground">{order.id}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${order.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'}`}>
                                                    {order.status === 'Cancelled' ? <XCircle size={14} /> : <Clock size={14} />}
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">Placed on {new Date(order.date).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-left md:text-right">
                                            <p className="text-sm text-muted-foreground">Total Amount</p>
                                            <p className="font-bold text-lg text-primary">PKR {order.total}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="text-sm font-semibold text-foreground mb-2">Order Details</h4>
                                            <p className="text-sm text-muted-foreground">{order.quantity}x The Essential Cure Hair Oil</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-foreground mb-2">Delivery Details</h4>
                                            <p className="text-sm text-muted-foreground">{order.customerInfo.name}</p>
                                            <p className="text-sm text-muted-foreground">{order.customerInfo.phone}</p>
                                            <p className="text-sm text-muted-foreground">{order.customerInfo.address}, {order.customerInfo.city}</p>
                                        </div>
                                    </div>

                                    {order.status === 'Processing' && (
                                        <div className="mt-6 pt-4 border-t border-border flex justify-end">
                                            <button
                                                onClick={() => setShowCancelModal(order.id)}
                                                className="text-red-500 hover:text-red-600 text-sm font-semibold flex items-center gap-2 transition-colors border border-red-200 hover:bg-red-50 px-4 py-2 rounded-lg"
                                            >
                                                <XCircle size={16} /> Cancel Order
                                            </button>
                                        </div>
                                    )}

                                    {order.status === 'Cancelled' && order.cancelReason && (
                                        <div className="mt-4 p-3 bg-red-50/50 rounded-lg border border-red-100">
                                            <p className="text-sm text-red-600"><span className="font-semibold">Cancellation Reason:</span> {order.cancelReason}</p>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Cancel Modal */}
                    <AnimatePresence>
                        {showCancelModal && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="glass-card max-w-md w-full rounded-2xl p-6 shadow-luxury"
                                >
                                    <h3 className="text-xl font-bold text-foreground mb-2">Cancel Order</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Please provide a reason for cancelling order {showCancelModal}.</p>

                                    <form onSubmit={handleCancelOrder}>
                                        <textarea
                                            required
                                            value={cancelReason}
                                            onChange={(e) => setCancelReason(e.target.value)}
                                            placeholder="Reason for cancellation..."
                                            className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground resize-none mb-4"
                                            rows={3}
                                        />
                                        <div className="flex gap-3 justify-end">
                                            <button
                                                type="button"
                                                onClick={() => setShowCancelModal(null)}
                                                className="px-4 py-2 rounded-xl text-muted-foreground hover:bg-secondary/50 transition-colors font-medium text-sm"
                                            >
                                                Keep Order
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium text-sm hover:bg-red-600 transition-colors shadow-md"
                                            >
                                                Confirm Cancellation
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        );
    }

    // Order Placed — Success Screen
    if (orderPlaced && lastOrder) {
        return (
            <div className="min-h-screen bg-gradient-cream pt-24 pb-12 font-body flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card rounded-3xl p-10 max-w-md w-full mx-6 text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                        <CheckCircle2 size={72} className="text-green-500 mx-auto mb-6" />
                    </motion.div>
                    <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Order Placed!</h2>
                    <p className="text-sm text-amber-600 font-semibold mb-2">Order ID: {lastOrder.id}</p>
                    <p className="text-muted-foreground mb-2">Thank you, <strong className="text-foreground">{form.name}</strong>!</p>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                        Your order of <strong className="text-foreground">{quantity}x The Essential Cure Hair Oil</strong> has been received.
                        We'll contact you at <strong className="text-foreground">{form.phone}</strong> to confirm delivery.
                    </p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => {
                                setOrderPlaced(false);
                                setViewState('orders');
                            }}
                            className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-card font-body font-semibold px-8 py-3.5 rounded-full shadow-luxury hover:shadow-luxury-lg hover:scale-105 transition-all duration-300"
                        >
                            <Package size={20} /> View My Orders
                        </button>
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 text-muted-foreground font-body font-medium px-8 py-3.5 rounded-full hover:bg-secondary/50 transition-all duration-300"
                        >
                            Back to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (isEmpty) {
        return (
            <div className="min-h-screen bg-gradient-cream pt-24 pb-12 font-body flex flex-col items-center justify-center relative">
                <div className="absolute top-24 right-6 sm:top-28 sm:right-12">
                    <button
                        onClick={() => setViewState('orders')}
                        className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-border shadow-sm text-sm font-semibold hover:bg-white/80 transition-colors"
                    >
                        <Package size={16} className="text-primary" /> My Orders
                    </button>
                </div>

                <AnimatedSection className="text-center w-full px-6">
                    <div className="glass-card rounded-3xl p-12 max-w-md mx-auto shadow-luxury">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag size={48} className="text-primary/40" />
                        </div>
                        <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h2>
                        <p className="text-muted-foreground mb-8 leading-relaxed">
                            Aapne abhi tak koi item add nahi kiya. Hair growth start karne ke liye shop karein!
                        </p>
                        <button
                            onClick={() => setIsEmpty(false)}
                            className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-card font-body font-semibold px-8 py-4 rounded-full shadow-luxury hover:shadow-luxury-lg hover:scale-105 transition-all duration-300"
                        >
                            Add Test Item
                        </button>
                        <br /><br />
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 bg-secondary text-foreground font-body font-semibold px-8 py-4 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            Back Home
                        </Link>
                    </div>
                </AnimatedSection>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-cream pt-24 pb-12 font-body">
            <div className="container mx-auto px-6 max-w-4xl relative">
                {/* Header */}
                <AnimatedSection className="flex items-center justify-between mb-8">
                    <Link to="/" className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
                        <ArrowLeft size={20} />
                        <span>Continue Shopping</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setViewState('orders')}
                            className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-border shadow-sm text-sm font-semibold hover:bg-white/80 transition-colors focus:outline-none"
                        >
                            <Package size={16} className="text-primary" /> My Orders
                        </button>
                        <h1 className="font-heading text-3xl font-bold flex items-center gap-3 text-foreground hidden sm:flex">
                            <ShoppingBag size={28} className="text-primary" /> My Cart
                        </h1>
                    </div>
                </AnimatedSection>

                {/* Mobile Cart Title */}
                <h1 className="font-heading text-3xl font-bold flex items-center gap-3 text-foreground mb-6 sm:hidden">
                    <ShoppingBag size={28} className="text-primary" /> My Cart
                </h1>

                {/* Cart Content */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Items */}
                    <AnimatedSection delay={0.1} className="lg:col-span-2 space-y-4">
                        <div className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative">
                            {/* Product Image */}
                            <div className="w-44 h-52 sm:w-52 sm:h-60 bg-primary/5 rounded-2xl flex items-center justify-center p-3 shrink-0 overflow-hidden">
                                <img src={heroProduct2} alt="The Essential Cure Oil" className="w-full h-full object-cover rounded-xl" />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="font-heading text-xl font-bold text-foreground mb-1">The Essential Cure Hair Oil</h3>
                                <p className="text-sm text-muted-foreground mb-4"> • 100% Natural Ingredients</p>
                                <div className="flex items-center justify-center sm:justify-start gap-3 bg-secondary/30 w-fit rounded-full px-4 py-2 mx-auto sm:mx-0">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-foreground hover:text-primary transition-colors">
                                        <Minus size={16} />
                                    </button>
                                    <span className="font-semibold w-6 text-center">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="text-foreground hover:text-primary transition-colors">
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Price & Remove */}
                            <div className="flex flex-col items-center sm:items-end justify-between h-full gap-4">
                                <span className="font-bold text-xl text-foreground">PKR {price * quantity}</span>
                                <button
                                    onClick={handleRemove}
                                    className="text-red-400 hover:text-red-500 transition-colors p-2 glass-card rounded-full"
                                    aria-label="Remove item"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Customer Information Form — appears after clicking Proceed */}
                        <AnimatePresence>
                            {showForm && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="overflow-hidden"
                                >
                                    <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-5">
                                        <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
                                            <User size={22} className="text-primary" />
                                            Customer Information
                                        </h2>
                                        <p className="text-sm text-muted-foreground -mt-2">Fill in your details to place the order. Cash on delivery.</p>

                                        {/* Name */}
                                        <div className="space-y-1.5">
                                            <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-1.5">
                                                <User size={14} className="text-primary" /> Full Name
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder="Enter your full name"
                                                className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground/50"
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-1.5">
                                            <label htmlFor="phone" className="text-sm font-medium text-foreground flex items-center gap-1.5">
                                                <Phone size={14} className="text-primary" /> Phone Number
                                            </label>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                required
                                                value={form.phone}
                                                onChange={handleChange}
                                                placeholder="03XX-XXXXXXX"
                                                className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground/50"
                                            />
                                        </div>

                                        {/* City */}
                                        <div className="space-y-1.5">
                                            <label htmlFor="city" className="text-sm font-medium text-foreground flex items-center gap-1.5">
                                                <MapPin size={14} className="text-primary" /> City
                                            </label>
                                            <input
                                                id="city"
                                                name="city"
                                                type="text"
                                                required
                                                value={form.city}
                                                onChange={handleChange}
                                                placeholder="e.g. Lahore, Karachi, Islamabad"
                                                className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground/50"
                                            />
                                        </div>

                                        {/* Full Address */}
                                        <div className="space-y-1.5">
                                            <label htmlFor="address" className="text-sm font-medium text-foreground flex items-center gap-1.5">
                                                <Home size={14} className="text-primary" /> Full Address
                                            </label>
                                            <textarea
                                                id="address"
                                                name="address"
                                                required
                                                value={form.address}
                                                onChange={handleChange}
                                                placeholder="House #, Street, Area"
                                                rows={3}
                                                className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground/50 resize-none"
                                            />
                                        </div>

                                        {/* Special Notes (Optional) */}
                                        <div className="space-y-1.5">
                                            <label htmlFor="notes" className="text-sm font-medium text-foreground">
                                                Special Notes <span className="text-muted-foreground">(optional)</span>
                                            </label>
                                            <input
                                                id="notes"
                                                name="notes"
                                                type="text"
                                                value={form.notes}
                                                onChange={handleChange}
                                                placeholder="Any special instructions for delivery"
                                                className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground/50"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="w-full bg-gradient-gold text-card font-body font-semibold px-6 py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-luxury transition-all duration-300 mt-2"
                                        >
                                            <CheckCircle2 size={20} />
                                            Place Order — PKR {price * quantity}
                                        </button>

                                        <p className="text-xs text-center text-muted-foreground">
                                            💳 Cash on Delivery • 🚚 Free Shipping across Pakistan
                                        </p>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </AnimatedSection>

                    {/* Summary Sidebar */}
                    <AnimatedSection delay={0.2} className="lg:col-span-1">
                        <div className="glass-card rounded-2xl p-6 sticky top-24">
                            <h2 className="font-heading text-xl font-bold mb-6 text-foreground border-b border-border pb-4">Order Summary</h2>

                            <div className="space-y-4 font-body text-sm mb-6">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span className="text-foreground">PKR {price * quantity}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="h-px bg-border my-4" />
                                <div className="flex justify-between font-bold text-lg text-foreground">
                                    <span>Total</span>
                                    <span className="text-primary">PKR {price * quantity}</span>
                                </div>
                            </div>

                            {!showForm ? (
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="w-full bg-gradient-gold text-card font-body font-semibold px-6 py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-luxury transition-all duration-300"
                                >
                                    Proceed <ChevronRight size={18} />
                                </button>
                            ) : (
                                <div className="text-center text-sm text-primary font-medium flex items-center justify-center gap-2">
                                    <CheckCircle2 size={16} />
                                    Fill the form below to place order
                                </div>
                            )}

                            <p className="text-xs text-center text-muted-foreground mt-4 leading-relaxed">
                                Glow begins with this bottle. Thank you!
                            </p>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
};

export default Cart;

