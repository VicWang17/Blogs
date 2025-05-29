原发布于2023.7.27

--------------------------

## 简介

Java的java.util提供了集合类Collection，主要有以下三类
* List，类似列表
* Set，类似元组
* Map，类似字典
有一些内置的集合类或者接口已经被淘汰了，比如说
* Hashtable：一种线程安全的Map实现
* Vector： 一种线程安全的List实现
* Stack： 基于Vector实现LIFO的栈
* `Enumeration<E>`:一个遗留接口,被`Iterator<E>`取代

## List
List是一个接口，主要实现类有ArrayList和LinkedList
#### List接口主要方法
* add(value)末尾加元素
* add(index, value)指定位置加元素
* remove(value)删除元素
* remove(index,value)指定位置删除元素
* get(index)获取指定元素
* size()获取链表大小

#### 遍历List
用迭代器Iterator，例如
```java
for (Iterator<String> it = list.iterator(); it.hasNext(); ) {
            String s = it.next();
            System.out.println(s);
        }
```
这个方法和for each的道理是一样的，for each的本质也是迭代器。

#### List和Array转换
* 调用toArray()直接转换，会丢失类型信息，实际应用很少
* 给toArray(T[])传入一个类型相同的Array，回自己复制过去
* 第三种通过List接口定义的`T[] toArray(IntFunction<T[]>generator)`方法，例如
```java
Integer[] array = list.toArray(Integer[]::new);
```

#### 覆写equals
例如有一个person类
```java
public class Person {
    public String name;
    public int age;
}
```
可以先设计为
```java
public boolean equals(Object o) {
    if (o instanceof Person p) {
        return Objects.equals(this.name, p.name) && this.age == p.age;
    }
    return false;
}
```
原则是**引用字段用equals(),基本类型用字段比较**。

## Map
Map也是一个接口，最常用的实现类是HashMap
* put(key, value)设置映射
* get(key, value)获取映射
* KeySet()迭代可以获取key的Set集合
* entrySet()迭代获取key-value映射

#### 覆写equals()和hashcode()
equals()的覆写方法是一样的
hashcode()的覆写可以这么写
```java
int hashCode() {
    return Objects.hash(firstName, lastName, age);
}
```
之所以要重写hashcode()方法，对于两个字段完全相同的对象，原生的hashcode()得到的哈希码可能是不一样，所以要重写让它们一样

#### enumMap
enumMap的key值是enum类型，这样效率最高，不需要计算hashcode，不浪费空间，例如
```java
map.put(DayOfWeek.MONDAY, "星期一");
```

#### sortedMap
sortedMap是一个接口，最常用的实现类的TreeMap
区别就是遍历的时候会有一定顺序排序，比如哈希树排序会通过hashcode排序，显然就是乱序

## Properties
用Properties可以读取配置，一般分为三步

1. 创建Properties实例
2. 调用`load()`获取文件
3. 通过`getProperty()`获取配置
例如
```java
String f = "setting.properties";
Properties props = new Properties();
props.load(new java.io.FileInputStream(f));

String filepath = props.getProperty("last_open_file");
String interval = props.getProperty("auto_save_interval", "120");
```
#### 写入配置
通过`setProperty()`
例如

```java
Properties props = new Properties();
props.setProperty("url", "http://www.liaoxuefeng.com");
props.setProperty("language", "Java");
props.store(new FileOutputStream("C:\\conf\\setting.properties"), "这是写入的properties注释");
```
## Set
#### 基础操作
* add(e) 加入集合
* remove(e) 删除元素
* contains(e) 判断是否包含
* SortSet 排序元素

#### 性质
Set最主要的性质就是可以去除重复元素。
此外，Set的元素本质上和Map的Key是类似的，所以要正确实现equals()和hashCode()才能用。
比如说最常用的set是HashSet，而HashSet的核心代码就是HashMap封装了一下，用的都是map的方法。

## Queue
Queue就是队列。注意要避免把null添加到
#### 基础操作
* int size() 读取长度
* add(E) 添加元素到队尾
* remove() 提取元素并删除
* element（）提取元素不删除

#### 一些特殊队列
1. PriorityQueue
	优先队列，添加元素之后会自动排序，根据权重出列，一般就是考虑队列中有VIP的情况，或者需要排序的情况，所以要覆写Comparable()接口才能正确使用。
2. Deque
	双向队列，两头都能添加元素和取出元素，多了几个方法。