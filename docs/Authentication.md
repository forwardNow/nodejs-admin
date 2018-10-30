# 认证与授权

## 1. 介绍

废弃 `session + cookie` 的方式，采用 [JWT(JSON Web Token)](https://tools.ietf.org/html/rfc7519) 的方式。

可以将 `UserId` 编码到 JWT。

## 2. 说明

首先，通过密码凭证获取到访问令牌（Access Token），如下图

```text
    +----------+                                      +----------+
    |          |                                      |   API    |
    |   User   |                                      |  Server  |
    |          |                                      |          |
    +----------+                                      +----------+
        v                                               ^     v
        |         User                    User          |     |
       (A) Password Credentials   Password Credentials (C)   (D) Access Token
        |                                               |     |
        v                                               ^     v
    +---------+                                  +---------------+
    |         |>--(B)--------- User ------------>|               |
    |         |         Password Credentials     |     Nginx     |
    | Browser |                                  |     Server    |
    |         |<--(E)---- Access Token ---------<|               |
    |         |                                  |               |
    +---------+                                  +---------------+
```

然后，后续的所有请求都携带自定义请求头 `token: xxxx`，用于验证登陆有效性、是否有权限访问。
