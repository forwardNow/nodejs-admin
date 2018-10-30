# 通用(基础) API

## 1. 介绍

为了一致性，抽取通用的 CRUD API。

## 2. 示例

> 以部门模块（`dept`）为例：

| 基本（基础）API    | 操作编码 |参数                            | 说明                   |
| ------------------ | - |------------------------------- | ---------------------- |
| `/api/dept/get`    | `01` |`deptId`                        | 根据主键（PK）获取实体 |
| `/api/dept/delete` | `02` |`deptId`                        | 根据主键删除实体       |
| `/api/dept/insert` | `03` |`detpName`, `deptDesc`          | 插入实体               |
| `/api/dept/update` | `04` |`deptId`, `detpName`,`deptDesc` | 根据主键更新非空字段   |
| `/api/dept/list`   | `05` |`deptName`（模糊）              | 分页查询               |
