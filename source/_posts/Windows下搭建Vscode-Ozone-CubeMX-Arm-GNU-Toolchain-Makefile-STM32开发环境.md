---
title: Windows下搭建Vscode + Ozone + CubeMX + Arm GNU Toolchain + Makefile STM32开发环境
date: 2026-01-31 11:14:47
tags:  
    - STM32  
    - 开发环境搭建
---



# 一、 安装Vscode、Ozone和CubeMX
	略.

# 二、安装Arm GNU Toolchain
>下载地址：[Arm GNU Toolchain](https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads)

![](/images/Windows下搭建Vscode-Ozone-CubeMX-Arm-GNU-Toolchain-Makefile-STM32开发环境/image.png)
>下载***arm-gnu-toolchain-15.2.rel1-mingw-w64-x86_64-arm-none-eabi.msi***
最好安装到D盘，也可以下载.zip，自己设置环境变量

![](/images/Windows下搭建Vscode-Ozone-CubeMX-Arm-GNU-Toolchain-Makefile-STM32开发环境/e3414f6e3a8749e49cf533b58f6d536c.png)
>输入`arm-none-eabi-gcc -v`看下环境是否设置成功

![](/images/Windows下搭建Vscode-Ozone-CubeMX-Arm-GNU-Toolchain-Makefile-STM32开发环境/ce9ba859f59b47689e53ca68abd51924.png)
# 三、安装chocolatey
>管理员模式运行PowerShell，然后输入以下代码
```
# 设置安装目录
[System.Environment]::SetEnvironmentVariable('ChocolateyInstall', 'D:\Your\ChocolateyPath', 'Machine')

# 安装chocolatey
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```
# 四、安装make
```
# 先设置安装环境
choco config set cacheLocation "D:\ChocolateyCache"
choco config set customInstallLocation "D:\Program Files\chocolatey_install"

# 安装make
choco install make
```
>设置环境变量
![](/images/Windows下搭建Vscode-Ozone-CubeMX-Arm-GNU-Toolchain-Makefile-STM32开发环境/5481249617604b958ee9b70e912f1084.png)

>测试make是否安装成功

```
# 在cmd或者PowerShell中输入
make -v
```
![](/images/Windows下搭建Vscode-Ozone-CubeMX-Arm-GNU-Toolchain-Makefile-STM32开发环境/7f1c1c9ac95c444687005ea6d76dffcf.png)
>至此本教程结束