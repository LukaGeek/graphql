import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className="bg-gray-800">
          <Header />
          {children}
        </body>
      </Providers>
    </html>
  );
}
