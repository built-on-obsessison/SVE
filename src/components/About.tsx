import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '10k+', label: 'Bags Produced Daily' },
    { value: '500+', label: 'Happy Clients' },
    { value: '100%', label: 'Eco-Friendly' },
  ];

  return (
    <section id="about" className="py-32 bg-transparent text-stone-50 overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative h-[600px] rounded-3xl overflow-hidden">
            <motion.div style={{ y }} className="absolute inset-[-10%] w-[120%] h-[120%]">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Sustainable nature"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-primary-900/30 mix-blend-multiply" />
            </motion.div>
            
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
            
            {/* Playful Floating Badge */}
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ repeat: Infinity, duration: 4, repeatType: 'reverse', ease: 'easeInOut' }}
              className="absolute top-8 left-8 w-32 h-32 glass-panel rounded-full flex items-center justify-center p-4 text-center shadow-2xl"
            >
              <span className="text-green-400 font-display font-bold text-sm leading-tight">
                Quality<br/>Guaranteed
              </span>
            </motion.div>
          </div>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pill mb-6 text-green-300"
            >
              Our Story
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight text-stone-50"
            >
              Committed to a Greener Tomorrow.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-stone-300 opacity-80 mb-6 leading-relaxed"
            >
              At Sree Vaishnavi Eco Enterprises, we believe that every small step counts towards protecting our planet. Located in the heart of Mandapeta, we have dedicated ourselves to manufacturing premium quality, eco-friendly bags that serve as the perfect alternative to harmful single-use plastics.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg text-stone-300 opacity-80 mb-12 leading-relaxed"
            >
              Our facility is equipped to handle bulk orders of D-cut, W-cut, Box bags, and more, ensuring businesses can switch to sustainable packaging without compromising on quality or aesthetics.
            </motion.p>

            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="border-t border-white/10 pt-4"
                >
                  <p className="text-4xl font-display font-bold text-stone-50 mb-2">{stat.value}</p>
                  <p className="text-xs text-stone-400 uppercase tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
