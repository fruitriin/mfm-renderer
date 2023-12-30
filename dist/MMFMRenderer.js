import { openBlock as h, createElementBlock as N, Fragment as U, renderList as V, createElementVNode as w, normalizeClass as cd, normalizeStyle as O, toDisplayString as v, createCommentVNode as X, defineComponent as Q, createBlock as E, resolveDynamicComponent as fd, resolveComponent as C, createVNode as K, createTextVNode as J, withDirectives as md, vModelText as pd } from "vue";
const _d = {
  props: {
    children: Object,
    token: Object,
    plain: {
      type: Boolean,
      default: !1
    },
    className: String,
    nowrap: {
      type: Boolean,
      default: !1
    },
    note: Object,
    style: Object
  },
  methods: {
    showBr(e, f) {
      return f + 1 !== this.parsedText.length;
    }
  },
  computed: {
    parsedText() {
      return this.plain ? [this.token.text.replace(/\n/g, " ")] : this.token.text.split(/\r\n|\n|\r/);
    }
  }
}, k = (e, f) => {
  const u = e.__vccOpts || e;
  for (const [a, r] of f)
    u[a] = r;
  return u;
}, hd = { key: 0 };
function bd(e, f, u, a, r, d) {
  return h(!0), N(U, null, V(d.parsedText, (s, M) => (h(), N(U, null, [
    w("span", {
      class: cd(["text", [u.className, e.$attrs.class]]),
      style: O(u.style)
    }, v(s), 7),
    d.showBr(s, M) ? (h(), N("br", hd)) : X("", !0)
  ], 64))), 256);
}
const yd = /* @__PURE__ */ k(_d, [["render", bd]]);
var R = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, G = {}, A = {}, H = {}, F = {}, rd = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.createLanguage = e.lazy = e.lineEnd = e.lineBegin = e.char = e.newline = e.crlf = e.lf = e.cr = e.notMatch = e.alt = e.seq = e.regexp = e.str = e.Parser = e.failure = e.success = void 0;
  function f(y, p) {
    return {
      success: !0,
      value: p,
      index: y
    };
  }
  e.success = f;
  function u() {
    return { success: !1 };
  }
  e.failure = u;
  class a {
    constructor(p, m) {
      this.handler = (n, c, t) => {
        if (t.trace && this.name != null) {
          const o = `${c}`;
          console.log(`${o.padEnd(6, " ")}enter ${this.name}`);
          const _ = p(n, c, t);
          if (_.success) {
            const l = `${c}:${_.index}`;
            console.log(`${l.padEnd(6, " ")}match ${this.name}`);
          } else {
            const l = `${c}`;
            console.log(`${l.padEnd(6, " ")}fail ${this.name}`);
          }
          return _;
        }
        return p(n, c, t);
      }, this.name = m;
    }
    map(p) {
      return new a((m, n, c) => {
        const t = this.handler(m, n, c);
        return t.success ? f(t.index, p(t.value)) : t;
      });
    }
    text() {
      return new a((p, m, n) => {
        const c = this.handler(p, m, n);
        if (!c.success)
          return c;
        const t = p.slice(m, c.index);
        return f(c.index, t);
      });
    }
    many(p) {
      return new a((m, n, c) => {
        let t, o = n;
        const _ = [];
        for (; o < m.length && (t = this.handler(m, o, c), !!t.success); )
          o = t.index, _.push(t.value);
        return _.length < p ? u() : f(o, _);
      });
    }
    sep(p, m) {
      if (m < 1)
        throw new Error('"min" must be a value greater than or equal to 1.');
      return s([
        this,
        s([
          p,
          this
        ], 1).many(m - 1)
      ]).map((n) => [n[0], ...n[1]]);
    }
    option() {
      return M([
        this,
        I(null)
      ]);
    }
  }
  e.Parser = a;
  function r(y) {
    return new a((p, m, n) => p.length - m < y.length || p.substr(m, y.length) !== y ? u() : f(m + y.length, y));
  }
  e.str = r;
  function d(y) {
    const p = RegExp(`^(?:${y.source})`, y.flags);
    return new a((m, n, c) => {
      const t = m.slice(n), o = p.exec(t);
      return o == null ? u() : f(n + o[0].length, o[0]);
    });
  }
  e.regexp = d;
  function s(y, p) {
    return new a((m, n, c) => {
      let t, o = n;
      const _ = [];
      for (let l = 0; l < y.length; l++) {
        if (t = y[l].handler(m, o, c), !t.success)
          return t;
        o = t.index, _.push(t.value);
      }
      return f(o, p != null ? _[p] : _);
    });
  }
  e.seq = s;
  function M(y) {
    return new a((p, m, n) => {
      let c;
      for (let t = 0; t < y.length; t++)
        if (c = y[t].handler(p, m, n), c.success)
          return c;
      return u();
    });
  }
  e.alt = M;
  function I(y) {
    return new a((p, m, n) => f(m, y));
  }
  function q(y) {
    return new a((p, m, n) => y.handler(p, m, n).success ? u() : f(m, null));
  }
  e.notMatch = q, e.cr = r("\r"), e.lf = r(`
`), e.crlf = r(`\r
`), e.newline = M([e.crlf, e.cr, e.lf]), e.char = new a((y, p, m) => {
    if (y.length - p < 1)
      return u();
    const n = y.charAt(p);
    return f(p + 1, n);
  }), e.lineBegin = new a((y, p, m) => p === 0 || e.cr.handler(y, p - 1, m).success || e.lf.handler(y, p - 1, m).success ? f(p, null) : u()), e.lineEnd = new a((y, p, m) => p === y.length || e.cr.handler(y, p, m).success || e.lf.handler(y, p, m).success ? f(p, null) : u());
  function $(y) {
    const p = new a((m, n, c) => (p.handler = y().handler, p.handler(m, n, c)));
    return p;
  }
  e.lazy = $;
  function P(y) {
    const p = {};
    for (const m of Object.keys(y))
      p[m] = $(() => {
        const n = y[m](p);
        if (n == null)
          throw new Error("syntax must return a parser.");
        return n.name = m, n;
      });
    return p;
  }
  e.createLanguage = P;
})(rd);
var S = {}, Y = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.TEXT = e.PLAIN = e.FN = e.LINK = e.N_URL = e.HASHTAG = e.MENTION = e.MATH_INLINE = e.INLINE_CODE = e.STRIKE = e.ITALIC = e.SMALL = e.BOLD = e.EMOJI_CODE = e.UNI_EMOJI = e.CENTER = e.MATH_BLOCK = e.CODE_BLOCK = e.SEARCH = e.QUOTE = e.isMfmBlock = void 0;
  const f = ["quote", "search", "blockCode", "mathBlock", "center"];
  function u(i) {
    return f.includes(i.type);
  }
  e.isMfmBlock = u;
  const a = (i) => ({ type: "quote", children: i });
  e.QUOTE = a;
  const r = (i, T) => ({ type: "search", props: { query: i, content: T } });
  e.SEARCH = r;
  const d = (i, T) => ({ type: "blockCode", props: { code: i, lang: T } });
  e.CODE_BLOCK = d;
  const s = (i) => ({ type: "mathBlock", props: { formula: i } });
  e.MATH_BLOCK = s;
  const M = (i) => ({ type: "center", children: i });
  e.CENTER = M;
  const I = (i) => ({ type: "unicodeEmoji", props: { emoji: i } });
  e.UNI_EMOJI = I;
  const q = (i) => ({ type: "emojiCode", props: { name: i } });
  e.EMOJI_CODE = q;
  const $ = (i) => ({ type: "bold", children: i });
  e.BOLD = $;
  const P = (i) => ({ type: "small", children: i });
  e.SMALL = P;
  const y = (i) => ({ type: "italic", children: i });
  e.ITALIC = y;
  const p = (i) => ({ type: "strike", children: i });
  e.STRIKE = p;
  const m = (i) => ({ type: "inlineCode", props: { code: i } });
  e.INLINE_CODE = m;
  const n = (i) => ({ type: "mathInline", props: { formula: i } });
  e.MATH_INLINE = n;
  const c = (i, T, j) => ({ type: "mention", props: { username: i, host: T, acct: j } });
  e.MENTION = c;
  const t = (i) => ({ type: "hashtag", props: { hashtag: i } });
  e.HASHTAG = t;
  const o = (i, T) => {
    const j = { type: "url", props: { url: i } };
    return T && (j.props.brackets = T), j;
  };
  e.N_URL = o;
  const _ = (i, T, j) => ({ type: "link", props: { silent: i, url: T }, children: j });
  e.LINK = _;
  const l = (i, T, j) => ({ type: "fn", props: { name: i, args: T }, children: j });
  e.FN = l;
  const b = (i) => ({ type: "plain", children: [(0, e.TEXT)(i)] });
  e.PLAIN = b;
  const g = (i) => ({ type: "text", props: { text: i } });
  e.TEXT = g;
})(Y);
Object.defineProperty(S, "__esModule", { value: !0 });
S.inspectOne = S.stringifyTree = S.stringifyNode = S.mergeText = void 0;
const W = Y;
function gd(e) {
  const f = [], u = [];
  function a() {
    u.length > 0 && (f.push((0, W.TEXT)(u.join(""))), u.length = 0);
  }
  const r = e.flat(1);
  for (const d of r)
    typeof d == "string" ? u.push(d) : !Array.isArray(d) && d.type === "text" ? u.push(d.props.text) : (a(), f.push(d));
  return a(), f;
}
S.mergeText = gd;
function sd(e) {
  var f;
  switch (e.type) {
    case "quote":
      return B(e.children).split(`
`).map((u) => `> ${u}`).join(`
`);
    case "search":
      return e.props.content;
    case "blockCode":
      return `\`\`\`${(f = e.props.lang) !== null && f !== void 0 ? f : ""}
${e.props.code}
\`\`\``;
    case "mathBlock":
      return `\\[
${e.props.formula}
\\]`;
    case "center":
      return `<center>
${B(e.children)}
</center>`;
    case "emojiCode":
      return `:${e.props.name}:`;
    case "unicodeEmoji":
      return e.props.emoji;
    case "bold":
      return `**${B(e.children)}**`;
    case "small":
      return `<small>${B(e.children)}</small>`;
    case "italic":
      return `<i>${B(e.children)}</i>`;
    case "strike":
      return `~~${B(e.children)}~~`;
    case "inlineCode":
      return `\`${e.props.code}\``;
    case "mathInline":
      return `\\(${e.props.formula}\\)`;
    case "mention":
      return e.props.acct;
    case "hashtag":
      return `#${e.props.hashtag}`;
    case "url":
      return e.props.brackets ? `<${e.props.url}>` : e.props.url;
    case "link":
      return `${e.props.silent ? "?" : ""}[${B(e.children)}](${e.props.url})`;
    case "fn": {
      const u = Object.keys(e.props.args).map((r) => {
        const d = e.props.args[r];
        return d === !0 ? r : `${r}=${d}`;
      }), a = u.length > 0 ? "." + u.join(",") : "";
      return `$[${e.props.name}${a} ${B(e.children)}]`;
    }
    case "plain":
      return `<plain>
${B(e.children)}
</plain>`;
    case "text":
      return e.props.text;
  }
  throw new Error("unknown mfm node");
}
S.stringifyNode = sd;
var D;
(function(e) {
  e[e.none = 0] = "none", e[e.inline = 1] = "inline", e[e.block = 2] = "block";
})(D || (D = {}));
function B(e) {
  const f = [];
  let u = D.none;
  for (const a of e) {
    let r = !0;
    (0, W.isMfmBlock)(a) ? (u === D.none && (r = !1), u = D.block) : ((u === D.none || u === D.inline) && (r = !1), u = D.inline), r && f.push((0, W.TEXT)(`
`)), f.push(a);
  }
  return f.map((a) => sd(a)).join("");
}
S.stringifyTree = B;
function od(e, f) {
  if (f(e), e.children != null)
    for (const u of e.children)
      od(u, f);
}
S.inspectOne = od;
var Z = {};
Object.defineProperty(Z, "__esModule", {
  value: !0
});
Z.default = /(?:\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83e\udef1\ud83c\udffb\u200d\ud83e\udef2\ud83c[\udffc-\udfff]|\ud83e\udef1\ud83c\udffc\u200d\ud83e\udef2\ud83c[\udffb\udffd-\udfff]|\ud83e\udef1\ud83c\udffd\u200d\ud83e\udef2\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\udef1\ud83c\udffe\u200d\ud83e\udef2\ud83c[\udffb-\udffd\udfff]|\ud83e\udef1\ud83c\udfff\u200d\ud83e\udef2\ud83c[\udffb-\udffe]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d\udc8f\ud83c[\udffb-\udfff]|\ud83d\udc91\ud83c[\udffb-\udfff]|\ud83e\udd1d\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d\udc8f\udc91]|\ud83e\udd1d)|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf7c\udf84\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc70\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd4\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83d\ude36\u200d\ud83c\udf2b\ufe0f|\u2764\ufe0f\u200d\ud83d\udd25|\u2764\ufe0f\u200d\ud83e\ude79|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc3b\u200d\u2744\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83d\ude2e\u200d\ud83d\udca8|\ud83d\ude35\u200d\ud83d\udcab|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f|\ud83d\udc08\u200d\u2b1b|\ud83d\udc26\u200d\u2b1b)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|\ud83e\udef0|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0c\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\udd77\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd\udec3-\udec5\udef1-\udef8]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udc8e\udc90\udc92-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5-\uded7\udedc-\udedf\udeeb\udeec\udef4-\udefc\udfe0-\udfeb\udff0]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd76\udd78-\uddb4\uddb7\uddba\uddbc-\uddcc\uddd0\uddde-\uddff\ude70-\ude7c\ude80-\ude88\ude90-\udebd\udebf-\udec2\udece-\udedb\udee0-\udee8]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g;
var dd;
function $d() {
  if (dd)
    return F;
  dd = 1;
  var e = R && R.__createBinding || (Object.create ? function(n, c, t, o) {
    o === void 0 && (o = t);
    var _ = Object.getOwnPropertyDescriptor(c, t);
    (!_ || ("get" in _ ? !c.__esModule : _.writable || _.configurable)) && (_ = { enumerable: !0, get: function() {
      return c[t];
    } }), Object.defineProperty(n, o, _);
  } : function(n, c, t, o) {
    o === void 0 && (o = t), n[o] = c[t];
  }), f = R && R.__setModuleDefault || (Object.create ? function(n, c) {
    Object.defineProperty(n, "default", { enumerable: !0, value: c });
  } : function(n, c) {
    n.default = c;
  }), u = R && R.__importStar || function(n) {
    if (n && n.__esModule)
      return n;
    var c = {};
    if (n != null)
      for (var t in n)
        t !== "default" && Object.prototype.hasOwnProperty.call(n, t) && e(c, n, t);
    return f(c, n), c;
  }, a = R && R.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(F, "__esModule", { value: !0 }), F.language = void 0;
  const r = u(ad()), d = u(rd), s = S, M = a(Z), I = d.regexp(/[\u0020\u3000\t]/), q = d.regexp(/[a-z0-9]/i), $ = d.alt([d.crlf, d.cr, d.lf]);
  function P(n) {
    return new d.Parser((c, t, o) => {
      const _ = [];
      let l = t;
      for (let b = 0; b < n.length; b++) {
        const g = n[b].handler(c, l, o);
        if (!g.success)
          return l === t ? d.failure() : d.success(l, c.slice(t, l));
        _.push(g.value), l = g.index;
      }
      return d.success(l, _);
    });
  }
  const y = new d.Parser((n, c, t) => t.linkLabel ? d.failure() : d.success(c, null)), p = new d.Parser((n, c, t) => t.depth < t.nestLimit ? d.success(c, null) : d.failure());
  function m(n, c) {
    const t = d.alt([
      d.seq([p, n], 1),
      c ?? d.char
    ]);
    return new d.Parser((o, _, l) => {
      l.depth++;
      const b = t.handler(o, _, l);
      return l.depth--, b;
    });
  }
  return F.language = d.createLanguage({
    fullParser: (n) => n.full.many(0),
    simpleParser: (n) => n.simple.many(0),
    full: (n) => d.alt([
      n.unicodeEmoji,
      n.centerTag,
      n.smallTag,
      n.plainTag,
      n.boldTag,
      n.italicTag,
      n.strikeTag,
      n.urlAlt,
      n.big,
      n.boldAsta,
      n.italicAsta,
      n.boldUnder,
      n.italicUnder,
      n.codeBlock,
      n.inlineCode,
      n.quote,
      n.mathBlock,
      n.mathInline,
      n.strikeWave,
      n.fn,
      n.mention,
      n.hashtag,
      n.emojiCode,
      n.link,
      n.url,
      n.search,
      n.text
    ]),
    simple: (n) => d.alt([
      n.unicodeEmoji,
      n.emojiCode,
      n.text
    ]),
    inline: (n) => d.alt([
      n.unicodeEmoji,
      n.smallTag,
      n.plainTag,
      n.boldTag,
      n.italicTag,
      n.strikeTag,
      n.urlAlt,
      n.big,
      n.boldAsta,
      n.italicAsta,
      n.boldUnder,
      n.italicUnder,
      n.inlineCode,
      n.mathInline,
      n.strikeWave,
      n.fn,
      n.mention,
      n.hashtag,
      n.emojiCode,
      n.link,
      n.url,
      n.text
    ]),
    quote: (n) => {
      const c = d.seq([
        d.str(">"),
        I.option(),
        d.seq([d.notMatch($), d.char], 1).many(0).text()
      ], 2).sep($, 1), t = d.seq([
        $.option(),
        $.option(),
        d.lineBegin,
        c,
        $.option(),
        $.option()
      ], 3);
      return new d.Parser((o, _, l) => {
        let b;
        if (b = t.handler(o, _, l), !b.success)
          return b;
        const g = b.value, i = b.index;
        return g.length === 1 && g[0].length === 0 ? d.failure() : (b = m(n.fullParser).many(0).handler(g.join(`
`), 0, l), b.success ? d.success(i, r.QUOTE((0, s.mergeText)(b.value))) : b);
      });
    },
    codeBlock: (n) => {
      const c = d.str("```");
      return d.seq([
        $.option(),
        d.lineBegin,
        c,
        d.seq([d.notMatch($), d.char], 1).many(0),
        $,
        d.seq([d.notMatch(d.seq([$, c, d.lineEnd])), d.char], 1).many(1),
        $,
        c,
        d.lineEnd,
        $.option()
      ]).map((t) => {
        const o = t[3].join("").trim(), _ = t[5].join("");
        return r.CODE_BLOCK(_, o.length > 0 ? o : null);
      });
    },
    mathBlock: (n) => {
      const c = d.str("\\["), t = d.str("\\]");
      return d.seq([
        $.option(),
        d.lineBegin,
        c,
        $.option(),
        d.seq([d.notMatch(d.seq([$.option(), t])), d.char], 1).many(1),
        $.option(),
        t,
        d.lineEnd,
        $.option()
      ]).map((o) => {
        const _ = o[4].join("");
        return r.MATH_BLOCK(_);
      });
    },
    centerTag: (n) => {
      const c = d.str("<center>"), t = d.str("</center>");
      return d.seq([
        $.option(),
        d.lineBegin,
        c,
        $.option(),
        d.seq([d.notMatch(d.seq([$.option(), t])), m(n.inline)], 1).many(1),
        $.option(),
        t,
        d.lineEnd,
        $.option()
      ]).map((o) => r.CENTER((0, s.mergeText)(o[4])));
    },
    big: (n) => {
      const c = d.str("***");
      return P([
        c,
        d.seq([d.notMatch(c), m(n.inline)], 1).many(1),
        c
      ]).map((t) => typeof t == "string" ? t : r.FN("tada", {}, (0, s.mergeText)(t[1])));
    },
    boldAsta: (n) => {
      const c = d.str("**");
      return P([
        c,
        d.seq([d.notMatch(c), m(n.inline)], 1).many(1),
        c
      ]).map((t) => typeof t == "string" ? t : r.BOLD((0, s.mergeText)(t[1])));
    },
    boldTag: (n) => {
      const c = d.str("<b>"), t = d.str("</b>");
      return P([
        c,
        d.seq([d.notMatch(t), m(n.inline)], 1).many(1),
        t
      ]).map((o) => typeof o == "string" ? o : r.BOLD((0, s.mergeText)(o[1])));
    },
    boldUnder: (n) => {
      const c = d.str("__");
      return d.seq([
        c,
        d.alt([q, I]).many(1),
        c
      ]).map((t) => r.BOLD((0, s.mergeText)(t[1])));
    },
    smallTag: (n) => {
      const c = d.str("<small>"), t = d.str("</small>");
      return P([
        c,
        d.seq([d.notMatch(t), m(n.inline)], 1).many(1),
        t
      ]).map((o) => typeof o == "string" ? o : r.SMALL((0, s.mergeText)(o[1])));
    },
    italicTag: (n) => {
      const c = d.str("<i>"), t = d.str("</i>");
      return P([
        c,
        d.seq([d.notMatch(t), m(n.inline)], 1).many(1),
        t
      ]).map((o) => typeof o == "string" ? o : r.ITALIC((0, s.mergeText)(o[1])));
    },
    italicAsta: (n) => {
      const c = d.str("*"), t = d.seq([
        c,
        d.alt([q, I]).many(1),
        c
      ]);
      return new d.Parser((o, _, l) => {
        const b = t.handler(o, _, l);
        if (!b.success)
          return d.failure();
        const g = o.slice(0, _);
        return /[a-z0-9]$/i.test(g) ? d.failure() : d.success(b.index, r.ITALIC((0, s.mergeText)(b.value[1])));
      });
    },
    italicUnder: (n) => {
      const c = d.str("_"), t = d.seq([
        c,
        d.alt([q, I]).many(1),
        c
      ]);
      return new d.Parser((o, _, l) => {
        const b = t.handler(o, _, l);
        if (!b.success)
          return d.failure();
        const g = o.slice(0, _);
        return /[a-z0-9]$/i.test(g) ? d.failure() : d.success(b.index, r.ITALIC((0, s.mergeText)(b.value[1])));
      });
    },
    strikeTag: (n) => {
      const c = d.str("<s>"), t = d.str("</s>");
      return P([
        c,
        d.seq([d.notMatch(t), m(n.inline)], 1).many(1),
        t
      ]).map((o) => typeof o == "string" ? o : r.STRIKE((0, s.mergeText)(o[1])));
    },
    strikeWave: (n) => {
      const c = d.str("~~");
      return P([
        c,
        d.seq([d.notMatch(d.alt([c, $])), m(n.inline)], 1).many(1),
        c
      ]).map((t) => typeof t == "string" ? t : r.STRIKE((0, s.mergeText)(t[1])));
    },
    unicodeEmoji: (n) => {
      const c = RegExp(M.default.source);
      return d.regexp(c).map((t) => r.UNI_EMOJI(t));
    },
    plainTag: (n) => {
      const c = d.str("<plain>"), t = d.str("</plain>");
      return d.seq([
        c,
        $.option(),
        d.seq([
          d.notMatch(d.seq([$.option(), t])),
          d.char
        ], 1).many(1).text(),
        $.option(),
        t
      ], 2).map((o) => r.PLAIN(o));
    },
    fn: (n) => {
      const c = new d.Parser((l, b, g) => {
        const i = d.regexp(/[a-z0-9_]+/i).handler(l, b, g);
        return i.success ? d.success(i.index, i.value) : i;
      }), t = d.seq([
        d.regexp(/[a-z0-9_]+/i),
        d.seq([
          d.str("="),
          d.regexp(/[a-z0-9_.-]+/i)
        ], 1).option()
      ]).map((l) => ({
        k: l[0],
        v: l[1] != null ? l[1] : !0
      })), o = d.seq([
        d.str("."),
        t.sep(d.str(","), 1)
      ], 1).map((l) => {
        const b = {};
        for (const g of l)
          b[g.k] = g.v;
        return b;
      }), _ = d.str("]");
      return P([
        d.str("$["),
        c,
        o.option(),
        d.str(" "),
        d.seq([d.notMatch(_), m(n.inline)], 1).many(1),
        _
      ]).map((l) => {
        if (typeof l == "string")
          return l;
        const b = l[1], g = l[2] || {}, i = l[4];
        return r.FN(b, g, (0, s.mergeText)(i));
      });
    },
    inlineCode: (n) => {
      const c = d.str("`");
      return d.seq([
        c,
        d.seq([
          d.notMatch(d.alt([c, d.str("´"), $])),
          d.char
        ], 1).many(1),
        c
      ]).map((t) => r.INLINE_CODE(t[1].join("")));
    },
    mathInline: (n) => {
      const c = d.str("\\("), t = d.str("\\)");
      return d.seq([
        c,
        d.seq([
          d.notMatch(d.alt([t, $])),
          d.char
        ], 1).many(1),
        t
      ]).map((o) => r.MATH_INLINE(o[1].join("")));
    },
    mention: (n) => {
      const c = d.seq([
        y,
        d.str("@"),
        d.regexp(/[a-z0-9_-]+/i),
        d.seq([
          d.str("@"),
          d.regexp(/[a-z0-9_.-]+/i)
        ], 1).option()
      ]);
      return new d.Parser((t, o, _) => {
        let l;
        if (l = c.handler(t, o, _), !l.success)
          return d.failure();
        const b = t.slice(0, o);
        if (/[a-z0-9]$/i.test(b))
          return d.failure();
        let g = !1;
        const i = l.index, T = l.value[2], j = l.value[3];
        let L = j;
        j != null && (l = /[.-]+$/.exec(j), l != null && (L = j.slice(0, -1 * l[0].length), L.length === 0 && (g = !0, L = null)));
        let z = T;
        if (l = /-+$/.exec(T), l != null && (L == null ? z = T.slice(0, -1 * l[0].length) : g = !0), (z.length === 0 || z[0] === "-") && (g = !0), L != null && /^[.-]/.test(L) && (g = !0), g)
          return d.success(i, t.slice(o, i));
        const x = L != null ? `@${z}@${L}` : `@${z}`;
        return d.success(o + x.length, r.MENTION(z, L, x));
      });
    },
    hashtag: (n) => {
      const c = d.str("#"), t = d.seq([
        d.notMatch(d.alt([d.regexp(/[ \u3000\t.,!?'"#:/[\]【】()「」（）<>]/), I, $])),
        d.char
      ], 1), o = d.lazy(() => d.alt([
        d.seq([
          d.str("("),
          m(o, t).many(0),
          d.str(")")
        ]),
        d.seq([
          d.str("["),
          m(o, t).many(0),
          d.str("]")
        ]),
        d.seq([
          d.str("「"),
          m(o, t).many(0),
          d.str("」")
        ]),
        d.seq([
          d.str("（"),
          m(o, t).many(0),
          d.str("）")
        ]),
        t
      ])), _ = d.seq([
        y,
        c,
        o.many(1).text()
      ], 2);
      return new d.Parser((l, b, g) => {
        const i = _.handler(l, b, g);
        if (!i.success)
          return d.failure();
        const T = l.slice(0, b);
        if (/[a-z0-9]$/i.test(T))
          return d.failure();
        const j = i.index, L = i.value;
        return /^[0-9]+$/.test(L) ? d.failure() : d.success(j, r.HASHTAG(L));
      });
    },
    emojiCode: (n) => {
      const c = d.notMatch(d.regexp(/[a-z0-9]/i)), t = d.str(":");
      return d.seq([
        d.alt([d.lineBegin, c]),
        t,
        d.regexp(/[a-z0-9_+-]+/i),
        t,
        d.alt([d.lineEnd, c])
      ], 2).map((o) => r.EMOJI_CODE(o));
    },
    link: (n) => {
      const c = new d.Parser((o, _, l) => {
        l.linkLabel = !0;
        const b = n.inline.handler(o, _, l);
        return l.linkLabel = !1, b;
      }), t = d.str("]");
      return d.seq([
        y,
        d.alt([d.str("?["), d.str("[")]),
        d.seq([
          d.notMatch(d.alt([t, $])),
          m(c)
        ], 1).many(1),
        t,
        d.str("("),
        d.alt([n.urlAlt, n.url]),
        d.str(")")
      ]).map((o) => {
        const _ = o[1] === "?[", l = o[2], b = o[5];
        return r.LINK(_, b.props.url, (0, s.mergeText)(l));
      });
    },
    url: (n) => {
      const c = d.regexp(/[.,a-z0-9_/:%#@$&?!~=+-]/i), t = d.lazy(() => d.alt([
        d.seq([
          d.str("("),
          m(t, c).many(0),
          d.str(")")
        ]),
        d.seq([
          d.str("["),
          m(t, c).many(0),
          d.str("]")
        ]),
        c
      ])), o = d.seq([
        y,
        d.regexp(/https?:\/\//),
        t.many(1).text()
      ]);
      return new d.Parser((_, l, b) => {
        let g;
        if (g = o.handler(_, l, b), !g.success)
          return d.failure();
        const i = g.index;
        let T = i;
        const j = g.value[1];
        let L = g.value[2];
        return g = /[.,]+$/.exec(L), g != null && (T -= g[0].length, L = L.slice(0, -1 * g[0].length), L.length === 0) ? d.success(i, _.slice(l, i)) : d.success(T, r.N_URL(j + L, !1));
      });
    },
    urlAlt: (n) => {
      const c = d.str("<"), t = d.str(">"), o = d.seq([
        y,
        c,
        d.regexp(/https?:\/\//),
        d.seq([d.notMatch(d.alt([t, I])), d.char], 1).many(1),
        t
      ]).text();
      return new d.Parser((_, l, b) => {
        const g = o.handler(_, l, b);
        if (!g.success)
          return d.failure();
        const i = g.value.slice(1, g.value.length - 1);
        return d.success(g.index, r.N_URL(i, !0));
      });
    },
    search: (n) => {
      const c = d.alt([
        d.regexp(/\[(検索|search)\]/i),
        d.regexp(/(検索|search)/i)
      ]);
      return d.seq([
        $.option(),
        d.lineBegin,
        d.seq([
          d.notMatch(d.alt([
            $,
            d.seq([I, c, d.lineEnd])
          ])),
          d.char
        ], 1).many(1),
        I,
        c,
        d.lineEnd,
        $.option()
      ]).map((t) => {
        const o = t[2].join("");
        return r.SEARCH(o, `${o}${t[3]}${t[4]}`);
      });
    },
    text: (n) => d.char
  }), F;
}
var ed;
function kd() {
  if (ed)
    return H;
  ed = 1, Object.defineProperty(H, "__esModule", { value: !0 }), H.simpleParser = H.fullParser = void 0;
  const e = $d(), f = S;
  function u(r, d) {
    const s = e.language.fullParser.handler(r, 0, {
      nestLimit: d.nestLimit != null ? d.nestLimit : 20,
      depth: 0,
      linkLabel: !1,
      trace: !1
    });
    return (0, f.mergeText)(s.value);
  }
  H.fullParser = u;
  function a(r) {
    const d = e.language.simpleParser.handler(r, 0, {});
    return (0, f.mergeText)(d.value);
  }
  return H.simpleParser = a, H;
}
var ud;
function Nd() {
  if (ud)
    return A;
  ud = 1, Object.defineProperty(A, "__esModule", { value: !0 }), A.extract = A.inspect = A.toString = A.parseSimple = A.parse = void 0;
  const e = kd(), f = S;
  function u(M, I = {}) {
    return (0, e.fullParser)(M, {
      nestLimit: I.nestLimit
    });
  }
  A.parse = u;
  function a(M) {
    return (0, e.simpleParser)(M);
  }
  A.parseSimple = a;
  function r(M) {
    return Array.isArray(M) ? (0, f.stringifyTree)(M) : (0, f.stringifyNode)(M);
  }
  A.toString = r;
  function d(M, I) {
    if (Array.isArray(M))
      for (const q of M)
        (0, f.inspectOne)(q, I);
    else
      (0, f.inspectOne)(M, I);
  }
  A.inspect = d;
  function s(M, I) {
    const q = [];
    return d(M, ($) => {
      I($) && q.push($);
    }), q;
  }
  return A.extract = s, A;
}
var nd;
function ad() {
  return nd || (nd = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.TEXT = e.PLAIN = e.FN = e.LINK = e.N_URL = e.HASHTAG = e.MENTION = e.MATH_INLINE = e.INLINE_CODE = e.STRIKE = e.ITALIC = e.SMALL = e.BOLD = e.EMOJI_CODE = e.UNI_EMOJI = e.CENTER = e.MATH_BLOCK = e.CODE_BLOCK = e.SEARCH = e.QUOTE = e.extract = e.inspect = e.toString = e.parseSimple = e.parse = void 0;
    var f = Nd();
    Object.defineProperty(e, "parse", { enumerable: !0, get: function() {
      return f.parse;
    } }), Object.defineProperty(e, "parseSimple", { enumerable: !0, get: function() {
      return f.parseSimple;
    } }), Object.defineProperty(e, "toString", { enumerable: !0, get: function() {
      return f.toString;
    } }), Object.defineProperty(e, "inspect", { enumerable: !0, get: function() {
      return f.inspect;
    } }), Object.defineProperty(e, "extract", { enumerable: !0, get: function() {
      return f.extract;
    } });
    var u = Y;
    Object.defineProperty(e, "QUOTE", { enumerable: !0, get: function() {
      return u.QUOTE;
    } }), Object.defineProperty(e, "SEARCH", { enumerable: !0, get: function() {
      return u.SEARCH;
    } }), Object.defineProperty(e, "CODE_BLOCK", { enumerable: !0, get: function() {
      return u.CODE_BLOCK;
    } }), Object.defineProperty(e, "MATH_BLOCK", { enumerable: !0, get: function() {
      return u.MATH_BLOCK;
    } }), Object.defineProperty(e, "CENTER", { enumerable: !0, get: function() {
      return u.CENTER;
    } }), Object.defineProperty(e, "UNI_EMOJI", { enumerable: !0, get: function() {
      return u.UNI_EMOJI;
    } }), Object.defineProperty(e, "EMOJI_CODE", { enumerable: !0, get: function() {
      return u.EMOJI_CODE;
    } }), Object.defineProperty(e, "BOLD", { enumerable: !0, get: function() {
      return u.BOLD;
    } }), Object.defineProperty(e, "SMALL", { enumerable: !0, get: function() {
      return u.SMALL;
    } }), Object.defineProperty(e, "ITALIC", { enumerable: !0, get: function() {
      return u.ITALIC;
    } }), Object.defineProperty(e, "STRIKE", { enumerable: !0, get: function() {
      return u.STRIKE;
    } }), Object.defineProperty(e, "INLINE_CODE", { enumerable: !0, get: function() {
      return u.INLINE_CODE;
    } }), Object.defineProperty(e, "MATH_INLINE", { enumerable: !0, get: function() {
      return u.MATH_INLINE;
    } }), Object.defineProperty(e, "MENTION", { enumerable: !0, get: function() {
      return u.MENTION;
    } }), Object.defineProperty(e, "HASHTAG", { enumerable: !0, get: function() {
      return u.HASHTAG;
    } }), Object.defineProperty(e, "N_URL", { enumerable: !0, get: function() {
      return u.N_URL;
    } }), Object.defineProperty(e, "LINK", { enumerable: !0, get: function() {
      return u.LINK;
    } }), Object.defineProperty(e, "FN", { enumerable: !0, get: function() {
      return u.FN;
    } }), Object.defineProperty(e, "PLAIN", { enumerable: !0, get: function() {
      return u.PLAIN;
    } }), Object.defineProperty(e, "TEXT", { enumerable: !0, get: function() {
      return u.TEXT;
    } });
  }(G)), G;
}
var td = ad();
function Cd(e, f) {
  return e == null || e === "" ? [] : f ? td.parseSimple(e) : td.parse(e);
}
function ld(e) {
  return e.replace(
    /(^.)(.*)/,
    (f, u, a) => `${u.toUpperCase() + a}`
  );
}
const Md = Q({
  data() {
    return {
      debugMode: this.debugMode
    };
  },
  props: {
    tokens: {
      required: !0,
      type: Object
    },
    style: Object,
    className: String,
    class: String
  },
  methods: {
    getComponent: ld
  }
}), Od = {
  key: 0,
  style: { border: "solid 1px red" }
};
function Td(e, f, u, a, r, d) {
  return h(), N(U, null, [
    (h(!0), N(U, null, V(e.tokens, (s) => (h(), E(fd(`${e.getComponent(s.type)}`), {
      style: O(e.style),
      className: e.className,
      token: s.props,
      children: s.children
    }, null, 8, ["style", "className", "token", "children"]))), 256)),
    e.debugMode ? (h(), N("div", Od, [
      (h(!0), N(U, null, V(e.tokens, (s) => (h(), N("div", null, [
        w("p", null, "Selected: " + v(e.getComponent(s.type)), 1),
        w("pre", null, v(s), 1)
      ]))), 256))
    ])) : X("", !0)
  ], 64);
}
const id = /* @__PURE__ */ k(Md, [["render", Td]]), Ed = {
  props: ["children"]
}, Id = { class: "bold" };
function Ld(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), N("b", Id, [
    K(s, { tokens: u.children }, null, 8, ["tokens"])
  ]);
}
const jd = /* @__PURE__ */ k(Ed, [["render", Ld]]), vd = {
  props: ["children"]
}, qd = { class: "italic" };
function Ad(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), N("i", qd, [
    K(s, { tokens: u.children }, null, 8, ["tokens"])
  ]);
}
const Pd = /* @__PURE__ */ k(vd, [["render", Ad]]), Sd = {
  props: ["children"]
}, Bd = {
  class: "quote",
  style: { display: "block", margin: "8px", padding: "6px 0px 6px 12px", color: "var(--fg)", "border-left": "solid 3px var(--fg)", opacity: "0.7" }
};
function wd(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), N("div", Bd, [
    K(s, { tokens: u.children }, null, 8, ["tokens"])
  ]);
}
const Rd = /* @__PURE__ */ k(Sd, [["render", wd]]), Dd = {
  props: ["children", "token", "style"]
}, Hd = {
  class: "small",
  style: { opacity: "0.7" }
};
function Ud(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), N("small", Hd, [
    K(s, { tokens: u.children }, null, 8, ["tokens"])
  ]);
}
const Kd = /* @__PURE__ */ k(Dd, [["render", Ud]]), zd = {
  props: ["children", "class", "className"]
}, Fd = { class: "center" };
function Jd(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), N("div", Fd, [
    K(s, { tokens: u.children }, null, 8, ["tokens"])
  ]);
}
const Qd = /* @__PURE__ */ k(zd, [["render", Jd]]), Xd = Q({
  inject: ["emojis"],
  data() {
    return {
      emojis: this.emojis
    };
  },
  props: ["token", "children", "className", "class", "style"]
}), Gd = ["src"], Vd = { key: 1 };
function Wd(e, f, u, a, r, d) {
  return e.emojis[e.token.name] ? (h(), N("img", {
    key: 0,
    src: e.emojis[e.token.name].url,
    class: "emoji"
  }, null, 8, Gd)) : (h(), N("span", Vd, ":" + v(e.token.name) + ":", 1));
}
const Yd = /* @__PURE__ */ k(Xd, [["render", Wd], ["__scopeId", "data-v-58a5bd6a"]]), Zd = Q({
  props: ["token", "children", "style", "className"],
  inject: ["domain"],
  data() {
    return {
      domain: this.domain,
      user: void 0
    };
  },
  watch: {
    token: {
      immediate: !0,
      async handler() {
        const e = await fetch(
          `https:/${this.token.host ?? this.domain}/api/users/search-by-username-and-host`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
              detail: !1,
              limit: 1,
              username: this.token.username
            })
          }
        );
        this.user = (await e.json())[0];
      }
    }
  }
}), xd = ["href"], de = ["src"];
function ee(e, f, u, a, r, d) {
  return h(), N("a", {
    class: "mention",
    href: e.token.host ?? "https://" + e.domain + "/" + e.token.acct
  }, [
    e.user ? (h(), N("img", {
      key: 0,
      class: "avatar",
      src: e.user.avatarUrl
    }, null, 8, de)) : X("", !0),
    J(v(e.token.acct), 1)
  ], 8, xd);
}
const ue = /* @__PURE__ */ k(Zd, [["render", ee]]), ne = {
  props: ["children", "token", "style", "className"]
};
function te(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), E(s, { tokens: u.children }, null, 8, ["tokens"]);
}
const ce = /* @__PURE__ */ k(ne, [["render", te]]), fe = {
  props: ["token", "children", "style", "className"]
}, re = { class: "block-code" };
function se(e, f, u, a, r, d) {
  return h(), N(U, null, [
    J(v(u.token.lang) + " ", 1),
    w("pre", re, [
      J("    "),
      w("code", null, v(u.token.code), 1),
      J(`
  `)
    ])
  ], 64);
}
const oe = /* @__PURE__ */ k(fe, [["render", se]]), ae = {
  props: ["token", "children", "style", "className"]
}, le = { class: "inline-code" };
function ie(e, f, u, a, r, d) {
  return h(), N("pre", le, v(u.token.code), 1);
}
const me = /* @__PURE__ */ k(ae, [["render", ie]]), pe = {
  data() {
    return {
      currentQuery: this.token.query
    };
  },
  props: {
    token: {
      type: Object,
      required: !0
    },
    children: {
      type: Object
    }
  },
  methods: {
    search() {
      window.open(
        "https://www.google.com/search?q=" + encodeURIComponent(this.currentQuery),
        "_blank"
      );
    }
  }
}, _e = { class: "search" };
function he(e, f, u, a, r, d) {
  return h(), N("div", _e, [
    md(w("input", {
      type: "text",
      "onUpdate:modelValue": f[0] || (f[0] = (s) => r.currentQuery = s)
    }, null, 512), [
      [pd, r.currentQuery]
    ]),
    w("button", {
      onClick: f[1] || (f[1] = (...s) => d.search && d.search(...s))
    }, " 検索 ")
  ]);
}
const be = /* @__PURE__ */ k(pe, [["render", he]]), ye = {
  props: ["token", "children"]
}, ge = { class: "strike" };
function $e(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), N("del", ge, [
    K(s, { tokens: u.children }, null, 8, ["tokens"])
  ]);
}
const ke = /* @__PURE__ */ k(ye, [["render", $e]]), Ne = {
  props: ["children", "token", "class", "style"]
};
function Ce(e, f, u, a, r, d) {
  return h(), N("span", {
    style: O(u.style)
  }, v(u.token.emoji), 5);
}
const Me = /* @__PURE__ */ k(Ne, [["render", Ce]]), Oe = {
  name: "Url.vue",
  props: {
    token: {
      type: Object
    },
    children: {
      type: Object
    }
  }
}, Te = ["href", "textContent"];
function Ee(e, f, u, a, r, d) {
  return h(), N("a", {
    class: "url",
    href: u.token.url,
    textContent: v(u.token.url)
  }, null, 8, Te);
}
const Ie = /* @__PURE__ */ k(Oe, [["render", Ee]]), Le = Q({
  inject: ["debugMode"],
  data() {
    return {
      debugMode: this.debugMode
    };
  },
  props: {
    token: {
      type: Object
    },
    children: {
      type: Object
    },
    className: {
      type: String
    },
    style: {
      type: Object
    },
    class: {
      type: String
    }
  }
}), je = { key: 0 }, ve = ["href"];
function qe(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), N(U, null, [
    e.debugMode ? (h(), N("span", je, "silent - " + v(e.token.silent), 1)) : X("", !0),
    w("a", {
      class: cd(["link", e.className]),
      href: e.token.url,
      style: O(e.style)
    }, [
      K(s, { tokens: e.children }, null, 8, ["tokens"])
    ], 14, ve)
  ], 64);
}
const Ae = /* @__PURE__ */ k(Le, [["render", qe]]), Pe = {
  props: ["token", "children", "style"]
}, Se = ["href"];
function Be(e, f, u, a, r, d) {
  return h(), N("a", {
    class: "hashtag",
    href: "/tags/" + u.token.hashtag
  }, "#" + v(u.token.hashtag), 9, Se);
}
const we = /* @__PURE__ */ k(Pe, [["render", Be]]), Re = {
  methods: { getComponent: ld },
  props: ["token", "tokens", "children", "style", "className"]
};
function De(e, f, u, a, r, d) {
  return h(), E(fd(d.getComponent(u.token.name)), {
    className: `Fn ${u.token.name} ${u.className ?? ""}`,
    token: u.token,
    children: u.children,
    style: O(u.style)
  }, null, 8, ["className", "token", "children", "style"]);
}
const He = /* @__PURE__ */ k(Re, [["render", De]]), Ue = {
  props: ["token", "children", "style", "className"]
};
function Ke(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), E(s, {
    className: `fg ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{ color: `#${u.token.args.color}` }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const ze = /* @__PURE__ */ k(Ue, [["render", Ke]]), Fe = {
  props: ["token", "children", "style", "className"]
};
function Je(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), E(s, {
    className: `bg ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{ background: `#${u.token.args.color}` }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const Qe = /* @__PURE__ */ k(Fe, [["render", Je]]), Xe = {
  props: ["token", "children", "style", "className"]
};
function Ge(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), E(s, {
    className: `fg ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{ fontFamily: Object.keys(u.token.args) }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const Ve = /* @__PURE__ */ k(Xe, [["render", Ge]]), We = {
  props: ["token", "children", "style", "className"]
};
function Ye(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), E(s, {
    className: `blur ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{ fontFamily: Object.keys(u.token.args) }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const Ze = /* @__PURE__ */ k(We, [["render", Ye]]), xe = {
  props: ["token", "children", "style", "className"]
};
function du(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), E(s, {
    className: `flip ${u.className ?? ""}`,
    tokens: u.children,
    style: O([
      {
        transform: `scale(${u.token.args.h ? 1 : -1}, ${u.token.args.v ? -1 : 1})`
      },
      u.style
    ])
  }, null, 8, ["className", "tokens", "style"]);
}
const eu = /* @__PURE__ */ k(xe, [["render", du]]), uu = {
  props: ["token", "children", "style", "className"]
};
function nu(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), E(s, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: O([
      {
        transform: `scale(${u.token.args.x}, ${u.token.args.y})`
      },
      u.style
    ])
  }, null, 8, ["className", "tokens", "style"]);
}
const tu = /* @__PURE__ */ k(uu, [["render", nu]]), cu = {
  props: ["token", "children", "style", "className"]
};
function fu(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), E(s, {
    className: `position ${u.className ?? ""}`,
    tokens: u.children,
    style: O([
      {
        transform: `translateX(${u.token.args.x}em) translateY(${u.token.args.y}em)`
      },
      u.style
    ])
  }, null, 8, ["className", "tokens", "style"]);
}
const ru = /* @__PURE__ */ k(cu, [["render", fu]]), su = {
  props: ["token", "children", "style", "className"]
};
function ou(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), E(s, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{ fontSize: "200%" }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const au = /* @__PURE__ */ k(su, [["render", ou]]), lu = {
  props: ["token", "children", "style", "className"]
};
function iu(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), E(s, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{ fontSize: "300%" }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const mu = /* @__PURE__ */ k(lu, [["render", iu]]), pu = {
  props: ["token", "children", "style", "className"]
};
function _u(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), E(s, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{ fontSize: "400%" }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const hu = /* @__PURE__ */ k(pu, [["render", _u]]), bu = {
  props: ["token", "children", "style", "className"]
};
function yu(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), E(s, {
    className: `position ${u.className ?? ""}`,
    tokens: u.children,
    style: O([
      {
        animation: `${u.token.args.speed ?? "0.75s"} linear 0s infinite normal none running mfm-jump`
      },
      u.style
    ])
  }, null, 8, ["className", "tokens", "style"]);
}
const gu = /* @__PURE__ */ k(bu, [["render", yu]]), $u = {
  props: ["token", "children", "style", "className"]
};
function ku(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), E(s, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{
      animation: `${u.token.args.speed ?? "1s"} linear 0s infinite normal both running tada`
    }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const Nu = /* @__PURE__ */ k($u, [["render", ku]]), Cu = {
  props: ["token", "children", "style", "className"]
};
function Mu(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), E(s, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{
      animation: `${u.token.args.speed ?? "1s"} linear 0s infinite normal both running mfm-rubberBand`
    }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const Ou = /* @__PURE__ */ k(Cu, [["render", Mu]]), Tu = {
  props: ["token", "children", "style", "className"]
};
function Eu(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), E(s, {
    className: `position ${u.className ?? ""}`,
    tokens: u.children,
    style: O([
      {
        animation: `${u.token.args.speed ?? "1.5s"} linear 0s infinite normal none running mfm-spin`
      },
      u.style
    ])
  }, null, 8, ["className", "tokens", "style"]);
}
const Iu = /* @__PURE__ */ k(Tu, [["render", Eu]]), Lu = {
  props: ["token", "children", "style", "className"]
};
function ju(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), E(s, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{
      animation: `${u.token.args.speed ?? "1s"} linear 0s infinite normal none running mfm-twitch`
    }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const vu = /* @__PURE__ */ k(Lu, [["render", ju]]), qu = {
  props: ["token", "children", "style", "className"]
};
function Au(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), E(s, {
    className: `position ${u.className ?? ""}`,
    tokens: u.children,
    style: O([
      {
        animation: `${u.token.args.speed ?? "0.5s"} ease 0s infinite normal none running mfm-shake`
      },
      u.style
    ])
  }, null, 8, ["className", "tokens", "style"]);
}
const Pu = /* @__PURE__ */ k(qu, [["render", Au]]), Su = {
  props: ["token", "children", "style", "className"]
};
function Bu(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), E(s, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{
      animation: `${u.token.args.speed ?? "0.75s"} linear 0s infinite normal none running mfm-bounce`,
      transformOrigin: "center bottom"
    }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const wu = /* @__PURE__ */ k(Su, [["render", Bu]]), Ru = {
  props: ["token", "children", "style", "className"]
};
function Du(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), E(s, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{
      animation: `${u.token.args.speed ?? "0.5s"} ease 0s infinite normal none running mfm-rainbow`
    }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const Hu = /* @__PURE__ */ k(Ru, [["render", Du]]), Uu = {
  props: ["children", "token", "style", "className"],
  computed: {
    ruby() {
      const e = this.children[0].props.text.split(" ");
      return {
        body: e[0],
        yomi: e[1]
      };
    }
  }
};
function Ku(e, f, u, a, r, d) {
  return h(), N("ruby", null, [
    J(v(d.ruby.body) + " ", 1),
    w("rt", null, v(d.ruby.yomi), 1)
  ]);
}
const zu = /* @__PURE__ */ k(Uu, [["render", Ku]]), Fu = Q({
  components: {
    MfmComponent: id
  },
  props: {
    text: {
      required: !0,
      type: String
    }
  },
  computed: {
    parsedMfm() {
      return Cd(this.text, !1);
    }
  }
});
function Ju(e, f, u, a, r, d) {
  const s = C("MfmComponent");
  return h(), E(s, { tokens: e.parsedMfm }, null, 8, ["tokens"]);
}
const Qu = /* @__PURE__ */ k(Fu, [["render", Ju]]), Gu = {
  install: (e) => (e.component("MfmRenderer", Qu).component("MfmComponent", id).component("Bold", jd).component("Italic", Pd).component("Quote", Rd).component("Small", Kd).component("Text", yd).component("Center", Qd).component("EmojiCode", Yd).component("Mention", ue).component("Plain", ce).component("BlockCode", oe).component("InlineCode", me).component("Search", be).component("Strike", ke).component("UnicodeEmoji", Me).component("Url", Ie).component("Link", Ae).component("Hashtag", we).component("Fn", He).component("Fg", ze).component("Bg", Qe).component("Font", Ve).component("Blur", Ze).component("Flip", eu).component("Scale", tu).component("Position", ru).component("X2", au).component("X3", mu).component("X4", hu).component("Jump", gu).component("Tada", Nu).component("Jelly", Ou).component("Spin", Iu).component("Twitch", vu).component("Shake", Pu).component("Bounce", wu).component("Rainbow", Hu).component("Ruby", zu), e)
};
export {
  Gu as default
};
