import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import React from "react";
import { LayoutContent } from "./layout-content";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paylaş",
  description: "Paylaşmağın ən asan yolu",
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="az" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="theme-color" content="#3B82F6" />
        <meta
          name="keywords"
          content="geyim kirayəsi, kirayə paltar, paltar icarəsi Bakıda, online geyim kirayəsi, paylaş platforması, payla.az, Bakıda paltar kirayəsi, ucuz geyim kirayəsi, gəlinlik kirayəsi, kişi kostyumu kirayəsi, qadın geyimi kirayəsi, aksesuar kirayəsi"
        />
        <meta
          name="description"
          content="Payla.az - Bakıda geyim və aksesuarların online kirayəsi. Geyim kirayəsi, paltar icarəsi, gəlinlik, kişi kostyumu, qadın geyimi və daha çoxunu rahatlıqla tap və paylaş!"
        />
        <link rel="canonical" href="https://payla.az/" />
        <meta
          property="og:title"
          content="Payla.az - Geyim və Aksesuarların Online Kirayəsi"
        />
        <meta
          property="og:description"
          content="Bakıda geyim və aksesuarların kirayəsi üçün ən rahat online platforma. Geyimlərini paylaş, əlavə gəlir qazan!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://payla.az/" />
        <meta property="og:image" content="/og-image.webp" />
        <meta property="og:locale" content="az_AZ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Payla.az - Geyim və Aksesuarların Online Kirayəsi"
        />
        <meta
          name="twitter:description"
          content="Bakıda geyim və aksesuarların kirayəsi üçün ən rahat online platforma. Geyimlərini paylaş, əlavə gəlir qazan!"
        />
        <meta name="twitter:image" content="/og-image.webp" />
        <link rel="icon" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
        {gaId && process.env.NODE_ENV === "production" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={cn(inter.className, "min-h-screen bg-[#f9fafb] antialiased")}
      >
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}

// JSON-LD LocalBusiness schema
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Payla.az",
  image: "https://payla.az/og-image.webp",
  "@id": "https://payla.az/",
  url: "https://payla.az/",
  telephone: "+994705157450",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bakı",
    addressCountry: "AZ",
  },
  description:
    "Bakıda geyim və aksesuarların online kirayəsi. Geyim kirayəsi, paltar icarəsi, gəlinlik, kişi kostyumu, qadın geyimi və daha çoxunu rahatlıqla tap və paylaş!",
  priceRange: "AZN",
  openingHours: "Mo-Su 10:00-20:00",
  sameAs: ["https://www.instagram.com/payla.az/"],
};

// JSON-LD Product schema (nümunə üçün gəlinlik)
const productJsonLd = {
  "@context": "https://schema.org/",
  "@type": "Product",
  name: "Gəlinlik kirayəsi Bakıda",
  image: [
    "https://payla.az/images/wedding-dress-1.webp",
    "https://payla.az/images/wedding-dress-2.webp",
  ],
  description:
    "Bakıda gəlinlik kirayəsi - Payla.az platformasında müxtəlif ölçü və modellərdə gəlinlikləri sərfəli qiymətlərlə kirayə götür!",
  brand: {
    "@type": "Brand",
    name: "Payla.az",
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "AZN",
    price: "50",
    availability: "https://schema.org/InStock",
    url: "https://payla.az/listings/wedding-dresses",
  },
};
