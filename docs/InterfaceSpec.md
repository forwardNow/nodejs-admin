# 接口规范

## 1. 介绍

针对基于 HTTP/HTTPS 协议的数据交换进行约束。

## 2. 说明

* URI 格式：`/api/模块名/操作`
* HTTP 报文数据部分的内容类型：`Content-Type: application/json`
* HTTP 响应的状态码统一为 200。（无论处理成功或失败）

## 3. 数据交换基本格式

普通请求与响应

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

分页请求与响应

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

## 4. 模块基本 API 格式

> 以部门模块（`dept`）为例：

| 基本（基础）API    | 参数                            | 说明                   |
| ------------------ | ------------------------------- | ---------------------- |
| `/api/dept/get`    | `deptId`                        | 根据主键（PK）获取实体 |
| `/api/dept/delete` | `deptId`                        | 根据主键删除实体       |
| `/api/dept/insert` | `detpName`, `deptDesc`          | 插入实体               |
| `/api/dept/update` | `deptId`, `detpName`,`deptDesc` | 根据主键更新非空字段   |
| `/api/dept/list`   | `deptName`（模糊）              | 分页查询               |
