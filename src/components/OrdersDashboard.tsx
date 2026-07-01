import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Package, Truck, CheckCircle, Clock, Star, CreditCard } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { signInWithGoogle, logOut, db } from '../lib/firebase';
import { collection, query, where, onSnapshot, updateDoc, doc, addDoc } from 'firebase/firestore';

export default function OrdersDashboard({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  
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

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
      });
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  const handlePayRemaining = async (orderId: string) => {
    await updateDoc(doc(db, 'orders', orderId), { status: 'delivery_details' });
  };

  const handlePayAdvance = async (orderId: string) => {
    await updateDoc(doc(db, 'orders', orderId), { status: 'progress', advancePaid: true });
  };

  const handleSubmitDeliveryDetails = async (orderId: string, details: string) => {
    await updateDoc(doc(db, 'orders', orderId), { status: 'delivered', deliveryDetails: details });
  };

  const handleSubmitReview = async (orderId: string, review: string) => {
    await updateDoc(doc(db, 'orders', orderId), { status: 'past_orders', review });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
        <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.95 }} className="relative bg-[#041e15] border border-white/10 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl">
          
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#03150e]">
            <h2 className="text-2xl font-display font-bold text-white">Your Orders</h2>
            <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
            {!user ? (
              <div className="text-center py-20">
                <Package size={48} className="mx-auto text-stone-600 mb-6" />
                <h3 className="text-2xl font-display font-bold text-white mb-4">Track Your Orders</h3>
                <p className="text-stone-400 mb-8 max-w-md mx-auto">Sign in to view your cart, track order progress, and manage deliveries.</p>
                <button onClick={signInWithGoogle} className="btn-primary mx-auto">
                  Sign In With Google
                </button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    {user.photoURL && <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full" />}
                    <div>
                      <p className="text-white font-medium">{user.displayName}</p>
                      <p className="text-stone-400 text-xs">{user.email}</p>
                    </div>
                  </div>
                  <button onClick={logOut} className="text-stone-400 hover:text-red-400 text-sm transition-colors">
                    Sign Out
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12 border border-white/5 rounded-2xl bg-white/5">
                    <p className="text-stone-400">You don't have any orders yet.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <OrderCard 
                        key={order.id} 
                        order={order} 
                        onPayRemaining={() => handlePayRemaining(order.id)}
                        onPayAdvance={() => handlePayAdvance(order.id)}
                        onSubmitDelivery={(details) => handleSubmitDeliveryDetails(order.id, details)}
                        onSubmitReview={(review) => handleSubmitReview(order.id, review)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function OrderCard({ order, onPayRemaining, onPayAdvance, onSubmitDelivery, onSubmitReview }: any) {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [reviewText, setReviewText] = useState('');

  const getStatusDisplay = (status: string) => {
    switch(status) {
      case 'cart': return { icon: <Clock size={16}/>, text: 'In Cart (Awaiting Advance)', color: 'text-yellow-400', bg: 'bg-yellow-400/10' };
      case 'progress': return { icon: <Package size={16}/>, text: 'In Progress', color: 'text-blue-400', bg: 'bg-blue-400/10' };
      case 'packing': return { icon: <Box size={16}/>, text: 'Packing - Final Payment Required', color: 'text-orange-400', bg: 'bg-orange-400/10' };
      case 'delivery_details': return { icon: <Truck size={16}/>, text: 'Awaiting Delivery Details', color: 'text-indigo-400', bg: 'bg-indigo-400/10' };
      case 'delivered': return { icon: <CheckCircle size={16}/>, text: 'Delivered - Leave a Review', color: 'text-green-400', bg: 'bg-green-400/10' };
      case 'past_orders': return { icon: <Star size={16}/>, text: 'Completed', color: 'text-stone-400', bg: 'bg-stone-400/10' };
      default: return { icon: <Clock size={16}/>, text: status, color: 'text-stone-400', bg: 'bg-stone-400/10' };
    }
  };

  const statusDisplay = getStatusDisplay(order.status);

  return (
    <div className="border border-white/10 rounded-2xl p-6 bg-white/5 space-y-4">
      <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
        <div>
          <p className="text-stone-400 text-xs mb-1">Order ID: {order.id}</p>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusDisplay.color} ${statusDisplay.bg}`}>
            {statusDisplay.icon} {statusDisplay.text}
          </div>
        </div>
        <div className="text-right">
          <p className="text-stone-400 text-sm">Total Amount</p>
          <p className="text-white font-bold text-lg">₹{order.totalAmount?.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-2 border-t border-white/5 pt-4">
        {order.items?.map((item: any, i: number) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-stone-300">{item.quantity} KG x {item.productTitle} ({item.colour})</span>
            <span className="text-stone-400">₹{(item.quantity * item.price).toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* Action Areas based on status */}
      <div className="pt-4 border-t border-white/5 mt-4">
        {order.status === 'cart' && (
          <div className="bg-[#041e15] border border-green-500/30 p-4 rounded-xl text-center space-y-4">
             <p className="text-stone-400 text-sm font-medium">Please pay the 30% advance to process this order.</p>
             <p className="text-2xl font-bold text-green-400 mb-2">₹{Math.round(order.totalAmount * 0.3).toLocaleString()}</p>
             <div className="bg-white p-3 rounded-xl inline-block mb-2">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=9949938277@ybl&pn=Sri%20Laxmi%20Bhavani&cu=INR" alt="UPI QR Code" className="w-24 h-24" />
             </div>
             <div>
               <button onClick={onPayAdvance} className="btn-primary w-full justify-center">I have paid the advance</button>
             </div>
          </div>
        )}
        
        {order.status === 'progress' && (
          <p className="text-stone-400 text-sm">Your order is currently being manufactured and printed. We'll update you when it reaches the packing stage.</p>
        )}

        {order.status === 'packing' && (
          <div className="bg-[#041e15] border border-orange-500/30 p-4 rounded-xl text-center space-y-4">
             <p className="text-orange-400 text-sm font-medium">Your order is packed! Please pay the remaining balance to arrange delivery.</p>
             <p className="text-2xl font-bold text-white mb-2">₹{Math.round(order.totalAmount * 0.7).toLocaleString()}</p>
             <div className="bg-white p-3 rounded-xl inline-block mb-2">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=9949938277@ybl&pn=Sri%20Laxmi%20Bhavani&cu=INR" alt="UPI QR Code" className="w-24 h-24" />
             </div>
             <div>
               <button onClick={onPayRemaining} className="btn-primary w-full justify-center">I have paid the remaining amount</button>
             </div>
          </div>
        )}

        {order.status === 'delivery_details' && (
          <div className="space-y-3">
            <p className="text-indigo-400 text-sm font-medium">Payment received! Please provide your delivery address.</p>
            <textarea 
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter your full shipping address and contact number..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-stone-50 focus:outline-none focus:border-indigo-500 transition-colors resize-none h-24"
            />
            <button 
              onClick={() => onSubmitDelivery(deliveryAddress)}
              disabled={!deliveryAddress.trim()}
              className="btn-primary w-full justify-center bg-indigo-500 hover:bg-indigo-400 text-white disabled:opacity-50"
            >
              Confirm Delivery Details
            </button>
          </div>
        )}

        {order.status === 'delivered' && (
          <div className="space-y-3">
            <p className="text-green-400 text-sm font-medium">Order Delivered! Please leave a review.</p>
            <textarea 
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="How was the quality of the bags? How was the printing?"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-stone-50 focus:outline-none focus:border-green-500 transition-colors resize-none h-24"
            />
            <button 
              onClick={() => onSubmitReview(reviewText)}
              disabled={!reviewText.trim()}
              className="btn-primary w-full justify-center disabled:opacity-50"
            >
              Submit Review
            </button>
          </div>
        )}
        
        {order.status === 'past_orders' && (
          <div>
             <p className="text-stone-400 text-sm">Your review: "{order.review}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple Box icon component since it might not be imported from lucide-react in parent scope easily
function Box(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
      <path d="m3.3 7 8.7 5 8.7-5"/>
      <path d="M12 22V12"/>
    </svg>
  );
}
