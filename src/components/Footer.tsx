import { Leaf, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/20 backdrop-blur-xl border-t border-white/10 text-stone-50 pt-16 md:pt-20 pb-10 rounded-t-[40px] mt-[-40px] relative z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-10 rounded-lg bg-green-500 flex items-center justify-center font-bold text-white text-lg">
                SVE
              </div>
              <div className="leading-tight">
                <span className="block font-display font-bold text-xl tracking-tight text-white">
                  Sree Vaishnavi
                </span>
                <span className="block text-[10px] md:text-xs opacity-60 uppercase tracking-widest text-stone-300">
                  Eco Enterprises
                </span>
              </div>
            </div>
            <p className="text-stone-300 opacity-80 mb-8 max-w-sm leading-relaxed">
              Carry Green, Carry Smart. Premium quality eco-friendly bags manufactured for a sustainable future.
            </p>
            <div className="flex gap-4">
              <a href="https://maps.app.goo.gl/bVBDeU7X9Ubh6t1r5" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-stone-300 hover:text-white transition-colors border border-white/20 rounded-full px-4 py-2">
                Get Directions <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-stone-300 opacity-80 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="text-stone-300 opacity-80 hover:text-white transition-colors">Our Products</a></li>
              <li><a href="#process" className="text-stone-300 opacity-80 hover:text-white transition-colors">How We Work</a></li>
              <li><a href="#testimonials" className="text-stone-300 opacity-80 hover:text-white transition-colors">Client Reviews</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg text-white mb-6">Contact</h4>
            <ul className="space-y-4 text-stone-300 opacity-80">
              <li>Opp. H.P. Petrol Bunk, Tapeswaram–Mandapeta,</li>
              <li>east godavari District,</li>
              <li>Andhra pradesh</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-stone-400 text-sm">
            © {new Date().getFullYear()} Sree Vaishnavi Eco Enterprises. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm text-stone-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
