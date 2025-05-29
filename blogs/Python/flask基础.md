## 基础显示
1. `app = flask（__name__）`声明一个flask的类
2. `@app.route('/')`后接对应页面的函数
比如
```python
@app.route('\home\')
def home():
	return xxxxx
```
注意URL最后要带个\，这是标准写法，不带的话如果输入者打了杠是404，但是反之你打了杠，输入者没打，系统会自动补

## 模板
3. 在装饰类映射的函数中（比如上一条说的home函数），可以return render_template('xxx.html')来输出一个html文件
4. render_template()还可以加一些额外参数，需要在html文件里定义一些变量的名字 比如写到a = {{a}},这里通过双括号来显示某个变量的值，然后a就可以作为一个参数写在函数里，a=xxx， {{}}里甚至还可以列式子

## 静态文件
4. flask在目录下有一个“static”文件，专门用来存静态文件
5. Flask通过使用url_for()函数来生成静态文件的URL地址。这个函数接受一个参数，即静态文件在静态文件夹中的相对路径。例如，如果有一个名为"style.css"的样式表文件位于静态文件夹中的子文件夹"css"下，可以使用url_for('static',filename='css/style.css')生成该文件的URL地址。url_for('')中也可以填函数名
6. 一旦静态文件的URL地址生成了，就可以在模板中或者通过直接在浏览器中输入URL地址的方式来访问这些文件。例如，在HTML模板中使用<link>标签来引用样式表文件：<link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">。

## URL构建
7. redirect()可以重新定向,比如return redirect(url_for('home')), 就可以定向到目录是/home的路径

## flask提交表单
8. 首先在py文件里定义路由
```python
from flask import Flask, render_template, request
app = Flask(__name__)
@app.route('/form', methods=['GET', 'POST'])
def form():
    if request.method == 'POST':
        name = request.form['name']
        # 在这里对表单数据进行处理
        return render_template('result.html', name=name)
    return render_template('form.html')
```

9. 在form.html：
```html
<!-- form.html -->
<form action="/form" method="post">
    <input type="text" name="name" placeholder="Your Name" required>
    <button type="submit">Submit</button>
</form>
```

10. 在result里显示结果：
```python
<!-- result.html -->
<h2>Hello, {{ name }}!</h2>
```

## 错误
11. abort(401) 报错函数

## Response和Cookies
12. 创建一个response的对象
```python
from flask import make_response
@app.route('/')
def index():
    response = make_response('Hello, World!')
    return response
```

13. 响应可以带状态码
```python
    response = make_response('Page not found', 404)
```

14. 自定义header的信息
```python
from flask import make_response
@app.route('/')
def index():
    response = make_response('Hello, World!')
    response.headers['X-Custom-Header'] = 'Custom Value'
    return response
```

15. 设置和获取cookies
```python
from flask import make_response
@app.route('/')
def index():
    response = make_response('Hello, World!')
    response.set_cookie('username', 'John Doe')
    return response
@app.route('/get_cookie')
def get_cookie():
    username = request.cookies.get('username')
    return f'Username: {username}'
```

16. delete_cookies() 删除cookies

## Session
17. 设置密钥，保证安全传输
```python
from flask import Flask
app = Flask(__name__)
app.secret_key = 'your_secret_key'
```

18. 设置密钥后通过session来设置和访问会话数据
```python
from flask import session
@app.route('/login', methods=['POST'])
def login():
    # 假设进行身份验证，并验证通过
    user_id = get_user_id()  # 获取用户ID
    session['user_id'] = user_id  # 在会话中存储用户ID
    return 'Logged in successfully'
@app.route('/profile')
def profile():
    user_id = session.get('user_id')  # 从会话中获取用户ID
    if user_id:
        # 根据用户ID获取用户信息等操作
        return f'User ID: {user_id}'
    else:
        return 'Not logged in'
```
session是存在服务器端的，比自己用字典存更安全，性能也更好

## flash消息闪现
19. 通过errormsg（）和flash（）来插入一些类似于p的信息，flash的信息只会显示一次，刷新了就没有了，所以叫闪现。需要import flash库