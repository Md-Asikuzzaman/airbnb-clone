import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import ToasterProvider from './providers/ToasterProvider';
import Navbar from './components/navbar/Navbar';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import RentModal from './components/modals/RentModal';

import getCurrentUser from './actions/getCurrentUser';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airbnb Clone',
  description: 'Made with Nextjs-13, MongoDB, Prisma, TailwindCSS',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <ToasterProvider />
        <RentModal />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
