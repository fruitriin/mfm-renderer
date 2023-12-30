import { openBlock as b, createElementBlock as N, Fragment as U, renderList as V, createElementVNode as w, normalizeClass as td, normalizeStyle as O, toDisplayString as v, createCommentVNode as Q, defineComponent as X, createBlock as E, resolveDynamicComponent as cd, resolveComponent as C, createVNode as K, createTextVNode as J, withDirectives as ld, vModelText as id } from "vue";
const md = {
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
}, pd = { key: 0 };
function _d(e, f, u, a, r, d) {
  return b(!0), N(U, null, V(d.parsedText, (o, M) => (b(), N(U, null, [
    w("span", {
      class: td(["text", [u.className, e.$attrs.class]]),
      style: O(u.style)
    }, v(o), 7),
    d.showBr(o, M) ? (b(), N("br", pd)) : Q("", !0)
  ], 64))), 256);
}
const bd = /* @__PURE__ */ k(md, [["render", _d]]);
var R = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, G = {}, A = {}, H = {}, F = {}, fd = {};
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
          const s = `${c}`;
          console.log(`${s.padEnd(6, " ")}enter ${this.name}`);
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
        let t, s = n;
        const _ = [];
        for (; s < m.length && (t = this.handler(m, s, c), !!t.success); )
          s = t.index, _.push(t.value);
        return _.length < p ? u() : f(s, _);
      });
    }
    sep(p, m) {
      if (m < 1)
        throw new Error('"min" must be a value greater than or equal to 1.');
      return o([
        this,
        o([
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
      const t = m.slice(n), s = p.exec(t);
      return s == null ? u() : f(n + s[0].length, s[0]);
    });
  }
  e.regexp = d;
  function o(y, p) {
    return new a((m, n, c) => {
      let t, s = n;
      const _ = [];
      for (let l = 0; l < y.length; l++) {
        if (t = y[l].handler(m, s, c), !t.success)
          return t;
        s = t.index, _.push(t.value);
      }
      return f(s, p != null ? _[p] : _);
    });
  }
  e.seq = o;
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
})(fd);
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
  const o = (i) => ({ type: "mathBlock", props: { formula: i } });
  e.MATH_BLOCK = o;
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
  const s = (i, T) => {
    const j = { type: "url", props: { url: i } };
    return T && (j.props.brackets = T), j;
  };
  e.N_URL = s;
  const _ = (i, T, j) => ({ type: "link", props: { silent: i, url: T }, children: j });
  e.LINK = _;
  const l = (i, T, j) => ({ type: "fn", props: { name: i, args: T }, children: j });
  e.FN = l;
  const h = (i) => ({ type: "plain", children: [(0, e.TEXT)(i)] });
  e.PLAIN = h;
  const g = (i) => ({ type: "text", props: { text: i } });
  e.TEXT = g;
})(Y);
Object.defineProperty(S, "__esModule", { value: !0 });
S.inspectOne = S.stringifyTree = S.stringifyNode = S.mergeText = void 0;
const W = Y;
function hd(e) {
  const f = [], u = [];
  function a() {
    u.length > 0 && (f.push((0, W.TEXT)(u.join(""))), u.length = 0);
  }
  const r = e.flat(1);
  for (const d of r)
    typeof d == "string" ? u.push(d) : !Array.isArray(d) && d.type === "text" ? u.push(d.props.text) : (a(), f.push(d));
  return a(), f;
}
S.mergeText = hd;
function rd(e) {
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
S.stringifyNode = rd;
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
  return f.map((a) => rd(a)).join("");
}
S.stringifyTree = B;
function sd(e, f) {
  if (f(e), e.children != null)
    for (const u of e.children)
      sd(u, f);
}
S.inspectOne = sd;
var Z = {};
Object.defineProperty(Z, "__esModule", {
  value: !0
});
Z.default = /(?:\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83e\udef1\ud83c\udffb\u200d\ud83e\udef2\ud83c[\udffc-\udfff]|\ud83e\udef1\ud83c\udffc\u200d\ud83e\udef2\ud83c[\udffb\udffd-\udfff]|\ud83e\udef1\ud83c\udffd\u200d\ud83e\udef2\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\udef1\ud83c\udffe\u200d\ud83e\udef2\ud83c[\udffb-\udffd\udfff]|\ud83e\udef1\ud83c\udfff\u200d\ud83e\udef2\ud83c[\udffb-\udffe]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d\udc8f\ud83c[\udffb-\udfff]|\ud83d\udc91\ud83c[\udffb-\udfff]|\ud83e\udd1d\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d\udc8f\udc91]|\ud83e\udd1d)|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf7c\udf84\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc70\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd4\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83d\ude36\u200d\ud83c\udf2b\ufe0f|\u2764\ufe0f\u200d\ud83d\udd25|\u2764\ufe0f\u200d\ud83e\ude79|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc3b\u200d\u2744\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83d\ude2e\u200d\ud83d\udca8|\ud83d\ude35\u200d\ud83d\udcab|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f|\ud83d\udc08\u200d\u2b1b|\ud83d\udc26\u200d\u2b1b)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|\ud83e\udef0|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0c\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\udd77\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd\udec3-\udec5\udef1-\udef8]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udc8e\udc90\udc92-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5-\uded7\udedc-\udedf\udeeb\udeec\udef4-\udefc\udfe0-\udfeb\udff0]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd76\udd78-\uddb4\uddb7\uddba\uddbc-\uddcc\uddd0\uddde-\uddff\ude70-\ude7c\ude80-\ude88\ude90-\udebd\udebf-\udec2\udece-\udedb\udee0-\udee8]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g;
var dd;
function yd() {
  if (dd)
    return F;
  dd = 1;
  var e = R && R.__createBinding || (Object.create ? function(n, c, t, s) {
    s === void 0 && (s = t);
    var _ = Object.getOwnPropertyDescriptor(c, t);
    (!_ || ("get" in _ ? !c.__esModule : _.writable || _.configurable)) && (_ = { enumerable: !0, get: function() {
      return c[t];
    } }), Object.defineProperty(n, s, _);
  } : function(n, c, t, s) {
    s === void 0 && (s = t), n[s] = c[t];
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
  const r = u(od()), d = u(fd), o = S, M = a(Z), I = d.regexp(/[\u0020\u3000\t]/), q = d.regexp(/[a-z0-9]/i), $ = d.alt([d.crlf, d.cr, d.lf]);
  function P(n) {
    return new d.Parser((c, t, s) => {
      const _ = [];
      let l = t;
      for (let h = 0; h < n.length; h++) {
        const g = n[h].handler(c, l, s);
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
    return new d.Parser((s, _, l) => {
      l.depth++;
      const h = t.handler(s, _, l);
      return l.depth--, h;
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
      return new d.Parser((s, _, l) => {
        let h;
        if (h = t.handler(s, _, l), !h.success)
          return h;
        const g = h.value, i = h.index;
        return g.length === 1 && g[0].length === 0 ? d.failure() : (h = m(n.fullParser).many(0).handler(g.join(`
`), 0, l), h.success ? d.success(i, r.QUOTE((0, o.mergeText)(h.value))) : h);
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
        const s = t[3].join("").trim(), _ = t[5].join("");
        return r.CODE_BLOCK(_, s.length > 0 ? s : null);
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
      ]).map((s) => {
        const _ = s[4].join("");
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
      ]).map((s) => r.CENTER((0, o.mergeText)(s[4])));
    },
    big: (n) => {
      const c = d.str("***");
      return P([
        c,
        d.seq([d.notMatch(c), m(n.inline)], 1).many(1),
        c
      ]).map((t) => typeof t == "string" ? t : r.FN("tada", {}, (0, o.mergeText)(t[1])));
    },
    boldAsta: (n) => {
      const c = d.str("**");
      return P([
        c,
        d.seq([d.notMatch(c), m(n.inline)], 1).many(1),
        c
      ]).map((t) => typeof t == "string" ? t : r.BOLD((0, o.mergeText)(t[1])));
    },
    boldTag: (n) => {
      const c = d.str("<b>"), t = d.str("</b>");
      return P([
        c,
        d.seq([d.notMatch(t), m(n.inline)], 1).many(1),
        t
      ]).map((s) => typeof s == "string" ? s : r.BOLD((0, o.mergeText)(s[1])));
    },
    boldUnder: (n) => {
      const c = d.str("__");
      return d.seq([
        c,
        d.alt([q, I]).many(1),
        c
      ]).map((t) => r.BOLD((0, o.mergeText)(t[1])));
    },
    smallTag: (n) => {
      const c = d.str("<small>"), t = d.str("</small>");
      return P([
        c,
        d.seq([d.notMatch(t), m(n.inline)], 1).many(1),
        t
      ]).map((s) => typeof s == "string" ? s : r.SMALL((0, o.mergeText)(s[1])));
    },
    italicTag: (n) => {
      const c = d.str("<i>"), t = d.str("</i>");
      return P([
        c,
        d.seq([d.notMatch(t), m(n.inline)], 1).many(1),
        t
      ]).map((s) => typeof s == "string" ? s : r.ITALIC((0, o.mergeText)(s[1])));
    },
    italicAsta: (n) => {
      const c = d.str("*"), t = d.seq([
        c,
        d.alt([q, I]).many(1),
        c
      ]);
      return new d.Parser((s, _, l) => {
        const h = t.handler(s, _, l);
        if (!h.success)
          return d.failure();
        const g = s.slice(0, _);
        return /[a-z0-9]$/i.test(g) ? d.failure() : d.success(h.index, r.ITALIC((0, o.mergeText)(h.value[1])));
      });
    },
    italicUnder: (n) => {
      const c = d.str("_"), t = d.seq([
        c,
        d.alt([q, I]).many(1),
        c
      ]);
      return new d.Parser((s, _, l) => {
        const h = t.handler(s, _, l);
        if (!h.success)
          return d.failure();
        const g = s.slice(0, _);
        return /[a-z0-9]$/i.test(g) ? d.failure() : d.success(h.index, r.ITALIC((0, o.mergeText)(h.value[1])));
      });
    },
    strikeTag: (n) => {
      const c = d.str("<s>"), t = d.str("</s>");
      return P([
        c,
        d.seq([d.notMatch(t), m(n.inline)], 1).many(1),
        t
      ]).map((s) => typeof s == "string" ? s : r.STRIKE((0, o.mergeText)(s[1])));
    },
    strikeWave: (n) => {
      const c = d.str("~~");
      return P([
        c,
        d.seq([d.notMatch(d.alt([c, $])), m(n.inline)], 1).many(1),
        c
      ]).map((t) => typeof t == "string" ? t : r.STRIKE((0, o.mergeText)(t[1])));
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
      ], 2).map((s) => r.PLAIN(s));
    },
    fn: (n) => {
      const c = new d.Parser((l, h, g) => {
        const i = d.regexp(/[a-z0-9_]+/i).handler(l, h, g);
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
      })), s = d.seq([
        d.str("."),
        t.sep(d.str(","), 1)
      ], 1).map((l) => {
        const h = {};
        for (const g of l)
          h[g.k] = g.v;
        return h;
      }), _ = d.str("]");
      return P([
        d.str("$["),
        c,
        s.option(),
        d.str(" "),
        d.seq([d.notMatch(_), m(n.inline)], 1).many(1),
        _
      ]).map((l) => {
        if (typeof l == "string")
          return l;
        const h = l[1], g = l[2] || {}, i = l[4];
        return r.FN(h, g, (0, o.mergeText)(i));
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
      ]).map((s) => r.MATH_INLINE(s[1].join("")));
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
      return new d.Parser((t, s, _) => {
        let l;
        if (l = c.handler(t, s, _), !l.success)
          return d.failure();
        const h = t.slice(0, s);
        if (/[a-z0-9]$/i.test(h))
          return d.failure();
        let g = !1;
        const i = l.index, T = l.value[2], j = l.value[3];
        let L = j;
        j != null && (l = /[.-]+$/.exec(j), l != null && (L = j.slice(0, -1 * l[0].length), L.length === 0 && (g = !0, L = null)));
        let z = T;
        if (l = /-+$/.exec(T), l != null && (L == null ? z = T.slice(0, -1 * l[0].length) : g = !0), (z.length === 0 || z[0] === "-") && (g = !0), L != null && /^[.-]/.test(L) && (g = !0), g)
          return d.success(i, t.slice(s, i));
        const x = L != null ? `@${z}@${L}` : `@${z}`;
        return d.success(s + x.length, r.MENTION(z, L, x));
      });
    },
    hashtag: (n) => {
      const c = d.str("#"), t = d.seq([
        d.notMatch(d.alt([d.regexp(/[ \u3000\t.,!?'"#:/[\]【】()「」（）<>]/), I, $])),
        d.char
      ], 1), s = d.lazy(() => d.alt([
        d.seq([
          d.str("("),
          m(s, t).many(0),
          d.str(")")
        ]),
        d.seq([
          d.str("["),
          m(s, t).many(0),
          d.str("]")
        ]),
        d.seq([
          d.str("「"),
          m(s, t).many(0),
          d.str("」")
        ]),
        d.seq([
          d.str("（"),
          m(s, t).many(0),
          d.str("）")
        ]),
        t
      ])), _ = d.seq([
        y,
        c,
        s.many(1).text()
      ], 2);
      return new d.Parser((l, h, g) => {
        const i = _.handler(l, h, g);
        if (!i.success)
          return d.failure();
        const T = l.slice(0, h);
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
      ], 2).map((s) => r.EMOJI_CODE(s));
    },
    link: (n) => {
      const c = new d.Parser((s, _, l) => {
        l.linkLabel = !0;
        const h = n.inline.handler(s, _, l);
        return l.linkLabel = !1, h;
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
      ]).map((s) => {
        const _ = s[1] === "?[", l = s[2], h = s[5];
        return r.LINK(_, h.props.url, (0, o.mergeText)(l));
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
      ])), s = d.seq([
        y,
        d.regexp(/https?:\/\//),
        t.many(1).text()
      ]);
      return new d.Parser((_, l, h) => {
        let g;
        if (g = s.handler(_, l, h), !g.success)
          return d.failure();
        const i = g.index;
        let T = i;
        const j = g.value[1];
        let L = g.value[2];
        return g = /[.,]+$/.exec(L), g != null && (T -= g[0].length, L = L.slice(0, -1 * g[0].length), L.length === 0) ? d.success(i, _.slice(l, i)) : d.success(T, r.N_URL(j + L, !1));
      });
    },
    urlAlt: (n) => {
      const c = d.str("<"), t = d.str(">"), s = d.seq([
        y,
        c,
        d.regexp(/https?:\/\//),
        d.seq([d.notMatch(d.alt([t, I])), d.char], 1).many(1),
        t
      ]).text();
      return new d.Parser((_, l, h) => {
        const g = s.handler(_, l, h);
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
        const s = t[2].join("");
        return r.SEARCH(s, `${s}${t[3]}${t[4]}`);
      });
    },
    text: (n) => d.char
  }), F;
}
var ed;
function gd() {
  if (ed)
    return H;
  ed = 1, Object.defineProperty(H, "__esModule", { value: !0 }), H.simpleParser = H.fullParser = void 0;
  const e = yd(), f = S;
  function u(r, d) {
    const o = e.language.fullParser.handler(r, 0, {
      nestLimit: d.nestLimit != null ? d.nestLimit : 20,
      depth: 0,
      linkLabel: !1,
      trace: !1
    });
    return (0, f.mergeText)(o.value);
  }
  H.fullParser = u;
  function a(r) {
    const d = e.language.simpleParser.handler(r, 0, {});
    return (0, f.mergeText)(d.value);
  }
  return H.simpleParser = a, H;
}
var ud;
function $d() {
  if (ud)
    return A;
  ud = 1, Object.defineProperty(A, "__esModule", { value: !0 }), A.extract = A.inspect = A.toString = A.parseSimple = A.parse = void 0;
  const e = gd(), f = S;
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
  function o(M, I) {
    const q = [];
    return d(M, ($) => {
      I($) && q.push($);
    }), q;
  }
  return A.extract = o, A;
}
var nd;
function od() {
  return nd || (nd = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.TEXT = e.PLAIN = e.FN = e.LINK = e.N_URL = e.HASHTAG = e.MENTION = e.MATH_INLINE = e.INLINE_CODE = e.STRIKE = e.ITALIC = e.SMALL = e.BOLD = e.EMOJI_CODE = e.UNI_EMOJI = e.CENTER = e.MATH_BLOCK = e.CODE_BLOCK = e.SEARCH = e.QUOTE = e.extract = e.inspect = e.toString = e.parseSimple = e.parse = void 0;
    var f = $d();
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
od();
function ad(e) {
  return e.replace(
    /(^.)(.*)/,
    (f, u, a) => `${u.toUpperCase() + a}`
  );
}
const kd = X({
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
    getComponent: ad
  }
}), Nd = {
  key: 0,
  style: { border: "solid 1px red" }
};
function Cd(e, f, u, a, r, d) {
  return b(), N(U, null, [
    (b(!0), N(U, null, V(e.tokens, (o) => (b(), E(cd(`${e.getComponent(o.type)}`), {
      style: O(e.style),
      className: e.className,
      token: o.props,
      children: o.children
    }, null, 8, ["style", "className", "token", "children"]))), 256)),
    e.debugMode ? (b(), N("div", Nd, [
      (b(!0), N(U, null, V(e.tokens, (o) => (b(), N("div", null, [
        w("p", null, "Selected: " + v(e.getComponent(o.type)), 1),
        w("pre", null, v(o), 1)
      ]))), 256))
    ])) : Q("", !0)
  ], 64);
}
const Md = /* @__PURE__ */ k(kd, [["render", Cd]]), Od = {
  props: ["children"]
}, Td = { class: "bold" };
function Ed(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), N("b", Td, [
    K(o, { tokens: u.children }, null, 8, ["tokens"])
  ]);
}
const Id = /* @__PURE__ */ k(Od, [["render", Ed]]), Ld = {
  props: ["children"]
}, jd = { class: "italic" };
function vd(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), N("i", jd, [
    K(o, { tokens: u.children }, null, 8, ["tokens"])
  ]);
}
const qd = /* @__PURE__ */ k(Ld, [["render", vd]]), Ad = {
  props: ["children"]
}, Pd = {
  class: "quote",
  style: { display: "block", margin: "8px", padding: "6px 0px 6px 12px", color: "var(--fg)", "border-left": "solid 3px var(--fg)", opacity: "0.7" }
};
function Sd(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), N("div", Pd, [
    K(o, { tokens: u.children }, null, 8, ["tokens"])
  ]);
}
const Bd = /* @__PURE__ */ k(Ad, [["render", Sd]]), wd = {
  props: ["children", "token", "style"]
}, Rd = {
  class: "small",
  style: { opacity: "0.7" }
};
function Dd(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), N("small", Rd, [
    K(o, { tokens: u.children }, null, 8, ["tokens"])
  ]);
}
const Hd = /* @__PURE__ */ k(wd, [["render", Dd]]), Ud = {
  props: ["children", "class", "className"]
}, Kd = { class: "center" };
function zd(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), N("div", Kd, [
    K(o, { tokens: u.children }, null, 8, ["tokens"])
  ]);
}
const Fd = /* @__PURE__ */ k(Ud, [["render", zd]]), Jd = X({
  inject: ["emojis"],
  data() {
    return {
      emojis: this.emojis
    };
  },
  props: ["token", "children", "className", "class", "style"]
}), Qd = ["src"], Xd = { key: 1 };
function Gd(e, f, u, a, r, d) {
  return e.emojis[e.token.name] ? (b(), N("img", {
    key: 0,
    src: e.emojis[e.token.name].url,
    class: "emoji"
  }, null, 8, Qd)) : (b(), N("span", Xd, ":" + v(e.token.name) + ":", 1));
}
const Vd = /* @__PURE__ */ k(Jd, [["render", Gd], ["__scopeId", "data-v-58a5bd6a"]]), Wd = X({
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
}), Yd = ["href"], Zd = ["src"];
function xd(e, f, u, a, r, d) {
  return b(), N("a", {
    class: "mention",
    href: e.token.host ?? "https://" + e.domain + "/" + e.token.acct
  }, [
    e.user ? (b(), N("img", {
      key: 0,
      class: "avatar",
      src: e.user.avatarUrl
    }, null, 8, Zd)) : Q("", !0),
    J(v(e.token.acct), 1)
  ], 8, Yd);
}
const de = /* @__PURE__ */ k(Wd, [["render", xd]]), ee = {
  props: ["children", "token", "style", "className"]
};
function ue(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), E(o, { tokens: u.children }, null, 8, ["tokens"]);
}
const ne = /* @__PURE__ */ k(ee, [["render", ue]]), te = {
  props: ["token", "children", "style", "className"]
}, ce = { class: "block-code" };
function fe(e, f, u, a, r, d) {
  return b(), N(U, null, [
    J(v(u.token.lang) + " ", 1),
    w("pre", ce, [
      J("    "),
      w("code", null, v(u.token.code), 1),
      J(`
  `)
    ])
  ], 64);
}
const re = /* @__PURE__ */ k(te, [["render", fe]]), se = {
  props: ["token", "children", "style", "className"]
}, oe = { class: "inline-code" };
function ae(e, f, u, a, r, d) {
  return b(), N("pre", oe, v(u.token.code), 1);
}
const le = /* @__PURE__ */ k(se, [["render", ae]]), ie = {
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
}, me = { class: "search" };
function pe(e, f, u, a, r, d) {
  return b(), N("div", me, [
    ld(w("input", {
      type: "text",
      "onUpdate:modelValue": f[0] || (f[0] = (o) => r.currentQuery = o)
    }, null, 512), [
      [id, r.currentQuery]
    ]),
    w("button", {
      onClick: f[1] || (f[1] = (...o) => d.search && d.search(...o))
    }, " 検索 ")
  ]);
}
const _e = /* @__PURE__ */ k(ie, [["render", pe]]), be = {
  props: ["token", "children"]
}, he = { class: "strike" };
function ye(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), N("del", he, [
    K(o, { tokens: u.children }, null, 8, ["tokens"])
  ]);
}
const ge = /* @__PURE__ */ k(be, [["render", ye]]), $e = {
  props: ["children", "token", "class", "style"]
};
function ke(e, f, u, a, r, d) {
  return b(), N("span", {
    style: O(u.style)
  }, v(u.token.emoji), 5);
}
const Ne = /* @__PURE__ */ k($e, [["render", ke]]), Ce = {
  name: "Url.vue",
  props: {
    token: {
      type: Object
    },
    children: {
      type: Object
    }
  }
}, Me = ["href", "textContent"];
function Oe(e, f, u, a, r, d) {
  return b(), N("a", {
    class: "url",
    href: u.token.url,
    textContent: v(u.token.url)
  }, null, 8, Me);
}
const Te = /* @__PURE__ */ k(Ce, [["render", Oe]]), Ee = X({
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
}), Ie = { key: 0 }, Le = ["href"];
function je(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), N(U, null, [
    e.debugMode ? (b(), N("span", Ie, "silent - " + v(e.token.silent), 1)) : Q("", !0),
    w("a", {
      class: td(["link", e.className]),
      href: e.token.url,
      style: O(e.style)
    }, [
      K(o, { tokens: e.children }, null, 8, ["tokens"])
    ], 14, Le)
  ], 64);
}
const ve = /* @__PURE__ */ k(Ee, [["render", je]]), qe = {
  props: ["token", "children", "style"]
}, Ae = ["href"];
function Pe(e, f, u, a, r, d) {
  return b(), N("a", {
    class: "hashtag",
    href: "/tags/" + u.token.hashtag
  }, "#" + v(u.token.hashtag), 9, Ae);
}
const Se = /* @__PURE__ */ k(qe, [["render", Pe]]), Be = {
  methods: { getComponent: ad },
  props: ["token", "tokens", "children", "style", "className"]
};
function we(e, f, u, a, r, d) {
  return b(), E(cd(d.getComponent(u.token.name)), {
    className: `Fn ${u.token.name} ${u.className ?? ""}`,
    token: u.token,
    children: u.children,
    style: O(u.style)
  }, null, 8, ["className", "token", "children", "style"]);
}
const Re = /* @__PURE__ */ k(Be, [["render", we]]), De = {
  props: ["token", "children", "style", "className"]
};
function He(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), E(o, {
    className: `fg ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{ color: `#${u.token.args.color}` }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const Ue = /* @__PURE__ */ k(De, [["render", He]]), Ke = {
  props: ["token", "children", "style", "className"]
};
function ze(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), E(o, {
    className: `bg ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{ background: `#${u.token.args.color}` }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const Fe = /* @__PURE__ */ k(Ke, [["render", ze]]), Je = {
  props: ["token", "children", "style", "className"]
};
function Qe(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), E(o, {
    className: `fg ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{ fontFamily: Object.keys(u.token.args) }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const Xe = /* @__PURE__ */ k(Je, [["render", Qe]]), Ge = {
  props: ["token", "children", "style", "className"]
};
function Ve(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), E(o, {
    className: `blur ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{ fontFamily: Object.keys(u.token.args) }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const We = /* @__PURE__ */ k(Ge, [["render", Ve]]), Ye = {
  props: ["token", "children", "style", "className"]
};
function Ze(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), E(o, {
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
const xe = /* @__PURE__ */ k(Ye, [["render", Ze]]), du = {
  props: ["token", "children", "style", "className"]
};
function eu(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), E(o, {
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
const uu = /* @__PURE__ */ k(du, [["render", eu]]), nu = {
  props: ["token", "children", "style", "className"]
};
function tu(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), E(o, {
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
const cu = /* @__PURE__ */ k(nu, [["render", tu]]), fu = {
  props: ["token", "children", "style", "className"]
};
function ru(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), E(o, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{ fontSize: "200%" }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const su = /* @__PURE__ */ k(fu, [["render", ru]]), ou = {
  props: ["token", "children", "style", "className"]
};
function au(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), E(o, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{ fontSize: "300%" }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const lu = /* @__PURE__ */ k(ou, [["render", au]]), iu = {
  props: ["token", "children", "style", "className"]
};
function mu(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), E(o, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{ fontSize: "400%" }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const pu = /* @__PURE__ */ k(iu, [["render", mu]]), _u = {
  props: ["token", "children", "style", "className"]
};
function bu(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), E(o, {
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
const hu = /* @__PURE__ */ k(_u, [["render", bu]]), yu = {
  props: ["token", "children", "style", "className"]
};
function gu(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), E(o, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{
      animation: `${u.token.args.speed ?? "1s"} linear 0s infinite normal both running tada`
    }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const $u = /* @__PURE__ */ k(yu, [["render", gu]]), ku = {
  props: ["token", "children", "style", "className"]
};
function Nu(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), E(o, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{
      animation: `${u.token.args.speed ?? "1s"} linear 0s infinite normal both running mfm-rubberBand`
    }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const Cu = /* @__PURE__ */ k(ku, [["render", Nu]]), Mu = {
  props: ["token", "children", "style", "className"]
};
function Ou(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), E(o, {
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
const Tu = /* @__PURE__ */ k(Mu, [["render", Ou]]), Eu = {
  props: ["token", "children", "style", "className"]
};
function Iu(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), E(o, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{
      animation: `${u.token.args.speed ?? "1s"} linear 0s infinite normal none running mfm-twitch`
    }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const Lu = /* @__PURE__ */ k(Eu, [["render", Iu]]), ju = {
  props: ["token", "children", "style", "className"]
};
function vu(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), E(o, {
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
const qu = /* @__PURE__ */ k(ju, [["render", vu]]), Au = {
  props: ["token", "children", "style", "className"]
};
function Pu(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), E(o, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{
      animation: `${u.token.args.speed ?? "0.75s"} linear 0s infinite normal none running mfm-bounce`,
      transformOrigin: "center bottom"
    }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const Su = /* @__PURE__ */ k(Au, [["render", Pu]]), Bu = {
  props: ["token", "children", "style", "className"]
};
function wu(e, f, u, a, r, d) {
  const o = C("MfmComponent");
  return b(), E(o, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: O([{
      animation: `${u.token.args.speed ?? "0.5s"} ease 0s infinite normal none running mfm-rainbow`
    }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const Ru = /* @__PURE__ */ k(Bu, [["render", wu]]), Du = {
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
function Hu(e, f, u, a, r, d) {
  return b(), N("ruby", null, [
    J(v(d.ruby.body) + " ", 1),
    w("rt", null, v(d.ruby.yomi), 1)
  ]);
}
const Uu = /* @__PURE__ */ k(Du, [["render", Hu]]), zu = {
  install: (e, f) => {
    e.component("MfmComponent", Md).component("Bold", Id).component("Italic", qd).component("Quote", Bd).component("Small", Hd).component("Text", bd).component("Center", Fd).component("EmojiCode", Vd).component("Mention", de).component("Plain", ne).component("BlockCode", re).component("InlineCode", le).component("Search", _e).component("Strike", ge).component("UnicodeEmoji", Ne).component("Url", Te).component("Link", ve).component("Hashtag", Se).component("Fn", Re).component("Fg", Ue).component("Bg", Fe).component("Font", Xe).component("Blur", We).component("Flip", xe).component("Scale", uu).component("Position", cu).component("X2", su).component("X3", lu).component("X4", pu).component("Jump", hu).component("Tada", $u).component("Jelly", Cu).component("Spin", Tu).component("Twitch", Lu).component("Shake", qu).component("Bounce", Su).component("Rainbow", Ru).component("Ruby", Uu);
  }
};
export {
  zu as default
};
