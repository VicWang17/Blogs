import { getAllPosts, getAllCategories } from '@/lib/posts';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = 3600; // 每小时重新生成一次

export async function GET() {
  try {
    const posts = getAllPosts();
    const categories = getAllCategories();
    
    return NextResponse.json({
      posts,
      categories
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
} 