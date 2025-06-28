'use client';

import { Share2 } from 'lucide-react';
import type { Article } from '../types';

interface ShareButtonProps {
  article: Article;
}

export default function ShareButton({ article }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center space-x-1 text-gray-500 hover:text-primary-600 px-3 py-2 rounded-lg hover:bg-primary-50 transition-colors"
    >
      <Share2 className="h-4 w-4" />
      <span className="text-sm">Share</span>
    </button>
  );
}