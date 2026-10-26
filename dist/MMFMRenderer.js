import { openBlock as h, createElementBlock as C, Fragment as K, renderList as W, createElementVNode as B, normalizeClass as X, normalizeStyle as M, toDisplayString as v, createCommentVNode as G, defineComponent as Q, createBlock as E, resolveDynamicComponent as re, resolveComponent as N, createVNode as R, unref as se, createTextVNode as z, withDirectives as _e, vModelText as he, inject as be, withModifiers as ye } from "vue";
const ge = {
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
    showBr(d, f) {
      return f + 1 !== this.parsedText.length;
    }
  },
  computed: {
    parsedText() {
      return this.plain ? [this.token.text.replace(/\n/g, " ")] : this.token.text.split(/\r\n|\n|\r/);
    }
  }
}, k = (d, f) => {
  const u = d.__vccOpts || d;
  for (const [a, s] of f)
    u[a] = s;
  return u;
}, $e = { key: 0 };
function ke(d, f, u, a, s, e) {
  return h(!0), C(K, null, W(e.parsedText, (r, O) => (h(), C(K, null, [
    B("span", {
      class: X(["text", [u.className, d.$attrs.class]]),
      style: M(u.style)
    }, v(r), 7),
    e.showBr(r, O) ? (h(), C("br", $e)) : G("", !0)
  ], 64))), 256);
}
const Ne = /* @__PURE__ */ k(ge, [["render", ke]]);
var D = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, V = {}, A = {}, U = {}, J = {}, oe = {};
(function(d) {
  Object.defineProperty(d, "__esModule", { value: !0 }), d.createLanguage = d.lazy = d.lineEnd = d.lineBegin = d.char = d.newline = d.crlf = d.lf = d.cr = d.notMatch = d.alt = d.seq = d.regexp = d.str = d.Parser = d.failure = d.success = void 0;
  function f(y, p) {
    return {
      success: !0,
      value: p,
      index: y
    };
  }
  d.success = f;
  function u() {
    return { success: !1 };
  }
  d.failure = u;
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
      return r([
        this,
        r([
          p,
          this
        ], 1).many(m - 1)
      ]).map((n) => [n[0], ...n[1]]);
    }
    option() {
      return O([
        this,
        I(null)
      ]);
    }
  }
  d.Parser = a;
  function s(y) {
    return new a((p, m, n) => p.length - m < y.length || p.substr(m, y.length) !== y ? u() : f(m + y.length, y));
  }
  d.str = s;
  function e(y) {
    const p = RegExp(`^(?:${y.source})`, y.flags);
    return new a((m, n, c) => {
      const t = m.slice(n), o = p.exec(t);
      return o == null ? u() : f(n + o[0].length, o[0]);
    });
  }
  d.regexp = e;
  function r(y, p) {
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
  d.seq = r;
  function O(y) {
    return new a((p, m, n) => {
      let c;
      for (let t = 0; t < y.length; t++)
        if (c = y[t].handler(p, m, n), c.success)
          return c;
      return u();
    });
  }
  d.alt = O;
  function I(y) {
    return new a((p, m, n) => f(m, y));
  }
  function q(y) {
    return new a((p, m, n) => y.handler(p, m, n).success ? u() : f(m, null));
  }
  d.notMatch = q, d.cr = s("\r"), d.lf = s(`
`), d.crlf = s(`\r
`), d.newline = O([d.crlf, d.cr, d.lf]), d.char = new a((y, p, m) => {
    if (y.length - p < 1)
      return u();
    const n = y.charAt(p);
    return f(p + 1, n);
  }), d.lineBegin = new a((y, p, m) => p === 0 || d.cr.handler(y, p - 1, m).success || d.lf.handler(y, p - 1, m).success ? f(p, null) : u()), d.lineEnd = new a((y, p, m) => p === y.length || d.cr.handler(y, p, m).success || d.lf.handler(y, p, m).success ? f(p, null) : u());
  function $(y) {
    const p = new a((m, n, c) => (p.handler = y().handler, p.handler(m, n, c)));
    return p;
  }
  d.lazy = $;
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
  d.createLanguage = P;
})(oe);
var S = {}, x = {};
(function(d) {
  Object.defineProperty(d, "__esModule", { value: !0 }), d.TEXT = d.PLAIN = d.FN = d.LINK = d.N_URL = d.HASHTAG = d.MENTION = d.MATH_INLINE = d.INLINE_CODE = d.STRIKE = d.ITALIC = d.SMALL = d.BOLD = d.EMOJI_CODE = d.UNI_EMOJI = d.CENTER = d.MATH_BLOCK = d.CODE_BLOCK = d.SEARCH = d.QUOTE = d.isMfmBlock = void 0;
  const f = ["quote", "search", "blockCode", "mathBlock", "center"];
  function u(i) {
    return f.includes(i.type);
  }
  d.isMfmBlock = u;
  const a = (i) => ({ type: "quote", children: i });
  d.QUOTE = a;
  const s = (i, T) => ({ type: "search", props: { query: i, content: T } });
  d.SEARCH = s;
  const e = (i, T) => ({ type: "blockCode", props: { code: i, lang: T } });
  d.CODE_BLOCK = e;
  const r = (i) => ({ type: "mathBlock", props: { formula: i } });
  d.MATH_BLOCK = r;
  const O = (i) => ({ type: "center", children: i });
  d.CENTER = O;
  const I = (i) => ({ type: "unicodeEmoji", props: { emoji: i } });
  d.UNI_EMOJI = I;
  const q = (i) => ({ type: "emojiCode", props: { name: i } });
  d.EMOJI_CODE = q;
  const $ = (i) => ({ type: "bold", children: i });
  d.BOLD = $;
  const P = (i) => ({ type: "small", children: i });
  d.SMALL = P;
  const y = (i) => ({ type: "italic", children: i });
  d.ITALIC = y;
  const p = (i) => ({ type: "strike", children: i });
  d.STRIKE = p;
  const m = (i) => ({ type: "inlineCode", props: { code: i } });
  d.INLINE_CODE = m;
  const n = (i) => ({ type: "mathInline", props: { formula: i } });
  d.MATH_INLINE = n;
  const c = (i, T, j) => ({ type: "mention", props: { username: i, host: T, acct: j } });
  d.MENTION = c;
  const t = (i) => ({ type: "hashtag", props: { hashtag: i } });
  d.HASHTAG = t;
  const o = (i, T) => {
    const j = { type: "url", props: { url: i } };
    return T && (j.props.brackets = T), j;
  };
  d.N_URL = o;
  const _ = (i, T, j) => ({ type: "link", props: { silent: i, url: T }, children: j });
  d.LINK = _;
  const l = (i, T, j) => ({ type: "fn", props: { name: i, args: T }, children: j });
  d.FN = l;
  const b = (i) => ({ type: "plain", children: [(0, d.TEXT)(i)] });
  d.PLAIN = b;
  const g = (i) => ({ type: "text", props: { text: i } });
  d.TEXT = g;
})(x);
Object.defineProperty(S, "__esModule", { value: !0 });
S.inspectOne = S.stringifyTree = S.stringifyNode = S.mergeText = void 0;
const Y = x;
function Ce(d) {
  const f = [], u = [];
  function a() {
    u.length > 0 && (f.push((0, Y.TEXT)(u.join(""))), u.length = 0);
  }
  const s = d.flat(1);
  for (const e of s)
    typeof e == "string" ? u.push(e) : !Array.isArray(e) && e.type === "text" ? u.push(e.props.text) : (a(), f.push(e));
  return a(), f;
}
S.mergeText = Ce;
function ae(d) {
  var f;
  switch (d.type) {
    case "quote":
      return w(d.children).split(`
`).map((u) => `> ${u}`).join(`
`);
    case "search":
      return d.props.content;
    case "blockCode":
      return `\`\`\`${(f = d.props.lang) !== null && f !== void 0 ? f : ""}
${d.props.code}
\`\`\``;
    case "mathBlock":
      return `\\[
${d.props.formula}
\\]`;
    case "center":
      return `<center>
${w(d.children)}
</center>`;
    case "emojiCode":
      return `:${d.props.name}:`;
    case "unicodeEmoji":
      return d.props.emoji;
    case "bold":
      return `**${w(d.children)}**`;
    case "small":
      return `<small>${w(d.children)}</small>`;
    case "italic":
      return `<i>${w(d.children)}</i>`;
    case "strike":
      return `~~${w(d.children)}~~`;
    case "inlineCode":
      return `\`${d.props.code}\``;
    case "mathInline":
      return `\\(${d.props.formula}\\)`;
    case "mention":
      return d.props.acct;
    case "hashtag":
      return `#${d.props.hashtag}`;
    case "url":
      return d.props.brackets ? `<${d.props.url}>` : d.props.url;
    case "link":
      return `${d.props.silent ? "?" : ""}[${w(d.children)}](${d.props.url})`;
    case "fn": {
      const u = Object.keys(d.props.args).map((s) => {
        const e = d.props.args[s];
        return e === !0 ? s : `${s}=${e}`;
      }), a = u.length > 0 ? "." + u.join(",") : "";
      return `$[${d.props.name}${a} ${w(d.children)}]`;
    }
    case "plain":
      return `<plain>
${w(d.children)}
</plain>`;
    case "text":
      return d.props.text;
  }
  throw new Error("unknown mfm node");
}
S.stringifyNode = ae;
var H;
(function(d) {
  d[d.none = 0] = "none", d[d.inline = 1] = "inline", d[d.block = 2] = "block";
})(H || (H = {}));
function w(d) {
  const f = [];
  let u = H.none;
  for (const a of d) {
    let s = !0;
    (0, Y.isMfmBlock)(a) ? (u === H.none && (s = !1), u = H.block) : ((u === H.none || u === H.inline) && (s = !1), u = H.inline), s && f.push((0, Y.TEXT)(`
`)), f.push(a);
  }
  return f.map((a) => ae(a)).join("");
}
S.stringifyTree = w;
function le(d, f) {
  if (f(d), d.children != null)
    for (const u of d.children)
      le(u, f);
}
S.inspectOne = le;
var ee = {};
Object.defineProperty(ee, "__esModule", {
  value: !0
});
ee.default = /(?:\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83e\udef1\ud83c\udffb\u200d\ud83e\udef2\ud83c[\udffc-\udfff]|\ud83e\udef1\ud83c\udffc\u200d\ud83e\udef2\ud83c[\udffb\udffd-\udfff]|\ud83e\udef1\ud83c\udffd\u200d\ud83e\udef2\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\udef1\ud83c\udffe\u200d\ud83e\udef2\ud83c[\udffb-\udffd\udfff]|\ud83e\udef1\ud83c\udfff\u200d\ud83e\udef2\ud83c[\udffb-\udffe]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d\udc8f\ud83c[\udffb-\udfff]|\ud83d\udc91\ud83c[\udffb-\udfff]|\ud83e\udd1d\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d\udc8f\udc91]|\ud83e\udd1d)|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf7c\udf84\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc70\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd4\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83d\ude36\u200d\ud83c\udf2b\ufe0f|\u2764\ufe0f\u200d\ud83d\udd25|\u2764\ufe0f\u200d\ud83e\ude79|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc3b\u200d\u2744\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83d\ude2e\u200d\ud83d\udca8|\ud83d\ude35\u200d\ud83d\udcab|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f|\ud83d\udc08\u200d\u2b1b|\ud83d\udc26\u200d\u2b1b)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|\ud83e\udef0|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0c\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\udd77\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd\udec3-\udec5\udef1-\udef8]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udc8e\udc90\udc92-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5-\uded7\udedc-\udedf\udeeb\udeec\udef4-\udefc\udfe0-\udfeb\udff0]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd76\udd78-\uddb4\uddb7\uddba\uddbc-\uddcc\uddd0\uddde-\uddff\ude70-\ude7c\ude80-\ude88\ude90-\udebd\udebf-\udec2\udece-\udedb\udee0-\udee8]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g;
var ue;
function Me() {
  if (ue)
    return J;
  ue = 1;
  var d = D && D.__createBinding || (Object.create ? function(n, c, t, o) {
    o === void 0 && (o = t);
    var _ = Object.getOwnPropertyDescriptor(c, t);
    (!_ || ("get" in _ ? !c.__esModule : _.writable || _.configurable)) && (_ = { enumerable: !0, get: function() {
      return c[t];
    } }), Object.defineProperty(n, o, _);
  } : function(n, c, t, o) {
    o === void 0 && (o = t), n[o] = c[t];
  }), f = D && D.__setModuleDefault || (Object.create ? function(n, c) {
    Object.defineProperty(n, "default", { enumerable: !0, value: c });
  } : function(n, c) {
    n.default = c;
  }), u = D && D.__importStar || function(n) {
    if (n && n.__esModule)
      return n;
    var c = {};
    if (n != null)
      for (var t in n)
        t !== "default" && Object.prototype.hasOwnProperty.call(n, t) && d(c, n, t);
    return f(c, n), c;
  }, a = D && D.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(J, "__esModule", { value: !0 }), J.language = void 0;
  const s = u(ie()), e = u(oe), r = S, O = a(ee), I = e.regexp(/[\u0020\u3000\t]/), q = e.regexp(/[a-z0-9]/i), $ = e.alt([e.crlf, e.cr, e.lf]);
  function P(n) {
    return new e.Parser((c, t, o) => {
      const _ = [];
      let l = t;
      for (let b = 0; b < n.length; b++) {
        const g = n[b].handler(c, l, o);
        if (!g.success)
          return l === t ? e.failure() : e.success(l, c.slice(t, l));
        _.push(g.value), l = g.index;
      }
      return e.success(l, _);
    });
  }
  const y = new e.Parser((n, c, t) => t.linkLabel ? e.failure() : e.success(c, null)), p = new e.Parser((n, c, t) => t.depth < t.nestLimit ? e.success(c, null) : e.failure());
  function m(n, c) {
    const t = e.alt([
      e.seq([p, n], 1),
      c ?? e.char
    ]);
    return new e.Parser((o, _, l) => {
      l.depth++;
      const b = t.handler(o, _, l);
      return l.depth--, b;
    });
  }
  return J.language = e.createLanguage({
    fullParser: (n) => n.full.many(0),
    simpleParser: (n) => n.simple.many(0),
    full: (n) => e.alt([
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
    simple: (n) => e.alt([
      n.unicodeEmoji,
      n.emojiCode,
      n.text
    ]),
    inline: (n) => e.alt([
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
      const c = e.seq([
        e.str(">"),
        I.option(),
        e.seq([e.notMatch($), e.char], 1).many(0).text()
      ], 2).sep($, 1), t = e.seq([
        $.option(),
        $.option(),
        e.lineBegin,
        c,
        $.option(),
        $.option()
      ], 3);
      return new e.Parser((o, _, l) => {
        let b;
        if (b = t.handler(o, _, l), !b.success)
          return b;
        const g = b.value, i = b.index;
        return g.length === 1 && g[0].length === 0 ? e.failure() : (b = m(n.fullParser).many(0).handler(g.join(`
`), 0, l), b.success ? e.success(i, s.QUOTE((0, r.mergeText)(b.value))) : b);
      });
    },
    codeBlock: (n) => {
      const c = e.str("```");
      return e.seq([
        $.option(),
        e.lineBegin,
        c,
        e.seq([e.notMatch($), e.char], 1).many(0),
        $,
        e.seq([e.notMatch(e.seq([$, c, e.lineEnd])), e.char], 1).many(1),
        $,
        c,
        e.lineEnd,
        $.option()
      ]).map((t) => {
        const o = t[3].join("").trim(), _ = t[5].join("");
        return s.CODE_BLOCK(_, o.length > 0 ? o : null);
      });
    },
    mathBlock: (n) => {
      const c = e.str("\\["), t = e.str("\\]");
      return e.seq([
        $.option(),
        e.lineBegin,
        c,
        $.option(),
        e.seq([e.notMatch(e.seq([$.option(), t])), e.char], 1).many(1),
        $.option(),
        t,
        e.lineEnd,
        $.option()
      ]).map((o) => {
        const _ = o[4].join("");
        return s.MATH_BLOCK(_);
      });
    },
    centerTag: (n) => {
      const c = e.str("<center>"), t = e.str("</center>");
      return e.seq([
        $.option(),
        e.lineBegin,
        c,
        $.option(),
        e.seq([e.notMatch(e.seq([$.option(), t])), m(n.inline)], 1).many(1),
        $.option(),
        t,
        e.lineEnd,
        $.option()
      ]).map((o) => s.CENTER((0, r.mergeText)(o[4])));
    },
    big: (n) => {
      const c = e.str("***");
      return P([
        c,
        e.seq([e.notMatch(c), m(n.inline)], 1).many(1),
        c
      ]).map((t) => typeof t == "string" ? t : s.FN("tada", {}, (0, r.mergeText)(t[1])));
    },
    boldAsta: (n) => {
      const c = e.str("**");
      return P([
        c,
        e.seq([e.notMatch(c), m(n.inline)], 1).many(1),
        c
      ]).map((t) => typeof t == "string" ? t : s.BOLD((0, r.mergeText)(t[1])));
    },
    boldTag: (n) => {
      const c = e.str("<b>"), t = e.str("</b>");
      return P([
        c,
        e.seq([e.notMatch(t), m(n.inline)], 1).many(1),
        t
      ]).map((o) => typeof o == "string" ? o : s.BOLD((0, r.mergeText)(o[1])));
    },
    boldUnder: (n) => {
      const c = e.str("__");
      return e.seq([
        c,
        e.alt([q, I]).many(1),
        c
      ]).map((t) => s.BOLD((0, r.mergeText)(t[1])));
    },
    smallTag: (n) => {
      const c = e.str("<small>"), t = e.str("</small>");
      return P([
        c,
        e.seq([e.notMatch(t), m(n.inline)], 1).many(1),
        t
      ]).map((o) => typeof o == "string" ? o : s.SMALL((0, r.mergeText)(o[1])));
    },
    italicTag: (n) => {
      const c = e.str("<i>"), t = e.str("</i>");
      return P([
        c,
        e.seq([e.notMatch(t), m(n.inline)], 1).many(1),
        t
      ]).map((o) => typeof o == "string" ? o : s.ITALIC((0, r.mergeText)(o[1])));
    },
    italicAsta: (n) => {
      const c = e.str("*"), t = e.seq([
        c,
        e.alt([q, I]).many(1),
        c
      ]);
      return new e.Parser((o, _, l) => {
        const b = t.handler(o, _, l);
        if (!b.success)
          return e.failure();
        const g = o.slice(0, _);
        return /[a-z0-9]$/i.test(g) ? e.failure() : e.success(b.index, s.ITALIC((0, r.mergeText)(b.value[1])));
      });
    },
    italicUnder: (n) => {
      const c = e.str("_"), t = e.seq([
        c,
        e.alt([q, I]).many(1),
        c
      ]);
      return new e.Parser((o, _, l) => {
        const b = t.handler(o, _, l);
        if (!b.success)
          return e.failure();
        const g = o.slice(0, _);
        return /[a-z0-9]$/i.test(g) ? e.failure() : e.success(b.index, s.ITALIC((0, r.mergeText)(b.value[1])));
      });
    },
    strikeTag: (n) => {
      const c = e.str("<s>"), t = e.str("</s>");
      return P([
        c,
        e.seq([e.notMatch(t), m(n.inline)], 1).many(1),
        t
      ]).map((o) => typeof o == "string" ? o : s.STRIKE((0, r.mergeText)(o[1])));
    },
    strikeWave: (n) => {
      const c = e.str("~~");
      return P([
        c,
        e.seq([e.notMatch(e.alt([c, $])), m(n.inline)], 1).many(1),
        c
      ]).map((t) => typeof t == "string" ? t : s.STRIKE((0, r.mergeText)(t[1])));
    },
    unicodeEmoji: (n) => {
      const c = RegExp(O.default.source);
      return e.regexp(c).map((t) => s.UNI_EMOJI(t));
    },
    plainTag: (n) => {
      const c = e.str("<plain>"), t = e.str("</plain>");
      return e.seq([
        c,
        $.option(),
        e.seq([
          e.notMatch(e.seq([$.option(), t])),
          e.char
        ], 1).many(1).text(),
        $.option(),
        t
      ], 2).map((o) => s.PLAIN(o));
    },
    fn: (n) => {
      const c = new e.Parser((l, b, g) => {
        const i = e.regexp(/[a-z0-9_]+/i).handler(l, b, g);
        return i.success ? e.success(i.index, i.value) : i;
      }), t = e.seq([
        e.regexp(/[a-z0-9_]+/i),
        e.seq([
          e.str("="),
          e.regexp(/[a-z0-9_.-]+/i)
        ], 1).option()
      ]).map((l) => ({
        k: l[0],
        v: l[1] != null ? l[1] : !0
      })), o = e.seq([
        e.str("."),
        t.sep(e.str(","), 1)
      ], 1).map((l) => {
        const b = {};
        for (const g of l)
          b[g.k] = g.v;
        return b;
      }), _ = e.str("]");
      return P([
        e.str("$["),
        c,
        o.option(),
        e.str(" "),
        e.seq([e.notMatch(_), m(n.inline)], 1).many(1),
        _
      ]).map((l) => {
        if (typeof l == "string")
          return l;
        const b = l[1], g = l[2] || {}, i = l[4];
        return s.FN(b, g, (0, r.mergeText)(i));
      });
    },
    inlineCode: (n) => {
      const c = e.str("`");
      return e.seq([
        c,
        e.seq([
          e.notMatch(e.alt([c, e.str("´"), $])),
          e.char
        ], 1).many(1),
        c
      ]).map((t) => s.INLINE_CODE(t[1].join("")));
    },
    mathInline: (n) => {
      const c = e.str("\\("), t = e.str("\\)");
      return e.seq([
        c,
        e.seq([
          e.notMatch(e.alt([t, $])),
          e.char
        ], 1).many(1),
        t
      ]).map((o) => s.MATH_INLINE(o[1].join("")));
    },
    mention: (n) => {
      const c = e.seq([
        y,
        e.str("@"),
        e.regexp(/[a-z0-9_-]+/i),
        e.seq([
          e.str("@"),
          e.regexp(/[a-z0-9_.-]+/i)
        ], 1).option()
      ]);
      return new e.Parser((t, o, _) => {
        let l;
        if (l = c.handler(t, o, _), !l.success)
          return e.failure();
        const b = t.slice(0, o);
        if (/[a-z0-9]$/i.test(b))
          return e.failure();
        let g = !1;
        const i = l.index, T = l.value[2], j = l.value[3];
        let L = j;
        j != null && (l = /[.-]+$/.exec(j), l != null && (L = j.slice(0, -1 * l[0].length), L.length === 0 && (g = !0, L = null)));
        let F = T;
        if (l = /-+$/.exec(T), l != null && (L == null ? F = T.slice(0, -1 * l[0].length) : g = !0), (F.length === 0 || F[0] === "-") && (g = !0), L != null && /^[.-]/.test(L) && (g = !0), g)
          return e.success(i, t.slice(o, i));
        const de = L != null ? `@${F}@${L}` : `@${F}`;
        return e.success(o + de.length, s.MENTION(F, L, de));
      });
    },
    hashtag: (n) => {
      const c = e.str("#"), t = e.seq([
        e.notMatch(e.alt([e.regexp(/[ \u3000\t.,!?'"#:/[\]【】()「」（）<>]/), I, $])),
        e.char
      ], 1), o = e.lazy(() => e.alt([
        e.seq([
          e.str("("),
          m(o, t).many(0),
          e.str(")")
        ]),
        e.seq([
          e.str("["),
          m(o, t).many(0),
          e.str("]")
        ]),
        e.seq([
          e.str("「"),
          m(o, t).many(0),
          e.str("」")
        ]),
        e.seq([
          e.str("（"),
          m(o, t).many(0),
          e.str("）")
        ]),
        t
      ])), _ = e.seq([
        y,
        c,
        o.many(1).text()
      ], 2);
      return new e.Parser((l, b, g) => {
        const i = _.handler(l, b, g);
        if (!i.success)
          return e.failure();
        const T = l.slice(0, b);
        if (/[a-z0-9]$/i.test(T))
          return e.failure();
        const j = i.index, L = i.value;
        return /^[0-9]+$/.test(L) ? e.failure() : e.success(j, s.HASHTAG(L));
      });
    },
    emojiCode: (n) => {
      const c = e.notMatch(e.regexp(/[a-z0-9]/i)), t = e.str(":");
      return e.seq([
        e.alt([e.lineBegin, c]),
        t,
        e.regexp(/[a-z0-9_+-]+/i),
        t,
        e.alt([e.lineEnd, c])
      ], 2).map((o) => s.EMOJI_CODE(o));
    },
    link: (n) => {
      const c = new e.Parser((o, _, l) => {
        l.linkLabel = !0;
        const b = n.inline.handler(o, _, l);
        return l.linkLabel = !1, b;
      }), t = e.str("]");
      return e.seq([
        y,
        e.alt([e.str("?["), e.str("[")]),
        e.seq([
          e.notMatch(e.alt([t, $])),
          m(c)
        ], 1).many(1),
        t,
        e.str("("),
        e.alt([n.urlAlt, n.url]),
        e.str(")")
      ]).map((o) => {
        const _ = o[1] === "?[", l = o[2], b = o[5];
        return s.LINK(_, b.props.url, (0, r.mergeText)(l));
      });
    },
    url: (n) => {
      const c = e.regexp(/[.,a-z0-9_/:%#@$&?!~=+-]/i), t = e.lazy(() => e.alt([
        e.seq([
          e.str("("),
          m(t, c).many(0),
          e.str(")")
        ]),
        e.seq([
          e.str("["),
          m(t, c).many(0),
          e.str("]")
        ]),
        c
      ])), o = e.seq([
        y,
        e.regexp(/https?:\/\//),
        t.many(1).text()
      ]);
      return new e.Parser((_, l, b) => {
        let g;
        if (g = o.handler(_, l, b), !g.success)
          return e.failure();
        const i = g.index;
        let T = i;
        const j = g.value[1];
        let L = g.value[2];
        return g = /[.,]+$/.exec(L), g != null && (T -= g[0].length, L = L.slice(0, -1 * g[0].length), L.length === 0) ? e.success(i, _.slice(l, i)) : e.success(T, s.N_URL(j + L, !1));
      });
    },
    urlAlt: (n) => {
      const c = e.str("<"), t = e.str(">"), o = e.seq([
        y,
        c,
        e.regexp(/https?:\/\//),
        e.seq([e.notMatch(e.alt([t, I])), e.char], 1).many(1),
        t
      ]).text();
      return new e.Parser((_, l, b) => {
        const g = o.handler(_, l, b);
        if (!g.success)
          return e.failure();
        const i = g.value.slice(1, g.value.length - 1);
        return e.success(g.index, s.N_URL(i, !0));
      });
    },
    search: (n) => {
      const c = e.alt([
        e.regexp(/\[(検索|search)\]/i),
        e.regexp(/(検索|search)/i)
      ]);
      return e.seq([
        $.option(),
        e.lineBegin,
        e.seq([
          e.notMatch(e.alt([
            $,
            e.seq([I, c, e.lineEnd])
          ])),
          e.char
        ], 1).many(1),
        I,
        c,
        e.lineEnd,
        $.option()
      ]).map((t) => {
        const o = t[2].join("");
        return s.SEARCH(o, `${o}${t[3]}${t[4]}`);
      });
    },
    text: (n) => e.char
  }), J;
}
var ne;
function Oe() {
  if (ne)
    return U;
  ne = 1, Object.defineProperty(U, "__esModule", { value: !0 }), U.simpleParser = U.fullParser = void 0;
  const d = Me(), f = S;
  function u(s, e) {
    const r = d.language.fullParser.handler(s, 0, {
      nestLimit: e.nestLimit != null ? e.nestLimit : 20,
      depth: 0,
      linkLabel: !1,
      trace: !1
    });
    return (0, f.mergeText)(r.value);
  }
  U.fullParser = u;
  function a(s) {
    const e = d.language.simpleParser.handler(s, 0, {});
    return (0, f.mergeText)(e.value);
  }
  return U.simpleParser = a, U;
}
var te;
function Ee() {
  if (te)
    return A;
  te = 1, Object.defineProperty(A, "__esModule", { value: !0 }), A.extract = A.inspect = A.toString = A.parseSimple = A.parse = void 0;
  const d = Oe(), f = S;
  function u(O, I = {}) {
    return (0, d.fullParser)(O, {
      nestLimit: I.nestLimit
    });
  }
  A.parse = u;
  function a(O) {
    return (0, d.simpleParser)(O);
  }
  A.parseSimple = a;
  function s(O) {
    return Array.isArray(O) ? (0, f.stringifyTree)(O) : (0, f.stringifyNode)(O);
  }
  A.toString = s;
  function e(O, I) {
    if (Array.isArray(O))
      for (const q of O)
        (0, f.inspectOne)(q, I);
    else
      (0, f.inspectOne)(O, I);
  }
  A.inspect = e;
  function r(O, I) {
    const q = [];
    return e(O, ($) => {
      I($) && q.push($);
    }), q;
  }
  return A.extract = r, A;
}
var ce;
function ie() {
  return ce || (ce = 1, function(d) {
    Object.defineProperty(d, "__esModule", { value: !0 }), d.TEXT = d.PLAIN = d.FN = d.LINK = d.N_URL = d.HASHTAG = d.MENTION = d.MATH_INLINE = d.INLINE_CODE = d.STRIKE = d.ITALIC = d.SMALL = d.BOLD = d.EMOJI_CODE = d.UNI_EMOJI = d.CENTER = d.MATH_BLOCK = d.CODE_BLOCK = d.SEARCH = d.QUOTE = d.extract = d.inspect = d.toString = d.parseSimple = d.parse = void 0;
    var f = Ee();
    Object.defineProperty(d, "parse", { enumerable: !0, get: function() {
      return f.parse;
    } }), Object.defineProperty(d, "parseSimple", { enumerable: !0, get: function() {
      return f.parseSimple;
    } }), Object.defineProperty(d, "toString", { enumerable: !0, get: function() {
      return f.toString;
    } }), Object.defineProperty(d, "inspect", { enumerable: !0, get: function() {
      return f.inspect;
    } }), Object.defineProperty(d, "extract", { enumerable: !0, get: function() {
      return f.extract;
    } });
    var u = x;
    Object.defineProperty(d, "QUOTE", { enumerable: !0, get: function() {
      return u.QUOTE;
    } }), Object.defineProperty(d, "SEARCH", { enumerable: !0, get: function() {
      return u.SEARCH;
    } }), Object.defineProperty(d, "CODE_BLOCK", { enumerable: !0, get: function() {
      return u.CODE_BLOCK;
    } }), Object.defineProperty(d, "MATH_BLOCK", { enumerable: !0, get: function() {
      return u.MATH_BLOCK;
    } }), Object.defineProperty(d, "CENTER", { enumerable: !0, get: function() {
      return u.CENTER;
    } }), Object.defineProperty(d, "UNI_EMOJI", { enumerable: !0, get: function() {
      return u.UNI_EMOJI;
    } }), Object.defineProperty(d, "EMOJI_CODE", { enumerable: !0, get: function() {
      return u.EMOJI_CODE;
    } }), Object.defineProperty(d, "BOLD", { enumerable: !0, get: function() {
      return u.BOLD;
    } }), Object.defineProperty(d, "SMALL", { enumerable: !0, get: function() {
      return u.SMALL;
    } }), Object.defineProperty(d, "ITALIC", { enumerable: !0, get: function() {
      return u.ITALIC;
    } }), Object.defineProperty(d, "STRIKE", { enumerable: !0, get: function() {
      return u.STRIKE;
    } }), Object.defineProperty(d, "INLINE_CODE", { enumerable: !0, get: function() {
      return u.INLINE_CODE;
    } }), Object.defineProperty(d, "MATH_INLINE", { enumerable: !0, get: function() {
      return u.MATH_INLINE;
    } }), Object.defineProperty(d, "MENTION", { enumerable: !0, get: function() {
      return u.MENTION;
    } }), Object.defineProperty(d, "HASHTAG", { enumerable: !0, get: function() {
      return u.HASHTAG;
    } }), Object.defineProperty(d, "N_URL", { enumerable: !0, get: function() {
      return u.N_URL;
    } }), Object.defineProperty(d, "LINK", { enumerable: !0, get: function() {
      return u.LINK;
    } }), Object.defineProperty(d, "FN", { enumerable: !0, get: function() {
      return u.FN;
    } }), Object.defineProperty(d, "PLAIN", { enumerable: !0, get: function() {
      return u.PLAIN;
    } }), Object.defineProperty(d, "TEXT", { enumerable: !0, get: function() {
      return u.TEXT;
    } });
  }(V)), V;
}
var fe = ie();
const me = Symbol("mfmClickEv");
function Te(d, f) {
  return d == null || d === "" ? [] : f ? fe.parseSimple(d) : fe.parse(d);
}
function Z(d) {
  return d.replace(/(^.)(.*)/, (f, u, a) => `${u.toUpperCase() + a}`);
}
const Ie = Q({
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
    getComponent: Z
  }
}), Le = {
  key: 0,
  style: { border: "solid 1px red" }
};
function je(d, f, u, a, s, e) {
  return h(), C(K, null, [
    (h(!0), C(K, null, W(d.tokens, (r) => (h(), E(re(`${d.getComponent(r.type)}`), {
      style: M(d.style),
      className: d.className,
      token: r.props,
      children: r.children
    }, null, 8, ["style", "className", "token", "children"]))), 256)),
    d.debugMode ? (h(), C("div", Le, [
      (h(!0), C(K, null, W(d.tokens, (r) => (h(), C("div", null, [
        B("p", null, "Selected: " + v(d.getComponent(r.type)), 1),
        B("pre", null, v(r), 1)
      ]))), 256))
    ])) : G("", !0)
  ], 64);
}
const pe = /* @__PURE__ */ k(Ie, [["render", je]]), ve = {
  props: ["children"]
}, qe = { class: "bold" };
function Ae(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), C("b", qe, [
    R(r, { tokens: u.children }, null, 8, ["tokens"])
  ]);
}
const Pe = /* @__PURE__ */ k(ve, [["render", Ae]]), Se = {
  props: ["children"]
}, we = { class: "italic" };
function Be(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), C("i", we, [
    R(r, { tokens: u.children }, null, 8, ["tokens"])
  ]);
}
const Re = /* @__PURE__ */ k(Se, [["render", Be]]), De = {
  props: ["children"]
}, He = {
  class: "quote",
  style: { display: "block", margin: "8px", padding: "6px 0px 6px 12px", color: "var(--fg)", "border-left": "solid 3px var(--fg)", opacity: "0.7" }
};
function Ue(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), C("div", He, [
    R(r, { tokens: u.children }, null, 8, ["tokens"])
  ]);
}
const Ke = /* @__PURE__ */ k(De, [["render", Ue]]), ze = {
  props: ["children", "token", "style"]
}, Fe = {
  class: "small",
  style: { opacity: "0.7" }
};
function Je(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), C("small", Fe, [
    R(r, { tokens: u.children }, null, 8, ["tokens"])
  ]);
}
const Qe = /* @__PURE__ */ k(ze, [["render", Je]]), Xe = {
  props: ["children", "class", "className"]
}, Ge = { class: "center" };
function Ve(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), C("div", Ge, [
    R(r, { tokens: u.children }, null, 8, ["tokens"])
  ]);
}
const We = /* @__PURE__ */ k(Xe, [["render", Ve]]), Ye = Q({
  inject: ["emojis"],
  computed: {
    // provide 側は object でも computed でもよい
    emojiMap() {
      return se(this.emojis) ?? {};
    }
  },
  props: ["token", "children", "className", "class", "style"]
}), Ze = ["src"], xe = { key: 1 };
function ed(d, f, u, a, s, e) {
  return d.emojiMap[d.token.name] ? (h(), C("img", {
    key: 0,
    src: d.emojiMap[d.token.name].url,
    class: "emoji"
  }, null, 8, Ze)) : (h(), C("span", xe, ":" + v(d.token.name) + ":", 1));
}
const dd = /* @__PURE__ */ k(Ye, [["render", ed], ["__scopeId", "data-v-329646c8"]]), ud = Q({
  props: ["token", "children", "style", "className"],
  inject: ["domain"],
  data() {
    return {
      user: void 0
    };
  },
  computed: {
    // provide 側は文字列でも computed でもよい
    domainName() {
      return se(this.domain) ?? null;
    }
  },
  watch: {
    token: {
      immediate: !0,
      async handler() {
        const d = this.token.host ?? this.domainName;
        if (!d)
          return;
        const f = await fetch(
          `https://${d}/api/users/search-by-username-and-host`,
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
        ).catch(() => null);
        f != null && f.ok && (this.user = (await f.json())[0]);
      }
    }
  }
}), nd = ["href"], td = ["src"];
function cd(d, f, u, a, s, e) {
  return h(), C("a", {
    class: "mention",
    href: d.token.host ?? "https://" + d.domainName + "/" + d.token.acct
  }, [
    d.user ? (h(), C("img", {
      key: 0,
      class: "avatar",
      src: d.user.avatarUrl
    }, null, 8, td)) : G("", !0),
    z(v(d.token.acct), 1)
  ], 8, nd);
}
const fd = /* @__PURE__ */ k(ud, [["render", cd]]), rd = {
  props: ["children", "token", "style", "className"]
};
function sd(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), E(r, { tokens: u.children }, null, 8, ["tokens"]);
}
const od = /* @__PURE__ */ k(rd, [["render", sd]]), ad = {
  props: ["token", "children", "style", "className"]
}, ld = { class: "block-code" };
function id(d, f, u, a, s, e) {
  return h(), C(K, null, [
    z(v(u.token.lang) + " ", 1),
    B("pre", ld, [
      z("    "),
      B("code", null, v(u.token.code), 1),
      z(`
  `)
    ])
  ], 64);
}
const md = /* @__PURE__ */ k(ad, [["render", id]]), pd = {
  props: ["token", "children", "style", "className"]
}, _d = { class: "inline-code" };
function hd(d, f, u, a, s, e) {
  return h(), C("pre", _d, v(u.token.code), 1);
}
const bd = /* @__PURE__ */ k(pd, [["render", hd]]), yd = {
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
}, gd = { class: "search" };
function $d(d, f, u, a, s, e) {
  return h(), C("div", gd, [
    _e(B("input", {
      type: "text",
      "onUpdate:modelValue": f[0] || (f[0] = (r) => s.currentQuery = r)
    }, null, 512), [
      [he, s.currentQuery]
    ]),
    B("button", {
      onClick: f[1] || (f[1] = (...r) => e.search && e.search(...r))
    }, "検索")
  ]);
}
const kd = /* @__PURE__ */ k(yd, [["render", $d]]), Nd = {
  props: ["token", "children"]
}, Cd = { class: "strike" };
function Md(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), C("del", Cd, [
    R(r, { tokens: u.children }, null, 8, ["tokens"])
  ]);
}
const Od = /* @__PURE__ */ k(Nd, [["render", Md]]), Ed = {
  props: ["children", "token", "class", "style"]
};
function Td(d, f, u, a, s, e) {
  return h(), C("span", {
    style: M(u.style)
  }, v(u.token.emoji), 5);
}
const Id = /* @__PURE__ */ k(Ed, [["render", Td]]), Ld = {
  name: "Url.vue",
  props: {
    token: {
      type: Object
    },
    children: {
      type: Object
    }
  }
}, jd = ["href", "textContent"];
function vd(d, f, u, a, s, e) {
  return h(), C("a", {
    class: "url",
    href: u.token.url,
    textContent: v(u.token.url)
  }, null, 8, jd);
}
const qd = /* @__PURE__ */ k(Ld, [["render", vd]]), Ad = Q({
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
}), Pd = { key: 0 }, Sd = ["href"];
function wd(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), C(K, null, [
    d.debugMode ? (h(), C("span", Pd, "silent - " + v(d.token.silent), 1)) : G("", !0),
    B("a", {
      class: X(["link", d.className]),
      href: d.token.url,
      style: M(d.style)
    }, [
      R(r, { tokens: d.children }, null, 8, ["tokens"])
    ], 14, Sd)
  ], 64);
}
const Bd = /* @__PURE__ */ k(Ad, [["render", wd]]), Rd = {
  props: ["token", "children", "style"]
}, Dd = ["href"];
function Hd(d, f, u, a, s, e) {
  return h(), C("a", {
    class: "hashtag",
    href: "/tags/" + u.token.hashtag
  }, "#" + v(u.token.hashtag), 9, Dd);
}
const Ud = /* @__PURE__ */ k(Rd, [["render", Hd]]), Kd = {
  methods: { getComponent: Z },
  computed: {
    // 未対応の関数は Misskey と同じく $[name ...] の形のまま表示する
    isSupported() {
      const d = Z(this.token.name);
      return this.$.appContext.components[d] != null;
    }
  },
  props: ["token", "tokens", "children", "style", "className"]
};
function zd(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return e.isSupported ? (h(), E(re(e.getComponent(u.token.name)), {
    key: 1,
    className: `Fn ${u.token.name} ${u.className ?? ""}`,
    token: u.token,
    children: u.children,
    style: M(u.style)
  }, null, 8, ["className", "token", "children", "style"])) : (h(), C("span", {
    key: 0,
    class: X(`Fn ${u.className ?? ""}`),
    style: M(u.style)
  }, [
    z("$[" + v(u.token.name) + " ", 1),
    R(r, { tokens: u.children }, null, 8, ["tokens"]),
    z("]")
  ], 6));
}
const Fd = /* @__PURE__ */ k(Kd, [["render", zd]]), Jd = {
  props: ["token", "children", "style", "className"]
};
function Qd(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), E(r, {
    className: `fg ${u.className ?? ""}`,
    tokens: u.children,
    style: M([{ color: `#${u.token.args.color}` }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const Xd = /* @__PURE__ */ k(Jd, [["render", Qd]]), Gd = {
  props: ["token", "children", "style", "className"]
};
function Vd(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), E(r, {
    className: `bg ${u.className ?? ""}`,
    tokens: u.children,
    style: M([{ background: `#${u.token.args.color}` }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const Wd = /* @__PURE__ */ k(Gd, [["render", Vd]]), Yd = {
  props: ["token", "children", "style", "className"]
};
function Zd(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), E(r, {
    className: `fg ${u.className ?? ""}`,
    tokens: u.children,
    style: M([{ fontFamily: Object.keys(u.token.args) }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const xd = /* @__PURE__ */ k(Yd, [["render", Zd]]), eu = {
  props: ["token", "children", "style", "className"]
};
function du(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), E(r, {
    className: `blur ${u.className ?? ""}`,
    tokens: u.children,
    style: M([{ fontFamily: Object.keys(u.token.args) }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const uu = /* @__PURE__ */ k(eu, [["render", du]]), nu = {
  props: ["token", "children", "style", "className"]
};
function tu(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), E(r, {
    className: `flip ${u.className ?? ""}`,
    tokens: u.children,
    style: M([
      {
        transform: `scale(${u.token.args.h ? 1 : -1}, ${u.token.args.v ? -1 : 1})`
      },
      u.style
    ])
  }, null, 8, ["className", "tokens", "style"]);
}
const cu = /* @__PURE__ */ k(nu, [["render", tu]]), fu = {
  props: ["token", "children", "style", "className"]
};
function ru(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), E(r, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: M([
      {
        transform: `scale(${u.token.args.x}, ${u.token.args.y})`
      },
      u.style
    ])
  }, null, 8, ["className", "tokens", "style"]);
}
const su = /* @__PURE__ */ k(fu, [["render", ru]]), ou = {
  props: ["token", "children", "style", "className"]
};
function au(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), E(r, {
    className: `position ${u.className ?? ""}`,
    tokens: u.children,
    style: M([
      {
        transform: `translateX(${u.token.args.x}em) translateY(${u.token.args.y}em)`
      },
      u.style
    ])
  }, null, 8, ["className", "tokens", "style"]);
}
const lu = /* @__PURE__ */ k(ou, [["render", au]]), iu = {
  props: ["token", "children", "style", "className"]
};
function mu(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), E(r, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: M([{ fontSize: "200%" }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const pu = /* @__PURE__ */ k(iu, [["render", mu]]), _u = {
  props: ["token", "children", "style", "className"]
};
function hu(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), E(r, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: M([{ fontSize: "300%" }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const bu = /* @__PURE__ */ k(_u, [["render", hu]]), yu = {
  props: ["token", "children", "style", "className"]
};
function gu(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), E(r, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: M([{ fontSize: "400%" }, u.style])
  }, null, 8, ["className", "tokens", "style"]);
}
const $u = /* @__PURE__ */ k(yu, [["render", gu]]), ku = {
  props: ["token", "children", "style", "className"]
};
function Nu(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), E(r, {
    className: `position ${u.className ?? ""}`,
    tokens: u.children,
    style: M([
      {
        animation: `${u.token.args.speed ?? "0.75s"} linear 0s infinite normal none running mfm-jump`
      },
      u.style
    ])
  }, null, 8, ["className", "tokens", "style"]);
}
const Cu = /* @__PURE__ */ k(ku, [["render", Nu]]), Mu = {
  props: ["token", "children", "style", "className"]
};
function Ou(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), E(r, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: M([
      {
        animation: `${u.token.args.speed ?? "1s"} linear 0s infinite normal both running tada`
      },
      u.style
    ])
  }, null, 8, ["className", "tokens", "style"]);
}
const Eu = /* @__PURE__ */ k(Mu, [["render", Ou]]), Tu = {
  props: ["token", "children", "style", "className"]
};
function Iu(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), E(r, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: M([
      {
        animation: `${u.token.args.speed ?? "1s"} linear 0s infinite normal both running mfm-rubberBand`
      },
      u.style
    ])
  }, null, 8, ["className", "tokens", "style"]);
}
const Lu = /* @__PURE__ */ k(Tu, [["render", Iu]]), ju = {
  props: ["token", "children", "style", "className"]
};
function vu(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), E(r, {
    className: `position ${u.className ?? ""}`,
    tokens: u.children,
    style: M([
      {
        animation: `${u.token.args.speed ?? "1.5s"} linear 0s infinite normal none running mfm-spin`
      },
      u.style
    ])
  }, null, 8, ["className", "tokens", "style"]);
}
const qu = /* @__PURE__ */ k(ju, [["render", vu]]), Au = {
  props: ["token", "children", "style", "className"]
};
function Pu(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), E(r, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: M([
      {
        animation: `${u.token.args.speed ?? "1s"} linear 0s infinite normal none running mfm-twitch`
      },
      u.style
    ])
  }, null, 8, ["className", "tokens", "style"]);
}
const Su = /* @__PURE__ */ k(Au, [["render", Pu]]), wu = {
  props: ["token", "children", "style", "className"]
};
function Bu(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), E(r, {
    className: `position ${u.className ?? ""}`,
    tokens: u.children,
    style: M([
      {
        animation: `${u.token.args.speed ?? "0.5s"} ease 0s infinite normal none running mfm-shake`
      },
      u.style
    ])
  }, null, 8, ["className", "tokens", "style"]);
}
const Ru = /* @__PURE__ */ k(wu, [["render", Bu]]), Du = {
  props: ["token", "children", "style", "className"]
};
function Hu(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), E(r, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: M([
      {
        animation: `${u.token.args.speed ?? "0.75s"} linear 0s infinite normal none running mfm-bounce`,
        transformOrigin: "center bottom"
      },
      u.style
    ])
  }, null, 8, ["className", "tokens", "style"]);
}
const Uu = /* @__PURE__ */ k(Du, [["render", Hu]]), Ku = {
  props: ["token", "children", "style", "className"]
};
function zu(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), E(r, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: M([
      {
        animation: `${u.token.args.speed ?? "0.5s"} ease 0s infinite normal none running mfm-rainbow`
      },
      u.style
    ])
  }, null, 8, ["className", "tokens", "style"]);
}
const Fu = /* @__PURE__ */ k(Ku, [["render", zu]]), Ju = {
  props: ["children", "token", "style", "className"],
  computed: {
    ruby() {
      const d = this.children[0].props.text.split(" ");
      return {
        body: d[0],
        yomi: d[1]
      };
    }
  }
};
function Qu(d, f, u, a, s, e) {
  return h(), C("ruby", null, [
    z(v(e.ruby.body) + " ", 1),
    B("rt", null, v(e.ruby.yomi), 1)
  ]);
}
const Xu = /* @__PURE__ */ k(Ju, [["render", Qu]]), Gu = {
  props: ["token", "children", "style", "className"]
};
function Vu(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), E(r, {
    className: `rotate ${u.className ?? ""}`,
    tokens: u.children,
    style: M([
      {
        transform: `rotate(${u.token.args.deg ?? 90}deg)`
      },
      u.style
    ])
  }, null, 8, ["className", "tokens", "style"]);
}
const Wu = /* @__PURE__ */ k(Gu, [["render", Vu]]), Yu = {
  props: ["token", "children", "style", "className"],
  setup(d) {
    const f = be(me, () => {
    });
    return {
      onClick() {
        const u = d.token.args.ev;
        f(typeof u == "string" ? u : "");
      }
    };
  }
};
function Zu(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), C("span", {
    class: X(`clickable ${u.className ?? ""}`),
    style: M(u.style),
    onClick: f[0] || (f[0] = ye((...O) => a.onClick && a.onClick(...O), ["stop", "prevent"]))
  }, [
    R(r, { tokens: u.children }, null, 8, ["tokens"])
  ], 6);
}
const xu = /* @__PURE__ */ k(Yu, [["render", Zu]]), en = Q({
  components: {
    MfmComponent: pe
  },
  props: {
    text: {
      required: !0,
      type: String
    }
  },
  emits: ["clickEv"],
  provide() {
    return {
      [me]: (d) => this.$emit("clickEv", d)
    };
  },
  computed: {
    parsedMfm() {
      return Te(this.text, !1);
    }
  }
});
function dn(d, f, u, a, s, e) {
  const r = N("MfmComponent");
  return h(), E(r, { tokens: d.parsedMfm }, null, 8, ["tokens"]);
}
const un = /* @__PURE__ */ k(en, [["render", dn]]), tn = {
  install: (d) => (d.component("MfmRenderer", un).component("MfmComponent", pe).component("Bold", Pe).component("Italic", Re).component("Quote", Ke).component("Small", Qe).component("Text", Ne).component("Center", We).component("EmojiCode", dd).component("Mention", fd).component("Plain", od).component("BlockCode", md).component("InlineCode", bd).component("Search", kd).component("Strike", Od).component("UnicodeEmoji", Id).component("Url", qd).component("Link", Bd).component("Hashtag", Ud).component("Fn", Fd).component("Fg", Xd).component("Bg", Wd).component("Font", xd).component("Blur", uu).component("Flip", cu).component("Scale", su).component("Position", lu).component("X2", pu).component("X3", bu).component("X4", $u).component("Jump", Cu).component("Tada", Eu).component("Jelly", Lu).component("Spin", qu).component("Twitch", Su).component("Shake", Ru).component("Bounce", Uu).component("Rainbow", Fu).component("Ruby", Xu).component("Rotate", Wu).component("Clickable", xu), d)
};
export {
  tn as default
};
