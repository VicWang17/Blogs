# Rofi添加应用启动探索记录

## 起因

最近新换了Hyprland, 重装了Linux系统，对于平铺管理器来说`rofi`是个很好的应用启动器，于是乎发现一个问题，通过tar,gz安装的idea、webstorm、atom不会出现在rofi启动器里。

## 解决办法

问chatGPT, 方法很简单，在usr/share/applications文件夹里加一个`desktop`文件，加一点数据，确定一下icon在哪，启动文件在哪就行。

## 困难

然后发现一个问题，启动不了，什么添加系统可执行路径之类的办法也没有生效，说压根没有写在Exec后面的那串路径，但是显然是有的。

## 解决

观察了一下其它的.desktop文件，大体发现都是通过/usr/bin下面的文件来启动的，可能这个路径是一个比较容易访问的经理，所以采用曲线启动的方式，在/usr/bin/写一个launch文件，启动原文件，然后在.desktop里启动launch文件。这样就解决问题了。

bin里的启动内容类似于：

```sh
#!/bin/bash

~/.idea.sh
```



然后还要给这个启动文件一个权限访问的允许，不然会显示permission denied.

```bash
> sudo chmod +x launchIdea.sh
```

然后就可以正常启动了。