import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Login - Smart University Recommendation Engine",
  description: "Login to access SURE",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body  className="flex items-center justify-center h-screen bg-gray-100 text-gray-900">
        <main className="login-layout">{children}</main>
      </body>
    </html>
  );
}
