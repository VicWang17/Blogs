## 字符串处理
#### UPPER()和LOWER（）
UPPER() 和 LOWER() 顾名思义，转换大小写

#### CONCAT()
CONCAT() 可以连接字符串，字符串和变量之间用逗号隔开，连接的字符串可以输出，例如：
```sql
SELECT student
CONCAT('My name is', first_name,' ',last_name) AS full_name
FROM person;
```

#### DINSINCT
DISTINCT，在SELECT的时候，修饰一个DISTINCT,比如
```sql
SELECT DISTINCT salary FROM staff;
```
不会输出重复的薪水

#### LENGTH()
取长度，LENGTH("3333")=4

#### SUBSTR()
切片，指定起步位置和切片长度。注意，这里是从1开始数的，不是零开始数的。
```sql
SELECT SUBSTR('Hello World', 7, 5); -- 返回 'World'
```
#### INSTR()
返回一个字符串在另一个字符串出现的位置
```sql
SELECT INSTR('Hello World', 'World'); -- 返回 7
```

#### LPAD()
向右对齐，左边空格填充。三个参数分别是字符串，最终想得到的长度和左边拿什么填充（所以不一定是空格）。
```sql
SELECT LPAD(product_name, 10, ' ') AS padded_name
FROM products;
```
得到的结果类似于
```
padded_name
--------------
  Product1
 Product22
Product333
```

## 数字处理
#### ROUND()
四舍五入，参数是保几位小数
```sql
SELECT ROUND(3.14159, 2); -- 返回 3.14
```
#### FLOOR()
向下取整
```sql
SELECT FLOOR(3.7); -- 返回 3
```
#### CEIL()
向上取整
```sql
SELECT CEIL(3.2); -- 返回 4
```
#### MOD()
取余
```sql
SELECT MOD(10, 3); -- 返回 1
```
#### TRUNCATE()
截断小数，不四舍五入
```sql
SELECT TRUNCATE(3.14159, 2); -- 返回 3.14
```
#### FORMAT()
数字转字符串，语法：
```sql
FORMAT(number, decimal_places)
```
用法：
```sql
SELECT FORMAT(1234567.89, 2); -- 输出：1,234,567.89
SELECT FORMAT(9876543.21, 0); -- 输出：9,876,543
SELECT FORMAT(1234.5678, 3); -- 输出：1,234.568
```

## 时间处理
#### NOW()
```sql
SELECT NOW(); -- 返回当前日期和时间，如 '2023-09-18 15:30:45'
```
#### CURDATE()
```sql
SELECT CURDATE(); -- 返回当前日期，如 '2023-09-18'
```
#### DATEDIFF()
返回时间差
```sql
SELECT DATEDIFF('2023-09-20', '2023-09-18'); -- 返回 2
```
#### LAST_DAY()
返回所在月份的最后一天
```sql
SELECT LAST_DAY('2023-09-19'); -- 返回 '2023-09-30'
```
#### DAY()
读取日期，裁掉年份和月份

#### DATE()
裁掉小于日期的时分秒

#### DATE_FORMAT()
选择日期的格式
```sql
DATE_FORMAT(date, format)
```
下面是一些常见的模式字符及其含义：

    %Y：四位数的年份（例如：2023）。
    %y：两位数的年份（例如：23）。
    %M：月份的英文全名（例如：September）。
    %m：两位数的月份（例如：09）。
    %D：带有英文后缀的月份的天数（例如：12th）。
    %d：两位数的月份的天数（例如：12）。
    %e：月份的天数，不带前导零（例如：12）。
    %H：24 小时制的小时数（例如：17）。
    %h：12 小时制的小时数（例如：05）。
    %i：两位数的分钟数（例如：03）。
    %s：两位数的秒数（例如：09）。
    %p：上午（AM）或下午（PM）。
示例：
```sql
SELECT DATE_FORMAT('2023-09-12', '%e %M %Y'); -- 输出：12 September 2023
SELECT DATE_FORMAT('2023-09-12 17:03:09', '%Y-%m-%d %H:%i:%s'); -- 输出：2023-09-12 17:03:09
SELECT DATE_FORMAT('2023-09-12 17:03:09', '%h:%i:%s %p'); -- 输出：05:03:09 PM
```

## 列处理
#### COUNT()
用法：COUNT(column_name)。返回列的数量
#### GROUP BY() HAVING
和Python的pandas一样，groupby可以对数据分组:
```sql
SELECT Department, SUM(Amount) AS TotalSales
FROM Sales
GROUP BY Department
HAVING SUM(Amount) > 1000;
```
例如，如果 Sales 表中有以下数据：
```
Department	Amount
Sales	500
Marketing	1200
Sales	800
Marketing	1500
HR	700
```
那么上述查询的结果将是：
```
Department	TotalSales
Marketing	2700
```