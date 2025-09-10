
'use client';
import { formatCurrency, convert } from '@/lib/currency';

export default function Cart({ locale, currency, items, setOpen, removeItem }) {
  const totalAED = items.reduce((s, it) => s + it.price_aed * it.qty, 0);
  const total = convert(totalAED, currency);

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="hidden md:block flex-1 bg-black/40" onClick={()=>setOpen(false)} />
      <div className="ml-auto h-full w-full max-w-md overflow-y-auto border-l border-gray-100 bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold">{locale === 'ar' ? 'سلة التسوق' : 'Your Cart'}</h2>
          <button onClick={()=>setOpen(false)} className="rounded-full p-2 hover:bg-gray-100">✕</button>
        </div>
        {items.length === 0 ? (
          <p className="text-gray-500">{locale === 'ar' ? 'سلتك فارغة.' : 'Your cart is empty.'}</p>
        ) : (
          <div className="space-y-4">
            {items.map((it) => (
              <div key={it.id} className="flex items-center gap-3 rounded-xl border p-3">
                <img src={it.image} alt="" className="h-16 w-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{locale==='ar'?it.title_ar:it.title_en}</p>
                  <p className="text-xs text-gray-500">Qty {it.qty}</p>
                </div>
                <div className="text-sm font-bold">
                  {formatCurrency(convert(it.price_aed * it.qty, currency), currency)}
                </div>
                <button onClick={()=>removeItem(it.id)} className="rounded-lg px-2 py-1 text-xs text-red-600 hover:bg-red-50">
                  {locale==='ar'?'إزالة':'Remove'}
                </button>
              </div>
            ))}
            <div className="flex items-center justify-between border-t pt-4">
              <span className="text-base font-semibold">{locale==='ar'?'الإجمالي':'Total'}</span>
              <span className="text-lg font-extrabold">{formatCurrency(total, currency)}</span>
            </div>
            <button className="mt-2 w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white">
              {locale==='ar'?'إتمام الشراء (تجريبي)':'Checkout (demo)'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
