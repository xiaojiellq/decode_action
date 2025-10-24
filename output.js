//Fri Oct 24 2025 04:57:25 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const request = require("request"),
  querystring = require("querystring"),
  {
    SocksProxyAgent
  } = require("socks-proxy-agent");
process.noDeprecation = true;
(!process.env.km || process.env.km.trim() === "") && (console.log("❌ 未检测到 km 环境变量，请先在环境变量中新增 km 变量（极速版卡密）"), process.exit(1));
function getRandomAdWatchingStatus() {
  const _0x469f14 = ["正在观看广告", "认真观看中...", "浏览广告内容", "模拟用户行为", "观看视频广告", "保持活跃状态", "广告浏览中", "正常观看时长"];
  return _0x469f14[Math.floor(Math.random() * _0x469f14.length)];
}
const isDevMode = process.env.DEV_MODE === "1" || process.env.DEV_MODE === "true";
function getTasksToExecute() {
  const _0x24c08a = process.env.Task;
  if (!_0x24c08a) {
    console.log("未设置Task环境变量，将执行所有任务 (food, box, look)");
    return ["food", "box", "look"];
  }
  const _0x1386e9 = _0x24c08a.split(",").map(_0x1cc49c => _0x1cc49c.trim().toLowerCase()).filter(Boolean),
    _0x2c722e = ["food", "box", "look"],
    _0x810222 = _0x1386e9.filter(_0x3ef45c => _0x2c722e.includes(_0x3ef45c));
  if (_0x810222.length === 0) {
    console.log("Task环境变量中没有有效任务，将执行所有任务 (food, box, look)");
    return ["food", "box", "look"];
  }
  console.log("从Task环境变量中解析到要执行的任务: " + _0x810222.join(", "));
  return _0x810222;
}
function parseAccountString(_0x254258) {
  const _0x510933 = String(_0x254258 || "").trim().split("#");
  if (_0x510933.length < 2) {
    return null;
  }
  const _0x24bde9 = _0x510933[0],
    _0x112fd8 = _0x510933.slice(1, _0x510933.length - (_0x510933.length >= 3 ? 1 : 0)).join("#");
  let _0x259780 = null;
  if (_0x510933.length >= 3) {
    const _0x370339 = _0x510933[_0x510933.length - 1].trim();
    if (_0x370339.includes("|")) {
      console.log("开始解析代理格式: " + _0x370339);
      const _0x7a2a13 = _0x370339.split("|");
      if (_0x7a2a13.length >= 2) {
        const [_0x508d7b, _0x1e7299, _0x238636, _0x371d46] = _0x7a2a13;
        _0x259780 = "socks5://" + _0x238636 + ":" + _0x371d46 + "@" + _0x508d7b + ":" + _0x1e7299;
      }
    } else {
      /^socks5:\/\/.+/i.test(_0x370339) && (_0x259780 = _0x370339);
    }
    !_0x259780 && console.log("⚠️ 代理字段不是 socks5:// URL，忽略：" + _0x370339);
  }
  return {
    salt: _0x112fd8,
    cookie: _0x24bde9,
    proxyUrl: _0x259780
  };
}
function loadAccountsFromEnv() {
  const _0x407365 = [],
    _0x37c4c1 = new Set();
  let _0x3c0a07 = 0;
  const _0x116363 = parseInt(process.env.MAX_KSCK_INDEX || "666", 10) || 666;
  console.log("开始检查 ksck1 到 ksck" + _0x116363 + " 环境变量...");
  for (let _0x297f14 = 1; _0x297f14 <= _0x116363; _0x297f14++) {
    const _0x9a52c6 = "ksck" + _0x297f14,
      _0x299b21 = process.env[_0x9a52c6];
    if (_0x299b21) {
      const _0x275ec4 = _0x299b21.trim();
      if (!_0x37c4c1.has(_0x275ec4)) {
        const _0x42baa9 = parseAccountString(_0x275ec4);
        _0x42baa9 ? (_0x42baa9.index = ++_0x3c0a07, _0x42baa9.source = _0x9a52c6, _0x407365.push(_0x42baa9), _0x37c4c1.add(_0x275ec4)) : console.log("⚠️ " + _0x9a52c6 + " 格式错误，忽略: " + _0x275ec4);
      } else {
        console.log("⚠️ " + _0x9a52c6 + " 配置重复，忽略: " + _0x275ec4);
      }
    }
  }
  const _0x343ef5 = process.env.ksck;
  if (_0x343ef5) {
    console.log("检测到 ksck 环境变量，解析中...");
    const _0x3d7d16 = _0x343ef5.split("&").map(_0x3bc5a6 => _0x3bc5a6.trim()).filter(Boolean);
    console.log("从 ksck 环境变量中解析到 " + _0x3d7d16.length + " 个配置");
    for (const _0x33794b of _0x3d7d16) {
      if (!_0x37c4c1.has(_0x33794b)) {
        const _0x43f9a8 = parseAccountString(_0x33794b);
        _0x43f9a8 ? (_0x43f9a8.index = ++_0x3c0a07, _0x43f9a8.source = "ksck", _0x407365.push(_0x43f9a8), _0x37c4c1.add(_0x33794b)) : console.log("⚠️ ksck 配置格式错误，忽略: " + _0x33794b);
      } else {
        console.log("⚠️ ksck 配置重复，忽略: " + _0x33794b);
      }
    }
  }
  _0x407365.length === 0 ? console.log("❌ 未找到任何有效的账号配置（检查 ksck 或 ksck1 到 ksck" + _0x116363 + "）") : console.log("✅ 共加载 " + _0x407365.length + " 个有效账号配置");
  return _0x407365;
}
const loadedAccounts = loadAccountsFromEnv(),
  accountCount = loadedAccounts.length,
  tasksToExecute = getTasksToExecute(),
  COIN_LIMIT = parseInt(process.env.COIN_LIMIT || "500000", 10) || 500000,
  MAX_ROUNDS = parseInt(process.env.ROUNDS || "50", 10) || 35,
  LOW_REWARD_THRESHOLD = parseInt(process.env.LOW_REWARD_THRESHOLD || "10", 10) || 10,
  LOW_REWARD_LIMIT = parseInt(process.env.LOW_REWARD_LIMIT || "3", 10) || 3;
