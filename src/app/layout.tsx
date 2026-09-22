import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ImpactSG Electronics",
  description: "A second-hand electronics marketplace demo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="border-t border-slate-200 bg-white px-4 py-5 sm:px-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 text-sm text-slate-600">
            <span>ImpactSG Electronics</span>
            <a href="/notes" className="font-semibold text-teal-700 hover:text-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2">Notes</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
