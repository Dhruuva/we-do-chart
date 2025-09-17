var lt = Object.defineProperty, ht = Object.defineProperties;
var xt = Object.getOwnPropertyDescriptors;
var Q = Object.getOwnPropertySymbols;
var nt = Object.prototype.hasOwnProperty, at = Object.prototype.propertyIsEnumerable;
var _ = (n, y, t) => y in n ? lt(n, y, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[y] = t, tt = (n, y) => {
  for (var t in y || (y = {}))
    nt.call(y, t) && _(n, t, y[t]);
  if (Q)
    for (var t of Q(y))
      at.call(y, t) && _(n, t, y[t]);
  return n;
}, et = (n, y) => ht(n, xt(y));
var st = (n, y, t) => new Promise((c, z) => {
  var S = (w) => {
    try {
      b(t.next(w));
    } catch (A) {
      z(A);
    }
  }, C = (w) => {
    try {
      b(t.throw(w));
    } catch (A) {
      z(A);
    }
  }, b = (w) => w.done ? c(w.value) : Promise.resolve(w.value).then(S, C);
  b((t = t.apply(n, y)).next());
});
import { ref as W, useTemplateRef as rt, reactive as $, computed as R, onMounted as ot, watch as Z, createElementBlock as j, openBlock as G, unref as M, createElementVNode as Y, createCommentVNode as H, normalizeStyle as ut, toDisplayString as U, Fragment as J, renderList as K } from "vue";
function it(n, y, t) {
  var S;
  if (!y) return 3 * t;
  const c = Math.max.apply(null, (S = y[0]) == null ? void 0 : S.data.map((C) => n.format(new Date(C.tm)).length));
  return c ? c * t : 3 * t;
}
function ft(n, y, t, c) {
  let z = n.length < 2 ? 2 : n.length, S = y && y.length > 0 ? Math.max.apply(null, y[0].data.map((w) => ("" + w.price).indexOf("."))) : 1;
  S < 0 && (S = Math.max.apply(null, y[0].data.map((w) => ("" + w.price).length)));
  let C = S + z - 1;
  return y && y.length == 0 && (C = 6), C * c + t.off;
}
function mt(n, y, t, c) {
  let z = n.size + n.off;
  return y * 1.18 + t * 40 + c / 100 * 3 + z;
}
function yt(n, y) {
  return y * 1.18 + n.off;
}
function gt() {
  const n = [], y = [], t = [], c = [], z = [], S = [];
  let C = 0;
  const b = (f, r, g, v) => {
    let x = this.movMin, o = x.toString().indexOf(".") > 0 ? x.toString().length - x.toString().indexOf(".") - 1 : 0, a = (f - r) / g < g * x ? g * x : (f - r) / g;
    a >= 1 && (a = Math.round((f - r) / g));
    let I = (v.y.y1 - v.y.y2) / g, B = v.y.y2, V = Math.ceil(f / a) * a, O = V, F = [{ id: g, price: Number(O).toFixed(o), y: B }], s = O;
    for (; V >= r; ) V -= a;
    let l = (O - V) / g;
    for (let P = g - 1; P >= 0; P--) {
      let h = Number(s -= l).toFixed(o);
      B += I, F.push({ id: P, price: h, y: B });
    }
    let m = (v.y.y1 - v.y.y2) / (O - V);
    return C = f > 0 & r < 0 ? B - m * Math.abs(V) : null, { y: F, high: Number(O).toFixed(o), low: Number(V).toFixed(o) };
  }, w = (f) => {
    let r = 1 / 0, g = f.map((x) => x.price), v = Math.max(...g.map((x) => ("" + x).length));
    for (let x = 0; x <= g.length - 1; x++) {
      let o = x == 0 ? g[x] : Math.abs(g[x] - g[x - 1]);
      r = r > o ? o : r;
    }
    return this.movMin = r, { mMov: r, width: v };
  }, A = (f, r, g, v, x, o) => {
    z.length = 0, n.length = 0, y.length = 0, c.length = 0, t.length = 0, this.movMin = x;
    let a = [...f];
    for (; a.length > 0; ) t.push(a.pop());
    t.reverse();
    let I = Math.min(...t.map((u) => u.price)), B = Math.max.apply(null, t.map((u) => u.price)), V = (r.y.y1 - r.y.y2) / 100, O = b(B, I, g, r), F = O.high - O.low;
    for (; O.y.length > 0; ) y.push(O.y.pop());
    let l = (r.x.x2 - r.x.x1) / (t.length - 1), m = r.x.x1, N = v * 1.5, P = (t.length - 1) * N / ((t.length - 1) * l), h = 1;
    S.forEach((u, p) => {
      let E = (u.price - O.low) * 100 / F;
      u.y = r.y.y1 - V * E;
      let L = t.map((T) => T.tm).indexOf(u.tm);
      u.x = L * l + m, L >= 0 ? u.visiable = 1 : u.visiable = -1;
    });
    const i = o.resolvedOptions(), e = new Intl.DateTimeFormat(i.locale, { month: "short", timeZone: i.locale.timeZone }), k = new Intl.DateTimeFormat(i.locale, { year: "numeric", timeZone: i.locale.timeZone });
    t.forEach((u, p) => {
      let E = (u.price - O.low) * 100 / F, L = { id: p, price: u.price, y: r.y.y1 - V * E }, T = u.tm;
      if (c.push(L), L.dtm = T, L.x = p * l + m, z.push(L), p == 0) {
        let X = { id: p, dtm: T, x: r.x.x1 };
        o ? (X.tm = o.format(new Date(T)), X.d = new Date(T).getDate(), X.mm = e.format(new Date(T)), X.yy = k.format(new Date(T))) : X.tm = T, n.push(X);
      } else if (p > 0 && h >= Math.round(P)) {
        let X = { id: p, dtm: T, x: L.x };
        o ? (X.tm = o.format(new Date(T)), X.d = new Date(T).getDate(), X.mm = e.format(new Date(T)), X.yy = k.format(new Date(T))) : X.tm = T, n.push(X), h = 1;
      }
      h++;
    });
  }, D = (f, r) => {
    var x;
    let g = (x = f[0]) == null ? void 0 : x.dtm;
    const v = r.resolvedOptions();
    f.forEach((o) => {
      v.timeStyle && !v.dateStyle ? new Date(o.dtm).getFullYear() !== new Date(g).getFullYear() ? o.tm = o.yy : new Date(o.dtm).getMonth() !== new Date(g).getMonth() ? o.tm = o.mm : new Date(o.dtm).getDate() !== new Date(g).getDate() && (o.tm = new Date(o.dtm).getDate()) : v.day && !v.dateStyle && !v.timeStyle && !v.year && !v.month && (new Date(o.dtm).getFullYear() !== new Date(g).getFullYear() ? o.tm = o.yy : new Date(o.dtm).getMonth() !== new Date(g).getMonth() && (o.tm = o.mm)), g = o.dtm;
    });
  }, d = (f) => {
    let r = new Date(f);
    return !isNaN(r.getDate());
  };
  this.formulaY = (f, r, g, v, x, o) => A(f, r, g, v, x, o), this.minMove = (f) => w(f), this.formatTicksX = (f, r) => D(f, r), this.ticksY = () => y, this.pointY = () => c, this.ticksX = () => n, this.pointYX = () => z, this.zero = () => C, this.yScale = (f, r, g, v) => b(f, r, g, v), this.isValidDate = (f) => d(f), Object.defineProperty(this, "shapes", {
    get: function() {
      return S;
    },
    set(f) {
      S.length = 0, Array.prototype.push.apply(S, f);
    }
  });
}
function dt(n, y, t, c, z, S, C) {
  new Array(), this.axis = n, this.pos = y, this.h = t, this.thumbs = c.value, this.wline = z.value, this.cross = S.value, this.fs = C;
  let b = 0.41, w = !1, A = !1, D = !1, d = !1, f = !1, r = !1;
  const g = (s, l, m, N) => {
    this.gds = s, this.svg = l.value, this.pointYX = m, this.limitSize = N == null ? void 0 : N.value, this.pos.value.x = this.axis.x.x1;
    let P = (this.h - (this.axis.y.y1 + this.fs * 1.18)) / 2 + b * 40 / 2, h = this.h - P;
    return this.thumbs.left.x = this.axis.x.x1 - b * 31, this.thumbs.left.y = h, this.wline.left.x1 = this.axis.x.x1, this.wline.left.x2 = this.axis.x.x1, this.wline.left.y1 = h + b * 40 / 2, this.wline.left.y2 = h + b * 40 / 2, this.wline.left.sSize = b * 40 * 0.6, this.wline.left.active = !1, this.wline.middle.x = this.axis.x.x1, this.wline.middle.y = h + b * 8, this.wline.middle.w = this.axis.x.x2 - this.axis.x.x1, this.wline.middle.h = b * 24, this.thumbs.right.x = this.axis.x.x2, this.thumbs.right.y = h, this.wline.right.x1 = this.axis.x.x2, this.wline.right.x2 = this.axis.x.x2, this.wline.right.y1 = h + b * 40 / 2, this.wline.right.y2 = h + b * 40 / 2, this.wline.right.sSize = b * 40 * 0.6, "ok";
  }, v = (s) => {
    let l = b * 31, m = this.thumbs.step * this.limitSize, N = 10, P, h = this.thumbs.left.off ? this.thumbs.left.off : l;
    s > 0 ? (P = this.thumbs.left.x + N, this.thumbs.right.x - P - h > m && (this.thumbs.left.x = P, this.wline.left.x2 = this.thumbs.left.x < this.axis.x.x1 ? this.wline.left.x1 : this.thumbs.left.x, this.wline.middle.x = this.thumbs.left.x + l, this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x - l, this.gds(this.thumbs.left.x, this.thumbs.right.x))) : (P = this.thumbs.left.x - N, P + l > this.axis.x.x1 ? (this.thumbs.left.x = P, this.wline.left.x2 = this.thumbs.left.x < this.axis.x.x1 ? this.wline.left.x1 : this.thumbs.left.x, this.wline.middle.x = this.thumbs.left.x + l, this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x - l, this.gds(this.thumbs.left.x, this.thumbs.right.x)) : (this.thumbs.left.x = this.axis.x.x1 - l, this.wline.left.x2 = this.thumbs.left.x < this.axis.x.x1 ? this.wline.left.x1 : this.thumbs.left.x, this.wline.middle.x = this.thumbs.left.x + l, this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x - l, this.gds(this.thumbs.left.x, this.thumbs.right.x)));
  }, x = () => {
    let s = b * 31, l = this.thumbs.step * this.limitSize;
    if (f && !D && !w && r)
      a(s);
    else if (w && A || this.wline.left.active) {
      let m = this.thumbs.left.off ? this.thumbs.left.off : s;
      this.pos.value.x - m + s > this.axis.x.x1 && this.thumbs.right.x - this.pos.value.x - m > l && (this.thumbs.left.x = this.pos.value.x - m, this.wline.left.x2 = this.thumbs.left.x < this.axis.x.x1 ? this.wline.left.x1 : this.thumbs.left.x, this.wline.middle.x = this.thumbs.left.x + s, this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x - s, this.gds(this.thumbs.left.x, this.thumbs.right.x));
    }
    this.wline.left.active = !1;
  }, o = () => {
    let s = this.scl * 31, l = this.thumbs.step * this.limitSize, m = this.thumbs.right.off ? this.thumbs.right.off : 0;
    f && !D && !w && r ? I(s) : (D && d || this.wline.right.active) && this.pos.value.x < this.axis.x.x2 + s && this.pos.value.x - m - this.thumbs.left.x > l && (this.thumbs.right.x = this.pos.value.x - m, this.wline.right.x1 = this.pos.value.x > this.axis.x.x2 - s ? this.wline.right.x2 : this.thumbs.right.x + s, this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x, this.gds(this.thumbs.left.x, this.thumbs.right.x)), this.wline.right.active = !1;
  }, a = (s) => {
    let l = this.pos.value.x - this.thumbs.left.mp, m = this.thumbs.right.mp + this.pos.value.x;
    m <= this.axis.x.x2 && this.gds(l, this.thumbs.right.x), l >= this.axis.x.x1 - s && m <= this.axis.x.x2 ? (this.thumbs.left.x = l, this.wline.left.x2 = l < this.axis.x.x1 ? this.axis.x.x1 : l, this.wline.middle.x = this.thumbs.left.x + s) : l < this.axis.x.x1 - s && m <= this.axis.x.x2 && (l = this.axis.x.x1 - s, this.thumbs.left.x = l, this.wline.left.x2 = l < this.axis.x.x1 ? this.axis.x.x1 : l, this.wline.middle.x = this.thumbs.left.x + s);
  }, I = (s) => {
    let l = this.thumbs.right.mp + this.pos.value.x, m = this.pos.value.x - this.thumbs.left.mp;
    m >= this.axis.x.x1 - s && this.gds(this.thumbs.left.x, l), l <= this.axis.x.x2 && m >= this.axis.x.x1 - s ? (this.thumbs.right.x = l, this.wline.right.x1 = l + s > this.axis.x.x2 ? this.axis.x.x2 : l + s, this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x, this.move = "move") : l > this.axis.x.x2 && m >= this.axis.x.x1 - s ? (l = this.axis.x.x2, this.thumbs.right.x = l, this.wline.right.x1 = l + s > this.axis.x.x2 ? this.axis.x.x2 : l + s, this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x) : m < this.axis.x.x1 - s && (l = this.wline.middle.w + this.thumbs.left.x, this.thumbs.right.x = l, this.wline.right.x1 = l + s > this.axis.x.x2 ? this.axis.x.x2 : l + s, this.move = "dont't move");
  }, B = (s, l) => {
    let m = this.scl * 31;
    this.thumbs.left.x = s - m, this.wline.left.x2 = this.thumbs.left.x < this.axis.x.x1 ? this.wline.left.x1 : this.thumbs.left.x, this.wline.middle.x = this.thumbs.left.x + m, this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x - m, this.thumbs.right.x = l, this.wline.right.x1 = l > this.axis.x.x2 - m ? this.wline.right.x2 : this.thumbs.right.x + m, this.wline.middle.w = this.thumbs.right.x - this.thumbs.left.x;
  }, V = () => {
    A = !1, d = !1, w = !1, D = !1, r = !1, f = !1, this.pos.value.x < this.axis.x.x2 && this.pos.value.x > this.axis.x.x1 && this.pos.value.y > this.axis.y.y2 && this.pos.value.y < this.axis.y.y1 && (this.cross.cursor = "cursor: default;");
  }, O = (s) => {
    if (s.preventDefault(), this.pos.value.x < this.axis.x.x2 && this.pos.value.x > this.axis.x.x1 && this.pos.value.y > this.axis.y.y2 && this.pos.value.y < this.axis.y.y1 && (this.cross.cursor = "cursor: grabbing;", f = !0), w) {
      f = !1, D = !1, A = !0;
      let l = this.svg.createSVGPoint();
      l.x = s.clientX, l.y = s.clientY;
      let m = l.matrixTransform(this.svg.getScreenCTM().inverse());
      this.thumbs.left.off = Math.floor(m.x) - this.thumbs.left.x;
    }
    if (D) {
      f = !1, w = !1, d = !0;
      let l = this.svg.createSVGPoint();
      l.x = s.clientX, l.y = s.clientY;
      let m = l.matrixTransform(this.svg.getScreenCTM().inverse());
      this.thumbs.right.off = Math.floor(m.x) - this.thumbs.right.x;
    }
    if (f) {
      r = !0, d = !0, A = !0;
      let l = this.svg.createSVGPoint();
      l.x = s.clientX, l.y = s.clientY;
      let m = l.matrixTransform(this.svg.getScreenCTM().inverse());
      this.thumbs.right.mp = this.thumbs.right.x - Math.floor(m.x), this.thumbs.left.mp = Math.floor(m.x) - this.thumbs.left.x;
    }
  }, F = () => (this.leftDrug && !this.draggingLeft && (this.leftDrug = !1), this.rightDrug && !this.draggingRight && (this.rightDrug = !1), "ok");
  this.init = (s, l, m, N) => g(s, l, m, N), this.zoomSlider = (s) => v(s), this.thumbYY = () => o(), this.thumbY = () => x(), this.moveSlider = (s, l) => B(s, l), this.startDrag = (s) => O(s), this.stopDrag = () => V(), this.crossMove = () => crossMove(), this.stopThumb = () => F(), Object.defineProperty(this, "leftDrug", {
    get: function() {
      return w;
    },
    set(s) {
      w = s;
    }
  }), Object.defineProperty(this, "rightDrug", { get: function() {
    return D;
  }, set(s) {
    D = s;
  } }), Object.defineProperty(this, "draggingLeft", {
    get: function() {
      return A;
    },
    set(s) {
      A = s;
    }
  }), Object.defineProperty(this, "draggingRight", {
    get: function() {
      return d;
    },
    set(s) {
      d = s;
    }
  }), Object.defineProperty(this, "draggingCenter", {
    get: function() {
      return f;
    },
    set(s) {
      f = s;
    }
  }), Object.defineProperty(this, "moveDrug", {
    get: function() {
      return r;
    },
    set(s) {
      r = s;
    }
  }), Object.defineProperty(this, "scl", {
    get: function() {
      return b;
    },
    set(s) {
      b = s;
    }
  });
}
const ct = (n, y) => {
  const t = n.__vccOpts || n;
  for (const [c, z] of y)
    t[c] = z;
  return t;
}, pt = ["viewBox"], vt = ["width", "height"], bt = ["cx", "cy", "r"], wt = ["x", "y", "font-size"], Dt = ["x", "y", "font-size"], Mt = ["x1", "x2", "y1", "y2"], St = ["x1", "x2", "y1", "y2"], zt = { key: 0 }, kt = ["x1", "x2", "y1", "y2"], Yt = ["x1", "x2", "y1", "y2"], Tt = { key: 1 }, Ct = ["x1", "x2", "y1", "y2"], At = ["cx", "cy", "r"], Ot = ["x1", "x2", "y1", "y2"], Pt = ["x1", "x2", "y1", "y2"], Xt = ["x", "y", "font-size"], Vt = ["x1", "x2", "y1", "y2"], Nt = ["x1", "x2", "y1", "y2"], Ft = ["x", "y", "font-size"], Lt = ["points"], jt = ["transform"], Gt = ["x1", "x2", "y1", "y2", "stroke-width"], Bt = ["x", "y", "width", "height"], Et = ["transform"], Wt = ["x1", "x2", "y1", "y2", "stroke-width"], It = {
  __name: "WeDoChart",
  props: {
    ds: { type: Object, default: () => ({ width: 1250, height: 300 }) },
    points: { type: Array, default: () => new Array() },
    limit: { type: [Number], default: () => 10 },
    scl: { type: [Number, String], default: () => 0.45 },
    shapes: { type: Array, default: () => new Array({ type: "dot", x: 0, y: 0, price: 5, tm: "2018-02-05" }) },
    tky: { type: [Number, String], default: () => 7 },
    decimals: { type: [String], default: () => "0.01" },
    tsz: { type: Object, default: () => ({ size: 5, off: 5 }) },
    off: { type: [Number, String], default: () => 2 },
    msg: String,
    showGrid: { type: Boolean, default: !0 },
    timefotmat: { type: Object, default: () => new Intl.DateTimeFormat("sv-SE", { dateStyle: "short", timeStyle: "short" }) },
    fs: { type: [Number, String], default: () => 12 }
  },
  setup(n, { expose: y }) {
    const t = n, c = W({ x: 0, y: 0 }), z = rt("sheet"), S = W({ left: { x: 0, y: 0 }, right: { x: 0, y: 0, priceDigits: 0 }, step: 1e-4 }), C = W({ x1: 0, x2: Number.MAX_VALUE }), b = W(0), w = W(0), A = W(null), D = W({ left: { x1: 0, x2: 0, y1: 0, y2: 0 }, middle: { x: 0, y: 0, w: 0, h: 0 }, right: { x1: 0, x2: 0, y1: 0, y2: 0 } }), d = W({ v: { x1: 0, y1: 0, x2: 0, y2: 0 }, h: { x1: 0, y1: 0, x2: 0, y2: 0 }, hide: !1, txt: "", cursor: "cursor: crosshair;" }), f = $(new Array()), r = $(new Array()), g = $(new Array()), v = $(new Array()), x = R(() => {
      let h = t.ds.height, i = t.ds.width, e = h * t.off / 100, k = ft(t.decimals, t.points, t.tsz, t.fs), u = it(t.timefotmat, t.points, t.fs), p = mt(t.tsz, t.fs, t.scl, h), E = yt(t.tsz, t.fs), L = e < u / 3 ? u / 3 : e;
      L < t.scl * 31 && (L = t.scl * 31 + t.scl * 31 / 2.5);
      let T = e < p ? p : e, X = E > e ? E : e, q = e < k / 1.5 ? k / 1.5 : e;
      return {
        y: { y1: h - T, y2: X, x1: i - q, x2: i - q },
        x: { y1: h - T, y2: h - T, x1: L, x2: i - q }
      };
    }), o = new gt(), a = new dt(x.fn(), c, t.ds.height, S, D, d, t.fs);
    ot(() => st(null, null, function* () {
      a.leftDrug = !0, a.draggingLeft = !0, O(), d.value.txt = " ";
      const h = x.fn();
      F(h.x.x1, h.x.x2), a.scl = t.scl, a.init(F, z, g, w), z.value.createSVGPoint(), a.leftDrug = !1, a.draggingLeft = !1;
    }));
    const I = R(() => `0 0 ${t.ds.width} ${t.ds.height}`), B = R(() => t.points[0] && t.points[0].name ? t.points[0].name : "");
    R(() => {
      let h = t.ds.height * t.off / 100, i = t.ds.height * t.tky / 100, e = h, k = [];
      for (; e <= t.ds.height - h; )
        k.push(e), e += i;
      return { y: k };
    });
    const V = R(() => g.map((h) => `${h.x} ${h.y}`).join(" "));
    Z(
      [() => t.points, () => t.timefotmat, () => t.limit, () => t.off, () => t.tky, () => t.fs, () => t.scl, () => t.showGrid],
      (h, i) => {
        s();
      },
      { deep: !0 }
    ), Z(() => c, (h, i) => {
      var e;
      t.points && t.points.length > 0 && ((e = t.points[0]) == null ? void 0 : e.data.length) > 0 && (N(), a.thumbYY(), a.thumbY());
    }, { deep: !0 }), Z(() => t.timefotmat, (h, i) => {
      s();
    }, { deep: !0 }), Z(() => t.tsz, (h, i) => {
      s();
    }, { deep: !0 });
    const O = () => {
      let h = t.points.length > 0 ? t.points[0].data.length : 0;
      w.value = h <= 15 && h > 0 ? h : h / 100 * t.limit;
      const i = x.fn();
      let e = (i.x.x2 - i.x.x1) / (h - 1);
      S.value.step = e;
      let k = i.x.x1;
      t.points.length > 0 && t.points[0].data.forEach((u, p) => {
        u.x = p == 0 ? k : k = e + k, u.id = p;
      });
    }, F = (h, i) => {
      const e = x.fn();
      o.shapes = t.shapes;
      let k = S.value.step * 0.01, u = t.points.length > 0 ? t.points[0].data.filter((p) => p.x >= h && p.x <= i + k) : [];
      return C.value.x1 = u.length > 0 ? u[0].id : C.value.x1, C.value.x2 = u.length > 0 ? u.slice(-1)[0].id : C.value.x2, b.value != u.length ? (b.value = u.length, o.formulaY(u, e, t.tky, it(t.timefotmat, t.points, t.fs), t.decimals, t.timefotmat), f.splice(0, f.length), Array.prototype.push.apply(f, o.ticksY().map((p) => p)), r.splice(0, r.length), Array.prototype.push.apply(r, o.ticksX().map((p) => p)), t.timefotmat && o.formatTicksX(r, t.timefotmat), g.length = 0, Array.prototype.push.apply(g, o.pointYX().map((p) => p)), A.value = o.zero(), v.length = 0, Array.prototype.push.apply(v, o.shapes), "ok") : "no";
    }, s = () => {
      const h = x.fn();
      O();
      let i = t.points.length > 0 ? t.points[0].data.filter((p) => p.id >= C.value.x1 && p.id <= C.value.x2) : [], e = i.length > 0 ? i[0].x : h.x.x1, k = i.length > 0 ? i.slice(-1)[0].x : h.x.x2, u = i.slice(-1)[0];
      d.value.txt = u ? u.price + " " + u.tm : "", b.value = 1, F(e, k), a.scl = t.scl, a.init(F, z, g, w), a.moveSlider(e, k);
    }, l = (h) => {
      h.preventDefault();
      let i = z.value.createSVGPoint();
      i.x = h.clientX, i.y = h.clientY;
      let e = i.matrixTransform(z.value.getScreenCTM().inverse());
      c.value = { x: Math.floor(e.x), y: Math.floor(e.y) };
    }, m = (h) => {
      const i = x.fn();
      h.preventDefault(), c.value.x < i.x.x2 && c.value.x > i.x.x1 && c.value.y > i.y.y2 && c.value.y < i.y.y1 && a.zoomSlider(h.deltaY);
    }, N = () => {
      const h = x.fn(), i = new Array();
      if (c.value.x < h.x.x2 && c.value.x > h.x.x1 && c.value.y > h.y.y2 && c.value.y < h.y.y1) {
        if (!a.draggingCenter) {
          d.value.hide = !1, d.value.cursor = "cursor: default;";
          let k = (g.length > 0 ? g : u.points.length > 0 ? u.points[0].data : []).map((p) => et(tt({}, p), { f: Math.abs(p.x - c.value.x) })).sort((p, E) => Number(p.f - E.f));
          i.length = 0, Array.prototype.push.apply(i, k);
          let u = k.length > 0 ? k[0] : null;
          u ? (d.value.v.x1 = u.x, d.value.v.x2 = u.x, d.value.v.y1 = h.y.y1, d.value.v.y2 = h.y.y2, d.value.txt = u.price + " " + u.dtm, d.value.h.x1 = h.x.x1, d.value.h.x2 = h.x.x2, d.value.h.y1 = u.y, d.value.h.y2 = u.y) : d.value.txt = "_";
        }
      } else
        d.value.cursor = "cursor: default;", d.value.hide = !0;
    };
    return y({ loadChart: s, f: (h) => +h.toFixed(2) }), (h, i) => (G(), j("svg", {
      id: "sheet",
      ref: "sheet",
      viewBox: I.value,
      xmlns: "http://www.w3.org/2000/svg",
      onMousedown: i[11] || (i[11] = (e) => M(a).startDrag(e)),
      onMousemove: i[12] || (i[12] = (e) => l(e, c.value)),
      onWheel: m,
      onMouseleave: i[13] || (i[13] = (...e) => M(a).stopDrag && M(a).stopDrag(...e))
    }, [
      Y("rect", {
        class: "chartSheet",
        ref: "chartSheet",
        x: "0",
        y: "0",
        width: n.ds.width,
        height: n.ds.height,
        style: ut(d.value.cursor),
        onMouseup: i[0] || (i[0] = (...e) => M(a).stopDrag && M(a).stopDrag(...e))
      }, null, 44, vt),
      Y("circle", {
        class: "titlesDot",
        cx: x.value.x.x1,
        cy: x.value.y.y2 - 1 - n.fs / 3,
        r: n.fs / 3
      }, null, 8, bt),
      Y("text", {
        class: "legend",
        id: "legend",
        ref: "titles",
        x: x.value.x.x1 + 1 + n.fs / 3,
        y: x.value.y.y2 - 1,
        "font-size": n.fs
      }, U(d.value.txt), 9, wt),
      Y("text", {
        class: "titles",
        id: "title",
        x: x.value.x.x1 + (x.value.x.x2 - x.value.x.x1) / 2 + 1 + n.fs / 3,
        y: x.value.y.y2 - 1,
        "font-size": n.fs * 1.2
      }, U(B.value), 9, Dt),
      Y("line", {
        class: "axisY",
        x1: x.value.y.x1,
        x2: x.value.y.x2,
        y1: x.value.y.y1,
        y2: x.value.y.y2
      }, null, 8, Mt),
      Y("line", {
        class: "axisX",
        x1: x.value.x.x1,
        x2: x.value.x.x2,
        y1: x.value.x.y1,
        y2: x.value.x.y2
      }, null, 8, St),
      d.value.hide ? H("", !0) : (G(), j("g", zt, [
        Y("line", {
          class: "cross",
          x1: d.value.v.x1,
          x2: d.value.v.x2,
          y1: d.value.v.y1,
          y2: d.value.v.y2
        }, null, 8, kt),
        Y("line", {
          class: "cross",
          x1: d.value.h.x1,
          x2: d.value.h.x2,
          y1: d.value.h.y1,
          y2: d.value.h.y2
        }, null, 8, Yt)
      ])),
      A.value > 0 ? (G(), j("g", Tt, [
        Y("line", {
          class: "zero",
          x1: x.value.x.x1,
          x2: x.value.x.x2,
          y1: A.value,
          y2: A.value
        }, null, 8, Ct)
      ])) : H("", !0),
      (G(!0), j(J, null, K(v, (e) => (G(), j("g", {
        key: e.y
      }, [
        e.visiable > 0 ? (G(), j("circle", {
          key: 0,
          class: "shape",
          cx: e.x,
          cy: e.y,
          r: n.fs / 5
        }, null, 8, At)) : H("", !0)
      ]))), 128)),
      (G(!0), j(J, null, K(f, (e) => (G(), j("g", {
        class: "ticksY",
        key: e.y
      }, [
        n.showGrid ? (G(), j("line", {
          key: 0,
          class: "grids",
          x1: x.value.x.x1,
          x2: x.value.x.x2,
          y1: e.y,
          y2: e.y
        }, null, 8, Ot)) : H("", !0),
        Y("line", {
          class: "ticks",
          x1: x.value.y.x1,
          x2: x.value.y.x1 + n.tsz.size,
          y1: e.y,
          y2: e.y
        }, null, 8, Pt),
        Y("text", {
          class: "axislabely",
          x: x.value.y.x1 + n.tsz.off,
          y: e.y + n.fs / 3,
          "font-size": n.fs
        }, U(e.price), 9, Xt)
      ]))), 128)),
      (G(!0), j(J, null, K(r, (e) => (G(), j("g", {
        class: "ticksX",
        key: e.y
      }, [
        n.showGrid ? (G(), j("line", {
          key: 0,
          class: "grids",
          x1: e.x,
          x2: e.x,
          y1: x.value.y.y1,
          y2: x.value.y.y2
        }, null, 8, Vt)) : H("", !0),
        Y("line", {
          class: "ticks",
          x1: e.x,
          x2: e.x,
          y1: x.value.x.y1,
          y2: x.value.x.y1 + n.tsz.size
        }, null, 8, Nt),
        Y("text", {
          class: "axislabelx",
          x: e.x,
          y: x.value.x.y1 + n.tsz.size + n.tsz.off + n.fs / 2,
          "font-size": n.fs
        }, U(e.tm), 9, Ft)
      ]))), 128)),
      Y("polyline", {
        class: "plot",
        points: V.value
      }, null, 8, Lt),
      Y("g", {
        class: "leftThumb",
        transform: "translate(" + S.value.left.x + "," + S.value.left.y + ") scale(" + t.scl + ")",
        onMouseenter: i[1] || (i[1] = (e) => {
          M(a).draggingCenter || (M(a).leftDrug = !0);
        }),
        onMouseup: i[2] || (i[2] = (...e) => M(a).stopDrag && M(a).stopDrag(...e)),
        onMouseleave: i[3] || (i[3] = (...e) => M(a).stopThumb && M(a).stopThumb(...e))
      }, i[14] || (i[14] = [
        Y("polyline", { points: "10,40 0,30 0,10 10,0 31,0 31,40 " }, null, -1)
      ]), 40, jt),
      Y("line", {
        class: "wline",
        x1: D.value.left.x1,
        x2: D.value.left.x2,
        y1: D.value.left.y1,
        y2: D.value.left.y2,
        "stroke-width": D.value.left.sSize,
        onClick: i[4] || (i[4] = (...e) => M(a).wlineLeftClick && M(a).wlineLeftClick(...e))
      }, null, 8, Gt),
      Y("rect", {
        class: "mbody",
        onMouseup: i[5] || (i[5] = (...e) => M(a).stopDrag && M(a).stopDrag(...e)),
        x: D.value.middle.x,
        y: D.value.middle.y,
        width: D.value.middle.w,
        height: D.value.middle.h,
        onMousedown: i[6] || (i[6] = (e) => {
          M(a).draggingCenter = !0, M(a).startDrag(e);
        })
      }, null, 40, Bt),
      Y("g", {
        class: "rightThumb",
        onMouseup: i[7] || (i[7] = (...e) => M(a).stopDrag && M(a).stopDrag(...e)),
        transform: "translate(" + S.value.right.x + "," + S.value.right.y + ")scale(" + t.scl + ")",
        onMouseenter: i[8] || (i[8] = (e) => {
          M(a).draggingCenter || (M(a).rightDrug = !0);
        }),
        onMouseleave: i[9] || (i[9] = (...e) => M(a).stopThumb && M(a).stopThumb(...e))
      }, i[15] || (i[15] = [
        Y("polyline", { points: "0,0 0,40 21,40 30,30 30,10 21,0 " }, null, -1)
      ]), 40, Et),
      Y("line", {
        class: "wline",
        x1: D.value.right.x1,
        x2: D.value.right.x2,
        y1: D.value.right.y1,
        y2: D.value.right.y2,
        "stroke-width": D.value.right.sSize,
        onClick: i[10] || (i[10] = (...e) => M(a).wlineRightClick && M(a).wlineRightClick(...e))
      }, null, 8, Wt)
    ], 40, pt));
  }
}, $t = /* @__PURE__ */ ct(It, [["__scopeId", "data-v-56fe09e1"]]);
export {
  $t as default
};
