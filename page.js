
'use client';
import { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import { dicts } from '@/lib/i18n';

export default function Page({ params }) {
  const { locale } = params;
  const [currency, setCurrency] = useState('SAR'); // default
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/products.json').then(r=>r.json()).then(setProducts);
  }, []);

  const addToCart = (p) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === p.id);
      if (found) return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...p, qty: 1 }];
    });
    setCartOpen(true);
  };
  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const dict = dicts[locale];

  const categories = useMemo(() => {
    const s = new Set(products.map(p => p.category));
    return ['All','الكل', ...Array.from(s)];
  }, [products]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <Navbar locale={locale} currency={currency} setCurrency={setCurrency} />

      <section className="container py-10 md:py-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <span className="badge border text-gray-600">
              {locale==='ar' ? 'خصومات حتى 50٪ — لفترة محدودة' : 'Up to 50% OFF — limited time'}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              {dict.hero_title}
            </h1>
            <p className="text-gray-600 md:text-lg">{dict.hero_sub}</p>
            <div className="flex flex-wrap gap-3">
              <a href="#catalog" className="btn btn-primary text-sm">{dict.shop_now}</a>
              <a href="#catalog" className="btn btn-ghost text-sm">{dict.view_all}</a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border bg-gradient-to-tr from-cyan-200 via-fuchsia-200 to-violet-200 p-2 shadow-sm">
              <div className="h-full w-full rounded-2xl bg-white/60 backdrop-blur grid grid-cols-3 gap-2 p-2 md:gap-3 md:p-3">
                {products.slice(0,6).map((p) => (
                  <img key={p.id} src={p.image} alt="" className="h-full w-full rounded-xl object-cover" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="border-t border-b bg-white/60">
        <div className="container py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{dict.featured}</h2>
          <span className="text-sm text-gray-500">{products.length} {dict.items}</span>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} locale={locale} currency={currency} product={p} addToCart={addToCart} />
          ))}
        </div>
      </section>

      <footer className="border-t bg-white">
        <div className="container py-10 grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 select-none">
              <img src="/logo.svg" alt="" className="h-7 w-7" />
              <span className="text-xl font-extrabold"
                style={{backgroundImage:'linear-gradient(90deg, var(--brand-from), var(--brand-to))', WebkitBackgroundClip:'text', color:'transparent'}}
              >
                {dict.brand}
              </span>
            </div>
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} ZandiStore.</p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">{dict.footer_shop}</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#catalog" className="hover:underline">New</a></li>
              <li><a href="#catalog" className="hover:underline">MM2</a></li>
              <li><a href="#catalog" className="hover:underline">Blox Fruit</a></li>
              <li><a href="#catalog" className="hover:underline">Grow a Garden</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">{dict.footer_support}</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:underline">{dict.contact}</a></li>
              <li><a href="#" className="hover:underline">{dict.refund_policy}</a></li>
              <li><a href="#" className="hover:underline">{dict.terms}</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">{dict.newsletter}</p>
            <div className="flex gap-2">
              <input placeholder={dict.email_placeholder} className="w-full rounded-xl border px-3 py-2 text-sm outline-none" />
              <button className="btn btn-ghost text-sm">{dict.join}</button>
            </div>
            <p className="mt-2 text-xs text-gray-500">{locale==='ar'?'لن نرسل رسائل مزعجة.':'We never spam.'}</p>
          </div>
        </div>
      </footer>

      {cartOpen && (
        <Cart locale={locale} currency={currency} items={cart} setOpen={setCartOpen} removeItem={removeFromCart} />
      )}
    </div>
  );
}
