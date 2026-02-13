//Fri Feb 13 2026 12:37:47 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const axios = require("axios"),
  http = require("http"),
  crypto = require("crypto"),
  zlib = require("zlib"),
  {
    SocksProxyAgent
  } = require("socks-proxy-agent"),
  Visual = {
    c: {
      reset: "[0m",
      amber: "[38;5;214m",
      deepBlue: "[38;5;33m",
      crimson: "[38;5;196m",
      purple: "[38;5;129m",
      emerald: "[38;5;46m",
      orange: "[38;5;202m",
      deepPink: "[38;5;198m",
      grey: "[38;5;243m",
      gold: "[38;5;220m",
      cyan: "[38;5;51m"
    },
    fmt: {
      act: _0x2509ac => "[38;5;45m⚔️ [战斗] " + _0x2509ac + "[0m",
      item: _0x26583b => "[38;5;198m🎁 [掉落] " + _0x26583b + "[0m",
      target: _0x172a4b => "[38;5;202m🎯 [目标] " + _0x172a4b + "[0m",
      energy: _0x5b58f2 => "[38;5;214m⚡ " + _0x5b58f2 + "[0m",
      monster: _0x43570e => "[38;5;160m👹 " + _0x43570e + "[0m",
      type: _0x1365ce => "[38;5;93m🏷️ <" + _0x1365ce + ">[0m",
      emerald: _0x78258b => "[38;5;46m" + _0x78258b + "[0m",
      crimson: _0x3da06e => "[38;5;196m" + _0x3da06e + "[0m",
      actEnter: _0x1b4beb => "[38;5;46m✨ [奥特念力] " + _0x1b4beb + "[0m",
      actLock: _0x4d1dd1 => "[38;5;39m👁️ [奥特眼] " + _0x4d1dd1 + "[0m",
      actKill: _0x5ea9bd => "[38;5;196m💥 [斯派修姆] " + _0x5ea9bd + "[0m",
      actRetain: _0x55526d => "[38;5;220m🛡️ [奥特屏障] " + _0x55526d + "[0m",
      actPursue: _0x44ea05 => "[38;5;129m♾️ [无限形态] " + _0x44ea05 + "[0m",
      actRetreat: _0x4052eb => "[38;5;243m💨 [化作光点] " + _0x4052eb + "[0m",
      actHeart: _0x573ced => "[38;5;198m💙 [彩色计时器] " + _0x573ced + "[0m",
      info: _0x58faf4 => "[38;5;46m📡 [通讯] " + _0x58faf4 + "[0m",
      warn: _0x43d405 => "[38;5;220m⚠️ [警报] " + _0x43d405 + "[0m",
      local: _0x698e6 => "[38;5;34m🏠 [本部] " + _0x698e6 + "[0m",
      proxy: _0x4a6e75 => "[38;5;93m🌌 [虫洞] " + _0x4a6e75 + "[0m"
    },
    getSoulColor: _0x4df37b => {
      const _0x5f4920 = ["[38;5;196m", "[38;5;202m", "[38;5;208m", "[38;5;214m", "[38;5;220m", "[38;5;226m", "[38;5;190m", "[38;5;154m", "[38;5;118m", "[38;5;82m", "[38;5;46m", "[38;5;48m", "[38;5;49m", "[38;5;51m", "[38;5;45m", "[38;5;39m", "[38;5;33m", "[38;5;27m", "[38;5;21m", "[38;5;57m", "[38;5;93m", "[38;5;129m", "[38;5;165m", "[38;5;201m", "[38;5;200m", "[38;5;199m", "[38;5;198m", "[38;5;197m"];
      let _0x5879c0 = 5381;
      const _0x3e01f6 = String(_0x4df37b);
      for (let _0x4a4a5d = 0; _0x4a4a5d < _0x3e01f6.length; _0x4a4a5d++) {
        _0x5879c0 = (_0x5879c0 << 5) + _0x5879c0 + _0x3e01f6.charCodeAt(_0x4a4a5d);
      }
      return _0x5f4920[(_0x5879c0 >>> 0) % _0x5f4920.length];
    },
    getArtifact: _0x2ce419 => {
      let _0x23e430 = [];
      if (_0x2ce419 < 100) {
        _0x23e430 = [{
          v: "回收了",
          n: "皮古蒙的气球 🎈"
        }, {
          v: "捡到了",
          n: "早田进的勺子 🥄"
        }, {
          v: "发现了",
          n: "美特龙星人的烟头 🚬"
        }];
      } else {
        if (_0x2ce419 < 500) {
          _0x23e430 = [{
            v: "研发出",
            n: "科特队·超级枪 🔫"
          }, {
            v: "装备了",
            n: "MAT队·爱罗1号 ✈️"
          }, {
            v: "习得了",
            n: "雷欧飞踢 (入门) 🦵"
          }];
        } else {
          if (_0x2ce419 < 1500) {
            _0x23e430 = [{
              v: "觉醒了",
              n: "梦比优斯·无限形态 🔥"
            }, {
              v: "获得了",
              n: "希卡利·骑士气息 ⚔️"
            }, {
              v: "启动了",
              n: "赛罗·究极铠甲 🛡️"
            }];
          } else {
            _0x2ce419 < 2500 ? _0x23e430 = [{
              v: "【奇迹】",
              n: "赛迦·极限之拳 👊"
            }, {
              v: "【真理】",
              n: "贝利亚·黄昏 🗡️"
            }, {
              v: "【闪耀】",
              n: "迪迦·闪耀环身盾 ✨"
            }] : _0x23e430 = [{
              v: "【创世】",
              n: "诺亚·帕拉吉之盾 🛡️"
            }, {
              v: "【传说】",
              n: "雷杰多·火花传说 🌌"
            }];
          }
        }
      }
      return _0x23e430[Math.floor(Math.random() * _0x23e430.length)];
    },
    banner: () => {
      console.log("\n" + Visual.c.crimson);
      console.log(" _   _  _   _____  ____      _    __  __    _    _   _ ");
      console.log("| | | || | |_   _||  _ \\    / \\  |  \\/  |  / \\  | \\ | |");
      console.log("| | | || |   | |  | |_) |  / _ \\ | |\\/| | / _ \\ |  \\| |");
      console.log("| |_| || |___| |  |  _ <  / ___ \\| |  | |/ ___ \\| |\\  |");
      console.log(" \\___/ |_____|_|  |_| \\_\\/_/   \\_\\_|  |_/_/   \\_\\_| \\_|");
      console.log("                                                       ");
      console.log("   ⚡ ウルトラマン · 银河维和行动 (Galaxy Patrol v8.2) ⚡   ");
      console.log("\n" + Visual.c.deepBlue + "       >>> XF 业务版 · 光之国最高指令终端 <<<       " + Visual.c.reset + "\n");
    },
    log: (_0x29c524, _0x10ed29, _0x31505f) => {
      const _0x5c56d3 = new Date().toLocaleTimeString("en-GB");
      let _0x56068c = "[M78星云总部]",
        _0x2a36e2 = Visual.c.reset;
      _0x29c524 && (_0x2a36e2 = Visual.getSoulColor(_0x29c524.uid), _0x56068c = "[" + _0x29c524.remark + "][" + _0x29c524.nickname + "][UID:" + _0x29c524.uid + "]");
      let _0x396071 = "";
      if (_0x10ed29 === "start") {
        _0x396071 = "🚀 ";
      }
      if (_0x10ed29 === "doing") {
        _0x396071 = "👊 ";
      }
      if (_0x10ed29 === "reward") {
        _0x396071 = "💎 ";
      }
      if (_0x10ed29 === "rest") {
        _0x396071 = "💤 ";
      }
      if (_0x10ed29 === "error") {
        _0x396071 = "👾 ";
      }
      if (_0x10ed29 === "warn") {
        _0x396071 = "🚨 ";
      }
      if (_0x10ed29 === "system") {
        _0x396071 = "🖥️ ";
      }
      if (_0x10ed29 === "success") {
        _0x396071 = "🙆 ";
      }
      if (_0x10ed29 === "rpc") {
        _0x396071 = "";
      }
      if (_0x31505f.includes("[本部]")) {
        _0x396071 = "";
      }
      if (_0x31505f.includes("[虫洞]")) {
        _0x396071 = "";
      }
      console.log(_0x5c56d3 + " " + _0x2a36e2 + _0x56068c + Visual.c.reset + " " + _0x396071 + _0x31505f);
    }
  };
