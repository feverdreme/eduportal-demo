import NavBar from "@/components/NavBar";
import UserContextProvider, { UserContext } from "@/contexts/UserContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SAS Learning",
  description: "Ex ea cillum proident est eu enim et.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          <NavBar />
          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
