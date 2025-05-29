#### 1.import
import的通常用法应该是form bs4 import BetifulSoup，注意大小写！！！原来Python还对大小写敏感的……（自觉给P一个大写哈哈哈）

#### 2.基本用法：
```python
import requests
from bs4 import BeautifulSoup
headers = {
'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safa'
        'ri/537.36'
}
res = requests.get('http://www.baidu.com/',headers=headers)
soup=(BeautifulSoup(res.text,'html.parser'))
print(soup.prettify())
```
这得到的是一个标准缩进的Soup文档，是结构化的数据，为后期过滤数据做准备。

#### 3.BeautifulSoup库解析器

Python标准库（BeautifulSoup(markup,"html.parser"))
lxml HTML解析器（BeautifulSoup(markup,"lxml"))
Lxml XML解析器（BeautifulSoup(markup,["lxml","xml"]),BeautifulSoup(markup,"xml"))
html5lib（BeautifulSoup(markup,"html5lib")）
**官方推荐使用的是lxml，速度快，文档容错能力强。**

#### 4.定位元素的方法
find(tag,attibutes,recursive,text,keywords)
tag：标签
attibutes：属性
常用的是这两个




------------

原文写于2020.8.5，搬运过来了