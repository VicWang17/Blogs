import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), 'blogs');

export interface Post {
  id: string;
  title: string;
  date: string;
  category: string;
  content?: string;
  excerpt?: string;
  readTime?: number;
  fileName?: string;
}

export function getAllPosts(): Post[] {
  const posts: Post[] = [];
  
  function readDirectory(dir: string, category: string = '') {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && item !== '.git') {
        // 递归读取子目录
        readDirectory(fullPath, item);
      } else if (item.endsWith('.md')) {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        // 从文件名生成标题，去掉.md后缀
        const title = data.title || item.replace('.md', '');
        
        // 从文件系统获取日期，或从frontmatter获取
        const date = data.date || fs.statSync(fullPath).mtime.toISOString().split('T')[0];
        
        // 生成 ID（用于 URL），使用encodeURIComponent处理中文
        const id = `${category}/${encodeURIComponent(item.replace('.md', ''))}`;
        
        // 生成摘要，从内容前150个字符
        const excerpt = content.slice(0, 150).replace(/[#*`\-]/g, '').trim() + '...';
        
        // 估算阅读时间（基于字数，中文按字符计算）
        const readTime = Math.ceil(content.length / 300);
        
        posts.push({
          id,
          title,
          date,
          category: category || '其他',
          excerpt,
          readTime,
          fileName: item
        });
      }
    }
  }
  
  readDirectory(postsDirectory);
  
  // 按日期排序（最新的在前）
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostById(id: string): Promise<Post | null> {
  try {
    // 解码URL编码的ID
    const decodedId = decodeURIComponent(id);
    
    // 从 ID 中解析出目录和文件名
    const parts = decodedId.split('/');
    const category = parts[0];
    const baseFileName = parts.slice(1).join('/');
    const fileName = baseFileName + '.md';
    
    // 首先尝试直接路径
    let fullPath = path.join(postsDirectory, category, fileName);
    
    if (!fs.existsSync(fullPath)) {
      // 如果直接路径不存在，尝试在所有目录中查找
      const foundPath = findFileByName(postsDirectory, fileName, baseFileName);
      if (!foundPath) {
        return null;
      }
      fullPath = foundPath;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // 处理 markdown - 使用更强大的处理管道
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(content);
    
    const title = data.title || baseFileName;
    const date = data.date || fs.statSync(fullPath).mtime.toISOString().split('T')[0];
    const readTime = Math.ceil(content.length / 300);
    
    return {
      id: decodedId,
      title,
      date,
      category,
      content: processedContent.toString(),
      readTime
    };
  } catch (error) {
    console.error('Error reading post:', error);
    return null;
  }
}

function findFileByName(dir: string, fileName: string, baseFileName: string): string | null {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && item !== '.git') {
      const found = findFileByName(fullPath, fileName, baseFileName);
      if (found) return found;
    } else if (item === fileName || item === baseFileName + '.md') {
      return fullPath;
    }
  }
  
  return null;
}

export function getPostsByCategory(category: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.category === category);
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = Array.from(new Set(allPosts.map(post => post.category)));
  return categories.sort();
} 