import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ReactQueryProvider from "./components/providers/ReactQueryProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "@/actions/getCurrentUser";
import "./globals.css";
import RentModal from "./components/modals/RentModal";

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
        <ReactQueryProvider>
          <Navbar currentUser={currentUser} />
          <RentModal />
          <RegisterModal />
          <LoginModal />
          <div className="pb-20 pt-28">{children}</div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
