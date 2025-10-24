import type { Metadata } from "next";
import { Geist, Geist_Mono, Exo_2 } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import QueryProvider from "@/components/providers/QueryProvider";
// import BottomNav from "@/components/common/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const exo2 = Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "x402 Proxy",
  description: "Temporarily setup paywalls for any API. Monetize your public endpoints with x402 Proxy.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "x402 Proxy",
    description: "Temporarily setup paywalls for any API. Monetize your public endpoints with x402 Proxy.",
    url: "https://0xtheplug.xyz",
    siteName: "x402 Proxy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "x402 Proxy - Setup paywalls for any API",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "x402 Proxy",
    description: "Temporarily setup paywalls for any API. Monetize your public endpoints with x402 Proxy.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://0xtheplug.xyz"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${exo2.variable} antialiased min-h-screen`}>
        <QueryProvider>
          <ToastProvider>{children}</ToastProvider>
        </QueryProvider>
        {/* <BottomNav /> */}
      </body>
    </html>
  );
}
