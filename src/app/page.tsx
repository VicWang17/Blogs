'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景图片 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')`,
        }}
      >
        {/* 深色蒙层 */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* 粒子动画背景 */}
      <div className="absolute inset-0">
        <div className="particles">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${20 + Math.random() * 20}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* 导航栏 */}
        <nav className="p-6 flex justify-between items-center">
          <div className="text-white font-bold text-xl">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Blog
            </span>
          </div>
          <div className="flex space-x-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors duration-300"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors duration-300"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:your@email.com"
              className="text-white/70 hover:text-white transition-colors duration-300"
            >
              <Mail size={20} />
            </a>
          </div>
        </nav>

        {/* 中心内容 */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 text-center">
          <div className="max-w-4xl">
            {/* 主标题 */}
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Zephyrise
              </span>
              <br />
              <span className="text-white/90">
                溯岚
              </span>
            </h1>

            {/* 副标题 */}
            <p className="text-xl md:text-2xl text-white/80 mb-4 max-w-2xl mx-auto leading-relaxed">
              闪电杰尼的技术随记
            </p>

            {/* 描述 */}
            <p className="text-lg text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed">
              编程是与计算机交流的艺术，每一行代码都有它的故事。
            </p>

            {/* CTA 按钮 */}
            <div className="space-y-6">
              <Link 
                href="/blog"
                className="inline-block group"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-black/80 backdrop-blur-sm px-12 py-4 rounded-full text-white font-semibold text-lg hover:bg-black/60 transition-all duration-300 border border-white/20">
                    进入博客
                  </div>
                </div>
              </Link>

              {/* 滚动提示 */}
              <div className="flex flex-col items-center space-y-2 mt-16">
                <p className="text-white/40 text-sm">探索更多</p>
                <ChevronDown 
                  className="text-white/40 animate-bounce" 
                  size={20} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* 底部统计信息 */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4">
                <div className="text-3xl font-bold text-white mb-2">100+</div>
                <div className="text-white/60 text-sm">技术文章</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-white mb-2">8</div>
                <div className="text-white/60 text-sm">技术领域</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-white mb-2">2024</div>
                <div className="text-white/60 text-sm">开始记录</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-white mb-2">∞</div>
                <div className="text-white/60 text-sm">持续学习</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: float linear infinite;
        }
        
        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
