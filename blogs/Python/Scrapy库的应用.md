1. 使用前要预装Lxml、zope.interface、twisted、pyOpenSSL、pywin32依赖库
2. 新建一个scrapy项目：cmd终端执行`scrapy startproject name`
3.- scrapy.cfg 项目配置文件，定义了默认设置文件和项目名称
  - __init___.py，空文件供Python导入
  - midddlewares.py 
  - item.py 定义爬虫抓什么
  - pipelines.py 数据处理，清洗入库
    -settings.py 项目设置，设置请求头等等
    -自建一个spider.py 写爬虫的代码
4. 在item.py的class里面写好要的信息 xxx=Field（）
   Field是一个重要的类，有很多东西可以设置
5. 在自建爬虫代码里，做一个CrawSpider的子类，然后selector.xpath（）.extract(),最后用yield返回出去
6. 在setting.py里面加一行代码，指定用pipelines作处理。
```python
ITEM_PIPELINES = {    'yourprojectname.pipelines.yourpipelinename.YourPipelineClassName': 300,
}
```
7. 通过在终端`python scrapy crawl xxx
`，就能运行，或者搞一个main.py，写
```python
from scrapy import cmdline
cmdline.execute("scrapy crawl xxx".split())

```