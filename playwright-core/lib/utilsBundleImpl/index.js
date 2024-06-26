"use strict";
var cf = Object.create;
var Ui = Object.defineProperty;
var uf = Object.getOwnPropertyDescriptor;
var ff = Object.getOwnPropertyNames;
var hf = Object.getPrototypeOf,
  pf = Object.prototype.hasOwnProperty;
var y = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports),
  df = (t, e) => {
    for (var i in e) Ui(t, i, { get: e[i], enumerable: !0 });
  },
  Fs = (t, e, i, r) => {
    if ((e && typeof e == "object") || typeof e == "function")
      for (let n of ff(e))
        !pf.call(t, n) &&
          n !== i &&
          Ui(t, n, {
            get: () => e[n],
            enumerable: !(r = uf(e, n)) || r.enumerable,
          });
    return t;
  };
var Te = (t, e, i) => (
    (i = t != null ? cf(hf(t)) : {}),
    Fs(
      e || !t || !t.__esModule
        ? Ui(i, "default", { value: t, enumerable: !0 })
        : i,
      t
    )
  ),
  mf = (t) => Fs(Ui({}, "__esModule", { value: !0 }), t);
var Ds = y((X0, Us) => {
  var Ms = {};
  Us.exports = Ms;
  var Ns = {
    reset: [0, 0],
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    gray: [90, 39],
    grey: [90, 39],
    brightRed: [91, 39],
    brightGreen: [92, 39],
    brightYellow: [93, 39],
    brightBlue: [94, 39],
    brightMagenta: [95, 39],
    brightCyan: [96, 39],
    brightWhite: [97, 39],
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    bgGray: [100, 49],
    bgGrey: [100, 49],
    bgBrightRed: [101, 49],
    bgBrightGreen: [102, 49],
    bgBrightYellow: [103, 49],
    bgBrightBlue: [104, 49],
    bgBrightMagenta: [105, 49],
    bgBrightCyan: [106, 49],
    bgBrightWhite: [107, 49],
    blackBG: [40, 49],
    redBG: [41, 49],
    greenBG: [42, 49],
    yellowBG: [43, 49],
    blueBG: [44, 49],
    magentaBG: [45, 49],
    cyanBG: [46, 49],
    whiteBG: [47, 49],
  };
  Object.keys(Ns).forEach(function (t) {
    var e = Ns[t],
      i = (Ms[t] = []);
    (i.open = "\x1B[" + e[0] + "m"), (i.close = "\x1B[" + e[1] + "m");
  });
});
var qs = y((J0, js) => {
  "use strict";
  js.exports = function (t, e) {
    e = e || process.argv;
    var i = e.indexOf("--"),
      r = /^-{1,2}/.test(t) ? "" : "--",
      n = e.indexOf(r + t);
    return n !== -1 && (i === -1 ? !0 : n < i);
  };
});
var Vs = y((Q0, Hs) => {
  "use strict";
  var gf = require("os"),
    Qe = qs(),
    je = process.env,
    Mt = void 0;
  Qe("no-color") || Qe("no-colors") || Qe("color=false")
    ? (Mt = !1)
    : (Qe("color") || Qe("colors") || Qe("color=true") || Qe("color=always")) &&
      (Mt = !0);
  "FORCE_COLOR" in je &&
    (Mt = je.FORCE_COLOR.length === 0 || parseInt(je.FORCE_COLOR, 10) !== 0);
  function vf(t) {
    return t === 0
      ? !1
      : { level: t, hasBasic: !0, has256: t >= 2, has16m: t >= 3 };
  }
  function xf(t) {
    if (Mt === !1) return 0;
    if (Qe("color=16m") || Qe("color=full") || Qe("color=truecolor")) return 3;
    if (Qe("color=256")) return 2;
    if (t && !t.isTTY && Mt !== !0) return 0;
    var e = Mt ? 1 : 0;
    if (process.platform === "win32") {
      var i = gf.release().split(".");
      return Number(process.versions.node.split(".")[0]) >= 8 &&
        Number(i[0]) >= 10 &&
        Number(i[2]) >= 10586
        ? Number(i[2]) >= 14931
          ? 3
          : 2
        : 1;
    }
    if ("CI" in je)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(function (n) {
        return n in je;
      }) || je.CI_NAME === "codeship"
        ? 1
        : e;
    if ("TEAMCITY_VERSION" in je)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(je.TEAMCITY_VERSION) ? 1 : 0;
    if ("TERM_PROGRAM" in je) {
      var r = parseInt((je.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (je.TERM_PROGRAM) {
        case "iTerm.app":
          return r >= 3 ? 3 : 2;
        case "Hyper":
          return 3;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(je.TERM)
      ? 2
      : /^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(je.TERM) ||
        "COLORTERM" in je
      ? 1
      : (je.TERM === "dumb", e);
  }
  function br(t) {
    var e = xf(t);
    return vf(e);
  }
  Hs.exports = {
    supportsColor: br,
    stdout: br(process.stdout),
    stderr: br(process.stderr),
  };
});
var Gs = y((eg, $s) => {
  $s.exports = function (e, i) {
    var r = "";
    (e = e || "Run the trap, drop the bass"), (e = e.split(""));
    var n = {
      a: ["@", "\u0104", "\u023A", "\u0245", "\u0394", "\u039B", "\u0414"],
      b: ["\xDF", "\u0181", "\u0243", "\u026E", "\u03B2", "\u0E3F"],
      c: ["\xA9", "\u023B", "\u03FE"],
      d: ["\xD0", "\u018A", "\u0500", "\u0501", "\u0502", "\u0503"],
      e: [
        "\xCB",
        "\u0115",
        "\u018E",
        "\u0258",
        "\u03A3",
        "\u03BE",
        "\u04BC",
        "\u0A6C",
      ],
      f: ["\u04FA"],
      g: ["\u0262"],
      h: ["\u0126", "\u0195", "\u04A2", "\u04BA", "\u04C7", "\u050A"],
      i: ["\u0F0F"],
      j: ["\u0134"],
      k: ["\u0138", "\u04A0", "\u04C3", "\u051E"],
      l: ["\u0139"],
      m: ["\u028D", "\u04CD", "\u04CE", "\u0520", "\u0521", "\u0D69"],
      n: ["\xD1", "\u014B", "\u019D", "\u0376", "\u03A0", "\u048A"],
      o: [
        "\xD8",
        "\xF5",
        "\xF8",
        "\u01FE",
        "\u0298",
        "\u047A",
        "\u05DD",
        "\u06DD",
        "\u0E4F",
      ],
      p: ["\u01F7", "\u048E"],
      q: ["\u09CD"],
      r: ["\xAE", "\u01A6", "\u0210", "\u024C", "\u0280", "\u042F"],
      s: ["\xA7", "\u03DE", "\u03DF", "\u03E8"],
      t: ["\u0141", "\u0166", "\u0373"],
      u: ["\u01B1", "\u054D"],
      v: ["\u05D8"],
      w: ["\u0428", "\u0460", "\u047C", "\u0D70"],
      x: ["\u04B2", "\u04FE", "\u04FC", "\u04FD"],
      y: ["\xA5", "\u04B0", "\u04CB"],
      z: ["\u01B5", "\u0240"],
    };
    return (
      e.forEach(function (s) {
        s = s.toLowerCase();
        var o = n[s] || [" "],
          l = Math.floor(Math.random() * o.length);
        typeof n[s] != "undefined" ? (r += n[s][l]) : (r += s);
      }),
      r
    );
  };
});
var Ws = y((tg, zs) => {
  zs.exports = function (e, i) {
    e = e || "   he is here   ";
    var r = {
        up: [
          "\u030D",
          "\u030E",
          "\u0304",
          "\u0305",
          "\u033F",
          "\u0311",
          "\u0306",
          "\u0310",
          "\u0352",
          "\u0357",
          "\u0351",
          "\u0307",
          "\u0308",
          "\u030A",
          "\u0342",
          "\u0313",
          "\u0308",
          "\u034A",
          "\u034B",
          "\u034C",
          "\u0303",
          "\u0302",
          "\u030C",
          "\u0350",
          "\u0300",
          "\u0301",
          "\u030B",
          "\u030F",
          "\u0312",
          "\u0313",
          "\u0314",
          "\u033D",
          "\u0309",
          "\u0363",
          "\u0364",
          "\u0365",
          "\u0366",
          "\u0367",
          "\u0368",
          "\u0369",
          "\u036A",
          "\u036B",
          "\u036C",
          "\u036D",
          "\u036E",
          "\u036F",
          "\u033E",
          "\u035B",
          "\u0346",
          "\u031A",
        ],
        down: [
          "\u0316",
          "\u0317",
          "\u0318",
          "\u0319",
          "\u031C",
          "\u031D",
          "\u031E",
          "\u031F",
          "\u0320",
          "\u0324",
          "\u0325",
          "\u0326",
          "\u0329",
          "\u032A",
          "\u032B",
          "\u032C",
          "\u032D",
          "\u032E",
          "\u032F",
          "\u0330",
          "\u0331",
          "\u0332",
          "\u0333",
          "\u0339",
          "\u033A",
          "\u033B",
          "\u033C",
          "\u0345",
          "\u0347",
          "\u0348",
          "\u0349",
          "\u034D",
          "\u034E",
          "\u0353",
          "\u0354",
          "\u0355",
          "\u0356",
          "\u0359",
          "\u035A",
          "\u0323",
        ],
        mid: [
          "\u0315",
          "\u031B",
          "\u0300",
          "\u0301",
          "\u0358",
          "\u0321",
          "\u0322",
          "\u0327",
          "\u0328",
          "\u0334",
          "\u0335",
          "\u0336",
          "\u035C",
          "\u035D",
          "\u035E",
          "\u035F",
          "\u0360",
          "\u0362",
          "\u0338",
          "\u0337",
          "\u0361",
          " \u0489",
        ],
      },
      n = [].concat(r.up, r.down, r.mid);
    function s(a) {
      var c = Math.floor(Math.random() * a);
      return c;
    }
    function o(a) {
      var c = !1;
      return (
        n.filter(function (u) {
          c = u === a;
        }),
        c
      );
    }
    function l(a, c) {
      var u = "",
        f,
        h;
      (c = c || {}),
        (c.up = typeof c.up != "undefined" ? c.up : !0),
        (c.mid = typeof c.mid != "undefined" ? c.mid : !0),
        (c.down = typeof c.down != "undefined" ? c.down : !0),
        (c.size = typeof c.size != "undefined" ? c.size : "maxi"),
        (a = a.split(""));
      for (h in a)
        if (!o(h)) {
          switch (((u = u + a[h]), (f = { up: 0, down: 0, mid: 0 }), c.size)) {
            case "mini":
              (f.up = s(8)), (f.mid = s(2)), (f.down = s(8));
              break;
            case "maxi":
              (f.up = s(16) + 3), (f.mid = s(4) + 1), (f.down = s(64) + 3);
              break;
            default:
              (f.up = s(8) + 1), (f.mid = s(6) / 2), (f.down = s(8) + 1);
              break;
          }
          var p = ["up", "mid", "down"];
          for (var d in p)
            for (var m = p[d], v = 0; v <= f[m]; v++)
              c[m] && (u = u + r[m][s(r[m].length)]);
        }
      return u;
    }
    return l(e, i);
  };
});
var Ks = y((ig, Ys) => {
  Ys.exports = function (t) {
    return function (e, i, r) {
      if (e === " ") return e;
      switch (i % 3) {
        case 0:
          return t.red(e);
        case 1:
          return t.white(e);
        case 2:
          return t.blue(e);
      }
    };
  };
});
var Xs = y((rg, Zs) => {
  Zs.exports = function (t) {
    return function (e, i, r) {
      return i % 2 === 0 ? e : t.inverse(e);
    };
  };
});
var Qs = y((ng, Js) => {
  Js.exports = function (t) {
    var e = ["red", "yellow", "green", "blue", "magenta"];
    return function (i, r, n) {
      return i === " " ? i : t[e[r++ % e.length]](i);
    };
  };
});
var to = y((sg, eo) => {
  eo.exports = function (t) {
    var e = [
      "underline",
      "inverse",
      "grey",
      "yellow",
      "red",
      "green",
      "blue",
      "white",
      "cyan",
      "magenta",
      "brightYellow",
      "brightRed",
      "brightGreen",
      "brightBlue",
      "brightWhite",
      "brightCyan",
      "brightMagenta",
    ];
    return function (i, r, n) {
      return i === " "
        ? i
        : t[e[Math.round(Math.random() * (e.length - 2))]](i);
    };
  };
});
var ao = y((ag, oo) => {
  var oe = {};
  oo.exports = oe;
  oe.themes = {};
  var _f = require("util"),
    bt = (oe.styles = Ds()),
    ro = Object.defineProperties,
    yf = new RegExp(/[\r\n]+/g);
  oe.supportsColor = Vs().supportsColor;
  typeof oe.enabled == "undefined" && (oe.enabled = oe.supportsColor() !== !1);
  oe.enable = function () {
    oe.enabled = !0;
  };
  oe.disable = function () {
    oe.enabled = !1;
  };
  oe.stripColors = oe.strip = function (t) {
    return ("" + t).replace(/\x1B\[\d+m/g, "");
  };
  var og = (oe.stylize = function (e, i) {
      if (!oe.enabled) return e + "";
      var r = bt[i];
      return !r && i in oe ? oe[i](e) : r.open + e + r.close;
    }),
    bf = /[|\\{}()[\]^$+*?.]/g,
    wf = function (t) {
      if (typeof t != "string") throw new TypeError("Expected a string");
      return t.replace(bf, "\\$&");
    };
  function no(t) {
    var e = function i() {
      return Sf.apply(i, arguments);
    };
    return (e._styles = t), (e.__proto__ = Ef), e;
  }
  var so = (function () {
      var t = {};
      return (
        (bt.grey = bt.gray),
        Object.keys(bt).forEach(function (e) {
          (bt[e].closeRe = new RegExp(wf(bt[e].close), "g")),
            (t[e] = {
              get: function () {
                return no(this._styles.concat(e));
              },
            });
        }),
        t
      );
    })(),
    Ef = ro(function () {}, so);
  function Sf() {
    var t = Array.prototype.slice.call(arguments),
      e = t
        .map(function (o) {
          return o != null && o.constructor === String ? o : _f.inspect(o);
        })
        .join(" ");
    if (!oe.enabled || !e) return e;
    for (
      var i =
          e.indexOf(`
`) != -1,
        r = this._styles,
        n = r.length;
      n--;

    ) {
      var s = bt[r[n]];
      (e = s.open + e.replace(s.closeRe, s.open) + s.close),
        i &&
          (e = e.replace(yf, function (o) {
            return s.close + o + s.open;
          }));
    }
    return e;
  }
  oe.setTheme = function (t) {
    if (typeof t == "string") {
      console.log(
        "colors.setTheme now only accepts an object, not a string.  If you are trying to set a theme from a file, it is now your (the caller's) responsibility to require the file.  The old syntax looked like colors.setTheme(__dirname + '/../themes/generic-logging.js'); The new syntax looks like colors.setTheme(require(__dirname + '/../themes/generic-logging.js'));"
      );
      return;
    }
    for (var e in t)
      (function (i) {
        oe[i] = function (r) {
          if (typeof t[i] == "object") {
            var n = r;
            for (var s in t[i]) n = oe[t[i][s]](n);
            return n;
          }
          return oe[t[i]](r);
        };
      })(e);
  };
  function kf() {
    var t = {};
    return (
      Object.keys(so).forEach(function (e) {
        t[e] = {
          get: function () {
            return no([e]);
          },
        };
      }),
      t
    );
  }
  var Cf = function (e, i) {
    var r = i.split("");
    return (r = r.map(e)), r.join("");
  };
  oe.trap = Gs();
  oe.zalgo = Ws();
  oe.maps = {};
  oe.maps.america = Ks()(oe);
  oe.maps.zebra = Xs()(oe);
  oe.maps.rainbow = Qs()(oe);
  oe.maps.random = to()(oe);
  for (io in oe.maps)
    (function (t) {
      oe[t] = function (e) {
        return Cf(oe.maps[t], e);
      };
    })(io);
  var io;
  ro(oe, kf());
});
var co = y((lg, lo) => {
  var Of = ao();
  lo.exports = Of;
});
var fo = y((cg, uo) => {
  var Ut = 1e3,
    Dt = Ut * 60,
    jt = Dt * 60,
    wt = jt * 24,
    If = wt * 7,
    Tf = wt * 365.25;
  uo.exports = function (t, e) {
    e = e || {};
    var i = typeof t;
    if (i === "string" && t.length > 0) return Af(t);
    if (i === "number" && isFinite(t)) return e.long ? Bf(t) : Rf(t);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" +
        JSON.stringify(t)
    );
  };
  function Af(t) {
    if (((t = String(t)), !(t.length > 100))) {
      var e =
        /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          t
        );
      if (e) {
        var i = parseFloat(e[1]),
          r = (e[2] || "ms").toLowerCase();
        switch (r) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return i * Tf;
          case "weeks":
          case "week":
          case "w":
            return i * If;
          case "days":
          case "day":
          case "d":
            return i * wt;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return i * jt;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return i * Dt;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return i * Ut;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return i;
          default:
            return;
        }
      }
    }
  }
  function Rf(t) {
    var e = Math.abs(t);
    return e >= wt
      ? Math.round(t / wt) + "d"
      : e >= jt
      ? Math.round(t / jt) + "h"
      : e >= Dt
      ? Math.round(t / Dt) + "m"
      : e >= Ut
      ? Math.round(t / Ut) + "s"
      : t + "ms";
  }
  function Bf(t) {
    var e = Math.abs(t);
    return e >= wt
      ? Di(t, e, wt, "day")
      : e >= jt
      ? Di(t, e, jt, "hour")
      : e >= Dt
      ? Di(t, e, Dt, "minute")
      : e >= Ut
      ? Di(t, e, Ut, "second")
      : t + " ms";
  }
  function Di(t, e, i, r) {
    var n = e >= i * 1.5;
    return Math.round(t / i) + " " + r + (n ? "s" : "");
  }
});
var wr = y((ug, ho) => {
  function Lf(t) {
    (i.debug = i),
      (i.default = i),
      (i.coerce = a),
      (i.disable = s),
      (i.enable = n),
      (i.enabled = o),
      (i.humanize = fo()),
      (i.destroy = c),
      Object.keys(t).forEach((u) => {
        i[u] = t[u];
      }),
      (i.names = []),
      (i.skips = []),
      (i.formatters = {});
    function e(u) {
      let f = 0;
      for (let h = 0; h < u.length; h++)
        (f = (f << 5) - f + u.charCodeAt(h)), (f |= 0);
      return i.colors[Math.abs(f) % i.colors.length];
    }
    i.selectColor = e;
    function i(u) {
      let f,
        h = null,
        p,
        d;
      function m(...v) {
        if (!m.enabled) return;
        let E = m,
          I = Number(new Date()),
          w = I - (f || I);
        (E.diff = w),
          (E.prev = f),
          (E.curr = I),
          (f = I),
          (v[0] = i.coerce(v[0])),
          typeof v[0] != "string" && v.unshift("%O");
        let C = 0;
        (v[0] = v[0].replace(/%([a-zA-Z%])/g, ($, k) => {
          if ($ === "%%") return "%";
          C++;
          let U = i.formatters[k];
          if (typeof U == "function") {
            let b = v[C];
            ($ = U.call(E, b)), v.splice(C, 1), C--;
          }
          return $;
        })),
          i.formatArgs.call(E, v),
          (E.log || i.log).apply(E, v);
      }
      return (
        (m.namespace = u),
        (m.useColors = i.useColors()),
        (m.color = i.selectColor(u)),
        (m.extend = r),
        (m.destroy = i.destroy),
        Object.defineProperty(m, "enabled", {
          enumerable: !0,
          configurable: !1,
          get: () =>
            h !== null
              ? h
              : (p !== i.namespaces && ((p = i.namespaces), (d = i.enabled(u))),
                d),
          set: (v) => {
            h = v;
          },
        }),
        typeof i.init == "function" && i.init(m),
        m
      );
    }
    function r(u, f) {
      let h = i(this.namespace + (typeof f == "undefined" ? ":" : f) + u);
      return (h.log = this.log), h;
    }
    function n(u) {
      i.save(u), (i.namespaces = u), (i.names = []), (i.skips = []);
      let f,
        h = (typeof u == "string" ? u : "").split(/[\s,]+/),
        p = h.length;
      for (f = 0; f < p; f++)
        h[f] &&
          ((u = h[f].replace(/\*/g, ".*?")),
          u[0] === "-"
            ? i.skips.push(new RegExp("^" + u.slice(1) + "$"))
            : i.names.push(new RegExp("^" + u + "$")));
    }
    function s() {
      let u = [...i.names.map(l), ...i.skips.map(l).map((f) => "-" + f)].join(
        ","
      );
      return i.enable(""), u;
    }
    function o(u) {
      if (u[u.length - 1] === "*") return !0;
      let f, h;
      for (f = 0, h = i.skips.length; f < h; f++)
        if (i.skips[f].test(u)) return !1;
      for (f = 0, h = i.names.length; f < h; f++)
        if (i.names[f].test(u)) return !0;
      return !1;
    }
    function l(u) {
      return u
        .toString()
        .substring(2, u.toString().length - 2)
        .replace(/\.\*\?$/, "*");
    }
    function a(u) {
      return u instanceof Error ? u.stack || u.message : u;
    }
    function c() {
      console.warn(
        "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
      );
    }
    return i.enable(i.load()), i;
  }
  ho.exports = Lf;
});
var po = y(($e, ji) => {
  $e.formatArgs = Ff;
  $e.save = Nf;
  $e.load = Mf;
  $e.useColors = Pf;
  $e.storage = Uf();
  $e.destroy = (() => {
    let t = !1;
    return () => {
      t ||
        ((t = !0),
        console.warn(
          "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
        ));
    };
  })();
  $e.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33",
  ];
  function Pf() {
    return typeof window != "undefined" &&
      window.process &&
      (window.process.type === "renderer" || window.process.__nwjs)
      ? !0
      : typeof navigator != "undefined" &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
      ? !1
      : (typeof document != "undefined" &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) ||
        (typeof window != "undefined" &&
          window.console &&
          (window.console.firebug ||
            (window.console.exception && window.console.table))) ||
        (typeof navigator != "undefined" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
          parseInt(RegExp.$1, 10) >= 31) ||
        (typeof navigator != "undefined" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }
  function Ff(t) {
    if (
      ((t[0] =
        (this.useColors ? "%c" : "") +
        this.namespace +
        (this.useColors ? " %c" : " ") +
        t[0] +
        (this.useColors ? "%c " : " ") +
        "+" +
        ji.exports.humanize(this.diff)),
      !this.useColors)
    )
      return;
    let e = "color: " + this.color;
    t.splice(1, 0, e, "color: inherit");
    let i = 0,
      r = 0;
    t[0].replace(/%[a-zA-Z%]/g, (n) => {
      n !== "%%" && (i++, n === "%c" && (r = i));
    }),
      t.splice(r, 0, e);
  }
  $e.log = console.debug || console.log || (() => {});
  function Nf(t) {
    try {
      t ? $e.storage.setItem("debug", t) : $e.storage.removeItem("debug");
    } catch {}
  }
  function Mf() {
    let t;
    try {
      t = $e.storage.getItem("debug");
    } catch {}
    return (
      !t &&
        typeof process != "undefined" &&
        "env" in process &&
        (t = process.env.DEBUG),
      t
    );
  }
  function Uf() {
    try {
      return localStorage;
    } catch {}
  }
  ji.exports = wr()($e);
  var { formatters: Df } = ji.exports;
  Df.j = function (t) {
    try {
      return JSON.stringify(t);
    } catch (e) {
      return "[UnexpectedJSONParseError]: " + e.message;
    }
  };
});
var go = y((fg, mo) => {
  "use strict";
  mo.exports = (t, e) => {
    e = e || process.argv;
    let i = t.startsWith("-") ? "" : t.length === 1 ? "-" : "--",
      r = e.indexOf(i + t),
      n = e.indexOf("--");
    return r !== -1 && (n === -1 ? !0 : r < n);
  };
});
var xo = y((hg, vo) => {
  "use strict";
  var jf = require("os"),
    et = go(),
    Me = process.env,
    qt;
  et("no-color") || et("no-colors") || et("color=false")
    ? (qt = !1)
    : (et("color") || et("colors") || et("color=true") || et("color=always")) &&
      (qt = !0);
  "FORCE_COLOR" in Me &&
    (qt = Me.FORCE_COLOR.length === 0 || parseInt(Me.FORCE_COLOR, 10) !== 0);
  function qf(t) {
    return t === 0
      ? !1
      : { level: t, hasBasic: !0, has256: t >= 2, has16m: t >= 3 };
  }
  function Hf(t) {
    if (qt === !1) return 0;
    if (et("color=16m") || et("color=full") || et("color=truecolor")) return 3;
    if (et("color=256")) return 2;
    if (t && !t.isTTY && qt !== !0) return 0;
    let e = qt ? 1 : 0;
    if (process.platform === "win32") {
      let i = jf.release().split(".");
      return Number(process.versions.node.split(".")[0]) >= 8 &&
        Number(i[0]) >= 10 &&
        Number(i[2]) >= 10586
        ? Number(i[2]) >= 14931
          ? 3
          : 2
        : 1;
    }
    if ("CI" in Me)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(
        (i) => i in Me
      ) || Me.CI_NAME === "codeship"
        ? 1
        : e;
    if ("TEAMCITY_VERSION" in Me)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(Me.TEAMCITY_VERSION) ? 1 : 0;
    if (Me.COLORTERM === "truecolor") return 3;
    if ("TERM_PROGRAM" in Me) {
      let i = parseInt((Me.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (Me.TERM_PROGRAM) {
        case "iTerm.app":
          return i >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(Me.TERM)
      ? 2
      : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
          Me.TERM
        ) || "COLORTERM" in Me
      ? 1
      : (Me.TERM === "dumb", e);
  }
  function Er(t) {
    let e = Hf(t);
    return qf(e);
  }
  vo.exports = {
    supportsColor: Er,
    stdout: Er(process.stdout),
    stderr: Er(process.stderr),
  };
});
var yo = y((Pe, Hi) => {
  var Vf = require("tty"),
    qi = require("util");
  Pe.init = Zf;
  Pe.log = Wf;
  Pe.formatArgs = Gf;
  Pe.save = Yf;
  Pe.load = Kf;
  Pe.useColors = $f;
  Pe.destroy = qi.deprecate(() => {},
  "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  Pe.colors = [6, 2, 3, 4, 5, 1];
  try {
    let t = xo();
    t &&
      (t.stderr || t).level >= 2 &&
      (Pe.colors = [
        20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63,
        68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128,
        129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168,
        169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200,
        201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221,
      ]);
  } catch {}
  Pe.inspectOpts = Object.keys(process.env)
    .filter((t) => /^debug_/i.test(t))
    .reduce((t, e) => {
      let i = e
          .substring(6)
          .toLowerCase()
          .replace(/_([a-z])/g, (n, s) => s.toUpperCase()),
        r = process.env[e];
      return (
        /^(yes|on|true|enabled)$/i.test(r)
          ? (r = !0)
          : /^(no|off|false|disabled)$/i.test(r)
          ? (r = !1)
          : r === "null"
          ? (r = null)
          : (r = Number(r)),
        (t[i] = r),
        t
      );
    }, {});
  function $f() {
    return "colors" in Pe.inspectOpts
      ? !!Pe.inspectOpts.colors
      : Vf.isatty(process.stderr.fd);
  }
  function Gf(t) {
    let { namespace: e, useColors: i } = this;
    if (i) {
      let r = this.color,
        n = "\x1B[3" + (r < 8 ? r : "8;5;" + r),
        s = `  ${n};1m${e} \x1B[0m`;
      (t[0] =
        s +
        t[0]
          .split(
            `
`
          )
          .join(
            `
` + s
          )),
        t.push(n + "m+" + Hi.exports.humanize(this.diff) + "\x1B[0m");
    } else t[0] = zf() + e + " " + t[0];
  }
  function zf() {
    return Pe.inspectOpts.hideDate ? "" : new Date().toISOString() + " ";
  }
  function Wf(...t) {
    return process.stderr.write(
      qi.format(...t) +
        `
`
    );
  }
  function Yf(t) {
    t ? (process.env.DEBUG = t) : delete process.env.DEBUG;
  }
  function Kf() {
    return process.env.DEBUG;
  }
  function Zf(t) {
    t.inspectOpts = {};
    let e = Object.keys(Pe.inspectOpts);
    for (let i = 0; i < e.length; i++)
      t.inspectOpts[e[i]] = Pe.inspectOpts[e[i]];
  }
  Hi.exports = wr()(Pe);
  var { formatters: _o } = Hi.exports;
  _o.o = function (t) {
    return (
      (this.inspectOpts.colors = this.useColors),
      qi
        .inspect(t, this.inspectOpts)
        .split(
          `
`
        )
        .map((e) => e.trim())
        .join(" ")
    );
  };
  _o.O = function (t) {
    return (
      (this.inspectOpts.colors = this.useColors),
      qi.inspect(t, this.inspectOpts)
    );
  };
});
var Ht = y((pg, Sr) => {
  typeof process == "undefined" ||
  process.type === "renderer" ||
  process.browser === !0 ||
  process.__nwjs
    ? (Sr.exports = po())
    : (Sr.exports = yo());
});
var wo = y((bo) => {
  "use strict";
  var Xf = require("url").parse,
    Jf = { ftp: 21, gopher: 70, http: 80, https: 443, ws: 80, wss: 443 },
    Qf =
      String.prototype.endsWith ||
      function (t) {
        return (
          t.length <= this.length &&
          this.indexOf(t, this.length - t.length) !== -1
        );
      };
  function eh(t) {
    var e = typeof t == "string" ? Xf(t) : t || {},
      i = e.protocol,
      r = e.host,
      n = e.port;
    if (
      typeof r != "string" ||
      !r ||
      typeof i != "string" ||
      ((i = i.split(":", 1)[0]),
      (r = r.replace(/:\d*$/, "")),
      (n = parseInt(n) || Jf[i] || 0),
      !th(r, n))
    )
      return "";
    var s =
      Vt("npm_config_" + i + "_proxy") ||
      Vt(i + "_proxy") ||
      Vt("npm_config_proxy") ||
      Vt("all_proxy");
    return s && s.indexOf("://") === -1 && (s = i + "://" + s), s;
  }
  function th(t, e) {
    var i = (Vt("npm_config_no_proxy") || Vt("no_proxy")).toLowerCase();
    return i
      ? i === "*"
        ? !1
        : i.split(/[,\s]/).every(function (r) {
            if (!r) return !0;
            var n = r.match(/^(.+):(\d+)$/),
              s = n ? n[1] : r,
              o = n ? parseInt(n[2]) : 0;
            return o && o !== e
              ? !0
              : /^[.*]/.test(s)
              ? (s.charAt(0) === "*" && (s = s.slice(1)), !Qf.call(t, s))
              : t !== s;
          })
      : !0;
  }
  function Vt(t) {
    return process.env[t.toLowerCase()] || process.env[t.toUpperCase()] || "";
  }
  bo.getProxyForUrl = eh;
});
var Eo = y((kr) => {
  "use strict";
  Object.defineProperty(kr, "__esModule", { value: !0 });
  function ih(t) {
    return function (e, i) {
      return new Promise((r, n) => {
        t.call(this, e, i, (s, o) => {
          s ? n(s) : r(o);
        });
      });
    };
  }
  kr.default = ih;
});
var Ir = y((Or, ko) => {
  "use strict";
  var So =
      (Or && Or.__importDefault) ||
      function (t) {
        return t && t.__esModule ? t : { default: t };
      },
    rh = require("events"),
    nh = So(Ht()),
    sh = So(Eo()),
    gi = nh.default("agent-base");
  function oh(t) {
    return !!t && typeof t.addRequest == "function";
  }
  function Cr() {
    let { stack: t } = new Error();
    return typeof t != "string"
      ? !1
      : t
          .split(
            `
`
          )
          .some(
            (e) =>
              e.indexOf("(https.js:") !== -1 || e.indexOf("node:https:") !== -1
          );
  }
  function Vi(t, e) {
    return new Vi.Agent(t, e);
  }
  (function (t) {
    class e extends rh.EventEmitter {
      constructor(r, n) {
        super();
        let s = n;
        typeof r == "function" ? (this.callback = r) : r && (s = r),
          (this.timeout = null),
          s && typeof s.timeout == "number" && (this.timeout = s.timeout),
          (this.maxFreeSockets = 1),
          (this.maxSockets = 1),
          (this.maxTotalSockets = 1 / 0),
          (this.sockets = {}),
          (this.freeSockets = {}),
          (this.requests = {}),
          (this.options = {});
      }
      get defaultPort() {
        return typeof this.explicitDefaultPort == "number"
          ? this.explicitDefaultPort
          : Cr()
          ? 443
          : 80;
      }
      set defaultPort(r) {
        this.explicitDefaultPort = r;
      }
      get protocol() {
        return typeof this.explicitProtocol == "string"
          ? this.explicitProtocol
          : Cr()
          ? "https:"
          : "http:";
      }
      set protocol(r) {
        this.explicitProtocol = r;
      }
      callback(r, n, s) {
        throw new Error(
          '"agent-base" has no default implementation, you must subclass and override `callback()`'
        );
      }
      addRequest(r, n) {
        let s = Object.assign({}, n);
        typeof s.secureEndpoint != "boolean" && (s.secureEndpoint = Cr()),
          s.host == null && (s.host = "localhost"),
          s.port == null && (s.port = s.secureEndpoint ? 443 : 80),
          s.protocol == null &&
            (s.protocol = s.secureEndpoint ? "https:" : "http:"),
          s.host && s.path && delete s.path,
          delete s.agent,
          delete s.hostname,
          delete s._defaultAgent,
          delete s.defaultPort,
          delete s.createConnection,
          (r._last = !0),
          (r.shouldKeepAlive = !1);
        let o = !1,
          l = null,
          a = s.timeout || this.timeout,
          c = (p) => {
            r._hadError || (r.emit("error", p), (r._hadError = !0));
          },
          u = () => {
            (l = null), (o = !0);
            let p = new Error(
              `A "socket" was not created for HTTP request before ${a}ms`
            );
            (p.code = "ETIMEOUT"), c(p);
          },
          f = (p) => {
            o || (l !== null && (clearTimeout(l), (l = null)), c(p));
          },
          h = (p) => {
            if (o) return;
            if ((l != null && (clearTimeout(l), (l = null)), oh(p))) {
              gi(
                "Callback returned another Agent instance %o",
                p.constructor.name
              ),
                p.addRequest(r, s);
              return;
            }
            if (p) {
              p.once("free", () => {
                this.freeSocket(p, s);
              }),
                r.onSocket(p);
              return;
            }
            let d = new Error(
              `no Duplex stream was returned to agent-base for \`${r.method} ${r.path}\``
            );
            c(d);
          };
        if (typeof this.callback != "function") {
          c(new Error("`callback` is not defined"));
          return;
        }
        this.promisifiedCallback ||
          (this.callback.length >= 3
            ? (gi("Converting legacy callback function to promise"),
              (this.promisifiedCallback = sh.default(this.callback)))
            : (this.promisifiedCallback = this.callback)),
          typeof a == "number" && a > 0 && (l = setTimeout(u, a)),
          "port" in s && typeof s.port != "number" && (s.port = Number(s.port));
        try {
          gi(
            "Resolving socket for %o request: %o",
            s.protocol,
            `${r.method} ${r.path}`
          ),
            Promise.resolve(this.promisifiedCallback(r, s)).then(h, f);
        } catch (p) {
          Promise.reject(p).catch(f);
        }
      }
      freeSocket(r, n) {
        gi("Freeing socket %o %o", r.constructor.name, n), r.destroy();
      }
      destroy() {
        gi("Destroying agent %o", this.constructor.name);
      }
    }
    (t.Agent = e), (t.prototype = t.Agent.prototype);
  })(Vi || (Vi = {}));
  ko.exports = Vi;
});
var Co = y((xi) => {
  "use strict";
  var ah =
    (xi && xi.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t };
    };
  Object.defineProperty(xi, "__esModule", { value: !0 });
  var lh = ah(Ht()),
    vi = lh.default("https-proxy-agent:parse-proxy-response");
  function ch(t) {
    return new Promise((e, i) => {
      let r = 0,
        n = [];
      function s() {
        let f = t.read();
        f ? u(f) : t.once("readable", s);
      }
      function o() {
        t.removeListener("end", a),
          t.removeListener("error", c),
          t.removeListener("close", l),
          t.removeListener("readable", s);
      }
      function l(f) {
        vi("onclose had error %o", f);
      }
      function a() {
        vi("onend");
      }
      function c(f) {
        o(), vi("onerror %o", f), i(f);
      }
      function u(f) {
        n.push(f), (r += f.length);
        let h = Buffer.concat(n, r);
        if (
          h.indexOf(`\r
\r
`) === -1
        ) {
          vi("have not received end of HTTP headers yet..."), s();
          return;
        }
        let d = h.toString(
            "ascii",
            0,
            h.indexOf(`\r
`)
          ),
          m = +d.split(" ")[1];
        vi("got proxy server response: %o", d),
          e({ statusCode: m, buffered: h });
      }
      t.on("error", c), t.on("close", l), t.on("end", a), s();
    });
  }
  xi.default = ch;
});
var To = y((Et) => {
  "use strict";
  var uh =
      (Et && Et.__awaiter) ||
      function (t, e, i, r) {
        function n(s) {
          return s instanceof i
            ? s
            : new i(function (o) {
                o(s);
              });
        }
        return new (i || (i = Promise))(function (s, o) {
          function l(u) {
            try {
              c(r.next(u));
            } catch (f) {
              o(f);
            }
          }
          function a(u) {
            try {
              c(r.throw(u));
            } catch (f) {
              o(f);
            }
          }
          function c(u) {
            u.done ? s(u.value) : n(u.value).then(l, a);
          }
          c((r = r.apply(t, e || [])).next());
        });
      },
    $t =
      (Et && Et.__importDefault) ||
      function (t) {
        return t && t.__esModule ? t : { default: t };
      };
  Object.defineProperty(Et, "__esModule", { value: !0 });
  var Oo = $t(require("net")),
    Io = $t(require("tls")),
    fh = $t(require("url")),
    hh = $t(require("assert")),
    ph = $t(Ht()),
    dh = Ir(),
    mh = $t(Co()),
    _i = ph.default("https-proxy-agent:agent"),
    Tr = class extends dh.Agent {
      constructor(e) {
        let i;
        if ((typeof e == "string" ? (i = fh.default.parse(e)) : (i = e), !i))
          throw new Error(
            "an HTTP(S) proxy server `host` and `port` must be specified!"
          );
        _i("creating new HttpsProxyAgent instance: %o", i), super(i);
        let r = Object.assign({}, i);
        (this.secureProxy = i.secureProxy || xh(r.protocol)),
          (r.host = r.hostname || r.host),
          typeof r.port == "string" && (r.port = parseInt(r.port, 10)),
          !r.port && r.host && (r.port = this.secureProxy ? 443 : 80),
          this.secureProxy &&
            !("ALPNProtocols" in r) &&
            (r.ALPNProtocols = ["http 1.1"]),
          r.host && r.path && (delete r.path, delete r.pathname),
          (this.proxy = r);
      }
      callback(e, i) {
        return uh(this, void 0, void 0, function* () {
          let { proxy: r, secureProxy: n } = this,
            s;
          n
            ? (_i("Creating `tls.Socket`: %o", r), (s = Io.default.connect(r)))
            : (_i("Creating `net.Socket`: %o", r), (s = Oo.default.connect(r)));
          let o = Object.assign({}, r.headers),
            a = `CONNECT ${`${i.host}:${i.port}`} HTTP/1.1\r
`;
          r.auth &&
            (o["Proxy-Authorization"] = `Basic ${Buffer.from(r.auth).toString(
              "base64"
            )}`);
          let { host: c, port: u, secureEndpoint: f } = i;
          vh(u, f) || (c += `:${u}`), (o.Host = c), (o.Connection = "close");
          for (let v of Object.keys(o))
            a += `${v}: ${o[v]}\r
`;
          let h = mh.default(s);
          s.write(`${a}\r
`);
          let { statusCode: p, buffered: d } = yield h;
          if (p === 200) {
            if ((e.once("socket", gh), i.secureEndpoint)) {
              let v = i.servername || i.host;
              if (!v) throw new Error('Could not determine "servername"');
              return (
                _i("Upgrading socket connection to TLS"),
                Io.default.connect(
                  Object.assign(
                    Object.assign(
                      {},
                      _h(i, "host", "hostname", "path", "port")
                    ),
                    { socket: s, servername: v }
                  )
                )
              );
            }
            return s;
          }
          s.destroy();
          let m = new Oo.default.Socket();
          return (
            (m.readable = !0),
            e.once("socket", (v) => {
              _i("replaying proxy buffer for failed request"),
                hh.default(v.listenerCount("data") > 0),
                v.push(d),
                v.push(null);
            }),
            m
          );
        });
      }
    };
  Et.default = Tr;
  function gh(t) {
    t.resume();
  }
  function vh(t, e) {
    return !!((!e && t === 80) || (e && t === 443));
  }
  function xh(t) {
    return typeof t == "string" ? /^https:?$/i.test(t) : !1;
  }
  function _h(t, ...e) {
    let i = {},
      r;
    for (r in t) e.includes(r) || (i[r] = t[r]);
    return i;
  }
});
var Ro = y((Br, Ao) => {
  "use strict";
  var yh =
      (Br && Br.__importDefault) ||
      function (t) {
        return t && t.__esModule ? t : { default: t };
      },
    Ar = yh(To());
  function Rr(t) {
    return new Ar.default(t);
  }
  (function (t) {
    (t.HttpsProxyAgent = Ar.default), (t.prototype = Ar.default.prototype);
  })(Rr || (Rr = {}));
  Ao.exports = Rr;
});
var Po = y((xg, $i) => {
  var Lo =
    Lo ||
    function (t) {
      return Buffer.from(t).toString("base64");
    };
  function bh(t) {
    var e = this,
      i = Math.round,
      r = Math.floor,
      n = new Array(64),
      s = new Array(64),
      o = new Array(64),
      l = new Array(64),
      a,
      c,
      u,
      f,
      h = new Array(65535),
      p = new Array(65535),
      d = new Array(64),
      m = new Array(64),
      v = [],
      E = 0,
      I = 7,
      w = new Array(64),
      C = new Array(64),
      _ = new Array(64),
      $ = new Array(256),
      k = new Array(2048),
      U,
      b = [
        0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17,
        25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45,
        52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61,
        35, 36, 48, 49, 57, 58, 62, 63,
      ],
      T = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      B = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      G = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125],
      L = [
        1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50,
        129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114,
        130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55,
        56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89,
        90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120,
        121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149,
        150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170,
        178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198,
        199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225,
        226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245,
        246, 247, 248, 249, 250,
      ],
      X = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      R = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      N = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119],
      q = [
        0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50,
        129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114,
        209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42,
        53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86,
        87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117,
        118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138,
        146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166,
        167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194,
        195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215,
        216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243,
        244, 245, 246, 247, 248, 249, 250,
      ];
    function z(g) {
      for (
        var j = [
            16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14,
            13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22,
            37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64,
            78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99,
          ],
          W = 0;
        W < 64;
        W++
      ) {
        var V = r((j[W] * g + 50) / 100);
        V < 1 ? (V = 1) : V > 255 && (V = 255), (n[b[W]] = V);
      }
      for (
        var J = [
            17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24,
            26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99,
            99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99,
            99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99,
          ],
          Q = 0;
        Q < 64;
        Q++
      ) {
        var fe = r((J[Q] * g + 50) / 100);
        fe < 1 ? (fe = 1) : fe > 255 && (fe = 255), (s[b[Q]] = fe);
      }
      for (
        var he = [
            1, 1.387039845, 1.306562965, 1.175875602, 1, 0.785694958, 0.5411961,
            0.275899379,
          ],
          Se = 0,
          xe = 0;
        xe < 8;
        xe++
      )
        for (var O = 0; O < 8; O++)
          (o[Se] = 1 / (n[b[Se]] * he[xe] * he[O] * 8)),
            (l[Se] = 1 / (s[b[Se]] * he[xe] * he[O] * 8)),
            Se++;
    }
    function P(g, j) {
      for (var W = 0, V = 0, J = new Array(), Q = 1; Q <= 16; Q++) {
        for (var fe = 1; fe <= g[Q]; fe++)
          (J[j[V]] = []), (J[j[V]][0] = W), (J[j[V]][1] = Q), V++, W++;
        W *= 2;
      }
      return J;
    }
    function be() {
      (a = P(T, B)), (c = P(X, R)), (u = P(G, L)), (f = P(N, q));
    }
    function le() {
      for (var g = 1, j = 2, W = 1; W <= 15; W++) {
        for (var V = g; V < j; V++)
          (p[32767 + V] = W),
            (h[32767 + V] = []),
            (h[32767 + V][1] = W),
            (h[32767 + V][0] = V);
        for (var J = -(j - 1); J <= -g; J++)
          (p[32767 + J] = W),
            (h[32767 + J] = []),
            (h[32767 + J][1] = W),
            (h[32767 + J][0] = j - 1 + J);
        (g <<= 1), (j <<= 1);
      }
    }
    function ie() {
      for (var g = 0; g < 256; g++)
        (k[g] = 19595 * g),
          (k[(g + 256) >> 0] = 38470 * g),
          (k[(g + 512) >> 0] = 7471 * g + 32768),
          (k[(g + 768) >> 0] = -11059 * g),
          (k[(g + 1024) >> 0] = -21709 * g),
          (k[(g + 1280) >> 0] = 32768 * g + 8421375),
          (k[(g + 1536) >> 0] = -27439 * g),
          (k[(g + 1792) >> 0] = -5329 * g);
    }
    function re(g) {
      for (var j = g[0], W = g[1] - 1; W >= 0; )
        j & (1 << W) && (E |= 1 << I),
          W--,
          I--,
          I < 0 && (E == 255 ? (x(255), x(0)) : x(E), (I = 7), (E = 0));
    }
    function x(g) {
      v.push(g);
    }
    function H(g) {
      x((g >> 8) & 255), x(g & 255);
    }
    function de(g, j) {
      var W,
        V,
        J,
        Q,
        fe,
        he,
        Se,
        xe,
        O = 0,
        M,
        Z = 8,
        we = 64;
      for (M = 0; M < Z; ++M) {
        (W = g[O]),
          (V = g[O + 1]),
          (J = g[O + 2]),
          (Q = g[O + 3]),
          (fe = g[O + 4]),
          (he = g[O + 5]),
          (Se = g[O + 6]),
          (xe = g[O + 7]);
        var ee = W + xe,
          ae = W - xe,
          ge = V + Se,
          Y = V - Se,
          pe = J + he,
          Le = J - he,
          ye = Q + fe,
          Ye = Q - fe,
          nt = ee + ye,
          yt = ee - ye,
          Ft = ge + pe,
          Nt = ge - pe;
        (g[O] = nt + Ft), (g[O + 4] = nt - Ft);
        var ci = (Nt + yt) * 0.707106781;
        (g[O + 2] = yt + ci),
          (g[O + 6] = yt - ci),
          (nt = Ye + Le),
          (Ft = Le + Y),
          (Nt = Y + ae);
        var ui = (nt - Nt) * 0.382683433,
          Pi = 0.5411961 * nt + ui,
          fi = 1.306562965 * Nt + ui,
          hi = Ft * 0.707106781,
          pi = ae + hi,
          di = ae - hi;
        (g[O + 5] = di + Pi),
          (g[O + 3] = di - Pi),
          (g[O + 1] = pi + fi),
          (g[O + 7] = pi - fi),
          (O += 8);
      }
      for (O = 0, M = 0; M < Z; ++M) {
        (W = g[O]),
          (V = g[O + 8]),
          (J = g[O + 16]),
          (Q = g[O + 24]),
          (fe = g[O + 32]),
          (he = g[O + 40]),
          (Se = g[O + 48]),
          (xe = g[O + 56]);
        var ws = W + xe,
          _r = W - xe,
          Es = V + Se,
          Ss = V - Se,
          ks = J + he,
          Cs = J - he,
          Os = Q + fe,
          lf = Q - fe,
          mi = ws + Os,
          yr = ws - Os,
          Fi = Es + ks,
          Ni = Es - ks;
        (g[O] = mi + Fi), (g[O + 32] = mi - Fi);
        var Is = (Ni + yr) * 0.707106781;
        (g[O + 16] = yr + Is),
          (g[O + 48] = yr - Is),
          (mi = lf + Cs),
          (Fi = Cs + Ss),
          (Ni = Ss + _r);
        var Ts = (mi - Ni) * 0.382683433,
          As = 0.5411961 * mi + Ts,
          Rs = 1.306562965 * Ni + Ts,
          Bs = Fi * 0.707106781,
          Ls = _r + Bs,
          Ps = _r - Bs;
        (g[O + 40] = Ps + As),
          (g[O + 24] = Ps - As),
          (g[O + 8] = Ls + Rs),
          (g[O + 56] = Ls - Rs),
          O++;
      }
      var Mi;
      for (M = 0; M < we; ++M)
        (Mi = g[M] * j[M]), (d[M] = Mi > 0 ? (Mi + 0.5) | 0 : (Mi - 0.5) | 0);
      return d;
    }
    function me() {
      H(65504),
        H(16),
        x(74),
        x(70),
        x(73),
        x(70),
        x(0),
        x(1),
        x(1),
        x(0),
        H(1),
        H(1),
        x(0),
        x(0);
    }
    function ce(g) {
      if (g) {
        H(65505),
          g[0] === 69 && g[1] === 120 && g[2] === 105 && g[3] === 102
            ? H(g.length + 2)
            : (H(g.length + 5 + 2), x(69), x(120), x(105), x(102), x(0));
        for (var j = 0; j < g.length; j++) x(g[j]);
      }
    }
    function ue(g, j) {
      H(65472),
        H(17),
        x(8),
        H(j),
        H(g),
        x(3),
        x(1),
        x(17),
        x(0),
        x(2),
        x(17),
        x(1),
        x(3),
        x(17),
        x(1);
    }
    function ne() {
      H(65499), H(132), x(0);
      for (var g = 0; g < 64; g++) x(n[g]);
      x(1);
      for (var j = 0; j < 64; j++) x(s[j]);
    }
    function F() {
      H(65476), H(418), x(0);
      for (var g = 0; g < 16; g++) x(T[g + 1]);
      for (var j = 0; j <= 11; j++) x(B[j]);
      x(16);
      for (var W = 0; W < 16; W++) x(G[W + 1]);
      for (var V = 0; V <= 161; V++) x(L[V]);
      x(1);
      for (var J = 0; J < 16; J++) x(X[J + 1]);
      for (var Q = 0; Q <= 11; Q++) x(R[Q]);
      x(17);
      for (var fe = 0; fe < 16; fe++) x(N[fe + 1]);
      for (var he = 0; he <= 161; he++) x(q[he]);
    }
    function A(g) {
      typeof g == "undefined" ||
        g.constructor !== Array ||
        g.forEach((j) => {
          if (typeof j == "string") {
            H(65534);
            var W = j.length;
            H(W + 2);
            var V;
            for (V = 0; V < W; V++) x(j.charCodeAt(V));
          }
        });
    }
    function ve() {
      H(65498),
        H(12),
        x(3),
        x(1),
        x(0),
        x(2),
        x(17),
        x(3),
        x(17),
        x(0),
        x(63),
        x(0);
    }
    function K(g, j, W, V, J) {
      for (
        var Q = J[0],
          fe = J[240],
          he,
          Se = 16,
          xe = 63,
          O = 64,
          M = de(g, j),
          Z = 0;
        Z < O;
        ++Z
      )
        m[b[Z]] = M[Z];
      var we = m[0] - W;
      (W = m[0]),
        we == 0 ? re(V[0]) : ((he = 32767 + we), re(V[p[he]]), re(h[he]));
      for (var ee = 63; ee > 0 && m[ee] == 0; ee--);
      if (ee == 0) return re(Q), W;
      for (var ae = 1, ge; ae <= ee; ) {
        for (var Y = ae; m[ae] == 0 && ae <= ee; ++ae);
        var pe = ae - Y;
        if (pe >= Se) {
          ge = pe >> 4;
          for (var Le = 1; Le <= ge; ++Le) re(fe);
          pe = pe & 15;
        }
        (he = 32767 + m[ae]), re(J[(pe << 4) + p[he]]), re(h[he]), ae++;
      }
      return ee != xe && re(Q), W;
    }
    function se() {
      for (var g = String.fromCharCode, j = 0; j < 256; j++) $[j] = g(j);
    }
    this.encode = function (g, j) {
      var W = new Date().getTime();
      j && We(j),
        (v = new Array()),
        (E = 0),
        (I = 7),
        H(65496),
        me(),
        A(g.comments),
        ce(g.exifBuffer),
        ne(),
        ue(g.width, g.height),
        F(),
        ve();
      var V = 0,
        J = 0,
        Q = 0;
      (E = 0), (I = 7), (this.encode.displayName = "_encode_");
      for (
        var fe = g.data,
          he = g.width,
          Se = g.height,
          xe = he * 4,
          O = he * 3,
          M,
          Z = 0,
          we,
          ee,
          ae,
          ge,
          Y,
          pe,
          Le,
          ye;
        Z < Se;

      ) {
        for (M = 0; M < xe; ) {
          for (ge = xe * Z + M, Y = ge, pe = -1, Le = 0, ye = 0; ye < 64; ye++)
            (Le = ye >> 3),
              (pe = (ye & 7) * 4),
              (Y = ge + Le * xe + pe),
              Z + Le >= Se && (Y -= xe * (Z + 1 + Le - Se)),
              M + pe >= xe && (Y -= M + pe - xe + 4),
              (we = fe[Y++]),
              (ee = fe[Y++]),
              (ae = fe[Y++]),
              (w[ye] =
                ((k[we] + k[(ee + 256) >> 0] + k[(ae + 512) >> 0]) >> 16) -
                128),
              (C[ye] =
                ((k[(we + 768) >> 0] +
                  k[(ee + 1024) >> 0] +
                  k[(ae + 1280) >> 0]) >>
                  16) -
                128),
              (_[ye] =
                ((k[(we + 1280) >> 0] +
                  k[(ee + 1536) >> 0] +
                  k[(ae + 1792) >> 0]) >>
                  16) -
                128);
          (V = K(w, o, V, a, u)),
            (J = K(C, l, J, c, f)),
            (Q = K(_, l, Q, c, f)),
            (M += 32);
        }
        Z += 8;
      }
      if (I >= 0) {
        var Ye = [];
        (Ye[1] = I + 1), (Ye[0] = (1 << (I + 1)) - 1), re(Ye);
      }
      if ((H(65497), typeof $i == "undefined")) return new Uint8Array(v);
      return Buffer.from(v);
      var nt, yt;
    };
    function We(g) {
      if ((g <= 0 && (g = 1), g > 100 && (g = 100), U != g)) {
        var j = 0;
        g < 50 ? (j = Math.floor(5e3 / g)) : (j = Math.floor(200 - g * 2)),
          z(j),
          (U = g);
      }
    }
    function Je() {
      var g = new Date().getTime();
      t || (t = 50), se(), be(), le(), ie(), We(t);
      var j = new Date().getTime() - g;
    }
    Je();
  }
  typeof $i != "undefined"
    ? ($i.exports = Bo)
    : typeof window != "undefined" &&
      ((window["jpeg-js"] = window["jpeg-js"] || {}),
      (window["jpeg-js"].encode = Bo));
  function Bo(t, e) {
    typeof e == "undefined" && (e = 50);
    var i = new bh(e),
      r = i.encode(t, e);
    return { data: r, width: t.width, height: t.height };
  }
});
var No = y((_g, Pr) => {
  var Lr = (function () {
    "use strict";
    var e = new Int32Array([
        0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33,
        40, 48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50,
        43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46,
        53, 60, 61, 54, 47, 55, 62, 63,
      ]),
      i = 4017,
      r = 799,
      n = 3406,
      s = 2276,
      o = 1567,
      l = 3784,
      a = 5793,
      c = 2896;
    function u() {}
    function f(I, w) {
      for (var C = 0, _ = [], $, k, U = 16; U > 0 && !I[U - 1]; ) U--;
      _.push({ children: [], index: 0 });
      var b = _[0],
        T;
      for ($ = 0; $ < U; $++) {
        for (k = 0; k < I[$]; k++) {
          for (b = _.pop(), b.children[b.index] = w[C]; b.index > 0; ) {
            if (_.length === 0)
              throw new Error("Could not recreate Huffman Table");
            b = _.pop();
          }
          for (b.index++, _.push(b); _.length <= $; )
            _.push((T = { children: [], index: 0 })),
              (b.children[b.index] = T.children),
              (b = T);
          C++;
        }
        $ + 1 < U &&
          (_.push((T = { children: [], index: 0 })),
          (b.children[b.index] = T.children),
          (b = T));
      }
      return _[0].children;
    }
    function h(I, w, C, _, $, k, U, b, T, B) {
      var G = C.precision,
        L = C.samplesPerLine,
        X = C.scanLines,
        R = C.mcusPerLine,
        N = C.progressive,
        q = C.maxH,
        z = C.maxV,
        P = w,
        be = 0,
        le = 0;
      function ie() {
        if (le > 0) return le--, (be >> le) & 1;
        if (((be = I[w++]), be == 255)) {
          var O = I[w++];
          if (O)
            throw new Error(
              "unexpected marker: " + ((be << 8) | O).toString(16)
            );
        }
        return (le = 7), be >>> 7;
      }
      function re(O) {
        for (var M = O, Z; (Z = ie()) !== null; ) {
          if (((M = M[Z]), typeof M == "number")) return M;
          if (typeof M != "object") throw new Error("invalid huffman sequence");
        }
        return null;
      }
      function x(O) {
        for (var M = 0; O > 0; ) {
          var Z = ie();
          if (Z === null) return;
          (M = (M << 1) | Z), O--;
        }
        return M;
      }
      function H(O) {
        var M = x(O);
        return M >= 1 << (O - 1) ? M : M + (-1 << O) + 1;
      }
      function de(O, M) {
        var Z = re(O.huffmanTableDC),
          we = Z === 0 ? 0 : H(Z);
        M[0] = O.pred += we;
        for (var ee = 1; ee < 64; ) {
          var ae = re(O.huffmanTableAC),
            ge = ae & 15,
            Y = ae >> 4;
          if (ge === 0) {
            if (Y < 15) break;
            ee += 16;
            continue;
          }
          ee += Y;
          var pe = e[ee];
          (M[pe] = H(ge)), ee++;
        }
      }
      function me(O, M) {
        var Z = re(O.huffmanTableDC),
          we = Z === 0 ? 0 : H(Z) << T;
        M[0] = O.pred += we;
      }
      function ce(O, M) {
        M[0] |= ie() << T;
      }
      var ue = 0;
      function ne(O, M) {
        if (ue > 0) {
          ue--;
          return;
        }
        for (var Z = k, we = U; Z <= we; ) {
          var ee = re(O.huffmanTableAC),
            ae = ee & 15,
            ge = ee >> 4;
          if (ae === 0) {
            if (ge < 15) {
              ue = x(ge) + (1 << ge) - 1;
              break;
            }
            Z += 16;
            continue;
          }
          Z += ge;
          var Y = e[Z];
          (M[Y] = H(ae) * (1 << T)), Z++;
        }
      }
      var F = 0,
        A;
      function ve(O, M) {
        for (var Z = k, we = U, ee = 0; Z <= we; ) {
          var ae = e[Z],
            ge = M[ae] < 0 ? -1 : 1;
          switch (F) {
            case 0:
              var Y = re(O.huffmanTableAC),
                pe = Y & 15,
                ee = Y >> 4;
              if (pe === 0)
                ee < 15
                  ? ((ue = x(ee) + (1 << ee)), (F = 4))
                  : ((ee = 16), (F = 1));
              else {
                if (pe !== 1) throw new Error("invalid ACn encoding");
                (A = H(pe)), (F = ee ? 2 : 3);
              }
              continue;
            case 1:
            case 2:
              M[ae]
                ? (M[ae] += (ie() << T) * ge)
                : (ee--, ee === 0 && (F = F == 2 ? 3 : 0));
              break;
            case 3:
              M[ae] ? (M[ae] += (ie() << T) * ge) : ((M[ae] = A << T), (F = 0));
              break;
            case 4:
              M[ae] && (M[ae] += (ie() << T) * ge);
              break;
          }
          Z++;
        }
        F === 4 && (ue--, ue === 0 && (F = 0));
      }
      function K(O, M, Z, we, ee) {
        var ae = (Z / R) | 0,
          ge = Z % R,
          Y = ae * O.v + we,
          pe = ge * O.h + ee;
        (O.blocks[Y] === void 0 && B.tolerantDecoding) || M(O, O.blocks[Y][pe]);
      }
      function se(O, M, Z) {
        var we = (Z / O.blocksPerLine) | 0,
          ee = Z % O.blocksPerLine;
        (O.blocks[we] === void 0 && B.tolerantDecoding) ||
          M(O, O.blocks[we][ee]);
      }
      var We = _.length,
        Je,
        g,
        j,
        W,
        V,
        J;
      N
        ? k === 0
          ? (J = b === 0 ? me : ce)
          : (J = b === 0 ? ne : ve)
        : (J = de);
      var Q = 0,
        fe,
        he;
      We == 1
        ? (he = _[0].blocksPerLine * _[0].blocksPerColumn)
        : (he = R * C.mcusPerColumn),
        $ || ($ = he);
      for (var Se, xe; Q < he; ) {
        for (g = 0; g < We; g++) _[g].pred = 0;
        if (((ue = 0), We == 1))
          for (Je = _[0], V = 0; V < $; V++) se(Je, J, Q), Q++;
        else
          for (V = 0; V < $; V++) {
            for (g = 0; g < We; g++)
              for (Je = _[g], Se = Je.h, xe = Je.v, j = 0; j < xe; j++)
                for (W = 0; W < Se; W++) K(Je, J, Q, j, W);
            if ((Q++, Q === he)) break;
          }
        if (Q === he)
          do {
            if (I[w] === 255 && I[w + 1] !== 0) break;
            w += 1;
          } while (w < I.length - 2);
        if (((le = 0), (fe = (I[w] << 8) | I[w + 1]), fe < 65280))
          throw new Error("marker was not found");
        if (fe >= 65488 && fe <= 65495) w += 2;
        else break;
      }
      return w - P;
    }
    function p(I, w) {
      var C = [],
        _ = w.blocksPerLine,
        $ = w.blocksPerColumn,
        k = _ << 3,
        U = new Int32Array(64),
        b = new Uint8Array(64);
      function T(P, be, le) {
        var ie = w.quantizationTable,
          re,
          x,
          H,
          de,
          me,
          ce,
          ue,
          ne,
          F,
          A = le,
          ve;
        for (ve = 0; ve < 64; ve++) A[ve] = P[ve] * ie[ve];
        for (ve = 0; ve < 8; ++ve) {
          var K = 8 * ve;
          if (
            A[1 + K] == 0 &&
            A[2 + K] == 0 &&
            A[3 + K] == 0 &&
            A[4 + K] == 0 &&
            A[5 + K] == 0 &&
            A[6 + K] == 0 &&
            A[7 + K] == 0
          ) {
            (F = (a * A[0 + K] + 512) >> 10),
              (A[0 + K] = F),
              (A[1 + K] = F),
              (A[2 + K] = F),
              (A[3 + K] = F),
              (A[4 + K] = F),
              (A[5 + K] = F),
              (A[6 + K] = F),
              (A[7 + K] = F);
            continue;
          }
          (re = (a * A[0 + K] + 128) >> 8),
            (x = (a * A[4 + K] + 128) >> 8),
            (H = A[2 + K]),
            (de = A[6 + K]),
            (me = (c * (A[1 + K] - A[7 + K]) + 128) >> 8),
            (ne = (c * (A[1 + K] + A[7 + K]) + 128) >> 8),
            (ce = A[3 + K] << 4),
            (ue = A[5 + K] << 4),
            (F = (re - x + 1) >> 1),
            (re = (re + x + 1) >> 1),
            (x = F),
            (F = (H * l + de * o + 128) >> 8),
            (H = (H * o - de * l + 128) >> 8),
            (de = F),
            (F = (me - ue + 1) >> 1),
            (me = (me + ue + 1) >> 1),
            (ue = F),
            (F = (ne + ce + 1) >> 1),
            (ce = (ne - ce + 1) >> 1),
            (ne = F),
            (F = (re - de + 1) >> 1),
            (re = (re + de + 1) >> 1),
            (de = F),
            (F = (x - H + 1) >> 1),
            (x = (x + H + 1) >> 1),
            (H = F),
            (F = (me * s + ne * n + 2048) >> 12),
            (me = (me * n - ne * s + 2048) >> 12),
            (ne = F),
            (F = (ce * r + ue * i + 2048) >> 12),
            (ce = (ce * i - ue * r + 2048) >> 12),
            (ue = F),
            (A[0 + K] = re + ne),
            (A[7 + K] = re - ne),
            (A[1 + K] = x + ue),
            (A[6 + K] = x - ue),
            (A[2 + K] = H + ce),
            (A[5 + K] = H - ce),
            (A[3 + K] = de + me),
            (A[4 + K] = de - me);
        }
        for (ve = 0; ve < 8; ++ve) {
          var se = ve;
          if (
            A[8 + se] == 0 &&
            A[16 + se] == 0 &&
            A[24 + se] == 0 &&
            A[32 + se] == 0 &&
            A[40 + se] == 0 &&
            A[48 + se] == 0 &&
            A[56 + se] == 0
          ) {
            (F = (a * le[ve + 0] + 8192) >> 14),
              (A[0 + se] = F),
              (A[8 + se] = F),
              (A[16 + se] = F),
              (A[24 + se] = F),
              (A[32 + se] = F),
              (A[40 + se] = F),
              (A[48 + se] = F),
              (A[56 + se] = F);
            continue;
          }
          (re = (a * A[0 + se] + 2048) >> 12),
            (x = (a * A[32 + se] + 2048) >> 12),
            (H = A[16 + se]),
            (de = A[48 + se]),
            (me = (c * (A[8 + se] - A[56 + se]) + 2048) >> 12),
            (ne = (c * (A[8 + se] + A[56 + se]) + 2048) >> 12),
            (ce = A[24 + se]),
            (ue = A[40 + se]),
            (F = (re - x + 1) >> 1),
            (re = (re + x + 1) >> 1),
            (x = F),
            (F = (H * l + de * o + 2048) >> 12),
            (H = (H * o - de * l + 2048) >> 12),
            (de = F),
            (F = (me - ue + 1) >> 1),
            (me = (me + ue + 1) >> 1),
            (ue = F),
            (F = (ne + ce + 1) >> 1),
            (ce = (ne - ce + 1) >> 1),
            (ne = F),
            (F = (re - de + 1) >> 1),
            (re = (re + de + 1) >> 1),
            (de = F),
            (F = (x - H + 1) >> 1),
            (x = (x + H + 1) >> 1),
            (H = F),
            (F = (me * s + ne * n + 2048) >> 12),
            (me = (me * n - ne * s + 2048) >> 12),
            (ne = F),
            (F = (ce * r + ue * i + 2048) >> 12),
            (ce = (ce * i - ue * r + 2048) >> 12),
            (ue = F),
            (A[0 + se] = re + ne),
            (A[56 + se] = re - ne),
            (A[8 + se] = x + ue),
            (A[48 + se] = x - ue),
            (A[16 + se] = H + ce),
            (A[40 + se] = H - ce),
            (A[24 + se] = de + me),
            (A[32 + se] = de - me);
        }
        for (ve = 0; ve < 64; ++ve) {
          var We = 128 + ((A[ve] + 8) >> 4);
          be[ve] = We < 0 ? 0 : We > 255 ? 255 : We;
        }
      }
      E(k * $ * 8);
      for (var B, G, L = 0; L < $; L++) {
        var X = L << 3;
        for (B = 0; B < 8; B++) C.push(new Uint8Array(k));
        for (var R = 0; R < _; R++) {
          T(w.blocks[L][R], b, U);
          var N = 0,
            q = R << 3;
          for (G = 0; G < 8; G++) {
            var z = C[X + G];
            for (B = 0; B < 8; B++) z[q + B] = b[N++];
          }
        }
      }
      return C;
    }
    function d(I) {
      return I < 0 ? 0 : I > 255 ? 255 : I;
    }
    u.prototype = {
      load: function (w) {
        var C = new XMLHttpRequest();
        C.open("GET", w, !0),
          (C.responseType = "arraybuffer"),
          (C.onload = function () {
            var _ = new Uint8Array(C.response || C.mozResponseArrayBuffer);
            this.parse(_), this.onload && this.onload();
          }.bind(this)),
          C.send(null);
      },
      parse: function (w) {
        var C = this.opts.maxResolutionInMP * 1e3 * 1e3,
          _ = 0,
          $ = w.length;
        function k() {
          var Y = (w[_] << 8) | w[_ + 1];
          return (_ += 2), Y;
        }
        function U() {
          var Y = k(),
            pe = w.subarray(_, _ + Y - 2);
          return (_ += pe.length), pe;
        }
        function b(Y) {
          var pe = 1,
            Le = 1,
            ye,
            Ye;
          for (Ye in Y.components)
            Y.components.hasOwnProperty(Ye) &&
              ((ye = Y.components[Ye]),
              pe < ye.h && (pe = ye.h),
              Le < ye.v && (Le = ye.v));
          var nt = Math.ceil(Y.samplesPerLine / 8 / pe),
            yt = Math.ceil(Y.scanLines / 8 / Le);
          for (Ye in Y.components)
            if (Y.components.hasOwnProperty(Ye)) {
              ye = Y.components[Ye];
              var Ft = Math.ceil((Math.ceil(Y.samplesPerLine / 8) * ye.h) / pe),
                Nt = Math.ceil((Math.ceil(Y.scanLines / 8) * ye.v) / Le),
                ci = nt * ye.h,
                ui = yt * ye.v,
                Pi = ui * ci,
                fi = [];
              E(Pi * 256);
              for (var hi = 0; hi < ui; hi++) {
                for (var pi = [], di = 0; di < ci; di++)
                  pi.push(new Int32Array(64));
                fi.push(pi);
              }
              (ye.blocksPerLine = Ft),
                (ye.blocksPerColumn = Nt),
                (ye.blocks = fi);
            }
          (Y.maxH = pe),
            (Y.maxV = Le),
            (Y.mcusPerLine = nt),
            (Y.mcusPerColumn = yt);
        }
        var T = null,
          B = null,
          G = null,
          L,
          X,
          R = [],
          N = [],
          q = [],
          z = [],
          P = k(),
          be = -1;
        if (((this.comments = []), P != 65496))
          throw new Error("SOI not found");
        for (P = k(); P != 65497; ) {
          var le, ie, re;
          switch (P) {
            case 65280:
              break;
            case 65504:
            case 65505:
            case 65506:
            case 65507:
            case 65508:
            case 65509:
            case 65510:
            case 65511:
            case 65512:
            case 65513:
            case 65514:
            case 65515:
            case 65516:
            case 65517:
            case 65518:
            case 65519:
            case 65534:
              var x = U();
              if (P === 65534) {
                var H = String.fromCharCode.apply(null, x);
                this.comments.push(H);
              }
              P === 65504 &&
                x[0] === 74 &&
                x[1] === 70 &&
                x[2] === 73 &&
                x[3] === 70 &&
                x[4] === 0 &&
                (T = {
                  version: { major: x[5], minor: x[6] },
                  densityUnits: x[7],
                  xDensity: (x[8] << 8) | x[9],
                  yDensity: (x[10] << 8) | x[11],
                  thumbWidth: x[12],
                  thumbHeight: x[13],
                  thumbData: x.subarray(14, 14 + 3 * x[12] * x[13]),
                }),
                P === 65505 &&
                  x[0] === 69 &&
                  x[1] === 120 &&
                  x[2] === 105 &&
                  x[3] === 102 &&
                  x[4] === 0 &&
                  (this.exifBuffer = x.subarray(5, x.length)),
                P === 65518 &&
                  x[0] === 65 &&
                  x[1] === 100 &&
                  x[2] === 111 &&
                  x[3] === 98 &&
                  x[4] === 101 &&
                  x[5] === 0 &&
                  (B = {
                    version: x[6],
                    flags0: (x[7] << 8) | x[8],
                    flags1: (x[9] << 8) | x[10],
                    transformCode: x[11],
                  });
              break;
            case 65499:
              for (var de = k(), me = de + _ - 2; _ < me; ) {
                var ce = w[_++];
                E(256);
                var ue = new Int32Array(64);
                if (ce >> 4)
                  if (ce >> 4 === 1)
                    for (ie = 0; ie < 64; ie++) {
                      var ne = e[ie];
                      ue[ne] = k();
                    }
                  else throw new Error("DQT: invalid table spec");
                else
                  for (ie = 0; ie < 64; ie++) {
                    var ne = e[ie];
                    ue[ne] = w[_++];
                  }
                R[ce & 15] = ue;
              }
              break;
            case 65472:
            case 65473:
            case 65474:
              k(),
                (L = {}),
                (L.extended = P === 65473),
                (L.progressive = P === 65474),
                (L.precision = w[_++]),
                (L.scanLines = k()),
                (L.samplesPerLine = k()),
                (L.components = {}),
                (L.componentsOrder = []);
              var F = L.scanLines * L.samplesPerLine;
              if (F > C) {
                var A = Math.ceil((F - C) / 1e6);
                throw new Error(`maxResolutionInMP limit exceeded by ${A}MP`);
              }
              var ve = w[_++],
                K,
                se = 0,
                We = 0;
              for (le = 0; le < ve; le++) {
                K = w[_];
                var Je = w[_ + 1] >> 4,
                  g = w[_ + 1] & 15,
                  j = w[_ + 2];
                if (Je <= 0 || g <= 0)
                  throw new Error(
                    "Invalid sampling factor, expected values above 0"
                  );
                L.componentsOrder.push(K),
                  (L.components[K] = { h: Je, v: g, quantizationIdx: j }),
                  (_ += 3);
              }
              b(L), N.push(L);
              break;
            case 65476:
              var W = k();
              for (le = 2; le < W; ) {
                var V = w[_++],
                  J = new Uint8Array(16),
                  Q = 0;
                for (ie = 0; ie < 16; ie++, _++) Q += J[ie] = w[_];
                E(16 + Q);
                var fe = new Uint8Array(Q);
                for (ie = 0; ie < Q; ie++, _++) fe[ie] = w[_];
                (le += 17 + Q), ((V >> 4 ? q : z)[V & 15] = f(J, fe));
              }
              break;
            case 65501:
              k(), (X = k());
              break;
            case 65500:
              k(), k();
              break;
            case 65498:
              var he = k(),
                Se = w[_++],
                xe = [],
                O;
              for (le = 0; le < Se; le++) {
                O = L.components[w[_++]];
                var M = w[_++];
                (O.huffmanTableDC = z[M >> 4]),
                  (O.huffmanTableAC = q[M & 15]),
                  xe.push(O);
              }
              var Z = w[_++],
                we = w[_++],
                ee = w[_++],
                ae = h(w, _, L, xe, X, Z, we, ee >> 4, ee & 15, this.opts);
              _ += ae;
              break;
            case 65535:
              w[_] !== 255 && _--;
              break;
            default:
              if (w[_ - 3] == 255 && w[_ - 2] >= 192 && w[_ - 2] <= 254) {
                _ -= 3;
                break;
              } else if (P === 224 || P == 225) {
                if (be !== -1)
                  throw new Error(
                    `first unknown JPEG marker at offset ${be.toString(
                      16
                    )}, second unknown JPEG marker ${P.toString(
                      16
                    )} at offset ${(_ - 1).toString(16)}`
                  );
                be = _ - 1;
                let Y = k();
                if (w[_ + Y - 2] === 255) {
                  _ += Y - 2;
                  break;
                }
              }
              throw new Error("unknown JPEG marker " + P.toString(16));
          }
          P = k();
        }
        if (N.length != 1) throw new Error("only single frame JPEGs supported");
        for (var le = 0; le < N.length; le++) {
          var ge = N[le].components;
          for (var ie in ge)
            (ge[ie].quantizationTable = R[ge[ie].quantizationIdx]),
              delete ge[ie].quantizationIdx;
        }
        (this.width = L.samplesPerLine),
          (this.height = L.scanLines),
          (this.jfif = T),
          (this.adobe = B),
          (this.components = []);
        for (var le = 0; le < L.componentsOrder.length; le++) {
          var O = L.components[L.componentsOrder[le]];
          this.components.push({
            lines: p(L, O),
            scaleX: O.h / L.maxH,
            scaleY: O.v / L.maxV,
          });
        }
      },
      getData: function (w, C) {
        var _ = this.width / w,
          $ = this.height / C,
          k,
          U,
          b,
          T,
          B,
          G,
          L,
          X,
          R,
          N,
          q = 0,
          z,
          P,
          be,
          le,
          ie,
          re,
          x,
          H,
          de,
          me,
          ce,
          ue = w * C * this.components.length;
        E(ue);
        var ne = new Uint8Array(ue);
        switch (this.components.length) {
          case 1:
            for (k = this.components[0], N = 0; N < C; N++)
              for (B = k.lines[0 | (N * k.scaleY * $)], R = 0; R < w; R++)
                (z = B[0 | (R * k.scaleX * _)]), (ne[q++] = z);
            break;
          case 2:
            for (
              k = this.components[0], U = this.components[1], N = 0;
              N < C;
              N++
            )
              for (
                B = k.lines[0 | (N * k.scaleY * $)],
                  G = U.lines[0 | (N * U.scaleY * $)],
                  R = 0;
                R < w;
                R++
              )
                (z = B[0 | (R * k.scaleX * _)]),
                  (ne[q++] = z),
                  (z = G[0 | (R * U.scaleX * _)]),
                  (ne[q++] = z);
            break;
          case 3:
            for (
              ce = !0,
                this.adobe && this.adobe.transformCode
                  ? (ce = !0)
                  : typeof this.opts.colorTransform != "undefined" &&
                    (ce = !!this.opts.colorTransform),
                k = this.components[0],
                U = this.components[1],
                b = this.components[2],
                N = 0;
              N < C;
              N++
            )
              for (
                B = k.lines[0 | (N * k.scaleY * $)],
                  G = U.lines[0 | (N * U.scaleY * $)],
                  L = b.lines[0 | (N * b.scaleY * $)],
                  R = 0;
                R < w;
                R++
              )
                ce
                  ? ((z = B[0 | (R * k.scaleX * _)]),
                    (P = G[0 | (R * U.scaleX * _)]),
                    (be = L[0 | (R * b.scaleX * _)]),
                    (H = d(z + 1.402 * (be - 128))),
                    (de = d(
                      z - 0.3441363 * (P - 128) - 0.71413636 * (be - 128)
                    )),
                    (me = d(z + 1.772 * (P - 128))))
                  : ((H = B[0 | (R * k.scaleX * _)]),
                    (de = G[0 | (R * U.scaleX * _)]),
                    (me = L[0 | (R * b.scaleX * _)])),
                  (ne[q++] = H),
                  (ne[q++] = de),
                  (ne[q++] = me);
            break;
          case 4:
            if (!this.adobe)
              throw new Error("Unsupported color mode (4 components)");
            for (
              ce = !1,
                this.adobe && this.adobe.transformCode
                  ? (ce = !0)
                  : typeof this.opts.colorTransform != "undefined" &&
                    (ce = !!this.opts.colorTransform),
                k = this.components[0],
                U = this.components[1],
                b = this.components[2],
                T = this.components[3],
                N = 0;
              N < C;
              N++
            )
              for (
                B = k.lines[0 | (N * k.scaleY * $)],
                  G = U.lines[0 | (N * U.scaleY * $)],
                  L = b.lines[0 | (N * b.scaleY * $)],
                  X = T.lines[0 | (N * T.scaleY * $)],
                  R = 0;
                R < w;
                R++
              )
                ce
                  ? ((z = B[0 | (R * k.scaleX * _)]),
                    (P = G[0 | (R * U.scaleX * _)]),
                    (be = L[0 | (R * b.scaleX * _)]),
                    (le = X[0 | (R * T.scaleX * _)]),
                    (ie = 255 - d(z + 1.402 * (be - 128))),
                    (re =
                      255 -
                      d(z - 0.3441363 * (P - 128) - 0.71413636 * (be - 128))),
                    (x = 255 - d(z + 1.772 * (P - 128))))
                  : ((ie = B[0 | (R * k.scaleX * _)]),
                    (re = G[0 | (R * U.scaleX * _)]),
                    (x = L[0 | (R * b.scaleX * _)]),
                    (le = X[0 | (R * T.scaleX * _)])),
                  (ne[q++] = 255 - ie),
                  (ne[q++] = 255 - re),
                  (ne[q++] = 255 - x),
                  (ne[q++] = 255 - le);
            break;
          default:
            throw new Error("Unsupported color mode");
        }
        return ne;
      },
      copyToImageData: function (w, C) {
        var _ = w.width,
          $ = w.height,
          k = w.data,
          U = this.getData(_, $),
          b = 0,
          T = 0,
          B,
          G,
          L,
          X,
          R,
          N,
          q,
          z,
          P;
        switch (this.components.length) {
          case 1:
            for (G = 0; G < $; G++)
              for (B = 0; B < _; B++)
                (L = U[b++]),
                  (k[T++] = L),
                  (k[T++] = L),
                  (k[T++] = L),
                  C && (k[T++] = 255);
            break;
          case 3:
            for (G = 0; G < $; G++)
              for (B = 0; B < _; B++)
                (q = U[b++]),
                  (z = U[b++]),
                  (P = U[b++]),
                  (k[T++] = q),
                  (k[T++] = z),
                  (k[T++] = P),
                  C && (k[T++] = 255);
            break;
          case 4:
            for (G = 0; G < $; G++)
              for (B = 0; B < _; B++)
                (R = U[b++]),
                  (N = U[b++]),
                  (L = U[b++]),
                  (X = U[b++]),
                  (q = 255 - d(R * (1 - X / 255) + X)),
                  (z = 255 - d(N * (1 - X / 255) + X)),
                  (P = 255 - d(L * (1 - X / 255) + X)),
                  (k[T++] = q),
                  (k[T++] = z),
                  (k[T++] = P),
                  C && (k[T++] = 255);
            break;
          default:
            throw new Error("Unsupported color mode");
        }
      },
    };
    var m = 0,
      v = 0;
    function E(I = 0) {
      var w = m + I;
      if (w > v) {
        var C = Math.ceil((w - v) / 1024 / 1024);
        throw new Error(`maxMemoryUsageInMB limit exceeded by at least ${C}MB`);
      }
      m = w;
    }
    return (
      (u.resetMaxMemoryUsage = function (I) {
        (m = 0), (v = I);
      }),
      (u.getBytesAllocated = function () {
        return m;
      }),
      (u.requestMemoryAllocation = E),
      u
    );
  })();
  typeof Pr != "undefined"
    ? (Pr.exports = Fo)
    : typeof window != "undefined" &&
      ((window["jpeg-js"] = window["jpeg-js"] || {}),
      (window["jpeg-js"].decode = Fo));
  function Fo(t, e = {}) {
    var i = {
        colorTransform: void 0,
        useTArray: !1,
        formatAsRGBA: !0,
        tolerantDecoding: !0,
        maxResolutionInMP: 100,
        maxMemoryUsageInMB: 512,
      },
      r = { ...i, ...e },
      n = new Uint8Array(t),
      s = new Lr();
    (s.opts = r),
      Lr.resetMaxMemoryUsage(r.maxMemoryUsageInMB * 1024 * 1024),
      s.parse(n);
    var o = r.formatAsRGBA ? 4 : 3,
      l = s.width * s.height * o;
    try {
      Lr.requestMemoryAllocation(l);
      var a = {
        width: s.width,
        height: s.height,
        exifBuffer: s.exifBuffer,
        data: r.useTArray ? new Uint8Array(l) : Buffer.alloc(l),
      };
      s.comments.length > 0 && (a.comments = s.comments);
    } catch (c) {
      throw c instanceof RangeError
        ? new Error(
            "Could not allocate enough memory for the image. Required: " + l
          )
        : c instanceof ReferenceError && c.message === "Buffer is not defined"
        ? new Error(
            "Buffer is not globally defined in this environment. Consider setting useTArray to true"
          )
        : c;
    }
    return s.copyToImageData(a, r.formatAsRGBA), a;
  }
});
var Uo = y((yg, Mo) => {
  var wh = Po(),
    Eh = No();
  Mo.exports = { encode: wh, decode: Eh };
});
var jo = y((bg, Do) => {
  "use strict";
  function Gi() {
    (this._types = Object.create(null)),
      (this._extensions = Object.create(null));
    for (let t = 0; t < arguments.length; t++) this.define(arguments[t]);
    (this.define = this.define.bind(this)),
      (this.getType = this.getType.bind(this)),
      (this.getExtension = this.getExtension.bind(this));
  }
  Gi.prototype.define = function (t, e) {
    for (let i in t) {
      let r = t[i].map(function (n) {
        return n.toLowerCase();
      });
      i = i.toLowerCase();
      for (let n = 0; n < r.length; n++) {
        let s = r[n];
        if (s[0] !== "*") {
          if (!e && s in this._types)
            throw new Error(
              'Attempt to change mapping for "' +
                s +
                '" extension from "' +
                this._types[s] +
                '" to "' +
                i +
                '". Pass `force=true` to allow this, otherwise remove "' +
                s +
                '" from the list of extensions for "' +
                i +
                '".'
            );
          this._types[s] = i;
        }
      }
      if (e || !this._extensions[i]) {
        let n = r[0];
        this._extensions[i] = n[0] !== "*" ? n : n.substr(1);
      }
    }
  };
  Gi.prototype.getType = function (t) {
    t = String(t);
    let e = t.replace(/^.*[/\\]/, "").toLowerCase(),
      i = e.replace(/^.*\./, "").toLowerCase(),
      r = e.length < t.length;
    return ((i.length < e.length - 1 || !r) && this._types[i]) || null;
  };
  Gi.prototype.getExtension = function (t) {
    return (
      (t = /^\s*([^;\s]*)/.test(t) && RegExp.$1),
      (t && this._extensions[t.toLowerCase()]) || null
    );
  };
  Do.exports = Gi;
});
var Ho = y((wg, qo) => {
  qo.exports = {
    "application/andrew-inset": ["ez"],
    "application/applixware": ["aw"],
    "application/atom+xml": ["atom"],
    "application/atomcat+xml": ["atomcat"],
    "application/atomdeleted+xml": ["atomdeleted"],
    "application/atomsvc+xml": ["atomsvc"],
    "application/atsc-dwd+xml": ["dwd"],
    "application/atsc-held+xml": ["held"],
    "application/atsc-rsat+xml": ["rsat"],
    "application/bdoc": ["bdoc"],
    "application/calendar+xml": ["xcs"],
    "application/ccxml+xml": ["ccxml"],
    "application/cdfx+xml": ["cdfx"],
    "application/cdmi-capability": ["cdmia"],
    "application/cdmi-container": ["cdmic"],
    "application/cdmi-domain": ["cdmid"],
    "application/cdmi-object": ["cdmio"],
    "application/cdmi-queue": ["cdmiq"],
    "application/cu-seeme": ["cu"],
    "application/dash+xml": ["mpd"],
    "application/davmount+xml": ["davmount"],
    "application/docbook+xml": ["dbk"],
    "application/dssc+der": ["dssc"],
    "application/dssc+xml": ["xdssc"],
    "application/ecmascript": ["es", "ecma"],
    "application/emma+xml": ["emma"],
    "application/emotionml+xml": ["emotionml"],
    "application/epub+zip": ["epub"],
    "application/exi": ["exi"],
    "application/express": ["exp"],
    "application/fdt+xml": ["fdt"],
    "application/font-tdpfr": ["pfr"],
    "application/geo+json": ["geojson"],
    "application/gml+xml": ["gml"],
    "application/gpx+xml": ["gpx"],
    "application/gxf": ["gxf"],
    "application/gzip": ["gz"],
    "application/hjson": ["hjson"],
    "application/hyperstudio": ["stk"],
    "application/inkml+xml": ["ink", "inkml"],
    "application/ipfix": ["ipfix"],
    "application/its+xml": ["its"],
    "application/java-archive": ["jar", "war", "ear"],
    "application/java-serialized-object": ["ser"],
    "application/java-vm": ["class"],
    "application/javascript": ["js", "mjs"],
    "application/json": ["json", "map"],
    "application/json5": ["json5"],
    "application/jsonml+json": ["jsonml"],
    "application/ld+json": ["jsonld"],
    "application/lgr+xml": ["lgr"],
    "application/lost+xml": ["lostxml"],
    "application/mac-binhex40": ["hqx"],
    "application/mac-compactpro": ["cpt"],
    "application/mads+xml": ["mads"],
    "application/manifest+json": ["webmanifest"],
    "application/marc": ["mrc"],
    "application/marcxml+xml": ["mrcx"],
    "application/mathematica": ["ma", "nb", "mb"],
    "application/mathml+xml": ["mathml"],
    "application/mbox": ["mbox"],
    "application/mediaservercontrol+xml": ["mscml"],
    "application/metalink+xml": ["metalink"],
    "application/metalink4+xml": ["meta4"],
    "application/mets+xml": ["mets"],
    "application/mmt-aei+xml": ["maei"],
    "application/mmt-usd+xml": ["musd"],
    "application/mods+xml": ["mods"],
    "application/mp21": ["m21", "mp21"],
    "application/mp4": ["mp4s", "m4p"],
    "application/msword": ["doc", "dot"],
    "application/mxf": ["mxf"],
    "application/n-quads": ["nq"],
    "application/n-triples": ["nt"],
    "application/node": ["cjs"],
    "application/octet-stream": [
      "bin",
      "dms",
      "lrf",
      "mar",
      "so",
      "dist",
      "distz",
      "pkg",
      "bpk",
      "dump",
      "elc",
      "deploy",
      "exe",
      "dll",
      "deb",
      "dmg",
      "iso",
      "img",
      "msi",
      "msp",
      "msm",
      "buffer",
    ],
    "application/oda": ["oda"],
    "application/oebps-package+xml": ["opf"],
    "application/ogg": ["ogx"],
    "application/omdoc+xml": ["omdoc"],
    "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"],
    "application/oxps": ["oxps"],
    "application/p2p-overlay+xml": ["relo"],
    "application/patch-ops-error+xml": ["xer"],
    "application/pdf": ["pdf"],
    "application/pgp-encrypted": ["pgp"],
    "application/pgp-signature": ["asc", "sig"],
    "application/pics-rules": ["prf"],
    "application/pkcs10": ["p10"],
    "application/pkcs7-mime": ["p7m", "p7c"],
    "application/pkcs7-signature": ["p7s"],
    "application/pkcs8": ["p8"],
    "application/pkix-attr-cert": ["ac"],
    "application/pkix-cert": ["cer"],
    "application/pkix-crl": ["crl"],
    "application/pkix-pkipath": ["pkipath"],
    "application/pkixcmp": ["pki"],
    "application/pls+xml": ["pls"],
    "application/postscript": ["ai", "eps", "ps"],
    "application/provenance+xml": ["provx"],
    "application/pskc+xml": ["pskcxml"],
    "application/raml+yaml": ["raml"],
    "application/rdf+xml": ["rdf", "owl"],
    "application/reginfo+xml": ["rif"],
    "application/relax-ng-compact-syntax": ["rnc"],
    "application/resource-lists+xml": ["rl"],
    "application/resource-lists-diff+xml": ["rld"],
    "application/rls-services+xml": ["rs"],
    "application/route-apd+xml": ["rapd"],
    "application/route-s-tsid+xml": ["sls"],
    "application/route-usd+xml": ["rusd"],
    "application/rpki-ghostbusters": ["gbr"],
    "application/rpki-manifest": ["mft"],
    "application/rpki-roa": ["roa"],
    "application/rsd+xml": ["rsd"],
    "application/rss+xml": ["rss"],
    "application/rtf": ["rtf"],
    "application/sbml+xml": ["sbml"],
    "application/scvp-cv-request": ["scq"],
    "application/scvp-cv-response": ["scs"],
    "application/scvp-vp-request": ["spq"],
    "application/scvp-vp-response": ["spp"],
    "application/sdp": ["sdp"],
    "application/senml+xml": ["senmlx"],
    "application/sensml+xml": ["sensmlx"],
    "application/set-payment-initiation": ["setpay"],
    "application/set-registration-initiation": ["setreg"],
    "application/shf+xml": ["shf"],
    "application/sieve": ["siv", "sieve"],
    "application/smil+xml": ["smi", "smil"],
    "application/sparql-query": ["rq"],
    "application/sparql-results+xml": ["srx"],
    "application/srgs": ["gram"],
    "application/srgs+xml": ["grxml"],
    "application/sru+xml": ["sru"],
    "application/ssdl+xml": ["ssdl"],
    "application/ssml+xml": ["ssml"],
    "application/swid+xml": ["swidtag"],
    "application/tei+xml": ["tei", "teicorpus"],
    "application/thraud+xml": ["tfi"],
    "application/timestamped-data": ["tsd"],
    "application/toml": ["toml"],
    "application/trig": ["trig"],
    "application/ttml+xml": ["ttml"],
    "application/ubjson": ["ubj"],
    "application/urc-ressheet+xml": ["rsheet"],
    "application/urc-targetdesc+xml": ["td"],
    "application/voicexml+xml": ["vxml"],
    "application/wasm": ["wasm"],
    "application/widget": ["wgt"],
    "application/winhlp": ["hlp"],
    "application/wsdl+xml": ["wsdl"],
    "application/wspolicy+xml": ["wspolicy"],
    "application/xaml+xml": ["xaml"],
    "application/xcap-att+xml": ["xav"],
    "application/xcap-caps+xml": ["xca"],
    "application/xcap-diff+xml": ["xdf"],
    "application/xcap-el+xml": ["xel"],
    "application/xcap-ns+xml": ["xns"],
    "application/xenc+xml": ["xenc"],
    "application/xhtml+xml": ["xhtml", "xht"],
    "application/xliff+xml": ["xlf"],
    "application/xml": ["xml", "xsl", "xsd", "rng"],
    "application/xml-dtd": ["dtd"],
    "application/xop+xml": ["xop"],
    "application/xproc+xml": ["xpl"],
    "application/xslt+xml": ["*xsl", "xslt"],
    "application/xspf+xml": ["xspf"],
    "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"],
    "application/yang": ["yang"],
    "application/yin+xml": ["yin"],
    "application/zip": ["zip"],
    "audio/3gpp": ["*3gpp"],
    "audio/adpcm": ["adp"],
    "audio/amr": ["amr"],
    "audio/basic": ["au", "snd"],
    "audio/midi": ["mid", "midi", "kar", "rmi"],
    "audio/mobile-xmf": ["mxmf"],
    "audio/mp3": ["*mp3"],
    "audio/mp4": ["m4a", "mp4a"],
    "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
    "audio/ogg": ["oga", "ogg", "spx", "opus"],
    "audio/s3m": ["s3m"],
    "audio/silk": ["sil"],
    "audio/wav": ["wav"],
    "audio/wave": ["*wav"],
    "audio/webm": ["weba"],
    "audio/xm": ["xm"],
    "font/collection": ["ttc"],
    "font/otf": ["otf"],
    "font/ttf": ["ttf"],
    "font/woff": ["woff"],
    "font/woff2": ["woff2"],
    "image/aces": ["exr"],
    "image/apng": ["apng"],
    "image/avif": ["avif"],
    "image/bmp": ["bmp"],
    "image/cgm": ["cgm"],
    "image/dicom-rle": ["drle"],
    "image/emf": ["emf"],
    "image/fits": ["fits"],
    "image/g3fax": ["g3"],
    "image/gif": ["gif"],
    "image/heic": ["heic"],
    "image/heic-sequence": ["heics"],
    "image/heif": ["heif"],
    "image/heif-sequence": ["heifs"],
    "image/hej2k": ["hej2"],
    "image/hsj2": ["hsj2"],
    "image/ief": ["ief"],
    "image/jls": ["jls"],
    "image/jp2": ["jp2", "jpg2"],
    "image/jpeg": ["jpeg", "jpg", "jpe"],
    "image/jph": ["jph"],
    "image/jphc": ["jhc"],
    "image/jpm": ["jpm"],
    "image/jpx": ["jpx", "jpf"],
    "image/jxr": ["jxr"],
    "image/jxra": ["jxra"],
    "image/jxrs": ["jxrs"],
    "image/jxs": ["jxs"],
    "image/jxsc": ["jxsc"],
    "image/jxsi": ["jxsi"],
    "image/jxss": ["jxss"],
    "image/ktx": ["ktx"],
    "image/ktx2": ["ktx2"],
    "image/png": ["png"],
    "image/sgi": ["sgi"],
    "image/svg+xml": ["svg", "svgz"],
    "image/t38": ["t38"],
    "image/tiff": ["tif", "tiff"],
    "image/tiff-fx": ["tfx"],
    "image/webp": ["webp"],
    "image/wmf": ["wmf"],
    "message/disposition-notification": ["disposition-notification"],
    "message/global": ["u8msg"],
    "message/global-delivery-status": ["u8dsn"],
    "message/global-disposition-notification": ["u8mdn"],
    "message/global-headers": ["u8hdr"],
    "message/rfc822": ["eml", "mime"],
    "model/3mf": ["3mf"],
    "model/gltf+json": ["gltf"],
    "model/gltf-binary": ["glb"],
    "model/iges": ["igs", "iges"],
    "model/mesh": ["msh", "mesh", "silo"],
    "model/mtl": ["mtl"],
    "model/obj": ["obj"],
    "model/step+xml": ["stpx"],
    "model/step+zip": ["stpz"],
    "model/step-xml+zip": ["stpxz"],
    "model/stl": ["stl"],
    "model/vrml": ["wrl", "vrml"],
    "model/x3d+binary": ["*x3db", "x3dbz"],
    "model/x3d+fastinfoset": ["x3db"],
    "model/x3d+vrml": ["*x3dv", "x3dvz"],
    "model/x3d+xml": ["x3d", "x3dz"],
    "model/x3d-vrml": ["x3dv"],
    "text/cache-manifest": ["appcache", "manifest"],
    "text/calendar": ["ics", "ifb"],
    "text/coffeescript": ["coffee", "litcoffee"],
    "text/css": ["css"],
    "text/csv": ["csv"],
    "text/html": ["html", "htm", "shtml"],
    "text/jade": ["jade"],
    "text/jsx": ["jsx"],
    "text/less": ["less"],
    "text/markdown": ["markdown", "md"],
    "text/mathml": ["mml"],
    "text/mdx": ["mdx"],
    "text/n3": ["n3"],
    "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"],
    "text/richtext": ["rtx"],
    "text/rtf": ["*rtf"],
    "text/sgml": ["sgml", "sgm"],
    "text/shex": ["shex"],
    "text/slim": ["slim", "slm"],
    "text/spdx": ["spdx"],
    "text/stylus": ["stylus", "styl"],
    "text/tab-separated-values": ["tsv"],
    "text/troff": ["t", "tr", "roff", "man", "me", "ms"],
    "text/turtle": ["ttl"],
    "text/uri-list": ["uri", "uris", "urls"],
    "text/vcard": ["vcard"],
    "text/vtt": ["vtt"],
    "text/xml": ["*xml"],
    "text/yaml": ["yaml", "yml"],
    "video/3gpp": ["3gp", "3gpp"],
    "video/3gpp2": ["3g2"],
    "video/h261": ["h261"],
    "video/h263": ["h263"],
    "video/h264": ["h264"],
    "video/iso.segment": ["m4s"],
    "video/jpeg": ["jpgv"],
    "video/jpm": ["*jpm", "jpgm"],
    "video/mj2": ["mj2", "mjp2"],
    "video/mp2t": ["ts"],
    "video/mp4": ["mp4", "mp4v", "mpg4"],
    "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"],
    "video/ogg": ["ogv"],
    "video/quicktime": ["qt", "mov"],
    "video/webm": ["webm"],
  };
});
var $o = y((Eg, Vo) => {
  Vo.exports = {
    "application/prs.cww": ["cww"],
    "application/vnd.1000minds.decision-model+xml": ["1km"],
    "application/vnd.3gpp.pic-bw-large": ["plb"],
    "application/vnd.3gpp.pic-bw-small": ["psb"],
    "application/vnd.3gpp.pic-bw-var": ["pvb"],
    "application/vnd.3gpp2.tcap": ["tcap"],
    "application/vnd.3m.post-it-notes": ["pwn"],
    "application/vnd.accpac.simply.aso": ["aso"],
    "application/vnd.accpac.simply.imp": ["imp"],
    "application/vnd.acucobol": ["acu"],
    "application/vnd.acucorp": ["atc", "acutc"],
    "application/vnd.adobe.air-application-installer-package+zip": ["air"],
    "application/vnd.adobe.formscentral.fcdt": ["fcdt"],
    "application/vnd.adobe.fxp": ["fxp", "fxpl"],
    "application/vnd.adobe.xdp+xml": ["xdp"],
    "application/vnd.adobe.xfdf": ["xfdf"],
    "application/vnd.ahead.space": ["ahead"],
    "application/vnd.airzip.filesecure.azf": ["azf"],
    "application/vnd.airzip.filesecure.azs": ["azs"],
    "application/vnd.amazon.ebook": ["azw"],
    "application/vnd.americandynamics.acc": ["acc"],
    "application/vnd.amiga.ami": ["ami"],
    "application/vnd.android.package-archive": ["apk"],
    "application/vnd.anser-web-certificate-issue-initiation": ["cii"],
    "application/vnd.anser-web-funds-transfer-initiation": ["fti"],
    "application/vnd.antix.game-component": ["atx"],
    "application/vnd.apple.installer+xml": ["mpkg"],
    "application/vnd.apple.keynote": ["key"],
    "application/vnd.apple.mpegurl": ["m3u8"],
    "application/vnd.apple.numbers": ["numbers"],
    "application/vnd.apple.pages": ["pages"],
    "application/vnd.apple.pkpass": ["pkpass"],
    "application/vnd.aristanetworks.swi": ["swi"],
    "application/vnd.astraea-software.iota": ["iota"],
    "application/vnd.audiograph": ["aep"],
    "application/vnd.balsamiq.bmml+xml": ["bmml"],
    "application/vnd.blueice.multipass": ["mpm"],
    "application/vnd.bmi": ["bmi"],
    "application/vnd.businessobjects": ["rep"],
    "application/vnd.chemdraw+xml": ["cdxml"],
    "application/vnd.chipnuts.karaoke-mmd": ["mmd"],
    "application/vnd.cinderella": ["cdy"],
    "application/vnd.citationstyles.style+xml": ["csl"],
    "application/vnd.claymore": ["cla"],
    "application/vnd.cloanto.rp9": ["rp9"],
    "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"],
    "application/vnd.cluetrust.cartomobile-config": ["c11amc"],
    "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"],
    "application/vnd.commonspace": ["csp"],
    "application/vnd.contact.cmsg": ["cdbcmsg"],
    "application/vnd.cosmocaller": ["cmc"],
    "application/vnd.crick.clicker": ["clkx"],
    "application/vnd.crick.clicker.keyboard": ["clkk"],
    "application/vnd.crick.clicker.palette": ["clkp"],
    "application/vnd.crick.clicker.template": ["clkt"],
    "application/vnd.crick.clicker.wordbank": ["clkw"],
    "application/vnd.criticaltools.wbs+xml": ["wbs"],
    "application/vnd.ctc-posml": ["pml"],
    "application/vnd.cups-ppd": ["ppd"],
    "application/vnd.curl.car": ["car"],
    "application/vnd.curl.pcurl": ["pcurl"],
    "application/vnd.dart": ["dart"],
    "application/vnd.data-vision.rdz": ["rdz"],
    "application/vnd.dbf": ["dbf"],
    "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"],
    "application/vnd.dece.ttml+xml": ["uvt", "uvvt"],
    "application/vnd.dece.unspecified": ["uvx", "uvvx"],
    "application/vnd.dece.zip": ["uvz", "uvvz"],
    "application/vnd.denovo.fcselayout-link": ["fe_launch"],
    "application/vnd.dna": ["dna"],
    "application/vnd.dolby.mlp": ["mlp"],
    "application/vnd.dpgraph": ["dpg"],
    "application/vnd.dreamfactory": ["dfac"],
    "application/vnd.ds-keypoint": ["kpxx"],
    "application/vnd.dvb.ait": ["ait"],
    "application/vnd.dvb.service": ["svc"],
    "application/vnd.dynageo": ["geo"],
    "application/vnd.ecowin.chart": ["mag"],
    "application/vnd.enliven": ["nml"],
    "application/vnd.epson.esf": ["esf"],
    "application/vnd.epson.msf": ["msf"],
    "application/vnd.epson.quickanime": ["qam"],
    "application/vnd.epson.salt": ["slt"],
    "application/vnd.epson.ssf": ["ssf"],
    "application/vnd.eszigno3+xml": ["es3", "et3"],
    "application/vnd.ezpix-album": ["ez2"],
    "application/vnd.ezpix-package": ["ez3"],
    "application/vnd.fdf": ["fdf"],
    "application/vnd.fdsn.mseed": ["mseed"],
    "application/vnd.fdsn.seed": ["seed", "dataless"],
    "application/vnd.flographit": ["gph"],
    "application/vnd.fluxtime.clip": ["ftc"],
    "application/vnd.framemaker": ["fm", "frame", "maker", "book"],
    "application/vnd.frogans.fnc": ["fnc"],
    "application/vnd.frogans.ltf": ["ltf"],
    "application/vnd.fsc.weblaunch": ["fsc"],
    "application/vnd.fujitsu.oasys": ["oas"],
    "application/vnd.fujitsu.oasys2": ["oa2"],
    "application/vnd.fujitsu.oasys3": ["oa3"],
    "application/vnd.fujitsu.oasysgp": ["fg5"],
    "application/vnd.fujitsu.oasysprs": ["bh2"],
    "application/vnd.fujixerox.ddd": ["ddd"],
    "application/vnd.fujixerox.docuworks": ["xdw"],
    "application/vnd.fujixerox.docuworks.binder": ["xbd"],
    "application/vnd.fuzzysheet": ["fzs"],
    "application/vnd.genomatix.tuxedo": ["txd"],
    "application/vnd.geogebra.file": ["ggb"],
    "application/vnd.geogebra.tool": ["ggt"],
    "application/vnd.geometry-explorer": ["gex", "gre"],
    "application/vnd.geonext": ["gxt"],
    "application/vnd.geoplan": ["g2w"],
    "application/vnd.geospace": ["g3w"],
    "application/vnd.gmx": ["gmx"],
    "application/vnd.google-apps.document": ["gdoc"],
    "application/vnd.google-apps.presentation": ["gslides"],
    "application/vnd.google-apps.spreadsheet": ["gsheet"],
    "application/vnd.google-earth.kml+xml": ["kml"],
    "application/vnd.google-earth.kmz": ["kmz"],
    "application/vnd.grafeq": ["gqf", "gqs"],
    "application/vnd.groove-account": ["gac"],
    "application/vnd.groove-help": ["ghf"],
    "application/vnd.groove-identity-message": ["gim"],
    "application/vnd.groove-injector": ["grv"],
    "application/vnd.groove-tool-message": ["gtm"],
    "application/vnd.groove-tool-template": ["tpl"],
    "application/vnd.groove-vcard": ["vcg"],
    "application/vnd.hal+xml": ["hal"],
    "application/vnd.handheld-entertainment+xml": ["zmm"],
    "application/vnd.hbci": ["hbci"],
    "application/vnd.hhe.lesson-player": ["les"],
    "application/vnd.hp-hpgl": ["hpgl"],
    "application/vnd.hp-hpid": ["hpid"],
    "application/vnd.hp-hps": ["hps"],
    "application/vnd.hp-jlyt": ["jlt"],
    "application/vnd.hp-pcl": ["pcl"],
    "application/vnd.hp-pclxl": ["pclxl"],
    "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"],
    "application/vnd.ibm.minipay": ["mpy"],
    "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"],
    "application/vnd.ibm.rights-management": ["irm"],
    "application/vnd.ibm.secure-container": ["sc"],
    "application/vnd.iccprofile": ["icc", "icm"],
    "application/vnd.igloader": ["igl"],
    "application/vnd.immervision-ivp": ["ivp"],
    "application/vnd.immervision-ivu": ["ivu"],
    "application/vnd.insors.igm": ["igm"],
    "application/vnd.intercon.formnet": ["xpw", "xpx"],
    "application/vnd.intergeo": ["i2g"],
    "application/vnd.intu.qbo": ["qbo"],
    "application/vnd.intu.qfx": ["qfx"],
    "application/vnd.ipunplugged.rcprofile": ["rcprofile"],
    "application/vnd.irepository.package+xml": ["irp"],
    "application/vnd.is-xpr": ["xpr"],
    "application/vnd.isac.fcs": ["fcs"],
    "application/vnd.jam": ["jam"],
    "application/vnd.jcp.javame.midlet-rms": ["rms"],
    "application/vnd.jisp": ["jisp"],
    "application/vnd.joost.joda-archive": ["joda"],
    "application/vnd.kahootz": ["ktz", "ktr"],
    "application/vnd.kde.karbon": ["karbon"],
    "application/vnd.kde.kchart": ["chrt"],
    "application/vnd.kde.kformula": ["kfo"],
    "application/vnd.kde.kivio": ["flw"],
    "application/vnd.kde.kontour": ["kon"],
    "application/vnd.kde.kpresenter": ["kpr", "kpt"],
    "application/vnd.kde.kspread": ["ksp"],
    "application/vnd.kde.kword": ["kwd", "kwt"],
    "application/vnd.kenameaapp": ["htke"],
    "application/vnd.kidspiration": ["kia"],
    "application/vnd.kinar": ["kne", "knp"],
    "application/vnd.koan": ["skp", "skd", "skt", "skm"],
    "application/vnd.kodak-descriptor": ["sse"],
    "application/vnd.las.las+xml": ["lasxml"],
    "application/vnd.llamagraphics.life-balance.desktop": ["lbd"],
    "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"],
    "application/vnd.lotus-1-2-3": ["123"],
    "application/vnd.lotus-approach": ["apr"],
    "application/vnd.lotus-freelance": ["pre"],
    "application/vnd.lotus-notes": ["nsf"],
    "application/vnd.lotus-organizer": ["org"],
    "application/vnd.lotus-screencam": ["scm"],
    "application/vnd.lotus-wordpro": ["lwp"],
    "application/vnd.macports.portpkg": ["portpkg"],
    "application/vnd.mapbox-vector-tile": ["mvt"],
    "application/vnd.mcd": ["mcd"],
    "application/vnd.medcalcdata": ["mc1"],
    "application/vnd.mediastation.cdkey": ["cdkey"],
    "application/vnd.mfer": ["mwf"],
    "application/vnd.mfmp": ["mfm"],
    "application/vnd.micrografx.flo": ["flo"],
    "application/vnd.micrografx.igx": ["igx"],
    "application/vnd.mif": ["mif"],
    "application/vnd.mobius.daf": ["daf"],
    "application/vnd.mobius.dis": ["dis"],
    "application/vnd.mobius.mbk": ["mbk"],
    "application/vnd.mobius.mqy": ["mqy"],
    "application/vnd.mobius.msl": ["msl"],
    "application/vnd.mobius.plc": ["plc"],
    "application/vnd.mobius.txf": ["txf"],
    "application/vnd.mophun.application": ["mpn"],
    "application/vnd.mophun.certificate": ["mpc"],
    "application/vnd.mozilla.xul+xml": ["xul"],
    "application/vnd.ms-artgalry": ["cil"],
    "application/vnd.ms-cab-compressed": ["cab"],
    "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"],
    "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"],
    "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"],
    "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"],
    "application/vnd.ms-excel.template.macroenabled.12": ["xltm"],
    "application/vnd.ms-fontobject": ["eot"],
    "application/vnd.ms-htmlhelp": ["chm"],
    "application/vnd.ms-ims": ["ims"],
    "application/vnd.ms-lrm": ["lrm"],
    "application/vnd.ms-officetheme": ["thmx"],
    "application/vnd.ms-outlook": ["msg"],
    "application/vnd.ms-pki.seccat": ["cat"],
    "application/vnd.ms-pki.stl": ["*stl"],
    "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"],
    "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"],
    "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"],
    "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"],
    "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"],
    "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"],
    "application/vnd.ms-project": ["mpp", "mpt"],
    "application/vnd.ms-word.document.macroenabled.12": ["docm"],
    "application/vnd.ms-word.template.macroenabled.12": ["dotm"],
    "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"],
    "application/vnd.ms-wpl": ["wpl"],
    "application/vnd.ms-xpsdocument": ["xps"],
    "application/vnd.mseq": ["mseq"],
    "application/vnd.musician": ["mus"],
    "application/vnd.muvee.style": ["msty"],
    "application/vnd.mynfc": ["taglet"],
    "application/vnd.neurolanguage.nlu": ["nlu"],
    "application/vnd.nitf": ["ntf", "nitf"],
    "application/vnd.noblenet-directory": ["nnd"],
    "application/vnd.noblenet-sealer": ["nns"],
    "application/vnd.noblenet-web": ["nnw"],
    "application/vnd.nokia.n-gage.ac+xml": ["*ac"],
    "application/vnd.nokia.n-gage.data": ["ngdat"],
    "application/vnd.nokia.n-gage.symbian.install": ["n-gage"],
    "application/vnd.nokia.radio-preset": ["rpst"],
    "application/vnd.nokia.radio-presets": ["rpss"],
    "application/vnd.novadigm.edm": ["edm"],
    "application/vnd.novadigm.edx": ["edx"],
    "application/vnd.novadigm.ext": ["ext"],
    "application/vnd.oasis.opendocument.chart": ["odc"],
    "application/vnd.oasis.opendocument.chart-template": ["otc"],
    "application/vnd.oasis.opendocument.database": ["odb"],
    "application/vnd.oasis.opendocument.formula": ["odf"],
    "application/vnd.oasis.opendocument.formula-template": ["odft"],
    "application/vnd.oasis.opendocument.graphics": ["odg"],
    "application/vnd.oasis.opendocument.graphics-template": ["otg"],
    "application/vnd.oasis.opendocument.image": ["odi"],
    "application/vnd.oasis.opendocument.image-template": ["oti"],
    "application/vnd.oasis.opendocument.presentation": ["odp"],
    "application/vnd.oasis.opendocument.presentation-template": ["otp"],
    "application/vnd.oasis.opendocument.spreadsheet": ["ods"],
    "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"],
    "application/vnd.oasis.opendocument.text": ["odt"],
    "application/vnd.oasis.opendocument.text-master": ["odm"],
    "application/vnd.oasis.opendocument.text-template": ["ott"],
    "application/vnd.oasis.opendocument.text-web": ["oth"],
    "application/vnd.olpc-sugar": ["xo"],
    "application/vnd.oma.dd2+xml": ["dd2"],
    "application/vnd.openblox.game+xml": ["obgx"],
    "application/vnd.openofficeorg.extension": ["oxt"],
    "application/vnd.openstreetmap.data+xml": ["osm"],
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      ["pptx"],
    "application/vnd.openxmlformats-officedocument.presentationml.slide": [
      "sldx",
    ],
    "application/vnd.openxmlformats-officedocument.presentationml.slideshow": [
      "ppsx",
    ],
    "application/vnd.openxmlformats-officedocument.presentationml.template": [
      "potx",
    ],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      "xlsx",
    ],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template": [
      "xltx",
    ],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      "docx",
    ],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.template": [
      "dotx",
    ],
    "application/vnd.osgeo.mapguide.package": ["mgp"],
    "application/vnd.osgi.dp": ["dp"],
    "application/vnd.osgi.subsystem": ["esa"],
    "application/vnd.palm": ["pdb", "pqa", "oprc"],
    "application/vnd.pawaafile": ["paw"],
    "application/vnd.pg.format": ["str"],
    "application/vnd.pg.osasli": ["ei6"],
    "application/vnd.picsel": ["efif"],
    "application/vnd.pmi.widget": ["wg"],
    "application/vnd.pocketlearn": ["plf"],
    "application/vnd.powerbuilder6": ["pbd"],
    "application/vnd.previewsystems.box": ["box"],
    "application/vnd.proteus.magazine": ["mgz"],
    "application/vnd.publishare-delta-tree": ["qps"],
    "application/vnd.pvi.ptid1": ["ptid"],
    "application/vnd.quark.quarkxpress": [
      "qxd",
      "qxt",
      "qwd",
      "qwt",
      "qxl",
      "qxb",
    ],
    "application/vnd.rar": ["rar"],
    "application/vnd.realvnc.bed": ["bed"],
    "application/vnd.recordare.musicxml": ["mxl"],
    "application/vnd.recordare.musicxml+xml": ["musicxml"],
    "application/vnd.rig.cryptonote": ["cryptonote"],
    "application/vnd.rim.cod": ["cod"],
    "application/vnd.rn-realmedia": ["rm"],
    "application/vnd.rn-realmedia-vbr": ["rmvb"],
    "application/vnd.route66.link66+xml": ["link66"],
    "application/vnd.sailingtracker.track": ["st"],
    "application/vnd.seemail": ["see"],
    "application/vnd.sema": ["sema"],
    "application/vnd.semd": ["semd"],
    "application/vnd.semf": ["semf"],
    "application/vnd.shana.informed.formdata": ["ifm"],
    "application/vnd.shana.informed.formtemplate": ["itp"],
    "application/vnd.shana.informed.interchange": ["iif"],
    "application/vnd.shana.informed.package": ["ipk"],
    "application/vnd.simtech-mindmapper": ["twd", "twds"],
    "application/vnd.smaf": ["mmf"],
    "application/vnd.smart.teacher": ["teacher"],
    "application/vnd.software602.filler.form+xml": ["fo"],
    "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"],
    "application/vnd.spotfire.dxp": ["dxp"],
    "application/vnd.spotfire.sfs": ["sfs"],
    "application/vnd.stardivision.calc": ["sdc"],
    "application/vnd.stardivision.draw": ["sda"],
    "application/vnd.stardivision.impress": ["sdd"],
    "application/vnd.stardivision.math": ["smf"],
    "application/vnd.stardivision.writer": ["sdw", "vor"],
    "application/vnd.stardivision.writer-global": ["sgl"],
    "application/vnd.stepmania.package": ["smzip"],
    "application/vnd.stepmania.stepchart": ["sm"],
    "application/vnd.sun.wadl+xml": ["wadl"],
    "application/vnd.sun.xml.calc": ["sxc"],
    "application/vnd.sun.xml.calc.template": ["stc"],
    "application/vnd.sun.xml.draw": ["sxd"],
    "application/vnd.sun.xml.draw.template": ["std"],
    "application/vnd.sun.xml.impress": ["sxi"],
    "application/vnd.sun.xml.impress.template": ["sti"],
    "application/vnd.sun.xml.math": ["sxm"],
    "application/vnd.sun.xml.writer": ["sxw"],
    "application/vnd.sun.xml.writer.global": ["sxg"],
    "application/vnd.sun.xml.writer.template": ["stw"],
    "application/vnd.sus-calendar": ["sus", "susp"],
    "application/vnd.svd": ["svd"],
    "application/vnd.symbian.install": ["sis", "sisx"],
    "application/vnd.syncml+xml": ["xsm"],
    "application/vnd.syncml.dm+wbxml": ["bdm"],
    "application/vnd.syncml.dm+xml": ["xdm"],
    "application/vnd.syncml.dmddf+xml": ["ddf"],
    "application/vnd.tao.intent-module-archive": ["tao"],
    "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"],
    "application/vnd.tmobile-livetv": ["tmo"],
    "application/vnd.trid.tpt": ["tpt"],
    "application/vnd.triscape.mxs": ["mxs"],
    "application/vnd.trueapp": ["tra"],
    "application/vnd.ufdl": ["ufd", "ufdl"],
    "application/vnd.uiq.theme": ["utz"],
    "application/vnd.umajin": ["umj"],
    "application/vnd.unity": ["unityweb"],
    "application/vnd.uoml+xml": ["uoml"],
    "application/vnd.vcx": ["vcx"],
    "application/vnd.visio": ["vsd", "vst", "vss", "vsw"],
    "application/vnd.visionary": ["vis"],
    "application/vnd.vsf": ["vsf"],
    "application/vnd.wap.wbxml": ["wbxml"],
    "application/vnd.wap.wmlc": ["wmlc"],
    "application/vnd.wap.wmlscriptc": ["wmlsc"],
    "application/vnd.webturbo": ["wtb"],
    "application/vnd.wolfram.player": ["nbp"],
    "application/vnd.wordperfect": ["wpd"],
    "application/vnd.wqd": ["wqd"],
    "application/vnd.wt.stf": ["stf"],
    "application/vnd.xara": ["xar"],
    "application/vnd.xfdl": ["xfdl"],
    "application/vnd.yamaha.hv-dic": ["hvd"],
    "application/vnd.yamaha.hv-script": ["hvs"],
    "application/vnd.yamaha.hv-voice": ["hvp"],
    "application/vnd.yamaha.openscoreformat": ["osf"],
    "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"],
    "application/vnd.yamaha.smaf-audio": ["saf"],
    "application/vnd.yamaha.smaf-phrase": ["spf"],
    "application/vnd.yellowriver-custom-menu": ["cmp"],
    "application/vnd.zul": ["zir", "zirz"],
    "application/vnd.zzazz.deck+xml": ["zaz"],
    "application/x-7z-compressed": ["7z"],
    "application/x-abiword": ["abw"],
    "application/x-ace-compressed": ["ace"],
    "application/x-apple-diskimage": ["*dmg"],
    "application/x-arj": ["arj"],
    "application/x-authorware-bin": ["aab", "x32", "u32", "vox"],
    "application/x-authorware-map": ["aam"],
    "application/x-authorware-seg": ["aas"],
    "application/x-bcpio": ["bcpio"],
    "application/x-bdoc": ["*bdoc"],
    "application/x-bittorrent": ["torrent"],
    "application/x-blorb": ["blb", "blorb"],
    "application/x-bzip": ["bz"],
    "application/x-bzip2": ["bz2", "boz"],
    "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"],
    "application/x-cdlink": ["vcd"],
    "application/x-cfs-compressed": ["cfs"],
    "application/x-chat": ["chat"],
    "application/x-chess-pgn": ["pgn"],
    "application/x-chrome-extension": ["crx"],
    "application/x-cocoa": ["cco"],
    "application/x-conference": ["nsc"],
    "application/x-cpio": ["cpio"],
    "application/x-csh": ["csh"],
    "application/x-debian-package": ["*deb", "udeb"],
    "application/x-dgc-compressed": ["dgc"],
    "application/x-director": [
      "dir",
      "dcr",
      "dxr",
      "cst",
      "cct",
      "cxt",
      "w3d",
      "fgd",
      "swa",
    ],
    "application/x-doom": ["wad"],
    "application/x-dtbncx+xml": ["ncx"],
    "application/x-dtbook+xml": ["dtb"],
    "application/x-dtbresource+xml": ["res"],
    "application/x-dvi": ["dvi"],
    "application/x-envoy": ["evy"],
    "application/x-eva": ["eva"],
    "application/x-font-bdf": ["bdf"],
    "application/x-font-ghostscript": ["gsf"],
    "application/x-font-linux-psf": ["psf"],
    "application/x-font-pcf": ["pcf"],
    "application/x-font-snf": ["snf"],
    "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"],
    "application/x-freearc": ["arc"],
    "application/x-futuresplash": ["spl"],
    "application/x-gca-compressed": ["gca"],
    "application/x-glulx": ["ulx"],
    "application/x-gnumeric": ["gnumeric"],
    "application/x-gramps-xml": ["gramps"],
    "application/x-gtar": ["gtar"],
    "application/x-hdf": ["hdf"],
    "application/x-httpd-php": ["php"],
    "application/x-install-instructions": ["install"],
    "application/x-iso9660-image": ["*iso"],
    "application/x-iwork-keynote-sffkey": ["*key"],
    "application/x-iwork-numbers-sffnumbers": ["*numbers"],
    "application/x-iwork-pages-sffpages": ["*pages"],
    "application/x-java-archive-diff": ["jardiff"],
    "application/x-java-jnlp-file": ["jnlp"],
    "application/x-keepass2": ["kdbx"],
    "application/x-latex": ["latex"],
    "application/x-lua-bytecode": ["luac"],
    "application/x-lzh-compressed": ["lzh", "lha"],
    "application/x-makeself": ["run"],
    "application/x-mie": ["mie"],
    "application/x-mobipocket-ebook": ["prc", "mobi"],
    "application/x-ms-application": ["application"],
    "application/x-ms-shortcut": ["lnk"],
    "application/x-ms-wmd": ["wmd"],
    "application/x-ms-wmz": ["wmz"],
    "application/x-ms-xbap": ["xbap"],
    "application/x-msaccess": ["mdb"],
    "application/x-msbinder": ["obd"],
    "application/x-mscardfile": ["crd"],
    "application/x-msclip": ["clp"],
    "application/x-msdos-program": ["*exe"],
    "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"],
    "application/x-msmediaview": ["mvb", "m13", "m14"],
    "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"],
    "application/x-msmoney": ["mny"],
    "application/x-mspublisher": ["pub"],
    "application/x-msschedule": ["scd"],
    "application/x-msterminal": ["trm"],
    "application/x-mswrite": ["wri"],
    "application/x-netcdf": ["nc", "cdf"],
    "application/x-ns-proxy-autoconfig": ["pac"],
    "application/x-nzb": ["nzb"],
    "application/x-perl": ["pl", "pm"],
    "application/x-pilot": ["*prc", "*pdb"],
    "application/x-pkcs12": ["p12", "pfx"],
    "application/x-pkcs7-certificates": ["p7b", "spc"],
    "application/x-pkcs7-certreqresp": ["p7r"],
    "application/x-rar-compressed": ["*rar"],
    "application/x-redhat-package-manager": ["rpm"],
    "application/x-research-info-systems": ["ris"],
    "application/x-sea": ["sea"],
    "application/x-sh": ["sh"],
    "application/x-shar": ["shar"],
    "application/x-shockwave-flash": ["swf"],
    "application/x-silverlight-app": ["xap"],
    "application/x-sql": ["sql"],
    "application/x-stuffit": ["sit"],
    "application/x-stuffitx": ["sitx"],
    "application/x-subrip": ["srt"],
    "application/x-sv4cpio": ["sv4cpio"],
    "application/x-sv4crc": ["sv4crc"],
    "application/x-t3vm-image": ["t3"],
    "application/x-tads": ["gam"],
    "application/x-tar": ["tar"],
    "application/x-tcl": ["tcl", "tk"],
    "application/x-tex": ["tex"],
    "application/x-tex-tfm": ["tfm"],
    "application/x-texinfo": ["texinfo", "texi"],
    "application/x-tgif": ["*obj"],
    "application/x-ustar": ["ustar"],
    "application/x-virtualbox-hdd": ["hdd"],
    "application/x-virtualbox-ova": ["ova"],
    "application/x-virtualbox-ovf": ["ovf"],
    "application/x-virtualbox-vbox": ["vbox"],
    "application/x-virtualbox-vbox-extpack": ["vbox-extpack"],
    "application/x-virtualbox-vdi": ["vdi"],
    "application/x-virtualbox-vhd": ["vhd"],
    "application/x-virtualbox-vmdk": ["vmdk"],
    "application/x-wais-source": ["src"],
    "application/x-web-app-manifest+json": ["webapp"],
    "application/x-x509-ca-cert": ["der", "crt", "pem"],
    "application/x-xfig": ["fig"],
    "application/x-xliff+xml": ["*xlf"],
    "application/x-xpinstall": ["xpi"],
    "application/x-xz": ["xz"],
    "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"],
    "audio/vnd.dece.audio": ["uva", "uvva"],
    "audio/vnd.digital-winds": ["eol"],
    "audio/vnd.dra": ["dra"],
    "audio/vnd.dts": ["dts"],
    "audio/vnd.dts.hd": ["dtshd"],
    "audio/vnd.lucent.voice": ["lvp"],
    "audio/vnd.ms-playready.media.pya": ["pya"],
    "audio/vnd.nuera.ecelp4800": ["ecelp4800"],
    "audio/vnd.nuera.ecelp7470": ["ecelp7470"],
    "audio/vnd.nuera.ecelp9600": ["ecelp9600"],
    "audio/vnd.rip": ["rip"],
    "audio/x-aac": ["aac"],
    "audio/x-aiff": ["aif", "aiff", "aifc"],
    "audio/x-caf": ["caf"],
    "audio/x-flac": ["flac"],
    "audio/x-m4a": ["*m4a"],
    "audio/x-matroska": ["mka"],
    "audio/x-mpegurl": ["m3u"],
    "audio/x-ms-wax": ["wax"],
    "audio/x-ms-wma": ["wma"],
    "audio/x-pn-realaudio": ["ram", "ra"],
    "audio/x-pn-realaudio-plugin": ["rmp"],
    "audio/x-realaudio": ["*ra"],
    "audio/x-wav": ["*wav"],
    "chemical/x-cdx": ["cdx"],
    "chemical/x-cif": ["cif"],
    "chemical/x-cmdf": ["cmdf"],
    "chemical/x-cml": ["cml"],
    "chemical/x-csml": ["csml"],
    "chemical/x-xyz": ["xyz"],
    "image/prs.btif": ["btif"],
    "image/prs.pti": ["pti"],
    "image/vnd.adobe.photoshop": ["psd"],
    "image/vnd.airzip.accelerator.azv": ["azv"],
    "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"],
    "image/vnd.djvu": ["djvu", "djv"],
    "image/vnd.dvb.subtitle": ["*sub"],
    "image/vnd.dwg": ["dwg"],
    "image/vnd.dxf": ["dxf"],
    "image/vnd.fastbidsheet": ["fbs"],
    "image/vnd.fpx": ["fpx"],
    "image/vnd.fst": ["fst"],
    "image/vnd.fujixerox.edmics-mmr": ["mmr"],
    "image/vnd.fujixerox.edmics-rlc": ["rlc"],
    "image/vnd.microsoft.icon": ["ico"],
    "image/vnd.ms-dds": ["dds"],
    "image/vnd.ms-modi": ["mdi"],
    "image/vnd.ms-photo": ["wdp"],
    "image/vnd.net-fpx": ["npx"],
    "image/vnd.pco.b16": ["b16"],
    "image/vnd.tencent.tap": ["tap"],
    "image/vnd.valve.source.texture": ["vtf"],
    "image/vnd.wap.wbmp": ["wbmp"],
    "image/vnd.xiff": ["xif"],
    "image/vnd.zbrush.pcx": ["pcx"],
    "image/x-3ds": ["3ds"],
    "image/x-cmu-raster": ["ras"],
    "image/x-cmx": ["cmx"],
    "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"],
    "image/x-icon": ["*ico"],
    "image/x-jng": ["jng"],
    "image/x-mrsid-image": ["sid"],
    "image/x-ms-bmp": ["*bmp"],
    "image/x-pcx": ["*pcx"],
    "image/x-pict": ["pic", "pct"],
    "image/x-portable-anymap": ["pnm"],
    "image/x-portable-bitmap": ["pbm"],
    "image/x-portable-graymap": ["pgm"],
    "image/x-portable-pixmap": ["ppm"],
    "image/x-rgb": ["rgb"],
    "image/x-tga": ["tga"],
    "image/x-xbitmap": ["xbm"],
    "image/x-xpixmap": ["xpm"],
    "image/x-xwindowdump": ["xwd"],
    "message/vnd.wfa.wsc": ["wsc"],
    "model/vnd.collada+xml": ["dae"],
    "model/vnd.dwf": ["dwf"],
    "model/vnd.gdl": ["gdl"],
    "model/vnd.gtw": ["gtw"],
    "model/vnd.mts": ["mts"],
    "model/vnd.opengex": ["ogex"],
    "model/vnd.parasolid.transmit.binary": ["x_b"],
    "model/vnd.parasolid.transmit.text": ["x_t"],
    "model/vnd.sap.vds": ["vds"],
    "model/vnd.usdz+zip": ["usdz"],
    "model/vnd.valve.source.compiled-map": ["bsp"],
    "model/vnd.vtu": ["vtu"],
    "text/prs.lines.tag": ["dsc"],
    "text/vnd.curl": ["curl"],
    "text/vnd.curl.dcurl": ["dcurl"],
    "text/vnd.curl.mcurl": ["mcurl"],
    "text/vnd.curl.scurl": ["scurl"],
    "text/vnd.dvb.subtitle": ["sub"],
    "text/vnd.fly": ["fly"],
    "text/vnd.fmi.flexstor": ["flx"],
    "text/vnd.graphviz": ["gv"],
    "text/vnd.in3d.3dml": ["3dml"],
    "text/vnd.in3d.spot": ["spot"],
    "text/vnd.sun.j2me.app-descriptor": ["jad"],
    "text/vnd.wap.wml": ["wml"],
    "text/vnd.wap.wmlscript": ["wmls"],
    "text/x-asm": ["s", "asm"],
    "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"],
    "text/x-component": ["htc"],
    "text/x-fortran": ["f", "for", "f77", "f90"],
    "text/x-handlebars-template": ["hbs"],
    "text/x-java-source": ["java"],
    "text/x-lua": ["lua"],
    "text/x-markdown": ["mkd"],
    "text/x-nfo": ["nfo"],
    "text/x-opml": ["opml"],
    "text/x-org": ["*org"],
    "text/x-pascal": ["p", "pas"],
    "text/x-processing": ["pde"],
    "text/x-sass": ["sass"],
    "text/x-scss": ["scss"],
    "text/x-setext": ["etx"],
    "text/x-sfv": ["sfv"],
    "text/x-suse-ymp": ["ymp"],
    "text/x-uuencode": ["uu"],
    "text/x-vcalendar": ["vcs"],
    "text/x-vcard": ["vcf"],
    "video/vnd.dece.hd": ["uvh", "uvvh"],
    "video/vnd.dece.mobile": ["uvm", "uvvm"],
    "video/vnd.dece.pd": ["uvp", "uvvp"],
    "video/vnd.dece.sd": ["uvs", "uvvs"],
    "video/vnd.dece.video": ["uvv", "uvvv"],
    "video/vnd.dvb.file": ["dvb"],
    "video/vnd.fvt": ["fvt"],
    "video/vnd.mpegurl": ["mxu", "m4u"],
    "video/vnd.ms-playready.media.pyv": ["pyv"],
    "video/vnd.uvvu.mp4": ["uvu", "uvvu"],
    "video/vnd.vivo": ["viv"],
    "video/x-f4v": ["f4v"],
    "video/x-fli": ["fli"],
    "video/x-flv": ["flv"],
    "video/x-m4v": ["m4v"],
    "video/x-matroska": ["mkv", "mk3d", "mks"],
    "video/x-mng": ["mng"],
    "video/x-ms-asf": ["asf", "asx"],
    "video/x-ms-vob": ["vob"],
    "video/x-ms-wm": ["wm"],
    "video/x-ms-wmv": ["wmv"],
    "video/x-ms-wmx": ["wmx"],
    "video/x-ms-wvx": ["wvx"],
    "video/x-msvideo": ["avi"],
    "video/x-sgi-movie": ["movie"],
    "video/x-smv": ["smv"],
    "x-conference/x-cooltalk": ["ice"],
  };
});
var zo = y((Sg, Go) => {
  "use strict";
  var Sh = jo();
  Go.exports = new Sh(Ho(), $o());
});
var Yo = y((kg, Wo) => {
  Wo.exports = function (t, e) {
    for (var i = [], r = 0; r < t.length; r++) {
      var n = e(t[r], r);
      kh(n) ? i.push.apply(i, n) : i.push(n);
    }
    return i;
  };
  var kh =
    Array.isArray ||
    function (t) {
      return Object.prototype.toString.call(t) === "[object Array]";
    };
});
var Qo = y((Cg, Jo) => {
  "use strict";
  Jo.exports = Zo;
  function Zo(t, e, i) {
    t instanceof RegExp && (t = Ko(t, i)),
      e instanceof RegExp && (e = Ko(e, i));
    var r = Xo(t, e, i);
    return (
      r && {
        start: r[0],
        end: r[1],
        pre: i.slice(0, r[0]),
        body: i.slice(r[0] + t.length, r[1]),
        post: i.slice(r[1] + e.length),
      }
    );
  }
  function Ko(t, e) {
    var i = e.match(t);
    return i ? i[0] : null;
  }
  Zo.range = Xo;
  function Xo(t, e, i) {
    var r,
      n,
      s,
      o,
      l,
      a = i.indexOf(t),
      c = i.indexOf(e, a + 1),
      u = a;
    if (a >= 0 && c > 0) {
      if (t === e) return [a, c];
      for (r = [], s = i.length; u >= 0 && !l; )
        u == a
          ? (r.push(u), (a = i.indexOf(t, u + 1)))
          : r.length == 1
          ? (l = [r.pop(), c])
          : ((n = r.pop()),
            n < s && ((s = n), (o = c)),
            (c = i.indexOf(e, u + 1))),
          (u = a < c && a >= 0 ? a : c);
      r.length && (l = [s, o]);
    }
    return l;
  }
});
var aa = y((Og, oa) => {
  var Ch = Yo(),
    ea = Qo();
  oa.exports = Th;
  var ta = "\0SLASH" + Math.random() + "\0",
    ia = "\0OPEN" + Math.random() + "\0",
    Nr = "\0CLOSE" + Math.random() + "\0",
    ra = "\0COMMA" + Math.random() + "\0",
    na = "\0PERIOD" + Math.random() + "\0";
  function Fr(t) {
    return parseInt(t, 10) == t ? parseInt(t, 10) : t.charCodeAt(0);
  }
  function Oh(t) {
    return t
      .split("\\\\")
      .join(ta)
      .split("\\{")
      .join(ia)
      .split("\\}")
      .join(Nr)
      .split("\\,")
      .join(ra)
      .split("\\.")
      .join(na);
  }
  function Ih(t) {
    return t
      .split(ta)
      .join("\\")
      .split(ia)
      .join("{")
      .split(Nr)
      .join("}")
      .split(ra)
      .join(",")
      .split(na)
      .join(".");
  }
  function sa(t) {
    if (!t) return [""];
    var e = [],
      i = ea("{", "}", t);
    if (!i) return t.split(",");
    var r = i.pre,
      n = i.body,
      s = i.post,
      o = r.split(",");
    o[o.length - 1] += "{" + n + "}";
    var l = sa(s);
    return (
      s.length && ((o[o.length - 1] += l.shift()), o.push.apply(o, l)),
      e.push.apply(e, o),
      e
    );
  }
  function Th(t) {
    return t
      ? (t.substr(0, 2) === "{}" && (t = "\\{\\}" + t.substr(2)),
        Gt(Oh(t), !0).map(Ih))
      : [];
  }
  function Ah(t) {
    return "{" + t + "}";
  }
  function Rh(t) {
    return /^-?0\d/.test(t);
  }
  function Bh(t, e) {
    return t <= e;
  }
  function Lh(t, e) {
    return t >= e;
  }
  function Gt(t, e) {
    var i = [],
      r = ea("{", "}", t);
    if (!r || /\$$/.test(r.pre)) return [t];
    var n = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(r.body),
      s = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(r.body),
      o = n || s,
      l = r.body.indexOf(",") >= 0;
    if (!o && !l)
      return r.post.match(/,.*\}/)
        ? ((t = r.pre + "{" + r.body + Nr + r.post), Gt(t))
        : [t];
    var a;
    if (o) a = r.body.split(/\.\./);
    else if (
      ((a = sa(r.body)),
      a.length === 1 && ((a = Gt(a[0], !1).map(Ah)), a.length === 1))
    ) {
      var u = r.post.length ? Gt(r.post, !1) : [""];
      return u.map(function (B) {
        return r.pre + a[0] + B;
      });
    }
    var c = r.pre,
      u = r.post.length ? Gt(r.post, !1) : [""],
      f;
    if (o) {
      var h = Fr(a[0]),
        p = Fr(a[1]),
        d = Math.max(a[0].length, a[1].length),
        m = a.length == 3 ? Math.abs(Fr(a[2])) : 1,
        v = Bh,
        E = p < h;
      E && ((m *= -1), (v = Lh));
      var I = a.some(Rh);
      f = [];
      for (var w = h; v(w, p); w += m) {
        var C;
        if (s) (C = String.fromCharCode(w)), C === "\\" && (C = "");
        else if (((C = String(w)), I)) {
          var _ = d - C.length;
          if (_ > 0) {
            var $ = new Array(_ + 1).join("0");
            w < 0 ? (C = "-" + $ + C.slice(1)) : (C = $ + C);
          }
        }
        f.push(C);
      }
    } else
      f = Ch(a, function (T) {
        return Gt(T, !1);
      });
    for (var k = 0; k < f.length; k++)
      for (var U = 0; U < u.length; U++) {
        var b = c + f[k] + u[U];
        (!e || o || b) && i.push(b);
      }
    return i;
  }
});
var pa = y((Ig, ha) => {
  ha.exports = Ge;
  Ge.Minimatch = Fe;
  var yi = (function () {
    try {
      return require("path");
    } catch {}
  })() || { sep: "/" };
  Ge.sep = yi.sep;
  var Dr = (Ge.GLOBSTAR = Fe.GLOBSTAR = {}),
    Ph = aa(),
    la = {
      "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
      "?": { open: "(?:", close: ")?" },
      "+": { open: "(?:", close: ")+" },
      "*": { open: "(?:", close: ")*" },
      "@": { open: "(?:", close: ")" },
    },
    Mr = "[^/]",
    Ur = Mr + "*?",
    Fh = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?",
    Nh = "(?:(?!(?:\\/|^)\\.).)*?",
    ca = Mh("().*{}+?[]^$\\!");
  function Mh(t) {
    return t.split("").reduce(function (e, i) {
      return (e[i] = !0), e;
    }, {});
  }
  var ua = /\/+/;
  Ge.filter = Uh;
  function Uh(t, e) {
    return (
      (e = e || {}),
      function (i, r, n) {
        return Ge(i, t, e);
      }
    );
  }
  function ft(t, e) {
    e = e || {};
    var i = {};
    return (
      Object.keys(t).forEach(function (r) {
        i[r] = t[r];
      }),
      Object.keys(e).forEach(function (r) {
        i[r] = e[r];
      }),
      i
    );
  }
  Ge.defaults = function (t) {
    if (!t || typeof t != "object" || !Object.keys(t).length) return Ge;
    var e = Ge,
      i = function (n, s, o) {
        return e(n, s, ft(t, o));
      };
    return (
      (i.Minimatch = function (n, s) {
        return new e.Minimatch(n, ft(t, s));
      }),
      (i.Minimatch.defaults = function (n) {
        return e.defaults(ft(t, n)).Minimatch;
      }),
      (i.filter = function (n, s) {
        return e.filter(n, ft(t, s));
      }),
      (i.defaults = function (n) {
        return e.defaults(ft(t, n));
      }),
      (i.makeRe = function (n, s) {
        return e.makeRe(n, ft(t, s));
      }),
      (i.braceExpand = function (n, s) {
        return e.braceExpand(n, ft(t, s));
      }),
      (i.match = function (r, n, s) {
        return e.match(r, n, ft(t, s));
      }),
      i
    );
  };
  Fe.defaults = function (t) {
    return Ge.defaults(t).Minimatch;
  };
  function Ge(t, e, i) {
    return (
      Wi(e),
      i || (i = {}),
      !i.nocomment && e.charAt(0) === "#" ? !1 : new Fe(e, i).match(t)
    );
  }
  function Fe(t, e) {
    if (!(this instanceof Fe)) return new Fe(t, e);
    Wi(t),
      e || (e = {}),
      (t = t.trim()),
      !e.allowWindowsEscape &&
        yi.sep !== "/" &&
        (t = t.split(yi.sep).join("/")),
      (this.options = e),
      (this.set = []),
      (this.pattern = t),
      (this.regexp = null),
      (this.negate = !1),
      (this.comment = !1),
      (this.empty = !1),
      (this.partial = !!e.partial),
      this.make();
  }
  Fe.prototype.debug = function () {};
  Fe.prototype.make = Dh;
  function Dh() {
    var t = this.pattern,
      e = this.options;
    if (!e.nocomment && t.charAt(0) === "#") {
      this.comment = !0;
      return;
    }
    if (!t) {
      this.empty = !0;
      return;
    }
    this.parseNegate();
    var i = (this.globSet = this.braceExpand());
    e.debug &&
      (this.debug = function () {
        console.error.apply(console, arguments);
      }),
      this.debug(this.pattern, i),
      (i = this.globParts =
        i.map(function (r) {
          return r.split(ua);
        })),
      this.debug(this.pattern, i),
      (i = i.map(function (r, n, s) {
        return r.map(this.parse, this);
      }, this)),
      this.debug(this.pattern, i),
      (i = i.filter(function (r) {
        return r.indexOf(!1) === -1;
      })),
      this.debug(this.pattern, i),
      (this.set = i);
  }
  Fe.prototype.parseNegate = jh;
  function jh() {
    var t = this.pattern,
      e = !1,
      i = this.options,
      r = 0;
    if (!i.nonegate) {
      for (var n = 0, s = t.length; n < s && t.charAt(n) === "!"; n++)
        (e = !e), r++;
      r && (this.pattern = t.substr(r)), (this.negate = e);
    }
  }
  Ge.braceExpand = function (t, e) {
    return fa(t, e);
  };
  Fe.prototype.braceExpand = fa;
  function fa(t, e) {
    return (
      e || (this instanceof Fe ? (e = this.options) : (e = {})),
      (t = typeof t == "undefined" ? this.pattern : t),
      Wi(t),
      e.nobrace || !/\{(?:(?!\{).)*\}/.test(t) ? [t] : Ph(t)
    );
  }
  var qh = 1024 * 64,
    Wi = function (t) {
      if (typeof t != "string") throw new TypeError("invalid pattern");
      if (t.length > qh) throw new TypeError("pattern is too long");
    };
  Fe.prototype.parse = Hh;
  var zi = {};
  function Hh(t, e) {
    Wi(t);
    var i = this.options;
    if (t === "**")
      if (i.noglobstar) t = "*";
      else return Dr;
    if (t === "") return "";
    var r = "",
      n = !!i.nocase,
      s = !1,
      o = [],
      l = [],
      a,
      c = !1,
      u = -1,
      f = -1,
      h =
        t.charAt(0) === "."
          ? ""
          : i.dot
          ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))"
          : "(?!\\.)",
      p = this;
    function d() {
      if (a) {
        switch (a) {
          case "*":
            (r += Ur), (n = !0);
            break;
          case "?":
            (r += Mr), (n = !0);
            break;
          default:
            r += "\\" + a;
            break;
        }
        p.debug("clearStateChar %j %j", a, r), (a = !1);
      }
    }
    for (var m = 0, v = t.length, E; m < v && (E = t.charAt(m)); m++) {
      if ((this.debug("%s	%s %s %j", t, m, r, E), s && ca[E])) {
        (r += "\\" + E), (s = !1);
        continue;
      }
      switch (E) {
        case "/":
          return !1;
        case "\\":
          d(), (s = !0);
          continue;
        case "?":
        case "*":
        case "+":
        case "@":
        case "!":
          if ((this.debug("%s	%s %s %j <-- stateChar", t, m, r, E), c)) {
            this.debug("  in class"),
              E === "!" && m === f + 1 && (E = "^"),
              (r += E);
            continue;
          }
          p.debug("call clearStateChar %j", a), d(), (a = E), i.noext && d();
          continue;
        case "(":
          if (c) {
            r += "(";
            continue;
          }
          if (!a) {
            r += "\\(";
            continue;
          }
          o.push({
            type: a,
            start: m - 1,
            reStart: r.length,
            open: la[a].open,
            close: la[a].close,
          }),
            (r += a === "!" ? "(?:(?!(?:" : "(?:"),
            this.debug("plType %j %j", a, r),
            (a = !1);
          continue;
        case ")":
          if (c || !o.length) {
            r += "\\)";
            continue;
          }
          d(), (n = !0);
          var I = o.pop();
          (r += I.close), I.type === "!" && l.push(I), (I.reEnd = r.length);
          continue;
        case "|":
          if (c || !o.length || s) {
            (r += "\\|"), (s = !1);
            continue;
          }
          d(), (r += "|");
          continue;
        case "[":
          if ((d(), c)) {
            r += "\\" + E;
            continue;
          }
          (c = !0), (f = m), (u = r.length), (r += E);
          continue;
        case "]":
          if (m === f + 1 || !c) {
            (r += "\\" + E), (s = !1);
            continue;
          }
          var w = t.substring(f + 1, m);
          try {
            RegExp("[" + w + "]");
          } catch {
            var C = this.parse(w, zi);
            (r = r.substr(0, u) + "\\[" + C[0] + "\\]"),
              (n = n || C[1]),
              (c = !1);
            continue;
          }
          (n = !0), (c = !1), (r += E);
          continue;
        default:
          d(),
            s ? (s = !1) : ca[E] && !(E === "^" && c) && (r += "\\"),
            (r += E);
      }
    }
    for (
      c &&
        ((w = t.substr(f + 1)),
        (C = this.parse(w, zi)),
        (r = r.substr(0, u) + "\\[" + C[0]),
        (n = n || C[1])),
        I = o.pop();
      I;
      I = o.pop()
    ) {
      var _ = r.slice(I.reStart + I.open.length);
      this.debug("setting tail", r, I),
        (_ = _.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (be, le, ie) {
          return ie || (ie = "\\"), le + le + ie + "|";
        })),
        this.debug(
          `tail=%j
   %s`,
          _,
          _,
          I,
          r
        );
      var $ = I.type === "*" ? Ur : I.type === "?" ? Mr : "\\" + I.type;
      (n = !0), (r = r.slice(0, I.reStart) + $ + "\\(" + _);
    }
    d(), s && (r += "\\\\");
    var k = !1;
    switch (r.charAt(0)) {
      case "[":
      case ".":
      case "(":
        k = !0;
    }
    for (var U = l.length - 1; U > -1; U--) {
      var b = l[U],
        T = r.slice(0, b.reStart),
        B = r.slice(b.reStart, b.reEnd - 8),
        G = r.slice(b.reEnd - 8, b.reEnd),
        L = r.slice(b.reEnd);
      G += L;
      var X = T.split("(").length - 1,
        R = L;
      for (m = 0; m < X; m++) R = R.replace(/\)[+*?]?/, "");
      L = R;
      var N = "";
      L === "" && e !== zi && (N = "$");
      var q = T + B + L + N + G;
      r = q;
    }
    if ((r !== "" && n && (r = "(?=.)" + r), k && (r = h + r), e === zi))
      return [r, n];
    if (!n) return $h(t);
    var z = i.nocase ? "i" : "";
    try {
      var P = new RegExp("^" + r + "$", z);
    } catch {
      return new RegExp("$.");
    }
    return (P._glob = t), (P._src = r), P;
  }
  Ge.makeRe = function (t, e) {
    return new Fe(t, e || {}).makeRe();
  };
  Fe.prototype.makeRe = Vh;
  function Vh() {
    if (this.regexp || this.regexp === !1) return this.regexp;
    var t = this.set;
    if (!t.length) return (this.regexp = !1), this.regexp;
    var e = this.options,
      i = e.noglobstar ? Ur : e.dot ? Fh : Nh,
      r = e.nocase ? "i" : "",
      n = t
        .map(function (s) {
          return s
            .map(function (o) {
              return o === Dr ? i : typeof o == "string" ? Gh(o) : o._src;
            })
            .join("\\/");
        })
        .join("|");
    (n = "^(?:" + n + ")$"), this.negate && (n = "^(?!" + n + ").*$");
    try {
      this.regexp = new RegExp(n, r);
    } catch {
      this.regexp = !1;
    }
    return this.regexp;
  }
  Ge.match = function (t, e, i) {
    i = i || {};
    var r = new Fe(e, i);
    return (
      (t = t.filter(function (n) {
        return r.match(n);
      })),
      r.options.nonull && !t.length && t.push(e),
      t
    );
  };
  Fe.prototype.match = function (e, i) {
    if (
      (typeof i == "undefined" && (i = this.partial),
      this.debug("match", e, this.pattern),
      this.comment)
    )
      return !1;
    if (this.empty) return e === "";
    if (e === "/" && i) return !0;
    var r = this.options;
    yi.sep !== "/" && (e = e.split(yi.sep).join("/")),
      (e = e.split(ua)),
      this.debug(this.pattern, "split", e);
    var n = this.set;
    this.debug(this.pattern, "set", n);
    var s, o;
    for (o = e.length - 1; o >= 0 && ((s = e[o]), !s); o--);
    for (o = 0; o < n.length; o++) {
      var l = n[o],
        a = e;
      r.matchBase && l.length === 1 && (a = [s]);
      var c = this.matchOne(a, l, i);
      if (c) return r.flipNegate ? !0 : !this.negate;
    }
    return r.flipNegate ? !1 : this.negate;
  };
  Fe.prototype.matchOne = function (t, e, i) {
    var r = this.options;
    this.debug("matchOne", { this: this, file: t, pattern: e }),
      this.debug("matchOne", t.length, e.length);
    for (
      var n = 0, s = 0, o = t.length, l = e.length;
      n < o && s < l;
      n++, s++
    ) {
      this.debug("matchOne loop");
      var a = e[s],
        c = t[n];
      if ((this.debug(e, a, c), a === !1)) return !1;
      if (a === Dr) {
        this.debug("GLOBSTAR", [e, a, c]);
        var u = n,
          f = s + 1;
        if (f === l) {
          for (this.debug("** at the end"); n < o; n++)
            if (
              t[n] === "." ||
              t[n] === ".." ||
              (!r.dot && t[n].charAt(0) === ".")
            )
              return !1;
          return !0;
        }
        for (; u < o; ) {
          var h = t[u];
          if (
            (this.debug(
              `
globstar while`,
              t,
              u,
              e,
              f,
              h
            ),
            this.matchOne(t.slice(u), e.slice(f), i))
          )
            return this.debug("globstar found match!", u, o, h), !0;
          if (h === "." || h === ".." || (!r.dot && h.charAt(0) === ".")) {
            this.debug("dot detected!", t, u, e, f);
            break;
          }
          this.debug("globstar swallow a segment, and continue"), u++;
        }
        return !!(
          i &&
          (this.debug(
            `
>>> no match, partial?`,
            t,
            u,
            e,
            f
          ),
          u === o)
        );
      }
      var p;
      if (
        (typeof a == "string"
          ? ((p = c === a), this.debug("string match", a, c, p))
          : ((p = c.match(a)), this.debug("pattern match", a, c, p)),
        !p)
      )
        return !1;
    }
    if (n === o && s === l) return !0;
    if (n === o) return i;
    if (s === l) return n === o - 1 && t[n] === "";
    throw new Error("wtf?");
  };
  function $h(t) {
    return t.replace(/\\(.)/g, "$1");
  }
  function Gh(t) {
    return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
});
var qr = y((Tg, ma) => {
  "use strict";
  var da = require("fs"),
    jr;
  function zh() {
    try {
      return da.statSync("/.dockerenv"), !0;
    } catch {
      return !1;
    }
  }
  function Wh() {
    try {
      return da.readFileSync("/proc/self/cgroup", "utf8").includes("docker");
    } catch {
      return !1;
    }
  }
  ma.exports = () => (jr === void 0 && (jr = zh() || Wh()), jr);
});
var xa = y((Ag, Hr) => {
  "use strict";
  var Yh = require("os"),
    Kh = require("fs"),
    ga = qr(),
    va = () => {
      if (process.platform !== "linux") return !1;
      if (Yh.release().toLowerCase().includes("microsoft")) return !ga();
      try {
        return Kh.readFileSync("/proc/version", "utf8")
          .toLowerCase()
          .includes("microsoft")
          ? !ga()
          : !1;
      } catch {
        return !1;
      }
    };
  process.env.__IS_WSL_TEST__ ? (Hr.exports = va) : (Hr.exports = va());
});
var ya = y((Rg, _a) => {
  "use strict";
  _a.exports = (t, e, i) => {
    let r = (n) =>
      Object.defineProperty(t, e, { value: n, enumerable: !0, writable: !0 });
    return (
      Object.defineProperty(t, e, {
        configurable: !0,
        enumerable: !0,
        get() {
          let n = i();
          return r(n), n;
        },
        set(n) {
          r(n);
        },
      }),
      t
    );
  };
});
var Oa = y((Bg, Ca) => {
  var Zh = require("path"),
    Xh = require("child_process"),
    { promises: Vr, constants: ka } = require("fs"),
    Yi = xa(),
    Jh = qr(),
    $r = ya(),
    ba = Zh.join(__dirname, "xdg-open"),
    { platform: zt, arch: wa } = process,
    Qh = (() => {
      let t = "/mnt/",
        e;
      return async function () {
        if (e) return e;
        let i = "/etc/wsl.conf",
          r = !1;
        try {
          await Vr.access(i, ka.F_OK), (r = !0);
        } catch {}
        if (!r) return t;
        let n = await Vr.readFile(i, { encoding: "utf8" }),
          s = /^(?!#.*).*root\s*=\s*(.*)/g.exec(n);
        return s
          ? ((e = s.groups.mountPoint.trim()),
            (e = e.endsWith("/") ? e : `${e}/`),
            e)
          : t;
      };
    })(),
    Ea = async (t, e) => {
      let i;
      for (let r of t)
        try {
          return await e(r);
        } catch (n) {
          i = n;
        }
      throw i;
    },
    Ki = async (t) => {
      if (
        ((t = {
          wait: !1,
          background: !1,
          newInstance: !1,
          allowNonzeroExitCode: !1,
          ...t,
        }),
        Array.isArray(t.app))
      )
        return Ea(t.app, (l) => Ki({ ...t, app: l }));
      let { name: e, arguments: i = [] } = t.app || {};
      if (((i = [...i]), Array.isArray(e)))
        return Ea(e, (l) => Ki({ ...t, app: { name: l, arguments: i } }));
      let r,
        n = [],
        s = {};
      if (zt === "darwin")
        (r = "open"),
          t.wait && n.push("--wait-apps"),
          t.background && n.push("--background"),
          t.newInstance && n.push("--new"),
          e && n.push("-a", e);
      else if (zt === "win32" || (Yi && !Jh())) {
        let l = await Qh();
        (r = Yi
          ? `${l}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe`
          : `${process.env.SYSTEMROOT}\\System32\\WindowsPowerShell\\v1.0\\powershell`),
          n.push(
            "-NoProfile",
            "-NonInteractive",
            "\u2013ExecutionPolicy",
            "Bypass",
            "-EncodedCommand"
          ),
          Yi || (s.windowsVerbatimArguments = !0);
        let a = ["Start"];
        t.wait && a.push("-Wait"),
          e
            ? (a.push(`"\`"${e}\`""`, "-ArgumentList"),
              t.target && i.unshift(t.target))
            : t.target && a.push(`"${t.target}"`),
          i.length > 0 &&
            ((i = i.map((c) => `"\`"${c}\`""`)), a.push(i.join(","))),
          (t.target = Buffer.from(a.join(" "), "utf16le").toString("base64"));
      } else {
        if (e) r = e;
        else {
          let l = !__dirname || __dirname === "/",
            a = !1;
          try {
            await Vr.access(ba, ka.X_OK), (a = !0);
          } catch {}
          r =
            process.versions.electron || zt === "android" || l || !a
              ? "xdg-open"
              : ba;
        }
        i.length > 0 && n.push(...i),
          t.wait || ((s.stdio = "ignore"), (s.detached = !0));
      }
      t.target && n.push(t.target),
        zt === "darwin" && i.length > 0 && n.push("--args", ...i);
      let o = Xh.spawn(r, n, s);
      return t.wait
        ? new Promise((l, a) => {
            o.once("error", a),
              o.once("close", (c) => {
                if (t.allowNonzeroExitCode && c > 0) {
                  a(new Error(`Exited with code ${c}`));
                  return;
                }
                l(o);
              });
          })
        : (o.unref(), o);
    },
    Gr = (t, e) => {
      if (typeof t != "string") throw new TypeError("Expected a `target`");
      return Ki({ ...e, target: t });
    },
    ep = (t, e) => {
      if (typeof t != "string") throw new TypeError("Expected a `name`");
      let { arguments: i = [] } = e || {};
      if (i != null && !Array.isArray(i))
        throw new TypeError("Expected `appArguments` as Array type");
      return Ki({ ...e, app: { name: t, arguments: i } });
    };
  function Sa(t) {
    if (typeof t == "string" || Array.isArray(t)) return t;
    let { [wa]: e } = t;
    if (!e) throw new Error(`${wa} is not supported`);
    return e;
  }
  function zr({ [zt]: t }, { wsl: e }) {
    if (e && Yi) return Sa(e);
    if (!t) throw new Error(`${zt} is not supported`);
    return Sa(t);
  }
  var Zi = {};
  $r(Zi, "chrome", () =>
    zr(
      {
        darwin: "google chrome",
        win32: "chrome",
        linux: ["google-chrome", "google-chrome-stable", "chromium"],
      },
      {
        wsl: {
          ia32: "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
          x64: [
            "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe",
            "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
          ],
        },
      }
    )
  );
  $r(Zi, "firefox", () =>
    zr(
      {
        darwin: "firefox",
        win32: "C:\\Program Files\\Mozilla Firefox\\firefox.exe",
        linux: "firefox",
      },
      { wsl: "/mnt/c/Program Files/Mozilla Firefox/firefox.exe" }
    )
  );
  $r(Zi, "edge", () =>
    zr(
      {
        darwin: "microsoft edge",
        win32: "msedge",
        linux: ["microsoft-edge", "microsoft-edge-dev"],
      },
      {
        wsl: "/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
      }
    )
  );
  Gr.apps = Zi;
  Gr.openApp = ep;
  Ca.exports = Gr;
});
var Wr = y((Lg, Ta) => {
  "use strict";
  var tp = require("util"),
    Ia = require("stream"),
    tt = (Ta.exports = function () {
      Ia.call(this),
        (this._buffers = []),
        (this._buffered = 0),
        (this._reads = []),
        (this._paused = !1),
        (this._encoding = "utf8"),
        (this.writable = !0);
    });
  tp.inherits(tt, Ia);
  tt.prototype.read = function (t, e) {
    this._reads.push({ length: Math.abs(t), allowLess: t < 0, func: e }),
      process.nextTick(
        function () {
          this._process(),
            this._paused &&
              this._reads &&
              this._reads.length > 0 &&
              ((this._paused = !1), this.emit("drain"));
        }.bind(this)
      );
  };
  tt.prototype.write = function (t, e) {
    if (!this.writable)
      return this.emit("error", new Error("Stream not writable")), !1;
    let i;
    return (
      Buffer.isBuffer(t) ? (i = t) : (i = Buffer.from(t, e || this._encoding)),
      this._buffers.push(i),
      (this._buffered += i.length),
      this._process(),
      this._reads && this._reads.length === 0 && (this._paused = !0),
      this.writable && !this._paused
    );
  };
  tt.prototype.end = function (t, e) {
    t && this.write(t, e),
      (this.writable = !1),
      this._buffers &&
        (this._buffers.length === 0
          ? this._end()
          : (this._buffers.push(null), this._process()));
  };
  tt.prototype.destroySoon = tt.prototype.end;
  tt.prototype._end = function () {
    this._reads.length > 0 &&
      this.emit("error", new Error("Unexpected end of input")),
      this.destroy();
  };
  tt.prototype.destroy = function () {
    this._buffers &&
      ((this.writable = !1),
      (this._reads = null),
      (this._buffers = null),
      this.emit("close"));
  };
  tt.prototype._processReadAllowingLess = function (t) {
    this._reads.shift();
    let e = this._buffers[0];
    e.length > t.length
      ? ((this._buffered -= t.length),
        (this._buffers[0] = e.slice(t.length)),
        t.func.call(this, e.slice(0, t.length)))
      : ((this._buffered -= e.length),
        this._buffers.shift(),
        t.func.call(this, e));
  };
  tt.prototype._processRead = function (t) {
    this._reads.shift();
    let e = 0,
      i = 0,
      r = Buffer.alloc(t.length);
    for (; e < t.length; ) {
      let n = this._buffers[i++],
        s = Math.min(n.length, t.length - e);
      n.copy(r, e, 0, s),
        (e += s),
        s !== n.length && (this._buffers[--i] = n.slice(s));
    }
    i > 0 && this._buffers.splice(0, i),
      (this._buffered -= t.length),
      t.func.call(this, r);
  };
  tt.prototype._process = function () {
    try {
      for (; this._buffered > 0 && this._reads && this._reads.length > 0; ) {
        let t = this._reads[0];
        if (t.allowLess) this._processReadAllowingLess(t);
        else if (this._buffered >= t.length) this._processRead(t);
        else break;
      }
      this._buffers && !this.writable && this._end();
    } catch (t) {
      this.emit("error", t);
    }
  };
});
var Kr = y((Yr) => {
  "use strict";
  var ht = [
    { x: [0], y: [0] },
    { x: [4], y: [0] },
    { x: [0, 4], y: [4] },
    { x: [2, 6], y: [0, 4] },
    { x: [0, 2, 4, 6], y: [2, 6] },
    { x: [1, 3, 5, 7], y: [0, 2, 4, 6] },
    { x: [0, 1, 2, 3, 4, 5, 6, 7], y: [1, 3, 5, 7] },
  ];
  Yr.getImagePasses = function (t, e) {
    let i = [],
      r = t % 8,
      n = e % 8,
      s = (t - r) / 8,
      o = (e - n) / 8;
    for (let l = 0; l < ht.length; l++) {
      let a = ht[l],
        c = s * a.x.length,
        u = o * a.y.length;
      for (let f = 0; f < a.x.length && a.x[f] < r; f++) c++;
      for (let f = 0; f < a.y.length && a.y[f] < n; f++) u++;
      c > 0 && u > 0 && i.push({ width: c, height: u, index: l });
    }
    return i;
  };
  Yr.getInterlaceIterator = function (t) {
    return function (e, i, r) {
      let n = e % ht[r].x.length,
        s = ((e - n) / ht[r].x.length) * 8 + ht[r].x[n],
        o = i % ht[r].y.length,
        l = ((i - o) / ht[r].y.length) * 8 + ht[r].y[o];
      return s * 4 + l * t * 4;
    };
  };
});
var Zr = y((Fg, Aa) => {
  "use strict";
  Aa.exports = function (e, i, r) {
    let n = e + i - r,
      s = Math.abs(n - e),
      o = Math.abs(n - i),
      l = Math.abs(n - r);
    return s <= o && s <= l ? e : o <= l ? i : r;
  };
});
var Xr = y((Ng, Ba) => {
  "use strict";
  var ip = Kr(),
    rp = Zr();
  function Ra(t, e, i) {
    let r = t * e;
    return i !== 8 && (r = Math.ceil(r / (8 / i))), r;
  }
  var Wt = (Ba.exports = function (t, e) {
    let i = t.width,
      r = t.height,
      n = t.interlace,
      s = t.bpp,
      o = t.depth;
    if (
      ((this.read = e.read),
      (this.write = e.write),
      (this.complete = e.complete),
      (this._imageIndex = 0),
      (this._images = []),
      n)
    ) {
      let l = ip.getImagePasses(i, r);
      for (let a = 0; a < l.length; a++)
        this._images.push({
          byteWidth: Ra(l[a].width, s, o),
          height: l[a].height,
          lineIndex: 0,
        });
    } else
      this._images.push({ byteWidth: Ra(i, s, o), height: r, lineIndex: 0 });
    o === 8
      ? (this._xComparison = s)
      : o === 16
      ? (this._xComparison = s * 2)
      : (this._xComparison = 1);
  });
  Wt.prototype.start = function () {
    this.read(
      this._images[this._imageIndex].byteWidth + 1,
      this._reverseFilterLine.bind(this)
    );
  };
  Wt.prototype._unFilterType1 = function (t, e, i) {
    let r = this._xComparison,
      n = r - 1;
    for (let s = 0; s < i; s++) {
      let o = t[1 + s],
        l = s > n ? e[s - r] : 0;
      e[s] = o + l;
    }
  };
  Wt.prototype._unFilterType2 = function (t, e, i) {
    let r = this._lastLine;
    for (let n = 0; n < i; n++) {
      let s = t[1 + n],
        o = r ? r[n] : 0;
      e[n] = s + o;
    }
  };
  Wt.prototype._unFilterType3 = function (t, e, i) {
    let r = this._xComparison,
      n = r - 1,
      s = this._lastLine;
    for (let o = 0; o < i; o++) {
      let l = t[1 + o],
        a = s ? s[o] : 0,
        c = o > n ? e[o - r] : 0,
        u = Math.floor((c + a) / 2);
      e[o] = l + u;
    }
  };
  Wt.prototype._unFilterType4 = function (t, e, i) {
    let r = this._xComparison,
      n = r - 1,
      s = this._lastLine;
    for (let o = 0; o < i; o++) {
      let l = t[1 + o],
        a = s ? s[o] : 0,
        c = o > n ? e[o - r] : 0,
        u = o > n && s ? s[o - r] : 0,
        f = rp(c, a, u);
      e[o] = l + f;
    }
  };
  Wt.prototype._reverseFilterLine = function (t) {
    let e = t[0],
      i,
      r = this._images[this._imageIndex],
      n = r.byteWidth;
    if (e === 0) i = t.slice(1, n + 1);
    else
      switch (((i = Buffer.alloc(n)), e)) {
        case 1:
          this._unFilterType1(t, i, n);
          break;
        case 2:
          this._unFilterType2(t, i, n);
          break;
        case 3:
          this._unFilterType3(t, i, n);
          break;
        case 4:
          this._unFilterType4(t, i, n);
          break;
        default:
          throw new Error("Unrecognised filter type - " + e);
      }
    this.write(i),
      r.lineIndex++,
      r.lineIndex >= r.height
        ? ((this._lastLine = null),
          this._imageIndex++,
          (r = this._images[this._imageIndex]))
        : (this._lastLine = i),
      r
        ? this.read(r.byteWidth + 1, this._reverseFilterLine.bind(this))
        : ((this._lastLine = null), this.complete());
  };
});
var Fa = y((Mg, Pa) => {
  "use strict";
  var np = require("util"),
    La = Wr(),
    sp = Xr(),
    op = (Pa.exports = function (t) {
      La.call(this);
      let e = [],
        i = this;
      (this._filter = new sp(t, {
        read: this.read.bind(this),
        write: function (r) {
          e.push(r);
        },
        complete: function () {
          i.emit("complete", Buffer.concat(e));
        },
      })),
        this._filter.start();
    });
  np.inherits(op, La);
});
var Yt = y((Ug, Na) => {
  "use strict";
  Na.exports = {
    PNG_SIGNATURE: [137, 80, 78, 71, 13, 10, 26, 10],
    TYPE_IHDR: 1229472850,
    TYPE_IEND: 1229278788,
    TYPE_IDAT: 1229209940,
    TYPE_PLTE: 1347179589,
    TYPE_tRNS: 1951551059,
    TYPE_gAMA: 1732332865,
    COLORTYPE_GRAYSCALE: 0,
    COLORTYPE_PALETTE: 1,
    COLORTYPE_COLOR: 2,
    COLORTYPE_ALPHA: 4,
    COLORTYPE_PALETTE_COLOR: 3,
    COLORTYPE_COLOR_ALPHA: 6,
    COLORTYPE_TO_BPP_MAP: { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 },
    GAMMA_DIVISION: 1e5,
  };
});
var en = y((Dg, Ma) => {
  "use strict";
  var Jr = [];
  (function () {
    for (let t = 0; t < 256; t++) {
      let e = t;
      for (let i = 0; i < 8; i++)
        e & 1 ? (e = 3988292384 ^ (e >>> 1)) : (e = e >>> 1);
      Jr[t] = e;
    }
  })();
  var Qr = (Ma.exports = function () {
    this._crc = -1;
  });
  Qr.prototype.write = function (t) {
    for (let e = 0; e < t.length; e++)
      this._crc = Jr[(this._crc ^ t[e]) & 255] ^ (this._crc >>> 8);
    return !0;
  };
  Qr.prototype.crc32 = function () {
    return this._crc ^ -1;
  };
  Qr.crc32 = function (t) {
    let e = -1;
    for (let i = 0; i < t.length; i++) e = Jr[(e ^ t[i]) & 255] ^ (e >>> 8);
    return e ^ -1;
  };
});
var tn = y((jg, Ua) => {
  "use strict";
  var Oe = Yt(),
    ap = en(),
    Ae = (Ua.exports = function (t, e) {
      (this._options = t),
        (t.checkCRC = t.checkCRC !== !1),
        (this._hasIHDR = !1),
        (this._hasIEND = !1),
        (this._emittedHeadersFinished = !1),
        (this._palette = []),
        (this._colorType = 0),
        (this._chunks = {}),
        (this._chunks[Oe.TYPE_IHDR] = this._handleIHDR.bind(this)),
        (this._chunks[Oe.TYPE_IEND] = this._handleIEND.bind(this)),
        (this._chunks[Oe.TYPE_IDAT] = this._handleIDAT.bind(this)),
        (this._chunks[Oe.TYPE_PLTE] = this._handlePLTE.bind(this)),
        (this._chunks[Oe.TYPE_tRNS] = this._handleTRNS.bind(this)),
        (this._chunks[Oe.TYPE_gAMA] = this._handleGAMA.bind(this)),
        (this.read = e.read),
        (this.error = e.error),
        (this.metadata = e.metadata),
        (this.gamma = e.gamma),
        (this.transColor = e.transColor),
        (this.palette = e.palette),
        (this.parsed = e.parsed),
        (this.inflateData = e.inflateData),
        (this.finished = e.finished),
        (this.simpleTransparency = e.simpleTransparency),
        (this.headersFinished = e.headersFinished || function () {});
    });
  Ae.prototype.start = function () {
    this.read(Oe.PNG_SIGNATURE.length, this._parseSignature.bind(this));
  };
  Ae.prototype._parseSignature = function (t) {
    let e = Oe.PNG_SIGNATURE;
    for (let i = 0; i < e.length; i++)
      if (t[i] !== e[i]) {
        this.error(new Error("Invalid file signature"));
        return;
      }
    this.read(8, this._parseChunkBegin.bind(this));
  };
  Ae.prototype._parseChunkBegin = function (t) {
    let e = t.readUInt32BE(0),
      i = t.readUInt32BE(4),
      r = "";
    for (let s = 4; s < 8; s++) r += String.fromCharCode(t[s]);
    let n = !!(t[4] & 32);
    if (!this._hasIHDR && i !== Oe.TYPE_IHDR) {
      this.error(new Error("Expected IHDR on beggining"));
      return;
    }
    if (
      ((this._crc = new ap()), this._crc.write(Buffer.from(r)), this._chunks[i])
    )
      return this._chunks[i](e);
    if (!n) {
      this.error(new Error("Unsupported critical chunk type " + r));
      return;
    }
    this.read(e + 4, this._skipChunk.bind(this));
  };
  Ae.prototype._skipChunk = function () {
    this.read(8, this._parseChunkBegin.bind(this));
  };
  Ae.prototype._handleChunkEnd = function () {
    this.read(4, this._parseChunkEnd.bind(this));
  };
  Ae.prototype._parseChunkEnd = function (t) {
    let e = t.readInt32BE(0),
      i = this._crc.crc32();
    if (this._options.checkCRC && i !== e) {
      this.error(new Error("Crc error - " + e + " - " + i));
      return;
    }
    this._hasIEND || this.read(8, this._parseChunkBegin.bind(this));
  };
  Ae.prototype._handleIHDR = function (t) {
    this.read(t, this._parseIHDR.bind(this));
  };
  Ae.prototype._parseIHDR = function (t) {
    this._crc.write(t);
    let e = t.readUInt32BE(0),
      i = t.readUInt32BE(4),
      r = t[8],
      n = t[9],
      s = t[10],
      o = t[11],
      l = t[12];
    if (r !== 8 && r !== 4 && r !== 2 && r !== 1 && r !== 16) {
      this.error(new Error("Unsupported bit depth " + r));
      return;
    }
    if (!(n in Oe.COLORTYPE_TO_BPP_MAP)) {
      this.error(new Error("Unsupported color type"));
      return;
    }
    if (s !== 0) {
      this.error(new Error("Unsupported compression method"));
      return;
    }
    if (o !== 0) {
      this.error(new Error("Unsupported filter method"));
      return;
    }
    if (l !== 0 && l !== 1) {
      this.error(new Error("Unsupported interlace method"));
      return;
    }
    this._colorType = n;
    let a = Oe.COLORTYPE_TO_BPP_MAP[this._colorType];
    (this._hasIHDR = !0),
      this.metadata({
        width: e,
        height: i,
        depth: r,
        interlace: !!l,
        palette: !!(n & Oe.COLORTYPE_PALETTE),
        color: !!(n & Oe.COLORTYPE_COLOR),
        alpha: !!(n & Oe.COLORTYPE_ALPHA),
        bpp: a,
        colorType: n,
      }),
      this._handleChunkEnd();
  };
  Ae.prototype._handlePLTE = function (t) {
    this.read(t, this._parsePLTE.bind(this));
  };
  Ae.prototype._parsePLTE = function (t) {
    this._crc.write(t);
    let e = Math.floor(t.length / 3);
    for (let i = 0; i < e; i++)
      this._palette.push([t[i * 3], t[i * 3 + 1], t[i * 3 + 2], 255]);
    this.palette(this._palette), this._handleChunkEnd();
  };
  Ae.prototype._handleTRNS = function (t) {
    this.simpleTransparency(), this.read(t, this._parseTRNS.bind(this));
  };
  Ae.prototype._parseTRNS = function (t) {
    if ((this._crc.write(t), this._colorType === Oe.COLORTYPE_PALETTE_COLOR)) {
      if (this._palette.length === 0) {
        this.error(new Error("Transparency chunk must be after palette"));
        return;
      }
      if (t.length > this._palette.length) {
        this.error(new Error("More transparent colors than palette size"));
        return;
      }
      for (let e = 0; e < t.length; e++) this._palette[e][3] = t[e];
      this.palette(this._palette);
    }
    this._colorType === Oe.COLORTYPE_GRAYSCALE &&
      this.transColor([t.readUInt16BE(0)]),
      this._colorType === Oe.COLORTYPE_COLOR &&
        this.transColor([
          t.readUInt16BE(0),
          t.readUInt16BE(2),
          t.readUInt16BE(4),
        ]),
      this._handleChunkEnd();
  };
  Ae.prototype._handleGAMA = function (t) {
    this.read(t, this._parseGAMA.bind(this));
  };
  Ae.prototype._parseGAMA = function (t) {
    this._crc.write(t),
      this.gamma(t.readUInt32BE(0) / Oe.GAMMA_DIVISION),
      this._handleChunkEnd();
  };
  Ae.prototype._handleIDAT = function (t) {
    this._emittedHeadersFinished ||
      ((this._emittedHeadersFinished = !0), this.headersFinished()),
      this.read(-t, this._parseIDAT.bind(this, t));
  };
  Ae.prototype._parseIDAT = function (t, e) {
    if (
      (this._crc.write(e),
      this._colorType === Oe.COLORTYPE_PALETTE_COLOR &&
        this._palette.length === 0)
    )
      throw new Error("Expected palette not found");
    this.inflateData(e);
    let i = t - e.length;
    i > 0 ? this._handleIDAT(i) : this._handleChunkEnd();
  };
  Ae.prototype._handleIEND = function (t) {
    this.read(t, this._parseIEND.bind(this));
  };
  Ae.prototype._parseIEND = function (t) {
    this._crc.write(t),
      (this._hasIEND = !0),
      this._handleChunkEnd(),
      this.finished && this.finished();
  };
});
var rn = y((ja) => {
  "use strict";
  var Da = Kr(),
    lp = [
      function () {},
      function (t, e, i, r) {
        if (r === e.length) throw new Error("Ran out of data");
        let n = e[r];
        (t[i] = n), (t[i + 1] = n), (t[i + 2] = n), (t[i + 3] = 255);
      },
      function (t, e, i, r) {
        if (r + 1 >= e.length) throw new Error("Ran out of data");
        let n = e[r];
        (t[i] = n), (t[i + 1] = n), (t[i + 2] = n), (t[i + 3] = e[r + 1]);
      },
      function (t, e, i, r) {
        if (r + 2 >= e.length) throw new Error("Ran out of data");
        (t[i] = e[r]),
          (t[i + 1] = e[r + 1]),
          (t[i + 2] = e[r + 2]),
          (t[i + 3] = 255);
      },
      function (t, e, i, r) {
        if (r + 3 >= e.length) throw new Error("Ran out of data");
        (t[i] = e[r]),
          (t[i + 1] = e[r + 1]),
          (t[i + 2] = e[r + 2]),
          (t[i + 3] = e[r + 3]);
      },
    ],
    cp = [
      function () {},
      function (t, e, i, r) {
        let n = e[0];
        (t[i] = n), (t[i + 1] = n), (t[i + 2] = n), (t[i + 3] = r);
      },
      function (t, e, i) {
        let r = e[0];
        (t[i] = r), (t[i + 1] = r), (t[i + 2] = r), (t[i + 3] = e[1]);
      },
      function (t, e, i, r) {
        (t[i] = e[0]), (t[i + 1] = e[1]), (t[i + 2] = e[2]), (t[i + 3] = r);
      },
      function (t, e, i) {
        (t[i] = e[0]), (t[i + 1] = e[1]), (t[i + 2] = e[2]), (t[i + 3] = e[3]);
      },
    ];
  function up(t, e) {
    let i = [],
      r = 0;
    function n() {
      if (r === t.length) throw new Error("Ran out of data");
      let s = t[r];
      r++;
      let o, l, a, c, u, f, h, p;
      switch (e) {
        default:
          throw new Error("unrecognised depth");
        case 16:
          (h = t[r]), r++, i.push((s << 8) + h);
          break;
        case 4:
          (h = s & 15), (p = s >> 4), i.push(p, h);
          break;
        case 2:
          (u = s & 3),
            (f = (s >> 2) & 3),
            (h = (s >> 4) & 3),
            (p = (s >> 6) & 3),
            i.push(p, h, f, u);
          break;
        case 1:
          (o = s & 1),
            (l = (s >> 1) & 1),
            (a = (s >> 2) & 1),
            (c = (s >> 3) & 1),
            (u = (s >> 4) & 1),
            (f = (s >> 5) & 1),
            (h = (s >> 6) & 1),
            (p = (s >> 7) & 1),
            i.push(p, h, f, u, c, a, l, o);
          break;
      }
    }
    return {
      get: function (s) {
        for (; i.length < s; ) n();
        let o = i.slice(0, s);
        return (i = i.slice(s)), o;
      },
      resetAfterLine: function () {
        i.length = 0;
      },
      end: function () {
        if (r !== t.length) throw new Error("extra data found");
      },
    };
  }
  function fp(t, e, i, r, n, s) {
    let o = t.width,
      l = t.height,
      a = t.index;
    for (let c = 0; c < l; c++)
      for (let u = 0; u < o; u++) {
        let f = i(u, c, a);
        lp[r](e, n, f, s), (s += r);
      }
    return s;
  }
  function hp(t, e, i, r, n, s) {
    let o = t.width,
      l = t.height,
      a = t.index;
    for (let c = 0; c < l; c++) {
      for (let u = 0; u < o; u++) {
        let f = n.get(r),
          h = i(u, c, a);
        cp[r](e, f, h, s);
      }
      n.resetAfterLine();
    }
  }
  ja.dataToBitMap = function (t, e) {
    let i = e.width,
      r = e.height,
      n = e.depth,
      s = e.bpp,
      o = e.interlace,
      l;
    n !== 8 && (l = up(t, n));
    let a;
    n <= 8 ? (a = Buffer.alloc(i * r * 4)) : (a = new Uint16Array(i * r * 4));
    let c = Math.pow(2, n) - 1,
      u = 0,
      f,
      h;
    if (o) (f = Da.getImagePasses(i, r)), (h = Da.getInterlaceIterator(i, r));
    else {
      let p = 0;
      (h = function () {
        let d = p;
        return (p += 4), d;
      }),
        (f = [{ width: i, height: r }]);
    }
    for (let p = 0; p < f.length; p++)
      n === 8 ? (u = fp(f[p], a, h, s, t, u)) : hp(f[p], a, h, s, l, c);
    if (n === 8) {
      if (u !== t.length) throw new Error("extra data found");
    } else l.end();
    return a;
  };
});
var nn = y((Hg, qa) => {
  "use strict";
  function pp(t, e, i, r, n) {
    let s = 0;
    for (let o = 0; o < r; o++)
      for (let l = 0; l < i; l++) {
        let a = n[t[s]];
        if (!a) throw new Error("index " + t[s] + " not in palette");
        for (let c = 0; c < 4; c++) e[s + c] = a[c];
        s += 4;
      }
  }
  function dp(t, e, i, r, n) {
    let s = 0;
    for (let o = 0; o < r; o++)
      for (let l = 0; l < i; l++) {
        let a = !1;
        if (
          (n.length === 1
            ? n[0] === t[s] && (a = !0)
            : n[0] === t[s] &&
              n[1] === t[s + 1] &&
              n[2] === t[s + 2] &&
              (a = !0),
          a)
        )
          for (let c = 0; c < 4; c++) e[s + c] = 0;
        s += 4;
      }
  }
  function mp(t, e, i, r, n) {
    let s = 255,
      o = Math.pow(2, n) - 1,
      l = 0;
    for (let a = 0; a < r; a++)
      for (let c = 0; c < i; c++) {
        for (let u = 0; u < 4; u++)
          e[l + u] = Math.floor((t[l + u] * s) / o + 0.5);
        l += 4;
      }
  }
  qa.exports = function (t, e, i = !1) {
    let r = e.depth,
      n = e.width,
      s = e.height,
      o = e.colorType,
      l = e.transColor,
      a = e.palette,
      c = t;
    return (
      o === 3
        ? pp(t, c, n, s, a)
        : (l && dp(t, c, n, s, l),
          r !== 8 &&
            !i &&
            (r === 16 && (c = Buffer.alloc(n * s * 4)), mp(t, c, n, s, r))),
      c
    );
  };
});
var $a = y((Vg, Va) => {
  "use strict";
  var gp = require("util"),
    sn = require("zlib"),
    Ha = Wr(),
    vp = Fa(),
    xp = tn(),
    _p = rn(),
    yp = nn(),
    st = (Va.exports = function (t) {
      Ha.call(this),
        (this._parser = new xp(t, {
          read: this.read.bind(this),
          error: this._handleError.bind(this),
          metadata: this._handleMetaData.bind(this),
          gamma: this.emit.bind(this, "gamma"),
          palette: this._handlePalette.bind(this),
          transColor: this._handleTransColor.bind(this),
          finished: this._finished.bind(this),
          inflateData: this._inflateData.bind(this),
          simpleTransparency: this._simpleTransparency.bind(this),
          headersFinished: this._headersFinished.bind(this),
        })),
        (this._options = t),
        (this.writable = !0),
        this._parser.start();
    });
  gp.inherits(st, Ha);
  st.prototype._handleError = function (t) {
    this.emit("error", t),
      (this.writable = !1),
      this.destroy(),
      this._inflate && this._inflate.destroy && this._inflate.destroy(),
      this._filter &&
        (this._filter.destroy(), this._filter.on("error", function () {})),
      (this.errord = !0);
  };
  st.prototype._inflateData = function (t) {
    if (!this._inflate)
      if (this._bitmapInfo.interlace)
        (this._inflate = sn.createInflate()),
          this._inflate.on("error", this.emit.bind(this, "error")),
          this._filter.on("complete", this._complete.bind(this)),
          this._inflate.pipe(this._filter);
      else {
        let i =
            (((this._bitmapInfo.width *
              this._bitmapInfo.bpp *
              this._bitmapInfo.depth +
              7) >>
              3) +
              1) *
            this._bitmapInfo.height,
          r = Math.max(i, sn.Z_MIN_CHUNK);
        this._inflate = sn.createInflate({ chunkSize: r });
        let n = i,
          s = this.emit.bind(this, "error");
        this._inflate.on("error", function (l) {
          n && s(l);
        }),
          this._filter.on("complete", this._complete.bind(this));
        let o = this._filter.write.bind(this._filter);
        this._inflate.on("data", function (l) {
          n && (l.length > n && (l = l.slice(0, n)), (n -= l.length), o(l));
        }),
          this._inflate.on("end", this._filter.end.bind(this._filter));
      }
    this._inflate.write(t);
  };
  st.prototype._handleMetaData = function (t) {
    (this._metaData = t),
      (this._bitmapInfo = Object.create(t)),
      (this._filter = new vp(this._bitmapInfo));
  };
  st.prototype._handleTransColor = function (t) {
    this._bitmapInfo.transColor = t;
  };
  st.prototype._handlePalette = function (t) {
    this._bitmapInfo.palette = t;
  };
  st.prototype._simpleTransparency = function () {
    this._metaData.alpha = !0;
  };
  st.prototype._headersFinished = function () {
    this.emit("metadata", this._metaData);
  };
  st.prototype._finished = function () {
    this.errord ||
      (this._inflate
        ? this._inflate.end()
        : this.emit("error", "No Inflate block"));
  };
  st.prototype._complete = function (t) {
    if (this.errord) return;
    let e;
    try {
      let i = _p.dataToBitMap(t, this._bitmapInfo);
      (e = yp(i, this._bitmapInfo, this._options.skipRescale)), (i = null);
    } catch (i) {
      this._handleError(i);
      return;
    }
    this.emit("parsed", e);
  };
});
var za = y(($g, Ga) => {
  "use strict";
  var Ke = Yt();
  Ga.exports = function (t, e, i, r) {
    let n =
      [Ke.COLORTYPE_COLOR_ALPHA, Ke.COLORTYPE_ALPHA].indexOf(r.colorType) !==
      -1;
    if (r.colorType === r.inputColorType) {
      let d = (function () {
        let m = new ArrayBuffer(2);
        return (
          new DataView(m).setInt16(0, 256, !0), new Int16Array(m)[0] !== 256
        );
      })();
      if (r.bitDepth === 8 || (r.bitDepth === 16 && d)) return t;
    }
    let s = r.bitDepth !== 16 ? t : new Uint16Array(t.buffer),
      o = 255,
      l = Ke.COLORTYPE_TO_BPP_MAP[r.inputColorType];
    l === 4 && !r.inputHasAlpha && (l = 3);
    let a = Ke.COLORTYPE_TO_BPP_MAP[r.colorType];
    r.bitDepth === 16 && ((o = 65535), (a *= 2));
    let c = Buffer.alloc(e * i * a),
      u = 0,
      f = 0,
      h = r.bgColor || {};
    h.red === void 0 && (h.red = o),
      h.green === void 0 && (h.green = o),
      h.blue === void 0 && (h.blue = o);
    function p() {
      let d,
        m,
        v,
        E = o;
      switch (r.inputColorType) {
        case Ke.COLORTYPE_COLOR_ALPHA:
          (E = s[u + 3]), (d = s[u]), (m = s[u + 1]), (v = s[u + 2]);
          break;
        case Ke.COLORTYPE_COLOR:
          (d = s[u]), (m = s[u + 1]), (v = s[u + 2]);
          break;
        case Ke.COLORTYPE_ALPHA:
          (E = s[u + 1]), (d = s[u]), (m = d), (v = d);
          break;
        case Ke.COLORTYPE_GRAYSCALE:
          (d = s[u]), (m = d), (v = d);
          break;
        default:
          throw new Error(
            "input color type:" +
              r.inputColorType +
              " is not supported at present"
          );
      }
      return (
        r.inputHasAlpha &&
          (n ||
            ((E /= o),
            (d = Math.min(Math.max(Math.round((1 - E) * h.red + E * d), 0), o)),
            (m = Math.min(
              Math.max(Math.round((1 - E) * h.green + E * m), 0),
              o
            )),
            (v = Math.min(
              Math.max(Math.round((1 - E) * h.blue + E * v), 0),
              o
            )))),
        { red: d, green: m, blue: v, alpha: E }
      );
    }
    for (let d = 0; d < i; d++)
      for (let m = 0; m < e; m++) {
        let v = p(s, u);
        switch (r.colorType) {
          case Ke.COLORTYPE_COLOR_ALPHA:
          case Ke.COLORTYPE_COLOR:
            r.bitDepth === 8
              ? ((c[f] = v.red),
                (c[f + 1] = v.green),
                (c[f + 2] = v.blue),
                n && (c[f + 3] = v.alpha))
              : (c.writeUInt16BE(v.red, f),
                c.writeUInt16BE(v.green, f + 2),
                c.writeUInt16BE(v.blue, f + 4),
                n && c.writeUInt16BE(v.alpha, f + 6));
            break;
          case Ke.COLORTYPE_ALPHA:
          case Ke.COLORTYPE_GRAYSCALE: {
            let E = (v.red + v.green + v.blue) / 3;
            r.bitDepth === 8
              ? ((c[f] = E), n && (c[f + 1] = v.alpha))
              : (c.writeUInt16BE(E, f), n && c.writeUInt16BE(v.alpha, f + 2));
            break;
          }
          default:
            throw new Error("unrecognised color Type " + r.colorType);
        }
        (u += l), (f += a);
      }
    return c;
  };
});
var Ka = y((Gg, Ya) => {
  "use strict";
  var Wa = Zr();
  function bp(t, e, i, r, n) {
    for (let s = 0; s < i; s++) r[n + s] = t[e + s];
  }
  function wp(t, e, i) {
    let r = 0,
      n = e + i;
    for (let s = e; s < n; s++) r += Math.abs(t[s]);
    return r;
  }
  function Ep(t, e, i, r, n, s) {
    for (let o = 0; o < i; o++) {
      let l = o >= s ? t[e + o - s] : 0,
        a = t[e + o] - l;
      r[n + o] = a;
    }
  }
  function Sp(t, e, i, r) {
    let n = 0;
    for (let s = 0; s < i; s++) {
      let o = s >= r ? t[e + s - r] : 0,
        l = t[e + s] - o;
      n += Math.abs(l);
    }
    return n;
  }
  function kp(t, e, i, r, n) {
    for (let s = 0; s < i; s++) {
      let o = e > 0 ? t[e + s - i] : 0,
        l = t[e + s] - o;
      r[n + s] = l;
    }
  }
  function Cp(t, e, i) {
    let r = 0,
      n = e + i;
    for (let s = e; s < n; s++) {
      let o = e > 0 ? t[s - i] : 0,
        l = t[s] - o;
      r += Math.abs(l);
    }
    return r;
  }
  function Op(t, e, i, r, n, s) {
    for (let o = 0; o < i; o++) {
      let l = o >= s ? t[e + o - s] : 0,
        a = e > 0 ? t[e + o - i] : 0,
        c = t[e + o] - ((l + a) >> 1);
      r[n + o] = c;
    }
  }
  function Ip(t, e, i, r) {
    let n = 0;
    for (let s = 0; s < i; s++) {
      let o = s >= r ? t[e + s - r] : 0,
        l = e > 0 ? t[e + s - i] : 0,
        a = t[e + s] - ((o + l) >> 1);
      n += Math.abs(a);
    }
    return n;
  }
  function Tp(t, e, i, r, n, s) {
    for (let o = 0; o < i; o++) {
      let l = o >= s ? t[e + o - s] : 0,
        a = e > 0 ? t[e + o - i] : 0,
        c = e > 0 && o >= s ? t[e + o - (i + s)] : 0,
        u = t[e + o] - Wa(l, a, c);
      r[n + o] = u;
    }
  }
  function Ap(t, e, i, r) {
    let n = 0;
    for (let s = 0; s < i; s++) {
      let o = s >= r ? t[e + s - r] : 0,
        l = e > 0 ? t[e + s - i] : 0,
        a = e > 0 && s >= r ? t[e + s - (i + r)] : 0,
        c = t[e + s] - Wa(o, l, a);
      n += Math.abs(c);
    }
    return n;
  }
  var Rp = { 0: bp, 1: Ep, 2: kp, 3: Op, 4: Tp },
    Bp = { 0: wp, 1: Sp, 2: Cp, 3: Ip, 4: Ap };
  Ya.exports = function (t, e, i, r, n) {
    let s;
    if (!("filterType" in r) || r.filterType === -1) s = [0, 1, 2, 3, 4];
    else if (typeof r.filterType == "number") s = [r.filterType];
    else throw new Error("unrecognised filter types");
    r.bitDepth === 16 && (n *= 2);
    let o = e * n,
      l = 0,
      a = 0,
      c = Buffer.alloc((o + 1) * i),
      u = s[0];
    for (let f = 0; f < i; f++) {
      if (s.length > 1) {
        let h = 1 / 0;
        for (let p = 0; p < s.length; p++) {
          let d = Bp[s[p]](t, a, o, n);
          d < h && ((u = s[p]), (h = d));
        }
      }
      (c[l] = u), l++, Rp[u](t, a, o, c, l, n), (l += o), (a += o);
    }
    return c;
  };
});
var on = y((zg, Za) => {
  "use strict";
  var Ue = Yt(),
    Lp = en(),
    Pp = za(),
    Fp = Ka(),
    Np = require("zlib"),
    pt = (Za.exports = function (t) {
      if (
        ((this._options = t),
        (t.deflateChunkSize = t.deflateChunkSize || 32 * 1024),
        (t.deflateLevel = t.deflateLevel != null ? t.deflateLevel : 9),
        (t.deflateStrategy = t.deflateStrategy != null ? t.deflateStrategy : 3),
        (t.inputHasAlpha = t.inputHasAlpha != null ? t.inputHasAlpha : !0),
        (t.deflateFactory = t.deflateFactory || Np.createDeflate),
        (t.bitDepth = t.bitDepth || 8),
        (t.colorType =
          typeof t.colorType == "number"
            ? t.colorType
            : Ue.COLORTYPE_COLOR_ALPHA),
        (t.inputColorType =
          typeof t.inputColorType == "number"
            ? t.inputColorType
            : Ue.COLORTYPE_COLOR_ALPHA),
        [
          Ue.COLORTYPE_GRAYSCALE,
          Ue.COLORTYPE_COLOR,
          Ue.COLORTYPE_COLOR_ALPHA,
          Ue.COLORTYPE_ALPHA,
        ].indexOf(t.colorType) === -1)
      )
        throw new Error(
          "option color type:" + t.colorType + " is not supported at present"
        );
      if (
        [
          Ue.COLORTYPE_GRAYSCALE,
          Ue.COLORTYPE_COLOR,
          Ue.COLORTYPE_COLOR_ALPHA,
          Ue.COLORTYPE_ALPHA,
        ].indexOf(t.inputColorType) === -1
      )
        throw new Error(
          "option input color type:" +
            t.inputColorType +
            " is not supported at present"
        );
      if (t.bitDepth !== 8 && t.bitDepth !== 16)
        throw new Error(
          "option bit depth:" + t.bitDepth + " is not supported at present"
        );
    });
  pt.prototype.getDeflateOptions = function () {
    return {
      chunkSize: this._options.deflateChunkSize,
      level: this._options.deflateLevel,
      strategy: this._options.deflateStrategy,
    };
  };
  pt.prototype.createDeflate = function () {
    return this._options.deflateFactory(this.getDeflateOptions());
  };
  pt.prototype.filterData = function (t, e, i) {
    let r = Pp(t, e, i, this._options),
      n = Ue.COLORTYPE_TO_BPP_MAP[this._options.colorType];
    return Fp(r, e, i, this._options, n);
  };
  pt.prototype._packChunk = function (t, e) {
    let i = e ? e.length : 0,
      r = Buffer.alloc(i + 12);
    return (
      r.writeUInt32BE(i, 0),
      r.writeUInt32BE(t, 4),
      e && e.copy(r, 8),
      r.writeInt32BE(Lp.crc32(r.slice(4, r.length - 4)), r.length - 4),
      r
    );
  };
  pt.prototype.packGAMA = function (t) {
    let e = Buffer.alloc(4);
    return (
      e.writeUInt32BE(Math.floor(t * Ue.GAMMA_DIVISION), 0),
      this._packChunk(Ue.TYPE_gAMA, e)
    );
  };
  pt.prototype.packIHDR = function (t, e) {
    let i = Buffer.alloc(13);
    return (
      i.writeUInt32BE(t, 0),
      i.writeUInt32BE(e, 4),
      (i[8] = this._options.bitDepth),
      (i[9] = this._options.colorType),
      (i[10] = 0),
      (i[11] = 0),
      (i[12] = 0),
      this._packChunk(Ue.TYPE_IHDR, i)
    );
  };
  pt.prototype.packIDAT = function (t) {
    return this._packChunk(Ue.TYPE_IDAT, t);
  };
  pt.prototype.packIEND = function () {
    return this._packChunk(Ue.TYPE_IEND, null);
  };
});
var el = y((Wg, Qa) => {
  "use strict";
  var Mp = require("util"),
    Xa = require("stream"),
    Up = Yt(),
    Dp = on(),
    Ja = (Qa.exports = function (t) {
      Xa.call(this);
      let e = t || {};
      (this._packer = new Dp(e)),
        (this._deflate = this._packer.createDeflate()),
        (this.readable = !0);
    });
  Mp.inherits(Ja, Xa);
  Ja.prototype.pack = function (t, e, i, r) {
    this.emit("data", Buffer.from(Up.PNG_SIGNATURE)),
      this.emit("data", this._packer.packIHDR(e, i)),
      r && this.emit("data", this._packer.packGAMA(r));
    let n = this._packer.filterData(t, e, i);
    this._deflate.on("error", this.emit.bind(this, "error")),
      this._deflate.on(
        "data",
        function (s) {
          this.emit("data", this._packer.packIDAT(s));
        }.bind(this)
      ),
      this._deflate.on(
        "end",
        function () {
          this.emit("data", this._packer.packIEND()), this.emit("end");
        }.bind(this)
      ),
      this._deflate.end(n);
  };
});
var ol = y((bi, sl) => {
  "use strict";
  var tl = require("assert").ok,
    Kt = require("zlib"),
    jp = require("util"),
    il = require("buffer").kMaxLength;
  function St(t) {
    if (!(this instanceof St)) return new St(t);
    t && t.chunkSize < Kt.Z_MIN_CHUNK && (t.chunkSize = Kt.Z_MIN_CHUNK),
      Kt.Inflate.call(this, t),
      (this._offset = this._offset === void 0 ? this._outOffset : this._offset),
      (this._buffer = this._buffer || this._outBuffer),
      t && t.maxLength != null && (this._maxLength = t.maxLength);
  }
  function qp(t) {
    return new St(t);
  }
  function rl(t, e) {
    e && process.nextTick(e),
      t._handle && (t._handle.close(), (t._handle = null));
  }
  St.prototype._processChunk = function (t, e, i) {
    if (typeof i == "function")
      return Kt.Inflate._processChunk.call(this, t, e, i);
    let r = this,
      n = t && t.length,
      s = this._chunkSize - this._offset,
      o = this._maxLength,
      l = 0,
      a = [],
      c = 0,
      u;
    this.on("error", function (d) {
      u = d;
    });
    function f(d, m) {
      if (r._hadError) return;
      let v = s - m;
      if ((tl(v >= 0, "have should not go down"), v > 0)) {
        let E = r._buffer.slice(r._offset, r._offset + v);
        if (
          ((r._offset += v),
          E.length > o && (E = E.slice(0, o)),
          a.push(E),
          (c += E.length),
          (o -= E.length),
          o === 0)
        )
          return !1;
      }
      return (
        (m === 0 || r._offset >= r._chunkSize) &&
          ((s = r._chunkSize),
          (r._offset = 0),
          (r._buffer = Buffer.allocUnsafe(r._chunkSize))),
        m === 0 ? ((l += n - d), (n = d), !0) : !1
      );
    }
    tl(this._handle, "zlib binding closed");
    let h;
    do
      (h = this._handle.writeSync(e, t, l, n, this._buffer, this._offset, s)),
        (h = h || this._writeState);
    while (!this._hadError && f(h[0], h[1]));
    if (this._hadError) throw u;
    if (c >= il)
      throw (
        (rl(this),
        new RangeError(
          "Cannot create final Buffer. It would be larger than 0x" +
            il.toString(16) +
            " bytes"
        ))
      );
    let p = Buffer.concat(a, c);
    return rl(this), p;
  };
  jp.inherits(St, Kt.Inflate);
  function Hp(t, e) {
    if ((typeof e == "string" && (e = Buffer.from(e)), !(e instanceof Buffer)))
      throw new TypeError("Not a string or buffer");
    let i = t._finishFlushFlag;
    return i == null && (i = Kt.Z_FINISH), t._processChunk(e, i);
  }
  function nl(t, e) {
    return Hp(new St(e), t);
  }
  sl.exports = bi = nl;
  bi.Inflate = St;
  bi.createInflate = qp;
  bi.inflateSync = nl;
});
var an = y((Yg, ll) => {
  "use strict";
  var al = (ll.exports = function (t) {
    (this._buffer = t), (this._reads = []);
  });
  al.prototype.read = function (t, e) {
    this._reads.push({ length: Math.abs(t), allowLess: t < 0, func: e });
  };
  al.prototype.process = function () {
    for (; this._reads.length > 0 && this._buffer.length; ) {
      let t = this._reads[0];
      if (
        this._buffer.length &&
        (this._buffer.length >= t.length || t.allowLess)
      ) {
        this._reads.shift();
        let e = this._buffer;
        (this._buffer = e.slice(t.length)),
          t.func.call(this, e.slice(0, t.length));
      } else break;
    }
    if (this._reads.length > 0)
      throw new Error("There are some read requests waitng on finished stream");
    if (this._buffer.length > 0)
      throw new Error("unrecognised content at end of stream");
  };
});
var ul = y((cl) => {
  "use strict";
  var Vp = an(),
    $p = Xr();
  cl.process = function (t, e) {
    let i = [],
      r = new Vp(t);
    return (
      new $p(e, {
        read: r.read.bind(r),
        write: function (s) {
          i.push(s);
        },
        complete: function () {},
      }).start(),
      r.process(),
      Buffer.concat(i)
    );
  };
});
var dl = y((Zg, pl) => {
  "use strict";
  var fl = !0,
    hl = require("zlib"),
    Gp = ol();
  hl.deflateSync || (fl = !1);
  var zp = an(),
    Wp = ul(),
    Yp = tn(),
    Kp = rn(),
    Zp = nn();
  pl.exports = function (t, e) {
    if (!fl)
      throw new Error(
        "To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0"
      );
    let i;
    function r(C) {
      i = C;
    }
    let n;
    function s(C) {
      n = C;
    }
    function o(C) {
      n.transColor = C;
    }
    function l(C) {
      n.palette = C;
    }
    function a() {
      n.alpha = !0;
    }
    let c;
    function u(C) {
      c = C;
    }
    let f = [];
    function h(C) {
      f.push(C);
    }
    let p = new zp(t);
    if (
      (new Yp(e, {
        read: p.read.bind(p),
        error: r,
        metadata: s,
        gamma: u,
        palette: l,
        transColor: o,
        inflateData: h,
        simpleTransparency: a,
      }).start(),
      p.process(),
      i)
    )
      throw i;
    let m = Buffer.concat(f);
    f.length = 0;
    let v;
    if (n.interlace) v = hl.inflateSync(m);
    else {
      let _ = (((n.width * n.bpp * n.depth + 7) >> 3) + 1) * n.height;
      v = Gp(m, { chunkSize: _, maxLength: _ });
    }
    if (((m = null), !v || !v.length))
      throw new Error("bad png - invalid inflate data response");
    let E = Wp.process(v, n);
    m = null;
    let I = Kp.dataToBitMap(E, n);
    E = null;
    let w = Zp(I, n, e.skipRescale);
    return (n.data = w), (n.gamma = c || 0), n;
  };
});
var xl = y((Xg, vl) => {
  "use strict";
  var ml = !0,
    gl = require("zlib");
  gl.deflateSync || (ml = !1);
  var Xp = Yt(),
    Jp = on();
  vl.exports = function (t, e) {
    if (!ml)
      throw new Error(
        "To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0"
      );
    let i = e || {},
      r = new Jp(i),
      n = [];
    n.push(Buffer.from(Xp.PNG_SIGNATURE)),
      n.push(r.packIHDR(t.width, t.height)),
      t.gamma && n.push(r.packGAMA(t.gamma));
    let s = r.filterData(t.data, t.width, t.height),
      o = gl.deflateSync(s, r.getDeflateOptions());
    if (((s = null), !o || !o.length))
      throw new Error("bad png - invalid compressed data response");
    return n.push(r.packIDAT(o)), n.push(r.packIEND()), Buffer.concat(n);
  };
});
var _l = y((ln) => {
  "use strict";
  var Qp = dl(),
    ed = xl();
  ln.read = function (t, e) {
    return Qp(t, e || {});
  };
  ln.write = function (t, e) {
    return ed(t, e);
  };
});
var wl = y((bl) => {
  "use strict";
  var td = require("util"),
    yl = require("stream"),
    id = $a(),
    rd = el(),
    nd = _l(),
    qe = (bl.PNG = function (t) {
      yl.call(this),
        (t = t || {}),
        (this.width = t.width | 0),
        (this.height = t.height | 0),
        (this.data =
          this.width > 0 && this.height > 0
            ? Buffer.alloc(4 * this.width * this.height)
            : null),
        t.fill && this.data && this.data.fill(0),
        (this.gamma = 0),
        (this.readable = this.writable = !0),
        (this._parser = new id(t)),
        this._parser.on("error", this.emit.bind(this, "error")),
        this._parser.on("close", this._handleClose.bind(this)),
        this._parser.on("metadata", this._metadata.bind(this)),
        this._parser.on("gamma", this._gamma.bind(this)),
        this._parser.on(
          "parsed",
          function (e) {
            (this.data = e), this.emit("parsed", e);
          }.bind(this)
        ),
        (this._packer = new rd(t)),
        this._packer.on("data", this.emit.bind(this, "data")),
        this._packer.on("end", this.emit.bind(this, "end")),
        this._parser.on("close", this._handleClose.bind(this)),
        this._packer.on("error", this.emit.bind(this, "error"));
    });
  td.inherits(qe, yl);
  qe.sync = nd;
  qe.prototype.pack = function () {
    return !this.data || !this.data.length
      ? (this.emit("error", "No data provided"), this)
      : (process.nextTick(
          function () {
            this._packer.pack(this.data, this.width, this.height, this.gamma);
          }.bind(this)
        ),
        this);
  };
  qe.prototype.parse = function (t, e) {
    if (e) {
      let i, r;
      (i = function (n) {
        this.removeListener("error", r), (this.data = n), e(null, this);
      }.bind(this)),
        (r = function (n) {
          this.removeListener("parsed", i), e(n, null);
        }.bind(this)),
        this.once("parsed", i),
        this.once("error", r);
    }
    return this.end(t), this;
  };
  qe.prototype.write = function (t) {
    return this._parser.write(t), !0;
  };
  qe.prototype.end = function (t) {
    this._parser.end(t);
  };
  qe.prototype._metadata = function (t) {
    (this.width = t.width), (this.height = t.height), this.emit("metadata", t);
  };
  qe.prototype._gamma = function (t) {
    this.gamma = t;
  };
  qe.prototype._handleClose = function () {
    !this._parser.writable && !this._packer.readable && this.emit("close");
  };
  qe.bitblt = function (t, e, i, r, n, s, o, l) {
    if (
      ((i |= 0),
      (r |= 0),
      (n |= 0),
      (s |= 0),
      (o |= 0),
      (l |= 0),
      i > t.width || r > t.height || i + n > t.width || r + s > t.height)
    )
      throw new Error("bitblt reading outside image");
    if (o > e.width || l > e.height || o + n > e.width || l + s > e.height)
      throw new Error("bitblt writing outside image");
    for (let a = 0; a < s; a++)
      t.data.copy(
        e.data,
        ((l + a) * e.width + o) << 2,
        ((r + a) * t.width + i) << 2,
        ((r + a) * t.width + i + n) << 2
      );
  };
  qe.prototype.bitblt = function (t, e, i, r, n, s, o) {
    return qe.bitblt(this, t, e, i, r, n, s, o), this;
  };
  qe.adjustGamma = function (t) {
    if (t.gamma) {
      for (let e = 0; e < t.height; e++)
        for (let i = 0; i < t.width; i++) {
          let r = (t.width * e + i) << 2;
          for (let n = 0; n < 3; n++) {
            let s = t.data[r + n] / 255;
            (s = Math.pow(s, 1 / 2.2 / t.gamma)),
              (t.data[r + n] = Math.round(s * 255));
          }
        }
      t.gamma = 0;
    }
  };
  qe.prototype.adjustGamma = function () {
    qe.adjustGamma(this);
  };
});
var wi = y((un) => {
  var Xi = class extends Error {
      constructor(e, i, r) {
        super(r),
          Error.captureStackTrace(this, this.constructor),
          (this.name = this.constructor.name),
          (this.code = i),
          (this.exitCode = e),
          (this.nestedError = void 0);
      }
    },
    cn = class extends Xi {
      constructor(e) {
        super(1, "commander.invalidArgument", e),
          Error.captureStackTrace(this, this.constructor),
          (this.name = this.constructor.name);
      }
    };
  un.CommanderError = Xi;
  un.InvalidArgumentError = cn;
});
var Ji = y((hn) => {
  var { InvalidArgumentError: sd } = wi(),
    fn = class {
      constructor(e, i) {
        switch (
          ((this.description = i || ""),
          (this.variadic = !1),
          (this.parseArg = void 0),
          (this.defaultValue = void 0),
          (this.defaultValueDescription = void 0),
          (this.argChoices = void 0),
          e[0])
        ) {
          case "<":
            (this.required = !0), (this._name = e.slice(1, -1));
            break;
          case "[":
            (this.required = !1), (this._name = e.slice(1, -1));
            break;
          default:
            (this.required = !0), (this._name = e);
            break;
        }
        this._name.length > 3 &&
          this._name.slice(-3) === "..." &&
          ((this.variadic = !0), (this._name = this._name.slice(0, -3)));
      }
      name() {
        return this._name;
      }
      _concatValue(e, i) {
        return i === this.defaultValue || !Array.isArray(i) ? [e] : i.concat(e);
      }
      default(e, i) {
        return (
          (this.defaultValue = e), (this.defaultValueDescription = i), this
        );
      }
      argParser(e) {
        return (this.parseArg = e), this;
      }
      choices(e) {
        return (
          (this.argChoices = e),
          (this.parseArg = (i, r) => {
            if (!e.includes(i))
              throw new sd(`Allowed choices are ${e.join(", ")}.`);
            return this.variadic ? this._concatValue(i, r) : i;
          }),
          this
        );
      }
      argRequired() {
        return (this.required = !0), this;
      }
      argOptional() {
        return (this.required = !1), this;
      }
    };
  function od(t) {
    let e = t.name() + (t.variadic === !0 ? "..." : "");
    return t.required ? "<" + e + ">" : "[" + e + "]";
  }
  hn.Argument = fn;
  hn.humanReadableArgName = od;
});
var dn = y((El) => {
  var { humanReadableArgName: ad } = Ji(),
    pn = class {
      constructor() {
        (this.helpWidth = void 0),
          (this.sortSubcommands = !1),
          (this.sortOptions = !1);
      }
      visibleCommands(e) {
        let i = e.commands.filter((r) => !r._hidden);
        if (e._hasImplicitHelpCommand()) {
          let [, r, n] = e._helpCommandnameAndArgs.match(/([^ ]+) *(.*)/),
            s = e.createCommand(r).helpOption(!1);
          s.description(e._helpCommandDescription),
            n && s.arguments(n),
            i.push(s);
        }
        return (
          this.sortSubcommands &&
            i.sort((r, n) => r.name().localeCompare(n.name())),
          i
        );
      }
      visibleOptions(e) {
        let i = e.options.filter((s) => !s.hidden),
          r =
            e._hasHelpOption &&
            e._helpShortFlag &&
            !e._findOption(e._helpShortFlag),
          n = e._hasHelpOption && !e._findOption(e._helpLongFlag);
        if (r || n) {
          let s;
          r
            ? n
              ? (s = e.createOption(e._helpFlags, e._helpDescription))
              : (s = e.createOption(e._helpShortFlag, e._helpDescription))
            : (s = e.createOption(e._helpLongFlag, e._helpDescription)),
            i.push(s);
        }
        if (this.sortOptions) {
          let s = (o) =>
            o.short ? o.short.replace(/^-/, "") : o.long.replace(/^--/, "");
          i.sort((o, l) => s(o).localeCompare(s(l)));
        }
        return i;
      }
      visibleArguments(e) {
        return (
          e._argsDescription &&
            e._args.forEach((i) => {
              i.description =
                i.description || e._argsDescription[i.name()] || "";
            }),
          e._args.find((i) => i.description) ? e._args : []
        );
      }
      subcommandTerm(e) {
        let i = e._args.map((r) => ad(r)).join(" ");
        return (
          e._name +
          (e._aliases[0] ? "|" + e._aliases[0] : "") +
          (e.options.length ? " [options]" : "") +
          (i ? " " + i : "")
        );
      }
      optionTerm(e) {
        return e.flags;
      }
      argumentTerm(e) {
        return e.name();
      }
      longestSubcommandTermLength(e, i) {
        return i
          .visibleCommands(e)
          .reduce((r, n) => Math.max(r, i.subcommandTerm(n).length), 0);
      }
      longestOptionTermLength(e, i) {
        return i
          .visibleOptions(e)
          .reduce((r, n) => Math.max(r, i.optionTerm(n).length), 0);
      }
      longestArgumentTermLength(e, i) {
        return i
          .visibleArguments(e)
          .reduce((r, n) => Math.max(r, i.argumentTerm(n).length), 0);
      }
      commandUsage(e) {
        let i = e._name;
        e._aliases[0] && (i = i + "|" + e._aliases[0]);
        let r = "";
        for (let n = e.parent; n; n = n.parent) r = n.name() + " " + r;
        return r + i + " " + e.usage();
      }
      commandDescription(e) {
        return e.description();
      }
      subcommandDescription(e) {
        return e.description();
      }
      optionDescription(e) {
        let i = [];
        return (
          e.argChoices &&
            !e.negate &&
            i.push(
              `choices: ${e.argChoices
                .map((r) => JSON.stringify(r))
                .join(", ")}`
            ),
          e.defaultValue !== void 0 &&
            !e.negate &&
            i.push(
              `default: ${
                e.defaultValueDescription || JSON.stringify(e.defaultValue)
              }`
            ),
          e.envVar !== void 0 && i.push(`env: ${e.envVar}`),
          i.length > 0 ? `${e.description} (${i.join(", ")})` : e.description
        );
      }
      argumentDescription(e) {
        let i = [];
        if (
          (e.argChoices &&
            i.push(
              `choices: ${e.argChoices
                .map((r) => JSON.stringify(r))
                .join(", ")}`
            ),
          e.defaultValue !== void 0 &&
            i.push(
              `default: ${
                e.defaultValueDescription || JSON.stringify(e.defaultValue)
              }`
            ),
          i.length > 0)
        ) {
          let r = `(${i.join(", ")})`;
          return e.description ? `${e.description} ${r}` : r;
        }
        return e.description;
      }
      formatHelp(e, i) {
        let r = i.padWidth(e, i),
          n = i.helpWidth || 80,
          s = 2,
          o = 2;
        function l(d, m) {
          if (m) {
            let v = `${d.padEnd(r + o)}${m}`;
            return i.wrap(v, n - s, r + o);
          }
          return d;
        }
        function a(d) {
          return d
            .join(
              `
`
            )
            .replace(/^/gm, " ".repeat(s));
        }
        let c = [`Usage: ${i.commandUsage(e)}`, ""],
          u = i.commandDescription(e);
        u.length > 0 && (c = c.concat([u, ""]));
        let f = i
          .visibleArguments(e)
          .map((d) => l(i.argumentTerm(d), i.argumentDescription(d)));
        f.length > 0 && (c = c.concat(["Arguments:", a(f), ""]));
        let h = i
          .visibleOptions(e)
          .map((d) => l(i.optionTerm(d), i.optionDescription(d)));
        h.length > 0 && (c = c.concat(["Options:", a(h), ""]));
        let p = i
          .visibleCommands(e)
          .map((d) => l(i.subcommandTerm(d), i.subcommandDescription(d)));
        return (
          p.length > 0 && (c = c.concat(["Commands:", a(p), ""])),
          c.join(`
`)
        );
      }
      padWidth(e, i) {
        return Math.max(
          i.longestOptionTermLength(e, i),
          i.longestSubcommandTermLength(e, i),
          i.longestArgumentTermLength(e, i)
        );
      }
      wrap(e, i, r, n = 40) {
        if (e.match(/[\n]\s+/)) return e;
        let s = i - r;
        if (s < n) return e;
        let o = e.substr(0, r),
          l = e.substr(r),
          a = " ".repeat(r),
          c = new RegExp(
            ".{1," + (s - 1) + "}([\\s\u200B]|$)|[^\\s\u200B]+?([\\s\u200B]|$)",
            "g"
          ),
          u = l.match(c) || [];
        return (
          o +
          u.map(
            (f, h) => (
              f.slice(-1) ===
                `
` && (f = f.slice(0, f.length - 1)),
              (h > 0 ? a : "") + f.trimRight()
            )
          ).join(`
`)
        );
      }
    };
  El.Help = pn;
});
var vn = y((gn) => {
  var { InvalidArgumentError: ld } = wi(),
    mn = class {
      constructor(e, i) {
        (this.flags = e),
          (this.description = i || ""),
          (this.required = e.includes("<")),
          (this.optional = e.includes("[")),
          (this.variadic = /\w\.\.\.[>\]]$/.test(e)),
          (this.mandatory = !1);
        let r = Sl(e);
        (this.short = r.shortFlag),
          (this.long = r.longFlag),
          (this.negate = !1),
          this.long && (this.negate = this.long.startsWith("--no-")),
          (this.defaultValue = void 0),
          (this.defaultValueDescription = void 0),
          (this.envVar = void 0),
          (this.parseArg = void 0),
          (this.hidden = !1),
          (this.argChoices = void 0);
      }
      default(e, i) {
        return (
          (this.defaultValue = e), (this.defaultValueDescription = i), this
        );
      }
      env(e) {
        return (this.envVar = e), this;
      }
      argParser(e) {
        return (this.parseArg = e), this;
      }
      makeOptionMandatory(e = !0) {
        return (this.mandatory = !!e), this;
      }
      hideHelp(e = !0) {
        return (this.hidden = !!e), this;
      }
      _concatValue(e, i) {
        return i === this.defaultValue || !Array.isArray(i) ? [e] : i.concat(e);
      }
      choices(e) {
        return (
          (this.argChoices = e),
          (this.parseArg = (i, r) => {
            if (!e.includes(i))
              throw new ld(`Allowed choices are ${e.join(", ")}.`);
            return this.variadic ? this._concatValue(i, r) : i;
          }),
          this
        );
      }
      name() {
        return this.long
          ? this.long.replace(/^--/, "")
          : this.short.replace(/^-/, "");
      }
      attributeName() {
        return cd(this.name().replace(/^no-/, ""));
      }
      is(e) {
        return this.short === e || this.long === e;
      }
    };
  function cd(t) {
    return t.split("-").reduce((e, i) => e + i[0].toUpperCase() + i.slice(1));
  }
  function Sl(t) {
    let e,
      i,
      r = t.split(/[ |,]+/);
    return (
      r.length > 1 && !/^[[<]/.test(r[1]) && (e = r.shift()),
      (i = r.shift()),
      !e && /^-[^-]$/.test(i) && ((e = i), (i = void 0)),
      { shortFlag: e, longFlag: i }
    );
  }
  gn.Option = mn;
  gn.splitOptionFlags = Sl;
});
var Cl = y((kl) => {
  function ud(t, e) {
    if (Math.abs(t.length - e.length) > 3) return Math.max(t.length, e.length);
    let i = [];
    for (let r = 0; r <= t.length; r++) i[r] = [r];
    for (let r = 0; r <= e.length; r++) i[0][r] = r;
    for (let r = 1; r <= e.length; r++)
      for (let n = 1; n <= t.length; n++) {
        let s = 1;
        t[n - 1] === e[r - 1] ? (s = 0) : (s = 1),
          (i[n][r] = Math.min(
            i[n - 1][r] + 1,
            i[n][r - 1] + 1,
            i[n - 1][r - 1] + s
          )),
          n > 1 &&
            r > 1 &&
            t[n - 1] === e[r - 2] &&
            t[n - 2] === e[r - 1] &&
            (i[n][r] = Math.min(i[n][r], i[n - 2][r - 2] + 1));
      }
    return i[t.length][e.length];
  }
  function fd(t, e) {
    if (!e || e.length === 0) return "";
    e = Array.from(new Set(e));
    let i = t.startsWith("--");
    i && ((t = t.slice(2)), (e = e.map((o) => o.slice(2))));
    let r = [],
      n = 3,
      s = 0.4;
    return (
      e.forEach((o) => {
        if (o.length <= 1) return;
        let l = ud(t, o),
          a = Math.max(t.length, o.length);
        (a - l) / a > s &&
          (l < n ? ((n = l), (r = [o])) : l === n && r.push(o));
      }),
      r.sort((o, l) => o.localeCompare(l)),
      i && (r = r.map((o) => `--${o}`)),
      r.length > 1
        ? `
(Did you mean one of ${r.join(", ")}?)`
        : r.length === 1
        ? `
(Did you mean ${r[0]}?)`
        : ""
    );
  }
  kl.suggestSimilar = fd;
});
var Rl = y((Al) => {
  var hd = require("events").EventEmitter,
    xn = require("child_process"),
    kt = require("path"),
    _n = require("fs"),
    { Argument: pd, humanReadableArgName: dd } = Ji(),
    { CommanderError: yn } = wi(),
    { Help: md } = dn(),
    { Option: gd, splitOptionFlags: vd } = vn(),
    { suggestSimilar: Ol } = Cl(),
    wn = class t extends hd {
      constructor(e) {
        super(),
          (this.commands = []),
          (this.options = []),
          (this.parent = null),
          (this._allowUnknownOption = !1),
          (this._allowExcessArguments = !0),
          (this._args = []),
          (this.args = []),
          (this.rawArgs = []),
          (this.processedArgs = []),
          (this._scriptPath = null),
          (this._name = e || ""),
          (this._optionValues = {}),
          (this._optionValueSources = {}),
          (this._storeOptionsAsProperties = !1),
          (this._actionHandler = null),
          (this._executableHandler = !1),
          (this._executableFile = null),
          (this._defaultCommandName = null),
          (this._exitCallback = null),
          (this._aliases = []),
          (this._combineFlagAndOptionalValue = !0),
          (this._description = ""),
          (this._argsDescription = void 0),
          (this._enablePositionalOptions = !1),
          (this._passThroughOptions = !1),
          (this._lifeCycleHooks = {}),
          (this._showHelpAfterError = !1),
          (this._showSuggestionAfterError = !1),
          (this._outputConfiguration = {
            writeOut: (i) => process.stdout.write(i),
            writeErr: (i) => process.stderr.write(i),
            getOutHelpWidth: () =>
              process.stdout.isTTY ? process.stdout.columns : void 0,
            getErrHelpWidth: () =>
              process.stderr.isTTY ? process.stderr.columns : void 0,
            outputError: (i, r) => r(i),
          }),
          (this._hidden = !1),
          (this._hasHelpOption = !0),
          (this._helpFlags = "-h, --help"),
          (this._helpDescription = "display help for command"),
          (this._helpShortFlag = "-h"),
          (this._helpLongFlag = "--help"),
          (this._addImplicitHelpCommand = void 0),
          (this._helpCommandName = "help"),
          (this._helpCommandnameAndArgs = "help [command]"),
          (this._helpCommandDescription = "display help for command"),
          (this._helpConfiguration = {});
      }
      copyInheritedSettings(e) {
        return (
          (this._outputConfiguration = e._outputConfiguration),
          (this._hasHelpOption = e._hasHelpOption),
          (this._helpFlags = e._helpFlags),
          (this._helpDescription = e._helpDescription),
          (this._helpShortFlag = e._helpShortFlag),
          (this._helpLongFlag = e._helpLongFlag),
          (this._helpCommandName = e._helpCommandName),
          (this._helpCommandnameAndArgs = e._helpCommandnameAndArgs),
          (this._helpCommandDescription = e._helpCommandDescription),
          (this._helpConfiguration = e._helpConfiguration),
          (this._exitCallback = e._exitCallback),
          (this._storeOptionsAsProperties = e._storeOptionsAsProperties),
          (this._combineFlagAndOptionalValue = e._combineFlagAndOptionalValue),
          (this._allowExcessArguments = e._allowExcessArguments),
          (this._enablePositionalOptions = e._enablePositionalOptions),
          (this._showHelpAfterError = e._showHelpAfterError),
          (this._showSuggestionAfterError = e._showSuggestionAfterError),
          this
        );
      }
      command(e, i, r) {
        let n = i,
          s = r;
        typeof n == "object" && n !== null && ((s = n), (n = null)),
          (s = s || {});
        let [, o, l] = e.match(/([^ ]+) *(.*)/),
          a = this.createCommand(o);
        return (
          n && (a.description(n), (a._executableHandler = !0)),
          s.isDefault && (this._defaultCommandName = a._name),
          (a._hidden = !!(s.noHelp || s.hidden)),
          (a._executableFile = s.executableFile || null),
          l && a.arguments(l),
          this.commands.push(a),
          (a.parent = this),
          a.copyInheritedSettings(this),
          n ? this : a
        );
      }
      createCommand(e) {
        return new t(e);
      }
      createHelp() {
        return Object.assign(new md(), this.configureHelp());
      }
      configureHelp(e) {
        return e === void 0
          ? this._helpConfiguration
          : ((this._helpConfiguration = e), this);
      }
      configureOutput(e) {
        return e === void 0
          ? this._outputConfiguration
          : (Object.assign(this._outputConfiguration, e), this);
      }
      showHelpAfterError(e = !0) {
        return (
          typeof e != "string" && (e = !!e),
          (this._showHelpAfterError = e),
          this
        );
      }
      showSuggestionAfterError(e = !0) {
        return (this._showSuggestionAfterError = !!e), this;
      }
      addCommand(e, i) {
        if (!e._name)
          throw new Error("Command passed to .addCommand() must have a name");
        function r(n) {
          n.forEach((s) => {
            if (s._executableHandler && !s._executableFile)
              throw new Error(
                `Must specify executableFile for deeply nested executable: ${s.name()}`
              );
            r(s.commands);
          });
        }
        return (
          r(e.commands),
          (i = i || {}),
          i.isDefault && (this._defaultCommandName = e._name),
          (i.noHelp || i.hidden) && (e._hidden = !0),
          this.commands.push(e),
          (e.parent = this),
          this
        );
      }
      createArgument(e, i) {
        return new pd(e, i);
      }
      argument(e, i, r, n) {
        let s = this.createArgument(e, i);
        return (
          typeof r == "function" ? s.default(n).argParser(r) : s.default(r),
          this.addArgument(s),
          this
        );
      }
      arguments(e) {
        return (
          e.split(/ +/).forEach((i) => {
            this.argument(i);
          }),
          this
        );
      }
      addArgument(e) {
        let i = this._args.slice(-1)[0];
        if (i && i.variadic)
          throw new Error(
            `only the last argument can be variadic '${i.name()}'`
          );
        if (e.required && e.defaultValue !== void 0 && e.parseArg === void 0)
          throw new Error(
            `a default value for a required argument is never used: '${e.name()}'`
          );
        return this._args.push(e), this;
      }
      addHelpCommand(e, i) {
        return (
          e === !1
            ? (this._addImplicitHelpCommand = !1)
            : ((this._addImplicitHelpCommand = !0),
              typeof e == "string" &&
                ((this._helpCommandName = e.split(" ")[0]),
                (this._helpCommandnameAndArgs = e)),
              (this._helpCommandDescription =
                i || this._helpCommandDescription)),
          this
        );
      }
      _hasImplicitHelpCommand() {
        return this._addImplicitHelpCommand === void 0
          ? this.commands.length &&
              !this._actionHandler &&
              !this._findCommand("help")
          : this._addImplicitHelpCommand;
      }
      hook(e, i) {
        let r = ["preAction", "postAction"];
        if (!r.includes(e))
          throw new Error(`Unexpected value for event passed to hook : '${e}'.
Expecting one of '${r.join("', '")}'`);
        return (
          this._lifeCycleHooks[e]
            ? this._lifeCycleHooks[e].push(i)
            : (this._lifeCycleHooks[e] = [i]),
          this
        );
      }
      exitOverride(e) {
        return (
          e
            ? (this._exitCallback = e)
            : (this._exitCallback = (i) => {
                if (i.code !== "commander.executeSubCommandAsync") throw i;
              }),
          this
        );
      }
      _exit(e, i, r) {
        this._exitCallback && this._exitCallback(new yn(e, i, r)),
          process.exit(e);
      }
      action(e) {
        let i = (r) => {
          let n = this._args.length,
            s = r.slice(0, n);
          return (
            this._storeOptionsAsProperties
              ? (s[n] = this)
              : (s[n] = this.opts()),
            s.push(this),
            e.apply(this, s)
          );
        };
        return (this._actionHandler = i), this;
      }
      createOption(e, i) {
        return new gd(e, i);
      }
      addOption(e) {
        let i = e.name(),
          r = e.attributeName(),
          n = e.defaultValue;
        if (e.negate || e.optional || e.required || typeof n == "boolean") {
          if (e.negate) {
            let o = e.long.replace(/^--no-/, "--");
            n = this._findOption(o) ? this.getOptionValue(r) : !0;
          }
          n !== void 0 && this.setOptionValueWithSource(r, n, "default");
        }
        this.options.push(e);
        let s = (o, l, a) => {
          let c = this.getOptionValue(r);
          if (o !== null && e.parseArg)
            try {
              o = e.parseArg(o, c === void 0 ? n : c);
            } catch (u) {
              if (u.code === "commander.invalidArgument") {
                let f = `${l} ${u.message}`;
                this._displayError(u.exitCode, u.code, f);
              }
              throw u;
            }
          else o !== null && e.variadic && (o = e._concatValue(o, c));
          typeof c == "boolean" || typeof c == "undefined"
            ? o == null
              ? this.setOptionValueWithSource(r, e.negate ? !1 : n || !0, a)
              : this.setOptionValueWithSource(r, o, a)
            : o !== null &&
              this.setOptionValueWithSource(r, e.negate ? !1 : o, a);
        };
        return (
          this.on("option:" + i, (o) => {
            let l = `error: option '${e.flags}' argument '${o}' is invalid.`;
            s(o, l, "cli");
          }),
          e.envVar &&
            this.on("optionEnv:" + i, (o) => {
              let l = `error: option '${e.flags}' value '${o}' from env '${e.envVar}' is invalid.`;
              s(o, l, "env");
            }),
          this
        );
      }
      _optionEx(e, i, r, n, s) {
        let o = this.createOption(i, r);
        if ((o.makeOptionMandatory(!!e.mandatory), typeof n == "function"))
          o.default(s).argParser(n);
        else if (n instanceof RegExp) {
          let l = n;
          (n = (a, c) => {
            let u = l.exec(a);
            return u ? u[0] : c;
          }),
            o.default(s).argParser(n);
        } else o.default(n);
        return this.addOption(o);
      }
      option(e, i, r, n) {
        return this._optionEx({}, e, i, r, n);
      }
      requiredOption(e, i, r, n) {
        return this._optionEx({ mandatory: !0 }, e, i, r, n);
      }
      combineFlagAndOptionalValue(e = !0) {
        return (this._combineFlagAndOptionalValue = !!e), this;
      }
      allowUnknownOption(e = !0) {
        return (this._allowUnknownOption = !!e), this;
      }
      allowExcessArguments(e = !0) {
        return (this._allowExcessArguments = !!e), this;
      }
      enablePositionalOptions(e = !0) {
        return (this._enablePositionalOptions = !!e), this;
      }
      passThroughOptions(e = !0) {
        if (
          ((this._passThroughOptions = !!e),
          this.parent && e && !this.parent._enablePositionalOptions)
        )
          throw new Error(
            "passThroughOptions can not be used without turning on enablePositionalOptions for parent command(s)"
          );
        return this;
      }
      storeOptionsAsProperties(e = !0) {
        if (((this._storeOptionsAsProperties = !!e), this.options.length))
          throw new Error(
            "call .storeOptionsAsProperties() before adding options"
          );
        return this;
      }
      getOptionValue(e) {
        return this._storeOptionsAsProperties ? this[e] : this._optionValues[e];
      }
      setOptionValue(e, i) {
        return (
          this._storeOptionsAsProperties
            ? (this[e] = i)
            : (this._optionValues[e] = i),
          this
        );
      }
      setOptionValueWithSource(e, i, r) {
        return (
          this.setOptionValue(e, i), (this._optionValueSources[e] = r), this
        );
      }
      getOptionValueSource(e) {
        return this._optionValueSources[e];
      }
      _prepareUserArgs(e, i) {
        if (e !== void 0 && !Array.isArray(e))
          throw new Error(
            "first parameter to parse must be array or undefined"
          );
        (i = i || {}),
          e === void 0 &&
            ((e = process.argv),
            process.versions &&
              process.versions.electron &&
              (i.from = "electron")),
          (this.rawArgs = e.slice());
        let r;
        switch (i.from) {
          case void 0:
          case "node":
            (this._scriptPath = e[1]), (r = e.slice(2));
            break;
          case "electron":
            process.defaultApp
              ? ((this._scriptPath = e[1]), (r = e.slice(2)))
              : (r = e.slice(1));
            break;
          case "user":
            r = e.slice(0);
            break;
          default:
            throw new Error(`unexpected parse option { from: '${i.from}' }`);
        }
        return (
          !this._scriptPath &&
            require.main &&
            (this._scriptPath = require.main.filename),
          (this._name =
            this._name ||
            (this._scriptPath &&
              kt.basename(this._scriptPath, kt.extname(this._scriptPath)))),
          r
        );
      }
      parse(e, i) {
        let r = this._prepareUserArgs(e, i);
        return this._parseCommand([], r), this;
      }
      async parseAsync(e, i) {
        let r = this._prepareUserArgs(e, i);
        return await this._parseCommand([], r), this;
      }
      _executeSubCommand(e, i) {
        i = i.slice();
        let r = !1,
          n = [".js", ".ts", ".tsx", ".mjs", ".cjs"];
        this._checkForMissingMandatoryOptions();
        let s = this._scriptPath;
        !s && require.main && (s = require.main.filename);
        let o;
        try {
          let h = _n.realpathSync(s);
          o = kt.dirname(h);
        } catch {
          o = ".";
        }
        let l = kt.basename(s, kt.extname(s)) + "-" + e._name;
        e._executableFile && (l = e._executableFile);
        let a = kt.join(o, l);
        _n.existsSync(a)
          ? (l = a)
          : n.forEach((h) => {
              _n.existsSync(`${a}${h}`) && (l = `${a}${h}`);
            }),
          (r = n.includes(kt.extname(l)));
        let c;
        process.platform !== "win32"
          ? r
            ? (i.unshift(l),
              (i = Tl(process.execArgv).concat(i)),
              (c = xn.spawn(process.argv[0], i, { stdio: "inherit" })))
            : (c = xn.spawn(l, i, { stdio: "inherit" }))
          : (i.unshift(l),
            (i = Tl(process.execArgv).concat(i)),
            (c = xn.spawn(process.execPath, i, { stdio: "inherit" }))),
          ["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"].forEach((h) => {
            process.on(h, () => {
              c.killed === !1 && c.exitCode === null && c.kill(h);
            });
          });
        let f = this._exitCallback;
        f
          ? c.on("close", () => {
              f(
                new yn(
                  process.exitCode || 0,
                  "commander.executeSubCommandAsync",
                  "(close)"
                )
              );
            })
          : c.on("close", process.exit.bind(process)),
          c.on("error", (h) => {
            if (h.code === "ENOENT") {
              let p = `'${l}' does not exist
 - if '${e._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name`;
              throw new Error(p);
            } else if (h.code === "EACCES")
              throw new Error(`'${l}' not executable`);
            if (!f) process.exit(1);
            else {
              let p = new yn(1, "commander.executeSubCommandAsync", "(error)");
              (p.nestedError = h), f(p);
            }
          }),
          (this.runningCommand = c);
      }
      _dispatchSubcommand(e, i, r) {
        let n = this._findCommand(e);
        if ((n || this.help({ error: !0 }), n._executableHandler))
          this._executeSubCommand(n, i.concat(r));
        else return n._parseCommand(i, r);
      }
      _checkNumberOfArguments() {
        this._args.forEach((e, i) => {
          e.required && this.args[i] == null && this.missingArgument(e.name());
        }),
          !(
            this._args.length > 0 && this._args[this._args.length - 1].variadic
          ) &&
            this.args.length > this._args.length &&
            this._excessArguments(this.args);
      }
      _processArguments() {
        let e = (r, n, s) => {
          let o = n;
          if (n !== null && r.parseArg)
            try {
              o = r.parseArg(n, s);
            } catch (l) {
              if (l.code === "commander.invalidArgument") {
                let a = `error: command-argument value '${n}' is invalid for argument '${r.name()}'. ${
                  l.message
                }`;
                this._displayError(l.exitCode, l.code, a);
              }
              throw l;
            }
          return o;
        };
        this._checkNumberOfArguments();
        let i = [];
        this._args.forEach((r, n) => {
          let s = r.defaultValue;
          r.variadic
            ? n < this.args.length
              ? ((s = this.args.slice(n)),
                r.parseArg &&
                  (s = s.reduce((o, l) => e(r, l, o), r.defaultValue)))
              : s === void 0 && (s = [])
            : n < this.args.length &&
              ((s = this.args[n]), r.parseArg && (s = e(r, s, r.defaultValue))),
            (i[n] = s);
        }),
          (this.processedArgs = i);
      }
      _chainOrCall(e, i) {
        return e && e.then && typeof e.then == "function"
          ? e.then(() => i())
          : i();
      }
      _chainOrCallHooks(e, i) {
        let r = e,
          n = [];
        return (
          bn(this)
            .reverse()
            .filter((s) => s._lifeCycleHooks[i] !== void 0)
            .forEach((s) => {
              s._lifeCycleHooks[i].forEach((o) => {
                n.push({ hookedCommand: s, callback: o });
              });
            }),
          i === "postAction" && n.reverse(),
          n.forEach((s) => {
            r = this._chainOrCall(r, () => s.callback(s.hookedCommand, this));
          }),
          r
        );
      }
      _parseCommand(e, i) {
        let r = this.parseOptions(i);
        if (
          (this._parseOptionsEnv(),
          (e = e.concat(r.operands)),
          (i = r.unknown),
          (this.args = e.concat(i)),
          e && this._findCommand(e[0]))
        )
          return this._dispatchSubcommand(e[0], e.slice(1), i);
        if (this._hasImplicitHelpCommand() && e[0] === this._helpCommandName)
          return (
            e.length === 1 && this.help(),
            this._dispatchSubcommand(e[1], [], [this._helpLongFlag])
          );
        if (this._defaultCommandName)
          return (
            Il(this, i),
            this._dispatchSubcommand(this._defaultCommandName, e, i)
          );
        this.commands.length &&
          this.args.length === 0 &&
          !this._actionHandler &&
          !this._defaultCommandName &&
          this.help({ error: !0 }),
          Il(this, r.unknown),
          this._checkForMissingMandatoryOptions();
        let n = () => {
            r.unknown.length > 0 && this.unknownOption(r.unknown[0]);
          },
          s = `command:${this.name()}`;
        if (this._actionHandler) {
          n(), this._processArguments();
          let o;
          return (
            (o = this._chainOrCallHooks(o, "preAction")),
            (o = this._chainOrCall(o, () =>
              this._actionHandler(this.processedArgs)
            )),
            this.parent && this.parent.emit(s, e, i),
            (o = this._chainOrCallHooks(o, "postAction")),
            o
          );
        }
        if (this.parent && this.parent.listenerCount(s))
          n(), this._processArguments(), this.parent.emit(s, e, i);
        else if (e.length) {
          if (this._findCommand("*"))
            return this._dispatchSubcommand("*", e, i);
          this.listenerCount("command:*")
            ? this.emit("command:*", e, i)
            : this.commands.length
            ? this.unknownCommand()
            : (n(), this._processArguments());
        } else
          this.commands.length
            ? (n(), this.help({ error: !0 }))
            : (n(), this._processArguments());
      }
      _findCommand(e) {
        if (e)
          return this.commands.find(
            (i) => i._name === e || i._aliases.includes(e)
          );
      }
      _findOption(e) {
        return this.options.find((i) => i.is(e));
      }
      _checkForMissingMandatoryOptions() {
        for (let e = this; e; e = e.parent)
          e.options.forEach((i) => {
            i.mandatory &&
              e.getOptionValue(i.attributeName()) === void 0 &&
              e.missingMandatoryOptionValue(i);
          });
      }
      parseOptions(e) {
        let i = [],
          r = [],
          n = i,
          s = e.slice();
        function o(a) {
          return a.length > 1 && a[0] === "-";
        }
        let l = null;
        for (; s.length; ) {
          let a = s.shift();
          if (a === "--") {
            n === r && n.push(a), n.push(...s);
            break;
          }
          if (l && !o(a)) {
            this.emit(`option:${l.name()}`, a);
            continue;
          }
          if (((l = null), o(a))) {
            let c = this._findOption(a);
            if (c) {
              if (c.required) {
                let u = s.shift();
                u === void 0 && this.optionMissingArgument(c),
                  this.emit(`option:${c.name()}`, u);
              } else if (c.optional) {
                let u = null;
                s.length > 0 && !o(s[0]) && (u = s.shift()),
                  this.emit(`option:${c.name()}`, u);
              } else this.emit(`option:${c.name()}`);
              l = c.variadic ? c : null;
              continue;
            }
          }
          if (a.length > 2 && a[0] === "-" && a[1] !== "-") {
            let c = this._findOption(`-${a[1]}`);
            if (c) {
              c.required || (c.optional && this._combineFlagAndOptionalValue)
                ? this.emit(`option:${c.name()}`, a.slice(2))
                : (this.emit(`option:${c.name()}`),
                  s.unshift(`-${a.slice(2)}`));
              continue;
            }
          }
          if (/^--[^=]+=/.test(a)) {
            let c = a.indexOf("="),
              u = this._findOption(a.slice(0, c));
            if (u && (u.required || u.optional)) {
              this.emit(`option:${u.name()}`, a.slice(c + 1));
              continue;
            }
          }
          if (
            (o(a) && (n = r),
            (this._enablePositionalOptions || this._passThroughOptions) &&
              i.length === 0 &&
              r.length === 0)
          ) {
            if (this._findCommand(a)) {
              i.push(a), s.length > 0 && r.push(...s);
              break;
            } else if (
              a === this._helpCommandName &&
              this._hasImplicitHelpCommand()
            ) {
              i.push(a), s.length > 0 && i.push(...s);
              break;
            } else if (this._defaultCommandName) {
              r.push(a), s.length > 0 && r.push(...s);
              break;
            }
          }
          if (this._passThroughOptions) {
            n.push(a), s.length > 0 && n.push(...s);
            break;
          }
          n.push(a);
        }
        return { operands: i, unknown: r };
      }
      opts() {
        if (this._storeOptionsAsProperties) {
          let e = {},
            i = this.options.length;
          for (let r = 0; r < i; r++) {
            let n = this.options[r].attributeName();
            e[n] = n === this._versionOptionName ? this._version : this[n];
          }
          return e;
        }
        return this._optionValues;
      }
      _displayError(e, i, r) {
        this._outputConfiguration.outputError(
          `${r}
`,
          this._outputConfiguration.writeErr
        ),
          typeof this._showHelpAfterError == "string"
            ? this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`)
            : this._showHelpAfterError &&
              (this._outputConfiguration.writeErr(`
`),
              this.outputHelp({ error: !0 })),
          this._exit(e, i, r);
      }
      _parseOptionsEnv() {
        this.options.forEach((e) => {
          if (e.envVar && e.envVar in process.env) {
            let i = e.attributeName();
            (this.getOptionValue(i) === void 0 ||
              ["default", "config", "env"].includes(
                this.getOptionValueSource(i)
              )) &&
              (e.required || e.optional
                ? this.emit(`optionEnv:${e.name()}`, process.env[e.envVar])
                : this.emit(`optionEnv:${e.name()}`));
          }
        });
      }
      missingArgument(e) {
        let i = `error: missing required argument '${e}'`;
        this._displayError(1, "commander.missingArgument", i);
      }
      optionMissingArgument(e) {
        let i = `error: option '${e.flags}' argument missing`;
        this._displayError(1, "commander.optionMissingArgument", i);
      }
      missingMandatoryOptionValue(e) {
        let i = `error: required option '${e.flags}' not specified`;
        this._displayError(1, "commander.missingMandatoryOptionValue", i);
      }
      unknownOption(e) {
        if (this._allowUnknownOption) return;
        let i = "";
        if (e.startsWith("--") && this._showSuggestionAfterError) {
          let n = [],
            s = this;
          do {
            let o = s
              .createHelp()
              .visibleOptions(s)
              .filter((l) => l.long)
              .map((l) => l.long);
            (n = n.concat(o)), (s = s.parent);
          } while (s && !s._enablePositionalOptions);
          i = Ol(e, n);
        }
        let r = `error: unknown option '${e}'${i}`;
        this._displayError(1, "commander.unknownOption", r);
      }
      _excessArguments(e) {
        if (this._allowExcessArguments) return;
        let i = this._args.length,
          r = i === 1 ? "" : "s",
          s = `error: too many arguments${
            this.parent ? ` for '${this.name()}'` : ""
          }. Expected ${i} argument${r} but got ${e.length}.`;
        this._displayError(1, "commander.excessArguments", s);
      }
      unknownCommand() {
        let e = this.args[0],
          i = "";
        if (this._showSuggestionAfterError) {
          let n = [];
          this.createHelp()
            .visibleCommands(this)
            .forEach((s) => {
              n.push(s.name()), s.alias() && n.push(s.alias());
            }),
            (i = Ol(e, n));
        }
        let r = `error: unknown command '${e}'${i}`;
        this._displayError(1, "commander.unknownCommand", r);
      }
      version(e, i, r) {
        if (e === void 0) return this._version;
        (this._version = e),
          (i = i || "-V, --version"),
          (r = r || "output the version number");
        let n = this.createOption(i, r);
        return (
          (this._versionOptionName = n.attributeName()),
          this.options.push(n),
          this.on("option:" + n.name(), () => {
            this._outputConfiguration.writeOut(`${e}
`),
              this._exit(0, "commander.version", e);
          }),
          this
        );
      }
      description(e, i) {
        return e === void 0 && i === void 0
          ? this._description
          : ((this._description = e), i && (this._argsDescription = i), this);
      }
      alias(e) {
        if (e === void 0) return this._aliases[0];
        let i = this;
        if (
          (this.commands.length !== 0 &&
            this.commands[this.commands.length - 1]._executableHandler &&
            (i = this.commands[this.commands.length - 1]),
          e === i._name)
        )
          throw new Error("Command alias can't be the same as its name");
        return i._aliases.push(e), this;
      }
      aliases(e) {
        return e === void 0
          ? this._aliases
          : (e.forEach((i) => this.alias(i)), this);
      }
      usage(e) {
        if (e === void 0) {
          if (this._usage) return this._usage;
          let i = this._args.map((r) => dd(r));
          return []
            .concat(
              this.options.length || this._hasHelpOption ? "[options]" : [],
              this.commands.length ? "[command]" : [],
              this._args.length ? i : []
            )
            .join(" ");
        }
        return (this._usage = e), this;
      }
      name(e) {
        return e === void 0 ? this._name : ((this._name = e), this);
      }
      helpInformation(e) {
        let i = this.createHelp();
        return (
          i.helpWidth === void 0 &&
            (i.helpWidth =
              e && e.error
                ? this._outputConfiguration.getErrHelpWidth()
                : this._outputConfiguration.getOutHelpWidth()),
          i.formatHelp(this, i)
        );
      }
      _getHelpContext(e) {
        e = e || {};
        let i = { error: !!e.error },
          r;
        return (
          i.error
            ? (r = (n) => this._outputConfiguration.writeErr(n))
            : (r = (n) => this._outputConfiguration.writeOut(n)),
          (i.write = e.write || r),
          (i.command = this),
          i
        );
      }
      outputHelp(e) {
        let i;
        typeof e == "function" && ((i = e), (e = void 0));
        let r = this._getHelpContext(e);
        bn(this)
          .reverse()
          .forEach((s) => s.emit("beforeAllHelp", r)),
          this.emit("beforeHelp", r);
        let n = this.helpInformation(r);
        if (i && ((n = i(n)), typeof n != "string" && !Buffer.isBuffer(n)))
          throw new Error(
            "outputHelp callback must return a string or a Buffer"
          );
        r.write(n),
          this.emit(this._helpLongFlag),
          this.emit("afterHelp", r),
          bn(this).forEach((s) => s.emit("afterAllHelp", r));
      }
      helpOption(e, i) {
        if (typeof e == "boolean") return (this._hasHelpOption = e), this;
        (this._helpFlags = e || this._helpFlags),
          (this._helpDescription = i || this._helpDescription);
        let r = vd(this._helpFlags);
        return (
          (this._helpShortFlag = r.shortFlag),
          (this._helpLongFlag = r.longFlag),
          this
        );
      }
      help(e) {
        this.outputHelp(e);
        let i = process.exitCode || 0;
        i === 0 && e && typeof e != "function" && e.error && (i = 1),
          this._exit(i, "commander.help", "(outputHelp)");
      }
      addHelpText(e, i) {
        let r = ["beforeAll", "before", "after", "afterAll"];
        if (!r.includes(e))
          throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${r.join("', '")}'`);
        let n = `${e}Help`;
        return (
          this.on(n, (s) => {
            let o;
            typeof i == "function"
              ? (o = i({ error: s.error, command: s.command }))
              : (o = i),
              o &&
                s.write(`${o}
`);
          }),
          this
        );
      }
    };
  function Il(t, e) {
    t._hasHelpOption &&
      e.find((r) => r === t._helpLongFlag || r === t._helpShortFlag) &&
      (t.outputHelp(), t._exit(0, "commander.helpDisplayed", "(outputHelp)"));
  }
  function Tl(t) {
    return t.map((e) => {
      if (!e.startsWith("--inspect")) return e;
      let i,
        r = "127.0.0.1",
        n = "9229",
        s;
      return (
        (s = e.match(/^(--inspect(-brk)?)$/)) !== null
          ? (i = s[1])
          : (s = e.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null
          ? ((i = s[1]), /^\d+$/.test(s[3]) ? (n = s[3]) : (r = s[3]))
          : (s = e.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !==
              null && ((i = s[1]), (r = s[3]), (n = s[4])),
        i && n !== "0" ? `${i}=${r}:${parseInt(n) + 1}` : e
      );
    });
  }
  function bn(t) {
    let e = [];
    for (let i = t; i; i = i.parent) e.push(i);
    return e;
  }
  Al.Command = wn;
});
var Fl = y((it, Pl) => {
  var { Argument: xd } = Ji(),
    { Command: Bl } = Rl(),
    { CommanderError: _d, InvalidArgumentError: Ll } = wi(),
    { Help: yd } = dn(),
    { Option: bd } = vn();
  it = Pl.exports = new Bl();
  it.program = it;
  it.Argument = xd;
  it.Command = Bl;
  it.CommanderError = _d;
  it.Help = yd;
  it.InvalidArgumentError = Ll;
  it.InvalidOptionArgumentError = Ll;
  it.Option = bd;
});
var Ul = y((Nl, Ml) => {
  Nl = Ml.exports = Zt;
  function Zt(t, e) {
    if (((this.stream = e.stream || process.stderr), typeof e == "number")) {
      var i = e;
      (e = {}), (e.total = i);
    } else {
      if (((e = e || {}), typeof t != "string"))
        throw new Error("format required");
      if (typeof e.total != "number") throw new Error("total required");
    }
    (this.fmt = t),
      (this.curr = e.curr || 0),
      (this.total = e.total),
      (this.width = e.width || this.total),
      (this.clear = e.clear),
      (this.chars = {
        complete: e.complete || "=",
        incomplete: e.incomplete || "-",
        head: e.head || e.complete || "=",
      }),
      (this.renderThrottle =
        e.renderThrottle !== 0 ? e.renderThrottle || 16 : 0),
      (this.lastRender = -1 / 0),
      (this.callback = e.callback || function () {}),
      (this.tokens = {}),
      (this.lastDraw = "");
  }
  Zt.prototype.tick = function (t, e) {
    if (
      (t !== 0 && (t = t || 1),
      typeof t == "object" && ((e = t), (t = 1)),
      e && (this.tokens = e),
      this.curr == 0 && (this.start = new Date()),
      (this.curr += t),
      this.render(),
      this.curr >= this.total)
    ) {
      this.render(void 0, !0),
        (this.complete = !0),
        this.terminate(),
        this.callback(this);
      return;
    }
  };
  Zt.prototype.render = function (t, e) {
    if (
      ((e = e !== void 0 ? e : !1), t && (this.tokens = t), !!this.stream.isTTY)
    ) {
      var i = Date.now(),
        r = i - this.lastRender;
      if (!(!e && r < this.renderThrottle)) {
        this.lastRender = i;
        var n = this.curr / this.total;
        n = Math.min(Math.max(n, 0), 1);
        var s = Math.floor(n * 100),
          o,
          l,
          a,
          c = new Date() - this.start,
          u = s == 100 ? 0 : c * (this.total / this.curr - 1),
          f = this.curr / (c / 1e3),
          h = this.fmt
            .replace(":current", this.curr)
            .replace(":total", this.total)
            .replace(":elapsed", isNaN(c) ? "0.0" : (c / 1e3).toFixed(1))
            .replace(
              ":eta",
              isNaN(u) || !isFinite(u) ? "0.0" : (u / 1e3).toFixed(1)
            )
            .replace(":percent", s.toFixed(0) + "%")
            .replace(":rate", Math.round(f)),
          p = Math.max(0, this.stream.columns - h.replace(":bar", "").length);
        p && process.platform === "win32" && (p = p - 1);
        var d = Math.min(this.width, p);
        if (
          ((a = Math.round(d * n)),
          (l = Array(Math.max(0, a + 1)).join(this.chars.complete)),
          (o = Array(Math.max(0, d - a + 1)).join(this.chars.incomplete)),
          a > 0 && (l = l.slice(0, -1) + this.chars.head),
          (h = h.replace(":bar", l + o)),
          this.tokens)
        )
          for (var m in this.tokens) h = h.replace(":" + m, this.tokens[m]);
        this.lastDraw !== h &&
          (this.stream.cursorTo(0),
          this.stream.write(h),
          this.stream.clearLine(1),
          (this.lastDraw = h));
      }
    }
  };
  Zt.prototype.update = function (t, e) {
    var i = Math.floor(t * this.total),
      r = i - this.curr;
    this.tick(r, e);
  };
  Zt.prototype.interrupt = function (t) {
    this.stream.clearLine(),
      this.stream.cursorTo(0),
      this.stream.write(t),
      this.stream.write(`
`),
      this.stream.write(this.lastDraw);
  };
  Zt.prototype.terminate = function () {
    this.clear
      ? this.stream.clearLine &&
        (this.stream.clearLine(), this.stream.cursorTo(0))
      : this.stream.write(`
`);
  };
});
var jl = y((ov, Dl) => {
  Dl.exports = Ul();
});
var Hl = y((ql) => {
  var D = ql,
    { Buffer: Qi } = require("buffer"),
    wd = require("os");
  D.toBuffer = function (t, e, i) {
    i = ~~i;
    let r;
    if (this.isV4Format(t))
      (r = e || Qi.alloc(i + 4)),
        t.split(/\./g).map((n) => {
          r[i++] = parseInt(n, 10) & 255;
        });
    else if (this.isV6Format(t)) {
      let n = t.split(":", 8),
        s;
      for (s = 0; s < n.length; s++) {
        let o = this.isV4Format(n[s]),
          l;
        o &&
          ((l = this.toBuffer(n[s])), (n[s] = l.slice(0, 2).toString("hex"))),
          l && ++s < 8 && n.splice(s, 0, l.slice(2, 4).toString("hex"));
      }
      if (n[0] === "") for (; n.length < 8; ) n.unshift("0");
      else if (n[n.length - 1] === "") for (; n.length < 8; ) n.push("0");
      else if (n.length < 8) {
        for (s = 0; s < n.length && n[s] !== ""; s++);
        let o = [s, 1];
        for (s = 9 - n.length; s > 0; s--) o.push("0");
        n.splice(...o);
      }
      for (r = e || Qi.alloc(i + 16), s = 0; s < n.length; s++) {
        let o = parseInt(n[s], 16);
        (r[i++] = (o >> 8) & 255), (r[i++] = o & 255);
      }
    }
    if (!r) throw Error(`Invalid ip address: ${t}`);
    return r;
  };
  D.toString = function (t, e, i) {
    (e = ~~e), (i = i || t.length - e);
    let r = [];
    if (i === 4) {
      for (let n = 0; n < i; n++) r.push(t[e + n]);
      r = r.join(".");
    } else if (i === 16) {
      for (let n = 0; n < i; n += 2) r.push(t.readUInt16BE(e + n).toString(16));
      (r = r.join(":")),
        (r = r.replace(/(^|:)0(:0)*:0(:|$)/, "$1::$3")),
        (r = r.replace(/:{3,4}/, "::"));
    }
    return r;
  };
  var Ed = /^(\d{1,3}\.){3,3}\d{1,3}$/,
    Sd =
      /^(::)?(((\d{1,3}\.){3}(\d{1,3}){1})?([0-9a-f]){0,4}:{0,2}){1,8}(::)?$/i;
  D.isV4Format = function (t) {
    return Ed.test(t);
  };
  D.isV6Format = function (t) {
    return Sd.test(t);
  };
  function Ei(t) {
    return t === 4 ? "ipv4" : t === 6 ? "ipv6" : t ? t.toLowerCase() : "ipv4";
  }
  D.fromPrefixLen = function (t, e) {
    t > 32 ? (e = "ipv6") : (e = Ei(e));
    let i = 4;
    e === "ipv6" && (i = 16);
    let r = Qi.alloc(i);
    for (let n = 0, s = r.length; n < s; ++n) {
      let o = 8;
      t < 8 && (o = t), (t -= o), (r[n] = ~(255 >> o) & 255);
    }
    return D.toString(r);
  };
  D.mask = function (t, e) {
    (t = D.toBuffer(t)), (e = D.toBuffer(e));
    let i = Qi.alloc(Math.max(t.length, e.length)),
      r;
    if (t.length === e.length)
      for (r = 0; r < t.length; r++) i[r] = t[r] & e[r];
    else if (e.length === 4)
      for (r = 0; r < e.length; r++) i[r] = t[t.length - 4 + r] & e[r];
    else {
      for (r = 0; r < i.length - 6; r++) i[r] = 0;
      for (i[10] = 255, i[11] = 255, r = 0; r < t.length; r++)
        i[r + 12] = t[r] & e[r + 12];
      r += 12;
    }
    for (; r < i.length; r++) i[r] = 0;
    return D.toString(i);
  };
  D.cidr = function (t) {
    let e = t.split("/"),
      i = e[0];
    if (e.length !== 2) throw new Error(`invalid CIDR subnet: ${i}`);
    let r = D.fromPrefixLen(parseInt(e[1], 10));
    return D.mask(i, r);
  };
  D.subnet = function (t, e) {
    let i = D.toLong(D.mask(t, e)),
      r = D.toBuffer(e),
      n = 0;
    for (let o = 0; o < r.length; o++)
      if (r[o] === 255) n += 8;
      else {
        let l = r[o] & 255;
        for (; l; ) (l = (l << 1) & 255), n++;
      }
    let s = 2 ** (32 - n);
    return {
      networkAddress: D.fromLong(i),
      firstAddress: s <= 2 ? D.fromLong(i) : D.fromLong(i + 1),
      lastAddress: s <= 2 ? D.fromLong(i + s - 1) : D.fromLong(i + s - 2),
      broadcastAddress: D.fromLong(i + s - 1),
      subnetMask: e,
      subnetMaskLength: n,
      numHosts: s <= 2 ? s : s - 2,
      length: s,
      contains(o) {
        return i === D.toLong(D.mask(o, e));
      },
    };
  };
  D.cidrSubnet = function (t) {
    let e = t.split("/"),
      i = e[0];
    if (e.length !== 2) throw new Error(`invalid CIDR subnet: ${i}`);
    let r = D.fromPrefixLen(parseInt(e[1], 10));
    return D.subnet(i, r);
  };
  D.not = function (t) {
    let e = D.toBuffer(t);
    for (let i = 0; i < e.length; i++) e[i] = 255 ^ e[i];
    return D.toString(e);
  };
  D.or = function (t, e) {
    if (((t = D.toBuffer(t)), (e = D.toBuffer(e)), t.length === e.length)) {
      for (let s = 0; s < t.length; ++s) t[s] |= e[s];
      return D.toString(t);
    }
    let i = t,
      r = e;
    e.length > t.length && ((i = e), (r = t));
    let n = i.length - r.length;
    for (let s = n; s < i.length; ++s) i[s] |= r[s - n];
    return D.toString(i);
  };
  D.isEqual = function (t, e) {
    if (((t = D.toBuffer(t)), (e = D.toBuffer(e)), t.length === e.length)) {
      for (let r = 0; r < t.length; r++) if (t[r] !== e[r]) return !1;
      return !0;
    }
    if (e.length === 4) {
      let r = e;
      (e = t), (t = r);
    }
    for (let r = 0; r < 10; r++) if (e[r] !== 0) return !1;
    let i = e.readUInt16BE(10);
    if (i !== 0 && i !== 65535) return !1;
    for (let r = 0; r < 4; r++) if (t[r] !== e[r + 12]) return !1;
    return !0;
  };
  D.isPrivate = function (t) {
    if (D.isLoopback(t)) return !0;
    if (!D.isV6Format(t)) {
      let e = D.normalizeToLong(t);
      if (e < 0) throw new Error("invalid ipv4 address");
      t = D.fromLong(e);
    }
    return (
      /^(::f{4}:)?10\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(t) ||
      /^(::f{4}:)?192\.168\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(t) ||
      /^(::f{4}:)?172\.(1[6-9]|2\d|30|31)\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(
        t
      ) ||
      /^(::f{4}:)?169\.254\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(t) ||
      /^f[cd][0-9a-f]{2}:/i.test(t) ||
      /^fe80:/i.test(t) ||
      /^::1$/.test(t) ||
      /^::$/.test(t)
    );
  };
  D.isPublic = function (t) {
    return !D.isPrivate(t);
  };
  D.isLoopback = function (t) {
    return (
      !/\./.test(t) && !/:/.test(t) && (t = D.fromLong(Number(t))),
      /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/.test(t) ||
        /^0177\./.test(t) ||
        /^0x7f\./i.test(t) ||
        /^fe80::1$/i.test(t) ||
        /^::1$/.test(t) ||
        /^::$/.test(t)
    );
  };
  D.loopback = function (t) {
    if (((t = Ei(t)), t !== "ipv4" && t !== "ipv6"))
      throw new Error("family must be ipv4 or ipv6");
    return t === "ipv4" ? "127.0.0.1" : "fe80::1";
  };
  D.address = function (t, e) {
    let i = wd.networkInterfaces();
    if (((e = Ei(e)), t && t !== "private" && t !== "public")) {
      let n = i[t].filter((s) => Ei(s.family) === e);
      return n.length === 0 ? void 0 : n[0].address;
    }
    let r = Object.keys(i)
      .map((n) => {
        let s = i[n].filter(
          (o) => (
            (o.family = Ei(o.family)),
            o.family !== e || D.isLoopback(o.address)
              ? !1
              : t
              ? t === "public"
                ? D.isPrivate(o.address)
                : D.isPublic(o.address)
              : !0
          )
        );
        return s.length ? s[0].address : void 0;
      })
      .filter(Boolean);
    return r.length ? r[0] : D.loopback(e);
  };
  D.toLong = function (t) {
    let e = 0;
    return (
      t.split(".").forEach((i) => {
        (e <<= 8), (e += parseInt(i));
      }),
      e >>> 0
    );
  };
  D.fromLong = function (t) {
    return `${t >>> 24}.${(t >> 16) & 255}.${(t >> 8) & 255}.${t & 255}`;
  };
  D.normalizeToLong = function (t) {
    let e = t
      .split(".")
      .map((n) =>
        n.startsWith("0x") || n.startsWith("0X")
          ? parseInt(n, 16)
          : n.startsWith("0") && n !== "0" && /^[0-7]+$/.test(n)
          ? parseInt(n, 8)
          : /^[1-9]\d*$/.test(n) || n === "0"
          ? parseInt(n, 10)
          : NaN
      );
    if (e.some(isNaN)) return -1;
    let i = 0;
    switch (e.length) {
      case 1:
        i = e[0];
        break;
      case 2:
        if (e[0] > 255 || e[1] > 16777215) return -1;
        i = (e[0] << 24) | (e[1] & 16777215);
        break;
      case 3:
        if (e[0] > 255 || e[1] > 255 || e[2] > 65535) return -1;
        i = (e[0] << 24) | (e[1] << 16) | (e[2] & 65535);
        break;
      case 4:
        if (e.some((n) => n > 255)) return -1;
        i = (e[0] << 24) | (e[1] << 16) | (e[2] << 8) | e[3];
        break;
      default:
        return -1;
    }
    return i >>> 0;
  };
});
var zl = y((at) => {
  "use strict";
  Object.defineProperty(at, "__esModule", { value: !0 });
  var Vl = require("buffer"),
    Ct = {
      INVALID_ENCODING:
        "Invalid encoding provided. Please specify a valid encoding the internal Node.js Buffer supports.",
      INVALID_SMARTBUFFER_SIZE:
        "Invalid size provided. Size must be a valid integer greater than zero.",
      INVALID_SMARTBUFFER_BUFFER:
        "Invalid Buffer provided in SmartBufferOptions.",
      INVALID_SMARTBUFFER_OBJECT:
        "Invalid SmartBufferOptions object supplied to SmartBuffer constructor or factory methods.",
      INVALID_OFFSET: "An invalid offset value was provided.",
      INVALID_OFFSET_NON_NUMBER:
        "An invalid offset value was provided. A numeric value is required.",
      INVALID_LENGTH: "An invalid length value was provided.",
      INVALID_LENGTH_NON_NUMBER:
        "An invalid length value was provived. A numeric value is required.",
      INVALID_TARGET_OFFSET:
        "Target offset is beyond the bounds of the internal SmartBuffer data.",
      INVALID_TARGET_LENGTH:
        "Specified length value moves cursor beyong the bounds of the internal SmartBuffer data.",
      INVALID_READ_BEYOND_BOUNDS:
        "Attempted to read beyond the bounds of the managed data.",
      INVALID_WRITE_BEYOND_BOUNDS:
        "Attempted to write beyond the bounds of the managed data.",
    };
  at.ERRORS = Ct;
  function kd(t) {
    if (!Vl.Buffer.isEncoding(t)) throw new Error(Ct.INVALID_ENCODING);
  }
  at.checkEncoding = kd;
  function $l(t) {
    return typeof t == "number" && isFinite(t) && Td(t);
  }
  at.isFiniteInteger = $l;
  function Gl(t, e) {
    if (typeof t == "number") {
      if (!$l(t) || t < 0)
        throw new Error(e ? Ct.INVALID_OFFSET : Ct.INVALID_LENGTH);
    } else
      throw new Error(
        e ? Ct.INVALID_OFFSET_NON_NUMBER : Ct.INVALID_LENGTH_NON_NUMBER
      );
  }
  function Cd(t) {
    Gl(t, !1);
  }
  at.checkLengthValue = Cd;
  function Od(t) {
    Gl(t, !0);
  }
  at.checkOffsetValue = Od;
  function Id(t, e) {
    if (t < 0 || t > e.length) throw new Error(Ct.INVALID_TARGET_OFFSET);
  }
  at.checkTargetOffset = Id;
  function Td(t) {
    return typeof t == "number" && isFinite(t) && Math.floor(t) === t;
  }
  function Ad(t) {
    if (typeof BigInt == "undefined")
      throw new Error("Platform does not support JS BigInt type.");
    if (typeof Vl.Buffer.prototype[t] == "undefined")
      throw new Error(`Platform does not support Buffer.prototype.${t}.`);
  }
  at.bigIntAndBufferInt64Check = Ad;
});
var Yl = y((Sn) => {
  "use strict";
  Object.defineProperty(Sn, "__esModule", { value: !0 });
  var te = zl(),
    Wl = 4096,
    Rd = "utf8",
    En = class t {
      constructor(e) {
        if (
          ((this.length = 0),
          (this._encoding = Rd),
          (this._writeOffset = 0),
          (this._readOffset = 0),
          t.isSmartBufferOptions(e))
        )
          if (
            (e.encoding &&
              (te.checkEncoding(e.encoding), (this._encoding = e.encoding)),
            e.size)
          )
            if (te.isFiniteInteger(e.size) && e.size > 0)
              this._buff = Buffer.allocUnsafe(e.size);
            else throw new Error(te.ERRORS.INVALID_SMARTBUFFER_SIZE);
          else if (e.buff)
            if (Buffer.isBuffer(e.buff))
              (this._buff = e.buff), (this.length = e.buff.length);
            else throw new Error(te.ERRORS.INVALID_SMARTBUFFER_BUFFER);
          else this._buff = Buffer.allocUnsafe(Wl);
        else {
          if (typeof e != "undefined")
            throw new Error(te.ERRORS.INVALID_SMARTBUFFER_OBJECT);
          this._buff = Buffer.allocUnsafe(Wl);
        }
      }
      static fromSize(e, i) {
        return new this({ size: e, encoding: i });
      }
      static fromBuffer(e, i) {
        return new this({ buff: e, encoding: i });
      }
      static fromOptions(e) {
        return new this(e);
      }
      static isSmartBufferOptions(e) {
        let i = e;
        return (
          i && (i.encoding !== void 0 || i.size !== void 0 || i.buff !== void 0)
        );
      }
      readInt8(e) {
        return this._readNumberValue(Buffer.prototype.readInt8, 1, e);
      }
      readInt16BE(e) {
        return this._readNumberValue(Buffer.prototype.readInt16BE, 2, e);
      }
      readInt16LE(e) {
        return this._readNumberValue(Buffer.prototype.readInt16LE, 2, e);
      }
      readInt32BE(e) {
        return this._readNumberValue(Buffer.prototype.readInt32BE, 4, e);
      }
      readInt32LE(e) {
        return this._readNumberValue(Buffer.prototype.readInt32LE, 4, e);
      }
      readBigInt64BE(e) {
        return (
          te.bigIntAndBufferInt64Check("readBigInt64BE"),
          this._readNumberValue(Buffer.prototype.readBigInt64BE, 8, e)
        );
      }
      readBigInt64LE(e) {
        return (
          te.bigIntAndBufferInt64Check("readBigInt64LE"),
          this._readNumberValue(Buffer.prototype.readBigInt64LE, 8, e)
        );
      }
      writeInt8(e, i) {
        return (
          this._writeNumberValue(Buffer.prototype.writeInt8, 1, e, i), this
        );
      }
      insertInt8(e, i) {
        return this._insertNumberValue(Buffer.prototype.writeInt8, 1, e, i);
      }
      writeInt16BE(e, i) {
        return this._writeNumberValue(Buffer.prototype.writeInt16BE, 2, e, i);
      }
      insertInt16BE(e, i) {
        return this._insertNumberValue(Buffer.prototype.writeInt16BE, 2, e, i);
      }
      writeInt16LE(e, i) {
        return this._writeNumberValue(Buffer.prototype.writeInt16LE, 2, e, i);
      }
      insertInt16LE(e, i) {
        return this._insertNumberValue(Buffer.prototype.writeInt16LE, 2, e, i);
      }
      writeInt32BE(e, i) {
        return this._writeNumberValue(Buffer.prototype.writeInt32BE, 4, e, i);
      }
      insertInt32BE(e, i) {
        return this._insertNumberValue(Buffer.prototype.writeInt32BE, 4, e, i);
      }
      writeInt32LE(e, i) {
        return this._writeNumberValue(Buffer.prototype.writeInt32LE, 4, e, i);
      }
      insertInt32LE(e, i) {
        return this._insertNumberValue(Buffer.prototype.writeInt32LE, 4, e, i);
      }
      writeBigInt64BE(e, i) {
        return (
          te.bigIntAndBufferInt64Check("writeBigInt64BE"),
          this._writeNumberValue(Buffer.prototype.writeBigInt64BE, 8, e, i)
        );
      }
      insertBigInt64BE(e, i) {
        return (
          te.bigIntAndBufferInt64Check("writeBigInt64BE"),
          this._insertNumberValue(Buffer.prototype.writeBigInt64BE, 8, e, i)
        );
      }
      writeBigInt64LE(e, i) {
        return (
          te.bigIntAndBufferInt64Check("writeBigInt64LE"),
          this._writeNumberValue(Buffer.prototype.writeBigInt64LE, 8, e, i)
        );
      }
      insertBigInt64LE(e, i) {
        return (
          te.bigIntAndBufferInt64Check("writeBigInt64LE"),
          this._insertNumberValue(Buffer.prototype.writeBigInt64LE, 8, e, i)
        );
      }
      readUInt8(e) {
        return this._readNumberValue(Buffer.prototype.readUInt8, 1, e);
      }
      readUInt16BE(e) {
        return this._readNumberValue(Buffer.prototype.readUInt16BE, 2, e);
      }
      readUInt16LE(e) {
        return this._readNumberValue(Buffer.prototype.readUInt16LE, 2, e);
      }
      readUInt32BE(e) {
        return this._readNumberValue(Buffer.prototype.readUInt32BE, 4, e);
      }
      readUInt32LE(e) {
        return this._readNumberValue(Buffer.prototype.readUInt32LE, 4, e);
      }
      readBigUInt64BE(e) {
        return (
          te.bigIntAndBufferInt64Check("readBigUInt64BE"),
          this._readNumberValue(Buffer.prototype.readBigUInt64BE, 8, e)
        );
      }
      readBigUInt64LE(e) {
        return (
          te.bigIntAndBufferInt64Check("readBigUInt64LE"),
          this._readNumberValue(Buffer.prototype.readBigUInt64LE, 8, e)
        );
      }
      writeUInt8(e, i) {
        return this._writeNumberValue(Buffer.prototype.writeUInt8, 1, e, i);
      }
      insertUInt8(e, i) {
        return this._insertNumberValue(Buffer.prototype.writeUInt8, 1, e, i);
      }
      writeUInt16BE(e, i) {
        return this._writeNumberValue(Buffer.prototype.writeUInt16BE, 2, e, i);
      }
      insertUInt16BE(e, i) {
        return this._insertNumberValue(Buffer.prototype.writeUInt16BE, 2, e, i);
      }
      writeUInt16LE(e, i) {
        return this._writeNumberValue(Buffer.prototype.writeUInt16LE, 2, e, i);
      }
      insertUInt16LE(e, i) {
        return this._insertNumberValue(Buffer.prototype.writeUInt16LE, 2, e, i);
      }
      writeUInt32BE(e, i) {
        return this._writeNumberValue(Buffer.prototype.writeUInt32BE, 4, e, i);
      }
      insertUInt32BE(e, i) {
        return this._insertNumberValue(Buffer.prototype.writeUInt32BE, 4, e, i);
      }
      writeUInt32LE(e, i) {
        return this._writeNumberValue(Buffer.prototype.writeUInt32LE, 4, e, i);
      }
      insertUInt32LE(e, i) {
        return this._insertNumberValue(Buffer.prototype.writeUInt32LE, 4, e, i);
      }
      writeBigUInt64BE(e, i) {
        return (
          te.bigIntAndBufferInt64Check("writeBigUInt64BE"),
          this._writeNumberValue(Buffer.prototype.writeBigUInt64BE, 8, e, i)
        );
      }
      insertBigUInt64BE(e, i) {
        return (
          te.bigIntAndBufferInt64Check("writeBigUInt64BE"),
          this._insertNumberValue(Buffer.prototype.writeBigUInt64BE, 8, e, i)
        );
      }
      writeBigUInt64LE(e, i) {
        return (
          te.bigIntAndBufferInt64Check("writeBigUInt64LE"),
          this._writeNumberValue(Buffer.prototype.writeBigUInt64LE, 8, e, i)
        );
      }
      insertBigUInt64LE(e, i) {
        return (
          te.bigIntAndBufferInt64Check("writeBigUInt64LE"),
          this._insertNumberValue(Buffer.prototype.writeBigUInt64LE, 8, e, i)
        );
      }
      readFloatBE(e) {
        return this._readNumberValue(Buffer.prototype.readFloatBE, 4, e);
      }
      readFloatLE(e) {
        return this._readNumberValue(Buffer.prototype.readFloatLE, 4, e);
      }
      writeFloatBE(e, i) {
        return this._writeNumberValue(Buffer.prototype.writeFloatBE, 4, e, i);
      }
      insertFloatBE(e, i) {
        return this._insertNumberValue(Buffer.prototype.writeFloatBE, 4, e, i);
      }
      writeFloatLE(e, i) {
        return this._writeNumberValue(Buffer.prototype.writeFloatLE, 4, e, i);
      }
      insertFloatLE(e, i) {
        return this._insertNumberValue(Buffer.prototype.writeFloatLE, 4, e, i);
      }
      readDoubleBE(e) {
        return this._readNumberValue(Buffer.prototype.readDoubleBE, 8, e);
      }
      readDoubleLE(e) {
        return this._readNumberValue(Buffer.prototype.readDoubleLE, 8, e);
      }
      writeDoubleBE(e, i) {
        return this._writeNumberValue(Buffer.prototype.writeDoubleBE, 8, e, i);
      }
      insertDoubleBE(e, i) {
        return this._insertNumberValue(Buffer.prototype.writeDoubleBE, 8, e, i);
      }
      writeDoubleLE(e, i) {
        return this._writeNumberValue(Buffer.prototype.writeDoubleLE, 8, e, i);
      }
      insertDoubleLE(e, i) {
        return this._insertNumberValue(Buffer.prototype.writeDoubleLE, 8, e, i);
      }
      readString(e, i) {
        let r;
        typeof e == "number"
          ? (te.checkLengthValue(e),
            (r = Math.min(e, this.length - this._readOffset)))
          : ((i = e), (r = this.length - this._readOffset)),
          typeof i != "undefined" && te.checkEncoding(i);
        let n = this._buff
          .slice(this._readOffset, this._readOffset + r)
          .toString(i || this._encoding);
        return (this._readOffset += r), n;
      }
      insertString(e, i, r) {
        return te.checkOffsetValue(i), this._handleString(e, !0, i, r);
      }
      writeString(e, i, r) {
        return this._handleString(e, !1, i, r);
      }
      readStringNT(e) {
        typeof e != "undefined" && te.checkEncoding(e);
        let i = this.length;
        for (let n = this._readOffset; n < this.length; n++)
          if (this._buff[n] === 0) {
            i = n;
            break;
          }
        let r = this._buff.slice(this._readOffset, i);
        return (this._readOffset = i + 1), r.toString(e || this._encoding);
      }
      insertStringNT(e, i, r) {
        return (
          te.checkOffsetValue(i),
          this.insertString(e, i, r),
          this.insertUInt8(0, i + e.length),
          this
        );
      }
      writeStringNT(e, i, r) {
        return (
          this.writeString(e, i, r),
          this.writeUInt8(
            0,
            typeof i == "number" ? i + e.length : this.writeOffset
          ),
          this
        );
      }
      readBuffer(e) {
        typeof e != "undefined" && te.checkLengthValue(e);
        let i = typeof e == "number" ? e : this.length,
          r = Math.min(this.length, this._readOffset + i),
          n = this._buff.slice(this._readOffset, r);
        return (this._readOffset = r), n;
      }
      insertBuffer(e, i) {
        return te.checkOffsetValue(i), this._handleBuffer(e, !0, i);
      }
      writeBuffer(e, i) {
        return this._handleBuffer(e, !1, i);
      }
      readBufferNT() {
        let e = this.length;
        for (let r = this._readOffset; r < this.length; r++)
          if (this._buff[r] === 0) {
            e = r;
            break;
          }
        let i = this._buff.slice(this._readOffset, e);
        return (this._readOffset = e + 1), i;
      }
      insertBufferNT(e, i) {
        return (
          te.checkOffsetValue(i),
          this.insertBuffer(e, i),
          this.insertUInt8(0, i + e.length),
          this
        );
      }
      writeBufferNT(e, i) {
        return (
          typeof i != "undefined" && te.checkOffsetValue(i),
          this.writeBuffer(e, i),
          this.writeUInt8(
            0,
            typeof i == "number" ? i + e.length : this._writeOffset
          ),
          this
        );
      }
      clear() {
        return (
          (this._writeOffset = 0),
          (this._readOffset = 0),
          (this.length = 0),
          this
        );
      }
      remaining() {
        return this.length - this._readOffset;
      }
      get readOffset() {
        return this._readOffset;
      }
      set readOffset(e) {
        te.checkOffsetValue(e),
          te.checkTargetOffset(e, this),
          (this._readOffset = e);
      }
      get writeOffset() {
        return this._writeOffset;
      }
      set writeOffset(e) {
        te.checkOffsetValue(e),
          te.checkTargetOffset(e, this),
          (this._writeOffset = e);
      }
      get encoding() {
        return this._encoding;
      }
      set encoding(e) {
        te.checkEncoding(e), (this._encoding = e);
      }
      get internalBuffer() {
        return this._buff;
      }
      toBuffer() {
        return this._buff.slice(0, this.length);
      }
      toString(e) {
        let i = typeof e == "string" ? e : this._encoding;
        return te.checkEncoding(i), this._buff.toString(i, 0, this.length);
      }
      destroy() {
        return this.clear(), this;
      }
      _handleString(e, i, r, n) {
        let s = this._writeOffset,
          o = this._encoding;
        typeof r == "number"
          ? (s = r)
          : typeof r == "string" && (te.checkEncoding(r), (o = r)),
          typeof n == "string" && (te.checkEncoding(n), (o = n));
        let l = Buffer.byteLength(e, o);
        return (
          i ? this.ensureInsertable(l, s) : this._ensureWriteable(l, s),
          this._buff.write(e, s, l, o),
          i
            ? (this._writeOffset += l)
            : typeof r == "number"
            ? (this._writeOffset = Math.max(this._writeOffset, s + l))
            : (this._writeOffset += l),
          this
        );
      }
      _handleBuffer(e, i, r) {
        let n = typeof r == "number" ? r : this._writeOffset;
        return (
          i
            ? this.ensureInsertable(e.length, n)
            : this._ensureWriteable(e.length, n),
          e.copy(this._buff, n),
          i
            ? (this._writeOffset += e.length)
            : typeof r == "number"
            ? (this._writeOffset = Math.max(this._writeOffset, n + e.length))
            : (this._writeOffset += e.length),
          this
        );
      }
      ensureReadable(e, i) {
        let r = this._readOffset;
        if (
          (typeof i != "undefined" && (te.checkOffsetValue(i), (r = i)),
          r < 0 || r + e > this.length)
        )
          throw new Error(te.ERRORS.INVALID_READ_BEYOND_BOUNDS);
      }
      ensureInsertable(e, i) {
        te.checkOffsetValue(i),
          this._ensureCapacity(this.length + e),
          i < this.length &&
            this._buff.copy(this._buff, i + e, i, this._buff.length),
          i + e > this.length ? (this.length = i + e) : (this.length += e);
      }
      _ensureWriteable(e, i) {
        let r = typeof i == "number" ? i : this._writeOffset;
        this._ensureCapacity(r + e),
          r + e > this.length && (this.length = r + e);
      }
      _ensureCapacity(e) {
        let i = this._buff.length;
        if (e > i) {
          let r = this._buff,
            n = (i * 3) / 2 + 1;
          n < e && (n = e),
            (this._buff = Buffer.allocUnsafe(n)),
            r.copy(this._buff, 0, 0, i);
        }
      }
      _readNumberValue(e, i, r) {
        this.ensureReadable(i, r);
        let n = e.call(this._buff, typeof r == "number" ? r : this._readOffset);
        return typeof r == "undefined" && (this._readOffset += i), n;
      }
      _insertNumberValue(e, i, r, n) {
        return (
          te.checkOffsetValue(n),
          this.ensureInsertable(i, n),
          e.call(this._buff, r, n),
          (this._writeOffset += i),
          this
        );
      }
      _writeNumberValue(e, i, r, n) {
        if (typeof n == "number") {
          if (n < 0) throw new Error(te.ERRORS.INVALID_WRITE_BEYOND_BOUNDS);
          te.checkOffsetValue(n);
        }
        let s = typeof n == "number" ? n : this._writeOffset;
        return (
          this._ensureWriteable(i, s),
          e.call(this._buff, r, s),
          typeof n == "number"
            ? (this._writeOffset = Math.max(this._writeOffset, s + i))
            : (this._writeOffset += i),
          this
        );
      }
    };
  Sn.SmartBuffer = En;
});
var Rn = y((_e) => {
  "use strict";
  Object.defineProperty(_e, "__esModule", { value: !0 });
  _e.SOCKS5_NO_ACCEPTABLE_AUTH =
    _e.SOCKS5_CUSTOM_AUTH_END =
    _e.SOCKS5_CUSTOM_AUTH_START =
    _e.SOCKS_INCOMING_PACKET_SIZES =
    _e.SocksClientState =
    _e.Socks5Response =
    _e.Socks5HostType =
    _e.Socks5Auth =
    _e.Socks4Response =
    _e.SocksCommand =
    _e.ERRORS =
    _e.DEFAULT_TIMEOUT =
      void 0;
  var Bd = 3e4;
  _e.DEFAULT_TIMEOUT = Bd;
  var Ld = {
    InvalidSocksCommand:
      "An invalid SOCKS command was provided. Valid options are connect, bind, and associate.",
    InvalidSocksCommandForOperation:
      "An invalid SOCKS command was provided. Only a subset of commands are supported for this operation.",
    InvalidSocksCommandChain:
      "An invalid SOCKS command was provided. Chaining currently only supports the connect command.",
    InvalidSocksClientOptionsDestination:
      "An invalid destination host was provided.",
    InvalidSocksClientOptionsExistingSocket:
      "An invalid existing socket was provided. This should be an instance of stream.Duplex.",
    InvalidSocksClientOptionsProxy:
      "Invalid SOCKS proxy details were provided.",
    InvalidSocksClientOptionsTimeout:
      "An invalid timeout value was provided. Please enter a value above 0 (in ms).",
    InvalidSocksClientOptionsProxiesLength:
      "At least two socks proxies must be provided for chaining.",
    InvalidSocksClientOptionsCustomAuthRange:
      "Custom auth must be a value between 0x80 and 0xFE.",
    InvalidSocksClientOptionsCustomAuthOptions:
      "When a custom_auth_method is provided, custom_auth_request_handler, custom_auth_response_size, and custom_auth_response_handler must also be provided and valid.",
    NegotiationError: "Negotiation error",
    SocketClosed: "Socket closed",
    ProxyConnectionTimedOut: "Proxy connection timed out",
    InternalError: "SocksClient internal error (this should not happen)",
    InvalidSocks4HandshakeResponse:
      "Received invalid Socks4 handshake response",
    Socks4ProxyRejectedConnection: "Socks4 Proxy rejected connection",
    InvalidSocks4IncomingConnectionResponse:
      "Socks4 invalid incoming connection response",
    Socks4ProxyRejectedIncomingBoundConnection:
      "Socks4 Proxy rejected incoming bound connection",
    InvalidSocks5InitialHandshakeResponse:
      "Received invalid Socks5 initial handshake response",
    InvalidSocks5IntiailHandshakeSocksVersion:
      "Received invalid Socks5 initial handshake (invalid socks version)",
    InvalidSocks5InitialHandshakeNoAcceptedAuthType:
      "Received invalid Socks5 initial handshake (no accepted authentication type)",
    InvalidSocks5InitialHandshakeUnknownAuthType:
      "Received invalid Socks5 initial handshake (unknown authentication type)",
    Socks5AuthenticationFailed: "Socks5 Authentication failed",
    InvalidSocks5FinalHandshake:
      "Received invalid Socks5 final handshake response",
    InvalidSocks5FinalHandshakeRejected: "Socks5 proxy rejected connection",
    InvalidSocks5IncomingConnectionResponse:
      "Received invalid Socks5 incoming connection response",
    Socks5ProxyRejectedIncomingBoundConnection:
      "Socks5 Proxy rejected incoming bound connection",
  };
  _e.ERRORS = Ld;
  var Pd = {
    Socks5InitialHandshakeResponse: 2,
    Socks5UserPassAuthenticationResponse: 2,
    Socks5ResponseHeader: 5,
    Socks5ResponseIPv4: 10,
    Socks5ResponseIPv6: 22,
    Socks5ResponseHostname: (t) => t + 7,
    Socks4Response: 8,
  };
  _e.SOCKS_INCOMING_PACKET_SIZES = Pd;
  var kn;
  (function (t) {
    (t[(t.connect = 1)] = "connect"),
      (t[(t.bind = 2)] = "bind"),
      (t[(t.associate = 3)] = "associate");
  })(kn || (kn = {}));
  _e.SocksCommand = kn;
  var Cn;
  (function (t) {
    (t[(t.Granted = 90)] = "Granted"),
      (t[(t.Failed = 91)] = "Failed"),
      (t[(t.Rejected = 92)] = "Rejected"),
      (t[(t.RejectedIdent = 93)] = "RejectedIdent");
  })(Cn || (Cn = {}));
  _e.Socks4Response = Cn;
  var On;
  (function (t) {
    (t[(t.NoAuth = 0)] = "NoAuth"),
      (t[(t.GSSApi = 1)] = "GSSApi"),
      (t[(t.UserPass = 2)] = "UserPass");
  })(On || (On = {}));
  _e.Socks5Auth = On;
  var Fd = 128;
  _e.SOCKS5_CUSTOM_AUTH_START = Fd;
  var Nd = 254;
  _e.SOCKS5_CUSTOM_AUTH_END = Nd;
  var Md = 255;
  _e.SOCKS5_NO_ACCEPTABLE_AUTH = Md;
  var In;
  (function (t) {
    (t[(t.Granted = 0)] = "Granted"),
      (t[(t.Failure = 1)] = "Failure"),
      (t[(t.NotAllowed = 2)] = "NotAllowed"),
      (t[(t.NetworkUnreachable = 3)] = "NetworkUnreachable"),
      (t[(t.HostUnreachable = 4)] = "HostUnreachable"),
      (t[(t.ConnectionRefused = 5)] = "ConnectionRefused"),
      (t[(t.TTLExpired = 6)] = "TTLExpired"),
      (t[(t.CommandNotSupported = 7)] = "CommandNotSupported"),
      (t[(t.AddressNotSupported = 8)] = "AddressNotSupported");
  })(In || (In = {}));
  _e.Socks5Response = In;
  var Tn;
  (function (t) {
    (t[(t.IPv4 = 1)] = "IPv4"),
      (t[(t.Hostname = 3)] = "Hostname"),
      (t[(t.IPv6 = 4)] = "IPv6");
  })(Tn || (Tn = {}));
  _e.Socks5HostType = Tn;
  var An;
  (function (t) {
    (t[(t.Created = 0)] = "Created"),
      (t[(t.Connecting = 1)] = "Connecting"),
      (t[(t.Connected = 2)] = "Connected"),
      (t[(t.SentInitialHandshake = 3)] = "SentInitialHandshake"),
      (t[(t.ReceivedInitialHandshakeResponse = 4)] =
        "ReceivedInitialHandshakeResponse"),
      (t[(t.SentAuthentication = 5)] = "SentAuthentication"),
      (t[(t.ReceivedAuthenticationResponse = 6)] =
        "ReceivedAuthenticationResponse"),
      (t[(t.SentFinalHandshake = 7)] = "SentFinalHandshake"),
      (t[(t.ReceivedFinalResponse = 8)] = "ReceivedFinalResponse"),
      (t[(t.BoundWaitingForConnection = 9)] = "BoundWaitingForConnection"),
      (t[(t.Established = 10)] = "Established"),
      (t[(t.Disconnected = 11)] = "Disconnected"),
      (t[(t.Error = 99)] = "Error");
  })(An || (An = {}));
  _e.SocksClientState = An;
});
var Ln = y((Xt) => {
  "use strict";
  Object.defineProperty(Xt, "__esModule", { value: !0 });
  Xt.shuffleArray = Xt.SocksClientError = void 0;
  var Bn = class extends Error {
    constructor(e, i) {
      super(e), (this.options = i);
    }
  };
  Xt.SocksClientError = Bn;
  function Ud(t) {
    for (let e = t.length - 1; e > 0; e--) {
      let i = Math.floor(Math.random() * (e + 1));
      [t[e], t[i]] = [t[i], t[e]];
    }
  }
  Xt.shuffleArray = Ud;
});
var Ql = y((Jt) => {
  "use strict";
  Object.defineProperty(Jt, "__esModule", { value: !0 });
  Jt.validateSocksClientChainOptions = Jt.validateSocksClientOptions = void 0;
  var He = Ln(),
    Re = Rn(),
    Dd = require("stream");
  function jd(t, e = ["connect", "bind", "associate"]) {
    if (!Re.SocksCommand[t.command])
      throw new He.SocksClientError(Re.ERRORS.InvalidSocksCommand, t);
    if (e.indexOf(t.command) === -1)
      throw new He.SocksClientError(
        Re.ERRORS.InvalidSocksCommandForOperation,
        t
      );
    if (!Zl(t.destination))
      throw new He.SocksClientError(
        Re.ERRORS.InvalidSocksClientOptionsDestination,
        t
      );
    if (!Xl(t.proxy))
      throw new He.SocksClientError(
        Re.ERRORS.InvalidSocksClientOptionsProxy,
        t
      );
    if ((Kl(t.proxy, t), t.timeout && !Jl(t.timeout)))
      throw new He.SocksClientError(
        Re.ERRORS.InvalidSocksClientOptionsTimeout,
        t
      );
    if (t.existing_socket && !(t.existing_socket instanceof Dd.Duplex))
      throw new He.SocksClientError(
        Re.ERRORS.InvalidSocksClientOptionsExistingSocket,
        t
      );
  }
  Jt.validateSocksClientOptions = jd;
  function qd(t) {
    if (t.command !== "connect")
      throw new He.SocksClientError(Re.ERRORS.InvalidSocksCommandChain, t);
    if (!Zl(t.destination))
      throw new He.SocksClientError(
        Re.ERRORS.InvalidSocksClientOptionsDestination,
        t
      );
    if (!(t.proxies && Array.isArray(t.proxies) && t.proxies.length >= 2))
      throw new He.SocksClientError(
        Re.ERRORS.InvalidSocksClientOptionsProxiesLength,
        t
      );
    if (
      (t.proxies.forEach((e) => {
        if (!Xl(e))
          throw new He.SocksClientError(
            Re.ERRORS.InvalidSocksClientOptionsProxy,
            t
          );
        Kl(e, t);
      }),
      t.timeout && !Jl(t.timeout))
    )
      throw new He.SocksClientError(
        Re.ERRORS.InvalidSocksClientOptionsTimeout,
        t
      );
  }
  Jt.validateSocksClientChainOptions = qd;
  function Kl(t, e) {
    if (t.custom_auth_method !== void 0) {
      if (
        t.custom_auth_method < Re.SOCKS5_CUSTOM_AUTH_START ||
        t.custom_auth_method > Re.SOCKS5_CUSTOM_AUTH_END
      )
        throw new He.SocksClientError(
          Re.ERRORS.InvalidSocksClientOptionsCustomAuthRange,
          e
        );
      if (
        t.custom_auth_request_handler === void 0 ||
        typeof t.custom_auth_request_handler != "function"
      )
        throw new He.SocksClientError(
          Re.ERRORS.InvalidSocksClientOptionsCustomAuthOptions,
          e
        );
      if (t.custom_auth_response_size === void 0)
        throw new He.SocksClientError(
          Re.ERRORS.InvalidSocksClientOptionsCustomAuthOptions,
          e
        );
      if (
        t.custom_auth_response_handler === void 0 ||
        typeof t.custom_auth_response_handler != "function"
      )
        throw new He.SocksClientError(
          Re.ERRORS.InvalidSocksClientOptionsCustomAuthOptions,
          e
        );
    }
  }
  function Zl(t) {
    return (
      t &&
      typeof t.host == "string" &&
      typeof t.port == "number" &&
      t.port >= 0 &&
      t.port <= 65535
    );
  }
  function Xl(t) {
    return (
      t &&
      (typeof t.host == "string" || typeof t.ipaddress == "string") &&
      typeof t.port == "number" &&
      t.port >= 0 &&
      t.port <= 65535 &&
      (t.type === 4 || t.type === 5)
    );
  }
  function Jl(t) {
    return typeof t == "number" && t > 0;
  }
});
var ec = y((er) => {
  "use strict";
  Object.defineProperty(er, "__esModule", { value: !0 });
  er.ReceiveBuffer = void 0;
  var Pn = class {
    constructor(e = 4096) {
      (this.buffer = Buffer.allocUnsafe(e)),
        (this.offset = 0),
        (this.originalSize = e);
    }
    get length() {
      return this.offset;
    }
    append(e) {
      if (!Buffer.isBuffer(e))
        throw new Error(
          "Attempted to append a non-buffer instance to ReceiveBuffer."
        );
      if (this.offset + e.length >= this.buffer.length) {
        let i = this.buffer;
        (this.buffer = Buffer.allocUnsafe(
          Math.max(
            this.buffer.length + this.originalSize,
            this.buffer.length + e.length
          )
        )),
          i.copy(this.buffer);
      }
      return e.copy(this.buffer, this.offset), (this.offset += e.length);
    }
    peek(e) {
      if (e > this.offset)
        throw new Error(
          "Attempted to read beyond the bounds of the managed internal data."
        );
      return this.buffer.slice(0, e);
    }
    get(e) {
      if (e > this.offset)
        throw new Error(
          "Attempted to read beyond the bounds of the managed internal data."
        );
      let i = Buffer.allocUnsafe(e);
      return (
        this.buffer.slice(0, e).copy(i),
        this.buffer.copyWithin(0, e, e + this.offset - e),
        (this.offset -= e),
        i
      );
    }
  };
  er.ReceiveBuffer = Pn;
});
var tc = y((dt) => {
  "use strict";
  var Qt =
    (dt && dt.__awaiter) ||
    function (t, e, i, r) {
      function n(s) {
        return s instanceof i
          ? s
          : new i(function (o) {
              o(s);
            });
      }
      return new (i || (i = Promise))(function (s, o) {
        function l(u) {
          try {
            c(r.next(u));
          } catch (f) {
            o(f);
          }
        }
        function a(u) {
          try {
            c(r.throw(u));
          } catch (f) {
            o(f);
          }
        }
        function c(u) {
          u.done ? s(u.value) : n(u.value).then(l, a);
        }
        c((r = r.apply(t, e || [])).next());
      });
    };
  Object.defineProperty(dt, "__esModule", { value: !0 });
  dt.SocksClientError = dt.SocksClient = void 0;
  var Hd = require("events"),
    ei = require("net"),
    ze = Hl(),
    Ve = Yl(),
    S = Rn(),
    Fn = Ql(),
    Vd = ec(),
    Nn = Ln();
  Object.defineProperty(dt, "SocksClientError", {
    enumerable: !0,
    get: function () {
      return Nn.SocksClientError;
    },
  });
  var Mn = class t extends Hd.EventEmitter {
    constructor(e) {
      super(),
        (this.options = Object.assign({}, e)),
        (0, Fn.validateSocksClientOptions)(e),
        this.setState(S.SocksClientState.Created);
    }
    static createConnection(e, i) {
      return new Promise((r, n) => {
        try {
          (0, Fn.validateSocksClientOptions)(e, ["connect"]);
        } catch (o) {
          return typeof i == "function" ? (i(o), r(o)) : n(o);
        }
        let s = new t(e);
        s.connect(e.existing_socket),
          s.once("established", (o) => {
            s.removeAllListeners(), typeof i == "function" && i(null, o), r(o);
          }),
          s.once("error", (o) => {
            s.removeAllListeners(),
              typeof i == "function" ? (i(o), r(o)) : n(o);
          });
      });
    }
    static createConnectionChain(e, i) {
      return new Promise((r, n) =>
        Qt(this, void 0, void 0, function* () {
          try {
            (0, Fn.validateSocksClientChainOptions)(e);
          } catch (o) {
            return typeof i == "function" ? (i(o), r(o)) : n(o);
          }
          let s;
          e.randomizeChain && (0, Nn.shuffleArray)(e.proxies);
          try {
            for (let o = 0; o < e.proxies.length; o++) {
              let l = e.proxies[o],
                a =
                  o === e.proxies.length - 1
                    ? e.destination
                    : {
                        host:
                          e.proxies[o + 1].host || e.proxies[o + 1].ipaddress,
                        port: e.proxies[o + 1].port,
                      },
                c = yield t.createConnection({
                  command: "connect",
                  proxy: l,
                  destination: a,
                });
              s || (s = c.socket);
            }
            typeof i == "function"
              ? (i(null, { socket: s }), r({ socket: s }))
              : r({ socket: s });
          } catch (o) {
            typeof i == "function" ? (i(o), r(o)) : n(o);
          }
        })
      );
    }
    static createUDPFrame(e) {
      let i = new Ve.SmartBuffer();
      return (
        i.writeUInt16BE(0),
        i.writeUInt8(e.frameNumber || 0),
        ei.isIPv4(e.remoteHost.host)
          ? (i.writeUInt8(S.Socks5HostType.IPv4),
            i.writeUInt32BE(ze.toLong(e.remoteHost.host)))
          : ei.isIPv6(e.remoteHost.host)
          ? (i.writeUInt8(S.Socks5HostType.IPv6),
            i.writeBuffer(ze.toBuffer(e.remoteHost.host)))
          : (i.writeUInt8(S.Socks5HostType.Hostname),
            i.writeUInt8(Buffer.byteLength(e.remoteHost.host)),
            i.writeString(e.remoteHost.host)),
        i.writeUInt16BE(e.remoteHost.port),
        i.writeBuffer(e.data),
        i.toBuffer()
      );
    }
    static parseUDPFrame(e) {
      let i = Ve.SmartBuffer.fromBuffer(e);
      i.readOffset = 2;
      let r = i.readUInt8(),
        n = i.readUInt8(),
        s;
      n === S.Socks5HostType.IPv4
        ? (s = ze.fromLong(i.readUInt32BE()))
        : n === S.Socks5HostType.IPv6
        ? (s = ze.toString(i.readBuffer(16)))
        : (s = i.readString(i.readUInt8()));
      let o = i.readUInt16BE();
      return {
        frameNumber: r,
        remoteHost: { host: s, port: o },
        data: i.readBuffer(),
      };
    }
    setState(e) {
      this.state !== S.SocksClientState.Error && (this.state = e);
    }
    connect(e) {
      (this.onDataReceived = (r) => this.onDataReceivedHandler(r)),
        (this.onClose = () => this.onCloseHandler()),
        (this.onError = (r) => this.onErrorHandler(r)),
        (this.onConnect = () => this.onConnectHandler());
      let i = setTimeout(
        () => this.onEstablishedTimeout(),
        this.options.timeout || S.DEFAULT_TIMEOUT
      );
      i.unref && typeof i.unref == "function" && i.unref(),
        e ? (this.socket = e) : (this.socket = new ei.Socket()),
        this.socket.once("close", this.onClose),
        this.socket.once("error", this.onError),
        this.socket.once("connect", this.onConnect),
        this.socket.on("data", this.onDataReceived),
        this.setState(S.SocksClientState.Connecting),
        (this.receiveBuffer = new Vd.ReceiveBuffer()),
        e
          ? this.socket.emit("connect")
          : (this.socket.connect(this.getSocketOptions()),
            this.options.set_tcp_nodelay !== void 0 &&
              this.options.set_tcp_nodelay !== null &&
              this.socket.setNoDelay(!!this.options.set_tcp_nodelay)),
        this.prependOnceListener("established", (r) => {
          setImmediate(() => {
            if (this.receiveBuffer.length > 0) {
              let n = this.receiveBuffer.get(this.receiveBuffer.length);
              r.socket.emit("data", n);
            }
            r.socket.resume();
          });
        });
    }
    getSocketOptions() {
      return Object.assign(Object.assign({}, this.options.socket_options), {
        host: this.options.proxy.host || this.options.proxy.ipaddress,
        port: this.options.proxy.port,
      });
    }
    onEstablishedTimeout() {
      this.state !== S.SocksClientState.Established &&
        this.state !== S.SocksClientState.BoundWaitingForConnection &&
        this.closeSocket(S.ERRORS.ProxyConnectionTimedOut);
    }
    onConnectHandler() {
      this.setState(S.SocksClientState.Connected),
        this.options.proxy.type === 4
          ? this.sendSocks4InitialHandshake()
          : this.sendSocks5InitialHandshake(),
        this.setState(S.SocksClientState.SentInitialHandshake);
    }
    onDataReceivedHandler(e) {
      this.receiveBuffer.append(e), this.processData();
    }
    processData() {
      for (
        ;
        this.state !== S.SocksClientState.Established &&
        this.state !== S.SocksClientState.Error &&
        this.receiveBuffer.length >= this.nextRequiredPacketBufferSize;

      )
        if (this.state === S.SocksClientState.SentInitialHandshake)
          this.options.proxy.type === 4
            ? this.handleSocks4FinalHandshakeResponse()
            : this.handleInitialSocks5HandshakeResponse();
        else if (this.state === S.SocksClientState.SentAuthentication)
          this.handleInitialSocks5AuthenticationHandshakeResponse();
        else if (this.state === S.SocksClientState.SentFinalHandshake)
          this.handleSocks5FinalHandshakeResponse();
        else if (this.state === S.SocksClientState.BoundWaitingForConnection)
          this.options.proxy.type === 4
            ? this.handleSocks4IncomingConnectionResponse()
            : this.handleSocks5IncomingConnectionResponse();
        else {
          this.closeSocket(S.ERRORS.InternalError);
          break;
        }
    }
    onCloseHandler() {
      this.closeSocket(S.ERRORS.SocketClosed);
    }
    onErrorHandler(e) {
      this.closeSocket(e.message);
    }
    removeInternalSocketHandlers() {
      this.socket.pause(),
        this.socket.removeListener("data", this.onDataReceived),
        this.socket.removeListener("close", this.onClose),
        this.socket.removeListener("error", this.onError),
        this.socket.removeListener("connect", this.onConnect);
    }
    closeSocket(e) {
      this.state !== S.SocksClientState.Error &&
        (this.setState(S.SocksClientState.Error),
        this.socket.destroy(),
        this.removeInternalSocketHandlers(),
        this.emit("error", new Nn.SocksClientError(e, this.options)));
    }
    sendSocks4InitialHandshake() {
      let e = this.options.proxy.userId || "",
        i = new Ve.SmartBuffer();
      i.writeUInt8(4),
        i.writeUInt8(S.SocksCommand[this.options.command]),
        i.writeUInt16BE(this.options.destination.port),
        ei.isIPv4(this.options.destination.host)
          ? (i.writeBuffer(ze.toBuffer(this.options.destination.host)),
            i.writeStringNT(e))
          : (i.writeUInt8(0),
            i.writeUInt8(0),
            i.writeUInt8(0),
            i.writeUInt8(1),
            i.writeStringNT(e),
            i.writeStringNT(this.options.destination.host)),
        (this.nextRequiredPacketBufferSize =
          S.SOCKS_INCOMING_PACKET_SIZES.Socks4Response),
        this.socket.write(i.toBuffer());
    }
    handleSocks4FinalHandshakeResponse() {
      let e = this.receiveBuffer.get(8);
      if (e[1] !== S.Socks4Response.Granted)
        this.closeSocket(
          `${S.ERRORS.Socks4ProxyRejectedConnection} - (${
            S.Socks4Response[e[1]]
          })`
        );
      else if (S.SocksCommand[this.options.command] === S.SocksCommand.bind) {
        let i = Ve.SmartBuffer.fromBuffer(e);
        i.readOffset = 2;
        let r = { port: i.readUInt16BE(), host: ze.fromLong(i.readUInt32BE()) };
        r.host === "0.0.0.0" && (r.host = this.options.proxy.ipaddress),
          this.setState(S.SocksClientState.BoundWaitingForConnection),
          this.emit("bound", { remoteHost: r, socket: this.socket });
      } else
        this.setState(S.SocksClientState.Established),
          this.removeInternalSocketHandlers(),
          this.emit("established", { socket: this.socket });
    }
    handleSocks4IncomingConnectionResponse() {
      let e = this.receiveBuffer.get(8);
      if (e[1] !== S.Socks4Response.Granted)
        this.closeSocket(
          `${S.ERRORS.Socks4ProxyRejectedIncomingBoundConnection} - (${
            S.Socks4Response[e[1]]
          })`
        );
      else {
        let i = Ve.SmartBuffer.fromBuffer(e);
        i.readOffset = 2;
        let r = { port: i.readUInt16BE(), host: ze.fromLong(i.readUInt32BE()) };
        this.setState(S.SocksClientState.Established),
          this.removeInternalSocketHandlers(),
          this.emit("established", { remoteHost: r, socket: this.socket });
      }
    }
    sendSocks5InitialHandshake() {
      let e = new Ve.SmartBuffer(),
        i = [S.Socks5Auth.NoAuth];
      (this.options.proxy.userId || this.options.proxy.password) &&
        i.push(S.Socks5Auth.UserPass),
        this.options.proxy.custom_auth_method !== void 0 &&
          i.push(this.options.proxy.custom_auth_method),
        e.writeUInt8(5),
        e.writeUInt8(i.length);
      for (let r of i) e.writeUInt8(r);
      (this.nextRequiredPacketBufferSize =
        S.SOCKS_INCOMING_PACKET_SIZES.Socks5InitialHandshakeResponse),
        this.socket.write(e.toBuffer()),
        this.setState(S.SocksClientState.SentInitialHandshake);
    }
    handleInitialSocks5HandshakeResponse() {
      let e = this.receiveBuffer.get(2);
      e[0] !== 5
        ? this.closeSocket(S.ERRORS.InvalidSocks5IntiailHandshakeSocksVersion)
        : e[1] === S.SOCKS5_NO_ACCEPTABLE_AUTH
        ? this.closeSocket(
            S.ERRORS.InvalidSocks5InitialHandshakeNoAcceptedAuthType
          )
        : e[1] === S.Socks5Auth.NoAuth
        ? ((this.socks5ChosenAuthType = S.Socks5Auth.NoAuth),
          this.sendSocks5CommandRequest())
        : e[1] === S.Socks5Auth.UserPass
        ? ((this.socks5ChosenAuthType = S.Socks5Auth.UserPass),
          this.sendSocks5UserPassAuthentication())
        : e[1] === this.options.proxy.custom_auth_method
        ? ((this.socks5ChosenAuthType = this.options.proxy.custom_auth_method),
          this.sendSocks5CustomAuthentication())
        : this.closeSocket(
            S.ERRORS.InvalidSocks5InitialHandshakeUnknownAuthType
          );
    }
    sendSocks5UserPassAuthentication() {
      let e = this.options.proxy.userId || "",
        i = this.options.proxy.password || "",
        r = new Ve.SmartBuffer();
      r.writeUInt8(1),
        r.writeUInt8(Buffer.byteLength(e)),
        r.writeString(e),
        r.writeUInt8(Buffer.byteLength(i)),
        r.writeString(i),
        (this.nextRequiredPacketBufferSize =
          S.SOCKS_INCOMING_PACKET_SIZES.Socks5UserPassAuthenticationResponse),
        this.socket.write(r.toBuffer()),
        this.setState(S.SocksClientState.SentAuthentication);
    }
    sendSocks5CustomAuthentication() {
      return Qt(this, void 0, void 0, function* () {
        (this.nextRequiredPacketBufferSize =
          this.options.proxy.custom_auth_response_size),
          this.socket.write(
            yield this.options.proxy.custom_auth_request_handler()
          ),
          this.setState(S.SocksClientState.SentAuthentication);
      });
    }
    handleSocks5CustomAuthHandshakeResponse(e) {
      return Qt(this, void 0, void 0, function* () {
        return yield this.options.proxy.custom_auth_response_handler(e);
      });
    }
    handleSocks5AuthenticationNoAuthHandshakeResponse(e) {
      return Qt(this, void 0, void 0, function* () {
        return e[1] === 0;
      });
    }
    handleSocks5AuthenticationUserPassHandshakeResponse(e) {
      return Qt(this, void 0, void 0, function* () {
        return e[1] === 0;
      });
    }
    handleInitialSocks5AuthenticationHandshakeResponse() {
      return Qt(this, void 0, void 0, function* () {
        this.setState(S.SocksClientState.ReceivedAuthenticationResponse);
        let e = !1;
        this.socks5ChosenAuthType === S.Socks5Auth.NoAuth
          ? (e = yield this.handleSocks5AuthenticationNoAuthHandshakeResponse(
              this.receiveBuffer.get(2)
            ))
          : this.socks5ChosenAuthType === S.Socks5Auth.UserPass
          ? (e = yield this.handleSocks5AuthenticationUserPassHandshakeResponse(
              this.receiveBuffer.get(2)
            ))
          : this.socks5ChosenAuthType ===
              this.options.proxy.custom_auth_method &&
            (e = yield this.handleSocks5CustomAuthHandshakeResponse(
              this.receiveBuffer.get(
                this.options.proxy.custom_auth_response_size
              )
            )),
          e
            ? this.sendSocks5CommandRequest()
            : this.closeSocket(S.ERRORS.Socks5AuthenticationFailed);
      });
    }
    sendSocks5CommandRequest() {
      let e = new Ve.SmartBuffer();
      e.writeUInt8(5),
        e.writeUInt8(S.SocksCommand[this.options.command]),
        e.writeUInt8(0),
        ei.isIPv4(this.options.destination.host)
          ? (e.writeUInt8(S.Socks5HostType.IPv4),
            e.writeBuffer(ze.toBuffer(this.options.destination.host)))
          : ei.isIPv6(this.options.destination.host)
          ? (e.writeUInt8(S.Socks5HostType.IPv6),
            e.writeBuffer(ze.toBuffer(this.options.destination.host)))
          : (e.writeUInt8(S.Socks5HostType.Hostname),
            e.writeUInt8(this.options.destination.host.length),
            e.writeString(this.options.destination.host)),
        e.writeUInt16BE(this.options.destination.port),
        (this.nextRequiredPacketBufferSize =
          S.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHeader),
        this.socket.write(e.toBuffer()),
        this.setState(S.SocksClientState.SentFinalHandshake);
    }
    handleSocks5FinalHandshakeResponse() {
      let e = this.receiveBuffer.peek(5);
      if (e[0] !== 5 || e[1] !== S.Socks5Response.Granted)
        this.closeSocket(
          `${S.ERRORS.InvalidSocks5FinalHandshakeRejected} - ${
            S.Socks5Response[e[1]]
          }`
        );
      else {
        let i = e[3],
          r,
          n;
        if (i === S.Socks5HostType.IPv4) {
          let s = S.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv4;
          if (this.receiveBuffer.length < s) {
            this.nextRequiredPacketBufferSize = s;
            return;
          }
          (n = Ve.SmartBuffer.fromBuffer(this.receiveBuffer.get(s).slice(4))),
            (r = {
              host: ze.fromLong(n.readUInt32BE()),
              port: n.readUInt16BE(),
            }),
            r.host === "0.0.0.0" && (r.host = this.options.proxy.ipaddress);
        } else if (i === S.Socks5HostType.Hostname) {
          let s = e[4],
            o = S.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHostname(s);
          if (this.receiveBuffer.length < o) {
            this.nextRequiredPacketBufferSize = o;
            return;
          }
          (n = Ve.SmartBuffer.fromBuffer(this.receiveBuffer.get(o).slice(5))),
            (r = { host: n.readString(s), port: n.readUInt16BE() });
        } else if (i === S.Socks5HostType.IPv6) {
          let s = S.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv6;
          if (this.receiveBuffer.length < s) {
            this.nextRequiredPacketBufferSize = s;
            return;
          }
          (n = Ve.SmartBuffer.fromBuffer(this.receiveBuffer.get(s).slice(4))),
            (r = {
              host: ze.toString(n.readBuffer(16)),
              port: n.readUInt16BE(),
            });
        }
        this.setState(S.SocksClientState.ReceivedFinalResponse),
          S.SocksCommand[this.options.command] === S.SocksCommand.connect
            ? (this.setState(S.SocksClientState.Established),
              this.removeInternalSocketHandlers(),
              this.emit("established", { remoteHost: r, socket: this.socket }))
            : S.SocksCommand[this.options.command] === S.SocksCommand.bind
            ? (this.setState(S.SocksClientState.BoundWaitingForConnection),
              (this.nextRequiredPacketBufferSize =
                S.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHeader),
              this.emit("bound", { remoteHost: r, socket: this.socket }))
            : S.SocksCommand[this.options.command] ===
                S.SocksCommand.associate &&
              (this.setState(S.SocksClientState.Established),
              this.removeInternalSocketHandlers(),
              this.emit("established", { remoteHost: r, socket: this.socket }));
      }
    }
    handleSocks5IncomingConnectionResponse() {
      let e = this.receiveBuffer.peek(5);
      if (e[0] !== 5 || e[1] !== S.Socks5Response.Granted)
        this.closeSocket(
          `${S.ERRORS.Socks5ProxyRejectedIncomingBoundConnection} - ${
            S.Socks5Response[e[1]]
          }`
        );
      else {
        let i = e[3],
          r,
          n;
        if (i === S.Socks5HostType.IPv4) {
          let s = S.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv4;
          if (this.receiveBuffer.length < s) {
            this.nextRequiredPacketBufferSize = s;
            return;
          }
          (n = Ve.SmartBuffer.fromBuffer(this.receiveBuffer.get(s).slice(4))),
            (r = {
              host: ze.fromLong(n.readUInt32BE()),
              port: n.readUInt16BE(),
            }),
            r.host === "0.0.0.0" && (r.host = this.options.proxy.ipaddress);
        } else if (i === S.Socks5HostType.Hostname) {
          let s = e[4],
            o = S.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHostname(s);
          if (this.receiveBuffer.length < o) {
            this.nextRequiredPacketBufferSize = o;
            return;
          }
          (n = Ve.SmartBuffer.fromBuffer(this.receiveBuffer.get(o).slice(5))),
            (r = { host: n.readString(s), port: n.readUInt16BE() });
        } else if (i === S.Socks5HostType.IPv6) {
          let s = S.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv6;
          if (this.receiveBuffer.length < s) {
            this.nextRequiredPacketBufferSize = s;
            return;
          }
          (n = Ve.SmartBuffer.fromBuffer(this.receiveBuffer.get(s).slice(4))),
            (r = {
              host: ze.toString(n.readBuffer(16)),
              port: n.readUInt16BE(),
            });
        }
        this.setState(S.SocksClientState.Established),
          this.removeInternalSocketHandlers(),
          this.emit("established", { remoteHost: r, socket: this.socket });
      }
    }
    get socksClientOptions() {
      return Object.assign({}, this.options);
    }
  };
  dt.SocksClient = Mn;
});
var ic = y((Ot) => {
  "use strict";
  var $d =
      (Ot && Ot.__createBinding) ||
      (Object.create
        ? function (t, e, i, r) {
            r === void 0 && (r = i);
            var n = Object.getOwnPropertyDescriptor(e, i);
            (!n ||
              ("get" in n ? !e.__esModule : n.writable || n.configurable)) &&
              (n = {
                enumerable: !0,
                get: function () {
                  return e[i];
                },
              }),
              Object.defineProperty(t, r, n);
          }
        : function (t, e, i, r) {
            r === void 0 && (r = i), (t[r] = e[i]);
          }),
    Gd =
      (Ot && Ot.__exportStar) ||
      function (t, e) {
        for (var i in t)
          i !== "default" &&
            !Object.prototype.hasOwnProperty.call(e, i) &&
            $d(e, t, i);
      };
  Object.defineProperty(Ot, "__esModule", { value: !0 });
  Gd(tc(), Ot);
});
var rc = y((It) => {
  "use strict";
  var zd =
      (It && It.__awaiter) ||
      function (t, e, i, r) {
        function n(s) {
          return s instanceof i
            ? s
            : new i(function (o) {
                o(s);
              });
        }
        return new (i || (i = Promise))(function (s, o) {
          function l(u) {
            try {
              c(r.next(u));
            } catch (f) {
              o(f);
            }
          }
          function a(u) {
            try {
              c(r.throw(u));
            } catch (f) {
              o(f);
            }
          }
          function c(u) {
            u.done ? s(u.value) : n(u.value).then(l, a);
          }
          c((r = r.apply(t, e || [])).next());
        });
      },
    tr =
      (It && It.__importDefault) ||
      function (t) {
        return t && t.__esModule ? t : { default: t };
      };
  Object.defineProperty(It, "__esModule", { value: !0 });
  var Wd = tr(require("dns")),
    Yd = tr(require("tls")),
    Kd = tr(require("url")),
    Zd = tr(Ht()),
    Xd = Ir(),
    Jd = ic(),
    Un = Zd.default("socks-proxy-agent");
  function Qd(t) {
    return new Promise((e, i) => {
      Wd.default.lookup(t, (r, n) => {
        r ? i(r) : e(n);
      });
    });
  }
  function em(t) {
    let e = 0,
      i = !1,
      r = 5,
      n = t.hostname || t.host;
    if (!n) throw new TypeError('No "host"');
    if (
      (typeof t.port == "number"
        ? (e = t.port)
        : typeof t.port == "string" && (e = parseInt(t.port, 10)),
      e || (e = 1080),
      t.protocol)
    )
      switch (t.protocol.replace(":", "")) {
        case "socks4":
          i = !0;
        case "socks4a":
          r = 4;
          break;
        case "socks5":
          i = !0;
        case "socks":
        case "socks5h":
          r = 5;
          break;
        default:
          throw new TypeError(
            `A "socks" protocol must be specified! Got: ${t.protocol}`
          );
      }
    if (typeof t.type != "undefined")
      if (t.type === 4 || t.type === 5) r = t.type;
      else throw new TypeError(`"type" must be 4 or 5, got: ${t.type}`);
    let s = { host: n, port: e, type: r },
      o = t.userId || t.username,
      l = t.password;
    if (t.auth) {
      let a = t.auth.split(":");
      (o = a[0]), (l = a[1]);
    }
    return (
      o && Object.defineProperty(s, "userId", { value: o, enumerable: !1 }),
      l && Object.defineProperty(s, "password", { value: l, enumerable: !1 }),
      { lookup: i, proxy: s }
    );
  }
  var Dn = class extends Xd.Agent {
    constructor(e) {
      let i;
      if ((typeof e == "string" ? (i = Kd.default.parse(e)) : (i = e), !i))
        throw new TypeError(
          "a SOCKS proxy server `host` and `port` must be specified!"
        );
      super(i);
      let r = em(i);
      (this.lookup = r.lookup),
        (this.proxy = r.proxy),
        (this.tlsConnectionOptions = i.tls || {});
    }
    callback(e, i) {
      return zd(this, void 0, void 0, function* () {
        let { lookup: r, proxy: n } = this,
          { host: s, port: o, timeout: l } = i;
        if (!s) throw new Error("No `host` defined!");
        r && (s = yield Qd(s));
        let a = {
          proxy: n,
          destination: { host: s, port: o },
          command: "connect",
          timeout: l,
        };
        Un("Creating socks proxy connection: %o", a);
        let { socket: c } = yield Jd.SocksClient.createConnection(a);
        if (
          (Un("Successfully created socks proxy connection"), i.secureEndpoint)
        ) {
          Un("Upgrading socket connection to TLS");
          let u = i.servername || i.host;
          return Yd.default.connect(
            Object.assign(
              Object.assign(
                Object.assign({}, tm(i, "host", "hostname", "path", "port")),
                { socket: c, servername: u }
              ),
              this.tlsConnectionOptions
            )
          );
        }
        return c;
      });
    }
  };
  It.default = Dn;
  function tm(t, ...e) {
    let i = {},
      r;
    for (r in t) e.includes(r) || (i[r] = t[r]);
    return i;
  }
});
var sc = y((Hn, nc) => {
  "use strict";
  var im =
      (Hn && Hn.__importDefault) ||
      function (t) {
        return t && t.__esModule ? t : { default: t };
      },
    jn = im(rc());
  function qn(t) {
    return new jn.default(t);
  }
  (function (t) {
    (t.SocksProxyAgent = jn.default), (t.prototype = jn.default.prototype);
  })(qn || (qn = {}));
  nc.exports = qn;
});
var ac = y((vv, oc) => {
  "use strict";
  var rm = /[|\\{}()[\]^$+*?.-]/g;
  oc.exports = (t) => {
    if (typeof t != "string") throw new TypeError("Expected a string");
    return t.replace(rm, "\\$&");
  };
});
var fc = y((xv, uc) => {
  "use strict";
  var nm = ac(),
    sm =
      typeof process == "object" && process && typeof process.cwd == "function"
        ? process.cwd()
        : ".",
    cc = []
      .concat(require("module").builtinModules, "bootstrap_node", "node")
      .map(
        (t) =>
          new RegExp(
            `(?:\\((?:node:)?${t}(?:\\.js)?:\\d+:\\d+\\)$|^\\s*at (?:node:)?${t}(?:\\.js)?:\\d+:\\d+$)`
          )
      );
  cc.push(
    /\((?:node:)?internal\/[^:]+:\d+:\d+\)$/,
    /\s*at (?:node:)?internal\/[^:]+:\d+:\d+$/,
    /\/\.node-spawn-wrap-\w+-\w+\/node:\d+:\d+\)?$/
  );
  var Vn = class t {
    constructor(e) {
      (e = { ignoredPackages: [], ...e }),
        "internals" in e || (e.internals = t.nodeInternals()),
        "cwd" in e || (e.cwd = sm),
        (this._cwd = e.cwd.replace(/\\/g, "/")),
        (this._internals = [].concat(e.internals, om(e.ignoredPackages))),
        (this._wrapCallSite = e.wrapCallSite || !1);
    }
    static nodeInternals() {
      return [...cc];
    }
    clean(e, i = 0) {
      (i = " ".repeat(i)),
        Array.isArray(e) ||
          (e = e.split(`
`)),
        !/^\s*at /.test(e[0]) && /^\s*at /.test(e[1]) && (e = e.slice(1));
      let r = !1,
        n = null,
        s = [];
      return (
        e.forEach((o) => {
          if (
            ((o = o.replace(/\\/g, "/")),
            this._internals.some((a) => a.test(o)))
          )
            return;
          let l = /^\s*at /.test(o);
          r
            ? (o = o.trimEnd().replace(/^(\s+)at /, "$1"))
            : ((o = o.trim()), l && (o = o.slice(3))),
            (o = o.replace(`${this._cwd}/`, "")),
            o &&
              (l
                ? (n && (s.push(n), (n = null)), s.push(o))
                : ((r = !0), (n = o)));
        }),
        s
          .map(
            (o) => `${i}${o}
`
          )
          .join("")
      );
    }
    captureString(e, i = this.captureString) {
      typeof e == "function" && ((i = e), (e = 1 / 0));
      let { stackTraceLimit: r } = Error;
      e && (Error.stackTraceLimit = e);
      let n = {};
      Error.captureStackTrace(n, i);
      let { stack: s } = n;
      return (Error.stackTraceLimit = r), this.clean(s);
    }
    capture(e, i = this.capture) {
      typeof e == "function" && ((i = e), (e = 1 / 0));
      let { prepareStackTrace: r, stackTraceLimit: n } = Error;
      (Error.prepareStackTrace = (l, a) =>
        this._wrapCallSite ? a.map(this._wrapCallSite) : a),
        e && (Error.stackTraceLimit = e);
      let s = {};
      Error.captureStackTrace(s, i);
      let { stack: o } = s;
      return (
        Object.assign(Error, { prepareStackTrace: r, stackTraceLimit: n }), o
      );
    }
    at(e = this.at) {
      let [i] = this.capture(1, e);
      if (!i) return {};
      let r = { line: i.getLineNumber(), column: i.getColumnNumber() };
      lc(r, i.getFileName(), this._cwd),
        i.isConstructor() && (r.constructor = !0),
        i.isEval() && (r.evalOrigin = i.getEvalOrigin()),
        i.isNative() && (r.native = !0);
      let n;
      try {
        n = i.getTypeName();
      } catch {}
      n && n !== "Object" && n !== "[object Object]" && (r.type = n);
      let s = i.getFunctionName();
      s && (r.function = s);
      let o = i.getMethodName();
      return o && s !== o && (r.method = o), r;
    }
    parseLine(e) {
      let i = e && e.match(am);
      if (!i) return null;
      let r = i[1] === "new",
        n = i[2],
        s = i[3],
        o = i[4],
        l = Number(i[5]),
        a = Number(i[6]),
        c = i[7],
        u = i[8],
        f = i[9],
        h = i[10] === "native",
        p = i[11] === ")",
        d,
        m = {};
      if ((u && (m.line = Number(u)), f && (m.column = Number(f)), p && c)) {
        let v = 0;
        for (let E = c.length - 1; E > 0; E--)
          if (c.charAt(E) === ")") v++;
          else if (
            c.charAt(E) === "(" &&
            c.charAt(E - 1) === " " &&
            (v--, v === -1 && c.charAt(E - 1) === " ")
          ) {
            let I = c.slice(0, E - 1);
            (c = c.slice(E + 1)), (n += ` (${I}`);
            break;
          }
      }
      if (n) {
        let v = n.match(lm);
        v && ((n = v[1]), (d = v[2]));
      }
      return (
        lc(m, c, this._cwd),
        r && (m.constructor = !0),
        s &&
          ((m.evalOrigin = s),
          (m.evalLine = l),
          (m.evalColumn = a),
          (m.evalFile = o && o.replace(/\\/g, "/"))),
        h && (m.native = !0),
        n && (m.function = n),
        d && n !== d && (m.method = d),
        m
      );
    }
  };
  function lc(t, e, i) {
    e &&
      ((e = e.replace(/\\/g, "/")),
      e.startsWith(`${i}/`) && (e = e.slice(i.length + 1)),
      (t.file = e));
  }
  function om(t) {
    if (t.length === 0) return [];
    let e = t.map((i) => nm(i));
    return new RegExp(
      `[/\\\\]node_modules[/\\\\](?:${e.join("|")})[/\\\\][^:]+:\\d+:\\d+`
    );
  }
  var am = new RegExp(
      "^(?:\\s*at )?(?:(new) )?(?:(.*?) \\()?(?:eval at ([^ ]+) \\((.+?):(\\d+):(\\d+)\\), )?(?:(.+?):(\\d+):(\\d+)|(native))(\\)?)$"
    ),
    lm = /^(.*?) \[as (.*?)\]$/;
  uc.exports = Vn;
});
var mc = y((_v, dc) => {
  "use strict";
  var { Duplex: cm } = require("stream");
  function hc(t) {
    t.emit("close");
  }
  function um() {
    !this.destroyed && this._writableState.finished && this.destroy();
  }
  function pc(t) {
    this.removeListener("error", pc),
      this.destroy(),
      this.listenerCount("error") === 0 && this.emit("error", t);
  }
  function fm(t, e) {
    let i = !0,
      r = new cm({
        ...e,
        autoDestroy: !1,
        emitClose: !1,
        objectMode: !1,
        writableObjectMode: !1,
      });
    return (
      t.on("message", function (s, o) {
        let l = !o && r._readableState.objectMode ? s.toString() : s;
        r.push(l) || t.pause();
      }),
      t.once("error", function (s) {
        r.destroyed || ((i = !1), r.destroy(s));
      }),
      t.once("close", function () {
        r.destroyed || r.push(null);
      }),
      (r._destroy = function (n, s) {
        if (t.readyState === t.CLOSED) {
          s(n), process.nextTick(hc, r);
          return;
        }
        let o = !1;
        t.once("error", function (a) {
          (o = !0), s(a);
        }),
          t.once("close", function () {
            o || s(n), process.nextTick(hc, r);
          }),
          i && t.terminate();
      }),
      (r._final = function (n) {
        if (t.readyState === t.CONNECTING) {
          t.once("open", function () {
            r._final(n);
          });
          return;
        }
        t._socket !== null &&
          (t._socket._writableState.finished
            ? (n(), r._readableState.endEmitted && r.destroy())
            : (t._socket.once("finish", function () {
                n();
              }),
              t.close()));
      }),
      (r._read = function () {
        t.isPaused && t.resume();
      }),
      (r._write = function (n, s, o) {
        if (t.readyState === t.CONNECTING) {
          t.once("open", function () {
            r._write(n, s, o);
          });
          return;
        }
        t.send(n, o);
      }),
      r.on("end", um),
      r.on("error", pc),
      r
    );
  }
  dc.exports = fm;
});
var mt = y((yv, gc) => {
  "use strict";
  gc.exports = {
    BINARY_TYPES: ["nodebuffer", "arraybuffer", "fragments"],
    EMPTY_BUFFER: Buffer.alloc(0),
    GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
    kForOnEventAttribute: Symbol("kIsForOnEventAttribute"),
    kListener: Symbol("kListener"),
    kStatusCode: Symbol("status-code"),
    kWebSocket: Symbol("websocket"),
    NOOP: () => {},
  };
});
var Si = y((bv, $n) => {
  "use strict";
  var { EMPTY_BUFFER: hm } = mt();
  function vc(t, e) {
    if (t.length === 0) return hm;
    if (t.length === 1) return t[0];
    let i = Buffer.allocUnsafe(e),
      r = 0;
    for (let n = 0; n < t.length; n++) {
      let s = t[n];
      i.set(s, r), (r += s.length);
    }
    return r < e ? i.slice(0, r) : i;
  }
  function xc(t, e, i, r, n) {
    for (let s = 0; s < n; s++) i[r + s] = t[s] ^ e[s & 3];
  }
  function _c(t, e) {
    for (let i = 0; i < t.length; i++) t[i] ^= e[i & 3];
  }
  function yc(t) {
    return t.byteLength === t.buffer.byteLength
      ? t.buffer
      : t.buffer.slice(t.byteOffset, t.byteOffset + t.byteLength);
  }
  function ir(t) {
    if (((ir.readOnly = !0), Buffer.isBuffer(t))) return t;
    let e;
    return (
      t instanceof ArrayBuffer
        ? (e = Buffer.from(t))
        : ArrayBuffer.isView(t)
        ? (e = Buffer.from(t.buffer, t.byteOffset, t.byteLength))
        : ((e = Buffer.from(t)), (ir.readOnly = !1)),
      e
    );
  }
  try {
    let t = require("bufferutil");
    $n.exports = {
      concat: vc,
      mask(e, i, r, n, s) {
        s < 48 ? xc(e, i, r, n, s) : t.mask(e, i, r, n, s);
      },
      toArrayBuffer: yc,
      toBuffer: ir,
      unmask(e, i) {
        e.length < 32 ? _c(e, i) : t.unmask(e, i);
      },
    };
  } catch {
    $n.exports = {
      concat: vc,
      mask: xc,
      toArrayBuffer: yc,
      toBuffer: ir,
      unmask: _c,
    };
  }
});
var Ec = y((wv, wc) => {
  "use strict";
  var bc = Symbol("kDone"),
    Gn = Symbol("kRun"),
    zn = class {
      constructor(e) {
        (this[bc] = () => {
          this.pending--, this[Gn]();
        }),
          (this.concurrency = e || 1 / 0),
          (this.jobs = []),
          (this.pending = 0);
      }
      add(e) {
        this.jobs.push(e), this[Gn]();
      }
      [Gn]() {
        if (this.pending !== this.concurrency && this.jobs.length) {
          let e = this.jobs.shift();
          this.pending++, e(this[bc]);
        }
      }
    };
  wc.exports = zn;
});
var Oi = y((Ev, Oc) => {
  "use strict";
  var ki = require("zlib"),
    Sc = Si(),
    pm = Ec(),
    { kStatusCode: kc } = mt(),
    dm = Buffer.from([0, 0, 255, 255]),
    sr = Symbol("permessage-deflate"),
    lt = Symbol("total-length"),
    Ci = Symbol("callback"),
    gt = Symbol("buffers"),
    nr = Symbol("error"),
    rr,
    Wn = class {
      constructor(e, i, r) {
        if (
          ((this._maxPayload = r | 0),
          (this._options = e || {}),
          (this._threshold =
            this._options.threshold !== void 0
              ? this._options.threshold
              : 1024),
          (this._isServer = !!i),
          (this._deflate = null),
          (this._inflate = null),
          (this.params = null),
          !rr)
        ) {
          let n =
            this._options.concurrencyLimit !== void 0
              ? this._options.concurrencyLimit
              : 10;
          rr = new pm(n);
        }
      }
      static get extensionName() {
        return "permessage-deflate";
      }
      offer() {
        let e = {};
        return (
          this._options.serverNoContextTakeover &&
            (e.server_no_context_takeover = !0),
          this._options.clientNoContextTakeover &&
            (e.client_no_context_takeover = !0),
          this._options.serverMaxWindowBits &&
            (e.server_max_window_bits = this._options.serverMaxWindowBits),
          this._options.clientMaxWindowBits
            ? (e.client_max_window_bits = this._options.clientMaxWindowBits)
            : this._options.clientMaxWindowBits == null &&
              (e.client_max_window_bits = !0),
          e
        );
      }
      accept(e) {
        return (
          (e = this.normalizeParams(e)),
          (this.params = this._isServer
            ? this.acceptAsServer(e)
            : this.acceptAsClient(e)),
          this.params
        );
      }
      cleanup() {
        if (
          (this._inflate && (this._inflate.close(), (this._inflate = null)),
          this._deflate)
        ) {
          let e = this._deflate[Ci];
          this._deflate.close(),
            (this._deflate = null),
            e &&
              e(
                new Error(
                  "The deflate stream was closed while data was being processed"
                )
              );
        }
      }
      acceptAsServer(e) {
        let i = this._options,
          r = e.find(
            (n) =>
              !(
                (i.serverNoContextTakeover === !1 &&
                  n.server_no_context_takeover) ||
                (n.server_max_window_bits &&
                  (i.serverMaxWindowBits === !1 ||
                    (typeof i.serverMaxWindowBits == "number" &&
                      i.serverMaxWindowBits > n.server_max_window_bits))) ||
                (typeof i.clientMaxWindowBits == "number" &&
                  !n.client_max_window_bits)
              )
          );
        if (!r) throw new Error("None of the extension offers can be accepted");
        return (
          i.serverNoContextTakeover && (r.server_no_context_takeover = !0),
          i.clientNoContextTakeover && (r.client_no_context_takeover = !0),
          typeof i.serverMaxWindowBits == "number" &&
            (r.server_max_window_bits = i.serverMaxWindowBits),
          typeof i.clientMaxWindowBits == "number"
            ? (r.client_max_window_bits = i.clientMaxWindowBits)
            : (r.client_max_window_bits === !0 ||
                i.clientMaxWindowBits === !1) &&
              delete r.client_max_window_bits,
          r
        );
      }
      acceptAsClient(e) {
        let i = e[0];
        if (
          this._options.clientNoContextTakeover === !1 &&
          i.client_no_context_takeover
        )
          throw new Error('Unexpected parameter "client_no_context_takeover"');
        if (!i.client_max_window_bits)
          typeof this._options.clientMaxWindowBits == "number" &&
            (i.client_max_window_bits = this._options.clientMaxWindowBits);
        else if (
          this._options.clientMaxWindowBits === !1 ||
          (typeof this._options.clientMaxWindowBits == "number" &&
            i.client_max_window_bits > this._options.clientMaxWindowBits)
        )
          throw new Error(
            'Unexpected or invalid parameter "client_max_window_bits"'
          );
        return i;
      }
      normalizeParams(e) {
        return (
          e.forEach((i) => {
            Object.keys(i).forEach((r) => {
              let n = i[r];
              if (n.length > 1)
                throw new Error(
                  `Parameter "${r}" must have only a single value`
                );
              if (((n = n[0]), r === "client_max_window_bits")) {
                if (n !== !0) {
                  let s = +n;
                  if (!Number.isInteger(s) || s < 8 || s > 15)
                    throw new TypeError(
                      `Invalid value for parameter "${r}": ${n}`
                    );
                  n = s;
                } else if (!this._isServer)
                  throw new TypeError(
                    `Invalid value for parameter "${r}": ${n}`
                  );
              } else if (r === "server_max_window_bits") {
                let s = +n;
                if (!Number.isInteger(s) || s < 8 || s > 15)
                  throw new TypeError(
                    `Invalid value for parameter "${r}": ${n}`
                  );
                n = s;
              } else if (
                r === "client_no_context_takeover" ||
                r === "server_no_context_takeover"
              ) {
                if (n !== !0)
                  throw new TypeError(
                    `Invalid value for parameter "${r}": ${n}`
                  );
              } else throw new Error(`Unknown parameter "${r}"`);
              i[r] = n;
            });
          }),
          e
        );
      }
      decompress(e, i, r) {
        rr.add((n) => {
          this._decompress(e, i, (s, o) => {
            n(), r(s, o);
          });
        });
      }
      compress(e, i, r) {
        rr.add((n) => {
          this._compress(e, i, (s, o) => {
            n(), r(s, o);
          });
        });
      }
      _decompress(e, i, r) {
        let n = this._isServer ? "client" : "server";
        if (!this._inflate) {
          let s = `${n}_max_window_bits`,
            o =
              typeof this.params[s] != "number"
                ? ki.Z_DEFAULT_WINDOWBITS
                : this.params[s];
          (this._inflate = ki.createInflateRaw({
            ...this._options.zlibInflateOptions,
            windowBits: o,
          })),
            (this._inflate[sr] = this),
            (this._inflate[lt] = 0),
            (this._inflate[gt] = []),
            this._inflate.on("error", gm),
            this._inflate.on("data", Cc);
        }
        (this._inflate[Ci] = r),
          this._inflate.write(e),
          i && this._inflate.write(dm),
          this._inflate.flush(() => {
            let s = this._inflate[nr];
            if (s) {
              this._inflate.close(), (this._inflate = null), r(s);
              return;
            }
            let o = Sc.concat(this._inflate[gt], this._inflate[lt]);
            this._inflate._readableState.endEmitted
              ? (this._inflate.close(), (this._inflate = null))
              : ((this._inflate[lt] = 0),
                (this._inflate[gt] = []),
                i &&
                  this.params[`${n}_no_context_takeover`] &&
                  this._inflate.reset()),
              r(null, o);
          });
      }
      _compress(e, i, r) {
        let n = this._isServer ? "server" : "client";
        if (!this._deflate) {
          let s = `${n}_max_window_bits`,
            o =
              typeof this.params[s] != "number"
                ? ki.Z_DEFAULT_WINDOWBITS
                : this.params[s];
          (this._deflate = ki.createDeflateRaw({
            ...this._options.zlibDeflateOptions,
            windowBits: o,
          })),
            (this._deflate[lt] = 0),
            (this._deflate[gt] = []),
            this._deflate.on("data", mm);
        }
        (this._deflate[Ci] = r),
          this._deflate.write(e),
          this._deflate.flush(ki.Z_SYNC_FLUSH, () => {
            if (!this._deflate) return;
            let s = Sc.concat(this._deflate[gt], this._deflate[lt]);
            i && (s = s.slice(0, s.length - 4)),
              (this._deflate[Ci] = null),
              (this._deflate[lt] = 0),
              (this._deflate[gt] = []),
              i &&
                this.params[`${n}_no_context_takeover`] &&
                this._deflate.reset(),
              r(null, s);
          });
      }
    };
  Oc.exports = Wn;
  function mm(t) {
    this[gt].push(t), (this[lt] += t.length);
  }
  function Cc(t) {
    if (
      ((this[lt] += t.length),
      this[sr]._maxPayload < 1 || this[lt] <= this[sr]._maxPayload)
    ) {
      this[gt].push(t);
      return;
    }
    (this[nr] = new RangeError("Max payload size exceeded")),
      (this[nr].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"),
      (this[nr][kc] = 1009),
      this.removeListener("data", Cc),
      this.reset();
  }
  function gm(t) {
    (this[sr]._inflate = null), (t[kc] = 1007), this[Ci](t);
  }
});
var Ii = y((Sv, Yn) => {
  "use strict";
  var Ic = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    0, 1, 0,
  ];
  function Tc(t) {
    return (
      (t >= 1e3 && t <= 1014 && t !== 1004 && t !== 1005 && t !== 1006) ||
      (t >= 3e3 && t <= 4999)
    );
  }
  function Ac(t) {
    let e = t.length,
      i = 0;
    for (; i < e; )
      if (!(t[i] & 128)) i++;
      else if ((t[i] & 224) === 192) {
        if (i + 1 === e || (t[i + 1] & 192) !== 128 || (t[i] & 254) === 192)
          return !1;
        i += 2;
      } else if ((t[i] & 240) === 224) {
        if (
          i + 2 >= e ||
          (t[i + 1] & 192) !== 128 ||
          (t[i + 2] & 192) !== 128 ||
          (t[i] === 224 && (t[i + 1] & 224) === 128) ||
          (t[i] === 237 && (t[i + 1] & 224) === 160)
        )
          return !1;
        i += 3;
      } else if ((t[i] & 248) === 240) {
        if (
          i + 3 >= e ||
          (t[i + 1] & 192) !== 128 ||
          (t[i + 2] & 192) !== 128 ||
          (t[i + 3] & 192) !== 128 ||
          (t[i] === 240 && (t[i + 1] & 240) === 128) ||
          (t[i] === 244 && t[i + 1] > 143) ||
          t[i] > 244
        )
          return !1;
        i += 4;
      } else return !1;
    return !0;
  }
  try {
    let t = require("utf-8-validate");
    Yn.exports = {
      isValidStatusCode: Tc,
      isValidUTF8(e) {
        return e.length < 150 ? Ac(e) : t(e);
      },
      tokenChars: Ic,
    };
  } catch {
    Yn.exports = { isValidStatusCode: Tc, isValidUTF8: Ac, tokenChars: Ic };
  }
});
var Jn = y((kv, Mc) => {
  "use strict";
  var { Writable: vm } = require("stream"),
    Rc = Oi(),
    {
      BINARY_TYPES: xm,
      EMPTY_BUFFER: Bc,
      kStatusCode: _m,
      kWebSocket: ym,
    } = mt(),
    { concat: Kn, toArrayBuffer: bm, unmask: wm } = Si(),
    { isValidStatusCode: Em, isValidUTF8: Lc } = Ii(),
    Ti = 0,
    Pc = 1,
    Fc = 2,
    Nc = 3,
    Zn = 4,
    Sm = 5,
    Xn = class extends vm {
      constructor(e = {}) {
        super(),
          (this._binaryType = e.binaryType || xm[0]),
          (this._extensions = e.extensions || {}),
          (this._isServer = !!e.isServer),
          (this._maxPayload = e.maxPayload | 0),
          (this._skipUTF8Validation = !!e.skipUTF8Validation),
          (this[ym] = void 0),
          (this._bufferedBytes = 0),
          (this._buffers = []),
          (this._compressed = !1),
          (this._payloadLength = 0),
          (this._mask = void 0),
          (this._fragmented = 0),
          (this._masked = !1),
          (this._fin = !1),
          (this._opcode = 0),
          (this._totalPayloadLength = 0),
          (this._messageLength = 0),
          (this._fragments = []),
          (this._state = Ti),
          (this._loop = !1);
      }
      _write(e, i, r) {
        if (this._opcode === 8 && this._state == Ti) return r();
        (this._bufferedBytes += e.length),
          this._buffers.push(e),
          this.startLoop(r);
      }
      consume(e) {
        if (((this._bufferedBytes -= e), e === this._buffers[0].length))
          return this._buffers.shift();
        if (e < this._buffers[0].length) {
          let r = this._buffers[0];
          return (this._buffers[0] = r.slice(e)), r.slice(0, e);
        }
        let i = Buffer.allocUnsafe(e);
        do {
          let r = this._buffers[0],
            n = i.length - e;
          e >= r.length
            ? i.set(this._buffers.shift(), n)
            : (i.set(new Uint8Array(r.buffer, r.byteOffset, e), n),
              (this._buffers[0] = r.slice(e))),
            (e -= r.length);
        } while (e > 0);
        return i;
      }
      startLoop(e) {
        let i;
        this._loop = !0;
        do
          switch (this._state) {
            case Ti:
              i = this.getInfo();
              break;
            case Pc:
              i = this.getPayloadLength16();
              break;
            case Fc:
              i = this.getPayloadLength64();
              break;
            case Nc:
              this.getMask();
              break;
            case Zn:
              i = this.getData(e);
              break;
            default:
              this._loop = !1;
              return;
          }
        while (this._loop);
        e(i);
      }
      getInfo() {
        if (this._bufferedBytes < 2) {
          this._loop = !1;
          return;
        }
        let e = this.consume(2);
        if (e[0] & 48)
          return (
            (this._loop = !1),
            Ie(
              RangeError,
              "RSV2 and RSV3 must be clear",
              !0,
              1002,
              "WS_ERR_UNEXPECTED_RSV_2_3"
            )
          );
        let i = (e[0] & 64) === 64;
        if (i && !this._extensions[Rc.extensionName])
          return (
            (this._loop = !1),
            Ie(
              RangeError,
              "RSV1 must be clear",
              !0,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            )
          );
        if (
          ((this._fin = (e[0] & 128) === 128),
          (this._opcode = e[0] & 15),
          (this._payloadLength = e[1] & 127),
          this._opcode === 0)
        ) {
          if (i)
            return (
              (this._loop = !1),
              Ie(
                RangeError,
                "RSV1 must be clear",
                !0,
                1002,
                "WS_ERR_UNEXPECTED_RSV_1"
              )
            );
          if (!this._fragmented)
            return (
              (this._loop = !1),
              Ie(
                RangeError,
                "invalid opcode 0",
                !0,
                1002,
                "WS_ERR_INVALID_OPCODE"
              )
            );
          this._opcode = this._fragmented;
        } else if (this._opcode === 1 || this._opcode === 2) {
          if (this._fragmented)
            return (
              (this._loop = !1),
              Ie(
                RangeError,
                `invalid opcode ${this._opcode}`,
                !0,
                1002,
                "WS_ERR_INVALID_OPCODE"
              )
            );
          this._compressed = i;
        } else if (this._opcode > 7 && this._opcode < 11) {
          if (!this._fin)
            return (
              (this._loop = !1),
              Ie(RangeError, "FIN must be set", !0, 1002, "WS_ERR_EXPECTED_FIN")
            );
          if (i)
            return (
              (this._loop = !1),
              Ie(
                RangeError,
                "RSV1 must be clear",
                !0,
                1002,
                "WS_ERR_UNEXPECTED_RSV_1"
              )
            );
          if (this._payloadLength > 125)
            return (
              (this._loop = !1),
              Ie(
                RangeError,
                `invalid payload length ${this._payloadLength}`,
                !0,
                1002,
                "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
              )
            );
        } else
          return (
            (this._loop = !1),
            Ie(
              RangeError,
              `invalid opcode ${this._opcode}`,
              !0,
              1002,
              "WS_ERR_INVALID_OPCODE"
            )
          );
        if (
          (!this._fin && !this._fragmented && (this._fragmented = this._opcode),
          (this._masked = (e[1] & 128) === 128),
          this._isServer)
        ) {
          if (!this._masked)
            return (
              (this._loop = !1),
              Ie(
                RangeError,
                "MASK must be set",
                !0,
                1002,
                "WS_ERR_EXPECTED_MASK"
              )
            );
        } else if (this._masked)
          return (
            (this._loop = !1),
            Ie(
              RangeError,
              "MASK must be clear",
              !0,
              1002,
              "WS_ERR_UNEXPECTED_MASK"
            )
          );
        if (this._payloadLength === 126) this._state = Pc;
        else if (this._payloadLength === 127) this._state = Fc;
        else return this.haveLength();
      }
      getPayloadLength16() {
        if (this._bufferedBytes < 2) {
          this._loop = !1;
          return;
        }
        return (
          (this._payloadLength = this.consume(2).readUInt16BE(0)),
          this.haveLength()
        );
      }
      getPayloadLength64() {
        if (this._bufferedBytes < 8) {
          this._loop = !1;
          return;
        }
        let e = this.consume(8),
          i = e.readUInt32BE(0);
        return i > Math.pow(2, 53 - 32) - 1
          ? ((this._loop = !1),
            Ie(
              RangeError,
              "Unsupported WebSocket frame: payload length > 2^53 - 1",
              !1,
              1009,
              "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH"
            ))
          : ((this._payloadLength = i * Math.pow(2, 32) + e.readUInt32BE(4)),
            this.haveLength());
      }
      haveLength() {
        if (
          this._payloadLength &&
          this._opcode < 8 &&
          ((this._totalPayloadLength += this._payloadLength),
          this._totalPayloadLength > this._maxPayload && this._maxPayload > 0)
        )
          return (
            (this._loop = !1),
            Ie(
              RangeError,
              "Max payload size exceeded",
              !1,
              1009,
              "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
            )
          );
        this._masked ? (this._state = Nc) : (this._state = Zn);
      }
      getMask() {
        if (this._bufferedBytes < 4) {
          this._loop = !1;
          return;
        }
        (this._mask = this.consume(4)), (this._state = Zn);
      }
      getData(e) {
        let i = Bc;
        if (this._payloadLength) {
          if (this._bufferedBytes < this._payloadLength) {
            this._loop = !1;
            return;
          }
          (i = this.consume(this._payloadLength)),
            this._masked &&
              this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3] &&
              wm(i, this._mask);
        }
        if (this._opcode > 7) return this.controlMessage(i);
        if (this._compressed) {
          (this._state = Sm), this.decompress(i, e);
          return;
        }
        return (
          i.length &&
            ((this._messageLength = this._totalPayloadLength),
            this._fragments.push(i)),
          this.dataMessage()
        );
      }
      decompress(e, i) {
        this._extensions[Rc.extensionName].decompress(e, this._fin, (n, s) => {
          if (n) return i(n);
          if (s.length) {
            if (
              ((this._messageLength += s.length),
              this._messageLength > this._maxPayload && this._maxPayload > 0)
            )
              return i(
                Ie(
                  RangeError,
                  "Max payload size exceeded",
                  !1,
                  1009,
                  "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
                )
              );
            this._fragments.push(s);
          }
          let o = this.dataMessage();
          if (o) return i(o);
          this.startLoop(i);
        });
      }
      dataMessage() {
        if (this._fin) {
          let e = this._messageLength,
            i = this._fragments;
          if (
            ((this._totalPayloadLength = 0),
            (this._messageLength = 0),
            (this._fragmented = 0),
            (this._fragments = []),
            this._opcode === 2)
          ) {
            let r;
            this._binaryType === "nodebuffer"
              ? (r = Kn(i, e))
              : this._binaryType === "arraybuffer"
              ? (r = bm(Kn(i, e)))
              : (r = i),
              this.emit("message", r, !0);
          } else {
            let r = Kn(i, e);
            if (!this._skipUTF8Validation && !Lc(r))
              return (
                (this._loop = !1),
                Ie(
                  Error,
                  "invalid UTF-8 sequence",
                  !0,
                  1007,
                  "WS_ERR_INVALID_UTF8"
                )
              );
            this.emit("message", r, !1);
          }
        }
        this._state = Ti;
      }
      controlMessage(e) {
        if (this._opcode === 8)
          if (((this._loop = !1), e.length === 0))
            this.emit("conclude", 1005, Bc), this.end();
          else {
            if (e.length === 1)
              return Ie(
                RangeError,
                "invalid payload length 1",
                !0,
                1002,
                "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
              );
            {
              let i = e.readUInt16BE(0);
              if (!Em(i))
                return Ie(
                  RangeError,
                  `invalid status code ${i}`,
                  !0,
                  1002,
                  "WS_ERR_INVALID_CLOSE_CODE"
                );
              let r = e.slice(2);
              if (!this._skipUTF8Validation && !Lc(r))
                return Ie(
                  Error,
                  "invalid UTF-8 sequence",
                  !0,
                  1007,
                  "WS_ERR_INVALID_UTF8"
                );
              this.emit("conclude", i, r), this.end();
            }
          }
        else this._opcode === 9 ? this.emit("ping", e) : this.emit("pong", e);
        this._state = Ti;
      }
    };
  Mc.exports = Xn;
  function Ie(t, e, i, r, n) {
    let s = new t(i ? `Invalid WebSocket frame: ${e}` : e);
    return Error.captureStackTrace(s, Ie), (s.code = n), (s[_m] = r), s;
  }
});
var es = y((Iv, jc) => {
  "use strict";
  var Cv = require("net"),
    Ov = require("tls"),
    { randomFillSync: km } = require("crypto"),
    Uc = Oi(),
    { EMPTY_BUFFER: Cm } = mt(),
    { isValidStatusCode: Om } = Ii(),
    { mask: Dc, toBuffer: ti } = Si(),
    rt = Symbol("kByteLength"),
    Im = Buffer.alloc(4),
    Qn = class t {
      constructor(e, i, r) {
        (this._extensions = i || {}),
          r && ((this._generateMask = r), (this._maskBuffer = Buffer.alloc(4))),
          (this._socket = e),
          (this._firstFragment = !0),
          (this._compress = !1),
          (this._bufferedBytes = 0),
          (this._deflating = !1),
          (this._queue = []);
      }
      static frame(e, i) {
        let r,
          n = !1,
          s = 2,
          o = !1;
        i.mask &&
          ((r = i.maskBuffer || Im),
          i.generateMask ? i.generateMask(r) : km(r, 0, 4),
          (o = (r[0] | r[1] | r[2] | r[3]) === 0),
          (s = 6));
        let l;
        typeof e == "string"
          ? (!i.mask || o) && i[rt] !== void 0
            ? (l = i[rt])
            : ((e = Buffer.from(e)), (l = e.length))
          : ((l = e.length), (n = i.mask && i.readOnly && !o));
        let a = l;
        l >= 65536 ? ((s += 8), (a = 127)) : l > 125 && ((s += 2), (a = 126));
        let c = Buffer.allocUnsafe(n ? l + s : s);
        return (
          (c[0] = i.fin ? i.opcode | 128 : i.opcode),
          i.rsv1 && (c[0] |= 64),
          (c[1] = a),
          a === 126
            ? c.writeUInt16BE(l, 2)
            : a === 127 && ((c[2] = c[3] = 0), c.writeUIntBE(l, 4, 6)),
          i.mask
            ? ((c[1] |= 128),
              (c[s - 4] = r[0]),
              (c[s - 3] = r[1]),
              (c[s - 2] = r[2]),
              (c[s - 1] = r[3]),
              o
                ? [c, e]
                : n
                ? (Dc(e, r, c, s, l), [c])
                : (Dc(e, r, e, 0, l), [c, e]))
            : [c, e]
        );
      }
      close(e, i, r, n) {
        let s;
        if (e === void 0) s = Cm;
        else {
          if (typeof e != "number" || !Om(e))
            throw new TypeError(
              "First argument must be a valid error code number"
            );
          if (i === void 0 || !i.length)
            (s = Buffer.allocUnsafe(2)), s.writeUInt16BE(e, 0);
          else {
            let l = Buffer.byteLength(i);
            if (l > 123)
              throw new RangeError(
                "The message must not be greater than 123 bytes"
              );
            (s = Buffer.allocUnsafe(2 + l)),
              s.writeUInt16BE(e, 0),
              typeof i == "string" ? s.write(i, 2) : s.set(i, 2);
          }
        }
        let o = {
          [rt]: s.length,
          fin: !0,
          generateMask: this._generateMask,
          mask: r,
          maskBuffer: this._maskBuffer,
          opcode: 8,
          readOnly: !1,
          rsv1: !1,
        };
        this._deflating
          ? this.enqueue([this.dispatch, s, !1, o, n])
          : this.sendFrame(t.frame(s, o), n);
      }
      ping(e, i, r) {
        let n, s;
        if (
          (typeof e == "string"
            ? ((n = Buffer.byteLength(e)), (s = !1))
            : ((e = ti(e)), (n = e.length), (s = ti.readOnly)),
          n > 125)
        )
          throw new RangeError(
            "The data size must not be greater than 125 bytes"
          );
        let o = {
          [rt]: n,
          fin: !0,
          generateMask: this._generateMask,
          mask: i,
          maskBuffer: this._maskBuffer,
          opcode: 9,
          readOnly: s,
          rsv1: !1,
        };
        this._deflating
          ? this.enqueue([this.dispatch, e, !1, o, r])
          : this.sendFrame(t.frame(e, o), r);
      }
      pong(e, i, r) {
        let n, s;
        if (
          (typeof e == "string"
            ? ((n = Buffer.byteLength(e)), (s = !1))
            : ((e = ti(e)), (n = e.length), (s = ti.readOnly)),
          n > 125)
        )
          throw new RangeError(
            "The data size must not be greater than 125 bytes"
          );
        let o = {
          [rt]: n,
          fin: !0,
          generateMask: this._generateMask,
          mask: i,
          maskBuffer: this._maskBuffer,
          opcode: 10,
          readOnly: s,
          rsv1: !1,
        };
        this._deflating
          ? this.enqueue([this.dispatch, e, !1, o, r])
          : this.sendFrame(t.frame(e, o), r);
      }
      send(e, i, r) {
        let n = this._extensions[Uc.extensionName],
          s = i.binary ? 2 : 1,
          o = i.compress,
          l,
          a;
        if (
          (typeof e == "string"
            ? ((l = Buffer.byteLength(e)), (a = !1))
            : ((e = ti(e)), (l = e.length), (a = ti.readOnly)),
          this._firstFragment
            ? ((this._firstFragment = !1),
              o &&
                n &&
                n.params[
                  n._isServer
                    ? "server_no_context_takeover"
                    : "client_no_context_takeover"
                ] &&
                (o = l >= n._threshold),
              (this._compress = o))
            : ((o = !1), (s = 0)),
          i.fin && (this._firstFragment = !0),
          n)
        ) {
          let c = {
            [rt]: l,
            fin: i.fin,
            generateMask: this._generateMask,
            mask: i.mask,
            maskBuffer: this._maskBuffer,
            opcode: s,
            readOnly: a,
            rsv1: o,
          };
          this._deflating
            ? this.enqueue([this.dispatch, e, this._compress, c, r])
            : this.dispatch(e, this._compress, c, r);
        } else
          this.sendFrame(
            t.frame(e, {
              [rt]: l,
              fin: i.fin,
              generateMask: this._generateMask,
              mask: i.mask,
              maskBuffer: this._maskBuffer,
              opcode: s,
              readOnly: a,
              rsv1: !1,
            }),
            r
          );
      }
      dispatch(e, i, r, n) {
        if (!i) {
          this.sendFrame(t.frame(e, r), n);
          return;
        }
        let s = this._extensions[Uc.extensionName];
        (this._bufferedBytes += r[rt]),
          (this._deflating = !0),
          s.compress(e, r.fin, (o, l) => {
            if (this._socket.destroyed) {
              let a = new Error(
                "The socket was closed while data was being compressed"
              );
              typeof n == "function" && n(a);
              for (let c = 0; c < this._queue.length; c++) {
                let u = this._queue[c],
                  f = u[u.length - 1];
                typeof f == "function" && f(a);
              }
              return;
            }
            (this._bufferedBytes -= r[rt]),
              (this._deflating = !1),
              (r.readOnly = !1),
              this.sendFrame(t.frame(l, r), n),
              this.dequeue();
          });
      }
      dequeue() {
        for (; !this._deflating && this._queue.length; ) {
          let e = this._queue.shift();
          (this._bufferedBytes -= e[3][rt]),
            Reflect.apply(e[0], this, e.slice(1));
        }
      }
      enqueue(e) {
        (this._bufferedBytes += e[3][rt]), this._queue.push(e);
      }
      sendFrame(e, i) {
        e.length === 2
          ? (this._socket.cork(),
            this._socket.write(e[0]),
            this._socket.write(e[1], i),
            this._socket.uncork())
          : this._socket.write(e[0], i);
      }
    };
  jc.exports = Qn;
});
var Zc = y((Tv, Kc) => {
  "use strict";
  var { kForOnEventAttribute: ts, kListener: qc } = mt(),
    Hc = Symbol("kCode"),
    Vc = Symbol("kData"),
    $c = Symbol("kError"),
    Gc = Symbol("kMessage"),
    zc = Symbol("kReason"),
    ii = Symbol("kTarget"),
    Wc = Symbol("kType"),
    Yc = Symbol("kWasClean"),
    ct = class {
      constructor(e) {
        (this[ii] = null), (this[Wc] = e);
      }
      get target() {
        return this[ii];
      }
      get type() {
        return this[Wc];
      }
    };
  Object.defineProperty(ct.prototype, "target", { enumerable: !0 });
  Object.defineProperty(ct.prototype, "type", { enumerable: !0 });
  var Tt = class extends ct {
    constructor(e, i = {}) {
      super(e),
        (this[Hc] = i.code === void 0 ? 0 : i.code),
        (this[zc] = i.reason === void 0 ? "" : i.reason),
        (this[Yc] = i.wasClean === void 0 ? !1 : i.wasClean);
    }
    get code() {
      return this[Hc];
    }
    get reason() {
      return this[zc];
    }
    get wasClean() {
      return this[Yc];
    }
  };
  Object.defineProperty(Tt.prototype, "code", { enumerable: !0 });
  Object.defineProperty(Tt.prototype, "reason", { enumerable: !0 });
  Object.defineProperty(Tt.prototype, "wasClean", { enumerable: !0 });
  var ri = class extends ct {
    constructor(e, i = {}) {
      super(e),
        (this[$c] = i.error === void 0 ? null : i.error),
        (this[Gc] = i.message === void 0 ? "" : i.message);
    }
    get error() {
      return this[$c];
    }
    get message() {
      return this[Gc];
    }
  };
  Object.defineProperty(ri.prototype, "error", { enumerable: !0 });
  Object.defineProperty(ri.prototype, "message", { enumerable: !0 });
  var Ai = class extends ct {
    constructor(e, i = {}) {
      super(e), (this[Vc] = i.data === void 0 ? null : i.data);
    }
    get data() {
      return this[Vc];
    }
  };
  Object.defineProperty(Ai.prototype, "data", { enumerable: !0 });
  var Tm = {
    addEventListener(t, e, i = {}) {
      let r;
      if (t === "message")
        r = function (s, o) {
          let l = new Ai("message", { data: o ? s : s.toString() });
          (l[ii] = this), e.call(this, l);
        };
      else if (t === "close")
        r = function (s, o) {
          let l = new Tt("close", {
            code: s,
            reason: o.toString(),
            wasClean: this._closeFrameReceived && this._closeFrameSent,
          });
          (l[ii] = this), e.call(this, l);
        };
      else if (t === "error")
        r = function (s) {
          let o = new ri("error", { error: s, message: s.message });
          (o[ii] = this), e.call(this, o);
        };
      else if (t === "open")
        r = function () {
          let s = new ct("open");
          (s[ii] = this), e.call(this, s);
        };
      else return;
      (r[ts] = !!i[ts]), (r[qc] = e), i.once ? this.once(t, r) : this.on(t, r);
    },
    removeEventListener(t, e) {
      for (let i of this.listeners(t))
        if (i[qc] === e && !i[ts]) {
          this.removeListener(t, i);
          break;
        }
    },
  };
  Kc.exports = {
    CloseEvent: Tt,
    ErrorEvent: ri,
    Event: ct,
    EventTarget: Tm,
    MessageEvent: Ai,
  };
});
var is = y((Av, Xc) => {
  "use strict";
  var { tokenChars: Ri } = Ii();
  function ot(t, e, i) {
    t[e] === void 0 ? (t[e] = [i]) : t[e].push(i);
  }
  function Am(t) {
    let e = Object.create(null),
      i = Object.create(null),
      r = !1,
      n = !1,
      s = !1,
      o,
      l,
      a = -1,
      c = -1,
      u = -1,
      f = 0;
    for (; f < t.length; f++)
      if (((c = t.charCodeAt(f)), o === void 0))
        if (u === -1 && Ri[c] === 1) a === -1 && (a = f);
        else if (f !== 0 && (c === 32 || c === 9))
          u === -1 && a !== -1 && (u = f);
        else if (c === 59 || c === 44) {
          if (a === -1)
            throw new SyntaxError(`Unexpected character at index ${f}`);
          u === -1 && (u = f);
          let p = t.slice(a, u);
          c === 44 ? (ot(e, p, i), (i = Object.create(null))) : (o = p),
            (a = u = -1);
        } else throw new SyntaxError(`Unexpected character at index ${f}`);
      else if (l === void 0)
        if (u === -1 && Ri[c] === 1) a === -1 && (a = f);
        else if (c === 32 || c === 9) u === -1 && a !== -1 && (u = f);
        else if (c === 59 || c === 44) {
          if (a === -1)
            throw new SyntaxError(`Unexpected character at index ${f}`);
          u === -1 && (u = f),
            ot(i, t.slice(a, u), !0),
            c === 44 && (ot(e, o, i), (i = Object.create(null)), (o = void 0)),
            (a = u = -1);
        } else if (c === 61 && a !== -1 && u === -1)
          (l = t.slice(a, f)), (a = u = -1);
        else throw new SyntaxError(`Unexpected character at index ${f}`);
      else if (n) {
        if (Ri[c] !== 1)
          throw new SyntaxError(`Unexpected character at index ${f}`);
        a === -1 ? (a = f) : r || (r = !0), (n = !1);
      } else if (s)
        if (Ri[c] === 1) a === -1 && (a = f);
        else if (c === 34 && a !== -1) (s = !1), (u = f);
        else if (c === 92) n = !0;
        else throw new SyntaxError(`Unexpected character at index ${f}`);
      else if (c === 34 && t.charCodeAt(f - 1) === 61) s = !0;
      else if (u === -1 && Ri[c] === 1) a === -1 && (a = f);
      else if (a !== -1 && (c === 32 || c === 9)) u === -1 && (u = f);
      else if (c === 59 || c === 44) {
        if (a === -1)
          throw new SyntaxError(`Unexpected character at index ${f}`);
        u === -1 && (u = f);
        let p = t.slice(a, u);
        r && ((p = p.replace(/\\/g, "")), (r = !1)),
          ot(i, l, p),
          c === 44 && (ot(e, o, i), (i = Object.create(null)), (o = void 0)),
          (l = void 0),
          (a = u = -1);
      } else throw new SyntaxError(`Unexpected character at index ${f}`);
    if (a === -1 || s || c === 32 || c === 9)
      throw new SyntaxError("Unexpected end of input");
    u === -1 && (u = f);
    let h = t.slice(a, u);
    return (
      o === void 0
        ? ot(e, h, i)
        : (l === void 0
            ? ot(i, h, !0)
            : r
            ? ot(i, l, h.replace(/\\/g, ""))
            : ot(i, l, h),
          ot(e, o, i)),
      e
    );
  }
  function Rm(t) {
    return Object.keys(t)
      .map((e) => {
        let i = t[e];
        return (
          Array.isArray(i) || (i = [i]),
          i
            .map((r) =>
              [e]
                .concat(
                  Object.keys(r).map((n) => {
                    let s = r[n];
                    return (
                      Array.isArray(s) || (s = [s]),
                      s.map((o) => (o === !0 ? n : `${n}=${o}`)).join("; ")
                    );
                  })
                )
                .join("; ")
            )
            .join(", ")
        );
      })
      .join(", ");
  }
  Xc.exports = { format: Rm, parse: Am };
});
var ls = y((Bv, au) => {
  "use strict";
  var Bm = require("events"),
    Lm = require("https"),
    Pm = require("http"),
    eu = require("net"),
    Fm = require("tls"),
    { randomBytes: Nm, createHash: Mm } = require("crypto"),
    { Readable: Rv } = require("stream"),
    { URL: rs } = require("url"),
    vt = Oi(),
    Um = Jn(),
    Dm = es(),
    {
      BINARY_TYPES: Jc,
      EMPTY_BUFFER: or,
      GUID: jm,
      kForOnEventAttribute: ns,
      kListener: qm,
      kStatusCode: Hm,
      kWebSocket: De,
      NOOP: tu,
    } = mt(),
    {
      EventTarget: { addEventListener: Vm, removeEventListener: $m },
    } = Zc(),
    { format: Gm, parse: zm } = is(),
    { toBuffer: Wm } = Si(),
    ut = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"],
    Ym = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,
    ss = [8, 13],
    Km = 30 * 1e3,
    Ce = class t extends Bm {
      constructor(e, i, r) {
        super(),
          (this._binaryType = Jc[0]),
          (this._closeCode = 1006),
          (this._closeFrameReceived = !1),
          (this._closeFrameSent = !1),
          (this._closeMessage = or),
          (this._closeTimer = null),
          (this._extensions = {}),
          (this._paused = !1),
          (this._protocol = ""),
          (this._readyState = t.CONNECTING),
          (this._receiver = null),
          (this._sender = null),
          (this._socket = null),
          e !== null
            ? ((this._bufferedAmount = 0),
              (this._isServer = !1),
              (this._redirects = 0),
              i === void 0
                ? (i = [])
                : Array.isArray(i) ||
                  (typeof i == "object" && i !== null
                    ? ((r = i), (i = []))
                    : (i = [i])),
              iu(this, e, i, r))
            : (this._isServer = !0);
      }
      get binaryType() {
        return this._binaryType;
      }
      set binaryType(e) {
        Jc.includes(e) &&
          ((this._binaryType = e),
          this._receiver && (this._receiver._binaryType = e));
      }
      get bufferedAmount() {
        return this._socket
          ? this._socket._writableState.length + this._sender._bufferedBytes
          : this._bufferedAmount;
      }
      get extensions() {
        return Object.keys(this._extensions).join();
      }
      get isPaused() {
        return this._paused;
      }
      get onclose() {
        return null;
      }
      get onerror() {
        return null;
      }
      get onopen() {
        return null;
      }
      get onmessage() {
        return null;
      }
      get protocol() {
        return this._protocol;
      }
      get readyState() {
        return this._readyState;
      }
      get url() {
        return this._url;
      }
      setSocket(e, i, r) {
        let n = new Um({
          binaryType: this.binaryType,
          extensions: this._extensions,
          isServer: this._isServer,
          maxPayload: r.maxPayload,
          skipUTF8Validation: r.skipUTF8Validation,
        });
        (this._sender = new Dm(e, this._extensions, r.generateMask)),
          (this._receiver = n),
          (this._socket = e),
          (n[De] = this),
          (e[De] = this),
          n.on("conclude", Jm),
          n.on("drain", Qm),
          n.on("error", e0),
          n.on("message", t0),
          n.on("ping", i0),
          n.on("pong", r0),
          e.setTimeout(0),
          e.setNoDelay(),
          i.length > 0 && e.unshift(i),
          e.on("close", nu),
          e.on("data", ar),
          e.on("end", su),
          e.on("error", ou),
          (this._readyState = t.OPEN),
          this.emit("open");
      }
      emitClose() {
        if (!this._socket) {
          (this._readyState = t.CLOSED),
            this.emit("close", this._closeCode, this._closeMessage);
          return;
        }
        this._extensions[vt.extensionName] &&
          this._extensions[vt.extensionName].cleanup(),
          this._receiver.removeAllListeners(),
          (this._readyState = t.CLOSED),
          this.emit("close", this._closeCode, this._closeMessage);
      }
      close(e, i) {
        if (this.readyState !== t.CLOSED) {
          if (this.readyState === t.CONNECTING) {
            let r =
              "WebSocket was closed before the connection was established";
            return Ze(this, this._req, r);
          }
          if (this.readyState === t.CLOSING) {
            this._closeFrameSent &&
              (this._closeFrameReceived ||
                this._receiver._writableState.errorEmitted) &&
              this._socket.end();
            return;
          }
          (this._readyState = t.CLOSING),
            this._sender.close(e, i, !this._isServer, (r) => {
              r ||
                ((this._closeFrameSent = !0),
                (this._closeFrameReceived ||
                  this._receiver._writableState.errorEmitted) &&
                  this._socket.end());
            }),
            (this._closeTimer = setTimeout(
              this._socket.destroy.bind(this._socket),
              Km
            ));
        }
      }
      pause() {
        this.readyState === t.CONNECTING ||
          this.readyState === t.CLOSED ||
          ((this._paused = !0), this._socket.pause());
      }
      ping(e, i, r) {
        if (this.readyState === t.CONNECTING)
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        if (
          (typeof e == "function"
            ? ((r = e), (e = i = void 0))
            : typeof i == "function" && ((r = i), (i = void 0)),
          typeof e == "number" && (e = e.toString()),
          this.readyState !== t.OPEN)
        ) {
          as(this, e, r);
          return;
        }
        i === void 0 && (i = !this._isServer), this._sender.ping(e || or, i, r);
      }
      pong(e, i, r) {
        if (this.readyState === t.CONNECTING)
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        if (
          (typeof e == "function"
            ? ((r = e), (e = i = void 0))
            : typeof i == "function" && ((r = i), (i = void 0)),
          typeof e == "number" && (e = e.toString()),
          this.readyState !== t.OPEN)
        ) {
          as(this, e, r);
          return;
        }
        i === void 0 && (i = !this._isServer), this._sender.pong(e || or, i, r);
      }
      resume() {
        this.readyState === t.CONNECTING ||
          this.readyState === t.CLOSED ||
          ((this._paused = !1),
          this._receiver._writableState.needDrain || this._socket.resume());
      }
      send(e, i, r) {
        if (this.readyState === t.CONNECTING)
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        if (
          (typeof i == "function" && ((r = i), (i = {})),
          typeof e == "number" && (e = e.toString()),
          this.readyState !== t.OPEN)
        ) {
          as(this, e, r);
          return;
        }
        let n = {
          binary: typeof e != "string",
          mask: !this._isServer,
          compress: !0,
          fin: !0,
          ...i,
        };
        this._extensions[vt.extensionName] || (n.compress = !1),
          this._sender.send(e || or, n, r);
      }
      terminate() {
        if (this.readyState !== t.CLOSED) {
          if (this.readyState === t.CONNECTING) {
            let e =
              "WebSocket was closed before the connection was established";
            return Ze(this, this._req, e);
          }
          this._socket &&
            ((this._readyState = t.CLOSING), this._socket.destroy());
        }
      }
    };
  Object.defineProperty(Ce, "CONNECTING", {
    enumerable: !0,
    value: ut.indexOf("CONNECTING"),
  });
  Object.defineProperty(Ce.prototype, "CONNECTING", {
    enumerable: !0,
    value: ut.indexOf("CONNECTING"),
  });
  Object.defineProperty(Ce, "OPEN", {
    enumerable: !0,
    value: ut.indexOf("OPEN"),
  });
  Object.defineProperty(Ce.prototype, "OPEN", {
    enumerable: !0,
    value: ut.indexOf("OPEN"),
  });
  Object.defineProperty(Ce, "CLOSING", {
    enumerable: !0,
    value: ut.indexOf("CLOSING"),
  });
  Object.defineProperty(Ce.prototype, "CLOSING", {
    enumerable: !0,
    value: ut.indexOf("CLOSING"),
  });
  Object.defineProperty(Ce, "CLOSED", {
    enumerable: !0,
    value: ut.indexOf("CLOSED"),
  });
  Object.defineProperty(Ce.prototype, "CLOSED", {
    enumerable: !0,
    value: ut.indexOf("CLOSED"),
  });
  [
    "binaryType",
    "bufferedAmount",
    "extensions",
    "isPaused",
    "protocol",
    "readyState",
    "url",
  ].forEach((t) => {
    Object.defineProperty(Ce.prototype, t, { enumerable: !0 });
  });
  ["open", "error", "close", "message"].forEach((t) => {
    Object.defineProperty(Ce.prototype, `on${t}`, {
      enumerable: !0,
      get() {
        for (let e of this.listeners(t)) if (e[ns]) return e[qm];
        return null;
      },
      set(e) {
        for (let i of this.listeners(t))
          if (i[ns]) {
            this.removeListener(t, i);
            break;
          }
        typeof e == "function" && this.addEventListener(t, e, { [ns]: !0 });
      },
    });
  });
  Ce.prototype.addEventListener = Vm;
  Ce.prototype.removeEventListener = $m;
  au.exports = Ce;
  function iu(t, e, i, r) {
    let n = {
      protocolVersion: ss[1],
      maxPayload: 104857600,
      skipUTF8Validation: !1,
      perMessageDeflate: !0,
      followRedirects: !1,
      maxRedirects: 10,
      ...r,
      createConnection: void 0,
      socketPath: void 0,
      hostname: void 0,
      protocol: void 0,
      timeout: void 0,
      method: void 0,
      host: void 0,
      path: void 0,
      port: void 0,
    };
    if (!ss.includes(n.protocolVersion))
      throw new RangeError(
        `Unsupported protocol version: ${
          n.protocolVersion
        } (supported versions: ${ss.join(", ")})`
      );
    let s;
    if (e instanceof rs) (s = e), (t._url = e.href);
    else {
      try {
        s = new rs(e);
      } catch {
        throw new SyntaxError(`Invalid URL: ${e}`);
      }
      t._url = e;
    }
    let o = s.protocol === "wss:",
      l = s.protocol === "ws+unix:",
      a;
    if (
      (s.protocol !== "ws:" && !o && !l
        ? (a = `The URL's protocol must be one of "ws:", "wss:", or "ws+unix:"`)
        : l && !s.pathname
        ? (a = "The URL's pathname is empty")
        : s.hash && (a = "The URL contains a fragment identifier"),
      a)
    ) {
      let m = new SyntaxError(a);
      if (t._redirects === 0) throw m;
      os(t, m);
      return;
    }
    let c = o ? 443 : 80,
      u = Nm(16).toString("base64"),
      f = o ? Lm.get : Pm.get,
      h = new Set(),
      p;
    if (
      ((n.createConnection = o ? Xm : Zm),
      (n.defaultPort = n.defaultPort || c),
      (n.port = s.port || c),
      (n.host = s.hostname.startsWith("[")
        ? s.hostname.slice(1, -1)
        : s.hostname),
      (n.headers = {
        "Sec-WebSocket-Version": n.protocolVersion,
        "Sec-WebSocket-Key": u,
        Connection: "Upgrade",
        Upgrade: "websocket",
        ...n.headers,
      }),
      (n.path = s.pathname + s.search),
      (n.timeout = n.handshakeTimeout),
      n.perMessageDeflate &&
        ((p = new vt(
          n.perMessageDeflate !== !0 ? n.perMessageDeflate : {},
          !1,
          n.maxPayload
        )),
        (n.headers["Sec-WebSocket-Extensions"] = Gm({
          [vt.extensionName]: p.offer(),
        }))),
      i.length)
    ) {
      for (let m of i) {
        if (typeof m != "string" || !Ym.test(m) || h.has(m))
          throw new SyntaxError(
            "An invalid or duplicated subprotocol was specified"
          );
        h.add(m);
      }
      n.headers["Sec-WebSocket-Protocol"] = i.join(",");
    }
    if (
      (n.origin &&
        (n.protocolVersion < 13
          ? (n.headers["Sec-WebSocket-Origin"] = n.origin)
          : (n.headers.Origin = n.origin)),
      (s.username || s.password) && (n.auth = `${s.username}:${s.password}`),
      l)
    ) {
      let m = n.path.split(":");
      (n.socketPath = m[0]), (n.path = m[1]);
    }
    let d = (t._req = f(n));
    n.timeout &&
      d.on("timeout", () => {
        Ze(t, d, "Opening handshake has timed out");
      }),
      d.on("error", (m) => {
        d === null || d.aborted || ((d = t._req = null), os(t, m));
      }),
      d.on("response", (m) => {
        let v = m.headers.location,
          E = m.statusCode;
        if (v && n.followRedirects && E >= 300 && E < 400) {
          if (++t._redirects > n.maxRedirects) {
            Ze(t, d, "Maximum redirects exceeded");
            return;
          }
          d.abort();
          let I;
          try {
            I = new rs(v, e);
          } catch {
            let C = new SyntaxError(`Invalid URL: ${v}`);
            os(t, C);
            return;
          }
          iu(t, I, i, r);
        } else
          t.emit("unexpected-response", d, m) ||
            Ze(t, d, `Unexpected server response: ${m.statusCode}`);
      }),
      d.on("upgrade", (m, v, E) => {
        if ((t.emit("upgrade", m), t.readyState !== Ce.CONNECTING)) return;
        d = t._req = null;
        let I = Mm("sha1")
          .update(u + jm)
          .digest("base64");
        if (m.headers["sec-websocket-accept"] !== I) {
          Ze(t, v, "Invalid Sec-WebSocket-Accept header");
          return;
        }
        let w = m.headers["sec-websocket-protocol"],
          C;
        if (
          (w !== void 0
            ? h.size
              ? h.has(w) || (C = "Server sent an invalid subprotocol")
              : (C = "Server sent a subprotocol but none was requested")
            : h.size && (C = "Server sent no subprotocol"),
          C)
        ) {
          Ze(t, v, C);
          return;
        }
        w && (t._protocol = w);
        let _ = m.headers["sec-websocket-extensions"];
        if (_ !== void 0) {
          if (!p) {
            Ze(
              t,
              v,
              "Server sent a Sec-WebSocket-Extensions header but no extension was requested"
            );
            return;
          }
          let $;
          try {
            $ = zm(_);
          } catch {
            Ze(t, v, "Invalid Sec-WebSocket-Extensions header");
            return;
          }
          let k = Object.keys($);
          if (k.length !== 1 || k[0] !== vt.extensionName) {
            Ze(t, v, "Server indicated an extension that was not requested");
            return;
          }
          try {
            p.accept($[vt.extensionName]);
          } catch {
            Ze(t, v, "Invalid Sec-WebSocket-Extensions header");
            return;
          }
          t._extensions[vt.extensionName] = p;
        }
        t.setSocket(v, E, {
          generateMask: n.generateMask,
          maxPayload: n.maxPayload,
          skipUTF8Validation: n.skipUTF8Validation,
        });
      });
  }
  function os(t, e) {
    (t._readyState = Ce.CLOSING), t.emit("error", e), t.emitClose();
  }
  function Zm(t) {
    return (t.path = t.socketPath), eu.connect(t);
  }
  function Xm(t) {
    return (
      (t.path = void 0),
      !t.servername &&
        t.servername !== "" &&
        (t.servername = eu.isIP(t.host) ? "" : t.host),
      Fm.connect(t)
    );
  }
  function Ze(t, e, i) {
    t._readyState = Ce.CLOSING;
    let r = new Error(i);
    Error.captureStackTrace(r, Ze),
      e.setHeader
        ? (e.abort(),
          e.socket && !e.socket.destroyed && e.socket.destroy(),
          e.once("abort", t.emitClose.bind(t)),
          t.emit("error", r))
        : (e.destroy(r),
          e.once("error", t.emit.bind(t, "error")),
          e.once("close", t.emitClose.bind(t)));
  }
  function as(t, e, i) {
    if (e) {
      let r = Wm(e).length;
      t._socket ? (t._sender._bufferedBytes += r) : (t._bufferedAmount += r);
    }
    if (i) {
      let r = new Error(
        `WebSocket is not open: readyState ${t.readyState} (${
          ut[t.readyState]
        })`
      );
      i(r);
    }
  }
  function Jm(t, e) {
    let i = this[De];
    (i._closeFrameReceived = !0),
      (i._closeMessage = e),
      (i._closeCode = t),
      i._socket[De] !== void 0 &&
        (i._socket.removeListener("data", ar),
        process.nextTick(ru, i._socket),
        t === 1005 ? i.close() : i.close(t, e));
  }
  function Qm() {
    let t = this[De];
    t.isPaused || t._socket.resume();
  }
  function e0(t) {
    let e = this[De];
    e._socket[De] !== void 0 &&
      (e._socket.removeListener("data", ar),
      process.nextTick(ru, e._socket),
      e.close(t[Hm])),
      e.emit("error", t);
  }
  function Qc() {
    this[De].emitClose();
  }
  function t0(t, e) {
    this[De].emit("message", t, e);
  }
  function i0(t) {
    let e = this[De];
    e.pong(t, !e._isServer, tu), e.emit("ping", t);
  }
  function r0(t) {
    this[De].emit("pong", t);
  }
  function ru(t) {
    t.resume();
  }
  function nu() {
    let t = this[De];
    this.removeListener("close", nu),
      this.removeListener("data", ar),
      this.removeListener("end", su),
      (t._readyState = Ce.CLOSING);
    let e;
    !this._readableState.endEmitted &&
      !t._closeFrameReceived &&
      !t._receiver._writableState.errorEmitted &&
      (e = t._socket.read()) !== null &&
      t._receiver.write(e),
      t._receiver.end(),
      (this[De] = void 0),
      clearTimeout(t._closeTimer),
      t._receiver._writableState.finished ||
      t._receiver._writableState.errorEmitted
        ? t.emitClose()
        : (t._receiver.on("error", Qc), t._receiver.on("finish", Qc));
  }
  function ar(t) {
    this[De]._receiver.write(t) || this.pause();
  }
  function su() {
    let t = this[De];
    (t._readyState = Ce.CLOSING), t._receiver.end(), this.end();
  }
  function ou() {
    let t = this[De];
    this.removeListener("error", ou),
      this.on("error", tu),
      t && ((t._readyState = Ce.CLOSING), this.destroy());
  }
});
var cu = y((Lv, lu) => {
  "use strict";
  var { tokenChars: n0 } = Ii();
  function s0(t) {
    let e = new Set(),
      i = -1,
      r = -1,
      n = 0;
    for (n; n < t.length; n++) {
      let o = t.charCodeAt(n);
      if (r === -1 && n0[o] === 1) i === -1 && (i = n);
      else if (n !== 0 && (o === 32 || o === 9))
        r === -1 && i !== -1 && (r = n);
      else if (o === 44) {
        if (i === -1)
          throw new SyntaxError(`Unexpected character at index ${n}`);
        r === -1 && (r = n);
        let l = t.slice(i, r);
        if (e.has(l))
          throw new SyntaxError(`The "${l}" subprotocol is duplicated`);
        e.add(l), (i = r = -1);
      } else throw new SyntaxError(`Unexpected character at index ${n}`);
    }
    if (i === -1 || r !== -1) throw new SyntaxError("Unexpected end of input");
    let s = t.slice(i, n);
    if (e.has(s)) throw new SyntaxError(`The "${s}" subprotocol is duplicated`);
    return e.add(s), e;
  }
  lu.exports = { parse: s0 };
});
var mu = y((Mv, du) => {
  "use strict";
  var o0 = require("events"),
    lr = require("http"),
    Pv = require("https"),
    Fv = require("net"),
    Nv = require("tls"),
    { createHash: a0 } = require("crypto"),
    uu = is(),
    At = Oi(),
    l0 = cu(),
    c0 = ls(),
    { GUID: u0, kWebSocket: f0 } = mt(),
    h0 = /^[+/0-9A-Za-z]{22}==$/,
    fu = 0,
    hu = 1,
    pu = 2,
    cs = class extends o0 {
      constructor(e, i) {
        if (
          (super(),
          (e = {
            maxPayload: 100 * 1024 * 1024,
            skipUTF8Validation: !1,
            perMessageDeflate: !1,
            handleProtocols: null,
            clientTracking: !0,
            verifyClient: null,
            noServer: !1,
            backlog: null,
            server: null,
            host: null,
            path: null,
            port: null,
            ...e,
          }),
          (e.port == null && !e.server && !e.noServer) ||
            (e.port != null && (e.server || e.noServer)) ||
            (e.server && e.noServer))
        )
          throw new TypeError(
            'One and only one of the "port", "server", or "noServer" options must be specified'
          );
        if (
          (e.port != null
            ? ((this._server = lr.createServer((r, n) => {
                let s = lr.STATUS_CODES[426];
                n.writeHead(426, {
                  "Content-Length": s.length,
                  "Content-Type": "text/plain",
                }),
                  n.end(s);
              })),
              this._server.listen(e.port, e.host, e.backlog, i))
            : e.server && (this._server = e.server),
          this._server)
        ) {
          let r = this.emit.bind(this, "connection");
          this._removeListeners = p0(this._server, {
            listening: this.emit.bind(this, "listening"),
            error: this.emit.bind(this, "error"),
            upgrade: (n, s, o) => {
              this.handleUpgrade(n, s, o, r);
            },
          });
        }
        e.perMessageDeflate === !0 && (e.perMessageDeflate = {}),
          e.clientTracking &&
            ((this.clients = new Set()), (this._shouldEmitClose = !1)),
          (this.options = e),
          (this._state = fu);
      }
      address() {
        if (this.options.noServer)
          throw new Error('The server is operating in "noServer" mode');
        return this._server ? this._server.address() : null;
      }
      close(e) {
        if (this._state === pu) {
          e &&
            this.once("close", () => {
              e(new Error("The server is not running"));
            }),
            process.nextTick(Bi, this);
          return;
        }
        if ((e && this.once("close", e), this._state !== hu))
          if (
            ((this._state = hu), this.options.noServer || this.options.server)
          )
            this._server &&
              (this._removeListeners(),
              (this._removeListeners = this._server = null)),
              this.clients
                ? this.clients.size
                  ? (this._shouldEmitClose = !0)
                  : process.nextTick(Bi, this)
                : process.nextTick(Bi, this);
          else {
            let i = this._server;
            this._removeListeners(),
              (this._removeListeners = this._server = null),
              i.close(() => {
                Bi(this);
              });
          }
      }
      shouldHandle(e) {
        if (this.options.path) {
          let i = e.url.indexOf("?");
          if ((i !== -1 ? e.url.slice(0, i) : e.url) !== this.options.path)
            return !1;
        }
        return !0;
      }
      handleUpgrade(e, i, r, n) {
        i.on("error", us);
        let s =
            e.headers["sec-websocket-key"] !== void 0
              ? e.headers["sec-websocket-key"]
              : !1,
          o = +e.headers["sec-websocket-version"];
        if (
          e.method !== "GET" ||
          e.headers.upgrade.toLowerCase() !== "websocket" ||
          !s ||
          !h0.test(s) ||
          (o !== 8 && o !== 13) ||
          !this.shouldHandle(e)
        )
          return ni(i, 400);
        let l = e.headers["sec-websocket-protocol"],
          a = new Set();
        if (l !== void 0)
          try {
            a = l0.parse(l);
          } catch {
            return ni(i, 400);
          }
        let c = e.headers["sec-websocket-extensions"],
          u = {};
        if (this.options.perMessageDeflate && c !== void 0) {
          let f = new At(
            this.options.perMessageDeflate,
            !0,
            this.options.maxPayload
          );
          try {
            let h = uu.parse(c);
            h[At.extensionName] &&
              (f.accept(h[At.extensionName]), (u[At.extensionName] = f));
          } catch {
            return ni(i, 400);
          }
        }
        if (this.options.verifyClient) {
          let f = {
            origin: e.headers[`${o === 8 ? "sec-websocket-origin" : "origin"}`],
            secure: !!(e.socket.authorized || e.socket.encrypted),
            req: e,
          };
          if (this.options.verifyClient.length === 2) {
            this.options.verifyClient(f, (h, p, d, m) => {
              if (!h) return ni(i, p || 401, d, m);
              this.completeUpgrade(u, s, a, e, i, r, n);
            });
            return;
          }
          if (!this.options.verifyClient(f)) return ni(i, 401);
        }
        this.completeUpgrade(u, s, a, e, i, r, n);
      }
      completeUpgrade(e, i, r, n, s, o, l) {
        if (!s.readable || !s.writable) return s.destroy();
        if (s[f0])
          throw new Error(
            "server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration"
          );
        if (this._state > fu) return ni(s, 503);
        let c = [
            "HTTP/1.1 101 Switching Protocols",
            "Upgrade: websocket",
            "Connection: Upgrade",
            `Sec-WebSocket-Accept: ${a0("sha1")
              .update(i + u0)
              .digest("base64")}`,
          ],
          u = new c0(null);
        if (r.size) {
          let f = this.options.handleProtocols
            ? this.options.handleProtocols(r, n)
            : r.values().next().value;
          f && (c.push(`Sec-WebSocket-Protocol: ${f}`), (u._protocol = f));
        }
        if (e[At.extensionName]) {
          let f = e[At.extensionName].params,
            h = uu.format({ [At.extensionName]: [f] });
          c.push(`Sec-WebSocket-Extensions: ${h}`), (u._extensions = e);
        }
        this.emit("headers", c, n),
          s.write(
            c.concat(`\r
`).join(`\r
`)
          ),
          s.removeListener("error", us),
          u.setSocket(s, o, {
            maxPayload: this.options.maxPayload,
            skipUTF8Validation: this.options.skipUTF8Validation,
          }),
          this.clients &&
            (this.clients.add(u),
            u.on("close", () => {
              this.clients.delete(u),
                this._shouldEmitClose &&
                  !this.clients.size &&
                  process.nextTick(Bi, this);
            })),
          l(u, n);
      }
    };
  du.exports = cs;
  function p0(t, e) {
    for (let i of Object.keys(e)) t.on(i, e[i]);
    return function () {
      for (let r of Object.keys(e)) t.removeListener(r, e[r]);
    };
  }
  function Bi(t) {
    (t._state = pu), t.emit("close");
  }
  function us() {
    this.destroy();
  }
  function ni(t, e, i, r) {
    t.writable &&
      ((i = i || lr.STATUS_CODES[e]),
      (r = {
        Connection: "close",
        "Content-Type": "text/html",
        "Content-Length": Buffer.byteLength(i),
        ...r,
      }),
      t.write(
        `HTTP/1.1 ${e} ${lr.STATUS_CODES[e]}\r
` +
          Object.keys(r).map((n) => `${n}: ${r[n]}`).join(`\r
`) +
          `\r
\r
` +
          i
      )),
      t.removeListener("error", us),
      t.destroy();
  }
});
var _u = y((Dv, xu) => {
  var xt = require("constants"),
    m0 = process.cwd,
    cr = null,
    g0 = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function () {
    return cr || (cr = m0.call(process)), cr;
  };
  try {
    process.cwd();
  } catch {}
  typeof process.chdir == "function" &&
    ((ds = process.chdir),
    (process.chdir = function (t) {
      (cr = null), ds.call(process, t);
    }),
    Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, ds));
  var ds;
  xu.exports = v0;
  function v0(t) {
    xt.hasOwnProperty("O_SYMLINK") &&
      process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) &&
      e(t),
      t.lutimes || i(t),
      (t.chown = s(t.chown)),
      (t.fchown = s(t.fchown)),
      (t.lchown = s(t.lchown)),
      (t.chmod = r(t.chmod)),
      (t.fchmod = r(t.fchmod)),
      (t.lchmod = r(t.lchmod)),
      (t.chownSync = o(t.chownSync)),
      (t.fchownSync = o(t.fchownSync)),
      (t.lchownSync = o(t.lchownSync)),
      (t.chmodSync = n(t.chmodSync)),
      (t.fchmodSync = n(t.fchmodSync)),
      (t.lchmodSync = n(t.lchmodSync)),
      (t.stat = l(t.stat)),
      (t.fstat = l(t.fstat)),
      (t.lstat = l(t.lstat)),
      (t.statSync = a(t.statSync)),
      (t.fstatSync = a(t.fstatSync)),
      (t.lstatSync = a(t.lstatSync)),
      t.chmod &&
        !t.lchmod &&
        ((t.lchmod = function (u, f, h) {
          h && process.nextTick(h);
        }),
        (t.lchmodSync = function () {})),
      t.chown &&
        !t.lchown &&
        ((t.lchown = function (u, f, h, p) {
          p && process.nextTick(p);
        }),
        (t.lchownSync = function () {})),
      g0 === "win32" &&
        (t.rename =
          typeof t.rename != "function"
            ? t.rename
            : (function (u) {
                function f(h, p, d) {
                  var m = Date.now(),
                    v = 0;
                  u(h, p, function E(I) {
                    if (
                      I &&
                      (I.code === "EACCES" || I.code === "EPERM") &&
                      Date.now() - m < 6e4
                    ) {
                      setTimeout(function () {
                        t.stat(p, function (w, C) {
                          w && w.code === "ENOENT" ? u(h, p, E) : d(I);
                        });
                      }, v),
                        v < 100 && (v += 10);
                      return;
                    }
                    d && d(I);
                  });
                }
                return Object.setPrototypeOf && Object.setPrototypeOf(f, u), f;
              })(t.rename)),
      (t.read =
        typeof t.read != "function"
          ? t.read
          : (function (u) {
              function f(h, p, d, m, v, E) {
                var I;
                if (E && typeof E == "function") {
                  var w = 0;
                  I = function (C, _, $) {
                    if (C && C.code === "EAGAIN" && w < 10)
                      return w++, u.call(t, h, p, d, m, v, I);
                    E.apply(this, arguments);
                  };
                }
                return u.call(t, h, p, d, m, v, I);
              }
              return Object.setPrototypeOf && Object.setPrototypeOf(f, u), f;
            })(t.read)),
      (t.readSync =
        typeof t.readSync != "function"
          ? t.readSync
          : (function (u) {
              return function (f, h, p, d, m) {
                for (var v = 0; ; )
                  try {
                    return u.call(t, f, h, p, d, m);
                  } catch (E) {
                    if (E.code === "EAGAIN" && v < 10) {
                      v++;
                      continue;
                    }
                    throw E;
                  }
              };
            })(t.readSync));
    function e(u) {
      (u.lchmod = function (f, h, p) {
        u.open(f, xt.O_WRONLY | xt.O_SYMLINK, h, function (d, m) {
          if (d) {
            p && p(d);
            return;
          }
          u.fchmod(m, h, function (v) {
            u.close(m, function (E) {
              p && p(v || E);
            });
          });
        });
      }),
        (u.lchmodSync = function (f, h) {
          var p = u.openSync(f, xt.O_WRONLY | xt.O_SYMLINK, h),
            d = !0,
            m;
          try {
            (m = u.fchmodSync(p, h)), (d = !1);
          } finally {
            if (d)
              try {
                u.closeSync(p);
              } catch {}
            else u.closeSync(p);
          }
          return m;
        });
    }
    function i(u) {
      xt.hasOwnProperty("O_SYMLINK") && u.futimes
        ? ((u.lutimes = function (f, h, p, d) {
            u.open(f, xt.O_SYMLINK, function (m, v) {
              if (m) {
                d && d(m);
                return;
              }
              u.futimes(v, h, p, function (E) {
                u.close(v, function (I) {
                  d && d(E || I);
                });
              });
            });
          }),
          (u.lutimesSync = function (f, h, p) {
            var d = u.openSync(f, xt.O_SYMLINK),
              m,
              v = !0;
            try {
              (m = u.futimesSync(d, h, p)), (v = !1);
            } finally {
              if (v)
                try {
                  u.closeSync(d);
                } catch {}
              else u.closeSync(d);
            }
            return m;
          }))
        : u.futimes &&
          ((u.lutimes = function (f, h, p, d) {
            d && process.nextTick(d);
          }),
          (u.lutimesSync = function () {}));
    }
    function r(u) {
      return (
        u &&
        function (f, h, p) {
          return u.call(t, f, h, function (d) {
            c(d) && (d = null), p && p.apply(this, arguments);
          });
        }
      );
    }
    function n(u) {
      return (
        u &&
        function (f, h) {
          try {
            return u.call(t, f, h);
          } catch (p) {
            if (!c(p)) throw p;
          }
        }
      );
    }
    function s(u) {
      return (
        u &&
        function (f, h, p, d) {
          return u.call(t, f, h, p, function (m) {
            c(m) && (m = null), d && d.apply(this, arguments);
          });
        }
      );
    }
    function o(u) {
      return (
        u &&
        function (f, h, p) {
          try {
            return u.call(t, f, h, p);
          } catch (d) {
            if (!c(d)) throw d;
          }
        }
      );
    }
    function l(u) {
      return (
        u &&
        function (f, h, p) {
          typeof h == "function" && ((p = h), (h = null));
          function d(m, v) {
            v &&
              (v.uid < 0 && (v.uid += 4294967296),
              v.gid < 0 && (v.gid += 4294967296)),
              p && p.apply(this, arguments);
          }
          return h ? u.call(t, f, h, d) : u.call(t, f, d);
        }
      );
    }
    function a(u) {
      return (
        u &&
        function (f, h) {
          var p = h ? u.call(t, f, h) : u.call(t, f);
          return (
            p &&
              (p.uid < 0 && (p.uid += 4294967296),
              p.gid < 0 && (p.gid += 4294967296)),
            p
          );
        }
      );
    }
    function c(u) {
      if (!u || u.code === "ENOSYS") return !0;
      var f = !process.getuid || process.getuid() !== 0;
      return !!(f && (u.code === "EINVAL" || u.code === "EPERM"));
    }
  }
});
var wu = y((jv, bu) => {
  var yu = require("stream").Stream;
  bu.exports = x0;
  function x0(t) {
    return { ReadStream: e, WriteStream: i };
    function e(r, n) {
      if (!(this instanceof e)) return new e(r, n);
      yu.call(this);
      var s = this;
      (this.path = r),
        (this.fd = null),
        (this.readable = !0),
        (this.paused = !1),
        (this.flags = "r"),
        (this.mode = 438),
        (this.bufferSize = 64 * 1024),
        (n = n || {});
      for (var o = Object.keys(n), l = 0, a = o.length; l < a; l++) {
        var c = o[l];
        this[c] = n[c];
      }
      if (
        (this.encoding && this.setEncoding(this.encoding),
        this.start !== void 0)
      ) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.end === void 0) this.end = 1 / 0;
        else if (typeof this.end != "number")
          throw TypeError("end must be a Number");
        if (this.start > this.end) throw new Error("start must be <= end");
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function () {
          s._read();
        });
        return;
      }
      t.open(this.path, this.flags, this.mode, function (u, f) {
        if (u) {
          s.emit("error", u), (s.readable = !1);
          return;
        }
        (s.fd = f), s.emit("open", f), s._read();
      });
    }
    function i(r, n) {
      if (!(this instanceof i)) return new i(r, n);
      yu.call(this),
        (this.path = r),
        (this.fd = null),
        (this.writable = !0),
        (this.flags = "w"),
        (this.encoding = "binary"),
        (this.mode = 438),
        (this.bytesWritten = 0),
        (n = n || {});
      for (var s = Object.keys(n), o = 0, l = s.length; o < l; o++) {
        var a = s[o];
        this[a] = n[a];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0) throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      (this.busy = !1),
        (this._queue = []),
        this.fd === null &&
          ((this._open = t.open),
          this._queue.push([
            this._open,
            this.path,
            this.flags,
            this.mode,
            void 0,
          ]),
          this.flush());
    }
  }
});
var Su = y((qv, Eu) => {
  "use strict";
  Eu.exports = y0;
  var _0 =
    Object.getPrototypeOf ||
    function (t) {
      return t.__proto__;
    };
  function y0(t) {
    if (t === null || typeof t != "object") return t;
    if (t instanceof Object) var e = { __proto__: _0(t) };
    else var e = Object.create(null);
    return (
      Object.getOwnPropertyNames(t).forEach(function (i) {
        Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(t, i));
      }),
      e
    );
  }
});
var Iu = y((Hv, vs) => {
  var ke = require("fs"),
    b0 = _u(),
    w0 = wu(),
    E0 = Su(),
    ur = require("util"),
    Ne,
    hr;
  typeof Symbol == "function" && typeof Symbol.for == "function"
    ? ((Ne = Symbol.for("graceful-fs.queue")),
      (hr = Symbol.for("graceful-fs.previous")))
    : ((Ne = "___graceful-fs.queue"), (hr = "___graceful-fs.previous"));
  function S0() {}
  function Ou(t, e) {
    Object.defineProperty(t, Ne, {
      get: function () {
        return e;
      },
    });
  }
  var Rt = S0;
  ur.debuglog
    ? (Rt = ur.debuglog("gfs4"))
    : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
      (Rt = function () {
        var t = ur.format.apply(ur, arguments);
        (t =
          "GFS4: " +
          t.split(/\n/).join(`
GFS4: `)),
          console.error(t);
      });
  ke[Ne] ||
    ((ku = global[Ne] || []),
    Ou(ke, ku),
    (ke.close = (function (t) {
      function e(i, r) {
        return t.call(ke, i, function (n) {
          n || Cu(), typeof r == "function" && r.apply(this, arguments);
        });
      }
      return Object.defineProperty(e, hr, { value: t }), e;
    })(ke.close)),
    (ke.closeSync = (function (t) {
      function e(i) {
        t.apply(ke, arguments), Cu();
      }
      return Object.defineProperty(e, hr, { value: t }), e;
    })(ke.closeSync)),
    /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
      process.on("exit", function () {
        Rt(ke[Ne]), require("assert").equal(ke[Ne].length, 0);
      }));
  var ku;
  global[Ne] || Ou(global, ke[Ne]);
  vs.exports = ms(E0(ke));
  process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH &&
    !ke.__patched &&
    ((vs.exports = ms(ke)), (ke.__patched = !0));
  function ms(t) {
    b0(t),
      (t.gracefulify = ms),
      (t.createReadStream = _),
      (t.createWriteStream = $);
    var e = t.readFile;
    t.readFile = i;
    function i(b, T, B) {
      return typeof T == "function" && ((B = T), (T = null)), G(b, T, B);
      function G(L, X, R, N) {
        return e(L, X, function (q) {
          q && (q.code === "EMFILE" || q.code === "ENFILE")
            ? si([G, [L, X, R], q, N || Date.now(), Date.now()])
            : typeof R == "function" && R.apply(this, arguments);
        });
      }
    }
    var r = t.writeFile;
    t.writeFile = n;
    function n(b, T, B, G) {
      return typeof B == "function" && ((G = B), (B = null)), L(b, T, B, G);
      function L(X, R, N, q, z) {
        return r(X, R, N, function (P) {
          P && (P.code === "EMFILE" || P.code === "ENFILE")
            ? si([L, [X, R, N, q], P, z || Date.now(), Date.now()])
            : typeof q == "function" && q.apply(this, arguments);
        });
      }
    }
    var s = t.appendFile;
    s && (t.appendFile = o);
    function o(b, T, B, G) {
      return typeof B == "function" && ((G = B), (B = null)), L(b, T, B, G);
      function L(X, R, N, q, z) {
        return s(X, R, N, function (P) {
          P && (P.code === "EMFILE" || P.code === "ENFILE")
            ? si([L, [X, R, N, q], P, z || Date.now(), Date.now()])
            : typeof q == "function" && q.apply(this, arguments);
        });
      }
    }
    var l = t.copyFile;
    l && (t.copyFile = a);
    function a(b, T, B, G) {
      return typeof B == "function" && ((G = B), (B = 0)), L(b, T, B, G);
      function L(X, R, N, q, z) {
        return l(X, R, N, function (P) {
          P && (P.code === "EMFILE" || P.code === "ENFILE")
            ? si([L, [X, R, N, q], P, z || Date.now(), Date.now()])
            : typeof q == "function" && q.apply(this, arguments);
        });
      }
    }
    var c = t.readdir;
    t.readdir = f;
    var u = /^v[0-5]\./;
    function f(b, T, B) {
      typeof T == "function" && ((B = T), (T = null));
      var G = u.test(process.version)
        ? function (R, N, q, z) {
            return c(R, L(R, N, q, z));
          }
        : function (R, N, q, z) {
            return c(R, N, L(R, N, q, z));
          };
      return G(b, T, B);
      function L(X, R, N, q) {
        return function (z, P) {
          z && (z.code === "EMFILE" || z.code === "ENFILE")
            ? si([G, [X, R, N], z, q || Date.now(), Date.now()])
            : (P && P.sort && P.sort(),
              typeof N == "function" && N.call(this, z, P));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var h = w0(t);
      (E = h.ReadStream), (w = h.WriteStream);
    }
    var p = t.ReadStream;
    p && ((E.prototype = Object.create(p.prototype)), (E.prototype.open = I));
    var d = t.WriteStream;
    d && ((w.prototype = Object.create(d.prototype)), (w.prototype.open = C)),
      Object.defineProperty(t, "ReadStream", {
        get: function () {
          return E;
        },
        set: function (b) {
          E = b;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t, "WriteStream", {
        get: function () {
          return w;
        },
        set: function (b) {
          w = b;
        },
        enumerable: !0,
        configurable: !0,
      });
    var m = E;
    Object.defineProperty(t, "FileReadStream", {
      get: function () {
        return m;
      },
      set: function (b) {
        m = b;
      },
      enumerable: !0,
      configurable: !0,
    });
    var v = w;
    Object.defineProperty(t, "FileWriteStream", {
      get: function () {
        return v;
      },
      set: function (b) {
        v = b;
      },
      enumerable: !0,
      configurable: !0,
    });
    function E(b, T) {
      return this instanceof E
        ? (p.apply(this, arguments), this)
        : E.apply(Object.create(E.prototype), arguments);
    }
    function I() {
      var b = this;
      U(b.path, b.flags, b.mode, function (T, B) {
        T
          ? (b.autoClose && b.destroy(), b.emit("error", T))
          : ((b.fd = B), b.emit("open", B), b.read());
      });
    }
    function w(b, T) {
      return this instanceof w
        ? (d.apply(this, arguments), this)
        : w.apply(Object.create(w.prototype), arguments);
    }
    function C() {
      var b = this;
      U(b.path, b.flags, b.mode, function (T, B) {
        T ? (b.destroy(), b.emit("error", T)) : ((b.fd = B), b.emit("open", B));
      });
    }
    function _(b, T) {
      return new t.ReadStream(b, T);
    }
    function $(b, T) {
      return new t.WriteStream(b, T);
    }
    var k = t.open;
    t.open = U;
    function U(b, T, B, G) {
      return typeof B == "function" && ((G = B), (B = null)), L(b, T, B, G);
      function L(X, R, N, q, z) {
        return k(X, R, N, function (P, be) {
          P && (P.code === "EMFILE" || P.code === "ENFILE")
            ? si([L, [X, R, N, q], P, z || Date.now(), Date.now()])
            : typeof q == "function" && q.apply(this, arguments);
        });
      }
    }
    return t;
  }
  function si(t) {
    Rt("ENQUEUE", t[0].name, t[1]), ke[Ne].push(t), gs();
  }
  var fr;
  function Cu() {
    for (var t = Date.now(), e = 0; e < ke[Ne].length; ++e)
      ke[Ne][e].length > 2 && ((ke[Ne][e][3] = t), (ke[Ne][e][4] = t));
    gs();
  }
  function gs() {
    if ((clearTimeout(fr), (fr = void 0), ke[Ne].length !== 0)) {
      var t = ke[Ne].shift(),
        e = t[0],
        i = t[1],
        r = t[2],
        n = t[3],
        s = t[4];
      if (n === void 0) Rt("RETRY", e.name, i), e.apply(null, i);
      else if (Date.now() - n >= 6e4) {
        Rt("TIMEOUT", e.name, i);
        var o = i.pop();
        typeof o == "function" && o.call(null, r);
      } else {
        var l = Date.now() - s,
          a = Math.max(s - n, 1),
          c = Math.min(a * 1.2, 100);
        l >= c
          ? (Rt("RETRY", e.name, i), e.apply(null, i.concat([n])))
          : ke[Ne].push(t);
      }
      fr === void 0 && (fr = setTimeout(gs, 0));
    }
  }
});
var Au = y((Vv, Tu) => {
  function Xe(t, e) {
    typeof e == "boolean" && (e = { forever: e }),
      (this._originalTimeouts = JSON.parse(JSON.stringify(t))),
      (this._timeouts = t),
      (this._options = e || {}),
      (this._maxRetryTime = (e && e.maxRetryTime) || 1 / 0),
      (this._fn = null),
      (this._errors = []),
      (this._attempts = 1),
      (this._operationTimeout = null),
      (this._operationTimeoutCb = null),
      (this._timeout = null),
      (this._operationStart = null),
      this._options.forever && (this._cachedTimeouts = this._timeouts.slice(0));
  }
  Tu.exports = Xe;
  Xe.prototype.reset = function () {
    (this._attempts = 1), (this._timeouts = this._originalTimeouts);
  };
  Xe.prototype.stop = function () {
    this._timeout && clearTimeout(this._timeout),
      (this._timeouts = []),
      (this._cachedTimeouts = null);
  };
  Xe.prototype.retry = function (t) {
    if ((this._timeout && clearTimeout(this._timeout), !t)) return !1;
    var e = new Date().getTime();
    if (t && e - this._operationStart >= this._maxRetryTime)
      return (
        this._errors.unshift(new Error("RetryOperation timeout occurred")), !1
      );
    this._errors.push(t);
    var i = this._timeouts.shift();
    if (i === void 0)
      if (this._cachedTimeouts)
        this._errors.splice(this._errors.length - 1, this._errors.length),
          (this._timeouts = this._cachedTimeouts.slice(0)),
          (i = this._timeouts.shift());
      else return !1;
    var r = this,
      n = setTimeout(function () {
        r._attempts++,
          r._operationTimeoutCb &&
            ((r._timeout = setTimeout(function () {
              r._operationTimeoutCb(r._attempts);
            }, r._operationTimeout)),
            r._options.unref && r._timeout.unref()),
          r._fn(r._attempts);
      }, i);
    return this._options.unref && n.unref(), !0;
  };
  Xe.prototype.attempt = function (t, e) {
    (this._fn = t),
      e &&
        (e.timeout && (this._operationTimeout = e.timeout),
        e.cb && (this._operationTimeoutCb = e.cb));
    var i = this;
    this._operationTimeoutCb &&
      (this._timeout = setTimeout(function () {
        i._operationTimeoutCb();
      }, i._operationTimeout)),
      (this._operationStart = new Date().getTime()),
      this._fn(this._attempts);
  };
  Xe.prototype.try = function (t) {
    console.log("Using RetryOperation.try() is deprecated"), this.attempt(t);
  };
  Xe.prototype.start = function (t) {
    console.log("Using RetryOperation.start() is deprecated"), this.attempt(t);
  };
  Xe.prototype.start = Xe.prototype.try;
  Xe.prototype.errors = function () {
    return this._errors;
  };
  Xe.prototype.attempts = function () {
    return this._attempts;
  };
  Xe.prototype.mainError = function () {
    if (this._errors.length === 0) return null;
    for (var t = {}, e = null, i = 0, r = 0; r < this._errors.length; r++) {
      var n = this._errors[r],
        s = n.message,
        o = (t[s] || 0) + 1;
      (t[s] = o), o >= i && ((e = n), (i = o));
    }
    return e;
  };
});
var Ru = y((Bt) => {
  var k0 = Au();
  Bt.operation = function (t) {
    var e = Bt.timeouts(t);
    return new k0(e, {
      forever: t && t.forever,
      unref: t && t.unref,
      maxRetryTime: t && t.maxRetryTime,
    });
  };
  Bt.timeouts = function (t) {
    if (t instanceof Array) return [].concat(t);
    var e = {
      retries: 10,
      factor: 2,
      minTimeout: 1 * 1e3,
      maxTimeout: 1 / 0,
      randomize: !1,
    };
    for (var i in t) e[i] = t[i];
    if (e.minTimeout > e.maxTimeout)
      throw new Error("minTimeout is greater than maxTimeout");
    for (var r = [], n = 0; n < e.retries; n++)
      r.push(this.createTimeout(n, e));
    return (
      t && t.forever && !r.length && r.push(this.createTimeout(n, e)),
      r.sort(function (s, o) {
        return s - o;
      }),
      r
    );
  };
  Bt.createTimeout = function (t, e) {
    var i = e.randomize ? Math.random() + 1 : 1,
      r = Math.round(i * e.minTimeout * Math.pow(e.factor, t));
    return (r = Math.min(r, e.maxTimeout)), r;
  };
  Bt.wrap = function (t, e, i) {
    if ((e instanceof Array && ((i = e), (e = null)), !i)) {
      i = [];
      for (var r in t) typeof t[r] == "function" && i.push(r);
    }
    for (var n = 0; n < i.length; n++) {
      var s = i[n],
        o = t[s];
      (t[s] = function (a) {
        var c = Bt.operation(e),
          u = Array.prototype.slice.call(arguments, 1),
          f = u.pop();
        u.push(function (h) {
          c.retry(h) ||
            (h && (arguments[0] = c.mainError()), f.apply(this, arguments));
        }),
          c.attempt(function () {
            a.apply(t, u);
          });
      }.bind(t, o)),
        (t[s].options = e);
    }
  };
});
var Lu = y((Gv, Bu) => {
  Bu.exports = Ru();
});
var Pu = y((zv, pr) => {
  pr.exports = ["SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM"];
  process.platform !== "win32" &&
    pr.exports.push(
      "SIGVTALRM",
      "SIGXCPU",
      "SIGXFSZ",
      "SIGUSR2",
      "SIGTRAP",
      "SIGSYS",
      "SIGQUIT",
      "SIGIOT"
    );
  process.platform === "linux" &&
    pr.exports.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
});
var Du = y((Wv, li) => {
  var Ee = global.process,
    Lt = function (t) {
      return (
        t &&
        typeof t == "object" &&
        typeof t.removeListener == "function" &&
        typeof t.emit == "function" &&
        typeof t.reallyExit == "function" &&
        typeof t.listeners == "function" &&
        typeof t.kill == "function" &&
        typeof t.pid == "number" &&
        typeof t.on == "function"
      );
    };
  Lt(Ee)
    ? ((Fu = require("assert")),
      (oi = Pu()),
      (Nu = /^win/i.test(Ee.platform)),
      (Li = require("events")),
      typeof Li != "function" && (Li = Li.EventEmitter),
      Ee.__signal_exit_emitter__
        ? (Be = Ee.__signal_exit_emitter__)
        : ((Be = Ee.__signal_exit_emitter__ = new Li()),
          (Be.count = 0),
          (Be.emitted = {})),
      Be.infinite || (Be.setMaxListeners(1 / 0), (Be.infinite = !0)),
      (li.exports = function (t, e) {
        if (!Lt(global.process)) return function () {};
        Fu.equal(
          typeof t,
          "function",
          "a callback must be provided for exit handler"
        ),
          ai === !1 && xs();
        var i = "exit";
        e && e.alwaysLast && (i = "afterexit");
        var r = function () {
          Be.removeListener(i, t),
            Be.listeners("exit").length === 0 &&
              Be.listeners("afterexit").length === 0 &&
              dr();
        };
        return Be.on(i, t), r;
      }),
      (dr = function () {
        !ai ||
          !Lt(global.process) ||
          ((ai = !1),
          oi.forEach(function (e) {
            try {
              Ee.removeListener(e, mr[e]);
            } catch {}
          }),
          (Ee.emit = gr),
          (Ee.reallyExit = _s),
          (Be.count -= 1));
      }),
      (li.exports.unload = dr),
      (Pt = function (e, i, r) {
        Be.emitted[e] || ((Be.emitted[e] = !0), Be.emit(e, i, r));
      }),
      (mr = {}),
      oi.forEach(function (t) {
        mr[t] = function () {
          if (Lt(global.process)) {
            var i = Ee.listeners(t);
            i.length === Be.count &&
              (dr(),
              Pt("exit", null, t),
              Pt("afterexit", null, t),
              Nu && t === "SIGHUP" && (t = "SIGINT"),
              Ee.kill(Ee.pid, t));
          }
        };
      }),
      (li.exports.signals = function () {
        return oi;
      }),
      (ai = !1),
      (xs = function () {
        ai ||
          !Lt(global.process) ||
          ((ai = !0),
          (Be.count += 1),
          (oi = oi.filter(function (e) {
            try {
              return Ee.on(e, mr[e]), !0;
            } catch {
              return !1;
            }
          })),
          (Ee.emit = Uu),
          (Ee.reallyExit = Mu));
      }),
      (li.exports.load = xs),
      (_s = Ee.reallyExit),
      (Mu = function (e) {
        Lt(global.process) &&
          ((Ee.exitCode = e || 0),
          Pt("exit", Ee.exitCode, null),
          Pt("afterexit", Ee.exitCode, null),
          _s.call(Ee, Ee.exitCode));
      }),
      (gr = Ee.emit),
      (Uu = function (e, i) {
        if (e === "exit" && Lt(global.process)) {
          i !== void 0 && (Ee.exitCode = i);
          var r = gr.apply(this, arguments);
          return (
            Pt("exit", Ee.exitCode, null), Pt("afterexit", Ee.exitCode, null), r
          );
        } else return gr.apply(this, arguments);
      }))
    : (li.exports = function () {
        return function () {};
      });
  var Fu, oi, Nu, Li, Be, dr, Pt, mr, ai, xs, _s, Mu, gr, Uu;
});
var Wu = y((Yv, zu) => {
  "use strict";
  var C0 = require("path"),
    Vu = Iu(),
    O0 = Lu(),
    I0 = Du(),
    _t = {},
    ju = Symbol();
  function T0(t, e, i) {
    let r = e[ju];
    if (r)
      return e.stat(t, (s, o) => {
        if (s) return i(s);
        i(null, o.mtime, r);
      });
    let n = new Date(Math.ceil(Date.now() / 1e3) * 1e3 + 5);
    e.utimes(t, n, n, (s) => {
      if (s) return i(s);
      e.stat(t, (o, l) => {
        if (o) return i(o);
        let a = l.mtime.getTime() % 1e3 === 0 ? "s" : "ms";
        Object.defineProperty(e, ju, { value: a }), i(null, l.mtime, a);
      });
    });
  }
  function A0(t) {
    let e = Date.now();
    return t === "s" && (e = Math.ceil(e / 1e3) * 1e3), new Date(e);
  }
  function xr(t, e) {
    return e.lockfilePath || `${t}.lock`;
  }
  function $u(t, e, i) {
    if (!e.realpath) return i(null, C0.resolve(t));
    e.fs.realpath(t, i);
  }
  function bs(t, e, i) {
    let r = xr(t, e);
    e.fs.mkdir(r, (n) => {
      if (!n)
        return T0(r, e.fs, (s, o, l) => {
          if (s) return e.fs.rmdir(r, () => {}), i(s);
          i(null, o, l);
        });
      if (n.code !== "EEXIST") return i(n);
      if (e.stale <= 0)
        return i(
          Object.assign(new Error("Lock file is already being held"), {
            code: "ELOCKED",
            file: t,
          })
        );
      e.fs.stat(r, (s, o) => {
        if (s) return s.code === "ENOENT" ? bs(t, { ...e, stale: 0 }, i) : i(s);
        if (!R0(o, e))
          return i(
            Object.assign(new Error("Lock file is already being held"), {
              code: "ELOCKED",
              file: t,
            })
          );
        Gu(t, e, (l) => {
          if (l) return i(l);
          bs(t, { ...e, stale: 0 }, i);
        });
      });
    });
  }
  function R0(t, e) {
    return t.mtime.getTime() < Date.now() - e.stale;
  }
  function Gu(t, e, i) {
    e.fs.rmdir(xr(t, e), (r) => {
      if (r && r.code !== "ENOENT") return i(r);
      i();
    });
  }
  function vr(t, e) {
    let i = _t[t];
    i.updateTimeout ||
      ((i.updateDelay = i.updateDelay || e.update),
      (i.updateTimeout = setTimeout(() => {
        (i.updateTimeout = null),
          e.fs.stat(i.lockfilePath, (r, n) => {
            let s = i.lastUpdate + e.stale < Date.now();
            if (r)
              return r.code === "ENOENT" || s
                ? ys(t, i, Object.assign(r, { code: "ECOMPROMISED" }))
                : ((i.updateDelay = 1e3), vr(t, e));
            if (!(i.mtime.getTime() === n.mtime.getTime()))
              return ys(
                t,
                i,
                Object.assign(
                  new Error("Unable to update lock within the stale threshold"),
                  { code: "ECOMPROMISED" }
                )
              );
            let l = A0(i.mtimePrecision);
            e.fs.utimes(i.lockfilePath, l, l, (a) => {
              let c = i.lastUpdate + e.stale < Date.now();
              if (!i.released) {
                if (a)
                  return a.code === "ENOENT" || c
                    ? ys(t, i, Object.assign(a, { code: "ECOMPROMISED" }))
                    : ((i.updateDelay = 1e3), vr(t, e));
                (i.mtime = l),
                  (i.lastUpdate = Date.now()),
                  (i.updateDelay = null),
                  vr(t, e);
              }
            });
          });
      }, i.updateDelay)),
      i.updateTimeout.unref && i.updateTimeout.unref());
  }
  function ys(t, e, i) {
    (e.released = !0),
      e.updateTimeout && clearTimeout(e.updateTimeout),
      _t[t] === e && delete _t[t],
      e.options.onCompromised(i);
  }
  function B0(t, e, i) {
    (e = {
      stale: 1e4,
      update: null,
      realpath: !0,
      retries: 0,
      fs: Vu,
      onCompromised: (r) => {
        throw r;
      },
      ...e,
    }),
      (e.retries = e.retries || 0),
      (e.retries =
        typeof e.retries == "number" ? { retries: e.retries } : e.retries),
      (e.stale = Math.max(e.stale || 0, 2e3)),
      (e.update = e.update == null ? e.stale / 2 : e.update || 0),
      (e.update = Math.max(Math.min(e.update, e.stale / 2), 1e3)),
      $u(t, e, (r, n) => {
        if (r) return i(r);
        let s = O0.operation(e.retries);
        s.attempt(() => {
          bs(n, e, (o, l, a) => {
            if (s.retry(o)) return;
            if (o) return i(s.mainError());
            let c = (_t[n] = {
              lockfilePath: xr(n, e),
              mtime: l,
              mtimePrecision: a,
              options: e,
              lastUpdate: Date.now(),
            });
            vr(n, e),
              i(null, (u) => {
                if (c.released)
                  return (
                    u &&
                    u(
                      Object.assign(new Error("Lock is already released"), {
                        code: "ERELEASED",
                      })
                    )
                  );
                L0(n, { ...e, realpath: !1 }, u);
              });
          });
        });
      });
  }
  function L0(t, e, i) {
    (e = { fs: Vu, realpath: !0, ...e }),
      $u(t, e, (r, n) => {
        if (r) return i(r);
        let s = _t[n];
        if (!s)
          return i(
            Object.assign(new Error("Lock is not acquired/owned by you"), {
              code: "ENOTACQUIRED",
            })
          );
        s.updateTimeout && clearTimeout(s.updateTimeout),
          (s.released = !0),
          delete _t[n],
          Gu(n, e, i);
      });
  }
  function qu(t) {
    return (...e) =>
      new Promise((i, r) => {
        e.push((n, s) => {
          n ? r(n) : i(s);
        }),
          t(...e);
      });
  }
  var Hu = !1;
  function P0() {
    Hu ||
      ((Hu = !0),
      I0(() => {
        for (let t in _t) {
          let e = _t[t].options;
          try {
            e.fs.rmdirSync(xr(t, e));
          } catch {}
        }
      }));
  }
  zu.exports.lock = async (t, e) => {
    P0();
    let i = await qu(B0)(t, e);
    return qu(i);
  };
});
var K0 = {};
df(K0, {
  HttpsProxyAgent: () => nf.HttpsProxyAgent,
  PNG: () => sf.PNG,
  SocksProxyAgent: () => af.SocksProxyAgent,
  StackUtils: () => $0,
  colors: () => F0,
  debug: () => N0,
  getProxyForUrl: () => rf.getProxyForUrl,
  jpegjs: () => M0,
  lockfile: () => D0,
  mime: () => j0,
  minimatch: () => q0,
  open: () => H0,
  program: () => of.program,
  progress: () => V0,
  ws: () => G0,
  wsReceiver: () => W0,
  wsSender: () => Y0,
  wsServer: () => z0,
});
module.exports = mf(K0);
var Yu = Te(co()),
  Ku = Te(Ht()),
  rf = Te(wo()),
  nf = Te(Ro()),
  Zu = Te(Uo()),
  Xu = Te(zo()),
  Ju = Te(pa()),
  Qu = Te(Oa()),
  sf = Te(wl()),
  of = Te(Fl()),
  ef = Te(jl()),
  af = Te(sc()),
  tf = Te(fc());
var d0 = Te(mc(), 1),
  fs = Te(Jn(), 1),
  hs = Te(es(), 1),
  gu = Te(ls(), 1),
  ps = Te(mu(), 1);
var vu = gu.default;
var F0 = Yu.default,
  N0 = Ku.default,
  M0 = Zu.default,
  U0 = Wu(),
  D0 = U0,
  j0 = Xu.default,
  q0 = Ju.default,
  H0 = Qu.default,
  V0 = ef.default,
  $0 = tf.default,
  G0 = vu,
  z0 = ps.default,
  W0 = fs.default,
  Y0 = hs.default;
0 &&
  (module.exports = {
    HttpsProxyAgent,
    PNG,
    SocksProxyAgent,
    StackUtils,
    colors,
    debug,
    getProxyForUrl,
    jpegjs,
    lockfile,
    mime,
    minimatch,
    open,
    program,
    progress,
    ws,
    wsReceiver,
    wsSender,
    wsServer,
  });
/*! Bundled license information:

progress/lib/node-progress.js:
  (*!
   * node-progress
   * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
   * MIT Licensed
   *)
*/
