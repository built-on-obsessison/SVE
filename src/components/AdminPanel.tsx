import { useState, useEffect, type FormEvent } from 'react';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';

export interface PricingRule {
  id: string;
  product: string;
  size: string;
  colour: string;
  gsm: string;
  printing: string;
  pricePerKg: number;
}

export default function AdminPanel() {
  const [rules, setRules] = useState<PricingRule[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const savedRules = localStorage.getItem('sve_pricing_rules');
    if (savedRules) {
      setRules(JSON.parse(savedRules));
    } else {
      // Default sample rules
      setRules([
        { id: '1', product: 'D-Cut Bags', size: '12×16', colour: 'White', gsm: '80 GSM', printing: 'Plain', pricePerKg: 82 },
        { id: '2', product: 'D-Cut Bags', size: '12×16', colour: 'Green', gsm: '80 GSM', printing: 'Plain', pricePerKg: 88 },
        { id: '3', product: 'D-Cut Bags', size: '12×16', colour: 'White', gsm: '80 GSM', printing: 'Double Side Printing', pricePerKg: 96 }
      ]);
    }
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const saveRules = (newRules: PricingRule[]) => {
    setRules(newRules);
    localStorage.setItem('sve_pricing_rules', JSON.stringify(newRules));
  };

  const addRule = () => {
    const newRule: PricingRule = {
      id: Date.now().toString(),
      product: 'Any',
      size: 'Any',
      colour: 'Any',
      gsm: 'Any',
      printing: 'Any',
      pricePerKg: 0
    };
    saveRules([...rules, newRule]);
  };

  const updateRule = (id: string, field: keyof PricingRule, value: string | number) => {
    const newRules = rules.map(rule => rule.id === id ? { ...rule, [field]: value } : rule);
    saveRules(newRules);
  };

  const deleteRule = (id: string) => {
    const newRules = rules.filter(rule => rule.id !== id);
    saveRules(newRules);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#041e15] flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="glass-panel p-8 rounded-3xl max-w-md w-full">
          <h2 className="text-2xl font-display font-bold text-white mb-6">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-stone-50 focus:outline-none focus:border-green-500 transition-colors mb-4"
          />
          <button type="submit" className="btn-primary w-full justify-center">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#041e15] p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Pricing Management</h1>
            <p className="text-stone-400">Manage specific pricing rules for combinations. These take priority over default calculations.</p>
          </div>
          <button onClick={() => window.location.hash = ''} className="btn-secondary gap-2">
            <ArrowLeft size={18} /> Back to Site
          </button>
        </div>

        <div className="glass-panel p-6 rounded-3xl overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10 text-stone-400">
                <th className="pb-4 font-medium">Product</th>
                <th className="pb-4 font-medium">Size</th>
                <th className="pb-4 font-medium">Colour</th>
                <th className="pb-4 font-medium">GSM</th>
                <th className="pb-4 font-medium">Printing</th>
                <th className="pb-4 font-medium">Price (₹/KG)</th>
                <th className="pb-4 font-medium w-16"></th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule) => (
                <tr key={rule.id} className="border-b border-white/5 group">
                  <td className="py-3 pr-2">
                    <input type="text" value={rule.product} onChange={(e) => updateRule(rule.id, 'product', e.target.value)} className="w-full bg-transparent border border-white/10 rounded px-2 py-1 text-sm focus:border-green-500 outline-none" />
                  </td>
                  <td className="py-3 pr-2">
                    <input type="text" value={rule.size} onChange={(e) => updateRule(rule.id, 'size', e.target.value)} className="w-full bg-transparent border border-white/10 rounded px-2 py-1 text-sm focus:border-green-500 outline-none" />
                  </td>
                  <td className="py-3 pr-2">
                    <input type="text" value={rule.colour} onChange={(e) => updateRule(rule.id, 'colour', e.target.value)} className="w-full bg-transparent border border-white/10 rounded px-2 py-1 text-sm focus:border-green-500 outline-none" />
                  </td>
                  <td className="py-3 pr-2">
                    <input type="text" value={rule.gsm} onChange={(e) => updateRule(rule.id, 'gsm', e.target.value)} className="w-full bg-transparent border border-white/10 rounded px-2 py-1 text-sm focus:border-green-500 outline-none" />
                  </td>
                  <td className="py-3 pr-2">
                    <input type="text" value={rule.printing} onChange={(e) => updateRule(rule.id, 'printing', e.target.value)} className="w-full bg-transparent border border-white/10 rounded px-2 py-1 text-sm focus:border-green-500 outline-none" />
                  </td>
                  <td className="py-3 pr-2">
                    <input type="number" value={rule.pricePerKg} onChange={(e) => updateRule(rule.id, 'pricePerKg', Number(e.target.value))} className="w-full bg-transparent border border-white/10 rounded px-2 py-1 text-sm focus:border-green-500 outline-none" />
                  </td>
                  <td className="py-3 text-right">
                    <button onClick={() => deleteRule(rule.id)} className="p-2 text-stone-500 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex justify-between items-center">
            <button onClick={addRule} className="flex items-center gap-2 text-green-400 hover:text-green-300 font-medium text-sm transition-colors">
              <Plus size={16} /> Add Pricing Rule
            </button>
            <div className="flex items-center gap-2 text-stone-400 text-sm">
              <Save size={16} /> Saved Automatically
            </div>
          </div>
        </div>
        
        <div className="mt-8 glass-panel p-6 rounded-3xl">
          <h3 className="text-xl font-bold text-white mb-4">How it works</h3>
          <p className="text-stone-300 text-sm leading-relaxed mb-4">
            The quotation system checks these rules from top to bottom. It looks for a match on Product, Size, Colour, GSM, and Printing. Use "Any" to match any value for that field. If no exact match is found, it uses a fallback base price calculation (₹85/kg base + add-ons).
          </p>
        </div>
      </div>
    </div>
  );
}
