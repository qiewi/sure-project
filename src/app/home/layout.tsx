import type { Metadata } from "next";
import Footer from "../../components/layout/Footer";

export const metadata: Metadata = {
  title: "SURE: by Qie",
  description: "Smart University Recommendation Engine",
};

export default function homeLayout({
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
        <Footer />
      </body>
    </html>
  );
}
