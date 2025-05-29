原发布于2023.7.24

--------------------------

## 什么是注解

注解有点类似python的修饰器，以@开头，可以修饰在函数、方法等等的上面。本身没有任何作用，如果不特别处理注解，那就没啥用。注解本身也是个类。

## 注解分类
* 第一类是常用的`@override`（让编译器检查是否正确覆写）和`@SuppressWarnings`（忽略此处的警告。属于是java装好的直接拿来用的

* 第二类是据说一般用不到的类，是一些工具、底层库动态修改class所用

* 第三种是自己写一个注解去修饰，一般会带一些参数，然后运行时函数、方法可以去读这些参数使用

## 定义注解
定义一个注解，通过@interface来实现，例如：
```java
public @interface Report {
    int type() default 0;
    String level() default "info";
    String value() default "";
}
```
#### 元注解
在这段代码之上，也可以加注解，这种注解注解的注解叫做**元注解**。以下是一些常见的元注解：
* `@Target(ElementType.METHOD)`、`@Target({ElementType.METHOD,
    ElementType.FIELD})`
	@target主要定义这个注解可以注解在哪里

* `@Retention(RetentionPolicy.RUNTIME)`定义注解的生命周期, 一般选RUNTIME，也就是运行期都活着，SOURCE是编译期，CLASS是CLASS文件（估计是执行这个文件的时候的意思）

* `@Repeatable(Reports.class)` 修饰了这个，同一个注解可以重复修饰，不常用（修饰好几个，但是里面的比如说type或者label值不一样，然后就可以先读type、label，再读对应的值）

* `@Inherited`子类能否继承父类的注解

####  注解的读取
* 判断某个注解是否存在于`Class`、`Field`、`Method`或`Constructor`：
```java
Class.isAnnotationPresent(Class)
Field.isAnnotationPresent(Class)
Method.isAnnotationPresent(Class)
Constructor.isAnnotationPresent(Class)
```
例如：
```
// 判断@Report是否存在于Person类:
Person.class.isAnnotationPresent(Report.class);
```

* 读取注解`cls.getAnnotation(Report.class);`
如果有一条注解为`@Range(min=1, max=20)`，那么就可以通过`range.min()`来读取。剩下的代码逻辑都按照正常编程完成，注解只有加一些属性数据的作用。 