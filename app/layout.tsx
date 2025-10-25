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
  title: "0xtheplug.xyz",
  description: "Your favorite agents favorite plug. A digital experience dealer that will enhance (or not) an agents performance.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "0xtheplug.xyz",
    description: "Your favorite agents favorite plug. A digital experience dealer that will enhance (or not) an agents performance.",
    url: "https://0xtheplug.xyz",
    siteName: "0xtheplug.xyz",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "0xtheplug.xyz - Your favorite agents favorite plug",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "0xtheplug.xyz",
    description: "Your favorite agents favorite plug. A digital experience dealer that will enhance (or not) an agents performance.",
    images: ["/og-image.webp"],
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
