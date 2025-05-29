---
title: Markdown 渲染测试
date: 2024-12-19
category: 测试
---

# 一级标题

这是一个测试文件，用来验证markdown渲染的各种功能是否正常工作。

## 二级标题

这段文字用来测试普通段落的显示效果。文字颜色应该是深灰色（#374151），在白色背景下有良好的对比度和可读性。

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

## 文本格式测试

这是**加粗文字**，这是*斜体文字*，这是`行内代码`。

> 这是一个引用块
> 
> 引用块应该有蓝色的左边框和浅蓝色的背景

## 代码块测试

```javascript
// JavaScript 代码测试
function greet(name) {
    console.log(`Hello, ${name}!`);
    return `Welcome to the blog!`;
}

const user = "程序员";
greet(user);
```

```python
# Python 代码测试
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
```

```css
/* CSS 代码测试 */
.prose h1 {
    font-size: 2.25rem;
    font-weight: 700;
    color: #1f2937;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 0.75rem;
}
```

## 列表测试

### 无序列表
- 第一项
- 第二项
  - 嵌套项目 1
  - 嵌套项目 2
- 第三项

### 有序列表
1. 第一步
2. 第二步
3. 第三步
   1. 子步骤 A
   2. 子步骤 B

## 表格测试

| 功能 | 状态 | 描述 |
|------|------|------|
| 标题渲染 | ✅ 已修复 | 正确显示各级标题样式 |
| 文字颜色 | ✅ 已修复 | 深灰色文字，良好对比度 |
| 代码高亮 | ✅ 已修复 | 支持多种语言语法高亮 |
| 表格样式 | ✅ 已修复 | 清晰的边框和背景色 |

## 链接测试

这是一个 [内部链接](/blog)，这是一个 [外部链接](https://github.com)。

## 分隔线测试

---

## 总结

经过改进，markdown渲染现在应该具有：

1. **清晰的标题层级** - 不同大小的标题，一级标题有下划线
2. **良好的文字对比度** - 深灰色文字替代了之前过浅的灰色
3. **美观的代码高亮** - 支持多种编程语言的语法高亮
4. **统一的样式风格** - 表格、引用、列表等都有一致的样式设计 