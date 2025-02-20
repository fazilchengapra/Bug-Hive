'use client'
import "@radix-ui/themes/styles.css";
import "@/app/theme-config.css";
// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import { Container, Theme } from "@radix-ui/themes";
import Provider from "./auth/Provider";
import QueryClientProvider from "./QueryClientProvider";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Bug-Hiva",
//   description: "is a bug related webapp",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [theme, setTheme] =  useState<"light"|"dark">("light")

  useEffect(()=> {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" || "light"
    setTheme(savedTheme)
  },[])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider>
          <Provider>
            <Theme accentColor="purple" appearance={theme}>
              <Navbar toggleTheme={toggleTheme} theme={theme}/>
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
