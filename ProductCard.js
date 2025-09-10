
'use client';
import { formatCurrency, convert } from '@/lib/currency';

export default function ProductCard({ locale, currency, product, addToCart }) {
  const title = locale === 'ar' ? product.title_ar : product.title_en;
  const price = convert(product.price_aed, currency);

  return (
    <div className="group relative overflow-hidden card transition hover:shadow-md">
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-50">
        <img src={product.image} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      {product.badge && (
        <div className="absolute left-3 top-3 badge bg-black/80 text-white">{product.badge}</div>
      )}
      <div className="space-y-2 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-tight">{title}</h3>
        <div className="text-base font-bold">{formatCurrency(price, currency)}</div>
        <button onClick={() => addToCart(product)} className="btn btn-primary w-full text-sm">
          {locale === 'ar' ? 'أضف إلى السلة' : 'Add to cart'}
        </button>
      </div>
      <style jsx>{`
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
}