console.log("================================================================================");
console.log("                                  ⭐ 快手至尊金币至尊PLUS版 ⭐                                ");
console.log("                            🏆 安全稳定 · 高效收益 · 尊贵体验 🏆                        ");
console.log("================🎉 系统初始化完成，快手至尊金币版启动成功！🎉");
console.log("💎 检测到环境变量配置：" + accountCount + "个账号");
console.log("🎯 将执行以下任务：" + tasksToExecute.join(", "));
console.log("[备注：金币阈值配置为 " + COIN_LIMIT + " 金币（COIN_LIMIT=" + (process.env.COIN_LIMIT || "默认") + ")，轮数配置为 " + MAX_ROUNDS + " 轮（ROUNDS=" + (process.env.ROUNDS || "默认") + ")，低奖励阈值 " + LOW_REWARD_THRESHOLD + " 金币（LOW_REWARD_THRESHOLD=" + (process.env.LOW_REWARD_THRESHOLD || "默认") + ")，低奖励上限 " + LOW_REWARD_LIMIT + " 次（LOW_REWARD_LIMIT=" + (process.env.LOW_REWARD_LIMIT || "默认") + ")]");
accountCount > (process.env.MAX_CONCURRENCY || 999) && (console.log("错误: 检测到 " + accountCount + " 个账号配置，最多只允许" + (process.env.MAX_CONCURRENCY || 999) + "个"), process.exit(1));
const SIGN_API_BASE_URL = "http://43.136.91.204:5002",
  SIGN_API_ENDPOINT = SIGN_API_BASE_URL + "/proxySign",
  QUEUE_STATUS_ENDPOINT = SIGN_API_BASE_URL + "/queue_status";
