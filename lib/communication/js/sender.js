var CommunityOPMessageAPIUrl, GetMemberListFromAPI, GetMessageSentHistory, MSGchunk, MessageModel, MessageSentHistoryAPIUrl, SaveMessageSentHistoryAPIUrl, SendMessageAPIUrl, SendMessages, SenderController, forbidWords, request, toMessageNumber;

request = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  withCredentials: true,
  transformRequest: function(data) {
    return $.param(data);
  }
};

CommunityOPMessageAPIUrl = 'http://communityop.iflying.com/communication/Message/';

SendMessageAPIUrl = 'http://rpc.iflying.com/BasicData/SystemOperation/AddSMSRequest';

MessageSentHistoryAPIUrl = CommunityOPMessageAPIUrl + 'getMessageSentHistory';

SaveMessageSentHistoryAPIUrl = CommunityOPMessageAPIUrl + 'saveMessageSentHistory';

MSGchunk = 200;

MessageModel = {
  'Hanlin': {
    userid: '000000000000000000000114',
    username: '俞瑶',
    departmentid: '000000000000000000000817',
    url: 'http://115.29.222.6:86/Club/HLLY/SeachKey?Duties=0&interest=&province=0&city=0&Key=&area=0&limit=1000&offset=0&sort=id&order=desc',
    clubName: '翰林旅院',
    clubID: 156
  }
};

