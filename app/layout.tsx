import type { Metadata } from 'next';
import './globals.css';
import Background from '@/components/Background';
import { Theme } from '@radix-ui/themes';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme>
          {children}
          <Background />
        </Theme>
      </body>
    </html>
  );
}
