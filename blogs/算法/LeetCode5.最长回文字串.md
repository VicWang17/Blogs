## 给你一个字符串 s，找到 s 中最长的回文子串。

## 如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。
终究是碰上了动态规划的题，一开始没想到是动态规划，查了之后理解了。
必定能判断的条件是，单个字母一定是回文，两个连一起的相同字母也是回文，剩下就收缩找，比如找s1-s9,如果两边相同，就搜s2-s8,一直往里搜，总能搜到必定判断的条件。
所以一开始按这个思路这样写：
```python
class Solution:
    def __find(self,s,left,right):
        if right == left + 1:
            if s[left]==s[right]:
                return True
            else:
                return False
        elif right == left:
            return True
        elif s[left] == s[right]:
            return self.__find(s,left+1,right-1)
        else:
            return False

    def longestPalindrome(self, s: str) -> str:
        dp=[[False]*len(s)]*len(s)
        max = 0
        for i in range(0,len(s)-1):
            for j in range(i+1,len(s)):
                dp[i][j]=self.__find(s,i,j)
                if dp[i][j] and j-i>max:
                    max = j-i
                    maxi,maxj = i,j

        if max!=0:
            return s[maxi:maxj+1]
        else:
            return s[0]
```
但是这个方法超时了，因为我每个情况都是从头扫到底，解决办法是遍历顺序，不能顺着遍历，要倒着遍历，i从尾巴开始，这样可以保证搜到很多已经判断过的结果，大大节省时间，这是chatGPT的代码：
```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        n = len(s)
        dp = [[False] * n for _ in range(n)]
        start, end = 0, 0
        max_len = 0

        for i in range(n):
            for j in range(i + 1):
                if s[i] == s[j] and (i - j <= 2 or dp[j + 1][i - 1]):
                    dp[j][i] = True
                    if i - j + 1 > max_len:
                        max_len = i - j + 1
                        start, end = j, i

        return s[start:end + 1]

```

上一次接触动态规划应该还是在高一，时过境迁，这道题练了一下很多东西也记起来了。