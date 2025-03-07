import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "../src/providers/SessionProvider";
import { SocketProvider } from "../src/providers/SocketProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Household Task Tracker",
  description: "A mobile-optimized application for tracking household tasks with daily, weekly, and monthly views.",
};

export default function RootLayout({
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
        <SessionProvider>
          <SocketProvider>
            {children}
          </SocketProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
