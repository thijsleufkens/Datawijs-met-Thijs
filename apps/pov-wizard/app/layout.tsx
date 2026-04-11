import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "POV Wizard",
  description:
    "Van afwijking op een dashboard naar een scherpe, verdedigbare mening in vijf stappen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full antialiased">
      <body
        className="min-h-full flex flex-col"
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <header className="border-b border-[var(--color-border)]">
          <div className="mx-auto max-w-2xl px-6 py-4 flex items-center justify-between">
            <span className="text-base font-semibold tracking-tight">
              POV Wizard
            </span>
            <span className="text-sm text-[var(--color-muted)]">
              Van Houten Metaal
            </span>
          </div>
        </header>
        <main className="mx-auto max-w-2xl w-full px-6 py-10 flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
