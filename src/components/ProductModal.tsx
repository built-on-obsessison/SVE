import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, MessageCircle, Check, Mail, Droplet, Layers, Tag, FileDown, AlertCircle, Plus, Trash2 } from 'lucide-react';
import type { OrderItem } from './Services';

const productSizes = ['9×12', '10×14', '12×16', '12×18', '13×18', '14×18', '16×20', 'Customized Size'];
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
];

const printingOptions = [
  'Plain', 'Single Side Printing', 'Double Side Printing', 'Multi Colour Printing'
];

const gsmOptions = [
  '60 GSM', '70 GSM'
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

export default function ProductModal({ 
  isOpen, 
  onClose, 
  product,
  orderItems,
  setOrderItems
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  product: any;
  orderItems: OrderItem[];
  setOrderItems: (items: OrderItem[]) => void;
}) {
  const [activeImage, setActiveImage] = useState(0);
  
  // Quotation State
  const [selectedSize, setSelectedSize] = useState('');
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [selectedColour, setSelectedColour] = useState('');
  const [selectedPrinting, setSelectedPrinting] = useState('');
  const [selectedGSM, setSelectedGSM] = useState('');
  const [quantity, setQuantity] = useState('');

  // Order Details State
  const [printingNotes, setPrintingNotes] = useState('');
  const [printingFiles, setPrintingFiles] = useState<File[]>([]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSelectedSize('');
      setCustomWidth('');
      setCustomHeight('');
      setSelectedColour('');
      setSelectedPrinting('');
      setSelectedGSM('');
      setQuantity('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const minOrder = selectedSize === 'Customized Size' ? 50 : (selectedColour === 'White' ? 10 : 50);
  const isQtyValid = quantity && !isNaN(Number(quantity)) && Number(quantity) >= minOrder;
  const qtyNumber = Number(quantity);

  const calculateSlabs = () => {
    if (!selectedSize || !selectedColour || !selectedPrinting || !selectedGSM) return null;
    
    // Default base slabs depending on colour
    let slabsStr = selectedColour === 'White' 
      ? '10-29:85, 30-49:80, 50-74:75, 75-99:70, 100+:65' 
      : '50-74:80, 75-99:75, 100+:70';

    // Check Admin Rules
    try {
      const savedRules = localStorage.getItem('sve_pricing_rules_v2');
      if (savedRules) {
        const rules = JSON.parse(savedRules);
        // Find best match (most specific first)
        const match = rules.find((r: any) => 
          (r.product === 'Any' || r.product === product.title) &&
          (r.size === 'Any' || r.size === selectedSize) &&
          (r.colour === 'Any' || r.colour === selectedColour) &&
          (r.gsm === 'Any' || r.gsm === selectedGSM) &&
          (r.printing === 'Any' || r.printing === selectedPrinting)
        );
        if (match && match.slabs) {
          slabsStr = match.slabs;
        }
      }
    } catch (e) {
      console.error(e);
    }

    return slabsStr;
  };

  const getPriceForQty = (slabsStr: string, qty: number) => {
    if (!qty || isNaN(qty)) return null;
    const parts = slabsStr.split(',').map(s => s.trim());
    let applicablePrice = null;
    for (const p of parts) {
      if (!p.includes(':')) continue;
      const [range, priceStr] = p.split(':');
      const price = Number(priceStr);
      if (range.includes('+')) {
        const min = Number(range.replace('+', ''));
        if (qty >= min) applicablePrice = price;
      } else {
        const [min, max] = range.split('-').map(Number);
        if (qty >= min && qty <= max) applicablePrice = price;
      }
    }
    return applicablePrice;
  };

  const slabsStr = calculateSlabs();
  const pricePerKg = slabsStr ? getPriceForQty(slabsStr, qtyNumber) : null;
  const totalPrice = pricePerKg && qtyNumber ? pricePerKg * qtyNumber : null;

  const handleAddToOrder = () => {
    if (!pricePerKg || !totalPrice || !isQtyValid) return;
    const newItem: OrderItem = {
      id: Date.now().toString(),
      productTitle: product.title,
      size: selectedSize === 'Customized Size' ? `Custom (${customWidth}" x ${customHeight}")` : selectedSize,
      colour: selectedColour,
      gsm: selectedGSM,
      printing: selectedPrinting,
      quantity: qtyNumber,
      price: pricePerKg,
    };
    setOrderItems([...orderItems, newItem]);
    
    setSelectedSize('');
    setCustomWidth('');
    setCustomHeight('');
    setSelectedColour('');
    setSelectedPrinting('');
    setSelectedGSM('');
    setQuantity('');
  };

  const handleDeleteItem = (id: string) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const generateWhatsAppMessage = () => {
    let msg = `Hello,\n\nI would like to request a quotation for the following order:\n\n`;
    orderItems.forEach((item, index) => {
      msg += `${index + 1}. ${item.productTitle} - ${item.size}\n   Colour: ${item.colour} | GSM: ${item.gsm} | Printing: ${item.printing}\n   Qty: ${item.quantity} KG @ ₹${item.price}/KG\n   Subtotal: ₹${item.quantity * item.price}\n\n`;
    });
    const grandTotal = orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    msg += `Estimated Grand Total: ₹${grandTotal}\n\n`;
    
    if (printingNotes.trim()) {
      msg += `*Printing Details/Notes:*\n${printingNotes}\n\n`;
    }
    
    if (printingFiles.length > 0) {
      msg += `*(I have ${printingFiles.length} reference picture(s) to share for printing)*\n\n`;
    }

    msg += `Please contact me.`;
    return encodeURIComponent(msg);
  };

  const handleDownloadPdf = () => {
    alert('Quotation generated successfully. In production, this will trigger a PDF download.');
    window.print();
  };

  const handleEmailQuote = () => {
    const sizeText = selectedSize === 'Customized Size' ? `Custom (${customWidth}" x ${customHeight}")` : selectedSize;
    const msg = `Product: ${product.title}\nSize: ${sizeText}\nColour: ${selectedColour}\nPrinting: ${selectedPrinting}\nGSM: ${selectedGSM}\nQuantity: ${quantity} KG\nEstimated Cost: ₹${totalPrice}`;
    window.location.href = `mailto:sreevaishnaviecoenterprises@gmail.com?subject=Quotation Request: ${product.title}&body=${encodeURIComponent(msg)}`;
  };

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
            <div className="grid lg:grid-cols-2 gap-0 w-full max-w-full">
              
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
                      Build Quotation
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <a href="tel:+919949938277" className="btn-secondary justify-center gap-2">
                        <Phone size={18} /> Call Now
                      </a>
                      <a href="https://wa.me/919949938277" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-green-500 text-[#041e15] font-bold hover:bg-green-400 transition-colors">
                        <MessageCircle size={18} /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Details & Quotation Builder */}
              <div className="p-6 md:p-10 space-y-10 text-stone-300 min-w-0">
                
                {/* Title & Short Desc */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{product.title}</h2>
                  <p className="text-lg opacity-80">Premium eco-friendly {product.title.toLowerCase()} perfect for everyday retail and packaging needs. Durable, reusable, and customizable to your brand.</p>
                </div>

                {/* Quotation Builder Header */}
                <div id="inquiry" className="pt-4">
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Build Your Quote</h3>
                  <p className="text-sm opacity-80 mb-6">Select your exact requirements to calculate a live wholesale quotation.</p>
                  
                  {/* Sizes Selection */}
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-stone-50 mb-3 flex items-center gap-2 uppercase tracking-wider opacity-80">
                      <Layers size={16} className="text-green-500" /> 1. Select Size
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {productSizes.map(size => (
                        <button 
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${selectedSize === size ? 'bg-green-500 border-green-500 text-[#041e15] shadow-lg shadow-green-500/20' : 'bg-white/5 border-white/10 hover:bg-white/10 text-stone-300'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    {selectedSize === 'Customized Size' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-xs text-stone-400 mb-3"><AlertCircle size={14} className="inline mr-1 text-green-400"/> Customized sizes are available. Minimum order quantity applies.</p>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <label className="text-xs block mb-1">Width (inches)</label>
                            <input type="number" value={customWidth} onChange={(e) => setCustomWidth(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500" placeholder="e.g. 15" />
                          </div>
                          <div className="flex-1">
                            <label className="text-xs block mb-1">Height (inches)</label>
                            <input type="number" value={customHeight} onChange={(e) => setCustomHeight(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500" placeholder="e.g. 20" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Colour Selection */}
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-stone-50 mb-3 flex items-center gap-2 uppercase tracking-wider opacity-80">
                      <Droplet size={16} className="text-green-500" /> 2. Select Colour
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {productColours.map(color => (
                        <button 
                          key={color.name}
                          onClick={() => setSelectedColour(color.name)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${selectedColour === color.name ? 'bg-white/20 border-green-500 shadow-lg shadow-white/5 text-white' : 'bg-white/5 border-white/10 hover:bg-white/10 text-stone-300'}`}
                        >
                          <span className={`w-4 h-4 rounded-full border ${color.bg} ${color.border}`} />
                          <span className="text-sm font-medium">{color.name}</span>
                        </button>
                      ))}
                    </div>
                    {selectedColour && (
                      <p className="text-xs text-stone-400 mt-3 flex items-start gap-1.5">
                        <AlertCircle size={14} className="text-green-400 shrink-0 mt-0.5"/>
                        {selectedSize === 'Customized Size' 
                          ? 'Customized sizes require a minimum order of 50 KG for any colour.'
                          : 'White bags can be ordered from 10 KG. All coloured bags require a minimum order of 50 KG.'}
                      </p>
                    )}
                  </div>

                  {/* Printing Selection */}
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-stone-50 mb-3 flex items-center gap-2 uppercase tracking-wider opacity-80">
                      <Tag size={16} className="text-green-500" /> 3. Select Printing
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {printingOptions.map(opt => (
                        <button 
                          key={opt}
                          onClick={() => setSelectedPrinting(opt)}
                          className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left ${selectedPrinting === opt ? 'bg-green-500 border-green-500 text-[#041e15] shadow-lg shadow-green-500/20' : 'bg-white/5 border-white/10 hover:bg-white/10 text-stone-300'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* GSM Selection */}
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-stone-50 mb-3 flex items-center gap-2 uppercase tracking-wider opacity-80">
                      <Layers size={16} className="text-green-500" /> 4. Select GSM
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {gsmOptions.map(opt => (
                        <button 
                          key={opt}
                          onClick={() => setSelectedGSM(opt)}
                          className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${selectedGSM === opt ? 'bg-green-500 border-green-500 text-[#041e15] shadow-lg shadow-green-500/20' : 'bg-white/5 border-white/10 hover:bg-white/10 text-stone-300'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Input */}
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-stone-50 mb-3 flex items-center gap-2 uppercase tracking-wider opacity-80">
                      <Tag size={16} className="text-green-500" /> 5. Required Quantity (KG)
                    </h4>
                    
                    {slabsStr && (
                      <div className="mb-4">
                        <p className="text-xs text-stone-400 mb-2">Available Price Slabs for this configuration:</p>
                        <div className="flex flex-wrap gap-2">
                          {slabsStr.split(',').map((p, idx) => {
                            if (!p.includes(':')) return null;
                            const [range, price] = p.split(':');
                            let isActive = false;
                            if (qtyNumber) {
                              if (range.includes('+')) {
                                const min = Number(range.replace('+',''));
                                if (qtyNumber >= min) isActive = true;
                              } else {
                                const [min, max] = range.split('-').map(Number);
                                if (qtyNumber >= min && qtyNumber <= max) isActive = true;
                              }
                            }
                            return (
                              <div key={idx} className={`px-3 py-2 rounded-lg border text-sm transition-all ${isActive ? 'bg-green-500/20 border-green-500 text-green-400 font-bold' : 'bg-white/5 border-white/10 text-stone-300'}`}>
                                <span className="opacity-80 mr-2">{range.trim()} KG:</span>
                                <span>₹{price.trim()}/KG</span>
                              </div>
                            );
                          })}
                        </div>
                        <p className="text-xs text-stone-400 mt-3 italic">Number of bags per KG are around 40 to 50.</p>
                      </div>
                    )}
                    
                    <input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g. 50"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-stone-50 focus:outline-none focus:border-green-500 transition-colors text-lg" 
                    />
                    {quantity && !isNaN(Number(quantity)) && Number(quantity) < minOrder && selectedColour && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-1.5">
                        <AlertCircle size={16} />
                        Minimum order for {selectedSize === 'Customized Size' ? 'customized' : (selectedColour === 'White' ? 'White' : 'coloured')} bags is {minOrder} KG.
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-8">
                    <button 
                      onClick={handleAddToOrder}
                      disabled={!isQtyValid || !pricePerKg}
                      className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-colors ${isQtyValid && pricePerKg ? 'bg-green-500 hover:bg-green-400 text-[#041e15] shadow-lg shadow-green-500/20' : 'bg-white/10 text-stone-500 cursor-not-allowed'}`}
                    >
                      <Plus size={20} /> Add to Order {totalPrice ? `(₹${totalPrice.toLocaleString()})` : ''}
                    </button>
                  </div>
                </div>

                {/* Professional Order Table */}
                {orderItems.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl overflow-hidden mt-8 w-full max-w-full box-border">
                    <h3 className="text-2xl font-display font-bold text-white mb-6">Current Order</h3>
                    
                    <div className="overflow-x-auto overflow-y-hidden w-full max-w-full">
                      <table className="w-full text-left min-w-[700px]">
                        <thead>
                          <tr className="border-b border-white/10 text-stone-400 text-sm">
                            <th className="pb-4 font-medium">Product</th>
                            <th className="pb-4 font-medium">Specs</th>
                            <th className="pb-4 font-medium text-right">Price</th>
                            <th className="pb-4 font-medium text-right">Qty</th>
                            <th className="pb-4 font-medium text-right">Units (est.)</th>
                            <th className="pb-4 font-medium text-right">Total</th>
                            <th className="pb-4 font-medium w-12"></th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {orderItems.map((item) => (
                            <tr key={item.id} className="border-b border-white/5">
                              <td className="py-4 text-white font-medium">{item.productTitle}</td>
                              <td className="py-4 text-stone-300">
                                {item.size}, {item.colour}<br/>
                                <span className="text-xs opacity-70">{item.gsm} • {item.printing}</span>
                              </td>
                              <td className="py-4 text-right text-stone-300">₹{item.price}/KG</td>
                              <td className="py-4 text-right text-stone-300">{item.quantity} KG</td>
                              <td className="py-4 text-right text-stone-300">~{item.quantity * 40} - {item.quantity * 50} bags</td>
                              <td className="py-4 text-right text-white font-medium">₹{(item.quantity * item.price).toLocaleString()}</td>
                              <td className="py-4 text-right">
                                <button onClick={() => handleDeleteItem(item.id)} className="text-stone-500 hover:text-red-400 transition-colors p-2">
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-6 border-t border-white/10 pt-6 flex flex-wrap justify-between items-end gap-4">
                      <div>
                        <p className="text-stone-400 text-sm">Total Items: {orderItems.length}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-stone-400 text-sm mb-1">Grand Total</p>
                        <p className="text-3xl font-bold text-green-400">
                          ₹{orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Printing Details Section */}
                    <div className="mt-8 border-t border-white/10 pt-6">
                      <h4 className="text-sm font-bold text-stone-50 mb-4 flex items-center gap-2 uppercase tracking-wider opacity-80">
                        <Tag size={16} className="text-green-500" /> Additional Printing Details
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs text-stone-400 mb-2">Printing Instructions / Text / Design Notes</label>
                          <textarea
                            value={printingNotes}
                            onChange={(e) => setPrintingNotes(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all resize-none h-24"
                            placeholder="Example: Need the logo centered, text below in green..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-stone-400 mb-2">Reference Pictures (Optional)</label>
                          <div className="relative">
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files) {
                                  setPrintingFiles(Array.from(e.target.files));
                                }
                              }}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex items-center gap-3 w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/5 transition-colors">
                              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                <span className="text-stone-300">📁</span>
                              </div>
                              <div className="flex-1 truncate">
                                {printingFiles.length > 0 
                                  ? <span className="text-green-400 font-medium">{printingFiles.length} file(s) selected</span>
                                  : <span className="text-stone-400 text-sm">Click to upload reference pictures</span>}
                              </div>
                            </div>
                          </div>
                          {printingFiles.length > 0 && (
                            <p className="text-xs text-stone-500 mt-2">
                              Note: Reference pictures cannot be directly attached to WhatsApp via this button, but mentioning them will notify the team to ask for them.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mt-8">
                      <a href={`https://wa.me/919949938277?text=${generateWhatsAppMessage()}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 sm:px-6 py-4 rounded-xl bg-green-500 text-[#041e15] font-bold hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20 text-sm sm:text-base">
                        <MessageCircle size={18} className="shrink-0" /> <span className="truncate">Generate Quote</span>
                      </a>
                      <button onClick={() => {alert('Quotation PDF downloading...'); window.print();}} className="flex items-center justify-center gap-2 px-4 sm:px-6 py-4 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors border border-white/10 text-sm sm:text-base">
                        <FileDown size={18} className="shrink-0" /> <span className="truncate">Download PDF</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                <div className="w-full h-[1px] bg-white/10 my-8" />

                {/* Additional Details (Features & Applications) */}
                <div className="grid sm:grid-cols-2 gap-8 pt-4 pb-24 lg:pb-8">
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

              </div>
            </div>
          </div>
          
          {/* Mobile Floating Action Bar */}
          <div className="lg:hidden absolute bottom-0 left-0 right-0 p-4 bg-[#03150e]/90 backdrop-blur-xl border-t border-white/10 z-20">
            <div className="flex gap-2">
              <button onClick={() => document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary flex-1 justify-center py-3 text-sm">
                Build Quote
              </button>
              <a href="tel:+919949938277" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white shrink-0 hover:bg-white/10 transition-colors">
                <Phone size={18} />
              </a>
              <a href="https://wa.me/919949938277" className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-[#041e15] shrink-0 hover:bg-green-400 transition-colors">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

