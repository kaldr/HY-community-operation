# 客户模型

客户模型在CRM项目中，是最基础的模型。这个模型用于客户的数据导入、排查、分析等。

## 一、模型的导出

由于构建客户时，会用到很多其他基础模型，因此在这里直接将其他模型做一个导出

	export { Address } from '../../../Common/Address.coffee'
	export { Contact, Cellphone, Telephone, Wechat, QQ, Email } from './Contact.coffee'
	export { Certification } from './Certification.coffee'


## 二、Customer类

	export class Customer
		constructor: () ->

### 1. 客户导入源的唯一ID
这里存放的是客户导入表的唯一ObjectID和表名。一个客户导入到`CRM_Customer	`表的时候，一定有一个导入源。当加工这条数据的时候，也需要导入数据的源。这里存放了所有相关数据的源。

每一条数据内的数据结构是：`{id:ObjectID,source:表名}`

			@sourceIDs=[]

### 2. 创建时间
客户的创建时间需要解析，解析成希望的格式。有的创建时间会因为当时数据导入的原因，无法导入，此时要对时间的状态进行设置。如果无法确定时间是否有效，将当前的时间，放置到timeEstimation字段中。

			@createTime=
				timeType: - 1
				timeTypeName: '无法识别创建时间'
				time:{}
				timeEstimation:{}

### 3. 用户类别
用户暂时分为企业客户、普通客户、测试账户3类。

			@customerType=
				typeID: - 1
				typeName: "未知"

### 4. 客户姓名与昵称
通过数据库已有的表，导入的客户姓名未必是有效的姓名。例如客户如果没有留下姓名，而且私顾也没有添加这个客户，那么这个客户信息的客户名称可能是手机号、QQ、邮箱，甚至是客户的微信、QQ昵称。

企业账户的名称是企业名称，字段是全称`str`和简称`short`，普通客户的默认名称如下：

			@name=
				str: "未知"
				lastName: "未知"
				firstName: "未知"

一个正常的客户的姓名，如果全部是中文，可能是1~4个汉字。4个汉字主要针对复姓。如果一个客户姓名不是复姓但是有4个汉字，则被识别成昵称。

如果一个客户没有姓名，则客户的姓名状态是“无法识别姓名”。根据姓与名的识别，会对姓名状态进行不同的设置。

			@nameStatus=
				statusID: - 1
				statusName: "无法识别姓名"

如果一个客户的姓名并不是1~4个字的汉字，则被识别成昵称。

			@nickNames= []

### 5. 客户性别

			@gender=
				name: '未知'
				id: - 1
			@genderStatus=
				statusID: - 1
				statusName: "无法识别性别"	

### 6. 客户联系方式

			@contacts= []
			@contactStatus=
				statusID: - 1
				statusName: "无有效联系方式"

### 7. 客户证件

			@certifications= []
			@certificationStatus=
				statusID: - 1
				statusName: "无有效证件"

### 8. 客户地址

			@addresses= []
			@addressStatus=
				statusID: - 1
				statusName: "无有效地址"

### 9. 客户等级

			@level=
				levelID: - 1
				levelName: "未知"

### 10. 客户基础信息状态

			@basicInfoStatus=
				statusID: - 1
				statusName: "缺乏完善的基本信息"
				name: false
				phone: false
				socialNetwork: false
				gender: false
				createTime: false

### 11. 客户所在社群

			@communities= []

### 12. 客户所加入的俱乐部

			@clubs=[]
			@clubStatus=
				statusID: - 1
				statusName: "没有加入过俱乐部"

### 13. 客户卡券

			@cards= []
			@cardStatus=
				statusID: - 1
				statusName: "无有效消费卡"

### 14. 客户订单

			@orders= []
			@orderStatus=
				statusID: - 1
				statusName: "无有效订单"

### 15. 客户的电话往来

			@phoneCalls= []
			@phoneCallStatus=
				statusID: - 1
				statusName: "无有效呼入"

### 16. 向客户发出的客户的短信
			@messages= []
			@messageStatus=
				statusID: - 1
				statusName: "没有向此用户发送过短信"

### 17. 客户的评价

			@scores=[]
			@scoreStatus=
				statusID:-1
				statusName:"此客户没有评价"

### 18. 客户财务往来

			@finance=[]
			@financeStatus=
				statusID:-1
				statusName:"此客户没有财务往来"

### 19. 客户促销活动的参与

			@promotion=[]
			@promotionStatus=
				statusID:-1
				statusName:"此客户没有参与过促销"

### 20. 客户第一次与飞扬接触的行为

			@firstBehavior=
				behaviorType:
					typeID: - 1
					typeName: "无法识别第一次行为"

### 21. 客户最后一次与飞扬接触的行为

			@lastBehavior=
				behaviorType:
					typeID: - 1
					typeName: "无法识别最后一次行为"

### 22. 客户所有行为

			@behaviors=[]