forbidWords = ["【新浩艺】", "香港大学生", "香港民主", "香港中环", "香港占中", "【空中网】", "【500.com】", "有缘网", "【有缘网】", "华宅", "場外双重", "基站", "窃据", "经纪人", "补助金", "準", "六合彩", "中国梦之声", "中国梦想秀", "你爱人或朋友", "办好回个信", "新华联慧谷", "获利", "洋妞保健按摩提供上门服务", "任人唯亲", "车仑", "黨", "車仑", "氵去", "泌尿", "抽奖", "青云镇", "了仇", "知道对方谈话", "3619895", "中栱", "冤案", "法luN功", "发漂", "香港金利集团", "枪支", "真空秀", "愿意把我的第一次回报给您", "枪", "颜射", "迷幻药", "六四", "税票代办", "春晚", "激晴", "磁卡已坏", "嫩草", "水中鸳鸯", "鸳鸯浴", "丢|偷|掉|盗", "超模裸泳", "丝袜撕奸", "wapdfasf", "终共本是恶魔变", "94纯情小公主", "激晴T台", "吞惊口暴", "日式姓爱", "深喉口鲍", "鲸吞口鲍", "姓爱大师", "群模浪舞", "水晶舞台房", "模特浪式服务", "中共暴政", "中共独枭", "中共政权", "胡温政府", "亲共行动", "警察殴打", "苏杭佳丽", "口暴", "风骚", "贾庆林", "涉黄", "代開各類發票", "迷魂药", "共匪", "政府利用青奥敛财", "江派三英宋祖英秘密被捕", "反日份子", "鲁甸地震预兆", "练法1un功会有福报", "江派迫害法1un功", "反共游行", "邪恶本质", "揭露中共邪恶本质", "把真善忍的理念带给全人类", "薄熙来", "迫害", "天安门广场自焚", "中国共产党亡", "青奥会反日游行", "三退保平安", "反共", "恐怖袭击", "博彩|", "SIM卡", "和异性开房被抓", "疆独", "维吾尔自由运动", "东突厥斯坦伊斯兰运动", "印尼伊斯兰祈祷团", "突厥斯坦", "宗教迫害", "全能神教", "三退", "退出中共无神论", "九评共产党", "大法洪传", "魔党", "颜色革命", "反日", "藏独", "邪教", "灭共匪", "自焚", "行业垃圾短信关键词测试", "产党", "k隆", "河南SASS系统", "群发", "kai票", "各类票", "窃听", "同居", "激情", "募捐", "房价", "盛大开盘", "百亿商圈", "院宅", "稳赚", "实战班", "开班", "权威师资", "赌场", "旺宅", "在职研究生", "抢租", "想知道他人", "万元铺", "申银万国", "会计专辅", "一次包过", "名师", "fa票", "情人", "票|据", "保真", "研修班", "研讨班", "零风险", "带证工业用地", "江泽民", "养卡", "江南水乡", "piao", "黄金钞票", "淘宝十一周年", "骚扰", "砸抽奖", "返水", "网投麻将", "票据", "按摩", "旺铺", "刻章", "代办各种文凭", "【19楼】", "【保利首开熙悦春天】", "【天富基金】", "三年收益高达30", "18701353802", "18271814927", "15671565751", "【15671565751】", "15180070826", "男女性病", "4000287878", "【前程无忧】", "【YouVivid】", "【中构】", "7030609", "【Yours Gap】", "习近平", "【虎扑体育】", "盘锌", "【金海】", "【喜马拉雅】", "【福州超德中学】", "【卡车之家】", "骰宝", "处子", "夜职", "恶霸", "处女", "陪聊", "名模", "神缏", "诱惑", "走狗", "退党", "打倒", "无赖", "天灭", "共狗", "无能", "暴政", "反攻", "法轮", "炸药", "监听", "免考", "免学", "行踪", "消磁", "磁条", "代办", "文凭", "禾兑", "成绩", "代开", "套牌", "赃车", "监狱", "取保候审", "wei星", "车嫫", "倒偛", "t台", "学历", "裸", "牌九", "私密", "陪护", "裸体", "贞洁", "绿卡", "主讲", "外教", "留学", "洋家教", "特邀", "樣板", "出国", "不开刀", "n对一", "一对1", "壹对壹", "姿金", "壹叁", "补录", "准现", "清盘", "大盘", "精华学校", "承兑汇票", "低押", "名师刘智", "远洋", "公馆", "会馆", "男模", "妙贵人", "上门按摩", "男士尊荣", "卓玉", "考纲考点", "准现房", "买教育", "龙光城", "押题", "家教", "江南华府", "会所", "尚峰", "独户", "直接打到这卡上", "墅", "安邦教育", "世纪城", "成熟社区", "三居", "平层", "通透", "提升", "沖高", "基药", "冲高", "万抵", "臻品", "户型", "板楼", "提分", "留美", "尚河富都", "独栋", "有铲权", "绝版", "招生", "名校", "庭院", "安永美来", "包过", "保过", "花园小洋楼", "名邸", "御景", "典藏大宅", "洋房", "即买即住", "购房优惠", "样板", "产权", "楼盘", "电梯洋房", "拎包入住", "抵押", "现房", "king粉", "k粉", "冰毒", "中广视讯", "好歌曲", "好声音", "星光大道", "爸爸去哪", "精装", "别墅", "自主招生强手营", "状元苗", "主神教", "钰鑫", "已死，有事烧纸", "移民", "一建", "一对一", "新约教会", "无奶咖绿", "退款补100元", "退改签", "徒弟会", "同一教", "适合0--7岁左右敏感期", "世界以利亚福音宣教会", "三班仆人派", "容系统会自动帮亲加入会", "全家死光", "全范围教会", "秋季招生", "你的手机号码已被湖南卫视", "母亲节公开课", "美国生子", "美国口语课程", "灵仙真佛宗", "灵灵教", "航空专业人才", "德佑", "达米宣教会", "冲刺班", "常年招生自考", "不然就要被抢光", "不联系就给中差评都是流氓", "避孕", "ZF非法", "【樱花国际日语】", "【学 而 思网校】", "【信德会计】", "【简单】", "【狗经理】", "【格林豪泰】", "【彩'民之家】", "【安迅思】", "【安居客】", "【安|居|客】", "【骏远教育】", "【乐视网】", "【私募门徒特供】", "玛俐亚妇科医院欢迎您.电话313666", "妇科无痛人流引产", "男性功能障碍", "包皮包茎", "【郑州华山医院】", "官渡区钟英中学(昆明中会教育集团)", "85556868", "7217278", "8722337777", "【易_贷_网】", "精装国际公寓", "13689518240", "深业上城", "13917091871", "2026509", "【新时代百育】", "【锦江电商】", "【金色世纪】", "【文都】", "【健教】", "暑假集训班", "13852886785", "大都会人寿", "13920318066", "13349832345", "15070887664", "88919488", "【贷帮】", "61802901", "www.rf499.com", "和昌中央城邦", "【小米】", "806182564", "你老妈是在外面卖", "【易贷网】", "蓝怡星职业教育培训学校", "http://www.yixin.com", "【万朋网络技术】", "www.ngtaobao.com", "13207188616", "【莫莉幻想】", "4000050806", "028-66503155", "2862946229", "钱坤小李", "关注勿买", "【钱坤信息】", "【唐山嘉讯】", "63226000", "【爱征婚】", "【中金网】", "【飞塑】", "【万达期货】", "【顶点】", "13349869937", "6319591", "【金诚公司】", "13939902111", "021-59650666", "【恒大海上威尼斯】", "[东方证券]", "【新城馥华里】", "【新城】", "享花园地下室露台", "31006188", "13982945673", "13662598889", "市场震荡", "【南通天润】", "18251396999", "2802838", "【粮海之窗】", "亿达", "海景房", "377378194", "5126003", "【格林大华】", "【金农网】", "【萌达教育】", "www.montastar.com", "15580990649", "2525356", "【永信行评估】", "公开视听体验课", "【智佳】", "广报网", "8415069", "75526992958", "2166212", "3399315", "【昌大科辅】", "18107092005", "【保险超市", "【金属报价】", "0994-8160600", "仓位", "010-5979-9366", "【久-益华-瑞】", "【灵通信息】", "15802032964", "美术体验课", "样板房", "【玖誉】", "【金宝网】", "减仓", "美金盘报盘", "中山市慈善万人行", "中普伟业", "债券", "翟蕾款冲气娃娃一枚请您速速领取", "园兴趣班马上开课了", "一校两院”大讲堂于5月9日（周五）", "耶思教育", "学费已不足下次课时，请及时续交学", "学尔森", "学尔 森", "学而思", "学而 思", "学大教育", "学 尔森", "学 尔 森", "学 而思", "性欲减退", "兴趣已经开始报名了", "兴趣班开始报名了", "新房源", "想让作业变简单？那就使用", "现在支付，老师马上教您", "先生,您收到美 女来信", "息差套利", "希贵豪门", "西南财经大学", "我是你的1对1学习顾问", "萎缩肿瘤效果显著", "伟哥", "万份收益", "万邦未来幼儿园", "退票全额返还,额外补偿每位旅客200", "退款补100元补偿资金", "推出2014年美国东部名校行夏令营", "土地估价师", "听说现在老战友回流经验补偿和好处", "天怡教育", "死爹死妈死全家", "水粉班正式开课啦", "十九楼", "师资保证", "杀梅花鹿", "菩萨", "菩 萨", "牌头", "脑得生浓缩丸", "拿成人大专的证书", "沐坤教育", "名额有限，欲报从速", "秘书护士野战", "弥陀慈善", "弥陀", "弥 陀", "美国夏令营", "美国东西海岸英语", "美国东部名校行夏令营", "毛主席", "流氓", "两性关系", "两门特色课", "考高分，上名校", "菁英教育", "交纳六万元（现金）办理学位预定手", "讲座", "健坤2014年春季招生", "回春如意胶囊", "改签需加20元手续费", "改签，退款补100元补偿资金", "改签，退款", "佛教", "佛 教", "发.票", "俄罗斯妹妹激情表演", "东莞市场3月6日进行培训", "地产", "地 产", "担保灵活", "大学城开课名额有限", "大量经典教学并升级为店铺VIP", "春季报名火热", "出门被车撞死", "成武中慧", "成绩稳步上升。收费200元一个月", "成功无限教育", "叉车司机（中、高级）国家职业资格", "博众资讯", "博远教育", "北京旅游专修学院", "北京教育咨询平台韩老师", "北辰雅礼中学", "19楼", "皮草", "皮革", "奢侈名牌", "投资", "移民", "微信", "加微信", "奖金", "办理会员卡", "手表", "优衣库", "奢侈名牌", "招标", "现金", "客服热线", "跪求", "客服热线", "债券", "升级测试", "测试", "test", "奢侈名牌", "预购"];

