## 基础
创建进程相当于创建函数。
主要写法：
```sql
DELIMITER //

CREATE PROCEDURE my_process()
BEGIN
    -- 在这里编写你的 SQL 逻辑
    -- 例如：
    SELECT * FROM users;
    UPDATE orders SET status = 'completed' WHERE amount > 100;
END //

DELIMITER ;
```
这里的DELIMITER是修改分隔符。如果END后面跟分号的话，断句上可能会造成歧义，所以先做成“//”断句，再变回来。

## 参数
在PROCEDURE的括号里可以定义三种参数，IN\OUT\INOUT，IN就是导入PROCEDURE的参数，OUT就是返回的参数（类似于RETURN的值），INOUT就是都可以。
例如进程可以这么写：
```sql
CREATE PROCEDURE my_procedure(IN input_param INT, OUT output_param INT, INOUT in_out_param INT)
BEGIN
    -- 使用输入参数
    SELECT * FROM users WHERE age > input_param;

    -- 修改输出参数的值
    SET output_param = 100;

    -- 修改输入/输出参数的值
    SET in_out_param = in_out_param + 1;
END;
```
在call进程的时候，可以这么call：
```
DECLARE @output INT;
DECLARE @in_out INT;

CALL my_procedure(10, @output, @in_out);

-- 输出输出参数的值
SELECT @output, @in_out;
```
等于return和收函数的功能就被写在参数里面了。