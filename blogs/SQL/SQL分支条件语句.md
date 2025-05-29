#### IF
语法：
```sql
IF(condition, value_if_true, value_if_false)
```
举例：
```sql
SELECT staff_name, salary,
    IF(salary > 5000, 'High Salary', 'Low Salary') AS salary_category
FROM staff_table;
```

#### CASE
语法：
```sql
CASE expression
    WHEN value1 THEN result1
    WHEN value2 THEN result2
    ...
    ELSE result
END
```
举例：
```sql
SELECT staff_name, position,
    CASE position
        WHEN 'Manager' THEN 'Level 1'
        WHEN 'Assistant' THEN 'Level 2'
        ELSE 'Unknown'
    END AS position_level
FROM staff_table;
```
**WHEN的后面也可以跟表达式**