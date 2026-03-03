import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Send, MessageSquarePlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const defaultTestimonials = [
  { name: "Ahmed R.", text: "Yaar mujhe 3 hafte mein farq nazar aaya. Baal girna bohot kam hogya aur ab baal zyada ghane lagte hain. Best oil ever!", rating: 5 },
  { name: "Fatima K.", text: "Meine bohot oils try ki lekin yeh waqai mein kaam karti hai. Mere baal ab bohot silky aur chamakdaar hain. Allah ka shukar!", rating: 5 },
  { name: "Usman S.", text: "Main dandruff se bohot pareshan tha, is oil ne 2 hafte mein itna farq dikha diya. Ab scalp bilkul clean hai. Highly recommend!", rating: 5 },
  { name: "Ayesha M.", text: "Mere baal bohot toot rahe the. Is oil se naye baal aane shuru hogaye. Sach mein natural hai aur result bhi real hai!", rating: 5 },
  { name: "Bilal A.", text: "Bhaiyon, mein initially skeptical tha lekin yeh oil seriously kaam karti hai. Hairline pe naye baal aa rahe hain. Must try!", rating: 5 },
  { name: "Zainab H.", text: "Meri sab se favourite oil hai yeh. Balon mein lagao toh khushbu bhi achi aur baal silky smooth. Packing bhi premium hai!", rating: 5 },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [current, setCurrent] = useState(0);
  const [formName, setFormName] = useState("");
  const [formComment, setFormComment] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const next = useCallback(() => setCurrent((p) => (p + 1) % testimonials.length), [testimonials.length]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length), [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    const newReview = { name: formName, text: formComment, rating: formRating };
    setTestimonials((prev) => [...prev, newReview]);
    setCurrent(testimonials.length); // jump to the newly added review
    setFormName("");
    setFormComment("");
    setFormRating(5);
    setHoverRating(0);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="testimonials" className="py-24 bg-gradient-cream">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">Real Results</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Customer Ratings
          </h2>
        </AnimatedSection>

        {/* Existing Ratings Carousel */}
        <div className="max-w-2xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-10 text-center"
            >
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={20} className="text-primary fill-primary" />
                ))}
              </div>
              <p className="font-body text-lg text-foreground leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <p className="font-heading text-xl font-bold text-foreground">{t.name}</p>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-14 glass-card p-2.5 rounded-full hover:scale-110 transition-transform"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} className="text-foreground" />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-14 glass-card p-2.5 rounded-full hover:scale-110 transition-transform"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} className="text-foreground" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? "bg-primary w-8" : "bg-border"
                  }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Add Your Comment Section */}
        <AnimatedSection delay={0.2} className="mt-16 max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquarePlus size={24} className="text-primary" />
              <h3 className="font-heading text-xl font-bold text-foreground">Add Your Review</h3>
            </div>
            <p className="text-sm text-muted-foreground -mt-2">Apna tajurba share karein!</p>

            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="review-name" className="text-sm font-medium text-foreground">Your Name</label>
              <input
                id="review-name"
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Apna naam likhein"
                className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground/50"
              />
            </div>

            {/* Rating Stars */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-125 duration-200"
                  >
                    <Star
                      size={28}
                      className={`transition-colors duration-200 ${star <= (hoverRating || formRating)
                          ? "text-primary fill-primary"
                          : "text-border"
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="space-y-1.5">
              <label htmlFor="review-comment" className="text-sm font-medium text-foreground">Your Comment</label>
              <textarea
                id="review-comment"
                required
                value={formComment}
                onChange={(e) => setFormComment(e.target.value)}
                placeholder="Apna experience yahan likhein..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground/50 resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-gold text-card font-body font-semibold px-6 py-3.5 rounded-full flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-luxury transition-all duration-300"
            >
              <Send size={16} />
              {submitted ? "Shukriya! Review add hogaya ✓" : "Submit Review"}
            </button>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Testimonials;
