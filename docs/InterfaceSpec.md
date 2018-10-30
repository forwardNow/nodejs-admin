# 接口规范

## 1. 介绍

针对基于 HTTP/HTTPS 协议的数据交换进行约束。

## 2. 说明

* URI 格式：`/api/模块名/操作`
* HTTP 报文数据部分的内容类型：`Content-Type: application/json`
* HTTP 响应的状态码统一为 200。（无论处理成功或失败）
