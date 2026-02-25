import "../styles/globals.css";
import data from "../data/domain.json";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body
        style={{
          "--color-primary": data.siteConfig.colors.primary,
          "--color-secondary": data.siteConfig.colors.secondary,
          "--color-accent": data.siteConfig.colors.accent,
          "--color-background": data.siteConfig.colors.background,
          "--color-text": data.siteConfig.colors.text,
        } as React.CSSProperties}
        className="bg-background text-text min-h-screen"
      >
        {children}
      </body>
    </html>
  );
}
