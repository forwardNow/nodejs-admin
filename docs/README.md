# 前言

>The easier your API is to consume, the more people that will consume it.

## 1. 介绍

基于 HTTP 的服务，有两种风格（体系/架构）的 API：

* RPC（Remote Procedure Call，远程过程调用，面向方法）
* REST（Representational State Transfer，表现层状态转移，面向资源）

RPC 与 REST 没有好坏之分，只是应用场景不同。

## 2. RPC

简单的 HTTP 请求：

```text
GET /getUserById?id=1 HTTP/1.1
Host: api.example.org
Accept: application/json
```

RPC 关注点在方法，可以认为通过 HTTP 调用服务器的程序并获取返回结果。

优点：

* 输入输出非常明晰，且节省带宽

缺点：

* URI（`/getUserById?id=1`） 跟方法调用差不多
* 只适用于 1 ~ 2 个客户端，扩展性不好

## 3. REST

简单的 HTTP 请求：

```text
GET /user/1 HTTP/1.1
Host: api.example.org
Accept: application/json
```

REST 风格体系最早在 2000 年被提出；在 2010 年，将近 74% 的公开网络 API 是 HTTP REST API。

REST 的关注点在资源（Resources）上，将数据与业务逻辑进行解耦。

资源的三要素：

* 动词：POST、GET、PUT、DELETE。（CRUD，对资源的操作）
* 名词：URI。（资源标识符）
* 表述：JSON、XML、HTML、JPG、...。(资源的表述)

## 4. 比较

|类别|RPC|REST|
|-|-|-|
| 关注点 | 方法 | 资源 |
| 核心 | 动词 | 名词 |

## 5. 参考

* [Principles of good RESTful API Design](https://codeplanet.io/principles-good-restful-api-design/)
* [Consumer-Centric API Design v0.4.0](https://github.com/tlhunter/consumer-centric-api-design)
* [理解RESTful架构](http://www.ruanyifeng.com/blog/2011/09/restful.html)
* [RESTful API 设计指南 —— 阮一峰](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)
* [天眼查 Open API](https://open.tianyancha.com/open/362)
* [RPC Style vs. REST Web APIs](https://blog.jscrambler.com/rpc-style-vs-rest-web-apis/)
* [Resource Oriented Design](https://cloud.google.com/apis/design/resources)
* [REST资源三要素](https://blog.csdn.net/u013628152/article/details/42810005)
* [SSL/TLS协议运行机制的概述](http://www.ruanyifeng.com/blog/2014/02/ssl_tls.html)
* [服务端指南 | 良好的 API 设计指南](https://juejin.im/post/59826a4e518825359c5e72d1)