let MAX_CONCURRENCY = 0;
process.argv[2] && !isNaN(process.argv[2]) && (MAX_CONCURRENCY = parseInt(process.argv[2]));
const SIGN_URL_LIST = ["http://v1.pgrm.top:15346/sign", "http://v2.pgrm.top:11971/sign", "http://v3.pgrm.top:16922/sign"],
  LOG_RPC_LIST = ["http://v1.pgrm.top:15749", "http://v2.pgrm.top:12314", "http://v3.pgrm.top:12998"],
  TASK_CONFIG = {
    look: {
      taskId: 6005,
      posId: 10914000012,
      inspireAdSource: "10914000012",
      titleKeyword: "看视频领3000金币"
    }
  },
  TASK_TYPE_RAW = process.env.XF_TASK_TYPE || "";
let BASE_TASK_TYPE = "look",
  FOLLOW_MODE = "fixed",
  FOLLOW_VAL_1 = 0,
  FOLLOW_VAL_2 = 0;
if (TASK_TYPE_RAW.includes("look")) {
  BASE_TASK_TYPE = "look";
  if (TASK_TYPE_RAW.includes("follow")) {
    if (TASK_TYPE_RAW.includes("_m_")) {
      FOLLOW_MODE = "random";
      const parts = TASK_TYPE_RAW.split("_");
      parts.length >= 5 && (FOLLOW_VAL_1 = parseInt(parts[3]) || 0, FOLLOW_VAL_2 = parseInt(parts[4]) || 0);
    } else {
      const parts = TASK_TYPE_RAW.split("_");
      if (parts.length === 3) {
        const val = parts[2];
        val === "n" ? FOLLOW_MODE = "infinite" : (FOLLOW_MODE = "fixed", FOLLOW_VAL_1 = parseInt(val) || 0);
      }
    }
  }
}
let MIN_INTERVAL = 60,
  MAX_INTERVAL = 70;
