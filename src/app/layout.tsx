import '@/styles/globals.css';
import type { Metadata } from 'next';
import { clsx } from 'clsx';
import localFont from 'next/font/local';

import { Noto_Sans_KR } from 'next/font/google';

const pretendard = localFont({
  src: '../../public/font/PretendardVariable.woff2',
});

const notoSansKR = Noto_Sans_KR({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '정각',
  description: 'riiid frontend test',
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body
        className={clsx(
          notoSansKR.className,
          'bg-background-white overflow-hidden'
        )}>
        {children}
      </body>
    </html>
  );
}