angular.module('sender', []);

SenderController = function($filter, $rootScope, GetMemberListFromAPI, SendMessages, GetMessageSentHistory) {
  var vm;
  vm = this;

  /*
  1.1设置
   */
  vm.setClub = function(clubName) {
    vm.club = MessageModel[clubName];
    vm.getMessageHistory();
    return vm.getMemberCellphoneList();
  };
  vm.activate = function() {
    return false;
  };

  /*
  1.2 消息发送处理
   */
  vm.checkForbidWords = function() {
    var i, len, word;
    vm.forbidFlag = false;
    if (vm.content) {
      for (i = 0, len = forbidWords.length; i < len; i++) {
        word = forbidWords[i];
        if (vm.content.indexOf(word) > -1) {
          vm.forbidFlag = true;
          vm.illegalword = word;
        }
        if (vm.forbidFlag) {
          break;
        }
      }
    }
    if (!vm.forbidFlag) {
      vm.illegalword = null;
    }
    return vm.forbidFlag;
  };
  vm.sendMessage = function() {

    /*
    定义与方法
     */
    var checkMessageContent, send;
    checkMessageContent = function() {
      if ($filter("toMessageNumber")(vm.content.length) < 4 && !vm.checkForbidWords()) {
        return true;
      } else {
        return false;
      }
    };
    send = function() {
      var APIdata, Basicdata, MSGdata, chunk, data, failTip, members, saveSentHistoryToScope;
      vm.sending = true;
      Basicdata = {
        content: vm.content,
        userID: vm.club.userid,
        userName: vm.club.username,
        clubID: vm.club.clubID,
        clubName: vm.club.clubName,
        departmentid: vm.club.departmentid,
        membersCount: vm.sendList.length,
        sending: true,
        time: new Date().getTime() / 1000,
        sendTime: {
          sec: new Date().getTime() / 1000
        }
      };
      APIdata = _.clone(Basicdata);
      APIdata.members = vm.simpleMemberList;
      MSGdata = [];
      chunk = MSGchunk;
      members = _.clone(vm.sendList);
      while (members.length) {
        data = _.clone(Basicdata);
        data.members = members.splice(0, chunk);
        MSGdata.push(data);
      }
      saveSentHistoryToScope = function(response) {
        if (response.code >= 700) {
          vm.sentHistory.push(Basicdata);
          vm.currentTab = 2;
          Basicdata.sending = false;
          return vm.sending = false;
        } else {
          return vm.senderror = response;
        }
      };
      failTip = function() {
        vm.senderror = {
          code: 0,
          message: '网络错误'
        };
        return vm.sending = false;
      };
      return SendMessages(MSGdata, APIdata, saveSentHistoryToScope, failTip);
    };

    /*
    流程
     */
    if (checkMessageContent()) {
      return vm.getMemberCellphoneList(send);
    }
  };
  vm.getMessageHistory = function() {
    var saveHistoryToScope;
    saveHistoryToScope = function(response) {
      return vm.sentHistory = response.data;
    };
    return GetMessageSentHistory(vm.club.clubID, saveHistoryToScope);
  };
  vm.getMemberCellphoneList = function(callback) {
    var saveMemberCellphoneListToScope;
    vm.getingList = true;
    saveMemberCellphoneListToScope = function(response) {
      var cellphoneReg, checkPhoneNumber;
      vm.sendList = [];
      vm.cantSendList = [];
      vm.simpleMemberList = [];
      cellphoneReg = new RegExp('^1(8|3|5|4|7|9)');
      checkPhoneNumber = function(item) {
        var ref, ref1;
        if (((ref = item.Cellphone) != null ? ref.length : void 0) === 11 && ((ref1 = item.Cellphone) != null ? ref1.match(/^1[3|8|4|5|7|9]\d{9}$/) : void 0)) {
          vm.sendList.push(item.Cellphone);
          return vm.simpleMemberList.push({
            id: item.ID,
            Cellphone: item.Cellphone,
            name: item.HName
          });
        } else {
          return vm.cantSendList.push(item);
        }
      };
      vm.memberList = response.rows;
      vm.memberCount = response.total;
      vm.memberList.forEach(checkPhoneNumber);
      if (typeof callback === "function") {
        callback();
      }
      return vm.getingList = false;
    };
    return GetMemberListFromAPI(vm.club.url, saveMemberCellphoneListToScope);
  };
  return vm.activate();
};

