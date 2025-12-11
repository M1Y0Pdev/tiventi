import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { CartProvider } from "@/context/CartProvider";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Tiventi - Premium Kadın İç Giyim",
  description: "Tiventi'nin premium iç çamaşırı koleksiyonuyla zarafeti ve konforu keşfedin. Modern kadınlar için tasarlanmış lüks sütyenler, külotlar ve iç giyim ürünleri.",
  keywords: "iç çamaşırı, kadın iç giyim, sütyen, külot, lüks iç çamaşırı, Tiventi",
  openGraph: {
    title: "Tiventi - Premium Kadın İç Giyim",
    description: "Premium iç çamaşırı koleksiyonumuzla zarafeti ve konforu keşfedin",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="tr">
      <body className="antialiased overflow-x-hidden">
        <CartProvider>
          <Navbar user={user} />
          <main className="min-h-screen isolate" style={{ paddingBottom: '64px' }}>
            {children}
          </main>
          <Footer className="hidden lg:block" />
          <MobileBottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
