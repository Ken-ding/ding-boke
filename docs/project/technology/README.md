## 整体内容
![image.png](https://cdn.nlark.com/yuque/0/2021/png/309803/1612792931133-c24183b0-6fe6-486f-828b-24d42d5e8946.png#align=left&display=inline&height=1246&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1246&originWidth=1934&size=600826&status=done&style=none&width=1934)

## 参考案例
![流程图图片.png](https://cdn.nlark.com/yuque/0/2020/png/309803/1584338665395-22ce62e7-7b01-4ac1-ae99-951916b037df.png#align=left&display=inline&height=1436&margin=%5Bobject%20Object%5D&name=%E6%B5%81%E7%A8%8B%E5%9B%BE%E5%9B%BE%E7%89%87.png&originHeight=1436&originWidth=2486&size=1053532&status=done&style=none&width=2486)
## 页面业务逻辑流程图
### 会员评级
![会员评级_lct.png](https://cdn.nlark.com/yuque/0/2020/png/309803/1584413851094-02f4d50e-1f4d-4cc4-83e1-daf70f57a62c.png#align=left&display=inline&height=1016&margin=%5Bobject%20Object%5D&name=%E4%BC%9A%E5%91%98%E8%AF%84%E7%BA%A7_lct.png&originHeight=1016&originWidth=856&size=212063&status=done&style=none&width=856)
### 会员规则
![会员规则_lct.png](https://cdn.nlark.com/yuque/0/2020/png/309803/1584413808766-0c9659dc-b1f0-499f-8851-2cffe8c32499.png#align=left&display=inline&height=1172&margin=%5Bobject%20Object%5D&name=%E4%BC%9A%E5%91%98%E8%A7%84%E5%88%99_lct.png&originHeight=1172&originWidth=1556&size=347743&status=done&style=none&width=1556)
### 会员权益
![会员权益_lct1.png](https://cdn.nlark.com/yuque/0/2020/png/309803/1584421255802-9fe23a2b-a9b2-43d0-8dd0-608bcd92b20c.png#align=left&display=inline&height=1134&margin=%5Bobject%20Object%5D&name=%E4%BC%9A%E5%91%98%E6%9D%83%E7%9B%8A_lct1.png&originHeight=1134&originWidth=1286&size=282139&status=done&style=none&width=1286)
### 历史会员规则
![历史会员规则_lct.png](https://cdn.nlark.com/yuque/0/2020/png/309803/1584413908662-1b50a0fe-05ad-44c8-b110-07f1c5e40e73.png#align=left&display=inline&height=1342&margin=%5Bobject%20Object%5D&name=%E5%8E%86%E5%8F%B2%E4%BC%9A%E5%91%98%E8%A7%84%E5%88%99_lct.png&originHeight=1342&originWidth=796&size=266174&status=done&style=none&width=796)
### 供应商评级
![供应商评级_lct.png](https://cdn.nlark.com/yuque/0/2020/png/309803/1584413938022-f1a36476-2b2c-4da8-8974-89a659414d55.png#align=left&display=inline&height=1046&margin=%5Bobject%20Object%5D&name=%E4%BE%9B%E5%BA%94%E5%95%86%E8%AF%84%E7%BA%A7_lct.png&originHeight=1046&originWidth=818&size=207882&status=done&style=none&width=818)
### 个人中心
![东经易网个人中心_lct.png](https://cdn.nlark.com/yuque/0/2020/png/309803/1584413984751-c86b10f8-d945-4359-94d2-646a620f92c4.png#align=left&display=inline&height=1052&margin=%5Bobject%20Object%5D&name=%E4%B8%9C%E7%BB%8F%E6%98%93%E7%BD%91%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83_lct.png&originHeight=1052&originWidth=768&size=223400&status=done&style=none&width=768)


## 任务分解


[会员体系任务分解](https://www.teambition.com/project/5e5daed657f72e0021c628d9/tasks/view/all)


ps:也可以使用ximd分解任务
## 接口文档（mock数据）
### 会员评级
#### 会员评级列表获取
##### 请求url：
```bash
http://172.17.0.77/djintelligent/memberRating/getList.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/memberRating/getList.do
```
##### 请求方式：POST
| 参数 | 是否必选 | 类型 | 说明 |
| :--- | :---: | :--- | :--- |
| fcityCode | N | string | 客户区域 |
| fuserName | N | string | 客户名称 |
| flevel | N | arr | 客户星级类型(0:无,1:一星,2:二星,3:三星,4:四星,5:五星,6:六星) |
| pagesize | Y | int | 分页条数 |
| pagenumeNum | Y | int | 目标分页 |



##### 返回示例：
```javascript
{
  msg:"保存成功！",
  code:"10000",
  data:{
  "total":2,
    "list":[
        {
          "fid": null,
          "fuserName": null,
          "fcity": null,
          "frule": null,
          "frating": null,
          "flastRating": null,
          "flevel": null
        },
        {
    "fid": null,
    "fuserName": null,
    "fcity": null,
    "frule": null,
    "frating": null,
    "flastRating": null,
    "flevel": null
  }
     ]
  },
  success:true
}

```
#### 会员评级查看详情
##### 请求url：
```bash
http://172.17.0.77/djintelligent/memberRating/viewDetails.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/memberRating/viewDetails.do
```
##### 请求方式：POST
| 参数 | 是否必选 | 类型 | 说明 |
| :--- | :---: | :--- | :--- |
| fuserId | Y | string | 客户id |
| fratingTime | N | string | 查询月份，默认当前月 |



##### 返回示例：
```javascript
{
  msg:"保存成功！",
  code:"10000",
  data:[
      fid: 1,
    {
      fnoGroupPurchaseBusiness:{ratioPoints:"20%",dataDetails:3224},
      forderFrequency:{ratioPoints:"20%",dataDetails:3224},
      fcardboardArea:{ratioPoints:"20%",dataDetails:3224}
		}
    {
      
    }
    ]，
  success:true
}
```
#### 会员评级查看趋势
##### 请求url：
```bash
http://172.17.0.77/djintelligent/memberRating/ViewTrends.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/memberRating/ViewTrends.do
```
##### 请求方式：POST
| 参数 | 是否必选 | 类型 | 说明 |
| :--- | :---: | :--- | :--- |
| fid | Y | string | 客户id |



##### 返回示例：
```javascript
//fStartType客户星级类型(0:无,1:一星,2:二星,3:三星,4:四星,5:五星,6:六星)
{
  msg:"保存成功！",
  code:"10000",
  data:{
    fid: 1,
    ftrendsData:[
      {
        fnoGroupPurchaseBusiness:15,
        forderFrequency:15,
        fcardboardArea:15,
        fmonth:"2019-01",
        fStartType:2
      },
      {
        fnoGroupPurchaseBusiness:15,
        forderFrequency:15,
        fcardboardArea:15,
        fmonth:"2019-02",
        fStartType:3
      },
      {
        fnoGroupPurchaseBusiness:15,
        forderFrequency:15,
        fcardboardArea:15,
        fmonth:"2019-03",
        fStartType:3
      }
    ]
  },
  success:true
}

```
### 会员规则

#### 会员规则列表获取
##### 请求url：
```bash
http://172.17.0.77/djintelligent/memberShipRules/getList.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/memberShipRules/getList.do
```
##### 请求方式：POST



| 参数 | 是否必选 | 类型 | 说明 |
| :--- | :---: | :--- | :--- |
| fkeyarea | N | string | 适用区域 |
| fruleName | N | string | 规则名称 |
| fPageSize | Y | int | 分页条数 |
| fPageNumgeNum | Y | int | 目标分页，默认 |



##### 返回示例：
```javascript
{
  msg:"请求成功！",
  code:"10000",
  data:{
    "total":2,
    "list":[
      {
        fid: 1,
        fruleName: "浙江省方案",
        fapplicableArea: [{
            "fprovinceCode": "anim ut Duis reprehenderit",
            "fprovinceName": "fugiat cillum dolor",
            "fcityCode": "Ut",
            "fcityName": "ad elit adipisicing non amet"
          }],
        fdataSourceType: [1,2,3],//纸板销售面积:1,非团购业务销售额:2,下单频次:3
        fcreationTime: "2019-8-6  14:52:24",
        fcreator: "胡歌",
        fstate:1 ,//启用:1,禁用:2,已删除:3
    	},
      {
        fid: 1,
        fruleName: "浙江省方案",
        fapplicableArea: [{
            "fprovinceCode": "anim ut Duis reprehenderit",
            "fprovinceName": "fugiat cillum dolor",
            "fcityCode": "Ut",
            "fcityName": "ad elit adipisicing non amet"
          }],
        fdataSourceType: [1,2,3],//纸板销售面积:1,非团购业务销售额:2,下单频次:3
        fcreationTime: "2019-8-6  14:52:24",
        fcreator: "胡歌",
        fstate:1 ,//禁用:1,启用:2,已删除:3
    	}
    ]
  },
  success:true
}

```
#### 会员规则保存
##### 请求url：
```bash
http://172.17.0.77/djintelligent/memberShipRules/save.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/memberShipRules/save.do
```
##### 请求方式：POST



| 参数 | 是否必选 | 类型 | 说明 |  |  |
| :--- | :---: | :--- | :--- | :--- | :--- |
| fid | N | string | 不传fid，新增数据，传fid，更新数据 |  |  |
| fkeyarea | Y | array | 适用区域 |  |  |
| fruleName | Y | string | 规则名称 |  |  |
| fdimensionScheme | Y | array | 维度方案 |  |  |
| child | fdataSource | Y | int | 数据源（纸板销售面积:1,非团购业务销售额:2,下单天数:3） |  |
| child | fstepInterval | Y | array | 价梯区间 |  |
|  | child | rowType | Y | int | 标识行类型（特殊行：1，普通行：2） |
|  |  | fmaxValue | Y | int | 上限值 |
|  |  | fminValue | Y | int | 下限值 |
|  |  | fbranc | Y | int | 分值 |

##### 返回示例：
```javascript
{
  msg:"保存成功！",
  code:"10000",
  data:"",
  success:true
}
```
#### 会员规则获取省，市
##### 请求url：
```bash
http://172.17.0.77/djintelligent/memberShipRules/getProvinceCity.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/memberShipRules/getProvinceCity.do
```
##### 请求方式：Get



| 参数 | 是否必选 | 类型 | 说明 |  |  |
| :--- | :---: | :--- | :--- | :--- | :--- |

##### 返回示例：
```javascript

{
  "msg": "amet nulla id culpa cupidatat",
  "code": "sit non",
  "data": [
    {
      "fprovinceCode": "sed cupidatat cillum enim",
      "fprovinceName": "Lorem labore dolore",
      "fcityCode": "culpa",
      "fcityName": "minim",
      "fisSelect": -76502252//是否可选 0 可选，1 不可选
    },
    {
      "fprovinceCode": "et tempor",
      "fprovinceName": "u",
      "fcityCode": "aliquip elit",
      "fcityName": "exercitation in do",
      "fisSelect": -39208560
    },
    {
      "fprovinceCode": "non dolor incididunt adipisicing",
      "fprovinceName": "in sed sint aliquip",
      "fcityCode": "culpa",
      "fcityName": "irure",
      "fisSelect": 29101618
    }
  ],
  "success": true
}
```
#### 会员规则获取数据源
##### 请求url：
```bash
http://172.17.0.77/djintelligent/memberShipRules/getdataSource.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/memberShipRules/getProvinceCity.do
```
##### 请求方式：Get



| 参数 | 是否必选 | 类型 | 说明 |  |  |
| :--- | :---: | :--- | :--- | :--- | :--- |

##### 返回示例：
```javascript

{
  msg:"获取成功！",
  code:"10000",
  data:[
        {
          value: 1,
          label: "纸板销售面积"
        },
        {
          value: 2,
          label: "非团购业务销售额"
        },
        {
          value: 3,
          label: "下单天数"
        }
      ],
  success:true
}
```
#### 会员规则查看,编辑
##### 请求url：
```bash
http://172.17.0.77/djintelligent/memberShipRules/edit.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/memberShipRules/edit.do
```
##### 请求方式：POST



| 参数 | 是否必选 | 类型 | 说明 |
| :--- | :---: | :--- | :--- |
| fid | Y | string | 规则id |

##### 返回示例：
```javascript

{
  msg:"请求成功！",
  code:"10000",
  data:{
    "total":2,
    "list":[
      {
        fid: 1,//规则id
        fruleName: "浙江省方案",
        fapplicableArea: "3301",
        fdimensionScheme: [
          {
          	fdataSource:1,
            fstepInterval:[
              {
              	rowType:true,
                fmaxValue:100,
                fminValue:50,
              },
              {
              	rowType:false,
                fmaxValue:100,
                fminValue:50,
              }
            ],
          },
          {
          	fdataSource:2,
            fstepInterval:[
              {
              	rowType:true,
                fmaxValue:100,
                fminValue:50,
              },
              {
              	rowType:false,
                fmaxValue:100,
                fminValue:50,
              }
            ],
          }
        ]
    	}
    ]
  },
  success:true
}
```
#### 会员规则删除
##### 请求url：
```bash
http://172.17.0.77/djintelligent/memberShipRules/delete.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/memberShipRules/delete.do
```
##### 请求方式：POST



| 参数 | 是否必选 | 类型 | 说明 |
| :--- | :---: | :--- | :--- |
| fruleId | Y | string | 规则id |

##### 返回示例：
```javascript

{
  msg:"删除成功！",
  code:"10000",
  data:"",
  success:true
}
```
#### 会员规则启用，禁用
##### 请求url：
```bash
http://172.17.0.77/djintelligent/memberShipRules/isEnable.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/memberShipRules/isEnable.do
```
##### 请求方式：POST



| 参数 | 是否必选 | 类型 | 说明 |
| :--- | :---: | :--- | :--- |
| fruleId | Y | string | 规则id |
| fisEnable | Y | int | 启用:2,禁用:1 |

##### 返回示例：
```javascript

{
  msg:"删除成功！",
  code:"10000",
  data:"",
  success:true
}
```
#### 会员规则校验名称
##### 请求url：
```bash
http://172.17.0.77/djintelligent/memberShipRules/checkName.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/memberShipRules/checkName.do
```
##### 请求方式：POST



| 参数 | 是否必选 | 类型 | 说明 |
| :--- | :---: | :--- | :--- |
| fruleName | Y | string | 规则id |
| fruleId |  |  |  |

##### 返回示例：
```javascript

{
  msg:"校验成功！",
  code:"10000",
  data:"",
  success:true
}
```
### 会员权益
#### 会员权益列表获取
##### 请求url：
```bash
http://172.17.0.77/djintelligent/memberShipInterests/getList.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/memberShipInterests/getList.do
```
##### 请求方式：POST



| 参数 | 是否必选 | 类型 | 说明 |
| :--- | :---: | :--- | :--- |
| flevel | Y | int | 客户星级类型(0:无,1:一星,2:二星,3:三星,4:四星,5:五星,6:六星) |



##### 返回示例：
```javascript

{
  "code": -21701613.865272895,
  "data": {
    "list": [
      {
        "fequityid": "ad consequat elit aute id",
        "fequityname": "nulla ad",
        "flevel": 570048.176856026,
        "fspecification": "eu nulla tempor cillum"
      },
      {
        "fequityid": "et veniam",
        "fequityname": "qui sunt ex pariatur",
        "flevel": -8151191.0212944,
        "fspecification": "aliquip reprehenderit cupid"
      },
      {
        "fequityid": "tempor commodo",
        "fequityname": "Ut cupidatat deserunt laborum",
        "flevel": -52214281.88488582,
        "fspecification": "mollit ut nulla ut ipsum"
      },
      {
        "fequityid": "minim s",
        "fequityname": "adipisi",
        "flevel": 3033354.772523418,
        "fspecification": "mollit veniam"
      },
      {
        "fequityid": "labore est in sit veniam",
        "fequityname": "sed in",
        "flevel": 58875357.481185466,
        "fspecification": "velit tempor anim veniam exercitation"
      }
    ]
  },
  "msg": "eu consectetur cillum minim",
  "success": true
}

```
#### 会员权益保存
##### 请求url：
```bash
http://172.17.0.77/djintelligent/memberShipInterests/save.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/memberShipInterests/save.do
```
##### 请求方式：POST



| 参数 | 是否必选 | 类型 | 说明 |
| :--- | :---: | :--- | :--- |
| fequityid | N | string | 传fid，更新数据，不传fid，添加数据 |
| fequityname | Y | string | 权益名称 |
| fspecification | Y | string | 权益描述 |



##### 返回示例：
```javascript

{
  msg:"保存成功！",
  code:"10000",
  data:{}，
  success:true
}

```
#### 会员权益删除
##### 请求url：
```bash
http://172.17.0.77/djintelligent/memberShipInterests/delete.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/memberShipInterests/delete.do
```
##### 请求方式：POST



| 参数 | 是否必选 | 类型 | 说明 |
| :--- | :---: | :--- | :--- |
| fequityid | Y | string | 权益id |



##### 返回示例：
```javascript

{
  msg:"删除成功！",
  code:"10000",
  data:{}，
  success:true
}

```
### 历史会员规则
#### 历史会员规则
#### 历史会员规则列表获取
##### 请求url：
```bash
http://172.17.0.77/djintelligent/memberShipRules/getList.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/memberShipRules/getList.do
```
##### 请求方式：POST



| 参数 | 是否必选 | 类型 | 说明 |
| :--- | :---: | :--- | :--- |
| fkeyarea | N | string | 适用区域 |
| fruleName | N | string | 规则名称 |
| fPageSize | Y | int | 分页条数 |
| fPageNumgeNum | Y | int | 目标分页，默认 |



##### 返回示例：
```javascript
{
  msg:"请求成功！",
  code:"10000",
  data:{
    "total":2,
    "list":[
      {
        fid: 1,
        fruleName: "浙江省方案",
        fapplicableArea: "3301",
        fdataSourceType: [1,2,3],//纸板销售面积:1,非团购业务销售额:2,下单频次:3
        fcreationTime: "2019-8-6  14:52:24",
        fcreator: "胡歌",
        fstate:1 ,//启用:1,禁用:2,已删除:3
    	},
      {
        fid: 1,
        fruleName: "浙江省方案",
        fapplicableArea: "3301",
        fdataSourceType: [1,2,3],//纸板销售面积:1,非团购业务销售额:2,下单频次:3
        fcreationTime: "2019-8-6  14:52:24",
        fcreator: "胡歌",
        fstate:1 ,//启用:1,禁用:2,已删除:3
    	}
    ]
  },
  success:true
}

```
#### 
#### 历史会员规则记录获取
##### 请求url：
```bash
http://172.17.0.77/djintelligent/historicalMembershipRules/getRecordList.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/historicalMembershipRules/viewgetRecordListRecord.do
```
##### 请求方式：POST



| 参数 | 是否必选 | 类型 | 说明 |
| :--- | :---: | :--- | :--- |
| fruleId | Y | string | 规则id |
| fstartTime | N | string |  |
| fendTime | N | string |  |



##### 返回示例：
```javascript

{
  msg:"请求成功！",
  code:"10000",
  data:{
    "total":2,
    "list":[
      {
        fid: 1,
        fruleName: "浙江省方案",
        fapplicableArea: "3301",
        fdataSourceType: [1,2,3],//纸板销售面积:1,非团购业务销售额:2,下单天数:3
        fupdataTime: "2019-8-6  14:52:24",
    	},
      {
        fid: 1,
        fruleName: "浙江省方案",
        fapplicableArea: "3301",
        fdataSourceType: [1,2,3],//纸板销售面积:1,非团购业务销售额:2,下单天数:3
        fupdataTime: "2019-8-6  14:52:24",
    	}
    ]
  },
  success:true
}

```
#### 历史规则记录查看
##### 请求url：
```bash
http://172.17.0.77/djintelligent/memberShipRules/viewRecord.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/memberShipRules/viewRecord.do
```
##### 请求方式：POST



| 参数 | 是否必选 | 类型 | 说明 |
| :--- | :---: | :--- | :--- |
| fid | Y | string | 历史规则id |

##### 返回示例：
```javascript

{
  msg:"请求成功！",
  code:"10000",
  data:{
    "total":2,
    "list":[
      {
        fid: 1,//规则id
        fruleName: "浙江省方案",
        fapplicableArea: "3301",
        fdimensionScheme: [
          {
          	fdataSource:1,
            fstepInterval:[
              {
              	rowType:true,
                fmaxValue:100,
                fminValue:50,
              },
              {
              	rowType:false,
                fmaxValue:100,
                fminValue:50,
              }
            ],
          },
          {
          	fdataSource:2,
            fstepInterval:[
              {
              	rowType:true,
                fmaxValue:100,
                fminValue:50,
              },
              {
              	rowType:false,
                fmaxValue:100,
                fminValue:50,
              }
            ],
          }
        ]
    	}
    ]
  },
  success:true
}
```
### 供应商评级
#### 供应商评级列表获取
##### 请求url：
```bash
http://172.17.0.77/djintelligent/supplierRating/getList.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/supplierRating/getList.do
```
##### 请求方式：POST
| 参数 | 是否必选 | 类型 | 说明 |
| :--- | :---: | :--- | :--- |
| fsupplierName | N | string | 客户区域 |
| fmonth | N | string | 月份 |
| fStartType | N | int | 客户星级类型(0:无,1:一星,2:二星,3:三星,4:四星,5:五星,6:六星) |
| fPageSize | Y | int | 分页条数 |
| fPageNumgeNum | Y | int | 目标分页 |



##### 返回示例：
```javascript

{
  msg:"保存成功！",
  code:"10000",
    
  data:[
    {
    "id": 24699153.046929553,
    "fsupplieid": "veniam amet",
    "fsuppliename": "reprehend",
    "fkeyarea": "ea",
    "flevel": 45783552,
    "fscore": "eiusmod qui aliquip deserunt adipisicing",
    "fitemtime": "aliqua adipisicing do",
    "fcustomvalue": "exercitation"
  },{
    "id": 24699153.046929553,
    "fsupplieid": "veniam amet",
    "fsuppliename": "reprehend",
    "fkeyarea": "ea",
    "flevel": 45783552,
    "fscore": "eiusmod qui aliquip deserunt adipisicing",
    "fitemtime": "aliqua adipisicing do",
    "fcustomvalue": "exercitation"
  }]，
  success:true
}
```
#### 供应商评级字段新增
##### 请求url：
```bash
http://172.17.0.77/djintelligent/supplierRating/getList.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/supplierRating/getList.do
```
##### 请求方式：POST
| 参数 | 是否必选 | 类型 | 说明 |
| :--- | :---: | :--- | :--- |
| fsupplierName | N | string | 客户区域 |
| fmonth | N | string | 月份 |
| fStartType | N | int | 客户星级类型(0:无,1:一星,2:二星,3:三星,4:四星,5:五星,6:六星) |
| fPageSize | Y | int | 分页条数 |
| fPageNumgeNum | Y | int | 目标分页 |



##### 返回示例：
```javascript

{
  msg:"保存成功！",
  code:"10000",
  data:[
    {
      fid: 1,//供应商id
     //字段返回
    }]，
  success:true
}
```
#### 供应商评级字段删除
##### 请求url：
```bash
http://172.17.0.77/djintelligent/supplierRating/getList.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/supplierRating/getList.do
```
##### 请求方式：POST
| 参数 | 是否必选 | 类型 | 说明 |
| :--- | :---: | :--- | :--- |
| fsupplierName | N | string | 客户区域 |
| fmonth | N | string | 月份 |
| fStartType | N | int | 客户星级类型(0:无,1:一星,2:二星,3:三星,4:四星,5:五星,6:六星) |
| fPageSize | Y | int | 分页条数 |
| fPageNumgeNum | Y | int | 目标分页 |



##### 返回示例：
```javascript

{
  msg:"保存成功！",
  code:"10000",
  data:[
    {
      fid: 1,//供应商id
     //字段返回
    }]，
  success:true
}
```
#### 供应商评级列表字段获取
##### 请求url：
```bash
http://172.17.0.77/djintelligent/supplierRating/getList.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/supplierRating/getList.do
```
##### 请求方式：POST
| 参数 | 是否必选 | 类型 | 说明 |
| :--- | :---: | :--- | :--- |
| fsupplierName | N | string | 客户区域 |
| fmonth | N | string | 月份 |
| fStartType | N | int | 客户星级类型(0:无,1:一星,2:二星,3:三星,4:四星,5:五星,6:六星) |
| fPageSize | Y | int | 分页条数 |
| fPageNumgeNum | Y | int | 目标分页 |



##### 返回示例：
```javascript

{
  msg:"保存成功！",
  code:"10000",
  data:[
    {
      fid: 1,//供应商id
     //字段返回
    }]，
  success:true
}
```
#### 供应商评级保存
##### 请求url：
```bash
http://172.17.0.77/djintelligent/supplierRating/getList.do
```
##### mock-url：
```bash
http://172.17.0.77/djintelligent/supplierRating/getList.do
```
##### 请求方式：POST
| 参数 | 是否必选 | 类型 | 说明 |
| :--- | :---: | :--- | :--- |
| fsupplierName | N | string | 客户区域 |
| fmonth | N | string | 月份 |
| fStartType | N | int | 客户星级类型(0:无,1:一星,2:二星,3:三星,4:四星,5:五星,6:六星) |
| fPageSize | Y | int | 分页条数 |
| fPageNumgeNum | Y | int | 目标分页 |



##### 返回示例：
```javascript

{
  msg:"保存成功！",
  code:"10000",
  data:[
    {
      fid: 1,//供应商id
     //字段返回
    }]，
  success:true
}
```
### 个人中心
#### 用户信息获取
##### 请求url：
```bash
http://grouptest.onlinecps.cn/djgroupon/center/info.do
```
##### mock-url：
```bash
http://grouptest.onlinecps.cn/djgroupon/center/info.do
```
##### 请求方式：GET


##### 返回示例：
```javascript
{msg:"",
  code:100000,
   data:
   {
     integeral:6500.0,
     balance:"0.0",
     url:"图片url",
     custName:"丁学紧",
     statement:{type1:0,type2:0,type3:0,type4:0,type5:0}
   },
     success:true
}
```
#### 星级权益获取
##### 请求url：
```bash
http://grouptest.onlinecps.cn/djgroupon/center/getStartInfo.do
```
##### mock-url：
```bash
http://grouptest.onlinecps.cn/djgroupon/center/getStartInfo.do
```
##### 请求方式：POST



| 参数 | 是否必选 | 类型 | 说明 |
| :--- | :---: | :--- | :--- |
| fStartType | Y | int | 客户星级类型(0:无,1:一星,2:二星,3:三星,4:四星,5:五星,6:六星) |

##### 返回示例：
```javascript
{  
     msg:"请求成功",
     code:100000,
     data:[
        {
          fid: 1,//权益id
          list:[
                {
                  fmemberShipInterestsName: "优惠赠送",
                  finterestsDescription:"描述某某某aaaa" 
                }
          ]
        },
        {
          fid: 2,//权益id
          list:[
                {
                  fmemberShipInterestsName: "优惠赠送",
                  finterestsDescription:"描述某某某aaaa" 
                }
          ]
        }
     ]
     success:true
}
```
### 风险控制，实施方案
无其他端，集成
### 特殊组件
#### 会员评级
#####  饼图组件
#####  柱状图组件
##### 技术：echars图表组件
#### 会员规则
#####  阶梯区间校验组件
#####  适用区域组件
##### 技术：自定义封装组件
#### 供应商评级
#####  可编辑表格
#####      技术：element表格拓展单元格编辑功能


/djgroupon/center/info.do
/djgroupon/center/info.do

#### 
