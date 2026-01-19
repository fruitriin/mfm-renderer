import { defineComponent as N, computed as D, openBlock as _, createElementBlock as M, Fragment as z, renderList as V, createElementVNode as H, normalizeClass as ue, normalizeStyle as E, toDisplayString as S, createCommentVNode as W, createBlock as v, resolveDynamicComponent as le, unref as O, resolveComponent as T, createVNode as F, inject as de, ref as ie, watch as ge, createTextVNode as G, withDirectives as ke, vModelText as Ne, pushScopeId as $e, popScopeId as Ce } from "vue";
const Me = { key: 0 }, Te = /* @__PURE__ */ N({
  __name: "Text",
  props: {
    children: {},
    token: {},
    plain: { type: Boolean, default: !1 },
    className: {},
    nowrap: { type: Boolean, default: !1 },
    note: {},
    style: {}
  },
  setup(u) {
    const d = u, c = D(() => d.plain ? [d.token.text.replace(/\n/g, " ")] : d.token.text.split(/\r\n|\n|\r/)), s = (t, e) => e + 1 !== c.value.length;
    return (t, e) => (_(!0), M(z, null, V(c.value, (h, $) => (_(), M(z, { key: $ }, [
      H("span", {
        class: ue(["text", [t.className, t.$attrs.class]]),
        style: E(t.style)
      }, S(h), 7),
      s(h, $) ? (_(), M("br", Me)) : W("", !0)
    ], 64))), 128));
  }
});
var U = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Z = {}, w = {}, X = {}, Q = {}, me = {};
(function(u) {
  Object.defineProperty(u, "__esModule", { value: !0 }), u.createLanguage = u.lazy = u.lineEnd = u.lineBegin = u.char = u.newline = u.crlf = u.lf = u.cr = u.notMatch = u.alt = u.seq = u.regexp = u.str = u.Parser = u.failure = u.success = void 0;
  function d(y, m) {
    return {
      success: !0,
      value: m,
      index: y
    };
  }
  u.success = d;
  function c() {
    return { success: !1 };
  }
  u.failure = c;
  class s {
    constructor(m, l) {
      this.handler = (n, f, r) => {
        if (r.trace && this.name != null) {
          const a = `${f}`;
          console.log(`${a.padEnd(6, " ")}enter ${this.name}`);
          const p = m(n, f, r);
          if (p.success) {
            const o = `${f}:${p.index}`;
            console.log(`${o.padEnd(6, " ")}match ${this.name}`);
          } else {
            const o = `${f}`;
            console.log(`${o.padEnd(6, " ")}fail ${this.name}`);
          }
          return p;
        }
        return m(n, f, r);
      }, this.name = l;
    }
    map(m) {
      return new s((l, n, f) => {
        const r = this.handler(l, n, f);
        return r.success ? d(r.index, m(r.value)) : r;
      });
    }
    text() {
      return new s((m, l, n) => {
        const f = this.handler(m, l, n);
        if (!f.success)
          return f;
        const r = m.slice(l, f.index);
        return d(f.index, r);
      });
    }
    many(m) {
      return new s((l, n, f) => {
        let r, a = n;
        const p = [];
        for (; a < l.length && (r = this.handler(l, a, f), !!r.success); )
          a = r.index, p.push(r.value);
        return p.length < m ? c() : d(a, p);
      });
    }
    sep(m, l) {
      if (l < 1)
        throw new Error('"min" must be a value greater than or equal to 1.');
      return h([
        this,
        h([
          m,
          this
        ], 1).many(l - 1)
      ]).map((n) => [n[0], ...n[1]]);
    }
    option() {
      return $([
        this,
        C(null)
      ]);
    }
  }
  u.Parser = s;
  function t(y) {
    return new s((m, l, n) => m.length - l < y.length || m.substr(l, y.length) !== y ? c() : d(l + y.length, y));
  }
  u.str = t;
  function e(y) {
    const m = RegExp(`^(?:${y.source})`, y.flags);
    return new s((l, n, f) => {
      const r = l.slice(n), a = m.exec(r);
      return a == null ? c() : d(n + a[0].length, a[0]);
    });
  }
  u.regexp = e;
  function h(y, m) {
    return new s((l, n, f) => {
      let r, a = n;
      const p = [];
      for (let o = 0; o < y.length; o++) {
        if (r = y[o].handler(l, a, f), !r.success)
          return r;
        a = r.index, p.push(r.value);
      }
      return d(a, m != null ? p[m] : p);
    });
  }
  u.seq = h;
  function $(y) {
    return new s((m, l, n) => {
      let f;
      for (let r = 0; r < y.length; r++)
        if (f = y[r].handler(m, l, n), f.success)
          return f;
      return c();
    });
  }
  u.alt = $;
  function C(y) {
    return new s((m, l, n) => d(l, y));
  }
  function I(y) {
    return new s((m, l, n) => y.handler(m, l, n).success ? c() : d(l, null));
  }
  u.notMatch = I, u.cr = t("\r"), u.lf = t(`
`), u.crlf = t(`\r
`), u.newline = $([u.crlf, u.cr, u.lf]), u.char = new s((y, m, l) => {
    if (y.length - m < 1)
      return c();
    const n = y.charAt(m);
    return d(m + 1, n);
  }), u.lineBegin = new s((y, m, l) => m === 0 || u.cr.handler(y, m - 1, l).success || u.lf.handler(y, m - 1, l).success ? d(m, null) : c()), u.lineEnd = new s((y, m, l) => m === y.length || u.cr.handler(y, m, l).success || u.lf.handler(y, m, l).success ? d(m, null) : c());
  function b(y) {
    const m = new s((l, n, f) => (m.handler = y().handler, m.handler(l, n, f)));
    return m;
  }
  u.lazy = b;
  function j(y) {
    const m = {};
    for (const l of Object.keys(y))
      m[l] = b(() => {
        const n = y[l](m);
        if (n == null)
          throw new Error("syntax must return a parser.");
        return n.name = l, n;
      });
    return m;
  }
  u.createLanguage = j;
})(me);
var B = {}, ne = {};
(function(u) {
  Object.defineProperty(u, "__esModule", { value: !0 }), u.TEXT = u.PLAIN = u.FN = u.LINK = u.N_URL = u.HASHTAG = u.MENTION = u.MATH_INLINE = u.INLINE_CODE = u.STRIKE = u.ITALIC = u.SMALL = u.BOLD = u.EMOJI_CODE = u.UNI_EMOJI = u.CENTER = u.MATH_BLOCK = u.CODE_BLOCK = u.SEARCH = u.QUOTE = u.isMfmBlock = void 0;
  const d = ["quote", "search", "blockCode", "mathBlock", "center"];
  function c(i) {
    return d.includes(i.type);
  }
  u.isMfmBlock = c;
  const s = (i) => ({ type: "quote", children: i });
  u.QUOTE = s;
  const t = (i, L) => ({ type: "search", props: { query: i, content: L } });
  u.SEARCH = t;
  const e = (i, L) => ({ type: "blockCode", props: { code: i, lang: L } });
  u.CODE_BLOCK = e;
  const h = (i) => ({ type: "mathBlock", props: { formula: i } });
  u.MATH_BLOCK = h;
  const $ = (i) => ({ type: "center", children: i });
  u.CENTER = $;
  const C = (i) => ({ type: "unicodeEmoji", props: { emoji: i } });
  u.UNI_EMOJI = C;
  const I = (i) => ({ type: "emojiCode", props: { name: i } });
  u.EMOJI_CODE = I;
  const b = (i) => ({ type: "bold", children: i });
  u.BOLD = b;
  const j = (i) => ({ type: "small", children: i });
  u.SMALL = j;
  const y = (i) => ({ type: "italic", children: i });
  u.ITALIC = y;
  const m = (i) => ({ type: "strike", children: i });
  u.STRIKE = m;
  const l = (i) => ({ type: "inlineCode", props: { code: i } });
  u.INLINE_CODE = l;
  const n = (i) => ({ type: "mathInline", props: { formula: i } });
  u.MATH_INLINE = n;
  const f = (i, L, q) => ({ type: "mention", props: { username: i, host: L, acct: q } });
  u.MENTION = f;
  const r = (i) => ({ type: "hashtag", props: { hashtag: i } });
  u.HASHTAG = r;
  const a = (i, L) => {
    const q = { type: "url", props: { url: i } };
    return L && (q.props.brackets = L), q;
  };
  u.N_URL = a;
  const p = (i, L, q) => ({ type: "link", props: { silent: i, url: L }, children: q });
  u.LINK = p;
  const o = (i, L, q) => ({ type: "fn", props: { name: i, args: L }, children: q });
  u.FN = o;
  const g = (i) => ({ type: "plain", children: [(0, u.TEXT)(i)] });
  u.PLAIN = g;
  const k = (i) => ({ type: "text", props: { text: i } });
  u.TEXT = k;
})(ne);
Object.defineProperty(B, "__esModule", { value: !0 });
B.inspectOne = B.stringifyTree = B.stringifyNode = B.mergeText = void 0;
const x = ne;
function Ee(u) {
  const d = [], c = [];
  function s() {
    c.length > 0 && (d.push((0, x.TEXT)(c.join(""))), c.length = 0);
  }
  const t = u.flat(1);
  for (const e of t)
    typeof e == "string" ? c.push(e) : !Array.isArray(e) && e.type === "text" ? c.push(e.props.text) : (s(), d.push(e));
  return s(), d;
}
B.mergeText = Ee;
function pe(u) {
  var d;
  switch (u.type) {
    case "quote":
      return R(u.children).split(`
`).map((c) => `> ${c}`).join(`
`);
    case "search":
      return u.props.content;
    case "blockCode":
      return `\`\`\`${(d = u.props.lang) !== null && d !== void 0 ? d : ""}
${u.props.code}
\`\`\``;
    case "mathBlock":
      return `\\[
${u.props.formula}
\\]`;
    case "center":
      return `<center>
${R(u.children)}
</center>`;
    case "emojiCode":
      return `:${u.props.name}:`;
    case "unicodeEmoji":
      return u.props.emoji;
    case "bold":
      return `**${R(u.children)}**`;
    case "small":
      return `<small>${R(u.children)}</small>`;
    case "italic":
      return `<i>${R(u.children)}</i>`;
    case "strike":
      return `~~${R(u.children)}~~`;
    case "inlineCode":
      return `\`${u.props.code}\``;
    case "mathInline":
      return `\\(${u.props.formula}\\)`;
    case "mention":
      return u.props.acct;
    case "hashtag":
      return `#${u.props.hashtag}`;
    case "url":
      return u.props.brackets ? `<${u.props.url}>` : u.props.url;
    case "link":
      return `${u.props.silent ? "?" : ""}[${R(u.children)}](${u.props.url})`;
    case "fn": {
      const c = Object.keys(u.props.args).map((t) => {
        const e = u.props.args[t];
        return e === !0 ? t : `${t}=${e}`;
      }), s = c.length > 0 ? "." + c.join(",") : "";
      return `$[${u.props.name}${s} ${R(u.children)}]`;
    }
    case "plain":
      return `<plain>
${R(u.children)}
</plain>`;
    case "text":
      return u.props.text;
  }
  throw new Error("unknown mfm node");
}
B.stringifyNode = pe;
var K;
(function(u) {
  u[u.none = 0] = "none", u[u.inline = 1] = "inline", u[u.block = 2] = "block";
})(K || (K = {}));
function R(u) {
  const d = [];
  let c = K.none;
  for (const s of u) {
    let t = !0;
    (0, x.isMfmBlock)(s) ? (c === K.none && (t = !1), c = K.block) : ((c === K.none || c === K.inline) && (t = !1), c = K.inline), t && d.push((0, x.TEXT)(`
`)), d.push(s);
  }
  return d.map((s) => pe(s)).join("");
}
B.stringifyTree = R;
function _e(u, d) {
  if (d(u), u.children != null)
    for (const c of u.children)
      _e(c, d);
}
B.inspectOne = _e;
var te = {};
Object.defineProperty(te, "__esModule", {
  value: !0
});
te.default = /(?:\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83e\udef1\ud83c\udffb\u200d\ud83e\udef2\ud83c[\udffc-\udfff]|\ud83e\udef1\ud83c\udffc\u200d\ud83e\udef2\ud83c[\udffb\udffd-\udfff]|\ud83e\udef1\ud83c\udffd\u200d\ud83e\udef2\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\udef1\ud83c\udffe\u200d\ud83e\udef2\ud83c[\udffb-\udffd\udfff]|\ud83e\udef1\ud83c\udfff\u200d\ud83e\udef2\ud83c[\udffb-\udffe]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d\udc8f\ud83c[\udffb-\udfff]|\ud83d\udc91\ud83c[\udffb-\udfff]|\ud83e\udd1d\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d\udc8f\udc91]|\ud83e\udd1d)|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf7c\udf84\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc70\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd4\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83d\ude36\u200d\ud83c\udf2b\ufe0f|\u2764\ufe0f\u200d\ud83d\udd25|\u2764\ufe0f\u200d\ud83e\ude79|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc3b\u200d\u2744\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83d\ude2e\u200d\ud83d\udca8|\ud83d\ude35\u200d\ud83d\udcab|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f|\ud83d\udc08\u200d\u2b1b|\ud83d\udc26\u200d\u2b1b)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|\ud83e\udef0|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0c\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\udd77\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd\udec3-\udec5\udef1-\udef8]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udc8e\udc90\udc92-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5-\uded7\udedc-\udedf\udeeb\udeec\udef4-\udefc\udfe0-\udfeb\udff0]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd76\udd78-\uddb4\uddb7\uddba\uddbc-\uddcc\uddd0\uddde-\uddff\ude70-\ude7c\ude80-\ude88\ude90-\udebd\udebf-\udec2\udece-\udedb\udee0-\udee8]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g;
var re;
function Oe() {
  if (re)
    return Q;
  re = 1;
  var u = U && U.__createBinding || (Object.create ? function(n, f, r, a) {
    a === void 0 && (a = r);
    var p = Object.getOwnPropertyDescriptor(f, r);
    (!p || ("get" in p ? !f.__esModule : p.writable || p.configurable)) && (p = { enumerable: !0, get: function() {
      return f[r];
    } }), Object.defineProperty(n, a, p);
  } : function(n, f, r, a) {
    a === void 0 && (a = r), n[a] = f[r];
  }), d = U && U.__setModuleDefault || (Object.create ? function(n, f) {
    Object.defineProperty(n, "default", { enumerable: !0, value: f });
  } : function(n, f) {
    n.default = f;
  }), c = U && U.__importStar || function(n) {
    if (n && n.__esModule)
      return n;
    var f = {};
    if (n != null)
      for (var r in n)
        r !== "default" && Object.prototype.hasOwnProperty.call(n, r) && u(f, n, r);
    return d(f, n), f;
  }, s = U && U.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(Q, "__esModule", { value: !0 }), Q.language = void 0;
  const t = c(he()), e = c(me), h = B, $ = s(te), C = e.regexp(/[\u0020\u3000\t]/), I = e.regexp(/[a-z0-9]/i), b = e.alt([e.crlf, e.cr, e.lf]);
  function j(n) {
    return new e.Parser((f, r, a) => {
      const p = [];
      let o = r;
      for (let g = 0; g < n.length; g++) {
        const k = n[g].handler(f, o, a);
        if (!k.success)
          return o === r ? e.failure() : e.success(o, f.slice(r, o));
        p.push(k.value), o = k.index;
      }
      return e.success(o, p);
    });
  }
  const y = new e.Parser((n, f, r) => r.linkLabel ? e.failure() : e.success(f, null)), m = new e.Parser((n, f, r) => r.depth < r.nestLimit ? e.success(f, null) : e.failure());
  function l(n, f) {
    const r = e.alt([
      e.seq([m, n], 1),
      f ?? e.char
    ]);
    return new e.Parser((a, p, o) => {
      o.depth++;
      const g = r.handler(a, p, o);
      return o.depth--, g;
    });
  }
  return Q.language = e.createLanguage({
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
      const f = e.seq([
        e.str(">"),
        C.option(),
        e.seq([e.notMatch(b), e.char], 1).many(0).text()
      ], 2).sep(b, 1), r = e.seq([
        b.option(),
        b.option(),
        e.lineBegin,
        f,
        b.option(),
        b.option()
      ], 3);
      return new e.Parser((a, p, o) => {
        let g;
        if (g = r.handler(a, p, o), !g.success)
          return g;
        const k = g.value, i = g.index;
        return k.length === 1 && k[0].length === 0 ? e.failure() : (g = l(n.fullParser).many(0).handler(k.join(`
`), 0, o), g.success ? e.success(i, t.QUOTE((0, h.mergeText)(g.value))) : g);
      });
    },
    codeBlock: (n) => {
      const f = e.str("```");
      return e.seq([
        b.option(),
        e.lineBegin,
        f,
        e.seq([e.notMatch(b), e.char], 1).many(0),
        b,
        e.seq([e.notMatch(e.seq([b, f, e.lineEnd])), e.char], 1).many(1),
        b,
        f,
        e.lineEnd,
        b.option()
      ]).map((r) => {
        const a = r[3].join("").trim(), p = r[5].join("");
        return t.CODE_BLOCK(p, a.length > 0 ? a : null);
      });
    },
    mathBlock: (n) => {
      const f = e.str("\\["), r = e.str("\\]");
      return e.seq([
        b.option(),
        e.lineBegin,
        f,
        b.option(),
        e.seq([e.notMatch(e.seq([b.option(), r])), e.char], 1).many(1),
        b.option(),
        r,
        e.lineEnd,
        b.option()
      ]).map((a) => {
        const p = a[4].join("");
        return t.MATH_BLOCK(p);
      });
    },
    centerTag: (n) => {
      const f = e.str("<center>"), r = e.str("</center>");
      return e.seq([
        b.option(),
        e.lineBegin,
        f,
        b.option(),
        e.seq([e.notMatch(e.seq([b.option(), r])), l(n.inline)], 1).many(1),
        b.option(),
        r,
        e.lineEnd,
        b.option()
      ]).map((a) => t.CENTER((0, h.mergeText)(a[4])));
    },
    big: (n) => {
      const f = e.str("***");
      return j([
        f,
        e.seq([e.notMatch(f), l(n.inline)], 1).many(1),
        f
      ]).map((r) => typeof r == "string" ? r : t.FN("tada", {}, (0, h.mergeText)(r[1])));
    },
    boldAsta: (n) => {
      const f = e.str("**");
      return j([
        f,
        e.seq([e.notMatch(f), l(n.inline)], 1).many(1),
        f
      ]).map((r) => typeof r == "string" ? r : t.BOLD((0, h.mergeText)(r[1])));
    },
    boldTag: (n) => {
      const f = e.str("<b>"), r = e.str("</b>");
      return j([
        f,
        e.seq([e.notMatch(r), l(n.inline)], 1).many(1),
        r
      ]).map((a) => typeof a == "string" ? a : t.BOLD((0, h.mergeText)(a[1])));
    },
    boldUnder: (n) => {
      const f = e.str("__");
      return e.seq([
        f,
        e.alt([I, C]).many(1),
        f
      ]).map((r) => t.BOLD((0, h.mergeText)(r[1])));
    },
    smallTag: (n) => {
      const f = e.str("<small>"), r = e.str("</small>");
      return j([
        f,
        e.seq([e.notMatch(r), l(n.inline)], 1).many(1),
        r
      ]).map((a) => typeof a == "string" ? a : t.SMALL((0, h.mergeText)(a[1])));
    },
    italicTag: (n) => {
      const f = e.str("<i>"), r = e.str("</i>");
      return j([
        f,
        e.seq([e.notMatch(r), l(n.inline)], 1).many(1),
        r
      ]).map((a) => typeof a == "string" ? a : t.ITALIC((0, h.mergeText)(a[1])));
    },
    italicAsta: (n) => {
      const f = e.str("*"), r = e.seq([
        f,
        e.alt([I, C]).many(1),
        f
      ]);
      return new e.Parser((a, p, o) => {
        const g = r.handler(a, p, o);
        if (!g.success)
          return e.failure();
        const k = a.slice(0, p);
        return /[a-z0-9]$/i.test(k) ? e.failure() : e.success(g.index, t.ITALIC((0, h.mergeText)(g.value[1])));
      });
    },
    italicUnder: (n) => {
      const f = e.str("_"), r = e.seq([
        f,
        e.alt([I, C]).many(1),
        f
      ]);
      return new e.Parser((a, p, o) => {
        const g = r.handler(a, p, o);
        if (!g.success)
          return e.failure();
        const k = a.slice(0, p);
        return /[a-z0-9]$/i.test(k) ? e.failure() : e.success(g.index, t.ITALIC((0, h.mergeText)(g.value[1])));
      });
    },
    strikeTag: (n) => {
      const f = e.str("<s>"), r = e.str("</s>");
      return j([
        f,
        e.seq([e.notMatch(r), l(n.inline)], 1).many(1),
        r
      ]).map((a) => typeof a == "string" ? a : t.STRIKE((0, h.mergeText)(a[1])));
    },
    strikeWave: (n) => {
      const f = e.str("~~");
      return j([
        f,
        e.seq([e.notMatch(e.alt([f, b])), l(n.inline)], 1).many(1),
        f
      ]).map((r) => typeof r == "string" ? r : t.STRIKE((0, h.mergeText)(r[1])));
    },
    unicodeEmoji: (n) => {
      const f = RegExp($.default.source);
      return e.regexp(f).map((r) => t.UNI_EMOJI(r));
    },
    plainTag: (n) => {
      const f = e.str("<plain>"), r = e.str("</plain>");
      return e.seq([
        f,
        b.option(),
        e.seq([
          e.notMatch(e.seq([b.option(), r])),
          e.char
        ], 1).many(1).text(),
        b.option(),
        r
      ], 2).map((a) => t.PLAIN(a));
    },
    fn: (n) => {
      const f = new e.Parser((o, g, k) => {
        const i = e.regexp(/[a-z0-9_]+/i).handler(o, g, k);
        return i.success ? e.success(i.index, i.value) : i;
      }), r = e.seq([
        e.regexp(/[a-z0-9_]+/i),
        e.seq([
          e.str("="),
          e.regexp(/[a-z0-9_.-]+/i)
        ], 1).option()
      ]).map((o) => ({
        k: o[0],
        v: o[1] != null ? o[1] : !0
      })), a = e.seq([
        e.str("."),
        r.sep(e.str(","), 1)
      ], 1).map((o) => {
        const g = {};
        for (const k of o)
          g[k.k] = k.v;
        return g;
      }), p = e.str("]");
      return j([
        e.str("$["),
        f,
        a.option(),
        e.str(" "),
        e.seq([e.notMatch(p), l(n.inline)], 1).many(1),
        p
      ]).map((o) => {
        if (typeof o == "string")
          return o;
        const g = o[1], k = o[2] || {}, i = o[4];
        return t.FN(g, k, (0, h.mergeText)(i));
      });
    },
    inlineCode: (n) => {
      const f = e.str("`");
      return e.seq([
        f,
        e.seq([
          e.notMatch(e.alt([f, e.str("´"), b])),
          e.char
        ], 1).many(1),
        f
      ]).map((r) => t.INLINE_CODE(r[1].join("")));
    },
    mathInline: (n) => {
      const f = e.str("\\("), r = e.str("\\)");
      return e.seq([
        f,
        e.seq([
          e.notMatch(e.alt([r, b])),
          e.char
        ], 1).many(1),
        r
      ]).map((a) => t.MATH_INLINE(a[1].join("")));
    },
    mention: (n) => {
      const f = e.seq([
        y,
        e.str("@"),
        e.regexp(/[a-z0-9_-]+/i),
        e.seq([
          e.str("@"),
          e.regexp(/[a-z0-9_.-]+/i)
        ], 1).option()
      ]);
      return new e.Parser((r, a, p) => {
        let o;
        if (o = f.handler(r, a, p), !o.success)
          return e.failure();
        const g = r.slice(0, a);
        if (/[a-z0-9]$/i.test(g))
          return e.failure();
        let k = !1;
        const i = o.index, L = o.value[2], q = o.value[3];
        let P = q;
        q != null && (o = /[.-]+$/.exec(q), o != null && (P = q.slice(0, -1 * o[0].length), P.length === 0 && (k = !0, P = null)));
        let J = L;
        if (o = /-+$/.exec(L), o != null && (P == null ? J = L.slice(0, -1 * o[0].length) : k = !0), (J.length === 0 || J[0] === "-") && (k = !0), P != null && /^[.-]/.test(P) && (k = !0), k)
          return e.success(i, r.slice(a, i));
        const ce = P != null ? `@${J}@${P}` : `@${J}`;
        return e.success(a + ce.length, t.MENTION(J, P, ce));
      });
    },
    hashtag: (n) => {
      const f = e.str("#"), r = e.seq([
        e.notMatch(e.alt([e.regexp(/[ \u3000\t.,!?'"#:/[\]【】()「」（）<>]/), C, b])),
        e.char
      ], 1), a = e.lazy(() => e.alt([
        e.seq([
          e.str("("),
          l(a, r).many(0),
          e.str(")")
        ]),
        e.seq([
          e.str("["),
          l(a, r).many(0),
          e.str("]")
        ]),
        e.seq([
          e.str("「"),
          l(a, r).many(0),
          e.str("」")
        ]),
        e.seq([
          e.str("（"),
          l(a, r).many(0),
          e.str("）")
        ]),
        r
      ])), p = e.seq([
        y,
        f,
        a.many(1).text()
      ], 2);
      return new e.Parser((o, g, k) => {
        const i = p.handler(o, g, k);
        if (!i.success)
          return e.failure();
        const L = o.slice(0, g);
        if (/[a-z0-9]$/i.test(L))
          return e.failure();
        const q = i.index, P = i.value;
        return /^[0-9]+$/.test(P) ? e.failure() : e.success(q, t.HASHTAG(P));
      });
    },
    emojiCode: (n) => {
      const f = e.notMatch(e.regexp(/[a-z0-9]/i)), r = e.str(":");
      return e.seq([
        e.alt([e.lineBegin, f]),
        r,
        e.regexp(/[a-z0-9_+-]+/i),
        r,
        e.alt([e.lineEnd, f])
      ], 2).map((a) => t.EMOJI_CODE(a));
    },
    link: (n) => {
      const f = new e.Parser((a, p, o) => {
        o.linkLabel = !0;
        const g = n.inline.handler(a, p, o);
        return o.linkLabel = !1, g;
      }), r = e.str("]");
      return e.seq([
        y,
        e.alt([e.str("?["), e.str("[")]),
        e.seq([
          e.notMatch(e.alt([r, b])),
          l(f)
        ], 1).many(1),
        r,
        e.str("("),
        e.alt([n.urlAlt, n.url]),
        e.str(")")
      ]).map((a) => {
        const p = a[1] === "?[", o = a[2], g = a[5];
        return t.LINK(p, g.props.url, (0, h.mergeText)(o));
      });
    },
    url: (n) => {
      const f = e.regexp(/[.,a-z0-9_/:%#@$&?!~=+-]/i), r = e.lazy(() => e.alt([
        e.seq([
          e.str("("),
          l(r, f).many(0),
          e.str(")")
        ]),
        e.seq([
          e.str("["),
          l(r, f).many(0),
          e.str("]")
        ]),
        f
      ])), a = e.seq([
        y,
        e.regexp(/https?:\/\//),
        r.many(1).text()
      ]);
      return new e.Parser((p, o, g) => {
        let k;
        if (k = a.handler(p, o, g), !k.success)
          return e.failure();
        const i = k.index;
        let L = i;
        const q = k.value[1];
        let P = k.value[2];
        return k = /[.,]+$/.exec(P), k != null && (L -= k[0].length, P = P.slice(0, -1 * k[0].length), P.length === 0) ? e.success(i, p.slice(o, i)) : e.success(L, t.N_URL(q + P, !1));
      });
    },
    urlAlt: (n) => {
      const f = e.str("<"), r = e.str(">"), a = e.seq([
        y,
        f,
        e.regexp(/https?:\/\//),
        e.seq([e.notMatch(e.alt([r, C])), e.char], 1).many(1),
        r
      ]).text();
      return new e.Parser((p, o, g) => {
        const k = a.handler(p, o, g);
        if (!k.success)
          return e.failure();
        const i = k.value.slice(1, k.value.length - 1);
        return e.success(k.index, t.N_URL(i, !0));
      });
    },
    search: (n) => {
      const f = e.alt([
        e.regexp(/\[(検索|search)\]/i),
        e.regexp(/(検索|search)/i)
      ]);
      return e.seq([
        b.option(),
        e.lineBegin,
        e.seq([
          e.notMatch(e.alt([
            b,
            e.seq([C, f, e.lineEnd])
          ])),
          e.char
        ], 1).many(1),
        C,
        f,
        e.lineEnd,
        b.option()
      ]).map((r) => {
        const a = r[2].join("");
        return t.SEARCH(a, `${a}${r[3]}${r[4]}`);
      });
    },
    text: (n) => e.char
  }), Q;
}
var se;
function ve() {
  if (se)
    return X;
  se = 1, Object.defineProperty(X, "__esModule", { value: !0 }), X.simpleParser = X.fullParser = void 0;
  const u = Oe(), d = B;
  function c(t, e) {
    const h = u.language.fullParser.handler(t, 0, {
      nestLimit: e.nestLimit != null ? e.nestLimit : 20,
      depth: 0,
      linkLabel: !1,
      trace: !1
    });
    return (0, d.mergeText)(h.value);
  }
  X.fullParser = c;
  function s(t) {
    const e = u.language.simpleParser.handler(t, 0, {});
    return (0, d.mergeText)(e.value);
  }
  return X.simpleParser = s, X;
}
var fe;
function Ie() {
  if (fe)
    return w;
  fe = 1, Object.defineProperty(w, "__esModule", { value: !0 }), w.extract = w.inspect = w.toString = w.parseSimple = w.parse = void 0;
  const u = ve(), d = B;
  function c($, C = {}) {
    return (0, u.fullParser)($, {
      nestLimit: C.nestLimit
    });
  }
  w.parse = c;
  function s($) {
    return (0, u.simpleParser)($);
  }
  w.parseSimple = s;
  function t($) {
    return Array.isArray($) ? (0, d.stringifyTree)($) : (0, d.stringifyNode)($);
  }
  w.toString = t;
  function e($, C) {
    if (Array.isArray($))
      for (const I of $)
        (0, d.inspectOne)(I, C);
    else
      (0, d.inspectOne)($, C);
  }
  w.inspect = e;
  function h($, C) {
    const I = [];
    return e($, (b) => {
      C(b) && I.push(b);
    }), I;
  }
  return w.extract = h, w;
}
var ae;
function he() {
  return ae || (ae = 1, function(u) {
    Object.defineProperty(u, "__esModule", { value: !0 }), u.TEXT = u.PLAIN = u.FN = u.LINK = u.N_URL = u.HASHTAG = u.MENTION = u.MATH_INLINE = u.INLINE_CODE = u.STRIKE = u.ITALIC = u.SMALL = u.BOLD = u.EMOJI_CODE = u.UNI_EMOJI = u.CENTER = u.MATH_BLOCK = u.CODE_BLOCK = u.SEARCH = u.QUOTE = u.extract = u.inspect = u.toString = u.parseSimple = u.parse = void 0;
    var d = Ie();
    Object.defineProperty(u, "parse", { enumerable: !0, get: function() {
      return d.parse;
    } }), Object.defineProperty(u, "parseSimple", { enumerable: !0, get: function() {
      return d.parseSimple;
    } }), Object.defineProperty(u, "toString", { enumerable: !0, get: function() {
      return d.toString;
    } }), Object.defineProperty(u, "inspect", { enumerable: !0, get: function() {
      return d.inspect;
    } }), Object.defineProperty(u, "extract", { enumerable: !0, get: function() {
      return d.extract;
    } });
    var c = ne;
    Object.defineProperty(u, "QUOTE", { enumerable: !0, get: function() {
      return c.QUOTE;
    } }), Object.defineProperty(u, "SEARCH", { enumerable: !0, get: function() {
      return c.SEARCH;
    } }), Object.defineProperty(u, "CODE_BLOCK", { enumerable: !0, get: function() {
      return c.CODE_BLOCK;
    } }), Object.defineProperty(u, "MATH_BLOCK", { enumerable: !0, get: function() {
      return c.MATH_BLOCK;
    } }), Object.defineProperty(u, "CENTER", { enumerable: !0, get: function() {
      return c.CENTER;
    } }), Object.defineProperty(u, "UNI_EMOJI", { enumerable: !0, get: function() {
      return c.UNI_EMOJI;
    } }), Object.defineProperty(u, "EMOJI_CODE", { enumerable: !0, get: function() {
      return c.EMOJI_CODE;
    } }), Object.defineProperty(u, "BOLD", { enumerable: !0, get: function() {
      return c.BOLD;
    } }), Object.defineProperty(u, "SMALL", { enumerable: !0, get: function() {
      return c.SMALL;
    } }), Object.defineProperty(u, "ITALIC", { enumerable: !0, get: function() {
      return c.ITALIC;
    } }), Object.defineProperty(u, "STRIKE", { enumerable: !0, get: function() {
      return c.STRIKE;
    } }), Object.defineProperty(u, "INLINE_CODE", { enumerable: !0, get: function() {
      return c.INLINE_CODE;
    } }), Object.defineProperty(u, "MATH_INLINE", { enumerable: !0, get: function() {
      return c.MATH_INLINE;
    } }), Object.defineProperty(u, "MENTION", { enumerable: !0, get: function() {
      return c.MENTION;
    } }), Object.defineProperty(u, "HASHTAG", { enumerable: !0, get: function() {
      return c.HASHTAG;
    } }), Object.defineProperty(u, "N_URL", { enumerable: !0, get: function() {
      return c.N_URL;
    } }), Object.defineProperty(u, "LINK", { enumerable: !0, get: function() {
      return c.LINK;
    } }), Object.defineProperty(u, "FN", { enumerable: !0, get: function() {
      return c.FN;
    } }), Object.defineProperty(u, "PLAIN", { enumerable: !0, get: function() {
      return c.PLAIN;
    } }), Object.defineProperty(u, "TEXT", { enumerable: !0, get: function() {
      return c.TEXT;
    } });
  }(Z)), Z;
}
var oe = he();
function Le(u, d) {
  return u == null || u === "" ? [] : d ? oe.parseSimple(u) : oe.parse(u);
}
function ee(u) {
  return u.replace(/(^.)(.*)/, (d, c, s) => `${c.toUpperCase() + s}`);
}
function A(u) {
  if (!(!u || typeof u != "string") && /^-?[0-9.]+s$/.test(u))
    return u;
}
function je(u) {
  if (!(!u || typeof u != "string") && /^[0-9a-f]{3,6}$/i.test(u))
    return u;
}
function Pe(u) {
  if (!u || typeof u != "string")
    return;
  const d = u.toLowerCase();
  return ["hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"].includes(d) ? d : void 0;
}
function Y(u) {
  if (!u)
    return;
  if (typeof u == "number")
    return u;
  if (typeof u != "string")
    return;
  const d = parseFloat(u);
  if (!isNaN(d))
    return d;
}
const Ae = {
  key: 0,
  style: { border: "solid 1px red" }
}, be = /* @__PURE__ */ N({
  __name: "Mfm",
  props: {
    tokens: {},
    style: {},
    className: {},
    class: {},
    debug: { type: Boolean }
  },
  setup(u) {
    const c = !!u.debug;
    return (s, t) => (_(), M(z, null, [
      (_(!0), M(z, null, V(s.tokens, (e, h) => (_(), v(le(`${O(ee)(e.type)}`), {
        style: E(s.style),
        className: s.className,
        key: h,
        token: e.props,
        children: e.children
      }, null, 8, ["style", "className", "token", "children"]))), 128)),
      O(c) ? (_(), M("div", Ae, [
        (_(!0), M(z, null, V(s.tokens, (e, h) => (_(), M("div", { key: h }, [
          H("p", null, "Selected: " + S(O(ee)(e.type)), 1),
          H("pre", null, S(e), 1)
        ]))), 128))
      ])) : W("", !0)
    ], 64));
  }
}), qe = { class: "bold" }, Se = /* @__PURE__ */ N({
  __name: "Bold",
  props: {
    children: {}
  },
  setup(u) {
    return (d, c) => {
      const s = T("MfmComponent");
      return _(), M("b", qe, [
        F(s, { tokens: d.children }, null, 8, ["tokens"])
      ]);
    };
  }
}), we = { class: "italic" }, Be = /* @__PURE__ */ N({
  __name: "Italic",
  props: {
    children: {}
  },
  setup(u) {
    return (d, c) => {
      const s = T("MfmComponent");
      return _(), M("i", we, [
        F(s, { tokens: d.children }, null, 8, ["tokens"])
      ]);
    };
  }
}), Re = {
  class: "quote",
  style: { display: "block", margin: "8px", padding: "6px 0px 6px 12px", color: "var(--fg)", "border-left": "solid 3px var(--fg)", opacity: "0.7" }
}, De = /* @__PURE__ */ N({
  __name: "Quote",
  props: {
    children: {}
  },
  setup(u) {
    return (d, c) => {
      const s = T("MfmComponent");
      return _(), M("div", Re, [
        F(s, { tokens: d.children }, null, 8, ["tokens"])
      ]);
    };
  }
}), He = {
  class: "small",
  style: { opacity: "0.7" }
}, Ue = /* @__PURE__ */ N({
  __name: "Small",
  props: {
    children: {},
    token: {},
    style: {}
  },
  setup(u) {
    return (d, c) => {
      const s = T("MfmComponent");
      return _(), M("small", He, [
        F(s, { tokens: d.children }, null, 8, ["tokens"])
      ]);
    };
  }
}), Ke = { class: "center" }, ze = /* @__PURE__ */ N({
  __name: "Center",
  props: {
    children: {},
    class: {},
    className: {}
  },
  setup(u) {
    return (d, c) => {
      const s = T("MfmComponent");
      return _(), M("div", Ke, [
        F(s, { tokens: d.children }, null, 8, ["tokens"])
      ]);
    };
  }
}), Fe = ["src"], Xe = { key: 1 }, Je = /* @__PURE__ */ N({
  __name: "EmojiCode",
  props: {
    token: {},
    children: {},
    className: {},
    class: {},
    style: {}
  },
  setup(u) {
    const d = de("emojis", {});
    return (c, s) => O(d)[c.token.name] ? (_(), M("img", {
      key: 0,
      src: O(d)[c.token.name].url,
      class: "emoji"
    }, null, 8, Fe)) : (_(), M("span", Xe, ":" + S(c.token.name) + ":", 1));
  }
}), ye = (u, d) => {
  const c = u.__vccOpts || u;
  for (const [s, t] of d)
    c[s] = t;
  return c;
}, Qe = /* @__PURE__ */ ye(Je, [["__scopeId", "data-v-0407b1c0"]]), Ge = ["href"], Ve = ["src"], Ye = /* @__PURE__ */ N({
  __name: "Mention",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    const d = u, c = de("domain", ""), s = ie(void 0);
    return ge(
      () => d.token,
      async () => {
        const t = await fetch(
          `https:/${d.token.host ?? c.value}/api/users/search-by-username-and-host`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
              detail: !1,
              limit: 1,
              username: d.token.username
            })
          }
        );
        s.value = (await t.json())[0];
      },
      { immediate: !0 }
    ), (t, e) => (_(), M("a", {
      class: "mention",
      href: t.token.host ?? "https://" + O(c) + "/" + t.token.acct
    }, [
      s.value ? (_(), M("img", {
        key: 0,
        class: "avatar",
        src: s.value.avatarUrl
      }, null, 8, Ve)) : W("", !0),
      G(S(t.token.acct), 1)
    ], 8, Ge));
  }
}), We = /* @__PURE__ */ N({
  __name: "Plain",
  props: {
    children: {},
    token: {},
    style: {},
    className: {}
  },
  setup(u) {
    return (d, c) => {
      const s = T("MfmComponent");
      return _(), v(s, { tokens: d.children }, null, 8, ["tokens"]);
    };
  }
}), Ze = { class: "block-code" }, xe = /* @__PURE__ */ N({
  __name: "BlockCode",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    return (d, c) => (_(), M(z, null, [
      G(S(d.token.lang) + " ", 1),
      H("pre", Ze, [
        G("    "),
        H("code", null, S(d.token.code), 1),
        G(`
  `)
      ])
    ], 64));
  }
}), eu = { class: "inline-code" }, uu = /* @__PURE__ */ N({
  __name: "InlineCode",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    return (d, c) => (_(), M("pre", eu, S(d.token.code), 1));
  }
}), du = { class: "search" }, nu = /* @__PURE__ */ N({
  __name: "Search",
  props: {
    token: {},
    children: {}
  },
  setup(u) {
    const c = ie(u.token.query), s = () => {
      window.open(
        "https://www.google.com/search?q=" + encodeURIComponent(c.value),
        "_blank"
      );
    };
    return (t, e) => (_(), M("div", du, [
      ke(H("input", {
        type: "text",
        "onUpdate:modelValue": e[0] || (e[0] = (h) => c.value = h)
      }, null, 512), [
        [Ne, c.value]
      ]),
      H("button", { onClick: s }, "検索")
    ]));
  }
}), tu = { class: "strike" }, cu = /* @__PURE__ */ N({
  __name: "Strike",
  props: {
    token: {},
    children: {}
  },
  setup(u) {
    return (d, c) => {
      const s = T("MfmComponent");
      return _(), M("del", tu, [
        F(s, { tokens: d.children }, null, 8, ["tokens"])
      ]);
    };
  }
}), ru = /* @__PURE__ */ N({
  __name: "UnicodeEmoji",
  props: {
    children: {},
    token: {},
    class: {},
    style: {}
  },
  setup(u) {
    return (d, c) => (_(), M("span", {
      style: E(d.style)
    }, S(d.token.emoji), 5));
  }
}), su = ["href", "textContent"], fu = /* @__PURE__ */ N({
  __name: "Url",
  props: {
    token: {},
    children: {}
  },
  setup(u) {
    return (d, c) => (_(), M("a", {
      class: "url",
      href: d.token.url,
      textContent: S(d.token.url)
    }, null, 8, su));
  }
}), au = { key: 0 }, ou = ["href"], lu = /* @__PURE__ */ N({
  __name: "Link",
  props: {
    token: {},
    children: {},
    className: {},
    style: {},
    class: {}
  },
  setup(u) {
    const d = de("debugMode", !1);
    return (c, s) => {
      const t = T("MfmComponent");
      return _(), M(z, null, [
        O(d) ? (_(), M("span", au, "silent - " + S(c.token.silent), 1)) : W("", !0),
        H("a", {
          class: ue(["link", c.className]),
          href: c.token.url,
          style: E(c.style)
        }, [
          F(t, { tokens: c.children }, null, 8, ["tokens"])
        ], 14, ou)
      ], 64);
    };
  }
}), iu = ["href"], mu = /* @__PURE__ */ N({
  __name: "Hashtag",
  props: {
    token: {},
    children: {},
    style: {}
  },
  setup(u) {
    return (d, c) => (_(), M("a", {
      class: "hashtag",
      href: "/tags/" + d.token.hashtag
    }, "#" + S(d.token.hashtag), 9, iu));
  }
}), pu = /* @__PURE__ */ N({
  __name: "Fn",
  props: {
    token: {},
    tokens: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    return (d, c) => {
      var s, t;
      return _(), v(le(O(ee)(((s = d.token) == null ? void 0 : s.name) ?? "")), {
        className: `Fn ${(t = d.token) == null ? void 0 : t.name} ${d.className ?? ""}`,
        token: d.token,
        children: d.children,
        style: E(d.style)
      }, null, 8, ["className", "token", "children", "style"]);
    };
  }
}), _u = /* @__PURE__ */ N({
  __name: "Fg",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    return (d, c) => {
      var t;
      const s = T("MfmComponent");
      return _(), v(s, {
        className: `fg ${d.className ?? ""}`,
        tokens: d.children,
        style: E([{ color: `#${(t = d.token) == null ? void 0 : t.args.color}` }, d.style])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), hu = /* @__PURE__ */ N({
  __name: "Bg",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    return (d, c) => {
      var t;
      const s = T("MfmComponent");
      return _(), v(s, {
        className: `bg ${d.className ?? ""}`,
        tokens: d.children,
        style: E([{ background: `#${(t = d.token) == null ? void 0 : t.args.color}` }, d.style])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), bu = /* @__PURE__ */ N({
  __name: "Font",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    return (d, c) => {
      var t, e, h, $, C, I, b, j, y, m, l, n;
      const s = T("MfmComponent");
      return _(), v(s, {
        className: `fg ${d.className ?? ""}`,
        tokens: d.children,
        style: E([{
          fontFamily: (e = (t = d.token) == null ? void 0 : t.args) != null && e.serif ? "serif" : ($ = (h = d.token) == null ? void 0 : h.args) != null && $.monospace ? "monospace" : (I = (C = d.token) == null ? void 0 : C.args) != null && I.cursive ? "cursive" : (j = (b = d.token) == null ? void 0 : b.args) != null && j.fantasy ? "fantasy" : (m = (y = d.token) == null ? void 0 : y.args) != null && m.emoji ? "emoji" : (n = (l = d.token) == null ? void 0 : l.args) != null && n.math ? "math" : "sans-serif"
        }, d.style])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), yu = /* @__PURE__ */ N({
  __name: "Blur",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    return (d, c) => {
      var t;
      const s = T("MfmComponent");
      return _(), v(s, {
        className: `blur ${d.className ?? ""}`,
        tokens: d.children,
        style: E([{ fontFamily: Object.keys(((t = d.token) == null ? void 0 : t.args) ?? {}) }, d.style])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), gu = /* @__PURE__ */ N({
  __name: "Flip",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    return (d, c) => {
      var t, e;
      const s = T("MfmComponent");
      return _(), v(s, {
        className: `flip ${d.className ?? ""}`,
        tokens: d.children,
        style: E([
          {
            transform: `scale(${(t = d.token) != null && t.args.h ? 1 : -1}, ${(e = d.token) != null && e.args.v ? -1 : 1})`
          },
          d.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), ku = /* @__PURE__ */ N({
  __name: "Scale",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    const d = u, c = D(() => {
      var e;
      const t = Y((e = d.token) == null ? void 0 : e.args.x) ?? 1;
      return Math.min(t, 5);
    }), s = D(() => {
      var e;
      const t = Y((e = d.token) == null ? void 0 : e.args.y) ?? 1;
      return Math.min(t, 5);
    });
    return (t, e) => {
      const h = T("MfmComponent");
      return _(), v(h, {
        className: `scale ${t.className ?? ""}`,
        tokens: t.children,
        style: E([
          {
            transform: `scale(${c.value}, ${s.value})`
          },
          t.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), Nu = /* @__PURE__ */ N({
  __name: "Position",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    return (d, c) => {
      var t, e;
      const s = T("MfmComponent");
      return _(), v(s, {
        className: `position ${d.className ?? ""}`,
        tokens: d.children,
        style: E([
          {
            transform: `translateX(${(t = d.token) == null ? void 0 : t.args.x}em) translateY(${(e = d.token) == null ? void 0 : e.args.y}em)`
          },
          d.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), $u = /* @__PURE__ */ N({
  __name: "X2",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    return (d, c) => {
      const s = T("MfmComponent");
      return _(), v(s, {
        className: `x2 ${d.className ?? ""}`,
        tokens: d.children,
        style: E([{ fontSize: "200%" }, d.style])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), Cu = /* @__PURE__ */ N({
  __name: "X3",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    return (d, c) => {
      const s = T("MfmComponent");
      return _(), v(s, {
        className: `x3 ${d.className ?? ""}`,
        tokens: d.children,
        style: E([{ fontSize: "300%" }, d.style])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), Mu = /* @__PURE__ */ N({
  __name: "X4",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    return (d, c) => {
      const s = T("MfmComponent");
      return _(), v(s, {
        className: `x4 ${d.className ?? ""}`,
        tokens: d.children,
        style: E([{ fontSize: "400%" }, d.style])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), Tu = /* @__PURE__ */ N({
  __name: "Jump",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    return (d, c) => {
      var t, e;
      const s = T("MfmComponent");
      return _(), v(s, {
        className: `position ${d.className ?? ""}`,
        tokens: d.children,
        style: E([
          {
            animation: `${O(A)((t = d.token) == null ? void 0 : t.args.speed) ?? "0.75s"} linear ${O(A)((e = d.token) == null ? void 0 : e.args.delay) ?? "0s"} infinite normal none running mfm-jump`
          },
          d.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), Eu = /* @__PURE__ */ N({
  __name: "Tada",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    return (d, c) => {
      var t, e;
      const s = T("MfmComponent");
      return _(), v(s, {
        className: `rotate ${d.className ?? ""}`,
        tokens: d.children,
        style: E([
          {
            animation: `${O(A)((t = d.token) == null ? void 0 : t.args.speed) ?? "1s"} linear ${O(A)((e = d.token) == null ? void 0 : e.args.delay) ?? "0s"} infinite normal both running tada`
          },
          d.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), Ou = /* @__PURE__ */ N({
  __name: "Jelly",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    return (d, c) => {
      var t, e;
      const s = T("MfmComponent");
      return _(), v(s, {
        className: `rotate ${d.className ?? ""}`,
        tokens: d.children,
        style: E([
          {
            animation: `${O(A)((t = d.token) == null ? void 0 : t.args.speed) ?? "1s"} linear ${O(A)((e = d.token) == null ? void 0 : e.args.delay) ?? "0s"} infinite normal both running mfm-rubberBand`
          },
          d.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), vu = /* @__PURE__ */ N({
  __name: "Spin",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    const d = u, c = D(() => {
      var h, $;
      const t = (h = d.token) == null ? void 0 : h.args.x, e = ($ = d.token) == null ? void 0 : $.args.y;
      return t && e ? "mfm-spinXY" : t ? "mfm-spinX" : e ? "mfm-spinY" : "mfm-spin";
    }), s = D(() => {
      var t, e;
      return (t = d.token) != null && t.args.alternate ? "alternate" : (e = d.token) != null && e.args.left ? "reverse" : "normal";
    });
    return (t, e) => {
      var $, C;
      const h = T("MfmComponent");
      return _(), v(h, {
        className: `position ${t.className ?? ""}`,
        tokens: t.children,
        style: E([
          {
            animation: `${O(A)(($ = t.token) == null ? void 0 : $.args.speed) ?? "1.5s"} linear ${O(A)((C = t.token) == null ? void 0 : C.args.delay) ?? "0s"} infinite ${s.value} none running ${c.value}`
          },
          t.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), Iu = /* @__PURE__ */ N({
  __name: "Twitch",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    return (d, c) => {
      var t, e;
      const s = T("MfmComponent");
      return _(), v(s, {
        className: `rotate ${d.className ?? ""}`,
        tokens: d.children,
        style: E([
          {
            animation: `${O(A)((t = d.token) == null ? void 0 : t.args.speed) ?? "1s"} linear ${O(A)((e = d.token) == null ? void 0 : e.args.delay) ?? "0s"} infinite normal none running mfm-twitch`
          },
          d.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), Lu = /* @__PURE__ */ N({
  __name: "Shake",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    return (d, c) => {
      var t, e;
      const s = T("MfmComponent");
      return _(), v(s, {
        className: `position ${d.className ?? ""}`,
        tokens: d.children,
        style: E([
          {
            animation: `${O(A)((t = d.token) == null ? void 0 : t.args.speed) ?? "0.5s"} ease ${O(A)((e = d.token) == null ? void 0 : e.args.delay) ?? "0s"} infinite normal none running mfm-shake`
          },
          d.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), ju = /* @__PURE__ */ N({
  __name: "Bounce",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    return (d, c) => {
      var t, e;
      const s = T("MfmComponent");
      return _(), v(s, {
        className: `bounce ${d.className ?? ""}`,
        tokens: d.children,
        style: E([
          {
            animation: `${O(A)((t = d.token) == null ? void 0 : t.args.speed) ?? "0.75s"} linear ${O(A)((e = d.token) == null ? void 0 : e.args.delay) ?? "0s"} infinite normal none running mfm-bounce`,
            transformOrigin: "center bottom"
          },
          d.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), Pu = /* @__PURE__ */ N({
  __name: "Rainbow",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    return (d, c) => {
      var t, e;
      const s = T("MfmComponent");
      return _(), v(s, {
        className: `rotate ${d.className ?? ""}`,
        tokens: d.children,
        style: E([
          {
            animation: `${O(A)((t = d.token) == null ? void 0 : t.args.speed) ?? "0.5s"} ease ${O(A)((e = d.token) == null ? void 0 : e.args.delay) ?? "0s"} infinite normal none running mfm-rainbow`
          },
          d.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), Au = (u) => ($e("data-v-0b45643b"), u = u(), Ce(), u), qu = /* @__PURE__ */ Au(() => /* @__PURE__ */ H("path", {
  fill: "currentColor",
  d: "M197.58 129.06l-51.61-19-19-51.65a15.92 15.92 0 0 0-29.88 0L78.07 110l-51.65 19a15.92 15.92 0 0 0 0 29.88L78 178l19 51.62a15.92 15.92 0 0 0 29.88 0l19-51.61 51.65-19a15.92 15.92 0 0 0 0-29.88Z"
}, null, -1)), Su = [
  qu
], wu = /* @__PURE__ */ N({
  __name: "Sparkle",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    const d = u, c = D(() => {
      var h, $, C, I, b, j;
      const t = A((C = ($ = (h = d.token) == null ? void 0 : h.props) == null ? void 0 : $.args) == null ? void 0 : C.speed) ?? "1s", e = A((j = (b = (I = d.token) == null ? void 0 : I.props) == null ? void 0 : b.args) == null ? void 0 : j.delay) ?? "0s";
      return [
        {
          style: {
            top: "-0.5em",
            left: "-0.5em",
            animation: `mfm-sparkle ${t} linear infinite`,
            animationDelay: e,
            color: "#eb6f92"
          }
        },
        {
          style: {
            top: "-0.5em",
            right: "-0.5em",
            animation: `mfm-sparkle ${t} linear infinite`,
            animationDelay: `calc(${e} + ${t} / 3)`,
            color: "#f6c177"
          }
        },
        {
          style: {
            bottom: "-0.5em",
            left: "50%",
            marginLeft: "-0.5em",
            animation: `mfm-sparkle ${t} linear infinite`,
            animationDelay: `calc(${e} + ${t} * 2 / 3)`,
            color: "#9ccfd8"
          }
        }
      ];
    }), s = D(() => ({
      position: "relative",
      display: "inline-block",
      ...d.style
    }));
    return (t, e) => {
      const h = T("MfmComponent");
      return _(), M("span", {
        class: ue(`mfm-sparkle ${t.className ?? ""}`),
        style: E(s.value)
      }, [
        F(h, { tokens: t.children }, null, 8, ["tokens"]),
        (_(!0), M(z, null, V(c.value, ($, C) => (_(), M("svg", {
          key: C,
          class: "mfm-sparkle-particle",
          style: E($.style),
          viewBox: "0 0 256 256",
          "aria-hidden": "true"
        }, Su, 4))), 128))
      ], 6);
    };
  }
}), Bu = /* @__PURE__ */ ye(wu, [["__scopeId", "data-v-0b45643b"]]), Ru = /* @__PURE__ */ N({
  __name: "Ruby",
  props: {
    children: {},
    token: {},
    style: {},
    className: {}
  },
  setup(u) {
    const d = u, c = D(() => {
      var e;
      const s = (e = d.children) == null ? void 0 : e[0], t = s && s.type === "text" && "text" in s.props ? s.props.text.split(" ") : ["", ""];
      return {
        body: t[0] ?? "",
        yomi: t[1] ?? ""
      };
    });
    return (s, t) => (_(), M("ruby", null, [
      G(S(c.value.body) + " ", 1),
      H("rt", null, S(c.value.yomi), 1)
    ]));
  }
}), Du = /* @__PURE__ */ N({
  __name: "Border",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(u) {
    const d = u, c = D(() => {
      var I;
      const s = ((I = d.token) == null ? void 0 : I.args) ?? {}, t = je(s.color), e = Pe(s.style) || "solid", h = Y(s.width) ?? 1, $ = Y(s.radius) ?? 0, C = "noclip" in s;
      return {
        border: t ? `${h}px ${e} #${t}` : `${h}px ${e} var(--accent)`,
        borderRadius: `${$}px`,
        ...!C && { overflow: "clip" }
      };
    });
    return (s, t) => {
      const e = T("MfmComponent");
      return _(), v(e, {
        className: `border ${s.className ?? ""}`,
        tokens: s.children,
        style: E([c.value, s.style])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), Hu = /* @__PURE__ */ N({
  __name: "MfmRenderer",
  props: {
    text: {}
  },
  setup(u) {
    const d = u, c = D(() => Le(d.text, !1));
    return (s, t) => (_(), v(be, { tokens: c.value }, null, 8, ["tokens"]));
  }
}), Uu = {
  MfmRenderer: Hu,
  MfmComponent: be,
  Bold: Se,
  Italic: Be,
  Quote: De,
  Small: Ue,
  Text: Te,
  Center: ze,
  EmojiCode: Qe,
  Mention: Ye,
  Plain: We,
  BlockCode: xe,
  InlineCode: uu,
  Search: nu,
  Strike: cu,
  UnicodeEmoji: ru,
  Url: fu,
  Link: lu,
  Hashtag: mu,
  Fn: pu,
  Fg: _u,
  Bg: hu,
  Font: bu,
  Blur: yu,
  Flip: gu,
  Scale: ku,
  Position: Nu,
  X2: $u,
  X3: Cu,
  X4: Mu,
  Jump: Tu,
  Tada: Eu,
  Jelly: Ou,
  Spin: vu,
  Twitch: Iu,
  Shake: Lu,
  Bounce: ju,
  Rainbow: Pu,
  Sparkle: Bu,
  Ruby: Ru,
  Border: Du
}, zu = {
  install: (u) => (Object.entries(Uu).forEach(([d, c]) => {
    u.component(d, c);
  }), u)
};
export {
  zu as default
};
