原发布于2023.4.17

---------------------------

KMP算法是一个字符串匹配算法，暴力求解的话匹配很慢，一位一位匹配过去，KMP可以实现跳过一定的比较，实现更快的匹配，不用回退。

原题是给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0 开始）。如果 needle 不是 haystack 的一部分，则返回  -1 。

代码：
```python
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        next = [0]          #先实现next数组
        prefix_len =0
        i = 1
        while i<len(needle):       #一直扫到needle扫完
            if needle[prefix_len]==needle[i]:     #当前位置和开头的前缀如果匹配上了
                prefix_len+=1
                i+=1                       #匹配的长度加1，下标也加1，往下继续匹配n，ext出结果
                next.append(prefix_len)
            else:                         #如果没匹配上
                if prefix_len==0:          #如果本来就是没在成功匹配的路上
                    i+=1                    
                    next.append(0)          #继续往下，反正一点没匹配上
                else:                              #如果已经匹配了一段了
                    prefix_len = next[prefix_len-1]
        '''
这里理解了好久好久，比如说有一段“abcabdab.......abcabc",到d这里假设已经匹配了五个了，
到c匹配不上了，但是又不该从头开始匹配，可以匹配上开头的abc,那怎么办呢，从头开始匹配吗，
这里很重要的是，next的下标对应的next[prefix_len-1]和目前匹配位置的单词是一样的，比如说
这里到b的prefixlen是4（可以跳四格），next[prefix_len-1]这个位置一定是另一个b,因为本来就
是两边这样两两匹配下来的，都是一一对应的，所以这行就好像在说，“如果跳四格不行的话，跳
两格试试，前面对应着的这个b可以跳两格，看看能不能继续匹配下去",其实就是退而求其次，尽
可能找能跳的多的，如果b后面是个e,还是跳不了，那么这个跳的格数继续回退，可能就到0了，从
头开始。

		'''
        i,j=0,0                  #next做好了，搞双指针，开始匹配
        while i<len(haystack):
            if needle[j]==haystack[i]:  #如果两头匹配上了，都往下一格看看能不能继续匹配
                i+=1
                j+=1
            elif j>0:       #如果匹配不上，而且匹配上了一段，那就跳格子试试
                j = next[j-1]
            else:     #如果一点没匹配上，就继续吧，j本来就在开头上待命
                i+=1         
            if j==len(needle):    #如果j指针到了最后一格，那么代表一路检查到底了，可以return了
                return i-j
        return -1     #如果循环里没return出去，那么必然是必配不了
```
next的基本原理就是，看看后面有没有哪一段能和开头匹配上的，和开头匹配得越长越好，这样“匹配上了一部分却没完全匹配”的情况就可以免去很多段，毕竟有很长一部分是一样的，可能没匹配上的刚好属于另一段很相似的部分
对于16行，理解了很久，理解都写在注释里了，KMP不仅字面意义上要匹配，待匹配的文字段自己的开头也得和后面匹配，所以理解起来很绕，理解了怎么构造next,就理解了KMP