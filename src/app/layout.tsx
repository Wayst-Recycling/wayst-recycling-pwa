import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth/next';
import * as React from 'react';

import '@/styles/globals.css';

import Providers from '@/components/providers/providers';

import { appMaxWidth } from '@/app/_utils/helpers';
import { authOptions } from '@/auth';
import { siteConfig } from '@/constant/config';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon/apple-touch-icon-180x180.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
  },
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html className={`${inter.className}`}>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, maximum-scale=1'
      />
      <body style={{ maxWidth: appMaxWidth }} className='mx-auto'>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
