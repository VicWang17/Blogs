原发布于2023.4.24

--------------------

1. 基础格式：

````cpp
template <typename T>
T func(T a){
	xxx
	return xxx
}
````
2. 时空上template的代码是没有区别的，在编译成.obj的时候，代码还是会变成非模板的形式，只是在cpp文件中template的可读性更强
3. 当参数不止一个类型的时候，<typename T1, typename T2>
4. 不确定return type的话，可以用auto
5. template即属于泛型编程，generic programming
6. 也可以应用在class上