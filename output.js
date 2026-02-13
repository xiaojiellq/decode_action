//Fri Feb 13 2026 12:20:36 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const fs = require("fs"),
  path = require("path"),
  axios = require("axios"),
  crypto = require("crypto"),
  GLOBAL_CONFIG = {
    UPDATE_HOST: "https://xf-update-service.haoyangmao666.top",
    CORE_FILENAME: "xf_core_driver.js",
    VERSION_FILENAME: "xf_ver_lock.json",
    APP_ID: 1861,
    AUTH_LOGIN_URL: "http://wlyz.cn/api/single/login",
    AUTH_INFO_URL: "http://wlyz.cn/api/single/info",
    AUTH_TIMEOUT: 10000,
    CONTACT: {
      WX: "LambLambVibe",
      QQ_GROUP: "1076731230"
    },
    DEVICE_TOKEN_FILE: ".xf_device.json"
  },
  Visual = {
    c: {
      reset: "[0m",
      amber: "[38;5;214m",
      deepBlue: "[38;5;33m",
      crimson: "[38;5;196m",
      purple: "[38;5;129m",
      emerald: "[38;5;46m",
      grey: "[38;5;243m"
    },
    banner: () => {
      console.log("\n" + Visual.c.crimson);
      console.log(" _   _  _   _____  ____      _    __  __    _    _   _ ");
      console.log("| | | || | |_   _||  _ \\    / \\  |  \\/  |  / \\  | \\ | |");
      console.log("| | | || |   | |  | |_) |  / _ \\ | |\\/| | / _ \\ |  \\| |");
      console.log("| |_| || |___| |  |  _ <  / ___ \\| |  | |/ ___ \\| |\\  |");
      console.log(" \\___/ |_____|_|  |_| \\_\\/_/   \\_\\_|  |_/_/   \\_\\_| \\_|");
      console.log("                                                       ");
      console.log("   ⚡ ウルトラマン · 银河维和行动 (Galaxy Patrol) ⚡         ");
      console.log("\n" + Visual.c.deepBlue + "   >>> X番free短剧 业务版 · 光之国最高指令终端 <<<       " + Visual.c.reset + "\n");
    },
    log: (_0x4196fa, _0x4c0df4) => {
      console.log("" + Visual.c.amber + _0x4196fa + " " + Visual.c.reset + _0x4c0df4);
    },
    kv: (_0x50fa0a, _0x38fe26, _0x32f042 = Visual.c.deepBlue) => {
      console.log("   " + Visual.c.grey + "├─ " + _0x50fa0a + ": " + _0x32f042 + _0x38fe26 + Visual.c.reset);
    },
    line: () => {
      console.log(Visual.c.purple + "─────────────────────────────────────────────────────" + Visual.c.reset);
    }
  };
