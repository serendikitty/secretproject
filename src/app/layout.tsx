import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scent & Soul | Know your scent, know yourself",
  description: "Ensiklopedia dan komunitas parfum lokal Indonesia dengan pendekatan genderless dan kurasi berbasis occasion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="bg-stone-50 text-stone-900 font-sans antialiased selection:bg-stone-900 selection:text-stone-50">
        {children}
      </body>
    </html>
  );
}
