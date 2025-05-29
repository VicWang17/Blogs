#### 1.import
import没什么特殊的，就直接 import requests

#### 2.get() 方法：
import requests
res = requests.get('http://www.baidu.com/') 
print(res)
print(res.text)
在pycharm中，pycharm中请求网址成功返回Response [200]，否则就是404，400什么的…
返回一个没什么格式的网页源代码（不过我看起来感觉格式挺好的……）

#### 3.请求头
在Chrome浏览器中F12，上面选network，刷新一下页面，左下角框name里选第一个，右边往下找就能找到
使用方法：

```python
import requests
headers = {
'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36      (KHTML, like Gecko) Chrome/80.0.3987.132 Safa'
'ri/537.36'
		 }
res = requests.get('http://www.baidu.com/',headers=headers)
print(res)
print(res.text)
```
然后我惊奇地发现，打印出来的东西好像多了……

#### 4.常见异常
ConnectionError：网络问题
HTTPError：来自Response_for_stasus()，HTTP返回了不成功的状态码，若网也不存在，返回404
Timeout：请求超时
TooManyRedirects：请求超过了设定的最大次数

------------

原文写于2020.8.5，搬运过来了