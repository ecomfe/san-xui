/**
 * @file components/RecorderWorker.js
 * @author leeight
 */
export default `
function str2uint8(e) {
    var t = new ArrayBuffer(e.length),
        n = new Uint8Array(t);
    for (var r = 0; r < e.length; r++) n[r] = e.charCodeAt(r);
    return n;
}
function init(e) {
    (sampleRate = e.sampleRate),
        (outputChannels = e.outputChannels),
        (outputSampleRate = e.outputSampleRate),
        (uid = e.uid),
        uid || (uid = 'test_uid');
}
function record(e) {
    recBuffersL.push(e[0]), outputChannels == 2 && recBuffersR.push(e[1]);
}
function exportWAV(e) {
    var t,
        n = mergeBuffers(recBuffersL);
    if (outputChannels == 2) {
        var r = mergeBuffers(recBuffersR);
        t = interleave(n, r);
    } else t = n;
    var i = encodeWAV(t),
        s = new Blob([i], { type: e });
    return s;
}
function getBuffer() {
    var e = [];
    return (
        e.push(mergeBuffers(recBuffersL)),
        outputChannels == 2 && e.push(mergeBuffers(recBuffersR)),
        e
    );
}
function getSendBuffer(e) {
    var t = '-BD**VR+gzgzip',
        n = '\\r\\n',
        r = {
            pfm: 'iOS&1&1&1&1',
            ver: '1.0',
            enc: 'utf-8',
            rtn: 'json',
            pdt: '818',
            app_name: 'com.baidu.www.voice',
            idx: sendIdx++ + '',
            fun: '1',
            glb: glb,
            uid: uid
        };
    e && (r.idx = '-' + r.idx);
    var i = JSON.stringify(r),
        s = new Zlib.Gzip(str2uint8(i)),
        o = s.compress();
    if (sendOffset >= recBuffersL.length && !e) {
        sendIdx--;
        return null;
    }
    recBuffersL.slice(sendOffset);
    var u = mergeBuffers(recBuffersL.slice(sendOffset));
    sendOffset = recBuffersL.length;
    var a = '--' + t,
        f = new ArrayBuffer(
            o.byteLength +
                4 +
                u.length * 2 +
                (n.length + n.length + a.length) * 3 +
                2
        ),
        l = new DataView(f),
        c = 0;
    return (
        (c = writeString(l, c, n + a + n)),
        (c = writeUint8Array(l, c, o)),
        (c = writeString(l, c, n + a + n)),
        l.setUint32(c, 1, !0),
        (c += 4),
        (c = writePcm(l, c, u)),
        (c = writeString(l, c, n + a + '--' + n)),
        { buffer: f, boundary: t, json: r }
    );
}
function clear() {
    (recBuffersL = []), (recBuffersR = []);
}
function mergeBuffers(e) {
    var t = 0;
    e.forEach(function(e) {
        t += e.length;
    });
    var n = new Float32Array(t),
        r = 0,
        i;
    for (i = 0; i < e.length; i++) n.set(e[i], r), (r += e[i].length);
    var s = 0,
        o = sampleRate / outputSampleRate,
        u = Math.ceil(t * outputSampleRate / sampleRate),
        a = new Float32Array(u);
    for (i = 0; i < u; i++) (a[i] = n[Math.floor(s)]), (s += o);
    return a;
}
function interleave(e, t) {
    var n = e.length + t.length,
        r = new Float32Array(n),
        i = 0,
        s = 0;
    while (i < n) (r[i++] = e[s]), (r[i++] = t[s]), s++;
    return r;
}
function floatTo16BitPCM(e, t, n) {
    for (var r = 0; r < n.length; r++, t += 2) {
        var i = Math.max(-1, Math.min(1, n[r]));
        e.setInt16(t, i < 0 ? i * 32768 : i * 32767, !0);
    }
}
function writeUint8Array(e, t, n) {
    for (var r = 0; r < n.length; r++) e.setUint8(t + r, n[r]);
    return t + n.length;
}
function writeString(e, t, n) {
    for (var r = 0; r < n.length; r++) e.setUint8(t + r, n.charCodeAt(r));
    return t + n.length;
}
function writePcm(e, t, n) {
    return floatTo16BitPCM(e, t, n), t + n.length * 2;
}
function encodeWAV(e) {
    var t = new ArrayBuffer(44 + e.length * 2),
        n = new DataView(t);
    return (
        writeString(n, 0, 'RIFF'),
        n.setUint32(4, 32 + e.length * 2, !0),
        writeString(n, 8, 'WAVE'),
        writeString(n, 12, 'fmt '),
        n.setUint32(16, 16, !0),
        n.setUint16(20, 1, !0),
        n.setUint16(22, outputChannels, !0),
        n.setUint32(24, outputSampleRate, !0),
        n.setUint32(28, outputSampleRate, !0),
        n.setUint16(32, outputChannels * 2, !0),
        n.setUint16(34, 16, !0),
        writeString(n, 36, 'data'),
        n.setUint32(40, e.length * 2, !0),
        floatTo16BitPCM(n, 44, e),
        n
    );
}
(function() {
    'use strict';
    function r(t, r) {
        var i = t.split('.'),
            s = n;
        !(i[0] in s) && s.execScript && s.execScript('var ' + i[0]);
        for (var o; i.length && (o = i.shift()); )
            !i.length && r !== e ? (s[o] = r) : (s = s[o] ? s[o] : (s[o] = {}));
    }
    function s(e, t) {
        (this.index = 'number' == typeof t ? t : 0),
            (this.f = 0),
            (this.buffer =
                e instanceof (i ? Uint8Array : Array)
                    ? e
                    : new (i ? Uint8Array : Array)(32768));
        if (2 * this.buffer.length <= this.index) throw Error('invalid index');
        this.buffer.length <= this.index && o(this);
    }
    function o(e) {
        var t = e.buffer,
            n,
            r = t.length,
            s = new (i ? Uint8Array : Array)(r << 1);
        if (i) s.set(t);
        else for (n = 0; n < r; ++n) s[n] = t[n];
        return (e.buffer = s);
    }
    function p(e, t, n) {
        var r,
            i = 'number' == typeof t ? t : (t = 0),
            s = 'number' == typeof n ? n : e.length;
        r = -1;
        for (i = s & 7; i--; ++t) r = (r >>> 8) ^ v[(r ^ e[t]) & 255];
        for (i = s >> 3; i--; t += 8)
            (r = (r >>> 8) ^ v[(r ^ e[t]) & 255]),
                (r = (r >>> 8) ^ v[(r ^ e[t + 1]) & 255]),
                (r = (r >>> 8) ^ v[(r ^ e[t + 2]) & 255]),
                (r = (r >>> 8) ^ v[(r ^ e[t + 3]) & 255]),
                (r = (r >>> 8) ^ v[(r ^ e[t + 4]) & 255]),
                (r = (r >>> 8) ^ v[(r ^ e[t + 5]) & 255]),
                (r = (r >>> 8) ^ v[(r ^ e[t + 6]) & 255]),
                (r = (r >>> 8) ^ v[(r ^ e[t + 7]) & 255]);
        return (r ^ 4294967295) >>> 0;
    }
    function m(e) {
        (this.buffer = new (i ? Uint16Array : Array)(2 * e)), (this.length = 0);
    }
    function g(e, t) {
        (this.h = y),
            (this.j = 0),
            (this.input = i && e instanceof Array ? new Uint8Array(e) : e),
            (this.c = 0),
            t &&
                (t.lazy && (this.j = t.lazy),
                'number' == typeof t.compressionType &&
                    (this.h = t.compressionType),
                t.outputBuffer &&
                    (this.a =
                        i && t.outputBuffer instanceof Array
                            ? new Uint8Array(t.outputBuffer)
                            : t.outputBuffer),
                'number' == typeof t.outputIndex && (this.c = t.outputIndex)),
            this.a || (this.a = new (i ? Uint8Array : Array)(32768));
    }
    function E(e, t) {
        (this.length = e), (this.k = t);
    }
    function T(n, r) {
        function s(e, n) {
            var r = e.k,
                i = [],
                s = 0,
                o;
            (o = x[e.length]),
                (i[s++] = o & 65535),
                (i[s++] = (o >> 16) & 255),
                (i[s++] = o >> 24);
            var u;
            switch (t) {
                case 1 === r:
                    u = [0, r - 1, 0];
                    break;
                case 2 === r:
                    u = [1, r - 2, 0];
                    break;
                case 3 === r:
                    u = [2, r - 3, 0];
                    break;
                case 4 === r:
                    u = [3, r - 4, 0];
                    break;
                case 6 >= r:
                    u = [4, r - 5, 1];
                    break;
                case 8 >= r:
                    u = [5, r - 7, 1];
                    break;
                case 12 >= r:
                    u = [6, r - 9, 2];
                    break;
                case 16 >= r:
                    u = [7, r - 13, 2];
                    break;
                case 24 >= r:
                    u = [8, r - 17, 3];
                    break;
                case 32 >= r:
                    u = [9, r - 25, 3];
                    break;
                case 48 >= r:
                    u = [10, r - 33, 4];
                    break;
                case 64 >= r:
                    u = [11, r - 49, 4];
                    break;
                case 96 >= r:
                    u = [12, r - 65, 5];
                    break;
                case 128 >= r:
                    u = [13, r - 97, 5];
                    break;
                case 192 >= r:
                    u = [14, r - 129, 6];
                    break;
                case 256 >= r:
                    u = [15, r - 193, 6];
                    break;
                case 384 >= r:
                    u = [16, r - 257, 7];
                    break;
                case 512 >= r:
                    u = [17, r - 385, 7];
                    break;
                case 768 >= r:
                    u = [18, r - 513, 8];
                    break;
                case 1024 >= r:
                    u = [19, r - 769, 8];
                    break;
                case 1536 >= r:
                    u = [20, r - 1025, 9];
                    break;
                case 2048 >= r:
                    u = [21, r - 1537, 9];
                    break;
                case 3072 >= r:
                    u = [22, r - 2049, 10];
                    break;
                case 4096 >= r:
                    u = [23, r - 3073, 10];
                    break;
                case 6144 >= r:
                    u = [24, r - 4097, 11];
                    break;
                case 8192 >= r:
                    u = [25, r - 6145, 11];
                    break;
                case 12288 >= r:
                    u = [26, r - 8193, 12];
                    break;
                case 16384 >= r:
                    u = [27, r - 12289, 12];
                    break;
                case 24576 >= r:
                    u = [28, r - 16385, 13];
                    break;
                case 32768 >= r:
                    u = [29, r - 24577, 13];
                    break;
                default:
                    throw 'invalid distance';
            }
            (o = u), (i[s++] = o[0]), (i[s++] = o[1]), (i[s++] = o[2]);
            var a, f;
            a = 0;
            for (f = i.length; a < f; ++a) v[m++] = i[a];
            y[i[0]]++, b[i[3]]++, (g = e.length + n - 1), (d = null);
        }
        var o,
            u,
            a,
            f,
            l,
            c = {},
            h,
            p,
            d,
            v = i ? new Uint16Array(2 * r.length) : [],
            m = 0,
            g = 0,
            y = new (i ? Uint32Array : Array)(286),
            b = new (i ? Uint32Array : Array)(30),
            w = n.j,
            E;
        if (!i) {
            for (a = 0; 285 >= a; ) y[a++] = 0;
            for (a = 0; 29 >= a; ) b[a++] = 0;
        }
        (y[256] = 1), (o = 0);
        for (u = r.length; o < u; ++o) {
            a = l = 0;
            for (f = 3; a < f && o + a !== u; ++a) l = (l << 8) | r[o + a];
            c[l] === e && (c[l] = []), (h = c[l]);
            if (!(0 < g--)) {
                for (; 0 < h.length && 32768 < o - h[0]; ) h.shift();
                if (o + 3 >= u) {
                    d && s(d, -1), (a = 0);
                    for (f = u - o; a < f; ++a)
                        (E = r[o + a]), (v[m++] = E), ++y[E];
                    break;
                }
                0 < h.length
                    ? ((p = N(r, o, h)),
                      d
                          ? d.length < p.length
                            ? ((E = r[o - 1]), (v[m++] = E), ++y[E], s(p, 0))
                            : s(d, -1)
                          : p.length < w ? (d = p) : s(p, 0))
                    : d ? s(d, -1) : ((E = r[o]), (v[m++] = E), ++y[E]);
            }
            h.push(o);
        }
        return (
            (v[m++] = 256),
            y[256]++,
            (n.n = y),
            (n.m = b),
            i ? v.subarray(0, m) : v
        );
    }
    function N(e, t, n) {
        var r,
            i,
            s = 0,
            o,
            u,
            a,
            f,
            l = e.length;
        (u = 0), (f = n.length);
        e: for (; u < f; u++) {
            (r = n[f - u - 1]), (o = 3);
            if (3 < s) {
                for (a = s; 3 < a; a--)
                    if (e[r + a - 1] !== e[t + a - 1]) continue e;
                o = s;
            }
            for (; 258 > o && t + o < l && e[r + o] === e[t + o]; ) ++o;
            o > s && ((i = r), (s = o));
            if (258 === o) break;
        }
        return new E(s, t - i);
    }
    function C(e, t) {
        var n = e.length,
            r = new m(572),
            s = new (i ? Uint8Array : Array)(n),
            o,
            u,
            a,
            f,
            l;
        if (!i) for (f = 0; f < n; f++) s[f] = 0;
        for (f = 0; f < n; ++f) 0 < e[f] && r.push(f, e[f]);
        (o = Array(r.length / 2)),
            (u = new (i ? Uint32Array : Array)(r.length / 2));
        if (1 === o.length) return (s[r.pop().index] = 1), s;
        f = 0;
        for (l = r.length / 2; f < l; ++f)
            (o[f] = r.pop()), (u[f] = o[f].value);
        (a = k(u, u.length, t)), (f = 0);
        for (l = o.length; f < l; ++f) s[o[f].index] = a[f];
        return s;
    }
    function k(e, t, n) {
        function r(e) {
            var n = f[e][l[e]];
            n === t ? (r(e + 1), r(e + 1)) : --u[n], ++l[e];
        }
        var s = new (i ? Uint16Array : Array)(n),
            o = new (i ? Uint8Array : Array)(n),
            u = new (i ? Uint8Array : Array)(t),
            a = Array(n),
            f = Array(n),
            l = Array(n),
            c = (1 << n) - t,
            h = 1 << (n - 1),
            p,
            d,
            v,
            m,
            g;
        s[n - 1] = t;
        for (d = 0; d < n; ++d)
            c < h ? (o[d] = 0) : ((o[d] = 1), (c -= h)),
                (c <<= 1),
                (s[n - 2 - d] = ((s[n - 1 - d] / 2) | 0) + t);
        (s[0] = o[0]), (a[0] = Array(s[0])), (f[0] = Array(s[0]));
        for (d = 1; d < n; ++d)
            s[d] > 2 * s[d - 1] + o[d] && (s[d] = 2 * s[d - 1] + o[d]),
                (a[d] = Array(s[d])),
                (f[d] = Array(s[d]));
        for (p = 0; p < t; ++p) u[p] = n;
        for (v = 0; v < s[n - 1]; ++v) (a[n - 1][v] = e[v]), (f[n - 1][v] = v);
        for (p = 0; p < n; ++p) l[p] = 0;
        1 === o[n - 1] && (--u[0], ++l[n - 1]);
        for (d = n - 2; 0 <= d; --d) {
            (m = p = 0), (g = l[d + 1]);
            for (v = 0; v < s[d]; v++)
                (m = a[d + 1][g] + a[d + 1][g + 1]),
                    m > e[p]
                        ? ((a[d][v] = m), (f[d][v] = t), (g += 2))
                        : ((a[d][v] = e[p]), (f[d][v] = p), ++p);
            (l[d] = 0), 1 === o[d] && r(d);
        }
        return u;
    }
    function L(e) {
        var t = new (i ? Uint16Array : Array)(e.length),
            n = [],
            r = [],
            s = 0,
            o,
            u,
            a,
            f;
        o = 0;
        for (u = e.length; o < u; o++) n[e[o]] = (n[e[o]] | 0) + 1;
        o = 1;
        for (u = 16; o <= u; o++) (r[o] = s), (s += n[o] | 0), (s <<= 1);
        o = 0;
        for (u = e.length; o < u; o++) {
            (s = r[e[o]]), (r[e[o]] += 1), (a = t[o] = 0);
            for (f = e[o]; a < f; a++)
                (t[o] = (t[o] << 1) | (s & 1)), (s >>>= 1);
        }
        return t;
    }
    function A(e, t) {
        (this.input = e),
            (this.c = this.i = 0),
            (this.d = {}),
            t &&
                (t.flags && (this.d = t.flags),
                'string' == typeof t.filename && (this.filename = t.filename),
                'string' == typeof t.comment && (this.l = t.comment),
                t.deflateOptions && (this.e = t.deflateOptions)),
            this.e || (this.e = {});
    }
    var e = void 0,
        t = !0,
        n = this,
        i =
            'undefined' != typeof Uint8Array &&
            'undefined' != typeof Uint16Array &&
            'undefined' != typeof Uint32Array &&
            'undefined' != typeof DataView;
    (s.prototype.b = function(e, t, n) {
        var r = this.buffer,
            i = this.index,
            s = this.f,
            u = r[i],
            a;
        n &&
            1 < t &&
            (e =
                8 < t
                    ? ((h[e & 255] << 24) |
                          (h[(e >>> 8) & 255] << 16) |
                          (h[(e >>> 16) & 255] << 8) |
                          h[(e >>> 24) & 255]) >>
                      (32 - t)
                    : h[e] >> (8 - t));
        if (8 > t + s) (u = (u << t) | e), (s += t);
        else
            for (a = 0; a < t; ++a)
                (u = (u << 1) | ((e >> (t - a - 1)) & 1)),
                    8 === ++s &&
                        ((s = 0),
                        (r[i++] = h[u]),
                        (u = 0),
                        i === r.length && (r = o(this)));
        (r[i] = u), (this.buffer = r), (this.f = s), (this.index = i);
    }),
        (s.prototype.finish = function() {
            var e = this.buffer,
                t = this.index,
                n;
            return (
                0 < this.f && ((e[t] <<= 8 - this.f), (e[t] = h[e[t]]), t++),
                i ? (n = e.subarray(0, t)) : ((e.length = t), (n = e)),
                n
            );
        });
    var u = new (i ? Uint8Array : Array)(256),
        a;
    for (a = 0; 256 > a; ++a) {
        for (var f = a, l = f, c = 7, f = f >>> 1; f; f >>>= 1)
            (l <<= 1), (l |= f & 1), --c;
        u[a] = ((l << c) & 255) >>> 0;
    }
    var h = u,
        d = [
            0,
            1996959894,
            3993919788,
            2567524794,
            124634137,
            1886057615,
            3915621685,
            2657392035,
            249268274,
            2044508324,
            3772115230,
            2547177864,
            162941995,
            2125561021,
            3887607047,
            2428444049,
            498536548,
            1789927666,
            4089016648,
            2227061214,
            450548861,
            1843258603,
            4107580753,
            2211677639,
            325883990,
            1684777152,
            4251122042,
            2321926636,
            335633487,
            1661365465,
            4195302755,
            2366115317,
            997073096,
            1281953886,
            3579855332,
            2724688242,
            1006888145,
            1258607687,
            3524101629,
            2768942443,
            901097722,
            1119000684,
            3686517206,
            2898065728,
            853044451,
            1172266101,
            3705015759,
            2882616665,
            651767980,
            1373503546,
            3369554304,
            3218104598,
            565507253,
            1454621731,
            3485111705,
            3099436303,
            671266974,
            1594198024,
            3322730930,
            2970347812,
            795835527,
            1483230225,
            3244367275,
            3060149565,
            1994146192,
            31158534,
            2563907772,
            4023717930,
            1907459465,
            112637215,
            2680153253,
            3904427059,
            2013776290,
            251722036,
            2517215374,
            3775830040,
            2137656763,
            141376813,
            2439277719,
            3865271297,
            1802195444,
            476864866,
            2238001368,
            4066508878,
            1812370925,
            453092731,
            2181625025,
            4111451223,
            1706088902,
            314042704,
            2344532202,
            4240017532,
            1658658271,
            366619977,
            2362670323,
            4224994405,
            1303535960,
            984961486,
            2747007092,
            3569037538,
            1256170817,
            1037604311,
            2765210733,
            3554079995,
            1131014506,
            879679996,
            2909243462,
            3663771856,
            1141124467,
            855842277,
            2852801631,
            3708648649,
            1342533948,
            654459306,
            3188396048,
            3373015174,
            1466479909,
            544179635,
            3110523913,
            3462522015,
            1591671054,
            702138776,
            2966460450,
            3352799412,
            1504918807,
            783551873,
            3082640443,
            3233442989,
            3988292384,
            2596254646,
            62317068,
            1957810842,
            3939845945,
            2647816111,
            81470997,
            1943803523,
            3814918930,
            2489596804,
            225274430,
            2053790376,
            3826175755,
            2466906013,
            167816743,
            2097651377,
            4027552580,
            2265490386,
            503444072,
            1762050814,
            4150417245,
            2154129355,
            426522225,
            1852507879,
            4275313526,
            2312317920,
            282753626,
            1742555852,
            4189708143,
            2394877945,
            397917763,
            1622183637,
            3604390888,
            2714866558,
            953729732,
            1340076626,
            3518719985,
            2797360999,
            1068828381,
            1219638859,
            3624741850,
            2936675148,
            906185462,
            1090812512,
            3747672003,
            2825379669,
            829329135,
            1181335161,
            3412177804,
            3160834842,
            628085408,
            1382605366,
            3423369109,
            3138078467,
            570562233,
            1426400815,
            3317316542,
            2998733608,
            733239954,
            1555261956,
            3268935591,
            3050360625,
            752459403,
            1541320221,
            2607071920,
            3965973030,
            1969922972,
            40735498,
            2617837225,
            3943577151,
            1913087877,
            83908371,
            2512341634,
            3803740692,
            2075208622,
            213261112,
            2463272603,
            3855990285,
            2094854071,
            198958881,
            2262029012,
            4057260610,
            1759359992,
            534414190,
            2176718541,
            4139329115,
            1873836001,
            414664567,
            2282248934,
            4279200368,
            1711684554,
            285281116,
            2405801727,
            4167216745,
            1634467795,
            376229701,
            2685067896,
            3608007406,
            1308918612,
            956543938,
            2808555105,
            3495958263,
            1231636301,
            1047427035,
            2932959818,
            3654703836,
            1088359270,
            936918e3,
            2847714899,
            3736837829,
            1202900863,
            817233897,
            3183342108,
            3401237130,
            1404277552,
            615818150,
            3134207493,
            3453421203,
            1423857449,
            601450431,
            3009837614,
            3294710456,
            1567103746,
            711928724,
            3020668471,
            3272380065,
            1510334235,
            755167117
        ],
        v = i ? new Uint32Array(d) : d;
    (m.prototype.getParent = function(e) {
        return 2 * (((e - 2) / 4) | 0);
    }),
        (m.prototype.push = function(e, t) {
            var n,
                r,
                i = this.buffer,
                s;
            (n = this.length), (i[this.length++] = t);
            for (i[this.length++] = e; 0 < n; ) {
                if (((r = this.getParent(n)), !(i[n] > i[r]))) break;
                (s = i[n]),
                    (i[n] = i[r]),
                    (i[r] = s),
                    (s = i[n + 1]),
                    (i[n + 1] = i[r + 1]),
                    (i[r + 1] = s),
                    (n = r);
            }
            return this.length;
        }),
        (m.prototype.pop = function() {
            var e,
                t,
                n = this.buffer,
                r,
                i,
                s;
            (t = n[0]),
                (e = n[1]),
                (this.length -= 2),
                (n[0] = n[this.length]),
                (n[1] = n[this.length + 1]);
            for (s = 0; ; ) {
                i = 2 * s + 2;
                if (i >= this.length) break;
                i + 2 < this.length && n[i + 2] > n[i] && (i += 2);
                if (!(n[i] > n[s])) break;
                (r = n[s]),
                    (n[s] = n[i]),
                    (n[i] = r),
                    (r = n[s + 1]),
                    (n[s + 1] = n[i + 1]),
                    (n[i + 1] = r),
                    (s = i);
            }
            return { index: e, value: t, length: this.length };
        });
    var y = 2,
        b = [],
        w;
    for (w = 0; 288 > w; w++)
        switch (t) {
            case 143 >= w:
                b.push([w + 48, 8]);
                break;
            case 255 >= w:
                b.push([w - 144 + 400, 9]);
                break;
            case 279 >= w:
                b.push([w - 256 + 0, 7]);
                break;
            case 287 >= w:
                b.push([w - 280 + 192, 8]);
                break;
            default:
                throw 'invalid literal: ' + w;
        }
    g.prototype.g = function() {
        var n,
            r,
            o,
            u,
            a = this.input;
        switch (this.h) {
            case 0:
                o = 0;
                for (u = a.length; o < u; ) {
                    (r = i ? a.subarray(o, o + 65535) : a.slice(o, o + 65535)),
                        (o += r.length);
                    var f = r,
                        l = o === u,
                        c = e,
                        h = e,
                        p = e,
                        d = e,
                        v = e,
                        m = this.a,
                        g = this.c;
                    if (i) {
                        for (
                            m = new Uint8Array(this.a.buffer);
                            m.length <= g + f.length + 5;

                        )
                            m = new Uint8Array(m.length << 1);
                        m.set(this.a);
                    }
                    (c = l ? 1 : 0),
                        (m[g++] = c | 0),
                        (h = f.length),
                        (p = (~h + 65536) & 65535),
                        (m[g++] = h & 255),
                        (m[g++] = (h >>> 8) & 255),
                        (m[g++] = p & 255),
                        (m[g++] = (p >>> 8) & 255);
                    if (i) m.set(f, g), (g += f.length), (m = m.subarray(0, g));
                    else {
                        d = 0;
                        for (v = f.length; d < v; ++d) m[g++] = f[d];
                        m.length = g;
                    }
                    (this.c = g), (this.a = m);
                }
                break;
            case 1:
                var w = new s(
                    i ? new Uint8Array(this.a.buffer) : this.a,
                    this.c
                );
                w.b(1, 1, t), w.b(1, 2, t);
                var E = T(this, a),
                    S,
                    x,
                    N;
                S = 0;
                for (x = E.length; S < x; S++)
                    if (((N = E[S]), s.prototype.b.apply(w, b[N]), 256 < N))
                        w.b(E[++S], E[++S], t),
                            w.b(E[++S], 5),
                            w.b(E[++S], E[++S], t);
                    else if (256 === N) break;
                (this.a = w.finish()), (this.c = this.a.length);
                break;
            case y:
                var k = new s(
                        i ? new Uint8Array(this.a.buffer) : this.a,
                        this.c
                    ),
                    A,
                    O,
                    M,
                    _,
                    D,
                    P = [
                        16,
                        17,
                        18,
                        0,
                        8,
                        7,
                        9,
                        6,
                        10,
                        5,
                        11,
                        4,
                        12,
                        3,
                        13,
                        2,
                        14,
                        1,
                        15
                    ],
                    H,
                    B,
                    j,
                    I,
                    q,
                    R = Array(19),
                    U,
                    z,
                    W,
                    X,
                    $;
                (A = y),
                    k.b(1, 1, t),
                    k.b(A, 2, t),
                    (O = T(this, a)),
                    (H = C(this.n, 15)),
                    (B = L(H)),
                    (j = C(this.m, 7)),
                    (I = L(j));
                for (M = 286; 257 < M && 0 === H[M - 1]; M--);
                for (_ = 30; 1 < _ && 0 === j[_ - 1]; _--);
                var J = M,
                    K = _,
                    Q = new (i ? Uint32Array : Array)(J + K),
                    G,
                    Y,
                    Z,
                    et,
                    tt = new (i ? Uint32Array : Array)(316),
                    nt,
                    rt,
                    it = new (i ? Uint8Array : Array)(19);
                for (G = Y = 0; G < J; G++) Q[Y++] = H[G];
                for (G = 0; G < K; G++) Q[Y++] = j[G];
                if (!i) {
                    G = 0;
                    for (et = it.length; G < et; ++G) it[G] = 0;
                }
                G = nt = 0;
                for (et = Q.length; G < et; G += Y) {
                    for (Y = 1; G + Y < et && Q[G + Y] === Q[G]; ++Y);
                    Z = Y;
                    if (0 === Q[G])
                        if (3 > Z) for (; 0 < Z--; ) (tt[nt++] = 0), it[0]++;
                        else
                            for (; 0 < Z; )
                                (rt = 138 > Z ? Z : 138),
                                    rt > Z - 3 && rt < Z && (rt = Z - 3),
                                    10 >= rt
                                        ? ((tt[nt++] = 17),
                                          (tt[nt++] = rt - 3),
                                          it[17]++)
                                        : ((tt[nt++] = 18),
                                          (tt[nt++] = rt - 11),
                                          it[18]++),
                                    (Z -= rt);
                    else if (((tt[nt++] = Q[G]), it[Q[G]]++, Z--, 3 > Z))
                        for (; 0 < Z--; ) (tt[nt++] = Q[G]), it[Q[G]]++;
                    else
                        for (; 0 < Z; )
                            (rt = 6 > Z ? Z : 6),
                                rt > Z - 3 && rt < Z && (rt = Z - 3),
                                (tt[nt++] = 16),
                                (tt[nt++] = rt - 3),
                                it[16]++,
                                (Z -= rt);
                }
                (n = i ? tt.subarray(0, nt) : tt.slice(0, nt)), (q = C(it, 7));
                for (X = 0; 19 > X; X++) R[X] = q[P[X]];
                for (D = 19; 4 < D && 0 === R[D - 1]; D--);
                (U = L(q)),
                    k.b(M - 257, 5, t),
                    k.b(_ - 1, 5, t),
                    k.b(D - 4, 4, t);
                for (X = 0; X < D; X++) k.b(R[X], 3, t);
                X = 0;
                for ($ = n.length; X < $; X++)
                    if (((z = n[X]), k.b(U[z], q[z], t), 16 <= z)) {
                        X++;
                        switch (z) {
                            case 16:
                                W = 2;
                                break;
                            case 17:
                                W = 3;
                                break;
                            case 18:
                                W = 7;
                                break;
                            default:
                                throw 'invalid code: ' + z;
                        }
                        k.b(n[X], W, t);
                    }
                var st = [B, H],
                    ot = [I, j],
                    ut,
                    at,
                    ft,
                    lt,
                    ct,
                    ht,
                    pt,
                    dt;
                (ct = st[0]),
                    (ht = st[1]),
                    (pt = ot[0]),
                    (dt = ot[1]),
                    (ut = 0);
                for (at = O.length; ut < at; ++ut)
                    if (((ft = O[ut]), k.b(ct[ft], ht[ft], t), 256 < ft))
                        k.b(O[++ut], O[++ut], t),
                            (lt = O[++ut]),
                            k.b(pt[lt], dt[lt], t),
                            k.b(O[++ut], O[++ut], t);
                    else if (256 === ft) break;
                (this.a = k.finish()), (this.c = this.a.length);
                break;
            default:
                throw 'invalid compression type';
        }
        return this.a;
    };
    var S = (function() {
            function e(e) {
                switch (t) {
                    case 3 === e:
                        return [257, e - 3, 0];
                    case 4 === e:
                        return [258, e - 4, 0];
                    case 5 === e:
                        return [259, e - 5, 0];
                    case 6 === e:
                        return [260, e - 6, 0];
                    case 7 === e:
                        return [261, e - 7, 0];
                    case 8 === e:
                        return [262, e - 8, 0];
                    case 9 === e:
                        return [263, e - 9, 0];
                    case 10 === e:
                        return [264, e - 10, 0];
                    case 12 >= e:
                        return [265, e - 11, 1];
                    case 14 >= e:
                        return [266, e - 13, 1];
                    case 16 >= e:
                        return [267, e - 15, 1];
                    case 18 >= e:
                        return [268, e - 17, 1];
                    case 22 >= e:
                        return [269, e - 19, 2];
                    case 26 >= e:
                        return [270, e - 23, 2];
                    case 30 >= e:
                        return [271, e - 27, 2];
                    case 34 >= e:
                        return [272, e - 31, 2];
                    case 42 >= e:
                        return [273, e - 35, 3];
                    case 50 >= e:
                        return [274, e - 43, 3];
                    case 58 >= e:
                        return [275, e - 51, 3];
                    case 66 >= e:
                        return [276, e - 59, 3];
                    case 82 >= e:
                        return [277, e - 67, 4];
                    case 98 >= e:
                        return [278, e - 83, 4];
                    case 114 >= e:
                        return [279, e - 99, 4];
                    case 130 >= e:
                        return [280, e - 115, 4];
                    case 162 >= e:
                        return [281, e - 131, 5];
                    case 194 >= e:
                        return [282, e - 163, 5];
                    case 226 >= e:
                        return [283, e - 195, 5];
                    case 257 >= e:
                        return [284, e - 227, 5];
                    case 258 === e:
                        return [285, e - 258, 0];
                    default:
                        throw 'invalid length: ' + e;
                }
            }
            var n = [],
                r,
                i;
            for (r = 3; 258 >= r; r++)
                (i = e(r)), (n[r] = (i[2] << 24) | (i[1] << 16) | i[0]);
            return n;
        })(),
        x = i ? new Uint32Array(S) : S;
    A.prototype.g = function() {
        var t,
            n,
            r,
            s,
            o,
            u,
            a,
            f,
            l = new (i ? Uint8Array : Array)(32768),
            c = 0,
            h = this.input,
            d = this.i,
            v = this.filename,
            m = this.l;
        (l[c++] = 31),
            (l[c++] = 139),
            (l[c++] = 8),
            (t = 0),
            this.d.fname && (t |= _),
            this.d.fcomment && (t |= D),
            this.d.fhcrc && (t |= M),
            (l[c++] = t),
            (n = ((Date.now ? Date.now() : +new Date()) / 1e3) | 0),
            (l[c++] = n & 255),
            (l[c++] = (n >>> 8) & 255),
            (l[c++] = (n >>> 16) & 255),
            (l[c++] = (n >>> 24) & 255),
            (l[c++] = 0),
            (l[c++] = O);
        if (this.d.fname !== e) {
            a = 0;
            for (f = v.length; a < f; ++a)
                (u = v.charCodeAt(a)),
                    255 < u && (l[c++] = (u >>> 8) & 255),
                    (l[c++] = u & 255);
            l[c++] = 0;
        }
        if (this.d.comment) {
            a = 0;
            for (f = m.length; a < f; ++a)
                (u = m.charCodeAt(a)),
                    255 < u && (l[c++] = (u >>> 8) & 255),
                    (l[c++] = u & 255);
            l[c++] = 0;
        }
        return (
            this.d.fhcrc &&
                ((r = p(l, 0, c) & 65535),
                (l[c++] = r & 255),
                (l[c++] = (r >>> 8) & 255)),
            (this.e.outputBuffer = l),
            (this.e.outputIndex = c),
            (o = new g(h, this.e)),
            (l = o.g()),
            (c = o.c),
            i &&
                (c + 8 > l.buffer.byteLength
                    ? ((this.a = new Uint8Array(c + 8)),
                      this.a.set(new Uint8Array(l.buffer)),
                      (l = this.a))
                    : (l = new Uint8Array(l.buffer))),
            (s = p(h, e, e)),
            (l[c++] = s & 255),
            (l[c++] = (s >>> 8) & 255),
            (l[c++] = (s >>> 16) & 255),
            (l[c++] = (s >>> 24) & 255),
            (f = h.length),
            (l[c++] = f & 255),
            (l[c++] = (f >>> 8) & 255),
            (l[c++] = (f >>> 16) & 255),
            (l[c++] = (f >>> 24) & 255),
            (this.i = d),
            i && c < l.length && (this.a = l = l.subarray(0, c)),
            l
        );
    };
    var O = 255,
        M = 2,
        _ = 8,
        D = 16;
    r('Zlib.Gzip', A), r('Zlib.Gzip.prototype.compress', A.prototype.g);
}.call(this));
var createUUID = (function(e, t) {
        return function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
                .replace(e, t)
                .toUpperCase();
        };
    })(/[xy]/g, function(e) {
        var t = (Math.random() * 16) | 0,
            n = e == 'x' ? t : (t & 3) | 8;
        return n.toString(16);
    }),
    recBuffersL = [],
    recBuffersR = [],
    outputChannels,
    outputSampleRate,
    sendOffset = 0,
    glb = createUUID(),
    sendIdx = 1,
    uid = '',
    sampleRate;
this.onmessage = function(e) {
    var t;
    switch (e.data.command) {
        case 'reinit':
            (recBuffersL = []),
                (recBuffersR = []),
                (sendOffset = 0),
                (sendIdx = 1),
                (glb = createUUID());
            break;
        case 'init':
            init(e.data.config);
            break;
        case 'record':
            record(e.data.buffer);
            break;
        case 'exportWAV':
            (t = exportWAV(e.data.type)),
                this.postMessage({ data: t, eventId: e.data.eventId });
            break;
        case 'getBuffer':
            (t = getBuffer()),
                this.postMessage({ data: t, eventId: e.data.eventId });
            break;
        case 'getSendBuffer':
            (t = getSendBuffer()),
                this.postMessage({ data: t, eventId: e.data.eventId });
            break;
        case 'getLastSendBuffer':
            (t = getSendBuffer(!0)),
                this.postMessage({ data: t, eventId: e.data.eventId });
            break;
        case 'clear':
            clear();
    }
};
`;
