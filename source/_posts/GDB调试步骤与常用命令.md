---
title: GDB调试步骤与常用命令
date: 2026-02-01 14:20:53
tags:
    - GDB
    - 开发环境搭建
---


# 一、 调试流程概览

| 步骤 | 命令 | 说明 |
| :--- | :--- | :--- |
| **1. 编译带调试信息** | `g++ -g program.cpp -o program` | 生成包含调试信息的可执行文件 |
| **2. 启动调试器** | `gdb program.exe` | 启动 GDB 并加载程序 |
| **3. 设置断点** | `break main` 或 `b 15` | 在函数或行号设置断点 |
| **4. 运行程序** | `run` | 开始执行程序 |
| **5. 控制执行** | `next`, `step`, `continue` | 单步执行或继续 |
| **6. 检查变量** | `print variable` | 查看变量值 |
| **7. 退出调试** | `quit` | 退出 GDB |

---

##  详细调试步骤

### 1. 编译带调试信息的程序
首先使用 `-g` 选项编译，生成包含调试信息的可执行文件：

```bash
# 基本编译（包含调试信息）
g++ -g main.cpp -o main.exe

# 推荐编译选项（调试版本）
g++ -g -O0 -Wall -Wextra -std=c++17 main.cpp -o main.exe

# 如果有多个源文件
g++ -g -O0 *.cpp -o program.exe

```

**编译选项说明：**

* `-g`：生成调试信息
* `-O0`：关闭优化（调试时必需，防止代码乱跳）
* `-Wall -Wextra`：显示所有警告
* `-std=c++17`：使用 C++17 标准

### 2. 启动 GDB 调试器

```bash
# 方式 1：启动 GDB 并直接加载程序
gdb main.exe

# 方式 2：先启动 GDB，再手动加载程序
gdb
(gdb) file main.exe

```

### 3. 基本调试命令

#### 设置断点 (Breakpoints)

```gdb
# 在函数入口设置断点
(gdb) break main
(gdb) b main

# 在特定行号设置断点
(gdb) break 15
(gdb) b 15

# 在特定文件的特定行设置断点
(gdb) break main.cpp:20

# 设置条件断点
(gdb) break 25 if i == 5

# 查看所有断点
(gdb) info breakpoints

# 删除断点
(gdb) delete 1        # 删除1号断点
(gdb) d               # 删除所有断点

```

#### 运行和控制程序执行

```gdb
# 运行程序
(gdb) run
(gdb) r

# 传入命令行参数运行
(gdb) run arg1 arg2

# 单步执行（Next，不进入函数内部）
(gdb) next
(gdb) n

# 单步执行（Step，进入函数内部）
(gdb) step
(gdb) s

# 继续执行到下一个断点
(gdb) continue
(gdb) c

# 执行完当前函数并返回到调用处
(gdb) finish

# 直到退出当前循环或到达当前行之后
(gdb) until

```

#### 查看和修改变量

```gdb
# 打印变量值
(gdb) print variable
(gdb) p variable

# 打印表达式或数组成员
(gdb) p i + 5
(gdb) p array[3]
(gdb) p object.member

# 手动修改变量值（调试逻辑时很有用）
(gdb) set variable i = 10

# 自动显示变量（每次停顿时都会显示）
(gdb) display variable
(gdb) undisplay 1      # 取消编号为1的自动显示

# 查看变量类型
(gdb) whatis variable

# 查看当前作用域的局部变量
(gdb) info locals

# 查看函数传入参数
(gdb) info args

```

#### 查看代码和调用栈

```gdb
# 查看当前行附近的源代码
(gdb) list
(gdb) l

# 查看特定位置代码
(gdb) list 15
(gdb) list main

# 查看调用栈（Backtrace）
(gdb) backtrace
(gdb) bt

# 查看当前所在的栈帧信息
(gdb) frame
(gdb) info frame

# 切换到指定的栈帧（用于查看父函数的变量）
(gdb) frame 2

```

---

##  完整调试示例

### 示例程序：`debug_demo.cpp`

```cpp
#include <iostream>
#include <vector>

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    int sum = 0;
    
    std::cout << "Calculating factorial sum..." << std::endl;
    
    for (int i = 0; i < numbers.size(); i++) {
        int fact = factorial(numbers[i]);
        sum += fact;
        std::cout << numbers[i] << "! = " << fact << std::endl;
    }
    
    std::cout << "Total sum: " << sum << std::endl;
    return 0;
}

```

### 调试会话

```bash
# 1. 编译
g++ -g -O0 -Wall debug_demo.cpp -o debug_demo.exe

# 2. 启动
gdb debug_demo.exe

# 3. 常用操作序列
(gdb) b main                    # 断在入口
(gdb) b factorial               # 断在递归函数
(gdb) r                         # 开始跑

(gdb) n                         # 走一步
(gdb) p numbers                 # 看看 vector 里的东西
(gdb) c                         # 跳到 factorial 断点
(gdb) p n                       # 看看递归参数
(gdb) watch sum                 # 监视 sum 变量，变了就停
(gdb) c                         # 继续
(gdb) q                         # 搞定退出

```

---

## 高级调试

### 条件断点和观察点

* **条件断点**：`(gdb) break 15 if i == 3`
* **观察点 (Watchpoints)**：
* `watch var`：当变量被**写入**时暂停。
* `rwatch var`：当变量被**读取**时暂停。
* `awatch var`：当变量被**读或写**时暂停。



### 多线程调试

* `info threads`：查看所有线程。
* `thread <ID>`：切换到特定线程。
* `break line thread <ID>`：只在特定线程中设置断点。

### 信号处理

* `info signals`：查看 GDB 如何处理各种系统信号。
* `handle SIGINT stop`：收到中断信号时停止程序。

---

##  实用命令速查

| 命令 | 简写 | 功能 |
| --- | --- | --- |
| `run` | `r` | 运行程序 |
| `break` | `b` | 设置断点 |
| `next` | `n` | 单步执行（跳过函数） |
| `step` | `s` | 单步执行（进入函数） |
| `continue` | `c` | 继续执行到下个断点 |
| `print` | `p` | 打印变量值 |
| `backtrace` | `bt` | 查看调用栈 |
| `list` | `l` | 查看源代码 |
| `info b` | `i b` | 查看断点列表 |
| `delete` | `d` | 删除断点 |
| `quit` | `q` | 退出 GDB |

---

##  调试场景

### 1. 调试已崩溃 (Segment Fault) 的程序

利用 Core Dump 文件：

```bash
gdb program.exe core.dump
(gdb) bt          # 直接定位崩溃瞬间的函数调用链
(gdb) p *this     # 查看当时对象的状态

```

### 2. 调试正在运行的程序

```bash
# 找到进程 PID 后直接附加
gdb -p <PID>

# 或者在 GDB 内部附加
(gdb) attach <PID>

```

---

## 常见问题解决

* **找不到调试信息**：检查 `file program.exe` 的输出。如果没有 `with debug_info`，请确认 `g++` 编译时加了 `-g`。
* **变量被优化掉 (value optimized out)**：确保编译参数是 `-O0`。
* **No symbol table**：确认没有执行过 `strip` 命令，该命令会移除所有调试符号。

