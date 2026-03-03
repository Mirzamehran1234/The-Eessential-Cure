import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Benefits", href: "#benefits" },
  { label: "Ingredients", href: "#ingredients" },
  { label: "Ratings", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-card py-3" : "py-5 bg-transparent"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
        <a href={isHome ? "#" : "/"} className="flex items-center gap-2">

          <span className="font-heading text-base sm:text-lg md:text-2xl font-bold tracking-wide text-foreground leading-none">
            The Essential Cure
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={isHome ? l.href : `/${l.href}`}
              className="text-sm font-body font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/cart"
            className="hidden lg:flex items-center gap-2 bg-gradient-gold text-card font-body text-sm font-semibold px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Shop Now
          </Link>
          <Link to="/cart" className="relative text-foreground hover:text-primary transition-colors ml-2">
            <ShoppingBag size={24} />
            <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">1</span>
          </Link>
        </div>

        {/* Mobile Toggle & Bag */}
        <div className="flex items-center gap-5 md:hidden">
          <Link to="/cart" className="relative text-foreground hover:text-primary transition-colors">
            <ShoppingBag size={24} />
            <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">1</span>
          </Link>
          <button
            className="text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card mx-4 mt-2 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={isHome ? l.href : `/${l.href}`}
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-foreground hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 bg-gradient-gold text-card font-body text-sm font-semibold px-6 py-2.5 rounded-full text-center hover:opacity-90 transition-opacity"
              >
                <ShoppingCart size={16} /> Shop Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
