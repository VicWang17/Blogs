# Zephyrise - 大气程序员博客

一个现代化、大气的程序员个人博客，支持 Markdown 文件渲染，具有精美的设计和流畅的用户体验。

## ✨ 特性

- **🎨 大气设计**: 采用现代化设计语言，全屏首页展示
- **📝 Markdown 支持**: 完整支持 Markdown 渲染，包括代码高亮
- **🏷️ 分类管理**: 自动识别文章分类，支持分类浏览
- **📱 响应式设计**: 完美适配各种设备
- **⚡ 高性能**: 基于 Next.js 13+ App Router，优化的构建和加载速度
- **🎯 SEO 友好**: 自动生成 meta 标签，利于搜索引擎收录

## 🚀 技术栈

- **框架**: Next.js 13+ (App Router)
- **样式**: Tailwind CSS + @tailwindcss/typography
- **Markdown 处理**: gray-matter + remark + remark-html
- **图标**: Lucide React
- **字体**: Geist Sans & Geist Mono
- **部署**: 支持 Vercel、Netlify 等平台

## 📁 项目结构

```
blog-website/
├── src/
│   ├── app/
│   │   ├── page.tsx              # 首页
│   │   ├── blog/
│   │   │   ├── page.tsx          # 博客列表页
│   │   │   └── post/[...slug]/
│   │   │       └── page.tsx      # 文章详情页
│   │   ├── about/
│   │   │   └── page.tsx          # 关于页面
│   │   └── globals.css           # 全局样式
│   ├── components/
│   │   ├── BlogHeader.tsx        # 博客头部导航
│   │   └── BlogList.tsx          # 文章列表组件
│   └── lib/
│       └── posts.ts              # 文章处理工具函数
├── content/                      # Markdown 文件目录（符号链接到 ../Blogs）
└── public/                       # 静态资源
```

## 🛠️ 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置内容目录

项目通过符号链接的方式关联 Blogs 文件夹：

```bash
# 如果 content 链接不存在，创建链接
ln -s ../Blogs ./content
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看博客。

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 📝 Markdown 文件格式

### 基本格式

```markdown
---
title: 文章标题
date: 2024-07-30
categories: [技术, 教程]
tags: [JavaScript, React]
summary: 文章摘要（可选）
---

# 文章内容

这里是文章的正文内容...
```

### Frontmatter 字段说明

- `title`: 文章标题（可选，默认使用文件名）
- `date`: 发布日期（可选，默认使用文件修改时间）
- `categories`: 分类数组
- `tags`: 标签数组
- `summary`: 文章摘要（可选，默认自动截取）

### 目录结构

博客支持多级目录结构，会自动识别文件夹作为分类：

```
Blogs/
├── 前端/
│   ├── React入门.md
│   └── Vue实战.md
├── 后端/
│   ├── Node.js教程.md
│   └── 数据库设计.md
└── 算法/
    ├── 排序算法.md
    └── 动态规划.md
```

## 🎨 自定义配置

### 修改首页内容

编辑 `src/app/page.tsx` 文件：

- 修改博客名称和 Slogan
- 更换背景图片（推荐使用 Unsplash）
- 调整统计数据
- 修改社交媒体链接

### 修改样式

- **全局样式**: 编辑 `src/app/globals.css`
- **代码高亮**: 修改 `globals.css` 中的 token 颜色
- **主题色**: 修改 Tailwind 配置中的颜色定义

### 添加新页面

1. 在 `src/app/` 下创建新目录
2. 添加 `page.tsx` 文件
3. 在导航组件中添加链接

## 🚀 部署

### Vercel 部署

1. 将项目推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置构建命令：`npm run build`
4. 部署完成

### Netlify 部署

1. 将项目推送到 GitHub
2. 在 Netlify 中连接仓库
3. 配置构建设置：
   - Build command: `npm run build`
   - Publish directory: `out`
4. 部署完成

## 📚 使用指南

### 添加新文章

1. 在对应分类文件夹中创建 `.md` 文件
2. 添加必要的 frontmatter
3. 编写文章内容
4. 重新构建项目

### 管理分类

- 分类会根据文件夹结构自动生成
- 修改文件夹名称即可修改分类名称
- 支持多级分类嵌套

### 图片管理

1. 将图片放入 `public/images/` 目录
2. 在 Markdown 中使用相对路径引用：`![图片描述](/images/图片名.jpg)`

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。

---

**享受写作的乐趣！** ✨
