# 接口规范

## 1. 介绍

网络应用程序，分为前端和后端两个部分。当前的发展趋势，就是前端设备层出不穷（手机、平板、桌面电脑、其他专用设备......）。

因此，必须有一种统一的机制，方便不同的前端设备与后端进行通信。这导致 API 构架的流行，甚至出现 "API First" 的设计思想。RESTful API 是目前比较成熟的一套互联网应用程序的 API 设计理论。

这里将探讨一套合理、好用的 API。

## 2. 协议

API 与用户的通信协议，推荐使用 HTTPs 协议。

如果采用 HTTP 进行通信，所有信息明文传播，带来了三大风险。

* 窃听风险（eavesdropping）：第三方可以获知通信内容。
* 篡改风险（tampering）：第三方可以修改通信内容。
* 冒充风险（pretending）：第三方可以冒充他人身份参与通信。

## 3. 域名

尽量将 API 部署在单独的域名，如

```text
https://api.example.com
```

也可以将其放在主域名之下，如

```text
https://example.com/api
```

## 4. 版本

将 API 的版本放入 URL。

```text
https://example.com/api/v1/users
```

## 5. 路径（Endpoint）

路径又称"终点"（endpoint），表示 API 的具体 URL（URI）。

每个 URL 代表一个资源（resource），URL 里只能有名词，不能有动词；采用的名词与数据库表的表名对应。

一般来说，数据库中的表都是同种记录的"集合"（collection），所以 API 中的名词也应该使用复数。

比如：

```text
https://example.com/api/v1/users
https://example.com/api/v1/roles
https://example.com/api/v1/menus
```

## 6. HTTP 动词

对于资源的具体操作类型，由 HTTP 动词表示。

常用的 HTTP 动词有下面五个。

| HTTP 动词 | 对应的 SQL 命令 | 说明 |
| - | - | - |
| GET | SELECT | 从服务器取出资源（一项或多项） |
| POST | CREATE | 在服务器新建一个资源 |
| PUT | UPDATE | 在服务器更新资源（更新数据库某条记录的所有字段） |
| PATCH | UPDATE | 在服务器更新资源（更新数据库某条记录的个别字段） |
| DELETE | DELETE | 从服务器删除资源 |

示例：

| API | SQL | 说明 |
| - | - | - |
| `GET /users` | `select * from Users` | 列出所有的用户 |
| `POST /users` | `insert into Users(col1,...,coln)`<br />`values(val1,...,valn)` | 新建用户 |
| `GET /users/{ UserId }` | `select * from Users`<br />`where UserId = { UserId }` | 获取指定用户 |
| `PUT /users/{ UserId }` | `update Users `<br />`set col1 = val1,...,coln = valn`<br />`where UserId ={ UserId } ` | 更新指定用户的所有信息 |
| `PATCH /users/{ UserId }` | `udpate Users`<br />`set IsDeleted = 1`<br />`where UserId ={ UserId }` | 更新指定用户的个别信息 |
| `DELETE /users/{ UserId }` | `delete from Users`<br />`where UserId = { UserId }` | 删除指定用户 |
| `GET /users/{ UserId }/roles` |  | 列出指定用户的所有角色 |

## 7. 过滤信息（Filtering）

如果记录数量很多，服务器不可能都将它们返回给用户。API应该提供参数，过滤返回结果。

下面是一些常见的参数。

| 参数 | 说明 |
| - | - |
| `_limit=<Number>` | 指定返回的记录数 |
| `_offset=<Number>` | 偏移量 |
| `_orderby={field} [asc|desc]` | 指定返回结果按照哪个属性排序，以及排序顺序 |
| `_count=<Boolean>` | 查询总数 |
| `_keyword={field}={value},...` | 指定筛选条件（模糊查询） |
| `UserName={value}` | 指定筛选条件（精确查询） |

参数的设计允许存在冗余，即允许 API 路径和 URL 参数偶尔有重复。比如

```text
GET /users/{ UserId }/roles
GET /roles?UserId={ UserId }
```

## 8. 返回结果

针对不同操作，服务器向用户返回的结果应该符合以下规范。

| 操作 | 说明 | 示例 |
|-|-|-|
| `GET /collection` | 返回资源对象的列表（数组） | `GET /users`<br /> => `[ {...}, {...} ]` |
| `GET /collection/resource` | 返回单个资源对象 | `GET /users/2` <br />=> `{ col1: val1, ...}` |
| `POST /collection` | 返回新生成的资源对象 | `POST /users` <br />=> `{ col1: val1, ...}` |
| `PUT /collection/resource` | 返回完整的资源对象 | `PUT /users/2` <br />=> `{ col1: val1, ...}` |
| `PATCH /collection/resource` | 返回完整的资源对象 | `PATCH /users/2` <br />=> `{ col1: val1, ...}` |
| `DELETE /collection/resource` | 返回一个空文档 | `DELETE /users/2`<br /> => `{}` |

## 9. 状态码

服务器向用户返回的状态码和提示信息，常见的有以下一些

| 状态码 | 描述 | 说明 |
| - | - | - |
| 200 | OK | 服务器成功返回用户请求的数据 |
| 401 | Unauthorized | 表示用户没有权限（令牌、用户名、密码错误） |
| 403 | Forbidden | 表示用户得到授权（与401错误相对），但是访问是被禁止的 |
| 404 | NOT FOUND | 用户发出的请求针对的是不存在的记录，服务器没有进行操作 |
| 500 | INTERNAL SERVER ERROR | 服务器发生错误，用户将无法判断发出的请求是否成功。 |

## 10. 错误处理

如果状态码不是 200，就应该向用户返回出错信息。

```json
{
  "errorCode": 401,
  "reason": "Unauthorized"
}
```

| errorCode | reason |
|-|-|
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | NOT FOUND |
| 500 | INTERNAL SERVER ERROR |
