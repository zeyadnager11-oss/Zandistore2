
'use client';

import { useEffect, useState } from 'react';
import WatermarkedImage from '@/components/WatermarkedImage';

const fx = { USD: 0.27, SAR: 1.02, AED: 1 };

export default function ArabicStorePage() {
  const [currency, setCurrency] = useState('AED');
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/products.json')
      .then(r => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  const priceWithCurrency = (aed) => {
    const val = (aed * fx[currency]).toFixed(2);
    if (currency === 'AED') return `${val} د.إ`;
    if (currency === 'SAR') return `${val} ر.س`;
    return `$${val}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">ZandiStore</h1>
        <div className="flex items-center gap-2">
          <label className="text-sm opacity-90">العملة:</label>
          <select
            className="text-black p-1 rounded"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="AED">AED - درهم</option>
            <option value="SAR">SAR - ريال</option>
            <option value="USD">USD - دولار</option>
          </select>
        </div>
      </header>

      <section className="text-center py-6">
        <h2 className="text-3xl font-bold text-green-700">🌱 Grow a Garden</h2>
        <p className="text-gray-600">جميع المنتجات مع علامة مائية ZiStore وإخفاء أي علامة قديمة.</p>
      </section>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-16">
        {items.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
            <div className="w-full h-64">
              <WatermarkedImage src={p.image} alt={p.name_ar} width={800} height={800} text="ZiStore" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{p.name_ar}</h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-green-700 font-bold text-xl">{priceWithCurrency(p.price_aed)}</span>
                <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">أضف للسلة</button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
