import { motion } from 'motion/react';
import { ArrowRight, Leaf } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-16 lg:pt-20 overflow-hidden bg-transparent">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-500/20 rounded-full blur-[120px] opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] opacity-60 translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-10 lg:gap-8 items-center z-10 relative">
        <div className="flex flex-col items-start pt-12 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pill mb-8 flex items-center gap-2"
          >
            <Leaf size={16} className="text-green-400" />
            <span>Eco-Friendly Bags for Every Business</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-stone-50 leading-[1.05] tracking-tight mb-6 md:mb-8"
          >
            Carry <span className="text-green-500">Green</span>,<br />
            Carry <span className="text-green-500">Smart</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-stone-300 opacity-80 max-w-md mb-10 leading-relaxed"
          >
            Quality bags for a sustainable future. We manufacture premium D-cut, W-cut, and custom shopping bags for businesses that care.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
          >
            <a
              href="tel:+918897564055"
              className="btn-primary w-full md:w-auto justify-center"
            >
              Call Now
            </a>
            <a
              href="#services"
              className="btn-secondary group gap-2 w-full md:w-auto justify-center"
            >
              View Services
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[400px] md:h-[500px] lg:h-[700px] w-full mt-8 lg:mt-0"
        >
          {/* Main Hero Image - Using a clean, aesthetic paper/fabric bag image */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
              alt="Eco friendly paper bags"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#041e15]/60 to-transparent mix-blend-multiply" />
          </div>
          
          {/* Floating UI Element */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-4 left-4 md:bottom-12 md:-left-12 glass-panel p-4 md:p-6 rounded-2xl max-w-[200px] md:max-w-[240px] shadow-2xl"
          >
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/20">
                <Leaf className="text-green-400" size={24} />
              </div>
              <div>
                <p className="font-display font-bold text-stone-50 text-lg">100% Eco</p>
                <p className="text-sm text-stone-400 leading-tight mt-1">Sustainable materials for every bag.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
