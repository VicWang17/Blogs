'use client';

import Link from 'next/link';
import { Calendar, Clock, Tag } from 'lucide-react';
import { Post } from '@/lib/posts';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [animatedPosts, setAnimatedPosts] = useState<string[]>([]);

  useEffect(() => {
    // 延迟显示每个文章卡片，创建渐入效果
    const timeouts: NodeJS.Timeout[] = [];
    
    posts.forEach((post, index) => {
      const timeout = setTimeout(() => {
        setAnimatedPosts(prev => [...prev, post.id]);
      }, index * 100);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [posts]);

  useEffect(() => {
    // 当posts改变时，重置动画状态
    setAnimatedPosts([]);
  }, [posts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <article 
          key={post.id}
          className={`group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-2 ${
            animatedPosts.includes(post.id) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ 
            transitionDelay: animatedPosts.includes(post.id) ? '0ms' : `${index * 100}ms`
          }}
        >
          <Link href={`/blog/post/${encodeURIComponent(post.id)}`}>
            <div className="p-6 relative">
              {/* 背景渐变效果 */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                {/* 分类标签 */}
                <div className="mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 group-hover:bg-blue-200 transition-colors duration-200">
                    <Tag size={12} className="mr-1" />
                    {post.category}
                  </span>
                </div>

                {/* 文章标题 */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h2>

                {/* 文章摘要 */}
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed group-hover:text-gray-700 transition-colors duration-200">
                  {post.excerpt}
                </p>

                {/* 元信息 */}
                <div className="flex items-center justify-between text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>{format(new Date(post.date), 'yyyy-MM-dd')}</span>
                    </div>
                    
                    {post.readTime && (
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{post.readTime} 分钟</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 底部装饰线 */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </Link>
        </article>
      ))}
    </div>
  );
} 