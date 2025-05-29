### 子查询
1. 子查询即在一句查询语句里加一个括号，括号里做一句子查询，例如：
```sql
SELECT staffNo, fName, lName, position
FROM Staff
WHERE branchNo =
(SELECT branchNo
FROM Branch
WHERE street = '163 Main Street')
```
	例如这里staff和brach表里都有一条branchNo的数据，用子查询的办法，就可以效率很高地把两个表合起来查。

2. 同样子查询也可以带聚合，比如括号里带
```sql
(SELECT AVG(salary) FROM Staff) As SalDiff
```
	这样在最后的输出表里，可以看到一个一列叫SalDiff的数据，数据是一样的，都是平均工资。（AVG（）是算平均的函数。

### 一些关键字
1. 可以用ALL\SOME\ANY关键字，后带括号带一系列数据，就可以描述比如“全部的XXXX"“其中一些XXXX”“任何一个XXX”
```sql
SELECT staffNo, fName, lName, position, salary
FROM Staff
WHERE salary > SOME
(SELECT salary
FROM Staff
WHERE branchNo = 'B003’)
```

2. EXISTS\NOT EXISTS关键字
这个关键字在最早create table的时候就用过。
这个很好理解，后面同样带子查询括号，就看有没有，有就是exsits，否则就是not exsits


### JOIN
连接分为内连接和外连接。外连接还分为左外连接，右外连接，全外连接。主要作用就是连接不同的表。
区别在于，内连接只返回匹配的表，比如两张表都有的名字合成一张表
外连接相当于一边吞了另一边，某一边会全款留下，全连接会全部留下，空值被填充。
![](http://vicwang17.com/wp-content/uploads/2023/09/2023-09-19_13-30-300x134.png)

JOIN也可以实现三个表连接，加一些AND、OR的条件就可以，例如
```sql
SELECT b.branchNo, b.city, s.staffNo, fName, lName,
propertyNo
FROM Branch b, Staff s, PropertyForRent p
WHERE b.branchNo = s.branchNo AND
s.staffNo = p.staffNo
ORDER BY b.branchNo, s.staffNo, propertyNo
```
### 交并差
有三种关键字 UNION\INTERSECT\EXCEPT,分别代表交集并集和差集。比如对着元组1 UNION 元组2就可以得到两个tuple的并集。