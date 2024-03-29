import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | z1g Project",
    default: "z1g Project",
  },
  description: "The Next.js framework for building documentation sites",
  metadataBase:
    process.env.NODE_ENV === "development"
      ? new URL(process.env.LOCAL_URL ?? "http://localhost:3000")
      : new URL(`https://z1g-project.vercel.app`),
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body>
        <RootProvider>
          <Toaster />
          {children}
        </RootProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
