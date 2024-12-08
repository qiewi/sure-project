import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { FloatingNav } from "../../components/layout/FloatingNavbar";
import { navItems } from "@/../data/landing";
import Footer from "../../components/layout/Footer";

export const metadata: Metadata = {
  title: "SURE: by Qie",
  description: "Smart University Recommendation Engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add the Poppins font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <FloatingNav navItems={navItems}/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
