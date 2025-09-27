//Sat Sep 27 2025 08:40:07 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const request = require("request"),
  querystring = require("querystring"),
  {
    SocksProxyAgent
  } = require("socks-proxy-agent"),
  isDevMode = process.env.DEV_MODE === "1" || process.env.DEV_MODE === "true",
  ksckEnvCount = Object.keys(process.env).filter(_0xa7d055 => _0xa7d055.toLowerCase().startsWith("ksck")).length;
ksckEnvCount > process.env.MAX_CONCURRENCY && (console.log("错误: 检测到 " + ksckEnvCount + " 个ksck环境变量，最多只允许3个"), process.exit(1));
const baseRemoteUrl = "http://175.24.61.43",
  proxyApiUrl = baseRemoteUrl + "/proxySign",
  queueStatusApiUrl = baseRemoteUrl + "/queue_status";
function generateKuaishouDid() {
  try {
    const _0x364cf1 = _0x10a4e8 => {
        const _0x50056d = "0123456789abcdef";
        let _0x11df00 = "";
        for (let _0x51f9cf = 0; _0x51f9cf < _0x10a4e8; _0x51f9cf++) {
          _0x11df00 += _0x50056d.charAt(Math.floor(Math.random() * _0x50056d.length));
        }
        return _0x11df00;
      },
      _0x2fb163 = _0x364cf1(16),
      _0x1a38e6 = "ANDROID_" + _0x2fb163;
    return _0x1a38e6;
  } catch (_0x976270) {
    console.log("生成did失败: " + _0x976270.message);
    const _0x42479f = Date.now().toString(16).toUpperCase();
    return "ANDROID_" + _0x42479f.substring(0, 16);
  }
}
async function sendRequest(_0x15ec65, _0x578d80 = null, _0x220f6d = "未知请求") {
  const _0x5ab473 = {
    ..._0x15ec65
  };
  if (_0x578d80) try {
    _0x5ab473.agent = new SocksProxyAgent(_0x578d80);
    if (isDevMode) console.log("[调试] " + _0x220f6d + " 使用代理: " + _0x578d80);
  } catch (_0xd04002) {
    if (isDevMode) console.log("[调试] " + _0x220f6d + " 代理URL无效(" + _0xd04002.message + ")，改为直连");
  } else {
    if (isDevMode) console.log("[调试] " + _0x220f6d + " 走直连");
  }
  if (isDevMode) {
    const _0x586fb4 = _0x5ab473.method || "GET";
    console.log("[调试] " + _0x220f6d + " -> " + _0x586fb4 + " " + _0x5ab473.url);
  }
  return new Promise(_0x231de6 => {
    request(_0x5ab473, (_0x397159, _0x28f9dd, _0x136227) => {
      if (_0x397159) return _0x397159.name === "AggregateError" && Array.isArray(_0x397159.errors) ? console.log("[调试] " + _0x220f6d + " 请求错误: AggregateError\n" + _0x397159.errors.map((_0x1cfbbe, _0x204a19) => "  [" + _0x204a19 + "] " + (_0x1cfbbe?.["message"] || _0x1cfbbe)).join("\n")) : console.log("[调试] " + _0x220f6d + " 请求错误: " + (_0x397159.message || String(_0x397159))), _0x231de6(null);
      if (!_0x28f9dd || _0x28f9dd.statusCode !== 200) {
        const _0x4220de = _0x28f9dd ? _0x28f9dd.statusCode : "无响应";
        return console.log("[调试] " + _0x220f6d + " HTTP状态码异常: " + _0x4220de), _0x231de6(null);
      }
      try {
        _0x231de6(JSON.parse(_0x136227));
      } catch {
        _0x231de6(_0x136227);
      }
    });
  });
}
async function testProxyConnectivity(_0x9eabe5, _0x23306c = "代理连通性检测") {
  if (!_0x9eabe5) return {
    "ok": true,
    "msg": "未配置代理（直连）"
  };
  const _0x316e02 = await sendRequest({
    "method": "GET",
    "url": "https://ipinfo.io/json",
    "headers": {
      "User-Agent": "ProxyTester/1.0"
    },
    "timeout": 8000
  }, _0x9eabe5, _0x23306c + " → ipinfo.io");
  if (!_0x316e02) {
    return {
      "ok": false,
      "msg": "无法通过代理访问 ipinfo.io"
    };
  }
  const _0x4c3428 = _0x316e02.ip || _0x316e02.ip_address || "";
  return {
    "ok": true,
    "msg": "SOCKS5 正常，出口IP: " + (_0x4c3428 || "未知")
  };
}
async function getAccountBasicInfo(_0xef93e0, _0x43f75b, _0x5e0c86 = "?") {
  const _0x3c40ee = "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo?source=bottom_guide_first",
    _0x1ee1a7 = await sendRequest({
      "method": "GET",
      "url": _0x3c40ee,
      "headers": {
        "Host": "nebula.kuaishou.com",
        "User-Agent": "kwai-android aegon/3.56.0",
        "Cookie": _0xef93e0,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "timeout": 12000
    }, _0x43f75b, "账号[" + _0x5e0c86 + "] 获取基本信息");
  if (_0x1ee1a7 && _0x1ee1a7.result === 1 && _0x1ee1a7.data) {
    return {
      "nickname": _0x1ee1a7.data.userData?.["nickname"] || null,
      "totalCoin": _0x1ee1a7.data.totalCoin ?? null,
      "allCash": _0x1ee1a7.data.allCash ?? null
    };
  }
  return null;
}
class KuaishouAdTask {
  constructor({
    index: _0x452f97,
    salt: _0x5dbb2a,
    cookie: _0x455f33,
    nickname = "",
    proxyUrl = null
  }) {
    this.index = _0x452f97;
    this.salt = _0x5dbb2a;
    this.cookie = _0x455f33;
    this.nickname = nickname || "账号" + _0x452f97;
    this.proxyUrl = proxyUrl;
    this.extractCookieInfo();
    this.headers = {
      "Host": "nebula.kuaishou.com",
      "Connection": "keep-alive",
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; MI 8 Lite Build/QKQ1.190910.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.101 Mobile Safari/537.36",
      "Cookie": this.cookie,
      "content-type": "application/json"
    };
    this.taskReportPath = "/rest/r/ad/task/report";
    this.startTime = Date.now();
    this.endTime = this.startTime - 30000;
    this.queryParams = "mod=Xiaomi(MI 11)&appver=" + this.appver + "&egid=" + this.egid + "&did=" + this.did;
    this.taskConfigs = {
      "box": {
        "name": "宝箱广告",
        "businessId": 606,
        "posId": 20346,
        "subPageId": 100024064,
        "requestSceneType": 1,
        "taskType": 1
      },
      "look": {
        "name": "看广告得金币",
        "businessId": 672,
        "posId": 24067,
        "subPageId": 100026367,
        "requestSceneType": 1,
        "taskType": 1
      },
      "food": {
        "name": "饭补广告",
        "businessId": 9362,
        "posId": 24067,
        "subPageId": 100026367,
        "requestSceneType": 7,
        "taskType": 2
      }
    };
    this.taskStats = {};
    Object.keys(this.taskConfigs).forEach(_0xeb498f => {
      this.taskStats[_0xeb498f] = {
        "success": 0,
        "failed": 0,
        "totalReward": 0
      };
    });
    this.lowRewardStreak = 0;
    this.lowRewardThreshold = 10;
    this.lowRewardLimit = 3;
    this.stopAllTasks = false;
    this.taskLimitReached = {};
    Object.keys(this.taskConfigs).forEach(_0x599c2d => {
      this.taskLimitReached[_0x599c2d] = false;
    });
  }
  ["extractCookieInfo"]() {
    try {
      const _0x38a60a = this.cookie.match(/egid=([^;]+)/),
        _0x5cdfd7 = this.cookie.match(/did=([^;]+)/),
        _0x1dfbef = this.cookie.match(/userId=([^;]+)/),
        _0x4c5040 = this.cookie.match(/kuaishou\.api_st=([^;]+)/),
        _0x16f31b = this.cookie.match(/appver=([^;]+)/);
      this.egid = _0x38a60a ? _0x38a60a[1] : "";
      this.did = _0x5cdfd7 ? _0x5cdfd7[1] : "";
      this.userId = _0x1dfbef ? _0x1dfbef[1] : "";
      this.kuaishouApiSt = _0x4c5040 ? _0x4c5040[1] : "";
      this.appver = _0x16f31b ? _0x16f31b[1] : "";
      (!this.egid || !this.did) && console.log("账号[" + this.nickname + "] cookie格式可能无 egid 或 did，但继续尝试...");
    } catch (_0xdfb79b) {
      console.log("账号[" + this.nickname + "] 解析cookie失败: " + _0xdfb79b.message);
    }
  }
  ["getTaskStats"]() {
    return this.taskStats;
  }
  ["printTaskStats"]() {
    console.log("\n账号[" + this.nickname + "] 任务执行统计:");
    for (const [_0x1e6f74, _0x111b57] of Object.entries(this.taskStats)) {
      const _0x268ade = this.taskConfigs[_0x1e6f74].name;
      console.log("  " + _0x268ade + ": 成功" + _0x111b57.success + "次, 失败" + _0x111b57.failed + "次, 总奖励" + _0x111b57.totalReward + "金币");
    }
  }
  async ["retryOperation"](_0x27796c, _0x26cfc8, _0x4eb939 = 3, _0x4a45bc = 2000) {
    let _0x2428ae = 0,
      _0x308550 = null;
    while (_0x2428ae < _0x4eb939) {
      try {
        const _0x445c32 = await _0x27796c();
        if (_0x445c32) return _0x445c32;
        _0x308550 = new Error(_0x26cfc8 + " 返回空结果");
      } catch (_0x399b75) {
        _0x308550 = _0x399b75;
        console.log("账号[" + this.nickname + "] " + _0x26cfc8 + " 异常: " + _0x399b75.message);
      }
      _0x2428ae++;
      _0x2428ae < _0x4eb939 && (console.log("账号[" + this.nickname + "] " + _0x26cfc8 + " 失败，重试 " + _0x2428ae + "/" + _0x4eb939), await new Promise(_0x36827b => setTimeout(_0x36827b, _0x4a45bc)));
    }
    return isDevMode && _0x308550 && console.log("[调试] " + _0x26cfc8 + " 最终失败: " + _0x308550.message), null;
  }
  async ["getAdInfo"](_0x1c57eb) {
    try {
      const _0xa8acb8 = "/rest/e/reward/mixed/ad",
        _0x407cca = {
          "encData": "|encData|",
          "sign": "|sign|",
          "cs": "false",
          "client_key": "2ac2a76d",
          "videoModelCrowdTag": "1_23",
          "os": "android",
          "kuaishou.api_st": this.kuaishouApiSt,
          "uQaTag": "1##swLdgl:99#ecPp:-9#cmNt:-0#cmHs:-3#cmMnsl:-0"
        },
        _0x10379e = {
          "earphoneMode": "1",
          "mod": "Xiaomi(23116PN5BC)",
          "appver": this.appver,
          "isp": "CUCC",
          "language": "zh-cn",
          "ud": this.userId,
          "did_tag": "0",
          "net": "WIFI",
          "kcv": "1599",
          "app": "0",
          "kpf": "ANDROID_PHONE",
          "ver": "11.6",
          "android_os": "0",
          "boardPlatform": "pineapple",
          "kpn": "NEBULA",
          "androidApiLevel": "35",
          "country_code": "cn",
          "sys": "ANDROID_15",
          "sw": "1080",
          "sh": "2400",
          "abi": "arm64",
          "userRecoBit": "0"
        },
        _0x2c674d = {
          "appInfo": {
            "appId": "kuaishou_nebula",
            "name": "快手极速版",
            "packageName": "com.kuaishou.nebula",
            "version": this.appver,
            "versionCode": -1
          },
          "deviceInfo": {
            "osType": 1,
            "osVersion": "15",
            "deviceId": this.did,
            "screenSize": {
              "width": 1080,
              "height": 2249
            },
            "ftt": ""
          },
          "userInfo": {
            "userId": this.userId,
            "age": 0,
            "gender": ""
          },
          "impInfo": [{
            "pageId": 11101,
            "subPageId": _0x1c57eb.subPageId,
            "action": 0,
            "browseType": 3,
            "impExtData": "{}",
            "mediaExtData": "{}"
          }]
        },
        _0x500aca = Buffer.from(JSON.stringify(_0x2c674d)).toString("base64"),
        _0xb61320 = await this.generateSignature2(_0xa8acb8, querystring.stringify({
          ..._0x10379e,
          ..._0x407cca
        }), this.salt, _0x500aca);
      if (!_0xb61320) return console.log("账号[" + this.nickname + "] 生成签名失败，无法获取" + _0x1c57eb.name), null;
      const _0x2ca8f4 = {
        ..._0x10379e,
        "sig": _0xb61320.sig,
        "__NS_sig3": _0xb61320.__NS_sig3,
        "__NS_xfalcon": "",
        "__NStokensig": _0xb61320.__NStokensig
      };
      _0x407cca.encData = _0xb61320.encData;
      _0x407cca.sign = _0xb61320.sign;
      const _0x29f97d = "https://api.e.kuaishou.com" + _0xa8acb8 + "?" + querystring.stringify(_0x2ca8f4),
        _0x102bdb = await sendRequest({
          "method": "POST",
          "url": _0x29f97d,
          "headers": {
            "Host": "api.e.kuaishou.com",
            "User-Agent": "kwai-android aegon/3.56.0",
            "Cookie": "kuaishou_api_st=" + this.kuaishouApiSt
          },
          "form": _0x407cca,
          "timeout": 12000
        }, this.proxyUrl, "账号[" + this.nickname + "] 获取广告");
      if (!_0x102bdb) return null;
      if (_0x102bdb.errorMsg === "OK" && _0x102bdb.feeds && _0x102bdb.feeds[0] && _0x102bdb.feeds[0].ad) {
        const _0x173603 = _0x102bdb.feeds[0].caption || _0x102bdb.feeds[0].ad?.["caption"] || "";
        _0x173603 && console.log("账号[" + this.nickname + "] 成功获取到广告信息：" + _0x173603);
        const _0x5196ce = _0x102bdb.feeds[0].exp_tag || "",
          _0x2e8c99 = _0x5196ce.split("/")[1]?.["split"]("_")?.[0] || "";
        return {
          "cid": _0x102bdb.feeds[0].ad.creativeId,
          "llsid": _0x2e8c99,
          "mediaScene": "video"
        };
      }
      if (isDevMode) {
        console.log("[调试] getAdInfo 原始响应:", JSON.stringify(_0x102bdb));
      }
      return null;
    } catch (_0xe9fe45) {
      return console.log("账号[" + this.nickname + "] 获取广告异常: " + _0xe9fe45.message), null;
    }
  }
  async ["generateSignature"](_0x2afdb0, _0xf9b54a, _0x12bbf3, _0x347a75) {
    try {
      const _0x1e4b89 = JSON.stringify({
          "businessId": _0x347a75.businessId,
          "endTime": this.endTime,
          "extParams": "",
          "mediaScene": "video",
          "neoInfos": [{
            "creativeId": _0x2afdb0,
            "extInfo": "",
            "llsid": _0xf9b54a,
            "requestSceneType": _0x347a75.requestSceneType,
            "taskType": _0x347a75.taskType,
            "watchExpId": "",
            "watchStage": 0
          }],
          "pageId": 11101,
          "posId": _0x347a75.posId,
          "reportType": 0,
          "sessionId": "",
          "startTime": this.startTime,
          "subPageId": _0x347a75.subPageId
        }),
        _0x12f9d1 = "bizStr=" + encodeURIComponent(_0x1e4b89) + "&cs=false&client_key=2ac2a76d",
        _0x3b173d = this.queryParams + "&" + _0x12f9d1,
        _0xa06f53 = await this.requestSignService({
          "urlpath": this.taskReportPath,
          "urldata": _0x3b173d,
          "api_client_salt": this.salt
        }, "账号[" + this.nickname + "] 生成报告签名");
      if (!_0xa06f53 || !_0xa06f53.data) return null;
      return {
        "sig": _0xa06f53.data.sig,
        "sig3": _0xa06f53.data.__NS_sig3,
        "sigtoken": _0xa06f53.data.__NStokensig,
        "post": _0x12f9d1
      };
    } catch (_0x36ca94) {
      return console.log("账号[" + this.nickname + "] 生成签名异常: " + _0x36ca94.message), null;
    }
  }
  async ["generateSignature2"](_0x931fe9, _0x5c0afc, _0x155a95, _0x53ea8e) {
    const _0x473fbc = await this.requestSignService({
      "urlpath": _0x931fe9,
      "urldata": _0x5c0afc,
      "api_client_salt": _0x155a95,
      "req_str": _0x53ea8e
    }, "账号[" + this.nickname + "] 生成广告签名");
    if (!_0x473fbc) return null;
    return _0x473fbc.data || _0x473fbc;
  }
  async ["submitReport"](_0x26cb63, _0x3cf007, _0xa1a21, _0x1f758c, _0x328070, _0x42aeb2) {
    try {
      const _0x552aa6 = "https://api.e.kuaishou.com" + this.taskReportPath + "?" + (this.queryParams + "&sig=" + _0x26cb63 + "&__NS_sig3=" + _0x3cf007 + "&__NS_xfalcon=&__NStokensig=" + _0xa1a21),
        _0x11c5a7 = await sendRequest({
          "method": "POST",
          "url": _0x552aa6,
          "headers": {
            "Host": "api.e.kuaishou.cn",
            "User-Agent": "kwai-android aegon/3.56.0",
            "Cookie": this.cookie,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "body": _0x1f758c,
          "timeout": 12000
        }, this.proxyUrl, "账号[" + this.nickname + "] 提交任务");
      if (!_0x11c5a7) return {
        "success": false,
        "reward": 0
      };
      if (_0x11c5a7.result === 1) {
        const _0x21c871 = _0x11c5a7.data?.["neoAmount"] || 0;
        return console.log("账号[" + this.nickname + "] " + _0x42aeb2.name + _0x21c871 + "金币奖励！"), _0x21c871 < 1000 && (this.did = generateKuaishouDid(), console.log("账号[" + this.nickname + "] 金币太少了,修改账号数据，提升活跃")), {
          "success": true,
          "reward": _0x21c871
        };
      }
      if ([20107, 20108].includes(_0x11c5a7.result)) return console.log("账号[" + this.nickname + "] " + _0x42aeb2.name + " 已达上限"), this.taskLimitReached[_0x328070] = true, {
        "success": false,
        "reward": 0
      };
      return console.log("账号[" + this.nickname + "] " + _0x42aeb2.name + " 奖励失败，result=" + _0x11c5a7.result + " msg=" + (_0x11c5a7.errorMsg || "")), isDevMode && console.log("[调试] submitReport 原始响应:", JSON.stringify(_0x11c5a7)), {
        "success": false,
        "reward": 0
      };
    } catch (_0x2e8023) {
      return console.log("账号[" + this.nickname + "] 提交任务异常: " + _0x2e8023.message), {
        "success": false,
        "reward": 0
      };
    }
  }
  async ["requestSignService"](_0x58c3b5, _0xbe9aab) {
    const _0x4e2dcf = (process.env.km || "").trim();
    if (!_0x4e2dcf) return null;
    const _0x42bb61 = await sendRequest({
      "method": "POST",
      "url": proxyApiUrl + "?card_key=" + encodeURIComponent(_0x4e2dcf),
      "headers": {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
        "X-Card-Key": _0x4e2dcf
      },
      "body": JSON.stringify(_0x58c3b5),
      "timeout": 15000
    }, this.proxyUrl, _0xbe9aab + "（签名服务）");
    if (!_0x42bb61) return null;
    if (_0x42bb61.success && _0x42bb61.status === "queued" && _0x42bb61.queue_id) {
      const _0x3fae9b = await this.pollQueueStatus(_0x42bb61.queue_id);
      if (_0x3fae9b && _0x3fae9b.success && (_0x3fae9b.status === "completed" || _0x3fae9b.status === "processed")) return _0x3fae9b;
      return console.log("账号[" + this.nickname + "] 签名失败: " + (_0x3fae9b?.["error"] || _0x3fae9b?.["status"] || "未知")), null;
    }
    if (_0x42bb61.success && (!_0x42bb61.status || _0x42bb61.status === "processed" || _0x42bb61.status === "completed")) return _0x42bb61;
    return console.log("账号[" + this.nickname + "] 签名失败: " + (_0x42bb61.error || _0x42bb61.message || _0x42bb61.status || "未知")), null;
  }
  async ["pollQueueStatus"](_0x262ad0, _0x56461 = 30000, _0x440edc = 2000) {
    const _0x54bdaf = Date.now();
    while (Date.now() - _0x54bdaf < _0x56461) {
      const _0x3623ee = await sendRequest({
        "method": "GET",
        "url": queueStatusApiUrl + "?queue_id=" + encodeURIComponent(_0x262ad0),
        "headers": {
          "User-Agent": "Mozilla/5.0"
        },
        "timeout": 10000
      }, this.proxyUrl, "账号[" + this.nickname + "] 签名排队");
      if (_0x3623ee?.["success"]) {
        if (_0x3623ee.status === "completed" || _0x3623ee.status === "processed") return _0x3623ee;
        if (_0x3623ee.status === "failed") {
          return _0x3623ee;
        }
      }
      await new Promise(_0x4ad326 => setTimeout(_0x4ad326, _0x440edc));
    }
    return {
      "success": false,
      "status": "failed",
      "error": "queue_timeout"
    };
  }
  async ["executeTask"](_0x3b6dbd) {
    const _0x499c7b = this.taskConfigs[_0x3b6dbd];
    if (!_0x499c7b) {
      return console.log("账号[" + this.nickname + "] 未知任务: " + _0x3b6dbd), false;
    }
    if (this.taskLimitReached[_0x3b6dbd]) return false;
    try {
      const _0x453cb2 = await this.retryOperation(() => this.getAdInfo(_0x499c7b), "获取" + _0x499c7b.name + "信息", 3);
      if (!_0x453cb2) return this.taskStats[_0x3b6dbd].failed++, false;
      const _0x6d2ff9 = Math.floor(Math.random() * 10000) + 30000;
      console.log("账号[" + this.nickname + "] 获取" + _0x499c7b.name + "信息成功，等待 " + Math.round(_0x6d2ff9 / 1000) + " 秒后继续...");
      await new Promise(_0x50d8f0 => setTimeout(_0x50d8f0, _0x6d2ff9));
      const _0x399f62 = await this.retryOperation(() => this.generateSignature(_0x453cb2.cid, _0x453cb2.llsid, _0x3b6dbd, _0x499c7b), "生成" + _0x499c7b.name + "签名", 3);
      if (!_0x399f62) return this.taskStats[_0x3b6dbd].failed++, false;
      const _0xf0e74e = await this.retryOperation(() => this.submitReport(_0x399f62.sig, _0x399f62.sig3, _0x399f62.sigtoken, _0x399f62.post, _0x3b6dbd, _0x499c7b), "提交" + _0x499c7b.name + "报告", 3);
      if (_0xf0e74e?.["success"]) return this.taskStats[_0x3b6dbd].success++, this.taskStats[_0x3b6dbd].totalReward += _0xf0e74e.reward || 0, (_0xf0e74e.reward || 0) <= this.lowRewardThreshold ? (this.lowRewardStreak++, this.lowRewardStreak >= this.lowRewardLimit && (console.log("账号[" + this.nickname + "] 连续" + this.lowRewardLimit + "次奖励≤" + this.lowRewardThreshold + "，停止全部任务"), this.stopAllTasks = true)) : this.lowRewardStreak = 0, true;
      return this.taskStats[_0x3b6dbd].failed++, false;
    } catch (_0x5b4137) {
      return console.log("账号[" + this.nickname + "] 任务异常(" + _0x3b6dbd + "): " + _0x5b4137.message), this.taskStats[_0x3b6dbd].failed++, false;
    }
  }
  async ["executeAllTasksByPriority"]() {
    const _0x24577b = Object.keys(this.taskConfigs),
      _0x5504ed = {};
    for (const _0x1bc9c3 of _0x24577b) {
      if (this.stopAllTasks) break;
      console.log("账号[" + this.nickname + "] 开始任务：" + this.taskConfigs[_0x1bc9c3].name);
      _0x5504ed[_0x1bc9c3] = await this.executeTask(_0x1bc9c3);
      if (this.stopAllTasks) break;
      if (_0x1bc9c3 !== _0x24577b[_0x24577b.length - 1]) {
        const _0x574c19 = Math.floor(Math.random() * 8000) + 7000;
        console.log("账号[" + this.nickname + "] 等待 " + Math.round(_0x574c19 / 1000) + " 秒后继续下一个任务");
        await new Promise(_0x14fe5a => setTimeout(_0x14fe5a, _0x574c19));
      }
    }
    return _0x5504ed;
  }
}
function parseAccountConfig(_0x33393c) {
  const _0x58b162 = String(_0x33393c || "").trim().split("#");
  if (_0x58b162.length < 2) return null;
  const _0x5c4631 = _0x58b162[0],
    _0x4c1488 = _0x58b162.slice(1, _0x58b162.length - (_0x58b162.length >= 3 ? 1 : 0)).join("#");
  let _0x11c7e6 = null;
  if (_0x58b162.length >= 3) {
    const _0x5e39f9 = _0x58b162[_0x58b162.length - 1].trim();
    if (_0x5e39f9.includes("|")) {
      const _0x30ab2a = _0x5e39f9.split("|");
      if (_0x30ab2a.length >= 2) {
        const [_0x3e38b8, _0x6889db, _0x578e76, _0x5f1e52] = _0x30ab2a;
        proxyUrlA = "socks5://" + _0x578e76 + ":" + _0x5f1e52 + "@" + _0x3e38b8 + ":" + _0x6889db;
      }
    } else {
      _0x11c7e6 = /^socks5:\/\/.+/i.test(_0x5e39f9) ? _0x5e39f9 : null;
    }
    !_0x11c7e6 && console.log("⚠️ 代理字段不是 socks5:// URL，忽略：" + _0x5e39f9);
  }
  return {
    "salt": _0x5c4631,
    "cookie": _0x4c1488,
    "proxyUrl": _0x11c7e6
  };
}
function loadAccountsFromEnv() {
  const _0x260a21 = Object.keys(process.env).filter(_0x5ca816 => /^ksck\d*$/i.test(_0x5ca816)).sort((_0x4af741, _0x299cb8) => {
    const _0x317d1a = (_0x4af741.match(/\d+$/) || [0])[0] * 1,
      _0x4f6c24 = (_0x299cb8.match(/\d+$/) || [0])[0] * 1;
    return _0x317d1a - _0x4f6c24;
  });
  if (_0x260a21.length === 0) return console.log("未找到 ksck/ksck1/ksck2... 环境变量"), [];
  const _0x2d1042 = [];
  for (const _0x390654 of _0x260a21) {
    const _0x5cc9b4 = (process.env[_0x390654] || "").trim();
    if (!_0x5cc9b4) continue;
    const _0x52646f = _0x5cc9b4.split("\n").map(_0x13f6bb => _0x13f6bb.trim()).filter(Boolean);
    for (const _0x5793cb of _0x52646f) {
      const _0x118ca3 = parseAccountConfig(_0x5793cb);
      if (_0x118ca3) _0x2d1042.push(_0x118ca3);else {
        console.log("账号格式错误（" + _0x390654 + "）：" + _0x5793cb);
      }
    }
  }
  return _0x2d1042.forEach((_0x273b5c, _0x38409b) => {
    _0x273b5c.index = _0x38409b + 1;
  }), _0x2d1042;
}
async function concurrentExecute(_0x141fd5, _0x162122, _0x30395d) {
  const _0x496eb9 = new Array(_0x141fd5.length);
  let _0x2e8bc8 = 0;
  async function _0xa7c912() {
    while (true) {
      const _0x414a68 = _0x2e8bc8++;
      if (_0x414a68 >= _0x141fd5.length) return;
      const _0x545570 = _0x141fd5[_0x414a68];
      try {
        _0x496eb9[_0x414a68] = await _0x30395d(_0x545570, _0x414a68);
      } catch (_0x14c3ca) {
        console.log("并发执行异常（index=" + (_0x414a68 + 1) + "）：" + _0x14c3ca.message);
        _0x496eb9[_0x414a68] = null;
      }
    }
  }
  const _0x478c1e = Array.from({
    "length": Math.min(_0x162122, _0x141fd5.length)
  }, _0xa7c912);
  return await Promise.all(_0x478c1e), _0x496eb9;
}
async function processAccount(_0x173bbf, _0x2ab55f = 10) {
  if (_0x173bbf.proxyUrl) {
    const _0x215ca5 = await testProxyConnectivity(_0x173bbf.proxyUrl, "账号[" + _0x173bbf.index + "]");
    console.log("  - 代理连通性：" + (_0x215ca5.ok ? "✅" : "❌") + " " + _0x215ca5.msg);
  } else console.log("账号[" + _0x173bbf.index + "] 未配置代理，走直连");
  let _0x26be2e = await getAccountBasicInfo(_0x173bbf.cookie, _0x173bbf.proxyUrl, _0x173bbf.index),
    _0x4ec79b = _0x26be2e?.["nickname"] || "账号" + _0x173bbf.index;
  if (_0x26be2e) {
    const _0x52a8b5 = _0x26be2e.totalCoin != null ? _0x26be2e.totalCoin : "未知",
      _0x3fa314 = _0x26be2e.allCash != null ? _0x26be2e.allCash : "未知";
    console.log("账号[" + _0x4ec79b + "] 当前金币: " + _0x52a8b5 + "，当前余额: " + _0x3fa314);
  } else console.log("账号[" + _0x4ec79b + "] 基本信息获取失败，继续执行");
  const _0x2cc4dd = new KuaishouAdTask({
    ..._0x173bbf,
    "nickname": _0x4ec79b
  });
  for (let _0x172269 = 0; _0x172269 < _0x2ab55f; _0x172269++) {
    const _0x1e5e6d = Math.floor(Math.random() * 8000) + 8000;
    console.log("账号[" + _0x2cc4dd.nickname + "] 第" + (_0x172269 + 1) + "轮，先随机等待 " + Math.round(_0x1e5e6d / 1000) + " 秒");
    await new Promise(_0x2ba25a => setTimeout(_0x2ba25a, _0x1e5e6d));
    const _0x1b4b57 = await _0x2cc4dd.executeAllTasksByPriority();
    if (Object.values(_0x1b4b57).some(Boolean)) console.log("账号[" + _0x2cc4dd.nickname + "] 第" + (_0x172269 + 1) + "轮执行完成");else {
      console.log("账号[" + _0x2cc4dd.nickname + "] 第" + (_0x172269 + 1) + "轮没有成功任务");
    }
    if (_0x2cc4dd.stopAllTasks) break;
    if (_0x172269 < _0x2ab55f - 1) {
      const _0x5bd10e = Math.floor(Math.random() * 10000) + 10000;
      console.log("账号[" + _0x2cc4dd.nickname + "] 等待 " + Math.round(_0x5bd10e / 1000) + " 秒进入下一轮");
      await new Promise(_0x30522a => setTimeout(_0x30522a, _0x5bd10e));
    }
  }
  return _0x2cc4dd.printTaskStats(), {
    "index": _0x173bbf.index,
    "stats": _0x2cc4dd.getTaskStats()
  };
}
(async () => {
  const _0x42f097 = loadAccountsFromEnv();
  console.log("共找到 " + _0x42f097.length + " 个有效账号");
  !_0x42f097.length && process.exit(1);
  const _0x1f325f = parseInt(process.env.MAX_CONCURRENCY || process.env.CONCURRENCY || "20", 10) || 2,
    _0xc84753 = parseInt(process.env.ROUNDS || "10", 10) || 10;
  console.log("\n账号并发数：" + _0x1f325f + "   每账号轮数：" + _0xc84753 + "\n");
  await concurrentExecute(_0x42f097, _0x1f325f, async _0x282974 => {
    console.log("\n—— 开始账号[" + _0x282974.index + "] ——");
    try {
      await processAccount(_0x282974, _0xc84753);
    } catch (_0x596f00) {
      console.log("账号[" + _0x282974.index + "] 执行异常：" + _0x596f00.message);
    }
  });
  console.log("\n全部完成。");
})();