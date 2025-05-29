'use client';

import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function BlogHeader() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 左侧导航 */}
          <div className="flex items-center space-x-6">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft size={20} />
              <span>返回首页</span>
            </Link>
            
            <Link 
              href="/blog"
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Zephyrise
            </Link>
          </div>

          {/* 右侧操作 */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200">
              <Search size={20} />
            </button>
            
            <Link 
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              关于
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 