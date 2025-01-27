import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import ExcludedWrapped from "@/components/ExcludedWrapper";
// import { CardProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/Footer";
import { SearchProvider } from "@/context/SearchContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ignacia",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <FavoritesProvider>
        <AuthProvider>


          <SearchProvider>

          <CartProvider>

            <ExcludedWrapped>
              <Nav/>
            </ExcludedWrapped>

            {children}

            <ExcludedWrapped>
              <Footer/>
            </ExcludedWrapped>

          </CartProvider>
          
          </SearchProvider>
          
          
        </AuthProvider>
          </FavoritesProvider>
        
      </body>
    </html>
  );
}
