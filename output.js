//Sun Dec 22 2024 11:01:07 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = Env("快手答题"),
  envSplit = ["\n", "&", "@"],
  ckNames = ["kuaishou_dt"];
require("dotenv").config();
let kuaishou_dt_code = process.env.kuaishou_dt_code,
  code_tips = "1. 当前版本:最终版,  优化输出\n";
class UserClass {
  constructor(_0x2aa6a3) {
    this.idx = "账号[" + ++$.userIdx + "]";
    this.ckFlog = true;
    this.ck_ = _0x2aa6a3.split("#");
    this.ck = this.ck_[0];
    this.ua = "Mozilla/5.0 (Linux; Android " + $.randomInt(9, 13) + "; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/90.0.4430.226 KsWebView/1.8.90.612 (rel) Mobile Safari/537.36 Yoda/3.1.4-rc1 ksNebula/11.4.40.5686 OS_PRO_BIT/64 MAX_PHY_MEM/11598 AZPREFIX/zw ICFO/0 StatusHT/32 TitleHT/44 NetType/WIFI ISLP/0 ISDM/0 ISLB/0 locale/zh-cn CT/0 ISLM/-1";
    this.ts13 = $.ts(13);
    this.hd = {
      Host: "encourage.kuaishou.com",
      "User-Agent": this.ua,
      "X-Requested-With": "com.kuaishou.nebula",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-Dest": "empty",
      Cookie: this.ck,
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
    };
  }
  async userTask() {
    console.log("\n=============== " + this.idx + " ===============");
    $.log("\n-------------- 开始验证卡密 --------------");
    await this.get_codes();
    this.ckFlog && ($.log("\n-------------- 开始答题 --------------"), await this.start_dt());
  }
  async tips() {
    let _0x144bba = {
        fn: "提示内容",
        method: "get",
        url: "https://raw.githubusercontent.com/yml2213/javascript/master/yml/tipe.txt",
        headers: {}
      },
      _0x53d0a0 = await $.request(_0x144bba);
    if (_0x53d0a0) {
      $.log("\n\n\n" + _0x53d0a0 + code_tips + "------------------------------------------------------------------------------", {
        notify: true
      });
    } else {
      console.log(_0x144bba.fn + ": 失败,  " + JSON.stringify(_0x53d0a0));
    }
  }
  async get_codes() {
    if (kuaishou_dt_code.includes("@")) {
      console.log("发现两张卡密");
      let _0x4c39ca = kuaishou_dt_code.split("@"),
        _0x1514b0 = [_0x4c39ca[0], _0x4c39ca[1]];
      await this.stacks_num(_0x1514b0);
    } else {
      await this.auth();
    }
  }
  async stacks_num(_0x34123e) {
    console.log("开始叠加次数");
    let _0x1c205d = _0x34123e[1],
      _0x99ccce = _0x34123e[0],
      _0x2039ae = {
        fn: "叠加次数",
        method: "post",
        url: "http://81.70.196.85:7006/ksjsb/voucher/merge",
        headers: {
          "Content-Type": "application/json",
          voucherCode: _0x99ccce
        },
        json: {
          old: _0x1c205d,
          new: _0x99ccce
        }
      };
    console.log(_0x2039ae);
    let _0x2c326d = await $.request(_0x2039ae);
    console.log(_0x2c326d);
    if (_0x2c326d.code == 200) {
      $.log(this.idx + ": " + _0x2039ae.fn + ", 叠加成功, 新的卡密: " + _0x99ccce);
    } else {
      console.log(_0x2039ae.fn + ": 失败,  " + JSON.stringify(_0x2c326d));
      this.ckFlog = false;
    }
    kuaishou_dt_code = _0x99ccce;
    await this.auth();
  }
  async auth() {
    let _0x2d23c2 = {
        fn: "卡密验证",
        method: "get",
        url: "http://81.70.196.85:7006/ksjsb/auth",
        headers: {
          voucherCode: kuaishou_dt_code
        }
      },
      _0x59d1d7 = await $.request(_0x2d23c2);
    if (_0x59d1d7.code == 200) {
      _0x59d1d7.message != "您是永久卡密！" ? $.log(this.idx + ": " + _0x2d23c2.fn + ", 卡密次数:" + _0x59d1d7.message) : $.log(this.idx + ": " + _0x2d23c2.fn + ", 卡密次数:" + _0x59d1d7.message + ", 欢迎尊贵的永久卡密用户!");
      this.ckFlog = true;
    } else {
      if (_0x59d1d7.code == 404) {
        $.log(this.idx + ": " + _0x2d23c2.fn + " 失败:" + _0x59d1d7.message + ", 请检查卡密是否正确, 购买卡密请前往: 'http://menglei.xyz'", {
          notify: true
        });
        this.ckFlog = false;
      } else {
        console.log(_0x2d23c2.fn + ": 失败,  " + JSON.stringify(_0x59d1d7));
        this.ckFlog = false;
      }
    }
  }
  async start_dt() {
    let _0x4081e1 = {
        fn: "开始答题",
        method: "get",
        url: "https://encourage.kuaishou.com/rest/n/encourage/game/quiz/round/kickoff?reKickoff=false&sigCatVer=1",
        headers: this.hd
      },
      _0x486467 = await $.request(_0x4081e1);
    if (_0x486467.result == 1 && _0x486467.data.roundId) {
      this.roundId = _0x486467.data.roundId;
      this.questionDetail = _0x486467.data.questionDetail;
      this.question = _0x486467.data.questionDetail.question;
      this.opt = _0x486467.data.questionDetail.options;
      this.index = _0x486467.data.questionDetail.index;
      this.total = _0x486467.data.questionDetail.total;
      await this.next(this.index, this.question, this.opt, this.roundId);
      this.ckFlog = true;
    } else {
      if (_0x486467.result == 103703) {
        $.log(this.idx + ": " + "开始答题" + " -- " + _0x486467.error_msg);
      } else {
        console.log("开始答题: 失败,  " + JSON.stringify(_0x486467));
        this.ckFlog = false;
      }
    }
  }
  async upload(_0x436b00, _0x4281d8, _0x3aff7d, _0x94cd56, _0xbdac92, _0x3c4d29, _0x40c735 = "database") {
    let _0x15e9e5 = await this.getSig3(this.ck, _0x3aff7d, _0x94cd56, _0x3c4d29),
      _0x8086ae = {
        fn: "上传答案",
        method: "post",
        url: "https://encourage.kuaishou.com/rest/n/encourage/game/quiz/round/answer/upload?__NS_sig3=" + _0x15e9e5 + "&sigCatVer=1",
        headers: {
          Host: "encourage.kuaishou.com",
          "User-Agent": this.ua,
          Accept: "*/*",
          Origin: "https://encourage.kuaishou.com",
          "X-Requested-With": "com.kuaishou.nebula",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Dest": "empty",
          "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          Cookie: this.ck,
          "content-type": "application/json"
        },
        json: {
          roundId: _0x3aff7d,
          index: _0x94cd56,
          answer: _0x3c4d29
        }
      },
      _0x501f5f = await $.request(_0x8086ae);
    if (_0x40c735 == "database") {
      if (_0x501f5f.result == 1 && _0x501f5f.data.answerDetail.correct) {
        _0x94cd56 == 9 ? $.log(this.idx + ": 恭喜你个狗子, 10 道题全对了, 当前金币:" + _0x501f5f.data.amount.current + "==" + _0x501f5f.data.amount.current / 10000 + " 元", {
          notify: true
        }) : (this.roundId = _0x501f5f.data.nextQuestionDetail.roundId, this.questionDetail = _0x501f5f.data.nextQuestionDetail.questionDetail, this.question = _0x501f5f.data.nextQuestionDetail.questionDetail.question, this.opt = _0x501f5f.data.nextQuestionDetail.questionDetail.options, this.index = _0x501f5f.data.nextQuestionDetail.questionDetail.index, $.log(this.idx + ": " + _0x8086ae.fn + " 第 " + (_0x94cd56 + 1) + " 题 -- 回答正确, 当前金币:" + _0x501f5f.data.amount.current), await this.next(this.index, this.question, this.opt, this.roundId));
      } else {
        if (_0x501f5f.result == 1 && _0x501f5f.data.answerDetail.correct == false) {
          $.log(this.idx + ":  第 " + (_0x94cd56 + 1) + " 题 -- 回答错误, 请检查数据库答案");
          console.log(JSON.stringify(_0x501f5f));
        } else {
          console.log(_0x8086ae.fn + ": 失败, " + JSON.stringify(_0x8086ae) + " " + JSON.stringify(_0x501f5f));
        }
      }
    }
  }
  async getSig3(_0x459131, _0x50a865, _0x38d159, _0x4bbb15) {
    let _0x15672b = await this.getSig3str(_0x459131, _0x50a865, _0x38d159, _0x4bbb15);
    const _0x132baa = {
      method: "post",
      url: "http://81.70.196.85:7006/ksjsb/websig3",
      headers: {
        "Content-Type": "application/json",
        voucherCode: kuaishou_dt_code
      },
      json: {
        str: _0x15672b
      }
    };
    let _0x27037e = await $.request(_0x132baa);
    if (_0x27037e.code == 200) {
      return _0x27037e.data;
    } else {
      console.log(_0x132baa.fn + ": 失败,  " + JSON.stringify(_0x27037e));
    }
  }
  async getSig3str(_0x57610a, _0x48a988, _0xd3bbfb, _0x28c7fe) {
    var _0x54be92 = Object.defineProperty,
      _0x52885c = Object.getOwnPropertySymbols,
      _0x24cd54 = Object.prototype.hasOwnProperty,
      _0x26058b = Object.prototype.propertyIsEnumerable,
      _0x18a384 = (_0x2be741, _0x22a25f, _0x46c811) => _0x22a25f in _0x2be741 ? _0x54be92(_0x2be741, _0x22a25f, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: _0x46c811
      }) : _0x2be741[_0x22a25f] = _0x46c811,
      _0x301fe0 = (_0x433599, _0x3688c0) => {
        for (var _0x2c4742 in _0x3688c0 || (_0x3688c0 = {})) _0x24cd54.call(_0x3688c0, _0x2c4742) && _0x18a384(_0x433599, _0x2c4742, _0x3688c0[_0x2c4742]);
        if (_0x52885c) {
          for (var _0x2c4742 of _0x52885c(_0x3688c0)) _0x26058b.call(_0x3688c0, _0x2c4742) && _0x18a384(_0x433599, _0x2c4742, _0x3688c0[_0x2c4742]);
        }
        return _0x433599;
      },
      _0x2558af = (_0x13a046, _0x28bf2a, _0x2df64d) => (_0x18a384(_0x13a046, "symbol" != typeof _0x28bf2a ? _0x28bf2a + "" : _0x28bf2a, _0x2df64d), _0x2df64d);
    const _0x505edd = 1,
      _0x3818c1 = "__NS",
      _0x25f82e = ["kpn", "kpf", "userId", "did", "c", "appver", "language", "mod", "did_tag", "egid", "oDid", "androidApiLevel", "newOc", "browseType", "socName", "ftt", "abi", "userRecoBit", "device_abi", "grant_browse_type", "iuid", "rdid"];
    function _0x483667(_0x5bc181) {
      var _0x3b34b4;
      return (null != (_0x3b34b4 = _0x5bc181.split(";")) ? _0x3b34b4 : []).map(_0x3f1c2f => {
        const _0x3a62d3 = _0x3f1c2f.split("=");
        return [_0x3a62d3[0].trim(), _0x3a62d3.slice(1).join("=").trim()];
      }).filter(_0xf1ffad => _0x25f82e.includes(_0xf1ffad[0]) && !!_0xf1ffad[1]).reduce((_0x4dcb0e, _0x10210a) => (_0x4dcb0e[_0x10210a[0]] = _0x10210a[1], _0x4dcb0e), {});
    }
    function _0x2d9c77(_0x4f1563) {
      return ["get", "options", "head"].includes(_0x4f1563.toLowerCase());
    }
    function _0x5ee3f4(_0x36fff9) {
      return Object.keys(_0x36fff9).reduce((_0xa56f6e, _0x5a2e08) => (_0x5a2e08.startsWith(_0x3818c1) || _0xa56f6e.push(_0x5a2e08 + "=" + _0x36fff9[_0x5a2e08]), _0xa56f6e), []).sort((_0x4d4bbc, _0x46a846) => _0x4d4bbc === _0x46a846 ? 0 : _0x4d4bbc < _0x46a846 ? -1 : 1).join("");
    }
    function _0x222c33(_0x13a629, _0x3dbfe8 = {}, _0x52e680 = null, _0x42dab3 = "get", _0x138d98 = "json") {
      const _0x21b907 = _0x483667(_0x13a629);
      let _0x1080b0 = _0x301fe0(_0x301fe0({
        sigCatVer: _0x505edd
      }, _0x21b907), _0x3dbfe8);
      if ("json" === _0x138d98) {
        if (_0x2d9c77(_0x42dab3)) {
          _0x1080b0 = _0x301fe0(_0x301fe0({}, _0x1080b0), _0x52e680);
          return _0x5ee3f4(_0x1080b0);
        }
        const _0x49e2e9 = _0x52e680 ? "string" == typeof _0x52e680 ? _0x52e680 : JSON.stringify(_0x52e680) : "";
        return "" + _0x5ee3f4(_0x1080b0) + _0x49e2e9;
      }
      "form" === _0x138d98 && (_0x1080b0 = _0x301fe0(_0x301fe0({}, _0x1080b0), _0x52e680));
      return _0x5ee3f4(_0x1080b0);
    }
    class _0x5435bd {
      constructor(_0x14491b) {
        _0x2558af(this, "_entries", new Map());
        const _0x4f52c8 = (_0x14491b.startsWith("?") ? _0x14491b.substr(1) : _0x14491b).split("&");
        for (const _0x431879 of _0x4f52c8) {
          const [_0x39e281, _0x3d55f9] = _0x431879.split("=");
          _0x39e281 && this._entries.set(this.serializeParam(_0x39e281), this.serializeParam(null != _0x3d55f9 ? _0x3d55f9 : ""));
        }
      }
      serializeParam(_0x32f4dd) {
        return encodeURIComponent(_0x32f4dd).replace(/%20/g, "+");
      }
      delete(_0x1882bd) {
        this._entries.delete(this.serializeParam(_0x1882bd));
      }
      append(_0x38fa50, _0x4c6e32) {
        this._entries.set(this.serializeParam(_0x38fa50), this.serializeParam(null != _0x4c6e32 ? _0x4c6e32 : ""));
      }
      toString() {
        const _0x3e03fc = [...this._entries.entries()];
        if (!_0x3e03fc.length) {
          return "";
        }
        const _0x2418e2 = _0x3e03fc.reduce((_0x907277, _0x49c204) => (_0x907277.push(_0x49c204[0] + "=" + _0x49c204[1]), _0x907277), []);
        return "" + (_0x2418e2.length ? "?" : "") + _0x2418e2.join("&");
      }
      entries() {
        return [...this._entries.entries()].reduce((_0x1f148c, _0x168f2a) => {
          const [_0x3c75d8, _0x130a34] = _0x168f2a;
          _0x1f148c[_0x3c75d8] = _0x130a34;
          return _0x1f148c;
        }, {});
      }
    }
    class _0x29c6b8 {
      constructor(_0x500a8a) {
        _0x2558af(this, "protocol", "");
        _0x2558af(this, "hostname", "");
        _0x2558af(this, "port", "");
        _0x2558af(this, "pathname", "");
        _0x2558af(this, "hash", "");
        _0x2558af(this, "searchParams", new _0x5435bd(""));
        this.parseUrl(_0x500a8a);
      }
      get search() {
        var _0x129744;
        return (null == (_0x129744 = this.searchParams) ? void 0 : _0x129744.toString()) || "";
      }
      get path() {
        return this.pathname + this.search;
      }
      get host() {
        return this.port ? this.hostname + ":" + this.port : this.hostname;
      }
      get href() {
        const _0x3e8d28 = this.host ? "//" + this.host : "",
          _0x404e35 = "" + (this.pathname && !this.pathname.startsWith("/") ? "/" : "") + this.pathname;
        return this.protocol + _0x3e8d28 + _0x404e35 + this.search + this.hash;
      }
      parseUrl(_0x4f07c1) {
        let _0x30b126 = _0x4f07c1.trim();
        const _0x5e92fc = /^([a-z0-9.+-]+:)\/\//i.exec(_0x30b126);
        _0x5e92fc && (this.protocol = _0x5e92fc[1].toLowerCase(), _0x30b126 = _0x30b126.substr(_0x5e92fc[0].length));
        const _0x31da74 = _0x30b126.indexOf("#");
        -1 !== _0x31da74 && (this.hash = _0x30b126.substr(_0x31da74), _0x30b126 = _0x30b126.slice(0, _0x31da74));
        const _0x2824bb = _0x30b126.indexOf("?");
        -1 !== _0x2824bb && (this.searchParams = new _0x5435bd(_0x30b126.substr(_0x2824bb)), _0x30b126 = _0x30b126.slice(0, _0x2824bb));
        const _0x1f2023 = _0x30b126.split(/[/?#]/g),
          _0x2650af = _0x1f2023.length ? _0x1f2023[0] : "",
          _0x4c2379 = _0x30b126.replace(_0x2650af, "");
        this.pathname = _0x4c2379;
        const _0x259667 = /:([0-9]*)$/.exec(_0x2650af);
        _0x259667 && (this.port = _0x259667[1]);
        const _0x24baf8 = _0x259667 ? _0x2650af.length - _0x259667[0].length : _0x2650af.length;
        this.hostname = _0x2650af.substr(0, _0x24baf8);
      }
    }
    function _0x2cde45(_0x49ca4d = window.location.href) {
      return new _0x29c6b8(_0x49ca4d).searchParams.entries();
    }
    function _0x22d4ab(_0x4cf693, _0x3cd618) {
      var _0x5a7163, _0xf1db9f, _0x28b5b9, _0x598488, _0x381399;
      let _0x3aa666 = "/",
        _0x37dcf4 = "GET",
        _0x71ce45 = null;
      return void 0 === _0x3cd618 ? ("string" == typeof _0x4cf693 ? _0x3aa666 = _0x4cf693 : _0x4cf693 instanceof Request && (_0x3aa666 = _0x4cf693.url, _0x37dcf4 = (null != (_0x5a7163 = _0x4cf693.method) ? _0x5a7163 : "GET").toUpperCase(), _0x2d9c77(_0x37dcf4) || (_0x71ce45 = _0x4cf693.body)), {
        url: _0x3aa666,
        method: _0x37dcf4,
        query: _0x2cde45(_0x3aa666),
        data: _0x71ce45
      }) : ("string" == typeof _0x4cf693 ? (_0x3aa666 = _0x4cf693, _0x37dcf4 = (null != (_0xf1db9f = _0x3cd618.method) ? _0xf1db9f : "GET").toUpperCase()) : _0x4cf693 instanceof Request && (_0x3aa666 = null != (_0x28b5b9 = _0x4cf693.url) ? _0x28b5b9 : "/", _0x37dcf4 = (null != (_0x381399 = null != (_0x598488 = _0x3cd618.method) ? _0x598488 : _0x4cf693.method) ? _0x381399 : "GET").toUpperCase()), _0x2d9c77(_0x37dcf4) || (_0x71ce45 = _0x3cd618.body), {
        url: _0x3aa666,
        method: _0x37dcf4,
        query: _0x2cde45(_0x3aa666),
        data: _0x71ce45
      });
    }
    function _0x19c3c8(_0x5bd2e0, _0x7eed85) {
      let _0x21c5bc = _0x22d4ab(_0x5bd2e0, _0x7eed85),
        _0x4ceb3d = "json";
      return _0x222c33(_0x7eed85.cookie, _0x21c5bc.query, _0x21c5bc.data, _0x21c5bc.method, _0x4ceb3d);
    }
    const _0x2606db = {
      method: "post",
      body: {
        roundId: _0x48a988,
        index: _0xd3bbfb,
        answer: _0x28c7fe
      },
      cookie: _0x57610a
    };
    let _0x172144 = "URL: https://encourage.kuaishou.com/rest/n/encourage/game/quiz/round/answer/upload?__NS_sig3=8898dfef1b2c22c85fd45cd7d0d128dfb56897ae32da41ca33d4c7c7c1c1c2c3fcdc&sigCatVer=1",
      _0x2e76bc = _0x19c3c8(_0x172144, _0x2606db);
    return _0x2e76bc;
  }
  async next(_0x2e96bf, _0x32a0d0, _0x335f99, _0x574f1d) {
    $.log("\n\n\n" + this.idx + ":  第 " + (_0x2e96bf + 1) + " 题");
    $.log(this.idx + ": 开始查询数据库...");
    let _0x24362c = await this.checkDatabase(_0x32a0d0, _0x335f99);
    if (_0x24362c) {
      if (_0x335f99.indexOf(_0x24362c.answer) > -1) {
        let _0x3d106f = _0x335f99.indexOf(_0x24362c.answer),
          _0x59a1b1 = _0x24362c.answer;
        await $.wait($.randomInt(3, 5));
        await this.upload(_0x32a0d0, _0x335f99, _0x574f1d, _0x2e96bf, _0x59a1b1, _0x3d106f, "database");
      }
    } else {
      $.log(this.idx + ": 开始查询数据库(2)...");
      let _0x1a4be9 = await this.checkDatabase_2(_0x32a0d0, _0x335f99);
      if (_0x1a4be9 && _0x335f99.indexOf(_0x1a4be9) > -1) {
        let _0x6958fe = _0x335f99.indexOf(_0x1a4be9),
          _0x547b75 = _0x1a4be9;
        await $.wait($.randomInt(3, 5));
        await this.upload(_0x32a0d0, _0x335f99, _0x574f1d, _0x2e96bf, _0x547b75, _0x6958fe, "gpt");
      }
    }
  }
  async checkDatabase(_0x2f1e88, _0x41d8be) {
    const _0x31aeb0 = {
      method: "get",
      url: "http://81.70.196.85:7006/ksjsb/question?str=" + _0x2f1e88,
      headers: {
        "Content-Type": "application/json",
        voucherCode: kuaishou_dt_code
      }
    };
    let _0x515b27 = await $.request(_0x31aeb0);
    if (_0x515b27.code == 200) {
      $.log(this.idx + ": " + this.question + "   ❀❀❀数据库支援来了❀❀❀ ");
      $.log(this.idx + ": " + _0x515b27.message);
      return _0x515b27.data;
    } else {
      if (_0x515b27.code == 404) {
        $.log(this.idx + ": " + this.question + " 数据库没有这个题");
        $.log(this.idx + ": " + _0x515b27.message);
        return false;
      } else {
        console.log(_0x31aeb0.fn + ": 失败,  " + JSON.stringify(_0x515b27));
      }
    }
  }
  async checkDatabase_2(_0x18c3f9, _0x2ea4a1) {
    let _0x336884 = _0x18c3f9.replace("？", "?");
    const _0x1a8aad = {
      method: "post",
      url: "http://81.70.196.85:7006/ksjsb/v2/question",
      headers: {
        "Content-Type": "application/json",
        voucherCode: kuaishou_dt_code
      },
      json: {
        str: _0x336884
      }
    };
    let _0x3df69b = await $.request(_0x1a8aad);
    if (_0x3df69b.code == 200) {
      $.log(this.idx + ": " + _0x18c3f9 + "   ❀❀❀数据库(2)支援来了❀❀❀ ");
      return _0x3df69b.data;
    } else {
      if (_0x3df69b.code == 404) {
        $.log(this.idx + ": " + this.question + " 数据库(2)没有这个题");
        $.log(this.idx + ": " + _0x3df69b.message);
        return false;
      } else {
        console.log("数据库: 失败,  " + JSON.stringify(_0x3df69b));
      }
    }
  }
  async up_qs(_0x46a9fd, _0x4d3a08, _0x2f7a39, _0x530a3d) {
    const _0x3dfd15 = {
      method: "post",
      url: "http://81.70.196.85:7006/ksjsb",
      headers: {
        "Content-Type": "application/json"
      },
      json: {
        question: _0x46a9fd,
        options: _0x4d3a08,
        answer: _0x530a3d,
        roundId: _0x2f7a39
      }
    };
    let _0x129408 = await $.request(_0x3dfd15);
    if (!(_0x129408.code == 200 && _0x129408.message == "成功！")) {
      if (!(_0x129408.code == 202 && _0x129408.message == "存在重复题目")) {
        console.log(_0x3dfd15.fn + ": 失败,  " + JSON.stringify(_0x129408));
      }
    }
  }
}
!(async () => {
  if ($.read_env(UserClass)) {
    await $.userList[0].tips();
    for (let _0x14f134 of $.userList) {
      await _0x14f134.userTask();
    }
  }
})().catch(_0x1f8cb3 => console.log(_0x1f8cb3)).finally(() => $.exitNow());
function Env(_0x1fd17e) {
  return new class {
    constructor(_0x1ff7ab) {
      this.name = _0x1ff7ab;
      this.startTime = Date.now();
      this.log("[" + this.name + "]开始运行");
      this.notifyStr = [];
      this.notifyFlag = true;
      this.userIdx = 0;
      this.userList = [];
      this.userCount = 0;
    }
    async request(_0x2d6366, _0x5e7056 = "body") {
      try {
        const _0x371c82 = require("got");
        let _0x316edb = 8000,
          _0x863d36 = 2,
          _0x580ed8 = null,
          _0x162f72 = 0,
          _0x3c813d = _0x2d6366.fn || _0x2d6366.url;
        _0x2d6366.timeout = _0x2d6366.timeout || _0x316edb;
        _0x2d6366.retry = _0x2d6366.retry || {
          limit: 0
        };
        _0x2d6366.method = _0x2d6366?.["method"]?.["toUpperCase"]() || "GET";
        while (_0x162f72++ < _0x863d36) {
          try {
            _0x580ed8 = await _0x371c82(_0x2d6366);
            break;
          } catch (_0x289710) {
            _0x289710.name == "TimeoutError" ? this.log("[" + _0x3c813d + "]请求超时，重试第" + _0x162f72 + "次") : this.log("[" + _0x3c813d + "]请求错误(" + _0x289710.message + ")，重试第" + _0x162f72 + "次");
          }
        }
        if (_0x580ed8 == null) {
          return Promise.resolve({
            statusCode: "timeout",
            headers: null,
            body: null
          });
        }
        let {
          statusCode: _0xb9b835,
          headers: _0x376e92,
          body: _0x4085ba
        } = _0x580ed8;
        if (_0x4085ba) {
          try {
            _0x4085ba = JSON.parse(_0x4085ba);
          } catch {}
        }
        if (_0x5e7056 == "body") {
          return Promise.resolve(_0x4085ba);
        } else {
          if (_0x5e7056 == "cookie") {
            return Promise.resolve(_0x580ed8);
          } else {
            if (_0x5e7056 == "hd") {
              return Promise.resolve(_0x376e92);
            } else {
              if (_0x5e7056 == "all") {
                return Promise.resolve([_0x376e92, _0x4085ba]);
              } else {
                if (_0x5e7056 == "statusCode") {
                  return Promise.resolve(_0xb9b835);
                }
              }
            }
          }
        }
      } catch (_0x44c945) {
        console.log(_0x44c945);
      }
    }
    log(_0x4ce22b, _0x1e3d1c = {}) {
      typeof _0x4ce22b == "object" && (_0x4ce22b = JSON.stringify(_0x4ce22b));
      let _0x219217 = {
        console: true
      };
      Object.assign(_0x219217, _0x1e3d1c);
      if (_0x219217.time) {
        let _0x5b43f4 = _0x219217.fmt || "hh:mm:ss";
        _0x4ce22b = "[" + this.time(_0x5b43f4) + "]" + _0x4ce22b;
      }
      _0x219217.notify && this.notifyStr.push(_0x4ce22b);
      _0x219217.console && console.log(_0x4ce22b);
    }
    read_env(_0xbe0941) {
      require("dotenv").config();
      let _0x3466ed = ckNames.map(_0x6dedcc => process.env[_0x6dedcc]);
      for (let _0x236045 of _0x3466ed.filter(_0x5b544a => !!_0x5b544a)) {
        let _0xd202f8 = envSplit.filter(_0x20b2be => _0x236045.includes(_0x20b2be)),
          _0x47ca8d = _0xd202f8.length > 0 ? _0xd202f8[0] : envSplit[0];
        for (let _0x3dd7d5 of _0x236045.split(_0x47ca8d).filter(_0x1650e5 => !!_0x1650e5)) {
          this.userList.push(new _0xbe0941(_0x3dd7d5));
        }
      }
      this.userCount = this.userList.length;
      if (!this.userCount) {
        this.log("未找到变量，请检查变量" + ckNames.map(_0x5493f8 => "[" + _0x5493f8 + "]").join("或"), {
          notify: true
        });
        return false;
      }
      this.log("共找到" + this.userCount + "个账号");
      return true;
    }
    time(_0x210d14, _0x155fe3 = null) {
      let _0x254bb4 = _0x155fe3 ? new Date(_0x155fe3) : new Date(),
        _0x5f2a75 = {
          "M+": _0x254bb4.getMonth() + 1,
          "d+": _0x254bb4.getDate(),
          "h+": _0x254bb4.getHours(),
          "m+": _0x254bb4.getMinutes(),
          "s+": _0x254bb4.getSeconds(),
          "q+": Math.floor((_0x254bb4.getMonth() + 3) / 3),
          S: this.padStr(_0x254bb4.getMilliseconds(), 3)
        };
      /(y+)/.test(_0x210d14) && (_0x210d14 = _0x210d14.replace(RegExp.$1, (_0x254bb4.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0x5cb587 in _0x5f2a75) new RegExp("(" + _0x5cb587 + ")").test(_0x210d14) && (_0x210d14 = _0x210d14.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x5f2a75[_0x5cb587] : ("00" + _0x5f2a75[_0x5cb587]).substr(("" + _0x5f2a75[_0x5cb587]).length)));
      return _0x210d14;
    }
    async showmsg() {
      if (!this.notifyFlag) {
        return;
      }
      if (!this.notifyStr) {
        return;
      }
      if (!this.notifyStr.length) {
        return;
      }
      let _0x7561e = require("./sendNotify");
      this.log("\n============== 本次推送--by_yml ==============");
      await _0x7561e.sendNotify(this.name, this.notifyStr.join("\n"));
    }
    padStr(_0xe4cd08, _0x4c06fe, _0x35cdc8 = {}) {
      let _0x12c2d1 = _0x35cdc8.padding || "0",
        _0x1e934a = _0x35cdc8.mode || "l",
        _0x22c534 = String(_0xe4cd08),
        _0x26be0c = _0x4c06fe > _0x22c534.length ? _0x4c06fe - _0x22c534.length : 0,
        _0x15bdd6 = "";
      for (let _0x3afdab = 0; _0x3afdab < _0x26be0c; _0x3afdab++) {
        _0x15bdd6 += _0x12c2d1;
      }
      _0x1e934a == "r" ? _0x22c534 = _0x22c534 + _0x15bdd6 : _0x22c534 = _0x15bdd6 + _0x22c534;
      return _0x22c534;
    }
    json2str(_0x24fb36, _0x57f6c0, _0x53f209 = false) {
      let _0x77b405 = [];
      for (let _0x3b0c94 of Object.keys(_0x24fb36).sort()) {
        let _0x36dc14 = _0x24fb36[_0x3b0c94];
        if (_0x36dc14 && _0x53f209) {
          _0x36dc14 = encodeURIComponent(_0x36dc14);
        }
        _0x77b405.push(_0x3b0c94 + "=" + _0x36dc14);
      }
      return _0x77b405.join(_0x57f6c0);
    }
    str2json(_0x2fa557, _0x21552e = false) {
      let _0x338fb8 = {};
      for (let _0x5a1c55 of _0x2fa557.split("&")) {
        if (!_0x5a1c55) {
          continue;
        }
        let _0xf86d1e = _0x5a1c55.indexOf("=");
        if (_0xf86d1e == -1) {
          continue;
        }
        let _0x59d0e7 = _0x5a1c55.substr(0, _0xf86d1e),
          _0x295e25 = _0x5a1c55.substr(_0xf86d1e + 1);
        if (_0x21552e) {
          _0x295e25 = decodeURIComponent(_0x295e25);
        }
        _0x338fb8[_0x59d0e7] = _0x295e25;
      }
      return _0x338fb8;
    }
    phoneNum(_0x3eb187) {
      if (_0x3eb187.length == 11) {
        let _0x6075c3 = _0x3eb187.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
        return _0x6075c3;
      } else {
        return _0x3eb187;
      }
    }
    randomInt(_0x56c653, _0xc71983) {
      return Math.round(Math.random() * (_0xc71983 - _0x56c653) + _0x56c653);
    }
    async yiyan() {
      const _0x4eb660 = require("got");
      return new Promise(_0x5119fa => {
        (async () => {
          try {
            const _0x13ec3c = await _0x4eb660("https://v1.hitokoto.cn");
            let _0x16961 = JSON.parse(_0x13ec3c.body),
              _0x5d220f = "[一言]: " + _0x16961.hitokoto + "  by--" + _0x16961.from;
            _0x5119fa(_0x5d220f);
          } catch (_0x51a5d6) {
            console.log(_0x51a5d6.res.body);
          }
        })();
      });
    }
    ts(_0x3fe34c = false, _0x255d54 = "") {
      let _0x550ee1 = new Date(),
        _0x3b9c95 = "";
      switch (_0x3fe34c) {
        case 10:
          _0x3b9c95 = Math.round(new Date().getTime() / 1000).toString();
          break;
        case 13:
          _0x3b9c95 = Math.round(new Date().getTime()).toString();
          break;
        case "h":
          _0x3b9c95 = _0x550ee1.getHours();
          break;
        case "m":
          _0x3b9c95 = _0x550ee1.getMinutes();
          break;
        case "y":
          _0x3b9c95 = _0x550ee1.getFullYear();
          break;
        case "h":
          _0x3b9c95 = _0x550ee1.getHours();
          break;
        case "mo":
          _0x3b9c95 = _0x550ee1.getMonth();
          break;
        case "d":
          _0x3b9c95 = _0x550ee1.getDate();
          break;
        case "ts2Data":
          if (_0x255d54 != "") {
            time = _0x255d54;
            if (time.toString().length == 13) {
              let _0x43294e = new Date(time + 28800000);
              _0x3b9c95 = _0x43294e.toJSON().substr(0, 19).replace("T", " ");
            } else {
              if (time.toString().length == 10) {
                time = time * 1000;
                let _0x4835a7 = new Date(time + 28800000);
                _0x3b9c95 = _0x4835a7.toJSON().substr(0, 19).replace("T", " ");
              }
            }
          }
          break;
        default:
          _0x3b9c95 = "未知错误,请检查";
          break;
      }
      return _0x3b9c95;
    }
    randomPattern(_0x2b7ec5, _0x25772c = "abcdef0123456789") {
      let _0x2931ee = "";
      for (let _0x4c9cd6 of _0x2b7ec5) {
        if (_0x4c9cd6 == "x") {
          _0x2931ee += _0x25772c.charAt(Math.floor(Math.random() * _0x25772c.length));
        } else {
          _0x4c9cd6 == "X" ? _0x2931ee += _0x25772c.charAt(Math.floor(Math.random() * _0x25772c.length)).toUpperCase() : _0x2931ee += _0x4c9cd6;
        }
      }
      return _0x2931ee;
    }
    randomString(_0x447657, _0x293753 = "abcdef0123456789") {
      let _0x5a1b45 = "";
      for (let _0x123989 = 0; _0x123989 < _0x447657; _0x123989++) {
        _0x5a1b45 += _0x293753.charAt(Math.floor(Math.random() * _0x293753.length));
      }
      return _0x5a1b45;
    }
    randomList(_0xf7868c) {
      let _0x366403 = Math.floor(Math.random() * _0xf7868c.length);
      return _0xf7868c[_0x366403];
    }
    wait(_0x3f11ab) {
      $.log("随机等待 " + _0x3f11ab + " 秒 ...");
      return new Promise(_0x2c0be0 => setTimeout(_0x2c0be0, _0x3f11ab * 1000));
    }
    async exitNow() {
      await this.showmsg();
      let _0x5dc7cd = Date.now(),
        _0x1f3eb8 = (_0x5dc7cd - this.startTime) / 1000;
      this.log("[" + this.name + "]运行结束，共运行了" + _0x1f3eb8 + "秒");
      process.exit(0);
    }
  }(_0x1fd17e);
}