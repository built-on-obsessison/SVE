import { motion } from 'motion/react';
import { PhoneCall, Droplet, Cog, Truck } from 'lucide-react';

const steps = [
  {
    icon: <PhoneCall size={28} />,
    title: 'Consultation',
    description: 'We discuss your requirements, preferred bag types, sizes, and custom branding needs.'
  },
  {
    icon: <Droplet size={28} />,
    title: 'Design & Material',
    description: 'Choose from our range of eco-friendly materials and finalize the design and color.'
  },
  {
    icon: <Cog size={28} />,
    title: 'Production',
    description: 'Our state-of-the-art facility manufactures your bags with strict quality control.'
  },
  {
    icon: <Truck size={28} />,
    title: 'Delivery',
    description: 'Timely delivery to your business location, ready for your customers to use.'
  }
];

export default function Process() {
  return (
    <section id="process" className="py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pill mb-6 text-green-300"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-stone-50 leading-tight"
          >
            A Seamless Process from Order to Delivery
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative z-10 text-center"
            >
              <div className="w-20 h-20 mx-auto glass-panel flex items-center justify-center text-green-400 shadow-xl mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-stone-50 mb-3">{step.title}</h3>
              <p className="text-stone-300 opacity-80 text-sm leading-relaxed max-w-[200px] mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
