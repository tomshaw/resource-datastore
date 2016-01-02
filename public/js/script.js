/*! demo-app - v1.0.0 (build ) */if (function(global, factory) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = global.document ? factory(global, !0) : function(w) {
        if (!w.document) throw new Error("jQuery requires a window with a document");
        return factory(w);
    } : factory(global);
}("undefined" != typeof window ? window : this, function(window, noGlobal) {
    function isArraylike(obj) {
        var length = "length" in obj && obj.length, type = jQuery.type(obj);
        return "function" === type || jQuery.isWindow(obj) ? !1 : 1 === obj.nodeType && length ? !0 : "array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj;
    }
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
            return !!qualifier.call(elem, i, elem) !== not;
        });
        if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
            return elem === qualifier !== not;
        });
        if ("string" == typeof qualifier) {
            if (risSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
            qualifier = jQuery.filter(qualifier, elements);
        }
        return jQuery.grep(elements, function(elem) {
            return indexOf.call(qualifier, elem) >= 0 !== not;
        });
    }
    function sibling(cur, dir) {
        for (;(cur = cur[dir]) && 1 !== cur.nodeType; ) ;
        return cur;
    }
    function createOptions(options) {
        var object = optionsCache[options] = {};
        return jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = !0;
        }), object;
    }
    function completed() {
        document.removeEventListener("DOMContentLoaded", completed, !1), window.removeEventListener("load", completed, !1), 
        jQuery.ready();
    }
    function Data() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {};
            }
        }), this.expando = jQuery.expando + Data.uid++;
    }
    function dataAttr(elem, key, data) {
        var name;
        if (void 0 === data && 1 === elem.nodeType) if (name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase(), 
        data = elem.getAttribute(name), "string" == typeof data) {
            try {
                data = "true" === data ? !0 : "false" === data ? !1 : "null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
            } catch (e) {}
            data_user.set(elem, key, data);
        } else data = void 0;
        return data;
    }
    function returnTrue() {
        return !0;
    }
    function returnFalse() {
        return !1;
    }
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
    }
    function disableScript(elem) {
        return elem.type = (null !== elem.getAttribute("type")) + "/" + elem.type, elem;
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        return match ? elem.type = match[1] : elem.removeAttribute("type"), elem;
    }
    function setGlobalEval(elems, refElements) {
        for (var i = 0, l = elems.length; l > i; i++) data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"));
    }
    function cloneCopyEvent(src, dest) {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
        if (1 === dest.nodeType) {
            if (data_priv.hasData(src) && (pdataOld = data_priv.access(src), pdataCur = data_priv.set(dest, pdataOld), 
            events = pdataOld.events)) {
                delete pdataCur.handle, pdataCur.events = {};
                for (type in events) for (i = 0, l = events[type].length; l > i; i++) jQuery.event.add(dest, type, events[type][i]);
            }
            data_user.hasData(src) && (udataOld = data_user.access(src), udataCur = jQuery.extend({}, udataOld), 
            data_user.set(dest, udataCur));
        }
    }
    function getAll(context, tag) {
        var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
        return void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([ context ], ret) : ret;
    }
    function fixInput(src, dest) {
        var nodeName = dest.nodeName.toLowerCase();
        "input" === nodeName && rcheckableType.test(src.type) ? dest.checked = src.checked : ("input" === nodeName || "textarea" === nodeName) && (dest.defaultValue = src.defaultValue);
    }
    function actualDisplay(name, doc) {
        var style, elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
        return elem.detach(), display;
    }
    function defaultDisplay(nodeName) {
        var doc = document, display = elemdisplay[nodeName];
        return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement), 
        doc = iframe[0].contentDocument, doc.write(), doc.close(), display = actualDisplay(nodeName, doc), 
        iframe.detach()), elemdisplay[nodeName] = display), display;
    }
    function curCSS(elem, name, computed) {
        var width, minWidth, maxWidth, ret, style = elem.style;
        return computed = computed || getStyles(elem), computed && (ret = computed.getPropertyValue(name) || computed[name]), 
        computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), 
        rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, 
        maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, 
        ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), 
        void 0 !== ret ? ret + "" : ret;
    }
    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                return conditionFn() ? void delete this.get : (this.get = hookFn).apply(this, arguments);
            }
        };
    }
    function vendorPropName(style, name) {
        if (name in style) return name;
        for (var capName = name[0].toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--; ) if (name = cssPrefixes[i] + capName, 
        name in style) return name;
        return origName;
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; 4 > i; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), 
        isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), 
        "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), 
        "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
        return val;
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = !0, val = "width" === name ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
        if (0 >= val || null == val) {
            if (val = curCSS(elem, name, styles), (0 > val || null == val) && (val = elem.style[name]), 
            rnumnonpx.test(val)) return val;
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]), 
            val = parseFloat(val) || 0;
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
    }
    function showHide(elements, show) {
        for (var display, elem, hidden, values = [], index = 0, length = elements.length; length > index; index++) elem = elements[index], 
        elem.style && (values[index] = data_priv.get(elem, "olddisplay"), display = elem.style.display, 
        show ? (values[index] || "none" !== display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName)))) : (hidden = isHidden(elem), 
        "none" === display && hidden || data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
        for (index = 0; length > index; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
        return elements;
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    function createFxNow() {
        return setTimeout(function() {
            fxNow = void 0;
        }), fxNow = jQuery.now();
    }
    function genFx(type, includeWidth) {
        var which, i = 0, attrs = {
            height: type
        };
        for (includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth) which = cssExpand[i], 
        attrs["margin" + which] = attrs["padding" + which] = type;
        return includeWidth && (attrs.opacity = attrs.width = type), attrs;
    }
    function createTween(value, prop, animation) {
        for (var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; length > index; index++) if (tween = collection[index].call(animation, prop, value)) return tween;
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = data_priv.get(elem, "fxshow");
        opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, 
        oldfire = hooks.empty.fire, hooks.empty.fire = function() {
            hooks.unqueued || oldfire();
        }), hooks.unqueued++, anim.always(function() {
            anim.always(function() {
                hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire();
            });
        })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [ style.overflow, style.overflowX, style.overflowY ], 
        display = jQuery.css(elem, "display"), checkDisplay = "none" === display ? data_priv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display, 
        "inline" === checkDisplay && "none" === jQuery.css(elem, "float") && (style.display = "inline-block")), 
        opts.overflow && (style.overflow = "hidden", anim.always(function() {
            style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2];
        }));
        for (prop in props) if (value = props[prop], rfxtypes.exec(value)) {
            if (delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) {
                if ("show" !== value || !dataShow || void 0 === dataShow[prop]) continue;
                hidden = !0;
            }
            orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
        } else display = void 0;
        if (jQuery.isEmptyObject(orig)) "inline" === ("none" === display ? defaultDisplay(elem.nodeName) : display) && (style.display = display); else {
            dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = data_priv.access(elem, "fxshow", {}), 
            toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function() {
                jQuery(elem).hide();
            }), anim.done(function() {
                var prop;
                data_priv.remove(elem, "fxshow");
                for (prop in orig) jQuery.style(elem, prop, orig[prop]);
            });
            for (prop in orig) tween = createTween(hidden ? dataShow[prop] : 0, prop, anim), 
            prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, 
            tween.start = "width" === prop || "height" === prop ? 1 : 0));
        }
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) if (name = jQuery.camelCase(index), easing = specialEasing[name], 
        value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), 
        index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], 
        hooks && "expand" in hooks) {
            value = hooks.expand(value), delete props[name];
            for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing);
        } else specialEasing[name] = easing;
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
        }), tick = function() {
            if (stopped) return !1;
            for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; length > index; index++) animation.tweens[index].run(percent);
            return deferred.notifyWith(elem, [ animation, percent, remaining ]), 1 > percent && length ? remaining : (deferred.resolveWith(elem, [ animation ]), 
            !1);
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(!0, {
                specialEasing: {}
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                return animation.tweens.push(tween), tween;
            },
            stop: function(gotoEnd) {
                var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                if (stopped) return this;
                for (stopped = !0; length > index; index++) animation.tweens[index].run(1);
                return gotoEnd ? deferred.resolveWith(elem, [ animation, gotoEnd ]) : deferred.rejectWith(elem, [ animation, gotoEnd ]), 
                this;
            }
        }), props = animation.props;
        for (propFilter(props, animation.opts.specialEasing); length > index; index++) if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) return result;
        return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), 
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(func)) for (;dataType = dataTypes[i++]; ) "+" === dataType[0] ? (dataType = dataType.slice(1) || "*", 
            (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func);
        };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        function inspect(dataType) {
            var selected;
            return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), 
                inspect(dataTypeOrTransport), !1);
            }), selected;
        }
        var inspected = {}, seekingTransport = structure === transports;
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) void 0 !== src[key] && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
        return deep && jQuery.extend(!0, target, deep), target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        for (var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes; "*" === dataTypes[0]; ) dataTypes.shift(), 
        void 0 === ct && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
        if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
            dataTypes.unshift(type);
            break;
        }
        if (dataTypes[0] in responses) finalDataType = dataTypes[0]; else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                firstDataType || (firstDataType = type);
            }
            finalDataType = finalDataType || firstDataType;
        }
        return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), 
        responses[finalDataType]) : void 0;
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
        for (current = dataTypes.shift(); current; ) if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), 
        !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), 
        prev = current, current = dataTypes.shift()) if ("*" === current) current = prev; else if ("*" !== prev && prev !== current) {
            if (conv = converters[prev + " " + current] || converters["* " + current], !conv) for (conv2 in converters) if (tmp = conv2.split(" "), 
            tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], 
                dataTypes.unshift(tmp[1]));
                break;
            }
            if (conv !== !0) if (conv && s["throws"]) response = conv(response); else try {
                response = conv(response);
            } catch (e) {
                return {
                    state: "parsererror",
                    error: conv ? e : "No conversion from " + prev + " to " + current
                };
            }
        }
        return {
            state: "success",
            data: response
        };
    }
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
            traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add);
        }); else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj); else for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
    }
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType && elem.defaultView;
    }
    var arr = [], slice = arr.slice, concat = arr.concat, push = arr.push, indexOf = arr.indexOf, class2type = {}, toString = class2type.toString, hasOwn = class2type.hasOwnProperty, support = {}, document = window.document, version = "2.1.4", jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
    }, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function(all, letter) {
        return letter.toUpperCase();
    };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return slice.call(this);
        },
        get: function(num) {
            return null != num ? 0 > num ? this[num + this.length] : this[num] : slice.call(this);
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            return ret.prevObject = this, ret.context = this.context, ret;
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args);
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(i) {
            var len = this.length, j = +i + (0 > i ? len : 0);
            return this.pushStack(j >= 0 && len > j ? [ this[j] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: push,
        sort: arr.sort,
        splice: arr.splice
    }, jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, 
        i++), "object" == typeof target || jQuery.isFunction(target) || (target = {}), i === length && (target = this, 
        i--); length > i; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
        copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, 
        clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, 
        target[name] = jQuery.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
        return target;
    }, jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(msg) {
            throw new Error(msg);
        },
        noop: function() {},
        isFunction: function(obj) {
            return "function" === jQuery.type(obj);
        },
        isArray: Array.isArray,
        isWindow: function(obj) {
            return null != obj && obj === obj.window;
        },
        isNumeric: function(obj) {
            return !jQuery.isArray(obj) && obj - parseFloat(obj) + 1 >= 0;
        },
        isPlainObject: function(obj) {
            return "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj) ? !1 : obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ? !1 : !0;
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) return !1;
            return !0;
        },
        type: function(obj) {
            return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj;
        },
        globalEval: function(code) {
            var script, indirect = eval;
            code = jQuery.trim(code), code && (1 === code.indexOf("use strict") ? (script = document.createElement("script"), 
            script.text = code, document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code));
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function(obj, callback, args) {
            var value, i = 0, length = obj.length, isArray = isArraylike(obj);
            if (args) {
                if (isArray) for (;length > i && (value = callback.apply(obj[i], args), value !== !1); i++) ; else for (i in obj) if (value = callback.apply(obj[i], args), 
                value === !1) break;
            } else if (isArray) for (;length > i && (value = callback.call(obj[i], i, obj[i]), 
            value !== !1); i++) ; else for (i in obj) if (value = callback.call(obj[i], i, obj[i]), 
            value === !1) break;
            return obj;
        },
        trim: function(text) {
            return null == text ? "" : (text + "").replace(rtrim, "");
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [ arr ] : arr) : push.call(ret, arr)), 
            ret;
        },
        inArray: function(elem, arr, i) {
            return null == arr ? -1 : indexOf.call(arr, elem, i);
        },
        merge: function(first, second) {
            for (var len = +second.length, j = 0, i = first.length; len > j; j++) first[i++] = second[j];
            return first.length = i, first;
        },
        grep: function(elems, callback, invert) {
            for (var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert; length > i; i++) callbackInverse = !callback(elems[i], i), 
            callbackInverse !== callbackExpect && matches.push(elems[i]);
            return matches;
        },
        map: function(elems, callback, arg) {
            var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
            if (isArray) for (;length > i; i++) value = callback(elems[i], i, arg), null != value && ret.push(value); else for (i in elems) value = callback(elems[i], i, arg), 
            null != value && ret.push(value);
            return concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, context) {
            var tmp, args, proxy;
            return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), 
            jQuery.isFunction(fn) ? (args = slice.call(arguments, 2), proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : void 0;
        },
        now: Date.now,
        support: support
    }), jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    var Sizzle = function(window) {
        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
            if ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), 
            context = context || document, results = results || [], nodeType = context.nodeType, 
            "string" != typeof selector || !selector || 1 !== nodeType && 9 !== nodeType && 11 !== nodeType) return results;
            if (!seed && documentIsHTML) {
                if (11 !== nodeType && (match = rquickExpr.exec(selector))) if (m = match[1]) {
                    if (9 === nodeType) {
                        if (elem = context.getElementById(m), !elem || !elem.parentNode) return results;
                        if (elem.id === m) return results.push(elem), results;
                    } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), 
                    results;
                } else {
                    if (match[2]) return push.apply(results, context.getElementsByTagName(selector)), 
                    results;
                    if ((m = match[3]) && support.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)), 
                    results;
                }
                if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    if (nid = old = expando, newContext = context, newSelector = 1 !== nodeType && selector, 
                    1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
                        for (groups = tokenize(selector), (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid), 
                        nid = "[id='" + nid + "'] ", i = groups.length; i--; ) groups[i] = nid + toSelector(groups[i]);
                        newContext = rsibling.test(selector) && testContext(context.parentNode) || context, 
                        newSelector = groups.join(",");
                    }
                    if (newSelector) try {
                        return push.apply(results, newContext.querySelectorAll(newSelector)), results;
                    } catch (qsaError) {} finally {
                        old || context.removeAttribute("id");
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        function createCache() {
            function cache(key, value) {
                return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value;
            }
            var keys = [];
            return cache;
        }
        function markFunction(fn) {
            return fn[expando] = !0, fn;
        }
        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div);
            } catch (e) {
                return !1;
            } finally {
                div.parentNode && div.parentNode.removeChild(div), div = null;
            }
        }
        function addHandle(attrs, handler) {
            for (var arr = attrs.split("|"), i = attrs.length; i--; ) Expr.attrHandle[arr[i]] = handler;
        }
        function siblingCheck(a, b) {
            var cur = b && a, diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) return diff;
            if (cur) for (;cur = cur.nextSibling; ) if (cur === b) return -1;
            return a ? 1 : -1;
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return "input" === name && elem.type === type;
            };
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return ("input" === name || "button" === name) && elem.type === type;
            };
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                return argument = +argument, markFunction(function(seed, matches) {
                    for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--; ) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]));
                });
            });
        }
        function testContext(context) {
            return context && "undefined" != typeof context.getElementsByTagName && context;
        }
        function setFilters() {}
        function toSelector(tokens) {
            for (var i = 0, len = tokens.length, selector = ""; len > i; i++) selector += tokens[i].value;
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, checkNonElements = base && "parentNode" === dir, doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml);
            } : function(elem, context, xml) {
                var oldCache, outerCache, newCache = [ dirruns, doneName ];
                if (xml) {
                    for (;elem = elem[dir]; ) if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0;
                } else for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) {
                    if (outerCache = elem[expando] || (elem[expando] = {}), (oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) return newCache[2] = oldCache[2];
                    if (outerCache[dir] = newCache, newCache[2] = matcher(elem, context, xml)) return !0;
                }
            };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                for (var i = matchers.length; i--; ) if (!matchers[i](elem, context, xml)) return !1;
                return !0;
            } : matchers[0];
        }
        function multipleContexts(selector, contexts, results) {
            for (var i = 0, len = contexts.length; len > i; i++) Sizzle(selector, contexts[i], results);
            return results;
        }
        function condense(unmatched, map, filter, context, xml) {
            for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; len > i; i++) (elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem), 
            mapped && map.push(i));
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), 
            postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), 
            markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, []), matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml), matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter) for (temp = condense(matcherOut, postMap), 
                postFilter(temp, [], context, xml), i = temp.length; i--; ) (elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            for (temp = [], i = matcherOut.length; i--; ) (elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                            postFinder(null, matcherOut = [], temp, xml);
                        }
                        for (i = matcherOut.length; i--; ) (elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem));
                    }
                } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), 
                postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut);
            });
        }
        function matcherFromTokens(tokens) {
            for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext;
            }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                return indexOf(checkContext, elem) > -1;
            }, implicitRelative, !0), matchers = [ function(elem, context, xml) {
                var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                return checkContext = null, ret;
            } ]; len > i; i++) if (matcher = Expr.relative[tokens[i].type]) matchers = [ addCombinator(elementMatcher(matchers), matcher) ]; else {
                if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                    for (j = ++i; len > j && !Expr.relative[tokens[j].type]; j++) ;
                    return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                        value: " " === tokens[i - 2].type ? "*" : ""
                    })).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && toSelector(tokens));
                }
                matchers.push(matcher);
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
                var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1, len = elems.length;
                for (outermost && (outermostContext = context !== document && context); i !== len && null != (elem = elems[i]); i++) {
                    if (byElement && elem) {
                        for (j = 0; matcher = elementMatchers[j++]; ) if (matcher(elem, context, xml)) {
                            results.push(elem);
                            break;
                        }
                        outermost && (dirruns = dirrunsUnique);
                    }
                    bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem));
                }
                if (matchedCount += i, bySet && i !== matchedCount) {
                    for (j = 0; matcher = setMatchers[j++]; ) matcher(unmatched, setMatched, context, xml);
                    if (seed) {
                        if (matchedCount > 0) for (;i--; ) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                        setMatched = condense(setMatched);
                    }
                    push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results);
                }
                return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), 
                unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
            return a === b && (hasDuplicate = !0), 0;
        }, MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = function(list, elem) {
            for (var i = 0, len = list.length; len > i; i++) if (list[i] === elem) return i;
            return -1;
        }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + characterEncoding + ")"),
            CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
            TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 65536;
            return high !== high || escapedWhitespace ? escaped : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320);
        }, unloadHandler = function() {
            setDocument();
        };
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes), 
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els));
                } : function(target, els) {
                    for (var j = target.length, i = 0; target[j++] = els[i++]; ) ;
                    target.length = j - 1;
                }
            };
        }
        support = Sizzle.support = {}, isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? "HTML" !== documentElement.nodeName : !1;
        }, setDocument = Sizzle.setDocument = function(node) {
            var hasCompare, parent, doc = node ? node.ownerDocument || node : preferredDoc;
            return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, 
            docElem = doc.documentElement, parent = doc.defaultView, parent && parent !== parent.top && (parent.addEventListener ? parent.addEventListener("unload", unloadHandler, !1) : parent.attachEvent && parent.attachEvent("onunload", unloadHandler)), 
            documentIsHTML = !isXML(doc), support.attributes = assert(function(div) {
                return div.className = "i", !div.getAttribute("className");
            }), support.getElementsByTagName = assert(function(div) {
                return div.appendChild(doc.createComment("")), !div.getElementsByTagName("*").length;
            }), support.getElementsByClassName = rnative.test(doc.getElementsByClassName), support.getById = assert(function(div) {
                return docElem.appendChild(div).id = expando, !doc.getElementsByName || !doc.getElementsByName(expando).length;
            }), support.getById ? (Expr.find.ID = function(id, context) {
                if ("undefined" != typeof context.getElementById && documentIsHTML) {
                    var m = context.getElementById(id);
                    return m && m.parentNode ? [ m ] : [];
                }
            }, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    return elem.getAttribute("id") === attrId;
                };
            }) : (delete Expr.find.ID, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    var node = "undefined" != typeof elem.getAttributeNode && elem.getAttributeNode("id");
                    return node && node.value === attrId;
                };
            }), Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                return "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag) : support.qsa ? context.querySelectorAll(tag) : void 0;
            } : function(tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if ("*" === tag) {
                    for (;elem = results[i++]; ) 1 === elem.nodeType && tmp.push(elem);
                    return tmp;
                }
                return results;
            }, Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                return documentIsHTML ? context.getElementsByClassName(className) : void 0;
            }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(doc.querySelectorAll)) && (assert(function(div) {
                docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\f]' msallowcapture=''><option selected=''></option></select>", 
                div.querySelectorAll("[msallowcapture^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"), 
                div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"), 
                div.querySelectorAll("[id~=" + expando + "-]").length || rbuggyQSA.push("~="), div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked"), 
                div.querySelectorAll("a#" + expando + "+*").length || rbuggyQSA.push(".#.+[+~]");
            }), assert(function(div) {
                var input = doc.createElement("input");
                input.setAttribute("type", "hidden"), div.appendChild(input).setAttribute("name", "D"), 
                div.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="), 
                div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"), 
                div.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:");
            })), (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
                support.disconnectedMatch = matches.call(div, "div"), matches.call(div, "[s!='']:x"), 
                rbuggyMatches.push("!=", pseudos);
            }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), 
            hasCompare = rnative.test(docElem.compareDocumentPosition), contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = 9 === a.nodeType ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)));
            } : function(a, b) {
                if (b) for (;b = b.parentNode; ) if (b === a) return !0;
                return !1;
            }, sortOrder = hasCompare ? function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 
                1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0 : 4 & compare ? -1 : 1);
            } : function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
                if (!aup || !bup) return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                if (aup === bup) return siblingCheck(a, b);
                for (cur = a; cur = cur.parentNode; ) ap.unshift(cur);
                for (cur = b; cur = cur.parentNode; ) bp.unshift(cur);
                for (;ap[i] === bp[i]; ) i++;
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            }, doc) : document;
        }, Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        }, Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), 
            support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) try {
                var ret = matches.call(elem, expr);
                if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret;
            } catch (e) {}
            return Sizzle(expr, document, null, [ elem ]).length > 0;
        }, Sizzle.contains = function(context, elem) {
            return (context.ownerDocument || context) !== document && setDocument(context), 
            contains(context, elem);
        }, Sizzle.attr = function(elem, name) {
            (elem.ownerDocument || elem) !== document && setDocument(elem);
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
            return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }, Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        }, Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i = 0;
            if (hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), 
            results.sort(sortOrder), hasDuplicate) {
                for (;elem = results[i++]; ) elem === results[i] && (j = duplicates.push(i));
                for (;j--; ) results.splice(duplicates[j], 1);
            }
            return sortInput = null, results;
        }, getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (nodeType) {
                if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                    if ("string" == typeof elem.textContent) return elem.textContent;
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem);
                } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue;
            } else for (;node = elem[i++]; ) ret += getText(node);
            return ret;
        }, Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    return match[1] = match[1].replace(runescape, funescape), match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape), 
                    "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4);
                },
                CHILD: function(match) {
                    return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), 
                    match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), 
                    match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), 
                    match;
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[6] && match[2];
                    return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), 
                    match[2] = unquoted.slice(0, excess)), match.slice(0, 3));
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return "*" === nodeNameSelector ? function() {
                        return !0;
                    } : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test("string" == typeof elem.className && elem.className || "undefined" != typeof elem.getAttribute && elem.getAttribute("class") || "");
                    });
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        return null == result ? "!=" === operator : operator ? (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : "|=" === operator ? result === check || result.slice(0, check.length + 1) === check + "-" : !1) : !0;
                    };
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = "nth" !== type.slice(0, 3), forward = "last" !== type.slice(-4), ofType = "of-type" === what;
                    return 1 === first && 0 === last ? function(elem) {
                        return !!elem.parentNode;
                    } : function(elem, context, xml) {
                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
                        if (parent) {
                            if (simple) {
                                for (;dir; ) {
                                    for (node = elem; node = node[dir]; ) if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                                    start = dir = "only" === type && !start && "nextSibling";
                                }
                                return !0;
                            }
                            if (start = [ forward ? parent.firstChild : parent.lastChild ], forward && useCache) {
                                for (outerCache = parent[expando] || (parent[expando] = {}), cache = outerCache[type] || [], 
                                nodeIndex = cache[0] === dirruns && cache[1], diff = cache[0] === dirruns && cache[2], 
                                node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop(); ) if (1 === node.nodeType && ++diff && node === elem) {
                                    outerCache[type] = [ dirruns, nodeIndex, diff ];
                                    break;
                                }
                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) diff = cache[1]; else for (;(node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && ((node[expando] || (node[expando] = {}))[type] = [ dirruns, diff ]), 
                            node !== elem)); ) ;
                            return diff -= last, diff === first || diff % first === 0 && diff / first >= 0;
                        }
                    };
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [ pseudo, pseudo, "", argument ], 
                    Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                        for (var idx, matched = fn(seed, argument), i = matched.length; i--; ) idx = indexOf(seed, matched[i]), 
                        seed[idx] = !(matches[idx] = matched[i]);
                    }) : function(elem) {
                        return fn(elem, 0, args);
                    }) : fn;
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--; ) (elem = unmatched[i]) && (seed[i] = !(matches[i] = elem));
                    }) : function(elem, context, xml) {
                        return input[0] = elem, matcher(input, null, xml, results), input[0] = null, !results.pop();
                    };
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                contains: markFunction(function(text) {
                    return text = text.replace(runescape, funescape), function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                lang: markFunction(function(lang) {
                    return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), 
                    lang = lang.replace(runescape, funescape).toLowerCase(), function(elem) {
                        var elemLang;
                        do if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(), 
                        elemLang === lang || 0 === elemLang.indexOf(lang + "-"); while ((elem = elem.parentNode) && 1 === elem.nodeType);
                        return !1;
                    };
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                root: function(elem) {
                    return elem === docElem;
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                enabled: function(elem) {
                    return elem.disabled === !1;
                },
                disabled: function(elem) {
                    return elem.disabled === !0;
                },
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected;
                },
                selected: function(elem) {
                    return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0;
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) if (elem.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(elem) {
                    return !Expr.pseudos.empty(elem);
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName);
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name;
                },
                text: function(elem) {
                    var attr;
                    return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase());
                },
                first: createPositionalPseudo(function() {
                    return [ 0 ];
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [ length - 1 ];
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [ 0 > argument ? argument + length : argument ];
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 0; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 1; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; --i >= 0; ) matchIndexes.push(i);
                    return matchIndexes;
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; ++i < length; ) matchIndexes.push(i);
                    return matchIndexes;
                })
            }
        }, Expr.pseudos.nth = Expr.pseudos.eq;
        for (i in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) Expr.pseudos[i] = createInputPseudo(i);
        for (i in {
            submit: !0,
            reset: !0
        }) Expr.pseudos[i] = createButtonPseudo(i);
        return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters(), 
        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) return parseOnly ? 0 : cached.slice(0);
            for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar; ) {
                (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length) || soFar), 
                groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: match[0].replace(rtrim, " ")
                }), soFar = soFar.slice(matched.length));
                for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: type,
                    matches: match
                }), soFar = soFar.slice(matched.length));
                if (!matched) break;
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        }, compile = Sizzle.compile = function(selector, match) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                for (match || (match = tokenize(selector)), i = match.length; i--; ) cached = matcherFromTokens(match[i]), 
                cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)), 
                cached.selector = selector;
            }
            return cached;
        }, select = Sizzle.select = function(selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = "function" == typeof selector && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            if (results = results || [], 1 === match.length) {
                if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                    if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], 
                    !context) return results;
                    compiled && (context = context.parentNode), selector = selector.slice(tokens.shift().value.length);
                }
                for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], 
                !Expr.relative[type = token.type]); ) if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                    if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed), 
                    results;
                    break;
                }
            }
            return (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context), 
            results;
        }, support.sortStable = expando.split("").sort(sortOrder).join("") === expando, 
        support.detectDuplicates = !!hasDuplicate, setDocument(), support.sortDetached = assert(function(div1) {
            return 1 & div1.compareDocumentPosition(document.createElement("div"));
        }), assert(function(div) {
            return div.innerHTML = "<a href='#'></a>", "#" === div.firstChild.getAttribute("href");
        }) || addHandle("type|href|height|width", function(elem, name, isXML) {
            return isXML ? void 0 : elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2);
        }), support.attributes && assert(function(div) {
            return div.innerHTML = "<input/>", div.firstChild.setAttribute("value", ""), "" === div.firstChild.getAttribute("value");
        }) || addHandle("value", function(elem, name, isXML) {
            return isXML || "input" !== elem.nodeName.toLowerCase() ? void 0 : elem.defaultValue;
        }), assert(function(div) {
            return null == div.getAttribute("disabled");
        }) || addHandle(booleans, function(elem, name, isXML) {
            var val;
            return isXML ? void 0 : elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }), Sizzle;
    }(window);
    jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, 
    jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, 
    jQuery.contains = Sizzle.contains;
    var rneedsContext = jQuery.expr.match.needsContext, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, risSimple = /^.[^:#\[\.,]*$/;
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [ elem ] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return 1 === elem.nodeType;
        }));
    }, jQuery.fn.extend({
        find: function(selector) {
            var i, len = this.length, ret = [], self = this;
            if ("string" != typeof selector) return this.pushStack(jQuery(selector).filter(function() {
                for (i = 0; len > i; i++) if (jQuery.contains(self[i], this)) return !0;
            }));
            for (i = 0; len > i; i++) jQuery.find(selector, self[i], ret);
            return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = this.selector ? this.selector + " " + selector : selector, 
            ret;
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], !1));
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], !0));
        },
        is: function(selector) {
            return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length;
        }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, init = jQuery.fn.init = function(selector, context) {
        var match, elem;
        if (!selector) return this;
        if ("string" == typeof selector) {
            if (match = "<" === selector[0] && ">" === selector[selector.length - 1] && selector.length >= 3 ? [ null, selector, null ] : rquickExpr.exec(selector), 
            !match || !match[1] && context) return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
            if (match[1]) {
                if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), 
                rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                return this;
            }
            return elem = document.getElementById(match[2]), elem && elem.parentNode && (this.length = 1, 
            this[0] = elem), this.context = document, this.selector = selector, this;
        }
        return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, 
        this) : jQuery.isFunction(selector) ? "undefined" != typeof rootjQuery.ready ? rootjQuery.ready(selector) : selector(jQuery) : (void 0 !== selector.selector && (this.selector = selector.selector, 
        this.context = selector.context), jQuery.makeArray(selector, this));
    };
    init.prototype = jQuery.fn, rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    jQuery.extend({
        dir: function(elem, dir, until) {
            for (var matched = [], truncate = void 0 !== until; (elem = elem[dir]) && 9 !== elem.nodeType; ) if (1 === elem.nodeType) {
                if (truncate && jQuery(elem).is(until)) break;
                matched.push(elem);
            }
            return matched;
        },
        sibling: function(n, elem) {
            for (var matched = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && matched.push(n);
            return matched;
        }
    }), jQuery.fn.extend({
        has: function(target) {
            var targets = jQuery(target, this), l = targets.length;
            return this.filter(function() {
                for (var i = 0; l > i; i++) if (jQuery.contains(this, targets[i])) return !0;
            });
        },
        closest: function(selectors, context) {
            for (var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++) for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                matched.push(cur);
                break;
            }
            return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
        },
        index: function(elem) {
            return elem ? "string" == typeof elem ? indexOf.call(jQuery(elem), this[0]) : indexOf.call(this, elem.jquery ? elem[0] : elem) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))));
        },
        addBack: function(selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
        }
    }), jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return elem.contentDocument || jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var matched = jQuery.map(this, fn, until);
            return "Until" !== name.slice(-5) && (selector = until), selector && "string" == typeof selector && (matched = jQuery.filter(selector, matched)), 
            this.length > 1 && (guaranteedUnique[name] || jQuery.unique(matched), rparentsprev.test(name) && matched.reverse()), 
            this.pushStack(matched);
        };
    });
    var rnotwhite = /\S+/g, optionsCache = {};
    jQuery.Callbacks = function(options) {
        options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [], fire = function(data) {
            for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, 
            firingStart = 0, firingLength = list.length, firing = !0; list && firingLength > firingIndex; firingIndex++) if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                memory = !1;
                break;
            }
            firing = !1, list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable());
        }, self = {
            add: function() {
                if (list) {
                    var start = list.length;
                    !function add(args) {
                        jQuery.each(args, function(_, arg) {
                            var type = jQuery.type(arg);
                            "function" === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== type && add(arg);
                        });
                    }(arguments), firing ? firingLength = list.length : memory && (firingStart = start, 
                    fire(memory));
                }
                return this;
            },
            remove: function() {
                return list && jQuery.each(arguments, function(_, arg) {
                    for (var index; (index = jQuery.inArray(arg, list, index)) > -1; ) list.splice(index, 1), 
                    firing && (firingLength >= index && firingLength--, firingIndex >= index && firingIndex--);
                }), this;
            },
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : !(!list || !list.length);
            },
            empty: function() {
                return list = [], firingLength = 0, this;
            },
            disable: function() {
                return list = stack = memory = void 0, this;
            },
            disabled: function() {
                return !list;
            },
            lock: function() {
                return stack = void 0, memory || self.disable(), this;
            },
            locked: function() {
                return !stack;
            },
            fireWith: function(context, args) {
                return !list || fired && !stack || (args = args || [], args = [ context, args.slice ? args.slice() : args ], 
                firing ? stack.push(args) : fire(args)), this;
            },
            fire: function() {
                return self.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!fired;
            }
        };
        return self;
    }, jQuery.extend({
        Deferred: function(func) {
            var tuples = [ [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ], [ "notify", "progress", jQuery.Callbacks("memory") ] ], state = "pending", promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    return deferred.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var fn = jQuery.isFunction(fns[i]) && fns[i];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments);
                            });
                        }), fns = null;
                    }).promise();
                },
                promise: function(obj) {
                    return null != obj ? jQuery.extend(obj, promise) : promise;
                }
            }, deferred = {};
            return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2], stateString = tuple[3];
                promise[tuple[1]] = list.add, stateString && list.add(function() {
                    state = stateString;
                }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function() {
                    return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), 
                    this;
                }, deferred[tuple[0] + "With"] = list.fireWith;
            }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
        },
        when: function(subordinate) {
            var progressValues, progressContexts, resolveContexts, i = 0, resolveValues = slice.call(arguments), length = resolveValues.length, remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = 1 === remaining ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this, values[i] = arguments.length > 1 ? slice.call(arguments) : value, 
                    values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values);
                };
            };
            if (length > 1) for (progressValues = new Array(length), progressContexts = new Array(length), 
            resolveContexts = new Array(length); length > i; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
            return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise();
        }
    });
    var readyList;
    jQuery.fn.ready = function(fn) {
        return jQuery.ready.promise().done(fn), this;
    }, jQuery.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(hold) {
            hold ? jQuery.readyWait++ : jQuery.ready(!0);
        },
        ready: function(wait) {
            (wait === !0 ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [ jQuery ]), 
            jQuery.fn.triggerHandler && (jQuery(document).triggerHandler("ready"), jQuery(document).off("ready"))));
        }
    }), jQuery.ready.promise = function(obj) {
        return readyList || (readyList = jQuery.Deferred(), "complete" === document.readyState ? setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed, !1), 
        window.addEventListener("load", completed, !1))), readyList.promise(obj);
    }, jQuery.ready.promise();
    var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0, len = elems.length, bulk = null == key;
        if ("object" === jQuery.type(key)) {
            chainable = !0;
            for (i in key) jQuery.access(elems, fn, i, key[i], !0, emptyGet, raw);
        } else if (void 0 !== value && (chainable = !0, jQuery.isFunction(value) || (raw = !0), 
        bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
        })), fn)) for (;len > i; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
    };
    jQuery.acceptData = function(owner) {
        return 1 === owner.nodeType || 9 === owner.nodeType || !+owner.nodeType;
    }, Data.uid = 1, Data.accepts = jQuery.acceptData, Data.prototype = {
        key: function(owner) {
            if (!Data.accepts(owner)) return 0;
            var descriptor = {}, unlock = owner[this.expando];
            if (!unlock) {
                unlock = Data.uid++;
                try {
                    descriptor[this.expando] = {
                        value: unlock
                    }, Object.defineProperties(owner, descriptor);
                } catch (e) {
                    descriptor[this.expando] = unlock, jQuery.extend(owner, descriptor);
                }
            }
            return this.cache[unlock] || (this.cache[unlock] = {}), unlock;
        },
        set: function(owner, data, value) {
            var prop, unlock = this.key(owner), cache = this.cache[unlock];
            if ("string" == typeof data) cache[data] = value; else if (jQuery.isEmptyObject(cache)) jQuery.extend(this.cache[unlock], data); else for (prop in data) cache[prop] = data[prop];
            return cache;
        },
        get: function(owner, key) {
            var cache = this.cache[this.key(owner)];
            return void 0 === key ? cache : cache[key];
        },
        access: function(owner, key, value) {
            var stored;
            return void 0 === key || key && "string" == typeof key && void 0 === value ? (stored = this.get(owner, key), 
            void 0 !== stored ? stored : this.get(owner, jQuery.camelCase(key))) : (this.set(owner, key, value), 
            void 0 !== value ? value : key);
        },
        remove: function(owner, key) {
            var i, name, camel, unlock = this.key(owner), cache = this.cache[unlock];
            if (void 0 === key) this.cache[unlock] = {}; else {
                jQuery.isArray(key) ? name = key.concat(key.map(jQuery.camelCase)) : (camel = jQuery.camelCase(key), 
                key in cache ? name = [ key, camel ] : (name = camel, name = name in cache ? [ name ] : name.match(rnotwhite) || [])), 
                i = name.length;
                for (;i--; ) delete cache[name[i]];
            }
        },
        hasData: function(owner) {
            return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {});
        },
        discard: function(owner) {
            owner[this.expando] && delete this.cache[owner[this.expando]];
        }
    };
    var data_priv = new Data(), data_user = new Data(), rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /([A-Z])/g;
    jQuery.extend({
        hasData: function(elem) {
            return data_user.hasData(elem) || data_priv.hasData(elem);
        },
        data: function(elem, name, data) {
            return data_user.access(elem, name, data);
        },
        removeData: function(elem, name) {
            data_user.remove(elem, name);
        },
        _data: function(elem, name, data) {
            return data_priv.access(elem, name, data);
        },
        _removeData: function(elem, name) {
            data_priv.remove(elem, name);
        }
    }), jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (void 0 === key) {
                if (this.length && (data = data_user.get(elem), 1 === elem.nodeType && !data_priv.get(elem, "hasDataAttrs"))) {
                    for (i = attrs.length; i--; ) attrs[i] && (name = attrs[i].name, 0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)), 
                    dataAttr(elem, name, data[name])));
                    data_priv.set(elem, "hasDataAttrs", !0);
                }
                return data;
            }
            return "object" == typeof key ? this.each(function() {
                data_user.set(this, key);
            }) : access(this, function(value) {
                var data, camelKey = jQuery.camelCase(key);
                if (elem && void 0 === value) {
                    if (data = data_user.get(elem, key), void 0 !== data) return data;
                    if (data = data_user.get(elem, camelKey), void 0 !== data) return data;
                    if (data = dataAttr(elem, camelKey, void 0), void 0 !== data) return data;
                } else this.each(function() {
                    var data = data_user.get(this, camelKey);
                    data_user.set(this, camelKey, value), -1 !== key.indexOf("-") && void 0 !== data && data_user.set(this, key, value);
                });
            }, null, value, arguments.length > 1, null, !0);
        },
        removeData: function(key) {
            return this.each(function() {
                data_user.remove(this, key);
            });
        }
    }), jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            return elem ? (type = (type || "fx") + "queue", queue = data_priv.get(elem, type), 
            data && (!queue || jQuery.isArray(data) ? queue = data_priv.access(elem, type, jQuery.makeArray(data)) : queue.push(data)), 
            queue || []) : void 0;
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                jQuery.dequeue(elem, type);
            };
            "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), 
            delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire();
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return data_priv.get(elem, key) || data_priv.access(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    data_priv.remove(elem, [ type + "queue", key ]);
                })
            });
        }
    }), jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type);
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                --count || defer.resolveWith(elements, [ elements ]);
            };
            for ("string" != typeof type && (obj = type, type = void 0), type = type || "fx"; i--; ) tmp = data_priv.get(elements[i], type + "queueHooks"), 
            tmp && tmp.empty && (count++, tmp.empty.add(resolve));
            return resolve(), defer.promise(obj);
        }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, cssExpand = [ "Top", "Right", "Bottom", "Left" ], isHidden = function(elem, el) {
        return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem);
    }, rcheckableType = /^(?:checkbox|radio)$/i;
    !function() {
        var fragment = document.createDocumentFragment(), div = fragment.appendChild(document.createElement("div")), input = document.createElement("input");
        input.setAttribute("type", "radio"), input.setAttribute("checked", "checked"), input.setAttribute("name", "t"), 
        div.appendChild(input), support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked, 
        div.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue;
    }();
    var strundefined = "undefined";
    support.focusinBubbles = "onfocusin" in window;
    var rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.get(elem);
            if (elemData) for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, 
            selector = handleObjIn.selector), handler.guid || (handler.guid = jQuery.guid++), 
            (events = elemData.events) || (events = elemData.events = {}), (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0;
            }), types = (types || "").match(rnotwhite) || [ "" ], t = types.length; t--; ) tmp = rtypenamespace.exec(types[t]) || [], 
            type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type && (special = jQuery.event.special[type] || {}, 
            type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, 
            handleObj = jQuery.extend({
                type: type,
                origType: origType,
                data: data,
                handler: handler,
                guid: handler.guid,
                selector: selector,
                needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                namespace: namespaces.join(".")
            }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, 
            special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || elem.addEventListener && elem.addEventListener(type, eventHandle, !1)), 
            special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), 
            selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), 
            jQuery.event.global[type] = !0);
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.hasData(elem) && data_priv.get(elem);
            if (elemData && (events = elemData.events)) {
                for (types = (types || "").match(rnotwhite) || [ "" ], t = types.length; t--; ) if (tmp = rtypenamespace.exec(types[t]) || [], 
                type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                    for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, 
                    handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
                    origCount = j = handlers.length; j--; ) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), 
                    handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                    origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), 
                    delete events[type]);
                } else for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                jQuery.isEmptyObject(events) && (delete elemData.handle, data_priv.remove(elem, "events"));
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [ elem || document ], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (namespaces = type.split("."), 
            type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, 
            event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), 
            event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), 
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            event.result = void 0, event.target || (event.target = elem), data = null == data ? [ event ] : jQuery.makeArray(data, [ event ]), 
            special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), 
                    tmp = cur;
                    tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
                for (i = 0; (cur = eventPath[i++]) && !event.isPropagationStopped(); ) event.type = i > 1 ? bubbleType : special.bindType || type, 
                handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle"), 
                handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && handle.apply && jQuery.acceptData(cur) && (event.result = handle.apply(cur, data), 
                event.result === !1 && event.preventDefault());
                return event.type = type, onlyHandlers || event.isDefaultPrevented() || special._default && special._default.apply(eventPath.pop(), data) !== !1 || !jQuery.acceptData(elem) || ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem) && (tmp = elem[ontype], 
                tmp && (elem[ontype] = null), jQuery.event.triggered = type, elem[type](), jQuery.event.triggered = void 0, 
                tmp && (elem[ontype] = tmp)), event.result;
            }
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, j, ret, matched, handleObj, handlerQueue = [], args = slice.call(arguments), handlers = (data_priv.get(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0; (matched = handlerQueue[i++]) && !event.isPropagationStopped(); ) for (event.currentTarget = matched.elem, 
                j = 0; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped(); ) (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) && (event.handleObj = handleObj, 
                event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), 
                void 0 !== ret && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
                return special.postDispatch && special.postDispatch.call(this, event), event.result;
            }
        },
        handlers: function(event, handlers) {
            var i, matches, sel, handleObj, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type)) for (;cur !== this; cur = cur.parentNode || this) if (cur.disabled !== !0 || "click" !== event.type) {
                for (matches = [], i = 0; delegateCount > i; i++) handleObj = handlers[i], sel = handleObj.selector + " ", 
                void 0 === matches[sel] && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [ cur ]).length), 
                matches[sel] && matches.push(handleObj);
                matches.length && handlerQueue.push({
                    elem: cur,
                    handlers: matches
                });
            }
            return delegateCount < handlers.length && handlerQueue.push({
                elem: this,
                handlers: handlers.slice(delegateCount)
            }), handlerQueue;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), 
                event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var eventDoc, doc, body, button = original.button;
                return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, 
                doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), 
                event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), 
                event.which || void 0 === button || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), 
                event;
            }
        },
        fix: function(event) {
            if (event[jQuery.expando]) return event;
            var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
            for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}), 
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props, event = new jQuery.Event(originalEvent), 
            i = copy.length; i--; ) prop = copy[i], event[prop] = originalEvent[prop];
            return event.target || (event.target = document), 3 === event.target.nodeType && (event.target = event.target.parentNode), 
            fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== safeActiveElement() && this.focus ? (this.focus(), !1) : void 0;
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === safeActiveElement() && this.blur ? (this.blur(), !1) : void 0;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && jQuery.nodeName(this, "input") ? (this.click(), 
                    !1) : void 0;
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    void 0 !== event.result && event.originalEvent && (event.originalEvent.returnValue = event.result);
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: !0,
                originalEvent: {}
            });
            bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e), 
            e.isDefaultPrevented() && event.preventDefault();
        }
    }, jQuery.removeEvent = function(elem, type, handle) {
        elem.removeEventListener && elem.removeEventListener(type, handle, !1);
    }, jQuery.Event = function(src, props) {
        return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, 
        this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.returnValue === !1 ? returnTrue : returnFalse) : this.type = src, 
        props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), 
        void (this[jQuery.expando] = !0)) : new jQuery.Event(src, props);
    }, jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue, e && e.preventDefault && e.preventDefault();
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue, e && e.stopPropagation && e.stopPropagation();
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), 
            this.stopPropagation();
        }
    }, jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, 
                ret = handleObj.handler.apply(this, arguments), event.type = fix), ret;
            }
        };
    }), support.focusinBubbles || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(orig, fix) {
        var handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0);
        };
        jQuery.event.special[fix] = {
            setup: function() {
                var doc = this.ownerDocument || this, attaches = data_priv.access(doc, fix);
                attaches || doc.addEventListener(orig, handler, !0), data_priv.access(doc, fix, (attaches || 0) + 1);
            },
            teardown: function() {
                var doc = this.ownerDocument || this, attaches = data_priv.access(doc, fix) - 1;
                attaches ? data_priv.access(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0), 
                data_priv.remove(doc, fix));
            }
        };
    }), jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var origFn, type;
            if ("object" == typeof types) {
                "string" != typeof selector && (data = data || selector, selector = void 0);
                for (type in types) this.on(type, selector, data, types[type], one);
                return this;
            }
            if (null == data && null == fn ? (fn = selector, data = selector = void 0) : null == fn && ("string" == typeof selector ? (fn = data, 
            data = void 0) : (fn = data, data = selector, selector = void 0)), fn === !1) fn = returnFalse; else if (!fn) return this;
            return 1 === one && (origFn = fn, fn = function(event) {
                return jQuery().off(event), origFn.apply(this, arguments);
            }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, 
            jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), 
            this;
            if ("object" == typeof types) {
                for (type in types) this.off(type, selector, types[type]);
                return this;
            }
            return (selector === !1 || "function" == typeof selector) && (fn = selector, selector = void 0), 
            fn === !1 && (fn = returnFalse), this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            return elem ? jQuery.event.trigger(type, data, elem, !0) : void 0;
        }
    });
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, 
    wrapMap.th = wrapMap.td, jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements, clone = elem.cloneNode(!0), inPage = jQuery.contains(elem.ownerDocument, elem);
            if (!(support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) for (destElements = getAll(clone), 
            srcElements = getAll(elem), i = 0, l = srcElements.length; l > i; i++) fixInput(srcElements[i], destElements[i]);
            if (dataAndEvents) if (deepDataAndEvents) for (srcElements = srcElements || getAll(elem), 
            destElements = destElements || getAll(clone), i = 0, l = srcElements.length; l > i; i++) cloneCopyEvent(srcElements[i], destElements[i]); else cloneCopyEvent(elem, clone);
            return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), 
            clone;
        },
        buildFragment: function(elems, context, scripts, selection) {
            for (var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length; l > i; i++) if (elem = elems[i], 
            elem || 0 === elem) if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [ elem ] : elem); else if (rhtml.test(elem)) {
                for (tmp = tmp || fragment.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase(), 
                wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2], 
                j = wrap[0]; j--; ) tmp = tmp.lastChild;
                jQuery.merge(nodes, tmp.childNodes), tmp = fragment.firstChild, tmp.textContent = "";
            } else nodes.push(context.createTextNode(elem));
            for (fragment.textContent = "", i = 0; elem = nodes[i++]; ) if ((!selection || -1 === jQuery.inArray(elem, selection)) && (contains = jQuery.contains(elem.ownerDocument, elem), 
            tmp = getAll(fragment.appendChild(elem), "script"), contains && setGlobalEval(tmp), 
            scripts)) for (j = 0; elem = tmp[j++]; ) rscriptType.test(elem.type || "") && scripts.push(elem);
            return fragment;
        },
        cleanData: function(elems) {
            for (var data, elem, type, key, special = jQuery.event.special, i = 0; void 0 !== (elem = elems[i]); i++) {
                if (jQuery.acceptData(elem) && (key = elem[data_priv.expando], key && (data = data_priv.cache[key]))) {
                    if (data.events) for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                    data_priv.cache[key] && delete data_priv.cache[key];
                }
                delete data_user.cache[elem[data_user.expando]];
            }
        }
    }), jQuery.fn.extend({
        text: function(value) {
            return access(this, function(value) {
                return void 0 === value ? jQuery.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = value);
                });
            }, null, value, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this);
            });
        },
        after: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling);
            });
        },
        remove: function(selector, keepData) {
            for (var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0; null != (elem = elems[i]); i++) keepData || 1 !== elem.nodeType || jQuery.cleanData(getAll(elem)), 
            elem.parentNode && (keepData && jQuery.contains(elem.ownerDocument, elem) && setGlobalEval(getAll(elem, "script")), 
            elem.parentNode.removeChild(elem));
            return this;
        },
        empty: function() {
            for (var elem, i = 0; null != (elem = this[i]); i++) 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
            elem.textContent = "");
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            return dataAndEvents = null == dataAndEvents ? !1 : dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, 
            this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (void 0 === value && 1 === elem.nodeType) return elem.innerHTML;
                if ("string" == typeof value && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (;l > i; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
                        elem.innerHTML = value);
                        elem = 0;
                    } catch (e) {}
                }
                elem && this.empty().append(value);
            }, null, value, arguments.length);
        },
        replaceWith: function() {
            var arg = arguments[0];
            return this.domManip(arguments, function(elem) {
                arg = this.parentNode, jQuery.cleanData(getAll(this)), arg && arg.replaceChild(elem, this);
            }), arg && (arg.length || arg.nodeType) ? this : this.remove();
        },
        detach: function(selector) {
            return this.remove(selector, !0);
        },
        domManip: function(args, callback) {
            args = concat.apply([], args);
            var fragment, first, scripts, hasScripts, node, doc, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
            if (isFunction || l > 1 && "string" == typeof value && !support.checkClone && rchecked.test(value)) return this.each(function(index) {
                var self = set.eq(index);
                isFunction && (args[0] = value.call(this, index, self.html())), self.domManip(args, callback);
            });
            if (l && (fragment = jQuery.buildFragment(args, this[0].ownerDocument, !1, this), 
            first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), 
            first)) {
                for (scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; l > i; i++) node = fragment, 
                i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), 
                callback.call(this[i], node, i);
                if (hasScripts) for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), 
                i = 0; hasScripts > i; i++) node = scripts[i], rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl && jQuery._evalUrl(node.src) : jQuery.globalEval(node.textContent.replace(rcleanScript, "")));
            }
            return this;
        }
    }), jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            for (var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0; last >= i; i++) elems = i === last ? this : this.clone(!0), 
            jQuery(insert[i])[original](elems), push.apply(ret, elems.get());
            return this.pushStack(ret);
        };
    });
    var iframe, elemdisplay = {}, rmargin = /^margin/, rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"), getStyles = function(elem) {
        return elem.ownerDocument.defaultView.opener ? elem.ownerDocument.defaultView.getComputedStyle(elem, null) : window.getComputedStyle(elem, null);
    };
    !function() {
        function computePixelPositionAndBoxSizingReliable() {
            div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", 
            div.innerHTML = "", docElem.appendChild(container);
            var divStyle = window.getComputedStyle(div, null);
            pixelPositionVal = "1%" !== divStyle.top, boxSizingReliableVal = "4px" === divStyle.width, 
            docElem.removeChild(container);
        }
        var pixelPositionVal, boxSizingReliableVal, docElem = document.documentElement, container = document.createElement("div"), div = document.createElement("div");
        div.style && (div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "", 
        support.clearCloneStyle = "content-box" === div.style.backgroundClip, container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", 
        container.appendChild(div), window.getComputedStyle && jQuery.extend(support, {
            pixelPosition: function() {
                return computePixelPositionAndBoxSizingReliable(), pixelPositionVal;
            },
            boxSizingReliable: function() {
                return null == boxSizingReliableVal && computePixelPositionAndBoxSizingReliable(), 
                boxSizingReliableVal;
            },
            reliableMarginRight: function() {
                var ret, marginDiv = div.appendChild(document.createElement("div"));
                return marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", 
                marginDiv.style.marginRight = marginDiv.style.width = "0", div.style.width = "1px", 
                docElem.appendChild(container), ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight), 
                docElem.removeChild(container), div.removeChild(marginDiv), ret;
            }
        }));
    }(), jQuery.swap = function(elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
        ret = callback.apply(elem, args || []);
        for (name in options) elem.style[name] = old[name];
        return ret;
    };
    var rdisplayswap = /^(none|table(?!-c[ea]).+)/, rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"), rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"), cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
    }, cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(elem, name, value, extra) {
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
                return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), 
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], void 0 === value ? hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : style[name] : (type = typeof value, 
                "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), 
                type = "number"), null != value && value === value && ("number" !== type || jQuery.cssNumber[origName] || (value += "px"), 
                support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), 
                hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra)) || (style[name] = value)), 
                void 0);
            }
        },
        css: function(elem, name, extra, styles) {
            var val, num, hooks, origName = jQuery.camelCase(name);
            return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), 
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), 
            void 0 === val && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), 
            "" === extra || extra ? (num = parseFloat(val), extra === !0 || jQuery.isNumeric(num) ? num || 0 : val) : val;
        }
    }), jQuery.each([ "height", "width" ], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                return computed ? rdisplayswap.test(jQuery.css(elem, "display")) && 0 === elem.offsetWidth ? jQuery.swap(elem, cssShow, function() {
                    return getWidthOrHeight(elem, name, extra);
                }) : getWidthOrHeight(elem, name, extra) : void 0;
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles) : 0);
            }
        };
    }), jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
        return computed ? jQuery.swap(elem, {
            display: "inline-block"
        }, curCSS, [ elem, "marginRight" ]) : void 0;
    }), jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [ value ]; 4 > i; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded;
            }
        }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber);
    }), jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    for (styles = getStyles(elem), len = name.length; len > i; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                    return map;
                }
                return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, !0);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                isHidden(this) ? jQuery(this).show() : jQuery(this).hide();
            });
        }
    }), jQuery.Tween = Tween, Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem, this.prop = prop, this.easing = easing || "swing", this.options = options, 
            this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent, 
            this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
        }
    }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, ""), 
                result && "auto" !== result ? result : 0) : tween.elem[tween.prop];
            },
            set: function(tween) {
                jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now;
            }
        }
    }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now);
        }
    }, jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2;
        }
    }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/, animationPrefilters = [ defaultPrefilter ], tweeners = {
        "*": [ function(prop, value) {
            var tween = this.createTween(prop, value), target = tween.cur(), parts = rfxnum.exec(value), unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"), start = (jQuery.cssNumber[prop] || "px" !== unit && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)), scale = 1, maxIterations = 20;
            if (start && start[3] !== unit) {
                unit = unit || start[3], parts = parts || [], start = +target || 1;
                do scale = scale || ".5", start /= scale, jQuery.style(tween.elem, prop, start + unit); while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations);
            }
            return parts && (start = tween.start = +start || +target || 0, tween.unit = unit, 
            tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]), tween;
        } ]
    };
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            jQuery.isFunction(props) ? (callback = props, props = [ "*" ]) : props = props.split(" ");
            for (var prop, index = 0, length = props.length; length > index; index++) prop = props[index], 
            tweeners[prop] = tweeners[prop] || [], tweeners[prop].unshift(callback);
        },
        prefilter: function(callback, prepend) {
            prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback);
        }
    }), jQuery.speed = function(speed, easing, fn) {
        var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, 
        (null == opt.queue || opt.queue === !0) && (opt.queue = "fx"), opt.old = opt.complete, 
        opt.complete = function() {
            jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue);
        }, opt;
    }, jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                (empty || data_priv.get(this, "finish")) && anim.stop(!0);
            };
            return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop, stop(gotoEnd);
            };
            return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0), 
            clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                var dequeue = !0, index = null != type && type + "queueHooks", timers = jQuery.timers, data = data_priv.get(this);
                if (index) data[index] && data[index].stop && stopQueue(data[index]); else for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                for (index = timers.length; index--; ) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), 
                dequeue = !1, timers.splice(index, 1));
                (dequeue || !gotoEnd) && jQuery.dequeue(this, type);
            });
        },
        finish: function(type) {
            return type !== !1 && (type = type || "fx"), this.each(function() {
                var index, data = data_priv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), 
                index = timers.length; index--; ) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), 
                timers.splice(index, 1));
                for (index = 0; length > index; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                delete data.finish;
            });
        }
    }), jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback);
        };
    }), jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    }), jQuery.timers = [], jQuery.fx.tick = function() {
        var timer, i = 0, timers = jQuery.timers;
        for (fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
        timers.length || jQuery.fx.stop(), fxNow = void 0;
    }, jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer), timer() ? jQuery.fx.start() : jQuery.timers.pop();
    }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
        timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval));
    }, jQuery.fx.stop = function() {
        clearInterval(timerId), timerId = null;
    }, jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, jQuery.fn.delay = function(time, type) {
        return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", 
        this.queue(type, function(next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function() {
                clearTimeout(timeout);
            };
        });
    }, function() {
        var input = document.createElement("input"), select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
        input.type = "checkbox", support.checkOn = "" !== input.value, support.optSelected = opt.selected, 
        select.disabled = !0, support.optDisabled = !opt.disabled, input = document.createElement("input"), 
        input.value = "t", input.type = "radio", support.radioValue = "t" === input.value;
    }();
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        }
    }), jQuery.extend({
        attr: function(elem, name, value) {
            var hooks, ret, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return typeof elem.getAttribute === strundefined ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), 
            hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)), 
            void 0 === value ? hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name), 
            null == ret ? void 0 : ret) : null !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""), 
            value) : void jQuery.removeAttr(elem, name));
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0, attrNames = value && value.match(rnotwhite);
            if (attrNames && 1 === elem.nodeType) for (;name = attrNames[i++]; ) propName = jQuery.propFix[name] || name, 
            jQuery.expr.match.bool.test(name) && (elem[propName] = !1), elem.removeAttribute(name);
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        return elem.setAttribute("type", value), val && (elem.value = val), value;
                    }
                }
            }
        }
    }), boolHook = {
        set: function(elem, value, name) {
            return value === !1 ? jQuery.removeAttr(elem, name) : elem.setAttribute(name, name), 
            name;
        }
    }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = function(elem, name, isXML) {
            var ret, handle;
            return isXML || (handle = attrHandle[name], attrHandle[name] = ret, ret = null != getter(elem, name, isXML) ? name.toLowerCase() : null, 
            attrHandle[name] = handle), ret;
        };
    });
    var rfocusable = /^(?:input|select|textarea|button)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            return this.each(function() {
                delete this[jQuery.propFix[name] || name];
            });
        }
    }), jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return notxml = 1 !== nType || !jQuery.isXMLDoc(elem), 
            notxml && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), 
            void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name];
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1;
                }
            }
        }
    }), support.optSelected || (jQuery.propHooks.selected = {
        get: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.parentNode && parent.parentNode.selectedIndex, null;
        }
    }), jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    });
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, proceed = "string" == typeof value && value, i = 0, len = this.length;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).addClass(value.call(this, j, this.className));
            });
            if (proceed) for (classes = (value || "").match(rnotwhite) || []; len > i; i++) if (elem = this[i], 
            cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ")) {
                for (j = 0; clazz = classes[j++]; ) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                finalValue = jQuery.trim(cur), elem.className !== finalValue && (elem.className = finalValue);
            }
            return this;
        },
        removeClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, proceed = 0 === arguments.length || "string" == typeof value && value, i = 0, len = this.length;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).removeClass(value.call(this, j, this.className));
            });
            if (proceed) for (classes = (value || "").match(rnotwhite) || []; len > i; i++) if (elem = this[i], 
            cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
                for (j = 0; clazz = classes[j++]; ) for (;cur.indexOf(" " + clazz + " ") >= 0; ) cur = cur.replace(" " + clazz + " ", " ");
                finalValue = value ? jQuery.trim(cur) : "", elem.className !== finalValue && (elem.className = finalValue);
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : jQuery.isFunction(value) ? this.each(function(i) {
                jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
            }) : this.each(function() {
                if ("string" === type) for (var className, i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || []; className = classNames[i++]; ) self.hasClass(className) ? self.removeClass(className) : self.addClass(className); else (type === strundefined || "boolean" === type) && (this.className && data_priv.set(this, "__className__", this.className), 
                this.className = this.className || value === !1 ? "" : data_priv.get(this, "__className__") || "");
            });
        },
        hasClass: function(selector) {
            for (var className = " " + selector + " ", i = 0, l = this.length; l > i; i++) if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) return !0;
            return !1;
        }
    });
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            {
                if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
                    var val;
                    1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value, 
                    null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                        return null == value ? "" : value + "";
                    })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], 
                    hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val));
                });
                if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], 
                hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value, 
                "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret);
            }
        }
    }), jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return null != val ? val : jQuery.trim(jQuery.text(elem));
                }
            },
            select: {
                get: function(elem) {
                    for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || 0 > index, values = one ? null : [], max = one ? index + 1 : options.length, i = 0 > index ? max : one ? index : 0; max > i; i++) if (option = options[i], 
                    (option.selected || i === index) && (support.optDisabled ? !option.disabled : null === option.getAttribute("disabled")) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                        if (value = jQuery(option).val(), one) return value;
                        values.push(value);
                    }
                    return values;
                },
                set: function(elem, value) {
                    for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--; ) option = options[i], 
                    (option.selected = jQuery.inArray(option.value, values) >= 0) && (optionSet = !0);
                    return optionSet || (elem.selectedIndex = -1), values;
                }
            }
        }
    }), jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 : void 0;
            }
        }, support.checkOn || (jQuery.valHooks[this].get = function(elem) {
            return null === elem.getAttribute("value") ? "on" : elem.value;
        });
    }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    }), jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    });
    var nonce = jQuery.now(), rquery = /\?/;
    jQuery.parseJSON = function(data) {
        return JSON.parse(data + "");
    }, jQuery.parseXML = function(data) {
        var xml, tmp;
        if (!data || "string" != typeof data) return null;
        try {
            tmp = new DOMParser(), xml = tmp.parseFromString(data, "text/xml");
        } catch (e) {
            xml = void 0;
        }
        return (!xml || xml.getElementsByTagName("parsererror").length) && jQuery.error("Invalid XML: " + data), 
        xml;
    };
    var rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), ajaxLocation = window.location.href, ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                2 !== state && (state = 2, timeoutTimer && clearTimeout(timeoutTimer), transport = void 0, 
                responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, isSuccess = status >= 200 && 300 > status || 304 === status, 
                responses && (response = ajaxHandleResponses(s, jqXHR, responses)), response = ajaxConvert(s, response, jqXHR, isSuccess), 
                isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), 
                modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), 
                modified && (jQuery.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state, 
                success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, 
                (status || !statusText) && (statusText = "error", 0 > status && (status = 0))), 
                jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", 
                isSuccess ? deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]) : deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]), 
                jqXHR.statusCode(statusCode), statusCode = void 0, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]), 
                completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]), 
                --jQuery.active || jQuery.event.trigger("ajaxStop")));
            }
            "object" == typeof url && (options = url, url = void 0), options = options || {};
            var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (2 === state) {
                        if (!responseHeaders) for (responseHeaders = {}; match = rheaders.exec(responseHeadersString); ) responseHeaders[match[1].toLowerCase()] = match[2];
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return null == match ? null : match;
                },
                getAllResponseHeaders: function() {
                    return 2 === state ? responseHeadersString : null;
                },
                setRequestHeader: function(name, value) {
                    var lname = name.toLowerCase();
                    return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, 
                    requestHeaders[name] = value), this;
                },
                overrideMimeType: function(type) {
                    return state || (s.mimeType = type), this;
                },
                statusCode: function(map) {
                    var code;
                    if (map) if (2 > state) for (code in map) statusCode[code] = [ statusCode[code], map[code] ]; else jqXHR.always(map[jqXHR.status]);
                    return this;
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    return transport && transport.abort(finalText), done(0, finalText), this;
                }
            };
            if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, 
            jqXHR.error = jqXHR.fail, s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), 
            s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [ "" ], 
            null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? "80" : "443")) === (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? "80" : "443")))), 
            s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), 
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
            fireGlobals = jQuery.event && s.global, fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), 
            s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url, 
            s.hasContent || (s.data && (cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data, 
            delete s.data), s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++)), 
            s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), 
            jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), 
            (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), 
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) jqXHR[i](s[i]);
            if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [ jqXHR, s ]), 
                s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() {
                    jqXHR.abort("timeout");
                }, s.timeout));
                try {
                    state = 1, transport.send(requestHeaders, done);
                } catch (e) {
                    if (!(2 > state)) throw e;
                    done(-1, e);
                }
            } else done(-1, "No Transport");
            return jqXHR;
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
            return jQuery.get(url, void 0, callback, "script");
        }
    }), jQuery.each([ "get", "post" ], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            return jQuery.isFunction(data) && (type = type || callback, callback = data, data = void 0), 
            jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    }), jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        });
    }, jQuery.fn.extend({
        wrapAll: function(html) {
            var wrap;
            return jQuery.isFunction(html) ? this.each(function(i) {
                jQuery(this).wrapAll(html.call(this, i));
            }) : (this[0] && (wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && wrap.insertBefore(this[0]), 
            wrap.map(function() {
                for (var elem = this; elem.firstElementChild; ) elem = elem.firstElementChild;
                return elem;
            }).append(this)), this);
        },
        wrapInner: function(html) {
            return jQuery.isFunction(html) ? this.each(function(i) {
                jQuery(this).wrapInner(html.call(this, i));
            }) : this.each(function() {
                var self = jQuery(this), contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html);
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes);
            }).end();
        }
    }), jQuery.expr.filters.hidden = function(elem) {
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
    }, jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem);
    };
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        if (void 0 === traditional && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), 
        jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
            add(this.name, this.value);
        }); else for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
        return s.join("&").replace(r20, "+");
    }, jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    }), jQuery.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest();
        } catch (e) {}
    };
    var xhrId = 0, xhrCallbacks = {}, xhrSuccessStatus = {
        0: 200,
        1223: 204
    }, xhrSupported = jQuery.ajaxSettings.xhr();
    window.attachEvent && window.attachEvent("onunload", function() {
        for (var key in xhrCallbacks) xhrCallbacks[key]();
    }), support.cors = !!xhrSupported && "withCredentials" in xhrSupported, support.ajax = xhrSupported = !!xhrSupported, 
    jQuery.ajaxTransport(function(options) {
        var callback;
        return support.cors || xhrSupported && !options.crossDomain ? {
            send: function(headers, complete) {
                var i, xhr = options.xhr(), id = ++xhrId;
                if (xhr.open(options.type, options.url, options.async, options.username, options.password), 
                options.xhrFields) for (i in options.xhrFields) xhr[i] = options.xhrFields[i];
                options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType), 
                options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                for (i in headers) xhr.setRequestHeader(i, headers[i]);
                callback = function(type) {
                    return function() {
                        callback && (delete xhrCallbacks[id], callback = xhr.onload = xhr.onerror = null, 
                        "abort" === type ? xhr.abort() : "error" === type ? complete(xhr.status, xhr.statusText) : complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, "string" == typeof xhr.responseText ? {
                            text: xhr.responseText
                        } : void 0, xhr.getAllResponseHeaders()));
                    };
                }, xhr.onload = callback(), xhr.onerror = callback("error"), callback = xhrCallbacks[id] = callback("abort");
                try {
                    xhr.send(options.hasContent && options.data || null);
                } catch (e) {
                    if (callback) throw e;
                }
            },
            abort: function() {
                callback && callback();
            }
        } : void 0;
    }), jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                return jQuery.globalEval(text), text;
            }
        }
    }), jQuery.ajaxPrefilter("script", function(s) {
        void 0 === s.cache && (s.cache = !1), s.crossDomain && (s.type = "GET");
    }), jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, callback;
            return {
                send: function(_, complete) {
                    script = jQuery("<script>").prop({
                        async: !0,
                        charset: s.scriptCharset,
                        src: s.url
                    }).on("load error", callback = function(evt) {
                        script.remove(), callback = null, evt && complete("error" === evt.type ? 404 : 200, evt.type);
                    }), document.head.appendChild(script[0]);
                },
                abort: function() {
                    callback && callback();
                }
            };
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            return this[callback] = !0, callback;
        }
    }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, 
        jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), 
        s.converters["script json"] = function() {
            return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0];
        }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
            responseContainer = arguments;
        }, jqXHR.always(function() {
            window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, 
            oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), 
            responseContainer = overwritten = void 0;
        }), "script") : void 0;
    }), jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || "string" != typeof data) return null;
        "boolean" == typeof context && (keepScripts = context, context = !1), context = context || document;
        var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
        return parsed ? [ context.createElement(parsed[1]) ] : (parsed = jQuery.buildFragment([ data ], context, scripts), 
        scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes));
    };
    var _load = jQuery.fn.load;
    jQuery.fn.load = function(url, params, callback) {
        if ("string" != typeof url && _load) return _load.apply(this, arguments);
        var selector, type, response, self = this, off = url.indexOf(" ");
        return off >= 0 && (selector = jQuery.trim(url.slice(off)), url = url.slice(0, off)), 
        jQuery.isFunction(params) ? (callback = params, params = void 0) : params && "object" == typeof params && (type = "POST"), 
        self.length > 0 && jQuery.ajax({
            url: url,
            type: type,
            dataType: "html",
            data: params
        }).done(function(responseText) {
            response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
        }).complete(callback && function(jqXHR, status) {
            self.each(callback, response || [ jqXHR.responseText, status, jqXHR ]);
        }), this;
    }, jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    }), jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    };
    var docElem = window.document.documentElement;
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            "static" === position && (elem.style.position = "relative"), curOffset = curElem.offset(), 
            curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && (curCSSTop + curCSSLeft).indexOf("auto") > -1, 
            calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, 
            curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), 
            jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)), null != options.top && (props.top = options.top - curOffset.top + curTop), 
            null != options.left && (props.left = options.left - curOffset.left + curLeft), 
            "using" in options ? options.using.call(elem, props) : curElem.css(props);
        }
    }, jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) return void 0 === options ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i);
            });
            var docElem, win, elem = this[0], box = {
                top: 0,
                left: 0
            }, doc = elem && elem.ownerDocument;
            if (doc) return docElem = doc.documentElement, jQuery.contains(docElem, elem) ? (typeof elem.getBoundingClientRect !== strundefined && (box = elem.getBoundingClientRect()), 
            win = getWindow(doc), {
                top: box.top + win.pageYOffset - docElem.clientTop,
                left: box.left + win.pageXOffset - docElem.clientLeft
            }) : box;
        },
        position: function() {
            if (this[0]) {
                var offsetParent, offset, elem = this[0], parentOffset = {
                    top: 0,
                    left: 0
                };
                return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), 
                offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), 
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)), 
                {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var offsetParent = this.offsetParent || docElem; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position"); ) offsetParent = offsetParent.offsetParent;
                return offsetParent || docElem;
            });
        }
    }), jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = "pageYOffset" === prop;
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);
                return void 0 === val ? win ? win[prop] : elem[method] : void (win ? win.scrollTo(top ? window.pageXOffset : val, top ? val : window.pageYOffset) : elem[method] = val);
            }, method, val, arguments.length, null);
        };
    }), jQuery.each([ "top", "left" ], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            return computed ? (computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed) : void 0;
        });
    }), jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin), extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, 
                    Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : void 0, chainable, null);
            };
        });
    }), jQuery.fn.size = function() {
        return this.length;
    }, jQuery.fn.andSelf = jQuery.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return jQuery;
    });
    var _jQuery = window.jQuery, _$ = window.$;
    return jQuery.noConflict = function(deep) {
        return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), 
        jQuery;
    }, typeof noGlobal === strundefined && (window.jQuery = window.$ = jQuery), jQuery;
}), function() {
    function createReduce(dir) {
        function iterator(obj, iteratee, memo, keys, index, length) {
            for (;index >= 0 && length > index; index += dir) {
                var currentKey = keys ? keys[index] : index;
                memo = iteratee(memo, obj[currentKey], currentKey, obj);
            }
            return memo;
        }
        return function(obj, iteratee, memo, context) {
            iteratee = optimizeCb(iteratee, context, 4);
            var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length, index = dir > 0 ? 0 : length - 1;
            return arguments.length < 3 && (memo = obj[keys ? keys[index] : index], index += dir), 
            iterator(obj, iteratee, memo, keys, index, length);
        };
    }
    function createPredicateIndexFinder(dir) {
        return function(array, predicate, context) {
            predicate = cb(predicate, context);
            for (var length = getLength(array), index = dir > 0 ? 0 : length - 1; index >= 0 && length > index; index += dir) if (predicate(array[index], index, array)) return index;
            return -1;
        };
    }
    function createIndexFinder(dir, predicateFind, sortedIndex) {
        return function(array, item, idx) {
            var i = 0, length = getLength(array);
            if ("number" == typeof idx) dir > 0 ? i = idx >= 0 ? idx : Math.max(idx + length, i) : length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1; else if (sortedIndex && idx && length) return idx = sortedIndex(array, item), 
            array[idx] === item ? idx : -1;
            if (item !== item) return idx = predicateFind(slice.call(array, i, length), _.isNaN), 
            idx >= 0 ? idx + i : -1;
            for (idx = dir > 0 ? i : length - 1; idx >= 0 && length > idx; idx += dir) if (array[idx] === item) return idx;
            return -1;
        };
    }
    function collectNonEnumProps(obj, keys) {
        var nonEnumIdx = nonEnumerableProps.length, constructor = obj.constructor, proto = _.isFunction(constructor) && constructor.prototype || ObjProto, prop = "constructor";
        for (_.has(obj, prop) && !_.contains(keys, prop) && keys.push(prop); nonEnumIdx--; ) prop = nonEnumerableProps[nonEnumIdx], 
        prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop) && keys.push(prop);
    }
    var root = this, previousUnderscore = root._, ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype, push = ArrayProto.push, slice = ArrayProto.slice, toString = ObjProto.toString, hasOwnProperty = ObjProto.hasOwnProperty, nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = FuncProto.bind, nativeCreate = Object.create, Ctor = function() {}, _ = function(obj) {
        return obj instanceof _ ? obj : this instanceof _ ? void (this._wrapped = obj) : new _(obj);
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = _), 
    exports._ = _) : root._ = _, _.VERSION = "1.8.3";
    var optimizeCb = function(func, context, argCount) {
        if (void 0 === context) return func;
        switch (null == argCount ? 3 : argCount) {
          case 1:
            return function(value) {
                return func.call(context, value);
            };

          case 2:
            return function(value, other) {
                return func.call(context, value, other);
            };

          case 3:
            return function(value, index, collection) {
                return func.call(context, value, index, collection);
            };

          case 4:
            return function(accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection);
            };
        }
        return function() {
            return func.apply(context, arguments);
        };
    }, cb = function(value, context, argCount) {
        return null == value ? _.identity : _.isFunction(value) ? optimizeCb(value, context, argCount) : _.isObject(value) ? _.matcher(value) : _.property(value);
    };
    _.iteratee = function(value, context) {
        return cb(value, context, 1 / 0);
    };
    var createAssigner = function(keysFunc, undefinedOnly) {
        return function(obj) {
            var length = arguments.length;
            if (2 > length || null == obj) return obj;
            for (var index = 1; length > index; index++) for (var source = arguments[index], keys = keysFunc(source), l = keys.length, i = 0; l > i; i++) {
                var key = keys[i];
                undefinedOnly && void 0 !== obj[key] || (obj[key] = source[key]);
            }
            return obj;
        };
    }, baseCreate = function(prototype) {
        if (!_.isObject(prototype)) return {};
        if (nativeCreate) return nativeCreate(prototype);
        Ctor.prototype = prototype;
        var result = new Ctor();
        return Ctor.prototype = null, result;
    }, property = function(key) {
        return function(obj) {
            return null == obj ? void 0 : obj[key];
        };
    }, MAX_ARRAY_INDEX = Math.pow(2, 53) - 1, getLength = property("length"), isArrayLike = function(collection) {
        var length = getLength(collection);
        return "number" == typeof length && length >= 0 && MAX_ARRAY_INDEX >= length;
    };
    _.each = _.forEach = function(obj, iteratee, context) {
        iteratee = optimizeCb(iteratee, context);
        var i, length;
        if (isArrayLike(obj)) for (i = 0, length = obj.length; length > i; i++) iteratee(obj[i], i, obj); else {
            var keys = _.keys(obj);
            for (i = 0, length = keys.length; length > i; i++) iteratee(obj[keys[i]], keys[i], obj);
        }
        return obj;
    }, _.map = _.collect = function(obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        for (var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length, results = Array(length), index = 0; length > index; index++) {
            var currentKey = keys ? keys[index] : index;
            results[index] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
    }, _.reduce = _.foldl = _.inject = createReduce(1), _.reduceRight = _.foldr = createReduce(-1), 
    _.find = _.detect = function(obj, predicate, context) {
        var key;
        return key = isArrayLike(obj) ? _.findIndex(obj, predicate, context) : _.findKey(obj, predicate, context), 
        void 0 !== key && -1 !== key ? obj[key] : void 0;
    }, _.filter = _.select = function(obj, predicate, context) {
        var results = [];
        return predicate = cb(predicate, context), _.each(obj, function(value, index, list) {
            predicate(value, index, list) && results.push(value);
        }), results;
    }, _.reject = function(obj, predicate, context) {
        return _.filter(obj, _.negate(cb(predicate)), context);
    }, _.every = _.all = function(obj, predicate, context) {
        predicate = cb(predicate, context);
        for (var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length, index = 0; length > index; index++) {
            var currentKey = keys ? keys[index] : index;
            if (!predicate(obj[currentKey], currentKey, obj)) return !1;
        }
        return !0;
    }, _.some = _.any = function(obj, predicate, context) {
        predicate = cb(predicate, context);
        for (var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length, index = 0; length > index; index++) {
            var currentKey = keys ? keys[index] : index;
            if (predicate(obj[currentKey], currentKey, obj)) return !0;
        }
        return !1;
    }, _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
        return isArrayLike(obj) || (obj = _.values(obj)), ("number" != typeof fromIndex || guard) && (fromIndex = 0), 
        _.indexOf(obj, item, fromIndex) >= 0;
    }, _.invoke = function(obj, method) {
        var args = slice.call(arguments, 2), isFunc = _.isFunction(method);
        return _.map(obj, function(value) {
            var func = isFunc ? method : value[method];
            return null == func ? func : func.apply(value, args);
        });
    }, _.pluck = function(obj, key) {
        return _.map(obj, _.property(key));
    }, _.where = function(obj, attrs) {
        return _.filter(obj, _.matcher(attrs));
    }, _.findWhere = function(obj, attrs) {
        return _.find(obj, _.matcher(attrs));
    }, _.max = function(obj, iteratee, context) {
        var value, computed, result = -(1 / 0), lastComputed = -(1 / 0);
        if (null == iteratee && null != obj) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, length = obj.length; length > i; i++) value = obj[i], value > result && (result = value);
        } else iteratee = cb(iteratee, context), _.each(obj, function(value, index, list) {
            computed = iteratee(value, index, list), (computed > lastComputed || computed === -(1 / 0) && result === -(1 / 0)) && (result = value, 
            lastComputed = computed);
        });
        return result;
    }, _.min = function(obj, iteratee, context) {
        var value, computed, result = 1 / 0, lastComputed = 1 / 0;
        if (null == iteratee && null != obj) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, length = obj.length; length > i; i++) value = obj[i], result > value && (result = value);
        } else iteratee = cb(iteratee, context), _.each(obj, function(value, index, list) {
            computed = iteratee(value, index, list), (lastComputed > computed || computed === 1 / 0 && result === 1 / 0) && (result = value, 
            lastComputed = computed);
        });
        return result;
    }, _.shuffle = function(obj) {
        for (var rand, set = isArrayLike(obj) ? obj : _.values(obj), length = set.length, shuffled = Array(length), index = 0; length > index; index++) rand = _.random(0, index), 
        rand !== index && (shuffled[index] = shuffled[rand]), shuffled[rand] = set[index];
        return shuffled;
    }, _.sample = function(obj, n, guard) {
        return null == n || guard ? (isArrayLike(obj) || (obj = _.values(obj)), obj[_.random(obj.length - 1)]) : _.shuffle(obj).slice(0, Math.max(0, n));
    }, _.sortBy = function(obj, iteratee, context) {
        return iteratee = cb(iteratee, context), _.pluck(_.map(obj, function(value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iteratee(value, index, list)
            };
        }).sort(function(left, right) {
            var a = left.criteria, b = right.criteria;
            if (a !== b) {
                if (a > b || void 0 === a) return 1;
                if (b > a || void 0 === b) return -1;
            }
            return left.index - right.index;
        }), "value");
    };
    var group = function(behavior) {
        return function(obj, iteratee, context) {
            var result = {};
            return iteratee = cb(iteratee, context), _.each(obj, function(value, index) {
                var key = iteratee(value, index, obj);
                behavior(result, value, key);
            }), result;
        };
    };
    _.groupBy = group(function(result, value, key) {
        _.has(result, key) ? result[key].push(value) : result[key] = [ value ];
    }), _.indexBy = group(function(result, value, key) {
        result[key] = value;
    }), _.countBy = group(function(result, value, key) {
        _.has(result, key) ? result[key]++ : result[key] = 1;
    }), _.toArray = function(obj) {
        return obj ? _.isArray(obj) ? slice.call(obj) : isArrayLike(obj) ? _.map(obj, _.identity) : _.values(obj) : [];
    }, _.size = function(obj) {
        return null == obj ? 0 : isArrayLike(obj) ? obj.length : _.keys(obj).length;
    }, _.partition = function(obj, predicate, context) {
        predicate = cb(predicate, context);
        var pass = [], fail = [];
        return _.each(obj, function(value, key, obj) {
            (predicate(value, key, obj) ? pass : fail).push(value);
        }), [ pass, fail ];
    }, _.first = _.head = _.take = function(array, n, guard) {
        return null != array ? null == n || guard ? array[0] : _.initial(array, array.length - n) : void 0;
    }, _.initial = function(array, n, guard) {
        return slice.call(array, 0, Math.max(0, array.length - (null == n || guard ? 1 : n)));
    }, _.last = function(array, n, guard) {
        return null != array ? null == n || guard ? array[array.length - 1] : _.rest(array, Math.max(0, array.length - n)) : void 0;
    }, _.rest = _.tail = _.drop = function(array, n, guard) {
        return slice.call(array, null == n || guard ? 1 : n);
    }, _.compact = function(array) {
        return _.filter(array, _.identity);
    };
    var flatten = function(input, shallow, strict, startIndex) {
        for (var output = [], idx = 0, i = startIndex || 0, length = getLength(input); length > i; i++) {
            var value = input[i];
            if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
                shallow || (value = flatten(value, shallow, strict));
                var j = 0, len = value.length;
                for (output.length += len; len > j; ) output[idx++] = value[j++];
            } else strict || (output[idx++] = value);
        }
        return output;
    };
    _.flatten = function(array, shallow) {
        return flatten(array, shallow, !1);
    }, _.without = function(array) {
        return _.difference(array, slice.call(arguments, 1));
    }, _.uniq = _.unique = function(array, isSorted, iteratee, context) {
        _.isBoolean(isSorted) || (context = iteratee, iteratee = isSorted, isSorted = !1), 
        null != iteratee && (iteratee = cb(iteratee, context));
        for (var result = [], seen = [], i = 0, length = getLength(array); length > i; i++) {
            var value = array[i], computed = iteratee ? iteratee(value, i, array) : value;
            isSorted ? (i && seen === computed || result.push(value), seen = computed) : iteratee ? _.contains(seen, computed) || (seen.push(computed), 
            result.push(value)) : _.contains(result, value) || result.push(value);
        }
        return result;
    }, _.union = function() {
        return _.uniq(flatten(arguments, !0, !0));
    }, _.intersection = function(array) {
        for (var result = [], argsLength = arguments.length, i = 0, length = getLength(array); length > i; i++) {
            var item = array[i];
            if (!_.contains(result, item)) {
                for (var j = 1; argsLength > j && _.contains(arguments[j], item); j++) ;
                j === argsLength && result.push(item);
            }
        }
        return result;
    }, _.difference = function(array) {
        var rest = flatten(arguments, !0, !0, 1);
        return _.filter(array, function(value) {
            return !_.contains(rest, value);
        });
    }, _.zip = function() {
        return _.unzip(arguments);
    }, _.unzip = function(array) {
        for (var length = array && _.max(array, getLength).length || 0, result = Array(length), index = 0; length > index; index++) result[index] = _.pluck(array, index);
        return result;
    }, _.object = function(list, values) {
        for (var result = {}, i = 0, length = getLength(list); length > i; i++) values ? result[list[i]] = values[i] : result[list[i][0]] = list[i][1];
        return result;
    }, _.findIndex = createPredicateIndexFinder(1), _.findLastIndex = createPredicateIndexFinder(-1), 
    _.sortedIndex = function(array, obj, iteratee, context) {
        iteratee = cb(iteratee, context, 1);
        for (var value = iteratee(obj), low = 0, high = getLength(array); high > low; ) {
            var mid = Math.floor((low + high) / 2);
            iteratee(array[mid]) < value ? low = mid + 1 : high = mid;
        }
        return low;
    }, _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex), _.lastIndexOf = createIndexFinder(-1, _.findLastIndex), 
    _.range = function(start, stop, step) {
        null == stop && (stop = start || 0, start = 0), step = step || 1;
        for (var length = Math.max(Math.ceil((stop - start) / step), 0), range = Array(length), idx = 0; length > idx; idx++, 
        start += step) range[idx] = start;
        return range;
    };
    var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
        if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
        var self = baseCreate(sourceFunc.prototype), result = sourceFunc.apply(self, args);
        return _.isObject(result) ? result : self;
    };
    _.bind = function(func, context) {
        if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
        if (!_.isFunction(func)) throw new TypeError("Bind must be called on a function");
        var args = slice.call(arguments, 2), bound = function() {
            return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
        };
        return bound;
    }, _.partial = function(func) {
        var boundArgs = slice.call(arguments, 1), bound = function() {
            for (var position = 0, length = boundArgs.length, args = Array(length), i = 0; length > i; i++) args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
            for (;position < arguments.length; ) args.push(arguments[position++]);
            return executeBound(func, bound, this, this, args);
        };
        return bound;
    }, _.bindAll = function(obj) {
        var i, key, length = arguments.length;
        if (1 >= length) throw new Error("bindAll must be passed function names");
        for (i = 1; length > i; i++) key = arguments[i], obj[key] = _.bind(obj[key], obj);
        return obj;
    }, _.memoize = function(func, hasher) {
        var memoize = function(key) {
            var cache = memoize.cache, address = "" + (hasher ? hasher.apply(this, arguments) : key);
            return _.has(cache, address) || (cache[address] = func.apply(this, arguments)), 
            cache[address];
        };
        return memoize.cache = {}, memoize;
    }, _.delay = function(func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function() {
            return func.apply(null, args);
        }, wait);
    }, _.defer = _.partial(_.delay, _, 1), _.throttle = function(func, wait, options) {
        var context, args, result, timeout = null, previous = 0;
        options || (options = {});
        var later = function() {
            previous = options.leading === !1 ? 0 : _.now(), timeout = null, result = func.apply(context, args), 
            timeout || (context = args = null);
        };
        return function() {
            var now = _.now();
            previous || options.leading !== !1 || (previous = now);
            var remaining = wait - (now - previous);
            return context = this, args = arguments, 0 >= remaining || remaining > wait ? (timeout && (clearTimeout(timeout), 
            timeout = null), previous = now, result = func.apply(context, args), timeout || (context = args = null)) : timeout || options.trailing === !1 || (timeout = setTimeout(later, remaining)), 
            result;
        };
    }, _.debounce = function(func, wait, immediate) {
        var timeout, args, context, timestamp, result, later = function() {
            var last = _.now() - timestamp;
            wait > last && last >= 0 ? timeout = setTimeout(later, wait - last) : (timeout = null, 
            immediate || (result = func.apply(context, args), timeout || (context = args = null)));
        };
        return function() {
            context = this, args = arguments, timestamp = _.now();
            var callNow = immediate && !timeout;
            return timeout || (timeout = setTimeout(later, wait)), callNow && (result = func.apply(context, args), 
            context = args = null), result;
        };
    }, _.wrap = function(func, wrapper) {
        return _.partial(wrapper, func);
    }, _.negate = function(predicate) {
        return function() {
            return !predicate.apply(this, arguments);
        };
    }, _.compose = function() {
        var args = arguments, start = args.length - 1;
        return function() {
            for (var i = start, result = args[start].apply(this, arguments); i--; ) result = args[i].call(this, result);
            return result;
        };
    }, _.after = function(times, func) {
        return function() {
            return --times < 1 ? func.apply(this, arguments) : void 0;
        };
    }, _.before = function(times, func) {
        var memo;
        return function() {
            return --times > 0 && (memo = func.apply(this, arguments)), 1 >= times && (func = null), 
            memo;
        };
    }, _.once = _.partial(_.before, 2);
    var hasEnumBug = !{
        toString: null
    }.propertyIsEnumerable("toString"), nonEnumerableProps = [ "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString" ];
    _.keys = function(obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj) _.has(obj, key) && keys.push(key);
        return hasEnumBug && collectNonEnumProps(obj, keys), keys;
    }, _.allKeys = function(obj) {
        if (!_.isObject(obj)) return [];
        var keys = [];
        for (var key in obj) keys.push(key);
        return hasEnumBug && collectNonEnumProps(obj, keys), keys;
    }, _.values = function(obj) {
        for (var keys = _.keys(obj), length = keys.length, values = Array(length), i = 0; length > i; i++) values[i] = obj[keys[i]];
        return values;
    }, _.mapObject = function(obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        for (var currentKey, keys = _.keys(obj), length = keys.length, results = {}, index = 0; length > index; index++) currentKey = keys[index], 
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
        return results;
    }, _.pairs = function(obj) {
        for (var keys = _.keys(obj), length = keys.length, pairs = Array(length), i = 0; length > i; i++) pairs[i] = [ keys[i], obj[keys[i]] ];
        return pairs;
    }, _.invert = function(obj) {
        for (var result = {}, keys = _.keys(obj), i = 0, length = keys.length; length > i; i++) result[obj[keys[i]]] = keys[i];
        return result;
    }, _.functions = _.methods = function(obj) {
        var names = [];
        for (var key in obj) _.isFunction(obj[key]) && names.push(key);
        return names.sort();
    }, _.extend = createAssigner(_.allKeys), _.extendOwn = _.assign = createAssigner(_.keys), 
    _.findKey = function(obj, predicate, context) {
        predicate = cb(predicate, context);
        for (var key, keys = _.keys(obj), i = 0, length = keys.length; length > i; i++) if (key = keys[i], 
        predicate(obj[key], key, obj)) return key;
    }, _.pick = function(object, oiteratee, context) {
        var iteratee, keys, result = {}, obj = object;
        if (null == obj) return result;
        _.isFunction(oiteratee) ? (keys = _.allKeys(obj), iteratee = optimizeCb(oiteratee, context)) : (keys = flatten(arguments, !1, !1, 1), 
        iteratee = function(value, key, obj) {
            return key in obj;
        }, obj = Object(obj));
        for (var i = 0, length = keys.length; length > i; i++) {
            var key = keys[i], value = obj[key];
            iteratee(value, key, obj) && (result[key] = value);
        }
        return result;
    }, _.omit = function(obj, iteratee, context) {
        if (_.isFunction(iteratee)) iteratee = _.negate(iteratee); else {
            var keys = _.map(flatten(arguments, !1, !1, 1), String);
            iteratee = function(value, key) {
                return !_.contains(keys, key);
            };
        }
        return _.pick(obj, iteratee, context);
    }, _.defaults = createAssigner(_.allKeys, !0), _.create = function(prototype, props) {
        var result = baseCreate(prototype);
        return props && _.extendOwn(result, props), result;
    }, _.clone = function(obj) {
        return _.isObject(obj) ? _.isArray(obj) ? obj.slice() : _.extend({}, obj) : obj;
    }, _.tap = function(obj, interceptor) {
        return interceptor(obj), obj;
    }, _.isMatch = function(object, attrs) {
        var keys = _.keys(attrs), length = keys.length;
        if (null == object) return !length;
        for (var obj = Object(object), i = 0; length > i; i++) {
            var key = keys[i];
            if (attrs[key] !== obj[key] || !(key in obj)) return !1;
        }
        return !0;
    };
    var eq = function(a, b, aStack, bStack) {
        if (a === b) return 0 !== a || 1 / a === 1 / b;
        if (null == a || null == b) return a === b;
        a instanceof _ && (a = a._wrapped), b instanceof _ && (b = b._wrapped);
        var className = toString.call(a);
        if (className !== toString.call(b)) return !1;
        switch (className) {
          case "[object RegExp]":
          case "[object String]":
            return "" + a == "" + b;

          case "[object Number]":
            return +a !== +a ? +b !== +b : 0 === +a ? 1 / +a === 1 / b : +a === +b;

          case "[object Date]":
          case "[object Boolean]":
            return +a === +b;
        }
        var areArrays = "[object Array]" === className;
        if (!areArrays) {
            if ("object" != typeof a || "object" != typeof b) return !1;
            var aCtor = a.constructor, bCtor = b.constructor;
            if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && "constructor" in a && "constructor" in b) return !1;
        }
        aStack = aStack || [], bStack = bStack || [];
        for (var length = aStack.length; length--; ) if (aStack[length] === a) return bStack[length] === b;
        if (aStack.push(a), bStack.push(b), areArrays) {
            if (length = a.length, length !== b.length) return !1;
            for (;length--; ) if (!eq(a[length], b[length], aStack, bStack)) return !1;
        } else {
            var key, keys = _.keys(a);
            if (length = keys.length, _.keys(b).length !== length) return !1;
            for (;length--; ) if (key = keys[length], !_.has(b, key) || !eq(a[key], b[key], aStack, bStack)) return !1;
        }
        return aStack.pop(), bStack.pop(), !0;
    };
    _.isEqual = function(a, b) {
        return eq(a, b);
    }, _.isEmpty = function(obj) {
        return null == obj ? !0 : isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) ? 0 === obj.length : 0 === _.keys(obj).length;
    }, _.isElement = function(obj) {
        return !(!obj || 1 !== obj.nodeType);
    }, _.isArray = nativeIsArray || function(obj) {
        return "[object Array]" === toString.call(obj);
    }, _.isObject = function(obj) {
        var type = typeof obj;
        return "function" === type || "object" === type && !!obj;
    }, _.each([ "Arguments", "Function", "String", "Number", "Date", "RegExp", "Error" ], function(name) {
        _["is" + name] = function(obj) {
            return toString.call(obj) === "[object " + name + "]";
        };
    }), _.isArguments(arguments) || (_.isArguments = function(obj) {
        return _.has(obj, "callee");
    }), "function" != typeof /./ && "object" != typeof Int8Array && (_.isFunction = function(obj) {
        return "function" == typeof obj || !1;
    }), _.isFinite = function(obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj));
    }, _.isNaN = function(obj) {
        return _.isNumber(obj) && obj !== +obj;
    }, _.isBoolean = function(obj) {
        return obj === !0 || obj === !1 || "[object Boolean]" === toString.call(obj);
    }, _.isNull = function(obj) {
        return null === obj;
    }, _.isUndefined = function(obj) {
        return void 0 === obj;
    }, _.has = function(obj, key) {
        return null != obj && hasOwnProperty.call(obj, key);
    }, _.noConflict = function() {
        return root._ = previousUnderscore, this;
    }, _.identity = function(value) {
        return value;
    }, _.constant = function(value) {
        return function() {
            return value;
        };
    }, _.noop = function() {}, _.property = property, _.propertyOf = function(obj) {
        return null == obj ? function() {} : function(key) {
            return obj[key];
        };
    }, _.matcher = _.matches = function(attrs) {
        return attrs = _.extendOwn({}, attrs), function(obj) {
            return _.isMatch(obj, attrs);
        };
    }, _.times = function(n, iteratee, context) {
        var accum = Array(Math.max(0, n));
        iteratee = optimizeCb(iteratee, context, 1);
        for (var i = 0; n > i; i++) accum[i] = iteratee(i);
        return accum;
    }, _.random = function(min, max) {
        return null == max && (max = min, min = 0), min + Math.floor(Math.random() * (max - min + 1));
    }, _.now = Date.now || function() {
        return new Date().getTime();
    };
    var escapeMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    }, unescapeMap = _.invert(escapeMap), createEscaper = function(map) {
        var escaper = function(match) {
            return map[match];
        }, source = "(?:" + _.keys(map).join("|") + ")", testRegexp = RegExp(source), replaceRegexp = RegExp(source, "g");
        return function(string) {
            return string = null == string ? "" : "" + string, testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
        };
    };
    _.escape = createEscaper(escapeMap), _.unescape = createEscaper(unescapeMap), _.result = function(object, property, fallback) {
        var value = null == object ? void 0 : object[property];
        return void 0 === value && (value = fallback), _.isFunction(value) ? value.call(object) : value;
    };
    var idCounter = 0;
    _.uniqueId = function(prefix) {
        var id = ++idCounter + "";
        return prefix ? prefix + id : id;
    }, _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var noMatch = /(.)^/, escapes = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, escaper = /\\|'|\r|\n|\u2028|\u2029/g, escapeChar = function(match) {
        return "\\" + escapes[match];
    };
    _.template = function(text, settings, oldSettings) {
        !settings && oldSettings && (settings = oldSettings), settings = _.defaults({}, settings, _.templateSettings);
        var matcher = RegExp([ (settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source ].join("|") + "|$", "g"), index = 0, source = "__p+='";
        text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
            return source += text.slice(index, offset).replace(escaper, escapeChar), index = offset + match.length, 
            escape ? source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'" : interpolate ? source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'" : evaluate && (source += "';\n" + evaluate + "\n__p+='"), 
            match;
        }), source += "';\n", settings.variable || (source = "with(obj||{}){\n" + source + "}\n"), 
        source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
        try {
            var render = new Function(settings.variable || "obj", "_", source);
        } catch (e) {
            throw e.source = source, e;
        }
        var template = function(data) {
            return render.call(this, data, _);
        }, argument = settings.variable || "obj";
        return template.source = "function(" + argument + "){\n" + source + "}", template;
    }, _.chain = function(obj) {
        var instance = _(obj);
        return instance._chain = !0, instance;
    };
    var result = function(instance, obj) {
        return instance._chain ? _(obj).chain() : obj;
    };
    _.mixin = function(obj) {
        _.each(_.functions(obj), function(name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function() {
                var args = [ this._wrapped ];
                return push.apply(args, arguments), result(this, func.apply(_, args));
            };
        });
    }, _.mixin(_), _.each([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            var obj = this._wrapped;
            return method.apply(obj, arguments), "shift" !== name && "splice" !== name || 0 !== obj.length || delete obj[0], 
            result(this, obj);
        };
    }), _.each([ "concat", "join", "slice" ], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            return result(this, method.apply(this._wrapped, arguments));
        };
    }), _.prototype.value = function() {
        return this._wrapped;
    }, _.prototype.valueOf = _.prototype.toJSON = _.prototype.value, _.prototype.toString = function() {
        return "" + this._wrapped;
    }, "function" == typeof define && define.amd && define("underscore", [], function() {
        return _;
    });
}.call(this), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");

+function($) {
    "use strict";
    var version = $.fn.jquery.split(" ")[0].split(".");
    if (version[0] < 2 && version[1] < 9 || 1 == version[0] && 9 == version[1] && version[2] < 1 || version[0] > 2) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3");
}(jQuery), +function($) {
    "use strict";
    function transitionEnd() {
        var el = document.createElement("bootstrap"), transEndEventNames = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var name in transEndEventNames) if (void 0 !== el.style[name]) return {
            end: transEndEventNames[name]
        };
        return !1;
    }
    $.fn.emulateTransitionEnd = function(duration) {
        var called = !1, $el = this;
        $(this).one("bsTransitionEnd", function() {
            called = !0;
        });
        var callback = function() {
            called || $($el).trigger($.support.transition.end);
        };
        return setTimeout(callback, duration), this;
    }, $(function() {
        $.support.transition = transitionEnd(), $.support.transition && ($.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function(e) {
                return $(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0;
            }
        });
    });
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.alert");
            data || $this.data("bs.alert", data = new Alert(this)), "string" == typeof option && data[option].call($this);
        });
    }
    var dismiss = '[data-dismiss="alert"]', Alert = function(el) {
        $(el).on("click", dismiss, this.close);
    };
    Alert.VERSION = "3.3.6", Alert.TRANSITION_DURATION = 150, Alert.prototype.close = function(e) {
        function removeElement() {
            $parent.detach().trigger("closed.bs.alert").remove();
        }
        var $this = $(this), selector = $this.attr("data-target");
        selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ""));
        var $parent = $(selector);
        e && e.preventDefault(), $parent.length || ($parent = $this.closest(".alert")), 
        $parent.trigger(e = $.Event("close.bs.alert")), e.isDefaultPrevented() || ($parent.removeClass("in"), 
        $.support.transition && $parent.hasClass("fade") ? $parent.one("bsTransitionEnd", removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement());
    };
    var old = $.fn.alert;
    $.fn.alert = Plugin, $.fn.alert.Constructor = Alert, $.fn.alert.noConflict = function() {
        return $.fn.alert = old, this;
    }, $(document).on("click.bs.alert.data-api", dismiss, Alert.prototype.close);
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.button"), options = "object" == typeof option && option;
            data || $this.data("bs.button", data = new Button(this, options)), "toggle" == option ? data.toggle() : option && data.setState(option);
        });
    }
    var Button = function(element, options) {
        this.$element = $(element), this.options = $.extend({}, Button.DEFAULTS, options), 
        this.isLoading = !1;
    };
    Button.VERSION = "3.3.6", Button.DEFAULTS = {
        loadingText: "loading..."
    }, Button.prototype.setState = function(state) {
        var d = "disabled", $el = this.$element, val = $el.is("input") ? "val" : "html", data = $el.data();
        state += "Text", null == data.resetText && $el.data("resetText", $el[val]()), setTimeout($.proxy(function() {
            $el[val](null == data[state] ? this.options[state] : data[state]), "loadingText" == state ? (this.isLoading = !0, 
            $el.addClass(d).attr(d, d)) : this.isLoading && (this.isLoading = !1, $el.removeClass(d).removeAttr(d));
        }, this), 0);
    }, Button.prototype.toggle = function() {
        var changed = !0, $parent = this.$element.closest('[data-toggle="buttons"]');
        if ($parent.length) {
            var $input = this.$element.find("input");
            "radio" == $input.prop("type") ? ($input.prop("checked") && (changed = !1), $parent.find(".active").removeClass("active"), 
            this.$element.addClass("active")) : "checkbox" == $input.prop("type") && ($input.prop("checked") !== this.$element.hasClass("active") && (changed = !1), 
            this.$element.toggleClass("active")), $input.prop("checked", this.$element.hasClass("active")), 
            changed && $input.trigger("change");
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active");
    };
    var old = $.fn.button;
    $.fn.button = Plugin, $.fn.button.Constructor = Button, $.fn.button.noConflict = function() {
        return $.fn.button = old, this;
    }, $(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        var $btn = $(e.target);
        $btn.hasClass("btn") || ($btn = $btn.closest(".btn")), Plugin.call($btn, "toggle"), 
        $(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]') || e.preventDefault();
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        $(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type));
    });
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.carousel"), options = $.extend({}, Carousel.DEFAULTS, $this.data(), "object" == typeof option && option), action = "string" == typeof option ? option : options.slide;
            data || $this.data("bs.carousel", data = new Carousel(this, options)), "number" == typeof option ? data.to(option) : action ? data[action]() : options.interval && data.pause().cycle();
        });
    }
    var Carousel = function(element, options) {
        this.$element = $(element), this.$indicators = this.$element.find(".carousel-indicators"), 
        this.options = options, this.paused = null, this.sliding = null, this.interval = null, 
        this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", $.proxy(this.keydown, this)), 
        "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", $.proxy(this.pause, this)).on("mouseleave.bs.carousel", $.proxy(this.cycle, this));
    };
    Carousel.VERSION = "3.3.6", Carousel.TRANSITION_DURATION = 600, Carousel.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, Carousel.prototype.keydown = function(e) {
        if (!/input|textarea/i.test(e.target.tagName)) {
            switch (e.which) {
              case 37:
                this.prev();
                break;

              case 39:
                this.next();
                break;

              default:
                return;
            }
            e.preventDefault();
        }
    }, Carousel.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval)), 
        this;
    }, Carousel.prototype.getItemIndex = function(item) {
        return this.$items = item.parent().children(".item"), this.$items.index(item || this.$active);
    }, Carousel.prototype.getItemForDirection = function(direction, active) {
        var activeIndex = this.getItemIndex(active), willWrap = "prev" == direction && 0 === activeIndex || "next" == direction && activeIndex == this.$items.length - 1;
        if (willWrap && !this.options.wrap) return active;
        var delta = "prev" == direction ? -1 : 1, itemIndex = (activeIndex + delta) % this.$items.length;
        return this.$items.eq(itemIndex);
    }, Carousel.prototype.to = function(pos) {
        var that = this, activeIndex = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return pos > this.$items.length - 1 || 0 > pos ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            that.to(pos);
        }) : activeIndex == pos ? this.pause().cycle() : this.slide(pos > activeIndex ? "next" : "prev", this.$items.eq(pos));
    }, Carousel.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && $.support.transition && (this.$element.trigger($.support.transition.end), 
        this.cycle(!0)), this.interval = clearInterval(this.interval), this;
    }, Carousel.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next");
    }, Carousel.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev");
    }, Carousel.prototype.slide = function(type, next) {
        var $active = this.$element.find(".item.active"), $next = next || this.getItemForDirection(type, $active), isCycling = this.interval, direction = "next" == type ? "left" : "right", that = this;
        if ($next.hasClass("active")) return this.sliding = !1;
        var relatedTarget = $next[0], slideEvent = $.Event("slide.bs.carousel", {
            relatedTarget: relatedTarget,
            direction: direction
        });
        if (this.$element.trigger(slideEvent), !slideEvent.isDefaultPrevented()) {
            if (this.sliding = !0, isCycling && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
                $nextIndicator && $nextIndicator.addClass("active");
            }
            var slidEvent = $.Event("slid.bs.carousel", {
                relatedTarget: relatedTarget,
                direction: direction
            });
            return $.support.transition && this.$element.hasClass("slide") ? ($next.addClass(type), 
            $next[0].offsetWidth, $active.addClass(direction), $next.addClass(direction), $active.one("bsTransitionEnd", function() {
                $next.removeClass([ type, direction ].join(" ")).addClass("active"), $active.removeClass([ "active", direction ].join(" ")), 
                that.sliding = !1, setTimeout(function() {
                    that.$element.trigger(slidEvent);
                }, 0);
            }).emulateTransitionEnd(Carousel.TRANSITION_DURATION)) : ($active.removeClass("active"), 
            $next.addClass("active"), this.sliding = !1, this.$element.trigger(slidEvent)), 
            isCycling && this.cycle(), this;
        }
    };
    var old = $.fn.carousel;
    $.fn.carousel = Plugin, $.fn.carousel.Constructor = Carousel, $.fn.carousel.noConflict = function() {
        return $.fn.carousel = old, this;
    };
    var clickHandler = function(e) {
        var href, $this = $(this), $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""));
        if ($target.hasClass("carousel")) {
            var options = $.extend({}, $target.data(), $this.data()), slideIndex = $this.attr("data-slide-to");
            slideIndex && (options.interval = !1), Plugin.call($target, options), slideIndex && $target.data("bs.carousel").to(slideIndex), 
            e.preventDefault();
        }
    };
    $(document).on("click.bs.carousel.data-api", "[data-slide]", clickHandler).on("click.bs.carousel.data-api", "[data-slide-to]", clickHandler), 
    $(window).on("load", function() {
        $('[data-ride="carousel"]').each(function() {
            var $carousel = $(this);
            Plugin.call($carousel, $carousel.data());
        });
    });
}(jQuery), +function($) {
    "use strict";
    function getTargetFromTrigger($trigger) {
        var href, target = $trigger.attr("data-target") || (href = $trigger.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "");
        return $(target);
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.collapse"), options = $.extend({}, Collapse.DEFAULTS, $this.data(), "object" == typeof option && option);
            !data && options.toggle && /show|hide/.test(option) && (options.toggle = !1), data || $this.data("bs.collapse", data = new Collapse(this, options)), 
            "string" == typeof option && data[option]();
        });
    }
    var Collapse = function(element, options) {
        this.$element = $(element), this.options = $.extend({}, Collapse.DEFAULTS, options), 
        this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],[data-toggle="collapse"][data-target="#' + element.id + '"]'), 
        this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), 
        this.options.toggle && this.toggle();
    };
    Collapse.VERSION = "3.3.6", Collapse.TRANSITION_DURATION = 350, Collapse.DEFAULTS = {
        toggle: !0
    }, Collapse.prototype.dimension = function() {
        var hasWidth = this.$element.hasClass("width");
        return hasWidth ? "width" : "height";
    }, Collapse.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var activesData, actives = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(actives && actives.length && (activesData = actives.data("bs.collapse"), activesData && activesData.transitioning))) {
                var startEvent = $.Event("show.bs.collapse");
                if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                    actives && actives.length && (Plugin.call(actives, "hide"), activesData || actives.data("bs.collapse", null));
                    var dimension = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[dimension](0).attr("aria-expanded", !0), 
                    this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var complete = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[dimension](""), 
                        this.transitioning = 0, this.$element.trigger("shown.bs.collapse");
                    };
                    if (!$.support.transition) return complete.call(this);
                    var scrollSize = $.camelCase([ "scroll", dimension ].join("-"));
                    this.$element.one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
                }
            }
        }
    }, Collapse.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var startEvent = $.Event("hide.bs.collapse");
            if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                var dimension = this.dimension();
                this.$element[dimension](this.$element[dimension]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), 
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var complete = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
                };
                return $.support.transition ? void this.$element[dimension](0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION) : complete.call(this);
            }
        }
    }, Collapse.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    }, Collapse.prototype.getParent = function() {
        return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function(i, element) {
            var $element = $(element);
            this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
        }, this)).end();
    }, Collapse.prototype.addAriaAndCollapsedClass = function($element, $trigger) {
        var isOpen = $element.hasClass("in");
        $element.attr("aria-expanded", isOpen), $trigger.toggleClass("collapsed", !isOpen).attr("aria-expanded", isOpen);
    };
    var old = $.fn.collapse;
    $.fn.collapse = Plugin, $.fn.collapse.Constructor = Collapse, $.fn.collapse.noConflict = function() {
        return $.fn.collapse = old, this;
    }, $(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(e) {
        var $this = $(this);
        $this.attr("data-target") || e.preventDefault();
        var $target = getTargetFromTrigger($this), data = $target.data("bs.collapse"), option = data ? "toggle" : $this.data();
        Plugin.call($target, option);
    });
}(jQuery), +function($) {
    "use strict";
    function getParent($this) {
        var selector = $this.attr("data-target");
        selector || (selector = $this.attr("href"), selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ""));
        var $parent = selector && $(selector);
        return $parent && $parent.length ? $parent : $this.parent();
    }
    function clearMenus(e) {
        e && 3 === e.which || ($(backdrop).remove(), $(toggle).each(function() {
            var $this = $(this), $parent = getParent($this), relatedTarget = {
                relatedTarget: this
            };
            $parent.hasClass("open") && (e && "click" == e.type && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target) || ($parent.trigger(e = $.Event("hide.bs.dropdown", relatedTarget)), 
            e.isDefaultPrevented() || ($this.attr("aria-expanded", "false"), $parent.removeClass("open").trigger($.Event("hidden.bs.dropdown", relatedTarget)))));
        }));
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.dropdown");
            data || $this.data("bs.dropdown", data = new Dropdown(this)), "string" == typeof option && data[option].call($this);
        });
    }
    var backdrop = ".dropdown-backdrop", toggle = '[data-toggle="dropdown"]', Dropdown = function(element) {
        $(element).on("click.bs.dropdown", this.toggle);
    };
    Dropdown.VERSION = "3.3.6", Dropdown.prototype.toggle = function(e) {
        var $this = $(this);
        if (!$this.is(".disabled, :disabled")) {
            var $parent = getParent($this), isActive = $parent.hasClass("open");
            if (clearMenus(), !isActive) {
                "ontouchstart" in document.documentElement && !$parent.closest(".navbar-nav").length && $(document.createElement("div")).addClass("dropdown-backdrop").insertAfter($(this)).on("click", clearMenus);
                var relatedTarget = {
                    relatedTarget: this
                };
                if ($parent.trigger(e = $.Event("show.bs.dropdown", relatedTarget)), e.isDefaultPrevented()) return;
                $this.trigger("focus").attr("aria-expanded", "true"), $parent.toggleClass("open").trigger($.Event("shown.bs.dropdown", relatedTarget));
            }
            return !1;
        }
    }, Dropdown.prototype.keydown = function(e) {
        if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
            var $this = $(this);
            if (e.preventDefault(), e.stopPropagation(), !$this.is(".disabled, :disabled")) {
                var $parent = getParent($this), isActive = $parent.hasClass("open");
                if (!isActive && 27 != e.which || isActive && 27 == e.which) return 27 == e.which && $parent.find(toggle).trigger("focus"), 
                $this.trigger("click");
                var desc = " li:not(.disabled):visible a", $items = $parent.find(".dropdown-menu" + desc);
                if ($items.length) {
                    var index = $items.index(e.target);
                    38 == e.which && index > 0 && index--, 40 == e.which && index < $items.length - 1 && index++, 
                    ~index || (index = 0), $items.eq(index).trigger("focus");
                }
            }
        }
    };
    var old = $.fn.dropdown;
    $.fn.dropdown = Plugin, $.fn.dropdown.Constructor = Dropdown, $.fn.dropdown.noConflict = function() {
        return $.fn.dropdown = old, this;
    }, $(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
        e.stopPropagation();
    }).on("click.bs.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", toggle, Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", Dropdown.prototype.keydown);
}(jQuery), +function($) {
    "use strict";
    function Plugin(option, _relatedTarget) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.modal"), options = $.extend({}, Modal.DEFAULTS, $this.data(), "object" == typeof option && option);
            data || $this.data("bs.modal", data = new Modal(this, options)), "string" == typeof option ? data[option](_relatedTarget) : options.show && data.show(_relatedTarget);
        });
    }
    var Modal = function(element, options) {
        this.options = options, this.$body = $(document.body), this.$element = $(element), 
        this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, 
        this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, 
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, $.proxy(function() {
            this.$element.trigger("loaded.bs.modal");
        }, this));
    };
    Modal.VERSION = "3.3.6", Modal.TRANSITION_DURATION = 300, Modal.BACKDROP_TRANSITION_DURATION = 150, 
    Modal.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, Modal.prototype.toggle = function(_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget);
    }, Modal.prototype.show = function(_relatedTarget) {
        var that = this, e = $.Event("show.bs.modal", {
            relatedTarget: _relatedTarget
        });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, 
        this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), 
        this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', $.proxy(this.hide, this)), 
        this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            that.$element.one("mouseup.dismiss.bs.modal", function(e) {
                $(e.target).is(that.$element) && (that.ignoreBackdropClick = !0);
            });
        }), this.backdrop(function() {
            var transition = $.support.transition && that.$element.hasClass("fade");
            that.$element.parent().length || that.$element.appendTo(that.$body), that.$element.show().scrollTop(0), 
            that.adjustDialog(), transition && that.$element[0].offsetWidth, that.$element.addClass("in"), 
            that.enforceFocus();
            var e = $.Event("shown.bs.modal", {
                relatedTarget: _relatedTarget
            });
            transition ? that.$dialog.one("bsTransitionEnd", function() {
                that.$element.trigger("focus").trigger(e);
            }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger("focus").trigger(e);
        }));
    }, Modal.prototype.hide = function(e) {
        e && e.preventDefault(), e = $.Event("hide.bs.modal"), this.$element.trigger(e), 
        this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), 
        $(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), 
        this.$dialog.off("mousedown.dismiss.bs.modal"), $.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal());
    }, Modal.prototype.enforceFocus = function() {
        $(document).off("focusin.bs.modal").on("focusin.bs.modal", $.proxy(function(e) {
            this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.trigger("focus");
        }, this));
    }, Modal.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", $.proxy(function(e) {
            27 == e.which && this.hide();
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
    }, Modal.prototype.resize = function() {
        this.isShown ? $(window).on("resize.bs.modal", $.proxy(this.handleUpdate, this)) : $(window).off("resize.bs.modal");
    }, Modal.prototype.hideModal = function() {
        var that = this;
        this.$element.hide(), this.backdrop(function() {
            that.$body.removeClass("modal-open"), that.resetAdjustments(), that.resetScrollbar(), 
            that.$element.trigger("hidden.bs.modal");
        });
    }, Modal.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
    }, Modal.prototype.backdrop = function(callback) {
        var that = this, animate = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate;
            if (this.$backdrop = $(document.createElement("div")).addClass("modal-backdrop " + animate).appendTo(this.$body), 
            this.$element.on("click.dismiss.bs.modal", $.proxy(function(e) {
                return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
            }, this)), doAnimate && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), 
            !callback) return;
            doAnimate ? this.$backdrop.one("bsTransitionEnd", callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var callbackRemove = function() {
                that.removeBackdrop(), callback && callback();
            };
            $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
        } else callback && callback();
    }, Modal.prototype.handleUpdate = function() {
        this.adjustDialog();
    }, Modal.prototype.adjustDialog = function() {
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ""
        });
    }, Modal.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        });
    }, Modal.prototype.checkScrollbar = function() {
        var fullWindowWidth = window.innerWidth;
        if (!fullWindowWidth) {
            var documentElementRect = document.documentElement.getBoundingClientRect();
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth, this.scrollbarWidth = this.measureScrollbar();
    }, Modal.prototype.setScrollbar = function() {
        var bodyPad = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", bodyPad + this.scrollbarWidth);
    }, Modal.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad);
    }, Modal.prototype.measureScrollbar = function() {
        var scrollDiv = document.createElement("div");
        scrollDiv.className = "modal-scrollbar-measure", this.$body.append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        return this.$body[0].removeChild(scrollDiv), scrollbarWidth;
    };
    var old = $.fn.modal;
    $.fn.modal = Plugin, $.fn.modal.Constructor = Modal, $.fn.modal.noConflict = function() {
        return $.fn.modal = old, this;
    }, $(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
        var $this = $(this), href = $this.attr("href"), $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, "")), option = $target.data("bs.modal") ? "toggle" : $.extend({
            remote: !/#/.test(href) && href
        }, $target.data(), $this.data());
        $this.is("a") && e.preventDefault(), $target.one("show.bs.modal", function(showEvent) {
            showEvent.isDefaultPrevented() || $target.one("hidden.bs.modal", function() {
                $this.is(":visible") && $this.trigger("focus");
            });
        }), Plugin.call($target, option, this);
    });
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.tooltip"), options = "object" == typeof option && option;
            (data || !/destroy|hide/.test(option)) && (data || $this.data("bs.tooltip", data = new Tooltip(this, options)), 
            "string" == typeof option && data[option]());
        });
    }
    var Tooltip = function(element, options) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, 
        this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", element, options);
    };
    Tooltip.VERSION = "3.3.6", Tooltip.TRANSITION_DURATION = 150, Tooltip.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, Tooltip.prototype.init = function(type, element, options) {
        if (this.enabled = !0, this.type = type, this.$element = $(element), this.options = this.getOptions(options), 
        this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), 
        this.inState = {
            click: !1,
            hover: !1,
            focus: !1
        }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var triggers = this.options.trigger.split(" "), i = triggers.length; i--; ) {
            var trigger = triggers[i];
            if ("click" == trigger) this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this)); else if ("manual" != trigger) {
                var eventIn = "hover" == trigger ? "mouseenter" : "focusin", eventOut = "hover" == trigger ? "mouseleave" : "focusout";
                this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this)), 
                this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this));
            }
        }
        this.options.selector ? this._options = $.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle();
    }, Tooltip.prototype.getDefaults = function() {
        return Tooltip.DEFAULTS;
    }, Tooltip.prototype.getOptions = function(options) {
        return options = $.extend({}, this.getDefaults(), this.$element.data(), options), 
        options.delay && "number" == typeof options.delay && (options.delay = {
            show: options.delay,
            hide: options.delay
        }), options;
    }, Tooltip.prototype.getDelegateOptions = function() {
        var options = {}, defaults = this.getDefaults();
        return this._options && $.each(this._options, function(key, value) {
            defaults[key] != value && (options[key] = value);
        }), options;
    }, Tooltip.prototype.enter = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
        return self || (self = new this.constructor(obj.currentTarget, this.getDelegateOptions()), 
        $(obj.currentTarget).data("bs." + this.type, self)), obj instanceof $.Event && (self.inState["focusin" == obj.type ? "focus" : "hover"] = !0), 
        self.tip().hasClass("in") || "in" == self.hoverState ? void (self.hoverState = "in") : (clearTimeout(self.timeout), 
        self.hoverState = "in", self.options.delay && self.options.delay.show ? void (self.timeout = setTimeout(function() {
            "in" == self.hoverState && self.show();
        }, self.options.delay.show)) : self.show());
    }, Tooltip.prototype.isInStateTrue = function() {
        for (var key in this.inState) if (this.inState[key]) return !0;
        return !1;
    }, Tooltip.prototype.leave = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
        return self || (self = new this.constructor(obj.currentTarget, this.getDelegateOptions()), 
        $(obj.currentTarget).data("bs." + this.type, self)), obj instanceof $.Event && (self.inState["focusout" == obj.type ? "focus" : "hover"] = !1), 
        self.isInStateTrue() ? void 0 : (clearTimeout(self.timeout), self.hoverState = "out", 
        self.options.delay && self.options.delay.hide ? void (self.timeout = setTimeout(function() {
            "out" == self.hoverState && self.hide();
        }, self.options.delay.hide)) : self.hide());
    }, Tooltip.prototype.show = function() {
        var e = $.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !inDom) return;
            var that = this, $tip = this.tip(), tipId = this.getUID(this.type);
            this.setContent(), $tip.attr("id", tipId), this.$element.attr("aria-describedby", tipId), 
            this.options.animation && $tip.addClass("fade");
            var placement = "function" == typeof this.options.placement ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement, autoToken = /\s?auto?\s?/i, autoPlace = autoToken.test(placement);
            autoPlace && (placement = placement.replace(autoToken, "") || "top"), $tip.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(placement).data("bs." + this.type, this), this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element), 
            this.$element.trigger("inserted.bs." + this.type);
            var pos = this.getPosition(), actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight;
            if (autoPlace) {
                var orgPlacement = placement, viewportDim = this.getPosition(this.$viewport);
                placement = "bottom" == placement && pos.bottom + actualHeight > viewportDim.bottom ? "top" : "top" == placement && pos.top - actualHeight < viewportDim.top ? "bottom" : "right" == placement && pos.right + actualWidth > viewportDim.width ? "left" : "left" == placement && pos.left - actualWidth < viewportDim.left ? "right" : placement, 
                $tip.removeClass(orgPlacement).addClass(placement);
            }
            var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
            this.applyPlacement(calculatedOffset, placement);
            var complete = function() {
                var prevHoverState = that.hoverState;
                that.$element.trigger("shown.bs." + that.type), that.hoverState = null, "out" == prevHoverState && that.leave(that);
            };
            $.support.transition && this.$tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
        }
    }, Tooltip.prototype.applyPlacement = function(offset, placement) {
        var $tip = this.tip(), width = $tip[0].offsetWidth, height = $tip[0].offsetHeight, marginTop = parseInt($tip.css("margin-top"), 10), marginLeft = parseInt($tip.css("margin-left"), 10);
        isNaN(marginTop) && (marginTop = 0), isNaN(marginLeft) && (marginLeft = 0), offset.top += marginTop, 
        offset.left += marginLeft, $.offset.setOffset($tip[0], $.extend({
            using: function(props) {
                $tip.css({
                    top: Math.round(props.top),
                    left: Math.round(props.left)
                });
            }
        }, offset), 0), $tip.addClass("in");
        var actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight;
        "top" == placement && actualHeight != height && (offset.top = offset.top + height - actualHeight);
        var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
        delta.left ? offset.left += delta.left : offset.top += delta.top;
        var isVertical = /top|bottom/.test(placement), arrowDelta = isVertical ? 2 * delta.left - width + actualWidth : 2 * delta.top - height + actualHeight, arrowOffsetPosition = isVertical ? "offsetWidth" : "offsetHeight";
        $tip.offset(offset), this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
    }, Tooltip.prototype.replaceArrow = function(delta, dimension, isVertical) {
        this.arrow().css(isVertical ? "left" : "top", 50 * (1 - delta / dimension) + "%").css(isVertical ? "top" : "left", "");
    }, Tooltip.prototype.setContent = function() {
        var $tip = this.tip(), title = this.getTitle();
        $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title), $tip.removeClass("fade in top bottom left right");
    }, Tooltip.prototype.hide = function(callback) {
        function complete() {
            "in" != that.hoverState && $tip.detach(), that.$element.removeAttr("aria-describedby").trigger("hidden.bs." + that.type), 
            callback && callback();
        }
        var that = this, $tip = $(this.$tip), e = $.Event("hide.bs." + this.type);
        return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : ($tip.removeClass("in"), 
        $.support.transition && $tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete(), 
        this.hoverState = null, this);
    }, Tooltip.prototype.fixTitle = function() {
        var $e = this.$element;
        ($e.attr("title") || "string" != typeof $e.attr("data-original-title")) && $e.attr("data-original-title", $e.attr("title") || "").attr("title", "");
    }, Tooltip.prototype.hasContent = function() {
        return this.getTitle();
    }, Tooltip.prototype.getPosition = function($element) {
        $element = $element || this.$element;
        var el = $element[0], isBody = "BODY" == el.tagName, elRect = el.getBoundingClientRect();
        null == elRect.width && (elRect = $.extend({}, elRect, {
            width: elRect.right - elRect.left,
            height: elRect.bottom - elRect.top
        }));
        var elOffset = isBody ? {
            top: 0,
            left: 0
        } : $element.offset(), scroll = {
            scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()
        }, outerDims = isBody ? {
            width: $(window).width(),
            height: $(window).height()
        } : null;
        return $.extend({}, elRect, scroll, outerDims, elOffset);
    }, Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
        return "bottom" == placement ? {
            top: pos.top + pos.height,
            left: pos.left + pos.width / 2 - actualWidth / 2
        } : "top" == placement ? {
            top: pos.top - actualHeight,
            left: pos.left + pos.width / 2 - actualWidth / 2
        } : "left" == placement ? {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left - actualWidth
        } : {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left + pos.width
        };
    }, Tooltip.prototype.getViewportAdjustedDelta = function(placement, pos, actualWidth, actualHeight) {
        var delta = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return delta;
        var viewportPadding = this.options.viewport && this.options.viewport.padding || 0, viewportDimensions = this.getPosition(this.$viewport);
        if (/right|left/.test(placement)) {
            var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll, bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
            topEdgeOffset < viewportDimensions.top ? delta.top = viewportDimensions.top - topEdgeOffset : bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height && (delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset);
        } else {
            var leftEdgeOffset = pos.left - viewportPadding, rightEdgeOffset = pos.left + viewportPadding + actualWidth;
            leftEdgeOffset < viewportDimensions.left ? delta.left = viewportDimensions.left - leftEdgeOffset : rightEdgeOffset > viewportDimensions.right && (delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset);
        }
        return delta;
    }, Tooltip.prototype.getTitle = function() {
        var title, $e = this.$element, o = this.options;
        return title = $e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call($e[0]) : o.title);
    }, Tooltip.prototype.getUID = function(prefix) {
        do prefix += ~~(1e6 * Math.random()); while (document.getElementById(prefix));
        return prefix;
    }, Tooltip.prototype.tip = function() {
        if (!this.$tip && (this.$tip = $(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip;
    }, Tooltip.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    }, Tooltip.prototype.enable = function() {
        this.enabled = !0;
    }, Tooltip.prototype.disable = function() {
        this.enabled = !1;
    }, Tooltip.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
    }, Tooltip.prototype.toggle = function(e) {
        var self = this;
        e && (self = $(e.currentTarget).data("bs." + this.type), self || (self = new this.constructor(e.currentTarget, this.getDelegateOptions()), 
        $(e.currentTarget).data("bs." + this.type, self))), e ? (self.inState.click = !self.inState.click, 
        self.isInStateTrue() ? self.enter(self) : self.leave(self)) : self.tip().hasClass("in") ? self.leave(self) : self.enter(self);
    }, Tooltip.prototype.destroy = function() {
        var that = this;
        clearTimeout(this.timeout), this.hide(function() {
            that.$element.off("." + that.type).removeData("bs." + that.type), that.$tip && that.$tip.detach(), 
            that.$tip = null, that.$arrow = null, that.$viewport = null;
        });
    };
    var old = $.fn.tooltip;
    $.fn.tooltip = Plugin, $.fn.tooltip.Constructor = Tooltip, $.fn.tooltip.noConflict = function() {
        return $.fn.tooltip = old, this;
    };
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.popover"), options = "object" == typeof option && option;
            (data || !/destroy|hide/.test(option)) && (data || $this.data("bs.popover", data = new Popover(this, options)), 
            "string" == typeof option && data[option]());
        });
    }
    var Popover = function(element, options) {
        this.init("popover", element, options);
    };
    if (!$.fn.tooltip) throw new Error("Popover requires tooltip.js");
    Popover.VERSION = "3.3.6", Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype), Popover.prototype.constructor = Popover, 
    Popover.prototype.getDefaults = function() {
        return Popover.DEFAULTS;
    }, Popover.prototype.setContent = function() {
        var $tip = this.tip(), title = this.getTitle(), content = this.getContent();
        $tip.find(".popover-title")[this.options.html ? "html" : "text"](title), $tip.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof content ? "html" : "append" : "text"](content), 
        $tip.removeClass("fade top bottom left right in"), $tip.find(".popover-title").html() || $tip.find(".popover-title").hide();
    }, Popover.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    }, Popover.prototype.getContent = function() {
        var $e = this.$element, o = this.options;
        return $e.attr("data-content") || ("function" == typeof o.content ? o.content.call($e[0]) : o.content);
    }, Popover.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow");
    };
    var old = $.fn.popover;
    $.fn.popover = Plugin, $.fn.popover.Constructor = Popover, $.fn.popover.noConflict = function() {
        return $.fn.popover = old, this;
    };
}(jQuery), +function($) {
    "use strict";
    function ScrollSpy(element, options) {
        this.$body = $(document.body), this.$scrollElement = $($(element).is(document.body) ? window : element), 
        this.options = $.extend({}, ScrollSpy.DEFAULTS, options), this.selector = (this.options.target || "") + " .nav li > a", 
        this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, 
        this.$scrollElement.on("scroll.bs.scrollspy", $.proxy(this.process, this)), this.refresh(), 
        this.process();
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.scrollspy"), options = "object" == typeof option && option;
            data || $this.data("bs.scrollspy", data = new ScrollSpy(this, options)), "string" == typeof option && data[option]();
        });
    }
    ScrollSpy.VERSION = "3.3.6", ScrollSpy.DEFAULTS = {
        offset: 10
    }, ScrollSpy.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
    }, ScrollSpy.prototype.refresh = function() {
        var that = this, offsetMethod = "offset", offsetBase = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), 
        $.isWindow(this.$scrollElement[0]) || (offsetMethod = "position", offsetBase = this.$scrollElement.scrollTop()), 
        this.$body.find(this.selector).map(function() {
            var $el = $(this), href = $el.data("target") || $el.attr("href"), $href = /^#./.test(href) && $(href);
            return $href && $href.length && $href.is(":visible") && [ [ $href[offsetMethod]().top + offsetBase, href ] ] || null;
        }).sort(function(a, b) {
            return a[0] - b[0];
        }).each(function() {
            that.offsets.push(this[0]), that.targets.push(this[1]);
        });
    }, ScrollSpy.prototype.process = function() {
        var i, scrollTop = this.$scrollElement.scrollTop() + this.options.offset, scrollHeight = this.getScrollHeight(), maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height(), offsets = this.offsets, targets = this.targets, activeTarget = this.activeTarget;
        if (this.scrollHeight != scrollHeight && this.refresh(), scrollTop >= maxScroll) return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
        if (activeTarget && scrollTop < offsets[0]) return this.activeTarget = null, this.clear();
        for (i = offsets.length; i--; ) activeTarget != targets[i] && scrollTop >= offsets[i] && (void 0 === offsets[i + 1] || scrollTop < offsets[i + 1]) && this.activate(targets[i]);
    }, ScrollSpy.prototype.activate = function(target) {
        this.activeTarget = target, this.clear();
        var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]', active = $(selector).parents("li").addClass("active");
        active.parent(".dropdown-menu").length && (active = active.closest("li.dropdown").addClass("active")), 
        active.trigger("activate.bs.scrollspy");
    }, ScrollSpy.prototype.clear = function() {
        $(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
    };
    var old = $.fn.scrollspy;
    $.fn.scrollspy = Plugin, $.fn.scrollspy.Constructor = ScrollSpy, $.fn.scrollspy.noConflict = function() {
        return $.fn.scrollspy = old, this;
    }, $(window).on("load.bs.scrollspy.data-api", function() {
        $('[data-spy="scroll"]').each(function() {
            var $spy = $(this);
            Plugin.call($spy, $spy.data());
        });
    });
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.tab");
            data || $this.data("bs.tab", data = new Tab(this)), "string" == typeof option && data[option]();
        });
    }
    var Tab = function(element) {
        this.element = $(element);
    };
    Tab.VERSION = "3.3.6", Tab.TRANSITION_DURATION = 150, Tab.prototype.show = function() {
        var $this = this.element, $ul = $this.closest("ul:not(.dropdown-menu)"), selector = $this.data("target");
        if (selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")), 
        !$this.parent("li").hasClass("active")) {
            var $previous = $ul.find(".active:last a"), hideEvent = $.Event("hide.bs.tab", {
                relatedTarget: $this[0]
            }), showEvent = $.Event("show.bs.tab", {
                relatedTarget: $previous[0]
            });
            if ($previous.trigger(hideEvent), $this.trigger(showEvent), !showEvent.isDefaultPrevented() && !hideEvent.isDefaultPrevented()) {
                var $target = $(selector);
                this.activate($this.closest("li"), $ul), this.activate($target, $target.parent(), function() {
                    $previous.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: $this[0]
                    }), $this.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: $previous[0]
                    });
                });
            }
        }
    }, Tab.prototype.activate = function(element, container, callback) {
        function next() {
            $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), 
            element.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), 
            transition ? (element[0].offsetWidth, element.addClass("in")) : element.removeClass("fade"), 
            element.parent(".dropdown-menu").length && element.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), 
            callback && callback();
        }
        var $active = container.find("> .active"), transition = callback && $.support.transition && ($active.length && $active.hasClass("fade") || !!container.find("> .fade").length);
        $active.length && transition ? $active.one("bsTransitionEnd", next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next(), 
        $active.removeClass("in");
    };
    var old = $.fn.tab;
    $.fn.tab = Plugin, $.fn.tab.Constructor = Tab, $.fn.tab.noConflict = function() {
        return $.fn.tab = old, this;
    };
    var clickHandler = function(e) {
        e.preventDefault(), Plugin.call($(this), "show");
    };
    $(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', clickHandler).on("click.bs.tab.data-api", '[data-toggle="pill"]', clickHandler);
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.affix"), options = "object" == typeof option && option;
            data || $this.data("bs.affix", data = new Affix(this, options)), "string" == typeof option && data[option]();
        });
    }
    var Affix = function(element, options) {
        this.options = $.extend({}, Affix.DEFAULTS, options), this.$target = $(this.options.target).on("scroll.bs.affix.data-api", $.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", $.proxy(this.checkPositionWithEventLoop, this)), 
        this.$element = $(element), this.affixed = null, this.unpin = null, this.pinnedOffset = null, 
        this.checkPosition();
    };
    Affix.VERSION = "3.3.6", Affix.RESET = "affix affix-top affix-bottom", Affix.DEFAULTS = {
        offset: 0,
        target: window
    }, Affix.prototype.getState = function(scrollHeight, height, offsetTop, offsetBottom) {
        var scrollTop = this.$target.scrollTop(), position = this.$element.offset(), targetHeight = this.$target.height();
        if (null != offsetTop && "top" == this.affixed) return offsetTop > scrollTop ? "top" : !1;
        if ("bottom" == this.affixed) return null != offsetTop ? scrollTop + this.unpin <= position.top ? !1 : "bottom" : scrollHeight - offsetBottom >= scrollTop + targetHeight ? !1 : "bottom";
        var initializing = null == this.affixed, colliderTop = initializing ? scrollTop : position.top, colliderHeight = initializing ? targetHeight : height;
        return null != offsetTop && offsetTop >= scrollTop ? "top" : null != offsetBottom && colliderTop + colliderHeight >= scrollHeight - offsetBottom ? "bottom" : !1;
    }, Affix.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(Affix.RESET).addClass("affix");
        var scrollTop = this.$target.scrollTop(), position = this.$element.offset();
        return this.pinnedOffset = position.top - scrollTop;
    }, Affix.prototype.checkPositionWithEventLoop = function() {
        setTimeout($.proxy(this.checkPosition, this), 1);
    }, Affix.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var height = this.$element.height(), offset = this.options.offset, offsetTop = offset.top, offsetBottom = offset.bottom, scrollHeight = Math.max($(document).height(), $(document.body).height());
            "object" != typeof offset && (offsetBottom = offsetTop = offset), "function" == typeof offsetTop && (offsetTop = offset.top(this.$element)), 
            "function" == typeof offsetBottom && (offsetBottom = offset.bottom(this.$element));
            var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);
            if (this.affixed != affix) {
                null != this.unpin && this.$element.css("top", "");
                var affixType = "affix" + (affix ? "-" + affix : ""), e = $.Event(affixType + ".bs.affix");
                if (this.$element.trigger(e), e.isDefaultPrevented()) return;
                this.affixed = affix, this.unpin = "bottom" == affix ? this.getPinnedOffset() : null, 
                this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace("affix", "affixed") + ".bs.affix");
            }
            "bottom" == affix && this.$element.offset({
                top: scrollHeight - height - offsetBottom
            });
        }
    };
    var old = $.fn.affix;
    $.fn.affix = Plugin, $.fn.affix.Constructor = Affix, $.fn.affix.noConflict = function() {
        return $.fn.affix = old, this;
    }, $(window).on("load", function() {
        $('[data-spy="affix"]').each(function() {
            var $spy = $(this), data = $spy.data();
            data.offset = data.offset || {}, null != data.offsetBottom && (data.offset.bottom = data.offsetBottom), 
            null != data.offsetTop && (data.offset.top = data.offsetTop), Plugin.call($spy, data);
        });
    });
}(jQuery), function(c) {
    var k = {
        init: function(a) {
            var b = {
                color: c(this).css("background-color"),
                reach: 20,
                speed: 1e3,
                pause: 0,
                glow: !0,
                repeat: !0,
                onHover: !1
            };
            return c(this).css({
                "-moz-outline-radius": c(this).css("border-top-left-radius"),
                "-webkit-outline-radius": c(this).css("border-top-left-radius"),
                "outline-radius": c(this).css("border-top-left-radius")
            }), a && c.extend(b, a), b.color = c("<div style='background:" + b.color + "'></div>").css("background-color"), 
            !0 !== b.repeat && !isNaN(b.repeat) && 0 < b.repeat && (b.repeat -= 1), this.each(function() {
                b.onHover ? c(this).bind("mouseover", function() {
                    g(b, this, 0);
                }).bind("mouseout", function() {
                    c(this).pulsate("destroy");
                }) : g(b, this, 0);
            });
        },
        destroy: function() {
            return this.each(function() {
                clearTimeout(this.timer), c(this).css("outline", 0);
            });
        }
    }, g = function(a, b, d) {
        var e = a.reach;
        d = d > e ? 0 : d;
        var h = (e - d) / e, f = a.color.split(","), h = "rgba(" + f[0].split("(")[1] + "," + f[1] + "," + f[2].split(")")[0] + "," + h + ")", f = {
            outline: "2px solid " + h
        };
        a.glow && (f["box-shadow"] = "0px 0px " + parseInt(d / 1.5) + "px " + h), f["outline-offset"] = d + "px", 
        c(b).css(f), b.timer && clearTimeout(b.timer), b.timer = setTimeout(function() {
            if (d >= e && !a.repeat) return c(b).pulsate("destroy"), !1;
            if (d >= e && !0 !== a.repeat && !isNaN(a.repeat) && 0 < a.repeat) a.repeat -= 1; else if (a.pause && d >= e) return l(a, b, d + 1), 
            !1;
            g(a, b, d + 1);
        }, a.speed / e);
    }, l = function(a, b, c) {
        innerfunc = function() {
            g(a, b, c);
        }, b.timer = setTimeout(innerfunc, a.pause);
    };
    c.fn.pulsate = function(a) {
        return k[a] ? k[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? void c.error("Method " + a + " does not exist on jQuery.pulsate") : k.init.apply(this, arguments);
    };
}(jQuery), function(define) {
    define([ "jquery" ], function($) {
        return function() {
            function error(message, title, optionsOverride) {
                return notify({
                    type: toastType.error,
                    iconClass: getOptions().iconClasses.error,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }
            function getContainer(options, create) {
                return options || (options = getOptions()), $container = $("#" + options.containerId), 
                $container.length ? $container : (create && ($container = createContainer(options)), 
                $container);
            }
            function info(message, title, optionsOverride) {
                return notify({
                    type: toastType.info,
                    iconClass: getOptions().iconClasses.info,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }
            function subscribe(callback) {
                listener = callback;
            }
            function success(message, title, optionsOverride) {
                return notify({
                    type: toastType.success,
                    iconClass: getOptions().iconClasses.success,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }
            function warning(message, title, optionsOverride) {
                return notify({
                    type: toastType.warning,
                    iconClass: getOptions().iconClasses.warning,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }
            function clear($toastElement, clearOptions) {
                var options = getOptions();
                $container || getContainer(options), clearToast($toastElement, options, clearOptions) || clearContainer(options);
            }
            function remove($toastElement) {
                var options = getOptions();
                return $container || getContainer(options), $toastElement && 0 === $(":focus", $toastElement).length ? void removeToast($toastElement) : void ($container.children().length && $container.remove());
            }
            function clearContainer(options) {
                for (var toastsToClear = $container.children(), i = toastsToClear.length - 1; i >= 0; i--) clearToast($(toastsToClear[i]), options);
            }
            function clearToast($toastElement, options, clearOptions) {
                var force = clearOptions && clearOptions.force ? clearOptions.force : !1;
                return $toastElement && (force || 0 === $(":focus", $toastElement).length) ? ($toastElement[options.hideMethod]({
                    duration: options.hideDuration,
                    easing: options.hideEasing,
                    complete: function() {
                        removeToast($toastElement);
                    }
                }), !0) : !1;
            }
            function createContainer(options) {
                return $container = $("<div/>").attr("id", options.containerId).addClass(options.positionClass).attr("aria-live", "polite").attr("role", "alert"), 
                $container.appendTo($(options.target)), $container;
            }
            function getDefaults() {
                return {
                    tapToDismiss: !0,
                    toastClass: "toast",
                    containerId: "toast-container",
                    debug: !1,
                    showMethod: "fadeIn",
                    showDuration: 300,
                    showEasing: "swing",
                    onShown: void 0,
                    hideMethod: "fadeOut",
                    hideDuration: 1e3,
                    hideEasing: "swing",
                    onHidden: void 0,
                    closeMethod: !1,
                    closeDuration: !1,
                    closeEasing: !1,
                    extendedTimeOut: 1e3,
                    iconClasses: {
                        error: "toast-error",
                        info: "toast-info",
                        success: "toast-success",
                        warning: "toast-warning"
                    },
                    iconClass: "toast-info",
                    positionClass: "toast-top-right",
                    timeOut: 5e3,
                    titleClass: "toast-title",
                    messageClass: "toast-message",
                    escapeHtml: !1,
                    target: "body",
                    closeHtml: '<button type="button">&times;</button>',
                    newestOnTop: !0,
                    preventDuplicates: !1,
                    progressBar: !1
                };
            }
            function publish(args) {
                listener && listener(args);
            }
            function notify(map) {
                function escapeHtml(source) {
                    return null == source && (source = ""), new String(source).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                }
                function personalizeToast() {
                    setIcon(), setTitle(), setMessage(), setCloseButton(), setProgressBar(), setSequence();
                }
                function handleEvents() {
                    $toastElement.hover(stickAround, delayedHideToast), !options.onclick && options.tapToDismiss && $toastElement.click(hideToast), 
                    options.closeButton && $closeElement && $closeElement.click(function(event) {
                        event.stopPropagation ? event.stopPropagation() : void 0 !== event.cancelBubble && event.cancelBubble !== !0 && (event.cancelBubble = !0), 
                        hideToast(!0);
                    }), options.onclick && $toastElement.click(function(event) {
                        options.onclick(event), hideToast();
                    });
                }
                function displayToast() {
                    $toastElement.hide(), $toastElement[options.showMethod]({
                        duration: options.showDuration,
                        easing: options.showEasing,
                        complete: options.onShown
                    }), options.timeOut > 0 && (intervalId = setTimeout(hideToast, options.timeOut), 
                    progressBar.maxHideTime = parseFloat(options.timeOut), progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime, 
                    options.progressBar && (progressBar.intervalId = setInterval(updateProgress, 10)));
                }
                function setIcon() {
                    map.iconClass && $toastElement.addClass(options.toastClass).addClass(iconClass);
                }
                function setSequence() {
                    options.newestOnTop ? $container.prepend($toastElement) : $container.append($toastElement);
                }
                function setTitle() {
                    map.title && ($titleElement.append(options.escapeHtml ? escapeHtml(map.title) : map.title).addClass(options.titleClass), 
                    $toastElement.append($titleElement));
                }
                function setMessage() {
                    map.message && ($messageElement.append(options.escapeHtml ? escapeHtml(map.message) : map.message).addClass(options.messageClass), 
                    $toastElement.append($messageElement));
                }
                function setCloseButton() {
                    options.closeButton && ($closeElement.addClass("toast-close-button").attr("role", "button"), 
                    $toastElement.prepend($closeElement));
                }
                function setProgressBar() {
                    options.progressBar && ($progressElement.addClass("toast-progress"), $toastElement.prepend($progressElement));
                }
                function shouldExit(options, map) {
                    if (options.preventDuplicates) {
                        if (map.message === previousToast) return !0;
                        previousToast = map.message;
                    }
                    return !1;
                }
                function hideToast(override) {
                    var method = override && options.closeMethod !== !1 ? options.closeMethod : options.hideMethod, duration = override && options.closeDuration !== !1 ? options.closeDuration : options.hideDuration, easing = override && options.closeEasing !== !1 ? options.closeEasing : options.hideEasing;
                    return !$(":focus", $toastElement).length || override ? (clearTimeout(progressBar.intervalId), 
                    $toastElement[method]({
                        duration: duration,
                        easing: easing,
                        complete: function() {
                            removeToast($toastElement), options.onHidden && "hidden" !== response.state && options.onHidden(), 
                            response.state = "hidden", response.endTime = new Date(), publish(response);
                        }
                    })) : void 0;
                }
                function delayedHideToast() {
                    (options.timeOut > 0 || options.extendedTimeOut > 0) && (intervalId = setTimeout(hideToast, options.extendedTimeOut), 
                    progressBar.maxHideTime = parseFloat(options.extendedTimeOut), progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime);
                }
                function stickAround() {
                    clearTimeout(intervalId), progressBar.hideEta = 0, $toastElement.stop(!0, !0)[options.showMethod]({
                        duration: options.showDuration,
                        easing: options.showEasing
                    });
                }
                function updateProgress() {
                    var percentage = (progressBar.hideEta - new Date().getTime()) / progressBar.maxHideTime * 100;
                    $progressElement.width(percentage + "%");
                }
                var options = getOptions(), iconClass = map.iconClass || options.iconClass;
                if ("undefined" != typeof map.optionsOverride && (options = $.extend(options, map.optionsOverride), 
                iconClass = map.optionsOverride.iconClass || iconClass), !shouldExit(options, map)) {
                    toastId++, $container = getContainer(options, !0);
                    var intervalId = null, $toastElement = $("<div/>"), $titleElement = $("<div/>"), $messageElement = $("<div/>"), $progressElement = $("<div/>"), $closeElement = $(options.closeHtml), progressBar = {
                        intervalId: null,
                        hideEta: null,
                        maxHideTime: null
                    }, response = {
                        toastId: toastId,
                        state: "visible",
                        startTime: new Date(),
                        options: options,
                        map: map
                    };
                    return personalizeToast(), displayToast(), handleEvents(), publish(response), options.debug && console && console.log(response), 
                    $toastElement;
                }
            }
            function getOptions() {
                return $.extend({}, getDefaults(), toastr.options);
            }
            function removeToast($toastElement) {
                $container || ($container = getContainer()), $toastElement.is(":visible") || ($toastElement.remove(), 
                $toastElement = null, 0 === $container.children().length && ($container.remove(), 
                previousToast = void 0));
            }
            var $container, listener, previousToast, toastId = 0, toastType = {
                error: "error",
                info: "info",
                success: "success",
                warning: "warning"
            }, toastr = {
                clear: clear,
                remove: remove,
                error: error,
                getContainer: getContainer,
                info: info,
                options: {},
                subscribe: subscribe,
                success: success,
                version: "2.1.2",
                warning: warning
            };
            return toastr;
        }();
    });
}("function" == typeof define && define.amd ? define : function(deps, factory) {
    "undefined" != typeof module && module.exports ? module.exports = factory(require("jquery")) : window.toastr = factory(window.jQuery);
}), function(root, factory) {
    "use strict";
    var moment;
    if ("object" == typeof exports) {
        try {
            moment = require("moment");
        } catch (e) {}
        module.exports = factory(moment);
    } else "function" == typeof define && define.amd ? define(function(req) {
        var id = "moment";
        try {
            moment = req(id);
        } catch (e) {}
        return factory(moment);
    }) : root.Pikaday = factory(root.moment);
}(this, function(moment) {
    "use strict";
    var hasMoment = "function" == typeof moment, hasEventListeners = !!window.addEventListener, document = window.document, sto = window.setTimeout, addEvent = function(el, e, callback, capture) {
        hasEventListeners ? el.addEventListener(e, callback, !!capture) : el.attachEvent("on" + e, callback);
    }, removeEvent = function(el, e, callback, capture) {
        hasEventListeners ? el.removeEventListener(e, callback, !!capture) : el.detachEvent("on" + e, callback);
    }, fireEvent = function(el, eventName, data) {
        var ev;
        document.createEvent ? (ev = document.createEvent("HTMLEvents"), ev.initEvent(eventName, !0, !1), 
        ev = extend(ev, data), el.dispatchEvent(ev)) : document.createEventObject && (ev = document.createEventObject(), 
        ev = extend(ev, data), el.fireEvent("on" + eventName, ev));
    }, trim = function(str) {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }, hasClass = function(el, cn) {
        return -1 !== (" " + el.className + " ").indexOf(" " + cn + " ");
    }, addClass = function(el, cn) {
        hasClass(el, cn) || (el.className = "" === el.className ? cn : el.className + " " + cn);
    }, removeClass = function(el, cn) {
        el.className = trim((" " + el.className + " ").replace(" " + cn + " ", " "));
    }, isArray = function(obj) {
        return /Array/.test(Object.prototype.toString.call(obj));
    }, isDate = function(obj) {
        return /Date/.test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
    }, isWeekend = function(date) {
        var day = date.getDay();
        return 0 === day || 6 === day;
    }, isLeapYear = function(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }, getDaysInMonth = function(year, month) {
        return [ 31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][month];
    }, setToStartOfDay = function(date) {
        isDate(date) && date.setHours(0, 0, 0, 0);
    }, compareDates = function(a, b) {
        return a.getTime() === b.getTime();
    }, extend = function(to, from, overwrite) {
        var prop, hasProp;
        for (prop in from) hasProp = void 0 !== to[prop], hasProp && "object" == typeof from[prop] && null !== from[prop] && void 0 === from[prop].nodeName ? isDate(from[prop]) ? overwrite && (to[prop] = new Date(from[prop].getTime())) : isArray(from[prop]) ? overwrite && (to[prop] = from[prop].slice(0)) : to[prop] = extend({}, from[prop], overwrite) : (overwrite || !hasProp) && (to[prop] = from[prop]);
        return to;
    }, adjustCalendar = function(calendar) {
        return calendar.month < 0 && (calendar.year -= Math.ceil(Math.abs(calendar.month) / 12), 
        calendar.month += 12), calendar.month > 11 && (calendar.year += Math.floor(Math.abs(calendar.month) / 12), 
        calendar.month -= 12), calendar;
    }, defaults = {
        field: null,
        bound: void 0,
        position: "bottom left",
        reposition: !0,
        format: "YYYY-MM-DD",
        defaultDate: null,
        setDefaultDate: !1,
        firstDay: 0,
        minDate: null,
        maxDate: null,
        yearRange: 10,
        showWeekNumber: !1,
        minYear: 0,
        maxYear: 9999,
        minMonth: void 0,
        maxMonth: void 0,
        startRange: null,
        endRange: null,
        isRTL: !1,
        yearSuffix: "",
        showMonthAfterYear: !1,
        numberOfMonths: 1,
        mainCalendar: "left",
        container: void 0,
        i18n: {
            previousMonth: "Previous Month",
            nextMonth: "Next Month",
            months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
            weekdays: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
            weekdaysShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]
        },
        theme: null,
        onSelect: null,
        onOpen: null,
        onClose: null,
        onDraw: null
    }, renderDayName = function(opts, day, abbr) {
        for (day += opts.firstDay; day >= 7; ) day -= 7;
        return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
    }, renderDay = function(opts) {
        if (opts.isEmpty) return '<td class="is-empty"></td>';
        var arr = [];
        return opts.isDisabled && arr.push("is-disabled"), opts.isToday && arr.push("is-today"), 
        opts.isSelected && arr.push("is-selected"), opts.isInRange && arr.push("is-inrange"), 
        opts.isStartRange && arr.push("is-startrange"), opts.isEndRange && arr.push("is-endrange"), 
        '<td data-day="' + opts.day + '" class="' + arr.join(" ") + '"><button class="pika-button pika-day" type="button" data-pika-year="' + opts.year + '" data-pika-month="' + opts.month + '" data-pika-day="' + opts.day + '">' + opts.day + "</button></td>";
    }, renderWeek = function(d, m, y) {
        var onejan = new Date(y, 0, 1), weekNum = Math.ceil(((new Date(y, m, d) - onejan) / 864e5 + onejan.getDay() + 1) / 7);
        return '<td class="pika-week">' + weekNum + "</td>";
    }, renderRow = function(days, isRTL) {
        return "<tr>" + (isRTL ? days.reverse() : days).join("") + "</tr>";
    }, renderBody = function(rows) {
        return "<tbody>" + rows.join("") + "</tbody>";
    }, renderHead = function(opts) {
        var i, arr = [];
        for (opts.showWeekNumber && arr.push("<th></th>"), i = 0; 7 > i; i++) arr.push('<th scope="col"><abbr title="' + renderDayName(opts, i) + '">' + renderDayName(opts, i, !0) + "</abbr></th>");
        return "<thead>" + (opts.isRTL ? arr.reverse() : arr).join("") + "</thead>";
    }, renderTitle = function(instance, c, year, month, refYear) {
        var i, j, arr, monthHtml, yearHtml, opts = instance._o, isMinYear = year === opts.minYear, isMaxYear = year === opts.maxYear, html = '<div class="pika-title">', prev = !0, next = !0;
        for (arr = [], i = 0; 12 > i; i++) arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' + (i === month ? " selected" : "") + (isMinYear && i < opts.minMonth || isMaxYear && i > opts.maxMonth ? "disabled" : "") + ">" + opts.i18n.months[i] + "</option>");
        for (monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month" tabindex="-1">' + arr.join("") + "</select></div>", 
        isArray(opts.yearRange) ? (i = opts.yearRange[0], j = opts.yearRange[1] + 1) : (i = year - opts.yearRange, 
        j = 1 + year + opts.yearRange), arr = []; j > i && i <= opts.maxYear; i++) i >= opts.minYear && arr.push('<option value="' + i + '"' + (i === year ? " selected" : "") + ">" + i + "</option>");
        return yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + arr.join("") + "</select></div>", 
        html += opts.showMonthAfterYear ? yearHtml + monthHtml : monthHtml + yearHtml, isMinYear && (0 === month || opts.minMonth >= month) && (prev = !1), 
        isMaxYear && (11 === month || opts.maxMonth <= month) && (next = !1), 0 === c && (html += '<button class="pika-prev' + (prev ? "" : " is-disabled") + '" type="button">' + opts.i18n.previousMonth + "</button>"), 
        c === instance._o.numberOfMonths - 1 && (html += '<button class="pika-next' + (next ? "" : " is-disabled") + '" type="button">' + opts.i18n.nextMonth + "</button>"), 
        html += "</div>";
    }, renderTable = function(opts, data) {
        return '<table cellpadding="0" cellspacing="0" class="pika-table">' + renderHead(opts) + renderBody(data) + "</table>";
    }, Pikaday = function(options) {
        var self = this, opts = self.config(options);
        self._onMouseDown = function(e) {
            if (self._v) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if (target) if (hasClass(target, "is-disabled") || (hasClass(target, "pika-button") && !hasClass(target, "is-empty") ? (self.setDate(new Date(target.getAttribute("data-pika-year"), target.getAttribute("data-pika-month"), target.getAttribute("data-pika-day"))), 
                opts.bound && sto(function() {
                    self.hide(), opts.field && opts.field.blur();
                }, 100)) : hasClass(target, "pika-prev") ? self.prevMonth() : hasClass(target, "pika-next") && self.nextMonth()), 
                hasClass(target, "pika-select")) self._c = !0; else {
                    if (!e.preventDefault) return e.returnValue = !1, !1;
                    e.preventDefault();
                }
            }
        }, self._onChange = function(e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            target && (hasClass(target, "pika-select-month") ? self.gotoMonth(target.value) : hasClass(target, "pika-select-year") && self.gotoYear(target.value));
        }, self._onInputChange = function(e) {
            var date;
            e.firedBy !== self && (hasMoment ? (date = moment(opts.field.value, opts.format), 
            date = date && date.isValid() ? date.toDate() : null) : date = new Date(Date.parse(opts.field.value)), 
            isDate(date) && self.setDate(date), self._v || self.show());
        }, self._onInputFocus = function() {
            self.show();
        }, self._onInputClick = function() {
            self.show();
        }, self._onInputBlur = function() {
            var pEl = document.activeElement;
            do if (hasClass(pEl, "pika-single")) return; while (pEl = pEl.parentNode);
            self._c || (self._b = sto(function() {
                self.hide();
            }, 50)), self._c = !1;
        }, self._onClick = function(e) {
            e = e || window.event;
            var target = e.target || e.srcElement, pEl = target;
            if (target) {
                !hasEventListeners && hasClass(target, "pika-select") && (target.onchange || (target.setAttribute("onchange", "return;"), 
                addEvent(target, "change", self._onChange)));
                do if (hasClass(pEl, "pika-single") || pEl === opts.trigger) return; while (pEl = pEl.parentNode);
                self._v && target !== opts.trigger && pEl !== opts.trigger && self.hide();
            }
        }, self.el = document.createElement("div"), self.el.className = "pika-single" + (opts.isRTL ? " is-rtl" : "") + (opts.theme ? " " + opts.theme : ""), 
        addEvent(self.el, "mousedown", self._onMouseDown, !0), addEvent(self.el, "touchend", self._onMouseDown, !0), 
        addEvent(self.el, "change", self._onChange), opts.field && (opts.container ? opts.container.appendChild(self.el) : opts.bound ? document.body.appendChild(self.el) : opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling), 
        addEvent(opts.field, "change", self._onInputChange), opts.defaultDate || (hasMoment && opts.field.value ? opts.defaultDate = moment(opts.field.value, opts.format).toDate() : opts.defaultDate = new Date(Date.parse(opts.field.value)), 
        opts.setDefaultDate = !0));
        var defDate = opts.defaultDate;
        isDate(defDate) ? opts.setDefaultDate ? self.setDate(defDate, !0) : self.gotoDate(defDate) : self.gotoDate(new Date()), 
        opts.bound ? (this.hide(), self.el.className += " is-bound", addEvent(opts.trigger, "click", self._onInputClick), 
        addEvent(opts.trigger, "focus", self._onInputFocus), addEvent(opts.trigger, "blur", self._onInputBlur)) : this.show();
    };
    return Pikaday.prototype = {
        config: function(options) {
            this._o || (this._o = extend({}, defaults, !0));
            var opts = extend(this._o, options, !0);
            opts.isRTL = !!opts.isRTL, opts.field = opts.field && opts.field.nodeName ? opts.field : null, 
            opts.theme = "string" == typeof opts.theme && opts.theme ? opts.theme : null, opts.bound = !!(void 0 !== opts.bound ? opts.field && opts.bound : opts.field), 
            opts.trigger = opts.trigger && opts.trigger.nodeName ? opts.trigger : opts.field, 
            opts.disableWeekends = !!opts.disableWeekends, opts.disableDayFn = "function" == typeof opts.disableDayFn ? opts.disableDayFn : null;
            var nom = parseInt(opts.numberOfMonths, 10) || 1;
            if (opts.numberOfMonths = nom > 4 ? 4 : nom, isDate(opts.minDate) || (opts.minDate = !1), 
            isDate(opts.maxDate) || (opts.maxDate = !1), opts.minDate && opts.maxDate && opts.maxDate < opts.minDate && (opts.maxDate = opts.minDate = !1), 
            opts.minDate && this.setMinDate(opts.minDate), opts.maxDate && this.setMaxDate(opts.maxDate), 
            isArray(opts.yearRange)) {
                var fallback = new Date().getFullYear() - 10;
                opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback, opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
            } else opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults.yearRange, 
            opts.yearRange > 100 && (opts.yearRange = 100);
            return opts;
        },
        toString: function(format) {
            return isDate(this._d) ? hasMoment ? moment(this._d).format(format || this._o.format) : this._d.toDateString() : "";
        },
        getMoment: function() {
            return hasMoment ? moment(this._d) : null;
        },
        setMoment: function(date, preventOnSelect) {
            hasMoment && moment.isMoment(date) && this.setDate(date.toDate(), preventOnSelect);
        },
        getDate: function() {
            return isDate(this._d) ? new Date(this._d.getTime()) : null;
        },
        setDate: function(date, preventOnSelect) {
            if (!date) return this._d = null, this._o.field && (this._o.field.value = "", fireEvent(this._o.field, "change", {
                firedBy: this
            })), this.draw();
            if ("string" == typeof date && (date = new Date(Date.parse(date))), isDate(date)) {
                var min = this._o.minDate, max = this._o.maxDate;
                isDate(min) && min > date ? date = min : isDate(max) && date > max && (date = max), 
                this._d = new Date(date.getTime()), setToStartOfDay(this._d), this.gotoDate(this._d), 
                this._o.field && (this._o.field.value = this.toString(), fireEvent(this._o.field, "change", {
                    firedBy: this
                })), preventOnSelect || "function" != typeof this._o.onSelect || this._o.onSelect.call(this, this.getDate());
            }
        },
        gotoDate: function(date) {
            var newCalendar = !0;
            if (isDate(date)) {
                if (this.calendars) {
                    var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1), lastVisibleDate = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1), visibleDate = date.getTime();
                    lastVisibleDate.setMonth(lastVisibleDate.getMonth() + 1), lastVisibleDate.setDate(lastVisibleDate.getDate() - 1), 
                    newCalendar = visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate;
                }
                newCalendar && (this.calendars = [ {
                    month: date.getMonth(),
                    year: date.getFullYear()
                } ], "right" === this._o.mainCalendar && (this.calendars[0].month += 1 - this._o.numberOfMonths)), 
                this.adjustCalendars();
            }
        },
        adjustCalendars: function() {
            this.calendars[0] = adjustCalendar(this.calendars[0]);
            for (var c = 1; c < this._o.numberOfMonths; c++) this.calendars[c] = adjustCalendar({
                month: this.calendars[0].month + c,
                year: this.calendars[0].year
            });
            this.draw();
        },
        gotoToday: function() {
            this.gotoDate(new Date());
        },
        gotoMonth: function(month) {
            isNaN(month) || (this.calendars[0].month = parseInt(month, 10), this.adjustCalendars());
        },
        nextMonth: function() {
            this.calendars[0].month++, this.adjustCalendars();
        },
        prevMonth: function() {
            this.calendars[0].month--, this.adjustCalendars();
        },
        gotoYear: function(year) {
            isNaN(year) || (this.calendars[0].year = parseInt(year, 10), this.adjustCalendars());
        },
        setMinDate: function(value) {
            setToStartOfDay(value), this._o.minDate = value, this._o.minYear = value.getFullYear(), 
            this._o.minMonth = value.getMonth(), this.draw();
        },
        setMaxDate: function(value) {
            setToStartOfDay(value), this._o.maxDate = value, this._o.maxYear = value.getFullYear(), 
            this._o.maxMonth = value.getMonth(), this.draw();
        },
        setStartRange: function(value) {
            this._o.startRange = value;
        },
        setEndRange: function(value) {
            this._o.endRange = value;
        },
        draw: function(force) {
            if (this._v || force) {
                var opts = this._o, minYear = opts.minYear, maxYear = opts.maxYear, minMonth = opts.minMonth, maxMonth = opts.maxMonth, html = "";
                this._y <= minYear && (this._y = minYear, !isNaN(minMonth) && this._m < minMonth && (this._m = minMonth)), 
                this._y >= maxYear && (this._y = maxYear, !isNaN(maxMonth) && this._m > maxMonth && (this._m = maxMonth));
                for (var c = 0; c < opts.numberOfMonths; c++) html += '<div class="pika-lendar">' + renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year) + this.render(this.calendars[c].year, this.calendars[c].month) + "</div>";
                if (this.el.innerHTML = html, opts.bound && "hidden" !== opts.field.type && sto(function() {
                    opts.trigger.focus();
                }, 1), "function" == typeof this._o.onDraw) {
                    var self = this;
                    sto(function() {
                        self._o.onDraw.call(self);
                    }, 0);
                }
            }
        },
        adjustPosition: function() {
            var field, pEl, width, height, viewportWidth, viewportHeight, scrollTop, left, top, clientRect;
            if (!this._o.container) {
                if (this.el.style.position = "absolute", field = this._o.trigger, pEl = field, width = this.el.offsetWidth, 
                height = this.el.offsetHeight, viewportWidth = window.innerWidth || document.documentElement.clientWidth, 
                viewportHeight = window.innerHeight || document.documentElement.clientHeight, scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop, 
                "function" == typeof field.getBoundingClientRect) clientRect = field.getBoundingClientRect(), 
                left = clientRect.left + window.pageXOffset, top = clientRect.bottom + window.pageYOffset; else for (left = pEl.offsetLeft, 
                top = pEl.offsetTop + pEl.offsetHeight; pEl = pEl.offsetParent; ) left += pEl.offsetLeft, 
                top += pEl.offsetTop;
                (this._o.reposition && left + width > viewportWidth || this._o.position.indexOf("right") > -1 && left - width + field.offsetWidth > 0) && (left = left - width + field.offsetWidth), 
                (this._o.reposition && top + height > viewportHeight + scrollTop || this._o.position.indexOf("top") > -1 && top - height - field.offsetHeight > 0) && (top = top - height - field.offsetHeight), 
                this.el.style.left = left + "px", this.el.style.top = top + "px";
            }
        },
        render: function(year, month) {
            var opts = this._o, now = new Date(), days = getDaysInMonth(year, month), before = new Date(year, month, 1).getDay(), data = [], row = [];
            setToStartOfDay(now), opts.firstDay > 0 && (before -= opts.firstDay, 0 > before && (before += 7));
            for (var cells = days + before, after = cells; after > 7; ) after -= 7;
            cells += 7 - after;
            for (var i = 0, r = 0; cells > i; i++) {
                var day = new Date(year, month, 1 + (i - before)), isSelected = isDate(this._d) ? compareDates(day, this._d) : !1, isToday = compareDates(day, now), isEmpty = before > i || i >= days + before, isStartRange = opts.startRange && compareDates(opts.startRange, day), isEndRange = opts.endRange && compareDates(opts.endRange, day), isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange, isDisabled = opts.minDate && day < opts.minDate || opts.maxDate && day > opts.maxDate || opts.disableWeekends && isWeekend(day) || opts.disableDayFn && opts.disableDayFn(day), dayConfig = {
                    day: 1 + (i - before),
                    month: month,
                    year: year,
                    isSelected: isSelected,
                    isToday: isToday,
                    isDisabled: isDisabled,
                    isEmpty: isEmpty,
                    isStartRange: isStartRange,
                    isEndRange: isEndRange,
                    isInRange: isInRange
                };
                row.push(renderDay(dayConfig)), 7 === ++r && (opts.showWeekNumber && row.unshift(renderWeek(i - before, month, year)), 
                data.push(renderRow(row, opts.isRTL)), row = [], r = 0);
            }
            return renderTable(opts, data);
        },
        isVisible: function() {
            return this._v;
        },
        show: function() {
            this._v || (removeClass(this.el, "is-hidden"), this._v = !0, this.draw(), this._o.bound && (addEvent(document, "click", this._onClick), 
            this.adjustPosition()), "function" == typeof this._o.onOpen && this._o.onOpen.call(this));
        },
        hide: function() {
            var v = this._v;
            v !== !1 && (this._o.bound && removeEvent(document, "click", this._onClick), this.el.style.position = "static", 
            this.el.style.left = "auto", this.el.style.top = "auto", addClass(this.el, "is-hidden"), 
            this._v = !1, void 0 !== v && "function" == typeof this._o.onClose && this._o.onClose.call(this));
        },
        destroy: function() {
            this.hide(), removeEvent(this.el, "mousedown", this._onMouseDown, !0), removeEvent(this.el, "touchend", this._onMouseDown, !0), 
            removeEvent(this.el, "change", this._onChange), this._o.field && (removeEvent(this._o.field, "change", this._onInputChange), 
            this._o.bound && (removeEvent(this._o.trigger, "click", this._onInputClick), removeEvent(this._o.trigger, "focus", this._onInputFocus), 
            removeEvent(this._o.trigger, "blur", this._onInputBlur))), this.el.parentNode && this.el.parentNode.removeChild(this.el);
        }
    }, Pikaday;
}), function($) {
    var delimiter = new Array(), tags_callbacks = new Array();
    $.fn.doAutosize = function(o) {
        var minWidth = $(this).data("minwidth"), maxWidth = $(this).data("maxwidth"), val = "", input = $(this), testSubject = $("#" + $(this).data("tester_id"));
        if (val !== (val = input.val())) {
            var escaped = val.replace(/&/g, "&amp;").replace(/\s/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            testSubject.html(escaped);
            var testerWidth = testSubject.width(), newWidth = testerWidth + o.comfortZone >= minWidth ? testerWidth + o.comfortZone : minWidth, currentWidth = input.width(), isValidWidthChange = currentWidth > newWidth && newWidth >= minWidth || newWidth > minWidth && maxWidth > newWidth;
            isValidWidthChange && input.width(newWidth);
        }
    }, $.fn.resetAutosize = function(options) {
        var minWidth = $(this).data("minwidth") || options.minInputWidth || $(this).width(), maxWidth = $(this).data("maxwidth") || options.maxInputWidth || $(this).closest(".tagsinput").width() - options.inputPadding, input = $(this), testSubject = $("<tester/>").css({
            position: "absolute",
            top: -9999,
            left: -9999,
            width: "auto",
            fontSize: input.css("fontSize"),
            fontFamily: input.css("fontFamily"),
            fontWeight: input.css("fontWeight"),
            letterSpacing: input.css("letterSpacing"),
            whiteSpace: "nowrap"
        }), testerId = $(this).attr("id") + "_autosize_tester";
        !$("#" + testerId).length > 0 && (testSubject.attr("id", testerId), testSubject.appendTo("body")), 
        input.data("minwidth", minWidth), input.data("maxwidth", maxWidth), input.data("tester_id", testerId), 
        input.css("width", minWidth);
    }, $.fn.addTag = function(value, options) {
        return options = jQuery.extend({
            focus: !1,
            callback: !0
        }, options), this.each(function() {
            var id = $(this).attr("id"), tagslist = $(this).val().split(delimiter[id]);
            if ("" == tagslist[0] && (tagslist = new Array()), value = jQuery.trim(value), options.unique) {
                var skipTag = $(this).tagExist(value);
                1 == skipTag && $("#" + id + "_tag").addClass("not_valid");
            } else var skipTag = !1;
            if ("" != value && 1 != skipTag) {
                if ($("<span>").addClass("tag").append($("<span>").text(value).append("&nbsp;&nbsp;"), $("<a>", {
                    href: "#",
                    title: "Removing tag",
                    text: "x"
                }).click(function() {
                    return $("#" + id).removeTag(escape(value));
                })).insertBefore("#" + id + "_addTag"), tagslist.push(value), $("#" + id + "_tag").val(""), 
                options.focus ? $("#" + id + "_tag").focus() : $("#" + id + "_tag").blur(), $.fn.tagsInput.updateTagsField(this, tagslist), 
                options.callback && tags_callbacks[id] && tags_callbacks[id].onAddTag) {
                    var f = tags_callbacks[id].onAddTag;
                    f.call(this, value);
                }
                if (tags_callbacks[id] && tags_callbacks[id].onChange) {
                    var i = tagslist.length, f = tags_callbacks[id].onChange;
                    f.call(this, $(this), tagslist[i - 1]);
                }
            }
        }), !1;
    }, $.fn.removeTag = function(value) {
        return value = unescape(value), this.each(function() {
            var id = $(this).attr("id"), old = $(this).val().split(delimiter[id]);
            for ($("#" + id + "_tagsinput .tag").remove(), str = "", i = 0; i < old.length; i++) old[i] != value && (str = str + delimiter[id] + old[i]);
            if ($.fn.tagsInput.importTags(this, str), tags_callbacks[id] && tags_callbacks[id].onRemoveTag) {
                var f = tags_callbacks[id].onRemoveTag;
                f.call(this, value);
            }
        }), !1;
    }, $.fn.tagExist = function(val) {
        var id = $(this).attr("id"), tagslist = $(this).val().split(delimiter[id]);
        return jQuery.inArray(val, tagslist) >= 0;
    }, $.fn.importTags = function(str) {
        var id = $(this).attr("id");
        $("#" + id + "_tagsinput .tag").remove(), $.fn.tagsInput.importTags(this, str);
    }, $.fn.tagsInput = function(options) {
        var settings = jQuery.extend({
            interactive: !0,
            defaultText: "add a tag",
            minChars: 0,
            width: "300px",
            height: "100px",
            autocomplete: {
                selectFirst: !1
            },
            hide: !0,
            delimiter: ",",
            unique: !0,
            removeWithBackspace: !0,
            placeholderColor: "#666666",
            autosize: !0,
            comfortZone: 20,
            inputPadding: 12
        }, options), uniqueIdCounter = 0;
        return this.each(function() {
            if ("undefined" == typeof $(this).attr("data-tagsinput-init")) {
                $(this).attr("data-tagsinput-init", !0), settings.hide && $(this).hide();
                var id = $(this).attr("id");
                (!id || delimiter[$(this).attr("id")]) && (id = $(this).attr("id", "tags" + new Date().getTime() + uniqueIdCounter++).attr("id"));
                var data = jQuery.extend({
                    pid: id,
                    real_input: "#" + id,
                    holder: "#" + id + "_tagsinput",
                    input_wrapper: "#" + id + "_addTag",
                    fake_input: "#" + id + "_tag"
                }, settings);
                delimiter[id] = data.delimiter, (settings.onAddTag || settings.onRemoveTag || settings.onChange) && (tags_callbacks[id] = new Array(), 
                tags_callbacks[id].onAddTag = settings.onAddTag, tags_callbacks[id].onRemoveTag = settings.onRemoveTag, 
                tags_callbacks[id].onChange = settings.onChange);
                var markup = '<div id="' + id + '_tagsinput" class="tagsinput"><div id="' + id + '_addTag">';
                if (settings.interactive && (markup = markup + '<input id="' + id + '_tag" value="" data-default="' + settings.defaultText + '" />'), 
                markup += '</div><div class="tags_clear"></div></div>', $(markup).insertAfter(this), 
                $(data.holder).css("width", settings.width), $(data.holder).css("min-height", settings.height), 
                $(data.holder).css("height", settings.height), "" != $(data.real_input).val() && $.fn.tagsInput.importTags($(data.real_input), $(data.real_input).val()), 
                settings.interactive) {
                    if ($(data.fake_input).val($(data.fake_input).attr("data-default")), $(data.fake_input).css("color", settings.placeholderColor), 
                    $(data.fake_input).resetAutosize(settings), $(data.holder).bind("click", data, function(event) {
                        $(event.data.fake_input).focus();
                    }), $(data.fake_input).bind("focus", data, function(event) {
                        $(event.data.fake_input).val() == $(event.data.fake_input).attr("data-default") && $(event.data.fake_input).val(""), 
                        $(event.data.fake_input).css("color", "#000000");
                    }), void 0 != settings.autocomplete_url) {
                        autocomplete_options = {
                            source: settings.autocomplete_url
                        };
                        for (attrname in settings.autocomplete) autocomplete_options[attrname] = settings.autocomplete[attrname];
                        void 0 !== jQuery.Autocompleter ? ($(data.fake_input).autocomplete(settings.autocomplete_url, settings.autocomplete), 
                        $(data.fake_input).bind("result", data, function(event, data, formatted) {
                            data && $("#" + id).addTag(data[0] + "", {
                                focus: !0,
                                unique: settings.unique
                            });
                        })) : void 0 !== jQuery.ui.autocomplete && ($(data.fake_input).autocomplete(autocomplete_options), 
                        $(data.fake_input).bind("autocompleteselect", data, function(event, ui) {
                            return $(event.data.real_input).addTag(ui.item.value, {
                                focus: !0,
                                unique: settings.unique
                            }), !1;
                        }));
                    } else $(data.fake_input).bind("blur", data, function(event) {
                        var d = $(this).attr("data-default");
                        return "" != $(event.data.fake_input).val() && $(event.data.fake_input).val() != d ? event.data.minChars <= $(event.data.fake_input).val().length && (!event.data.maxChars || event.data.maxChars >= $(event.data.fake_input).val().length) && $(event.data.real_input).addTag($(event.data.fake_input).val(), {
                            focus: !0,
                            unique: settings.unique
                        }) : ($(event.data.fake_input).val($(event.data.fake_input).attr("data-default")), 
                        $(event.data.fake_input).css("color", settings.placeholderColor)), !1;
                    });
                    $(data.fake_input).bind("keypress", data, function(event) {
                        return _checkDelimiter(event) ? (event.preventDefault(), event.data.minChars <= $(event.data.fake_input).val().length && (!event.data.maxChars || event.data.maxChars >= $(event.data.fake_input).val().length) && $(event.data.real_input).addTag($(event.data.fake_input).val(), {
                            focus: !0,
                            unique: settings.unique
                        }), $(event.data.fake_input).resetAutosize(settings), !1) : void (event.data.autosize && $(event.data.fake_input).doAutosize(settings));
                    }), data.removeWithBackspace && $(data.fake_input).bind("keydown", function(event) {
                        if (8 == event.keyCode && "" == $(this).val()) {
                            event.preventDefault();
                            var last_tag = $(this).closest(".tagsinput").find(".tag:last").text(), id = $(this).attr("id").replace(/_tag$/, "");
                            last_tag = last_tag.replace(/[\s]+x$/, ""), $("#" + id).removeTag(escape(last_tag)), 
                            $(this).trigger("focus");
                        }
                    }), $(data.fake_input).blur(), data.unique && $(data.fake_input).keydown(function(event) {
                        (8 == event.keyCode || String.fromCharCode(event.which).match(/\w+|[áéíóúÁÉÍÓÚñÑ,\/]+/)) && $(this).removeClass("not_valid");
                    });
                }
            }
        }), this;
    }, $.fn.tagsInput.updateTagsField = function(obj, tagslist) {
        var id = $(obj).attr("id");
        $(obj).val(tagslist.join(delimiter[id]));
    }, $.fn.tagsInput.importTags = function(obj, val) {
        $(obj).val("");
        var id = $(obj).attr("id"), tags = val.split(delimiter[id]);
        for (i = 0; i < tags.length; i++) $(obj).addTag(tags[i], {
            focus: !1,
            callback: !1
        });
        if (tags_callbacks[id] && tags_callbacks[id].onChange) {
            var f = tags_callbacks[id].onChange;
            f.call(obj, obj, tags[i]);
        }
    };
    var _checkDelimiter = function(event) {
        var found = !1;
        return 13 == event.which ? !0 : ("string" == typeof event.data.delimiter ? event.which == event.data.delimiter.charCodeAt(0) && (found = !0) : $.each(event.data.delimiter, function(index, delimiter) {
            event.which == delimiter.charCodeAt(0) && (found = !0);
        }), found);
    };
}(jQuery), function(factory) {
    "function" == typeof define && define.amd ? define([ "jquery" ], factory) : factory("object" == typeof exports ? require("jquery") : jQuery);
}(function($, undefined) {
    function UTCDate() {
        return new Date(Date.UTC.apply(Date, arguments));
    }
    function UTCToday() {
        var today = new Date();
        return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
    }
    function isUTCEquals(date1, date2) {
        return date1.getUTCFullYear() === date2.getUTCFullYear() && date1.getUTCMonth() === date2.getUTCMonth() && date1.getUTCDate() === date2.getUTCDate();
    }
    function alias(method) {
        return function() {
            return this[method].apply(this, arguments);
        };
    }
    function isValidDate(d) {
        return d && !isNaN(d.getTime());
    }
    function opts_from_el(el, prefix) {
        function re_lower(_, a) {
            return a.toLowerCase();
        }
        var inkey, data = $(el).data(), out = {}, replace = new RegExp("^" + prefix.toLowerCase() + "([A-Z])");
        prefix = new RegExp("^" + prefix.toLowerCase());
        for (var key in data) prefix.test(key) && (inkey = key.replace(replace, re_lower), 
        out[inkey] = data[key]);
        return out;
    }
    function opts_from_locale(lang) {
        var out = {};
        if (dates[lang] || (lang = lang.split("-")[0], dates[lang])) {
            var d = dates[lang];
            return $.each(locale_opts, function(i, k) {
                k in d && (out[k] = d[k]);
            }), out;
        }
    }
    var DateArray = function() {
        var extras = {
            get: function(i) {
                return this.slice(i)[0];
            },
            contains: function(d) {
                for (var val = d && d.valueOf(), i = 0, l = this.length; l > i; i++) if (this[i].valueOf() === val) return i;
                return -1;
            },
            remove: function(i) {
                this.splice(i, 1);
            },
            replace: function(new_array) {
                new_array && ($.isArray(new_array) || (new_array = [ new_array ]), this.clear(), 
                this.push.apply(this, new_array));
            },
            clear: function() {
                this.length = 0;
            },
            copy: function() {
                var a = new DateArray();
                return a.replace(this), a;
            }
        };
        return function() {
            var a = [];
            return a.push.apply(a, arguments), $.extend(a, extras), a;
        };
    }(), Datepicker = function(element, options) {
        this._process_options(options), this.dates = new DateArray(), this.viewDate = this.o.defaultViewDate, 
        this.focusDate = null, this.element = $(element), this.isInline = !1, this.isInput = this.element.is("input"), 
        this.component = this.element.hasClass("date") ? this.element.find(".add-on, .input-group-addon, .btn") : !1, 
        this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), 
        this.picker = $(DPGlobal.template), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), 
        this.o.rtl && this.picker.addClass("datepicker-rtl"), this.viewMode = this.o.startView, 
        this.o.calendarWeeks && this.picker.find("tfoot .today, tfoot .clear").attr("colspan", function(i, val) {
            return parseInt(val) + 1;
        }), this._allow_update = !1, this.setStartDate(this._o.startDate), this.setEndDate(this._o.endDate), 
        this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled), this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted), 
        this.setDatesDisabled(this.o.datesDisabled), this.fillDow(), this.fillMonths(), 
        this._allow_update = !0, this.update(), this.showMode(), this.isInline && this.show();
    };
    Datepicker.prototype = {
        constructor: Datepicker,
        _process_options: function(opts) {
            this._o = $.extend({}, this._o, opts);
            var o = this.o = $.extend({}, this._o), lang = o.language;
            switch (dates[lang] || (lang = lang.split("-")[0], dates[lang] || (lang = defaults.language)), 
            o.language = lang, o.startView) {
              case 2:
              case "decade":
                o.startView = 2;
                break;

              case 1:
              case "year":
                o.startView = 1;
                break;

              default:
                o.startView = 0;
            }
            switch (o.minViewMode) {
              case 1:
              case "months":
                o.minViewMode = 1;
                break;

              case 2:
              case "years":
                o.minViewMode = 2;
                break;

              default:
                o.minViewMode = 0;
            }
            switch (o.maxViewMode) {
              case 0:
              case "days":
                o.maxViewMode = 0;
                break;

              case 1:
              case "months":
                o.maxViewMode = 1;
                break;

              default:
                o.maxViewMode = 2;
            }
            o.startView = Math.min(o.startView, o.maxViewMode), o.startView = Math.max(o.startView, o.minViewMode), 
            o.multidate !== !0 && (o.multidate = Number(o.multidate) || !1, o.multidate !== !1 && (o.multidate = Math.max(0, o.multidate))), 
            o.multidateSeparator = String(o.multidateSeparator), o.weekStart %= 7, o.weekEnd = (o.weekStart + 6) % 7;
            var format = DPGlobal.parseFormat(o.format);
            if (o.startDate !== -(1 / 0) && (o.startDate ? o.startDate instanceof Date ? o.startDate = this._local_to_utc(this._zero_time(o.startDate)) : o.startDate = DPGlobal.parseDate(o.startDate, format, o.language) : o.startDate = -(1 / 0)), 
            o.endDate !== 1 / 0 && (o.endDate ? o.endDate instanceof Date ? o.endDate = this._local_to_utc(this._zero_time(o.endDate)) : o.endDate = DPGlobal.parseDate(o.endDate, format, o.language) : o.endDate = 1 / 0), 
            o.daysOfWeekDisabled = o.daysOfWeekDisabled || [], $.isArray(o.daysOfWeekDisabled) || (o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/)), 
            o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function(d) {
                return parseInt(d, 10);
            }), o.daysOfWeekHighlighted = o.daysOfWeekHighlighted || [], $.isArray(o.daysOfWeekHighlighted) || (o.daysOfWeekHighlighted = o.daysOfWeekHighlighted.split(/[,\s]*/)), 
            o.daysOfWeekHighlighted = $.map(o.daysOfWeekHighlighted, function(d) {
                return parseInt(d, 10);
            }), o.datesDisabled = o.datesDisabled || [], !$.isArray(o.datesDisabled)) {
                var datesDisabled = [];
                datesDisabled.push(DPGlobal.parseDate(o.datesDisabled, format, o.language)), o.datesDisabled = datesDisabled;
            }
            o.datesDisabled = $.map(o.datesDisabled, function(d) {
                return DPGlobal.parseDate(d, format, o.language);
            });
            var plc = String(o.orientation).toLowerCase().split(/\s+/g), _plc = o.orientation.toLowerCase();
            if (plc = $.grep(plc, function(word) {
                return /^auto|left|right|top|bottom$/.test(word);
            }), o.orientation = {
                x: "auto",
                y: "auto"
            }, _plc && "auto" !== _plc) if (1 === plc.length) switch (plc[0]) {
              case "top":
              case "bottom":
                o.orientation.y = plc[0];
                break;

              case "left":
              case "right":
                o.orientation.x = plc[0];
            } else _plc = $.grep(plc, function(word) {
                return /^left|right$/.test(word);
            }), o.orientation.x = _plc[0] || "auto", _plc = $.grep(plc, function(word) {
                return /^top|bottom$/.test(word);
            }), o.orientation.y = _plc[0] || "auto"; else ;
            if (o.defaultViewDate) {
                var year = o.defaultViewDate.year || new Date().getFullYear(), month = o.defaultViewDate.month || 0, day = o.defaultViewDate.day || 1;
                o.defaultViewDate = UTCDate(year, month, day);
            } else o.defaultViewDate = UTCToday();
            o.showOnFocus = o.showOnFocus !== undefined ? o.showOnFocus : !0, o.zIndexOffset = o.zIndexOffset !== undefined ? o.zIndexOffset : 10;
        },
        _events: [],
        _secondaryEvents: [],
        _applyEvents: function(evs) {
            for (var el, ch, ev, i = 0; i < evs.length; i++) el = evs[i][0], 2 === evs[i].length ? (ch = undefined, 
            ev = evs[i][1]) : 3 === evs[i].length && (ch = evs[i][1], ev = evs[i][2]), el.on(ev, ch);
        },
        _unapplyEvents: function(evs) {
            for (var el, ev, ch, i = 0; i < evs.length; i++) el = evs[i][0], 2 === evs[i].length ? (ch = undefined, 
            ev = evs[i][1]) : 3 === evs[i].length && (ch = evs[i][1], ev = evs[i][2]), el.off(ev, ch);
        },
        _buildEvents: function() {
            var events = {
                keyup: $.proxy(function(e) {
                    -1 === $.inArray(e.keyCode, [ 27, 37, 39, 38, 40, 32, 13, 9 ]) && this.update();
                }, this),
                keydown: $.proxy(this.keydown, this),
                paste: $.proxy(this.paste, this)
            };
            this.o.showOnFocus === !0 && (events.focus = $.proxy(this.show, this)), this.isInput ? this._events = [ [ this.element, events ] ] : this.component && this.hasInput ? this._events = [ [ this.element.find("input"), events ], [ this.component, {
                click: $.proxy(this.show, this)
            } ] ] : this.element.is("div") ? this.isInline = !0 : this._events = [ [ this.element, {
                click: $.proxy(this.show, this)
            } ] ], this._events.push([ this.element, "*", {
                blur: $.proxy(function(e) {
                    this._focused_from = e.target;
                }, this)
            } ], [ this.element, {
                blur: $.proxy(function(e) {
                    this._focused_from = e.target;
                }, this)
            } ]), this.o.immediateUpdates && this._events.push([ this.element, {
                "changeYear changeMonth": $.proxy(function(e) {
                    this.update(e.date);
                }, this)
            } ]), this._secondaryEvents = [ [ this.picker, {
                click: $.proxy(this.click, this)
            } ], [ $(window), {
                resize: $.proxy(this.place, this)
            } ], [ $(document), {
                mousedown: $.proxy(function(e) {
                    this.element.is(e.target) || this.element.find(e.target).length || this.picker.is(e.target) || this.picker.find(e.target).length || this.picker.hasClass("datepicker-inline") || this.hide();
                }, this)
            } ] ];
        },
        _attachEvents: function() {
            this._detachEvents(), this._applyEvents(this._events);
        },
        _detachEvents: function() {
            this._unapplyEvents(this._events);
        },
        _attachSecondaryEvents: function() {
            this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents);
        },
        _detachSecondaryEvents: function() {
            this._unapplyEvents(this._secondaryEvents);
        },
        _trigger: function(event, altdate) {
            var date = altdate || this.dates.get(-1), local_date = this._utc_to_local(date);
            this.element.trigger({
                type: event,
                date: local_date,
                dates: $.map(this.dates, this._utc_to_local),
                format: $.proxy(function(ix, format) {
                    0 === arguments.length ? (ix = this.dates.length - 1, format = this.o.format) : "string" == typeof ix && (format = ix, 
                    ix = this.dates.length - 1), format = format || this.o.format;
                    var date = this.dates.get(ix);
                    return DPGlobal.formatDate(date, format, this.o.language);
                }, this)
            });
        },
        show: function() {
            return this.element.attr("readonly") && this.o.enableOnReadonly === !1 ? void 0 : (this.isInline || this.picker.appendTo(this.o.container), 
            this.place(), this.picker.show(), this._attachSecondaryEvents(), this._trigger("show"), 
            (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard && $(this.element).blur(), 
            this);
        },
        hide: function() {
            return this.isInline ? this : this.picker.is(":visible") ? (this.focusDate = null, 
            this.picker.hide().detach(), this._detachSecondaryEvents(), this.viewMode = this.o.startView, 
            this.showMode(), this.o.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), 
            this._trigger("hide"), this) : this;
        },
        remove: function() {
            return this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), 
            delete this.element.data().datepicker, this.isInput || delete this.element.data().date, 
            this;
        },
        paste: function(evt) {
            var dateString;
            if (evt.originalEvent.clipboardData && evt.originalEvent.clipboardData.types && -1 !== $.inArray("text/plain", evt.originalEvent.clipboardData.types)) dateString = evt.originalEvent.clipboardData.getData("text/plain"); else {
                if (!window.clipboardData) return;
                dateString = window.clipboardData.getData("Text");
            }
            this.setDate(dateString), this.update(), evt.preventDefault();
        },
        _utc_to_local: function(utc) {
            return utc && new Date(utc.getTime() + 6e4 * utc.getTimezoneOffset());
        },
        _local_to_utc: function(local) {
            return local && new Date(local.getTime() - 6e4 * local.getTimezoneOffset());
        },
        _zero_time: function(local) {
            return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
        },
        _zero_utc_time: function(utc) {
            return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
        },
        getDates: function() {
            return $.map(this.dates, this._utc_to_local);
        },
        getUTCDates: function() {
            return $.map(this.dates, function(d) {
                return new Date(d);
            });
        },
        getDate: function() {
            return this._utc_to_local(this.getUTCDate());
        },
        getUTCDate: function() {
            var selected_date = this.dates.get(-1);
            return "undefined" != typeof selected_date ? new Date(selected_date) : null;
        },
        clearDates: function() {
            var element;
            this.isInput ? element = this.element : this.component && (element = this.element.find("input")), 
            element && element.val(""), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide();
        },
        setDates: function() {
            var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
            return this.update.apply(this, args), this._trigger("changeDate"), this.setValue(), 
            this;
        },
        setUTCDates: function() {
            var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
            return this.update.apply(this, $.map(args, this._utc_to_local)), this._trigger("changeDate"), 
            this.setValue(), this;
        },
        setDate: alias("setDates"),
        setUTCDate: alias("setUTCDates"),
        setValue: function() {
            var formatted = this.getFormattedDate();
            return this.isInput ? this.element.val(formatted) : this.component && this.element.find("input").val(formatted), 
            this;
        },
        getFormattedDate: function(format) {
            format === undefined && (format = this.o.format);
            var lang = this.o.language;
            return $.map(this.dates, function(d) {
                return DPGlobal.formatDate(d, format, lang);
            }).join(this.o.multidateSeparator);
        },
        setStartDate: function(startDate) {
            return this._process_options({
                startDate: startDate
            }), this.update(), this.updateNavArrows(), this;
        },
        setEndDate: function(endDate) {
            return this._process_options({
                endDate: endDate
            }), this.update(), this.updateNavArrows(), this;
        },
        setDaysOfWeekDisabled: function(daysOfWeekDisabled) {
            return this._process_options({
                daysOfWeekDisabled: daysOfWeekDisabled
            }), this.update(), this.updateNavArrows(), this;
        },
        setDaysOfWeekHighlighted: function(daysOfWeekHighlighted) {
            return this._process_options({
                daysOfWeekHighlighted: daysOfWeekHighlighted
            }), this.update(), this;
        },
        setDatesDisabled: function(datesDisabled) {
            this._process_options({
                datesDisabled: datesDisabled
            }), this.update(), this.updateNavArrows();
        },
        place: function() {
            if (this.isInline) return this;
            var calendarWidth = this.picker.outerWidth(), calendarHeight = this.picker.outerHeight(), visualPadding = 10, container = $(this.o.container), windowWidth = container.width(), scrollTop = container.scrollTop(), appendOffset = container.offset(), parentsZindex = [];
            this.element.parents().each(function() {
                var itemZIndex = $(this).css("z-index");
                "auto" !== itemZIndex && 0 !== itemZIndex && parentsZindex.push(parseInt(itemZIndex));
            });
            var zIndex = Math.max.apply(Math, parentsZindex) + this.o.zIndexOffset, offset = this.component ? this.component.parent().offset() : this.element.offset(), height = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1), width = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1), left = offset.left - appendOffset.left, top = offset.top - appendOffset.top;
            this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), 
            "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), 
            "right" === this.o.orientation.x && (left -= calendarWidth - width)) : offset.left < 0 ? (this.picker.addClass("datepicker-orient-left"), 
            left -= offset.left - visualPadding) : left + calendarWidth > windowWidth ? (this.picker.addClass("datepicker-orient-right"), 
            left = offset.left + width - calendarWidth) : this.picker.addClass("datepicker-orient-left");
            var top_overflow, yorient = this.o.orientation.y;
            if ("auto" === yorient && (top_overflow = -scrollTop + top - calendarHeight, yorient = 0 > top_overflow ? "bottom" : "top"), 
            this.picker.addClass("datepicker-orient-" + yorient), "top" === yorient ? top -= calendarHeight + parseInt(this.picker.css("padding-top")) : top += height, 
            this.o.rtl) {
                var right = windowWidth - (left + width);
                this.picker.css({
                    top: top,
                    right: right,
                    zIndex: zIndex
                });
            } else this.picker.css({
                top: top,
                left: left,
                zIndex: zIndex
            });
            return this;
        },
        _allow_update: !0,
        update: function() {
            if (!this._allow_update) return this;
            var oldDates = this.dates.copy(), dates = [], fromArgs = !1;
            return arguments.length ? ($.each(arguments, $.proxy(function(i, date) {
                date instanceof Date && (date = this._local_to_utc(date)), dates.push(date);
            }, this)), fromArgs = !0) : (dates = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(), 
            dates = dates && this.o.multidate ? dates.split(this.o.multidateSeparator) : [ dates ], 
            delete this.element.data().date), dates = $.map(dates, $.proxy(function(date) {
                return DPGlobal.parseDate(date, this.o.format, this.o.language);
            }, this)), dates = $.grep(dates, $.proxy(function(date) {
                return date < this.o.startDate || date > this.o.endDate || !date;
            }, this), !0), this.dates.replace(dates), this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate ? this.viewDate = new Date(this.o.endDate) : this.viewDate = this.o.defaultViewDate, 
            fromArgs ? this.setValue() : dates.length && String(oldDates) !== String(this.dates) && this._trigger("changeDate"), 
            !this.dates.length && oldDates.length && this._trigger("clearDate"), this.fill(), 
            this.element.change(), this;
        },
        fillDow: function() {
            var dowCnt = this.o.weekStart, html = "<tr>";
            for (this.o.calendarWeeks && (this.picker.find(".datepicker-days .datepicker-switch").attr("colspan", function(i, val) {
                return parseInt(val) + 1;
            }), html += '<th class="cw">&#160;</th>'); dowCnt < this.o.weekStart + 7; ) html += '<th class="dow">' + dates[this.o.language].daysMin[dowCnt++ % 7] + "</th>";
            html += "</tr>", this.picker.find(".datepicker-days thead").append(html);
        },
        fillMonths: function() {
            for (var html = "", i = 0; 12 > i; ) html += '<span class="month">' + dates[this.o.language].monthsShort[i++] + "</span>";
            this.picker.find(".datepicker-months td").html(html);
        },
        setRange: function(range) {
            range && range.length ? this.range = $.map(range, function(d) {
                return d.valueOf();
            }) : delete this.range, this.fill();
        },
        getClassNames: function(date) {
            var cls = [], year = this.viewDate.getUTCFullYear(), month = this.viewDate.getUTCMonth(), today = new Date();
            return date.getUTCFullYear() < year || date.getUTCFullYear() === year && date.getUTCMonth() < month ? cls.push("old") : (date.getUTCFullYear() > year || date.getUTCFullYear() === year && date.getUTCMonth() > month) && cls.push("new"), 
            this.focusDate && date.valueOf() === this.focusDate.valueOf() && cls.push("focused"), 
            this.o.todayHighlight && date.getUTCFullYear() === today.getFullYear() && date.getUTCMonth() === today.getMonth() && date.getUTCDate() === today.getDate() && cls.push("today"), 
            -1 !== this.dates.contains(date) && cls.push("active"), (date.valueOf() < this.o.startDate || date.valueOf() > this.o.endDate || -1 !== $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled)) && cls.push("disabled"), 
            -1 !== $.inArray(date.getUTCDay(), this.o.daysOfWeekHighlighted) && cls.push("highlighted"), 
            this.o.datesDisabled.length > 0 && $.grep(this.o.datesDisabled, function(d) {
                return isUTCEquals(date, d);
            }).length > 0 && cls.push("disabled", "disabled-date"), this.range && (date > this.range[0] && date < this.range[this.range.length - 1] && cls.push("range"), 
            -1 !== $.inArray(date.valueOf(), this.range) && cls.push("selected"), date.valueOf() === this.range[0] && cls.push("range-start"), 
            date.valueOf() === this.range[this.range.length - 1] && cls.push("range-end")), 
            cls;
        },
        fill: function() {
            var tooltip, d = new Date(this.viewDate), year = d.getUTCFullYear(), month = d.getUTCMonth(), startYear = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCFullYear() : -(1 / 0), startMonth = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCMonth() : -(1 / 0), endYear = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0, endMonth = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0, todaytxt = dates[this.o.language].today || dates.en.today || "", cleartxt = dates[this.o.language].clear || dates.en.clear || "", titleFormat = dates[this.o.language].titleFormat || dates.en.titleFormat;
            if (!isNaN(year) && !isNaN(month)) {
                this.picker.find(".datepicker-days thead .datepicker-switch").text(DPGlobal.formatDate(new UTCDate(year, month), titleFormat, this.o.language)), 
                this.picker.find("tfoot .today").text(todaytxt).toggle(this.o.todayBtn !== !1), 
                this.picker.find("tfoot .clear").text(cleartxt).toggle(this.o.clearBtn !== !1), 
                this.picker.find("thead .datepicker-title").text(this.o.title).toggle("" !== this.o.title), 
                this.updateNavArrows(), this.fillMonths();
                var prevMonth = UTCDate(year, month - 1, 28), day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
                prevMonth.setUTCDate(day), prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7) % 7);
                var nextMonth = new Date(prevMonth);
                prevMonth.getUTCFullYear() < 100 && nextMonth.setUTCFullYear(prevMonth.getUTCFullYear()), 
                nextMonth.setUTCDate(nextMonth.getUTCDate() + 42), nextMonth = nextMonth.valueOf();
                for (var clsName, html = []; prevMonth.valueOf() < nextMonth; ) {
                    if (prevMonth.getUTCDay() === this.o.weekStart && (html.push("<tr>"), this.o.calendarWeeks)) {
                        var ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5), th = new Date(Number(ws) + (11 - ws.getUTCDay()) % 7 * 864e5), yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (11 - yth.getUTCDay()) % 7 * 864e5), calWeek = (th - yth) / 864e5 / 7 + 1;
                        html.push('<td class="cw">' + calWeek + "</td>");
                    }
                    if (clsName = this.getClassNames(prevMonth), clsName.push("day"), this.o.beforeShowDay !== $.noop) {
                        var before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
                        before === undefined ? before = {} : "boolean" == typeof before ? before = {
                            enabled: before
                        } : "string" == typeof before && (before = {
                            classes: before
                        }), before.enabled === !1 && clsName.push("disabled"), before.classes && (clsName = clsName.concat(before.classes.split(/\s+/))), 
                        before.tooltip && (tooltip = before.tooltip);
                    }
                    clsName = $.unique(clsName), html.push('<td class="' + clsName.join(" ") + '"' + (tooltip ? ' title="' + tooltip + '"' : "") + ">" + prevMonth.getUTCDate() + "</td>"), 
                    tooltip = null, prevMonth.getUTCDay() === this.o.weekEnd && html.push("</tr>"), 
                    prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
                }
                this.picker.find(".datepicker-days tbody").empty().append(html.join(""));
                var months = this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode < 2 ? "Months" : year).end().find("span").removeClass("active");
                if ($.each(this.dates, function(i, d) {
                    d.getUTCFullYear() === year && months.eq(d.getUTCMonth()).addClass("active");
                }), (startYear > year || year > endYear) && months.addClass("disabled"), year === startYear && months.slice(0, startMonth).addClass("disabled"), 
                year === endYear && months.slice(endMonth + 1).addClass("disabled"), this.o.beforeShowMonth !== $.noop) {
                    var that = this;
                    $.each(months, function(i, month) {
                        if (!$(month).hasClass("disabled")) {
                            var moDate = new Date(year, i, 1), before = that.o.beforeShowMonth(moDate);
                            before === !1 && $(month).addClass("disabled");
                        }
                    });
                }
                html = "", year = 10 * parseInt(year / 10, 10);
                var yearCont = this.picker.find(".datepicker-years").find(".datepicker-switch").text(year + "-" + (year + 9)).end().find("td");
                year -= 1;
                for (var classes, years = $.map(this.dates, function(d) {
                    return d.getUTCFullYear();
                }), i = -1; 11 > i; i++) {
                    if (classes = [ "year" ], tooltip = null, -1 === i ? classes.push("old") : 10 === i && classes.push("new"), 
                    -1 !== $.inArray(year, years) && classes.push("active"), (startYear > year || year > endYear) && classes.push("disabled"), 
                    this.o.beforeShowYear !== $.noop) {
                        var yrBefore = this.o.beforeShowYear(new Date(year, 0, 1));
                        yrBefore === undefined ? yrBefore = {} : "boolean" == typeof yrBefore ? yrBefore = {
                            enabled: yrBefore
                        } : "string" == typeof yrBefore && (yrBefore = {
                            classes: yrBefore
                        }), yrBefore.enabled === !1 && classes.push("disabled"), yrBefore.classes && (classes = classes.concat(yrBefore.classes.split(/\s+/))), 
                        yrBefore.tooltip && (tooltip = yrBefore.tooltip);
                    }
                    html += '<span class="' + classes.join(" ") + '"' + (tooltip ? ' title="' + tooltip + '"' : "") + ">" + year + "</span>", 
                    year += 1;
                }
                yearCont.html(html);
            }
        },
        updateNavArrows: function() {
            if (this._allow_update) {
                var d = new Date(this.viewDate), year = d.getUTCFullYear(), month = d.getUTCMonth();
                switch (this.viewMode) {
                  case 0:
                    this.o.startDate !== -(1 / 0) && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth() ? this.picker.find(".prev").css({
                        visibility: "hidden"
                    }) : this.picker.find(".prev").css({
                        visibility: "visible"
                    }), this.o.endDate !== 1 / 0 && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth() ? this.picker.find(".next").css({
                        visibility: "hidden"
                    }) : this.picker.find(".next").css({
                        visibility: "visible"
                    });
                    break;

                  case 1:
                  case 2:
                    this.o.startDate !== -(1 / 0) && year <= this.o.startDate.getUTCFullYear() || this.o.maxViewMode < 2 ? this.picker.find(".prev").css({
                        visibility: "hidden"
                    }) : this.picker.find(".prev").css({
                        visibility: "visible"
                    }), this.o.endDate !== 1 / 0 && year >= this.o.endDate.getUTCFullYear() || this.o.maxViewMode < 2 ? this.picker.find(".next").css({
                        visibility: "hidden"
                    }) : this.picker.find(".next").css({
                        visibility: "visible"
                    });
                }
            }
        },
        click: function(e) {
            e.preventDefault(), e.stopPropagation();
            var year, month, day, target = $(e.target).closest("span, td, th");
            if (1 === target.length) switch (target[0].nodeName.toLowerCase()) {
              case "th":
                switch (target[0].className) {
                  case "datepicker-switch":
                    this.showMode(1);
                    break;

                  case "prev":
                  case "next":
                    var dir = DPGlobal.modes[this.viewMode].navStep * ("prev" === target[0].className ? -1 : 1);
                    switch (this.viewMode) {
                      case 0:
                        this.viewDate = this.moveMonth(this.viewDate, dir), this._trigger("changeMonth", this.viewDate);
                        break;

                      case 1:
                      case 2:
                        this.viewDate = this.moveYear(this.viewDate, dir), 1 === this.viewMode && this._trigger("changeYear", this.viewDate);
                    }
                    this.fill();
                    break;

                  case "today":
                    var date = new Date();
                    date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0), this.showMode(-2);
                    var which = "linked" === this.o.todayBtn ? null : "view";
                    this._setDate(date, which);
                    break;

                  case "clear":
                    this.clearDates();
                }
                break;

              case "span":
                target.hasClass("disabled") || (this.viewDate.setUTCDate(1), target.hasClass("month") ? (day = 1, 
                month = target.parent().find("span").index(target), year = this.viewDate.getUTCFullYear(), 
                this.viewDate.setUTCMonth(month), this._trigger("changeMonth", this.viewDate), 1 === this.o.minViewMode ? (this._setDate(UTCDate(year, month, day)), 
                this.showMode()) : this.showMode(-1)) : (day = 1, month = 0, year = parseInt(target.text(), 10) || 0, 
                this.viewDate.setUTCFullYear(year), this._trigger("changeYear", this.viewDate), 
                2 === this.o.minViewMode && this._setDate(UTCDate(year, month, day)), this.showMode(-1)), 
                this.fill());
                break;

              case "td":
                target.hasClass("day") && !target.hasClass("disabled") && (day = parseInt(target.text(), 10) || 1, 
                year = this.viewDate.getUTCFullYear(), month = this.viewDate.getUTCMonth(), target.hasClass("old") ? 0 === month ? (month = 11, 
                year -= 1) : month -= 1 : target.hasClass("new") && (11 === month ? (month = 0, 
                year += 1) : month += 1), this._setDate(UTCDate(year, month, day)));
            }
            this.picker.is(":visible") && this._focused_from && $(this._focused_from).focus(), 
            delete this._focused_from;
        },
        _toggle_multidate: function(date) {
            var ix = this.dates.contains(date);
            if (date || this.dates.clear(), -1 !== ix ? (this.o.multidate === !0 || this.o.multidate > 1 || this.o.toggleActive) && this.dates.remove(ix) : this.o.multidate === !1 ? (this.dates.clear(), 
            this.dates.push(date)) : this.dates.push(date), "number" == typeof this.o.multidate) for (;this.dates.length > this.o.multidate; ) this.dates.remove(0);
        },
        _setDate: function(date, which) {
            which && "date" !== which || this._toggle_multidate(date && new Date(date)), which && "view" !== which || (this.viewDate = date && new Date(date)), 
            this.fill(), this.setValue(), which && "view" === which || this._trigger("changeDate");
            var element;
            this.isInput ? element = this.element : this.component && (element = this.element.find("input")), 
            element && element.change(), !this.o.autoclose || which && "date" !== which || this.hide();
        },
        moveMonth: function(date, dir) {
            if (!isValidDate(date)) return this.o.defaultViewDate;
            if (!dir) return date;
            var new_month, test, new_date = new Date(date.valueOf()), day = new_date.getUTCDate(), month = new_date.getUTCMonth(), mag = Math.abs(dir);
            if (dir = dir > 0 ? 1 : -1, 1 === mag) test = -1 === dir ? function() {
                return new_date.getUTCMonth() === month;
            } : function() {
                return new_date.getUTCMonth() !== new_month;
            }, new_month = month + dir, new_date.setUTCMonth(new_month), (0 > new_month || new_month > 11) && (new_month = (new_month + 12) % 12); else {
                for (var i = 0; mag > i; i++) new_date = this.moveMonth(new_date, dir);
                new_month = new_date.getUTCMonth(), new_date.setUTCDate(day), test = function() {
                    return new_month !== new_date.getUTCMonth();
                };
            }
            for (;test(); ) new_date.setUTCDate(--day), new_date.setUTCMonth(new_month);
            return new_date;
        },
        moveYear: function(date, dir) {
            return this.moveMonth(date, 12 * dir);
        },
        dateWithinRange: function(date) {
            return date >= this.o.startDate && date <= this.o.endDate;
        },
        keydown: function(e) {
            if (!this.picker.is(":visible")) return void ((40 === e.keyCode || 27 === e.keyCode) && (this.show(), 
            e.stopPropagation()));
            var dir, newDate, newViewDate, dateChanged = !1, focusDate = this.focusDate || this.viewDate;
            switch (e.keyCode) {
              case 27:
                this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, 
                this.fill()) : this.hide(), e.preventDefault(), e.stopPropagation();
                break;

              case 37:
              case 39:
                if (!this.o.keyboardNavigation) break;
                dir = 37 === e.keyCode ? -1 : 1, e.ctrlKey ? (newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir), 
                newViewDate = this.moveYear(focusDate, dir), this._trigger("changeYear", this.viewDate)) : e.shiftKey ? (newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir), 
                newViewDate = this.moveMonth(focusDate, dir), this._trigger("changeMonth", this.viewDate)) : (newDate = new Date(this.dates.get(-1) || UTCToday()), 
                newDate.setUTCDate(newDate.getUTCDate() + dir), newViewDate = new Date(focusDate), 
                newViewDate.setUTCDate(focusDate.getUTCDate() + dir)), this.dateWithinRange(newViewDate) && (this.focusDate = this.viewDate = newViewDate, 
                this.setValue(), this.fill(), e.preventDefault());
                break;

              case 38:
              case 40:
                if (!this.o.keyboardNavigation) break;
                dir = 38 === e.keyCode ? -1 : 1, e.ctrlKey ? (newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir), 
                newViewDate = this.moveYear(focusDate, dir), this._trigger("changeYear", this.viewDate)) : e.shiftKey ? (newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir), 
                newViewDate = this.moveMonth(focusDate, dir), this._trigger("changeMonth", this.viewDate)) : (newDate = new Date(this.dates.get(-1) || UTCToday()), 
                newDate.setUTCDate(newDate.getUTCDate() + 7 * dir), newViewDate = new Date(focusDate), 
                newViewDate.setUTCDate(focusDate.getUTCDate() + 7 * dir)), this.dateWithinRange(newViewDate) && (this.focusDate = this.viewDate = newViewDate, 
                this.setValue(), this.fill(), e.preventDefault());
                break;

              case 32:
                break;

              case 13:
                if (!this.o.forceParse) break;
                focusDate = this.focusDate || this.dates.get(-1) || this.viewDate, this.o.keyboardNavigation && (this._toggle_multidate(focusDate), 
                dateChanged = !0), this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, 
                this.setValue(), this.fill(), this.picker.is(":visible") && (e.preventDefault(), 
                "function" == typeof e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0, 
                this.o.autoclose && this.hide());
                break;

              case 9:
                this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), 
                this.hide();
            }
            if (dateChanged) {
                this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate");
                var element;
                this.isInput ? element = this.element : this.component && (element = this.element.find("input")), 
                element && element.change();
            }
        },
        showMode: function(dir) {
            dir && (this.viewMode = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, this.viewMode + dir))), 
            this.picker.children("div").hide().filter(".datepicker-" + DPGlobal.modes[this.viewMode].clsName).show(), 
            this.updateNavArrows();
        }
    };
    var DateRangePicker = function(element, options) {
        this.element = $(element), this.inputs = $.map(options.inputs, function(i) {
            return i.jquery ? i[0] : i;
        }), delete options.inputs, datepickerPlugin.call($(this.inputs), options).on("changeDate", $.proxy(this.dateUpdated, this)), 
        this.pickers = $.map(this.inputs, function(i) {
            return $(i).data("datepicker");
        }), this.updateDates();
    };
    DateRangePicker.prototype = {
        updateDates: function() {
            this.dates = $.map(this.pickers, function(i) {
                return i.getUTCDate();
            }), this.updateRanges();
        },
        updateRanges: function() {
            var range = $.map(this.dates, function(d) {
                return d.valueOf();
            });
            $.each(this.pickers, function(i, p) {
                p.setRange(range);
            });
        },
        dateUpdated: function(e) {
            if (!this.updating) {
                this.updating = !0;
                var dp = $(e.target).data("datepicker");
                if ("undefined" != typeof dp) {
                    var new_date = dp.getUTCDate(), i = $.inArray(e.target, this.inputs), j = i - 1, k = i + 1, l = this.inputs.length;
                    if (-1 !== i) {
                        if ($.each(this.pickers, function(i, p) {
                            p.getUTCDate() || p.setUTCDate(new_date);
                        }), new_date < this.dates[j]) for (;j >= 0 && new_date < this.dates[j]; ) this.pickers[j--].setUTCDate(new_date); else if (new_date > this.dates[k]) for (;l > k && new_date > this.dates[k]; ) this.pickers[k++].setUTCDate(new_date);
                        this.updateDates(), delete this.updating;
                    }
                }
            }
        },
        remove: function() {
            $.map(this.pickers, function(p) {
                p.remove();
            }), delete this.element.data().datepicker;
        }
    };
    var old = $.fn.datepicker, datepickerPlugin = function(option) {
        var args = Array.apply(null, arguments);
        args.shift();
        var internal_return;
        if (this.each(function() {
            var $this = $(this), data = $this.data("datepicker"), options = "object" == typeof option && option;
            if (!data) {
                var elopts = opts_from_el(this, "date"), xopts = $.extend({}, defaults, elopts, options), locopts = opts_from_locale(xopts.language), opts = $.extend({}, defaults, locopts, elopts, options);
                if ($this.hasClass("input-daterange") || opts.inputs) {
                    var ropts = {
                        inputs: opts.inputs || $this.find("input").toArray()
                    };
                    $this.data("datepicker", data = new DateRangePicker(this, $.extend(opts, ropts)));
                } else $this.data("datepicker", data = new Datepicker(this, opts));
            }
            "string" == typeof option && "function" == typeof data[option] && (internal_return = data[option].apply(data, args));
        }), internal_return === undefined || internal_return instanceof Datepicker || internal_return instanceof DateRangePicker) return this;
        if (this.length > 1) throw new Error("Using only allowed for the collection of a single element (" + option + " function)");
        return internal_return;
    };
    $.fn.datepicker = datepickerPlugin;
    var defaults = $.fn.datepicker.defaults = {
        autoclose: !1,
        beforeShowDay: $.noop,
        beforeShowMonth: $.noop,
        beforeShowYear: $.noop,
        calendarWeeks: !1,
        clearBtn: !1,
        toggleActive: !1,
        daysOfWeekDisabled: [],
        daysOfWeekHighlighted: [],
        datesDisabled: [],
        endDate: 1 / 0,
        forceParse: !0,
        format: "mm/dd/yyyy",
        keyboardNavigation: !0,
        language: "en",
        minViewMode: 0,
        maxViewMode: 2,
        multidate: !1,
        multidateSeparator: ",",
        orientation: "auto",
        rtl: !1,
        startDate: -(1 / 0),
        startView: 0,
        todayBtn: !1,
        todayHighlight: !1,
        weekStart: 0,
        disableTouchKeyboard: !1,
        enableOnReadonly: !0,
        container: "body",
        immediateUpdates: !1,
        title: ""
    }, locale_opts = $.fn.datepicker.locale_opts = [ "format", "rtl", "weekStart" ];
    $.fn.datepicker.Constructor = Datepicker;
    var dates = $.fn.datepicker.dates = {
        en: {
            days: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
            daysShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
            daysMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
            months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
            monthsShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            today: "Today",
            clear: "Clear",
            titleFormat: "MM yyyy"
        }
    }, DPGlobal = {
        modes: [ {
            clsName: "days",
            navFnc: "Month",
            navStep: 1
        }, {
            clsName: "months",
            navFnc: "FullYear",
            navStep: 1
        }, {
            clsName: "years",
            navFnc: "FullYear",
            navStep: 10
        } ],
        isLeapYear: function(year) {
            return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        },
        getDaysInMonth: function(year, month) {
            return [ 31, DPGlobal.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][month];
        },
        validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
        nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
        parseFormat: function(format) {
            if ("function" == typeof format.toValue && "function" == typeof format.toDisplay) return format;
            var separators = format.replace(this.validParts, "\x00").split("\x00"), parts = format.match(this.validParts);
            if (!separators || !separators.length || !parts || 0 === parts.length) throw new Error("Invalid date format.");
            return {
                separators: separators,
                parts: parts
            };
        },
        parseDate: function(date, format, language) {
            function match_part() {
                var m = this.slice(0, parts[i].length), p = parts[i].slice(0, m.length);
                return m.toLowerCase() === p.toLowerCase();
            }
            if (!date) return undefined;
            if (date instanceof Date) return date;
            if ("string" == typeof format && (format = DPGlobal.parseFormat(format)), format.toValue) return format.toValue(date, format, language);
            var part, dir, i, part_re = /([\-+]\d+)([dmwy])/, parts = date.match(/([\-+]\d+)([dmwy])/g);
            if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)) {
                for (date = new Date(), i = 0; i < parts.length; i++) switch (part = part_re.exec(parts[i]), 
                dir = parseInt(part[1]), part[2]) {
                  case "d":
                    date.setUTCDate(date.getUTCDate() + dir);
                    break;

                  case "m":
                    date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
                    break;

                  case "w":
                    date.setUTCDate(date.getUTCDate() + 7 * dir);
                    break;

                  case "y":
                    date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);
                }
                return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
            }
            parts = date && date.match(this.nonpunctuation) || [], date = new Date();
            var val, filtered, parsed = {}, setters_order = [ "yyyy", "yy", "M", "MM", "m", "mm", "d", "dd" ], setters_map = {
                yyyy: function(d, v) {
                    return d.setUTCFullYear(v);
                },
                yy: function(d, v) {
                    return d.setUTCFullYear(2e3 + v);
                },
                m: function(d, v) {
                    if (isNaN(d)) return d;
                    for (v -= 1; 0 > v; ) v += 12;
                    for (v %= 12, d.setUTCMonth(v); d.getUTCMonth() !== v; ) d.setUTCDate(d.getUTCDate() - 1);
                    return d;
                },
                d: function(d, v) {
                    return d.setUTCDate(v);
                }
            };
            setters_map.M = setters_map.MM = setters_map.mm = setters_map.m, setters_map.dd = setters_map.d, 
            date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
            var fparts = format.parts.slice();
            if (parts.length !== fparts.length && (fparts = $(fparts).filter(function(i, p) {
                return -1 !== $.inArray(p, setters_order);
            }).toArray()), parts.length === fparts.length) {
                var cnt;
                for (i = 0, cnt = fparts.length; cnt > i; i++) {
                    if (val = parseInt(parts[i], 10), part = fparts[i], isNaN(val)) switch (part) {
                      case "MM":
                        filtered = $(dates[language].months).filter(match_part), val = $.inArray(filtered[0], dates[language].months) + 1;
                        break;

                      case "M":
                        filtered = $(dates[language].monthsShort).filter(match_part), val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
                    }
                    parsed[part] = val;
                }
                var _date, s;
                for (i = 0; i < setters_order.length; i++) s = setters_order[i], s in parsed && !isNaN(parsed[s]) && (_date = new Date(date), 
                setters_map[s](_date, parsed[s]), isNaN(_date) || (date = _date));
            }
            return date;
        },
        formatDate: function(date, format, language) {
            if (!date) return "";
            if ("string" == typeof format && (format = DPGlobal.parseFormat(format)), format.toDisplay) return format.toDisplay(date, format, language);
            var val = {
                d: date.getUTCDate(),
                D: dates[language].daysShort[date.getUTCDay()],
                DD: dates[language].days[date.getUTCDay()],
                m: date.getUTCMonth() + 1,
                M: dates[language].monthsShort[date.getUTCMonth()],
                MM: dates[language].months[date.getUTCMonth()],
                yy: date.getUTCFullYear().toString().substring(2),
                yyyy: date.getUTCFullYear()
            };
            val.dd = (val.d < 10 ? "0" : "") + val.d, val.mm = (val.m < 10 ? "0" : "") + val.m, 
            date = [];
            for (var seps = $.extend([], format.separators), i = 0, cnt = format.parts.length; cnt >= i; i++) seps.length && date.push(seps.shift()), 
            date.push(val[format.parts[i]]);
            return date.join("");
        },
        headTemplate: '<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">&#171;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&#187;</th></tr></thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
    };
    DPGlobal.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + DPGlobal.headTemplate + "<tbody></tbody>" + DPGlobal.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + "</table></div></div>", 
    $.fn.datepicker.DPGlobal = DPGlobal, $.fn.datepicker.noConflict = function() {
        return $.fn.datepicker = old, this;
    }, $.fn.datepicker.version = "1.5.0", $(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function(e) {
        var $this = $(this);
        $this.data("datepicker") || (e.preventDefault(), datepickerPlugin.call($this, "show"));
    }), $(function() {
        datepickerPlugin.call($('[data-provide="datepicker-inline"]'));
    });
}), function(factory) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "jquery" ], function($) {
        return factory($, window, document);
    }) : "object" == typeof exports ? module.exports = function(root, $) {
        return root || (root = window), $ || ($ = "undefined" != typeof window ? require("jquery") : require("jquery")(root)), 
        factory($, root, root.document);
    } : factory(jQuery, window, document);
}(function($, window, document, undefined) {
    "use strict";
    function _fnHungarianMap(o) {
        var match, newKey, hungarian = "a aa ai ao as b fn i m o s ", map = {};
        $.each(o, function(key, val) {
            match = key.match(/^([^A-Z]+?)([A-Z])/), match && -1 !== hungarian.indexOf(match[1] + " ") && (newKey = key.replace(match[0], match[2].toLowerCase()), 
            map[newKey] = key, "o" === match[1] && _fnHungarianMap(o[key]));
        }), o._hungarianMap = map;
    }
    function _fnCamelToHungarian(src, user, force) {
        src._hungarianMap || _fnHungarianMap(src);
        var hungarianKey;
        $.each(user, function(key, val) {
            hungarianKey = src._hungarianMap[key], hungarianKey === undefined || !force && user[hungarianKey] !== undefined || ("o" === hungarianKey.charAt(0) ? (user[hungarianKey] || (user[hungarianKey] = {}), 
            $.extend(!0, user[hungarianKey], user[key]), _fnCamelToHungarian(src[hungarianKey], user[hungarianKey], force)) : user[hungarianKey] = user[key]);
        });
    }
    function _fnLanguageCompat(lang) {
        var defaults = DataTable.defaults.oLanguage, zeroRecords = lang.sZeroRecords;
        !lang.sEmptyTable && zeroRecords && "No data available in table" === defaults.sEmptyTable && _fnMap(lang, lang, "sZeroRecords", "sEmptyTable"), 
        !lang.sLoadingRecords && zeroRecords && "Loading..." === defaults.sLoadingRecords && _fnMap(lang, lang, "sZeroRecords", "sLoadingRecords"), 
        lang.sInfoThousands && (lang.sThousands = lang.sInfoThousands);
        var decimal = lang.sDecimal;
        decimal && _addNumericSort(decimal);
    }
    function _fnCompatOpts(init) {
        _fnCompatMap(init, "ordering", "bSort"), _fnCompatMap(init, "orderMulti", "bSortMulti"), 
        _fnCompatMap(init, "orderClasses", "bSortClasses"), _fnCompatMap(init, "orderCellsTop", "bSortCellsTop"), 
        _fnCompatMap(init, "order", "aaSorting"), _fnCompatMap(init, "orderFixed", "aaSortingFixed"), 
        _fnCompatMap(init, "paging", "bPaginate"), _fnCompatMap(init, "pagingType", "sPaginationType"), 
        _fnCompatMap(init, "pageLength", "iDisplayLength"), _fnCompatMap(init, "searching", "bFilter"), 
        "boolean" == typeof init.sScrollX && (init.sScrollX = init.sScrollX ? "100%" : ""), 
        "boolean" == typeof init.scrollX && (init.scrollX = init.scrollX ? "100%" : "");
        var searchCols = init.aoSearchCols;
        if (searchCols) for (var i = 0, ien = searchCols.length; ien > i; i++) searchCols[i] && _fnCamelToHungarian(DataTable.models.oSearch, searchCols[i]);
    }
    function _fnCompatCols(init) {
        _fnCompatMap(init, "orderable", "bSortable"), _fnCompatMap(init, "orderData", "aDataSort"), 
        _fnCompatMap(init, "orderSequence", "asSorting"), _fnCompatMap(init, "orderDataType", "sortDataType");
        var dataSort = init.aDataSort;
        dataSort && !$.isArray(dataSort) && (init.aDataSort = [ dataSort ]);
    }
    function _fnBrowserDetect(settings) {
        if (!DataTable.__browser) {
            var browser = {};
            DataTable.__browser = browser;
            var n = $("<div/>").css({
                position: "fixed",
                top: 0,
                left: 0,
                height: 1,
                width: 1,
                overflow: "hidden"
            }).append($("<div/>").css({
                position: "absolute",
                top: 1,
                left: 1,
                width: 100,
                overflow: "scroll"
            }).append($("<div/>").css({
                width: "100%",
                height: 10
            }))).appendTo("body"), outer = n.children(), inner = outer.children();
            browser.barWidth = outer[0].offsetWidth - outer[0].clientWidth, browser.bScrollOversize = 100 === inner[0].offsetWidth && 100 !== outer[0].clientWidth, 
            browser.bScrollbarLeft = 1 !== Math.round(inner.offset().left), browser.bBounding = n[0].getBoundingClientRect().width ? !0 : !1, 
            n.remove();
        }
        $.extend(settings.oBrowser, DataTable.__browser), settings.oScroll.iBarWidth = DataTable.__browser.barWidth;
    }
    function _fnReduce(that, fn, init, start, end, inc) {
        var value, i = start, isSet = !1;
        for (init !== undefined && (value = init, isSet = !0); i !== end; ) that.hasOwnProperty(i) && (value = isSet ? fn(value, that[i], i, that) : that[i], 
        isSet = !0, i += inc);
        return value;
    }
    function _fnAddColumn(oSettings, nTh) {
        var oDefaults = DataTable.defaults.column, iCol = oSettings.aoColumns.length, oCol = $.extend({}, DataTable.models.oColumn, oDefaults, {
            nTh: nTh ? nTh : document.createElement("th"),
            sTitle: oDefaults.sTitle ? oDefaults.sTitle : nTh ? nTh.innerHTML : "",
            aDataSort: oDefaults.aDataSort ? oDefaults.aDataSort : [ iCol ],
            mData: oDefaults.mData ? oDefaults.mData : iCol,
            idx: iCol
        });
        oSettings.aoColumns.push(oCol);
        var searchCols = oSettings.aoPreSearchCols;
        searchCols[iCol] = $.extend({}, DataTable.models.oSearch, searchCols[iCol]), _fnColumnOptions(oSettings, iCol, $(nTh).data());
    }
    function _fnColumnOptions(oSettings, iCol, oOptions) {
        var oCol = oSettings.aoColumns[iCol], oClasses = oSettings.oClasses, th = $(oCol.nTh);
        if (!oCol.sWidthOrig) {
            oCol.sWidthOrig = th.attr("width") || null;
            var t = (th.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);
            t && (oCol.sWidthOrig = t[1]);
        }
        oOptions !== undefined && null !== oOptions && (_fnCompatCols(oOptions), _fnCamelToHungarian(DataTable.defaults.column, oOptions), 
        oOptions.mDataProp === undefined || oOptions.mData || (oOptions.mData = oOptions.mDataProp), 
        oOptions.sType && (oCol._sManualType = oOptions.sType), oOptions.className && !oOptions.sClass && (oOptions.sClass = oOptions.className), 
        $.extend(oCol, oOptions), _fnMap(oCol, oOptions, "sWidth", "sWidthOrig"), oOptions.iDataSort !== undefined && (oCol.aDataSort = [ oOptions.iDataSort ]), 
        _fnMap(oCol, oOptions, "aDataSort"));
        var mDataSrc = oCol.mData, mData = _fnGetObjectDataFn(mDataSrc), mRender = oCol.mRender ? _fnGetObjectDataFn(oCol.mRender) : null, attrTest = function(src) {
            return "string" == typeof src && -1 !== src.indexOf("@");
        };
        oCol._bAttrSrc = $.isPlainObject(mDataSrc) && (attrTest(mDataSrc.sort) || attrTest(mDataSrc.type) || attrTest(mDataSrc.filter)), 
        oCol.fnGetData = function(rowData, type, meta) {
            var innerData = mData(rowData, type, undefined, meta);
            return mRender && type ? mRender(innerData, type, rowData, meta) : innerData;
        }, oCol.fnSetData = function(rowData, val, meta) {
            return _fnSetObjectDataFn(mDataSrc)(rowData, val, meta);
        }, "number" != typeof mDataSrc && (oSettings._rowReadObject = !0), oSettings.oFeatures.bSort || (oCol.bSortable = !1, 
        th.addClass(oClasses.sSortableNone));
        var bAsc = -1 !== $.inArray("asc", oCol.asSorting), bDesc = -1 !== $.inArray("desc", oCol.asSorting);
        oCol.bSortable && (bAsc || bDesc) ? bAsc && !bDesc ? (oCol.sSortingClass = oClasses.sSortableAsc, 
        oCol.sSortingClassJUI = oClasses.sSortJUIAscAllowed) : !bAsc && bDesc ? (oCol.sSortingClass = oClasses.sSortableDesc, 
        oCol.sSortingClassJUI = oClasses.sSortJUIDescAllowed) : (oCol.sSortingClass = oClasses.sSortable, 
        oCol.sSortingClassJUI = oClasses.sSortJUI) : (oCol.sSortingClass = oClasses.sSortableNone, 
        oCol.sSortingClassJUI = "");
    }
    function _fnAdjustColumnSizing(settings) {
        if (settings.oFeatures.bAutoWidth !== !1) {
            var columns = settings.aoColumns;
            _fnCalculateColumnWidths(settings);
            for (var i = 0, iLen = columns.length; iLen > i; i++) columns[i].nTh.style.width = columns[i].sWidth;
        }
        var scroll = settings.oScroll;
        ("" !== scroll.sY || "" !== scroll.sX) && _fnScrollDraw(settings), _fnCallbackFire(settings, null, "column-sizing", [ settings ]);
    }
    function _fnVisibleToColumnIndex(oSettings, iMatch) {
        var aiVis = _fnGetColumns(oSettings, "bVisible");
        return "number" == typeof aiVis[iMatch] ? aiVis[iMatch] : null;
    }
    function _fnColumnIndexToVisible(oSettings, iMatch) {
        var aiVis = _fnGetColumns(oSettings, "bVisible"), iPos = $.inArray(iMatch, aiVis);
        return -1 !== iPos ? iPos : null;
    }
    function _fnVisbleColumns(oSettings) {
        return _fnGetColumns(oSettings, "bVisible").length;
    }
    function _fnGetColumns(oSettings, sParam) {
        var a = [];
        return $.map(oSettings.aoColumns, function(val, i) {
            val[sParam] && a.push(i);
        }), a;
    }
    function _fnColumnTypes(settings) {
        var i, ien, j, jen, k, ken, col, detectedType, cache, columns = settings.aoColumns, data = settings.aoData, types = DataTable.ext.type.detect;
        for (i = 0, ien = columns.length; ien > i; i++) if (col = columns[i], cache = [], 
        !col.sType && col._sManualType) col.sType = col._sManualType; else if (!col.sType) {
            for (j = 0, jen = types.length; jen > j; j++) {
                for (k = 0, ken = data.length; ken > k && (cache[k] === undefined && (cache[k] = _fnGetCellData(settings, k, i, "type")), 
                detectedType = types[j](cache[k], settings), detectedType || j === types.length - 1) && "html" !== detectedType; k++) ;
                if (detectedType) {
                    col.sType = detectedType;
                    break;
                }
            }
            col.sType || (col.sType = "string");
        }
    }
    function _fnApplyColumnDefs(oSettings, aoColDefs, aoCols, fn) {
        var i, iLen, j, jLen, k, kLen, def, columns = oSettings.aoColumns;
        if (aoColDefs) for (i = aoColDefs.length - 1; i >= 0; i--) {
            def = aoColDefs[i];
            var aTargets = def.targets !== undefined ? def.targets : def.aTargets;
            for ($.isArray(aTargets) || (aTargets = [ aTargets ]), j = 0, jLen = aTargets.length; jLen > j; j++) if ("number" == typeof aTargets[j] && aTargets[j] >= 0) {
                for (;columns.length <= aTargets[j]; ) _fnAddColumn(oSettings);
                fn(aTargets[j], def);
            } else if ("number" == typeof aTargets[j] && aTargets[j] < 0) fn(columns.length + aTargets[j], def); else if ("string" == typeof aTargets[j]) for (k = 0, 
            kLen = columns.length; kLen > k; k++) ("_all" == aTargets[j] || $(columns[k].nTh).hasClass(aTargets[j])) && fn(k, def);
        }
        if (aoCols) for (i = 0, iLen = aoCols.length; iLen > i; i++) fn(i, aoCols[i]);
    }
    function _fnAddData(oSettings, aDataIn, nTr, anTds) {
        var iRow = oSettings.aoData.length, oData = $.extend(!0, {}, DataTable.models.oRow, {
            src: nTr ? "dom" : "data",
            idx: iRow
        });
        oData._aData = aDataIn, oSettings.aoData.push(oData);
        for (var columns = oSettings.aoColumns, i = 0, iLen = columns.length; iLen > i; i++) columns[i].sType = null;
        oSettings.aiDisplayMaster.push(iRow);
        var id = oSettings.rowIdFn(aDataIn);
        return id !== undefined && (oSettings.aIds[id] = oData), (nTr || !oSettings.oFeatures.bDeferRender) && _fnCreateTr(oSettings, iRow, nTr, anTds), 
        iRow;
    }
    function _fnAddTr(settings, trs) {
        var row;
        return trs instanceof $ || (trs = $(trs)), trs.map(function(i, el) {
            return row = _fnGetRowElements(settings, el), _fnAddData(settings, row.data, el, row.cells);
        });
    }
    function _fnNodeToDataIndex(oSettings, n) {
        return n._DT_RowIndex !== undefined ? n._DT_RowIndex : null;
    }
    function _fnNodeToColumnIndex(oSettings, iRow, n) {
        return $.inArray(n, oSettings.aoData[iRow].anCells);
    }
    function _fnGetCellData(settings, rowIdx, colIdx, type) {
        var draw = settings.iDraw, col = settings.aoColumns[colIdx], rowData = settings.aoData[rowIdx]._aData, defaultContent = col.sDefaultContent, cellData = col.fnGetData(rowData, type, {
            settings: settings,
            row: rowIdx,
            col: colIdx
        });
        if (cellData === undefined) return settings.iDrawError != draw && null === defaultContent && (_fnLog(settings, 0, "Requested unknown parameter " + ("function" == typeof col.mData ? "{function}" : "'" + col.mData + "'") + " for row " + rowIdx + ", column " + colIdx, 4), 
        settings.iDrawError = draw), defaultContent;
        if (cellData !== rowData && null !== cellData || null === defaultContent) {
            if ("function" == typeof cellData) return cellData.call(rowData);
        } else cellData = defaultContent;
        return null === cellData && "display" == type ? "" : cellData;
    }
    function _fnSetCellData(settings, rowIdx, colIdx, val) {
        var col = settings.aoColumns[colIdx], rowData = settings.aoData[rowIdx]._aData;
        col.fnSetData(rowData, val, {
            settings: settings,
            row: rowIdx,
            col: colIdx
        });
    }
    function _fnSplitObjNotation(str) {
        return $.map(str.match(/(\\.|[^\.])+/g) || [ "" ], function(s) {
            return s.replace(/\\./g, ".");
        });
    }
    function _fnGetObjectDataFn(mSource) {
        if ($.isPlainObject(mSource)) {
            var o = {};
            return $.each(mSource, function(key, val) {
                val && (o[key] = _fnGetObjectDataFn(val));
            }), function(data, type, row, meta) {
                var t = o[type] || o._;
                return t !== undefined ? t(data, type, row, meta) : data;
            };
        }
        if (null === mSource) return function(data) {
            return data;
        };
        if ("function" == typeof mSource) return function(data, type, row, meta) {
            return mSource(data, type, row, meta);
        };
        if ("string" != typeof mSource || -1 === mSource.indexOf(".") && -1 === mSource.indexOf("[") && -1 === mSource.indexOf("(")) return function(data, type) {
            return data[mSource];
        };
        var fetchData = function(data, type, src) {
            var arrayNotation, funcNotation, out, innerSrc;
            if ("" !== src) for (var a = _fnSplitObjNotation(src), i = 0, iLen = a.length; iLen > i; i++) {
                if (arrayNotation = a[i].match(__reArray), funcNotation = a[i].match(__reFn), arrayNotation) {
                    if (a[i] = a[i].replace(__reArray, ""), "" !== a[i] && (data = data[a[i]]), out = [], 
                    a.splice(0, i + 1), innerSrc = a.join("."), $.isArray(data)) for (var j = 0, jLen = data.length; jLen > j; j++) out.push(fetchData(data[j], type, innerSrc));
                    var join = arrayNotation[0].substring(1, arrayNotation[0].length - 1);
                    data = "" === join ? out : out.join(join);
                    break;
                }
                if (funcNotation) a[i] = a[i].replace(__reFn, ""), data = data[a[i]](); else {
                    if (null === data || data[a[i]] === undefined) return undefined;
                    data = data[a[i]];
                }
            }
            return data;
        };
        return function(data, type) {
            return fetchData(data, type, mSource);
        };
    }
    function _fnSetObjectDataFn(mSource) {
        if ($.isPlainObject(mSource)) return _fnSetObjectDataFn(mSource._);
        if (null === mSource) return function() {};
        if ("function" == typeof mSource) return function(data, val, meta) {
            mSource(data, "set", val, meta);
        };
        if ("string" != typeof mSource || -1 === mSource.indexOf(".") && -1 === mSource.indexOf("[") && -1 === mSource.indexOf("(")) return function(data, val) {
            data[mSource] = val;
        };
        var setData = function(data, val, src) {
            for (var b, arrayNotation, funcNotation, o, innerSrc, a = _fnSplitObjNotation(src), aLast = a[a.length - 1], i = 0, iLen = a.length - 1; iLen > i; i++) {
                if (arrayNotation = a[i].match(__reArray), funcNotation = a[i].match(__reFn), arrayNotation) {
                    if (a[i] = a[i].replace(__reArray, ""), data[a[i]] = [], b = a.slice(), b.splice(0, i + 1), 
                    innerSrc = b.join("."), $.isArray(val)) for (var j = 0, jLen = val.length; jLen > j; j++) o = {}, 
                    setData(o, val[j], innerSrc), data[a[i]].push(o); else data[a[i]] = val;
                    return;
                }
                funcNotation && (a[i] = a[i].replace(__reFn, ""), data = data[a[i]](val)), (null === data[a[i]] || data[a[i]] === undefined) && (data[a[i]] = {}), 
                data = data[a[i]];
            }
            aLast.match(__reFn) ? data = data[aLast.replace(__reFn, "")](val) : data[aLast.replace(__reArray, "")] = val;
        };
        return function(data, val) {
            return setData(data, val, mSource);
        };
    }
    function _fnGetDataMaster(settings) {
        return _pluck(settings.aoData, "_aData");
    }
    function _fnClearTable(settings) {
        settings.aoData.length = 0, settings.aiDisplayMaster.length = 0, settings.aiDisplay.length = 0, 
        settings.aIds = {};
    }
    function _fnDeleteIndex(a, iTarget, splice) {
        for (var iTargetIndex = -1, i = 0, iLen = a.length; iLen > i; i++) a[i] == iTarget ? iTargetIndex = i : a[i] > iTarget && a[i]--;
        -1 != iTargetIndex && splice === undefined && a.splice(iTargetIndex, 1);
    }
    function _fnInvalidate(settings, rowIdx, src, colIdx) {
        var i, ien, row = settings.aoData[rowIdx], cellWrite = function(cell, col) {
            for (;cell.childNodes.length; ) cell.removeChild(cell.firstChild);
            cell.innerHTML = _fnGetCellData(settings, rowIdx, col, "display");
        };
        if ("dom" !== src && (src && "auto" !== src || "dom" !== row.src)) {
            var cells = row.anCells;
            if (cells) if (colIdx !== undefined) cellWrite(cells[colIdx], colIdx); else for (i = 0, 
            ien = cells.length; ien > i; i++) cellWrite(cells[i], i);
        } else row._aData = _fnGetRowElements(settings, row, colIdx, colIdx === undefined ? undefined : row._aData).data;
        row._aSortData = null, row._aFilterData = null;
        var cols = settings.aoColumns;
        if (colIdx !== undefined) cols[colIdx].sType = null; else {
            for (i = 0, ien = cols.length; ien > i; i++) cols[i].sType = null;
            _fnRowAttributes(settings, row);
        }
    }
    function _fnGetRowElements(settings, row, colIdx, d) {
        var name, col, contents, tds = [], td = row.firstChild, i = 0, columns = settings.aoColumns, objectRead = settings._rowReadObject;
        d = d !== undefined ? d : objectRead ? {} : [];
        var attr = function(str, td) {
            if ("string" == typeof str) {
                var idx = str.indexOf("@");
                if (-1 !== idx) {
                    var attr = str.substring(idx + 1), setter = _fnSetObjectDataFn(str);
                    setter(d, td.getAttribute(attr));
                }
            }
        }, cellProcess = function(cell) {
            if (colIdx === undefined || colIdx === i) if (col = columns[i], contents = $.trim(cell.innerHTML), 
            col && col._bAttrSrc) {
                var setter = _fnSetObjectDataFn(col.mData._);
                setter(d, contents), attr(col.mData.sort, cell), attr(col.mData.type, cell), attr(col.mData.filter, cell);
            } else objectRead ? (col._setter || (col._setter = _fnSetObjectDataFn(col.mData)), 
            col._setter(d, contents)) : d[i] = contents;
            i++;
        };
        if (td) for (;td; ) name = td.nodeName.toUpperCase(), ("TD" == name || "TH" == name) && (cellProcess(td), 
        tds.push(td)), td = td.nextSibling; else {
            tds = row.anCells;
            for (var j = 0, jen = tds.length; jen > j; j++) cellProcess(tds[j]);
        }
        var rowNode = row.firstChild ? row : row.nTr;
        if (rowNode) {
            var id = rowNode.getAttribute("id");
            id && _fnSetObjectDataFn(settings.rowId)(d, id);
        }
        return {
            data: d,
            cells: tds
        };
    }
    function _fnCreateTr(oSettings, iRow, nTrIn, anTds) {
        var nTr, nTd, oCol, i, iLen, row = oSettings.aoData[iRow], rowData = row._aData, cells = [];
        if (null === row.nTr) {
            for (nTr = nTrIn || document.createElement("tr"), row.nTr = nTr, row.anCells = cells, 
            nTr._DT_RowIndex = iRow, _fnRowAttributes(oSettings, row), i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) oCol = oSettings.aoColumns[i], 
            nTd = nTrIn ? anTds[i] : document.createElement(oCol.sCellType), nTd._DT_CellIndex = {
                row: iRow,
                column: i
            }, cells.push(nTd), (!nTrIn || oCol.mRender || oCol.mData !== i) && (nTd.innerHTML = _fnGetCellData(oSettings, iRow, i, "display")), 
            oCol.sClass && (nTd.className += " " + oCol.sClass), oCol.bVisible && !nTrIn ? nTr.appendChild(nTd) : !oCol.bVisible && nTrIn && nTd.parentNode.removeChild(nTd), 
            oCol.fnCreatedCell && oCol.fnCreatedCell.call(oSettings.oInstance, nTd, _fnGetCellData(oSettings, iRow, i), rowData, iRow, i);
            _fnCallbackFire(oSettings, "aoRowCreatedCallback", null, [ nTr, rowData, iRow ]);
        }
        row.nTr.setAttribute("role", "row");
    }
    function _fnRowAttributes(settings, row) {
        var tr = row.nTr, data = row._aData;
        if (tr) {
            var id = settings.rowIdFn(data);
            if (id && (tr.id = id), data.DT_RowClass) {
                var a = data.DT_RowClass.split(" ");
                row.__rowc = row.__rowc ? _unique(row.__rowc.concat(a)) : a, $(tr).removeClass(row.__rowc.join(" ")).addClass(data.DT_RowClass);
            }
            data.DT_RowAttr && $(tr).attr(data.DT_RowAttr), data.DT_RowData && $(tr).data(data.DT_RowData);
        }
    }
    function _fnBuildHead(oSettings) {
        var i, ien, cell, row, column, thead = oSettings.nTHead, tfoot = oSettings.nTFoot, createHeader = 0 === $("th, td", thead).length, classes = oSettings.oClasses, columns = oSettings.aoColumns;
        for (createHeader && (row = $("<tr/>").appendTo(thead)), i = 0, ien = columns.length; ien > i; i++) column = columns[i], 
        cell = $(column.nTh).addClass(column.sClass), createHeader && cell.appendTo(row), 
        oSettings.oFeatures.bSort && (cell.addClass(column.sSortingClass), column.bSortable !== !1 && (cell.attr("tabindex", oSettings.iTabIndex).attr("aria-controls", oSettings.sTableId), 
        _fnSortAttachListener(oSettings, column.nTh, i))), column.sTitle != cell[0].innerHTML && cell.html(column.sTitle), 
        _fnRenderer(oSettings, "header")(oSettings, cell, column, classes);
        if (createHeader && _fnDetectHeader(oSettings.aoHeader, thead), $(thead).find(">tr").attr("role", "row"), 
        $(thead).find(">tr>th, >tr>td").addClass(classes.sHeaderTH), $(tfoot).find(">tr>th, >tr>td").addClass(classes.sFooterTH), 
        null !== tfoot) {
            var cells = oSettings.aoFooter[0];
            for (i = 0, ien = cells.length; ien > i; i++) column = columns[i], column.nTf = cells[i].cell, 
            column.sClass && $(column.nTf).addClass(column.sClass);
        }
    }
    function _fnDrawHead(oSettings, aoSource, bIncludeHidden) {
        var i, iLen, j, jLen, k, n, nLocalTr, iRowspan, iColspan, aoLocal = [], aApplied = [], iColumns = oSettings.aoColumns.length;
        if (aoSource) {
            for (bIncludeHidden === undefined && (bIncludeHidden = !1), i = 0, iLen = aoSource.length; iLen > i; i++) {
                for (aoLocal[i] = aoSource[i].slice(), aoLocal[i].nTr = aoSource[i].nTr, j = iColumns - 1; j >= 0; j--) oSettings.aoColumns[j].bVisible || bIncludeHidden || aoLocal[i].splice(j, 1);
                aApplied.push([]);
            }
            for (i = 0, iLen = aoLocal.length; iLen > i; i++) {
                if (nLocalTr = aoLocal[i].nTr) for (;n = nLocalTr.firstChild; ) nLocalTr.removeChild(n);
                for (j = 0, jLen = aoLocal[i].length; jLen > j; j++) if (iRowspan = 1, iColspan = 1, 
                aApplied[i][j] === undefined) {
                    for (nLocalTr.appendChild(aoLocal[i][j].cell), aApplied[i][j] = 1; aoLocal[i + iRowspan] !== undefined && aoLocal[i][j].cell == aoLocal[i + iRowspan][j].cell; ) aApplied[i + iRowspan][j] = 1, 
                    iRowspan++;
                    for (;aoLocal[i][j + iColspan] !== undefined && aoLocal[i][j].cell == aoLocal[i][j + iColspan].cell; ) {
                        for (k = 0; iRowspan > k; k++) aApplied[i + k][j + iColspan] = 1;
                        iColspan++;
                    }
                    $(aoLocal[i][j].cell).attr("rowspan", iRowspan).attr("colspan", iColspan);
                }
            }
        }
    }
    function _fnDraw(oSettings) {
        var aPreDraw = _fnCallbackFire(oSettings, "aoPreDrawCallback", "preDraw", [ oSettings ]);
        if (-1 !== $.inArray(!1, aPreDraw)) return void _fnProcessingDisplay(oSettings, !1);
        var anRows = [], iRowCount = 0, asStripeClasses = oSettings.asStripeClasses, iStripes = asStripeClasses.length, oLang = (oSettings.aoOpenRows.length, 
        oSettings.oLanguage), iInitDisplayStart = oSettings.iInitDisplayStart, bServerSide = "ssp" == _fnDataSource(oSettings), aiDisplay = oSettings.aiDisplay;
        oSettings.bDrawing = !0, iInitDisplayStart !== undefined && -1 !== iInitDisplayStart && (oSettings._iDisplayStart = bServerSide ? iInitDisplayStart : iInitDisplayStart >= oSettings.fnRecordsDisplay() ? 0 : iInitDisplayStart, 
        oSettings.iInitDisplayStart = -1);
        var iDisplayStart = oSettings._iDisplayStart, iDisplayEnd = oSettings.fnDisplayEnd();
        if (oSettings.bDeferLoading) oSettings.bDeferLoading = !1, oSettings.iDraw++, _fnProcessingDisplay(oSettings, !1); else if (bServerSide) {
            if (!oSettings.bDestroying && !_fnAjaxUpdate(oSettings)) return;
        } else oSettings.iDraw++;
        if (0 !== aiDisplay.length) for (var iStart = bServerSide ? 0 : iDisplayStart, iEnd = bServerSide ? oSettings.aoData.length : iDisplayEnd, j = iStart; iEnd > j; j++) {
            var iDataIndex = aiDisplay[j], aoData = oSettings.aoData[iDataIndex];
            null === aoData.nTr && _fnCreateTr(oSettings, iDataIndex);
            var nRow = aoData.nTr;
            if (0 !== iStripes) {
                var sStripe = asStripeClasses[iRowCount % iStripes];
                aoData._sRowStripe != sStripe && ($(nRow).removeClass(aoData._sRowStripe).addClass(sStripe), 
                aoData._sRowStripe = sStripe);
            }
            _fnCallbackFire(oSettings, "aoRowCallback", null, [ nRow, aoData._aData, iRowCount, j ]), 
            anRows.push(nRow), iRowCount++;
        } else {
            var sZero = oLang.sZeroRecords;
            1 == oSettings.iDraw && "ajax" == _fnDataSource(oSettings) ? sZero = oLang.sLoadingRecords : oLang.sEmptyTable && 0 === oSettings.fnRecordsTotal() && (sZero = oLang.sEmptyTable), 
            anRows[0] = $("<tr/>", {
                "class": iStripes ? asStripeClasses[0] : ""
            }).append($("<td />", {
                valign: "top",
                colSpan: _fnVisbleColumns(oSettings),
                "class": oSettings.oClasses.sRowEmpty
            }).html(sZero))[0];
        }
        _fnCallbackFire(oSettings, "aoHeaderCallback", "header", [ $(oSettings.nTHead).children("tr")[0], _fnGetDataMaster(oSettings), iDisplayStart, iDisplayEnd, aiDisplay ]), 
        _fnCallbackFire(oSettings, "aoFooterCallback", "footer", [ $(oSettings.nTFoot).children("tr")[0], _fnGetDataMaster(oSettings), iDisplayStart, iDisplayEnd, aiDisplay ]);
        var body = $(oSettings.nTBody);
        body.children().detach(), body.append($(anRows)), _fnCallbackFire(oSettings, "aoDrawCallback", "draw", [ oSettings ]), 
        oSettings.bSorted = !1, oSettings.bFiltered = !1, oSettings.bDrawing = !1;
    }
    function _fnReDraw(settings, holdPosition) {
        var features = settings.oFeatures, sort = features.bSort, filter = features.bFilter;
        sort && _fnSort(settings), filter ? _fnFilterComplete(settings, settings.oPreviousSearch) : settings.aiDisplay = settings.aiDisplayMaster.slice(), 
        holdPosition !== !0 && (settings._iDisplayStart = 0), settings._drawHold = holdPosition, 
        _fnDraw(settings), settings._drawHold = !1;
    }
    function _fnAddOptionsHtml(oSettings) {
        var classes = oSettings.oClasses, table = $(oSettings.nTable), holding = $("<div/>").insertBefore(table), features = oSettings.oFeatures, insert = $("<div/>", {
            id: oSettings.sTableId + "_wrapper",
            "class": classes.sWrapper + (oSettings.nTFoot ? "" : " " + classes.sNoFooter)
        });
        oSettings.nHolding = holding[0], oSettings.nTableWrapper = insert[0], oSettings.nTableReinsertBefore = oSettings.nTable.nextSibling;
        for (var featureNode, cOption, nNewNode, cNext, sAttr, j, aDom = oSettings.sDom.split(""), i = 0; i < aDom.length; i++) {
            if (featureNode = null, cOption = aDom[i], "<" == cOption) {
                if (nNewNode = $("<div/>")[0], cNext = aDom[i + 1], "'" == cNext || '"' == cNext) {
                    for (sAttr = "", j = 2; aDom[i + j] != cNext; ) sAttr += aDom[i + j], j++;
                    if ("H" == sAttr ? sAttr = classes.sJUIHeader : "F" == sAttr && (sAttr = classes.sJUIFooter), 
                    -1 != sAttr.indexOf(".")) {
                        var aSplit = sAttr.split(".");
                        nNewNode.id = aSplit[0].substr(1, aSplit[0].length - 1), nNewNode.className = aSplit[1];
                    } else "#" == sAttr.charAt(0) ? nNewNode.id = sAttr.substr(1, sAttr.length - 1) : nNewNode.className = sAttr;
                    i += j;
                }
                insert.append(nNewNode), insert = $(nNewNode);
            } else if (">" == cOption) insert = insert.parent(); else if ("l" == cOption && features.bPaginate && features.bLengthChange) featureNode = _fnFeatureHtmlLength(oSettings); else if ("f" == cOption && features.bFilter) featureNode = _fnFeatureHtmlFilter(oSettings); else if ("r" == cOption && features.bProcessing) featureNode = _fnFeatureHtmlProcessing(oSettings); else if ("t" == cOption) featureNode = _fnFeatureHtmlTable(oSettings); else if ("i" == cOption && features.bInfo) featureNode = _fnFeatureHtmlInfo(oSettings); else if ("p" == cOption && features.bPaginate) featureNode = _fnFeatureHtmlPaginate(oSettings); else if (0 !== DataTable.ext.feature.length) for (var aoFeatures = DataTable.ext.feature, k = 0, kLen = aoFeatures.length; kLen > k; k++) if (cOption == aoFeatures[k].cFeature) {
                featureNode = aoFeatures[k].fnInit(oSettings);
                break;
            }
            if (featureNode) {
                var aanFeatures = oSettings.aanFeatures;
                aanFeatures[cOption] || (aanFeatures[cOption] = []), aanFeatures[cOption].push(featureNode), 
                insert.append(featureNode);
            }
        }
        holding.replaceWith(insert), oSettings.nHolding = null;
    }
    function _fnDetectHeader(aLayout, nThead) {
        var nTr, nCell, i, k, l, iLen, iColShifted, iColumn, iColspan, iRowspan, bUnique, nTrs = $(nThead).children("tr"), fnShiftCol = function(a, i, j) {
            for (var k = a[i]; k[j]; ) j++;
            return j;
        };
        for (aLayout.splice(0, aLayout.length), i = 0, iLen = nTrs.length; iLen > i; i++) aLayout.push([]);
        for (i = 0, iLen = nTrs.length; iLen > i; i++) for (nTr = nTrs[i], iColumn = 0, 
        nCell = nTr.firstChild; nCell; ) {
            if ("TD" == nCell.nodeName.toUpperCase() || "TH" == nCell.nodeName.toUpperCase()) for (iColspan = 1 * nCell.getAttribute("colspan"), 
            iRowspan = 1 * nCell.getAttribute("rowspan"), iColspan = iColspan && 0 !== iColspan && 1 !== iColspan ? iColspan : 1, 
            iRowspan = iRowspan && 0 !== iRowspan && 1 !== iRowspan ? iRowspan : 1, iColShifted = fnShiftCol(aLayout, i, iColumn), 
            bUnique = 1 === iColspan ? !0 : !1, l = 0; iColspan > l; l++) for (k = 0; iRowspan > k; k++) aLayout[i + k][iColShifted + l] = {
                cell: nCell,
                unique: bUnique
            }, aLayout[i + k].nTr = nTr;
            nCell = nCell.nextSibling;
        }
    }
    function _fnGetUniqueThs(oSettings, nHeader, aLayout) {
        var aReturn = [];
        aLayout || (aLayout = oSettings.aoHeader, nHeader && (aLayout = [], _fnDetectHeader(aLayout, nHeader)));
        for (var i = 0, iLen = aLayout.length; iLen > i; i++) for (var j = 0, jLen = aLayout[i].length; jLen > j; j++) !aLayout[i][j].unique || aReturn[j] && oSettings.bSortCellsTop || (aReturn[j] = aLayout[i][j].cell);
        return aReturn;
    }
    function _fnBuildAjax(oSettings, data, fn) {
        if (_fnCallbackFire(oSettings, "aoServerParams", "serverParams", [ data ]), data && $.isArray(data)) {
            var tmp = {}, rbracket = /(.*?)\[\]$/;
            $.each(data, function(key, val) {
                var match = val.name.match(rbracket);
                if (match) {
                    var name = match[0];
                    tmp[name] || (tmp[name] = []), tmp[name].push(val.value);
                } else tmp[val.name] = val.value;
            }), data = tmp;
        }
        var ajaxData, ajax = oSettings.ajax, instance = oSettings.oInstance, callback = function(json) {
            _fnCallbackFire(oSettings, null, "xhr", [ oSettings, json, oSettings.jqXHR ]), fn(json);
        };
        if ($.isPlainObject(ajax) && ajax.data) {
            ajaxData = ajax.data;
            var newData = $.isFunction(ajaxData) ? ajaxData(data, oSettings) : ajaxData;
            data = $.isFunction(ajaxData) && newData ? newData : $.extend(!0, data, newData), 
            delete ajax.data;
        }
        var baseAjax = {
            data: data,
            success: function(json) {
                var error = json.error || json.sError;
                error && _fnLog(oSettings, 0, error), oSettings.json = json, callback(json);
            },
            dataType: "json",
            cache: !1,
            type: oSettings.sServerMethod,
            error: function(xhr, error, thrown) {
                var ret = _fnCallbackFire(oSettings, null, "xhr", [ oSettings, null, oSettings.jqXHR ]);
                -1 === $.inArray(!0, ret) && ("parsererror" == error ? _fnLog(oSettings, 0, "Invalid JSON response", 1) : 4 === xhr.readyState && _fnLog(oSettings, 0, "Ajax error", 7)), 
                _fnProcessingDisplay(oSettings, !1);
            }
        };
        oSettings.oAjaxData = data, _fnCallbackFire(oSettings, null, "preXhr", [ oSettings, data ]), 
        oSettings.fnServerData ? oSettings.fnServerData.call(instance, oSettings.sAjaxSource, $.map(data, function(val, key) {
            return {
                name: key,
                value: val
            };
        }), callback, oSettings) : oSettings.sAjaxSource || "string" == typeof ajax ? oSettings.jqXHR = $.ajax($.extend(baseAjax, {
            url: ajax || oSettings.sAjaxSource
        })) : $.isFunction(ajax) ? oSettings.jqXHR = ajax.call(instance, data, callback, oSettings) : (oSettings.jqXHR = $.ajax($.extend(baseAjax, ajax)), 
        ajax.data = ajaxData);
    }
    function _fnAjaxUpdate(settings) {
        return settings.bAjaxDataGet ? (settings.iDraw++, _fnProcessingDisplay(settings, !0), 
        _fnBuildAjax(settings, _fnAjaxParameters(settings), function(json) {
            _fnAjaxUpdateDraw(settings, json);
        }), !1) : !0;
    }
    function _fnAjaxParameters(settings) {
        var i, dataProp, column, columnSearch, columns = settings.aoColumns, columnCount = columns.length, features = settings.oFeatures, preSearch = settings.oPreviousSearch, preColSearch = settings.aoPreSearchCols, data = [], sort = _fnSortFlatten(settings), displayStart = settings._iDisplayStart, displayLength = features.bPaginate !== !1 ? settings._iDisplayLength : -1, param = function(name, value) {
            data.push({
                name: name,
                value: value
            });
        };
        param("sEcho", settings.iDraw), param("iColumns", columnCount), param("sColumns", _pluck(columns, "sName").join(",")), 
        param("iDisplayStart", displayStart), param("iDisplayLength", displayLength);
        var d = {
            draw: settings.iDraw,
            columns: [],
            order: [],
            start: displayStart,
            length: displayLength,
            search: {
                value: preSearch.sSearch,
                regex: preSearch.bRegex
            }
        };
        for (i = 0; columnCount > i; i++) column = columns[i], columnSearch = preColSearch[i], 
        dataProp = "function" == typeof column.mData ? "function" : column.mData, d.columns.push({
            data: dataProp,
            name: column.sName,
            searchable: column.bSearchable,
            orderable: column.bSortable,
            search: {
                value: columnSearch.sSearch,
                regex: columnSearch.bRegex
            }
        }), param("mDataProp_" + i, dataProp), features.bFilter && (param("sSearch_" + i, columnSearch.sSearch), 
        param("bRegex_" + i, columnSearch.bRegex), param("bSearchable_" + i, column.bSearchable)), 
        features.bSort && param("bSortable_" + i, column.bSortable);
        features.bFilter && (param("sSearch", preSearch.sSearch), param("bRegex", preSearch.bRegex)), 
        features.bSort && ($.each(sort, function(i, val) {
            d.order.push({
                column: val.col,
                dir: val.dir
            }), param("iSortCol_" + i, val.col), param("sSortDir_" + i, val.dir);
        }), param("iSortingCols", sort.length));
        var legacy = DataTable.ext.legacy.ajax;
        return null === legacy ? settings.sAjaxSource ? data : d : legacy ? data : d;
    }
    function _fnAjaxUpdateDraw(settings, json) {
        var compat = function(old, modern) {
            return json[old] !== undefined ? json[old] : json[modern];
        }, data = _fnAjaxDataSrc(settings, json), draw = compat("sEcho", "draw"), recordsTotal = compat("iTotalRecords", "recordsTotal"), recordsFiltered = compat("iTotalDisplayRecords", "recordsFiltered");
        if (draw) {
            if (1 * draw < settings.iDraw) return;
            settings.iDraw = 1 * draw;
        }
        _fnClearTable(settings), settings._iRecordsTotal = parseInt(recordsTotal, 10), settings._iRecordsDisplay = parseInt(recordsFiltered, 10);
        for (var i = 0, ien = data.length; ien > i; i++) _fnAddData(settings, data[i]);
        settings.aiDisplay = settings.aiDisplayMaster.slice(), settings.bAjaxDataGet = !1, 
        _fnDraw(settings), settings._bInitComplete || _fnInitComplete(settings, json), settings.bAjaxDataGet = !0, 
        _fnProcessingDisplay(settings, !1);
    }
    function _fnAjaxDataSrc(oSettings, json) {
        var dataSrc = $.isPlainObject(oSettings.ajax) && oSettings.ajax.dataSrc !== undefined ? oSettings.ajax.dataSrc : oSettings.sAjaxDataProp;
        return "data" === dataSrc ? json.aaData || json[dataSrc] : "" !== dataSrc ? _fnGetObjectDataFn(dataSrc)(json) : json;
    }
    function _fnFeatureHtmlFilter(settings) {
        var classes = settings.oClasses, tableId = settings.sTableId, language = settings.oLanguage, previousSearch = settings.oPreviousSearch, features = settings.aanFeatures, input = '<input type="search" class="' + classes.sFilterInput + '"/>', str = language.sSearch;
        str = str.match(/_INPUT_/) ? str.replace("_INPUT_", input) : str + input;
        var filter = $("<div/>", {
            id: features.f ? null : tableId + "_filter",
            "class": classes.sFilter
        }).append($("<label/>").append(str)), searchFn = function() {
            var val = (features.f, this.value ? this.value : "");
            val != previousSearch.sSearch && (_fnFilterComplete(settings, {
                sSearch: val,
                bRegex: previousSearch.bRegex,
                bSmart: previousSearch.bSmart,
                bCaseInsensitive: previousSearch.bCaseInsensitive
            }), settings._iDisplayStart = 0, _fnDraw(settings));
        }, searchDelay = null !== settings.searchDelay ? settings.searchDelay : "ssp" === _fnDataSource(settings) ? 400 : 0, jqFilter = $("input", filter).val(previousSearch.sSearch).attr("placeholder", language.sSearchPlaceholder).bind("keyup.DT search.DT input.DT paste.DT cut.DT", searchDelay ? _fnThrottle(searchFn, searchDelay) : searchFn).bind("keypress.DT", function(e) {
            return 13 == e.keyCode ? !1 : void 0;
        }).attr("aria-controls", tableId);
        return $(settings.nTable).on("search.dt.DT", function(ev, s) {
            if (settings === s) try {
                jqFilter[0] !== document.activeElement && jqFilter.val(previousSearch.sSearch);
            } catch (e) {}
        }), filter[0];
    }
    function _fnFilterComplete(oSettings, oInput, iForce) {
        var oPrevSearch = oSettings.oPreviousSearch, aoPrevSearch = oSettings.aoPreSearchCols, fnSaveFilter = function(oFilter) {
            oPrevSearch.sSearch = oFilter.sSearch, oPrevSearch.bRegex = oFilter.bRegex, oPrevSearch.bSmart = oFilter.bSmart, 
            oPrevSearch.bCaseInsensitive = oFilter.bCaseInsensitive;
        }, fnRegex = function(o) {
            return o.bEscapeRegex !== undefined ? !o.bEscapeRegex : o.bRegex;
        };
        if (_fnColumnTypes(oSettings), "ssp" != _fnDataSource(oSettings)) {
            _fnFilter(oSettings, oInput.sSearch, iForce, fnRegex(oInput), oInput.bSmart, oInput.bCaseInsensitive), 
            fnSaveFilter(oInput);
            for (var i = 0; i < aoPrevSearch.length; i++) _fnFilterColumn(oSettings, aoPrevSearch[i].sSearch, i, fnRegex(aoPrevSearch[i]), aoPrevSearch[i].bSmart, aoPrevSearch[i].bCaseInsensitive);
            _fnFilterCustom(oSettings);
        } else fnSaveFilter(oInput);
        oSettings.bFiltered = !0, _fnCallbackFire(oSettings, null, "search", [ oSettings ]);
    }
    function _fnFilterCustom(settings) {
        for (var row, rowIdx, filters = DataTable.ext.search, displayRows = settings.aiDisplay, i = 0, ien = filters.length; ien > i; i++) {
            for (var rows = [], j = 0, jen = displayRows.length; jen > j; j++) rowIdx = displayRows[j], 
            row = settings.aoData[rowIdx], filters[i](settings, row._aFilterData, rowIdx, row._aData, j) && rows.push(rowIdx);
            displayRows.length = 0, $.merge(displayRows, rows);
        }
    }
    function _fnFilterColumn(settings, searchStr, colIdx, regex, smart, caseInsensitive) {
        if ("" !== searchStr) for (var data, display = settings.aiDisplay, rpSearch = _fnFilterCreateSearch(searchStr, regex, smart, caseInsensitive), i = display.length - 1; i >= 0; i--) data = settings.aoData[display[i]]._aFilterData[colIdx], 
        rpSearch.test(data) || display.splice(i, 1);
    }
    function _fnFilter(settings, input, force, regex, smart, caseInsensitive) {
        var display, invalidated, i, rpSearch = _fnFilterCreateSearch(input, regex, smart, caseInsensitive), prevSearch = settings.oPreviousSearch.sSearch, displayMaster = settings.aiDisplayMaster;
        if (0 !== DataTable.ext.search.length && (force = !0), invalidated = _fnFilterData(settings), 
        input.length <= 0) settings.aiDisplay = displayMaster.slice(); else for ((invalidated || force || prevSearch.length > input.length || 0 !== input.indexOf(prevSearch) || settings.bSorted) && (settings.aiDisplay = displayMaster.slice()), 
        display = settings.aiDisplay, i = display.length - 1; i >= 0; i--) rpSearch.test(settings.aoData[display[i]]._sFilterRow) || display.splice(i, 1);
    }
    function _fnFilterCreateSearch(search, regex, smart, caseInsensitive) {
        if (search = regex ? search : _fnEscapeRegex(search), smart) {
            var a = $.map(search.match(/"[^"]+"|[^ ]+/g) || [ "" ], function(word) {
                if ('"' === word.charAt(0)) {
                    var m = word.match(/^"(.*)"$/);
                    word = m ? m[1] : word;
                }
                return word.replace('"', "");
            });
            search = "^(?=.*?" + a.join(")(?=.*?") + ").*$";
        }
        return new RegExp(search, caseInsensitive ? "i" : "");
    }
    function _fnEscapeRegex(sVal) {
        return sVal.replace(_re_escape_regex, "\\$1");
    }
    function _fnFilterData(settings) {
        var column, i, j, ien, jen, filterData, cellData, row, columns = settings.aoColumns, fomatters = DataTable.ext.type.search, wasInvalidated = !1;
        for (i = 0, ien = settings.aoData.length; ien > i; i++) if (row = settings.aoData[i], 
        !row._aFilterData) {
            for (filterData = [], j = 0, jen = columns.length; jen > j; j++) column = columns[j], 
            column.bSearchable ? (cellData = _fnGetCellData(settings, i, j, "filter"), fomatters[column.sType] && (cellData = fomatters[column.sType](cellData)), 
            null === cellData && (cellData = ""), "string" != typeof cellData && cellData.toString && (cellData = cellData.toString())) : cellData = "", 
            cellData.indexOf && -1 !== cellData.indexOf("&") && (__filter_div.innerHTML = cellData, 
            cellData = __filter_div_textContent ? __filter_div.textContent : __filter_div.innerText), 
            cellData.replace && (cellData = cellData.replace(/[\r\n]/g, "")), filterData.push(cellData);
            row._aFilterData = filterData, row._sFilterRow = filterData.join("  "), wasInvalidated = !0;
        }
        return wasInvalidated;
    }
    function _fnSearchToCamel(obj) {
        return {
            search: obj.sSearch,
            smart: obj.bSmart,
            regex: obj.bRegex,
            caseInsensitive: obj.bCaseInsensitive
        };
    }
    function _fnSearchToHung(obj) {
        return {
            sSearch: obj.search,
            bSmart: obj.smart,
            bRegex: obj.regex,
            bCaseInsensitive: obj.caseInsensitive
        };
    }
    function _fnFeatureHtmlInfo(settings) {
        var tid = settings.sTableId, nodes = settings.aanFeatures.i, n = $("<div/>", {
            "class": settings.oClasses.sInfo,
            id: nodes ? null : tid + "_info"
        });
        return nodes || (settings.aoDrawCallback.push({
            fn: _fnUpdateInfo,
            sName: "information"
        }), n.attr("role", "status").attr("aria-live", "polite"), $(settings.nTable).attr("aria-describedby", tid + "_info")), 
        n[0];
    }
    function _fnUpdateInfo(settings) {
        var nodes = settings.aanFeatures.i;
        if (0 !== nodes.length) {
            var lang = settings.oLanguage, start = settings._iDisplayStart + 1, end = settings.fnDisplayEnd(), max = settings.fnRecordsTotal(), total = settings.fnRecordsDisplay(), out = total ? lang.sInfo : lang.sInfoEmpty;
            total !== max && (out += " " + lang.sInfoFiltered), out += lang.sInfoPostFix, out = _fnInfoMacros(settings, out);
            var callback = lang.fnInfoCallback;
            null !== callback && (out = callback.call(settings.oInstance, settings, start, end, max, total, out)), 
            $(nodes).html(out);
        }
    }
    function _fnInfoMacros(settings, str) {
        var formatter = settings.fnFormatNumber, start = settings._iDisplayStart + 1, len = settings._iDisplayLength, vis = settings.fnRecordsDisplay(), all = -1 === len;
        return str.replace(/_START_/g, formatter.call(settings, start)).replace(/_END_/g, formatter.call(settings, settings.fnDisplayEnd())).replace(/_MAX_/g, formatter.call(settings, settings.fnRecordsTotal())).replace(/_TOTAL_/g, formatter.call(settings, vis)).replace(/_PAGE_/g, formatter.call(settings, all ? 1 : Math.ceil(start / len))).replace(/_PAGES_/g, formatter.call(settings, all ? 1 : Math.ceil(vis / len)));
    }
    function _fnInitialise(settings) {
        var i, iLen, column, iAjaxStart = settings.iInitDisplayStart, columns = settings.aoColumns, features = settings.oFeatures, deferLoading = settings.bDeferLoading;
        if (!settings.bInitialised) return void setTimeout(function() {
            _fnInitialise(settings);
        }, 200);
        for (_fnAddOptionsHtml(settings), _fnBuildHead(settings), _fnDrawHead(settings, settings.aoHeader), 
        _fnDrawHead(settings, settings.aoFooter), _fnProcessingDisplay(settings, !0), features.bAutoWidth && _fnCalculateColumnWidths(settings), 
        i = 0, iLen = columns.length; iLen > i; i++) column = columns[i], column.sWidth && (column.nTh.style.width = _fnStringToCss(column.sWidth));
        _fnCallbackFire(settings, null, "preInit", [ settings ]), _fnReDraw(settings);
        var dataSrc = _fnDataSource(settings);
        ("ssp" != dataSrc || deferLoading) && ("ajax" == dataSrc ? _fnBuildAjax(settings, [], function(json) {
            var aData = _fnAjaxDataSrc(settings, json);
            for (i = 0; i < aData.length; i++) _fnAddData(settings, aData[i]);
            settings.iInitDisplayStart = iAjaxStart, _fnReDraw(settings), _fnProcessingDisplay(settings, !1), 
            _fnInitComplete(settings, json);
        }, settings) : (_fnProcessingDisplay(settings, !1), _fnInitComplete(settings)));
    }
    function _fnInitComplete(settings, json) {
        settings._bInitComplete = !0, (json || settings.oInit.aaData) && _fnAdjustColumnSizing(settings), 
        _fnCallbackFire(settings, null, "plugin-init", [ settings, json ]), _fnCallbackFire(settings, "aoInitComplete", "init", [ settings, json ]);
    }
    function _fnLengthChange(settings, val) {
        var len = parseInt(val, 10);
        settings._iDisplayLength = len, _fnLengthOverflow(settings), _fnCallbackFire(settings, null, "length", [ settings, len ]);
    }
    function _fnFeatureHtmlLength(settings) {
        for (var classes = settings.oClasses, tableId = settings.sTableId, menu = settings.aLengthMenu, d2 = $.isArray(menu[0]), lengths = d2 ? menu[0] : menu, language = d2 ? menu[1] : menu, select = $("<select/>", {
            name: tableId + "_length",
            "aria-controls": tableId,
            "class": classes.sLengthSelect
        }), i = 0, ien = lengths.length; ien > i; i++) select[0][i] = new Option(language[i], lengths[i]);
        var div = $("<div><label/></div>").addClass(classes.sLength);
        return settings.aanFeatures.l || (div[0].id = tableId + "_length"), div.children().append(settings.oLanguage.sLengthMenu.replace("_MENU_", select[0].outerHTML)), 
        $("select", div).val(settings._iDisplayLength).bind("change.DT", function(e) {
            _fnLengthChange(settings, $(this).val()), _fnDraw(settings);
        }), $(settings.nTable).bind("length.dt.DT", function(e, s, len) {
            settings === s && $("select", div).val(len);
        }), div[0];
    }
    function _fnFeatureHtmlPaginate(settings) {
        var type = settings.sPaginationType, plugin = DataTable.ext.pager[type], modern = "function" == typeof plugin, redraw = function(settings) {
            _fnDraw(settings);
        }, node = $("<div/>").addClass(settings.oClasses.sPaging + type)[0], features = settings.aanFeatures;
        return modern || plugin.fnInit(settings, node, redraw), features.p || (node.id = settings.sTableId + "_paginate", 
        settings.aoDrawCallback.push({
            fn: function(settings) {
                if (modern) {
                    var i, ien, start = settings._iDisplayStart, len = settings._iDisplayLength, visRecords = settings.fnRecordsDisplay(), all = -1 === len, page = all ? 0 : Math.ceil(start / len), pages = all ? 1 : Math.ceil(visRecords / len), buttons = plugin(page, pages);
                    for (i = 0, ien = features.p.length; ien > i; i++) _fnRenderer(settings, "pageButton")(settings, features.p[i], i, buttons, page, pages);
                } else plugin.fnUpdate(settings, redraw);
            },
            sName: "pagination"
        })), node;
    }
    function _fnPageChange(settings, action, redraw) {
        var start = settings._iDisplayStart, len = settings._iDisplayLength, records = settings.fnRecordsDisplay();
        0 === records || -1 === len ? start = 0 : "number" == typeof action ? (start = action * len, 
        start > records && (start = 0)) : "first" == action ? start = 0 : "previous" == action ? (start = len >= 0 ? start - len : 0, 
        0 > start && (start = 0)) : "next" == action ? records > start + len && (start += len) : "last" == action ? start = Math.floor((records - 1) / len) * len : _fnLog(settings, 0, "Unknown paging action: " + action, 5);
        var changed = settings._iDisplayStart !== start;
        return settings._iDisplayStart = start, changed && (_fnCallbackFire(settings, null, "page", [ settings ]), 
        redraw && _fnDraw(settings)), changed;
    }
    function _fnFeatureHtmlProcessing(settings) {
        return $("<div/>", {
            id: settings.aanFeatures.r ? null : settings.sTableId + "_processing",
            "class": settings.oClasses.sProcessing
        }).html(settings.oLanguage.sProcessing).insertBefore(settings.nTable)[0];
    }
    function _fnProcessingDisplay(settings, show) {
        settings.oFeatures.bProcessing && $(settings.aanFeatures.r).css("display", show ? "block" : "none"), 
        _fnCallbackFire(settings, null, "processing", [ settings, show ]);
    }
    function _fnFeatureHtmlTable(settings) {
        var table = $(settings.nTable);
        table.attr("role", "grid");
        var scroll = settings.oScroll;
        if ("" === scroll.sX && "" === scroll.sY) return settings.nTable;
        var scrollX = scroll.sX, scrollY = scroll.sY, classes = settings.oClasses, caption = table.children("caption"), captionSide = caption.length ? caption[0]._captionSide : null, headerClone = $(table[0].cloneNode(!1)), footerClone = $(table[0].cloneNode(!1)), footer = table.children("tfoot"), _div = "<div/>", size = function(s) {
            return s ? _fnStringToCss(s) : null;
        };
        footer.length || (footer = null);
        var scroller = $(_div, {
            "class": classes.sScrollWrapper
        }).append($(_div, {
            "class": classes.sScrollHead
        }).css({
            overflow: "hidden",
            position: "relative",
            border: 0,
            width: scrollX ? size(scrollX) : "100%"
        }).append($(_div, {
            "class": classes.sScrollHeadInner
        }).css({
            "box-sizing": "content-box",
            width: scroll.sXInner || "100%"
        }).append(headerClone.removeAttr("id").css("margin-left", 0).append("top" === captionSide ? caption : null).append(table.children("thead"))))).append($(_div, {
            "class": classes.sScrollBody
        }).css({
            position: "relative",
            overflow: "auto",
            width: size(scrollX)
        }).append(table));
        footer && scroller.append($(_div, {
            "class": classes.sScrollFoot
        }).css({
            overflow: "hidden",
            border: 0,
            width: scrollX ? size(scrollX) : "100%"
        }).append($(_div, {
            "class": classes.sScrollFootInner
        }).append(footerClone.removeAttr("id").css("margin-left", 0).append("bottom" === captionSide ? caption : null).append(table.children("tfoot")))));
        var children = scroller.children(), scrollHead = children[0], scrollBody = children[1], scrollFoot = footer ? children[2] : null;
        return scrollX && $(scrollBody).on("scroll.DT", function(e) {
            var scrollLeft = this.scrollLeft;
            scrollHead.scrollLeft = scrollLeft, footer && (scrollFoot.scrollLeft = scrollLeft);
        }), $(scrollBody).css(scrollY && scroll.bCollapse ? "max-height" : "height", scrollY), 
        settings.nScrollHead = scrollHead, settings.nScrollBody = scrollBody, settings.nScrollFoot = scrollFoot, 
        settings.aoDrawCallback.push({
            fn: _fnScrollDraw,
            sName: "scrolling"
        }), scroller[0];
    }
    function _fnScrollDraw(settings) {
        var headerTrgEls, footerTrgEls, headerSrcEls, footerSrcEls, headerCopy, footerCopy, idx, correction, sanityWidth, scroll = settings.oScroll, scrollX = scroll.sX, scrollXInner = scroll.sXInner, scrollY = scroll.sY, barWidth = scroll.iBarWidth, divHeader = $(settings.nScrollHead), divHeaderStyle = divHeader[0].style, divHeaderInner = divHeader.children("div"), divHeaderInnerStyle = divHeaderInner[0].style, divHeaderTable = divHeaderInner.children("table"), divBodyEl = settings.nScrollBody, divBody = $(divBodyEl), divBodyStyle = divBodyEl.style, divFooter = $(settings.nScrollFoot), divFooterInner = divFooter.children("div"), divFooterTable = divFooterInner.children("table"), header = $(settings.nTHead), table = $(settings.nTable), tableEl = table[0], tableStyle = tableEl.style, footer = settings.nTFoot ? $(settings.nTFoot) : null, browser = settings.oBrowser, ie67 = browser.bScrollOversize, headerWidths = [], footerWidths = [], headerContent = [], zeroOut = function(nSizer) {
            var style = nSizer.style;
            style.paddingTop = "0", style.paddingBottom = "0", style.borderTopWidth = "0", style.borderBottomWidth = "0", 
            style.height = 0;
        }, scrollBarVis = divBodyEl.scrollHeight > divBodyEl.clientHeight;
        if (settings.scrollBarVis !== scrollBarVis && settings.scrollBarVis !== undefined) return settings.scrollBarVis = scrollBarVis, 
        void _fnAdjustColumnSizing(settings);
        settings.scrollBarVis = scrollBarVis, table.children("thead, tfoot").remove(), headerCopy = header.clone().prependTo(table), 
        headerTrgEls = header.find("tr"), headerSrcEls = headerCopy.find("tr"), headerCopy.find("th, td").removeAttr("tabindex"), 
        footer && (footerCopy = footer.clone().prependTo(table), footerTrgEls = footer.find("tr"), 
        footerSrcEls = footerCopy.find("tr")), scrollX || (divBodyStyle.width = "100%", 
        divHeader[0].style.width = "100%"), $.each(_fnGetUniqueThs(settings, headerCopy), function(i, el) {
            idx = _fnVisibleToColumnIndex(settings, i), el.style.width = settings.aoColumns[idx].sWidth;
        }), footer && _fnApplyToChildren(function(n) {
            n.style.width = "";
        }, footerSrcEls), sanityWidth = table.outerWidth(), "" === scrollX ? (tableStyle.width = "100%", 
        ie67 && (table.find("tbody").height() > divBodyEl.offsetHeight || "scroll" == divBody.css("overflow-y")) && (tableStyle.width = _fnStringToCss(table.outerWidth() - barWidth)), 
        sanityWidth = table.outerWidth()) : "" !== scrollXInner && (tableStyle.width = _fnStringToCss(scrollXInner), 
        sanityWidth = table.outerWidth()), _fnApplyToChildren(zeroOut, headerSrcEls), _fnApplyToChildren(function(nSizer) {
            headerContent.push(nSizer.innerHTML), headerWidths.push(_fnStringToCss($(nSizer).css("width")));
        }, headerSrcEls), _fnApplyToChildren(function(nToSize, i) {
            nToSize.style.width = headerWidths[i];
        }, headerTrgEls), $(headerSrcEls).height(0), footer && (_fnApplyToChildren(zeroOut, footerSrcEls), 
        _fnApplyToChildren(function(nSizer) {
            footerWidths.push(_fnStringToCss($(nSizer).css("width")));
        }, footerSrcEls), _fnApplyToChildren(function(nToSize, i) {
            nToSize.style.width = footerWidths[i];
        }, footerTrgEls), $(footerSrcEls).height(0)), _fnApplyToChildren(function(nSizer, i) {
            nSizer.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + headerContent[i] + "</div>", 
            nSizer.style.width = headerWidths[i];
        }, headerSrcEls), footer && _fnApplyToChildren(function(nSizer, i) {
            nSizer.innerHTML = "", nSizer.style.width = footerWidths[i];
        }, footerSrcEls), table.outerWidth() < sanityWidth ? (correction = divBodyEl.scrollHeight > divBodyEl.offsetHeight || "scroll" == divBody.css("overflow-y") ? sanityWidth + barWidth : sanityWidth, 
        ie67 && (divBodyEl.scrollHeight > divBodyEl.offsetHeight || "scroll" == divBody.css("overflow-y")) && (tableStyle.width = _fnStringToCss(correction - barWidth)), 
        ("" === scrollX || "" !== scrollXInner) && _fnLog(settings, 1, "Possible column misalignment", 6)) : correction = "100%", 
        divBodyStyle.width = _fnStringToCss(correction), divHeaderStyle.width = _fnStringToCss(correction), 
        footer && (settings.nScrollFoot.style.width = _fnStringToCss(correction)), scrollY || ie67 && (divBodyStyle.height = _fnStringToCss(tableEl.offsetHeight + barWidth));
        var iOuterWidth = table.outerWidth();
        divHeaderTable[0].style.width = _fnStringToCss(iOuterWidth), divHeaderInnerStyle.width = _fnStringToCss(iOuterWidth);
        var bScrolling = table.height() > divBodyEl.clientHeight || "scroll" == divBody.css("overflow-y"), padding = "padding" + (browser.bScrollbarLeft ? "Left" : "Right");
        divHeaderInnerStyle[padding] = bScrolling ? barWidth + "px" : "0px", footer && (divFooterTable[0].style.width = _fnStringToCss(iOuterWidth), 
        divFooterInner[0].style.width = _fnStringToCss(iOuterWidth), divFooterInner[0].style[padding] = bScrolling ? barWidth + "px" : "0px"), 
        divBody.scroll(), !settings.bSorted && !settings.bFiltered || settings._drawHold || (divBodyEl.scrollTop = 0);
    }
    function _fnApplyToChildren(fn, an1, an2) {
        for (var nNode1, nNode2, index = 0, i = 0, iLen = an1.length; iLen > i; ) {
            for (nNode1 = an1[i].firstChild, nNode2 = an2 ? an2[i].firstChild : null; nNode1; ) 1 === nNode1.nodeType && (an2 ? fn(nNode1, nNode2, index) : fn(nNode1, index), 
            index++), nNode1 = nNode1.nextSibling, nNode2 = an2 ? nNode2.nextSibling : null;
            i++;
        }
    }
    function _fnCalculateColumnWidths(oSettings) {
        var i, column, columnIdx, table = oSettings.nTable, columns = oSettings.aoColumns, scroll = oSettings.oScroll, scrollY = scroll.sY, scrollX = scroll.sX, scrollXInner = scroll.sXInner, columnCount = columns.length, visibleColumns = _fnGetColumns(oSettings, "bVisible"), headerCells = $("th", oSettings.nTHead), tableWidthAttr = table.getAttribute("width"), tableContainer = table.parentNode, userInputs = !1, browser = oSettings.oBrowser, ie67 = browser.bScrollOversize, styleWidth = table.style.width;
        for (styleWidth && -1 !== styleWidth.indexOf("%") && (tableWidthAttr = styleWidth), 
        i = 0; i < visibleColumns.length; i++) column = columns[visibleColumns[i]], null !== column.sWidth && (column.sWidth = _fnConvertToWidth(column.sWidthOrig, tableContainer), 
        userInputs = !0);
        if (ie67 || !userInputs && !scrollX && !scrollY && columnCount == _fnVisbleColumns(oSettings) && columnCount == headerCells.length) for (i = 0; columnCount > i; i++) {
            var colIdx = _fnVisibleToColumnIndex(oSettings, i);
            null !== colIdx && (columns[colIdx].sWidth = _fnStringToCss(headerCells.eq(i).width()));
        } else {
            var tmpTable = $(table).clone().css("visibility", "hidden").removeAttr("id");
            tmpTable.find("tbody tr").remove();
            var tr = $("<tr/>").appendTo(tmpTable.find("tbody"));
            for (tmpTable.find("thead, tfoot").remove(), tmpTable.append($(oSettings.nTHead).clone()).append($(oSettings.nTFoot).clone()), 
            tmpTable.find("tfoot th, tfoot td").css("width", ""), headerCells = _fnGetUniqueThs(oSettings, tmpTable.find("thead")[0]), 
            i = 0; i < visibleColumns.length; i++) column = columns[visibleColumns[i]], headerCells[i].style.width = null !== column.sWidthOrig && "" !== column.sWidthOrig ? _fnStringToCss(column.sWidthOrig) : "", 
            column.sWidthOrig && scrollX && $(headerCells[i]).append($("<div/>").css({
                width: column.sWidthOrig,
                margin: 0,
                padding: 0,
                border: 0,
                height: 1
            }));
            if (oSettings.aoData.length) for (i = 0; i < visibleColumns.length; i++) columnIdx = visibleColumns[i], 
            column = columns[columnIdx], $(_fnGetWidestNode(oSettings, columnIdx)).clone(!1).append(column.sContentPadding).appendTo(tr);
            var holder = $("<div/>").css(scrollX || scrollY ? {
                position: "absolute",
                top: 0,
                left: 0,
                height: 1,
                right: 0,
                overflow: "hidden"
            } : {}).append(tmpTable).appendTo(tableContainer);
            scrollX && scrollXInner ? tmpTable.width(scrollXInner) : scrollX ? (tmpTable.css("width", "auto"), 
            tmpTable.removeAttr("width"), tmpTable.width() < tableContainer.clientWidth && tableWidthAttr && tmpTable.width(tableContainer.clientWidth)) : scrollY ? tmpTable.width(tableContainer.clientWidth) : tableWidthAttr && tmpTable.width(tableWidthAttr);
            var total = 0;
            for (i = 0; i < visibleColumns.length; i++) {
                var cell = $(headerCells[i]), border = cell.outerWidth() - cell.width(), bounding = browser.bBounding ? Math.ceil(headerCells[i].getBoundingClientRect().width) : cell.outerWidth();
                total += bounding, columns[visibleColumns[i]].sWidth = _fnStringToCss(bounding - border);
            }
            table.style.width = _fnStringToCss(total), holder.remove();
        }
        if (tableWidthAttr && (table.style.width = _fnStringToCss(tableWidthAttr)), (tableWidthAttr || scrollX) && !oSettings._reszEvt) {
            var bindResize = function() {
                $(window).bind("resize.DT-" + oSettings.sInstance, _fnThrottle(function() {
                    _fnAdjustColumnSizing(oSettings);
                }));
            };
            ie67 ? setTimeout(bindResize, 1e3) : bindResize(), oSettings._reszEvt = !0;
        }
    }
    function _fnThrottle(fn, freq) {
        var last, timer, frequency = freq !== undefined ? freq : 200;
        return function() {
            var that = this, now = +new Date(), args = arguments;
            last && last + frequency > now ? (clearTimeout(timer), timer = setTimeout(function() {
                last = undefined, fn.apply(that, args);
            }, frequency)) : (last = now, fn.apply(that, args));
        };
    }
    function _fnConvertToWidth(width, parent) {
        if (!width) return 0;
        var n = $("<div/>").css("width", _fnStringToCss(width)).appendTo(parent || document.body), val = n[0].offsetWidth;
        return n.remove(), val;
    }
    function _fnGetWidestNode(settings, colIdx) {
        var idx = _fnGetMaxLenString(settings, colIdx);
        if (0 > idx) return null;
        var data = settings.aoData[idx];
        return data.nTr ? data.anCells[colIdx] : $("<td/>").html(_fnGetCellData(settings, idx, colIdx, "display"))[0];
    }
    function _fnGetMaxLenString(settings, colIdx) {
        for (var s, max = -1, maxIdx = -1, i = 0, ien = settings.aoData.length; ien > i; i++) s = _fnGetCellData(settings, i, colIdx, "display") + "", 
        s = s.replace(__re_html_remove, ""), s = s.replace(/&nbsp;/g, " "), s.length > max && (max = s.length, 
        maxIdx = i);
        return maxIdx;
    }
    function _fnStringToCss(s) {
        return null === s ? "0px" : "number" == typeof s ? 0 > s ? "0px" : s + "px" : s.match(/\d$/) ? s + "px" : s;
    }
    function _fnSortFlatten(settings) {
        var i, k, kLen, aDataSort, iCol, sType, srcCol, aSort = [], aoColumns = settings.aoColumns, fixed = settings.aaSortingFixed, fixedObj = $.isPlainObject(fixed), nestedSort = [], add = function(a) {
            a.length && !$.isArray(a[0]) ? nestedSort.push(a) : $.merge(nestedSort, a);
        };
        for ($.isArray(fixed) && add(fixed), fixedObj && fixed.pre && add(fixed.pre), add(settings.aaSorting), 
        fixedObj && fixed.post && add(fixed.post), i = 0; i < nestedSort.length; i++) for (srcCol = nestedSort[i][0], 
        aDataSort = aoColumns[srcCol].aDataSort, k = 0, kLen = aDataSort.length; kLen > k; k++) iCol = aDataSort[k], 
        sType = aoColumns[iCol].sType || "string", nestedSort[i]._idx === undefined && (nestedSort[i]._idx = $.inArray(nestedSort[i][1], aoColumns[iCol].asSorting)), 
        aSort.push({
            src: srcCol,
            col: iCol,
            dir: nestedSort[i][1],
            index: nestedSort[i]._idx,
            type: sType,
            formatter: DataTable.ext.type.order[sType + "-pre"]
        });
        return aSort;
    }
    function _fnSort(oSettings) {
        var i, ien, iLen, sortCol, aSort, aiOrig = [], oExtSort = DataTable.ext.type.order, aoData = oSettings.aoData, formatters = (oSettings.aoColumns, 
        0), displayMaster = oSettings.aiDisplayMaster;
        for (_fnColumnTypes(oSettings), aSort = _fnSortFlatten(oSettings), i = 0, ien = aSort.length; ien > i; i++) sortCol = aSort[i], 
        sortCol.formatter && formatters++, _fnSortData(oSettings, sortCol.col);
        if ("ssp" != _fnDataSource(oSettings) && 0 !== aSort.length) {
            for (i = 0, iLen = displayMaster.length; iLen > i; i++) aiOrig[displayMaster[i]] = i;
            formatters === aSort.length ? displayMaster.sort(function(a, b) {
                var x, y, k, test, sort, len = aSort.length, dataA = aoData[a]._aSortData, dataB = aoData[b]._aSortData;
                for (k = 0; len > k; k++) if (sort = aSort[k], x = dataA[sort.col], y = dataB[sort.col], 
                test = y > x ? -1 : x > y ? 1 : 0, 0 !== test) return "asc" === sort.dir ? test : -test;
                return x = aiOrig[a], y = aiOrig[b], y > x ? -1 : x > y ? 1 : 0;
            }) : displayMaster.sort(function(a, b) {
                var x, y, k, test, sort, fn, len = aSort.length, dataA = aoData[a]._aSortData, dataB = aoData[b]._aSortData;
                for (k = 0; len > k; k++) if (sort = aSort[k], x = dataA[sort.col], y = dataB[sort.col], 
                fn = oExtSort[sort.type + "-" + sort.dir] || oExtSort["string-" + sort.dir], test = fn(x, y), 
                0 !== test) return test;
                return x = aiOrig[a], y = aiOrig[b], y > x ? -1 : x > y ? 1 : 0;
            });
        }
        oSettings.bSorted = !0;
    }
    function _fnSortAria(settings) {
        for (var label, nextSort, columns = settings.aoColumns, aSort = _fnSortFlatten(settings), oAria = settings.oLanguage.oAria, i = 0, iLen = columns.length; iLen > i; i++) {
            var col = columns[i], asSorting = col.asSorting, sTitle = col.sTitle.replace(/<.*?>/g, ""), th = col.nTh;
            th.removeAttribute("aria-sort"), col.bSortable ? (aSort.length > 0 && aSort[0].col == i ? (th.setAttribute("aria-sort", "asc" == aSort[0].dir ? "ascending" : "descending"), 
            nextSort = asSorting[aSort[0].index + 1] || asSorting[0]) : nextSort = asSorting[0], 
            label = sTitle + ("asc" === nextSort ? oAria.sSortAscending : oAria.sSortDescending)) : label = sTitle, 
            th.setAttribute("aria-label", label);
        }
    }
    function _fnSortListener(settings, colIdx, append, callback) {
        var nextSortIdx, col = settings.aoColumns[colIdx], sorting = settings.aaSorting, asSorting = col.asSorting, next = function(a, overflow) {
            var idx = a._idx;
            return idx === undefined && (idx = $.inArray(a[1], asSorting)), idx + 1 < asSorting.length ? idx + 1 : overflow ? null : 0;
        };
        if ("number" == typeof sorting[0] && (sorting = settings.aaSorting = [ sorting ]), 
        append && settings.oFeatures.bSortMulti) {
            var sortIdx = $.inArray(colIdx, _pluck(sorting, "0"));
            -1 !== sortIdx ? (nextSortIdx = next(sorting[sortIdx], !0), null === nextSortIdx && 1 === sorting.length && (nextSortIdx = 0), 
            null === nextSortIdx ? sorting.splice(sortIdx, 1) : (sorting[sortIdx][1] = asSorting[nextSortIdx], 
            sorting[sortIdx]._idx = nextSortIdx)) : (sorting.push([ colIdx, asSorting[0], 0 ]), 
            sorting[sorting.length - 1]._idx = 0);
        } else sorting.length && sorting[0][0] == colIdx ? (nextSortIdx = next(sorting[0]), 
        sorting.length = 1, sorting[0][1] = asSorting[nextSortIdx], sorting[0]._idx = nextSortIdx) : (sorting.length = 0, 
        sorting.push([ colIdx, asSorting[0] ]), sorting[0]._idx = 0);
        _fnReDraw(settings), "function" == typeof callback && callback(settings);
    }
    function _fnSortAttachListener(settings, attachTo, colIdx, callback) {
        var col = settings.aoColumns[colIdx];
        _fnBindAction(attachTo, {}, function(e) {
            col.bSortable !== !1 && (settings.oFeatures.bProcessing ? (_fnProcessingDisplay(settings, !0), 
            setTimeout(function() {
                _fnSortListener(settings, colIdx, e.shiftKey, callback), "ssp" !== _fnDataSource(settings) && _fnProcessingDisplay(settings, !1);
            }, 0)) : _fnSortListener(settings, colIdx, e.shiftKey, callback));
        });
    }
    function _fnSortingClasses(settings) {
        var i, ien, colIdx, oldSort = settings.aLastSort, sortClass = settings.oClasses.sSortColumn, sort = _fnSortFlatten(settings), features = settings.oFeatures;
        if (features.bSort && features.bSortClasses) {
            for (i = 0, ien = oldSort.length; ien > i; i++) colIdx = oldSort[i].src, $(_pluck(settings.aoData, "anCells", colIdx)).removeClass(sortClass + (2 > i ? i + 1 : 3));
            for (i = 0, ien = sort.length; ien > i; i++) colIdx = sort[i].src, $(_pluck(settings.aoData, "anCells", colIdx)).addClass(sortClass + (2 > i ? i + 1 : 3));
        }
        settings.aLastSort = sort;
    }
    function _fnSortData(settings, idx) {
        var customData, column = settings.aoColumns[idx], customSort = DataTable.ext.order[column.sSortDataType];
        customSort && (customData = customSort.call(settings.oInstance, settings, idx, _fnColumnIndexToVisible(settings, idx)));
        for (var row, cellData, formatter = DataTable.ext.type.order[column.sType + "-pre"], i = 0, ien = settings.aoData.length; ien > i; i++) row = settings.aoData[i], 
        row._aSortData || (row._aSortData = []), (!row._aSortData[idx] || customSort) && (cellData = customSort ? customData[i] : _fnGetCellData(settings, i, idx, "sort"), 
        row._aSortData[idx] = formatter ? formatter(cellData) : cellData);
    }
    function _fnSaveState(settings) {
        if (settings.oFeatures.bStateSave && !settings.bDestroying) {
            var state = {
                time: +new Date(),
                start: settings._iDisplayStart,
                length: settings._iDisplayLength,
                order: $.extend(!0, [], settings.aaSorting),
                search: _fnSearchToCamel(settings.oPreviousSearch),
                columns: $.map(settings.aoColumns, function(col, i) {
                    return {
                        visible: col.bVisible,
                        search: _fnSearchToCamel(settings.aoPreSearchCols[i])
                    };
                })
            };
            _fnCallbackFire(settings, "aoStateSaveParams", "stateSaveParams", [ settings, state ]), 
            settings.oSavedState = state, settings.fnStateSaveCallback.call(settings.oInstance, settings, state);
        }
    }
    function _fnLoadState(settings, oInit) {
        var i, ien, columns = settings.aoColumns;
        if (settings.oFeatures.bStateSave) {
            var state = settings.fnStateLoadCallback.call(settings.oInstance, settings);
            if (state && state.time) {
                var abStateLoad = _fnCallbackFire(settings, "aoStateLoadParams", "stateLoadParams", [ settings, state ]);
                if (-1 === $.inArray(!1, abStateLoad)) {
                    var duration = settings.iStateDuration;
                    if (!(duration > 0 && state.time < +new Date() - 1e3 * duration) && columns.length === state.columns.length) {
                        for (settings.oLoadedState = $.extend(!0, {}, state), state.start !== undefined && (settings._iDisplayStart = state.start, 
                        settings.iInitDisplayStart = state.start), state.length !== undefined && (settings._iDisplayLength = state.length), 
                        state.order !== undefined && (settings.aaSorting = [], $.each(state.order, function(i, col) {
                            settings.aaSorting.push(col[0] >= columns.length ? [ 0, col[1] ] : col);
                        })), state.search !== undefined && $.extend(settings.oPreviousSearch, _fnSearchToHung(state.search)), 
                        i = 0, ien = state.columns.length; ien > i; i++) {
                            var col = state.columns[i];
                            col.visible !== undefined && (columns[i].bVisible = col.visible), col.search !== undefined && $.extend(settings.aoPreSearchCols[i], _fnSearchToHung(col.search));
                        }
                        _fnCallbackFire(settings, "aoStateLoaded", "stateLoaded", [ settings, state ]);
                    }
                }
            }
        }
    }
    function _fnSettingsFromNode(table) {
        var settings = DataTable.settings, idx = $.inArray(table, _pluck(settings, "nTable"));
        return -1 !== idx ? settings[idx] : null;
    }
    function _fnLog(settings, level, msg, tn) {
        if (msg = "DataTables warning: " + (settings ? "table id=" + settings.sTableId + " - " : "") + msg, 
        tn && (msg += ". For more information about this error, please see http://datatables.net/tn/" + tn), 
        level) window.console && console.log && console.log(msg); else {
            var ext = DataTable.ext, type = ext.sErrMode || ext.errMode;
            if (settings && _fnCallbackFire(settings, null, "error", [ settings, tn, msg ]), 
            "alert" == type) alert(msg); else {
                if ("throw" == type) throw new Error(msg);
                "function" == typeof type && type(settings, tn, msg);
            }
        }
    }
    function _fnMap(ret, src, name, mappedName) {
        return $.isArray(name) ? void $.each(name, function(i, val) {
            $.isArray(val) ? _fnMap(ret, src, val[0], val[1]) : _fnMap(ret, src, val);
        }) : (mappedName === undefined && (mappedName = name), void (src[name] !== undefined && (ret[mappedName] = src[name])));
    }
    function _fnExtend(out, extender, breakRefs) {
        var val;
        for (var prop in extender) extender.hasOwnProperty(prop) && (val = extender[prop], 
        $.isPlainObject(val) ? ($.isPlainObject(out[prop]) || (out[prop] = {}), $.extend(!0, out[prop], val)) : breakRefs && "data" !== prop && "aaData" !== prop && $.isArray(val) ? out[prop] = val.slice() : out[prop] = val);
        return out;
    }
    function _fnBindAction(n, oData, fn) {
        $(n).bind("click.DT", oData, function(e) {
            n.blur(), fn(e);
        }).bind("keypress.DT", oData, function(e) {
            13 === e.which && (e.preventDefault(), fn(e));
        }).bind("selectstart.DT", function() {
            return !1;
        });
    }
    function _fnCallbackReg(oSettings, sStore, fn, sName) {
        fn && oSettings[sStore].push({
            fn: fn,
            sName: sName
        });
    }
    function _fnCallbackFire(settings, callbackArr, eventName, args) {
        var ret = [];
        if (callbackArr && (ret = $.map(settings[callbackArr].slice().reverse(), function(val, i) {
            return val.fn.apply(settings.oInstance, args);
        })), null !== eventName) {
            var e = $.Event(eventName + ".dt");
            $(settings.nTable).trigger(e, args), ret.push(e.result);
        }
        return ret;
    }
    function _fnLengthOverflow(settings) {
        var start = settings._iDisplayStart, end = settings.fnDisplayEnd(), len = settings._iDisplayLength;
        start >= end && (start = end - len), start -= start % len, (-1 === len || 0 > start) && (start = 0), 
        settings._iDisplayStart = start;
    }
    function _fnRenderer(settings, type) {
        var renderer = settings.renderer, host = DataTable.ext.renderer[type];
        return $.isPlainObject(renderer) && renderer[type] ? host[renderer[type]] || host._ : "string" == typeof renderer ? host[renderer] || host._ : host._;
    }
    function _fnDataSource(settings) {
        return settings.oFeatures.bServerSide ? "ssp" : settings.ajax || settings.sAjaxSource ? "ajax" : "dom";
    }
    function _numbers(page, pages) {
        var numbers = [], buttons = extPagination.numbers_length, half = Math.floor(buttons / 2);
        return buttons >= pages ? numbers = _range(0, pages) : half >= page ? (numbers = _range(0, buttons - 2), 
        numbers.push("ellipsis"), numbers.push(pages - 1)) : page >= pages - 1 - half ? (numbers = _range(pages - (buttons - 2), pages), 
        numbers.splice(0, 0, "ellipsis"), numbers.splice(0, 0, 0)) : (numbers = _range(page - half + 2, page + half - 1), 
        numbers.push("ellipsis"), numbers.push(pages - 1), numbers.splice(0, 0, "ellipsis"), 
        numbers.splice(0, 0, 0)), numbers.DT_el = "span", numbers;
    }
    function _addNumericSort(decimalPlace) {
        $.each({
            num: function(d) {
                return __numericReplace(d, decimalPlace);
            },
            "num-fmt": function(d) {
                return __numericReplace(d, decimalPlace, _re_formatted_numeric);
            },
            "html-num": function(d) {
                return __numericReplace(d, decimalPlace, _re_html);
            },
            "html-num-fmt": function(d) {
                return __numericReplace(d, decimalPlace, _re_html, _re_formatted_numeric);
            }
        }, function(key, fn) {
            _ext.type.order[key + decimalPlace + "-pre"] = fn, key.match(/^html\-/) && (_ext.type.search[key + decimalPlace] = _ext.type.search.html);
        });
    }
    function _fnExternApiFunc(fn) {
        return function() {
            var args = [ _fnSettingsFromNode(this[DataTable.ext.iApiIndex]) ].concat(Array.prototype.slice.call(arguments));
            return DataTable.ext.internal[fn].apply(this, args);
        };
    }
    var DataTable, _ext, _Api, _api_register, _api_registerPlural, _re_dic = {}, _re_new_lines = /[\r\n]/g, _re_html = /<.*?>/g, _re_date_start = /^[\w\+\-]/, _re_date_end = /[\w\+\-]$/, _re_escape_regex = new RegExp("(\\" + [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^", "-" ].join("|\\") + ")", "g"), _re_formatted_numeric = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi, _empty = function(d) {
        return d && d !== !0 && "-" !== d ? !1 : !0;
    }, _intVal = function(s) {
        var integer = parseInt(s, 10);
        return !isNaN(integer) && isFinite(s) ? integer : null;
    }, _numToDecimal = function(num, decimalPoint) {
        return _re_dic[decimalPoint] || (_re_dic[decimalPoint] = new RegExp(_fnEscapeRegex(decimalPoint), "g")), 
        "string" == typeof num && "." !== decimalPoint ? num.replace(/\./g, "").replace(_re_dic[decimalPoint], ".") : num;
    }, _isNumber = function(d, decimalPoint, formatted) {
        var strType = "string" == typeof d;
        return _empty(d) ? !0 : (decimalPoint && strType && (d = _numToDecimal(d, decimalPoint)), 
        formatted && strType && (d = d.replace(_re_formatted_numeric, "")), !isNaN(parseFloat(d)) && isFinite(d));
    }, _isHtml = function(d) {
        return _empty(d) || "string" == typeof d;
    }, _htmlNumeric = function(d, decimalPoint, formatted) {
        if (_empty(d)) return !0;
        var html = _isHtml(d);
        return html && _isNumber(_stripHtml(d), decimalPoint, formatted) ? !0 : null;
    }, _pluck = function(a, prop, prop2) {
        var out = [], i = 0, ien = a.length;
        if (prop2 !== undefined) for (;ien > i; i++) a[i] && a[i][prop] && out.push(a[i][prop][prop2]); else for (;ien > i; i++) a[i] && out.push(a[i][prop]);
        return out;
    }, _pluck_order = function(a, order, prop, prop2) {
        var out = [], i = 0, ien = order.length;
        if (prop2 !== undefined) for (;ien > i; i++) a[order[i]][prop] && out.push(a[order[i]][prop][prop2]); else for (;ien > i; i++) out.push(a[order[i]][prop]);
        return out;
    }, _range = function(len, start) {
        var end, out = [];
        start === undefined ? (start = 0, end = len) : (end = start, start = len);
        for (var i = start; end > i; i++) out.push(i);
        return out;
    }, _removeEmpty = function(a) {
        for (var out = [], i = 0, ien = a.length; ien > i; i++) a[i] && out.push(a[i]);
        return out;
    }, _stripHtml = function(d) {
        return d.replace(_re_html, "");
    }, _unique = function(src) {
        var val, i, j, out = [], ien = src.length, k = 0;
        again: for (i = 0; ien > i; i++) {
            for (val = src[i], j = 0; k > j; j++) if (out[j] === val) continue again;
            out.push(val), k++;
        }
        return out;
    }, _fnCompatMap = function(o, knew, old) {
        o[knew] !== undefined && (o[old] = o[knew]);
    }, __reArray = /\[.*?\]$/, __reFn = /\(\)$/, __filter_div = $("<div>")[0], __filter_div_textContent = __filter_div.textContent !== undefined, __re_html_remove = /<.*?>/g;
    DataTable = function(options) {
        this.$ = function(sSelector, oOpts) {
            return this.api(!0).$(sSelector, oOpts);
        }, this._ = function(sSelector, oOpts) {
            return this.api(!0).rows(sSelector, oOpts).data();
        }, this.api = function(traditional) {
            return new _Api(traditional ? _fnSettingsFromNode(this[_ext.iApiIndex]) : this);
        }, this.fnAddData = function(data, redraw) {
            var api = this.api(!0), rows = $.isArray(data) && ($.isArray(data[0]) || $.isPlainObject(data[0])) ? api.rows.add(data) : api.row.add(data);
            return (redraw === undefined || redraw) && api.draw(), rows.flatten().toArray();
        }, this.fnAdjustColumnSizing = function(bRedraw) {
            var api = this.api(!0).columns.adjust(), settings = api.settings()[0], scroll = settings.oScroll;
            bRedraw === undefined || bRedraw ? api.draw(!1) : ("" !== scroll.sX || "" !== scroll.sY) && _fnScrollDraw(settings);
        }, this.fnClearTable = function(bRedraw) {
            var api = this.api(!0).clear();
            (bRedraw === undefined || bRedraw) && api.draw();
        }, this.fnClose = function(nTr) {
            this.api(!0).row(nTr).child.hide();
        }, this.fnDeleteRow = function(target, callback, redraw) {
            var api = this.api(!0), rows = api.rows(target), settings = rows.settings()[0], data = settings.aoData[rows[0][0]];
            return rows.remove(), callback && callback.call(this, settings, data), (redraw === undefined || redraw) && api.draw(), 
            data;
        }, this.fnDestroy = function(remove) {
            this.api(!0).destroy(remove);
        }, this.fnDraw = function(complete) {
            this.api(!0).draw(complete);
        }, this.fnFilter = function(sInput, iColumn, bRegex, bSmart, bShowGlobal, bCaseInsensitive) {
            var api = this.api(!0);
            null === iColumn || iColumn === undefined ? api.search(sInput, bRegex, bSmart, bCaseInsensitive) : api.column(iColumn).search(sInput, bRegex, bSmart, bCaseInsensitive), 
            api.draw();
        }, this.fnGetData = function(src, col) {
            var api = this.api(!0);
            if (src !== undefined) {
                var type = src.nodeName ? src.nodeName.toLowerCase() : "";
                return col !== undefined || "td" == type || "th" == type ? api.cell(src, col).data() : api.row(src).data() || null;
            }
            return api.data().toArray();
        }, this.fnGetNodes = function(iRow) {
            var api = this.api(!0);
            return iRow !== undefined ? api.row(iRow).node() : api.rows().nodes().flatten().toArray();
        }, this.fnGetPosition = function(node) {
            var api = this.api(!0), nodeName = node.nodeName.toUpperCase();
            if ("TR" == nodeName) return api.row(node).index();
            if ("TD" == nodeName || "TH" == nodeName) {
                var cell = api.cell(node).index();
                return [ cell.row, cell.columnVisible, cell.column ];
            }
            return null;
        }, this.fnIsOpen = function(nTr) {
            return this.api(!0).row(nTr).child.isShown();
        }, this.fnOpen = function(nTr, mHtml, sClass) {
            return this.api(!0).row(nTr).child(mHtml, sClass).show().child()[0];
        }, this.fnPageChange = function(mAction, bRedraw) {
            var api = this.api(!0).page(mAction);
            (bRedraw === undefined || bRedraw) && api.draw(!1);
        }, this.fnSetColumnVis = function(iCol, bShow, bRedraw) {
            var api = this.api(!0).column(iCol).visible(bShow);
            (bRedraw === undefined || bRedraw) && api.columns.adjust().draw();
        }, this.fnSettings = function() {
            return _fnSettingsFromNode(this[_ext.iApiIndex]);
        }, this.fnSort = function(aaSort) {
            this.api(!0).order(aaSort).draw();
        }, this.fnSortListener = function(nNode, iColumn, fnCallback) {
            this.api(!0).order.listener(nNode, iColumn, fnCallback);
        }, this.fnUpdate = function(mData, mRow, iColumn, bRedraw, bAction) {
            var api = this.api(!0);
            return iColumn === undefined || null === iColumn ? api.row(mRow).data(mData) : api.cell(mRow, iColumn).data(mData), 
            (bAction === undefined || bAction) && api.columns.adjust(), (bRedraw === undefined || bRedraw) && api.draw(), 
            0;
        }, this.fnVersionCheck = _ext.fnVersionCheck;
        var _that = this, emptyInit = options === undefined, len = this.length;
        emptyInit && (options = {}), this.oApi = this.internal = _ext.internal;
        for (var fn in DataTable.ext.internal) fn && (this[fn] = _fnExternApiFunc(fn));
        return this.each(function() {
            var iLen, o = {}, oInit = len > 1 ? _fnExtend(o, options, !0) : options, i = 0, sId = this.getAttribute("id"), bInitHandedOff = !1, defaults = DataTable.defaults, $this = $(this);
            if ("table" != this.nodeName.toLowerCase()) return void _fnLog(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2);
            _fnCompatOpts(defaults), _fnCompatCols(defaults.column), _fnCamelToHungarian(defaults, defaults, !0), 
            _fnCamelToHungarian(defaults.column, defaults.column, !0), _fnCamelToHungarian(defaults, $.extend(oInit, $this.data()));
            var allSettings = DataTable.settings;
            for (i = 0, iLen = allSettings.length; iLen > i; i++) {
                var s = allSettings[i];
                if (s.nTable == this || s.nTHead.parentNode == this || s.nTFoot && s.nTFoot.parentNode == this) {
                    var bRetrieve = oInit.bRetrieve !== undefined ? oInit.bRetrieve : defaults.bRetrieve, bDestroy = oInit.bDestroy !== undefined ? oInit.bDestroy : defaults.bDestroy;
                    if (emptyInit || bRetrieve) return s.oInstance;
                    if (bDestroy) {
                        s.oInstance.fnDestroy();
                        break;
                    }
                    return void _fnLog(s, 0, "Cannot reinitialise DataTable", 3);
                }
                if (s.sTableId == this.id) {
                    allSettings.splice(i, 1);
                    break;
                }
            }
            (null === sId || "" === sId) && (sId = "DataTables_Table_" + DataTable.ext._unique++, 
            this.id = sId);
            var oSettings = $.extend(!0, {}, DataTable.models.oSettings, {
                sDestroyWidth: $this[0].style.width,
                sInstance: sId,
                sTableId: sId
            });
            oSettings.nTable = this, oSettings.oApi = _that.internal, oSettings.oInit = oInit, 
            allSettings.push(oSettings), oSettings.oInstance = 1 === _that.length ? _that : $this.dataTable(), 
            _fnCompatOpts(oInit), oInit.oLanguage && _fnLanguageCompat(oInit.oLanguage), oInit.aLengthMenu && !oInit.iDisplayLength && (oInit.iDisplayLength = $.isArray(oInit.aLengthMenu[0]) ? oInit.aLengthMenu[0][0] : oInit.aLengthMenu[0]), 
            oInit = _fnExtend($.extend(!0, {}, defaults), oInit), _fnMap(oSettings.oFeatures, oInit, [ "bPaginate", "bLengthChange", "bFilter", "bSort", "bSortMulti", "bInfo", "bProcessing", "bAutoWidth", "bSortClasses", "bServerSide", "bDeferRender" ]), 
            _fnMap(oSettings, oInit, [ "asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod", "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp", "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay", "rowId", [ "iCookieDuration", "iStateDuration" ], [ "oSearch", "oPreviousSearch" ], [ "aoSearchCols", "aoPreSearchCols" ], [ "iDisplayLength", "_iDisplayLength" ], [ "bJQueryUI", "bJUI" ] ]), 
            _fnMap(oSettings.oScroll, oInit, [ [ "sScrollX", "sX" ], [ "sScrollXInner", "sXInner" ], [ "sScrollY", "sY" ], [ "bScrollCollapse", "bCollapse" ] ]), 
            _fnMap(oSettings.oLanguage, oInit, "fnInfoCallback"), _fnCallbackReg(oSettings, "aoDrawCallback", oInit.fnDrawCallback, "user"), 
            _fnCallbackReg(oSettings, "aoServerParams", oInit.fnServerParams, "user"), _fnCallbackReg(oSettings, "aoStateSaveParams", oInit.fnStateSaveParams, "user"), 
            _fnCallbackReg(oSettings, "aoStateLoadParams", oInit.fnStateLoadParams, "user"), 
            _fnCallbackReg(oSettings, "aoStateLoaded", oInit.fnStateLoaded, "user"), _fnCallbackReg(oSettings, "aoRowCallback", oInit.fnRowCallback, "user"), 
            _fnCallbackReg(oSettings, "aoRowCreatedCallback", oInit.fnCreatedRow, "user"), _fnCallbackReg(oSettings, "aoHeaderCallback", oInit.fnHeaderCallback, "user"), 
            _fnCallbackReg(oSettings, "aoFooterCallback", oInit.fnFooterCallback, "user"), _fnCallbackReg(oSettings, "aoInitComplete", oInit.fnInitComplete, "user"), 
            _fnCallbackReg(oSettings, "aoPreDrawCallback", oInit.fnPreDrawCallback, "user"), 
            oSettings.rowIdFn = _fnGetObjectDataFn(oInit.rowId), _fnBrowserDetect(oSettings);
            var oClasses = oSettings.oClasses;
            if (oInit.bJQueryUI ? ($.extend(oClasses, DataTable.ext.oJUIClasses, oInit.oClasses), 
            oInit.sDom === defaults.sDom && "lfrtip" === defaults.sDom && (oSettings.sDom = '<"H"lfr>t<"F"ip>'), 
            oSettings.renderer ? $.isPlainObject(oSettings.renderer) && !oSettings.renderer.header && (oSettings.renderer.header = "jqueryui") : oSettings.renderer = "jqueryui") : $.extend(oClasses, DataTable.ext.classes, oInit.oClasses), 
            $this.addClass(oClasses.sTable), oSettings.iInitDisplayStart === undefined && (oSettings.iInitDisplayStart = oInit.iDisplayStart, 
            oSettings._iDisplayStart = oInit.iDisplayStart), null !== oInit.iDeferLoading) {
                oSettings.bDeferLoading = !0;
                var tmp = $.isArray(oInit.iDeferLoading);
                oSettings._iRecordsDisplay = tmp ? oInit.iDeferLoading[0] : oInit.iDeferLoading, 
                oSettings._iRecordsTotal = tmp ? oInit.iDeferLoading[1] : oInit.iDeferLoading;
            }
            var oLanguage = oSettings.oLanguage;
            $.extend(!0, oLanguage, oInit.oLanguage), "" !== oLanguage.sUrl && ($.ajax({
                dataType: "json",
                url: oLanguage.sUrl,
                success: function(json) {
                    _fnLanguageCompat(json), _fnCamelToHungarian(defaults.oLanguage, json), $.extend(!0, oLanguage, json), 
                    _fnInitialise(oSettings);
                },
                error: function() {
                    _fnInitialise(oSettings);
                }
            }), bInitHandedOff = !0), null === oInit.asStripeClasses && (oSettings.asStripeClasses = [ oClasses.sStripeOdd, oClasses.sStripeEven ]);
            var stripeClasses = oSettings.asStripeClasses, rowOne = $this.children("tbody").find("tr").eq(0);
            -1 !== $.inArray(!0, $.map(stripeClasses, function(el, i) {
                return rowOne.hasClass(el);
            })) && ($("tbody tr", this).removeClass(stripeClasses.join(" ")), oSettings.asDestroyStripes = stripeClasses.slice());
            var aoColumnsInit, anThs = [], nThead = this.getElementsByTagName("thead");
            if (0 !== nThead.length && (_fnDetectHeader(oSettings.aoHeader, nThead[0]), anThs = _fnGetUniqueThs(oSettings)), 
            null === oInit.aoColumns) for (aoColumnsInit = [], i = 0, iLen = anThs.length; iLen > i; i++) aoColumnsInit.push(null); else aoColumnsInit = oInit.aoColumns;
            for (i = 0, iLen = aoColumnsInit.length; iLen > i; i++) _fnAddColumn(oSettings, anThs ? anThs[i] : null);
            if (_fnApplyColumnDefs(oSettings, oInit.aoColumnDefs, aoColumnsInit, function(iCol, oDef) {
                _fnColumnOptions(oSettings, iCol, oDef);
            }), rowOne.length) {
                var a = function(cell, name) {
                    return null !== cell.getAttribute("data-" + name) ? name : null;
                };
                $(rowOne[0]).children("th, td").each(function(i, cell) {
                    var col = oSettings.aoColumns[i];
                    if (col.mData === i) {
                        var sort = a(cell, "sort") || a(cell, "order"), filter = a(cell, "filter") || a(cell, "search");
                        (null !== sort || null !== filter) && (col.mData = {
                            _: i + ".display",
                            sort: null !== sort ? i + ".@data-" + sort : undefined,
                            type: null !== sort ? i + ".@data-" + sort : undefined,
                            filter: null !== filter ? i + ".@data-" + filter : undefined
                        }, _fnColumnOptions(oSettings, i));
                    }
                });
            }
            var features = oSettings.oFeatures;
            if (oInit.bStateSave && (features.bStateSave = !0, _fnLoadState(oSettings, oInit), 
            _fnCallbackReg(oSettings, "aoDrawCallback", _fnSaveState, "state_save")), oInit.aaSorting === undefined) {
                var sorting = oSettings.aaSorting;
                for (i = 0, iLen = sorting.length; iLen > i; i++) sorting[i][1] = oSettings.aoColumns[i].asSorting[0];
            }
            _fnSortingClasses(oSettings), features.bSort && _fnCallbackReg(oSettings, "aoDrawCallback", function() {
                if (oSettings.bSorted) {
                    var aSort = _fnSortFlatten(oSettings), sortedColumns = {};
                    $.each(aSort, function(i, val) {
                        sortedColumns[val.src] = val.dir;
                    }), _fnCallbackFire(oSettings, null, "order", [ oSettings, aSort, sortedColumns ]), 
                    _fnSortAria(oSettings);
                }
            }), _fnCallbackReg(oSettings, "aoDrawCallback", function() {
                (oSettings.bSorted || "ssp" === _fnDataSource(oSettings) || features.bDeferRender) && _fnSortingClasses(oSettings);
            }, "sc");
            var captions = $this.children("caption").each(function() {
                this._captionSide = $this.css("caption-side");
            }), thead = $this.children("thead");
            0 === thead.length && (thead = $("<thead/>").appendTo(this)), oSettings.nTHead = thead[0];
            var tbody = $this.children("tbody");
            0 === tbody.length && (tbody = $("<tbody/>").appendTo(this)), oSettings.nTBody = tbody[0];
            var tfoot = $this.children("tfoot");
            if (0 === tfoot.length && captions.length > 0 && ("" !== oSettings.oScroll.sX || "" !== oSettings.oScroll.sY) && (tfoot = $("<tfoot/>").appendTo(this)), 
            0 === tfoot.length || 0 === tfoot.children().length ? $this.addClass(oClasses.sNoFooter) : tfoot.length > 0 && (oSettings.nTFoot = tfoot[0], 
            _fnDetectHeader(oSettings.aoFooter, oSettings.nTFoot)), oInit.aaData) for (i = 0; i < oInit.aaData.length; i++) _fnAddData(oSettings, oInit.aaData[i]); else (oSettings.bDeferLoading || "dom" == _fnDataSource(oSettings)) && _fnAddTr(oSettings, $(oSettings.nTBody).children("tr"));
            oSettings.aiDisplay = oSettings.aiDisplayMaster.slice(), oSettings.bInitialised = !0, 
            bInitHandedOff === !1 && _fnInitialise(oSettings);
        }), _that = null, this;
    };
    var __apiStruct = [], __arrayProto = Array.prototype, _toSettings = function(mixed) {
        var idx, jq, settings = DataTable.settings, tables = $.map(settings, function(el, i) {
            return el.nTable;
        });
        return mixed ? mixed.nTable && mixed.oApi ? [ mixed ] : mixed.nodeName && "table" === mixed.nodeName.toLowerCase() ? (idx = $.inArray(mixed, tables), 
        -1 !== idx ? [ settings[idx] ] : null) : mixed && "function" == typeof mixed.settings ? mixed.settings().toArray() : ("string" == typeof mixed ? jq = $(mixed) : mixed instanceof $ && (jq = mixed), 
        jq ? jq.map(function(i) {
            return idx = $.inArray(this, tables), -1 !== idx ? settings[idx] : null;
        }).toArray() : void 0) : [];
    };
    _Api = function(context, data) {
        if (!(this instanceof _Api)) return new _Api(context, data);
        var settings = [], ctxSettings = function(o) {
            var a = _toSettings(o);
            a && (settings = settings.concat(a));
        };
        if ($.isArray(context)) for (var i = 0, ien = context.length; ien > i; i++) ctxSettings(context[i]); else ctxSettings(context);
        this.context = _unique(settings), data && $.merge(this, data), this.selector = {
            rows: null,
            cols: null,
            opts: null
        }, _Api.extend(this, this, __apiStruct);
    }, DataTable.Api = _Api, $.extend(_Api.prototype, {
        any: function() {
            return 0 !== this.count();
        },
        concat: __arrayProto.concat,
        context: [],
        count: function() {
            return this.flatten().length;
        },
        each: function(fn) {
            for (var i = 0, ien = this.length; ien > i; i++) fn.call(this, this[i], i, this);
            return this;
        },
        eq: function(idx) {
            var ctx = this.context;
            return ctx.length > idx ? new _Api(ctx[idx], this[idx]) : null;
        },
        filter: function(fn) {
            var a = [];
            if (__arrayProto.filter) a = __arrayProto.filter.call(this, fn, this); else for (var i = 0, ien = this.length; ien > i; i++) fn.call(this, this[i], i, this) && a.push(this[i]);
            return new _Api(this.context, a);
        },
        flatten: function() {
            var a = [];
            return new _Api(this.context, a.concat.apply(a, this.toArray()));
        },
        join: __arrayProto.join,
        indexOf: __arrayProto.indexOf || function(obj, start) {
            for (var i = start || 0, ien = this.length; ien > i; i++) if (this[i] === obj) return i;
            return -1;
        },
        iterator: function(flatten, type, fn, alwaysNew) {
            var ret, i, ien, j, jen, rows, items, item, a = [], context = this.context, selector = this.selector;
            for ("string" == typeof flatten && (alwaysNew = fn, fn = type, type = flatten, flatten = !1), 
            i = 0, ien = context.length; ien > i; i++) {
                var apiInst = new _Api(context[i]);
                if ("table" === type) ret = fn.call(apiInst, context[i], i), ret !== undefined && a.push(ret); else if ("columns" === type || "rows" === type) ret = fn.call(apiInst, context[i], this[i], i), 
                ret !== undefined && a.push(ret); else if ("column" === type || "column-rows" === type || "row" === type || "cell" === type) for (items = this[i], 
                "column-rows" === type && (rows = _selector_row_indexes(context[i], selector.opts)), 
                j = 0, jen = items.length; jen > j; j++) item = items[j], ret = "cell" === type ? fn.call(apiInst, context[i], item.row, item.column, i, j) : fn.call(apiInst, context[i], item, i, j, rows), 
                ret !== undefined && a.push(ret);
            }
            if (a.length || alwaysNew) {
                var api = new _Api(context, flatten ? a.concat.apply([], a) : a), apiSelector = api.selector;
                return apiSelector.rows = selector.rows, apiSelector.cols = selector.cols, apiSelector.opts = selector.opts, 
                api;
            }
            return this;
        },
        lastIndexOf: __arrayProto.lastIndexOf || function(obj, start) {
            return this.indexOf.apply(this.toArray.reverse(), arguments);
        },
        length: 0,
        map: function(fn) {
            var a = [];
            if (__arrayProto.map) a = __arrayProto.map.call(this, fn, this); else for (var i = 0, ien = this.length; ien > i; i++) a.push(fn.call(this, this[i], i));
            return new _Api(this.context, a);
        },
        pluck: function(prop) {
            return this.map(function(el) {
                return el[prop];
            });
        },
        pop: __arrayProto.pop,
        push: __arrayProto.push,
        reduce: __arrayProto.reduce || function(fn, init) {
            return _fnReduce(this, fn, init, 0, this.length, 1);
        },
        reduceRight: __arrayProto.reduceRight || function(fn, init) {
            return _fnReduce(this, fn, init, this.length - 1, -1, -1);
        },
        reverse: __arrayProto.reverse,
        selector: null,
        shift: __arrayProto.shift,
        sort: __arrayProto.sort,
        splice: __arrayProto.splice,
        toArray: function() {
            return __arrayProto.slice.call(this);
        },
        to$: function() {
            return $(this);
        },
        toJQuery: function() {
            return $(this);
        },
        unique: function() {
            return new _Api(this.context, _unique(this));
        },
        unshift: __arrayProto.unshift
    }), _Api.extend = function(scope, obj, ext) {
        if (ext.length && obj && (obj instanceof _Api || obj.__dt_wrapper)) {
            var i, ien, struct, methodScoping = function(scope, fn, struc) {
                return function() {
                    var ret = fn.apply(scope, arguments);
                    return _Api.extend(ret, ret, struc.methodExt), ret;
                };
            };
            for (i = 0, ien = ext.length; ien > i; i++) struct = ext[i], obj[struct.name] = "function" == typeof struct.val ? methodScoping(scope, struct.val, struct) : $.isPlainObject(struct.val) ? {} : struct.val, 
            obj[struct.name].__dt_wrapper = !0, _Api.extend(scope, obj[struct.name], struct.propExt);
        }
    }, _Api.register = _api_register = function(name, val) {
        if ($.isArray(name)) for (var j = 0, jen = name.length; jen > j; j++) _Api.register(name[j], val); else {
            var i, ien, key, method, heir = name.split("."), struct = __apiStruct, find = function(src, name) {
                for (var i = 0, ien = src.length; ien > i; i++) if (src[i].name === name) return src[i];
                return null;
            };
            for (i = 0, ien = heir.length; ien > i; i++) {
                method = -1 !== heir[i].indexOf("()"), key = method ? heir[i].replace("()", "") : heir[i];
                var src = find(struct, key);
                src || (src = {
                    name: key,
                    val: {},
                    methodExt: [],
                    propExt: []
                }, struct.push(src)), i === ien - 1 ? src.val = val : struct = method ? src.methodExt : src.propExt;
            }
        }
    }, _Api.registerPlural = _api_registerPlural = function(pluralName, singularName, val) {
        _Api.register(pluralName, val), _Api.register(singularName, function() {
            var ret = val.apply(this, arguments);
            return ret === this ? this : ret instanceof _Api ? ret.length ? $.isArray(ret[0]) ? new _Api(ret.context, ret[0]) : ret[0] : undefined : ret;
        });
    };
    var __table_selector = function(selector, a) {
        if ("number" == typeof selector) return [ a[selector] ];
        var nodes = $.map(a, function(el, i) {
            return el.nTable;
        });
        return $(nodes).filter(selector).map(function(i) {
            var idx = $.inArray(this, nodes);
            return a[idx];
        }).toArray();
    };
    _api_register("tables()", function(selector) {
        return selector ? new _Api(__table_selector(selector, this.context)) : this;
    }), _api_register("table()", function(selector) {
        var tables = this.tables(selector), ctx = tables.context;
        return ctx.length ? new _Api(ctx[0]) : tables;
    }), _api_registerPlural("tables().nodes()", "table().node()", function() {
        return this.iterator("table", function(ctx) {
            return ctx.nTable;
        }, 1);
    }), _api_registerPlural("tables().body()", "table().body()", function() {
        return this.iterator("table", function(ctx) {
            return ctx.nTBody;
        }, 1);
    }), _api_registerPlural("tables().header()", "table().header()", function() {
        return this.iterator("table", function(ctx) {
            return ctx.nTHead;
        }, 1);
    }), _api_registerPlural("tables().footer()", "table().footer()", function() {
        return this.iterator("table", function(ctx) {
            return ctx.nTFoot;
        }, 1);
    }), _api_registerPlural("tables().containers()", "table().container()", function() {
        return this.iterator("table", function(ctx) {
            return ctx.nTableWrapper;
        }, 1);
    }), _api_register("draw()", function(paging) {
        return this.iterator("table", function(settings) {
            "page" === paging ? _fnDraw(settings) : ("string" == typeof paging && (paging = "full-hold" === paging ? !1 : !0), 
            _fnReDraw(settings, paging === !1));
        });
    }), _api_register("page()", function(action) {
        return action === undefined ? this.page.info().page : this.iterator("table", function(settings) {
            _fnPageChange(settings, action);
        });
    }), _api_register("page.info()", function(action) {
        if (0 === this.context.length) return undefined;
        var settings = this.context[0], start = settings._iDisplayStart, len = settings.oFeatures.bPaginate ? settings._iDisplayLength : -1, visRecords = settings.fnRecordsDisplay(), all = -1 === len;
        return {
            page: all ? 0 : Math.floor(start / len),
            pages: all ? 1 : Math.ceil(visRecords / len),
            start: start,
            end: settings.fnDisplayEnd(),
            length: len,
            recordsTotal: settings.fnRecordsTotal(),
            recordsDisplay: visRecords,
            serverSide: "ssp" === _fnDataSource(settings)
        };
    }), _api_register("page.len()", function(len) {
        return len === undefined ? 0 !== this.context.length ? this.context[0]._iDisplayLength : undefined : this.iterator("table", function(settings) {
            _fnLengthChange(settings, len);
        });
    });
    var __reload = function(settings, holdPosition, callback) {
        if (callback) {
            var api = new _Api(settings);
            api.one("draw", function() {
                callback(api.ajax.json());
            });
        }
        if ("ssp" == _fnDataSource(settings)) _fnReDraw(settings, holdPosition); else {
            _fnProcessingDisplay(settings, !0);
            var xhr = settings.jqXHR;
            xhr && 4 !== xhr.readyState && xhr.abort(), _fnBuildAjax(settings, [], function(json) {
                _fnClearTable(settings);
                for (var data = _fnAjaxDataSrc(settings, json), i = 0, ien = data.length; ien > i; i++) _fnAddData(settings, data[i]);
                _fnReDraw(settings, holdPosition), _fnProcessingDisplay(settings, !1);
            });
        }
    };
    _api_register("ajax.json()", function() {
        var ctx = this.context;
        return ctx.length > 0 ? ctx[0].json : void 0;
    }), _api_register("ajax.params()", function() {
        var ctx = this.context;
        return ctx.length > 0 ? ctx[0].oAjaxData : void 0;
    }), _api_register("ajax.reload()", function(callback, resetPaging) {
        return this.iterator("table", function(settings) {
            __reload(settings, resetPaging === !1, callback);
        });
    }), _api_register("ajax.url()", function(url) {
        var ctx = this.context;
        return url === undefined ? 0 === ctx.length ? undefined : (ctx = ctx[0], ctx.ajax ? $.isPlainObject(ctx.ajax) ? ctx.ajax.url : ctx.ajax : ctx.sAjaxSource) : this.iterator("table", function(settings) {
            $.isPlainObject(settings.ajax) ? settings.ajax.url = url : settings.ajax = url;
        });
    }), _api_register("ajax.url().load()", function(callback, resetPaging) {
        return this.iterator("table", function(ctx) {
            __reload(ctx, resetPaging === !1, callback);
        });
    });
    var _selector_run = function(type, selector, selectFn, settings, opts) {
        var res, a, i, ien, j, jen, out = [], selectorType = typeof selector;
        for (selector && "string" !== selectorType && "function" !== selectorType && selector.length !== undefined || (selector = [ selector ]), 
        i = 0, ien = selector.length; ien > i; i++) for (a = selector[i] && selector[i].split ? selector[i].split(",") : [ selector[i] ], 
        j = 0, jen = a.length; jen > j; j++) res = selectFn("string" == typeof a[j] ? $.trim(a[j]) : a[j]), 
        res && res.length && (out = out.concat(res));
        var ext = _ext.selector[type];
        if (ext.length) for (i = 0, ien = ext.length; ien > i; i++) out = ext[i](settings, opts, out);
        return _unique(out);
    }, _selector_opts = function(opts) {
        return opts || (opts = {}), opts.filter && opts.search === undefined && (opts.search = opts.filter), 
        $.extend({
            search: "none",
            order: "current",
            page: "all"
        }, opts);
    }, _selector_first = function(inst) {
        for (var i = 0, ien = inst.length; ien > i; i++) if (inst[i].length > 0) return inst[0] = inst[i], 
        inst[0].length = 1, inst.length = 1, inst.context = [ inst.context[i] ], inst;
        return inst.length = 0, inst;
    }, _selector_row_indexes = function(settings, opts) {
        var i, ien, tmp, a = [], displayFiltered = settings.aiDisplay, displayMaster = settings.aiDisplayMaster, search = opts.search, order = opts.order, page = opts.page;
        if ("ssp" == _fnDataSource(settings)) return "removed" === search ? [] : _range(0, displayMaster.length);
        if ("current" == page) for (i = settings._iDisplayStart, ien = settings.fnDisplayEnd(); ien > i; i++) a.push(displayFiltered[i]); else if ("current" == order || "applied" == order) a = "none" == search ? displayMaster.slice() : "applied" == search ? displayFiltered.slice() : $.map(displayMaster, function(el, i) {
            return -1 === $.inArray(el, displayFiltered) ? el : null;
        }); else if ("index" == order || "original" == order) for (i = 0, ien = settings.aoData.length; ien > i; i++) "none" == search ? a.push(i) : (tmp = $.inArray(i, displayFiltered), 
        (-1 === tmp && "removed" == search || tmp >= 0 && "applied" == search) && a.push(i));
        return a;
    }, __row_selector = function(settings, selector, opts) {
        var run = function(sel) {
            var selInt = _intVal(sel);
            if (null !== selInt && !opts) return [ selInt ];
            var rows = _selector_row_indexes(settings, opts);
            if (null !== selInt && -1 !== $.inArray(selInt, rows)) return [ selInt ];
            if (!sel) return rows;
            if ("function" == typeof sel) return $.map(rows, function(idx) {
                var row = settings.aoData[idx];
                return sel(idx, row._aData, row.nTr) ? idx : null;
            });
            var nodes = _removeEmpty(_pluck_order(settings.aoData, rows, "nTr"));
            if (sel.nodeName && -1 !== $.inArray(sel, nodes)) return [ sel._DT_RowIndex ];
            if ("string" == typeof sel && "#" === sel.charAt(0)) {
                var rowObj = settings.aIds[sel.replace(/^#/, "")];
                if (rowObj !== undefined) return [ rowObj.idx ];
            }
            return $(nodes).filter(sel).map(function() {
                return this._DT_RowIndex;
            }).toArray();
        };
        return _selector_run("row", selector, run, settings, opts);
    };
    _api_register("rows()", function(selector, opts) {
        selector === undefined ? selector = "" : $.isPlainObject(selector) && (opts = selector, 
        selector = ""), opts = _selector_opts(opts);
        var inst = this.iterator("table", function(settings) {
            return __row_selector(settings, selector, opts);
        }, 1);
        return inst.selector.rows = selector, inst.selector.opts = opts, inst;
    }), _api_register("rows().nodes()", function() {
        return this.iterator("row", function(settings, row) {
            return settings.aoData[row].nTr || undefined;
        }, 1);
    }), _api_register("rows().data()", function() {
        return this.iterator(!0, "rows", function(settings, rows) {
            return _pluck_order(settings.aoData, rows, "_aData");
        }, 1);
    }), _api_registerPlural("rows().cache()", "row().cache()", function(type) {
        return this.iterator("row", function(settings, row) {
            var r = settings.aoData[row];
            return "search" === type ? r._aFilterData : r._aSortData;
        }, 1);
    }), _api_registerPlural("rows().invalidate()", "row().invalidate()", function(src) {
        return this.iterator("row", function(settings, row) {
            _fnInvalidate(settings, row, src);
        });
    }), _api_registerPlural("rows().indexes()", "row().index()", function() {
        return this.iterator("row", function(settings, row) {
            return row;
        }, 1);
    }), _api_registerPlural("rows().ids()", "row().id()", function(hash) {
        for (var a = [], context = this.context, i = 0, ien = context.length; ien > i; i++) for (var j = 0, jen = this[i].length; jen > j; j++) {
            var id = context[i].rowIdFn(context[i].aoData[this[i][j]]._aData);
            a.push((hash === !0 ? "#" : "") + id);
        }
        return new _Api(context, a);
    }), _api_registerPlural("rows().remove()", "row().remove()", function() {
        var that = this;
        return this.iterator("row", function(settings, row, thatIdx) {
            var i, ien, j, jen, loopRow, loopCells, data = settings.aoData, rowData = data[row];
            for (data.splice(row, 1), i = 0, ien = data.length; ien > i; i++) if (loopRow = data[i], 
            loopCells = loopRow.anCells, null !== loopRow.nTr && (loopRow.nTr._DT_RowIndex = i), 
            null !== loopCells) for (j = 0, jen = loopCells.length; jen > j; j++) loopCells[j]._DT_CellIndex.row = i;
            _fnDeleteIndex(settings.aiDisplayMaster, row), _fnDeleteIndex(settings.aiDisplay, row), 
            _fnDeleteIndex(that[thatIdx], row, !1), _fnLengthOverflow(settings);
            var id = settings.rowIdFn(rowData._aData);
            id !== undefined && delete settings.aIds[id];
        }), this.iterator("table", function(settings) {
            for (var i = 0, ien = settings.aoData.length; ien > i; i++) settings.aoData[i].idx = i;
        }), this;
    }), _api_register("rows.add()", function(rows) {
        var newRows = this.iterator("table", function(settings) {
            var row, i, ien, out = [];
            for (i = 0, ien = rows.length; ien > i; i++) row = rows[i], row.nodeName && "TR" === row.nodeName.toUpperCase() ? out.push(_fnAddTr(settings, row)[0]) : out.push(_fnAddData(settings, row));
            return out;
        }, 1), modRows = this.rows(-1);
        return modRows.pop(), $.merge(modRows, newRows), modRows;
    }), _api_register("row()", function(selector, opts) {
        return _selector_first(this.rows(selector, opts));
    }), _api_register("row().data()", function(data) {
        var ctx = this.context;
        return data === undefined ? ctx.length && this.length ? ctx[0].aoData[this[0]]._aData : undefined : (ctx[0].aoData[this[0]]._aData = data, 
        _fnInvalidate(ctx[0], this[0], "data"), this);
    }), _api_register("row().node()", function() {
        var ctx = this.context;
        return ctx.length && this.length ? ctx[0].aoData[this[0]].nTr || null : null;
    }), _api_register("row.add()", function(row) {
        row instanceof $ && row.length && (row = row[0]);
        var rows = this.iterator("table", function(settings) {
            return row.nodeName && "TR" === row.nodeName.toUpperCase() ? _fnAddTr(settings, row)[0] : _fnAddData(settings, row);
        });
        return this.row(rows[0]);
    });
    var __details_add = function(ctx, row, data, klass) {
        var rows = [], addRow = function(r, k) {
            if ($.isArray(r) || r instanceof $) for (var i = 0, ien = r.length; ien > i; i++) addRow(r[i], k); else if (r.nodeName && "tr" === r.nodeName.toLowerCase()) rows.push(r); else {
                var created = $("<tr><td/></tr>").addClass(k);
                $("td", created).addClass(k).html(r)[0].colSpan = _fnVisbleColumns(ctx), rows.push(created[0]);
            }
        };
        addRow(data, klass), row._details && row._details.remove(), row._details = $(rows), 
        row._detailsShow && row._details.insertAfter(row.nTr);
    }, __details_remove = function(api, idx) {
        var ctx = api.context;
        if (ctx.length) {
            var row = ctx[0].aoData[idx !== undefined ? idx : api[0]];
            row && row._details && (row._details.remove(), row._detailsShow = undefined, row._details = undefined);
        }
    }, __details_display = function(api, show) {
        var ctx = api.context;
        if (ctx.length && api.length) {
            var row = ctx[0].aoData[api[0]];
            row._details && (row._detailsShow = show, show ? row._details.insertAfter(row.nTr) : row._details.detach(), 
            __details_events(ctx[0]));
        }
    }, __details_events = function(settings) {
        var api = new _Api(settings), namespace = ".dt.DT_details", drawEvent = "draw" + namespace, colvisEvent = "column-visibility" + namespace, destroyEvent = "destroy" + namespace, data = settings.aoData;
        api.off(drawEvent + " " + colvisEvent + " " + destroyEvent), _pluck(data, "_details").length > 0 && (api.on(drawEvent, function(e, ctx) {
            settings === ctx && api.rows({
                page: "current"
            }).eq(0).each(function(idx) {
                var row = data[idx];
                row._detailsShow && row._details.insertAfter(row.nTr);
            });
        }), api.on(colvisEvent, function(e, ctx, idx, vis) {
            if (settings === ctx) for (var row, visible = _fnVisbleColumns(ctx), i = 0, ien = data.length; ien > i; i++) row = data[i], 
            row._details && row._details.children("td[colspan]").attr("colspan", visible);
        }), api.on(destroyEvent, function(e, ctx) {
            if (settings === ctx) for (var i = 0, ien = data.length; ien > i; i++) data[i]._details && __details_remove(api, i);
        }));
    }, _emp = "", _child_obj = _emp + "row().child", _child_mth = _child_obj + "()";
    _api_register(_child_mth, function(data, klass) {
        var ctx = this.context;
        return data === undefined ? ctx.length && this.length ? ctx[0].aoData[this[0]]._details : undefined : (data === !0 ? this.child.show() : data === !1 ? __details_remove(this) : ctx.length && this.length && __details_add(ctx[0], ctx[0].aoData[this[0]], data, klass), 
        this);
    }), _api_register([ _child_obj + ".show()", _child_mth + ".show()" ], function(show) {
        return __details_display(this, !0), this;
    }), _api_register([ _child_obj + ".hide()", _child_mth + ".hide()" ], function() {
        return __details_display(this, !1), this;
    }), _api_register([ _child_obj + ".remove()", _child_mth + ".remove()" ], function() {
        return __details_remove(this), this;
    }), _api_register(_child_obj + ".isShown()", function() {
        var ctx = this.context;
        return ctx.length && this.length ? ctx[0].aoData[this[0]]._detailsShow || !1 : !1;
    });
    var __re_column_selector = /^(.+):(name|visIdx|visible)$/, __columnData = function(settings, column, r1, r2, rows) {
        for (var a = [], row = 0, ien = rows.length; ien > row; row++) a.push(_fnGetCellData(settings, rows[row], column));
        return a;
    }, __column_selector = function(settings, selector, opts) {
        var columns = settings.aoColumns, names = _pluck(columns, "sName"), nodes = _pluck(columns, "nTh"), run = function(s) {
            var selInt = _intVal(s);
            if ("" === s) return _range(columns.length);
            if (null !== selInt) return [ selInt >= 0 ? selInt : columns.length + selInt ];
            if ("function" == typeof s) {
                var rows = _selector_row_indexes(settings, opts);
                return $.map(columns, function(col, idx) {
                    return s(idx, __columnData(settings, idx, 0, 0, rows), nodes[idx]) ? idx : null;
                });
            }
            var match = "string" == typeof s ? s.match(__re_column_selector) : "";
            if (!match) return $(nodes).filter(s).map(function() {
                return $.inArray(this, nodes);
            }).toArray();
            switch (match[2]) {
              case "visIdx":
              case "visible":
                var idx = parseInt(match[1], 10);
                if (0 > idx) {
                    var visColumns = $.map(columns, function(col, i) {
                        return col.bVisible ? i : null;
                    });
                    return [ visColumns[visColumns.length + idx] ];
                }
                return [ _fnVisibleToColumnIndex(settings, idx) ];

              case "name":
                return $.map(names, function(name, i) {
                    return name === match[1] ? i : null;
                });
            }
        };
        return _selector_run("column", selector, run, settings, opts);
    }, __setColumnVis = function(settings, column, vis, recalc) {
        var cells, i, ien, tr, cols = settings.aoColumns, col = cols[column], data = settings.aoData;
        if (vis === undefined) return col.bVisible;
        if (col.bVisible !== vis) {
            if (vis) {
                var insertBefore = $.inArray(!0, _pluck(cols, "bVisible"), column + 1);
                for (i = 0, ien = data.length; ien > i; i++) tr = data[i].nTr, cells = data[i].anCells, 
                tr && tr.insertBefore(cells[column], cells[insertBefore] || null);
            } else $(_pluck(settings.aoData, "anCells", column)).detach();
            col.bVisible = vis, _fnDrawHead(settings, settings.aoHeader), _fnDrawHead(settings, settings.aoFooter), 
            (recalc === undefined || recalc) && (_fnAdjustColumnSizing(settings), (settings.oScroll.sX || settings.oScroll.sY) && _fnScrollDraw(settings)), 
            _fnCallbackFire(settings, null, "column-visibility", [ settings, column, vis, recalc ]), 
            _fnSaveState(settings);
        }
    };
    _api_register("columns()", function(selector, opts) {
        selector === undefined ? selector = "" : $.isPlainObject(selector) && (opts = selector, 
        selector = ""), opts = _selector_opts(opts);
        var inst = this.iterator("table", function(settings) {
            return __column_selector(settings, selector, opts);
        }, 1);
        return inst.selector.cols = selector, inst.selector.opts = opts, inst;
    }), _api_registerPlural("columns().header()", "column().header()", function(selector, opts) {
        return this.iterator("column", function(settings, column) {
            return settings.aoColumns[column].nTh;
        }, 1);
    }), _api_registerPlural("columns().footer()", "column().footer()", function(selector, opts) {
        return this.iterator("column", function(settings, column) {
            return settings.aoColumns[column].nTf;
        }, 1);
    }), _api_registerPlural("columns().data()", "column().data()", function() {
        return this.iterator("column-rows", __columnData, 1);
    }), _api_registerPlural("columns().dataSrc()", "column().dataSrc()", function() {
        return this.iterator("column", function(settings, column) {
            return settings.aoColumns[column].mData;
        }, 1);
    }), _api_registerPlural("columns().cache()", "column().cache()", function(type) {
        return this.iterator("column-rows", function(settings, column, i, j, rows) {
            return _pluck_order(settings.aoData, rows, "search" === type ? "_aFilterData" : "_aSortData", column);
        }, 1);
    }), _api_registerPlural("columns().nodes()", "column().nodes()", function() {
        return this.iterator("column-rows", function(settings, column, i, j, rows) {
            return _pluck_order(settings.aoData, rows, "anCells", column);
        }, 1);
    }), _api_registerPlural("columns().visible()", "column().visible()", function(vis, calc) {
        return this.iterator("column", function(settings, column) {
            return vis === undefined ? settings.aoColumns[column].bVisible : void __setColumnVis(settings, column, vis, calc);
        });
    }), _api_registerPlural("columns().indexes()", "column().index()", function(type) {
        return this.iterator("column", function(settings, column) {
            return "visible" === type ? _fnColumnIndexToVisible(settings, column) : column;
        }, 1);
    }), _api_register("columns.adjust()", function() {
        return this.iterator("table", function(settings) {
            _fnAdjustColumnSizing(settings);
        }, 1);
    }), _api_register("column.index()", function(type, idx) {
        if (0 !== this.context.length) {
            var ctx = this.context[0];
            if ("fromVisible" === type || "toData" === type) return _fnVisibleToColumnIndex(ctx, idx);
            if ("fromData" === type || "toVisible" === type) return _fnColumnIndexToVisible(ctx, idx);
        }
    }), _api_register("column()", function(selector, opts) {
        return _selector_first(this.columns(selector, opts));
    });
    var __cell_selector = function(settings, selector, opts) {
        var row, a, i, ien, j, o, host, data = settings.aoData, rows = _selector_row_indexes(settings, opts), cells = _removeEmpty(_pluck_order(data, rows, "anCells")), allCells = $([].concat.apply([], cells)), columns = settings.aoColumns.length, run = function(s) {
            var fnSelector = "function" == typeof s;
            if (null === s || s === undefined || fnSelector) {
                for (a = [], i = 0, ien = rows.length; ien > i; i++) for (row = rows[i], j = 0; columns > j; j++) o = {
                    row: row,
                    column: j
                }, fnSelector ? (host = data[row], s(o, _fnGetCellData(settings, row, j), host.anCells ? host.anCells[j] : null) && a.push(o)) : a.push(o);
                return a;
            }
            return $.isPlainObject(s) ? [ s ] : allCells.filter(s).map(function(i, el) {
                return {
                    row: el._DT_CellIndex.row,
                    column: el._DT_CellIndex.column
                };
            }).toArray();
        };
        return _selector_run("cell", selector, run, settings, opts);
    };
    _api_register("cells()", function(rowSelector, columnSelector, opts) {
        if ($.isPlainObject(rowSelector) && (rowSelector.row === undefined ? (opts = rowSelector, 
        rowSelector = null) : (opts = columnSelector, columnSelector = null)), $.isPlainObject(columnSelector) && (opts = columnSelector, 
        columnSelector = null), null === columnSelector || columnSelector === undefined) return this.iterator("table", function(settings) {
            return __cell_selector(settings, rowSelector, _selector_opts(opts));
        });
        var a, i, ien, j, jen, columns = this.columns(columnSelector, opts), rows = this.rows(rowSelector, opts), cells = this.iterator("table", function(settings, idx) {
            for (a = [], i = 0, ien = rows[idx].length; ien > i; i++) for (j = 0, jen = columns[idx].length; jen > j; j++) a.push({
                row: rows[idx][i],
                column: columns[idx][j]
            });
            return a;
        }, 1);
        return $.extend(cells.selector, {
            cols: columnSelector,
            rows: rowSelector,
            opts: opts
        }), cells;
    }), _api_registerPlural("cells().nodes()", "cell().node()", function() {
        return this.iterator("cell", function(settings, row, column) {
            var cells = settings.aoData[row].anCells;
            return cells ? cells[column] : undefined;
        }, 1);
    }), _api_register("cells().data()", function() {
        return this.iterator("cell", function(settings, row, column) {
            return _fnGetCellData(settings, row, column);
        }, 1);
    }), _api_registerPlural("cells().cache()", "cell().cache()", function(type) {
        return type = "search" === type ? "_aFilterData" : "_aSortData", this.iterator("cell", function(settings, row, column) {
            return settings.aoData[row][type][column];
        }, 1);
    }), _api_registerPlural("cells().render()", "cell().render()", function(type) {
        return this.iterator("cell", function(settings, row, column) {
            return _fnGetCellData(settings, row, column, type);
        }, 1);
    }), _api_registerPlural("cells().indexes()", "cell().index()", function() {
        return this.iterator("cell", function(settings, row, column) {
            return {
                row: row,
                column: column,
                columnVisible: _fnColumnIndexToVisible(settings, column)
            };
        }, 1);
    }), _api_registerPlural("cells().invalidate()", "cell().invalidate()", function(src) {
        return this.iterator("cell", function(settings, row, column) {
            _fnInvalidate(settings, row, src, column);
        });
    }), _api_register("cell()", function(rowSelector, columnSelector, opts) {
        return _selector_first(this.cells(rowSelector, columnSelector, opts));
    }), _api_register("cell().data()", function(data) {
        var ctx = this.context, cell = this[0];
        return data === undefined ? ctx.length && cell.length ? _fnGetCellData(ctx[0], cell[0].row, cell[0].column) : undefined : (_fnSetCellData(ctx[0], cell[0].row, cell[0].column, data), 
        _fnInvalidate(ctx[0], cell[0].row, "data", cell[0].column), this);
    }), _api_register("order()", function(order, dir) {
        var ctx = this.context;
        return order === undefined ? 0 !== ctx.length ? ctx[0].aaSorting : undefined : ("number" == typeof order ? order = [ [ order, dir ] ] : $.isArray(order[0]) || (order = Array.prototype.slice.call(arguments)), 
        this.iterator("table", function(settings) {
            settings.aaSorting = order.slice();
        }));
    }), _api_register("order.listener()", function(node, column, callback) {
        return this.iterator("table", function(settings) {
            _fnSortAttachListener(settings, node, column, callback);
        });
    }), _api_register("order.fixed()", function(set) {
        if (!set) {
            var ctx = this.context, fixed = ctx.length ? ctx[0].aaSortingFixed : undefined;
            return $.isArray(fixed) ? {
                pre: fixed
            } : fixed;
        }
        return this.iterator("table", function(settings) {
            settings.aaSortingFixed = $.extend(!0, {}, set);
        });
    }), _api_register([ "columns().order()", "column().order()" ], function(dir) {
        var that = this;
        return this.iterator("table", function(settings, i) {
            var sort = [];
            $.each(that[i], function(j, col) {
                sort.push([ col, dir ]);
            }), settings.aaSorting = sort;
        });
    }), _api_register("search()", function(input, regex, smart, caseInsen) {
        var ctx = this.context;
        return input === undefined ? 0 !== ctx.length ? ctx[0].oPreviousSearch.sSearch : undefined : this.iterator("table", function(settings) {
            settings.oFeatures.bFilter && _fnFilterComplete(settings, $.extend({}, settings.oPreviousSearch, {
                sSearch: input + "",
                bRegex: null === regex ? !1 : regex,
                bSmart: null === smart ? !0 : smart,
                bCaseInsensitive: null === caseInsen ? !0 : caseInsen
            }), 1);
        });
    }), _api_registerPlural("columns().search()", "column().search()", function(input, regex, smart, caseInsen) {
        return this.iterator("column", function(settings, column) {
            var preSearch = settings.aoPreSearchCols;
            return input === undefined ? preSearch[column].sSearch : void (settings.oFeatures.bFilter && ($.extend(preSearch[column], {
                sSearch: input + "",
                bRegex: null === regex ? !1 : regex,
                bSmart: null === smart ? !0 : smart,
                bCaseInsensitive: null === caseInsen ? !0 : caseInsen
            }), _fnFilterComplete(settings, settings.oPreviousSearch, 1)));
        });
    }), _api_register("state()", function() {
        return this.context.length ? this.context[0].oSavedState : null;
    }), _api_register("state.clear()", function() {
        return this.iterator("table", function(settings) {
            settings.fnStateSaveCallback.call(settings.oInstance, settings, {});
        });
    }), _api_register("state.loaded()", function() {
        return this.context.length ? this.context[0].oLoadedState : null;
    }), _api_register("state.save()", function() {
        return this.iterator("table", function(settings) {
            _fnSaveState(settings);
        });
    }), DataTable.versionCheck = DataTable.fnVersionCheck = function(version) {
        for (var iThis, iThat, aThis = DataTable.version.split("."), aThat = version.split("."), i = 0, iLen = aThat.length; iLen > i; i++) if (iThis = parseInt(aThis[i], 10) || 0, 
        iThat = parseInt(aThat[i], 10) || 0, iThis !== iThat) return iThis > iThat;
        return !0;
    }, DataTable.isDataTable = DataTable.fnIsDataTable = function(table) {
        var t = $(table).get(0), is = !1;
        return $.each(DataTable.settings, function(i, o) {
            var head = o.nScrollHead ? $("table", o.nScrollHead)[0] : null, foot = o.nScrollFoot ? $("table", o.nScrollFoot)[0] : null;
            (o.nTable === t || head === t || foot === t) && (is = !0);
        }), is;
    }, DataTable.tables = DataTable.fnTables = function(visible) {
        var api = !1;
        $.isPlainObject(visible) && (api = visible.api, visible = visible.visible);
        var a = $.map(DataTable.settings, function(o) {
            return !visible || visible && $(o.nTable).is(":visible") ? o.nTable : void 0;
        });
        return api ? new _Api(a) : a;
    }, DataTable.util = {
        throttle: _fnThrottle,
        escapeRegex: _fnEscapeRegex
    }, DataTable.camelToHungarian = _fnCamelToHungarian, _api_register("$()", function(selector, opts) {
        var rows = this.rows(opts).nodes(), jqRows = $(rows);
        return $([].concat(jqRows.filter(selector).toArray(), jqRows.find(selector).toArray()));
    }), $.each([ "on", "one", "off" ], function(i, key) {
        _api_register(key + "()", function() {
            var args = Array.prototype.slice.call(arguments);
            args[0].match(/\.dt\b/) || (args[0] += ".dt");
            var inst = $(this.tables().nodes());
            return inst[key].apply(inst, args), this;
        });
    }), _api_register("clear()", function() {
        return this.iterator("table", function(settings) {
            _fnClearTable(settings);
        });
    }), _api_register("settings()", function() {
        return new _Api(this.context, this.context);
    }), _api_register("init()", function() {
        var ctx = this.context;
        return ctx.length ? ctx[0].oInit : null;
    }), _api_register("data()", function() {
        return this.iterator("table", function(settings) {
            return _pluck(settings.aoData, "_aData");
        }).flatten();
    }), _api_register("destroy()", function(remove) {
        return remove = remove || !1, this.iterator("table", function(settings) {
            var ien, orig = settings.nTableWrapper.parentNode, classes = settings.oClasses, table = settings.nTable, tbody = settings.nTBody, thead = settings.nTHead, tfoot = settings.nTFoot, jqTable = $(table), jqTbody = $(tbody), jqWrapper = $(settings.nTableWrapper), rows = $.map(settings.aoData, function(r) {
                return r.nTr;
            });
            settings.bDestroying = !0, _fnCallbackFire(settings, "aoDestroyCallback", "destroy", [ settings ]), 
            remove || new _Api(settings).columns().visible(!0), jqWrapper.unbind(".DT").find(":not(tbody *)").unbind(".DT"), 
            $(window).unbind(".DT-" + settings.sInstance), table != thead.parentNode && (jqTable.children("thead").detach(), 
            jqTable.append(thead)), tfoot && table != tfoot.parentNode && (jqTable.children("tfoot").detach(), 
            jqTable.append(tfoot)), settings.aaSorting = [], settings.aaSortingFixed = [], _fnSortingClasses(settings), 
            $(rows).removeClass(settings.asStripeClasses.join(" ")), $("th, td", thead).removeClass(classes.sSortable + " " + classes.sSortableAsc + " " + classes.sSortableDesc + " " + classes.sSortableNone), 
            settings.bJUI && ($("th span." + classes.sSortIcon + ", td span." + classes.sSortIcon, thead).detach(), 
            $("th, td", thead).each(function() {
                var wrapper = $("div." + classes.sSortJUIWrapper, this);
                $(this).append(wrapper.contents()), wrapper.detach();
            })), jqTbody.children().detach(), jqTbody.append(rows);
            var removedMethod = remove ? "remove" : "detach";
            jqTable[removedMethod](), jqWrapper[removedMethod](), !remove && orig && (orig.insertBefore(table, settings.nTableReinsertBefore), 
            jqTable.css("width", settings.sDestroyWidth).removeClass(classes.sTable), ien = settings.asDestroyStripes.length, 
            ien && jqTbody.children().each(function(i) {
                $(this).addClass(settings.asDestroyStripes[i % ien]);
            }));
            var idx = $.inArray(settings, DataTable.settings);
            -1 !== idx && DataTable.settings.splice(idx, 1);
        });
    }), $.each([ "column", "row", "cell" ], function(i, type) {
        _api_register(type + "s().every()", function(fn) {
            var opts = this.selector.opts, api = this;
            return this.iterator(type, function(settings, arg1, arg2, arg3, arg4) {
                fn.call(api[type](arg1, "cell" === type ? arg2 : opts, "cell" === type ? opts : undefined), arg1, arg2, arg3, arg4);
            });
        });
    }), _api_register("i18n()", function(token, def, plural) {
        var ctx = this.context[0], resolved = _fnGetObjectDataFn(token)(ctx.oLanguage);
        return resolved === undefined && (resolved = def), plural !== undefined && $.isPlainObject(resolved) && (resolved = resolved[plural] !== undefined ? resolved[plural] : resolved._), 
        resolved.replace("%d", plural);
    }), DataTable.version = "1.10.10", DataTable.settings = [], DataTable.models = {}, 
    DataTable.models.oSearch = {
        bCaseInsensitive: !0,
        sSearch: "",
        bRegex: !1,
        bSmart: !0
    }, DataTable.models.oRow = {
        nTr: null,
        anCells: null,
        _aData: [],
        _aSortData: null,
        _aFilterData: null,
        _sFilterRow: null,
        _sRowStripe: "",
        src: null,
        idx: -1
    }, DataTable.models.oColumn = {
        idx: null,
        aDataSort: null,
        asSorting: null,
        bSearchable: null,
        bSortable: null,
        bVisible: null,
        _sManualType: null,
        _bAttrSrc: !1,
        fnCreatedCell: null,
        fnGetData: null,
        fnSetData: null,
        mData: null,
        mRender: null,
        nTh: null,
        nTf: null,
        sClass: null,
        sContentPadding: null,
        sDefaultContent: null,
        sName: null,
        sSortDataType: "std",
        sSortingClass: null,
        sSortingClassJUI: null,
        sTitle: null,
        sType: null,
        sWidth: null,
        sWidthOrig: null
    }, DataTable.defaults = {
        aaData: null,
        aaSorting: [ [ 0, "asc" ] ],
        aaSortingFixed: [],
        ajax: null,
        aLengthMenu: [ 10, 25, 50, 100 ],
        aoColumns: null,
        aoColumnDefs: null,
        aoSearchCols: [],
        asStripeClasses: null,
        bAutoWidth: !0,
        bDeferRender: !1,
        bDestroy: !1,
        bFilter: !0,
        bInfo: !0,
        bJQueryUI: !1,
        bLengthChange: !0,
        bPaginate: !0,
        bProcessing: !1,
        bRetrieve: !1,
        bScrollCollapse: !1,
        bServerSide: !1,
        bSort: !0,
        bSortMulti: !0,
        bSortCellsTop: !1,
        bSortClasses: !0,
        bStateSave: !1,
        fnCreatedRow: null,
        fnDrawCallback: null,
        fnFooterCallback: null,
        fnFormatNumber: function(toFormat) {
            return toFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands);
        },
        fnHeaderCallback: null,
        fnInfoCallback: null,
        fnInitComplete: null,
        fnPreDrawCallback: null,
        fnRowCallback: null,
        fnServerData: null,
        fnServerParams: null,
        fnStateLoadCallback: function(settings) {
            try {
                return JSON.parse((-1 === settings.iStateDuration ? sessionStorage : localStorage).getItem("DataTables_" + settings.sInstance + "_" + location.pathname));
            } catch (e) {}
        },
        fnStateLoadParams: null,
        fnStateLoaded: null,
        fnStateSaveCallback: function(settings, data) {
            try {
                (-1 === settings.iStateDuration ? sessionStorage : localStorage).setItem("DataTables_" + settings.sInstance + "_" + location.pathname, JSON.stringify(data));
            } catch (e) {}
        },
        fnStateSaveParams: null,
        iStateDuration: 7200,
        iDeferLoading: null,
        iDisplayLength: 10,
        iDisplayStart: 0,
        iTabIndex: 0,
        oClasses: {},
        oLanguage: {
            oAria: {
                sSortAscending: ": activate to sort column ascending",
                sSortDescending: ": activate to sort column descending"
            },
            oPaginate: {
                sFirst: "First",
                sLast: "Last",
                sNext: "Next",
                sPrevious: "Previous"
            },
            sEmptyTable: "No data available in table",
            sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
            sInfoEmpty: "Showing 0 to 0 of 0 entries",
            sInfoFiltered: "(filtered from _MAX_ total entries)",
            sInfoPostFix: "",
            sDecimal: "",
            sThousands: ",",
            sLengthMenu: "Show _MENU_ entries",
            sLoadingRecords: "Loading...",
            sProcessing: "Processing...",
            sSearch: "Search:",
            sSearchPlaceholder: "",
            sUrl: "",
            sZeroRecords: "No matching records found"
        },
        oSearch: $.extend({}, DataTable.models.oSearch),
        sAjaxDataProp: "data",
        sAjaxSource: null,
        sDom: "lfrtip",
        searchDelay: null,
        sPaginationType: "simple_numbers",
        sScrollX: "",
        sScrollXInner: "",
        sScrollY: "",
        sServerMethod: "GET",
        renderer: null,
        rowId: "DT_RowId"
    }, _fnHungarianMap(DataTable.defaults), DataTable.defaults.column = {
        aDataSort: null,
        iDataSort: -1,
        asSorting: [ "asc", "desc" ],
        bSearchable: !0,
        bSortable: !0,
        bVisible: !0,
        fnCreatedCell: null,
        mData: null,
        mRender: null,
        sCellType: "td",
        sClass: "",
        sContentPadding: "",
        sDefaultContent: null,
        sName: "",
        sSortDataType: "std",
        sTitle: null,
        sType: null,
        sWidth: null
    }, _fnHungarianMap(DataTable.defaults.column), DataTable.models.oSettings = {
        oFeatures: {
            bAutoWidth: null,
            bDeferRender: null,
            bFilter: null,
            bInfo: null,
            bLengthChange: null,
            bPaginate: null,
            bProcessing: null,
            bServerSide: null,
            bSort: null,
            bSortMulti: null,
            bSortClasses: null,
            bStateSave: null
        },
        oScroll: {
            bCollapse: null,
            iBarWidth: 0,
            sX: null,
            sXInner: null,
            sY: null
        },
        oLanguage: {
            fnInfoCallback: null
        },
        oBrowser: {
            bScrollOversize: !1,
            bScrollbarLeft: !1,
            bBounding: !1,
            barWidth: 0
        },
        ajax: null,
        aanFeatures: [],
        aoData: [],
        aiDisplay: [],
        aiDisplayMaster: [],
        aIds: {},
        aoColumns: [],
        aoHeader: [],
        aoFooter: [],
        oPreviousSearch: {},
        aoPreSearchCols: [],
        aaSorting: null,
        aaSortingFixed: [],
        asStripeClasses: null,
        asDestroyStripes: [],
        sDestroyWidth: 0,
        aoRowCallback: [],
        aoHeaderCallback: [],
        aoFooterCallback: [],
        aoDrawCallback: [],
        aoRowCreatedCallback: [],
        aoPreDrawCallback: [],
        aoInitComplete: [],
        aoStateSaveParams: [],
        aoStateLoadParams: [],
        aoStateLoaded: [],
        sTableId: "",
        nTable: null,
        nTHead: null,
        nTFoot: null,
        nTBody: null,
        nTableWrapper: null,
        bDeferLoading: !1,
        bInitialised: !1,
        aoOpenRows: [],
        sDom: null,
        searchDelay: null,
        sPaginationType: "two_button",
        iStateDuration: 0,
        aoStateSave: [],
        aoStateLoad: [],
        oSavedState: null,
        oLoadedState: null,
        sAjaxSource: null,
        sAjaxDataProp: null,
        bAjaxDataGet: !0,
        jqXHR: null,
        json: undefined,
        oAjaxData: undefined,
        fnServerData: null,
        aoServerParams: [],
        sServerMethod: null,
        fnFormatNumber: null,
        aLengthMenu: null,
        iDraw: 0,
        bDrawing: !1,
        iDrawError: -1,
        _iDisplayLength: 10,
        _iDisplayStart: 0,
        _iRecordsTotal: 0,
        _iRecordsDisplay: 0,
        bJUI: null,
        oClasses: {},
        bFiltered: !1,
        bSorted: !1,
        bSortCellsTop: null,
        oInit: null,
        aoDestroyCallback: [],
        fnRecordsTotal: function() {
            return "ssp" == _fnDataSource(this) ? 1 * this._iRecordsTotal : this.aiDisplayMaster.length;
        },
        fnRecordsDisplay: function() {
            return "ssp" == _fnDataSource(this) ? 1 * this._iRecordsDisplay : this.aiDisplay.length;
        },
        fnDisplayEnd: function() {
            var len = this._iDisplayLength, start = this._iDisplayStart, calc = start + len, records = this.aiDisplay.length, features = this.oFeatures, paginate = features.bPaginate;
            return features.bServerSide ? paginate === !1 || -1 === len ? start + records : Math.min(start + len, this._iRecordsDisplay) : !paginate || calc > records || -1 === len ? records : calc;
        },
        oInstance: null,
        sInstance: null,
        iTabIndex: 0,
        nScrollHead: null,
        nScrollFoot: null,
        aLastSort: [],
        oPlugins: {},
        rowIdFn: null,
        rowId: null
    }, DataTable.ext = _ext = {
        buttons: {},
        classes: {},
        builder: "-source-",
        errMode: "alert",
        feature: [],
        search: [],
        selector: {
            cell: [],
            column: [],
            row: []
        },
        internal: {},
        legacy: {
            ajax: null
        },
        pager: {},
        renderer: {
            pageButton: {},
            header: {}
        },
        order: {},
        type: {
            detect: [],
            search: {},
            order: {}
        },
        _unique: 0,
        fnVersionCheck: DataTable.fnVersionCheck,
        iApiIndex: 0,
        oJUIClasses: {},
        sVersion: DataTable.version
    }, $.extend(_ext, {
        afnFiltering: _ext.search,
        aTypes: _ext.type.detect,
        ofnSearch: _ext.type.search,
        oSort: _ext.type.order,
        afnSortData: _ext.order,
        aoFeatures: _ext.feature,
        oApi: _ext.internal,
        oStdClasses: _ext.classes,
        oPagination: _ext.pager
    }), $.extend(DataTable.ext.classes, {
        sTable: "dataTable",
        sNoFooter: "no-footer",
        sPageButton: "paginate_button",
        sPageButtonActive: "current",
        sPageButtonDisabled: "disabled",
        sStripeOdd: "odd",
        sStripeEven: "even",
        sRowEmpty: "dataTables_empty",
        sWrapper: "dataTables_wrapper",
        sFilter: "dataTables_filter",
        sInfo: "dataTables_info",
        sPaging: "dataTables_paginate paging_",
        sLength: "dataTables_length",
        sProcessing: "dataTables_processing",
        sSortAsc: "sorting_asc",
        sSortDesc: "sorting_desc",
        sSortable: "sorting",
        sSortableAsc: "sorting_asc_disabled",
        sSortableDesc: "sorting_desc_disabled",
        sSortableNone: "sorting_disabled",
        sSortColumn: "sorting_",
        sFilterInput: "",
        sLengthSelect: "",
        sScrollWrapper: "dataTables_scroll",
        sScrollHead: "dataTables_scrollHead",
        sScrollHeadInner: "dataTables_scrollHeadInner",
        sScrollBody: "dataTables_scrollBody",
        sScrollFoot: "dataTables_scrollFoot",
        sScrollFootInner: "dataTables_scrollFootInner",
        sHeaderTH: "",
        sFooterTH: "",
        sSortJUIAsc: "",
        sSortJUIDesc: "",
        sSortJUI: "",
        sSortJUIAscAllowed: "",
        sSortJUIDescAllowed: "",
        sSortJUIWrapper: "",
        sSortIcon: "",
        sJUIHeader: "",
        sJUIFooter: ""
    }), function() {
        var _empty = "";
        _empty = "";
        var _stateDefault = _empty + "ui-state-default", _sortIcon = _empty + "css_right ui-icon ui-icon-", _headerFooter = _empty + "fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";
        $.extend(DataTable.ext.oJUIClasses, DataTable.ext.classes, {
            sPageButton: "fg-button ui-button " + _stateDefault,
            sPageButtonActive: "ui-state-disabled",
            sPageButtonDisabled: "ui-state-disabled",
            sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
            sSortAsc: _stateDefault + " sorting_asc",
            sSortDesc: _stateDefault + " sorting_desc",
            sSortable: _stateDefault + " sorting",
            sSortableAsc: _stateDefault + " sorting_asc_disabled",
            sSortableDesc: _stateDefault + " sorting_desc_disabled",
            sSortableNone: _stateDefault + " sorting_disabled",
            sSortJUIAsc: _sortIcon + "triangle-1-n",
            sSortJUIDesc: _sortIcon + "triangle-1-s",
            sSortJUI: _sortIcon + "carat-2-n-s",
            sSortJUIAscAllowed: _sortIcon + "carat-1-n",
            sSortJUIDescAllowed: _sortIcon + "carat-1-s",
            sSortJUIWrapper: "DataTables_sort_wrapper",
            sSortIcon: "DataTables_sort_icon",
            sScrollHead: "dataTables_scrollHead " + _stateDefault,
            sScrollFoot: "dataTables_scrollFoot " + _stateDefault,
            sHeaderTH: _stateDefault,
            sFooterTH: _stateDefault,
            sJUIHeader: _headerFooter + " ui-corner-tl ui-corner-tr",
            sJUIFooter: _headerFooter + " ui-corner-bl ui-corner-br"
        });
    }();
    var extPagination = DataTable.ext.pager;
    $.extend(extPagination, {
        simple: function(page, pages) {
            return [ "previous", "next" ];
        },
        full: function(page, pages) {
            return [ "first", "previous", "next", "last" ];
        },
        numbers: function(page, pages) {
            return [ _numbers(page, pages) ];
        },
        simple_numbers: function(page, pages) {
            return [ "previous", _numbers(page, pages), "next" ];
        },
        full_numbers: function(page, pages) {
            return [ "first", "previous", _numbers(page, pages), "next", "last" ];
        },
        _numbers: _numbers,
        numbers_length: 7
    }), $.extend(!0, DataTable.ext.renderer, {
        pageButton: {
            _: function(settings, host, idx, buttons, page, pages) {
                var btnDisplay, btnClass, activeEl, classes = settings.oClasses, lang = settings.oLanguage.oPaginate, aria = settings.oLanguage.oAria.paginate || {}, counter = 0, attach = function(container, buttons) {
                    var i, ien, node, button, clickHandler = function(e) {
                        _fnPageChange(settings, e.data.action, !0);
                    };
                    for (i = 0, ien = buttons.length; ien > i; i++) if (button = buttons[i], $.isArray(button)) {
                        var inner = $("<" + (button.DT_el || "div") + "/>").appendTo(container);
                        attach(inner, button);
                    } else {
                        switch (btnDisplay = null, btnClass = "", button) {
                          case "ellipsis":
                            container.append('<span class="ellipsis">&#x2026;</span>');
                            break;

                          case "first":
                            btnDisplay = lang.sFirst, btnClass = button + (page > 0 ? "" : " " + classes.sPageButtonDisabled);
                            break;

                          case "previous":
                            btnDisplay = lang.sPrevious, btnClass = button + (page > 0 ? "" : " " + classes.sPageButtonDisabled);
                            break;

                          case "next":
                            btnDisplay = lang.sNext, btnClass = button + (pages - 1 > page ? "" : " " + classes.sPageButtonDisabled);
                            break;

                          case "last":
                            btnDisplay = lang.sLast, btnClass = button + (pages - 1 > page ? "" : " " + classes.sPageButtonDisabled);
                            break;

                          default:
                            btnDisplay = button + 1, btnClass = page === button ? classes.sPageButtonActive : "";
                        }
                        null !== btnDisplay && (node = $("<a>", {
                            "class": classes.sPageButton + " " + btnClass,
                            "aria-controls": settings.sTableId,
                            "aria-label": aria[button],
                            "data-dt-idx": counter,
                            tabindex: settings.iTabIndex,
                            id: 0 === idx && "string" == typeof button ? settings.sTableId + "_" + button : null
                        }).html(btnDisplay).appendTo(container), _fnBindAction(node, {
                            action: button
                        }, clickHandler), counter++);
                    }
                };
                try {
                    activeEl = $(host).find(document.activeElement).data("dt-idx");
                } catch (e) {}
                attach($(host).empty(), buttons), activeEl && $(host).find("[data-dt-idx=" + activeEl + "]").focus();
            }
        }
    }), $.extend(DataTable.ext.type.detect, [ function(d, settings) {
        var decimal = settings.oLanguage.sDecimal;
        return _isNumber(d, decimal) ? "num" + decimal : null;
    }, function(d, settings) {
        if (d && !(d instanceof Date) && (!_re_date_start.test(d) || !_re_date_end.test(d))) return null;
        var parsed = Date.parse(d);
        return null !== parsed && !isNaN(parsed) || _empty(d) ? "date" : null;
    }, function(d, settings) {
        var decimal = settings.oLanguage.sDecimal;
        return _isNumber(d, decimal, !0) ? "num-fmt" + decimal : null;
    }, function(d, settings) {
        var decimal = settings.oLanguage.sDecimal;
        return _htmlNumeric(d, decimal) ? "html-num" + decimal : null;
    }, function(d, settings) {
        var decimal = settings.oLanguage.sDecimal;
        return _htmlNumeric(d, decimal, !0) ? "html-num-fmt" + decimal : null;
    }, function(d, settings) {
        return _empty(d) || "string" == typeof d && -1 !== d.indexOf("<") ? "html" : null;
    } ]), $.extend(DataTable.ext.type.search, {
        html: function(data) {
            return _empty(data) ? data : "string" == typeof data ? data.replace(_re_new_lines, " ").replace(_re_html, "") : "";
        },
        string: function(data) {
            return _empty(data) ? data : "string" == typeof data ? data.replace(_re_new_lines, " ") : data;
        }
    });
    var __numericReplace = function(d, decimalPlace, re1, re2) {
        return 0 === d || d && "-" !== d ? (decimalPlace && (d = _numToDecimal(d, decimalPlace)), 
        d.replace && (re1 && (d = d.replace(re1, "")), re2 && (d = d.replace(re2, ""))), 
        1 * d) : -(1 / 0);
    };
    return $.extend(_ext.type.order, {
        "date-pre": function(d) {
            return Date.parse(d) || 0;
        },
        "html-pre": function(a) {
            return _empty(a) ? "" : a.replace ? a.replace(/<.*?>/g, "").toLowerCase() : a + "";
        },
        "string-pre": function(a) {
            return _empty(a) ? "" : "string" == typeof a ? a.toLowerCase() : a.toString ? a.toString() : "";
        },
        "string-asc": function(x, y) {
            return y > x ? -1 : x > y ? 1 : 0;
        },
        "string-desc": function(x, y) {
            return y > x ? 1 : x > y ? -1 : 0;
        }
    }), _addNumericSort(""), $.extend(!0, DataTable.ext.renderer, {
        header: {
            _: function(settings, cell, column, classes) {
                $(settings.nTable).on("order.dt.DT", function(e, ctx, sorting, columns) {
                    if (settings === ctx) {
                        var colIdx = column.idx;
                        cell.removeClass(column.sSortingClass + " " + classes.sSortAsc + " " + classes.sSortDesc).addClass("asc" == columns[colIdx] ? classes.sSortAsc : "desc" == columns[colIdx] ? classes.sSortDesc : column.sSortingClass);
                    }
                });
            },
            jqueryui: function(settings, cell, column, classes) {
                $("<div/>").addClass(classes.sSortJUIWrapper).append(cell.contents()).append($("<span/>").addClass(classes.sSortIcon + " " + column.sSortingClassJUI)).appendTo(cell), 
                $(settings.nTable).on("order.dt.DT", function(e, ctx, sorting, columns) {
                    if (settings === ctx) {
                        var colIdx = column.idx;
                        cell.removeClass(classes.sSortAsc + " " + classes.sSortDesc).addClass("asc" == columns[colIdx] ? classes.sSortAsc : "desc" == columns[colIdx] ? classes.sSortDesc : column.sSortingClass), 
                        cell.find("span." + classes.sSortIcon).removeClass(classes.sSortJUIAsc + " " + classes.sSortJUIDesc + " " + classes.sSortJUI + " " + classes.sSortJUIAscAllowed + " " + classes.sSortJUIDescAllowed).addClass("asc" == columns[colIdx] ? classes.sSortJUIAsc : "desc" == columns[colIdx] ? classes.sSortJUIDesc : column.sSortingClassJUI);
                    }
                });
            }
        }
    }), DataTable.render = {
        number: function(thousands, decimal, precision, prefix, postfix) {
            return {
                display: function(d) {
                    if ("number" != typeof d && "string" != typeof d) return d;
                    var negative = 0 > d ? "-" : "", flo = parseFloat(d);
                    if (isNaN(flo)) return d;
                    d = Math.abs(flo);
                    var intPart = parseInt(d, 10), floatPart = precision ? decimal + (d - intPart).toFixed(precision).substring(2) : "";
                    return negative + (prefix || "") + intPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousands) + floatPart + (postfix || "");
                }
            };
        },
        text: function() {
            return {
                display: function(d) {
                    return "string" == typeof d ? d.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : d;
                }
            };
        }
    }, $.extend(DataTable.ext.internal, {
        _fnExternApiFunc: _fnExternApiFunc,
        _fnBuildAjax: _fnBuildAjax,
        _fnAjaxUpdate: _fnAjaxUpdate,
        _fnAjaxParameters: _fnAjaxParameters,
        _fnAjaxUpdateDraw: _fnAjaxUpdateDraw,
        _fnAjaxDataSrc: _fnAjaxDataSrc,
        _fnAddColumn: _fnAddColumn,
        _fnColumnOptions: _fnColumnOptions,
        _fnAdjustColumnSizing: _fnAdjustColumnSizing,
        _fnVisibleToColumnIndex: _fnVisibleToColumnIndex,
        _fnColumnIndexToVisible: _fnColumnIndexToVisible,
        _fnVisbleColumns: _fnVisbleColumns,
        _fnGetColumns: _fnGetColumns,
        _fnColumnTypes: _fnColumnTypes,
        _fnApplyColumnDefs: _fnApplyColumnDefs,
        _fnHungarianMap: _fnHungarianMap,
        _fnCamelToHungarian: _fnCamelToHungarian,
        _fnLanguageCompat: _fnLanguageCompat,
        _fnBrowserDetect: _fnBrowserDetect,
        _fnAddData: _fnAddData,
        _fnAddTr: _fnAddTr,
        _fnNodeToDataIndex: _fnNodeToDataIndex,
        _fnNodeToColumnIndex: _fnNodeToColumnIndex,
        _fnGetCellData: _fnGetCellData,
        _fnSetCellData: _fnSetCellData,
        _fnSplitObjNotation: _fnSplitObjNotation,
        _fnGetObjectDataFn: _fnGetObjectDataFn,
        _fnSetObjectDataFn: _fnSetObjectDataFn,
        _fnGetDataMaster: _fnGetDataMaster,
        _fnClearTable: _fnClearTable,
        _fnDeleteIndex: _fnDeleteIndex,
        _fnInvalidate: _fnInvalidate,
        _fnGetRowElements: _fnGetRowElements,
        _fnCreateTr: _fnCreateTr,
        _fnBuildHead: _fnBuildHead,
        _fnDrawHead: _fnDrawHead,
        _fnDraw: _fnDraw,
        _fnReDraw: _fnReDraw,
        _fnAddOptionsHtml: _fnAddOptionsHtml,
        _fnDetectHeader: _fnDetectHeader,
        _fnGetUniqueThs: _fnGetUniqueThs,
        _fnFeatureHtmlFilter: _fnFeatureHtmlFilter,
        _fnFilterComplete: _fnFilterComplete,
        _fnFilterCustom: _fnFilterCustom,
        _fnFilterColumn: _fnFilterColumn,
        _fnFilter: _fnFilter,
        _fnFilterCreateSearch: _fnFilterCreateSearch,
        _fnEscapeRegex: _fnEscapeRegex,
        _fnFilterData: _fnFilterData,
        _fnFeatureHtmlInfo: _fnFeatureHtmlInfo,
        _fnUpdateInfo: _fnUpdateInfo,
        _fnInfoMacros: _fnInfoMacros,
        _fnInitialise: _fnInitialise,
        _fnInitComplete: _fnInitComplete,
        _fnLengthChange: _fnLengthChange,
        _fnFeatureHtmlLength: _fnFeatureHtmlLength,
        _fnFeatureHtmlPaginate: _fnFeatureHtmlPaginate,
        _fnPageChange: _fnPageChange,
        _fnFeatureHtmlProcessing: _fnFeatureHtmlProcessing,
        _fnProcessingDisplay: _fnProcessingDisplay,
        _fnFeatureHtmlTable: _fnFeatureHtmlTable,
        _fnScrollDraw: _fnScrollDraw,
        _fnApplyToChildren: _fnApplyToChildren,
        _fnCalculateColumnWidths: _fnCalculateColumnWidths,
        _fnThrottle: _fnThrottle,
        _fnConvertToWidth: _fnConvertToWidth,
        _fnGetWidestNode: _fnGetWidestNode,
        _fnGetMaxLenString: _fnGetMaxLenString,
        _fnStringToCss: _fnStringToCss,
        _fnSortFlatten: _fnSortFlatten,
        _fnSort: _fnSort,
        _fnSortAria: _fnSortAria,
        _fnSortListener: _fnSortListener,
        _fnSortAttachListener: _fnSortAttachListener,
        _fnSortingClasses: _fnSortingClasses,
        _fnSortData: _fnSortData,
        _fnSaveState: _fnSaveState,
        _fnLoadState: _fnLoadState,
        _fnSettingsFromNode: _fnSettingsFromNode,
        _fnLog: _fnLog,
        _fnMap: _fnMap,
        _fnBindAction: _fnBindAction,
        _fnCallbackReg: _fnCallbackReg,
        _fnCallbackFire: _fnCallbackFire,
        _fnLengthOverflow: _fnLengthOverflow,
        _fnRenderer: _fnRenderer,
        _fnDataSource: _fnDataSource,
        _fnRowAttributes: _fnRowAttributes,
        _fnCalculateEnd: function() {}
    }), $.fn.dataTable = DataTable, DataTable.$ = $, $.fn.dataTableSettings = DataTable.settings, 
    $.fn.dataTableExt = DataTable.ext, $.fn.DataTable = function(opts) {
        return $(this).dataTable(opts).api();
    }, $.each(DataTable, function(prop, val) {
        $.fn.DataTable[prop] = val;
    }), $.fn.dataTable;
}), function(factory) {
    "function" == typeof define && define.amd ? define([ "jquery", "datatables.net" ], function($) {
        return factory($, window, document);
    }) : "object" == typeof exports ? module.exports = function(root, $) {
        return root || (root = window), $ && $.fn.dataTable || ($ = require("datatables.net")(root, $).$), 
        factory($, root, root.document);
    } : factory(jQuery, window, document);
}(function($, window, document, undefined) {
    "use strict";
    var DataTable = $.fn.dataTable;
    return $.extend(!0, DataTable.defaults, {
        dom: "<'row'<'col-sm-6'l><'col-sm-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-5'i><'col-sm-7'p>>",
        renderer: "bootstrap"
    }), $.extend(DataTable.ext.classes, {
        sWrapper: "dataTables_wrapper form-inline dt-bootstrap",
        sFilterInput: "form-control input-sm",
        sLengthSelect: "form-control input-sm",
        sProcessing: "dataTables_processing panel panel-default"
    }), DataTable.ext.renderer.pageButton.bootstrap = function(settings, host, idx, buttons, page, pages) {
        var btnDisplay, btnClass, activeEl, api = new DataTable.Api(settings), classes = settings.oClasses, lang = settings.oLanguage.oPaginate, aria = settings.oLanguage.oAria.paginate || {}, counter = 0, attach = function(container, buttons) {
            var i, ien, node, button, clickHandler = function(e) {
                e.preventDefault(), $(e.currentTarget).hasClass("disabled") || api.page() == e.data.action || api.page(e.data.action).draw("page");
            };
            for (i = 0, ien = buttons.length; ien > i; i++) if (button = buttons[i], $.isArray(button)) attach(container, button); else {
                switch (btnDisplay = "", btnClass = "", button) {
                  case "ellipsis":
                    btnDisplay = "&#x2026;", btnClass = "disabled";
                    break;

                  case "first":
                    btnDisplay = lang.sFirst, btnClass = button + (page > 0 ? "" : " disabled");
                    break;

                  case "previous":
                    btnDisplay = lang.sPrevious, btnClass = button + (page > 0 ? "" : " disabled");
                    break;

                  case "next":
                    btnDisplay = lang.sNext, btnClass = button + (pages - 1 > page ? "" : " disabled");
                    break;

                  case "last":
                    btnDisplay = lang.sLast, btnClass = button + (pages - 1 > page ? "" : " disabled");
                    break;

                  default:
                    btnDisplay = button + 1, btnClass = page === button ? "active" : "";
                }
                btnDisplay && (node = $("<li>", {
                    "class": classes.sPageButton + " " + btnClass,
                    id: 0 === idx && "string" == typeof button ? settings.sTableId + "_" + button : null
                }).append($("<a>", {
                    href: "#",
                    "aria-controls": settings.sTableId,
                    "aria-label": aria[button],
                    "data-dt-idx": counter,
                    tabindex: settings.iTabIndex
                }).html(btnDisplay)).appendTo(container), settings.oApi._fnBindAction(node, {
                    action: button
                }, clickHandler), counter++);
            }
        };
        try {
            activeEl = $(host).find(document.activeElement).data("dt-idx");
        } catch (e) {}
        attach($(host).empty().html('<ul class="pagination"/>').children("ul"), buttons), 
        activeEl && $(host).find("[data-dt-idx=" + activeEl + "]").focus();
    }, DataTable.TableTools && ($.extend(!0, DataTable.TableTools.classes, {
        container: "DTTT btn-group",
        buttons: {
            normal: "btn btn-default",
            disabled: "disabled"
        },
        collection: {
            container: "DTTT_dropdown dropdown-menu",
            buttons: {
                normal: "",
                disabled: "disabled"
            }
        },
        print: {
            info: "DTTT_print_info"
        },
        select: {
            row: "active"
        }
    }), $.extend(!0, DataTable.TableTools.DEFAULTS.oTags, {
        collection: {
            container: "ul",
            button: "li",
            liner: "a"
        }
    })), DataTable;
});

var DataGrid = function() {
    var tableOptions, dataTable, table, that, ajaxParams = {};
    return {
        init: function(options) {
            $().dataTable && (that = this, options = $.extend(!0, {
                src: "",
                filterApplyAction: "filter",
                filterCancelAction: "filter_cancel",
                resetGroupActionInputOnSuccess: !0,
                loadingMessage: "Loading...",
                dataTable: {
                    language: {
                        sSearch: "Tag search:"
                    },
                    ajax: {
                        url: "",
                        type: "post",
                        data: function(data) {
                            $.each(ajaxParams, function(key, value) {
                                data[key] = value;
                            });
                        }
                    }
                }
            }, options), tableOptions = options, table = $(options.src), dataTable = table.DataTable(options.dataTable), 
            table.on("click", ".filter-submit", function(e) {
                e.preventDefault(), $(this).pulsate({
                    repeat: !1
                }), that.submitFilter();
            }), table.on("click", ".filter-cancel", function(e) {
                e.preventDefault(), that.resetFilter();
            }), table.on("click", ".btn-view", function(e) {
                var id = $(this).data("id"), promise = $.post("/views", {
                    id: id
                });
                promise.done(function(resp) {
                    console.log(resp);
                });
            }));
        },
        submitFilter: function() {
            that.setAjaxParam("action", tableOptions.filterApplyAction), $('textarea.form-filter, select.form-filter, input.form-filter:not([type="radio"],[type="checkbox"])', table).each(function() {
                that.setAjaxParam($(this).attr("name"), $(this).val());
            }), $('input.form-filter[type="checkbox"]:checked', table).each(function() {
                that.addAjaxParam($(this).attr("name"), $(this).val());
            }), $('input.form-filter[type="radio"]:checked', table).each(function() {
                that.setAjaxParam($(this).attr("name"), $(this).val());
            }), dataTable.ajax.reload();
        },
        resetFilter: function() {
            $("textarea.form-filter, select.form-filter, input.form-filter", table).each(function() {
                $(this).val("");
            }), $('input.form-filter[type="checkbox"]', table).each(function() {
                $(this).attr("checked", !1);
            }), that.clearAjaxParams(), that.addAjaxParam("action", tableOptions.filterCancelAction), 
            dataTable.ajax.reload();
        },
        setAjaxParam: function(name, value) {
            ajaxParams[name] = value;
        },
        addAjaxParam: function(name, value) {
            ajaxParams[name] || (ajaxParams[name] = []), skip = !1;
            for (var i = 0; i < ajaxParams[name].length; i++) ajaxParams[name][i] === value && (skip = !0);
            skip === !1 && ajaxParams[name].push(value);
        },
        clearAjaxParams: function(name, value) {
            ajaxParams = {};
        },
        getDataTable: function() {
            return dataTable;
        },
        getTable: function() {
            return table;
        }
    };
}, GridAjax = function() {
    var initPickers = function() {
        $(".date-picker").datepicker({
            autoclose: !0
        });
    }, initDatatable = function() {
        var grid = new DataGrid();
        grid.init({
            src: $("#datatable"),
            dataTable: {
                lengthMenu: [ [ 10, 20, 50, 100, 150 ], [ 10, 20, 50, 100, 150 ] ],
                pageLength: 10,
                bStateSave: !0,
                orderCellsTop: !0,
                pagingType: "full",
                autoWidth: !1,
                processing: !0,
                serverSide: !0,
                searching: !0,
                columnDefs: [ {
                    orderable: !1,
                    targets: [ 4 ]
                } ],
                ajax: {
                    url: "/data"
                },
                order: [ [ 0, "asc" ] ]
            }
        }), $("div.dataTables_filter input").attr("placeholder", "Enter tag name.");
    };
    return {
        init: function() {
            initPickers(), initDatatable();
        }
    };
}(), App = function() {
    var isRTL = !1, isIE8 = !1, isIE9 = !1, isIE10 = !1, handleInit = function() {
        "rtl" === $("body").css("direction") && (isRTL = !0), isIE8 = !!navigator.userAgent.match(/MSIE 8.0/), 
        isIE9 = !!navigator.userAgent.match(/MSIE 9.0/), isIE10 = !!navigator.userAgent.match(/MSIE 10.0/), 
        isIE10 && jQuery("html").addClass("ie10"), (isIE10 || isIE9 || isIE8) && jQuery("html").addClass("ie");
    };
    return {
        init: function() {
            handleInit();
        },
        isIE8: function() {
            return isIE8;
        },
        isIE9: function() {
            return isIE9;
        },
        isRTL: function() {
            return isRTL;
        }
    };
}();

jQuery(document).ready(function() {
    App.init(), GridAjax.init();
});