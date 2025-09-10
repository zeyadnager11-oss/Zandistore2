
export default function LocaleLayout({ params, children }) {
  const { locale } = params;
  const isAR = locale === 'ar';
  return (
    <html lang={locale} dir={isAR ? 'rtl' : 'ltr'}>
      <body>{children}</body>
    </html>
  );
}