angular.module("sender").controller('SenderController', SenderController);

GetMemberListFromAPI = function($http) {
  return function(url, callback) {
    var simpleFail, simpleSuccess;
    request.method = "GET";
    request.url = url;
    request.data = {};
    simpleSuccess = function(response) {
      response.data.rows = [
        {
          ID: 123,
          Cellphone: '18618124986',
          HName: "黄宇"
        }
      ];
      return callback(response.data);
    };
    simpleFail = function(response) {
      return callback(response.data);
    };
    return $http(request).then(simpleSuccess, simpleFail);
  };
};

angular.module('sender').factory('GetMemberListFromAPI', GetMemberListFromAPI);

SendMessages = function($http) {
  return function(MSGdata, APIdata, callback, failTip) {
    var data, erpRequest, i, index, len, message, r, requests, results, simpleFail, simpleSuccess;
    simpleSuccess = function(response) {
      if (typeof callback === "function") {
        callback(response.data);
      }
      if (response.data.code >= 700) {
        return $http(erpRequest);
      }
    };
    simpleFail = function(response) {
      return typeof failTip === "function" ? failTip(response.data) : void 0;
    };
    erpRequest = angular.copy(request);
    erpRequest.method = 'POST';
    erpRequest.url = SaveMessageSentHistoryAPIUrl;
    erpRequest.data = APIdata;
    requests = [];
    results = [];
    for (index = i = 0, len = MSGdata.length; i < len; index = ++i) {
      data = MSGdata[index];
      r = angular.copy(request);
      r.method = "POST";
      r.url = SendMessageAPIUrl;
      message = {};
      message.OperationMobile = data.members.join(',');
      message.OperationNotes = data.content;
      message.OperationTypeID = 2;
      message.OrderID = 0;
      message.SMSOrderStatus = 3;
      message.ValidateSign = 31;
      r.data = {
        SMSRecord: JSON.stringify(message)
      };
      requests.push(r);
      results.push($http(requests[index]).then(simpleSuccess, simpleFail));
    }
    return results;
  };
};


