import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import RegisterModal from './components/modals/RegisterModal';
import Navbar from './components/navbar/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airbnb Clone',
  description: 'Made with Nextjs-13, MongoDB, Prisma, TailwindCSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true} className={inter.className}>
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
