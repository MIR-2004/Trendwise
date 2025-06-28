import { NextRequest, NextResponse } from 'next/server';
import { getArticles } from '../../lib/articles';

export async function GET(request: NextRequest) {
  try {
    const articles = await getArticles();
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real app, you would:
    // 1. Validate the request body
    // 2. Check authentication/authorization
    // 3. Save to database
    // 4. Return the created article
    
    const newArticle = {
      id: Date.now().toString(),
      ...body,
      publishedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      comments: [],
    };

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}