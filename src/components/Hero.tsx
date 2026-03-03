import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Leaf, Users, Droplets } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Product Images
import heroProduct1 from "@/assets/hero-product.png";
import heroProduct2 from "@/assets/hero-product-2.png";
import heroProduct3 from "@/assets/hero-product-3.png";

const productImages = [heroProduct1, heroProduct2, heroProduct3];

// Text slides — only the text changes, images stay on the right cycling independently
const textSlides = [
  {
    id: 1,
    subtitle: "The Essential Cure",
    title: (
      <>
        Revive Your Hair{" "}
        <span className="text-gradient-gold italic">Naturally</span>
      </>
    ),
    desc: "100% Natural Formula for Stronger, Healthier, Shinier Hair — crafted with love from nature's finest ingredients.",
    showStats: false,
  },
  {
    id: 2,
    subtitle: "Our Story",
    title: (
      <>
        Nature's Remedy <span className="text-gradient-gold italic">for Your Hair</span>
      </>
    ),
    desc: "Born from a deep-rooted belief in the power of nature, The Essential Cure blends ancient Ayurvedic wisdom with modern science. Every drop is infused with handpicked botanical extracts — perfect for both men and women.",
    showStats: true,
  },
  {
    id: 3,
    subtitle: "Pure & Organic",
    title: (
      <>
        Premium <span className="text-gradient-gold italic">Hair Growth</span> Oil
      </>
    ),
    desc: "Contains natural DHT blockers, strengthens roots, reduces thinning, and nourishes your scalp with 15+ powerful botanical ingredients.",
    showStats: false,
  },
];

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [currentImg, setCurrentImg] = useState(0);

  // Text slide transitions
  const nextText = useCallback(() => setCurrentText((p) => (p + 1) % textSlides.length), []);

  // Product image transitions
  const nextImg = useCallback(() => setCurrentImg((p) => (p + 1) % productImages.length), []);
  const prevImg = useCallback(() => setCurrentImg((p) => (p - 1 + productImages.length) % productImages.length), []);

  // Auto-cycle text every 6 seconds
  useEffect(() => {
    const timer = setInterval(nextText, 6000);
    return () => clearInterval(timer);
  }, [nextText]);

  // Auto-cycle product images every 4 seconds (offset timing so they feel coordinated but independent)
  useEffect(() => {
    const timer = setInterval(nextImg, 4000);
    return () => clearInterval(timer);
  }, [nextImg]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-cream pt-20">

      {/* Main Layout — always visible, unified feel */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-24 grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center w-full">

        {/* ========== TEXT SIDE — transitions independently ========== */}
        <div className="text-center lg:text-left z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="font-body text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
                {textSlides[currentText].subtitle}
              </p>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-foreground mb-4 sm:mb-6">
                {textSlides[currentText].title}
              </h1>
              <p className="font-body text-base sm:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed">
                {textSlides[currentText].desc}
              </p>

              {/* Stats row (only on "Our Story" slide) */}
              {textSlides[currentText].showStats && (
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Leaf className="text-green-600" size={20} />
                    <span className="font-body font-semibold text-foreground">100% Natural</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="text-blue-600" size={20} />
                    <span className="font-body font-semibold text-foreground">10K+ Happy Customers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="text-yellow-600" size={20} />
                    <span className="font-body font-semibold text-foreground">15+ Ingredients</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* CTA Buttons — always visible, don't transition */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/cart"
              className="flex items-center justify-center gap-2 bg-gradient-gold text-card font-body font-semibold px-8 py-3.5 rounded-full shadow-luxury hover:shadow-luxury-lg hover:scale-105 transition-all duration-300"
            >
              <ShoppingCart size={18} /> Shop Now
            </Link>
            <a
              href="#ingredients"
              className="border-2 border-primary text-foreground font-body font-semibold px-8 py-3.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex justify-center items-center"
            >
              View Ingredients
            </a>
          </div>

          {/* Text Slide Indicators */}
          <div className="flex gap-2 mt-8 justify-center lg:justify-start">
            {textSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentText(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === currentText ? "bg-primary w-8" : "bg-primary/25 w-4 hover:bg-primary/40"
                  }`}
                aria-label={`Go to text slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ========== IMAGE SIDE — product images transition independently ========== */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-56 h-56 sm:w-[22rem] sm:h-[22rem] md:w-[26rem] md:h-[26rem] lg:w-[30rem] lg:h-[30rem] group mx-auto">

            {/* Background Glow */}
            <div className="absolute inset-0 rounded-[2rem]" style={{
              background: "radial-gradient(ellipse at center, hsl(32 46% 67% / 0.15), hsl(42 80% 94% / 0.05) 70%, transparent 100%)",
              filter: "blur(60px)",
              transform: "scale(1.2)"
            }} />

            {/* Product Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImg}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 100) prevImg();
                  else if (info.offset.x < -100) nextImg();
                }}
                className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center touch-none rounded-[2rem] overflow-hidden"
              >
                <img
                  src={productImages[currentImg]}
                  alt="The Essential Cure Hair Oil"
                  draggable={false}
                  className="w-full h-full object-cover rounded-[2rem] select-none transition-all duration-500"
                  style={{
                    maskImage: "radial-gradient(ellipse 85% 85% at center, black 50%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.2) 85%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 85% 85% at center, black 50%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.2) 85%, transparent 100%)"
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Drag Indicators (Arrows) — visible on hover */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-0 sm:px-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.div
                animate={{ x: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="bg-white/50 backdrop-blur-md p-2.5 rounded-full border border-white/30 shadow-lg"
              >
                <ChevronLeft size={18} className="text-primary" />
              </motion.div>
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="bg-white/50 backdrop-blur-md p-2.5 rounded-full border border-white/30 shadow-lg"
              >
                <ChevronRight size={18} className="text-primary" />
              </motion.div>
            </div>

            {/* Drag Help Text */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.3em] text-primary/60 uppercase pointer-events-none opacity-70">
              ← Drag to Explore →
            </div>

            {/* Product Image Dots */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
              {productImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImg(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentImg ? "bg-primary w-8 shadow-md" : "bg-primary/20 hover:bg-primary/40"
                    }`}
                  aria-label={`Go to product image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 bottom-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
    </section>
  );
};

export default Hero;
