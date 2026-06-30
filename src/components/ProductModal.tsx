import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, MessageCircle, Check, Mail, Droplet, Layers, Tag, Briefcase } from 'lucide-react';

const productSizes = ['Default', '9×12', '10×14', '12×16', '12×18', '13×18', '14×18', '16×20', 'Customized Sizes Available'];
const productColours = [
  { name: 'White', bg: 'bg-white', border: 'border-gray-200' },
  { name: 'Green', bg: 'bg-green-500', border: 'border-green-600' },
  { name: 'Blue', bg: 'bg-blue-500', border: 'border-blue-600' },
  { name: 'Red', bg: 'bg-red-500', border: 'border-red-600' },
  { name: 'Yellow', bg: 'bg-yellow-400', border: 'border-yellow-500' },
  { name: 'Pink', bg: 'bg-pink-500', border: 'border-pink-600' },
  { name: 'Orange', bg: 'bg-orange-500', border: 'border-orange-600' },
  { name: 'Black', bg: 'bg-black', border: 'border-gray-800' },
  { name: 'Grey', bg: 'bg-gray-500', border: 'border-gray-600' },
  { name: 'Custom Colours Available', bg: 'bg-gradient-to-br from-purple-500 via-pink-500 to-red-500', border: 'border-transparent' },
];

const printingOptions = [
  'Plain Bags', 'Single Side Printing', 'Double Side Printing', 
  'Multi Colour Printing', 'Screen Printing', 'Custom Logo Printing'
];

const gsmOptions = [
  '60 GSM', '70 GSM', '80 GSM', '90 GSM', '100 GSM', '110 GSM', '120 GSM', 'Customized GSM'
];

const featuresList = [
  'Eco-Friendly', 'Reusable', 'Waterproof', 'Lightweight', 'High Strength', 'Durable', 'Custom Branding', 'Wholesale Supply'
];

const applications = [
  'Grocery Stores', 'Garment Shops', 'Medical Stores', 'Jewellery Shops', 'Supermarkets', 'Gift Shops', 'Sweet Shops', 'Promotional Events'
];

