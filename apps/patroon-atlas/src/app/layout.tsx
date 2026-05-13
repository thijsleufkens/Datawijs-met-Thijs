import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Patroon-atlas — Datawijs met Thijs",
  description:
    "Vier scatterplots over een fictieve machinebouwer. Een demo van wat scatterplots ontsluiten dat operationele dashboards niet laten zien.",
};

const navItems = [
  { href: "/klanten", label: "Klanten" },
  { href: "/doorlooptijd", label: "Doorlooptijd" },
  { href: "/fases", label: "Projectfases" },
  { href: "/migratie", label: "Migratie" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Roboto+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream">
        <header className="border-b border-border-subtle bg-white/60">
          <div className="mx-auto max-w-6xl px-6 pt-5 pb-3 flex items-center justify-between">
            <Link
              href="/"
              className="text-[20px] font-bold tracking-tight text-ink hover:text-amber-500 transition-colors"
            >
              Patroon-atlas
            </Link>
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-[0.08em] text-amber-500 font-medium">
                Demo
              </div>
              <div className="text-sm text-slate">Korver Machinebouw</div>
            </div>
          </div>
          <nav className="mx-auto max-w-6xl px-6 pb-3 flex gap-6 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate hover:text-ink transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="mx-auto max-w-6xl w-full px-6 py-10 flex-1">
          {children}
        </main>
        <footer className="border-t border-border-subtle">
          <div className="mx-auto max-w-6xl px-6 py-4 text-xs text-subtle">
            Demo met fictieve data. Onderdeel van{" "}
            <a
              href="https://github.com/thijsleufkens/datawijs-met-thijs"
              className="text-slate hover:text-ink underline underline-offset-2"
            >
              Datawijs met Thijs
            </a>
            .
          </div>
        </footer>
      </body>
    </html>
  );
}
