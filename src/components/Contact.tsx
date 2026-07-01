import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-32 bg-transparent w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          
          {/* Contact Info */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pill mb-6 text-green-300"
            >
              Get in Touch
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-stone-50 leading-tight mb-8"
            >
              Ready to Make the Eco-Friendly Switch?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-stone-300 opacity-80 mb-12"
            >
              Contact us today for bulk orders, custom prints, or general inquiries. We are here to help your business grow sustainably.
            </motion.p>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-green-400 shrink-0 shadow-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-stone-50 text-lg">Visit Us</h4>
                  <p className="text-stone-300 mt-1">Opp. H.P. Petrol Bunk, Tapeswaram–Mandapeta, east godavari District, Andhra pradesh</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-green-400 shrink-0 shadow-sm">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-stone-50 text-lg">Call or WhatsApp</h4>
                  <div className="flex flex-col gap-1 mt-1">
                    <a href="tel:+919949938277" className="text-stone-300 hover:text-green-400 transition-colors">+91 99499 38277</a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-green-400 shrink-0 shadow-sm">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-stone-50 text-lg">Email</h4>
                  <a href="mailto:sreevaishnaviecoenterprises@gmail.com" className="text-stone-300 hover:text-green-400 transition-colors mt-1 block break-words break-all">sreevaishnaviecoenterprises@gmail.com</a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-green-400 shrink-0 shadow-sm">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-stone-50 text-lg">Business Hours</h4>
                  <p className="text-stone-300 mt-1">Open daily: 10:00 AM - 7:00 PM</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glass-panel p-8"
          >
            <h3 className="text-2xl font-display font-bold text-stone-50 mb-6">Request a Quote</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-stone-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-stone-50 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-300 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-stone-50 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  placeholder="+91 00000 00000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-300 mb-2">Requirement Details</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-stone-50 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none"
                  placeholder="I am looking for 1000 D-cut bags..."
                />
              </div>
              <button 
                type="submit"
                className="w-full btn-primary justify-center group"
              >
                Send Message
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
