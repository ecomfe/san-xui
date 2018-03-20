/**
 * @file san-xui/x/components/Recorder.js
 * @author xxx
 */

/* eslint-disable */
import $ from 'jquery';

import workerScript from './RecorderWorker';

function addMask(e) {
    if (!m) {
        var e = $.extend(
            {
                top: 0,
                'z-index': 999
            },
            e
        );
        g || (g = $("<div id='_voice_mask' data-for='result'/>")),
            g.css({
                opacity: 0.3,
                position: 'absolute',
                background: '#000',
                'z-index': e['z-index'],
                top: e.top + 'px',
                left: '0',
                width: A.width(),
                height: A.height() - e.top
            }),
            (m = !0),
            g.appendTo(A);
    }
}
function removeMask() {
    g && m && ((m = !1), g.remove());
}
function addStyleEle(e, t) {
    var r = document.createElement('div'),
        n = '_<style type="text/css">';
    return (
        t && (n = '_<style type="text/css" data-for=\'result\'>'),
        (r.innerHTML = n + e + '</style>'),
        r.removeChild(r.firstChild),
        document.getElementsByTagName('HEAD')[0].appendChild(r.firstChild),
        r.firstChild
    );
}
var i,
    a,
    s,
    o = function() {
        var e = new Blob([workerScript], {type: 'text/javascript'});
        return URL.createObjectURL(e);
    },
    f = 0.1,
    u = 0.07,
    c = 'win7',
    l = {
        win7: 'http://jingyan.baidu.com/article/e73e26c0f6832e24adb6a7b2.html',
        xp: 'http://jingyan.baidu.com/article/375c8e19b8564125f2a229c7.html',
        mac:
            'https://support.apple.com/kb/index?page=search&locale=zh_CN&product=&q=os%20x%20' +
            '%E8%BE%93%E5%85%A5%E9%9F%B3%E9%87%8F&src=support_site.kbase.search.searchresults'
    },
    h = navigator.userAgent.match(/Windows NT ([\d\.]*)/);
h
    ? h[1] <= 5.1 && (c = 'xp')
    : (h = navigator.userAgent.match(/Mac OS/)) && (c = 'mac');
