
'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { dicts } from '@/lib/i18n';
import { CURRENCIES } from '@/lib/currency';
import clsx from 'clsx';

export default function Navbar({ locale, currency, setCurrency }) {
  const dict = dicts[locale];
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const target = locale === 'ar' ? 'en' : 'ar';
    const segs = pathname.split('/');
    segs[1] = target;
    router.push(segs.join('/') || '/');
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="container py-3 flex items-center justify-between gap-3">
        <Link href={`/${locale}`} className="flex items-center gap-2 select-none">
          <img src="/logo.svg" alt="" className="h-7 w-7" />
          <span className="text-xl font-extrabold bg-clip-text text-transparent"
            style={{backgroundImage:'linear-gradient(90deg, var(--brand-from), var(--brand-to))'}}
          >
            {dict.brand}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2 rounded-2xl border bg-gray-50 px-3 py-2">
          <svg width="18" height="18" viewBox="0 0 24 24" className="fill-gray-500">
            <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
          </svg>
          <input className="w-64 bg-transparent text-sm outline-none placeholder:text-gray-400"
            placeholder={dict.search} />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <select
              value={currency}
              onChange={(e)=>setCurrency(e.target.value)}
              className="rounded-xl border bg-white px-3 py-2 text-sm"
            >
              {Object.keys(CURRENCIES).map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
            <button onClick={switchLocale} className="btn btn-ghost text-sm">
              {locale === 'ar' ? 'EN' : 'AR'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
