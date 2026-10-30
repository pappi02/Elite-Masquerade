import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Manrope } from "next/font/google";
import { ConciergeProvider } from "@/components/concierge/concierge";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { site } from "@/lib/site";
import "./globals.css";

const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"], weight: ["400", "500", "600"] });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.short}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: "A private gentlemen's masquerade society in Lavington, Nairobi. Every weekend, a new theme.",
    siteName: site.name,
    url: "/",
    type: "website",
    locale: "en_KE",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#070605",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-KE" data-scroll-behavior="smooth" className={`${cinzel.variable} ${cormorant.variable} ${manrope.variable} antialiased`}>
      <body className="min-h-svh">
        <ConciergeProvider>
          <Header />
          {children}
          <Footer />
        </ConciergeProvider>
      </body>
    </html>
  );
}
