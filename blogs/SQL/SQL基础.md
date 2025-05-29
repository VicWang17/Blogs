1. SELECT 选择具体的字段，一般全选就是SELECT \*
2. FROM 选择具体的表格
3. WHERE 类似if，列条件，选到具体的行
4. ORDER BY 排序 第一个参数是根据哪一个字段，第二是升降序，升序ASC,降序DESC。第一个参数可以写好几个，比如`ORDER BY a,b`，就是先根据a排，a相同根据b排
5. CREATE
```sql
CREATE TABLE Persons
(
PersonID int,
LastName varchar(255),
FirstName varchar(255),
Address varchar(255),
City varchar(255)
);
```
或者写为
```
CREATE IF NOT EXISITS Persons
```
这样就可以避免重复创建
这是创建表的办法，创建表之前一般先创建数据库
直接`CREATE DATABASE XXX`
6. INSERT INTO
```sql
INSERT INTO table_name
VALUES (value1,value2,value3,...);
```
7. UPDATE
```sql
UPDATE Websites 
SET alexa='5000', country='USA' 
WHERE name='aaa';
```
三行合在一起是一个完整的语句，先确定更新哪张表，再set值，最后确定位置，跟英语一样，喜欢倒着来..
这里如果不写WHERE的话，就是批量操作了，这张表的所有国家都会变成USA。

8. DELETE
```sql
DELETE FROM Websites
WHERE name='Facebook' AND country='USA';
```
DELETE的时候要带个FROM，UPDATE的时候好像不带

9. INNERJOIN
就是把两张表合成一张表，通过两张表共有的一些数据，比如两张表描述的是同一批人，可以通过“name”把两张表合起来
```sql
SELECT column_name(s)
FROM table1
INNER JOIN table2
ON table1.column_name=table2.column_name;
```
语法，SELECT可以选很多个字段，只有被选择的才能显示，一般来说name选一张表的一份就行了，然后table1和table2就是两张要合的表，最后ON就是说明哪个字段可以连接。INNERJOIN也可以简写为JOIN。

10. ALTER
可以给表格加字段，删除字段和修改类型
加字段：
```sql
ALTER TABLE table_name
ADD column_name datatype
```
删除，把ADD改为DROP
修改type，把ADD改为MODIFY COLUMN