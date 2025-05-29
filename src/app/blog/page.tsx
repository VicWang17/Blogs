'use client';

import BlogList from '@/components/BlogList';
import BlogHeader from '@/components/BlogHeader';
import { useState, useEffect } from 'react';
import type { Post } from '@/lib/posts';

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 从API获取所有文章和分类
    const fetchData = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        setPosts(data.posts);
        setCategories(data.categories);
        setFilteredPosts(data.posts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('加载文章失败，请刷新页面重试');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // 根据选中的分类筛选文章
    if (selectedCategory === '全部') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => post.category === selectedCategory);
      setFilteredPosts(filtered);
    }
  }, [selectedCategory, posts]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <BlogHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">加载中...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <BlogHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-20">
              <div className="text-red-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">加载失败</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                重新加载
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <BlogHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              技术博客
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              分享编程经验，探索技术前沿，记录学习成长的点点滴滴
            </p>
          </div>

          {/* 分类筛选 */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <button 
                onClick={() => handleCategoryClick('全部')}
                className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === '全部'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700'
                }`}
              >
                全部 ({posts.length})
              </button>
              {categories.map((category) => {
                const categoryPostCount = posts.filter(post => post.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700'
                    }`}
                  >
                    {category} ({categoryPostCount})
                  </button>
                );
              })}
            </div>
          </div>

          {/* 当前分类信息 */}
          <div className="mb-6 text-center">
            <p className="text-gray-600 transition-all duration-300">
              {selectedCategory === '全部' 
                ? `共 ${filteredPosts.length} 篇文章` 
                : `${selectedCategory} 分类下共 ${filteredPosts.length} 篇文章`
              }
            </p>
          </div>

          {/* 文章列表 */}
          <div className="transition-all duration-500 ease-in-out">
            {filteredPosts.length > 0 ? (
              <BlogList posts={filteredPosts} />
            ) : (
              <div className="text-center py-20 transition-all duration-300">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">暂无文章</h3>
                <p className="text-gray-600">
                  {selectedCategory === '全部' 
                    ? '还没有发布任何文章' 
                    : `${selectedCategory} 分类下暂无文章`
                  }
                </p>
                <button
                  onClick={() => handleCategoryClick('全部')}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  查看所有文章
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 