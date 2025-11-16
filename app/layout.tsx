import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Providers from './providers';
import CartDrawer from '@/app/components/Cart/CartDrawer';
import Navbar from "./components/Navbar/Navbar";
import "./globals.css";

const fontPoppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "Açaí da Casa",
  description: "O melhor açaí da cidade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${fontPoppins.variable} antialiased`}>
        <Providers>
          <Navbar></Navbar>
          <main>{children}</main>
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
