原发布于2023.9.15

-----------------------

## 预前工作

C++随机数要用两步——置随机数种子和选择随机数引擎，随机数引擎装载随机数种子，就可以产生不同的随机数，相同的随机数引擎装载相同的随机数种子，得到的结果是相同的。
当然，也要加入`<random>`这个头文件。

#### 置随机数种子
1. `random_devise rd;` 这里是rd就是一个种子。`std::random_device` 的实现可能基于硬件熵源（如热噪声、鼠标移动等）或操作系统提供的随机性源。它的目标是生成真正的随机数，而不是伪随机数。
2. 一个固定的任意数字，1,12,123,whatever。能想到的好处就是，我希望产生相同的一组随机数的时候，可以通过这个办法。
3. `unsigned int seed = static_cast<unsigned int>(std::time(nullptr));  ` 用当前时间作为随机数种子。

#### 置随机数引擎
用法`std:: engine_name gen(rd())`。
在C++标准库中，提供了几种常见的随机数引擎，每个引擎都有不同的特点和性能。以下是对一些常见随机数引擎的简要解释：

1. **`std::minstd_rand`**：这是一个线性同余法（linear congruential generator）的随机数引擎。它具有较短的周期长度，通常为2^31-1。由于其简单性，它的性能较高，但随机性较弱，不适合用于需要高质量随机数的应用。

2. **`std::mt19937`**：这是一个基于梅森旋转算法（Mersenne Twister）的随机数引擎，我在之前的回答中已经详细解释过了。它的周期长度为2^19937-1，具有良好的随机性和较长的周期，适用于大多数应用场景。

3. **`std::mt19937_64`**：这是 `std::mt19937` 的64位版本，周期长度为2^19937-1。与 `std::mt19937` 相比，它使用更大的内部状态，可以生成更长的随机数序列。

4. **`std::default_random_engine`**：这是C++标准库提供的默认随机数引擎，通常是 `std::mt19937` 或 `std::minstd_rand` 的别名。具体实现取决于编译器和标准库实现。

5. **`std::ranlux24_base`、`std::ranlux48_base`**：这些是基于"subtract-with-carry"算法（SWC）的随机数引擎。它们提供了高质量的随机性和较长的周期，但相对于梅森旋转算法，它们的性能略低。

这些随机数引擎都可以通过指定不同的种子来生成不同的随机数序列。根据应用的需求和对随机性能质量的要求，可以选择适当的随机数引擎。通常情况下，`std::mt19937` 是一个常用的选择，它提供了很好的随机性和周期长度。

## 设置随机数
在C++中，可以使用 `<random>` 头文件提供的随机数库来生成随机数。以下是一个示例，演示如何生成随机整数和随机浮点数：

```cpp
#include <iostream>
#include <random>
int main() {
    // 创建一个随机数引擎
    std::random_device rd;
    std::mt19937 gen(rd());

    // 生成随机整数
    std::uniform_int_distribution<> disInt(1, 100);  // 定义整数范围
    int randomInt = disInt(gen);  // 生成随机整数
    std::cout << "随机整数: " << randomInt << std::endl;

    // 生成随机浮点数
    std::uniform_real_distribution<> disFloat(0.0, 1.0);  // 定义浮点数范围
    double randomFloat = disFloat(gen);  // 生成随机浮点数
    std::cout << "随机浮点数: " << randomFloat << std::endl;

    return 0;
}
```
这里的`uniform_int_distribution`是一个随机数分布类，也是一个模板类。