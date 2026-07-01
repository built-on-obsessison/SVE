import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Leaf, Phone, MessageCircle, Package } from 'lucide-react';
import OrdersDashboard from './OrdersDashboard';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Process', href: '#process' },
    { name: 'Reviews', href: '#testimonials' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3 md:py-4 glass-panel' : 'py-4 md:py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center w-full">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-10 rounded-lg bg-green-500 flex items-center justify-center font-bold text-white text-lg group-hover:scale-105 transition-transform">
              SVE
            </div>
            <div className="leading-tight">
              <span className="block font-display font-bold text-lg md:text-xl tracking-tight text-stone-50">
                Sree Vaishnavi
              </span>
              <span className="block text-[10px] md:text-xs opacity-60 uppercase tracking-widest text-stone-300">
                Eco Enterprises
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-stone-300 hover:text-stone-50 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOrdersOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-stone-50 hover:bg-white/10 transition-colors text-sm font-medium"
              >
                <Package size={16} />
                Orders
              </button>
              <a
                href="tel:+919949938277"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-stone-50 hover:bg-white/10 transition-colors text-sm font-medium"
              >
                <Phone size={16} />
                Call
              </a>
              <a
                href="https://wa.me/919949938277"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-[#041e15] hover:bg-green-400 transition-colors text-sm font-bold shadow-lg shadow-green-500/20"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle & Orders */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setOrdersOpen(true)}
              className="p-2 text-stone-50"
            >
              <Package size={24} />
            </button>
            <button
              className="p-2 text-stone-50"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-[#041e15]/95 backdrop-blur-xl flex flex-col px-4 sm:px-6 py-6 md:py-8"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-10 rounded-lg bg-green-500 flex items-center justify-center font-bold text-white text-lg">
                  SVE
                </div>
                <div className="leading-tight truncate">
                  <span className="block font-display font-bold text-base sm:text-lg md:text-xl tracking-tight text-stone-50 truncate">
                    Sree Vaishnavi
                  </span>
                  <span className="block text-[10px] md:text-xs opacity-60 uppercase tracking-widest text-stone-300">
                    Eco Enterprises
                  </span>
                </div>
              </div>
              <button
                className="p-2 text-stone-50 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col gap-6 text-2xl font-display font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-stone-50 hover:text-green-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-4 mt-4">
                <a
                  href="tel:+919949938277"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-white/20 text-stone-50 text-lg font-medium hover:bg-white/10 transition-colors"
                >
                  <Phone size={20} />
                  Call Us
                </a>
                <a
                  href="https://wa.me/919949938277"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-green-500 text-[#041e15] text-lg font-bold hover:bg-green-400 transition-colors"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <OrdersDashboard isOpen={ordersOpen} onClose={() => setOrdersOpen(false)} />
    </>
  );
}
