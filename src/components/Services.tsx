import { motion } from 'motion/react';
import { Package, ShoppingBag, Gift, Box, Leaf } from 'lucide-react';

const services = [
  {
    title: 'D-Cut Bags',
    description: 'Durable and versatile bags with a D-shaped handle cut directly into the bag. Perfect for retail stores, boutiques, and exhibitions.',
    icon: <ShoppingBag size={32} />,
    color: 'bg-primary-50',
    iconColor: 'text-primary-700',
  },
  {
    title: 'W-Cut Bags',
    description: 'Classic grocery-style bags with side gussets for extra capacity. The eco-friendly alternative to single-use plastic covers.',
    icon: <ShoppingBag size={32} />,
    color: 'bg-beige-200',
    iconColor: 'text-primary-800',
  },
  {
    title: 'Shopping Bags',
    description: 'Premium quality shopping bags with sturdy loop handles. Customizable with your brand logo for a premium customer experience.',
    icon: <Package size={32} />,
    color: 'bg-primary-100',
    iconColor: 'text-primary-900',
  },
  {
    title: 'Gift Bags',
    description: 'Elegant and stylish bags designed specifically for gifting. Available in various colors and finishes to make every gift special.',
    icon: <Gift size={32} />,
    color: 'bg-beige-300',
    iconColor: 'text-primary-800',
  },
  {
    title: 'Box Bags',
    description: 'Structured bags with a flat bottom, perfect for cake shops, sweet stalls, and premium retail items that need to stay upright.',
    icon: <Box size={32} />,
    color: 'bg-primary-50',
    iconColor: 'text-primary-700',
  },
  {
    title: 'Jute Bags',
    description: '100% natural, highly durable, and biodegradable jute bags. The ultimate choice for long-lasting, heavy-duty sustainable carrying.',
    icon: <Leaf size={32} />,
    color: 'bg-beige-200',
    iconColor: 'text-primary-900',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-32 bg-transparent relative w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pill mb-6 text-green-300"
          >
            Our Products
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-stone-50 leading-tight"
          >
            Eco-Friendly Solutions for Every Need
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative p-8 glass-panel overflow-hidden hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              
              <div className="mb-8 inline-block p-4 rounded-xl bg-white/10 border border-white/20 text-green-400 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-display font-bold text-stone-50 mb-4">
                {service.title}
              </h3>
              
              <p className="text-stone-300 opacity-80 leading-relaxed mb-6">
                {service.description}
              </p>
              
              <div className="flex items-center gap-2 text-green-400 font-bold text-sm group-hover:gap-4 transition-all">
                <span>Learn more</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