const images = [
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1584852959828-09559cb315c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

export default function ProductModal({ isOpen, onClose, product }: { isOpen: boolean; onClose: () => void; product: any }) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center pointer-events-none">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full h-[90vh] md:h-auto md:max-h-[90vh] md:max-w-6xl bg-[#041e15] md:rounded-[2rem] rounded-t-[2rem] overflow-hidden flex flex-col pointer-events-auto border border-white/10 shadow-2xl"
        >
          {/* Header */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors border border-white/10"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
            <div className="grid lg:grid-cols-2 gap-0">
              
              {/* Left Column: Gallery & Sticky Content */}
              <div className="bg-[#03150e] p-6 md:p-10 border-r border-white/5 relative">
                <div className="lg:sticky lg:top-0 space-y-6">
                  {/* Hero Image */}
                  <div className="aspect-[4/3] md:aspect-square w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 relative">
                    <img 
                      src={images[activeImage]} 
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  
                  {/* Thumbnails */}
                  <div className="grid grid-cols-4 gap-3">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-green-500 scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                      >
                        <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>

                  {/* Actions - Desktop */}
                  <div className="hidden lg:flex flex-col gap-3 mt-8">
                    <button onClick={() => document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary w-full justify-center py-4 text-lg">
                      Request Quote
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <a href="tel:+918897564055" className="btn-secondary justify-center gap-2">
                        <Phone size={18} /> Call Now
                      </a>
                      <a href="https://wa.me/918897564055" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-green-500 text-[#041e15] font-bold hover:bg-green-400 transition-colors">
                        <MessageCircle size={18} /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="p-6 md:p-10 space-y-10 text-stone-300">
                
                {/* Title & Short Desc */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{product.title}</h2>
                  <p className="text-lg opacity-80">Premium eco-friendly {product.title.toLowerCase()} perfect for everyday retail and packaging needs. Durable, reusable, and customizable to your brand.</p>
                </div>

                {/* Pricing Box */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-green-400">
                    <Tag size={24} />
                    <span className="text-xl font-bold">Contact us for today's wholesale price.</span>
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-2 mt-2">
                    <li className="flex items-center gap-2 text-sm"><Check size={16} className="text-green-500" /> Bulk Orders Available</li>
                    <li className="flex items-center gap-2 text-sm"><Check size={16} className="text-green-500" /> Factory Direct Pricing</li>
                    <li className="flex items-center gap-2 text-sm"><Check size={16} className="text-green-500" /> Minimum Order Quantity Applies</li>
                  </ul>
                </div>

                {/* Sizes */}
                <div>
                  <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                    <Layers size={20} className="text-green-500" /> Available Sizes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {productSizes.map(size => (
                      <span key={size} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors cursor-default">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Colours */}
                <div>
                  <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                    <Droplet size={20} className="text-green-500" /> Available Colours
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {productColours.map(color => (
                      <div key={color.name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 cursor-default hover:bg-white/10 transition-colors">
                        <span className={`w-4 h-4 rounded-full border ${color.bg} ${color.border}`} />
                        <span className="text-sm font-medium">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grid for Features, Printing, GSM, Applications */}
                <div className="grid sm:grid-cols-2 gap-8">
                  {/* Printing Options */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Printing Options</h3>
                    <ul className="space-y-2">
                      {printingOptions.map(opt => (
                        <li key={opt} className="flex items-start gap-2 text-sm">
                          <Check size={16} className="text-green-400 shrink-0 mt-0.5" />
                          <span>{opt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* GSM Options */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">GSM Options</h3>
                    <ul className="space-y-2">
                      {gsmOptions.map(opt => (
                        <li key={opt} className="flex items-start gap-2 text-sm">
                          <Check size={16} className="text-green-400 shrink-0 mt-0.5" />
                          <span>{opt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Product Features</h3>
                    <ul className="space-y-2">
                      {featuresList.map(opt => (
                        <li key={opt} className="flex items-start gap-2 text-sm">
                          <Check size={16} className="text-green-400 shrink-0 mt-0.5" />
                          <span>{opt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Applications */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Suitable For</h3>
                    <ul className="space-y-2">
                      {applications.map(opt => (
                        <li key={opt} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 mt-1.5" />
                          <span>{opt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-white/10 my-8" />

                {/* Inquiry Form Section */}
                <div id="inquiry" className="pt-4 pb-24 lg:pb-8">
                  <h3 className="text-2xl font-display font-bold text-white mb-6">Send an Inquiry</h3>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-stone-50 focus:outline-none focus:border-green-500 transition-colors" />
                      <input type="tel" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-stone-50 focus:outline-none focus:border-green-500 transition-colors" />
                    </div>
                    <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-stone-50 focus:outline-none focus:border-green-500 transition-colors" />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input type="text" placeholder="Required Quantity" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-stone-50 focus:outline-none focus:border-green-500 transition-colors" />
                      <input type="text" placeholder="Preferred Size" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-stone-50 focus:outline-none focus:border-green-500 transition-colors" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input type="text" placeholder="Preferred Colour" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-stone-50 focus:outline-none focus:border-green-500 transition-colors" />
                      <input type="text" placeholder="Printing Requirement" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-stone-50 focus:outline-none focus:border-green-500 transition-colors" />
                    </div>
                    <textarea placeholder="Additional Notes" rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-stone-50 focus:outline-none focus:border-green-500 transition-colors resize-none" />
                    
                    <div className="grid sm:grid-cols-2 gap-4 pt-4">
                      <button type="submit" className="btn-primary justify-center w-full">
                        <Mail size={18} /> Request Quote
                      </button>
                      <a href="https://wa.me/918897564055" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-green-500 text-[#041e15] font-bold hover:bg-green-400 transition-colors">
                        <MessageCircle size={18} /> WhatsApp Us
                      </a>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
          
          {/* Mobile Floating Action Bar */}
          <div className="lg:hidden absolute bottom-0 left-0 right-0 p-4 bg-[#03150e]/90 backdrop-blur-xl border-t border-white/10 z-20">
            <div className="flex gap-2">
              <button onClick={() => document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary flex-1 justify-center py-3 text-sm">
                Request Quote
              </button>
              <a href="tel:+918897564055" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white shrink-0 hover:bg-white/10 transition-colors">
                <Phone size={18} />
              </a>
              <a href="https://wa.me/918897564055" className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-[#041e15] shrink-0 hover:bg-green-400 transition-colors">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
