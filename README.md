
# ZandiStore (Next.js 14, Arabic + English, Multi‑Currency)

Bilingual storefront with RTL support and currency switcher (SAR / AED / USD). Prices are stored in AED and converted on the fly.

## Quick start

```bash
npm install
npm run dev
# open http://localhost:3000 (auto‑redirects to /ar)
```

## Deploy

Deploy to Vercel or any Node host. Point your domain **zandistore.com** to your hosting provider. Next.js i18n will map:
- Arabic: https://zandistore.com/ar
- English: https://zandistore.com/en

## Add your products

Edit `data/products.json`. For each item use:
```json
{
  "id": "unique-id",
  "title_en": "English name",
  "title_ar": "الاسم بالعربية",
  "price_aed": 12.34,
  "category": "MM2",
  "image": "https://.../image.jpg",
  "badge": "Sale",
  "rating": 4.8
}
```

> NOTE: This scaffold ships with placeholder items. Replace them with your real catalog (from mv7store or your own), and product images you own the rights to.

## Change defaults
- Default locale: `next.config.mjs` (`defaultLocale: 'ar'`).
- Default currency: see `app/[locale]/page.js` (`useState('SAR')`).
- Currency conversion rates: `lib/currency.js`.

## Checkout
The checkout is a demo. Integrate Stripe/PayPal or your provider and replace the button handler in `components/Cart.js`.
