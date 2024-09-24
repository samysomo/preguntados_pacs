// app/layout.tsx
import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexSerif = IBM_Plex_Serif({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-ibm-plex-serif" });

export const metadata: Metadata = {
  title: "Preguntados_Pacs",
  description: "Multiplayer question game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>
        <div className="bg-gradient-to-r from-[#300d66] to-[#fc466b] min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}