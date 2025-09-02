//Tue Sep 02 2025 15:42:49 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const W = new aH("ks200"),
  X = "ks200",
  Y = "phid";
let a3 = (W.isNode() ? process.env.km : W.getdata("km")) || "",
  a4 = (W.isNode() ? process.env.jinbi : W.getdata("jinbi")) || "";
const a5 = 0;
let a6 = 0,
  ab = (W.isNode() ? process.env[X] : W.getdata(X)) || "",
  ac = null,
  ad = null;
(function aI() {
  try {
    const h = require("path"),
      i = require("fs"),
      {
        execSync: j
      } = require("child_process"),
      {
        createRequire: k
      } = require("module"),
      l = h.join(__dirname || ".", ".ks_modules");
    try {
      if (!i.existsSync(l)) i.mkdirSync(l, {
        "recursive": true
      });
    } catch {}
    const m = h.join(l, "package.json");
    try {
      if (!i.existsSync(m)) i.writeFileSync(m, "{\"name\":\"ks-local-modules\",\"private\":true}");
    } catch {}
    ad = k(m);
    function n(p, r) {
      try {
        const t = r ? p + "@" + r : p,
          u = "npm install --legacy-peer-deps --no-audit --no-fund --silent --prefix \"" + l + "\" " + t + " --registry=https://registry.npmmirror.com";
        return j(u, {
          "stdio": "ignore"
        }), true;
      } catch {
        return false;
      }
    }
    global.__ks_safeRequire = function p(r, t) {
      try {
        return require(r);
      } catch (v) {
        try {
          const w = ad(r);
          return w && (w.default || w);
        } catch (x) {
          if (!n(r, t)) return null;
          try {
            const y = ad(r);
            return y && (y.default || y);
          } catch {
            return null;
          }
        }
      }
    };
  } catch {
    global.__ks_safeRequire = function () {
      return null;
    };
  }
})();
function ae(a, b) {
  try {
    return global.__ks_safeRequire ? global.__ks_safeRequire(a, b) : require(a);
  } catch {
    return null;
  }
}
let af = [],
  ag = 0,
  ah = 0,
  ai = Date.now(),
  aj = ai - 25000;
const ak = new Date();
let am = [],
  an = 20000,
  ao = 30000;