var Recorder = function(e, t) {
    function r(e, t) {
        var r = parseInt(1e5 * Math.random()) + '_' + new Date().getTime();
        e && (e.eventId = r), worker.postMessage(e), t && (p[r] = t);
    }
    function n(e, r) {
        (!r && w.length > 4) ||
            e.getSendBuffer(function(n) {
                if (n) {
                    y = e.glb = n.json.glb;
                    var i = $.ajax({
                        url: t.url,
                        cache: !1,
                        contentType:
                            'Content-Type: multipart/form-data; boundary=' +
                            n.boundary,
                        dataType: 'text',
                        data: n.buffer,
                        processData: !1,
                        type: 'post'
                    });
                    w.push(i),
                        i.always(function(t) {
                            if (t && 'string' == typeof t) {
                                var n = t.match(/\"corpus\_no\"\:(\d+)/);
                                n && (n = n[1]),
                                    (t = JSON.parse(t)),
                                    t.result &&
                                        t.result.corpus_no &&
                                        n &&
                                        (t.result.corpus_no = n);
                            } else t = null;
                            return (
                                (w = $.grep(w, function(e) {
                                    return i !== e;
                                })),
                                !t || (t && t.result && 0 != t.result.err_no)
                                    ? void e.stop(!0)
                                    : (t &&
                                          t.content &&
                                          t.content.item &&
                                          ((x = t), v.result.fire(t)),
                                      ((t &&
                                          t.result &&
                                          (3 == t.result.res_type ||
                                              5 == t.result.res_type)) ||
                                          !t.result) &&
                                          e.stop(!0),
                                      void (
                                          (r ||
                                              (t &&
                                                  t.result &&
                                                  t.result.idx < 0)) &&
                                          e.stop(!0)
                                      ))
                            );
                        });
                }
            }, r);
    }
    if (e.ended) return !1;
    a || (a = this.context = new AudioContext());
    var i = (this.source = a.createMediaStreamSource(e)),
        c = $.extend(
            {
                timeout: 5e3
            },
            t
        );
    c.eq;
    var l = c.bufferLen || 4096;
    this.context = i.context;
    var h = 1,
        d = 1;
    this.node = this.context.createScriptProcessor(l, h, d);
    var worker = new Worker(c.workerPath || o());
    worker.postMessage({
        command: 'init',
        config: {
            outputChannels: d,
            outputSampleRate: 8e3,
            uid: '7B5859B25CD832205CD220798CF1F1B9:FG=1',
            sampleRate: this.context.sampleRate
        }
    });
    var p = {};
    worker.onmessage = function(e) {
        e.data &&
            e.data.eventId &&
            'function' == typeof p[e.data.eventId] &&
            (p[e.data.eventId](e.data.data), (p[e.data.eventId] = null));
    };
    var m = !1;
    (this.node.onaudioprocess = function(e) {
        if (m) {
            var t,
                n = [];
            for (t = 0; d > t; t++) n.push(e.inputBuffer.getChannelData(t));
            r({
                command: 'record',
                buffer: n
            }),
                v.audioprocess.fire(e);
            var i = e.inputBuffer.getChannelData(0),
                a = Math.max.apply(Math, i),
                s = 0;
            $.each(i, function(e, t) {
                s += Math.abs(t - a);
            }),
                (s /= i.length),
                (b.maxVolumn = Math.max(a, b.maxVolumn || 0)),
                (b.maxAvgDiff = Math.max(s, b.maxAvgDiff || 0));
        }
    }),
        (this.configure = function(e) {
            for (var t in e) e.hasOwnProperty(t) && (c[t] = e[t]);
        }),
        (this.reinit = function() {
            worker.postMessage({
                command: 'reinit'
            }),
                (x = null);
        });
    var A;
    this.start = function() {
        m ||
            (this.reinit(),
            v.start.fire(),
            n(this),
            (m = !0),
            (A = setInterval(function() {
                n(b);
            }, 100)),
            s && (clearTimeout(s), (s = null)),
            (this.maxVolumn = 0),
            (this.maxAvgDiff = 0),
            (s = setTimeout(function() {
                clearTimeout(s),
                    (s = null),
                    (b.maxVolumn < f || b.maxAvgDiff < u) && v.volumnLow.fire();
            }, 3e3)));
    };
    var v = {},
        b = this;
    $.each(
        [
            'audioprocess',
            'stop',
            'start',
            'finish',
            'stop',
            'result',
            'fail',
            'noUserMedia',
            'volumnLow'
        ],
        function(e, t) {
            (v[t] = $.Callbacks()),
                (b['on' + t] = function(e) {
                    v[t].add(e);
                });
        }
    ),
        (this.removeEventListener = function(e, t) {
            'undefined' == typeof t ? v[e].empty() : v[e].remove(t);
        }),
        e &&
            e.addEventListener &&
            e.addEventListener('ended', function() {
                v.noUserMedia.fire(), e.removeEventListener(arguments.callee);
            }),
        (this.stop = function(e) {
            m &&
                (e
                    ? ($.each(w, function(e, t) {
                          t.abort();
                      }),
                      (w = []),
                      x ? v.finish.fire(x) : v.fail.fire(),
                      (m = !1))
                    : n(this, !0),
                v.stop.fire(e)),
                clearInterval(A),
                s && (clearTimeout(s), (s = null));
        }),
        (this.clear = function() {
            r(
                {
                    command: 'clear'
                },
                cb
            );
        }),
        (this.getBuffer = function(e) {
            r(
                {
                    command: 'getBuffer'
                },
                e
            );
        }),
        (this.getSendBuffer = function(e, t) {
            var n = t ? 'getLastSendBuffer' : 'getSendBuffer';
            r(
                {
                    command: n
                },
                e
            );
        }),
        (this.exportWAV = function(e, t) {
            r(
                {
                    command: 'exportWAV',
                    type: t
                },
                e
            );
        }),
        i.connect(this.node),
        this.node.connect(this.context.destination);
    var x,
        w = [],
        y = (this.glb = '');
};
(window.URL = window.URL || window.webkitURL),
    (navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia),
    (window.AudioContext = window.AudioContext || window.webkitAudioContext),
    (Recorder.lowVolumnTipUrl = l[c]),
    (Recorder.support = function() {
        return navigator.getUserMedia &&
            window.URL &&
            window.AudioContext &&
            window.Worker
            ? !0
            : !1;
    }),
    (Recorder.log = function() {});
var g,
    p,
    m = !1,
    A = $('body'),
    v = (function() {
        var e, n, i, a, s, o, f;
        return function(u) {
            function c() {
                o.show(),
                    u.removeEventListener('audioprocess'),
                    u.onaudioprocess(function(e) {
                        var t = e.inputBuffer.getChannelData(0),
                            r = Math.max.apply(Math, t),
                            n = (1 - r) * (1 - r) * 56;
                        a.height(n);
                        var i = 100 * r;
                        s.css({
                            width: i + 100 + 'px',
                            height: i + 100 + 'px',
                            'border-radius': i + 100 + 'px',
                            margin:
                                71 - i / 2 + 'px 0 0 -' + (i / 2 + 50) + 'px'
                        });
                    });
            }
            function l(e) {
                e.removeEventListener('audioprocess'),
                    (s.get(0).style.cssText = ''),
                    (a.get(0).style.cssText = ''),
                    o.hide();
            }
            e ||
                ((e = $(
                    "<div id='voice' data-for='result'><div class='close'>x</div><div class='result'>" +
                        "<span class='result-word'></span><span class='tip'></span></div><div class='voic" +
                        "e_inner'><img class='btn' src='https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/w" +
                        "ww/cache/static/protocol/https/voice/imgs/start_btn_e61e030.png'><div class='box" +
                        "'><div class='box_inner'></div></div><div class='round2'></div><div class='round" +
                        "1'></div><div class='round3'></div></div></div>"
                )),
                (n = $('.btn', e)),
                (i = $('.result-word', e)),
                (f = $('.tip', e)),
                (a = $('.box_inner', e)),
                (s = $('.round3', e)),
                (o = $('.round2,.round1', e))),
                f.mousedown(function() {
                    Recorder.log({
                        q: 'setVolumn'
                    });
                }),
                $('.close', e).click(function() {
                    u.stop(!0),
                        u.closeUI(),
                        removeMask(),
                        Recorder.log({
                            q: 'close'
                        });
                }),
                (u.closeUI = function() {
                    e.remove(), removeMask();
                }),
                (u.openUI = function() {
                    addMask(), e.appendTo(A);
                }),
                u.onnoUserMedia(function() {
                    u.stop(!0), u.closeUI(), removeMask();
                }),
                u.onfinish(function() {
                    u.closeUI(), removeMask(), f.hide();
                }),
                u.onresult(function(e) {
                    i.html(e.content.item[0]), f.hide();
                }),
                u.onstart(function() {
                    i.html('请说话'),
                        n.one('click', function() {
                            l(u),
                                i.html('识别中...'),
                                u.stop(),
                                Recorder.log({
                                    q: 'manual_stop'
                                });
                        }),
                        f.hide();
                }),
                u.onfail(function(e) {
                    var t = '识别失败，请点击下面按钮后再说一次';
                    e &&
                        e.result &&
                        '-3005' == e.result.err_no &&
                        (t = '没听清楚，请点击下面按钮后再说一次'),
                        i.html(t),
                        l(u),
                        n.unbind('click').one('click', function() {
                            u.start(),
                                c(),
                                Recorder.log({
                                    q: 'manual_restart'
                                });
                        });
                }),
                u.onvolumnLow(function() {
                    var e = Recorder.lowVolumnTipUrl;
                    f
                        .html(
                            ' (音量小，请您检查麦克风设置，或参考<a href="' +
                                e +
                                '" target="_blank">这里</a>进行设置)'
                        )
                        .show();
                }),
                u.start(),
                c();
        };
    })();
(Recorder.showTip = function() {
    addMask();
    var e = {
        'z-index': 1e3,
        'text-align': 'center',
        position: 'fixed'
    };
    (e =
        bds &&
        bds.se &&
        bds.se.upn &&
        bds.se.upn.cookieset &&
        bds.se.upn.cookieset[0] &&
        2 == bds.se.upn.cookieset[0].v
            ? $.extend(e, {
                  top: '0',
                  right: '40px',
                  width: '205px'
              })
            : $.extend(e, {
                  top: '25%',
                  right: 'inherit',
                  width: '100%'
              })),
        p ||
            ((p = $(
                '<div><img src="https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/' +
                    'protocol/https/voice/imgs/allow_d7a970f.png" usemap="#voiceTipMap"/><map name="v' +
                    'oiceTipMap"><area shape="circle" coords="13,55,8"></map></div>'
            ).css(e)),
            p.find('area').click(function() {
                Recorder.hideTip(),
                    Recorder.log({
                        q: 'hideTip'
                    });
            })),
        p.appendTo(A).show();
}),
    (Recorder.hideTip = function() {
        p.hide();
    });
var b,
    x = !1;
(Recorder.init = function(t) {
    var n = $.Deferred();
    if (i) {
        var a = new Recorder(i, t);
        v(a), n.resolve(a);
    } else
        navigator.getUserMedia(
            {
                audio: !0
            },
            function(r) {
                (i = r),
                    x ||
                        ((x = !0),
                        $(window).on('blur', function() {
                            b = setTimeout(function() {
                                i && (i.stop && i.stop(), (i = null));
                            }, 1e4);
                        }),
                        $(window).on('focus', function() {
                            b && (clearTimeout(b), (b = !1));
                        }));
                var a = new Recorder(i, t);
                v(a), n.resolve(a);
            },
            function() {
                removeMask(), n.reject();
            }
        );
    return n;
}),
    (Recorder.forceDownload = function(t, r) {
        var n = URL.createObjectURL(t),
            i = window.document.createElement('a');
        (i.href = n), (i.download = r || 'output.wav');
        var a = document.createEvent('Event');
        a.initEvent('click', !0, !0), i.dispatchEvent(a);
    }),
    (Recorder.addStartBtn = function(t) {
        $('<span class="ipt_rec"></span>').prependTo($('#kw').parent());
        var r =
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAASCAYAAACAa1QyAAAAAXNSR0IArs' +
                '4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG' +
                '1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPH' +
                'JkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbn' +
                'MjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dG' +
                'lmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdG' +
                'lvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6Uk' +
                'RGPgo8L3g6eG1wbWV0YT4KTMInWQAAAXlJREFUKBW9kr1Kw1AUx5OYVWiRGqqLiPgIios4qg+QobhI7Q' +
                'dYH6CKk4IPUCRNQhFRHPIAnRykIIqre7cMsUMHp0Jt/J2ShiYWxx44/M/53/N17z2qkhLbtgtQl+g62k' +
                'WvKpXKExiLFlsYzWbzCLgOw7A2HA6XVFU9Ez/i41A9tjAIutA0rVAqld4j/tl13cJoNLrHf5zEJjpBbv' +
                'q+/zE5FIz8jWkuYXOfMEFETppPd5qV84ebX5Iu82azWd00zR+Zg+fmEdWZd/M8b6Hf7w9kvKDX661Eg3' +
                'cdx9mK7DFQdBtDPlkhYRUI5J86uq4fgA4d6nR6sCzrOAiCN8MwduDvhAdF9tFX/lJrYNRbrdZiuVz2SD' +
                'qHs/P5/EBQfOHlXOIkXsVQGMnicI2OZrFY/BZuWiSBtfLo6FPgZLxGmUymxrwNDj65ww3YzuVycleDQo' +
                'f4Ml6bONlFZdxpUpXF3MU+peIeuIx+McELeFutVjvg/5Jeneno+W3ELz3Rmg23qA6NAAAAAElFTkSuQm' +
                'CC',
            i =
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAASCAMAAAC3taQAAAAAhFBMVEX///' +
                '8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf' +
                '8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf' +
                '8zhf8zhf8zhf+04UQDAAAAK3RSTlMAAQIDBgwNHR43ODs9PkNEVFZaXGZnlpecqaq31NfZ2t3e3+Dl6O' +
                'n5+/z9BL131wAAAHdJREFUCB0FwYcCgQAUAMBTFGWPaCGb9///5w5s+3e/BdgNy8lq2AH6AsUZ8EuQ/A' +
                'ABAhAgAAECECAgUjGCkH49c9cZZlfTh2ZvcymT8rKxb8xvmXX36day25xjm4GsPSGt7od8nB/uVQoW9S' +
                'te9QKAAAABAAL4AzokCI8/h6hiAAAAAElFTkSuQmCC',
            a =
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAkCAMAAACg5NohAAAA7VBMVEUAAA' +
                'CqqqqZmZmqqqqfn5+Ojo6ZmZmVlZWdnZ2ZmZmfn5+WlpadnZ2Xl5ebm5uVlZWZmZmXl5eZmZmampqXl5' +
                'eZmZmampqZmZmampqbm5uXl5eZmZmampqYmJiZmZmampqampqYmJiZmZmYmJiampqZmZmampqZmZmZmZ' +
                'mZmZmYmJiZmZmampqZmZmZmZmZmZmZmZmZmZmZmZmampqZmZmZmZmYmJiZmZmampqZmZmZmZmZmZmZmZ' +
                'mZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZlntL8zAA' +
                'AATnRSTlMAAwUGCAkKDA0PEBEaGxwdHiAjJiwtMDc6PUBBTE1aXWBhZG1vcH5/goWGh4iKjo+UmZump6' +
                'iuvr/AxcbI0tPZ297f5uft7vL09fb5+/48nAt9AAABHElEQVQoz93S21ZBURjF8T855BiSw06UUqiEci' +
                'pKOW7s+f6P04XWGOw8QKN5Ndf4jfHdrAkm8Yf39XpUi/MrxaUkScuiW8pS9zwYtLpyyvsSt1XZtors/Z' +
                'uP6pjaUWOPpJypOX24yG+qX3LR4f4vaSPvIfJqw1rHgOQx4pGAI62Z6BSYKmsoqylwogl9XQANvRh61h' +
                'NQUJ+qmkDS1s1WrmUngaaqZDQLAZeOuvlAIN+VcwWEZsrAq+oApcV2NosSQF1vgKXVGUDsfmTbo/soQH' +
                'olC6ClcXR/RLGxWgAEhvpM70r6S8PAtkaGWtXCBsK1lYYR8/K1Hc2bhYTXmyg051Lbt3PDGjj6iTOwXM' +
                'tO3fUm0qR3m+JQXD/1N+gbnHtANlxuv2EAAAAASUVORK5CYII=',
            s =
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAkCAMAAACg5NohAAAA8FBMVEUsgf' +
                '////8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf' +
                '8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf' +
                '8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf' +
                '8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf8sgf+F30' +
                'pxAAAAT3RSTlMAAAMFBggJCgwNDxARGhscHR4gIyYsLTA3Oj1AQUxNWl1gYWRtb3B+f4KFhoeIio6PlJ' +
                'mbpqeorr6/wMXGyNLT2dve3+bn7e7y9PX2+fv+wE6fLAAAASxJREFUKM/d01dWAkEUBNAqkCBBBETCiK' +
                'AoSlAElKSgKHGAqf3vxg/oQ9AFeKzPvh/vdPVr0CTy8L5cDsoRbEIYyc0lSZrnDqkgtS/8fqstp7BPEV' +
                'vF9UlRdmSPHtUyM1qq7ZGUNpTWxwF5DXmlA6Ih/Htayf0bubXCUsckJZcRlwTgSEuMdEZyrJShlMYATj' +
                'VCV5cka3ox9KwnAFl1UVKdZMzW7VpuZMcA1FVCUpMAyStH7YzPl2nLuQYQmCgJvqpCkvnZem1meQCo6I' +
                '2gpcU5SZ5UB7Y9qIYBILGQRZANDcPk9l7AyVANEKSvr8/ELiW+1Petiwr1tSgHDQTLC/VDpkNP09G0no' +
                '263dFsfSo1PTv1Wj1Hmzg962Dn4/edkTTq3MV/fAdun+Nv0TegC0JUU1yQZAAAAABJRU5ErkJggg==';
        if (
            ((t =
                t ||
                '.ipt_rec{z-index:1;display:none;position:absolute;right:0;height:34px;width:24px' +
                    ';background:url(' +
                    r +
                    ') no-repeat center;background-image: -webkit-image-set(url(' +
                    r +
                    ') 1x,url(' +
                    a +
                    ') 2x);background-image: -moz-image-set(url(' +
                    r +
                    ') 1x,url(' +
                    a +
                    ') 2x);background-image: -o-image-set(url(' +
                    r +
                    ') 1x,url(' +
                    a +
                    ') 2x);background-image: -ms-image-set(url(' +
                    r +
                    ') 1x,url(' +
                    a +
                    ') 2x);background-size:13px 18px;background-position:0 50%;cursor:pointer;}.ipt_r' +
                    'ec:hover{background-image:url(' +
                    i +
                    ');background-image: -webkit-image-set(url(' +
                    i +
                    ') 1x,url(' +
                    s +
                    ') 2x);background-image: -moz-image-set(url(' +
                    i +
                    ') 1x,url(' +
                    s +
                    ') 2x);background-image: -o-image-set(url(' +
                    i +
                    ') 1x,url(' +
                    s +
                    ') 2x);background-image: -ms-image-set(url(' +
                    i +
                    ') 1x,url(' +
                    s +
                    ') 2x);}'),
            addStyleEle(t, 'forResult'),
            window.bds && bds.comm && bds.comm.newindex)
        ) {
            var o =
                    $('#kw')
                        .parent()
                        .width() - 30,
                f = addStyleEle('.ipt_rec{left:' + o + 'px;top:3px}');
            $(window).one('index_off', function() {
                $(f).remove();
            });
        }
    }),
    (Recorder.addStyle = function() {
        Recorder.addStartBtn();
        var e =
            '#voice{font-family:"microsoft yahei";z-index:1000;box-shadow:0 5px 5px #888;posi' +
            'tion:fixed;width:100%;height:38.2%;min-height:229.2px;background:#fff;font-size:' +
            '16px;bottom:0}#voice .close{position:absolute;right:30px;top:20px;font-size:24px' +
            ';color:#333;cursor:pointer;text-indent:-10000px;background:url(https://ss1.bdsta' +
            'tic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/voice/imgs/close_' +
            'btn_04bc664.png) no-repeat;background-size:18px 38px;width:20px;height:20px}#voi' +
            'ce .close:hover{color:#999;background-position:0 -21px}#voice .voice_inner{margi' +
            'n:-40px auto 0;width:0}#voice .result{width:100%;font-size:22px;margin:40px 0 0 ' +
            '63px;text-align:left;}#voice .result .tip{color:#999;font-size:14px;}#voice .btn' +
            '{position:absolute;width:105px;height:105px;margin:69px 0 0 -52px;z-index:3;curs' +
            'or:pointer;background:none}#voice .box{width:56px;height:56px;position:absolute;' +
            'z-index:2;background:#35d2ff;margin:92px 0 0 -28px}#voice .box_inner{width:100%;' +
            'height:56px;background:#fff}@keyframes myfirst{from{border:1px solid rgba(0,0,25' +
            '5,1);width:100px;height:100px;border-radius:100px;margin:70px 0 0 -50px}to{borde' +
            'r:1px solid rgba(0,0,255,0);width:200px;height:200px;border-radius:200px;margin:' +
            '20px 0 0 -100px}}@-webkit-keyframes myfirst{from{border:1px solid rgba(194,224,2' +
            '53,1);width:100px;height:100px;border-radius:100px;margin:70px 0 0 -50px}to{bord' +
            'er:1px solid rgba(194,224,253,0);width:300px;height:300px;border-radius:300px;ma' +
            'rgin:-30px 0 0 -150px}}@-moz-keyframes myfirst{from{border:1px solid rgba(0,0,25' +
            '5,1);width:100px;height:100px;border-radius:100px;margin:70px 0 0 -50px}to{borde' +
            'r:1px solid rgba(0,0,255,0);width:200px;height:200px;border-radius:200px;margin:' +
            '20px 0 0 -100px}}@-o-keyframes myfirst{from{border:1px solid rgba(0,0,255,1);wid' +
            'th:100px;height:100px;border-radius:100px;margin:70px 0 0 -50px}to{border:1px so' +
            'lid rgba(0,0,255,0);width:200px;height:200px;border-radius:200px;margin:20px 0 0' +
            ' -100px}}#voice .round1,#voice .round2{position:absolute;border:0 solid rgba(0,0' +
            ',255,1);border-radius:200px;width:0;height:0;line-height:0;animation:myfirst 3s ' +
            'linear 0s infinite;-webkit-animation:myfirst 3s linear 0s infinite;-moz-animatio' +
            'n:myfirst 3s linear 0s infinite;-o-animation:myfirst 3s linear 0s infinite}#voic' +
            'e .round2{animation-delay:1.5s;-webkit-animation-delay:1.5s;-moz-animation-delay' +
            ':1.5s;-o-animation-delay:1.5s}#voice .round3{position:absolute;background:#c2e0f' +
            'd;width:0;height:0;line-height:0}';
        addStyleEle(e, 'forResult');
    }),
    (Recorder.addMask = addMask),
    (Recorder.removeMask = removeMask),
    (Recorder.addStyleEle = addStyleEle);

export default Recorder;