class StorageManager {
  constructor() {
    const _0x9b6878 = process.env.QL_DIR ? path.join(process.env.QL_DIR, "data") : __dirname;
    this.hiddenDir = path.join(_0x9b6878, ".sys_cache");
    if (!fs.existsSync(this.hiddenDir)) {
      try {
        fs.mkdirSync(this.hiddenDir, {
          recursive: true
        });
      } catch (_0x1c2e00) {
        this.hiddenDir = require("os").tmpdir();
      }
    }
    this.corePath = path.join(this.hiddenDir, GLOBAL_CONFIG.CORE_FILENAME);
    this.verPath = path.join(this.hiddenDir, GLOBAL_CONFIG.VERSION_FILENAME);
    const _0x2a3a53 = path.join(_0x9b6878, "config");
    this.devicePath = fs.existsSync(_0x2a3a53) ? path.join(_0x2a3a53, GLOBAL_CONFIG.DEVICE_TOKEN_FILE) : path.join(__dirname, GLOBAL_CONFIG.DEVICE_TOKEN_FILE);
  }
}
const storage = new StorageManager();
class DeviceManager {
  encode(_0x5ce26d) {
    return Buffer.from(_0x5ce26d).toString("base64");
  }
  decode(_0x5b93c4) {
    return Buffer.from(_0x5b93c4, "base64").toString("utf8");
  }
  getMachineId() {
    try {
      if (fs.existsSync(storage.devicePath)) {
        const _0x95f623 = JSON.parse(fs.readFileSync(storage.devicePath, "utf8")),
          _0xfa5fa6 = this.decode(_0x95f623.token);
        if (_0xfa5fa6 && _0xfa5fa6.length > 5) {
          return _0xfa5fa6;
        }
      }
      const _0x509e51 = crypto.randomUUID().replace(/-/g, "") + Date.now().toString(36),
        _0x3928d4 = {
          token: this.encode(_0x509e51),
          create_at: Date.now(),
          tips: "M78 Spark Lens File"
        };
      fs.writeFileSync(storage.devicePath, JSON.stringify(_0x3928d4), "utf8");
      return _0x509e51;
    } catch (_0x1b8706) {
      return "temp_" + Date.now();
    }
  }
}
class AuthSystem {
  constructor() {
    this.deviceMgr = new DeviceManager();
    this.mac = this.deviceMgr.getMachineId();
    this.card = process.env.XF_CARD || process.env.xf_card;
    this.token = "";
    this.runtimeLimit = "0";
  }
  getCardTypeName(_0x302988) {
    const _0x478901 = {
      0: "M78小时体验勋章 ⏳",
      1: "光之战士天卡 📅",
      2: "光之战士周卡 🗓️",
      3: "奥特兄弟半月卡 🌖",
      4: "奥特兄弟月卡 🌙",
      5: "佐菲队长季卡 🍂",
      6: "奥特之父半年卡 🌗",
      7: "奥特之王年卡 🌞",
      8: "诺亚之神永恒卡 👑"
    };
    return _0x478901[_0x302988] || "未知光之碎片 ❓";
  }
  async verify() {
    Visual.log("🔒", "正在向【银河联邦】出示奥特签名...");
    if (!this.card) {
      console.log("   " + Visual.c.crimson + "❌ 未检测到奥特签名 (XF_CARD)，请在环境变量中配置您的光之密钥！" + Visual.c.reset);
      return false;
    }
    try {
      const _0x45fa7a = await axios.get(GLOBAL_CONFIG.AUTH_LOGIN_URL, {
        params: {
          appId: GLOBAL_CONFIG.APP_ID,
          card: this.card,
          mac: this.mac
        },
        timeout: GLOBAL_CONFIG.AUTH_TIMEOUT
      });
      if (_0x45fa7a.data.code !== 1 && _0x45fa7a.data.code !== 200) {
        console.log("   " + Visual.c.crimson + "⛔ 签名无效: " + _0x45fa7a.data.msg + " (疑似贝利亚伪造)" + Visual.c.reset);
        return false;
      }
      this.token = _0x45fa7a.data.token || _0x45fa7a.data.data?.["token"];
      const _0x465c41 = await axios.get(GLOBAL_CONFIG.AUTH_INFO_URL, {
          params: {
            appId: GLOBAL_CONFIG.APP_ID,
            card: this.card,
            mac: this.mac,
            token: this.token
          },
          timeout: GLOBAL_CONFIG.AUTH_TIMEOUT
        }),
        _0x51ba37 = _0x465c41.data;
      if (_0x51ba37.code === 1 || _0x51ba37.code === 200) {
        const _0x4455e9 = _0x51ba37.data || {};
        Visual.log("✨", Visual.c.emerald + "身份确认！欢迎回到光之国，指挥官！" + Visual.c.reset);
        Visual.kv("勋章类型", this.getCardTypeName(_0x4455e9.type), Visual.c.purple);
        Visual.kv("授予时间", _0x4455e9.createTime || "未知");
        Visual.kv("光能耗尽", _0x4455e9.endTime || "光芒永恒", Visual.c.amber);
        this.parseRemark(_0x4455e9.mark || _0x4455e9.remark);
        Visual.line();
        Visual.log("☎️", "宇宙警备队通讯频道：");
        Visual.kv("战术故障or机甲优化请联系希卡利 (Wechat)", GLOBAL_CONFIG.CONTACT.WX, Visual.c.emerald);
        Visual.kv("奥特胶囊购买续费，吹牛逼请加星云群(QQ)", GLOBAL_CONFIG.CONTACT.QQ_GROUP, Visual.c.deepBlue);
        Visual.line();
        return true;
      }
      return false;
    } catch (_0x11ce8e) {
      console.log("   " + Visual.c.crimson + "⚠️ 异次元裂缝干扰，验证超时: " + _0x11ce8e.message + Visual.c.reset);
      return false;
    }
  }
  parseRemark(_0x2547ec) {
    const _0x8156e7 = String(_0x2547ec || "").trim();
    if (_0x8156e7 === "" || _0x8156e7 === "null" || _0x8156e7 === "undefined") {
      process.env.XF_CARD_LIMIT = "0";
      this.runtimeLimit = "0";
      Visual.kv("出击协议", "⛔ 签名未包含权限代码，所有战士待命 (Limit: 0)", Visual.c.crimson);
      return;
    }
    const _0x1fcd07 = _0x8156e7.split(";");
    if (_0x1fcd07.length > 0 && _0x1fcd07[0].trim() !== "") {
      const _0x45b6bb = _0x1fcd07[0].trim();
      process.env.XF_CARD_LIMIT = _0x45b6bb;
      this.runtimeLimit = _0x45b6bb;
      if (_0x45b6bb === "0") {
        Visual.kv("出击协议", "⛔ 签名显示今日无作战计划 (Limit: 0)", Visual.c.crimson);
      } else {
        Visual.kv("出击协议", "最高防御法允许 " + Visual.c.amber + _0x45b6bb + Visual.c.deepBlue + " 位奥特曼同时变身");
      }
    } else {
      process.env.XF_CARD_LIMIT = "0";
      this.runtimeLimit = "0";
      Visual.kv("出击协议", "⛔ 默认禁足状态", Visual.c.crimson);
    }
  }
}
class UpdateSystem {
  getLocalVersion() {
    try {
      if (fs.existsSync(storage.verPath)) {
        return JSON.parse(fs.readFileSync(storage.verPath, "utf8")).version;
      }
    } catch (_0x522047) {}
    return "0.0";
  }
  async checkAndDownload() {
    Visual.log("🌌", "正在连接 M78 星云技术局...");
    const _0x54363d = this.getLocalVersion();
    try {
      const {
        data: _0x5b5002
      } = await axios.get(GLOBAL_CONFIG.UPDATE_HOST + "/check?t=" + Date.now(), {
        timeout: 5000
      });
      if (_0x5b5002.version !== _0x54363d || !fs.existsSync(storage.corePath)) {
        Visual.log("🧬", "检测到希卡利发布新科技 v" + _0x5b5002.version + " (当前 v" + _0x54363d + ")，正在同步...");
        const {
          data: _0x224396
        } = await axios.get(GLOBAL_CONFIG.UPDATE_HOST + "/download?t=" + Date.now(), {
          timeout: 15000,
          responseType: "text"
        });
        if (_0x224396 && _0x224396.length > 500 && _0x224396.includes("XF")) {
          fs.writeFileSync(storage.corePath, _0x224396, "utf8");
          fs.writeFileSync(storage.verPath, JSON.stringify({
            version: _0x5b5002.version
          }), "utf8");
          try {
            delete require.cache[require.resolve(storage.corePath)];
          } catch (_0x517173) {}
          Visual.log("✅", Visual.c.emerald + "奥特签名同步完成！已装备最新光之胶囊 v" + _0x5b5002.version + Visual.c.reset);
        } else {
          Visual.log("❌", Visual.c.crimson + "同步失败：胶囊能量反应异常(未包含XF光子)" + Visual.c.reset);
        }
      } else {
        Visual.log("✅", "当前装备已是最新光之科技，无需同步。");
      }
    } catch (_0x4d1f56) {}
  }
}
(async () => {
  Visual.banner();
  const _0x3226e1 = new AuthSystem(),
    _0x1ada05 = await _0x3226e1.verify();
  if (!_0x1ada05) {
    console.log("\n" + Visual.c.crimson + "⛔ 身份不明，拒绝访问光之国。请检查您的奥特签名。" + Visual.c.reset);
    process.exit(1);
  }
  await new UpdateSystem().checkAndDownload();
  if (fs.existsSync(storage.corePath)) {
    try {
      console.log("\n" + Visual.c.amber + "🚀 等离子火花塔全功率输出，准备变身..." + Visual.c.reset);
      _0x3226e1.runtimeLimit && (process.argv[2] = _0x3226e1.runtimeLimit, Visual.kv("战术注入", "奥特曼出击数量已锁定为: " + _0x3226e1.runtimeLimit + " 人", Visual.c.purple));
      require(storage.corePath);
    } catch (_0x5e4e5d) {
      console.error(Visual.c.crimson + "❌ 变身失败(引擎故障): " + _0x5e4e5d.message + Visual.c.reset);
      try {
        fs.unlinkSync(storage.corePath);
      } catch {}
    }
  } else {
    console.error(Visual.c.crimson + "❌ 致命错误：找不到光之核心且无法建立星际连接，请呼叫奥特之父。" + Visual.c.reset);
  }
})();