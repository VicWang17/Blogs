原发布于2023.7.14

--------------------------

## 得到某个对象的类型的类对象

这个说起来很抽象，一开始一直没理解。现在有一个String的类，我拿string类声明了一个s对象，我通过读取到s对象的类对象之后，这个类对象就存储了和string相关的信息，比如string的super类是什么，string有哪些成员变量和构造器等等，这个类的类型是class

#### 读取方法：
1. `Class cls = String.class;`直接读取string的class，cls就是一个类的对象，存了和string这个类的成员变量、方法、类名、super等等的信息

2. 如果已经有一个实例了，希望得到它的类对象，`String s = "Hello"; Class cls = s.getClass();`

3. 如果知道完整的类名，可以直接`Class cls = Class.forName("java.lang.String");`

4. 两个class对象可以用`==`作比较

5. 通过`getName()`可以得到name的名字，通过`isInterface()`、`isEnum()`等等都可以做判断

#### 动态加载
Java的类是动态加载的，只有用到某个类的时候才会把它加载进内存里。比如说main这个class是最早用的，那么main会率先被加载进内存，等到扫到了student这个类，student才会被加载进内存。

## 访问字段
得到类之后，就可以访问类的字段。这个过程看起来会比较“反人类”，因为正常都是去通过student.grade()这样去访问字段的，但是在反射里是先得到了字段（field）的信息，再去找类，这样主要为了是后期给框架用。

#### 获取字段
1. 得到某class类之后，可以通过`getField()`或者`getDeclaredField()`，打印出来的内容类似`public int Student.score`。

2. 两个方法的区别在于，getField只能取public的字段，但是getDeclaredField可以取private和protected的。不过getField可以取父类的字段，后者只能取当前类的字段。

#### 获取字段的值
1. 通过get方法可以得到一个字段的值，`Object value = f.get(p);`。这里f是一个字段，p是一个具体的类。这个过程就很能体现“反射”这个词。

2. 如果访问到了一个private的字段，可能会抛`IllegalAccessException`的错误，可以加一行`f.setAccessible(true);`解决这个问题。

#### 设置字段的值
1. 设置方法`f.set(p, "Xiao Hong");`，很简单易懂。

## 访问方法
#### 获取方法
和获取字段一样，有`getMethod()`和`getDeclaredMethod()`两种获取方法。同样也是前者可以获取父类，但是只能获取public的方法，后者只能获取当前类的方法，但是可以获取private和protected修饰的方法。

#### 调用方法
1. 通过`get()`可以得到字段的值，同理，method也有一个专门的调用函数，叫`invoke()`。invoke接受两部分参数，第一个参数是激活哪个对象（这个对象应该有该方法），后面的参数与该方法需要的参数相同。

2. 对于static修饰的静态方法，无需指定具体的invoke对象，所以第一个参数填`null`。

3. 对于非public的方法，和字段一样，需要写`setAccessible(true)`来避免`IllegalAccessException`

#### 多态
invoke()也是遵循多态原则的，如果调取了一个person类的方法，但是让一个student类激活，而student覆写过这个方法，那么执行的还是student的版本。


## 调用构造方法
#### 最普通的反射式实例化一个类的方法
`Person p = new Person();`这个是正常人用的实例化
`Person p = Person.class.newInstance();`这个是反射的版本，缺陷是没有办法加参数

#### 用构造器来反射式实例化一个类
1. 为了能够加参数，我们需要获取类的构造器，例如`Constructor cons1 = Integer.class.getConstructor(int.class);`，这个cons1里面不仅包含了构造器的信息，应该还说明了是哪个类的构造器，因为可以直接用这个cons1去实例化对象。

2. 和前面一样，构造器也有getxxx和getDeclaredxxx两个版本，不加赘述，区别相同。

3.  同样用newInstance(), `Integer n1 = (Integer) cons1.newInstance(123);`, 就可以带参数的，用反射的，实例出一个对象

## 继承关系
#### 获取父类class
class类有一个方法，叫`getSuperClass()`，直接用（）

#### 获取interface
一个类可能是有一个或者多个接口来实现的，同样，通过调用`getInterfaces()`获取

#### 判断继承关系
1. 子类没有办法直接获取，第一种办法是`instanceof`关系字，例如`boolean a = n instanceof Number`，返回一个布尔值的结果

2. 如果是两个Class实例，要判断一个向上转型是否成立，可以调用`isAssignableFrom()`。
例如`Number.class.isAssignableFrom(Integer.class); // true，因为Number可以赋值给Integer`
其实我感觉这个方法的本质是，前者能不能给后者赋值


## 动态代理
暂时还没有看得很懂，感觉应该是可以抄模板的。
理论上来说就是在程序运行的过程中动态地去创建接口的实例。
proxy用于创建代理的对象，然后将接口方法“代理”给InvocationHandler。