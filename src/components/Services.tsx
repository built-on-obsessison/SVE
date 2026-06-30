import { useState } from 'react';
import { motion } from 'motion/react';
import { Package, ShoppingBag, Gift, Box, Leaf, Check } from 'lucide-react';
import ProductModal from './ProductModal';

export interface OrderItem {
  id: string;
  productTitle: string;
  size: string;
  colour: string;
  gsm: string;
  printing: string;
  quantity: number;
  price: number;
}

const services = [
  {
    title: 'D-Cut Bags',
    sizes: ['Default', '9×12', '10×14', '12×16', '12×18', '13×18', '14×18', '16×20', 'Customized'],
    features: ['Eco-Friendly', 'Reusable', 'Custom Printing', 'Bulk Supply'],
    icon: <ShoppingBag size={32} />,
  },
  {
    title: 'W-Cut Bags',
    sizes: ['Default', '9×12', '10×14', '12×16', '12×18', '13×18', '14×18', '16×20', 'Customized'],
    features: ['Eco-Friendly', 'Reusable', 'Custom Printing', 'Bulk Supply'],
    icon: <ShoppingBag size={32} />,
  },
  {
    title: 'Shopping Bags',
    sizes: ['Default', '9×12', '10×14', '12×16', '12×18', '13×18', '14×18', '16×20', 'Customized'],
    features: ['Eco-Friendly', 'Reusable', 'Custom Printing', 'Bulk Supply'],
    icon: <Package size={32} />,
  },
  {
    title: 'Gift Bags',
    sizes: ['Default', '9×12', '10×14', '12×16', '12×18', '13×18', '14×18', '16×20', 'Customized'],
    features: ['Eco-Friendly', 'Reusable', 'Custom Printing', 'Bulk Supply'],
    icon: <Gift size={32} />,
  },
  {
    title: 'Box Bags',
    sizes: ['Default', '9×12', '10×14', '12×16', '12×18', '13×18', '14×18', '16×20', 'Customized'],
    features: ['Eco-Friendly', 'Reusable', 'Custom Printing', 'Bulk Supply'],
    icon: <Box size={32} />,
  },
  {
    title: 'Jute Bags',
    sizes: ['Default', '9×12', '10×14', '12×16', '12×18', '13×18', '14×18', '16×20', 'Customized'],
    features: ['Eco-Friendly', 'Reusable', 'Custom Printing', 'Bulk Supply'],
    icon: <Leaf size={32} />,
  },
];

function ServiceCard({ service, index, onLearnMore }: { service: any; index: number; onLearnMore: () => void; key?: string | number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative p-8 glass-panel flex flex-col hover:-translate-y-2 transition-transform duration-500"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
      
      <div className="mb-8 inline-block self-start p-4 rounded-xl bg-white/10 border border-white/20 text-green-400 group-hover:scale-110 transition-transform duration-500">
        {service.icon}
      </div>
      
      <h3 className="text-2xl font-display font-bold text-stone-50 mb-4">
        {service.title}
      </h3>

      <div className="mb-6 flex-grow">
        <p className="text-sm font-bold text-stone-50 mb-3">Features:</p>
        <ul className="space-y-2">
          {service.features.map((feature: string) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-stone-300">
              <Check size={16} className="text-green-400 shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-auto pt-4">
        <button 
          onClick={onLearnMore}
          className="btn-primary w-full justify-center"
        >
          Learn more
        </button>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

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
            <ServiceCard 
              key={service.title} 
              service={service} 
              index={index} 
              onLearnMore={() => setSelectedProduct(service)} 
            />
          ))}
        </div>
      </div>

      <ProductModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct} 
        orderItems={orderItems}
        setOrderItems={setOrderItems}
      />
    </section>
  );
}

