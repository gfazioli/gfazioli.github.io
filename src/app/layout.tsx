import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from "@mantine/core";
import { CFAnalytics } from "@/components/CFAnalytics";
import { ConsoleBranding } from "@/components/ConsoleBranding";
import { KonamiOverlay } from "@/components/KonamiOverlay";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const theme = createTheme({
  primaryColor: "orange",
  fontFamily: "var(--font-geist-sans)",
  fontFamilyMonospace: "var(--font-geist-mono)",
  defaultRadius: "md",
  headings: {
    fontFamily: "var(--font-geist-sans)",
    fontWeight: "700",
  },
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gfazioli.github.io"),
  title: {
    default: "Undolog — open source studio",
    template: "%s · Undolog",
  },
  description:
    "Undolog: React components, Mantine extensions, WordPress plugins, macOS apps and CLI tools — mostly open source.",
  openGraph: {
    siteName: "Undolog",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@gfazioli",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      {...mantineHtmlProps}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <CFAnalytics />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <ConsoleBranding />
          <KonamiOverlay />
          <div className="min-h-screen flex flex-col">{children}</div>
        </MantineProvider>
      </body>
    </html>
  );
}
