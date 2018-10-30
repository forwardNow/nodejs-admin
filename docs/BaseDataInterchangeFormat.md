# 数据交换基本格式

## 1. 介绍

进行数据交换的格式主要分为两种情况：普通请求与响应、分页请求与响应。

## 2. 普通请求与响应

```json
// POST /api/session/login
{
  "loginName": "admin",
  "loginPassword": "7410"
}
```

```json
{
  "errorCode": 0, // 错误码
  "reason": "OK", // 描述
  "result": {     // 数据部分
    // ...
  }
}
```

## 3. 分页请求与响应

```json
// POST /api/user/list
{
  "userName": "张",
  "pager": {
      "pageSize": 10,  // 一页的大小
      "currentPage": 1 // 请求的页数
  }
}
```

```json
{
  "errorCode": 0,
  "reason": "OK",
  "result": {
    "items": [
      { "id": 1, "userName": "张三" },
      { "id": 2, "userName": "张四" },
    ],
    "pager": {
      "total": 2,
      "pageSize": 10,
      "currentPage": 1
    }
  }
}
```