import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    url: "https://x402-proxy.vercel.app",
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
  metadataBase: new URL("https://x402-proxy.vercel.app"),
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <QueryProvider>
          <ToastProvider>{children}</ToastProvider>
        </QueryProvider>
        {/* <BottomNav /> */}
      </body>
    </html>
  );
}