/*
angular.module("disney").factory("sendDisneyMessage", sendDisneyMessage) ;

function sendDisneyMessage($http) {
  return func;

  function func(params, callback) {
    var api = dreamFlyUrl + "BasicData/SystemOperation/AddSMSRequest";
    request.url = api;
    request.method = "POST";
    request.data = {
      SMSRecord: JSON.stringify(params)
    } ;
    $http(request).then(success, fail) ;

    function success(response) {
      callback(response.data) ;
    }

    function fail(response) {

    }
  }
}
 */

angular.module('sender').factory('SendMessages', SendMessages);

GetMessageSentHistory = function($http) {
  return function(clubID, callback) {
    var simpleFail, simpleSuccess;
    request.method = "GET";
    request.url = MessageSentHistoryAPIUrl + "?clubID=" + clubID;
    request.data = {};
    simpleSuccess = function(response) {
      return callback(response.data);
    };
    simpleFail = function(response) {
      return callback(response.data);
    };
    return $http(request).then(simpleSuccess, simpleFail);
  };
};

angular.module('sender').factory('GetMessageSentHistory', GetMessageSentHistory);

toMessageNumber = function() {
  return function(item) {
    return Math.ceil(item / 60);
  };
};

angular.module('sender').filter('toMessageNumber', toMessageNumber);
