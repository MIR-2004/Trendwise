import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './providers/AuthProvider';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TrendWise - AI-Powered SEO Blog Platform',
  description: 'Discover trending topics and AI-generated articles with TrendWise. Your ultimate SEO-optimized blog platform.',
  keywords: ['trending topics', 'AI articles', 'SEO blog', 'content marketing', 'digital trends'],
  authors: [{ name: 'TrendWise Team' }],
  openGraph: {
    title: 'TrendWise - AI-Powered SEO Blog Platform',
    description: 'Discover trending topics and AI-generated articles with TrendWise.',
    type: 'website',
    siteName: 'TrendWise',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrendWise - AI-Powered SEO Blog Platform',
    description: 'Discover trending topics and AI-generated articles with TrendWise.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}