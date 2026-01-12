import { defineComponent as k, computed as G, openBlock as _, createElementBlock as $, Fragment as K, renderList as V, createElementVNode as D, normalizeClass as uu, normalizeStyle as E, toDisplayString as S, createCommentVNode as W, createBlock as v, resolveDynamicComponent as au, unref as O, resolveComponent as M, createVNode as z, inject as eu, ref as lu, watch as yu, createTextVNode as Q, withDirectives as gu, vModelText as ku, pushScopeId as Nu, popScopeId as $u } from "vue";
const Cu = { key: 0 }, Mu = /* @__PURE__ */ k({
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
  setup(e) {
    const d = e, c = G(() => d.plain ? [d.token.text.replace(/\n/g, " ")] : d.token.text.split(/\r\n|\n|\r/)), f = (o, u) => u + 1 !== c.value.length;
    return (o, u) => (_(!0), $(K, null, V(c.value, (N, C) => (_(), $(K, null, [
      D("span", {
        class: uu(["text", [o.className, o.$attrs.class]]),
        style: E(o.style)
      }, S(N), 7),
      f(N, C) ? (_(), $("br", Cu)) : W("", !0)
    ], 64))), 256));
  }
});
var H = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Y = {}, B = {}, F = {}, X = {}, iu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.createLanguage = e.lazy = e.lineEnd = e.lineBegin = e.char = e.newline = e.crlf = e.lf = e.cr = e.notMatch = e.alt = e.seq = e.regexp = e.str = e.Parser = e.failure = e.success = void 0;
  function d(y, m) {
    return {
      success: !0,
      value: m,
      index: y
    };
  }
  e.success = d;
  function c() {
    return { success: !1 };
  }
  e.failure = c;
  class f {
    constructor(m, i) {
      this.handler = (n, r, t) => {
        if (t.trace && this.name != null) {
          const s = `${r}`;
          console.log(`${s.padEnd(6, " ")}enter ${this.name}`);
          const p = m(n, r, t);
          if (p.success) {
            const a = `${r}:${p.index}`;
            console.log(`${a.padEnd(6, " ")}match ${this.name}`);
          } else {
            const a = `${r}`;
            console.log(`${a.padEnd(6, " ")}fail ${this.name}`);
          }
          return p;
        }
        return m(n, r, t);
      }, this.name = i;
    }
    map(m) {
      return new f((i, n, r) => {
        const t = this.handler(i, n, r);
        return t.success ? d(t.index, m(t.value)) : t;
      });
    }
    text() {
      return new f((m, i, n) => {
        const r = this.handler(m, i, n);
        if (!r.success)
          return r;
        const t = m.slice(i, r.index);
        return d(r.index, t);
      });
    }
    many(m) {
      return new f((i, n, r) => {
        let t, s = n;
        const p = [];
        for (; s < i.length && (t = this.handler(i, s, r), !!t.success); )
          s = t.index, p.push(t.value);
        return p.length < m ? c() : d(s, p);
      });
    }
    sep(m, i) {
      if (i < 1)
        throw new Error('"min" must be a value greater than or equal to 1.');
      return N([
        this,
        N([
          m,
          this
        ], 1).many(i - 1)
      ]).map((n) => [n[0], ...n[1]]);
    }
    option() {
      return C([
        this,
        T(null)
      ]);
    }
  }
  e.Parser = f;
  function o(y) {
    return new f((m, i, n) => m.length - i < y.length || m.substr(i, y.length) !== y ? c() : d(i + y.length, y));
  }
  e.str = o;
  function u(y) {
    const m = RegExp(`^(?:${y.source})`, y.flags);
    return new f((i, n, r) => {
      const t = i.slice(n), s = m.exec(t);
      return s == null ? c() : d(n + s[0].length, s[0]);
    });
  }
  e.regexp = u;
  function N(y, m) {
    return new f((i, n, r) => {
      let t, s = n;
      const p = [];
      for (let a = 0; a < y.length; a++) {
        if (t = y[a].handler(i, s, r), !t.success)
          return t;
        s = t.index, p.push(t.value);
      }
      return d(s, m != null ? p[m] : p);
    });
  }
  e.seq = N;
  function C(y) {
    return new f((m, i, n) => {
      let r;
      for (let t = 0; t < y.length; t++)
        if (r = y[t].handler(m, i, n), r.success)
          return r;
      return c();
    });
  }
  e.alt = C;
  function T(y) {
    return new f((m, i, n) => d(i, y));
  }
  function A(y) {
    return new f((m, i, n) => y.handler(m, i, n).success ? c() : d(i, null));
  }
  e.notMatch = A, e.cr = o("\r"), e.lf = o(`
`), e.crlf = o(`\r
`), e.newline = C([e.crlf, e.cr, e.lf]), e.char = new f((y, m, i) => {
    if (y.length - m < 1)
      return c();
    const n = y.charAt(m);
    return d(m + 1, n);
  }), e.lineBegin = new f((y, m, i) => m === 0 || e.cr.handler(y, m - 1, i).success || e.lf.handler(y, m - 1, i).success ? d(m, null) : c()), e.lineEnd = new f((y, m, i) => m === y.length || e.cr.handler(y, m, i).success || e.lf.handler(y, m, i).success ? d(m, null) : c());
  function h(y) {
    const m = new f((i, n, r) => (m.handler = y().handler, m.handler(i, n, r)));
    return m;
  }
  e.lazy = h;
  function q(y) {
    const m = {};
    for (const i of Object.keys(y))
      m[i] = h(() => {
        const n = y[i](m);
        if (n == null)
          throw new Error("syntax must return a parser.");
        return n.name = i, n;
      });
    return m;
  }
  e.createLanguage = q;
})(iu);
var w = {}, du = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.TEXT = e.PLAIN = e.FN = e.LINK = e.N_URL = e.HASHTAG = e.MENTION = e.MATH_INLINE = e.INLINE_CODE = e.STRIKE = e.ITALIC = e.SMALL = e.BOLD = e.EMOJI_CODE = e.UNI_EMOJI = e.CENTER = e.MATH_BLOCK = e.CODE_BLOCK = e.SEARCH = e.QUOTE = e.isMfmBlock = void 0;
  const d = ["quote", "search", "blockCode", "mathBlock", "center"];
  function c(l) {
    return d.includes(l.type);
  }
  e.isMfmBlock = c;
  const f = (l) => ({ type: "quote", children: l });
  e.QUOTE = f;
  const o = (l, I) => ({ type: "search", props: { query: l, content: I } });
  e.SEARCH = o;
  const u = (l, I) => ({ type: "blockCode", props: { code: l, lang: I } });
  e.CODE_BLOCK = u;
  const N = (l) => ({ type: "mathBlock", props: { formula: l } });
  e.MATH_BLOCK = N;
  const C = (l) => ({ type: "center", children: l });
  e.CENTER = C;
  const T = (l) => ({ type: "unicodeEmoji", props: { emoji: l } });
  e.UNI_EMOJI = T;
  const A = (l) => ({ type: "emojiCode", props: { name: l } });
  e.EMOJI_CODE = A;
  const h = (l) => ({ type: "bold", children: l });
  e.BOLD = h;
  const q = (l) => ({ type: "small", children: l });
  e.SMALL = q;
  const y = (l) => ({ type: "italic", children: l });
  e.ITALIC = y;
  const m = (l) => ({ type: "strike", children: l });
  e.STRIKE = m;
  const i = (l) => ({ type: "inlineCode", props: { code: l } });
  e.INLINE_CODE = i;
  const n = (l) => ({ type: "mathInline", props: { formula: l } });
  e.MATH_INLINE = n;
  const r = (l, I, P) => ({ type: "mention", props: { username: l, host: I, acct: P } });
  e.MENTION = r;
  const t = (l) => ({ type: "hashtag", props: { hashtag: l } });
  e.HASHTAG = t;
  const s = (l, I) => {
    const P = { type: "url", props: { url: l } };
    return I && (P.props.brackets = I), P;
  };
  e.N_URL = s;
  const p = (l, I, P) => ({ type: "link", props: { silent: l, url: I }, children: P });
  e.LINK = p;
  const a = (l, I, P) => ({ type: "fn", props: { name: l, args: I }, children: P });
  e.FN = a;
  const b = (l) => ({ type: "plain", children: [(0, e.TEXT)(l)] });
  e.PLAIN = b;
  const g = (l) => ({ type: "text", props: { text: l } });
  e.TEXT = g;
})(du);
Object.defineProperty(w, "__esModule", { value: !0 });
w.inspectOne = w.stringifyTree = w.stringifyNode = w.mergeText = void 0;
const Z = du;
function Tu(e) {
  const d = [], c = [];
  function f() {
    c.length > 0 && (d.push((0, Z.TEXT)(c.join(""))), c.length = 0);
  }
  const o = e.flat(1);
  for (const u of o)
    typeof u == "string" ? c.push(u) : !Array.isArray(u) && u.type === "text" ? c.push(u.props.text) : (f(), d.push(u));
  return f(), d;
}
w.mergeText = Tu;
function mu(e) {
  var d;
  switch (e.type) {
    case "quote":
      return R(e.children).split(`
`).map((c) => `> ${c}`).join(`
`);
    case "search":
      return e.props.content;
    case "blockCode":
      return `\`\`\`${(d = e.props.lang) !== null && d !== void 0 ? d : ""}
${e.props.code}
\`\`\``;
    case "mathBlock":
      return `\\[
${e.props.formula}
\\]`;
    case "center":
      return `<center>
${R(e.children)}
</center>`;
    case "emojiCode":
      return `:${e.props.name}:`;
    case "unicodeEmoji":
      return e.props.emoji;
    case "bold":
      return `**${R(e.children)}**`;
    case "small":
      return `<small>${R(e.children)}</small>`;
    case "italic":
      return `<i>${R(e.children)}</i>`;
    case "strike":
      return `~~${R(e.children)}~~`;
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
      return `${e.props.silent ? "?" : ""}[${R(e.children)}](${e.props.url})`;
    case "fn": {
      const c = Object.keys(e.props.args).map((o) => {
        const u = e.props.args[o];
        return u === !0 ? o : `${o}=${u}`;
      }), f = c.length > 0 ? "." + c.join(",") : "";
      return `$[${e.props.name}${f} ${R(e.children)}]`;
    }
    case "plain":
      return `<plain>
${R(e.children)}
</plain>`;
    case "text":
      return e.props.text;
  }
  throw new Error("unknown mfm node");
}
w.stringifyNode = mu;
var U;
(function(e) {
  e[e.none = 0] = "none", e[e.inline = 1] = "inline", e[e.block = 2] = "block";
})(U || (U = {}));
function R(e) {
  const d = [];
  let c = U.none;
  for (const f of e) {
    let o = !0;
    (0, Z.isMfmBlock)(f) ? (c === U.none && (o = !1), c = U.block) : ((c === U.none || c === U.inline) && (o = !1), c = U.inline), o && d.push((0, Z.TEXT)(`
`)), d.push(f);
  }
  return d.map((f) => mu(f)).join("");
}
w.stringifyTree = R;
function pu(e, d) {
  if (d(e), e.children != null)
    for (const c of e.children)
      pu(c, d);
}
w.inspectOne = pu;
var nu = {};
Object.defineProperty(nu, "__esModule", {
  value: !0
});
nu.default = /(?:\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83e\udef1\ud83c\udffb\u200d\ud83e\udef2\ud83c[\udffc-\udfff]|\ud83e\udef1\ud83c\udffc\u200d\ud83e\udef2\ud83c[\udffb\udffd-\udfff]|\ud83e\udef1\ud83c\udffd\u200d\ud83e\udef2\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\udef1\ud83c\udffe\u200d\ud83e\udef2\ud83c[\udffb-\udffd\udfff]|\ud83e\udef1\ud83c\udfff\u200d\ud83e\udef2\ud83c[\udffb-\udffe]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d\udc8f\ud83c[\udffb-\udfff]|\ud83d\udc91\ud83c[\udffb-\udfff]|\ud83e\udd1d\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d\udc8f\udc91]|\ud83e\udd1d)|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf7c\udf84\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc70\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd4\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83d\ude36\u200d\ud83c\udf2b\ufe0f|\u2764\ufe0f\u200d\ud83d\udd25|\u2764\ufe0f\u200d\ud83e\ude79|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc3b\u200d\u2744\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83d\ude2e\u200d\ud83d\udca8|\ud83d\ude35\u200d\ud83d\udcab|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f|\ud83d\udc08\u200d\u2b1b|\ud83d\udc26\u200d\u2b1b)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|\ud83e\udef0|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0c\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\udd77\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd\udec3-\udec5\udef1-\udef8]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udc8e\udc90\udc92-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5-\uded7\udedc-\udedf\udeeb\udeec\udef4-\udefc\udfe0-\udfeb\udff0]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd76\udd78-\uddb4\uddb7\uddba\uddbc-\uddcc\uddd0\uddde-\uddff\ude70-\ude7c\ude80-\ude88\ude90-\udebd\udebf-\udec2\udece-\udedb\udee0-\udee8]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g;
var cu;
function Eu() {
  if (cu)
    return X;
  cu = 1;
  var e = H && H.__createBinding || (Object.create ? function(n, r, t, s) {
    s === void 0 && (s = t);
    var p = Object.getOwnPropertyDescriptor(r, t);
    (!p || ("get" in p ? !r.__esModule : p.writable || p.configurable)) && (p = { enumerable: !0, get: function() {
      return r[t];
    } }), Object.defineProperty(n, s, p);
  } : function(n, r, t, s) {
    s === void 0 && (s = t), n[s] = r[t];
  }), d = H && H.__setModuleDefault || (Object.create ? function(n, r) {
    Object.defineProperty(n, "default", { enumerable: !0, value: r });
  } : function(n, r) {
    n.default = r;
  }), c = H && H.__importStar || function(n) {
    if (n && n.__esModule)
      return n;
    var r = {};
    if (n != null)
      for (var t in n)
        t !== "default" && Object.prototype.hasOwnProperty.call(n, t) && e(r, n, t);
    return d(r, n), r;
  }, f = H && H.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(X, "__esModule", { value: !0 }), X.language = void 0;
  const o = c(_u()), u = c(iu), N = w, C = f(nu), T = u.regexp(/[\u0020\u3000\t]/), A = u.regexp(/[a-z0-9]/i), h = u.alt([u.crlf, u.cr, u.lf]);
  function q(n) {
    return new u.Parser((r, t, s) => {
      const p = [];
      let a = t;
      for (let b = 0; b < n.length; b++) {
        const g = n[b].handler(r, a, s);
        if (!g.success)
          return a === t ? u.failure() : u.success(a, r.slice(t, a));
        p.push(g.value), a = g.index;
      }
      return u.success(a, p);
    });
  }
  const y = new u.Parser((n, r, t) => t.linkLabel ? u.failure() : u.success(r, null)), m = new u.Parser((n, r, t) => t.depth < t.nestLimit ? u.success(r, null) : u.failure());
  function i(n, r) {
    const t = u.alt([
      u.seq([m, n], 1),
      r ?? u.char
    ]);
    return new u.Parser((s, p, a) => {
      a.depth++;
      const b = t.handler(s, p, a);
      return a.depth--, b;
    });
  }
  return X.language = u.createLanguage({
    fullParser: (n) => n.full.many(0),
    simpleParser: (n) => n.simple.many(0),
    full: (n) => u.alt([
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
    simple: (n) => u.alt([
      n.unicodeEmoji,
      n.emojiCode,
      n.text
    ]),
    inline: (n) => u.alt([
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
      const r = u.seq([
        u.str(">"),
        T.option(),
        u.seq([u.notMatch(h), u.char], 1).many(0).text()
      ], 2).sep(h, 1), t = u.seq([
        h.option(),
        h.option(),
        u.lineBegin,
        r,
        h.option(),
        h.option()
      ], 3);
      return new u.Parser((s, p, a) => {
        let b;
        if (b = t.handler(s, p, a), !b.success)
          return b;
        const g = b.value, l = b.index;
        return g.length === 1 && g[0].length === 0 ? u.failure() : (b = i(n.fullParser).many(0).handler(g.join(`
`), 0, a), b.success ? u.success(l, o.QUOTE((0, N.mergeText)(b.value))) : b);
      });
    },
    codeBlock: (n) => {
      const r = u.str("```");
      return u.seq([
        h.option(),
        u.lineBegin,
        r,
        u.seq([u.notMatch(h), u.char], 1).many(0),
        h,
        u.seq([u.notMatch(u.seq([h, r, u.lineEnd])), u.char], 1).many(1),
        h,
        r,
        u.lineEnd,
        h.option()
      ]).map((t) => {
        const s = t[3].join("").trim(), p = t[5].join("");
        return o.CODE_BLOCK(p, s.length > 0 ? s : null);
      });
    },
    mathBlock: (n) => {
      const r = u.str("\\["), t = u.str("\\]");
      return u.seq([
        h.option(),
        u.lineBegin,
        r,
        h.option(),
        u.seq([u.notMatch(u.seq([h.option(), t])), u.char], 1).many(1),
        h.option(),
        t,
        u.lineEnd,
        h.option()
      ]).map((s) => {
        const p = s[4].join("");
        return o.MATH_BLOCK(p);
      });
    },
    centerTag: (n) => {
      const r = u.str("<center>"), t = u.str("</center>");
      return u.seq([
        h.option(),
        u.lineBegin,
        r,
        h.option(),
        u.seq([u.notMatch(u.seq([h.option(), t])), i(n.inline)], 1).many(1),
        h.option(),
        t,
        u.lineEnd,
        h.option()
      ]).map((s) => o.CENTER((0, N.mergeText)(s[4])));
    },
    big: (n) => {
      const r = u.str("***");
      return q([
        r,
        u.seq([u.notMatch(r), i(n.inline)], 1).many(1),
        r
      ]).map((t) => typeof t == "string" ? t : o.FN("tada", {}, (0, N.mergeText)(t[1])));
    },
    boldAsta: (n) => {
      const r = u.str("**");
      return q([
        r,
        u.seq([u.notMatch(r), i(n.inline)], 1).many(1),
        r
      ]).map((t) => typeof t == "string" ? t : o.BOLD((0, N.mergeText)(t[1])));
    },
    boldTag: (n) => {
      const r = u.str("<b>"), t = u.str("</b>");
      return q([
        r,
        u.seq([u.notMatch(t), i(n.inline)], 1).many(1),
        t
      ]).map((s) => typeof s == "string" ? s : o.BOLD((0, N.mergeText)(s[1])));
    },
    boldUnder: (n) => {
      const r = u.str("__");
      return u.seq([
        r,
        u.alt([A, T]).many(1),
        r
      ]).map((t) => o.BOLD((0, N.mergeText)(t[1])));
    },
    smallTag: (n) => {
      const r = u.str("<small>"), t = u.str("</small>");
      return q([
        r,
        u.seq([u.notMatch(t), i(n.inline)], 1).many(1),
        t
      ]).map((s) => typeof s == "string" ? s : o.SMALL((0, N.mergeText)(s[1])));
    },
    italicTag: (n) => {
      const r = u.str("<i>"), t = u.str("</i>");
      return q([
        r,
        u.seq([u.notMatch(t), i(n.inline)], 1).many(1),
        t
      ]).map((s) => typeof s == "string" ? s : o.ITALIC((0, N.mergeText)(s[1])));
    },
    italicAsta: (n) => {
      const r = u.str("*"), t = u.seq([
        r,
        u.alt([A, T]).many(1),
        r
      ]);
      return new u.Parser((s, p, a) => {
        const b = t.handler(s, p, a);
        if (!b.success)
          return u.failure();
        const g = s.slice(0, p);
        return /[a-z0-9]$/i.test(g) ? u.failure() : u.success(b.index, o.ITALIC((0, N.mergeText)(b.value[1])));
      });
    },
    italicUnder: (n) => {
      const r = u.str("_"), t = u.seq([
        r,
        u.alt([A, T]).many(1),
        r
      ]);
      return new u.Parser((s, p, a) => {
        const b = t.handler(s, p, a);
        if (!b.success)
          return u.failure();
        const g = s.slice(0, p);
        return /[a-z0-9]$/i.test(g) ? u.failure() : u.success(b.index, o.ITALIC((0, N.mergeText)(b.value[1])));
      });
    },
    strikeTag: (n) => {
      const r = u.str("<s>"), t = u.str("</s>");
      return q([
        r,
        u.seq([u.notMatch(t), i(n.inline)], 1).many(1),
        t
      ]).map((s) => typeof s == "string" ? s : o.STRIKE((0, N.mergeText)(s[1])));
    },
    strikeWave: (n) => {
      const r = u.str("~~");
      return q([
        r,
        u.seq([u.notMatch(u.alt([r, h])), i(n.inline)], 1).many(1),
        r
      ]).map((t) => typeof t == "string" ? t : o.STRIKE((0, N.mergeText)(t[1])));
    },
    unicodeEmoji: (n) => {
      const r = RegExp(C.default.source);
      return u.regexp(r).map((t) => o.UNI_EMOJI(t));
    },
    plainTag: (n) => {
      const r = u.str("<plain>"), t = u.str("</plain>");
      return u.seq([
        r,
        h.option(),
        u.seq([
          u.notMatch(u.seq([h.option(), t])),
          u.char
        ], 1).many(1).text(),
        h.option(),
        t
      ], 2).map((s) => o.PLAIN(s));
    },
    fn: (n) => {
      const r = new u.Parser((a, b, g) => {
        const l = u.regexp(/[a-z0-9_]+/i).handler(a, b, g);
        return l.success ? u.success(l.index, l.value) : l;
      }), t = u.seq([
        u.regexp(/[a-z0-9_]+/i),
        u.seq([
          u.str("="),
          u.regexp(/[a-z0-9_.-]+/i)
        ], 1).option()
      ]).map((a) => ({
        k: a[0],
        v: a[1] != null ? a[1] : !0
      })), s = u.seq([
        u.str("."),
        t.sep(u.str(","), 1)
      ], 1).map((a) => {
        const b = {};
        for (const g of a)
          b[g.k] = g.v;
        return b;
      }), p = u.str("]");
      return q([
        u.str("$["),
        r,
        s.option(),
        u.str(" "),
        u.seq([u.notMatch(p), i(n.inline)], 1).many(1),
        p
      ]).map((a) => {
        if (typeof a == "string")
          return a;
        const b = a[1], g = a[2] || {}, l = a[4];
        return o.FN(b, g, (0, N.mergeText)(l));
      });
    },
    inlineCode: (n) => {
      const r = u.str("`");
      return u.seq([
        r,
        u.seq([
          u.notMatch(u.alt([r, u.str("´"), h])),
          u.char
        ], 1).many(1),
        r
      ]).map((t) => o.INLINE_CODE(t[1].join("")));
    },
    mathInline: (n) => {
      const r = u.str("\\("), t = u.str("\\)");
      return u.seq([
        r,
        u.seq([
          u.notMatch(u.alt([t, h])),
          u.char
        ], 1).many(1),
        t
      ]).map((s) => o.MATH_INLINE(s[1].join("")));
    },
    mention: (n) => {
      const r = u.seq([
        y,
        u.str("@"),
        u.regexp(/[a-z0-9_-]+/i),
        u.seq([
          u.str("@"),
          u.regexp(/[a-z0-9_.-]+/i)
        ], 1).option()
      ]);
      return new u.Parser((t, s, p) => {
        let a;
        if (a = r.handler(t, s, p), !a.success)
          return u.failure();
        const b = t.slice(0, s);
        if (/[a-z0-9]$/i.test(b))
          return u.failure();
        let g = !1;
        const l = a.index, I = a.value[2], P = a.value[3];
        let L = P;
        P != null && (a = /[.-]+$/.exec(P), a != null && (L = P.slice(0, -1 * a[0].length), L.length === 0 && (g = !0, L = null)));
        let J = I;
        if (a = /-+$/.exec(I), a != null && (L == null ? J = I.slice(0, -1 * a[0].length) : g = !0), (J.length === 0 || J[0] === "-") && (g = !0), L != null && /^[.-]/.test(L) && (g = !0), g)
          return u.success(l, t.slice(s, l));
        const tu = L != null ? `@${J}@${L}` : `@${J}`;
        return u.success(s + tu.length, o.MENTION(J, L, tu));
      });
    },
    hashtag: (n) => {
      const r = u.str("#"), t = u.seq([
        u.notMatch(u.alt([u.regexp(/[ \u3000\t.,!?'"#:/[\]【】()「」（）<>]/), T, h])),
        u.char
      ], 1), s = u.lazy(() => u.alt([
        u.seq([
          u.str("("),
          i(s, t).many(0),
          u.str(")")
        ]),
        u.seq([
          u.str("["),
          i(s, t).many(0),
          u.str("]")
        ]),
        u.seq([
          u.str("「"),
          i(s, t).many(0),
          u.str("」")
        ]),
        u.seq([
          u.str("（"),
          i(s, t).many(0),
          u.str("）")
        ]),
        t
      ])), p = u.seq([
        y,
        r,
        s.many(1).text()
      ], 2);
      return new u.Parser((a, b, g) => {
        const l = p.handler(a, b, g);
        if (!l.success)
          return u.failure();
        const I = a.slice(0, b);
        if (/[a-z0-9]$/i.test(I))
          return u.failure();
        const P = l.index, L = l.value;
        return /^[0-9]+$/.test(L) ? u.failure() : u.success(P, o.HASHTAG(L));
      });
    },
    emojiCode: (n) => {
      const r = u.notMatch(u.regexp(/[a-z0-9]/i)), t = u.str(":");
      return u.seq([
        u.alt([u.lineBegin, r]),
        t,
        u.regexp(/[a-z0-9_+-]+/i),
        t,
        u.alt([u.lineEnd, r])
      ], 2).map((s) => o.EMOJI_CODE(s));
    },
    link: (n) => {
      const r = new u.Parser((s, p, a) => {
        a.linkLabel = !0;
        const b = n.inline.handler(s, p, a);
        return a.linkLabel = !1, b;
      }), t = u.str("]");
      return u.seq([
        y,
        u.alt([u.str("?["), u.str("[")]),
        u.seq([
          u.notMatch(u.alt([t, h])),
          i(r)
        ], 1).many(1),
        t,
        u.str("("),
        u.alt([n.urlAlt, n.url]),
        u.str(")")
      ]).map((s) => {
        const p = s[1] === "?[", a = s[2], b = s[5];
        return o.LINK(p, b.props.url, (0, N.mergeText)(a));
      });
    },
    url: (n) => {
      const r = u.regexp(/[.,a-z0-9_/:%#@$&?!~=+-]/i), t = u.lazy(() => u.alt([
        u.seq([
          u.str("("),
          i(t, r).many(0),
          u.str(")")
        ]),
        u.seq([
          u.str("["),
          i(t, r).many(0),
          u.str("]")
        ]),
        r
      ])), s = u.seq([
        y,
        u.regexp(/https?:\/\//),
        t.many(1).text()
      ]);
      return new u.Parser((p, a, b) => {
        let g;
        if (g = s.handler(p, a, b), !g.success)
          return u.failure();
        const l = g.index;
        let I = l;
        const P = g.value[1];
        let L = g.value[2];
        return g = /[.,]+$/.exec(L), g != null && (I -= g[0].length, L = L.slice(0, -1 * g[0].length), L.length === 0) ? u.success(l, p.slice(a, l)) : u.success(I, o.N_URL(P + L, !1));
      });
    },
    urlAlt: (n) => {
      const r = u.str("<"), t = u.str(">"), s = u.seq([
        y,
        r,
        u.regexp(/https?:\/\//),
        u.seq([u.notMatch(u.alt([t, T])), u.char], 1).many(1),
        t
      ]).text();
      return new u.Parser((p, a, b) => {
        const g = s.handler(p, a, b);
        if (!g.success)
          return u.failure();
        const l = g.value.slice(1, g.value.length - 1);
        return u.success(g.index, o.N_URL(l, !0));
      });
    },
    search: (n) => {
      const r = u.alt([
        u.regexp(/\[(検索|search)\]/i),
        u.regexp(/(検索|search)/i)
      ]);
      return u.seq([
        h.option(),
        u.lineBegin,
        u.seq([
          u.notMatch(u.alt([
            h,
            u.seq([T, r, u.lineEnd])
          ])),
          u.char
        ], 1).many(1),
        T,
        r,
        u.lineEnd,
        h.option()
      ]).map((t) => {
        const s = t[2].join("");
        return o.SEARCH(s, `${s}${t[3]}${t[4]}`);
      });
    },
    text: (n) => u.char
  }), X;
}
var ru;
function Ou() {
  if (ru)
    return F;
  ru = 1, Object.defineProperty(F, "__esModule", { value: !0 }), F.simpleParser = F.fullParser = void 0;
  const e = Eu(), d = w;
  function c(o, u) {
    const N = e.language.fullParser.handler(o, 0, {
      nestLimit: u.nestLimit != null ? u.nestLimit : 20,
      depth: 0,
      linkLabel: !1,
      trace: !1
    });
    return (0, d.mergeText)(N.value);
  }
  F.fullParser = c;
  function f(o) {
    const u = e.language.simpleParser.handler(o, 0, {});
    return (0, d.mergeText)(u.value);
  }
  return F.simpleParser = f, F;
}
var fu;
function Iu() {
  if (fu)
    return B;
  fu = 1, Object.defineProperty(B, "__esModule", { value: !0 }), B.extract = B.inspect = B.toString = B.parseSimple = B.parse = void 0;
  const e = Ou(), d = w;
  function c(C, T = {}) {
    return (0, e.fullParser)(C, {
      nestLimit: T.nestLimit
    });
  }
  B.parse = c;
  function f(C) {
    return (0, e.simpleParser)(C);
  }
  B.parseSimple = f;
  function o(C) {
    return Array.isArray(C) ? (0, d.stringifyTree)(C) : (0, d.stringifyNode)(C);
  }
  B.toString = o;
  function u(C, T) {
    if (Array.isArray(C))
      for (const A of C)
        (0, d.inspectOne)(A, T);
    else
      (0, d.inspectOne)(C, T);
  }
  B.inspect = u;
  function N(C, T) {
    const A = [];
    return u(C, (h) => {
      T(h) && A.push(h);
    }), A;
  }
  return B.extract = N, B;
}
var su;
function _u() {
  return su || (su = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.TEXT = e.PLAIN = e.FN = e.LINK = e.N_URL = e.HASHTAG = e.MENTION = e.MATH_INLINE = e.INLINE_CODE = e.STRIKE = e.ITALIC = e.SMALL = e.BOLD = e.EMOJI_CODE = e.UNI_EMOJI = e.CENTER = e.MATH_BLOCK = e.CODE_BLOCK = e.SEARCH = e.QUOTE = e.extract = e.inspect = e.toString = e.parseSimple = e.parse = void 0;
    var d = Iu();
    Object.defineProperty(e, "parse", { enumerable: !0, get: function() {
      return d.parse;
    } }), Object.defineProperty(e, "parseSimple", { enumerable: !0, get: function() {
      return d.parseSimple;
    } }), Object.defineProperty(e, "toString", { enumerable: !0, get: function() {
      return d.toString;
    } }), Object.defineProperty(e, "inspect", { enumerable: !0, get: function() {
      return d.inspect;
    } }), Object.defineProperty(e, "extract", { enumerable: !0, get: function() {
      return d.extract;
    } });
    var c = du;
    Object.defineProperty(e, "QUOTE", { enumerable: !0, get: function() {
      return c.QUOTE;
    } }), Object.defineProperty(e, "SEARCH", { enumerable: !0, get: function() {
      return c.SEARCH;
    } }), Object.defineProperty(e, "CODE_BLOCK", { enumerable: !0, get: function() {
      return c.CODE_BLOCK;
    } }), Object.defineProperty(e, "MATH_BLOCK", { enumerable: !0, get: function() {
      return c.MATH_BLOCK;
    } }), Object.defineProperty(e, "CENTER", { enumerable: !0, get: function() {
      return c.CENTER;
    } }), Object.defineProperty(e, "UNI_EMOJI", { enumerable: !0, get: function() {
      return c.UNI_EMOJI;
    } }), Object.defineProperty(e, "EMOJI_CODE", { enumerable: !0, get: function() {
      return c.EMOJI_CODE;
    } }), Object.defineProperty(e, "BOLD", { enumerable: !0, get: function() {
      return c.BOLD;
    } }), Object.defineProperty(e, "SMALL", { enumerable: !0, get: function() {
      return c.SMALL;
    } }), Object.defineProperty(e, "ITALIC", { enumerable: !0, get: function() {
      return c.ITALIC;
    } }), Object.defineProperty(e, "STRIKE", { enumerable: !0, get: function() {
      return c.STRIKE;
    } }), Object.defineProperty(e, "INLINE_CODE", { enumerable: !0, get: function() {
      return c.INLINE_CODE;
    } }), Object.defineProperty(e, "MATH_INLINE", { enumerable: !0, get: function() {
      return c.MATH_INLINE;
    } }), Object.defineProperty(e, "MENTION", { enumerable: !0, get: function() {
      return c.MENTION;
    } }), Object.defineProperty(e, "HASHTAG", { enumerable: !0, get: function() {
      return c.HASHTAG;
    } }), Object.defineProperty(e, "N_URL", { enumerable: !0, get: function() {
      return c.N_URL;
    } }), Object.defineProperty(e, "LINK", { enumerable: !0, get: function() {
      return c.LINK;
    } }), Object.defineProperty(e, "FN", { enumerable: !0, get: function() {
      return c.FN;
    } }), Object.defineProperty(e, "PLAIN", { enumerable: !0, get: function() {
      return c.PLAIN;
    } }), Object.defineProperty(e, "TEXT", { enumerable: !0, get: function() {
      return c.TEXT;
    } });
  }(Y)), Y;
}
var ou = _u();
function vu(e, d) {
  return e == null || e === "" ? [] : d ? ou.parseSimple(e) : ou.parse(e);
}
function x(e) {
  return e.replace(/(^.)(.*)/, (d, c, f) => `${c.toUpperCase() + f}`);
}
function j(e) {
  if (e && /^\-?[0-9.]+s$/.test(e))
    return e;
}
const Lu = {
  key: 0,
  style: { border: "solid 1px red" }
}, bu = /* @__PURE__ */ k({
  __name: "Mfm",
  props: {
    tokens: {},
    style: {},
    className: {},
    class: {},
    debug: { type: Boolean }
  },
  setup(e) {
    const c = !!e.debug;
    return (f, o) => (_(), $(K, null, [
      (_(!0), $(K, null, V(f.tokens, (u) => (_(), v(au(`${O(x)(u.type)}`), {
        style: E(f.style),
        className: f.className,
        token: u.props,
        children: u.children
      }, null, 8, ["style", "className", "token", "children"]))), 256)),
      O(c) ? (_(), $("div", Lu, [
        (_(!0), $(K, null, V(f.tokens, (u) => (_(), $("div", null, [
          D("p", null, "Selected: " + S(O(x)(u.type)), 1),
          D("pre", null, S(u), 1)
        ]))), 256))
      ])) : W("", !0)
    ], 64));
  }
}), ju = { class: "bold" }, Pu = /* @__PURE__ */ k({
  __name: "Bold",
  props: {
    children: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), $("b", ju, [
        z(f, { tokens: d.children }, null, 8, ["tokens"])
      ]);
    };
  }
}), Au = { class: "italic" }, qu = /* @__PURE__ */ k({
  __name: "Italic",
  props: {
    children: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), $("i", Au, [
        z(f, { tokens: d.children }, null, 8, ["tokens"])
      ]);
    };
  }
}), Su = {
  class: "quote",
  style: { display: "block", margin: "8px", padding: "6px 0px 6px 12px", color: "var(--fg)", "border-left": "solid 3px var(--fg)", opacity: "0.7" }
}, Bu = /* @__PURE__ */ k({
  __name: "Quote",
  props: {
    children: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), $("div", Su, [
        z(f, { tokens: d.children }, null, 8, ["tokens"])
      ]);
    };
  }
}), wu = {
  class: "small",
  style: { opacity: "0.7" }
}, Ru = /* @__PURE__ */ k({
  __name: "Small",
  props: {
    children: {},
    token: {},
    style: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), $("small", wu, [
        z(f, { tokens: d.children }, null, 8, ["tokens"])
      ]);
    };
  }
}), Du = { class: "center" }, Hu = /* @__PURE__ */ k({
  __name: "Center",
  props: {
    children: {},
    class: {},
    className: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), $("div", Du, [
        z(f, { tokens: d.children }, null, 8, ["tokens"])
      ]);
    };
  }
}), Uu = ["src"], Ku = { key: 1 }, zu = /* @__PURE__ */ k({
  __name: "EmojiCode",
  props: {
    token: {},
    children: {},
    className: {},
    class: {},
    style: {}
  },
  setup(e) {
    const d = eu("emojis", {});
    return (c, f) => O(d)[c.token.name] ? (_(), $("img", {
      key: 0,
      src: O(d)[c.token.name].url,
      class: "emoji"
    }, null, 8, Uu)) : (_(), $("span", Ku, ":" + S(c.token.name) + ":", 1));
  }
}), hu = (e, d) => {
  const c = e.__vccOpts || e;
  for (const [f, o] of d)
    c[f] = o;
  return c;
}, Fu = /* @__PURE__ */ hu(zu, [["__scopeId", "data-v-0407b1c0"]]), Ju = ["href"], Xu = ["src"], Qu = /* @__PURE__ */ k({
  __name: "Mention",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    const d = e, c = eu("domain", ""), f = lu(void 0);
    return yu(
      () => d.token,
      async () => {
        const o = await fetch(
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
        f.value = (await o.json())[0];
      },
      { immediate: !0 }
    ), (o, u) => (_(), $("a", {
      class: "mention",
      href: o.token.host ?? "https://" + O(c) + "/" + o.token.acct
    }, [
      f.value ? (_(), $("img", {
        key: 0,
        class: "avatar",
        src: f.value.avatarUrl
      }, null, 8, Xu)) : W("", !0),
      Q(S(o.token.acct), 1)
    ], 8, Ju));
  }
}), Gu = /* @__PURE__ */ k({
  __name: "Plain",
  props: {
    children: {},
    token: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), v(f, { tokens: d.children }, null, 8, ["tokens"]);
    };
  }
}), Vu = { class: "block-code" }, Wu = /* @__PURE__ */ k({
  __name: "BlockCode",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => (_(), $(K, null, [
      Q(S(d.token.lang) + " ", 1),
      D("pre", Vu, [
        Q("    "),
        D("code", null, S(d.token.code), 1),
        Q(`
  `)
      ])
    ], 64));
  }
}), Yu = { class: "inline-code" }, Zu = /* @__PURE__ */ k({
  __name: "InlineCode",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => (_(), $("pre", Yu, S(d.token.code), 1));
  }
}), xu = { class: "search" }, ue = /* @__PURE__ */ k({
  __name: "Search",
  props: {
    token: {},
    children: {}
  },
  setup(e) {
    const c = lu(e.token.query), f = () => {
      window.open(
        "https://www.google.com/search?q=" + encodeURIComponent(c.value),
        "_blank"
      );
    };
    return (o, u) => (_(), $("div", xu, [
      gu(D("input", {
        type: "text",
        "onUpdate:modelValue": u[0] || (u[0] = (N) => c.value = N)
      }, null, 512), [
        [ku, c.value]
      ]),
      D("button", { onClick: f }, "検索")
    ]));
  }
}), ee = { class: "strike" }, de = /* @__PURE__ */ k({
  __name: "Strike",
  props: {
    token: {},
    children: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), $("del", ee, [
        z(f, { tokens: d.children }, null, 8, ["tokens"])
      ]);
    };
  }
}), ne = /* @__PURE__ */ k({
  __name: "UnicodeEmoji",
  props: {
    children: {},
    token: {},
    class: {},
    style: {}
  },
  setup(e) {
    return (d, c) => (_(), $("span", {
      style: E(d.style)
    }, S(d.token.emoji), 5));
  }
}), te = ["href", "textContent"], ce = /* @__PURE__ */ k({
  __name: "Url",
  props: {
    token: {},
    children: {}
  },
  setup(e) {
    return (d, c) => (_(), $("a", {
      class: "url",
      href: d.token.url,
      textContent: S(d.token.url)
    }, null, 8, te));
  }
}), re = { key: 0 }, fe = ["href"], se = /* @__PURE__ */ k({
  __name: "Link",
  props: {
    token: {},
    children: {},
    className: {},
    style: {},
    class: {}
  },
  setup(e) {
    const d = eu("debugMode", !1);
    return (c, f) => {
      const o = M("MfmComponent");
      return _(), $(K, null, [
        O(d) ? (_(), $("span", re, "silent - " + S(c.token.silent), 1)) : W("", !0),
        D("a", {
          class: uu(["link", c.className]),
          href: c.token.url,
          style: E(c.style)
        }, [
          z(o, { tokens: c.children }, null, 8, ["tokens"])
        ], 14, fe)
      ], 64);
    };
  }
}), oe = ["href"], ae = /* @__PURE__ */ k({
  __name: "Hashtag",
  props: {
    token: {},
    children: {},
    style: {}
  },
  setup(e) {
    return (d, c) => (_(), $("a", {
      class: "hashtag",
      href: "/tags/" + d.token.hashtag
    }, "#" + S(d.token.hashtag), 9, oe));
  }
}), le = /* @__PURE__ */ k({
  __name: "Fn",
  props: {
    token: {},
    tokens: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => (_(), v(au(O(x)(d.token.name)), {
      className: `Fn ${d.token.name} ${d.className ?? ""}`,
      token: d.token,
      children: d.children,
      style: E(d.style)
    }, null, 8, ["className", "token", "children", "style"]));
  }
}), ie = /* @__PURE__ */ k({
  __name: "Fg",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), v(f, {
        className: `fg ${d.className ?? ""}`,
        tokens: d.children,
        style: E([{ color: `#${d.token.args.color}` }, d.style])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), me = /* @__PURE__ */ k({
  __name: "Bg",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), v(f, {
        className: `bg ${d.className ?? ""}`,
        tokens: d.children,
        style: E([{ background: `#${d.token.args.color}` }, d.style])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), pe = /* @__PURE__ */ k({
  __name: "Font",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), v(f, {
        className: `fg ${d.className ?? ""}`,
        tokens: d.children,
        style: E([{ fontFamily: Object.keys(d.token.args) }, d.style])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), _e = /* @__PURE__ */ k({
  __name: "Blur",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), v(f, {
        className: `blur ${d.className ?? ""}`,
        tokens: d.children,
        style: E([{ fontFamily: Object.keys(d.token.args) }, d.style])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), be = /* @__PURE__ */ k({
  __name: "Flip",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), v(f, {
        className: `flip ${d.className ?? ""}`,
        tokens: d.children,
        style: E([
          {
            transform: `scale(${d.token.args.h ? 1 : -1}, ${d.token.args.v ? -1 : 1})`
          },
          d.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), he = /* @__PURE__ */ k({
  __name: "Scale",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), v(f, {
        className: `rotate ${d.className ?? ""}`,
        tokens: d.children,
        style: E([
          {
            transform: `scale(${d.token.args.x}, ${d.token.args.y})`
          },
          d.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), ye = /* @__PURE__ */ k({
  __name: "Position",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), v(f, {
        className: `position ${d.className ?? ""}`,
        tokens: d.children,
        style: E([
          {
            transform: `translateX(${d.token.args.x}em) translateY(${d.token.args.y}em)`
          },
          d.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), ge = /* @__PURE__ */ k({
  __name: "X2",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), v(f, {
        className: `rotate ${d.className ?? ""}`,
        tokens: d.children,
        style: E([{ fontSize: "200%" }, d.style])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), ke = /* @__PURE__ */ k({
  __name: "X3",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), v(f, {
        className: `rotate ${d.className ?? ""}`,
        tokens: d.children,
        style: E([{ fontSize: "300%" }, d.style])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), Ne = /* @__PURE__ */ k({
  __name: "X4",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), v(f, {
        className: `rotate ${d.className ?? ""}`,
        tokens: d.children,
        style: E([{ fontSize: "400%" }, d.style])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), $e = /* @__PURE__ */ k({
  __name: "Jump",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), v(f, {
        className: `position ${d.className ?? ""}`,
        tokens: d.children,
        style: E([
          {
            animation: `${O(j)(d.token.args.speed) ?? "0.75s"} linear ${O(j)(d.token.args.delay) ?? "0s"} infinite normal none running mfm-jump`
          },
          d.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), Ce = /* @__PURE__ */ k({
  __name: "Tada",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), v(f, {
        className: `rotate ${d.className ?? ""}`,
        tokens: d.children,
        style: E([
          {
            animation: `${O(j)(d.token.args.speed) ?? "1s"} linear ${O(j)(d.token.args.delay) ?? "0s"} infinite normal both running tada`
          },
          d.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), Me = /* @__PURE__ */ k({
  __name: "Jelly",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), v(f, {
        className: `rotate ${d.className ?? ""}`,
        tokens: d.children,
        style: E([
          {
            animation: `${O(j)(d.token.args.speed) ?? "1s"} linear ${O(j)(d.token.args.delay) ?? "0s"} infinite normal both running mfm-rubberBand`
          },
          d.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), Te = /* @__PURE__ */ k({
  __name: "Spin",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), v(f, {
        className: `position ${d.className ?? ""}`,
        tokens: d.children,
        style: E([
          {
            animation: `${O(j)(d.token.args.speed) ?? "1.5s"} linear ${O(j)(d.token.args.delay) ?? "0s"} infinite normal none running mfm-spin`
          },
          d.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), Ee = /* @__PURE__ */ k({
  __name: "Twitch",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), v(f, {
        className: `rotate ${d.className ?? ""}`,
        tokens: d.children,
        style: E([
          {
            animation: `${O(j)(d.token.args.speed) ?? "1s"} linear ${O(j)(d.token.args.delay) ?? "0s"} infinite normal none running mfm-twitch`
          },
          d.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), Oe = /* @__PURE__ */ k({
  __name: "Shake",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), v(f, {
        className: `position ${d.className ?? ""}`,
        tokens: d.children,
        style: E([
          {
            animation: `${O(j)(d.token.args.speed) ?? "0.5s"} ease ${O(j)(d.token.args.delay) ?? "0s"} infinite normal none running mfm-shake`
          },
          d.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), Ie = /* @__PURE__ */ k({
  __name: "Bounce",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), v(f, {
        className: `rotate ${d.className ?? ""}`,
        tokens: d.children,
        style: E([
          {
            animation: `${O(j)(d.token.args.speed) ?? "0.75s"} linear ${O(j)(d.token.args.delay) ?? "0s"} infinite normal none running mfm-bounce`,
            transformOrigin: "center bottom"
          },
          d.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), ve = /* @__PURE__ */ k({
  __name: "Rainbow",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    return (d, c) => {
      const f = M("MfmComponent");
      return _(), v(f, {
        className: `rotate ${d.className ?? ""}`,
        tokens: d.children,
        style: E([
          {
            animation: `${O(j)(d.token.args.speed) ?? "0.5s"} ease ${O(j)(d.token.args.delay) ?? "0s"} infinite normal none running mfm-rainbow`
          },
          d.style
        ])
      }, null, 8, ["className", "tokens", "style"]);
    };
  }
}), Le = (e) => (Nu("data-v-0b45643b"), e = e(), $u(), e), je = /* @__PURE__ */ Le(() => /* @__PURE__ */ D("path", {
  fill: "currentColor",
  d: "M197.58 129.06l-51.61-19-19-51.65a15.92 15.92 0 0 0-29.88 0L78.07 110l-51.65 19a15.92 15.92 0 0 0 0 29.88L78 178l19 51.62a15.92 15.92 0 0 0 29.88 0l19-51.61 51.65-19a15.92 15.92 0 0 0 0-29.88Z"
}, null, -1)), Pe = [
  je
], Ae = /* @__PURE__ */ k({
  __name: "Sparkle",
  props: {
    token: {},
    children: {},
    style: {},
    className: {}
  },
  setup(e) {
    const d = e, c = G(() => {
      var N, C, T, A, h, q;
      const o = j((T = (C = (N = d.token) == null ? void 0 : N.props) == null ? void 0 : C.args) == null ? void 0 : T.speed) ?? "1s", u = j((q = (h = (A = d.token) == null ? void 0 : A.props) == null ? void 0 : h.args) == null ? void 0 : q.delay) ?? "0s";
      return [
        {
          style: {
            top: "-0.5em",
            left: "-0.5em",
            animation: `mfm-sparkle ${o} linear infinite`,
            animationDelay: u,
            color: "#eb6f92"
          }
        },
        {
          style: {
            top: "-0.5em",
            right: "-0.5em",
            animation: `mfm-sparkle ${o} linear infinite`,
            animationDelay: `calc(${u} + ${o} / 3)`,
            color: "#f6c177"
          }
        },
        {
          style: {
            bottom: "-0.5em",
            left: "50%",
            marginLeft: "-0.5em",
            animation: `mfm-sparkle ${o} linear infinite`,
            animationDelay: `calc(${u} + ${o} * 2 / 3)`,
            color: "#9ccfd8"
          }
        }
      ];
    }), f = G(() => ({
      position: "relative",
      display: "inline-block",
      ...d.style
    }));
    return (o, u) => {
      const N = M("MfmComponent");
      return _(), $("span", {
        class: uu(`mfm-sparkle ${o.className ?? ""}`),
        style: E(f.value)
      }, [
        z(N, { tokens: o.children }, null, 8, ["tokens"]),
        (_(!0), $(K, null, V(c.value, (C, T) => (_(), $("svg", {
          key: T,
          class: "mfm-sparkle-particle",
          style: E(C.style),
          viewBox: "0 0 256 256",
          "aria-hidden": "true"
        }, Pe, 4))), 128))
      ], 6);
    };
  }
}), qe = /* @__PURE__ */ hu(Ae, [["__scopeId", "data-v-0b45643b"]]), Se = /* @__PURE__ */ k({
  __name: "Ruby",
  props: {
    children: {},
    token: {},
    style: {},
    className: {}
  },
  setup(e) {
    const d = e, c = G(() => {
      const f = d.children[0].props.text.split(" ");
      return {
        body: f[0],
        yomi: f[1]
      };
    });
    return (f, o) => (_(), $("ruby", null, [
      Q(S(c.value.body) + " ", 1),
      D("rt", null, S(c.value.yomi), 1)
    ]));
  }
}), Be = /* @__PURE__ */ k({
  __name: "MfmRenderer",
  props: {
    text: {}
  },
  setup(e) {
    const d = e, c = G(() => vu(d.text, !1));
    return (f, o) => (_(), v(bu, { tokens: c.value }, null, 8, ["tokens"]));
  }
}), Re = {
  install: (e) => (e.component("MfmRenderer", Be).component("MfmComponent", bu).component("Bold", Pu).component("Italic", qu).component("Quote", Bu).component("Small", Ru).component("Text", Mu).component("Center", Hu).component("EmojiCode", Fu).component("Mention", Qu).component("Plain", Gu).component("BlockCode", Wu).component("InlineCode", Zu).component("Search", ue).component("Strike", de).component("UnicodeEmoji", ne).component("Url", ce).component("Link", se).component("Hashtag", ae).component("Fn", le).component("Fg", ie).component("Bg", me).component("Font", pe).component("Blur", _e).component("Flip", be).component("Scale", he).component("Position", ye).component("X2", ge).component("X3", ke).component("X4", Ne).component("Jump", $e).component("Tada", Ce).component("Jelly", Me).component("Spin", Te).component("Twitch", Ee).component("Shake", Oe).component("Bounce", Ie).component("Rainbow", ve).component("Sparkle", qe).component("Ruby", Se), e)
};
export {
  Re as default
};
