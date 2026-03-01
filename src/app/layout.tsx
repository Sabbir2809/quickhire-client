import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";

// Google font (for body)
const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

// Local font (for headings)
const clashDisplay = localFont({
  src: [
    { path: "./fonts/ClashDisplay-Regular.otf", weight: "400" },
    { path: "./fonts/ClashDisplay-Medium.otf", weight: "500" },
    { path: "./fonts/ClashDisplay-SemiBold.otf", weight: "600" },
    { path: "./fonts/ClashDisplay-Bold.otf", weight: "700" },
  ],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QuickHire - Find Your Dream Job",
  description: "Great platform for job seekers passionate about startups.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${epilogue.variable} ${clashDisplay.variable}`}>
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
