import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hypothese-tracker",
  description:
    "Log besluiten met hypothese en nulmeting, en kijk later of het klopte.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full antialiased">
      <body className="min-h-full flex flex-col" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        <header className="border-b border-border">
          <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Hypothese-tracker
            </Link>
            <span className="text-sm text-muted">Van Houten Metaal</span>
          </div>
        </header>
        <main className="mx-auto max-w-4xl w-full px-6 py-8 flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
