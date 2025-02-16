import "@radix-ui/themes/styles.css";
import "@/app/theme-config.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import { Container, Theme } from "@radix-ui/themes";
import Provider from "./auth/Provider";
import QueryClientProvider from "./QueryClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bug-Hiva",
  description: "is a bug related webapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider>
          <Provider>
            <Theme accentColor="purple">
              <Navbar />
              <Container>
                <main className="p-5">{children}</main>
              </Container>
            </Theme>
          </Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