const ap = (W.isNode() ? process.env.xz : W.getdata("xz")) || "";
ap === "0" && (an = 0, ao = 5000);
const aq = 10;
async function ar() {
  try {
    let b = {
        "method": "get",
        "url": "http://125.77.163.37:18999/jk.php",
        "headers": {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
      },
      e = await aD(b, "获取接口列表");
    if (e && Array.isArray(e)) {
      return am = e, true;
    } else {
      return false;
    }
  } catch (h) {
    return false;
  }
}
function as(a, b = "") {
  const f = am.find(i => i.name === a);
  if (!f || !f.interfaces || f.interfaces.length === 0) {
    return null;
  }
  const g = Math.floor(Math.random() * f.interfaces.length),
    h = f.interfaces[g];
  return h;
}
function at() {
  return Math.floor(Math.random() * (ao - an + 1)) + an;
}
function au() {
  return Math.floor(Math.random() * (10000 - 2000 + 1)) + 2000;
}
async function av() {
  try {
    if (!ab) {
      console.log("未找到ks200账号环境变量");
      return;
    }
    if (af.length === 0) return;
    for (const f of af) {
      const g = {
          "Host": "nebula.kuaishou.cn",
          "Connection": "keep-alive",
          "User-Agent": f.userAgent,
          "Cookie": "kuaishou.api_st=" + f.api_st + ";client_key=2ac2a76d;",
          "content-type": "application/json"
        },
        h = {
          "method": "GET",
          "url": "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo",
          "headers": g
        };
      try {
        const i = await aD(h, "查询余额", f.sock5);
        if (i && i.result == 1) {
          const k = i.data.totalCoin,
            l = i.data.allCash;
          console.log("账号[" + f.index + "] " + f.remark + "您的金币: " + k + " 余额: " + l);
          if (a4) {
            const m = parseInt(a4);
            k > m ? console.log("账号[" + f.index + "] 金币(" + k + ")大于(" + m + ")，今天任务已完成") : console.log("账号[" + f.index + "] 金币(" + k + ")小于等于(" + m + ")，继续执行任务");
          } else console.log("账号[" + f.index + "] 防黑号小技巧:小主可创建jinbi变量,设置每天的获取金币数量！");
        } else console.log("账号[" + f.index + "] 查询失败 ❌，原因: " + (i && (i.error_msg || i.message) || "未知"));
      } catch (o) {}
    }
  } catch (p) {}
}
async function aw() {
  console.log("\n================== 获取ad ==================\n");
  await av();
  console.log("\n📊 本次执行共 " + af.length + " 个账号\n");
  let b = 0;
  while (b < aq) {
    b++;
    for (let f of af) {
      const h = at();
      console.log("账号[" + f.index + "]  随机延迟 " + Math.round(h / 1000) + "秒");
      f.initialDelay = h;
    }
    let e = [];
    for (let i of af) {
      e.push((async () => {
        await new Promise(k => setTimeout(k, i.initialDelay));
        !i.isTaskStopped(672) ? await i.cid(672) : console.log("账号[" + i.index + "]  ad任务已达上限，已停止执行");
        if (!i.isTaskStopped(606)) await i.cid(606);else {
          console.log("账号[" + i.index + "]  宝箱任务已达上限，已停止执行");
        }
        if (!i.isTaskStopped(9362)) {
          await i.cid(9362);
        } else console.log("账号[" + i.index + "]  饭补任务已达上限，已停止执行");
        if (!i.isTaskStopped(7038)) {
          await i.cid(7038);
        } else {
          console.log("账号[" + i.index + "]  搜索任务已达上限，已停止执行");
        }
      })());
    }
    await Promise.all(e);
    if (b < aq) {}
  }
}
class ax {
  constructor(a) {
    this.index = ++ag;
    this.remark = a.remark || "小主";
    this.salt = a.salt;
    this.userAgent = a.userAgent;
    this.sock5 = a.sock5;
    this.userId = a.userId;
    this.egid = a.egid;
    this.did = a.did;
    this.api_st = a.api_st;
    if (!this.salt || !this.userAgent || !this.userId || !this.egid || !this.did || !this.api_st) {
      console.log("账号[" + this.index + "] 参数不完整:", {
        "salt": this.salt,
        "userAgent": this.userAgent,
        "userId": this.userId,
        "egid": this.egid,
        "did": this.did,
        "api_st": this.api_st
      });
      this.valid = false;
      return;
    }
    this.valid = true;
    this.headers = {
      "Host": "nebula.kuaishou.cn",
      "Connection": "keep-alive",
      "User-Agent": this.userAgent,
      "Cookie": "kuaishou.api_st=" + this.api_st + ";client_key=2ac2a76d;",
      "content-type": "application/json"
    };
    this.hostt = "https://api.e.kuaishou.com";
    this.path = "/rest/r/ad/task/report";
    this.query = "mod=Xiaomi(23116PN5BC)&appver=13.2.41.9745&egid=" + this.egid + "&did=" + this.did;
    this.stoppedTasks = new Set();
  }
  ["isTaskStopped"](a) {
    return this.stoppedTasks.has(a);
  }
  ["stopTask"](a) {
    this.stoppedTasks.add(a);
  }
  async ["sig3"](a, b, e, f, g) {
    if (!this.valid) return;
    if (e === 672) var i = "bizStr={\"businessId\":" + e + ",\"endTime\":" + aj + ",\"extParams\":\"\",\"mediaScene\":\"" + f + "\",\"neoInfos\":[{\"creativeId\":" + a + ",\"extInfo\":\"\",\"llsid\":" + b + ",\"requestSceneType\":7,\"taskType\":2,\"watchExpId\":\"\",\"watchStage\":0},{\"creativeId\":" + a + ",\"extInfo\":\"\",\"llsid\":" + b + ",\"requestSceneType\":1,\"taskType\":3,\"watchExpId\":\"\",\"watchStage\":0}],\"pageId\":11101,\"posId\":24067,\"reportType\":0,\"sessionId\":\"\",\"startTime\":" + ai + ",\"subPageId\":100026367}&cs=false&client_key=2ac2a76d";
    if (e === 606) {
      var i = "bizStr={\"businessId\":" + e + ",\"endTime\":" + aj + ",\"extParams\":\"\",\"mediaScene\":\"" + f + "\",\"neoInfos\":[{\"creativeId\":" + a + ",\"extInfo\":\"\",\"llsid\":" + b + ",\"requestSceneType\":7,\"taskType\":2,\"watchExpId\":\"\",\"watchStage\":0}],\"pageId\":11101,\"posId\":20346,\"reportType\":0,\"sessionId\":\"\",\"startTime\":" + ai + ",\"subPageId\":100024064}&cs=false&client_key=2ac2a76d";
    }
    if (e === 9362) {
      var i = "bizStr={\"businessId\":" + e + ",\"endTime\":" + aj + ",\"extParams\":\"\",\"mediaScene\":\"" + f + "\",\"neoInfos\":[{\"creativeId\":" + a + ",\"extInfo\":\"\",\"llsid\":" + b + ",\"requestSceneType\":7,\"taskType\":2,\"watchExpId\":\"\",\"watchStage\":0}],\"pageId\":11101,\"posId\":24067,\"reportType\":0,\"sessionId\":\"\",\"startTime\":" + ai + ",\"subPageId\":100026367}&cs=false&client_key=2ac2a76d";
    }
    if (e === 7038) {
      var i = "bizStr={\"businessId\":" + e + ",\"endTime\":" + aj + ",\"extParams\":\"\",\"mediaScene\":\"" + f + "\",\"neoInfos\":[{\"creativeId\":" + a + ",\"extInfo\":\"\",\"llsid\":" + b + ",\"requestSceneType\":1,\"taskType\":1,\"watchExpId\":\"\",\"watchStage\":0}],\"pageId\":11101,\"posId\":96134,\"reportType\":0,\"sessionId\":\"\",\"startTime\":" + ai + ",\"subPageId\":100074584}&cs=false&client_key=2ac2a76d";
    }
    try {
      const m = as("sign", this.index);
      if (!m) return;
      let n = {
          "method": "post",
          "url": "http://" + m.url + "?km=" + encodeURIComponent(a3) + "&user=" + this.userId,
          "headers": {
            "User-Agent": this.userAgent
          },
          "body": JSON.stringify({
            "query": this.query,
            "body": i,
            "salt": this.salt,
            "path": this.path
          })
        },
        o = await aD(n, g, this.sock5);
      if (o && o.Sig && o.Sig3 && o.NsSig) {
        let p = o.Sig,
          r = o.Sig3,
          u = o.NsSig;
        e === 672 && (await this.ad(p, r, u, i, e));
        if (e === 606) {
          await this.boxad(p, r, u, i, e);
        }
        e === 9362 && (await this.fanbuad(p, r, u, i, e));
        e === 7038 && (await this.ad7038(p, r, u, i, e));
      } else {
        return;
      }
    } catch (x) {
      return;
    }
  }
  async ["cid"](a, b) {
    if (!this.valid) return;
    try {
      let g = a;
      const h = as("enc", this.index);
      if (!h) {
        console.log("账号[" + this.index + "] 无法获取enc接口");
        return;
      }
      let i = {
          "method": "get",
          "url": "http://" + h.url + "?km=" + encodeURIComponent(a3),
          "headers": {
            "User-Agent": this.userAgent
          },
          "qs": {
            "salt": this.salt,
            "userId": this.userId,
            "did": this.did,
            "oaid": "",
            "apist": this.api_st,
            "adType": g
          }
        },
        j = await aD(i, b, this.sock5);
      if (j && j.result == 1 && j.feeds && j.feeds[0]) {
        j.feeds[0].caption && console.log("账号[" + this.index + "] " + j.feeds[0].caption);
        let k = j.feeds[0].exp_tag,
          l = k.split("/"),
          m = l[1],
          n = m.split("_")[0],
          o = j.feeds[0].ad.creativeId,
          p = n,
          u = j.feedType;
        if (!p || p === "undefined" || p === "") return;
        if (u === 0) {
          const v = at();
          console.log("账号[" + this.index + "]  随机延迟 " + Math.round(v / 1000) + "秒");
          await new Promise(x => setTimeout(x, v));
          let w = "video";
          await this.sig3(o, p, a, w);
        }
      } else {
        const z = j && (j.result || j.errorMsg || j.error_msg),
          A = j && (j.errorMsg || j.error_msg || "") || "";
        if (z == 50 || typeof A === "string" && A.includes("签名验证失败")) return;
        return;
      }
    } catch (B) {
      return;
    }
  }
  async ["boxad"](a, b, e, f, g, h) {
    try {
      let k = {
          "method": "post",
          "url": "https://api.e.kuaishou.com/rest/r/ad/task/report?" + this.query + "&sig=" + a + "&__NS_sig3=" + b + "&__NS_xfalcon=&__NStokensig=" + e,
          "headers": {
            "Host": "api.e.kuaishou.com",
            "User-Agent": "kwai-android aegon/4.9.1",
            "Cookie": "kuaishou.api_st=" + this.api_st,
            "page-code": "NEW_TASK_CENTER",
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Client-Info": "model=V2049A;os=Android;nqe-score=33;network=WIFI;"
          },
          "body": f
        },
        l = await aD(k, h, this.sock5);
      if (l && l.result == 1) {
        let m = l.data.neoAmount || 0;
        console.log("账号[" + this.index + "]  开宝箱获得金币:" + m);
        if (this.j === 0 && l.data.neoAmount === 0) {}
        const o = au();
        console.log("账号[" + this.index + "]  随机防黑延迟 " + Math.round(o / 1000) + "秒");
        await new Promise(p => setTimeout(p, o));
      } else {
        let u = l && l.result;
        const v = l && (l.message || l.error_msg) || "";
        if (u == 1003 || typeof v === "string" && v.includes("今日奖励领完啦")) {
          console.log("账号[" + this.index + "]  宝箱任务提示“今日奖励领完啦”，停止该任务");
          this.stopTask(606);
          return;
        }
        console.log(l);
      }
    } catch (w) {
      return;
    }
  }
  async ["ad"](a, b, e, f, g, h) {
    try {
      let j = {
          "method": "post",
          "url": "https://api.e.kuaishou.com/rest/r/ad/task/report?" + this.query + "&sig=" + a + "&__NS_sig3=" + b + "&__NS_xfalcon=&__NStokensig=" + e,
          "headers": {
            "Host": "api.e.kuaishou.com",
            "User-Agent": "kwai-android aegon/4.9.1",
            "Cookie": "kuaishou.api_st=" + this.api_st,
            "page-code": "NEW_TASK_CENTER",
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Client-Info": "model=V2049A;os=Android;nqe-score=33;network=WIFI;"
          },
          "body": f
        },
        k = await aD(j, h, this.sock5);
      if (k && k.result == 1) {
        let l = k.data.neoAmount || 0;
        console.log("账号[" + this.index + "]  看广告获得金额:" + l);
        this.j = k.data.awardAmount;
        const m = au();
        console.log("账号[" + this.index + "]  随机防黑延迟 " + Math.round(m / 1000) + "秒");
        await new Promise(n => setTimeout(n, m));
      } else {
        let o = k && k.result;
        const p = k && (k.message || k.error_msg) || "";
        if (o == 1003 || typeof p === "string" && p.includes("今日奖励领完啦")) {
          console.log("账号[" + this.index + "]  ad广告任务提示“今日奖励领完啦”，停止该任务");
          this.stopTask(672);
          return;
        }
        if (k && k.result == 500) {}
        console.log(k);
      }
    } catch (w) {
      return;
    }
  }
  async ["fanbuad"](a, b, e, f, g, h) {
    try {
      let k = {
          "method": "post",
          "url": "https://api.e.kuaishou.com/rest/r/ad/task/report?" + this.query + "&sig=" + a + "&__NS_sig3=" + b + "&__NS_xfalcon=&__NStokensig=" + e,
          "headers": {
            "Host": "api.e.kuaishou.cn",
            "User-Agent": "kwai-android aegon/3.56.0",
            "Cookie": "kuaishou.api_st=" + this.api_st,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "body": f
        },
        l = await aD(k, h, this.sock5);
      if (l && l.result == 1) {
        let m = l.data.neoAmount || 0;
        console.log("账号[" + this.index + "]  饭补看广告" + m + "金币奖励！");
        const n = au();
        console.log("账号[" + this.index + "]  随机防黑延迟 " + Math.round(n / 1000) + "秒");
        await new Promise(o => setTimeout(o, n));
      } else {
        const o = l && l.result,
          p = l && (l.message || l.error_msg) || "";
        if (o == 1003 || typeof p === "string" && p.includes("今日奖励领完啦")) {
          console.log("账号[" + this.index + "]  饭补任务提示“今日奖励领完啦”，停止该任务");
          this.stopTask(9362);
          return;
        }
        console.log("账号[" + this.index + "] 饭补奖励失败,多次失败请先手动点击饭补的广告是否正常");
        if (l) console.log(l);
      }
    } catch (v) {
      return;
    }
  }
  async ["ad7038"](a, b, e, f, g, h) {
    try {
      let j = {
          "method": "post",
          "url": "https://api.e.kuaishou.com/rest/r/ad/task/report?" + this.query + "&sig=" + a + "&__NS_sig3=" + b + "&__NS_xfalcon=&__NStokensig=" + e,
          "headers": {
            "Host": "api.e.kuaishou.com",
            "User-Agent": "kwai-android aegon/4.9.1",
            "Cookie": "kuaishou.api_st=" + this.api_st,
            "page-code": "NEW_TASK_CENTER",
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Client-Info": "model=V2049A;os=Android;nqe-score=33;network=WIFI;"
          },
          "body": f
        },
        k = await aD(j, h, this.sock5);
      if (k && k.result == 1) {
        let l = k.data.neoAmount || 0;
        console.log("账号[" + this.index + "]  搜索看广告获得金额:" + l);
        const m = au();
        console.log("账号[" + this.index + "]  随机防黑延迟 " + Math.round(m / 1000) + "秒");
        await new Promise(n => setTimeout(n, m));
      } else {
        const o = k && k.result,
          p = k && (k.message || k.error_msg) || "";
        if (o == 1003 || typeof p === "string" && p.includes("今日奖励领完啦")) {
          console.log("账号[" + this.index + "]  搜索任务提示“今日奖励领完啦”，停止该任务");
          this.stopTask(7038);
          return;
        }
        console.log("账号[" + this.index + "]  搜索看广告奖励失败");
        if (k) console.log(k);
      }
    } catch (u) {
      return;
    }
  }
}
async function ay(a, b) {
  try {
    if (!a) {
      console.log("账号[" + b + "] 未配置代理，直连");
      return;
    }
    const g = "http://www.baidu.com",
      h = Date.now(),
      i = ae("request", "2.88.2");
    if (!i) {
      return console.log("账号[" + b + "] 代理测试异常: 依赖request未安装且安装失败"), false;
    }
    const j = {
      "method": "GET",
      "url": g,
      "timeout": 10000
    };
    function k(p, r) {
      try {
        const t = ae("socks-proxy-agent", "^7.0.0");
        if (!t) throw new Error("socks-proxy-agent 不可用");
        const u = t.SocksProxyAgent || t.default || t;
        let v, w, x, y;
        if (r.includes("|")) {
          [v, w, x, y] = r.split("|");
        } else {
          if (r.includes("#")) {
            [v, w, x, y] = r.split("#");
          } else [v, w, x, y] = r.split("|");
        }
        const z = x && y,
          A = z ? x + ":" + y + "@" : "",
          B = "socks5h://" + A + v + ":" + w;
        p.agent = new u(B);
        if (p.proxy) delete p.proxy;
        p.tunnel = false;
        if (a6) console.log("账号[" + b + "] [proxy-test] 尝试 SOCKS5: " + v + ":" + w + ", 认证:" + (z ? "是" : "否"));
        return true;
      } catch (E) {
        return console.log("账号[" + b + "] [proxy-test] socks-proxy-agent 初始化失败: " + (E && E.message)), false;
      }
    }
    function l(p, r) {
      const [u, v, w, x] = r.split("|"),
        y = w && x,
        z = y ? "http://" + w + ":" + x + "@" + u + ":" + v : "http://" + u + ":" + v;
      p.proxy = z;
      if (p.agent) delete p.agent;
      p.tunnel = false;
      p.rejectUnauthorized = false;
      if (a6) console.log("账号[" + b + "] [proxy-test] 回退 HTTP 代理: " + u + ":" + v + ", 认证:" + (y ? "是" : "否"));
    }
    let m = false;
    return !k(j, a) && (l(j, a), m = true), await new Promise(p => {
      const t = () => i(j, (u, v, w) => {
        if (u) {
          const z = String(u.message || u);
          if (!m && (/Socks5/i.test(z) || /handshake/i.test(z) || /no accepted authentication type/i.test(z))) try {
            return l(j, a), m = true, t();
          } catch (A) {}
          return console.log("账号[" + b + "] 代理测试失败: " + z), p(false);
        }
        const x = Date.now() - h;
        if (v && v.statusCode >= 200 && v.statusCode < 400) {
          return console.log("账号[" + b + "] 代理连接正常，延迟 " + x + "ms"), p(true);
        } else return console.log("账号[" + b + "] 代理测试失败: HTTP " + (v && v.statusCode)), p(false);
      });
      t();
    });
  } catch (p) {
    return console.log("账号[" + b + "] 代理测试异常: " + (p.message || p)), false;
  }
}
!(async () => {
  if (!(await aB())) return;
  try {
    if (af.length > 0) {
      for (const g of af) {
        try {
          await ay(g.sock5, g.index);
        } catch (h) {}
      }
    }
  } catch (j) {}
  const b = await ar();
  if (!b) return;
  af.length > 0 ? await aw() : console.log("❌没有有效的账号配置，程序退出");
  await aG(msg);
})().catch(() => {}).finally(() => W.done());
function az() {
  return Math.floor(Math.random() * (10 - 8 + 1)) + 8;
}
function aA(b) {
  let f = Buffer.from(b, "base64").toString("utf-8");
  return f;
}
async function aB() {
  if (!a3) {
    return console.log("❌未找到km环境变量，请设置青龙面板的km变量"), false;
  }
  if (ab) {
    const e = ab.split("\n").map(h => h.trim()).filter(h => h),
      f = e.length > 1 ? e : ab.split("&").map(h => h.trim()).filter(h => h),
      g = [];
    for (const h of f) {
      const i = h.split("@").filter(t => t.trim());
      if (i.length < 3) {
        console.log("❌账号格式错误: " + h);
        continue;
      }
      let j = 0,
        k = "小主";
      i[0].indexOf("=") === -1 && (k = i[0], j = 1);
      const l = i[j] || "",
        m = i[j + 1] || "",
        n = i[j + 2] || "",
        o = i[j + 3] || "";
      if (!l || !m || !n) {
        console.log("❌账号信息不完整(跳过): " + h);
        continue;
      }
      const p = aC(l);
      if (!p) {
        console.log("❌Cookie信息提取失败(跳过): " + k);
        continue;
      }
      const r = new ax({
        "remark": k,
        "salt": m,
        "userAgent": n,
        "sock5": o,
        ...p
      });
      if (!r.valid) {
        console.log("❌账号参数不完整(跳过): " + k);
        continue;
      }
      g.push(r);
    }
    if (g.length === 0) return console.log("❌未解析到任何有效账号，请检查变量内容"), false;
    return af = g, ah = af.length, ac = af[0].sock5 || null, console.log("✅共找到" + ah + "个有效账号"), true;
  } else return console.log("❌未找到ks200环境变量"), console.log("新格式为: cookie@salt@user-agent@sock5 或 remark@cookie@salt@user-agent@sock5"), false;
}
function aC(a) {
  try {
    const e = {},
      f = a.split(";");
    for (let k of f) {
      const [l, m] = k.trim().split("=");
      l && m && (e[l.trim()] = m.trim());
    }
    const g = e.userId || e.ud,
      h = e.egid,
      i = e.did,
      j = e["kuaishou.api_st"];
    return g && h && i && j ? {
      "userId": g,
      "egid": h,
      "did": i,
      "api_st": j
    } : (console.log("Cookie中缺少必要字段:", {
      "userId": g,
      "egid": h,
      "did": i,
      "api_st": j
    }), null);
  } catch (o) {
    return console.log("Cookie解析失败:", o.message), null;
  }
}
async function aD(a, b, e = null) {
  const g = ["http_proxy", "https_proxy", "HTTP_PROXY", "HTTPS_PROXY", "all_proxy", "ALL_PROXY", "no_proxy", "NO_PROXY", "npm_config_proxy", "npm_config_https_proxy", "npm_config_noproxy"],
    h = {};
  for (const o of g) h[o] = process.env[o];
  for (const p of g) delete process.env[p];
  var i = ae("request", "2.88.2");
  if (!i) {
    return console.log("HTTP请求失败: 依赖request未安装且安装失败"), null;
  }
  if (a6) {
    console.log("[proxy-env] 清理前:", h);
    const t = {};
    for (const u of g) t[u] = process.env[u];
    console.log("[proxy-env] 清理后:", t);
  }
  function j(v) {
    v.tunnel = false;
    if (v.proxy) delete v.proxy;
    if (v.agent) delete v.agent;
  }
  function l(v, w) {
    try {
      const x = ae("socks-proxy-agent", "^7.0.0");
      if (!x) throw new Error("socks-proxy-agent 不可用或初始化失败");
      const y = x.SocksProxyAgent || x.default || x;
      let z, A, B, C;
      if (w.includes("|")) {
        [z, A, B, C] = w.split("|");
      } else w.includes("#") ? [z, A, B, C] = w.split("#") : [z, A, B, C] = w.split("|");
      const D = B && C,
        E = D ? B + ":" + C + "@" : "",
        F = "socks5h://" + E + z + ":" + A;
      v.agent = new y(F);
      if (v.proxy) delete v.proxy;
      v.tunnel = false;
      if (a6) console.log("代理尝试 SOCKS5: " + z + ":" + A + ", 认证:" + (D ? "是" : "否"));
      return true;
    } catch (I) {
      return console.log("代理socks-proxy-agent 不可用或初始化失败: " + (I && I.message)), false;
    }
  }
  function m(v, w) {
    const [x, y, z, A] = w.split("|"),
      B = z && A,
      C = B ? "http://" + z + ":" + A + "@" + x + ":" + y : "http://" + x + ":" + y;
    v.proxy = C;
    if (v.agent) delete v.agent;
    v.tunnel = false;
    v.rejectUnauthorized = false;
    if (a6) console.log("代理回退 HTTP 代理: " + x + ":" + y + ", 认证:" + (B ? "是" : "否"));
  }
  let n = false;
  if (!e && ac) {
    e = ac;
  }
  if (e) {
    const w = l(a, e);
    !w && (m(a, e), n = true);
  } else {
    if (a6) console.log("代理未配置代理，直连");
    j(a);
  }
  return new Promise(z => {
    if (!b) {
      b = "httpRequest";
    }
    if (a6) {
      console.log("\n【debug】===============这是" + b + "请求信息===============");
      console.log(a);
    }
    const B = () => i(a, function (E, F) {
      if (E) {
        const I = String(E.message || E);
        if (e && !n && (/Socks5/i.test(I) || /handshake/i.test(I) || /no accepted authentication type/i.test(I))) {
          try {
            if (a6) console.log("代理SOCKS5 握手失败(" + I + ")，尝试回退 HTTP 代理重试一次...");
            return m(a, e), n = true, B();
          } catch (K) {}
        }
        if (!e && (/407/.test(I) || /tunneling socket/i.test(I))) {
          if (a6) console.log("代理检测到 407，强制直连重试");
          return j(a), B();
        }
        return console.log("HTTP请求失败: " + I), z(null);
      }
      let H = F.body;
      try {
        a6 && (console.log("\n\n【debug】===============这是" + b + "返回数据=============="), console.log(H));
        if (typeof H == "string") {
          if (N(H)) {
            let P = JSON.parse(H);
            a6 && (console.log("\n【debug】=============这是" + b + "json解析后数据============"), console.log(P));
            z(P);
          } else {
            let R = H;
            z(R);
          }
          function N(S) {
            if (typeof S == "string") try {
              if (typeof JSON.parse(S) == "object") return true;
            } catch (T) {
              return false;
            }
            return false;
          }
        } else {
          let S = H;
          z(S);
        }
      } catch (T) {
        console.log(E, F);
        console.log("\n " + b + "失败了!请稍后尝试!!");
      } finally {
        if (typeof H === "undefined") z(null);
      }
    });
    B();
  });
}
function aE(a) {
  return new Promise(function (e) {
    setTimeout(e, a * 1000);
  });
}
function aF(a) {
  if (W.isNode()) {
    a && (console.log("" + a), msg += "\n" + a);
  } else console.log("" + a), msg += "\n" + a;
}
async function aG(a) {
  if (!a) return;
  if (a5 > 0) {
    if (W.isNode()) {
      var e = require("./sendNotify");
      await e.sendNotify(W.name, a);
    } else W.msg(W.name, "", a);
  } else console.log(a);
}
function aH(a, b) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class g {
    constructor(h) {
      this.env = h;
    }
    ["send"](h, i = "GET") {
      h = "string" == typeof h ? {
        "url": h
      } : h;
      let j = this.get;
      return "POST" === i && (j = this.post), new Promise((k, l) => {
        j.call(this, h, (n, o, p) => {
          n ? l(n) : k(o);
        });
      });
    }
    ["get"](h) {
      return this.send.call(this.env, h);
    }
    ["post"](h) {
      return this.send.call(this.env, h, "POST");
    }
  }
  return new class {
    constructor(h, i) {
      this.name = h;
      this.http = new g(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, i);
      this.log("", "🔔" + this.name + ", 开始!");
    }
    ["isNode"]() {
      return "undefined" != typeof module && !!module.exports;
    }
    ["isQuanX"]() {
      return "undefined" != typeof $task;
    }
    ["isSurge"]() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    ["isLoon"]() {
      return "undefined" != typeof $loon;
    }
    ["toObj"](h, i = null) {
      try {
        return JSON.parse(h);
      } catch {
        return i;
      }
    }
    ["toStr"](h, i = null) {
      try {
        return JSON.stringify(h);
      } catch {
        return i;
      }
    }
    ["getjson"](h, j) {
      let m = j;
      const n = this.getdata(h);
      if (n) try {
        m = JSON.parse(this.getdata(h));
      } catch {}
      return m;
    }
    ["setjson"](h, i) {
      try {
        return this.setdata(JSON.stringify(h), i);
      } catch {
        return !1;
      }
    }
    ["getScript"](h) {
      return new Promise(i => {
        this.get({
          "url": h
        }, (j, k, l) => i(l));
      });
    }
    ["runScript"](h, i) {
      return new Promise(k => {
        let m = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        m = m ? m.replace(/\n/g, "").trim() : m;
        let p = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        p = p ? 1 * p : 20;
        p = i && i.timeout ? i.timeout : p;
        const [u, v] = m.split("@"),
          w = {
            "url": "http://" + v + "/v1/scripting/evaluate",
            "body": {
              "script_text": h,
              "mock_type": "cron",
              "timeout": p
            },
            "headers": {
              "X-Key": u,
              "Accept": "*/*"
            }
          };
        this.post(w, (x, y, z) => k(z));
      }).catch(k => this.logErr(k));
    }
    ["loaddata"]() {
      if (!this.isNode()) return {};
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const k = this.path.resolve(this.dataFile),
          l = this.path.resolve(process.cwd(), this.dataFile),
          m = this.fs.existsSync(k),
          n = !m && this.fs.existsSync(l);
        if (!m && !n) return {};
        {
          const p = m ? k : l;
          try {
            return JSON.parse(this.fs.readFileSync(p));
          } catch (u) {
            return {};
          }
        }
      }
    }
    ["writedata"]() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const h = this.path.resolve(this.dataFile),
          j = this.path.resolve(process.cwd(), this.dataFile),
          k = this.fs.existsSync(h),
          l = !k && this.fs.existsSync(j),
          m = JSON.stringify(this.data);
        k ? this.fs.writeFileSync(h, m) : l ? this.fs.writeFileSync(j, m) : this.fs.writeFileSync(h, m);
      }
    }
    ["lodash_get"](h, j, k) {
      const l = j.replace(/\[(\d+)\]/g, ".$1").split(".");
      let m = h;
      for (const n of l) if (m = Object(m)[n], void 0 === m) return k;
      return m;
    }
    ["lodash_set"](h, i, j) {
      return Object(h) !== h ? h : (Array.isArray(i) || (i = i.toString().match(/[^.[\]]+/g) || []), i.slice(0, -1).reduce((k, l, m) => Object(k[l]) === k[l] ? k[l] : k[l] = Math.abs(i[m + 1]) >> 0 == +i[m + 1] ? [] : {}, h)[i[i.length - 1]] = j, h);
    }
    ["getdata"](h) {
      let j = this.getval(h);
      if (/^@/.test(h)) {
        const [, k, l] = /^@(.*?)\.(.*?)$/.exec(h),
          m = k ? this.getval(k) : "";
        if (m) try {
          const n = JSON.parse(m);
          j = n ? this.lodash_get(n, l, "") : j;
        } catch (o) {
          j = "";
        }
      }
      return j;
    }
    ["setdata"](j, k) {
      let m = false;
      if (/^@/.test(k)) {
        const [, n, p] = /^@(.*?)\.(.*?)$/.exec(k),
          u = this.getval(n),
          v = n ? "null" === u ? null : u || "{}" : "{}";
        try {
          const w = JSON.parse(v);
          this.lodash_set(w, p, j);
          m = this.setval(JSON.stringify(w), n);
        } catch (y) {
          const A = {};
          this.lodash_set(A, p, j);
          m = this.setval(JSON.stringify(A), n);
        }
      } else m = this.setval(j, k);
      return m;
    }
    ["getval"](h) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(h) : this.isQuanX() ? $prefs.valueForKey(h) : this.isNode() ? (this.data = this.loaddata(), this.data[h]) : this.data && this.data[h] || null;
    }
    ["setval"](h, i) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(h, i) : this.isQuanX() ? $prefs.setValueForKey(h, i) : this.isNode() ? (this.data = this.loaddata(), this.data[i] = h, this.writedata(), !0) : this.data && this.data[i] || null;
    }
    ["initGotEnv"](h) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      h && (h.headers = h.headers ? h.headers : {}, void 0 === h.headers.Cookie && void 0 === h.cookieJar && (h.cookieJar = this.ckjar));
    }
    ["get"](h, i = () => {}) {
      h.headers && (delete h.headers["Content-Type"], delete h.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (h.headers = h.headers || {}, Object.assign(h.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(h, (k, l, m) => {
        !k && l && (l.body = m, l.statusCode = l.status);
        i(k, l, m);
      })) : this.isQuanX() ? (this.isNeedRewrite && (h.opts = h.opts || {}, Object.assign(h.opts, {
        "hints": !1
      })), $task.fetch(h).then(k => {
        const {
          statusCode: l,
          statusCode: m,
          headers: n,
          body: p
        } = k;
        i(null, {
          "status": l,
          "statusCode": m,
          "headers": n,
          "body": p
        }, p);
      }, k => i(k))) : this.isNode() && (this.initGotEnv(h), this.got(h).on("redirect", (k, l) => {
        try {
          if (k.headers["set-cookie"]) {
            const n = k.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            n && this.ckjar.setCookieSync(n, null);
            l.cookieJar = this.ckjar;
          }
        } catch (p) {
          this.logErr(p);
        }
      }).then(k => {
        const {
          statusCode: l,
          statusCode: m,
          headers: n,
          body: p
        } = k;
        i(null, {
          "status": l,
          "statusCode": m,
          "headers": n,
          "body": p
        }, p);
      }, k => {
        const {
          message: l,
          response: m
        } = k;
        i(l, m, m && m.body);
      }));
    }
    ["post"](h, j = () => {}) {
      if (h.body && h.headers && !h.headers["Content-Type"] && (h.headers["Content-Type"] = "application/x-www-form-urlencoded"), h.headers && delete h.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (h.headers = h.headers || {}, Object.assign(h.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.post(h, (l, m, n) => {
        !l && m && (m.body = n, m.statusCode = m.status);
        j(l, m, n);
      });else {
        if (this.isQuanX()) h.method = "POST", this.isNeedRewrite && (h.opts = h.opts || {}, Object.assign(h.opts, {
          "hints": !1
        })), $task.fetch(h).then(l => {
          const {
            statusCode: m,
            statusCode: n,
            headers: p,
            body: u
          } = l;
          j(null, {
            "status": m,
            "statusCode": n,
            "headers": p,
            "body": u
          }, u);
        }, l => j(l));else {
          if (this.isNode()) {
            this.initGotEnv(h);
            const {
              url: l,
              ...m
            } = h;
            this.got.post(l, m).then(n => {
              const {
                statusCode: p,
                statusCode: u,
                headers: v,
                body: w
              } = n;
              j(null, {
                "status": p,
                "statusCode": u,
                "headers": v,
                "body": w
              }, w);
            }, n => {
              const {
                message: o,
                response: p
              } = n;
              j(o, p, p && p.body);
            });
          }
        }
      }
    }
    ["time"](h, j = null) {
      const k = j ? new Date(j) : new Date();
      let l = {
        "M+": k.getMonth() + 1,
        "d+": k.getDate(),
        "H+": k.getHours(),
        "m+": k.getMinutes(),
        "s+": k.getSeconds(),
        "q+": Math.floor((k.getMonth() + 3) / 3),
        "S": k.getMilliseconds()
      };
      /(y+)/.test(h) && (h = h.replace(RegExp.$1, (k.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let m in l) new RegExp("(" + m + ")").test(h) && (h = h.replace(RegExp.$1, 1 == RegExp.$1.length ? l[m] : ("00" + l[m]).substr(("" + l[m]).length)));
      return h;
    }
    ["msg"](h = a, j = "", k = "", l) {
      const n = p => {
        if (!p) return p;
        if ("string" == typeof p) return this.isLoon() ? p : this.isQuanX() ? {
          "open-url": p
        } : this.isSurge() ? {
          "url": p
        } : void 0;
        if ("object" == typeof p) {
          if (this.isLoon()) {
            let u = p.openUrl || p.url || p["open-url"],
              v = p.mediaUrl || p["media-url"];
            return {
              "openUrl": u,
              "mediaUrl": v
            };
          }
          if (this.isQuanX()) {
            let x = p["open-url"] || p.url || p.openUrl,
              y = p["media-url"] || p.mediaUrl;
            return {
              "open-url": x,
              "media-url": y
            };
          }
          if (this.isSurge()) {
            let z = p.url || p.openUrl || p["open-url"];
            return {
              "url": z
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(h, j, k, n(l)) : this.isQuanX() && $notify(h, j, k, n(l))), !this.isMuteLog) {
        let p = ["", "==============📣系统通知📣=============="];
        p.push(h);
        j && p.push(j);
        k && p.push(k);
        console.log(p.join("\n"));
        this.logs = this.logs.concat(p);
      }
    }
    ["log"](...h) {
      h.length > 0 && (this.logs = [...this.logs, ...h]);
      console.log(h.join(this.logSeparator));
    }
    ["logErr"](h, i) {
      const k = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      k ? this.log("", "❗️" + this.name + ", 错误!", h.stack) : this.log("", "❗️" + this.name + ", 错误!", h);
    }
    ["wait"](h) {
      return new Promise(i => setTimeout(i, h));
    }
    ["done"](h = {}) {
      const i = new Date().getTime(),
        j = (i - this.startTime) / 1000;
      this.log("", "🔔" + this.name + ", 结束! 🕛 " + j + " 秒");
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(h);
    }
  }(a, b);
}