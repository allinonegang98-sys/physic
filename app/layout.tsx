import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <--- THIS IS THE MISSING LINE THAT FIXES YOUR STYLES

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amit Saxena Physics Institute",
  description: "Best Physics Coaching in Ujjain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> 
      <body className={`${inter.className} bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
        {children}
      </body>
    </html>
  );
}