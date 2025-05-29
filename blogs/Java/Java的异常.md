原发布于2023.6.22

--------------------------

##### java的异常

· 类似python的`try-except`, Java写法是`try-catch`, catch最后还可以加`finally`, 在`catch`之后运行
· `printStackTrace()` 可以打印异常栈
· 一种常见的异常叫`NullPointerException`，如果访问了一个null对象可能就会报这个异常 

##### 抛出异常
· Java的思想是鼓励开发者自己抛出异常，自己catch。抛出的方式是throw。
· 有catch有finally的情况下，如果catch中抛出异常，会先执行finally，再去报catch中的异常
· 如果finally抛异常，catch中的异常就被屏蔽了，没抛出来，不过这种情况很少见，谁闲着往finally里面抛异常..

##### 自定义异常
· 最底下贴上java标准库的常用异常
· 如果需要自定义异常，可以搞一个从`RuntimeException`继承一个`BaseException`，然后再设计各种异常，从这个baseexception来继承
· 自定义的BaseException应该提供多个构造方法：
```java
public class BaseException extends RuntimeException {
    public BaseException() {
        super();
    }

    public BaseException(String message, Throwable cause) {
        super(message, cause);
    }

    public BaseException(String message) {
        super(message);
    }

    public BaseException(Throwable cause) {
        super(cause);
    }
}
```
上述构造方法实际上都是原样照抄RuntimeException。这样，抛出异常的时候，就可以选择合适的构造方法。通过IDE可以根据父类快速生成子类的构造方法。

##### 日志
· 通过import `java.util.logging` 可以引入log
· 实例化一个logger，就可以用logger自己打印很多日志
· 和flask一样，可以修改log的level
· 这个内置的log库不常用

##### commons logging
· 廖雪峰说，这个log更常用，但是是一个第三方库，要下载
· 因为是个第三方库，所以暂时不学这个
· 同样第三方据说也好用的还有log4j、slf4j和logback