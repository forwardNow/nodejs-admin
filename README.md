# 接口文档

- [接口文档](#%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3)
  - [1. 错误码(errorCode)](#1-%E9%94%99%E8%AF%AF%E7%A0%81errorcode)
  - [2. 会话 - 10yyzz](#2-%E4%BC%9A%E8%AF%9D---10yyzz)
    - [2.1. 登陆 - 1001zz](#21-%E7%99%BB%E9%99%86---1001zz)
      - [2.1.1. 请求](#211-%E8%AF%B7%E6%B1%82)
      - [2.1.2. 响应](#212-%E5%93%8D%E5%BA%94)
    - [2.2. 登出 - 1002zz](#22-%E7%99%BB%E5%87%BA---1002zz)
      - [2.2.1. 请求](#221-%E8%AF%B7%E6%B1%82)
      - [2.2.2. 响应](#222-%E5%93%8D%E5%BA%94)
  - [3. 用户管理 - 11yyzz](#3-%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86---11yyzz)
    - [3.1. 用户添加 - 1101zz](#31-%E7%94%A8%E6%88%B7%E6%B7%BB%E5%8A%A0---1101zz)
      - [3.1.1. 请求](#311-%E8%AF%B7%E6%B1%82)
      - [3.1.2. 响应](#312-%E5%93%8D%E5%BA%94)
    - [3.2. 用户列表 - 1102zz](#32-%E7%94%A8%E6%88%B7%E5%88%97%E8%A1%A8---1102zz)
      - [3.2.1. 请求](#321-%E8%AF%B7%E6%B1%82)
      - [3.2.2. 响应](#322-%E5%93%8D%E5%BA%94)
    - [3.3. 用户删除 - 1103zz](#33-%E7%94%A8%E6%88%B7%E5%88%A0%E9%99%A4---1103zz)
      - [3.3.1. 请求](#331-%E8%AF%B7%E6%B1%82)
      - [3.3.2. 响应](#332-%E5%93%8D%E5%BA%94)
    - [3.4. 用户编辑 - 1104zz](#34-%E7%94%A8%E6%88%B7%E7%BC%96%E8%BE%91---1104zz)
      - [3.4.1. 请求](#341-%E8%AF%B7%E6%B1%82)
      - [3.4.2. 响应](#342-%E5%93%8D%E5%BA%94)
    - [3.5. 获取用户 - 1105zz](#35-%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7---1105zz)
      - [3.5.1. 请求](#351-%E8%AF%B7%E6%B1%82)
      - [3.5.2. 响应](#352-%E5%93%8D%E5%BA%94)
    - [3.6. 登录名唯一性检查 - 1106zz](#36-%E7%99%BB%E5%BD%95%E5%90%8D%E5%94%AF%E4%B8%80%E6%80%A7%E6%A3%80%E6%9F%A5---1106zz)
      - [3.6.1. 请求](#361-%E8%AF%B7%E6%B1%82)
      - [3.6.2. 响应](#362-%E5%93%8D%E5%BA%94)
  - [4. 字典类型 - 12yyzz](#4-%E5%AD%97%E5%85%B8%E7%B1%BB%E5%9E%8B---12yyzz)
    - [4.1. 字典类型列表 - 1201zz](#41-%E5%AD%97%E5%85%B8%E7%B1%BB%E5%9E%8B%E5%88%97%E8%A1%A8---1201zz)
      - [4.1.1. 请求](#411-%E8%AF%B7%E6%B1%82)
      - [4.1.2. 响应](#412-%E5%93%8D%E5%BA%94)
  - [5. 字典项 - 13yyzz](#5-%E5%AD%97%E5%85%B8%E9%A1%B9---13yyzz)
    - [5.1. 获取字典 - 1301zz](#51-%E8%8E%B7%E5%8F%96%E5%AD%97%E5%85%B8---1301zz)
      - [5.1.1. 请求](#511-%E8%AF%B7%E6%B1%82)
      - [5.1.2. 响应](#512-%E5%93%8D%E5%BA%94)

## 1. 错误码(errorCode)

`xxyyzz`

- 类型：Number
- `xx` 业务模块类型，如会话管理模块（10）
- `yy` 子业务模块类型，如登陆子模块（01）
- `zz` 错误类型，如用户名或密码错误（01）

**通用错误码**：

| 错误代码 | 描述                             |
| ---------- | -------------------------------- |
| 0          | 处理成功                         |
| 401        | 未登录         |
| 403        | 未授权 |
| 500        | 其他错误           |

## 2. 会话 - 10yyzz

### 2.1. 登陆 - 1001zz

#### 2.1.1. 请求

| 方法 | URL        | 参数                       |
| ---- | ---------- | -------------------------- |
| POST | /api/session/login | clientName、clientPassword |

示例：

```json
// POST /api/session/login
{
  "clientName": "admin",
  "clientPassword": "7410"
}
```

#### 2.1.2. 响应

成功：

```json
{
  "errorCode": 0,
  "reason": "OK",
  "result": {
    "clientId": "1",
    "clientName": "admin",
    "clientPassword": "7410", // 明文存储密码
    "createtime": "2018-09-17T02:14:18.523Z",
    "modifiedtime": "2018-09-17T02:14:18.523Z",
    "clientTrueName": "超级管理员",
    "clientUserSex": -1,
    "allowLogin": 1,
    "clientUserIdCard": "",
    "clientUserPhoneNum": "",
    "clientUserEmail": "",
    "createuserid": "",
    "createusername": "",
    "modifieduserid": "",
    "modifiedusername": "",
    "isdeleted": 0
  }
}
```

失败：

```json
{
  "errorCode": 100101,
  "reason": "clientName or clientPassword is invalid."
}
```

### 2.2. 登出 - 1002zz

#### 2.2.1. 请求

| 方法 | URL                 | 参数   |
| ---- | ------------------- | ------ |
| POST | /api/session/logout | （无） |

示例：

```json
// POST /api/session/logout
{
}
```

#### 2.2.2. 响应

成功：

```json
{
  "errorCode": 0,
  "reason": "OK"
}
```

失败：

```json
{
  "errorCode": 100201,
  "reason": "logout fail."
}
```

## 3. 用户管理 - 11yyzz

### 3.1. 用户添加 - 1101zz

#### 3.1.1. 请求

| 方法 | URL        | 参数                       |
| ---- | ---------- | -------------------------- |
| POST | /api/user/add | User 对象 |

示例：

```json
// POST /api/user/add
{
  "clientName" : "admin2",
  "clientPassword" : "123",
  "clientTrueName" : "吴钦飞",
  "clientUserEmail" : "w@q.c",
  "clientUserPhoneNum" : "18707127626",
  "clientUserSex" : 0
}
```

#### 3.1.2. 响应

成功：

```json
{
  "errorCode": 0,
  "reason": "OK"
}
```

失败：

```json
{
  "errorCode": 110101,
  "reason": "add user fail."
}
```

### 3.2. 用户列表 - 1102zz

#### 3.2.1. 请求

| 方法 | URL        | 参数                       |
| ---- | ---------- | -------------------------- |
| POST | /api/user/list | clientName（模糊查询）、pager（分页相关） |

示例：

```json
// POST /api/user/list
{
  "clientName": "a",
  "pager": {
      "pageSize": 10,  // 一页的大小
      "currentPage": 1 // 请求的页数
  }
}
```

#### 3.2.2. 响应

成功：

```json
{
  "errorCode": 0,
  "reason": "OK",
  "result": {
    "items": [
      {
        "clientTrueName": "超级管理员",
        "clientUserSex": -1,
        "allowLogin": 1,
        "clientUserIdCard": "",
        "clientUserPhoneNum": "",
        "clientUserEmail": "",
        "createuserid": "",
        "createusername": "",
        "modifieduserid": "",
        "modifiedusername": "",
        "isdeleted": 0,
        "clientName": "admin",
        "clientPassword": "7410",
        "clientId": "f56ad4a0-c061-11e8-bc13-574c511256c4",
        "createtime": "2018-09-25T01:25:59.664Z",
        "modifiedtime": "2018-09-25T01:25:59.664Z",
      }
    ],
    "pager": {
      "pageSize": 1,
      "total": 10,
      "currentPage": 1
    }
  }
}
```

失败：

```json
{
  "errorCode": 110201,
  "reason": "add user fail."
}
```

### 3.3. 用户删除 - 1103zz

#### 3.3.1. 请求

| 方法 | URL        | 参数                       |
| ---- | ---------- | -------------------------- |
| POST | /api/user/delete | clientId |

示例：

```json
// POST /api/user/delete
{
  "clientId":"3a7eb940-c12e-11e8-8965-69aa80fbc37d"
}
```

#### 3.3.2. 响应

成功：

```json
{
  "errorCode": 0,
  "reason": "OK"
}
```

失败：

```json
{
  "errorCode": 110301,
  "reason": "delete user fail."
}
```

### 3.4. 用户编辑 - 1104zz

#### 3.4.1. 请求

| 方法 | URL        | 参数                       |
| ---- | ---------- | -------------------------- |
| POST | /api/user/edit | User 对象 |

示例：

```json
// POST /api/user/edit
{
  "clientId": "f56ad4a0-c061-11e8-bc13-574c511256c4",
  "clientName": "admin",
  "clientPassword": "7410",
  "clientTrueName": "超级管理员",
  "clientUserSex": -1,
  "clientUserPhoneNum": "",
  "clientUserEmail": ""
}
```

#### 3.4.2. 响应

成功：

```json
{
  "errorCode": 0,
  "reason": "OK"
}
```

失败：

```json
{
  "errorCode": 110401,
  "reason": "edit user fail."
}
```

### 3.5. 获取用户 - 1105zz

#### 3.5.1. 请求

| 方法 | URL        | 参数                       |
| ---- | ---------- | -------------------------- |
| POST | /api/user/get | clientId |

示例：

```json
// POST /api/user/get
{
  "clientId": "f56ad4a0-c061-11e8-bc13-574c511256c4"
}
```

#### 3.5.2. 响应

成功：

```json
{
  "errorCode": 0,
  "reason": "OK"
}
```

失败：

```json
{
  "errorCode": 110501,
  "reason": "get user fail."
}
```

### 3.6. 登录名唯一性检查 - 1106zz

#### 3.6.1. 请求

| 方法 | URL        | 参数                       |
| ---- | ---------- | -------------------------- |
| POST | /api/user/unique | clientName |

示例：

```json
// POST /api/user/unique
{
  "clientName": "admin"
}
```

#### 3.6.2. 响应

成功：

```json
{
  "errorCode": 0,
  "reason": "OK"
}
```

失败：

```json
{
  "errorCode": 110601,
  "reason": "user is exist."
}
```

## 4. 字典类型 - 12yyzz

### 4.1. 字典类型列表 - 1201zz

#### 4.1.1. 请求

| 方法 | URL        | 参数                       |
| ---- | ---------- | -------------------------- |
| POST | /api/dic/list/list | (无) |

示例：

```json
// POST /api/dic/list/list
{
}
```

#### 4.1.2. 响应

成功：

```json
{
  "errorCode": 0,
  "reason": "OK",
  "result": {
    "pager": {
      "total": 2,
      "pageSize": 10,
      "currentPage": 1
    },
    "items": [
      {
        "dicName": "gender",
        "available": 1, // 0 - 不可用，1 - 可用。
      },
    ]
  }
}
```

失败：

```json
{
  "errorCode": 130101,
  "reason": "get dic error."
}
```

## 5. 字典项 - 13yyzz

### 5.1. 获取字典 - 1301zz

#### 5.1.1. 请求

| 方法 | URL        | 参数                       |
| ---- | ---------- | -------------------------- |
| POST | /api/dic/item/all | dicName |

示例：

```json
// POST /api/dic/item/all
{
  "dicName": "gender"
}
```

#### 5.1.2. 响应

成功：

```json
{
  "errorCode": 0,
  "reason": "OK",
  "result": {
    "pager": {
      "total": 2
    },
    "items": [
      {
        "code": 0,
        "text": "男",
        "available": 1, // 0 - 不可用，1 - 可用。
      },
      {
        "code": 1,
        "text": "女",
        "available": 1, // 0 - 不可用，1 - 可用。
      },
    ]
  }
}
```

失败：

```json
{
  "errorCode": 130101,
  "reason": "get dic error."
}