function generateDid() {
  try {
    const _0x3c9a51 = _0x5acfa7 => {
        const _0x582702 = "0123456789abcdef";
        let _0x19ddf5 = "";
        for (let _0x4fbb55 = 0; _0x4fbb55 < _0x5acfa7; _0x4fbb55++) {
          _0x19ddf5 += _0x582702.charAt(Math.floor(Math.random() * _0x582702.length));
        }
        return _0x19ddf5;
      },
      _0x407768 = _0x3c9a51(16),
      _0x1d6b4b = "ANDROID_" + _0x407768;
    return _0x1d6b4b;
  } catch (_0x533804) {
    console.log("生成did失败: " + _0x533804.message);
    const _0x434b36 = Date.now().toString(16).toUpperCase();
    return "ANDROID_" + _0x434b36.substring(0, 16);
  }
}
async function makeRequest(_0x117eb6, _0x195823 = null, _0x1f0db8 = "Unknown Request") {
  const _0x8881bf = {
    ..._0x117eb6
  };
  if (_0x195823) {
    try {
      _0x8881bf.agent = new SocksProxyAgent(_0x195823);
      if (isDevMode) {
        console.log("[调试] " + _0x1f0db8 + " 使用代理: " + _0x195823);
      }
    } catch (_0x3ce0ea) {
      console.log("[错误] " + _0x1f0db8 + " 代理URL无效(" + _0x3ce0ea.message + ")，尝试直连模式");
      if (isDevMode) {
        console.log("[调试] 代理无效，自动切换到直连模式");
      }
    }
  } else {
    isDevMode && console.log("[调试] 未配置代理，使用直连模式");
  }
  if (isDevMode) {
    const _0x55d00f = _0x8881bf.method || "GET";
    console.log("[调试] " + _0x1f0db8 + " -> " + _0x55d00f + " " + _0x8881bf.url);
  }
  return new Promise(_0x466d4d => {
    request(_0x8881bf, (_0x5387cf, _0x1ab261, _0x11f539) => {
      if (_0x5387cf) {
        _0x5387cf.name === "AggregateError" && Array.isArray(_0x5387cf.errors) ? console.log("[调试] " + _0x1f0db8 + " 请求错误: AggregateError\n" + _0x5387cf.errors.map((_0x49d32e, _0x10bd45) => "  [" + _0x10bd45 + "] " + (_0x49d32e?.["message"] || _0x49d32e)).join("\n")) : console.log("[调试] " + _0x1f0db8 + " 请求错误: " + (_0x5387cf.message || String(_0x5387cf)));
        return _0x466d4d(null);
      }
      if (!_0x1ab261 || _0x1ab261.statusCode !== 200) {
        const _0x59af3f = _0x1ab261 ? _0x1ab261.statusCode : "无响应";
        console.log("[调试] " + _0x1f0db8 + " HTTP状态码异常: " + _0x59af3f);
        return _0x466d4d(null);
      }
      try {
        _0x466d4d(JSON.parse(_0x11f539));
      } catch {
        _0x466d4d(_0x11f539);
      }
    });
  });
}
async function testProxyConnection(_0x1684e7, _0x380973 = "代理连通性检测") {
  if (!_0x1684e7) {
    return {
      ok: true,
      msg: "✅ 未配置代理（直连模式）",
      ip: "localhost"
    };
  }
  const _0x320343 = await makeRequest({
    method: "GET",
    url: "https://ipinfo.io/json",
    headers: {
      "User-Agent": "ProxyTester/1.0"
    },
    timeout: 8000
  }, _0x1684e7, _0x380973 + " → ipinfo.io");
  if (!_0x320343) {
    return {
      ok: false,
      msg: "❌ 无法通过代理访问 ipinfo.io",
      ip: ""
    };
  }
  const _0x1c244b = _0x320343.ip || _0x320343.ip_address || "";
  return {
    ok: true,
    msg: "✅ SOCKS5代理正常，出口IP: " + (_0x1c244b || "未知"),
    ip: _0x1c244b || "未知"
  };
}
const usedProxyIps = new Set();
async function getAccountBasicInfo(_0x31b911, _0x1cbda0, _0x18f381 = "?") {
  const _0x3ceb36 = "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo?source=bottom_guide_first",
    _0x48be48 = await makeRequest({
      method: "GET",
      url: _0x3ceb36,
      headers: {
        Host: "nebula.kuaishou.com",
        "User-Agent": "kwai-android aegon/3.56.0",
        Cookie: _0x31b911,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: 12000
    }, _0x1cbda0, "账号[" + _0x18f381 + "] 获取基本信息");
  if (_0x48be48 && _0x48be48.result === 1 && _0x48be48.data) {
    return {
      nickname: _0x48be48.data.userData?.["nickname"] || null,
      totalCoin: _0x48be48.data.totalCoin ?? null,
      allCash: _0x48be48.data.allCash ?? null
    };
  }
  return null;
}
function centerAlignText(_0x52a2c0, _0x5787b9) {
  _0x52a2c0 = String(_0x52a2c0);
  if (_0x52a2c0.length >= _0x5787b9) {
    return _0x52a2c0.substring(0, _0x5787b9);
  }
  const _0x357ed6 = _0x5787b9 - _0x52a2c0.length,
    _0x1e676f = Math.floor(_0x357ed6 / 2),
    _0x16f04d = _0x357ed6 - _0x1e676f;
  return " ".repeat(_0x1e676f) + _0x52a2c0 + " ".repeat(_0x16f04d);
}
class KuaishouAccount {
  constructor({
    index: _0x5c50ed,
    salt: _0x24c7d9,
    cookie: _0x1b606e,
    nickname = "",
    proxyUrl = null,
    tasksToExecute = ["food", "box", "look"]
  }) {
    this.index = _0x5c50ed;
    this.salt = _0x24c7d9;
    this.cookie = _0x1b606e;
    this.nickname = nickname || "账号" + _0x5c50ed;
    this.proxyUrl = proxyUrl;
    this.coinLimit = COIN_LIMIT;
    this.lowRewardThreshold = LOW_REWARD_THRESHOLD;
    this.lowRewardLimit = LOW_REWARD_LIMIT;
    this.coinExceeded = false;
    this.tasksToExecute = tasksToExecute;
    this.extractCookieInfo();
    this.headers = {
      Host: "nebula.kuaishou.com",
      Connection: "keep-alive",
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; MI 8 Lite Build/QKQ1.190910.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.101 Mobile Safari/537.36",
      Cookie: this.cookie,
      "content-type": "application/json"
    };
    this.taskReportPath = "/rest/r/ad/task/report";
    this.startTime = Date.now();
    this.endTime = this.startTime - 30000;
    this.queryParams = "mod=Xiaomi(MI 11)&appver=" + this.appver + "&egid=" + this.egid + "&did=" + this.did;
    this.taskConfigs = {
      box: {
        name: "宝箱广告",
        businessId: 606,
        posId: 20346,
        subPageId: 100024064,
        requestSceneType: 1,
        taskType: 1
      },
      look: {
        name: "看广告得金币",
        businessId: 672,
        posId: 24067,
        subPageId: 100026367,
        requestSceneType: 1,
        taskType: 1
      },
      food: {
        name: "饭补广告",
        businessId: 9362,
        posId: 24067,
        subPageId: 100026367,
        requestSceneType: 7,
        taskType: 2
      }
    };
    this.taskStats = {};
    this.tasksToExecute.forEach(_0x394a13 => {
      this.taskConfigs[_0x394a13] && (this.taskStats[_0x394a13] = {
        success: 0,
        failed: 0,
        totalReward: 0
      });
    });
    this.lowRewardStreak = 0;
    this.stopAllTasks = false;
    this.taskLimitReached = {};
    this.tasksToExecute.forEach(_0x3673c7 => {
      this.taskConfigs[_0x3673c7] && (this.taskLimitReached[_0x3673c7] = false);
    });
  }
  async checkCoinLimit() {
    try {
      const _0x16248c = await getAccountBasicInfo(this.cookie, this.proxyUrl, this.index);
      if (_0x16248c && _0x16248c.totalCoin) {
        const _0x5177b9 = parseInt(_0x16248c.totalCoin);
        if (_0x5177b9 >= this.coinLimit) {
          console.log("⚠️ 账号[" + this.nickname + "] 金币已达 " + _0x5177b9 + "，超过 " + this.coinLimit + " 阈值，将停止任务 [备注：超过金币阈值（COIN_LIMIT=" + (process.env.COIN_LIMIT || "默认500000") + ")]");
          this.coinExceeded = true;
          this.stopAllTasks = true;
          return true;
        }
      }
      return false;
    } catch (_0x49d5c8) {
      console.log("账号[" + this.nickname + "] 金币检查异常: " + _0x49d5c8.message);
      return false;
    }
  }
  extractCookieInfo() {
    try {
      const _0x5432d4 = this.cookie.match(/egid=([^;]+)/),
        _0x47ee55 = this.cookie.match(/did=([^;]+)/),
        _0x301262 = this.cookie.match(/userId=([^;]+)/),
        _0x1b80a8 = this.cookie.match(/kuaishou\.api_st=([^;]+)/),
        _0xdceae2 = this.cookie.match(/appver=([^;]+)/);
      this.egid = _0x5432d4 ? _0x5432d4[1] : "";
      this.did = _0x47ee55 ? _0x47ee55[1] : "";
      this.userId = _0x301262 ? _0x301262[1] : "";
      this.kuaishouApiSt = _0x1b80a8 ? _0x1b80a8[1] : "";
      this.appver = _0xdceae2 ? _0xdceae2[1] : "13.7.20.10468";
      (!this.egid || !this.did) && console.log("账号[" + this.nickname + "] cookie格式可能无 egid 或 did，但继续尝试...");
    } catch (_0x2a20ab) {
      console.log("账号[" + this.nickname + "] 解析cookie失败: " + _0x2a20ab.message);
    }
  }
  getTaskStats() {
    return this.taskStats;
  }
  printTaskStats() {
    console.log("\n账号[" + this.nickname + "] 任务执行统计:");
    for (const [_0x588eda, _0x3bf784] of Object.entries(this.taskStats)) {
      const _0x1d57b1 = this.taskConfigs[_0x588eda].name;
      console.log("  " + _0x1d57b1 + ": 成功" + _0x3bf784.success + "次, 失败" + _0x3bf784.failed + "次, 总奖励" + _0x3bf784.totalReward + "金币");
    }
  }
  async retryOperation(_0x417415, _0x121d4a, _0xff6db5 = 3, _0x4ca650 = 2000) {
    let _0x41d355 = 0,
      _0x1ef63d = null;
    while (_0x41d355 < _0xff6db5) {
      try {
        const _0x5393b3 = await _0x417415();
        if (_0x5393b3) {
          return _0x5393b3;
        }
        _0x1ef63d = new Error(_0x121d4a + " 返回空结果");
      } catch (_0x5e7a13) {
        _0x1ef63d = _0x5e7a13;
        console.log("账号[" + this.nickname + "] " + _0x121d4a + " 异常: " + _0x5e7a13.message);
      }
      _0x41d355++;
      _0x41d355 < _0xff6db5 && (console.log("账号[" + this.nickname + "] " + _0x121d4a + " 失败，重试 " + _0x41d355 + "/" + _0xff6db5), await new Promise(_0x2d0a0a => setTimeout(_0x2d0a0a, _0x4ca650)));
    }
    isDevMode && _0x1ef63d && console.log("[调试] " + _0x121d4a + " 最终失败: " + _0x1ef63d.message);
    return null;
  }
  async getAdInfo(_0x410b18) {
    try {
      const _0x18f08b = "/rest/e/reward/mixed/ad",
        _0x1e4495 = {
          encData: "|encData|",
          sign: "|sign|",
          cs: "false",
          client_key: "2ac2a76d",
          videoModelCrowdTag: "1_23",
          os: "android",
          "kuaishou.api_st": this.kuaishouApiSt,
          uQaTag: "1##swLdgl:99#ecPp:-9#cmNt:-0#cmHs:-3#cmMnsl:-0"
        },
        _0x4f59ac = {
          earphoneMode: "1",
          mod: "Xiaomi(23116PN5BC)",
          appver: this.appver,
          isp: "CUCC",
          language: "zh-cn",
          ud: this.userId,
          did_tag: "0",
          net: "WIFI",
          kcv: "1599",
          app: "0",
          kpf: "ANDROID_PHONE",
          ver: "11.6",
          android_os: "0",
          boardPlatform: "pineapple",
          kpn: "NEBULA",
          androidApiLevel: "35",
          country_code: "cn",
          sys: "ANDROID_15",
          sw: "1080",
          sh: "2400",
          abi: "arm64",
          userRecoBit: "0"
        },
        _0x379cb7 = {
          appInfo: {
            appId: "kuaishou_nebula",
            name: "快手极速版",
            packageName: "com.kuaishou.nebula",
            version: this.appver,
            versionCode: -1
          },
          deviceInfo: {
            osType: 1,
            osVersion: "15",
            deviceId: this.did,
            screenSize: {
              width: 1080,
              height: 2249
            },
            ftt: ""
          },
          userInfo: {
            userId: this.userId,
            age: 0,
            gender: ""
          },
          impInfo: [{
            pageId: 11101,
            subPageId: _0x410b18.subPageId,
            action: 0,
            browseType: 3,
            impExtData: "{}",
            mediaExtData: "{}"
          }]
        },
        _0x2feb6c = Buffer.from(JSON.stringify(_0x379cb7)).toString("base64"),
        _0x254cbf = await this.generateSignature2(_0x18f08b, querystring.stringify({
          ..._0x4f59ac,
          ..._0x1e4495
        }), this.salt, _0x2feb6c);
      if (!_0x254cbf) {
        console.log("❌ 账号[" + this.nickname + "] 生成签名失败，无法获取" + _0x410b18.name);
        return null;
      }
      const _0xf51fd3 = {
        ..._0x4f59ac,
        sig: _0x254cbf.sig,
        __NS_sig3: _0x254cbf.__NS_sig3,
        __NS_xfalcon: "",
        __NStokensig: _0x254cbf.__NStokensig
      };
      _0x1e4495.encData = _0x254cbf.encData;
      _0x1e4495.sign = _0x254cbf.sign;
      const _0x21465e = "https://api.e.kuaishou.com" + _0x18f08b + "?" + querystring.stringify(_0xf51fd3),
        _0x5e78dc = await makeRequest({
          method: "POST",
          url: _0x21465e,
          headers: {
            Host: "api.e.kuaishou.com",
            "User-Agent": "kwai-android aegon/3.56.0",
            Cookie: "kuaishou_api_st=" + this.kuaishouApiSt
          },
          form: _0x1e4495,
          timeout: 12000
        }, this.proxyUrl, "账号[" + this.nickname + "] 获取广告");
      if (!_0x5e78dc) {
        return null;
      }
      if (_0x5e78dc.errorMsg === "OK" && _0x5e78dc.feeds && _0x5e78dc.feeds[0] && _0x5e78dc.feeds[0].ad) {
        const _0x4de224 = _0x5e78dc.feeds[0].ad.creativeId,
          _0x24454d = _0x5e78dc.feeds[0].exp_tag || "",
          _0x15f1c4 = _0x24454d.split("/")[1]?.["split"]("_")?.[0] || "";
        return {
          cid: _0x4de224,
          llsid: _0x15f1c4
        };
      }
      isDevMode && console.log("[调试] getAdInfo 原始响应:", JSON.stringify(_0x5e78dc));
      return null;
    } catch (_0x2900d0) {
      console.log("❌ 账号[" + this.nickname + "] 获取广告异常: " + _0x2900d0.message);
      return null;
    }
  }
  async generateSignature(_0xdb01f5, _0x17dc46, _0x1521c4, _0x4b4a34) {
    try {
      const _0x28aa34 = {
          businessId: _0x4b4a34.businessId,
          endTime: this.endTime,
          extParams: "",
          mediaScene: "video",
          neoInfos: [{
            creativeId: _0xdb01f5,
            extInfo: "",
            llsid: _0x17dc46,
            requestSceneType: _0x4b4a34.requestSceneType,
            taskType: _0x4b4a34.taskType,
            watchExpId: "",
            watchStage: 0
          }],
          pageId: 11101,
          posId: _0x4b4a34.posId,
          reportType: 0,
          sessionId: "",
          startTime: this.startTime,
          subPageId: _0x4b4a34.subPageId
        },
        _0x4adea9 = JSON.stringify(_0x28aa34),
        _0x2a80c5 = "bizStr=" + encodeURIComponent(_0x4adea9) + "&cs=false&client_key=2ac2a76d",
        _0x2c56f1 = this.queryParams + "&" + _0x2a80c5,
        _0x2b2561 = await this.requestSignService({
          urlpath: this.taskReportPath,
          urldata: _0x2c56f1,
          api_client_salt: this.salt
        }, "账号[" + this.nickname + "] 生成报告签名");
      if (!_0x2b2561 || !_0x2b2561.data) {
        return null;
      }
      return {
        sig: _0x2b2561.data.sig,
        sig3: _0x2b2561.data.__NS_sig3,
        sigtoken: _0x2b2561.data.__NStokensig,
        post: _0x2a80c5
      };
    } catch (_0x288b40) {
      console.log("❌ 账号[" + this.nickname + "] 生成签名异常: " + _0x288b40.message);
      return null;
    }
  }
  async generateSignature2(_0x18e534, _0x5063a6, _0x26de52, _0x24c676) {
    const _0x18063f = await this.requestSignService({
      urlpath: _0x18e534,
      urldata: _0x5063a6,
      api_client_salt: _0x26de52,
      req_str: _0x24c676
    }, "账号[" + this.nickname + "] 生成广告签名");
    if (!_0x18063f) {
      return null;
    }
    return _0x18063f.data || _0x18063f;
  }
  async submitReport(_0x4611e4, _0x57b389, _0x57a73b, _0x5d85f9, _0x54fdc1, _0x58cff7) {
    try {
      const _0x4c68a1 = "https://api.e.kuaishou.com" + this.taskReportPath + "?" + this.queryParams + "&sig=" + _0x4611e4 + "&__NS_sig3=" + _0x57b389 + "&__NS_xfalcon=&__NStokensig=" + _0x57a73b,
        _0x5adb6c = await makeRequest({
          method: "POST",
          url: _0x4c68a1,
          headers: {
            Host: "api.e.kuaishou.cn",
            "User-Agent": "kwai-android aegon/3.56.0",
            Cookie: this.cookie,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: _0x5d85f9,
          timeout: 12000
        }, this.proxyUrl, "账号[" + this.nickname + "] 提交任务");
      if (!_0x5adb6c) {
        return {
          success: false,
          reward: 0
        };
      }
      if (_0x5adb6c.result === 1) {
        const _0x475097 = _0x5adb6c.data?.["neoAmount"] || 0;
        console.log("💰 账号[" + this.nickname + "] " + _0x58cff7.name + _0x475097 + "金币奖励！");
        _0x475097 <= this.lowRewardThreshold ? (this.lowRewardStreak++, console.log("⚠️ 账号[" + this.nickname + "] [备注：奖励低于 LOW_REWARD_THRESHOLD=" + this.lowRewardThreshold + "] 金币低于阈值, 模拟下载应用提升权重^^^^^^"), this.did = generateDid(), this.lowRewardStreak >= this.lowRewardLimit && (console.log("🏁 账号[" + this.nickname + "] 连续" + this.lowRewardLimit + "次奖励≤" + this.lowRewardThreshold + "，停止全部任务 [备注：连续低奖励达到上限 LOW_REWARD_LIMIT=" + this.lowRewardLimit + "]"), this.stopAllTasks = true)) : this.lowRewardStreak = 0;
        return {
          success: true,
          reward: _0x475097
        };
      }
      if ([20107, 20108, 1003, 415].includes(_0x5adb6c.result)) {
        console.log("⚠️ 账号[" + this.nickname + "] " + _0x58cff7.name + " 已达上限");
        this.taskLimitReached[_0x54fdc1] = true;
        return {
          success: false,
          reward: 0
        };
      }
      console.log("❌ 账号[" + this.nickname + "] " + _0x58cff7.name + " 奖励失败，result=" + _0x5adb6c.result + " msg=" + (_0x5adb6c.data || ""));
      if (isDevMode) {
        console.log("[调试] submitReport 原始响应:", JSON.stringify(_0x5adb6c));
      }
      return {
        success: false,
        reward: 0
      };
    } catch (_0x35c9e5) {
      console.log("❌ 账号[" + this.nickname + "] 提交任务异常: " + _0x35c9e5.message);
      return {
        success: false,
        reward: 0
      };
    }
  }
  async requestSignService(_0x4f9dd9, _0xa15569) {
    const _0x292b00 = (process.env.km || "").trim();
    if (!_0x292b00) {
      return null;
    }
    const _0x409b31 = await makeRequest({
      method: "POST",
      url: SIGN_API_ENDPOINT + "?card_key=" + encodeURIComponent(_0x292b00),
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
        "X-Card-Key": _0x292b00
      },
      body: JSON.stringify(_0x4f9dd9),
      timeout: 15000
    }, null, _0xa15569 + "（签名服务）");
    if (!_0x409b31) {
      return null;
    }
    if (_0x409b31.success && _0x409b31.status === "queued" && _0x409b31.queue_id) {
      const _0x295ff4 = await this.pollQueueStatus(_0x409b31.queue_id);
      if (_0x295ff4 && _0x295ff4.success && (_0x295ff4.status === "completed" || _0x295ff4.status === "processed")) {
        return _0x295ff4;
      }
      console.log("账号[" + this.nickname + "] 签名失败: " + (_0x295ff4?.["error"] || _0x295ff4?.["status"] || "未知"));
      return null;
    }
    if (_0x409b31.success && (!_0x409b31.status || _0x409b31.status === "processed" || _0x409b31.status === "completed")) {
      return _0x409b31;
    }
    console.log("账号[" + this.nickname + "] 签名失败: " + (_0x409b31.error || _0x409b31.message || _0x409b31.status || "未知"));
    return null;
  }
  async pollQueueStatus(_0x21c8e9, _0x373f61 = 30000, _0x54b712 = 2000) {
    const _0x1e7736 = Date.now();
    while (Date.now() - _0x1e7736 < _0x373f61) {
      const _0x21514e = await makeRequest({
        method: "GET",
        url: QUEUE_STATUS_ENDPOINT + "?queue_id=" + encodeURIComponent(_0x21c8e9),
        headers: {
          "User-Agent": "Mozilla/5.0"
        },
        timeout: 10000
      }, null, "账号[" + this.nickname + "] 签名排队");
      if (_0x21514e?.["success"]) {
        if (_0x21514e.status === "completed" || _0x21514e.status === "processed") {
          return _0x21514e;
        }
        if (_0x21514e.status === "failed") {
          return _0x21514e;
        }
      }
      await new Promise(_0x11ea7d => setTimeout(_0x11ea7d, _0x54b712));
    }
    return {
      success: false,
      status: "failed",
      error: "queue_timeout"
    };
  }
  async executeTask(_0x45ea14) {
    const _0x599811 = this.taskConfigs[_0x45ea14];
    if (!_0x599811) {
      console.log("❌ 账号[" + this.nickname + "] 未知任务: " + _0x45ea14);
      return false;
    }
    if (this.taskLimitReached[_0x45ea14]) {
      return false;
    }
    try {
      const _0x357fec = await this.retryOperation(() => this.getAdInfo(_0x599811), "获取" + _0x599811.name + "信息", 3);
      if (!_0x357fec) {
        this.taskStats[_0x45ea14].failed++;
        return false;
      }
      const _0x5bcfd4 = Math.floor(Math.random() * 10000) + 30000;
      console.log("🔍 账号[" + this.nickname + "] ==>成功获取" + _0x599811.name + " " + getRandomAdWatchingStatus() + " " + Math.round(_0x5bcfd4 / 1000) + " 秒");
      await new Promise(_0xf289d6 => setTimeout(_0xf289d6, _0x5bcfd4));
      const _0x57e8ed = await this.retryOperation(() => this.generateSignature(_0x357fec.cid, _0x357fec.llsid, _0x45ea14, _0x599811), "生成" + _0x599811.name + "签名", 3);
      if (!_0x57e8ed) {
        this.taskStats[_0x45ea14].failed++;
        return false;
      }
      const _0x3917ba = await this.retryOperation(() => this.submitReport(_0x57e8ed.sig, _0x57e8ed.sig3, _0x57e8ed.sigtoken, _0x57e8ed.post, _0x45ea14, _0x599811), "提交" + _0x599811.name + "报告", 3);
      if (_0x3917ba?.["success"]) {
        this.taskStats[_0x45ea14].success++;
        this.taskStats[_0x45ea14].totalReward += _0x3917ba.reward || 0;
        return true;
      }
      this.taskStats[_0x45ea14].failed++;
      return false;
    } catch (_0x25477b) {
      console.log("❌ 账号[" + this.nickname + "] 任务异常(" + _0x45ea14 + "): " + _0x25477b.message);
      this.taskStats[_0x45ea14].failed++;
      return false;
    }
  }
  async executeAllTasksByPriority() {
    const _0x56f6c1 = {};
    for (const _0x21ff4b of this.tasksToExecute) {
      if (this.stopAllTasks) {
        break;
      }
      if (!this.taskConfigs[_0x21ff4b]) {
        console.log("⚠️ 账号[" + this.nickname + "] 跳过未知任务: " + _0x21ff4b);
        continue;
      }
      console.log("🚀 账号[" + this.nickname + "] 开始任务：" + this.taskConfigs[_0x21ff4b].name);
      _0x56f6c1[_0x21ff4b] = await this.executeTask(_0x21ff4b);
      if (this.stopAllTasks) {
        break;
      }
      if (_0x21ff4b !== this.tasksToExecute[this.tasksToExecute.length - 1]) {
        const _0x31bc20 = Math.floor(Math.random() * 8000) + 7000;
        console.log("⏱ 账号[" + this.nickname + "] 下一个任务，随机等待 " + Math.round(_0x31bc20 / 1000) + " 秒");
        await new Promise(_0x2862e0 => setTimeout(_0x2862e0, _0x31bc20));
      }
    }
    return _0x56f6c1;
  }
}
async function runConcurrentTasks(_0x26aa1d, _0x16e395, _0x3e16ca) {
  const _0x4df947 = new Array(_0x26aa1d.length);
  let _0x2a1164 = 0;
  async function _0x2f3a39() {
    while (true) {
      const _0x4e9d07 = _0x2a1164++;
      if (_0x4e9d07 >= _0x26aa1d.length) {
        return;
      }
      const _0x290d1b = _0x26aa1d[_0x4e9d07];
      try {
        _0x4df947[_0x4e9d07] = await _0x3e16ca(_0x290d1b, _0x4e9d07);
      } catch (_0x173410) {
        console.log("并发执行异常（index=" + (_0x4e9d07 + 1) + "）：" + _0x173410.message);
        _0x4df947[_0x4e9d07] = null;
      }
    }
  }
  const _0x91bbee = Array.from({
    length: Math.min(_0x16e395, _0x26aa1d.length)
  }, _0x2f3a39);
  await Promise.all(_0x91bbee);
  return _0x4df947;
}
async function processSingleAccount(_0x3a2e14, _0x50bedc = MAX_ROUNDS) {
  console.log("账号[" + _0x3a2e14.index + "]" + (_0x3a2e14.remark ? "（" + _0x3a2e14.remark + "）" : "") + " [备注：本账号将执行最多 " + _0x50bedc + " 轮任务]");
  if (_0x3a2e14.proxyUrl) {
    console.log("账号[" + _0x3a2e14.index + "]" + (_0x3a2e14.remark ? "（" + _0x3a2e14.remark + "）" : "") + " 🔌 测试代理连接中...");
    const _0x574182 = await testProxyConnection(_0x3a2e14.proxyUrl, "账号[" + _0x3a2e14.index + "]");
    console.log("  - " + (_0x574182.ok ? "✅ 代理验证通过，IP: " + _0x574182.ip : "❌ 代理验证失败") + ": " + _0x574182.msg);
    _0x574182.ok && _0x574182.ip && _0x574182.ip !== "localhost" && (usedProxyIps.has(_0x574182.ip) && (console.log("\n⚠️ 存在相同代理IP（" + _0x574182.ip + "），请立即检查！"), process.exit(1)), usedProxyIps.add(_0x574182.ip));
  } else {
    console.log("账号[" + _0x3a2e14.index + "] 未配置代理，走直连");
  }
  console.log("账号[" + _0x3a2e14.index + "]" + (_0x3a2e14.remark ? "（" + _0x3a2e14.remark + "）" : "") + " 🔍 获取账号信息中...");
  let _0x280c1c = await getAccountBasicInfo(_0x3a2e14.cookie, _0x3a2e14.proxyUrl, _0x3a2e14.index),
    _0x2bbbdb = _0x280c1c?.["nickname"] || "账号" + _0x3a2e14.index;
  if (_0x280c1c) {
    const _0xac15b3 = _0x280c1c.totalCoin != null ? _0x280c1c.totalCoin : "未知",
      _0x33f888 = _0x280c1c.allCash != null ? _0x280c1c.allCash : "未知";
    console.log("账号[" + _0x2bbbdb + "] ✅ 登录成功，💰 当前金币: " + _0xac15b3 + "，💸 当前余额: " + _0x33f888);
  } else {
    console.log("账号[" + _0x2bbbdb + "] ❌ 基本信息获取失败，继续执行");
  }
  const _0x3adf18 = new KuaishouAccount({
    ..._0x3a2e14,
    nickname: _0x2bbbdb,
    tasksToExecute: tasksToExecute
  });
  await _0x3adf18.checkCoinLimit();
  if (_0x3adf18.coinExceeded) {
    console.log("账号[" + _0x3adf18.nickname + "] 初始金币已超过阈值，不执行任务");
    const _0x162251 = await getAccountBasicInfo(_0x3a2e14.cookie, _0x3a2e14.proxyUrl, _0x3a2e14.index),
      _0x3c57fe = _0x280c1c?.["totalCoin"] || 0,
      _0x326e7a = _0x162251?.["totalCoin"] || 0,
      _0x1cfae1 = _0x326e7a - _0x3c57fe,
      _0x2f74e9 = _0x280c1c?.["allCash"] || 0,
      _0x2e384c = _0x162251?.["allCash"] || 0,
      _0x273b63 = _0x2e384c - _0x2f74e9;
    return {
      index: _0x3a2e14.index,
      nickname: _0x2bbbdb,
      initialCoin: _0x3c57fe,
      finalCoin: _0x326e7a,
      coinChange: _0x1cfae1,
      initialCash: _0x2f74e9,
      finalCash: _0x2e384c,
      cashChange: _0x273b63,
      stats: _0x3adf18.getTaskStats(),
      coinLimitExceeded: true
    };
  }
  for (let _0x55f857 = 0; _0x55f857 < _0x50bedc; _0x55f857++) {
    const _0x25dcdb = Math.floor(Math.random() * 8000) + 8000;
    console.log("账号[" + _0x3adf18.nickname + "] ⌛ 第" + (_0x55f857 + 1) + "轮，先随机等待 " + Math.round(_0x25dcdb / 1000) + " 秒");
    await new Promise(_0xc7ab19 => setTimeout(_0xc7ab19, _0x25dcdb));
    console.log("账号[" + _0x3adf18.nickname + "] 🚀 开始第" + (_0x55f857 + 1) + "轮任务");
    const _0x2d9982 = await _0x3adf18.executeAllTasksByPriority();
    Object.values(_0x2d9982).some(Boolean) ? console.log("账号[" + _0x3adf18.nickname + "] ✅ 第" + (_0x55f857 + 1) + "轮执行完成") : console.log("账号[" + _0x3adf18.nickname + "] ⚠️ 第" + (_0x55f857 + 1) + "轮没有成功任务");
    if (_0x3adf18.stopAllTasks) {
      console.log("账号[" + _0x3adf18.nickname + "] 🏁 达到停止条件，终止后续轮次");
      break;
    }
    if (_0x55f857 < _0x50bedc - 1) {
      const _0x4df11c = Math.floor(Math.random() * 10000) + 10000;
      console.log("账号[" + _0x3adf18.nickname + "] ⌛ 等待 " + Math.round(_0x4df11c / 1000) + " 秒进入下一轮");
      await new Promise(_0xa26f1d => setTimeout(_0xa26f1d, _0x4df11c));
    }
  }
  const _0x2364fc = await getAccountBasicInfo(_0x3a2e14.cookie, _0x3a2e14.proxyUrl, _0x3a2e14.index),
    _0x5ea6c6 = _0x280c1c?.["totalCoin"] || 0,
    _0x176f42 = _0x2364fc?.["totalCoin"] || 0,
    _0x37bd5f = _0x176f42 - _0x5ea6c6,
    _0x8b1c = _0x280c1c?.["allCash"] || 0,
    _0x369a01 = _0x2364fc?.["allCash"] || 0,
    _0x5acc58 = _0x369a01 - _0x8b1c;
  _0x3adf18.printTaskStats();
  return {
    index: _0x3a2e14.index,
    nickname: _0x2bbbdb,
    initialCoin: _0x5ea6c6,
    finalCoin: _0x176f42,
    coinChange: _0x37bd5f,
    initialCash: _0x8b1c,
    finalCash: _0x369a01,
    cashChange: _0x5acc58,
    stats: _0x3adf18.getTaskStats(),
    coinLimitExceeded: _0x3adf18.coinExceeded
  };
}
function printSummaryReport(_0x442ec7) {
  if (!_0x442ec7.length) {
    console.log("\n没有可显示的账号信息。");
    return;
  }
  const _0x19977f = _0x442ec7.reduce((_0x75d689, _0xc1f64b) => _0x75d689 + (parseInt(_0xc1f64b.initialCoin) || 0), 0),
    _0x3d9759 = _0x442ec7.reduce((_0x1a89a4, _0x4fd8b3) => _0x1a89a4 + (parseInt(_0x4fd8b3.finalCoin) || 0), 0),
    _0x330e95 = _0x3d9759 - _0x19977f,
    _0x13bce5 = _0x442ec7.reduce((_0x5ffbbd, _0x2851ed) => _0x5ffbbd + (parseFloat(_0x2851ed.initialCash) || 0), 0),
    _0x569a0b = _0x442ec7.reduce((_0x179e99, _0x3a2679) => _0x179e99 + (parseFloat(_0x3a2679.finalCash) || 0), 0),
    _0x412919 = _0x569a0b - _0x13bce5;
  let _0x12ab44 = 0,
    _0x3b5171 = 0,
    _0x459dad = 0;
  _0x442ec7.forEach(_0x527214 => {
    _0x527214.stats && Object.values(_0x527214.stats).forEach(_0x2d711a => {
      _0x12ab44 += _0x2d711a.success + _0x2d711a.failed;
      _0x3b5171 += _0x2d711a.success;
      _0x459dad += _0x2d711a.totalReward;
    });
  });
  const _0x2bdc6e = _0x12ab44 > 0 ? (_0x3b5171 / _0x12ab44 * 100).toFixed(1) : "0.0",
    _0x5402cc = _0x442ec7.filter(_0x1e64f8 => _0x1e64f8.coinLimitExceeded).length;
  console.log("\n\n" + "=".repeat(80));
  console.log("|" + centerAlignText("      快手养号任务执行结果汇总表      ", 78) + "|");
  console.log("=".repeat(80));
  console.log("|" + ("总账号数: " + _0x442ec7.length).padEnd(22) + ("超过金币阈值账号: " + _0x5402cc).padEnd(22) + ("总任务数: " + _0x12ab44).padEnd(22) + ("任务成功率: " + _0x2bdc6e + "%").padEnd(10) + "|");
  console.log("|" + ("总金币变化: " + _0x330e95).padEnd(26) + ("总金币奖励: " + _0x459dad).padEnd(26) + ("总余额变化: " + _0x412919.toFixed(2)).padEnd(24) + "|");
  console.log("-".repeat(80));
  const _0x2ad014 = ["序号", "账号昵称", "初始金币", "最终金币", "金币变化", "初始余额", "最终余额", "余额变化"],
    _0x5e9389 = [6, 16, 12, 12, 12, 12, 12, 12];
  let _0x9545eb = "|";
  _0x2ad014.forEach((_0x25e6f9, _0x3f959c) => {
    _0x9545eb += centerAlignText(_0x25e6f9, _0x5e9389[_0x3f959c]) + "|";
  });
  console.log(_0x9545eb);
  let _0x1d4639 = "|";
  _0x5e9389.forEach(_0x584a66 => {
    _0x1d4639 += "-".repeat(_0x584a66) + "|";
  });
  console.log(_0x1d4639);
  _0x442ec7.forEach(_0x383dfb => {
    let _0x63689d = "|";
    _0x63689d += centerAlignText(_0x383dfb.index, _0x5e9389[0]) + "|";
    const _0x2ffc36 = (_0x383dfb.nickname || "-") + (_0x383dfb.coinLimitExceeded ? " ⚠️" : "");
    _0x63689d += centerAlignText(_0x2ffc36.substring(0, _0x5e9389[1] - 2), _0x5e9389[1]) + "|";
    _0x63689d += centerAlignText(_0x383dfb.initialCoin, _0x5e9389[2]) + "|";
    _0x63689d += centerAlignText(_0x383dfb.finalCoin, _0x5e9389[3]) + "|";
    const _0x52e1c8 = _0x383dfb.coinChange >= 0 ? "+" + _0x383dfb.coinChange : _0x383dfb.coinChange;
    _0x63689d += centerAlignText(_0x52e1c8, _0x5e9389[4]) + "|";
    _0x63689d += centerAlignText(_0x383dfb.initialCash, _0x5e9389[5]) + "|";
    _0x63689d += centerAlignText(_0x383dfb.finalCash, _0x5e9389[6]) + "|";
    const _0x5d3b58 = _0x383dfb.cashChange >= 0 ? "+" + _0x383dfb.cashChange.toFixed(2) : _0x383dfb.cashChange.toFixed(2);
    _0x63689d += centerAlignText(_0x5d3b58, _0x5e9389[7]) + "|";
    console.log(_0x63689d);
  });
  console.log("=".repeat(80));
  console.log("|" + centerAlignText("      任务执行完成，请查看详细结果      ", 78) + "|");
  console.log("=".repeat(80));
}
(async () => {
  const _0x351b8d = loadAccountsFromEnv();
  console.log("共找到 " + _0x351b8d.length + " 个有效账号");
  !_0x351b8d.length && process.exit(1);
  const _0x3856a8 = parseInt(process.env.MAX_CONCURRENCY || process.env.CONCURRENCY || "888", 10) || 888,
    _0x38ba8c = parseInt(process.env.ROUNDS || "35", 10) || 35;
  console.log("\n防黑并发：" + _0x3856a8 + "    防黑轮数：" + _0x38ba8c + "\n");
  const _0x247334 = [];
  await runConcurrentTasks(_0x351b8d, _0x3856a8, async _0x65e58c => {
    console.log("\n—— 🚀 开始账号[" + _0x65e58c.index + "]" + (_0x65e58c.remark ? "（" + _0x65e58c.remark + "）" : "") + " ——");
    try {
      const _0x194f8e = await processSingleAccount(_0x65e58c, _0x38ba8c);
      _0x247334.push({
        index: _0x65e58c.index,
        remark: _0x65e58c.remark || "无备注",
        nickname: _0x194f8e?.["nickname"] || "未知",
        initialCoin: _0x194f8e?.["initialCoin"] || 0,
        finalCoin: _0x194f8e?.["finalCoin"] || 0,
        coinChange: _0x194f8e?.["coinChange"] || 0,
        initialCash: _0x194f8e?.["initialCash"] || 0,
        finalCash: _0x194f8e?.["finalCash"] || 0,
        cashChange: _0x194f8e?.["cashChange"] || 0,
        stats: _0x194f8e?.["stats"] || {},
        coinLimitExceeded: _0x194f8e?.["coinLimitExceeded"] || false
      });
    } catch (_0x4020c9) {
      console.log("账号[" + _0x65e58c.index + "] ❌ 执行异常：" + _0x4020c9.message);
      _0x247334.push({
        index: _0x65e58c.index,
        remark: _0x65e58c.remark || "无备注",
        nickname: "执行失败",
        initialCoin: 0,
        finalCoin: 0,
        coinChange: 0,
        initialCash: 0,
        finalCash: 0,
        cashChange: 0,
        error: _0x4020c9.message
      });
    }
  });
  _0x247334.sort((_0x9a4571, _0x467a66) => _0x9a4571.index - _0x467a66.index);
  console.log("\n全部完成。", "✅");
  console.log("\n---------------------------------------------- 账号信息汇总 ----------------------------------------------");
  printSummaryReport(_0x247334);
})();