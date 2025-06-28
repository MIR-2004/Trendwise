import React, { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import SEOHead from '../components/SEOHead';
import { mockArticles } from '../data/mockData';
import type { Article } from '../types';

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchArticles = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setArticles(mockArticles);
      setIsLoading(false);
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const trendingArticles = filteredArticles.filter(article => article.trending);
  const regularArticles = filteredArticles.filter(article => !article.trending);

  const categories = ['all', ...new Set(articles.map(article => article.category.toLowerCase()))];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TrendWise',
    description: 'Discover trending topics and AI-generated articles with TrendWise',
    url: 'https://trendwise.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://trendwise.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      <SEOHead
        title="TrendWise - AI-Powered SEO Blog Platform"
        description="Discover trending topics and AI-generated articles with TrendWise. Your ultimate SEO-optimized blog platform for staying ahead of digital trends."
        keywords={['trending topics', 'AI articles', 'SEO blog', 'content marketing', 'digital trends']}
        structuredData={structuredData}
      />

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
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-300 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 h-4 rounded mb-4 w-3/4"></div>
                <div className="bg-gray-300 h-3 rounded mb-2"></div>
                <div className="bg-gray-300 h-3 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {selectedCategory === 'all' ? 'Latest Articles' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Articles`}
              </h2>
              
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
                  <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;