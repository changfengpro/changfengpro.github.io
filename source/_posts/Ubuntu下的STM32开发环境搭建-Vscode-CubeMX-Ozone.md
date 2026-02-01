---
title: Ubuntu下的STM32开发环境搭建(Vscode + CubeMX + Ozone)
date: 2025-02-26 00:51:34
tags: 
   - STM32
   - 开发环境搭建
---


# Ubuntu系统搭建Vscode + CubeMx + Ozone嵌入式开发环境 

---
## 一、换源

### 1. **备份源列表**

   `sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak`

### 2. **命令行打开source.list文件**

   `sudo gedit /etc/apt/sources.list`

### 3. **修改source.list文件，更换源**
    
   >我个人更推荐使用中科大源
    
```
#  中科大镜像源
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
```

```
# 清华镜像源
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
```

```
#  阿里镜像源

deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
```

### 4. 更新源
`sudo apt-get update`

----

## 二、配置C/C++环境
### 1. 安装gcc和g++

`sudo apt install gcc g++`

### 2. 验证安装
`gcc -v`

如果安装成功，会出现如下类似信息
```
rmer@rmer-Legion-Y7000P-IRH8:~$ gcc -v
Using built-in specs.
COLLECT_GCC=gcc
COLLECT_LTO_WRAPPER=/usr/lib/gcc/x86_64-linux-gnu/11/lto-wrapper
OFFLOAD_TARGET_NAMES=nvptx-none:amdgcn-amdhsa
OFFLOAD_TARGET_DEFAULT=1
Target: x86_64-linux-gnu
Configured with: ../src/configure -v --with-pkgversion='Ubuntu 11.4.0-1ubuntu1~22.04' --with-bugurl=file:///usr/share/doc/gcc-11/README.Bugs --enable-languages=c,ada,c++,go,brig,d,fortran,objc,obj-c++,m2 --prefix=/usr --with-gcc-major-version-only --program-suffix=-11 --program-prefix=x86_64-linux-gnu- --enable-shared --enable-linker-build-id --libexecdir=/usr/lib --without-included-gettext --enable-threads=posix --libdir=/usr/lib --enable-nls --enable-bootstrap --enable-clocale=gnu --enable-libstdcxx-debug --enable-libstdcxx-time=yes --with-default-libstdcxx-abi=new --enable-gnu-unique-object --disable-vtable-verify --enable-plugin --enable-default-pie --with-system-zlib --enable-libphobos-checking=release --with-target-system-zlib=auto --enable-objc-gc=auto --enable-multiarch --disable-werror --enable-cet --with-arch-32=i686 --with-abi=m64 --with-multilib-list=m32,m64,mx32 --enable-multilib --with-tune=generic --enable-offload-targets=nvptx-none=/build/gcc-11-XeT9lY/gcc-11-11.4.0/debian/tmp-nvptx/usr,amdgcn-amdhsa=/build/gcc-11-XeT9lY/gcc-11-11.4.0/debian/tmp-gcn/usr --without-cuda-driver --enable-checking=release --build=x86_64-linux-gnu --host=x86_64-linux-gnu --target=x86_64-linux-gnu --with-build-config=bootstrap-lto-lean --enable-link-serialization=2
Thread model: posix
Supported LTO compression algorithms: zlib zstd
gcc version 11.4.0 (Ubuntu 11.4.0-1ubuntu1~22.04) 

```

`g++ -v`

g++安装成功后，输出信息类似

## 三、 安装arm-none-eabi-gcc交叉编译工具链
### 1. 官网下载

<https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads>

![arm-gnu-toolchain-14.2.rel1-x86_64-arm-none-eabi.tar.xz](/images/Ubuntu下的STM32开发环境搭建-Vscode-CubeMX-Ozone/2025-02-26-00-01-51.png)

下载 **arm-gnu-toolchain-14.2.rel1-x86_64-arm-none-eabi.tar.xz**
### 2. 解压

进入下载的目录，执行解压命令,这里我指定解压到了 ***/usr/loacl*** 目录。若想解压到其他目录，修改命令行末尾的解压路径即可

```
rmer@rmer-Legion-Y7000P-IRH8:~/下载$

sudo tar -xJvf arm-gnu-toolchain-14.2.rel1-x86_64-arm-none-eabi.tar.xz -C /usr/local

```

### 3. 配置环境

修改/etc/profile文件, 在最后面添加export PATH=$PATH:+上面的绝对路径，目的是将交叉编译器的命令添加到全局变量

输入：

`sudo gedit /etc/profile`

然后在文件末尾添加如下语句：

```
export PATH=$PATH:/usr/local/arm-gnu-toolchain-14.2.rel1-x86_64-arm-none-eabi/bin
```

![profile](/images/Ubuntu下的STM32开发环境搭建-Vscode-CubeMX-Ozone/2025-02-25-23-46-08.png)

保存并退出之后，执行以下命令使环境变量生效

`source /etc/profile`

再输入

`arm-none-eabi-gcc -v`

验证是否安装成功

![arm-none-eabi-gcc -v](/images/Ubuntu下的STM32开发环境搭建-Vscode-CubeMX-Ozone/2025-02-26-00-19-26.png)

**[注意]** source之后只会在当前终端生效, 重启后才会一直生效

---
## 方法二、

似乎可以直接命令行下载

`sudo apt install gcc-arm-none-eabi`

----

**至此本教程结束，关于JLINK、Ozone以及CubeMX如何下载，本文不过多赘述**

