import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flow, Strength & Balance | Fitness Blog',
  description: 'Expert fitness advice, wellness tips, and inspiration for a healthier lifestyle. Learn about yoga, aqua fitness, dance, senior fitness, and more.',
  keywords: 'fitness blog, wellness tips, yoga, aqua fitness, dance fit, senior fitness, health advice',
  openGraph: {
    title: 'Flow, Strength & Balance | Fitness Blog',
    description: 'Expert fitness advice, wellness tips, and inspiration for a healthier lifestyle.',
    type: 'website',
    url: 'https://yoursite.com/blog',
    images: [
      {
        url: '/images/blog-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Flow, Strength & Balance Blog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flow, Strength & Balance | Fitness Blog',
    description: 'Expert fitness advice, wellness tips, and inspiration for a healthier lifestyle.',
    images: ['/images/blog-og.jpg']
  }
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      {children}
    </div>
  );
} 