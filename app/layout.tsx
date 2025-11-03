import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Management",
  description: "Manage your projects and tasks efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
