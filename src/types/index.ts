export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number;
  tags: string[];
  category: string;
  image: string;
  trending: boolean;
  views: number;
  likes: number;
  comments: Comment[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export interface Comment {
  id: string;
  articleId: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  replies: Comment[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface TrendingTopic {
  id: string;
  topic: string;
  platform: 'google' | 'twitter';
  volume: number;
  growth: number;
  region: string;
  timestamp: string;
}