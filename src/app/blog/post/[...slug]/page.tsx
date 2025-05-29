import { getPostById, getAllPosts } from '@/lib/posts';
import BlogHeader from '@/components/BlogHeader';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.id.split('/'),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const postId = decodeURIComponent(slug.join('/'));
  const post = await getPostById(postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <BlogHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 返回按钮 */}
          <div className="mb-8">
            <Link 
              href="/blog"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft size={20} className="mr-2" />
              返回文章列表
            </Link>
          </div>

          {/* 文章头部 */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <Tag size={14} className="mr-1" />
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>发布于 {format(new Date(post.date), 'yyyy年MM月dd日')}</span>
              </div>
              
              {post.readTime && (
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>阅读时间 {post.readTime} 分钟</span>
                </div>
              )}
            </div>
          </header>

          {/* 文章内容 */}
          <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div 
              className="prose prose-lg max-w-none p-8 
                prose-headings:text-gray-900 prose-headings:font-bold prose-headings:leading-tight
                prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8 prose-h1:pb-3 prose-h1:border-b prose-h1:border-gray-200
                prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8
                prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
                prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-4
                prose-h5:text-base prose-h5:mb-2 prose-h5:mt-4
                prose-h6:text-sm prose-h6:mb-2 prose-h6:mt-4
                prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-4
                prose-li:text-gray-800 prose-li:leading-relaxed
                prose-a:text-blue-600 prose-a:hover:text-blue-800 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-em:text-gray-700 prose-em:italic
                prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:text-gray-700
                prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
                prose-ul:my-4 prose-ol:my-4
                prose-table:border-collapse prose-table:border prose-table:border-gray-300
                prose-th:border prose-th:border-gray-300 prose-th:bg-gray-50 prose-th:px-4 prose-th:py-2 prose-th:text-gray-900 prose-th:font-semibold
                prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2 prose-td:text-gray-800
                prose-hr:border-gray-200 prose-hr:my-8"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
          </article>

          {/* 页脚导航 */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-center">
              <Link 
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <ArrowLeft size={20} className="mr-2" />
                返回博客首页
              </Link>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
} 