import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Eye, Heart, Share2, MessageCircle, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import SEOHead from '../components/SEOHead';
import CommentSection from '../components/CommentSection';
import { mockArticles } from '../data/mockData';
import type { Article } from '../types';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find article by slug (simplified - in real app, this would be an API call)
      const foundArticle = mockArticles.find(a => 
        a.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug
      );
      
      if (foundArticle) {
        setArticle(foundArticle);
      }
      setIsLoading(false);
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // In a real app, this would make an API call
  };

  const handleShare = async () => {
    if (navigator.share && article) {
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

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-8 rounded mb-4 w-1/4"></div>
          <div className="bg-gray-300 h-12 rounded mb-6"></div>
          <div className="bg-gray-300 h-64 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="bg-gray-300 h-4 rounded"></div>
            <div className="bg-gray-300 h-4 rounded w-5/6"></div>
            <div className="bg-gray-300 h-4 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      image: article.author.avatar
    },
    publisher: {
      '@type': 'Organization',
      name: 'TrendWise',
      logo: {
        '@type': 'ImageObject',
        url: 'https://trendwise.com/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': window.location.href
    }
  };

  return (
    <>
      <SEOHead
        title={article.seo.metaTitle}
        description={article.seo.metaDescription}
        keywords={article.seo.keywords}
        image={article.image}
        type="article"
        structuredData={structuredData}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Articles</span>
        </button>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
            {article.trending && (
              <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">
                Trending
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <div className="font-medium text-gray-900">{article.author.name}</div>
                <div className="text-sm text-gray-500">
                  {format(new Date(article.publishedAt), 'MMMM dd, yyyy')} • {article.readTime} min read
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-gray-500">
                <Eye className="h-4 w-4" />
                <span className="text-sm">{article.views.toLocaleString()}</span>
              </div>
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isLiked ? 'text-red-600 bg-red-50' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm">{article.likes + (isLiked ? 1 : 0)}</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center space-x-1 text-gray-500 hover:text-primary-600 px-3 py-2 rounded-lg hover:bg-primary-50 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
        </header>

        {/* Article Image */}
        <div className="mb-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Comments Section */}
        <CommentSection articleId={article.id} />
      </article>
    </>
  );
};

export default ArticlePage;