if (process.env.XF_TASK_INTERVAL) {
  const parts = process.env.XF_TASK_INTERVAL.split(/[-,\s]+/);
  if (parts.length === 2) {
    MIN_INTERVAL = parseInt(parts[0]) || 60;
    MAX_INTERVAL = parseInt(parts[1]) || 70;
  } else {
    parts.length === 1 && (MIN_INTERVAL = parseInt(parts[0]) || 60, MAX_INTERVAL = MIN_INTERVAL);
  }
}
const TOTAL_ROUNDS = parseInt(process.env.XF_ROUNDS) || 1,
  ROUND_INTERVAL = parseInt(process.env.XF_ROUND_INTERVAL) || 5,
  MAX_SESSION_COINS = parseInt(process.env.XF_MAX_SESSION_COINS) || 0,
  RISK_COIN_THRESHOLD = parseInt(process.env.XF_RISK_COIN_THRESHOLD) || 50,
  KEY_STR = "GWL8jXHLnzp63QDHHiTx",
  REAL_KEY = KEY_STR.substring(0, 16),
  random = (_0x465b02, _0x1e77c7) => Math.floor(Math.random() * (_0x1e77c7 - _0x465b02 + 1) + _0x465b02);
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (_0x1ec109) {
    var _0x3c4f38 = Math.random() * 16 | 0,
      _0x2bf52f = _0x1ec109 == "x" ? _0x3c4f38 : _0x3c4f38 & 3 | 8;
    return _0x2bf52f.toString(16);
  });
}
function getTaskToken(_0x4a69b6) {
  try {
    const _0x3a2d83 = Buffer.from(_0x4a69b6, "base64").toString("utf-8"),
      _0x1858a1 = JSON.parse(_0x3a2d83);
    return _0x1858a1.extParams || _0x1858a1.extParam || "";
  } catch (_0x5d322f) {
    return "";
  }
}
function getRandomSignUrl() {
  if (!SIGN_URL_LIST || SIGN_URL_LIST.length === 0) {
    return "http://192.168.0.106:8888/sign";
  }
  const _0x2f1965 = Math.floor(Math.random() * SIGN_URL_LIST.length);
  return SIGN_URL_LIST[_0x2f1965];
}
function getRandomLogRpcConfig() {
  if (!LOG_RPC_LIST || LOG_RPC_LIST.length === 0) {
    return {
      host: "192.168.0.106",
      port: 12580
    };
  }
  const _0x36806e = LOG_RPC_LIST[Math.floor(Math.random() * LOG_RPC_LIST.length)];
  try {
    const _0x37c33e = new URL(_0x36806e);
    return {
      host: _0x37c33e.hostname,
      port: parseInt(_0x37c33e.port) || 80
    };
  } catch (_0x320b9f) {
    return {
      host: "192.168.0.106",
      port: 12580
    };
  }
}
class XFAccount {
  constructor(_0x4fcd9d, _0x26fe11) {
    this.index = _0x4fcd9d;
    this.valid = true;
    this.sessionCoins = 0;
    this.initialCoins = 0;
    this.lowRewardCount = 0;
    this.clientIncrementId = Math.floor(Math.random() * 500) + 2600;
    this.publicIp = "127.0.0.1";
    this.appSessionId = "";
    this.currentAdSessionId = "";
    this.heartbeatTimer = null;
    this.heartbeatSeq = 0;
    let _0x5ce63c = _0x26fe11.split("#");
    if (_0x5ce63c.length === 32) {
      _0x5ce63c.push("");
    }
    if (_0x5ce63c.length < 33) {
      Visual.log(null, "error", "⚠️ 战士 " + _0x4fcd9d + " 装备(参数)不足，跳过");
      this.valid = false;
      return;
    }
    const _0x3e56dc = _0x5ce63c.map((_0x5199a7, _0x382c43) => {
      if (_0x382c43 === 0 || _0x382c43 === 32) {
        return _0x5199a7;
      }
      if (!_0x5199a7) {
        return "";
      }
      try {
        return Buffer.from(_0x5199a7, "base64").toString("utf-8");
      } catch (_0x733fa) {
        return _0x5199a7;
      }
    });
    this.remark = _0x3e56dc[0];
    this.cookie = _0x3e56dc[1];
    this.uid = (this.cookie.match(/userId=(\d+)/) || [])[1] || "0";
    this.nickname = "光之适应者";
    this.headers = {
      "Ks-Encoding": _0x3e56dc[2],
      BrowserUa: _0x3e56dc[3],
      "User-Agent": _0x3e56dc[4],
      SystemUa: _0x3e56dc[5],
      "Ks-PkgId": _0x3e56dc[6],
      "Content-Type": "application/json; charset=utf-8",
      Host: _0x3e56dc[11],
      Connection: _0x3e56dc[12],
      "Accept-Encoding": _0x3e56dc[13]
    };
    this.kaw = _0x3e56dc[7];
    this.kasConfig = {
      config: _0x3e56dc[8],
      user: _0x3e56dc[15],
      inspire: _0x3e56dc[16],
      ad: _0x3e56dc[17],
      task: _0x3e56dc[18],
      report: _0x3e56dc[19],
      box: _0x3e56dc[20],
      meal: _0x3e56dc[21]
    };
    const _0x349225 = _0x3e56dc[32];
    this.proxyUrl = _0x349225 && _0x349225.trim() !== "" ? _0x349225 : null;
    this.agent = this.proxyUrl ? new SocksProxyAgent(this.proxyUrl) : null;
    this.request = axios.create({
      timeout: 15000,
      httpAgent: this.agent,
      httpsAgent: this.agent
    });
    const _0x42c189 = _0x3e56dc[22];
    this.baseParams = new URLSearchParams(_0x42c189);
    this.baseParams.delete("sig2");
    this.baseParams.delete("bodyMd5");
    this.deviceModel = this.baseParams.get("mod");
    this.osVer = this.baseParams.get("androidApiLevel") || "31";
    this.did = this.baseParams.get("did");
    const _0x586c65 = this.baseParams.get("ud");
    if (_0x586c65) {
      this.uid = _0x586c65;
    }
    this.verCode = 1000275;
    this.verName = "3.1.3.3";
    this.logHeaders = {
      Connection: "keep-alive",
      "User-Agent": _0x3e56dc[24],
      "Accept-Language": _0x3e56dc[26],
      Cookie: _0x3e56dc[27],
      "Content-Type": "application/octet-stream",
      Host: "tube.e.kuaishou.com",
      "Accept-Encoding": "gzip"
    };
    this.rpcTokens = {};
    if (_0x3e56dc[27]) {
      const _0x25233a = _0x3e56dc[27].split(";");
      _0x25233a.forEach(_0x83d47e => {
        const [_0x59154b, _0x5278ad] = _0x83d47e.trim().split("=");
        if (_0x59154b === "token") {
          this.rpcTokens.token = _0x5278ad;
        }
        if (_0x59154b === "kuaishou.api_st") {
          this.rpcTokens["kuaishou.api_st"] = _0x5278ad;
        }
      });
    }
    try {
      const _0x530624 = JSON.parse(_0x3e56dc[14]),
        _0x29a4dd = this.decrypt(_0x530624.message);
      if (_0x29a4dd) {
        const _0x12ce31 = JSON.parse(_0x29a4dd);
        delete _0x12ce31.timestamp;
        delete _0x12ce31.msgParam;
        delete _0x12ce31.merchantParam;
        delete _0x12ce31.impInfo;
        this.baseDeviceInfo = _0x12ce31;
      } else {
        throw new Error("解密Fail");
      }
    } catch (_0x51b3b9) {
      this.log("error", "❌ 变身器(设备指纹)故障: " + _0x51b3b9.message);
      this.valid = false;
    }
  }
  log(_0x34fc6f, _0x3eae2c) {
    if (typeof _0x3eae2c === "undefined") {
      _0x3eae2c = _0x34fc6f;
      _0x34fc6f = "system";
    }
    Visual.log(this, _0x34fc6f, _0x3eae2c);
  }
  decrypt(_0x577c73) {
    if (!_0x577c73) {
      return null;
    }
    try {
      const _0x16808a = Buffer.from(_0x577c73, "base64"),
        _0x3cee6b = crypto.createDecipheriv("aes-128-ecb", REAL_KEY, null);
      _0x3cee6b.setAutoPadding(true);
      let _0x3459f6 = Buffer.concat([_0x3cee6b.update(_0x16808a), _0x3cee6b.final()]);
      try {
        return zlib.gunzipSync(_0x3459f6).toString("utf-8");
      } catch (_0x127a57) {
        return _0x3459f6.toString("utf-8");
      }
    } catch (_0x29ac18) {
      return null;
    }
  }
  encrypt(_0x3c35a5) {
    try {
      const _0x23ecfb = zlib.gzipSync(Buffer.from(_0x3c35a5, "utf-8")),
        _0x5e565f = crypto.createCipheriv("aes-128-ecb", REAL_KEY, null);
      _0x5e565f.setAutoPadding(true);
      return Buffer.concat([_0x5e565f.update(_0x23ecfb), _0x5e565f.final()]).toString("base64");
    } catch (_0x362caf) {
      return null;
    }
  }
  getSensorData(_0x552949) {
    const _0x4d07a0 = (_0x45765b, _0x238cde) => Math.random() * (_0x238cde - _0x45765b) + _0x45765b,
      _0x516b3a = Math.floor(_0x552949 / 1000),
      _0x3dd404 = Math.random() < 0.1;
    let _0x1c2e9d, _0x100378, _0x45872a, _0x560dfd, _0x5aee66, _0xc5425d;
    if (_0x3dd404) {
      _0x1c2e9d = _0x4d07a0(-3, 3);
      _0x100378 = _0x4d07a0(2, 8);
      _0x45872a = _0x4d07a0(5, 10);
      _0x560dfd = _0x4d07a0(-1.5, 1.5);
      _0x5aee66 = _0x4d07a0(-1.5, 1.5);
      _0xc5425d = _0x4d07a0(-1.5, 1.5);
    } else {
      _0x1c2e9d = _0x4d07a0(-0.5, 0.5);
      _0x100378 = _0x4d07a0(4.5, 6.5);
      _0x45872a = _0x4d07a0(7.5, 9.5);
      _0x560dfd = _0x4d07a0(-0.05, 0.05);
      _0x5aee66 = _0x4d07a0(-0.05, 0.05);
      _0xc5425d = _0x4d07a0(-0.05, 0.05);
    }
    return [{
      sensorType: 1,
      timestamp: _0x516b3a,
      values: [_0x1c2e9d, _0x100378, _0x45872a]
    }, {
      sensorType: 4,
      timestamp: _0x516b3a,
      values: [_0x560dfd, _0x5aee66, _0xc5425d]
    }];
  }
  async getPublicIP() {
    const _0x1aec8f = ["http://ip-api.com/json", "https://httpbin.org/ip", "https://api.ipify.org?format=json"];
    for (const _0x49078a of _0x1aec8f) {
      try {
        const _0x3bea4c = await this.request.get(_0x49078a, {
          timeout: 8000
        });
        let _0x4d9672 = "";
        if (_0x3bea4c.data.query) {
          _0x4d9672 = _0x3bea4c.data.query;
        } else {
          if (_0x3bea4c.data.origin) {
            _0x4d9672 = _0x3bea4c.data.origin;
          } else {
            if (_0x3bea4c.data.ip) {
              _0x4d9672 = _0x3bea4c.data.ip;
            }
          }
        }
        if (_0x4d9672) {
          this.publicIp = _0x4d9672;
          this.log("system", "🌍 " + Visual.fmt.proxy("星际坐标锁定") + ": " + _0x4d9672);
          return;
        }
      } catch (_0x2db5d6) {}
    }
    this.log("warn", "⚠️ 无法锁定星际坐标，使用默认值: " + this.publicIp);
  }
  resetAppSession() {
    this.appSessionId = uuid();
    this.heartbeatSeq = 0;
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
    }
    this.log("start", "🔄 启动新变身形态 (New Session): " + this.appSessionId);
  }
  generateAdSessionId() {
    return Math.random().toString(36);
  }
  generateRequestId() {
    return Date.now().toString() + Math.floor(Math.random() * 100000).toString().padStart(5, "0");
  }
  getCommonBody(_0x461486, _0x152171, _0x21438f = 2, _0x732ab1 = 190) {
    this.clientIncrementId++;
    const _0x258b55 = Date.now(),
      _0x21b88d = parseInt(this.uid) || 0;
    return {
      event: [{
        clientIncrementId: this.clientIncrementId,
        clientTimestamp: _0x258b55,
        commonPackage: {
          additionalSeqIdPackage: {
            channel: _0x21438f,
            channelSeqId: _0x732ab1,
            customSeqId: 90,
            customType: _0x461486,
            cachedSize: -1
          },
          apiAppStatus: 0,
          appPackage: {
            abi: 2,
            androidOs: 0,
            buildType: 3,
            channel: "ANDROID_YYB_BA_XFDJXM_NSET_XIFAN_MYAPP",
            container: "",
            hotfixPatchVersion: "",
            language: "zh",
            newOc: "ANDROID_YYB_BA_XFDJXM_NSET_XIFAN_MYAPP",
            originalPlatform: 0,
            packageName: "com.kwai.theater",
            platform: 1,
            product: 38,
            robustInfo: "",
            versionCode: this.verCode,
            versionName: this.verName,
            cachedSize: -1
          },
          devicePackage: {
            model: this.deviceModel,
            osVersion: this.osVer,
            ua: "",
            cachedSize: -1
          },
          experiment: [],
          globalAttr: JSON.stringify({
            activityTag: "",
            entry_tag: [],
            network_ip: this.publicIp,
            is_background: 1
          }),
          h5ExtraAttr: "",
          identityPackage: {
            deviceId: this.did,
            globalId: this.baseParams.get("egid") || "",
            isLoginUser: 0,
            userId: _0x21b88d,
            cachedSize: -1
          },
          locationPackage: {
            latitude: 0,
            longitude: 0,
            vague: 0,
            cachedSize: -1
          },
          needEncrypt: false,
          networkPackage: {
            type: 2,
            cachedSize: -1
          },
          timePackage: {
            timeZone: "GMT+08:00 Asia/Shanghai",
            cachedSize: -1
          },
          cachedSize: -1
        },
        eventId: "",
        ..._0x152171,
        sessionId: this.appSessionId,
        cachedSize: -1
      }]
    };
  }
  async callRpcAndSign(_0x6ed62d) {
    return new Promise((_0x4f4772, _0x4ed6bf) => {
      const _0x2c01bd = Object.fromEntries(this.baseParams);
      Object.assign(_0x2c01bd, this.rpcTokens);
      const _0x55d481 = JSON.stringify({
          event: _0x6ed62d,
          url_params: _0x2c01bd
        }),
        _0x2a489f = getRandomLogRpcConfig(),
        _0x4584cb = http.request({
          hostname: _0x2a489f.host,
          port: _0x2a489f.port,
          path: "/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(_0x55d481)
          }
        }, _0x57cc2e => {
          let _0x11a94d = "";
          _0x57cc2e.on("data", _0x7a4ab2 => _0x11a94d += _0x7a4ab2);
          _0x57cc2e.on("end", () => {
            try {
              const _0x42aa01 = JSON.parse(_0x11a94d);
              if (_0x42aa01.status === 1) {
                _0x4f4772(_0x42aa01);
              } else {
                _0x4ed6bf(new Error("RPC Error"));
              }
            } catch (_0x311a52) {
              _0x4ed6bf(_0x311a52);
            }
          });
        });
      _0x4584cb.on("error", _0x558f6a => _0x4ed6bf(new Error("RPC Connect Fail: " + _0x558f6a.message)));
      _0x4584cb.write(_0x55d481);
      _0x4584cb.end();
    });
  }
  async sendLogPacket(_0x1d845a, _0x4e8fce) {
    for (let _0x1536bc = 0; _0x1536bc < 3; _0x1536bc++) {
      try {
        const _0x259b92 = await this.callRpcAndSign(_0x1d845a.event),
          _0x79f86f = new URLSearchParams(this.baseParams);
        _0x79f86f.append("sig2", _0x259b92.sig2);
        _0x79f86f.append("bodyMd5", _0x259b92.body_md5);
        const _0x5794ad = "https://tube.e.kuaishou.com/rest/tube/log/client/realtime/collect?" + _0x79f86f.toString(),
          _0x46fe75 = Buffer.from(_0x259b92.hex_body, "hex"),
          _0x1f261c = await this.request.post(_0x5794ad, _0x46fe75, {
            headers: {
              ...this.logHeaders,
              "X-REQUESTID": this.generateRequestId(),
              "Content-Length": _0x46fe75.length
            },
            responseType: "json"
          }),
          _0x5b0d17 = _0x1f261c.data;
        if (_0x5b0d17.result === 1 && _0x5b0d17.logPolicy === "NORMAL") {
          this.log("rpc", _0x4e8fce + ": 模拟成功 ✅");
          return true;
        } else {
          this.log("rpc", _0x4e8fce + ": 模拟异常 ⚠️");
        }
      } catch (_0x4f354c) {}
      await new Promise(_0x394c5e => setTimeout(_0x394c5e, 1000));
    }
    this.log("error", "❌ " + _0x4e8fce + " -> 最终失败，跳过");
    return false;
  }
  async logEnterWelfare() {
    const _0x5d8a65 = {
      eventPackage: {
        clickEvent: {
          elementPackage: {
            action2: "TUBE_BOTTOM_TAB",
            params: JSON.stringify({
              tab_name: "BENEFITS",
              index: 2
            }),
            status: 0
          },
          urlPackage: {
            page2: "TUBE_BENEFITS"
          }
        }
      }
    };
    return await this.sendLogPacket(this.getCommonBody("clickEvent", _0x5d8a65, 2, 190), Visual.fmt.actEnter("潜入等离子火花塔核心 (Infiltration)"));
  }
  async logStartVideo() {
    const _0x37d88a = {
      eventPackage: {
        clickEvent: {
          elementPackage: {
            action2: "TUBE_DAILY_BENEFITS_LIST",
            params: JSON.stringify({
              task_id: 6005,
              button_text: "去观看",
              xifan_visitor_id: this.uid
            }),
            status: 0
          },
          urlPackage: {
            page2: "TUBE_BENEFITS",
            pageSeq: 2
          }
        }
      }
    };
    return await this.sendLogPacket(this.getCommonBody("clickEvent", _0x37d88a, 2, 194), Visual.fmt.actLock("奥特眼·锁定S级怪兽 (Target Locked)"));
  }
  async logCloseVideo(_0x59346c) {
    this.currentAdSessionId = this.generateAdSessionId();
    const _0x464935 = {
      eventPackage: {
        clickEvent: {
          elementPackage: {
            action2: "XIFAN_COIN_CLOCK_PENDANT",
            params: JSON.stringify({
              ad_source: "KUAISHOU_INNER_UNION",
              button_text: "已成功领取" + _0x59346c + "金币",
              pos_id: "10914000012",
              session_id: this.currentAdSessionId
            }),
            status: 0
          },
          urlPackage: {
            page2: "ADVERTISING_PLAYER",
            pageSeq: 3
          }
        }
      }
    };
    return await this.sendLogPacket(this.getCommonBody("clickEvent", _0x464935, 2, 196), Visual.fmt.actKill("斯派修姆光线·目标粉碎 (Target Eliminated)"));
  }
  async logShowRetainPopup() {
    const _0x5424e4 = {
      eventPackage: {
        showEvent: {
          elementPackage: {
            action2: "TUBE_RETAIN_POPUP",
            params: JSON.stringify({
              ad_source: "KUAISHOU_ZHUZHAN",
              button_text: "立即领取",
              pop_style_type: "WATCH_ANOTHER_GET_COINS",
              session_id: this.currentAdSessionId
            }),
            status: 0
          },
          type: 3,
          urlPackage: {
            page2: "PLAY_END_PAGE",
            pageSeq: 4
          }
        }
      }
    };
    return await this.sendLogPacket(this.getCommonBody("showEvent", _0x5424e4, 3, 2529), Visual.fmt.actRetain("AT力场·怪兽残影反扑 (Resurgence Detected)"));
  }
  async logClickContinue() {
    const _0x2461d3 = {
      eventPackage: {
        clickEvent: {
          elementPackage: {
            action2: "TUBE_RETAIN_POPUP",
            params: JSON.stringify({
              ad_source: "KUAISHOU_ZHUZHAN",
              button_text: "继续观看",
              session_id: this.currentAdSessionId
            }),
            status: 0
          },
          urlPackage: {
            page2: "PLAY_END_PAGE",
            pageSeq: 4
          }
        }
      }
    };
    return await this.sendLogPacket(this.getCommonBody("clickEvent", _0x2461d3, 2, 200), Visual.fmt.actPursue("奥特披风·解除限制追击 (Pursuit Mode)"));
  }
  async logClickQuit() {
    const _0x1114d2 = {
      eventPackage: {
        clickEvent: {
          elementPackage: {
            action2: "TUBE_RETAIN_POPUP",
            params: JSON.stringify({
              ad_source: "KUAISHOU_ZHUZHAN",
              button_text: "放弃奖励",
              session_id: this.currentAdSessionId
            }),
            status: 0
          },
          urlPackage: {
            page2: "PLAY_END_PAGE",
            pageSeq: 4
          }
        }
      }
    };
    return await this.sendLogPacket(this.getCommonBody("clickEvent", _0x1114d2, 2, 201), Visual.fmt.actRetreat("化作光点·战术撤离 (Return to Light)"));
  }
  async logHeartbeat(_0x2f2253) {
    const _0x39f387 = {
      statPackage: {
        heartBeatEvent: {
          appUseDuration: _0x2f2253 * 120000 + 200,
          seq: _0x2f2253,
          type: 1,
          uploadFrequency: 120000
        }
      }
    };
    return await this.sendLogPacket(this.getCommonBody("heartBeatEvent", _0x39f387, 2, 118), Visual.fmt.actHeart("彩色计时器·能量相位同步 [Seq:" + _0x2f2253 + "]"));
  }
  startHeartbeatThread() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
    }
    this.log("system", Visual.fmt.actHeart("💗 彩色计时器 (Heartbeat) 启动，维持 120s/次 频率"));
    this.heartbeatTimer = setInterval(async () => {
      this.heartbeatSeq++;
      await this.logHeartbeat(this.heartbeatSeq);
    }, 120000);
  }
  async doRequest(_0x21efc9, _0x4f8ef6, _0x2bbe80, _0x50f444) {
    const _0x2833d9 = Date.now();
    let _0x4363ff = JSON.parse(JSON.stringify(this.baseDeviceInfo));
    _0x4363ff.timestamp = _0x2833d9;
    _0x4363ff.ext && _0x4363ff.ext.modeInfo && (_0x4363ff.ext.modeInfo.sensorEventInfoList = this.getSensorData(_0x2833d9));
    Object.assign(_0x4363ff, _0x2bbe80);
    const _0x2cdbe3 = this.encrypt(JSON.stringify(_0x4363ff));
    if (!_0x2cdbe3) {
      return null;
    }
    const _0x5e54d0 = JSON.stringify({
        version: "3.3.55.2",
        appVersion: "3.1.3.3",
        appId: "1091400011",
        apiVersion: 24,
        message: _0x2cdbe3
      }),
      _0x24d718 = {
        cookie: this.cookie,
        kaw: this.kaw,
        kas: _0x4f8ef6,
        ...this.headers
      };
    delete _0x24d718["Content-Length"];
    for (let _0x47a989 = 0; _0x47a989 < 3; _0x47a989++) {
      let _0x1c6d36 = null;
      try {
        const _0x346468 = getRandomSignUrl(),
          _0x26dbfc = await axios.post(_0x346468, {
            url: _0x21efc9,
            headers: _0x24d718,
            body: _0x5e54d0
          }, {
            timeout: 5000
          });
        if (_0x26dbfc.status === 200 && _0x26dbfc.data) {
          _0x1c6d36 = _0x26dbfc.data;
        }
      } catch (_0x19f2b2) {}
      if (_0x1c6d36) {
        try {
          const _0x1af38e = await this.request.post(_0x21efc9, _0x5e54d0, {
            headers: _0x1c6d36
          });
          if (!_0x50f444) {
            return true;
          }
          if (_0x1af38e.data && _0x1af38e.data.data) {
            const _0x166d2f = this.decrypt(_0x1af38e.data.data);
            return _0x166d2f ? JSON.parse(_0x166d2f) : null;
          }
          return null;
        } catch (_0x4e85e3) {}
      }
      await new Promise(_0x575ac4 => setTimeout(_0x575ac4, 1000));
    }
    this.log("error", "💥 业务请求最终失败 [" + _0x21efc9 + "]");
    return null;
  }
  async testProxy() {
    if (!this.proxyUrl) {
      this.log("system", Visual.fmt.local("正在连接地球防卫军本部网络 (直连模式)..."));
      this.log("success", Visual.fmt.local("本部通讯线路正常"));
      return true;
    }
    this.log("system", Visual.fmt.proxy("正在开启M78异次元虫洞 (代理模式)..."));
    let _0x223410 = 0;
    const _0x20511d = 3;
    while (_0x223410 < _0x20511d) {
      try {
        await this.request.get("https://www.baidu.com", {
          timeout: 5000
        });
        this.log("success", Visual.fmt.proxy("异次元虫洞稳定，坐标锁定"));
        return true;
      } catch (_0x3aaa6c) {
        _0x223410++;
        this.log("warn", Visual.fmt.proxy("虫洞波动 " + _0x223410 + "/" + _0x20511d + " : " + _0x3aaa6c.message));
        await new Promise(_0x474deb => setTimeout(_0x474deb, 2000));
      }
    }
    this.log("error", Visual.fmt.proxy("虫洞坍塌，无法抵达目标象限！"));
    return false;
  }
  async initApp() {
    if (!(await this.testProxy())) {
      return false;
    }
    await this.getPublicIP();
    this.log("start", "📡 [光之国通讯] 正在建立奥特融合...");
    const _0x4069ba = {
      impInfo: [{}]
    };
    if (!(await this.doRequest("https://tube.e.kuaishou.com/rest/e/tube/app/config", this.kasConfig.config, _0x4069ba, false))) {
      return false;
    }
    await new Promise(_0x286b5d => setTimeout(_0x286b5d, 1000));
    const _0x1ae866 = {
        msgParam: {},
        merchantParam: {
          supportMerchant: true
        }
      },
      _0xe9b45c = await this.doRequest("https://tube.e.kuaishou.com/rest/e/tube/app/user/home", this.kasConfig.user, _0x1ae866, true);
    if (_0xe9b45c && _0xe9b45c.tubeUserInfo) {
      this.nickname = _0xe9b45c.tubeUserInfo.nickName;
      this.log("success", "🟢 变身成功 | 累计光能: " + Visual.fmt.energy(this.sessionCoins));
      this.heartbeatSeq++;
      await this.logHeartbeat(this.heartbeatSeq);
      this.log("rest", "⏳ 光之适能者·冥想时刻 (Gathering Light) ... 等待 120秒");
      await new Promise(_0x49ab03 => setTimeout(_0x49ab03, 120000));
      this.heartbeatSeq++;
      await this.logHeartbeat(this.heartbeatSeq);
      this.startHeartbeatThread();
      return true;
    } else {
      this.log("error", "❌ 变身失败，身份验证未通过");
      return false;
    }
  }
  async runLookTask() {
    if (!TASK_CONFIG[BASE_TASK_TYPE]) {
      return;
    }
    const _0x122187 = TASK_CONFIG[BASE_TASK_TYPE];
    let _0x397ff3 = await this.doRequest("https://tube.e.kuaishou.com/rest/e/tube/inspire/home", this.kasConfig.inspire, {
      inspireHomeParam: {
        widgetStatus: 1,
        templateVersionCode: 603,
        hasNovelTab: true,
        enterFrom: "home_page",
        coinBox: false,
        pushPermissionStatus: 2
      }
    }, true);
    if (!_0x397ff3) {
      return;
    }
    await this.logEnterWelfare();
    if (_0x397ff3.accountInfoV2) {
      if (_0x397ff3.accountInfoV2.coinAccount) {
        this.initialCoins = parseInt(_0x397ff3.accountInfoV2.coinAccount.amount) || 0;
      }
    } else {
      _0x397ff3.coinAccount && (this.initialCoins = parseInt(_0x397ff3.coinAccount.amount) || 0);
    }
    let _0x5d7092 = "0";
    if (_0x397ff3.accountInfoV2) {
      if (_0x397ff3.accountInfoV2.cashAccount) {
        _0x5d7092 = _0x397ff3.accountInfoV2.cashAccount.amountDisplay;
      }
    } else {
      if (_0x397ff3.cashAccount) {
        _0x5d7092 = _0x397ff3.cashAccount.amountDisplay;
      }
    }
    this.log("info", "💰 [光能侦测] 光能储备: " + Visual.fmt.energy(this.initialCoins + this.sessionCoins) + " | 地球货币: " + Visual.fmt.emerald(_0x5d7092));
    let _0x3f3725 = "";
    if (_0x397ff3.dailyTaskInfo && _0x397ff3.dailyTaskInfo.tasks) {
      const _0x36ea84 = _0x397ff3.dailyTaskInfo.tasks.find(_0xe21aa8 => _0xe21aa8.title && _0xe21aa8.title.includes(_0x122187.titleKeyword));
      if (_0x36ea84 && _0x36ea84.buttonInfo) {
        _0x3f3725 = _0x36ea84.buttonInfo.linkUrl;
      }
    }
    if (!_0x3f3725) {
      return this.log("warn", "⚠️ 暂无怪兽出没 (无任务)");
    }
    let _0x34d55f = 0,
      _0x3d69c4 = _0x3f3725,
      _0x4e6294 = 0;
    if (FOLLOW_MODE === "infinite") {
      _0x4e6294 = Infinity;
    } else {
      if (FOLLOW_MODE === "fixed") {
        _0x4e6294 = FOLLOW_VAL_1;
      } else {
        if (FOLLOW_MODE === "random") {
          _0x4e6294 = random(FOLLOW_VAL_1, FOLLOW_VAL_2);
        }
      }
    }
    this.log("info", "🎯 本轮战术: 计划追击 " + Visual.fmt.energy(_0x4e6294 === Infinity ? "无限" : _0x4e6294) + " 只怪兽");
    while (true) {
      let _0x3eb788 = await this.doRequest("https://tube.e.kuaishou.com/rest/e/tube/app/ad/inspire", this.kasConfig.ad, {
        adParam: {
          adNum: 1,
          inspireAdSource: _0x122187.inspireAdSource
        }
      }, true);
      if (!_0x3eb788 || !_0x3eb788.adBaseInfo) {
        break;
      }
      const {
        llsid: _0x5afb26,
        creativeId: _0x600a3c,
        ecpm: _0x1663ae,
        adTitle: _0xbd7698,
        adDescription: _0x237553
      } = _0x3eb788.adBaseInfo;
      let _0x2c937a = "",
        _0x3150d2 = "";
      if (_0x34d55f > 0) {
        _0x2c937a = Visual.fmt.type("银河追击·" + _0x34d55f);
        _0x3150d2 = Visual.fmt.act("追击怪兽");
      } else {
        _0x2c937a = Visual.fmt.type("奥特眼·侦察");
        _0x3150d2 = Visual.fmt.act("遭遇怪兽");
      }
      this.log("doing", _0x3150d2 + " [" + Visual.fmt.monster(_0xbd7698) + "] - " + (_0x237553 || "未知生物") + " " + _0x2c937a);
      _0x34d55f > 0 ? await this.logClickContinue() : await this.logStartVideo();
      const _0x40450f = uuid();
      let _0x12c518 = await this.doRequest("https://tube.e.kuaishou.com/rest/e/tube/inspire/taskDetail", this.kasConfig.task, {
          taskDetailParam: {
            linkUrl: _0x3d69c4,
            solt: _0x1663ae,
            llsid: _0x5afb26,
            taskId: _0x122187.taskId,
            posId: _0x122187.posId,
            traceRequestId: _0x40450f
          }
        }, true),
        _0x310860 = _0x12c518?.["rewardToken"] || _0x12c518?.["taskDetail"]?.["rewardToken"];
      if (!_0x310860) {
        break;
      }
      const _0x151e4c = random(35000, 45000);
      this.log("doing", "⏳ 正在积蓄斯派修姆光线 (" + Math.floor(_0x151e4c / 1000) + "s)...");
      await new Promise(_0x1ebd42 => setTimeout(_0x1ebd42, _0x151e4c));
      const _0x3d20bc = "https://tube.e.kuaishou.com/rest/e/tube/inspire/task/report",
        _0x21cf2b = {
          inspireTaskReportParam: {
            posId: _0x122187.posId,
            traceRequestId: _0x40450f,
            ecpm: _0x1663ae,
            neoInfos: [{
              extParam: {
                taskType: 1,
                llsId: String(_0x5afb26),
                creativeId: _0x600a3c,
                taskToken: getTaskToken(_0x3d69c4)
              },
              idempotentId: _0x5afb26 + "_" + _0x600a3c
            }],
            taskSessionId: Date.now(),
            thirdUnionType: 2,
            thirdUnionReqId: "",
            continuousTimes: 0,
            rewardToken: _0x310860,
            adActionType: 0,
            taskId: _0x122187.taskId,
            budgetSource: "default"
          }
        },
        _0x418681 = await this.doRequest(_0x3d20bc, this.kasConfig.report, _0x21cf2b, true);
      if (_0x418681 && _0x418681.amount) {
        const _0x228c7e = parseInt(_0x418681.amount);
        this.sessionCoins += _0x228c7e;
        let _0x49b0d1 = this.initialCoins + this.sessionCoins;
        const {
          n: _0x3121f2,
          v: _0x43ce8e
        } = Visual.getArtifact(_0x228c7e);
        this.log("reward", Visual.fmt.act(_0x43ce8e) + " " + Visual.fmt.item(_0x3121f2) + " | 战绩: +" + Visual.fmt.energy(_0x228c7e) + " | 本轮搜集: " + Visual.fmt.energy(this.sessionCoins) + " | 光能总量: " + Visual.fmt.energy(_0x49b0d1));
        await this.logCloseVideo(_0x228c7e);
        await new Promise(_0x3f5b6a => setTimeout(_0x3f5b6a, 500));
        await this.logShowRetainPopup();
        await new Promise(_0x3ac004 => setTimeout(_0x3ac004, 1000));
        if (_0x228c7e <= RISK_COIN_THRESHOLD) {
          this.lowRewardCount++;
          this.log("warn", "⚠️ 黑暗侵蚀警报 [" + _0x228c7e + " <= " + RISK_COIN_THRESHOLD + "] (" + this.lowRewardCount + "/2)");
          if (this.lowRewardCount >= 2) {
            this.log("error", "⛔️ 彩色计时器熄灭: 连续2次低能量，强制撤退！");
            this.valid = false;
            return;
          }
        } else {
          this.lowRewardCount = 0;
        }
        if (MAX_SESSION_COINS > 0 && this.sessionCoins >= MAX_SESSION_COINS) {
          this.log("rest", "🛑 今日净化任务圆满完成，解除变身，下班！");
          this.valid = false;
          return;
        }
        let _0x4eaf42 = null;
        if (_0x418681?.["popUp"]?.["data"]?.["buttonInfo"]?.["linkUrl"]) {
          _0x4eaf42 = _0x418681.popUp.data.buttonInfo.linkUrl;
        } else {
          if (_0x418681?.["data"]?.["popUp"]?.["data"]?.["buttonInfo"]?.["linkUrl"]) {
            _0x4eaf42 = _0x418681.data.popUp.data.buttonInfo.linkUrl;
          }
        }
        if (_0x4eaf42 && _0x34d55f < _0x4e6294) {
          _0x3d69c4 = _0x4eaf42;
          _0x34d55f++;
          const _0x577c34 = random(MIN_INTERVAL * 1000, MAX_INTERVAL * 1000);
          this.log("rest", "🔗 捕获追击坐标，战术调整 " + Math.floor(_0x577c34 / 1000) + "s 后发动追击...");
          await new Promise(_0x4099eb => setTimeout(_0x4099eb, _0x577c34));
          continue;
        } else {
          await this.logClickQuit();
          this.log("system", "🔚 本轮战场清扫完毕");
          break;
        }
      } else {
        this.log("error", "❌ 结算异常");
        break;
      }
    }
  }
  async startRound() {
    if (!this.valid) {
      return;
    }
    this.resetAppSession();
    if (!(await this.initApp())) {
      return;
    }
    if (!TASK_TYPE_RAW) {
      return;
    }
    try {
      await this.runLookTask();
    } catch (_0x3ace15) {
      this.log("error", "💥 错误: " + _0x3ace15.message);
    }
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
    }
  }
}
function checkEnvironment(_0x8505ec) {
  Visual.log(null, "system", Visual.fmt.emerald("[M78星云·行星防御体] 正在扫描暗黑物质残留..."));
  const _0x582a07 = _0x8505ec.filter(_0xb057e2 => !_0xb057e2.proxyUrl);
  if (_0x582a07.length > 1) {
    console.error("❌❌❌ [严重] 地球(本地)IP只允许 1 位奥特曼驻守！(当前: " + _0x582a07.length + ")");
    return false;
  }
  const _0x4e3025 = {};
  let _0x43c739 = false;
  _0x8505ec.forEach(_0x302222 => {
    if (_0x302222.proxyUrl) {
      if (_0x4e3025[_0x302222.proxyUrl]) {
        _0x4e3025[_0x302222.proxyUrl].push(_0x302222.index);
        _0x43c739 = true;
      } else {
        _0x4e3025[_0x302222.proxyUrl] = [_0x302222.index];
      }
    }
  });
  if (_0x43c739) {
    console.log("⚠️⚠️⚠️ [维度冲突] 检测到以下奥特曼挤在同一个虫洞(代理)里，存在坠毁风险！");
    for (const [_0x2906c0, _0x3ec2aa] of Object.entries(_0x4e3025)) {
      if (_0x3ec2aa.length > 1) {
        console.log("   -> 虫洞: " + _0x2906c0 + " (战士: " + _0x3ec2aa.join(", ") + ")");
      }
    }
    console.log("\nWait... 强制冷静 2 分钟...");
    return "WAIT";
  }
  Visual.log(null, "success", "[光之国集结] " + Visual.fmt.energy(_0x8505ec.length) + " 位奥特战士已响应奥特签名");
  return true;
}
async function main() {
  Visual.banner();
  Visual.log(null, "info", "🔄 变身轮次: " + Visual.fmt.energy(TOTAL_ROUNDS) + " 轮");
  Visual.log(null, "info", "💤 轮次休息: " + Visual.fmt.energy(ROUND_INTERVAL) + " 分钟");
  if (MAX_SESSION_COINS > 0) {
    Visual.log(null, "info", "💰 能量上限: 收集 " + Visual.fmt.energy(MAX_SESSION_COINS) + " 光能后自动撤退");
  }
  Visual.log(null, "info", "⚔️ 战斗节奏: " + Visual.fmt.act(MIN_INTERVAL + "-" + MAX_INTERVAL + "s") + " 间隔");
  let _0x2a6974 = "未开启";
  if (BASE_TASK_TYPE === "look") {
    if (FOLLOW_MODE === "infinite") {
      _0x2a6974 = "无限追击";
    } else {
      if (FOLLOW_MODE === "fixed") {
        _0x2a6974 = FOLLOW_VAL_1 + "次";
      } else {
        if (FOLLOW_MODE === "random") {
          _0x2a6974 = "幻影追击(" + FOLLOW_VAL_1 + "-" + FOLLOW_VAL_2 + "次)";
        }
      }
    }
  }
  Visual.log(null, "info", Visual.fmt.target("奥特眼·侦察 (追加: " + _0x2a6974 + ")"));
  Visual.log(null, "info", Visual.fmt.crimson("黑暗侵蚀阈值: <" + RISK_COIN_THRESHOLD + "> 光能"));
  console.log("\n");
  const _0x5b5b1a = [];
  for (let _0x3e1ec0 = 1; _0x3e1ec0 <= 999; _0x3e1ec0++) {
    const _0x5abaa2 = process.env[`XF_Message_${_0x3e1ec0}`];
    if (_0x5abaa2) {
      _0x5b5b1a.push(new XFAccount(_0x3e1ec0, _0x5abaa2));
    }
  }
  if (_0x5b5b1a.length === 0) {
    return console.log("❌ 未检测到 XF_Message_N");
  }
  const _0x266cba = checkEnvironment(_0x5b5b1a);
  if (_0x266cba === false) {
    return;
  }
  if (_0x266cba === "WAIT") {
    await new Promise(_0x289ae8 => setTimeout(_0x289ae8, 120000));
  }
  let _0xaa1ba0 = 0,
    _0x1b12d2 = 0;
  async function _0x18cb1a(_0x10c0da) {
    for (let _0x43fb46 = 1; _0x43fb46 <= TOTAL_ROUNDS; _0x43fb46++) {
      if (!_0x10c0da.valid) {
        break;
      }
      Visual.log(_0x10c0da, "start", "🎬 变身阶段 " + _0x43fb46 + "/" + TOTAL_ROUNDS + " 启动... [等离子火花塔 100%]");
      await _0x10c0da.startRound();
      _0x43fb46 < TOTAL_ROUNDS && _0x10c0da.valid && (Visual.log(_0x10c0da, "rest", "🛌 解除变身，在人类形态休息 " + ROUND_INTERVAL + " 分钟..."), await new Promise(_0x4fe699 => setTimeout(_0x4fe699, ROUND_INTERVAL * 60 * 1000)));
    }
  }
  async function _0x4b42bd() {
    if (_0xaa1ba0 >= _0x5b5b1a.length) {
      return;
    }
    const _0xb29531 = _0x5b5b1a[_0xaa1ba0++];
    _0x1b12d2++;
    try {
      await _0x18cb1a(_0xb29531);
    } finally {
      _0x1b12d2--;
      _0x4b42bd();
    }
  }
  const _0x235ca4 = Math.min(MAX_CONCURRENCY, _0x5b5b1a.length);
  Visual.log(null, "start", "🚀 启动超时空并发引擎: " + Visual.fmt.energy(_0x235ca4) + " 线程全开！\n");
  for (let _0x416623 = 0; _0x416623 < _0x235ca4; _0x416623++) {
    _0x4b42bd();
  }
  await new Promise(() => {});
}
main();