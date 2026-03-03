import { MessageCircle, Heart } from "lucide-react";
// import { Instagram } from "lucide-react"; // Commented out — re-enable when Instagram (@theessentialcure) is ready

const Footer = () => (
  <footer className="bg-foreground py-16">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-12 mb-12">
        <div>
          <h3 className="font-heading text-2xl font-bold text-background mb-4">The Essential Cure</h3>
          <p className="font-body text-sm text-background/60 leading-relaxed">
            Premium natural hair oil crafted with love. Revive your hair naturally with the purest ingredients.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-lg font-bold text-background mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {["About", "Benefits", "Ingredients", "Testimonials", "FAQ", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="font-body text-sm text-background/60 hover:text-primary transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-heading text-lg font-bold text-background mb-4">Connect</h4>
          <div className="flex gap-3">
            {/* Instagram — Commented out, re-enable when Instagram (@theessentialcure) is ready
            <a
              href="https://www.instagram.com/theessentialcure"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} className="text-background" />
            </a>
            */}
            <a
              href="https://wa.me/923186393760"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} className="text-background" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-body text-xs text-background/40">
          © 2026 The Essential Cure. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="font-body text-xs text-background/40 hover:text-background/70 transition-colors">Privacy Policy</a>
          <a href="#" className="font-body text-xs text-background/40 hover:text-background/70 transition-colors">Terms of Service</a>
          <a href="#" className="font-body text-xs text-background/40 hover:text-background/70 transition-colors">Refund Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
