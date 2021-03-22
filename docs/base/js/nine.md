# 客户端检测
## 能力检测
>定义:识别浏览器的能力

示例:
```js
function getElement(id){
	if(document.getElementById(id)){
		return document.getElementById(id);
	}else if(document.all){
		return document.all[id];
	}else{
		throw new Error("no way to retrieve element")
	}	
}
```
- 先检测达成目的的最常用的特性
- 必须测试实际要用到的特性
### 可靠的能力检测
```js
 function isHostMethod(object,property){
      var t=typeof object[property];
      return t=="function"||(!!(t=="object"&&object[property]))||t=='unknown';
  }

  let res=isHostMethod(window,"XMLHttpRequest");
  console.log(res);
```
目前使用isHostMethod方法是比较可靠的
### 能力检测,不是浏览器检测
>在实际开发中,应该将能力检测作为确定下一步解决方案的依据,而不是用它来判断用户使用的是什么浏览器
## 怪癖检测
>目标是识别浏览器的特殊行为

示例一:函数创建一个toString()方法的对象,在正确的ECMAScript实现中,toString应该在for-in循环作为属性返回
```js
function hasDontEnumQuirk(){
      var o={toString:function(){}};

      for(var prop in o){
          if(prop=="toString"){
              return false;
          }
      }
      return true
  }
  console.log(hasDontEnumQuirk());
```
示例二:Safari 3以前的版本会枚举隐藏的属性,可能会出现toString被枚举两次
```js
function hasDontShadowEnumQuirk(){
      var o={toString:function(){}};
      var cunt=0;
      for(var prop in o){
          if(prop=="toString"){
            cunt++
          }
      }
      return cunt
  }
  console.log(hasDontShadowEnumQuirk());
```
## 用户代理检测
  用户代理检测通过检测用户代理字符串来确定实际使用的浏览器
###  用户代理字符串历史
>来源:HTTP规范,浏览器应该发送简短的用户代理字符串,指明浏览器的名称和版本号,RFC2616进一步规范了用户代理字符串

#### 早期浏览器

| 浏览器 | 格式 |范例|
|--|--|--|
| 第一款web浏览器 | 标识符/产品版本号 | Mosaic/0.9|
|Netscape Navigator 2|Mozilla/版本号 [语言] (平台:加密类型)|Mozilla/2.02 [fr] (winNT;I)|
|Netscape Navigator 3|Mozilla/版本号 (平台; 加密类型 [;操作系统或cpu说明])|Mozilla/3.0 (Win95; U)|
|Internet Explorer 3|Mozilla/2.0 (compatible; MSIE 版本号; 操作系统)|Mozilla/2.0 (compatible; MSIE 3.02; Windows 95)|
|Netscape Communicator 4|Mozilla/版本号 (平台; 加密类型 [;操作系统或cpu说明])|Mozilla/4.0 (Win98; I)|
|Internet Explorer 4|Mozilla/4.0 (compatible; MSIE 版本号; 操作系统)|Mozilla/2.0 (compatible; MSIE 4.0; Windows 98)|
|IE4.5-7||Mozilla/4.0 (compatible; MSIE 版本号; 操作系统)|Mozilla/2.0 (compatible; MSIE 浏览器版本; Windows 98)|
|IE8|Mozilla/4.0 (compatible; MSIE 版本号; 操作系统;Trident/ 版本号)|Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1;Trident/4.0)|
|IE9|Mozilla/4.0 (compatible; MSIE 版本号; 操作系统;Trident/ 版本号)|Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1;Trident/5.0)|

#### 主流浏览器
##### Firefox
Gecko是firefox的引擎,最早采用是Netscape 6,主要用户代理格式:
```bash
Mozilla/版本号 (平台; 加密类型; 操作系统或cpu; 语言; 预先发行) Gecko/版本号 应用程序或产品/版本号
//windows XP下的Netscape 6.21
Mozilla/5.0 (windows; U; Windows NT 5.1; en-US;rv:0.9.4) Gecko/2001128 Netscape6/6.2.1
```
随之firefox4.0发布,Mozilla简化了这个用户代理字符串
- 删除语言记号
- 使用强加密
- 操作系统或cpu始终包含Windows的字符串
- Gecko版本号固定为Gecko20200101
例:
```js
Mozilla/5.0 (windows NT 6.1; rv:2.0.1) Gecko/20100101 Firefox 4.0.1
```
##### Safari
苹果公司自己的Web浏览器基于webKit

用户代理字符串具备如下格式:
Mozilla/5.0 (平台; 加密类型; 操作系统或cpu; 语言) AppleWebKit/版本号 (KHTML,like Gecko) Version/版本号 Safari/版本号

```bash
Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/124 (KHTML,like Gecko) Version/3.0.3 Safari/125.1
```
##### Chrome
谷歌公司的浏览器以webkit作为呈现引擎,但是使用了不同的javascript引擎.

用户代理字符串具备如下格式:
Mozilla/5.0 (平台; 加密类型; 操作系统或cpu; 语言) AppleWebKit/版本号 (KHTML,like Gecko)  Chrome/版本号 Safari/版本号

```bash
Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/534.7 (KHTML,like Gecko)  Chrome/7.0.517 Safari/534.7
```
##### Opera
用户代理字符串具备如下格式:
Opera/版本号 (操作系统或cpu; 加密类型) [语言] Persto/版本号 Version/版本号

