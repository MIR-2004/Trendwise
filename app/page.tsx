import { Suspense } from 'react';
import { Search, Filter, TrendingUp } from 'lucide-react';
import ArticleCard from './components/ArticleCard';
import SearchAndFilter from './components/SearchAndFilter';
import { getArticles } from './lib/articles';
import type { Article } from './types';

export const metadata = {
  title: 'TrendWise - AI-Powered SEO Blog Platform',
  description: 'Discover trending topics and AI-generated articles with TrendWise. Your ultimate SEO-optimized blog platform for staying ahead of digital trends.',
  openGraph: {
    title: 'TrendWise - AI-Powered SEO Blog Platform',
    description: 'Discover trending topics and AI-generated articles with TrendWise.',
    type: 'website',
  },
};

function ArticleGrid({ articles }: { articles: Article[] }) {
  const trendingArticles = articles.filter(article => article.trending);
  const regularArticles = articles.filter(article => !article.trending);

  return (
    <>
      {/* Trending Articles */}
      {trendingArticles.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="h-6 w-6 text-accent-500" />
            <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* All Articles */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
        {regularArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Check back soon for new content.</p>
          </div>
        )}
      </section>
    </>
  );
}

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Discover What's
          <span className="text-primary-600 ml-3">Trending</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Stay ahead of the curve with AI-generated articles on the latest trends, 
          insights, and innovations shaping our world.
        </p>
        
        <SearchAndFilter />
      </div>

      <Suspense fallback={<div className="text-center">Loading articles...</div>}>
        <ArticleGrid articles={articles} />
      </Suspense>
    </div>
  );
}