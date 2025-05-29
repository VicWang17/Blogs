原发布于2023.7.26

--------------------------

## 什么是泛型

草率地学习过C++的template，template就是一种泛型编程。泛型就是一套模板，多次使用，免得类似的代码，因为需求的类型不同要写很多次。就像有些函数和类一样，为了代码更好写而用的操作。

## 一个简单的例子
现在我们需要一个存指定类型的ArrayList，如果用官方的版本，要一次次对类型进行检查，还得转型，比如存string的list，输入了一串数字，得写命令把它转成string，类型一多就很麻烦。于是乎可以建立一个模板：
```java
public class ArrayList<T> {
    private T[] array;
    private int size;
    public void add(T e) {...}
    public void remove(int index) {...}
    public T get(int index) {...}
}
```
然后就可以创建不同的list
```java
// 创建可以存储String的ArrayList:
ArrayList<String> strList = new ArrayList<String>();
// 创建可以存储Float的ArrayList:
ArrayList<Float> floatList = new ArrayList<Float>();
// 创建可以存储Person的ArrayList:
ArrayList<Person> personList = new ArrayList<Person>();
```
其实不这么做，就可以理解为，arraylist的泛型是object。

## 向上转型
泛型也可以向上转型
```java
List<String> list = new ArrayList<String>();
```
但是string这个类型要统一，不能乱变，即使有继承关系也不能向上转。
比如说Integer向上转成了Number，但是Number还可以存储float，所以会出问题。

#### 省略
上面这个例子还有一个可说的就是可以把这段写成
```java
List<String> list = new ArrayList<>();
```
毕竟类型要统一，所以后面这个可以省略

## 泛型接口
接口也可以做泛型，就是要注意类型。

## 多个类型
```java
public class Pair<T, K> {
    private T first;
    private K last;
    public Pair(T first, K last) {
        this.first = first;
        this.last = last;
    }
    public T getFirst() { ... }
    public K getLast() { ... }
}
```
这样可以做两种类型

#### 静态方法的泛型
静态方法不能普通地用泛型，比如这样会报错：
```java
public class Pair<T> {
    private T first;
    private T last;
    public Pair(T first, T last) {
        this.first = first;
        this.last = last;
    }
    public T getFirst() { ... }
    public T getLast() { ... }

    // 对静态方法使用<T>:
    public static Pair<T> create(T first, T last) {
        return new Pair<T>(first, last);
    }
}
```
解决方法是把静态方法的泛型类型部分改成别的字母，单独作一个类型
```java
public class Pair<T> {
    private T first;
    private T last;
    public Pair(T first, T last) {
        this.first = first;
        this.last = last;
    }
    public T getFirst() { ... }
    public T getLast() { ... }

    // 可以编译通过:
    public static <T> Pair<T> create(T first, T last) {
        return new Pair<T>(first, last);
    }
}
```

## 擦拭法
泛型在编译的过程中用了擦拭法，也就是说，虚拟机并不知道什么泛型，编译器把T给擦拭成了object。**所以T不是基本类型，比如int，只能是Integer**

#### extends和super
```java
static int add(Pair<Number> p) {
```
这样的写法，如果传入的是Number的子类，比如Integer，可能会报错，因为pairInteger这个整体不是pairnumber的子类。解决方法是用extends通配符
```java
static int add(Pair<? extends Number> p) {
```
也可以给模板用
```java
public class Pair<T extends Number> { ... }
```
同理地，把extends换成super，就可以实现xxx类及其父类都可以被匹配。如果只留一个问号，那就全能匹配了

## 反射和泛型
一些反射也是泛型比如`class<T>`、`constructor<T>`
可以声明带泛型的数组，但不能直接创建带泛型的数组，必须强制转型,比如
```java
Pair<String>[] ps = (Pair<String>[]) new Pair[2];
```