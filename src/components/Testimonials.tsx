import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh K.',
    role: 'Retail Store Owner',
    text: 'Sree Vaishnavi Eco Enterprises has completely transformed our packaging. The D-cut bags are durable and our customers love the eco-friendly approach.',
  },
  {
    name: 'Lakshmi M.',
    role: 'Boutique Manager',
    text: 'The quality of their W-cut bags is exceptional. Timely delivery and great customer service. Highly recommended for any business looking to go green.',
  },
  {
    name: 'Srinivas R.',
    role: 'Event Organizer',
    text: 'We ordered custom printed gift bags for a large corporate event. The print quality and material strength exceeded our expectations.',
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-32 bg-transparent w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pill mb-6 text-green-300"
          >
            Client Reviews
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-stone-50 leading-tight"
          >
            Trusted by Local Businesses
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="p-8 glass-panel relative group"
            >
              <Quote className="absolute top-8 right-8 text-white/5 w-12 h-12 group-hover:scale-110 transition-transform" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-green-400 text-green-400" />
                ))}
              </div>
              
              <p className="text-stone-300 opacity-90 leading-relaxed mb-8 relative z-10">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-green-400 font-bold font-display">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-display font-bold text-stone-50">{testimonial.name}</h4>
                  <p className="text-sm text-stone-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
