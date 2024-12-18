import ClientSideProviders from '@/context/ClientSideProviders';
import { Poppins as PoppinsFont } from 'next/font/google';
import './global.scss';

const poppins = PoppinsFont({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // Include all weights
  subsets: ['latin'], // Specify subsets
  display: 'swap', // Use the "swap" display strategy
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ClientSideProviders>{children}</ClientSideProviders>
      </body>
    </html>
  );
}
