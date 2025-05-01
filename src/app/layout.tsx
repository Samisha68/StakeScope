import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; // Assuming providers is in src/providers
import { Navbar } from "@/components/ui/navbar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StakeScope - Solana Staking Dashboard",
  description: "Monitor and analyze Solana staking metrics in real-time",
  keywords: ["Solana", "Staking", "Dashboard", "Blockchain", "Crypto", "Web3"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <main className="w-full px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
