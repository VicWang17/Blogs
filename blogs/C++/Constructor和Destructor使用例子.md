原发布于2023.4.17

----------------------------------

这是上课的时候做的一个有各种Constructor和Destructor的例子

```cpp
#ifndef WINELIST_H
#define WINELIST_H

#include <string>

class WineList{
    private:
        std::string* wList;
        int wCount;
    
    public:
        WineList(){
            wList = nullptr;
            wCount = 0;
        }
        WineList(std::string* list,int count){
            wList = list;
            wCount = count;
        }
        WineList(const WineList& w) : wCount(w.wCount), wList(nullptr) {
        if (w.wList != nullptr) {
            wList = new std::string[wCount];
            for (int i = 0; i < wCount; i++) {
                wList[i] = w.wList[i];
            }
        }
    }
        ~WineList(){
            delete[] wList;
        }

        void removeWine(int index){
            *(wList+index)="removed";
        }

        void printWineList(){
            for(int i = 0;i<=wCount-1;i++){
                std::cout<<*(wList+i)<<std::endl;
            }
        }


};



#endif
```
这里用的是一个深拷贝的例子，原本写的是
```cpp
WineList(const WineList& w){
            wList = w.wList;
            wCount = w.wCount;
        }
```
就错了。
按照ChatGPT的说法，深拷贝也可以先new一个变量，然后通过指针赋值，例如a = new int[123];*(a)=*(w.xxxx)