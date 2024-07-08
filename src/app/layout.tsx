import { Metadata } from "next";
import { Inter } from "next/font/google";

import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import Providers from "./components/providers/Providers";

import "./globals.css";

import getCurrentUser from "@/actions/getCurrentUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description: "airbnb clone - by developer asik",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <Navbar currentUser={currentUser} />
          <RentModal />
          <RegisterModal />
          <LoginModal />
          <div className="pb-20 pt-28">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
