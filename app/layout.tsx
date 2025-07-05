import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Veerendra Nadh | Full-Stack Developer & ML Enthusiast",
  description:
    "I'm Veerendra Nadh, a final-year B.Tech CSE student passionate about full-stack development, machine learning, and building impactful tech. Explore my work and connect with me!",
  authors: [
    { name: "Veerendra Nadh", url: "https://www.linkedin.com/in/vallepu-veerendranadh" }
  ],
  creator: "Veerendra Nadh",
  metadataBase: new URL("https://github.com/Vnadh"),
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
        {children}
      </body>
    </html>
  );
}
