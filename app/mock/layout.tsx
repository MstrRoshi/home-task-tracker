import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { MockSessionProvider } from "../../src/providers/MockSessionProvider";
import { SocketProvider } from "../../src/providers/SocketProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Household Task Tracker (Mock Auth)",
  description: "A mobile-optimized application for tracking household tasks with mock authentication.",
};

export default function MockLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className={inter.className}>
        <MockSessionProvider>
          <SocketProvider>
            {children}
          </SocketProvider>
        </MockSessionProvider>
      </body>
    </html>
  );
} 