```bash
Opera/7.54 (Windows NT 5.1; U) [en] Persto/2.6.30 Version/10.63
```
##### IOS和Android
移动操作系统IOS和Android默认浏览器都是基于WebKit

用户代理字符串具备如下格式:
Mozilla/5.0 (平台; 加密类型; 操作系统或cpu; 语言) AppleWebKit/版本号 (KHTML,like Gecko) Version/版本号 Mobile/版本号 Safari/版本号

```bash
Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/124 (KHTML,like Gecko) Version/3.0.3 Mobile/7A341 Safari/125.1
```
Android浏览器中的默认格式与IOS的格式相似,但没有移动版本号(但有Mobile记号)
```bash
Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/124 (KHTML,like Gecko) Version/3.0.3 Mobile Safari/125.1
```
### 用户代理字符串检测技术
- 识别呈现引擎
- 识别浏览器
-识别系统,平台
```js
var client = function () {
    //rendering engines
    var engine = {
      ie: 0,
      gecko: 0,
      webkit: 0,
      khtml: 0,
      opera: 0,

      //complete version
      ver: null,
    };

    //browsers
    var browser = {
      //browsers
      ie: 0,
      firefox: 0,
      safari: 0,
      konq: 0,
      opera: 0,
      chrome: 0,

      //specific version
      ver: null,
    };

    //platform/device/OS
    var system = {
      win: false,
      mac: false,
      x11: false,

      //mobile devices
      iphone: false,
      ipod: false,
      ipad: false,
      ios: false,
      android: false,
      nokiaN: false,
      winMobile: false,

      //game systems
      wii: false,
      ps: false,
    };

    //detect rendering engines/browsers
    var ua = navigator.userAgent;
    if (window.opera) {
      engine.ver = browser.ver = window.opera.version();
      engine.opera = browser.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
      engine.ver = RegExp["$1"];
      engine.webkit = parseFloat(engine.ver);

      //figure out if it's Chrome or Safari
      if (/Chrome\/(\S+)/.test(ua)) {
        browser.ver = RegExp["$1"];
        browser.chrome = parseFloat(browser.ver);
      } else if (/Version\/(\S+)/.test(ua)) {
        browser.ver = RegExp["$1"];
        browser.safari = parseFloat(browser.ver);
      } else {
        //approximate version
        var safariVersion = 1;
        if (engine.webkit < 100) {
          safariVersion = 1;
        } else if (engine.webkit < 312) {
          safariVersion = 1.2;
        } else if (engine.webkit < 412) {
          safariVersion = 1.3;
        } else {
          safariVersion = 2;
        }

        browser.safari = browser.ver = safariVersion;
      }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
      engine.ver = browser.ver = RegExp["$1"];
      engine.khtml = browser.konq = parseFloat(engine.ver);
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
      engine.ver = RegExp["$1"];
      engine.gecko = parseFloat(engine.ver);

      //determine if it's Firefox
      if (/Firefox\/(\S+)/.test(ua)) {
        browser.ver = RegExp["$1"];
        browser.firefox = parseFloat(browser.ver);
      }
    } else if (/MSIE ([^;]+)/.test(ua)) {
      engine.ver = browser.ver = RegExp["$1"];
      engine.ie = browser.ie = parseFloat(engine.ver);
    }

    //detect browsers
    browser.ie = engine.ie;
    browser.opera = engine.opera;

    //detect platform
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = p == "X11" || p.indexOf("Linux") == 0;

    //detect windows operating systems
    if (system.win) {
      if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
        if (RegExp["$1"] == "NT") {
          switch (RegExp["$2"]) {
            case "5.0":
              system.win = "2000";
              break;
            case "5.1":
              system.win = "XP";
              break;
            case "6.0":
              system.win = "Vista";
              break;
            case "6.1":
              system.win = "7";
              break;
            default:
              system.win = "NT";
              break;
          }
        } else if (RegExp["$1"] == "9x") {
          system.win = "ME";
        } else {
          system.win = RegExp["$1"];
        }
      }
    }

    //mobile devices
    system.iphone = ua.indexOf("iPhone") > -1;
    system.ipod = ua.indexOf("iPod") > -1;
    system.ipad = ua.indexOf("iPad") > -1;
    system.nokiaN = ua.indexOf("NokiaN") > -1;

    //windows mobile
    if (system.win == "CE") {
      system.winMobile = system.win;
    } else if (system.win == "Ph") {
      if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
        system.win = "Phone";
        system.winMobile = parseFloat(RegExp["$1"]);
      }
    }

    //determine iOS version
    if (system.mac && ua.indexOf("Mobile") > -1) {
      if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
        system.ios = parseFloat(RegExp.$1.replace("_", "."));
      } else {
        system.ios = 2; //can't really detect - so guess
      }
    }

    //determine Android version
    if (/Android (\d+\.\d+)/.test(ua)) {
      system.android = parseFloat(RegExp.$1);
    }

    //gaming systems
    system.wii = ua.indexOf("Wii") > -1;
    system.ps = /playstation/i.test(ua);

    //return it
    return {
      engine: engine,
      browser: browser,
      system: system,
    };
  };
```
