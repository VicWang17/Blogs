import BlogHeader from '@/components/BlogHeader';
import { Github, Linkedin, Mail, MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <BlogHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              关于我
            </h1>
            <p className="text-xl text-gray-600">
              热爱编程在这个时代是少数派。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 个人信息卡片 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden relative">
                  <Image 
                    src="https://avatars.githubusercontent.com/u/44319845?v=4" 
                    alt="闪电杰尼的头像"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-2">闪电杰尼</h2>
                <p className="text-gray-600 mb-4">Full Stack Developer</p>
                
                <div className="flex justify-center space-x-4 mb-6">
                  <a 
                    href="https://github.com/vicwang17/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
                  >
                    <Github size={20} className="text-gray-700" />
                  </a>
                  <a 
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
                  >
                    <Linkedin size={20} className="text-gray-700" />
                  </a>
                  <a 
                    href="mailto:your@email.com"
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
                  >
                    <Mail size={20} className="text-gray-700" />
                  </a>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-center">
                    <MapPin size={16} className="mr-2" />
                    <span>中国</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Calendar size={16} className="mr-2" />
                    <span>开发经验 3+ 年</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 主要内容 */}
            <div className="lg:col-span-2 space-y-8">
              {/* 个人介绍 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">个人介绍</h3>
                <div className="prose prose-lg">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    你好！我是一名热爱编程的开发者，专注于全栈开发和技术分享。
                    我相信技术的力量能够改变世界，也相信每一行代码都应该有它存在的意义。
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    在这个博客中，我会分享我的编程经验、学习心得，以及对技术的思考。
                    从算法到前端，从后端到数据库，我希望能够记录下学习路上的点点滴滴，
                    也希望能够帮助到同样在编程路上前行的朋友们。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    除了技术之外，我也会分享一些编程之外的思考和感悟。
                    毕竟，程序员也是人，也有着丰富的情感和思想。
                  </p>
                </div>
              </div>

              {/* 技术栈 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">技术栈</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Node.js',
                    'Python', 'Java', 'C++', 'SQL', 'MongoDB', 'Git'
                  ].map((tech) => (
                    <div 
                      key={tech}
                      className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-center font-medium"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              {/* 联系方式 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">联系我</h3>
                <p className="text-gray-700 mb-4">
                  如果你对我的文章有任何疑问，或者想要交流技术问题，欢迎随时联系我：
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail size={18} className="mr-3 text-gray-500" />
                    <a href="mailto:your@email.com" className="text-blue-600 hover:text-blue-700">
                      your@email.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Github size={18} className="mr-3 text-gray-500" />
                    <a 
                      href="https://github.com/vicwang17/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      GitHub Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 