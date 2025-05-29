### 前置准备：一个VirtualBox软件，一个Arch的iso，安装至少40G的虚拟磁盘映像
--------------------
1. 打开虚拟机，选第一个BIOS,应该长这样：
![](http://120.55.88.57/wp-content/uploads/2023/04/09fcb7a2aa64a042d2863c39a60a88d-300x136.png)
可以先输入` ping baidu.com`试试有没有返回，确定网络正常。
2. 规划一下盘，一个根目录盘，可以给的尽量大，第二个swap盘，大小最好是内存的两倍（vbox软件里可以设置），小了会卡，大了浪费，最后搞个备用的逻辑分区盘，可以装扩展分区。
3. 输入cfdisk，选第二个dos，回车，看到一个“free space”，回车，设定足够的大小，比如20G or 40G，但是要给swap和逻辑分区预留空间。底下选Primary，也就是设置为主分区，选bootable可引导，最后选write写入，最后输入yes，不然不成功。
4. swap和逻辑分区同上，大小设定好就ok。
![](http://120.55.88.57/wp-content/uploads/2023/04/f27fcaa4c2f8c02565abd525105ce53-300x190.png)
5. 现在要把sda的三个盘引导为et4和swap格式，在终端输入：
	```bash
	mkfs.ext4 /dev/sda1
	mkfs.ext4 /dev/sda3
	mkswap/dev/sda2
	swapon /dev/sda2
	```
	如果成功，输入应该都是“Done”之类的

	![](http://120.55.88.57/wp-content/uploads/2023/04/ed396979b9440aa380ba9cd4c360e3d-300x224.png)
6. 输入`timedatectl set-ntp true`更新一下系统时钟，输入`timedatectl status`看看是不是UTC状态。
7. 输入`mount /dev/sda1 /mnt`挂载主盘，这样才能往里面下载东西
8. 输入`pacman -Syy`更新软件包缓存
9. 输入`pacstrap /mnt base linux linux-firmware base-devel`安装系统，这里会安装完之后可以看到gcc和python都预装了，不出意外在这个界面：![](http://120.55.88.57/wp-content/uploads/2023/04/f530f4728fe5ec32eabeac7787fdcf9-300x219.png)
10. 安装`pacstrap /mnt networkmanager dhcpcd vim nano`，不知道为什么进入系统后反而连不上网了，networkmanager可以解决这个问题，dhcpcd用来获取动态IP，vim编辑文档，不会用vim可以用nano
11. `genfstab /mnt>> /mnt/etc/fstab`，生成分区表，我也不知道干嘛的
12. 进入系统：`arch-chroot /mnt`
13. 设置时区`ln -sf /usr/share/zoneinfo/Asia/Hong_Kong /etc/localtime`, 我在香港就选了香港的，内地可以把Hongkong换成Shanghai，时间设置很重要，设置错了后面很多软件装不上
14. `hwclock --systohc`，设置硬件时间
15. `nano etc/locale.gen`，找到en_US.UTF-8 UTF-8和zh_CN.UTF-8 UTF-8，删掉前面的“#”，ctrl+X退出，问你保不保存，当然保存，输入yes，回车，再回车![](http://120.55.88.57/wp-content/uploads/2023/04/b7ea98620ab085ab19f25853b20fcf3-300x272.png)
16. 生效一下，输入`locale-gen`和`echo LANG=en_US.UTF-8 >> /etc/locale.conf`
17. 设置网络(这里的myhostname取一个自己喜欢的名字):`echo myhostname >> /etc/hostname`.
输入`nano /etc/hosts`,最底下补上
```bash
	127.0.0.1	localhost
	::1		    localhost
	127.0.1.1	myhostname.localdomain	myhostname
```
把myhostname换成自己喜欢的名字，以后每次终端抬头你都会看到这个名字
18.输入`passwd`设置密码，不是呆子就设置个空格就行了，谁会来偷看你虚拟机里的小电脑啊/doge
19. 输入`systemctl enable dhcpcd`，开机自动获取IP
19.激动人心的时刻马上来了，输入
```bash
pacman -S grub
grub-install /dev/sda
grub-mkconfig -o /boot/grub/grub.cfg
```
安装grub，拿来启动系统
20. 输入`exit`退出，再输入`reboot`重启，这次选第三个，引导已存在的系统
21.选择第一个Arch Linux，进入系统，输入账号“root”和密码
![](http://120.55.88.57/wp-content/uploads/2023/04/9990cd8e9c212d7eaf27f1062237477-300x101.png)
费尽千辛万苦..终于来到了——又一个黑底白字的地方，但这里就是真正的系统了，等下会安装图形界面
22. 输入
```bash
systemctl start  NetworkManager
systemctl enable NetworkManager
systemctl start  dhcpcd
systamctl enable dhcpcd
```
这样就连上网了
23. 有些功能是不希望root用户操作的，所以我们需要一个普通用户，输入`useradd -m -G wheel username`,username改成自己想要的名字，输入`passwd username`设置密码
24. 安装`pacman -S sudo`,让普通用户也能有sudo权限，安装完毕以后，使用nano打开/etc/sudoers，找到%wheel ALL=(ALL) NOPASSWD ALL这一行取消注释,使得wheel这个组内的用户都可以使用sudo并且不用密码
25. 安装`pacman -S git`,以便下载各种github上的黑科技
26. 安装`pacman -S make`,方便编译C的文件，安装中文和英文字体：
```bash
sudo pacman -S noto-fonts-cjk wqy-microhei wqy-microhei-lite wqy-bitmapfont
sudo pacman -S wqy-zenhei ttf-arphic-ukai ttf-arphic-uming adobe-source-han-sans-cn-fonts adobe-source-han-serif-cn-fonts
sudo pacman -S adobe-source-code-pro-fonts
```
27. 安装`pacman -S neofetch`,终端敲neofetch可以敲一个很好看的状态报告
## 接下来，开始安装图形界面！
28. 图形界面我们会用suckless提供的系列，非常好用，分别是图形管理器dwm和终端模拟器simple terminal,这两个都是超轻量级的应用，需要大量的配置才能把他们整好看和高效，如果展开来讲的话篇幅很大，这里直接用我github上的预装版本。
29. 首先安装`sudo pacman -S xorg xorg-server xorg-xinit`，支持一下图形界面
30. 安装我的dwm配置：`git clone https://github.com/VicWang17/mydwm`,敲`cd mydwm`进入文件夹
31. 编译文件，敲`sudo make clean install`
32. 为了让它开机自启，先输入`echo exec dwm >> ~/.xinitrc`，再输入`nano ~/.bash_profile`,打开一个文件，在最后加上

```bash
if [ -z "${DISPLAY}" ] && [ "${XDG_VTNR}" -eq 1 ]; then
    exec startx
fi
```
这个好像是什么shell语言，空格要求很严格，之前没空格导致启动失败。现在输入reboot重启，登录账号后应该能看到一个顶层的任务栏，但是现在还没有安装终端模拟器，所以先shift+alt+q退出来，登录root账号，继续安装
33. 按照安装dwm的办法安装st，地址https://github.com/VicWang17/myst
同样在文件夹里敲`sudo make clean install`，这次不用加什么自启，reboot重启一下，上账号，shift+ctrl+回车就能打开一个窗口，具体细节操作详见官方文档:https://suckless.org
![](http://120.55.88.57/wp-content/uploads/2023/04/b98a62928c06770aa54a7f2b1223496-300x188.png)
现在没壁纸，所以显得比较丑。
34.用pacman下载更多东西，比如dmenu，可以加个快速启动的菜单，ranger是很好的文件管理器，firefox是浏览器，必须装
35. ranger有一个实用功能是图片预览，就是当我们当前选择的项目如果是图片的话，它会自动在屏幕的最右侧打开这张图片，非常方便我们选择图片。`ranger --copy-config=all`和`cd ~/.config/ranger`
我们需要修改rc.conf这个文件，首先找到set preview_images false这一行，把false改为true打开图片预览的选项 ，然后找到set preview_images_method w3m这一行，把默认的w3m改为ueberzug。最后，我们把ueberzug这个命令安装上就可以完成工作了。
`sudo pacman -S ueberzug`
36.`sudo pacman -S alsa-utils pulseaudio-alsa`,安装声卡支持
37. 其实我的配置文件里不仅加了字体预设，还加了透明度，装了壁纸后会很好看，先去浏览器里下载两张壁纸（可以给火狐加一个vimimum插件，支持全键盘操作浏览器），然后下载nitrogen，并启动。在Prefrence里添加一个下载了壁纸的文件夹，但是现在还不能正常显示
38.先下载一个picom支持透明，接着打开`~/.xinitrc`如下设置![](http://120.55.88.57/wp-content/uploads/2023/04/f54cccaa7e9f208a4863107d8c73403-300x118.png)，既然设置了，紧接着安装中文输入法`sudo pacman -S fcitx5-im fcitx5-chinese-addons fcitx5-qt fcitx5-gtk`
打开`~/.bash_profile`，在最后添上：

```bash
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
export INPUT_METHOD=fcitx
export SDL_IM_MODULE=fcitx
```
打开fcitx5-configtool，将Pinyin添加到输入法列表当中。重启一下Linux![](http://120.55.88.57/wp-content/uploads/2023/04/f2b9644b2389f37b8a4566dd92d50f5-300x188.png)
直接拉风起来了啊！
39.virtualbox对分辨率的支持一直很拉胯，打开文件`sudo nano /etc/X11/xorg.conf.d/10-monitor.conf`，输入
```shell
Section "Monitor"
    Identifier "Monitor0"
    Modeline "1920x1080_60.00" 173.00 1920 2048 2248 2576 1080 1083 1088 1120 -hsync +vsync
    Option "PreferredMode" "1920x1080_60.00"
EndSection

Section "Screen"
    Identifier "Screen0"
    Device "Card0"
    Monitor "Monitor0"
    DefaultDepth 24
    SubSection "Display"
        Depth 24
        Modes "1920x1080_60.00"
    EndSubSection
EndSection
```
重启，解决。
40. 打开~/.bashrc,加一行`alias s='neofetch'`,neofetch太难打了，这样以后敲个s就能把neofetch敲出来，到这里基本就配置好了，一个崭新的系统诞生了！合影留念
![](http://120.55.88.57/wp-content/uploads/2023/04/700c6d7f3ac939a8dd44522194ce5f0-300x146.png)