import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "sonner";

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
        {children}
        <Toaster richColors/>
      </body>
  
    </html>
  );
}
