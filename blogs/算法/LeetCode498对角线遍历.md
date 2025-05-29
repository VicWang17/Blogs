原发布于2023.4.2

---------------------

### 给你一个大小为 m x n 的矩阵 mat ，请以对角线遍历的顺序，用一个数组返回这个矩阵中的所有元素。

### 在吃麦当劳的时候琢磨这道题，想到可以通过数组i，j变化的规律在做，第一个做完之后发现小看题目了...题目的遍历是迂回型的。于是重写了两个小时，写了这么长一个模拟：

```python
mat = [[2,3,4],[5,6,7],[8,9,10],[11,12,13],[14,15,16]]

a = [] #存储遍历结果
width = len(mat[0])
length = len(mat)
flag = 0
i,j=0,0

while len(a)!=length*width:
    a.append(mat[i][j])
    if width!=1 and (flag==0 and i==0 or length==1 or (j==width-1 and flag==0)):
        flag = 1 - flag
        if j == width-1:
            i = i+1
            #print("撞右上角")
            break
        else:
            j = j + 1
        #print("向右上到顶了")
    elif flag and j==0 or width==1 or (length-1==i and flag):
        flag = 1 - flag
        if i == length-1 and width!=1:
            j = j+1
            #print("撞左下角")
            break
        else:
            i = i + 1
        #print("向左下到顶了")
    else:
        if(flag==0):
            j = j+1
            i = i-1
            #print("向右上")
        else:
            j = j-1
            i = i+1
            #print("向左下")
	while len(a)!=length*width:
    a.append(mat[i][j])
    if flag==0 and i==0 and width!=1 or length==1 or (j==width-1 and flag==0 and width!=1):
        flag = 1 - flag
        i=i+1
        #print("向右上到顶了")
    elif flag and j==0 or width==1 or (length-1==i and flag):
        flag = 1 - flag
        j=j+1   
        #print("向左下到顶了")
    else:
        if(flag==0):
            j = j+1
            i = i-1
            #print("向右上")
        else:
            j = j-1
            i = i+1
            #print("向左下")
    print(a,i,j)
```
然而这个版本的码还是没有办法拿满分，虽然已经拿if调整了很多特殊情况，但是还是顶不住了。

于是看了题解，发现一个重要规律没拿：**同一条对角线的i+j和是一样的**

而且一共m+n-1条对角线，只能说，很多规律没观察出来。

其实我也发现高赞题解里有和我一样写模拟的，但是模拟终归还是比较无脑的办法，挑战了很久还没有写出来，有点羞耻..

最后看了眼官方正解，其实不用检测到顶与否，只要控制好起点和终点，然后一轮一轮扫就行了，把每次对角线的结果加入答案。我等于是做麻烦了，太过于“模拟”。