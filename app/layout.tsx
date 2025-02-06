import { Providers } from '@/app/app/providers';
import '@/app/globals.css';

export const metadata = {
  title: 'Todo App',
  description: 'Todo application built with Next.js and Redux Toolkit',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}