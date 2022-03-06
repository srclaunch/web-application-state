var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
import React, { StrictMode } from "react";
import { createSlice, combineReducers as combineReducers$1, createEntityAdapter, configureStore } from "@reduxjs/toolkit";
import { EnvironmentType, FormValidationProblem, Condition, PageRole } from "@srclaunch/types";
import { createBrowserHistory } from "history";
import ReactDOM from "react-dom";
import { useDispatch, useSelector, Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export { Link, NavLink, Navigate, Outlet, Route, Router, Routes, useLocation, useMatch, useNavigate, useParams, useResolvedPath, useSearchParams } from "react-router-dom";
import { UncaughtException, MissingArgumentException, InvalidArgumentException, Exception, AuthenticationLoginException, AuthenticationException, AuthenticationUsernameAvailabilityCheckException } from "@srclaunch/exceptions";
import Logger, { Logger as Logger$1 } from "@srclaunch/logger";
import { AppLabLightTheme, AppLabDarkTheme } from "@srclaunch/themes";
import { validate } from "@srclaunch/validation";
export { matchPath, matchRoutes } from "react-router";
const o = { id: "dev", type: EnvironmentType.Development, public: false, name: "Development", description: "Development environment" }, t = { id: "test", type: EnvironmentType.NonProduction, public: false, name: "Test", description: "Test environment" }, i$1 = { id: "prod", type: EnvironmentType.Production, public: true, name: "Production", description: "Production environment" };
function s$1() {
  if (window) {
    const n2 = window.location.hostname;
    return n2.includes("localhost") || n2.includes("127.0.0.1") ? o : n2.includes("test") ? t : i$1;
  }
  return t;
}
const contextMiddleware = (store) => (next) => (action) => {
  return next(action);
};
const logger$2 = new Logger();
const exceptionLogger = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (err) {
    const exception = new UncaughtException(err.name, { cause: err });
    logger$2.exception(exception.toJSON());
    throw err;
  }
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getAugmentedNamespace(n2) {
  if (n2.__esModule)
    return n2;
  var a = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n2).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n2, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n2[k];
      }
    });
  });
  return a;
}
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var reduxLogger = { exports: {} };
(function(module, exports) {
  !function(e, t2) {
    t2(exports);
  }(commonjsGlobal, function(e) {
    function t2(e2, t3) {
      e2.super_ = t3, e2.prototype = Object.create(t3.prototype, { constructor: { value: e2, enumerable: false, writable: true, configurable: true } });
    }
    function r(e2, t3) {
      Object.defineProperty(this, "kind", { value: e2, enumerable: true }), t3 && t3.length && Object.defineProperty(this, "path", { value: t3, enumerable: true });
    }
    function n2(e2, t3, r2) {
      n2.super_.call(this, "E", e2), Object.defineProperty(this, "lhs", { value: t3, enumerable: true }), Object.defineProperty(this, "rhs", { value: r2, enumerable: true });
    }
    function o2(e2, t3) {
      o2.super_.call(this, "N", e2), Object.defineProperty(this, "rhs", { value: t3, enumerable: true });
    }
    function i(e2, t3) {
      i.super_.call(this, "D", e2), Object.defineProperty(this, "lhs", { value: t3, enumerable: true });
    }
    function a(e2, t3, r2) {
      a.super_.call(this, "A", e2), Object.defineProperty(this, "index", { value: t3, enumerable: true }), Object.defineProperty(this, "item", { value: r2, enumerable: true });
    }
    function f(e2, t3, r2) {
      var n3 = e2.slice((r2 || t3) + 1 || e2.length);
      return e2.length = t3 < 0 ? e2.length + t3 : t3, e2.push.apply(e2, n3), e2;
    }
    function u(e2) {
      var t3 = typeof e2 == "undefined" ? "undefined" : N(e2);
      return t3 !== "object" ? t3 : e2 === Math ? "math" : e2 === null ? "null" : Array.isArray(e2) ? "array" : Object.prototype.toString.call(e2) === "[object Date]" ? "date" : typeof e2.toString == "function" && /^\/.*\//.test(e2.toString()) ? "regexp" : "object";
    }
    function l2(e2, t3, r2, c2, s3, d2, p2) {
      s3 = s3 || [], p2 = p2 || [];
      var g2 = s3.slice(0);
      if (typeof d2 != "undefined") {
        if (c2) {
          if (typeof c2 == "function" && c2(g2, d2))
            return;
          if ((typeof c2 == "undefined" ? "undefined" : N(c2)) === "object") {
            if (c2.prefilter && c2.prefilter(g2, d2))
              return;
            if (c2.normalize) {
              var h2 = c2.normalize(g2, d2, e2, t3);
              h2 && (e2 = h2[0], t3 = h2[1]);
            }
          }
        }
        g2.push(d2);
      }
      u(e2) === "regexp" && u(t3) === "regexp" && (e2 = e2.toString(), t3 = t3.toString());
      var y2 = typeof e2 == "undefined" ? "undefined" : N(e2), v2 = typeof t3 == "undefined" ? "undefined" : N(t3), b2 = y2 !== "undefined" || p2 && p2[p2.length - 1].lhs && p2[p2.length - 1].lhs.hasOwnProperty(d2), m2 = v2 !== "undefined" || p2 && p2[p2.length - 1].rhs && p2[p2.length - 1].rhs.hasOwnProperty(d2);
      if (!b2 && m2)
        r2(new o2(g2, t3));
      else if (!m2 && b2)
        r2(new i(g2, e2));
      else if (u(e2) !== u(t3))
        r2(new n2(g2, e2, t3));
      else if (u(e2) === "date" && e2 - t3 !== 0)
        r2(new n2(g2, e2, t3));
      else if (y2 === "object" && e2 !== null && t3 !== null)
        if (p2.filter(function(t4) {
          return t4.lhs === e2;
        }).length)
          e2 !== t3 && r2(new n2(g2, e2, t3));
        else {
          if (p2.push({ lhs: e2, rhs: t3 }), Array.isArray(e2)) {
            var w2;
            e2.length;
            for (w2 = 0; w2 < e2.length; w2++)
              w2 >= t3.length ? r2(new a(g2, w2, new i(void 0, e2[w2]))) : l2(e2[w2], t3[w2], r2, c2, g2, w2, p2);
            for (; w2 < t3.length; )
              r2(new a(g2, w2, new o2(void 0, t3[w2++])));
          } else {
            var x2 = Object.keys(e2), S2 = Object.keys(t3);
            x2.forEach(function(n3, o3) {
              var i2 = S2.indexOf(n3);
              i2 >= 0 ? (l2(e2[n3], t3[n3], r2, c2, g2, n3, p2), S2 = f(S2, i2)) : l2(e2[n3], void 0, r2, c2, g2, n3, p2);
            }), S2.forEach(function(e3) {
              l2(void 0, t3[e3], r2, c2, g2, e3, p2);
            });
          }
          p2.length = p2.length - 1;
        }
      else
        e2 !== t3 && (y2 === "number" && isNaN(e2) && isNaN(t3) || r2(new n2(g2, e2, t3)));
    }
    function c(e2, t3, r2, n3) {
      return n3 = n3 || [], l2(e2, t3, function(e3) {
        e3 && n3.push(e3);
      }, r2), n3.length ? n3 : void 0;
    }
    function s2(e2, t3, r2) {
      if (r2.path && r2.path.length) {
        var n3, o3 = e2[t3], i2 = r2.path.length - 1;
        for (n3 = 0; n3 < i2; n3++)
          o3 = o3[r2.path[n3]];
        switch (r2.kind) {
          case "A":
            s2(o3[r2.path[n3]], r2.index, r2.item);
            break;
          case "D":
            delete o3[r2.path[n3]];
            break;
          case "E":
          case "N":
            o3[r2.path[n3]] = r2.rhs;
        }
      } else
        switch (r2.kind) {
          case "A":
            s2(e2[t3], r2.index, r2.item);
            break;
          case "D":
            e2 = f(e2, t3);
            break;
          case "E":
          case "N":
            e2[t3] = r2.rhs;
        }
      return e2;
    }
    function d(e2, t3, r2) {
      if (e2 && t3 && r2 && r2.kind) {
        for (var n3 = e2, o3 = -1, i2 = r2.path ? r2.path.length - 1 : 0; ++o3 < i2; )
          typeof n3[r2.path[o3]] == "undefined" && (n3[r2.path[o3]] = typeof r2.path[o3] == "number" ? [] : {}), n3 = n3[r2.path[o3]];
        switch (r2.kind) {
          case "A":
            s2(r2.path ? n3[r2.path[o3]] : n3, r2.index, r2.item);
            break;
          case "D":
            delete n3[r2.path[o3]];
            break;
          case "E":
          case "N":
            n3[r2.path[o3]] = r2.rhs;
        }
      }
    }
    function p(e2, t3, r2) {
      if (r2.path && r2.path.length) {
        var n3, o3 = e2[t3], i2 = r2.path.length - 1;
        for (n3 = 0; n3 < i2; n3++)
          o3 = o3[r2.path[n3]];
        switch (r2.kind) {
          case "A":
            p(o3[r2.path[n3]], r2.index, r2.item);
            break;
          case "D":
            o3[r2.path[n3]] = r2.lhs;
            break;
          case "E":
            o3[r2.path[n3]] = r2.lhs;
            break;
          case "N":
            delete o3[r2.path[n3]];
        }
      } else
        switch (r2.kind) {
          case "A":
            p(e2[t3], r2.index, r2.item);
            break;
          case "D":
            e2[t3] = r2.lhs;
            break;
          case "E":
            e2[t3] = r2.lhs;
            break;
          case "N":
            e2 = f(e2, t3);
        }
      return e2;
    }
    function g(e2, t3, r2) {
      if (e2 && t3 && r2 && r2.kind) {
        var n3, o3, i2 = e2;
        for (o3 = r2.path.length - 1, n3 = 0; n3 < o3; n3++)
          typeof i2[r2.path[n3]] == "undefined" && (i2[r2.path[n3]] = {}), i2 = i2[r2.path[n3]];
        switch (r2.kind) {
          case "A":
            p(i2[r2.path[n3]], r2.index, r2.item);
            break;
          case "D":
            i2[r2.path[n3]] = r2.lhs;
            break;
          case "E":
            i2[r2.path[n3]] = r2.lhs;
            break;
          case "N":
            delete i2[r2.path[n3]];
        }
      }
    }
    function h(e2, t3, r2) {
      if (e2 && t3) {
        var n3 = function(n4) {
          r2 && !r2(e2, t3, n4) || d(e2, t3, n4);
        };
        l2(e2, t3, n3);
      }
    }
    function y(e2) {
      return "color: " + F[e2].color + "; font-weight: bold";
    }
    function v(e2) {
      var t3 = e2.kind, r2 = e2.path, n3 = e2.lhs, o3 = e2.rhs, i2 = e2.index, a2 = e2.item;
      switch (t3) {
        case "E":
          return [r2.join("."), n3, "\u2192", o3];
        case "N":
          return [r2.join("."), o3];
        case "D":
          return [r2.join(".")];
        case "A":
          return [r2.join(".") + "[" + i2 + "]", a2];
        default:
          return [];
      }
    }
    function b(e2, t3, r2, n3) {
      var o3 = c(e2, t3);
      try {
        n3 ? r2.groupCollapsed("diff") : r2.group("diff");
      } catch (e3) {
        r2.log("diff");
      }
      o3 ? o3.forEach(function(e3) {
        var t4 = e3.kind, n4 = v(e3);
        r2.log.apply(r2, ["%c " + F[t4].text, y(t4)].concat(P(n4)));
      }) : r2.log("\u2014\u2014 no diff \u2014\u2014");
      try {
        r2.groupEnd();
      } catch (e3) {
        r2.log("\u2014\u2014 diff end \u2014\u2014 ");
      }
    }
    function m(e2, t3, r2, n3) {
      switch (typeof e2 == "undefined" ? "undefined" : N(e2)) {
        case "object":
          return typeof e2[n3] == "function" ? e2[n3].apply(e2, P(r2)) : e2[n3];
        case "function":
          return e2(t3);
        default:
          return e2;
      }
    }
    function w(e2) {
      var t3 = e2.timestamp, r2 = e2.duration;
      return function(e3, n3, o3) {
        var i2 = ["action"];
        return i2.push("%c" + String(e3.type)), t3 && i2.push("%c@ " + n3), r2 && i2.push("%c(in " + o3.toFixed(2) + " ms)"), i2.join(" ");
      };
    }
    function x(e2, t3) {
      var r2 = t3.logger, n3 = t3.actionTransformer, o3 = t3.titleFormatter, i2 = o3 === void 0 ? w(t3) : o3, a2 = t3.collapsed, f2 = t3.colors, u2 = t3.level, l3 = t3.diff, c2 = typeof t3.titleFormatter == "undefined";
      e2.forEach(function(o4, s3) {
        var d2 = o4.started, p2 = o4.startedTime, g2 = o4.action, h2 = o4.prevState, y2 = o4.error, v2 = o4.took, w2 = o4.nextState, x2 = e2[s3 + 1];
        x2 && (w2 = x2.prevState, v2 = x2.started - d2);
        var S2 = n3(g2), k2 = typeof a2 == "function" ? a2(function() {
          return w2;
        }, g2, o4) : a2, j2 = D(p2), E2 = f2.title ? "color: " + f2.title(S2) + ";" : "", A2 = ["color: gray; font-weight: lighter;"];
        A2.push(E2), t3.timestamp && A2.push("color: gray; font-weight: lighter;"), t3.duration && A2.push("color: gray; font-weight: lighter;");
        var O2 = i2(S2, j2, v2);
        try {
          k2 ? f2.title && c2 ? r2.groupCollapsed.apply(r2, ["%c " + O2].concat(A2)) : r2.groupCollapsed(O2) : f2.title && c2 ? r2.group.apply(r2, ["%c " + O2].concat(A2)) : r2.group(O2);
        } catch (e3) {
          r2.log(O2);
        }
        var N2 = m(u2, S2, [h2], "prevState"), P2 = m(u2, S2, [S2], "action"), C2 = m(u2, S2, [y2, h2], "error"), F2 = m(u2, S2, [w2], "nextState");
        if (N2)
          if (f2.prevState) {
            var L2 = "color: " + f2.prevState(h2) + "; font-weight: bold";
            r2[N2]("%c prev state", L2, h2);
          } else
            r2[N2]("prev state", h2);
        if (P2)
          if (f2.action) {
            var T2 = "color: " + f2.action(S2) + "; font-weight: bold";
            r2[P2]("%c action    ", T2, S2);
          } else
            r2[P2]("action    ", S2);
        if (y2 && C2)
          if (f2.error) {
            var M = "color: " + f2.error(y2, h2) + "; font-weight: bold;";
            r2[C2]("%c error     ", M, y2);
          } else
            r2[C2]("error     ", y2);
        if (F2)
          if (f2.nextState) {
            var _ = "color: " + f2.nextState(w2) + "; font-weight: bold";
            r2[F2]("%c next state", _, w2);
          } else
            r2[F2]("next state", w2);
        l3 && b(h2, w2, r2, k2);
        try {
          r2.groupEnd();
        } catch (e3) {
          r2.log("\u2014\u2014 log end \u2014\u2014");
        }
      });
    }
    function S() {
      var e2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t3 = Object.assign({}, L, e2), r2 = t3.logger, n3 = t3.stateTransformer, o3 = t3.errorTransformer, i2 = t3.predicate, a2 = t3.logErrors, f2 = t3.diffPredicate;
      if (typeof r2 == "undefined")
        return function() {
          return function(e3) {
            return function(t4) {
              return e3(t4);
            };
          };
        };
      if (e2.getState && e2.dispatch)
        return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"), function() {
          return function(e3) {
            return function(t4) {
              return e3(t4);
            };
          };
        };
      var u2 = [];
      return function(e3) {
        var r3 = e3.getState;
        return function(e4) {
          return function(l3) {
            if (typeof i2 == "function" && !i2(r3, l3))
              return e4(l3);
            var c2 = {};
            u2.push(c2), c2.started = O.now(), c2.startedTime = new Date(), c2.prevState = n3(r3()), c2.action = l3;
            var s3 = void 0;
            if (a2)
              try {
                s3 = e4(l3);
              } catch (e5) {
                c2.error = o3(e5);
              }
            else
              s3 = e4(l3);
            c2.took = O.now() - c2.started, c2.nextState = n3(r3());
            var d2 = t3.diff && typeof f2 == "function" ? f2(r3, l3) : t3.diff;
            if (x(u2, Object.assign({}, t3, { diff: d2 })), u2.length = 0, c2.error)
              throw c2.error;
            return s3;
          };
        };
      };
    }
    var k, j, E = function(e2, t3) {
      return new Array(t3 + 1).join(e2);
    }, A = function(e2, t3) {
      return E("0", t3 - e2.toString().length) + e2;
    }, D = function(e2) {
      return A(e2.getHours(), 2) + ":" + A(e2.getMinutes(), 2) + ":" + A(e2.getSeconds(), 2) + "." + A(e2.getMilliseconds(), 3);
    }, O = typeof performance != "undefined" && performance !== null && typeof performance.now == "function" ? performance : Date, N = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e2) {
      return typeof e2;
    } : function(e2) {
      return e2 && typeof Symbol == "function" && e2.constructor === Symbol && e2 !== Symbol.prototype ? "symbol" : typeof e2;
    }, P = function(e2) {
      if (Array.isArray(e2)) {
        for (var t3 = 0, r2 = Array(e2.length); t3 < e2.length; t3++)
          r2[t3] = e2[t3];
        return r2;
      }
      return Array.from(e2);
    }, C = [];
    k = (typeof commonjsGlobal == "undefined" ? "undefined" : N(commonjsGlobal)) === "object" && commonjsGlobal ? commonjsGlobal : typeof window != "undefined" ? window : {}, j = k.DeepDiff, j && C.push(function() {
      typeof j != "undefined" && k.DeepDiff === c && (k.DeepDiff = j, j = void 0);
    }), t2(n2, r), t2(o2, r), t2(i, r), t2(a, r), Object.defineProperties(c, { diff: { value: c, enumerable: true }, observableDiff: { value: l2, enumerable: true }, applyDiff: { value: h, enumerable: true }, applyChange: { value: d, enumerable: true }, revertChange: { value: g, enumerable: true }, isConflict: { value: function() {
      return typeof j != "undefined";
    }, enumerable: true }, noConflict: { value: function() {
      return C && (C.forEach(function(e2) {
        e2();
      }), C = null), c;
    }, enumerable: true } });
    var F = { E: { color: "#2196F3", text: "CHANGED:" }, N: { color: "#4CAF50", text: "ADDED:" }, D: { color: "#F44336", text: "DELETED:" }, A: { color: "#2196F3", text: "ARRAY:" } }, L = { level: "log", logger: console, logErrors: true, collapsed: void 0, predicate: void 0, duration: false, timestamp: true, stateTransformer: function(e2) {
      return e2;
    }, actionTransformer: function(e2) {
      return e2;
    }, errorTransformer: function(e2) {
      return e2;
    }, colors: { title: function() {
      return "inherit";
    }, prevState: function() {
      return "#9E9E9E";
    }, action: function() {
      return "#03A9F4";
    }, nextState: function() {
      return "#4CAF50";
    }, error: function() {
      return "#F20404";
    } }, diff: false, diffPredicate: void 0, transformer: void 0 }, T = function() {
      var e2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t3 = e2.dispatch, r2 = e2.getState;
      return typeof t3 == "function" || typeof r2 == "function" ? S()({ dispatch: t3, getState: r2 }) : void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n");
    };
    e.defaults = L, e.createLogger = S, e.logger = T, e.default = T, Object.defineProperty(e, "__esModule", { value: true });
  });
})(reduxLogger, reduxLogger.exports);
function createMiddleware(history2, appMiddleware) {
  const middleware = [];
  middleware.push(exceptionLogger, contextMiddleware);
  for (const mid of appMiddleware) {
    middleware.push(mid);
  }
  return middleware;
}
const createModelsReducer = (models = {}) => {
  const initialState2 = {
    models: __spreadValues({}, models)
  };
  return createSlice({
    initialState: initialState2,
    name: "models",
    reducers: {
      init: () => {
      }
    }
  }).reducer;
};
const showModelPanel = ({
  edit = false,
  model,
  id
}) => async (dispatch, getState) => {
};
const hideModelPanel = () => async (dispatch, getState) => {
};
const initialState$b = {
  aws: {}
};
const slice$e = createSlice({
  initialState: initialState$b,
  name: "config",
  reducers: {
    setConfig: (state, action) => {
      if (action.payload) {
        const { aws } = action.payload;
        state.aws = aws;
      }
    }
  }
});
const { setConfig } = slice$e.actions;
var config = slice$e.reducer;
const initialState$a = {
  detail: "",
  history: [],
  page: "/"
};
const slice$d = createSlice({
  initialState: initialState$a,
  name: "app",
  reducers: {
    goBack: (state) => {
      const item = state.history.pop();
      if (item) {
        state.page = item.page;
        state.detail = item.detail;
      }
    }
  }
});
var navigation = slice$d.reducer;
slice$d.actions;
const initialState$9 = {
  list: []
};
const slice$c = createSlice({
  initialState: initialState$9,
  name: "routes",
  reducers: {
    setRoutes: (state, action) => {
      state.list = action.payload;
    }
  }
});
const { setRoutes } = slice$c.actions;
var routes = slice$c.reducer;
var app = combineReducers$1({
  config,
  navigation,
  routes
});
let nanoid = (size = 21) => {
  let id = "";
  let bytes = crypto.getRandomValues(new Uint8Array(size));
  while (size--) {
    let byte = bytes[size] & 63;
    if (byte < 36) {
      id += byte.toString(36);
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase();
    } else if (byte < 63) {
      id += "_";
    } else {
      id += "-";
    }
  }
  return id;
};
const modalAdapter = createEntityAdapter({
  selectId: (modal) => modal.id.toString()
});
const slice$b = createSlice({
  initialState: modalAdapter.getInitialState(),
  name: "modals",
  reducers: {
    closeModal: (state, action) => {
      modalAdapter.removeOne(state, action.payload);
    },
    showModal: (state, action) => {
      const modal = action.payload;
      const id = nanoid(6);
      modalAdapter.addOne(state, __spreadProps(__spreadValues({}, modal), { id }));
    }
  }
});
var modals = slice$b.reducer;
const { closeModal, showModal } = slice$b.actions;
const notificationAdapter = createEntityAdapter({
  selectId: (notification) => notification.id.toString()
});
const slice$a = createSlice({
  initialState: notificationAdapter.getInitialState(),
  name: "notifications",
  reducers: {
    closeNotification: (state, action) => {
      notificationAdapter.removeOne(state, action.payload);
    },
    showNotification: (state, action) => {
      const notification = action.payload;
      notificationAdapter.addOne(state, __spreadProps(__spreadValues({}, notification), {
        id: notification.id
      }));
    }
  }
});
function addToastNotification({
  color,
  icon,
  message,
  timed,
  seconds
}) {
  return async (dispatch, getState) => {
    const id = nanoid(6);
    dispatch(slice$a.actions.showNotification({
      notification: {
        color,
        icon,
        id,
        message,
        seconds,
        timed
      }
    }));
    if (timed && seconds) {
      setTimeout(() => {
        dispatch(slice$a.actions.closeNotification(id));
      }, 3e3);
    }
  };
}
var notifications = slice$a.reducer;
const initialState$8 = {
  current: AppLabLightTheme.id,
  list: [AppLabLightTheme, AppLabDarkTheme]
};
const slice$9 = createSlice({
  initialState: initialState$8,
  name: "themes",
  reducers: {
    addThemes: (state, action) => {
      state.list = action.payload;
    },
    setTheme: (state, action) => {
      state.current = action.payload;
    }
  }
});
const { addThemes, setTheme } = slice$9.actions;
var themes = slice$9.reducer;
var ui = combineReducers$1({
  modals,
  notifications,
  themes
});
class LuxonError extends Error {
}
class InvalidDateTimeError extends LuxonError {
  constructor(reason) {
    super(`Invalid DateTime: ${reason.toMessage()}`);
  }
}
class InvalidIntervalError extends LuxonError {
  constructor(reason) {
    super(`Invalid Interval: ${reason.toMessage()}`);
  }
}
class InvalidDurationError extends LuxonError {
  constructor(reason) {
    super(`Invalid Duration: ${reason.toMessage()}`);
  }
}
class ConflictingSpecificationError extends LuxonError {
}
class InvalidUnitError extends LuxonError {
  constructor(unit) {
    super(`Invalid unit ${unit}`);
  }
}
class InvalidArgumentError extends LuxonError {
}
class ZoneIsAbstractError extends LuxonError {
  constructor() {
    super("Zone is an abstract class");
  }
}
const n = "numeric", s = "short", l = "long";
const DATE_SHORT = {
  year: n,
  month: n,
  day: n
};
const DATE_MED = {
  year: n,
  month: s,
  day: n
};
const DATE_MED_WITH_WEEKDAY = {
  year: n,
  month: s,
  day: n,
  weekday: s
};
const DATE_FULL = {
  year: n,
  month: l,
  day: n
};
const DATE_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l
};
const TIME_SIMPLE = {
  hour: n,
  minute: n
};
const TIME_WITH_SECONDS = {
  hour: n,
  minute: n,
  second: n
};
const TIME_WITH_SHORT_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  timeZoneName: s
};
const TIME_WITH_LONG_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  timeZoneName: l
};
const TIME_24_SIMPLE = {
  hour: n,
  minute: n,
  hourCycle: "h23"
};
const TIME_24_WITH_SECONDS = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23"
};
const TIME_24_WITH_SHORT_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23",
  timeZoneName: s
};
const TIME_24_WITH_LONG_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23",
  timeZoneName: l
};
const DATETIME_SHORT = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: n
};
const DATETIME_SHORT_WITH_SECONDS = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: n,
  second: n
};
const DATETIME_MED = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: n
};
const DATETIME_MED_WITH_SECONDS = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: n,
  second: n
};
const DATETIME_MED_WITH_WEEKDAY = {
  year: n,
  month: s,
  day: n,
  weekday: s,
  hour: n,
  minute: n
};
const DATETIME_FULL = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: n,
  timeZoneName: s
};
const DATETIME_FULL_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: n,
  second: n,
  timeZoneName: s
};
const DATETIME_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: n,
  timeZoneName: l
};
const DATETIME_HUGE_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: n,
  second: n,
  timeZoneName: l
};
function isUndefined(o2) {
  return typeof o2 === "undefined";
}
function isNumber(o2) {
  return typeof o2 === "number";
}
function isInteger(o2) {
  return typeof o2 === "number" && o2 % 1 === 0;
}
function isString(o2) {
  return typeof o2 === "string";
}
function isDate(o2) {
  return Object.prototype.toString.call(o2) === "[object Date]";
}
function hasRelative() {
  try {
    return typeof Intl !== "undefined" && !!Intl.RelativeTimeFormat;
  } catch (e) {
    return false;
  }
}
function maybeArray(thing) {
  return Array.isArray(thing) ? thing : [thing];
}
function bestBy(arr, by, compare) {
  if (arr.length === 0) {
    return void 0;
  }
  return arr.reduce((best, next) => {
    const pair = [by(next), next];
    if (!best) {
      return pair;
    } else if (compare(best[0], pair[0]) === best[0]) {
      return best;
    } else {
      return pair;
    }
  }, null)[1];
}
function pick(obj, keys) {
  return keys.reduce((a, k) => {
    a[k] = obj[k];
    return a;
  }, {});
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
function integerBetween(thing, bottom, top) {
  return isInteger(thing) && thing >= bottom && thing <= top;
}
function floorMod(x, n2) {
  return x - n2 * Math.floor(x / n2);
}
function padStart(input, n2 = 2) {
  const isNeg = input < 0;
  let padded;
  if (isNeg) {
    padded = "-" + ("" + -input).padStart(n2, "0");
  } else {
    padded = ("" + input).padStart(n2, "0");
  }
  return padded;
}
function parseInteger(string) {
  if (isUndefined(string) || string === null || string === "") {
    return void 0;
  } else {
    return parseInt(string, 10);
  }
}
function parseFloating(string) {
  if (isUndefined(string) || string === null || string === "") {
    return void 0;
  } else {
    return parseFloat(string);
  }
}
function parseMillis(fraction) {
  if (isUndefined(fraction) || fraction === null || fraction === "") {
    return void 0;
  } else {
    const f = parseFloat("0." + fraction) * 1e3;
    return Math.floor(f);
  }
}
function roundTo(number, digits, towardZero = false) {
  const factor = 10 ** digits, rounder = towardZero ? Math.trunc : Math.round;
  return rounder(number * factor) / factor;
}
function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}
function daysInMonth(year, month) {
  const modMonth = floorMod(month - 1, 12) + 1, modYear = year + (month - modMonth) / 12;
  if (modMonth === 2) {
    return isLeapYear(modYear) ? 29 : 28;
  } else {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
  }
}
function objToLocalTS(obj) {
  let d = Date.UTC(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute, obj.second, obj.millisecond);
  if (obj.year < 100 && obj.year >= 0) {
    d = new Date(d);
    d.setUTCFullYear(d.getUTCFullYear() - 1900);
  }
  return +d;
}
function weeksInWeekYear(weekYear) {
  const p1 = (weekYear + Math.floor(weekYear / 4) - Math.floor(weekYear / 100) + Math.floor(weekYear / 400)) % 7, last = weekYear - 1, p2 = (last + Math.floor(last / 4) - Math.floor(last / 100) + Math.floor(last / 400)) % 7;
  return p1 === 4 || p2 === 3 ? 53 : 52;
}
function untruncateYear(year) {
  if (year > 99) {
    return year;
  } else
    return year > 60 ? 1900 + year : 2e3 + year;
}
function parseZoneInfo(ts, offsetFormat, locale, timeZone = null) {
  const date = new Date(ts), intlOpts = {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  if (timeZone) {
    intlOpts.timeZone = timeZone;
  }
  const modified = __spreadValues({ timeZoneName: offsetFormat }, intlOpts);
  const parsed = new Intl.DateTimeFormat(locale, modified).formatToParts(date).find((m) => m.type.toLowerCase() === "timezonename");
  return parsed ? parsed.value : null;
}
function signedOffset(offHourStr, offMinuteStr) {
  let offHour = parseInt(offHourStr, 10);
  if (Number.isNaN(offHour)) {
    offHour = 0;
  }
  const offMin = parseInt(offMinuteStr, 10) || 0, offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
  return offHour * 60 + offMinSigned;
}
function asNumber(value) {
  const numericValue = Number(value);
  if (typeof value === "boolean" || value === "" || Number.isNaN(numericValue))
    throw new InvalidArgumentError(`Invalid unit value ${value}`);
  return numericValue;
}
function normalizeObject(obj, normalizer) {
  const normalized = {};
  for (const u in obj) {
    if (hasOwnProperty(obj, u)) {
      const v = obj[u];
      if (v === void 0 || v === null)
        continue;
      normalized[normalizer(u)] = asNumber(v);
    }
  }
  return normalized;
}
function formatOffset(offset2, format) {
  const hours = Math.trunc(Math.abs(offset2 / 60)), minutes = Math.trunc(Math.abs(offset2 % 60)), sign = offset2 >= 0 ? "+" : "-";
  switch (format) {
    case "short":
      return `${sign}${padStart(hours, 2)}:${padStart(minutes, 2)}`;
    case "narrow":
      return `${sign}${hours}${minutes > 0 ? `:${minutes}` : ""}`;
    case "techie":
      return `${sign}${padStart(hours, 2)}${padStart(minutes, 2)}`;
    default:
      throw new RangeError(`Value format ${format} is out of range for property format`);
  }
}
function timeObject(obj) {
  return pick(obj, ["hour", "minute", "second", "millisecond"]);
}
const ianaRegex = /[A-Za-z_+-]{1,256}(:?\/[A-Za-z0-9_+-]{1,256}(\/[A-Za-z0-9_+-]{1,256})?)?/;
const monthsLong = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
const monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function months(length) {
  switch (length) {
    case "narrow":
      return [...monthsNarrow];
    case "short":
      return [...monthsShort];
    case "long":
      return [...monthsLong];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    default:
      return null;
  }
}
const weekdaysLong = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
const weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];
function weekdays(length) {
  switch (length) {
    case "narrow":
      return [...weekdaysNarrow];
    case "short":
      return [...weekdaysShort];
    case "long":
      return [...weekdaysLong];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}
const meridiems = ["AM", "PM"];
const erasLong = ["Before Christ", "Anno Domini"];
const erasShort = ["BC", "AD"];
const erasNarrow = ["B", "A"];
function eras(length) {
  switch (length) {
    case "narrow":
      return [...erasNarrow];
    case "short":
      return [...erasShort];
    case "long":
      return [...erasLong];
    default:
      return null;
  }
}
function meridiemForDateTime(dt) {
  return meridiems[dt.hour < 12 ? 0 : 1];
}
function weekdayForDateTime(dt, length) {
  return weekdays(length)[dt.weekday - 1];
}
function monthForDateTime(dt, length) {
  return months(length)[dt.month - 1];
}
function eraForDateTime(dt, length) {
  return eras(length)[dt.year < 0 ? 0 : 1];
}
function formatRelativeTime(unit, count, numeric = "always", narrow = false) {
  const units = {
    years: ["year", "yr."],
    quarters: ["quarter", "qtr."],
    months: ["month", "mo."],
    weeks: ["week", "wk."],
    days: ["day", "day", "days"],
    hours: ["hour", "hr."],
    minutes: ["minute", "min."],
    seconds: ["second", "sec."]
  };
  const lastable = ["hours", "minutes", "seconds"].indexOf(unit) === -1;
  if (numeric === "auto" && lastable) {
    const isDay = unit === "days";
    switch (count) {
      case 1:
        return isDay ? "tomorrow" : `next ${units[unit][0]}`;
      case -1:
        return isDay ? "yesterday" : `last ${units[unit][0]}`;
      case 0:
        return isDay ? "today" : `this ${units[unit][0]}`;
    }
  }
  const isInPast = Object.is(count, -0) || count < 0, fmtValue = Math.abs(count), singular = fmtValue === 1, lilUnits = units[unit], fmtUnit = narrow ? singular ? lilUnits[1] : lilUnits[2] || lilUnits[1] : singular ? units[unit][0] : unit;
  return isInPast ? `${fmtValue} ${fmtUnit} ago` : `in ${fmtValue} ${fmtUnit}`;
}
function stringifyTokens(splits, tokenToString) {
  let s2 = "";
  for (const token of splits) {
    if (token.literal) {
      s2 += token.val;
    } else {
      s2 += tokenToString(token.val);
    }
  }
  return s2;
}
const macroTokenToFormatOpts = {
  D: DATE_SHORT,
  DD: DATE_MED,
  DDD: DATE_FULL,
  DDDD: DATE_HUGE,
  t: TIME_SIMPLE,
  tt: TIME_WITH_SECONDS,
  ttt: TIME_WITH_SHORT_OFFSET,
  tttt: TIME_WITH_LONG_OFFSET,
  T: TIME_24_SIMPLE,
  TT: TIME_24_WITH_SECONDS,
  TTT: TIME_24_WITH_SHORT_OFFSET,
  TTTT: TIME_24_WITH_LONG_OFFSET,
  f: DATETIME_SHORT,
  ff: DATETIME_MED,
  fff: DATETIME_FULL,
  ffff: DATETIME_HUGE,
  F: DATETIME_SHORT_WITH_SECONDS,
  FF: DATETIME_MED_WITH_SECONDS,
  FFF: DATETIME_FULL_WITH_SECONDS,
  FFFF: DATETIME_HUGE_WITH_SECONDS
};
class Formatter {
  static create(locale, opts = {}) {
    return new Formatter(locale, opts);
  }
  static parseFormat(fmt) {
    let current = null, currentFull = "", bracketed = false;
    const splits = [];
    for (let i = 0; i < fmt.length; i++) {
      const c = fmt.charAt(i);
      if (c === "'") {
        if (currentFull.length > 0) {
          splits.push({ literal: bracketed, val: currentFull });
        }
        current = null;
        currentFull = "";
        bracketed = !bracketed;
      } else if (bracketed) {
        currentFull += c;
      } else if (c === current) {
        currentFull += c;
      } else {
        if (currentFull.length > 0) {
          splits.push({ literal: false, val: currentFull });
        }
        currentFull = c;
        current = c;
      }
    }
    if (currentFull.length > 0) {
      splits.push({ literal: bracketed, val: currentFull });
    }
    return splits;
  }
  static macroTokenToFormatOpts(token) {
    return macroTokenToFormatOpts[token];
  }
  constructor(locale, formatOpts) {
    this.opts = formatOpts;
    this.loc = locale;
    this.systemLoc = null;
  }
  formatWithSystemDefault(dt, opts) {
    if (this.systemLoc === null) {
      this.systemLoc = this.loc.redefaultToSystem();
    }
    const df = this.systemLoc.dtFormatter(dt, __spreadValues(__spreadValues({}, this.opts), opts));
    return df.format();
  }
  formatDateTime(dt, opts = {}) {
    const df = this.loc.dtFormatter(dt, __spreadValues(__spreadValues({}, this.opts), opts));
    return df.format();
  }
  formatDateTimeParts(dt, opts = {}) {
    const df = this.loc.dtFormatter(dt, __spreadValues(__spreadValues({}, this.opts), opts));
    return df.formatToParts();
  }
  resolvedOptions(dt, opts = {}) {
    const df = this.loc.dtFormatter(dt, __spreadValues(__spreadValues({}, this.opts), opts));
    return df.resolvedOptions();
  }
  num(n2, p = 0) {
    if (this.opts.forceSimple) {
      return padStart(n2, p);
    }
    const opts = __spreadValues({}, this.opts);
    if (p > 0) {
      opts.padTo = p;
    }
    return this.loc.numberFormatter(opts).format(n2);
  }
  formatDateTimeFromString(dt, fmt) {
    const knownEnglish = this.loc.listingMode() === "en", useDateTimeFormatter = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", string = (opts, extract) => this.loc.extract(dt, opts, extract), formatOffset2 = (opts) => {
      if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
        return "Z";
      }
      return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
    }, meridiem = () => knownEnglish ? meridiemForDateTime(dt) : string({ hour: "numeric", hourCycle: "h12" }, "dayperiod"), month = (length, standalone) => knownEnglish ? monthForDateTime(dt, length) : string(standalone ? { month: length } : { month: length, day: "numeric" }, "month"), weekday = (length, standalone) => knownEnglish ? weekdayForDateTime(dt, length) : string(standalone ? { weekday: length } : { weekday: length, month: "long", day: "numeric" }, "weekday"), maybeMacro = (token) => {
      const formatOpts = Formatter.macroTokenToFormatOpts(token);
      if (formatOpts) {
        return this.formatWithSystemDefault(dt, formatOpts);
      } else {
        return token;
      }
    }, era = (length) => knownEnglish ? eraForDateTime(dt, length) : string({ era: length }, "era"), tokenToString = (token) => {
      switch (token) {
        case "S":
          return this.num(dt.millisecond);
        case "u":
        case "SSS":
          return this.num(dt.millisecond, 3);
        case "s":
          return this.num(dt.second);
        case "ss":
          return this.num(dt.second, 2);
        case "uu":
          return this.num(Math.floor(dt.millisecond / 10), 2);
        case "uuu":
          return this.num(Math.floor(dt.millisecond / 100));
        case "m":
          return this.num(dt.minute);
        case "mm":
          return this.num(dt.minute, 2);
        case "h":
          return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
        case "hh":
          return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
        case "H":
          return this.num(dt.hour);
        case "HH":
          return this.num(dt.hour, 2);
        case "Z":
          return formatOffset2({ format: "narrow", allowZ: this.opts.allowZ });
        case "ZZ":
          return formatOffset2({ format: "short", allowZ: this.opts.allowZ });
        case "ZZZ":
          return formatOffset2({ format: "techie", allowZ: this.opts.allowZ });
        case "ZZZZ":
          return dt.zone.offsetName(dt.ts, { format: "short", locale: this.loc.locale });
        case "ZZZZZ":
          return dt.zone.offsetName(dt.ts, { format: "long", locale: this.loc.locale });
        case "z":
          return dt.zoneName;
        case "a":
          return meridiem();
        case "d":
          return useDateTimeFormatter ? string({ day: "numeric" }, "day") : this.num(dt.day);
        case "dd":
          return useDateTimeFormatter ? string({ day: "2-digit" }, "day") : this.num(dt.day, 2);
        case "c":
          return this.num(dt.weekday);
        case "ccc":
          return weekday("short", true);
        case "cccc":
          return weekday("long", true);
        case "ccccc":
          return weekday("narrow", true);
        case "E":
          return this.num(dt.weekday);
        case "EEE":
          return weekday("short", false);
        case "EEEE":
          return weekday("long", false);
        case "EEEEE":
          return weekday("narrow", false);
        case "L":
          return useDateTimeFormatter ? string({ month: "numeric", day: "numeric" }, "month") : this.num(dt.month);
        case "LL":
          return useDateTimeFormatter ? string({ month: "2-digit", day: "numeric" }, "month") : this.num(dt.month, 2);
        case "LLL":
          return month("short", true);
        case "LLLL":
          return month("long", true);
        case "LLLLL":
          return month("narrow", true);
        case "M":
          return useDateTimeFormatter ? string({ month: "numeric" }, "month") : this.num(dt.month);
        case "MM":
          return useDateTimeFormatter ? string({ month: "2-digit" }, "month") : this.num(dt.month, 2);
        case "MMM":
          return month("short", false);
        case "MMMM":
          return month("long", false);
        case "MMMMM":
          return month("narrow", false);
        case "y":
          return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year);
        case "yy":
          return useDateTimeFormatter ? string({ year: "2-digit" }, "year") : this.num(dt.year.toString().slice(-2), 2);
        case "yyyy":
          return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year, 4);
        case "yyyyyy":
          return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year, 6);
        case "G":
          return era("short");
        case "GG":
          return era("long");
        case "GGGGG":
          return era("narrow");
        case "kk":
          return this.num(dt.weekYear.toString().slice(-2), 2);
        case "kkkk":
          return this.num(dt.weekYear, 4);
        case "W":
          return this.num(dt.weekNumber);
        case "WW":
          return this.num(dt.weekNumber, 2);
        case "o":
          return this.num(dt.ordinal);
        case "ooo":
          return this.num(dt.ordinal, 3);
        case "q":
          return this.num(dt.quarter);
        case "qq":
          return this.num(dt.quarter, 2);
        case "X":
          return this.num(Math.floor(dt.ts / 1e3));
        case "x":
          return this.num(dt.ts);
        default:
          return maybeMacro(token);
      }
    };
    return stringifyTokens(Formatter.parseFormat(fmt), tokenToString);
  }
  formatDurationFromString(dur, fmt) {
    const tokenToField = (token) => {
      switch (token[0]) {
        case "S":
          return "millisecond";
        case "s":
          return "second";
        case "m":
          return "minute";
        case "h":
          return "hour";
        case "d":
          return "day";
        case "M":
          return "month";
        case "y":
          return "year";
        default:
          return null;
      }
    }, tokenToString = (lildur) => (token) => {
      const mapped = tokenToField(token);
      if (mapped) {
        return this.num(lildur.get(mapped), token.length);
      } else {
        return token;
      }
    }, tokens = Formatter.parseFormat(fmt), realTokens = tokens.reduce((found, { literal, val }) => literal ? found : found.concat(val), []), collapsed = dur.shiftTo(...realTokens.map(tokenToField).filter((t2) => t2));
    return stringifyTokens(tokens, tokenToString(collapsed));
  }
}
class Invalid {
  constructor(reason, explanation) {
    this.reason = reason;
    this.explanation = explanation;
  }
  toMessage() {
    if (this.explanation) {
      return `${this.reason}: ${this.explanation}`;
    } else {
      return this.reason;
    }
  }
}
class Zone {
  get type() {
    throw new ZoneIsAbstractError();
  }
  get name() {
    throw new ZoneIsAbstractError();
  }
  get isUniversal() {
    throw new ZoneIsAbstractError();
  }
  offsetName(ts, opts) {
    throw new ZoneIsAbstractError();
  }
  formatOffset(ts, format) {
    throw new ZoneIsAbstractError();
  }
  offset(ts) {
    throw new ZoneIsAbstractError();
  }
  equals(otherZone) {
    throw new ZoneIsAbstractError();
  }
  get isValid() {
    throw new ZoneIsAbstractError();
  }
}
let singleton$1 = null;
class SystemZone extends Zone {
  static get instance() {
    if (singleton$1 === null) {
      singleton$1 = new SystemZone();
    }
    return singleton$1;
  }
  get type() {
    return "system";
  }
  get name() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  get isUniversal() {
    return false;
  }
  offsetName(ts, { format, locale }) {
    return parseZoneInfo(ts, format, locale);
  }
  formatOffset(ts, format) {
    return formatOffset(this.offset(ts), format);
  }
  offset(ts) {
    return -new Date(ts).getTimezoneOffset();
  }
  equals(otherZone) {
    return otherZone.type === "system";
  }
  get isValid() {
    return true;
  }
}
let dtfCache = {};
function makeDTF(zone) {
  if (!dtfCache[zone]) {
    dtfCache[zone] = new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: zone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  return dtfCache[zone];
}
const typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function hackyOffset(dtf, date) {
  const formatted = dtf.format(date).replace(/\u200E/g, ""), parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted), [, fMonth, fDay, fYear, fHour, fMinute, fSecond] = parsed;
  return [fYear, fMonth, fDay, fHour, fMinute, fSecond];
}
function partsOffset(dtf, date) {
  const formatted = dtf.formatToParts(date), filled = [];
  for (let i = 0; i < formatted.length; i++) {
    const { type, value } = formatted[i], pos = typeToPos[type];
    if (!isUndefined(pos)) {
      filled[pos] = parseInt(value, 10);
    }
  }
  return filled;
}
let ianaZoneCache = {};
class IANAZone extends Zone {
  static create(name) {
    if (!ianaZoneCache[name]) {
      ianaZoneCache[name] = new IANAZone(name);
    }
    return ianaZoneCache[name];
  }
  static resetCache() {
    ianaZoneCache = {};
    dtfCache = {};
  }
  static isValidSpecifier(s2) {
    return this.isValidZone(s2);
  }
  static isValidZone(zone) {
    if (!zone) {
      return false;
    }
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: zone }).format();
      return true;
    } catch (e) {
      return false;
    }
  }
  constructor(name) {
    super();
    this.zoneName = name;
    this.valid = IANAZone.isValidZone(name);
  }
  get type() {
    return "iana";
  }
  get name() {
    return this.zoneName;
  }
  get isUniversal() {
    return false;
  }
  offsetName(ts, { format, locale }) {
    return parseZoneInfo(ts, format, locale, this.name);
  }
  formatOffset(ts, format) {
    return formatOffset(this.offset(ts), format);
  }
  offset(ts) {
    const date = new Date(ts);
    if (isNaN(date))
      return NaN;
    const dtf = makeDTF(this.name), [year, month, day, hour, minute, second] = dtf.formatToParts ? partsOffset(dtf, date) : hackyOffset(dtf, date);
    const adjustedHour = hour === 24 ? 0 : hour;
    const asUTC = objToLocalTS({
      year,
      month,
      day,
      hour: adjustedHour,
      minute,
      second,
      millisecond: 0
    });
    let asTS = +date;
    const over = asTS % 1e3;
    asTS -= over >= 0 ? over : 1e3 + over;
    return (asUTC - asTS) / (60 * 1e3);
  }
  equals(otherZone) {
    return otherZone.type === "iana" && otherZone.name === this.name;
  }
  get isValid() {
    return this.valid;
  }
}
let singleton = null;
class FixedOffsetZone extends Zone {
  static get utcInstance() {
    if (singleton === null) {
      singleton = new FixedOffsetZone(0);
    }
    return singleton;
  }
  static instance(offset2) {
    return offset2 === 0 ? FixedOffsetZone.utcInstance : new FixedOffsetZone(offset2);
  }
  static parseSpecifier(s2) {
    if (s2) {
      const r = s2.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (r) {
        return new FixedOffsetZone(signedOffset(r[1], r[2]));
      }
    }
    return null;
  }
  constructor(offset2) {
    super();
    this.fixed = offset2;
  }
  get type() {
    return "fixed";
  }
  get name() {
    return this.fixed === 0 ? "UTC" : `UTC${formatOffset(this.fixed, "narrow")}`;
  }
  offsetName() {
    return this.name;
  }
  formatOffset(ts, format) {
    return formatOffset(this.fixed, format);
  }
  get isUniversal() {
    return true;
  }
  offset() {
    return this.fixed;
  }
  equals(otherZone) {
    return otherZone.type === "fixed" && otherZone.fixed === this.fixed;
  }
  get isValid() {
    return true;
  }
}
class InvalidZone extends Zone {
  constructor(zoneName) {
    super();
    this.zoneName = zoneName;
  }
  get type() {
    return "invalid";
  }
  get name() {
    return this.zoneName;
  }
  get isUniversal() {
    return false;
  }
  offsetName() {
    return null;
  }
  formatOffset() {
    return "";
  }
  offset() {
    return NaN;
  }
  equals() {
    return false;
  }
  get isValid() {
    return false;
  }
}
function normalizeZone(input, defaultZone2) {
  if (isUndefined(input) || input === null) {
    return defaultZone2;
  } else if (input instanceof Zone) {
    return input;
  } else if (isString(input)) {
    const lowered = input.toLowerCase();
    if (lowered === "local" || lowered === "system")
      return defaultZone2;
    else if (lowered === "utc" || lowered === "gmt")
      return FixedOffsetZone.utcInstance;
    else
      return FixedOffsetZone.parseSpecifier(lowered) || IANAZone.create(input);
  } else if (isNumber(input)) {
    return FixedOffsetZone.instance(input);
  } else if (typeof input === "object" && input.offset && typeof input.offset === "number") {
    return input;
  } else {
    return new InvalidZone(input);
  }
}
let now = () => Date.now(), defaultZone = "system", defaultLocale = null, defaultNumberingSystem = null, defaultOutputCalendar = null, throwOnInvalid;
class Settings {
  static get now() {
    return now;
  }
  static set now(n2) {
    now = n2;
  }
  static set defaultZone(zone) {
    defaultZone = zone;
  }
  static get defaultZone() {
    return normalizeZone(defaultZone, SystemZone.instance);
  }
  static get defaultLocale() {
    return defaultLocale;
  }
  static set defaultLocale(locale) {
    defaultLocale = locale;
  }
  static get defaultNumberingSystem() {
    return defaultNumberingSystem;
  }
  static set defaultNumberingSystem(numberingSystem) {
    defaultNumberingSystem = numberingSystem;
  }
  static get defaultOutputCalendar() {
    return defaultOutputCalendar;
  }
  static set defaultOutputCalendar(outputCalendar) {
    defaultOutputCalendar = outputCalendar;
  }
  static get throwOnInvalid() {
    return throwOnInvalid;
  }
  static set throwOnInvalid(t2) {
    throwOnInvalid = t2;
  }
  static resetCaches() {
    Locale.resetCache();
    IANAZone.resetCache();
  }
}
let intlLFCache = {};
function getCachedLF(locString, opts = {}) {
  const key = JSON.stringify([locString, opts]);
  let dtf = intlLFCache[key];
  if (!dtf) {
    dtf = new Intl.ListFormat(locString, opts);
    intlLFCache[key] = dtf;
  }
  return dtf;
}
let intlDTCache = {};
function getCachedDTF(locString, opts = {}) {
  const key = JSON.stringify([locString, opts]);
  let dtf = intlDTCache[key];
  if (!dtf) {
    dtf = new Intl.DateTimeFormat(locString, opts);
    intlDTCache[key] = dtf;
  }
  return dtf;
}
let intlNumCache = {};
function getCachedINF(locString, opts = {}) {
  const key = JSON.stringify([locString, opts]);
  let inf = intlNumCache[key];
  if (!inf) {
    inf = new Intl.NumberFormat(locString, opts);
    intlNumCache[key] = inf;
  }
  return inf;
}
let intlRelCache = {};
function getCachedRTF(locString, opts = {}) {
  const _a = opts, { base } = _a, cacheKeyOpts = __objRest(_a, ["base"]);
  const key = JSON.stringify([locString, cacheKeyOpts]);
  let inf = intlRelCache[key];
  if (!inf) {
    inf = new Intl.RelativeTimeFormat(locString, opts);
    intlRelCache[key] = inf;
  }
  return inf;
}
let sysLocaleCache = null;
function systemLocale() {
  if (sysLocaleCache) {
    return sysLocaleCache;
  } else {
    sysLocaleCache = new Intl.DateTimeFormat().resolvedOptions().locale;
    return sysLocaleCache;
  }
}
function parseLocaleString(localeStr) {
  const uIndex = localeStr.indexOf("-u-");
  if (uIndex === -1) {
    return [localeStr];
  } else {
    let options;
    const smaller = localeStr.substring(0, uIndex);
    try {
      options = getCachedDTF(localeStr).resolvedOptions();
    } catch (e) {
      options = getCachedDTF(smaller).resolvedOptions();
    }
    const { numberingSystem, calendar } = options;
    return [smaller, numberingSystem, calendar];
  }
}
function intlConfigString(localeStr, numberingSystem, outputCalendar) {
  if (outputCalendar || numberingSystem) {
    localeStr += "-u";
    if (outputCalendar) {
      localeStr += `-ca-${outputCalendar}`;
    }
    if (numberingSystem) {
      localeStr += `-nu-${numberingSystem}`;
    }
    return localeStr;
  } else {
    return localeStr;
  }
}
function mapMonths(f) {
  const ms = [];
  for (let i = 1; i <= 12; i++) {
    const dt = DateTime.utc(2016, i, 1);
    ms.push(f(dt));
  }
  return ms;
}
function mapWeekdays(f) {
  const ms = [];
  for (let i = 1; i <= 7; i++) {
    const dt = DateTime.utc(2016, 11, 13 + i);
    ms.push(f(dt));
  }
  return ms;
}
function listStuff(loc, length, defaultOK, englishFn, intlFn) {
  const mode = loc.listingMode(defaultOK);
  if (mode === "error") {
    return null;
  } else if (mode === "en") {
    return englishFn(length);
  } else {
    return intlFn(length);
  }
}
function supportsFastNumbers(loc) {
  if (loc.numberingSystem && loc.numberingSystem !== "latn") {
    return false;
  } else {
    return loc.numberingSystem === "latn" || !loc.locale || loc.locale.startsWith("en") || new Intl.DateTimeFormat(loc.intl).resolvedOptions().numberingSystem === "latn";
  }
}
class PolyNumberFormatter {
  constructor(intl, forceSimple, opts) {
    this.padTo = opts.padTo || 0;
    this.floor = opts.floor || false;
    const _a = opts, { padTo, floor } = _a, otherOpts = __objRest(_a, ["padTo", "floor"]);
    if (!forceSimple || Object.keys(otherOpts).length > 0) {
      const intlOpts = __spreadValues({ useGrouping: false }, opts);
      if (opts.padTo > 0)
        intlOpts.minimumIntegerDigits = opts.padTo;
      this.inf = getCachedINF(intl, intlOpts);
    }
  }
  format(i) {
    if (this.inf) {
      const fixed = this.floor ? Math.floor(i) : i;
      return this.inf.format(fixed);
    } else {
      const fixed = this.floor ? Math.floor(i) : roundTo(i, 3);
      return padStart(fixed, this.padTo);
    }
  }
}
class PolyDateFormatter {
  constructor(dt, intl, opts) {
    this.opts = opts;
    let z;
    if (dt.zone.isUniversal) {
      const gmtOffset = -1 * (dt.offset / 60);
      const offsetZ = gmtOffset >= 0 ? `Etc/GMT+${gmtOffset}` : `Etc/GMT${gmtOffset}`;
      if (dt.offset !== 0 && IANAZone.create(offsetZ).valid) {
        z = offsetZ;
        this.dt = dt;
      } else {
        z = "UTC";
        if (opts.timeZoneName) {
          this.dt = dt;
        } else {
          this.dt = dt.offset === 0 ? dt : DateTime.fromMillis(dt.ts + dt.offset * 60 * 1e3);
        }
      }
    } else if (dt.zone.type === "system") {
      this.dt = dt;
    } else {
      this.dt = dt;
      z = dt.zone.name;
    }
    const intlOpts = __spreadValues({}, this.opts);
    if (z) {
      intlOpts.timeZone = z;
    }
    this.dtf = getCachedDTF(intl, intlOpts);
  }
  format() {
    return this.dtf.format(this.dt.toJSDate());
  }
  formatToParts() {
    return this.dtf.formatToParts(this.dt.toJSDate());
  }
  resolvedOptions() {
    return this.dtf.resolvedOptions();
  }
}
class PolyRelFormatter {
  constructor(intl, isEnglish, opts) {
    this.opts = __spreadValues({ style: "long" }, opts);
    if (!isEnglish && hasRelative()) {
      this.rtf = getCachedRTF(intl, opts);
    }
  }
  format(count, unit) {
    if (this.rtf) {
      return this.rtf.format(count, unit);
    } else {
      return formatRelativeTime(unit, count, this.opts.numeric, this.opts.style !== "long");
    }
  }
  formatToParts(count, unit) {
    if (this.rtf) {
      return this.rtf.formatToParts(count, unit);
    } else {
      return [];
    }
  }
}
class Locale {
  static fromOpts(opts) {
    return Locale.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.defaultToEN);
  }
  static create(locale, numberingSystem, outputCalendar, defaultToEN = false) {
    const specifiedLocale = locale || Settings.defaultLocale;
    const localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale());
    const numberingSystemR = numberingSystem || Settings.defaultNumberingSystem;
    const outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
    return new Locale(localeR, numberingSystemR, outputCalendarR, specifiedLocale);
  }
  static resetCache() {
    sysLocaleCache = null;
    intlDTCache = {};
    intlNumCache = {};
    intlRelCache = {};
  }
  static fromObject({ locale, numberingSystem, outputCalendar } = {}) {
    return Locale.create(locale, numberingSystem, outputCalendar);
  }
  constructor(locale, numbering, outputCalendar, specifiedLocale) {
    const [parsedLocale, parsedNumberingSystem, parsedOutputCalendar] = parseLocaleString(locale);
    this.locale = parsedLocale;
    this.numberingSystem = numbering || parsedNumberingSystem || null;
    this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
    this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);
    this.weekdaysCache = { format: {}, standalone: {} };
    this.monthsCache = { format: {}, standalone: {} };
    this.meridiemCache = null;
    this.eraCache = {};
    this.specifiedLocale = specifiedLocale;
    this.fastNumbersCached = null;
  }
  get fastNumbers() {
    if (this.fastNumbersCached == null) {
      this.fastNumbersCached = supportsFastNumbers(this);
    }
    return this.fastNumbersCached;
  }
  listingMode() {
    const isActuallyEn = this.isEnglish();
    const hasNoWeirdness = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
    return isActuallyEn && hasNoWeirdness ? "en" : "intl";
  }
  clone(alts) {
    if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
      return this;
    } else {
      return Locale.create(alts.locale || this.specifiedLocale, alts.numberingSystem || this.numberingSystem, alts.outputCalendar || this.outputCalendar, alts.defaultToEN || false);
    }
  }
  redefaultToEN(alts = {}) {
    return this.clone(__spreadProps(__spreadValues({}, alts), { defaultToEN: true }));
  }
  redefaultToSystem(alts = {}) {
    return this.clone(__spreadProps(__spreadValues({}, alts), { defaultToEN: false }));
  }
  months(length, format = false, defaultOK = true) {
    return listStuff(this, length, defaultOK, months, () => {
      const intl = format ? { month: length, day: "numeric" } : { month: length }, formatStr = format ? "format" : "standalone";
      if (!this.monthsCache[formatStr][length]) {
        this.monthsCache[formatStr][length] = mapMonths((dt) => this.extract(dt, intl, "month"));
      }
      return this.monthsCache[formatStr][length];
    });
  }
  weekdays(length, format = false, defaultOK = true) {
    return listStuff(this, length, defaultOK, weekdays, () => {
      const intl = format ? { weekday: length, year: "numeric", month: "long", day: "numeric" } : { weekday: length }, formatStr = format ? "format" : "standalone";
      if (!this.weekdaysCache[formatStr][length]) {
        this.weekdaysCache[formatStr][length] = mapWeekdays((dt) => this.extract(dt, intl, "weekday"));
      }
      return this.weekdaysCache[formatStr][length];
    });
  }
  meridiems(defaultOK = true) {
    return listStuff(this, void 0, defaultOK, () => meridiems, () => {
      if (!this.meridiemCache) {
        const intl = { hour: "numeric", hourCycle: "h12" };
        this.meridiemCache = [DateTime.utc(2016, 11, 13, 9), DateTime.utc(2016, 11, 13, 19)].map((dt) => this.extract(dt, intl, "dayperiod"));
      }
      return this.meridiemCache;
    });
  }
  eras(length, defaultOK = true) {
    return listStuff(this, length, defaultOK, eras, () => {
      const intl = { era: length };
      if (!this.eraCache[length]) {
        this.eraCache[length] = [DateTime.utc(-40, 1, 1), DateTime.utc(2017, 1, 1)].map((dt) => this.extract(dt, intl, "era"));
      }
      return this.eraCache[length];
    });
  }
  extract(dt, intlOpts, field) {
    const df = this.dtFormatter(dt, intlOpts), results = df.formatToParts(), matching = results.find((m) => m.type.toLowerCase() === field);
    return matching ? matching.value : null;
  }
  numberFormatter(opts = {}) {
    return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
  }
  dtFormatter(dt, intlOpts = {}) {
    return new PolyDateFormatter(dt, this.intl, intlOpts);
  }
  relFormatter(opts = {}) {
    return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
  }
  listFormatter(opts = {}) {
    return getCachedLF(this.intl, opts);
  }
  isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us");
  }
  equals(other) {
    return this.locale === other.locale && this.numberingSystem === other.numberingSystem && this.outputCalendar === other.outputCalendar;
  }
}
function combineRegexes(...regexes) {
  const full = regexes.reduce((f, r) => f + r.source, "");
  return RegExp(`^${full}$`);
}
function combineExtractors(...extractors) {
  return (m) => extractors.reduce(([mergedVals, mergedZone, cursor], ex) => {
    const [val, zone, next] = ex(m, cursor);
    return [__spreadValues(__spreadValues({}, mergedVals), val), mergedZone || zone, next];
  }, [{}, null, 1]).slice(0, 2);
}
function parse(s2, ...patterns) {
  if (s2 == null) {
    return [null, null];
  }
  for (const [regex, extractor] of patterns) {
    const m = regex.exec(s2);
    if (m) {
      return extractor(m);
    }
  }
  return [null, null];
}
function simpleParse(...keys) {
  return (match2, cursor) => {
    const ret = {};
    let i;
    for (i = 0; i < keys.length; i++) {
      ret[keys[i]] = parseInteger(match2[cursor + i]);
    }
    return [ret, null, cursor + i];
  };
}
const offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/, isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, isoTimeRegex = RegExp(`${isoTimeBaseRegex.source}${offsetRegex.source}?`), isoTimeExtensionRegex = RegExp(`(?:T${isoTimeRegex.source})?`), isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/, isoOrdinalRegex = /(\d{4})-?(\d{3})/, extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekDay"), extractISOOrdinalData = simpleParse("year", "ordinal"), sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/, sqlTimeRegex = RegExp(`${isoTimeBaseRegex.source} ?(?:${offsetRegex.source}|(${ianaRegex.source}))?`), sqlTimeExtensionRegex = RegExp(`(?: ${sqlTimeRegex.source})?`);
function int(match2, pos, fallback) {
  const m = match2[pos];
  return isUndefined(m) ? fallback : parseInteger(m);
}
function extractISOYmd(match2, cursor) {
  const item = {
    year: int(match2, cursor),
    month: int(match2, cursor + 1, 1),
    day: int(match2, cursor + 2, 1)
  };
  return [item, null, cursor + 3];
}
function extractISOTime(match2, cursor) {
  const item = {
    hours: int(match2, cursor, 0),
    minutes: int(match2, cursor + 1, 0),
    seconds: int(match2, cursor + 2, 0),
    milliseconds: parseMillis(match2[cursor + 3])
  };
  return [item, null, cursor + 4];
}
function extractISOOffset(match2, cursor) {
  const local = !match2[cursor] && !match2[cursor + 1], fullOffset = signedOffset(match2[cursor + 1], match2[cursor + 2]), zone = local ? null : FixedOffsetZone.instance(fullOffset);
  return [{}, zone, cursor + 3];
}
function extractIANAZone(match2, cursor) {
  const zone = match2[cursor] ? IANAZone.create(match2[cursor]) : null;
  return [{}, zone, cursor + 1];
}
const isoTimeOnly = RegExp(`^T?${isoTimeBaseRegex.source}$`);
const isoDuration = /^-?P(?:(?:(-?\d{1,9}(?:\.\d{1,9})?)Y)?(?:(-?\d{1,9}(?:\.\d{1,9})?)M)?(?:(-?\d{1,9}(?:\.\d{1,9})?)W)?(?:(-?\d{1,9}(?:\.\d{1,9})?)D)?(?:T(?:(-?\d{1,9}(?:\.\d{1,9})?)H)?(?:(-?\d{1,9}(?:\.\d{1,9})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,9}))?S)?)?)$/;
function extractISODuration(match2) {
  const [s2, yearStr, monthStr, weekStr, dayStr, hourStr, minuteStr, secondStr, millisecondsStr] = match2;
  const hasNegativePrefix = s2[0] === "-";
  const negativeSeconds = secondStr && secondStr[0] === "-";
  const maybeNegate = (num, force = false) => num !== void 0 && (force || num && hasNegativePrefix) ? -num : num;
  return [
    {
      years: maybeNegate(parseFloating(yearStr)),
      months: maybeNegate(parseFloating(monthStr)),
      weeks: maybeNegate(parseFloating(weekStr)),
      days: maybeNegate(parseFloating(dayStr)),
      hours: maybeNegate(parseFloating(hourStr)),
      minutes: maybeNegate(parseFloating(minuteStr)),
      seconds: maybeNegate(parseFloating(secondStr), secondStr === "-0"),
      milliseconds: maybeNegate(parseMillis(millisecondsStr), negativeSeconds)
    }
  ];
}
const obsOffsets = {
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  const result = {
    year: yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr),
    month: monthsShort.indexOf(monthStr) + 1,
    day: parseInteger(dayStr),
    hour: parseInteger(hourStr),
    minute: parseInteger(minuteStr)
  };
  if (secondStr)
    result.second = parseInteger(secondStr);
  if (weekdayStr) {
    result.weekday = weekdayStr.length > 3 ? weekdaysLong.indexOf(weekdayStr) + 1 : weekdaysShort.indexOf(weekdayStr) + 1;
  }
  return result;
}
const rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function extractRFC2822(match2) {
  const [
    ,
    weekdayStr,
    dayStr,
    monthStr,
    yearStr,
    hourStr,
    minuteStr,
    secondStr,
    obsOffset,
    milOffset,
    offHourStr,
    offMinuteStr
  ] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  let offset2;
  if (obsOffset) {
    offset2 = obsOffsets[obsOffset];
  } else if (milOffset) {
    offset2 = 0;
  } else {
    offset2 = signedOffset(offHourStr, offMinuteStr);
  }
  return [result, new FixedOffsetZone(offset2)];
}
function preprocessRFC2822(s2) {
  return s2.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
const rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, rfc850 = /^(Monday|Tuesday|Wedsday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function extractRFC1123Or850(match2) {
  const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, FixedOffsetZone.utcInstance];
}
function extractASCII(match2) {
  const [, weekdayStr, monthStr, dayStr, hourStr, minuteStr, secondStr, yearStr] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, FixedOffsetZone.utcInstance];
}
const isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
const isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
const isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
const isoTimeCombinedRegex = combineRegexes(isoTimeRegex);
const extractISOYmdTimeAndOffset = combineExtractors(extractISOYmd, extractISOTime, extractISOOffset);
const extractISOWeekTimeAndOffset = combineExtractors(extractISOWeekData, extractISOTime, extractISOOffset);
const extractISOOrdinalDateAndTime = combineExtractors(extractISOOrdinalData, extractISOTime, extractISOOffset);
const extractISOTimeAndOffset = combineExtractors(extractISOTime, extractISOOffset);
function parseISODate(s2) {
  return parse(s2, [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset], [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDateAndTime], [isoTimeCombinedRegex, extractISOTimeAndOffset]);
}
function parseRFC2822Date(s2) {
  return parse(preprocessRFC2822(s2), [rfc2822, extractRFC2822]);
}
function parseHTTPDate(s2) {
  return parse(s2, [rfc1123, extractRFC1123Or850], [rfc850, extractRFC1123Or850], [ascii, extractASCII]);
}
function parseISODuration(s2) {
  return parse(s2, [isoDuration, extractISODuration]);
}
const extractISOTimeOnly = combineExtractors(extractISOTime);
function parseISOTimeOnly(s2) {
  return parse(s2, [isoTimeOnly, extractISOTimeOnly]);
}
const sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
const sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);
const extractISOYmdTimeOffsetAndIANAZone = combineExtractors(extractISOYmd, extractISOTime, extractISOOffset, extractIANAZone);
const extractISOTimeOffsetAndIANAZone = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
function parseSQL(s2) {
  return parse(s2, [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeOffsetAndIANAZone], [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]);
}
const INVALID$2 = "Invalid Duration";
const lowOrderMatrix = {
  weeks: {
    days: 7,
    hours: 7 * 24,
    minutes: 7 * 24 * 60,
    seconds: 7 * 24 * 60 * 60,
    milliseconds: 7 * 24 * 60 * 60 * 1e3
  },
  days: {
    hours: 24,
    minutes: 24 * 60,
    seconds: 24 * 60 * 60,
    milliseconds: 24 * 60 * 60 * 1e3
  },
  hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1e3 },
  minutes: { seconds: 60, milliseconds: 60 * 1e3 },
  seconds: { milliseconds: 1e3 }
}, casualMatrix = __spreadValues({
  years: {
    quarters: 4,
    months: 12,
    weeks: 52,
    days: 365,
    hours: 365 * 24,
    minutes: 365 * 24 * 60,
    seconds: 365 * 24 * 60 * 60,
    milliseconds: 365 * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: 13,
    days: 91,
    hours: 91 * 24,
    minutes: 91 * 24 * 60,
    seconds: 91 * 24 * 60 * 60,
    milliseconds: 91 * 24 * 60 * 60 * 1e3
  },
  months: {
    weeks: 4,
    days: 30,
    hours: 30 * 24,
    minutes: 30 * 24 * 60,
    seconds: 30 * 24 * 60 * 60,
    milliseconds: 30 * 24 * 60 * 60 * 1e3
  }
}, lowOrderMatrix), daysInYearAccurate = 146097 / 400, daysInMonthAccurate = 146097 / 4800, accurateMatrix = __spreadValues({
  years: {
    quarters: 4,
    months: 12,
    weeks: daysInYearAccurate / 7,
    days: daysInYearAccurate,
    hours: daysInYearAccurate * 24,
    minutes: daysInYearAccurate * 24 * 60,
    seconds: daysInYearAccurate * 24 * 60 * 60,
    milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: daysInYearAccurate / 28,
    days: daysInYearAccurate / 4,
    hours: daysInYearAccurate * 24 / 4,
    minutes: daysInYearAccurate * 24 * 60 / 4,
    seconds: daysInYearAccurate * 24 * 60 * 60 / 4,
    milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3 / 4
  },
  months: {
    weeks: daysInMonthAccurate / 7,
    days: daysInMonthAccurate,
    hours: daysInMonthAccurate * 24,
    minutes: daysInMonthAccurate * 24 * 60,
    seconds: daysInMonthAccurate * 24 * 60 * 60,
    milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1e3
  }
}, lowOrderMatrix);
const orderedUnits$1 = [
  "years",
  "quarters",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds"
];
const reverseUnits = orderedUnits$1.slice(0).reverse();
function clone$1(dur, alts, clear = false) {
  const conf = {
    values: clear ? alts.values : __spreadValues(__spreadValues({}, dur.values), alts.values || {}),
    loc: dur.loc.clone(alts.loc),
    conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy
  };
  return new Duration(conf);
}
function antiTrunc(n2) {
  return n2 < 0 ? Math.floor(n2) : Math.ceil(n2);
}
function convert(matrix, fromMap, fromUnit, toMap, toUnit) {
  const conv = matrix[toUnit][fromUnit], raw = fromMap[fromUnit] / conv, sameSign = Math.sign(raw) === Math.sign(toMap[toUnit]), added = !sameSign && toMap[toUnit] !== 0 && Math.abs(raw) <= 1 ? antiTrunc(raw) : Math.trunc(raw);
  toMap[toUnit] += added;
  fromMap[fromUnit] -= added * conv;
}
function normalizeValues(matrix, vals) {
  reverseUnits.reduce((previous, current) => {
    if (!isUndefined(vals[current])) {
      if (previous) {
        convert(matrix, vals, previous, vals, current);
      }
      return current;
    } else {
      return previous;
    }
  }, null);
}
class Duration {
  constructor(config2) {
    const accurate = config2.conversionAccuracy === "longterm" || false;
    this.values = config2.values;
    this.loc = config2.loc || Locale.create();
    this.conversionAccuracy = accurate ? "longterm" : "casual";
    this.invalid = config2.invalid || null;
    this.matrix = accurate ? accurateMatrix : casualMatrix;
    this.isLuxonDuration = true;
  }
  static fromMillis(count, opts) {
    return Duration.fromObject({ milliseconds: count }, opts);
  }
  static fromObject(obj, opts = {}) {
    if (obj == null || typeof obj !== "object") {
      throw new InvalidArgumentError(`Duration.fromObject: argument expected to be an object, got ${obj === null ? "null" : typeof obj}`);
    }
    return new Duration({
      values: normalizeObject(obj, Duration.normalizeUnit),
      loc: Locale.fromObject(opts),
      conversionAccuracy: opts.conversionAccuracy
    });
  }
  static fromDurationLike(durationLike) {
    if (isNumber(durationLike)) {
      return Duration.fromMillis(durationLike);
    } else if (Duration.isDuration(durationLike)) {
      return durationLike;
    } else if (typeof durationLike === "object") {
      return Duration.fromObject(durationLike);
    } else {
      throw new InvalidArgumentError(`Unknown duration argument ${durationLike} of type ${typeof durationLike}`);
    }
  }
  static fromISO(text, opts) {
    const [parsed] = parseISODuration(text);
    if (parsed) {
      return Duration.fromObject(parsed, opts);
    } else {
      return Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
    }
  }
  static fromISOTime(text, opts) {
    const [parsed] = parseISOTimeOnly(text);
    if (parsed) {
      return Duration.fromObject(parsed, opts);
    } else {
      return Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
    }
  }
  static invalid(reason, explanation = null) {
    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the Duration is invalid");
    }
    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
    if (Settings.throwOnInvalid) {
      throw new InvalidDurationError(invalid);
    } else {
      return new Duration({ invalid });
    }
  }
  static normalizeUnit(unit) {
    const normalized = {
      year: "years",
      years: "years",
      quarter: "quarters",
      quarters: "quarters",
      month: "months",
      months: "months",
      week: "weeks",
      weeks: "weeks",
      day: "days",
      days: "days",
      hour: "hours",
      hours: "hours",
      minute: "minutes",
      minutes: "minutes",
      second: "seconds",
      seconds: "seconds",
      millisecond: "milliseconds",
      milliseconds: "milliseconds"
    }[unit ? unit.toLowerCase() : unit];
    if (!normalized)
      throw new InvalidUnitError(unit);
    return normalized;
  }
  static isDuration(o2) {
    return o2 && o2.isLuxonDuration || false;
  }
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  toFormat(fmt, opts = {}) {
    const fmtOpts = __spreadProps(__spreadValues({}, opts), {
      floor: opts.round !== false && opts.floor !== false
    });
    return this.isValid ? Formatter.create(this.loc, fmtOpts).formatDurationFromString(this, fmt) : INVALID$2;
  }
  toHuman(opts = {}) {
    const l2 = orderedUnits$1.map((unit) => {
      const val = this.values[unit];
      if (isUndefined(val)) {
        return null;
      }
      return this.loc.numberFormatter(__spreadProps(__spreadValues({ style: "unit", unitDisplay: "long" }, opts), { unit: unit.slice(0, -1) })).format(val);
    }).filter((n2) => n2);
    return this.loc.listFormatter(__spreadValues({ type: "conjunction", style: opts.listStyle || "narrow" }, opts)).format(l2);
  }
  toObject() {
    if (!this.isValid)
      return {};
    return __spreadValues({}, this.values);
  }
  toISO() {
    if (!this.isValid)
      return null;
    let s2 = "P";
    if (this.years !== 0)
      s2 += this.years + "Y";
    if (this.months !== 0 || this.quarters !== 0)
      s2 += this.months + this.quarters * 3 + "M";
    if (this.weeks !== 0)
      s2 += this.weeks + "W";
    if (this.days !== 0)
      s2 += this.days + "D";
    if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0)
      s2 += "T";
    if (this.hours !== 0)
      s2 += this.hours + "H";
    if (this.minutes !== 0)
      s2 += this.minutes + "M";
    if (this.seconds !== 0 || this.milliseconds !== 0)
      s2 += roundTo(this.seconds + this.milliseconds / 1e3, 3) + "S";
    if (s2 === "P")
      s2 += "T0S";
    return s2;
  }
  toISOTime(opts = {}) {
    if (!this.isValid)
      return null;
    const millis = this.toMillis();
    if (millis < 0 || millis >= 864e5)
      return null;
    opts = __spreadValues({
      suppressMilliseconds: false,
      suppressSeconds: false,
      includePrefix: false,
      format: "extended"
    }, opts);
    const value = this.shiftTo("hours", "minutes", "seconds", "milliseconds");
    let fmt = opts.format === "basic" ? "hhmm" : "hh:mm";
    if (!opts.suppressSeconds || value.seconds !== 0 || value.milliseconds !== 0) {
      fmt += opts.format === "basic" ? "ss" : ":ss";
      if (!opts.suppressMilliseconds || value.milliseconds !== 0) {
        fmt += ".SSS";
      }
    }
    let str = value.toFormat(fmt);
    if (opts.includePrefix) {
      str = "T" + str;
    }
    return str;
  }
  toJSON() {
    return this.toISO();
  }
  toString() {
    return this.toISO();
  }
  toMillis() {
    return this.as("milliseconds");
  }
  valueOf() {
    return this.toMillis();
  }
  plus(duration) {
    if (!this.isValid)
      return this;
    const dur = Duration.fromDurationLike(duration), result = {};
    for (const k of orderedUnits$1) {
      if (hasOwnProperty(dur.values, k) || hasOwnProperty(this.values, k)) {
        result[k] = dur.get(k) + this.get(k);
      }
    }
    return clone$1(this, { values: result }, true);
  }
  minus(duration) {
    if (!this.isValid)
      return this;
    const dur = Duration.fromDurationLike(duration);
    return this.plus(dur.negate());
  }
  mapUnits(fn) {
    if (!this.isValid)
      return this;
    const result = {};
    for (const k of Object.keys(this.values)) {
      result[k] = asNumber(fn(this.values[k], k));
    }
    return clone$1(this, { values: result }, true);
  }
  get(unit) {
    return this[Duration.normalizeUnit(unit)];
  }
  set(values) {
    if (!this.isValid)
      return this;
    const mixed = __spreadValues(__spreadValues({}, this.values), normalizeObject(values, Duration.normalizeUnit));
    return clone$1(this, { values: mixed });
  }
  reconfigure({ locale, numberingSystem, conversionAccuracy } = {}) {
    const loc = this.loc.clone({ locale, numberingSystem }), opts = { loc };
    if (conversionAccuracy) {
      opts.conversionAccuracy = conversionAccuracy;
    }
    return clone$1(this, opts);
  }
  as(unit) {
    return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
  }
  normalize() {
    if (!this.isValid)
      return this;
    const vals = this.toObject();
    normalizeValues(this.matrix, vals);
    return clone$1(this, { values: vals }, true);
  }
  shiftTo(...units) {
    if (!this.isValid)
      return this;
    if (units.length === 0) {
      return this;
    }
    units = units.map((u) => Duration.normalizeUnit(u));
    const built = {}, accumulated = {}, vals = this.toObject();
    let lastUnit;
    for (const k of orderedUnits$1) {
      if (units.indexOf(k) >= 0) {
        lastUnit = k;
        let own = 0;
        for (const ak in accumulated) {
          own += this.matrix[ak][k] * accumulated[ak];
          accumulated[ak] = 0;
        }
        if (isNumber(vals[k])) {
          own += vals[k];
        }
        const i = Math.trunc(own);
        built[k] = i;
        accumulated[k] = (own * 1e3 - i * 1e3) / 1e3;
        for (const down in vals) {
          if (orderedUnits$1.indexOf(down) > orderedUnits$1.indexOf(k)) {
            convert(this.matrix, vals, down, built, k);
          }
        }
      } else if (isNumber(vals[k])) {
        accumulated[k] = vals[k];
      }
    }
    for (const key in accumulated) {
      if (accumulated[key] !== 0) {
        built[lastUnit] += key === lastUnit ? accumulated[key] : accumulated[key] / this.matrix[lastUnit][key];
      }
    }
    return clone$1(this, { values: built }, true).normalize();
  }
  negate() {
    if (!this.isValid)
      return this;
    const negated = {};
    for (const k of Object.keys(this.values)) {
      negated[k] = this.values[k] === 0 ? 0 : -this.values[k];
    }
    return clone$1(this, { values: negated }, true);
  }
  get years() {
    return this.isValid ? this.values.years || 0 : NaN;
  }
  get quarters() {
    return this.isValid ? this.values.quarters || 0 : NaN;
  }
  get months() {
    return this.isValid ? this.values.months || 0 : NaN;
  }
  get weeks() {
    return this.isValid ? this.values.weeks || 0 : NaN;
  }
  get days() {
    return this.isValid ? this.values.days || 0 : NaN;
  }
  get hours() {
    return this.isValid ? this.values.hours || 0 : NaN;
  }
  get minutes() {
    return this.isValid ? this.values.minutes || 0 : NaN;
  }
  get seconds() {
    return this.isValid ? this.values.seconds || 0 : NaN;
  }
  get milliseconds() {
    return this.isValid ? this.values.milliseconds || 0 : NaN;
  }
  get isValid() {
    return this.invalid === null;
  }
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  equals(other) {
    if (!this.isValid || !other.isValid) {
      return false;
    }
    if (!this.loc.equals(other.loc)) {
      return false;
    }
    function eq(v1, v2) {
      if (v1 === void 0 || v1 === 0)
        return v2 === void 0 || v2 === 0;
      return v1 === v2;
    }
    for (const u of orderedUnits$1) {
      if (!eq(this.values[u], other.values[u])) {
        return false;
      }
    }
    return true;
  }
}
const INVALID$1 = "Invalid Interval";
function validateStartEnd(start, end) {
  if (!start || !start.isValid) {
    return Interval.invalid("missing or invalid start");
  } else if (!end || !end.isValid) {
    return Interval.invalid("missing or invalid end");
  } else if (end < start) {
    return Interval.invalid("end before start", `The end of an interval must be after its start, but you had start=${start.toISO()} and end=${end.toISO()}`);
  } else {
    return null;
  }
}
class Interval {
  constructor(config2) {
    this.s = config2.start;
    this.e = config2.end;
    this.invalid = config2.invalid || null;
    this.isLuxonInterval = true;
  }
  static invalid(reason, explanation = null) {
    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the Interval is invalid");
    }
    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
    if (Settings.throwOnInvalid) {
      throw new InvalidIntervalError(invalid);
    } else {
      return new Interval({ invalid });
    }
  }
  static fromDateTimes(start, end) {
    const builtStart = friendlyDateTime(start), builtEnd = friendlyDateTime(end);
    const validateError = validateStartEnd(builtStart, builtEnd);
    if (validateError == null) {
      return new Interval({
        start: builtStart,
        end: builtEnd
      });
    } else {
      return validateError;
    }
  }
  static after(start, duration) {
    const dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(start);
    return Interval.fromDateTimes(dt, dt.plus(dur));
  }
  static before(end, duration) {
    const dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(end);
    return Interval.fromDateTimes(dt.minus(dur), dt);
  }
  static fromISO(text, opts) {
    const [s2, e] = (text || "").split("/", 2);
    if (s2 && e) {
      let start, startIsValid;
      try {
        start = DateTime.fromISO(s2, opts);
        startIsValid = start.isValid;
      } catch (e2) {
        startIsValid = false;
      }
      let end, endIsValid;
      try {
        end = DateTime.fromISO(e, opts);
        endIsValid = end.isValid;
      } catch (e2) {
        endIsValid = false;
      }
      if (startIsValid && endIsValid) {
        return Interval.fromDateTimes(start, end);
      }
      if (startIsValid) {
        const dur = Duration.fromISO(e, opts);
        if (dur.isValid) {
          return Interval.after(start, dur);
        }
      } else if (endIsValid) {
        const dur = Duration.fromISO(s2, opts);
        if (dur.isValid) {
          return Interval.before(end, dur);
        }
      }
    }
    return Interval.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
  }
  static isInterval(o2) {
    return o2 && o2.isLuxonInterval || false;
  }
  get start() {
    return this.isValid ? this.s : null;
  }
  get end() {
    return this.isValid ? this.e : null;
  }
  get isValid() {
    return this.invalidReason === null;
  }
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  length(unit = "milliseconds") {
    return this.isValid ? this.toDuration(...[unit]).get(unit) : NaN;
  }
  count(unit = "milliseconds") {
    if (!this.isValid)
      return NaN;
    const start = this.start.startOf(unit), end = this.end.startOf(unit);
    return Math.floor(end.diff(start, unit).get(unit)) + 1;
  }
  hasSame(unit) {
    return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, unit) : false;
  }
  isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  }
  isAfter(dateTime) {
    if (!this.isValid)
      return false;
    return this.s > dateTime;
  }
  isBefore(dateTime) {
    if (!this.isValid)
      return false;
    return this.e <= dateTime;
  }
  contains(dateTime) {
    if (!this.isValid)
      return false;
    return this.s <= dateTime && this.e > dateTime;
  }
  set({ start, end } = {}) {
    if (!this.isValid)
      return this;
    return Interval.fromDateTimes(start || this.s, end || this.e);
  }
  splitAt(...dateTimes) {
    if (!this.isValid)
      return [];
    const sorted = dateTimes.map(friendlyDateTime).filter((d) => this.contains(d)).sort(), results = [];
    let { s: s2 } = this, i = 0;
    while (s2 < this.e) {
      const added = sorted[i] || this.e, next = +added > +this.e ? this.e : added;
      results.push(Interval.fromDateTimes(s2, next));
      s2 = next;
      i += 1;
    }
    return results;
  }
  splitBy(duration) {
    const dur = Duration.fromDurationLike(duration);
    if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
      return [];
    }
    let { s: s2 } = this, idx = 1, next;
    const results = [];
    while (s2 < this.e) {
      const added = this.start.plus(dur.mapUnits((x) => x * idx));
      next = +added > +this.e ? this.e : added;
      results.push(Interval.fromDateTimes(s2, next));
      s2 = next;
      idx += 1;
    }
    return results;
  }
  divideEqually(numberOfParts) {
    if (!this.isValid)
      return [];
    return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
  }
  overlaps(other) {
    return this.e > other.s && this.s < other.e;
  }
  abutsStart(other) {
    if (!this.isValid)
      return false;
    return +this.e === +other.s;
  }
  abutsEnd(other) {
    if (!this.isValid)
      return false;
    return +other.e === +this.s;
  }
  engulfs(other) {
    if (!this.isValid)
      return false;
    return this.s <= other.s && this.e >= other.e;
  }
  equals(other) {
    if (!this.isValid || !other.isValid) {
      return false;
    }
    return this.s.equals(other.s) && this.e.equals(other.e);
  }
  intersection(other) {
    if (!this.isValid)
      return this;
    const s2 = this.s > other.s ? this.s : other.s, e = this.e < other.e ? this.e : other.e;
    if (s2 >= e) {
      return null;
    } else {
      return Interval.fromDateTimes(s2, e);
    }
  }
  union(other) {
    if (!this.isValid)
      return this;
    const s2 = this.s < other.s ? this.s : other.s, e = this.e > other.e ? this.e : other.e;
    return Interval.fromDateTimes(s2, e);
  }
  static merge(intervals) {
    const [found, final] = intervals.sort((a, b) => a.s - b.s).reduce(([sofar, current], item) => {
      if (!current) {
        return [sofar, item];
      } else if (current.overlaps(item) || current.abutsStart(item)) {
        return [sofar, current.union(item)];
      } else {
        return [sofar.concat([current]), item];
      }
    }, [[], null]);
    if (final) {
      found.push(final);
    }
    return found;
  }
  static xor(intervals) {
    let start = null, currentCount = 0;
    const results = [], ends = intervals.map((i) => [
      { time: i.s, type: "s" },
      { time: i.e, type: "e" }
    ]), flattened = Array.prototype.concat(...ends), arr = flattened.sort((a, b) => a.time - b.time);
    for (const i of arr) {
      currentCount += i.type === "s" ? 1 : -1;
      if (currentCount === 1) {
        start = i.time;
      } else {
        if (start && +start !== +i.time) {
          results.push(Interval.fromDateTimes(start, i.time));
        }
        start = null;
      }
    }
    return Interval.merge(results);
  }
  difference(...intervals) {
    return Interval.xor([this].concat(intervals)).map((i) => this.intersection(i)).filter((i) => i && !i.isEmpty());
  }
  toString() {
    if (!this.isValid)
      return INVALID$1;
    return `[${this.s.toISO()} \u2013 ${this.e.toISO()})`;
  }
  toISO(opts) {
    if (!this.isValid)
      return INVALID$1;
    return `${this.s.toISO(opts)}/${this.e.toISO(opts)}`;
  }
  toISODate() {
    if (!this.isValid)
      return INVALID$1;
    return `${this.s.toISODate()}/${this.e.toISODate()}`;
  }
  toISOTime(opts) {
    if (!this.isValid)
      return INVALID$1;
    return `${this.s.toISOTime(opts)}/${this.e.toISOTime(opts)}`;
  }
  toFormat(dateFormat, { separator = " \u2013 " } = {}) {
    if (!this.isValid)
      return INVALID$1;
    return `${this.s.toFormat(dateFormat)}${separator}${this.e.toFormat(dateFormat)}`;
  }
  toDuration(unit, opts) {
    if (!this.isValid) {
      return Duration.invalid(this.invalidReason);
    }
    return this.e.diff(this.s, unit, opts);
  }
  mapEndpoints(mapFn) {
    return Interval.fromDateTimes(mapFn(this.s), mapFn(this.e));
  }
}
class Info {
  static hasDST(zone = Settings.defaultZone) {
    const proto = DateTime.now().setZone(zone).set({ month: 12 });
    return !zone.isUniversal && proto.offset !== proto.set({ month: 6 }).offset;
  }
  static isValidIANAZone(zone) {
    return IANAZone.isValidZone(zone);
  }
  static normalizeZone(input) {
    return normalizeZone(input, Settings.defaultZone);
  }
  static months(length = "long", { locale = null, numberingSystem = null, locObj = null, outputCalendar = "gregory" } = {}) {
    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length);
  }
  static monthsFormat(length = "long", { locale = null, numberingSystem = null, locObj = null, outputCalendar = "gregory" } = {}) {
    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length, true);
  }
  static weekdays(length = "long", { locale = null, numberingSystem = null, locObj = null } = {}) {
    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length);
  }
  static weekdaysFormat(length = "long", { locale = null, numberingSystem = null, locObj = null } = {}) {
    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length, true);
  }
  static meridiems({ locale = null } = {}) {
    return Locale.create(locale).meridiems();
  }
  static eras(length = "short", { locale = null } = {}) {
    return Locale.create(locale, null, "gregory").eras(length);
  }
  static features() {
    return { relative: hasRelative() };
  }
}
function dayDiff(earlier, later) {
  const utcDayStart = (dt) => dt.toUTC(0, { keepLocalTime: true }).startOf("day").valueOf(), ms = utcDayStart(later) - utcDayStart(earlier);
  return Math.floor(Duration.fromMillis(ms).as("days"));
}
function highOrderDiffs(cursor, later, units) {
  const differs = [
    ["years", (a, b) => b.year - a.year],
    ["quarters", (a, b) => b.quarter - a.quarter],
    ["months", (a, b) => b.month - a.month + (b.year - a.year) * 12],
    [
      "weeks",
      (a, b) => {
        const days = dayDiff(a, b);
        return (days - days % 7) / 7;
      }
    ],
    ["days", dayDiff]
  ];
  const results = {};
  let lowestOrder, highWater;
  for (const [unit, differ] of differs) {
    if (units.indexOf(unit) >= 0) {
      lowestOrder = unit;
      let delta = differ(cursor, later);
      highWater = cursor.plus({ [unit]: delta });
      if (highWater > later) {
        cursor = cursor.plus({ [unit]: delta - 1 });
        delta -= 1;
      } else {
        cursor = highWater;
      }
      results[unit] = delta;
    }
  }
  return [cursor, results, highWater, lowestOrder];
}
function diff(earlier, later, units, opts) {
  let [cursor, results, highWater, lowestOrder] = highOrderDiffs(earlier, later, units);
  const remainingMillis = later - cursor;
  const lowerOrderUnits = units.filter((u) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0);
  if (lowerOrderUnits.length === 0) {
    if (highWater < later) {
      highWater = cursor.plus({ [lowestOrder]: 1 });
    }
    if (highWater !== cursor) {
      results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
    }
  }
  const duration = Duration.fromObject(results, opts);
  if (lowerOrderUnits.length > 0) {
    return Duration.fromMillis(remainingMillis, opts).shiftTo(...lowerOrderUnits).plus(duration);
  } else {
    return duration;
  }
}
const numberingSystems = {
  arab: "[\u0660-\u0669]",
  arabext: "[\u06F0-\u06F9]",
  bali: "[\u1B50-\u1B59]",
  beng: "[\u09E6-\u09EF]",
  deva: "[\u0966-\u096F]",
  fullwide: "[\uFF10-\uFF19]",
  gujr: "[\u0AE6-\u0AEF]",
  hanidec: "[\u3007|\u4E00|\u4E8C|\u4E09|\u56DB|\u4E94|\u516D|\u4E03|\u516B|\u4E5D]",
  khmr: "[\u17E0-\u17E9]",
  knda: "[\u0CE6-\u0CEF]",
  laoo: "[\u0ED0-\u0ED9]",
  limb: "[\u1946-\u194F]",
  mlym: "[\u0D66-\u0D6F]",
  mong: "[\u1810-\u1819]",
  mymr: "[\u1040-\u1049]",
  orya: "[\u0B66-\u0B6F]",
  tamldec: "[\u0BE6-\u0BEF]",
  telu: "[\u0C66-\u0C6F]",
  thai: "[\u0E50-\u0E59]",
  tibt: "[\u0F20-\u0F29]",
  latn: "\\d"
};
const numberingSystemsUTF16 = {
  arab: [1632, 1641],
  arabext: [1776, 1785],
  bali: [6992, 7001],
  beng: [2534, 2543],
  deva: [2406, 2415],
  fullwide: [65296, 65303],
  gujr: [2790, 2799],
  khmr: [6112, 6121],
  knda: [3302, 3311],
  laoo: [3792, 3801],
  limb: [6470, 6479],
  mlym: [3430, 3439],
  mong: [6160, 6169],
  mymr: [4160, 4169],
  orya: [2918, 2927],
  tamldec: [3046, 3055],
  telu: [3174, 3183],
  thai: [3664, 3673],
  tibt: [3872, 3881]
};
const hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");
function parseDigits(str) {
  let value = parseInt(str, 10);
  if (isNaN(value)) {
    value = "";
    for (let i = 0; i < str.length; i++) {
      const code2 = str.charCodeAt(i);
      if (str[i].search(numberingSystems.hanidec) !== -1) {
        value += hanidecChars.indexOf(str[i]);
      } else {
        for (const key in numberingSystemsUTF16) {
          const [min, max] = numberingSystemsUTF16[key];
          if (code2 >= min && code2 <= max) {
            value += code2 - min;
          }
        }
      }
    }
    return parseInt(value, 10);
  } else {
    return value;
  }
}
function digitRegex({ numberingSystem }, append = "") {
  return new RegExp(`${numberingSystems[numberingSystem || "latn"]}${append}`);
}
const MISSING_FTP = "missing Intl.DateTimeFormat.formatToParts support";
function intUnit(regex, post = (i) => i) {
  return { regex, deser: ([s2]) => post(parseDigits(s2)) };
}
const NBSP = String.fromCharCode(160);
const spaceOrNBSP = `( |${NBSP})`;
const spaceOrNBSPRegExp = new RegExp(spaceOrNBSP, "g");
function fixListRegex(s2) {
  return s2.replace(/\./g, "\\.?").replace(spaceOrNBSPRegExp, spaceOrNBSP);
}
function stripInsensitivities(s2) {
  return s2.replace(/\./g, "").replace(spaceOrNBSPRegExp, " ").toLowerCase();
}
function oneOf(strings, startIndex) {
  if (strings === null) {
    return null;
  } else {
    return {
      regex: RegExp(strings.map(fixListRegex).join("|")),
      deser: ([s2]) => strings.findIndex((i) => stripInsensitivities(s2) === stripInsensitivities(i)) + startIndex
    };
  }
}
function offset(regex, groups) {
  return { regex, deser: ([, h, m]) => signedOffset(h, m), groups };
}
function simple(regex) {
  return { regex, deser: ([s2]) => s2 };
}
function escapeToken(value) {
  return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function unitForToken(token, loc) {
  const one = digitRegex(loc), two = digitRegex(loc, "{2}"), three = digitRegex(loc, "{3}"), four = digitRegex(loc, "{4}"), six = digitRegex(loc, "{6}"), oneOrTwo = digitRegex(loc, "{1,2}"), oneToThree = digitRegex(loc, "{1,3}"), oneToSix = digitRegex(loc, "{1,6}"), oneToNine = digitRegex(loc, "{1,9}"), twoToFour = digitRegex(loc, "{2,4}"), fourToSix = digitRegex(loc, "{4,6}"), literal = (t2) => ({ regex: RegExp(escapeToken(t2.val)), deser: ([s2]) => s2, literal: true }), unitate = (t2) => {
    if (token.literal) {
      return literal(t2);
    }
    switch (t2.val) {
      case "G":
        return oneOf(loc.eras("short", false), 0);
      case "GG":
        return oneOf(loc.eras("long", false), 0);
      case "y":
        return intUnit(oneToSix);
      case "yy":
        return intUnit(twoToFour, untruncateYear);
      case "yyyy":
        return intUnit(four);
      case "yyyyy":
        return intUnit(fourToSix);
      case "yyyyyy":
        return intUnit(six);
      case "M":
        return intUnit(oneOrTwo);
      case "MM":
        return intUnit(two);
      case "MMM":
        return oneOf(loc.months("short", true, false), 1);
      case "MMMM":
        return oneOf(loc.months("long", true, false), 1);
      case "L":
        return intUnit(oneOrTwo);
      case "LL":
        return intUnit(two);
      case "LLL":
        return oneOf(loc.months("short", false, false), 1);
      case "LLLL":
        return oneOf(loc.months("long", false, false), 1);
      case "d":
        return intUnit(oneOrTwo);
      case "dd":
        return intUnit(two);
      case "o":
        return intUnit(oneToThree);
      case "ooo":
        return intUnit(three);
      case "HH":
        return intUnit(two);
      case "H":
        return intUnit(oneOrTwo);
      case "hh":
        return intUnit(two);
      case "h":
        return intUnit(oneOrTwo);
      case "mm":
        return intUnit(two);
      case "m":
        return intUnit(oneOrTwo);
      case "q":
        return intUnit(oneOrTwo);
      case "qq":
        return intUnit(two);
      case "s":
        return intUnit(oneOrTwo);
      case "ss":
        return intUnit(two);
      case "S":
        return intUnit(oneToThree);
      case "SSS":
        return intUnit(three);
      case "u":
        return simple(oneToNine);
      case "uu":
        return simple(oneOrTwo);
      case "uuu":
        return intUnit(one);
      case "a":
        return oneOf(loc.meridiems(), 0);
      case "kkkk":
        return intUnit(four);
      case "kk":
        return intUnit(twoToFour, untruncateYear);
      case "W":
        return intUnit(oneOrTwo);
      case "WW":
        return intUnit(two);
      case "E":
      case "c":
        return intUnit(one);
      case "EEE":
        return oneOf(loc.weekdays("short", false, false), 1);
      case "EEEE":
        return oneOf(loc.weekdays("long", false, false), 1);
      case "ccc":
        return oneOf(loc.weekdays("short", true, false), 1);
      case "cccc":
        return oneOf(loc.weekdays("long", true, false), 1);
      case "Z":
      case "ZZ":
        return offset(new RegExp(`([+-]${oneOrTwo.source})(?::(${two.source}))?`), 2);
      case "ZZZ":
        return offset(new RegExp(`([+-]${oneOrTwo.source})(${two.source})?`), 2);
      case "z":
        return simple(/[a-z_+-/]{1,256}?/i);
      default:
        return literal(t2);
    }
  };
  const unit = unitate(token) || {
    invalidReason: MISSING_FTP
  };
  unit.token = token;
  return unit;
}
const partTypeStyleToTokenVal = {
  year: {
    "2-digit": "yy",
    numeric: "yyyyy"
  },
  month: {
    numeric: "M",
    "2-digit": "MM",
    short: "MMM",
    long: "MMMM"
  },
  day: {
    numeric: "d",
    "2-digit": "dd"
  },
  weekday: {
    short: "EEE",
    long: "EEEE"
  },
  dayperiod: "a",
  dayPeriod: "a",
  hour: {
    numeric: "h",
    "2-digit": "hh"
  },
  minute: {
    numeric: "m",
    "2-digit": "mm"
  },
  second: {
    numeric: "s",
    "2-digit": "ss"
  }
};
function tokenForPart(part, locale, formatOpts) {
  const { type, value } = part;
  if (type === "literal") {
    return {
      literal: true,
      val: value
    };
  }
  const style = formatOpts[type];
  let val = partTypeStyleToTokenVal[type];
  if (typeof val === "object") {
    val = val[style];
  }
  if (val) {
    return {
      literal: false,
      val
    };
  }
  return void 0;
}
function buildRegex(units) {
  const re = units.map((u) => u.regex).reduce((f, r) => `${f}(${r.source})`, "");
  return [`^${re}$`, units];
}
function match(input, regex, handlers) {
  const matches = input.match(regex);
  if (matches) {
    const all = {};
    let matchIndex = 1;
    for (const i in handlers) {
      if (hasOwnProperty(handlers, i)) {
        const h = handlers[i], groups = h.groups ? h.groups + 1 : 1;
        if (!h.literal && h.token) {
          all[h.token.val[0]] = h.deser(matches.slice(matchIndex, matchIndex + groups));
        }
        matchIndex += groups;
      }
    }
    return [matches, all];
  } else {
    return [matches, {}];
  }
}
function dateTimeFromMatches(matches) {
  const toField = (token) => {
    switch (token) {
      case "S":
        return "millisecond";
      case "s":
        return "second";
      case "m":
        return "minute";
      case "h":
      case "H":
        return "hour";
      case "d":
        return "day";
      case "o":
        return "ordinal";
      case "L":
      case "M":
        return "month";
      case "y":
        return "year";
      case "E":
      case "c":
        return "weekday";
      case "W":
        return "weekNumber";
      case "k":
        return "weekYear";
      case "q":
        return "quarter";
      default:
        return null;
    }
  };
  let zone = null;
  let specificOffset;
  if (!isUndefined(matches.z)) {
    zone = IANAZone.create(matches.z);
  }
  if (!isUndefined(matches.Z)) {
    if (!zone) {
      zone = new FixedOffsetZone(matches.Z);
    }
    specificOffset = matches.Z;
  }
  if (!isUndefined(matches.q)) {
    matches.M = (matches.q - 1) * 3 + 1;
  }
  if (!isUndefined(matches.h)) {
    if (matches.h < 12 && matches.a === 1) {
      matches.h += 12;
    } else if (matches.h === 12 && matches.a === 0) {
      matches.h = 0;
    }
  }
  if (matches.G === 0 && matches.y) {
    matches.y = -matches.y;
  }
  if (!isUndefined(matches.u)) {
    matches.S = parseMillis(matches.u);
  }
  const vals = Object.keys(matches).reduce((r, k) => {
    const f = toField(k);
    if (f) {
      r[f] = matches[k];
    }
    return r;
  }, {});
  return [vals, zone, specificOffset];
}
let dummyDateTimeCache = null;
function getDummyDateTime() {
  if (!dummyDateTimeCache) {
    dummyDateTimeCache = DateTime.fromMillis(1555555555555);
  }
  return dummyDateTimeCache;
}
function maybeExpandMacroToken(token, locale) {
  if (token.literal) {
    return token;
  }
  const formatOpts = Formatter.macroTokenToFormatOpts(token.val);
  if (!formatOpts) {
    return token;
  }
  const formatter = Formatter.create(locale, formatOpts);
  const parts = formatter.formatDateTimeParts(getDummyDateTime());
  const tokens = parts.map((p) => tokenForPart(p, locale, formatOpts));
  if (tokens.includes(void 0)) {
    return token;
  }
  return tokens;
}
function expandMacroTokens(tokens, locale) {
  return Array.prototype.concat(...tokens.map((t2) => maybeExpandMacroToken(t2, locale)));
}
function explainFromTokens(locale, input, format) {
  const tokens = expandMacroTokens(Formatter.parseFormat(format), locale), units = tokens.map((t2) => unitForToken(t2, locale)), disqualifyingUnit = units.find((t2) => t2.invalidReason);
  if (disqualifyingUnit) {
    return { input, tokens, invalidReason: disqualifyingUnit.invalidReason };
  } else {
    const [regexString, handlers] = buildRegex(units), regex = RegExp(regexString, "i"), [rawMatches, matches] = match(input, regex, handlers), [result, zone, specificOffset] = matches ? dateTimeFromMatches(matches) : [null, null, void 0];
    if (hasOwnProperty(matches, "a") && hasOwnProperty(matches, "H")) {
      throw new ConflictingSpecificationError("Can't include meridiem when specifying 24-hour format");
    }
    return { input, tokens, regex, rawMatches, matches, result, zone, specificOffset };
  }
}
function parseFromTokens(locale, input, format) {
  const { result, zone, specificOffset, invalidReason } = explainFromTokens(locale, input, format);
  return [result, zone, specificOffset, invalidReason];
}
const nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function unitOutOfRange(unit, value) {
  return new Invalid("unit out of range", `you specified ${value} (of type ${typeof value}) as a ${unit}, which is invalid`);
}
function dayOfWeek(year, month, day) {
  const js = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return js === 0 ? 7 : js;
}
function computeOrdinal(year, month, day) {
  return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
}
function uncomputeOrdinal(year, ordinal) {
  const table = isLeapYear(year) ? leapLadder : nonLeapLadder, month0 = table.findIndex((i) => i < ordinal), day = ordinal - table[month0];
  return { month: month0 + 1, day };
}
function gregorianToWeek(gregObj) {
  const { year, month, day } = gregObj, ordinal = computeOrdinal(year, month, day), weekday = dayOfWeek(year, month, day);
  let weekNumber = Math.floor((ordinal - weekday + 10) / 7), weekYear;
  if (weekNumber < 1) {
    weekYear = year - 1;
    weekNumber = weeksInWeekYear(weekYear);
  } else if (weekNumber > weeksInWeekYear(year)) {
    weekYear = year + 1;
    weekNumber = 1;
  } else {
    weekYear = year;
  }
  return __spreadValues({ weekYear, weekNumber, weekday }, timeObject(gregObj));
}
function weekToGregorian(weekData) {
  const { weekYear, weekNumber, weekday } = weekData, weekdayOfJan4 = dayOfWeek(weekYear, 1, 4), yearInDays = daysInYear(weekYear);
  let ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 3, year;
  if (ordinal < 1) {
    year = weekYear - 1;
    ordinal += daysInYear(year);
  } else if (ordinal > yearInDays) {
    year = weekYear + 1;
    ordinal -= daysInYear(weekYear);
  } else {
    year = weekYear;
  }
  const { month, day } = uncomputeOrdinal(year, ordinal);
  return __spreadValues({ year, month, day }, timeObject(weekData));
}
function gregorianToOrdinal(gregData) {
  const { year, month, day } = gregData;
  const ordinal = computeOrdinal(year, month, day);
  return __spreadValues({ year, ordinal }, timeObject(gregData));
}
function ordinalToGregorian(ordinalData) {
  const { year, ordinal } = ordinalData;
  const { month, day } = uncomputeOrdinal(year, ordinal);
  return __spreadValues({ year, month, day }, timeObject(ordinalData));
}
function hasInvalidWeekData(obj) {
  const validYear = isInteger(obj.weekYear), validWeek = integerBetween(obj.weekNumber, 1, weeksInWeekYear(obj.weekYear)), validWeekday = integerBetween(obj.weekday, 1, 7);
  if (!validYear) {
    return unitOutOfRange("weekYear", obj.weekYear);
  } else if (!validWeek) {
    return unitOutOfRange("week", obj.week);
  } else if (!validWeekday) {
    return unitOutOfRange("weekday", obj.weekday);
  } else
    return false;
}
function hasInvalidOrdinalData(obj) {
  const validYear = isInteger(obj.year), validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));
  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validOrdinal) {
    return unitOutOfRange("ordinal", obj.ordinal);
  } else
    return false;
}
function hasInvalidGregorianData(obj) {
  const validYear = isInteger(obj.year), validMonth = integerBetween(obj.month, 1, 12), validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));
  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validMonth) {
    return unitOutOfRange("month", obj.month);
  } else if (!validDay) {
    return unitOutOfRange("day", obj.day);
  } else
    return false;
}
function hasInvalidTimeData(obj) {
  const { hour, minute, second, millisecond } = obj;
  const validHour = integerBetween(hour, 0, 23) || hour === 24 && minute === 0 && second === 0 && millisecond === 0, validMinute = integerBetween(minute, 0, 59), validSecond = integerBetween(second, 0, 59), validMillisecond = integerBetween(millisecond, 0, 999);
  if (!validHour) {
    return unitOutOfRange("hour", hour);
  } else if (!validMinute) {
    return unitOutOfRange("minute", minute);
  } else if (!validSecond) {
    return unitOutOfRange("second", second);
  } else if (!validMillisecond) {
    return unitOutOfRange("millisecond", millisecond);
  } else
    return false;
}
const INVALID = "Invalid DateTime";
const MAX_DATE = 864e13;
function unsupportedZone(zone) {
  return new Invalid("unsupported zone", `the zone "${zone.name}" is not supported`);
}
function possiblyCachedWeekData(dt) {
  if (dt.weekData === null) {
    dt.weekData = gregorianToWeek(dt.c);
  }
  return dt.weekData;
}
function clone(inst, alts) {
  const current = {
    ts: inst.ts,
    zone: inst.zone,
    c: inst.c,
    o: inst.o,
    loc: inst.loc,
    invalid: inst.invalid
  };
  return new DateTime(__spreadProps(__spreadValues(__spreadValues({}, current), alts), { old: current }));
}
function fixOffset(localTS, o2, tz) {
  let utcGuess = localTS - o2 * 60 * 1e3;
  const o22 = tz.offset(utcGuess);
  if (o2 === o22) {
    return [utcGuess, o2];
  }
  utcGuess -= (o22 - o2) * 60 * 1e3;
  const o3 = tz.offset(utcGuess);
  if (o22 === o3) {
    return [utcGuess, o22];
  }
  return [localTS - Math.min(o22, o3) * 60 * 1e3, Math.max(o22, o3)];
}
function tsToObj(ts, offset2) {
  ts += offset2 * 60 * 1e3;
  const d = new Date(ts);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
    second: d.getUTCSeconds(),
    millisecond: d.getUTCMilliseconds()
  };
}
function objToTS(obj, offset2, zone) {
  return fixOffset(objToLocalTS(obj), offset2, zone);
}
function adjustTime(inst, dur) {
  const oPre = inst.o, year = inst.c.year + Math.trunc(dur.years), month = inst.c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3, c = __spreadProps(__spreadValues({}, inst.c), {
    year,
    month,
    day: Math.min(inst.c.day, daysInMonth(year, month)) + Math.trunc(dur.days) + Math.trunc(dur.weeks) * 7
  }), millisToAdd = Duration.fromObject({
    years: dur.years - Math.trunc(dur.years),
    quarters: dur.quarters - Math.trunc(dur.quarters),
    months: dur.months - Math.trunc(dur.months),
    weeks: dur.weeks - Math.trunc(dur.weeks),
    days: dur.days - Math.trunc(dur.days),
    hours: dur.hours,
    minutes: dur.minutes,
    seconds: dur.seconds,
    milliseconds: dur.milliseconds
  }).as("milliseconds"), localTS = objToLocalTS(c);
  let [ts, o2] = fixOffset(localTS, oPre, inst.zone);
  if (millisToAdd !== 0) {
    ts += millisToAdd;
    o2 = inst.zone.offset(ts);
  }
  return { ts, o: o2 };
}
function parseDataToDateTime(parsed, parsedZone, opts, format, text, specificOffset) {
  const { setZone, zone } = opts;
  if (parsed && Object.keys(parsed).length !== 0) {
    const interpretationZone = parsedZone || zone, inst = DateTime.fromObject(parsed, __spreadProps(__spreadValues({}, opts), {
      zone: interpretationZone,
      specificOffset
    }));
    return setZone ? inst : inst.setZone(zone);
  } else {
    return DateTime.invalid(new Invalid("unparsable", `the input "${text}" can't be parsed as ${format}`));
  }
}
function toTechFormat(dt, format, allowZ = true) {
  return dt.isValid ? Formatter.create(Locale.create("en-US"), {
    allowZ,
    forceSimple: true
  }).formatDateTimeFromString(dt, format) : null;
}
function toISODate(o2, extended) {
  const longFormat = o2.c.year > 9999 || o2.c.year < 0;
  let c = "";
  if (longFormat && o2.c.year >= 0)
    c += "+";
  c += padStart(o2.c.year, longFormat ? 6 : 4);
  if (extended) {
    c += "-";
    c += padStart(o2.c.month);
    c += "-";
    c += padStart(o2.c.day);
  } else {
    c += padStart(o2.c.month);
    c += padStart(o2.c.day);
  }
  return c;
}
function toISOTime(o2, extended, suppressSeconds, suppressMilliseconds, includeOffset) {
  let c = padStart(o2.c.hour);
  if (extended) {
    c += ":";
    c += padStart(o2.c.minute);
    if (o2.c.second !== 0 || !suppressSeconds) {
      c += ":";
    }
  } else {
    c += padStart(o2.c.minute);
  }
  if (o2.c.second !== 0 || !suppressSeconds) {
    c += padStart(o2.c.second);
    if (o2.c.millisecond !== 0 || !suppressMilliseconds) {
      c += ".";
      c += padStart(o2.c.millisecond, 3);
    }
  }
  if (includeOffset) {
    if (o2.isOffsetFixed && o2.offset === 0) {
      c += "Z";
    } else if (o2.o < 0) {
      c += "-";
      c += padStart(Math.trunc(-o2.o / 60));
      c += ":";
      c += padStart(Math.trunc(-o2.o % 60));
    } else {
      c += "+";
      c += padStart(Math.trunc(o2.o / 60));
      c += ":";
      c += padStart(Math.trunc(o2.o % 60));
    }
  }
  return c;
}
const defaultUnitValues = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, defaultWeekUnitValues = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, defaultOrdinalUnitValues = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
};
const orderedUnits = ["year", "month", "day", "hour", "minute", "second", "millisecond"], orderedWeekUnits = [
  "weekYear",
  "weekNumber",
  "weekday",
  "hour",
  "minute",
  "second",
  "millisecond"
], orderedOrdinalUnits = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function normalizeUnit(unit) {
  const normalized = {
    year: "year",
    years: "year",
    month: "month",
    months: "month",
    day: "day",
    days: "day",
    hour: "hour",
    hours: "hour",
    minute: "minute",
    minutes: "minute",
    quarter: "quarter",
    quarters: "quarter",
    second: "second",
    seconds: "second",
    millisecond: "millisecond",
    milliseconds: "millisecond",
    weekday: "weekday",
    weekdays: "weekday",
    weeknumber: "weekNumber",
    weeksnumber: "weekNumber",
    weeknumbers: "weekNumber",
    weekyear: "weekYear",
    weekyears: "weekYear",
    ordinal: "ordinal"
  }[unit.toLowerCase()];
  if (!normalized)
    throw new InvalidUnitError(unit);
  return normalized;
}
function quickDT(obj, opts) {
  const zone = normalizeZone(opts.zone, Settings.defaultZone), loc = Locale.fromObject(opts), tsNow = Settings.now();
  let ts, o2;
  if (!isUndefined(obj.year)) {
    for (const u of orderedUnits) {
      if (isUndefined(obj[u])) {
        obj[u] = defaultUnitValues[u];
      }
    }
    const invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);
    if (invalid) {
      return DateTime.invalid(invalid);
    }
    const offsetProvis = zone.offset(tsNow);
    [ts, o2] = objToTS(obj, offsetProvis, zone);
  } else {
    ts = tsNow;
  }
  return new DateTime({ ts, zone, loc, o: o2 });
}
function diffRelative(start, end, opts) {
  const round = isUndefined(opts.round) ? true : opts.round, format = (c, unit) => {
    c = roundTo(c, round || opts.calendary ? 0 : 2, true);
    const formatter = end.loc.clone(opts).relFormatter(opts);
    return formatter.format(c, unit);
  }, differ = (unit) => {
    if (opts.calendary) {
      if (!end.hasSame(start, unit)) {
        return end.startOf(unit).diff(start.startOf(unit), unit).get(unit);
      } else
        return 0;
    } else {
      return end.diff(start, unit).get(unit);
    }
  };
  if (opts.unit) {
    return format(differ(opts.unit), opts.unit);
  }
  for (const unit of opts.units) {
    const count = differ(unit);
    if (Math.abs(count) >= 1) {
      return format(count, unit);
    }
  }
  return format(start > end ? -0 : 0, opts.units[opts.units.length - 1]);
}
function lastOpts(argList) {
  let opts = {}, args;
  if (argList.length > 0 && typeof argList[argList.length - 1] === "object") {
    opts = argList[argList.length - 1];
    args = Array.from(argList).slice(0, argList.length - 1);
  } else {
    args = Array.from(argList);
  }
  return [opts, args];
}
class DateTime {
  constructor(config2) {
    const zone = config2.zone || Settings.defaultZone;
    let invalid = config2.invalid || (Number.isNaN(config2.ts) ? new Invalid("invalid input") : null) || (!zone.isValid ? unsupportedZone(zone) : null);
    this.ts = isUndefined(config2.ts) ? Settings.now() : config2.ts;
    let c = null, o2 = null;
    if (!invalid) {
      const unchanged = config2.old && config2.old.ts === this.ts && config2.old.zone.equals(zone);
      if (unchanged) {
        [c, o2] = [config2.old.c, config2.old.o];
      } else {
        const ot = zone.offset(this.ts);
        c = tsToObj(this.ts, ot);
        invalid = Number.isNaN(c.year) ? new Invalid("invalid input") : null;
        c = invalid ? null : c;
        o2 = invalid ? null : ot;
      }
    }
    this._zone = zone;
    this.loc = config2.loc || Locale.create();
    this.invalid = invalid;
    this.weekData = null;
    this.c = c;
    this.o = o2;
    this.isLuxonDateTime = true;
  }
  static now() {
    return new DateTime({});
  }
  static local() {
    const [opts, args] = lastOpts(arguments), [year, month, day, hour, minute, second, millisecond] = args;
    return quickDT({ year, month, day, hour, minute, second, millisecond }, opts);
  }
  static utc() {
    const [opts, args] = lastOpts(arguments), [year, month, day, hour, minute, second, millisecond] = args;
    opts.zone = FixedOffsetZone.utcInstance;
    return quickDT({ year, month, day, hour, minute, second, millisecond }, opts);
  }
  static fromJSDate(date, options = {}) {
    const ts = isDate(date) ? date.valueOf() : NaN;
    if (Number.isNaN(ts)) {
      return DateTime.invalid("invalid input");
    }
    const zoneToUse = normalizeZone(options.zone, Settings.defaultZone);
    if (!zoneToUse.isValid) {
      return DateTime.invalid(unsupportedZone(zoneToUse));
    }
    return new DateTime({
      ts,
      zone: zoneToUse,
      loc: Locale.fromObject(options)
    });
  }
  static fromMillis(milliseconds, options = {}) {
    if (!isNumber(milliseconds)) {
      throw new InvalidArgumentError(`fromMillis requires a numerical input, but received a ${typeof milliseconds} with value ${milliseconds}`);
    } else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
      return DateTime.invalid("Timestamp out of range");
    } else {
      return new DateTime({
        ts: milliseconds,
        zone: normalizeZone(options.zone, Settings.defaultZone),
        loc: Locale.fromObject(options)
      });
    }
  }
  static fromSeconds(seconds, options = {}) {
    if (!isNumber(seconds)) {
      throw new InvalidArgumentError("fromSeconds requires a numerical input");
    } else {
      return new DateTime({
        ts: seconds * 1e3,
        zone: normalizeZone(options.zone, Settings.defaultZone),
        loc: Locale.fromObject(options)
      });
    }
  }
  static fromObject(obj, opts = {}) {
    obj = obj || {};
    const zoneToUse = normalizeZone(opts.zone, Settings.defaultZone);
    if (!zoneToUse.isValid) {
      return DateTime.invalid(unsupportedZone(zoneToUse));
    }
    const tsNow = Settings.now(), offsetProvis = !isUndefined(opts.specificOffset) ? opts.specificOffset : zoneToUse.offset(tsNow), normalized = normalizeObject(obj, normalizeUnit), containsOrdinal = !isUndefined(normalized.ordinal), containsGregorYear = !isUndefined(normalized.year), containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber, loc = Locale.fromObject(opts);
    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
    }
    if (containsGregorMD && containsOrdinal) {
      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
    }
    const useWeekData = definiteWeekDef || normalized.weekday && !containsGregor;
    let units, defaultValues, objNow = tsToObj(tsNow, offsetProvis);
    if (useWeekData) {
      units = orderedWeekUnits;
      defaultValues = defaultWeekUnitValues;
      objNow = gregorianToWeek(objNow);
    } else if (containsOrdinal) {
      units = orderedOrdinalUnits;
      defaultValues = defaultOrdinalUnitValues;
      objNow = gregorianToOrdinal(objNow);
    } else {
      units = orderedUnits;
      defaultValues = defaultUnitValues;
    }
    let foundFirst = false;
    for (const u of units) {
      const v = normalized[u];
      if (!isUndefined(v)) {
        foundFirst = true;
      } else if (foundFirst) {
        normalized[u] = defaultValues[u];
      } else {
        normalized[u] = objNow[u];
      }
    }
    const higherOrderInvalid = useWeekData ? hasInvalidWeekData(normalized) : containsOrdinal ? hasInvalidOrdinalData(normalized) : hasInvalidGregorianData(normalized), invalid = higherOrderInvalid || hasInvalidTimeData(normalized);
    if (invalid) {
      return DateTime.invalid(invalid);
    }
    const gregorian = useWeekData ? weekToGregorian(normalized) : containsOrdinal ? ordinalToGregorian(normalized) : normalized, [tsFinal, offsetFinal] = objToTS(gregorian, offsetProvis, zoneToUse), inst = new DateTime({
      ts: tsFinal,
      zone: zoneToUse,
      o: offsetFinal,
      loc
    });
    if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
      return DateTime.invalid("mismatched weekday", `you can't specify both a weekday of ${normalized.weekday} and a date of ${inst.toISO()}`);
    }
    return inst;
  }
  static fromISO(text, opts = {}) {
    const [vals, parsedZone] = parseISODate(text);
    return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text);
  }
  static fromRFC2822(text, opts = {}) {
    const [vals, parsedZone] = parseRFC2822Date(text);
    return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text);
  }
  static fromHTTP(text, opts = {}) {
    const [vals, parsedZone] = parseHTTPDate(text);
    return parseDataToDateTime(vals, parsedZone, opts, "HTTP", opts);
  }
  static fromFormat(text, fmt, opts = {}) {
    if (isUndefined(text) || isUndefined(fmt)) {
      throw new InvalidArgumentError("fromFormat requires an input string and a format");
    }
    const { locale = null, numberingSystem = null } = opts, localeToUse = Locale.fromOpts({
      locale,
      numberingSystem,
      defaultToEN: true
    }), [vals, parsedZone, specificOffset, invalid] = parseFromTokens(localeToUse, text, fmt);
    if (invalid) {
      return DateTime.invalid(invalid);
    } else {
      return parseDataToDateTime(vals, parsedZone, opts, `format ${fmt}`, text, specificOffset);
    }
  }
  static fromString(text, fmt, opts = {}) {
    return DateTime.fromFormat(text, fmt, opts);
  }
  static fromSQL(text, opts = {}) {
    const [vals, parsedZone] = parseSQL(text);
    return parseDataToDateTime(vals, parsedZone, opts, "SQL", text);
  }
  static invalid(reason, explanation = null) {
    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the DateTime is invalid");
    }
    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
    if (Settings.throwOnInvalid) {
      throw new InvalidDateTimeError(invalid);
    } else {
      return new DateTime({ invalid });
    }
  }
  static isDateTime(o2) {
    return o2 && o2.isLuxonDateTime || false;
  }
  get(unit) {
    return this[unit];
  }
  get isValid() {
    return this.invalid === null;
  }
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  get outputCalendar() {
    return this.isValid ? this.loc.outputCalendar : null;
  }
  get zone() {
    return this._zone;
  }
  get zoneName() {
    return this.isValid ? this.zone.name : null;
  }
  get year() {
    return this.isValid ? this.c.year : NaN;
  }
  get quarter() {
    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
  }
  get month() {
    return this.isValid ? this.c.month : NaN;
  }
  get day() {
    return this.isValid ? this.c.day : NaN;
  }
  get hour() {
    return this.isValid ? this.c.hour : NaN;
  }
  get minute() {
    return this.isValid ? this.c.minute : NaN;
  }
  get second() {
    return this.isValid ? this.c.second : NaN;
  }
  get millisecond() {
    return this.isValid ? this.c.millisecond : NaN;
  }
  get weekYear() {
    return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
  }
  get weekNumber() {
    return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
  }
  get weekday() {
    return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
  }
  get ordinal() {
    return this.isValid ? gregorianToOrdinal(this.c).ordinal : NaN;
  }
  get monthShort() {
    return this.isValid ? Info.months("short", { locObj: this.loc })[this.month - 1] : null;
  }
  get monthLong() {
    return this.isValid ? Info.months("long", { locObj: this.loc })[this.month - 1] : null;
  }
  get weekdayShort() {
    return this.isValid ? Info.weekdays("short", { locObj: this.loc })[this.weekday - 1] : null;
  }
  get weekdayLong() {
    return this.isValid ? Info.weekdays("long", { locObj: this.loc })[this.weekday - 1] : null;
  }
  get offset() {
    return this.isValid ? +this.o : NaN;
  }
  get offsetNameShort() {
    if (this.isValid) {
      return this.zone.offsetName(this.ts, {
        format: "short",
        locale: this.locale
      });
    } else {
      return null;
    }
  }
  get offsetNameLong() {
    if (this.isValid) {
      return this.zone.offsetName(this.ts, {
        format: "long",
        locale: this.locale
      });
    } else {
      return null;
    }
  }
  get isOffsetFixed() {
    return this.isValid ? this.zone.isUniversal : null;
  }
  get isInDST() {
    if (this.isOffsetFixed) {
      return false;
    } else {
      return this.offset > this.set({ month: 1 }).offset || this.offset > this.set({ month: 5 }).offset;
    }
  }
  get isInLeapYear() {
    return isLeapYear(this.year);
  }
  get daysInMonth() {
    return daysInMonth(this.year, this.month);
  }
  get daysInYear() {
    return this.isValid ? daysInYear(this.year) : NaN;
  }
  get weeksInWeekYear() {
    return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
  }
  resolvedLocaleOptions(opts = {}) {
    const { locale, numberingSystem, calendar } = Formatter.create(this.loc.clone(opts), opts).resolvedOptions(this);
    return { locale, numberingSystem, outputCalendar: calendar };
  }
  toUTC(offset2 = 0, opts = {}) {
    return this.setZone(FixedOffsetZone.instance(offset2), opts);
  }
  toLocal() {
    return this.setZone(Settings.defaultZone);
  }
  setZone(zone, { keepLocalTime = false, keepCalendarTime = false } = {}) {
    zone = normalizeZone(zone, Settings.defaultZone);
    if (zone.equals(this.zone)) {
      return this;
    } else if (!zone.isValid) {
      return DateTime.invalid(unsupportedZone(zone));
    } else {
      let newTS = this.ts;
      if (keepLocalTime || keepCalendarTime) {
        const offsetGuess = zone.offset(this.ts);
        const asObj = this.toObject();
        [newTS] = objToTS(asObj, offsetGuess, zone);
      }
      return clone(this, { ts: newTS, zone });
    }
  }
  reconfigure({ locale, numberingSystem, outputCalendar } = {}) {
    const loc = this.loc.clone({ locale, numberingSystem, outputCalendar });
    return clone(this, { loc });
  }
  setLocale(locale) {
    return this.reconfigure({ locale });
  }
  set(values) {
    if (!this.isValid)
      return this;
    const normalized = normalizeObject(values, normalizeUnit), settingWeekStuff = !isUndefined(normalized.weekYear) || !isUndefined(normalized.weekNumber) || !isUndefined(normalized.weekday), containsOrdinal = !isUndefined(normalized.ordinal), containsGregorYear = !isUndefined(normalized.year), containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber;
    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
    }
    if (containsGregorMD && containsOrdinal) {
      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
    }
    let mixed;
    if (settingWeekStuff) {
      mixed = weekToGregorian(__spreadValues(__spreadValues({}, gregorianToWeek(this.c)), normalized));
    } else if (!isUndefined(normalized.ordinal)) {
      mixed = ordinalToGregorian(__spreadValues(__spreadValues({}, gregorianToOrdinal(this.c)), normalized));
    } else {
      mixed = __spreadValues(__spreadValues({}, this.toObject()), normalized);
      if (isUndefined(normalized.day)) {
        mixed.day = Math.min(daysInMonth(mixed.year, mixed.month), mixed.day);
      }
    }
    const [ts, o2] = objToTS(mixed, this.o, this.zone);
    return clone(this, { ts, o: o2 });
  }
  plus(duration) {
    if (!this.isValid)
      return this;
    const dur = Duration.fromDurationLike(duration);
    return clone(this, adjustTime(this, dur));
  }
  minus(duration) {
    if (!this.isValid)
      return this;
    const dur = Duration.fromDurationLike(duration).negate();
    return clone(this, adjustTime(this, dur));
  }
  startOf(unit) {
    if (!this.isValid)
      return this;
    const o2 = {}, normalizedUnit = Duration.normalizeUnit(unit);
    switch (normalizedUnit) {
      case "years":
        o2.month = 1;
      case "quarters":
      case "months":
        o2.day = 1;
      case "weeks":
      case "days":
        o2.hour = 0;
      case "hours":
        o2.minute = 0;
      case "minutes":
        o2.second = 0;
      case "seconds":
        o2.millisecond = 0;
        break;
    }
    if (normalizedUnit === "weeks") {
      o2.weekday = 1;
    }
    if (normalizedUnit === "quarters") {
      const q = Math.ceil(this.month / 3);
      o2.month = (q - 1) * 3 + 1;
    }
    return this.set(o2);
  }
  endOf(unit) {
    return this.isValid ? this.plus({ [unit]: 1 }).startOf(unit).minus(1) : this;
  }
  toFormat(fmt, opts = {}) {
    return this.isValid ? Formatter.create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt) : INVALID;
  }
  toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
    return this.isValid ? Formatter.create(this.loc.clone(opts), formatOpts).formatDateTime(this) : INVALID;
  }
  toLocaleParts(opts = {}) {
    return this.isValid ? Formatter.create(this.loc.clone(opts), opts).formatDateTimeParts(this) : [];
  }
  toISO({
    format = "extended",
    suppressSeconds = false,
    suppressMilliseconds = false,
    includeOffset = true
  } = {}) {
    if (!this.isValid) {
      return null;
    }
    const ext = format === "extended";
    let c = toISODate(this, ext);
    c += "T";
    c += toISOTime(this, ext, suppressSeconds, suppressMilliseconds, includeOffset);
    return c;
  }
  toISODate({ format = "extended" } = {}) {
    if (!this.isValid) {
      return null;
    }
    return toISODate(this, format === "extended");
  }
  toISOWeekDate() {
    return toTechFormat(this, "kkkk-'W'WW-c");
  }
  toISOTime({
    suppressMilliseconds = false,
    suppressSeconds = false,
    includeOffset = true,
    includePrefix = false,
    format = "extended"
  } = {}) {
    if (!this.isValid) {
      return null;
    }
    let c = includePrefix ? "T" : "";
    return c + toISOTime(this, format === "extended", suppressSeconds, suppressMilliseconds, includeOffset);
  }
  toRFC2822() {
    return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
  }
  toHTTP() {
    return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  toSQLDate() {
    if (!this.isValid) {
      return null;
    }
    return toISODate(this, true);
  }
  toSQLTime({ includeOffset = true, includeZone = false, includeOffsetSpace = true } = {}) {
    let fmt = "HH:mm:ss.SSS";
    if (includeZone || includeOffset) {
      if (includeOffsetSpace) {
        fmt += " ";
      }
      if (includeZone) {
        fmt += "z";
      } else if (includeOffset) {
        fmt += "ZZ";
      }
    }
    return toTechFormat(this, fmt, true);
  }
  toSQL(opts = {}) {
    if (!this.isValid) {
      return null;
    }
    return `${this.toSQLDate()} ${this.toSQLTime(opts)}`;
  }
  toString() {
    return this.isValid ? this.toISO() : INVALID;
  }
  valueOf() {
    return this.toMillis();
  }
  toMillis() {
    return this.isValid ? this.ts : NaN;
  }
  toSeconds() {
    return this.isValid ? this.ts / 1e3 : NaN;
  }
  toUnixInteger() {
    return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
  }
  toJSON() {
    return this.toISO();
  }
  toBSON() {
    return this.toJSDate();
  }
  toObject(opts = {}) {
    if (!this.isValid)
      return {};
    const base = __spreadValues({}, this.c);
    if (opts.includeConfig) {
      base.outputCalendar = this.outputCalendar;
      base.numberingSystem = this.loc.numberingSystem;
      base.locale = this.loc.locale;
    }
    return base;
  }
  toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  }
  diff(otherDateTime, unit = "milliseconds", opts = {}) {
    if (!this.isValid || !otherDateTime.isValid) {
      return Duration.invalid("created by diffing an invalid DateTime");
    }
    const durOpts = __spreadValues({ locale: this.locale, numberingSystem: this.numberingSystem }, opts);
    const units = maybeArray(unit).map(Duration.normalizeUnit), otherIsLater = otherDateTime.valueOf() > this.valueOf(), earlier = otherIsLater ? this : otherDateTime, later = otherIsLater ? otherDateTime : this, diffed = diff(earlier, later, units, durOpts);
    return otherIsLater ? diffed.negate() : diffed;
  }
  diffNow(unit = "milliseconds", opts = {}) {
    return this.diff(DateTime.now(), unit, opts);
  }
  until(otherDateTime) {
    return this.isValid ? Interval.fromDateTimes(this, otherDateTime) : this;
  }
  hasSame(otherDateTime, unit) {
    if (!this.isValid)
      return false;
    const inputMs = otherDateTime.valueOf();
    const adjustedToZone = this.setZone(otherDateTime.zone, { keepLocalTime: true });
    return adjustedToZone.startOf(unit) <= inputMs && inputMs <= adjustedToZone.endOf(unit);
  }
  equals(other) {
    return this.isValid && other.isValid && this.valueOf() === other.valueOf() && this.zone.equals(other.zone) && this.loc.equals(other.loc);
  }
  toRelative(options = {}) {
    if (!this.isValid)
      return null;
    const base = options.base || DateTime.fromObject({}, { zone: this.zone }), padding = options.padding ? this < base ? -options.padding : options.padding : 0;
    let units = ["years", "months", "days", "hours", "minutes", "seconds"];
    let unit = options.unit;
    if (Array.isArray(options.unit)) {
      units = options.unit;
      unit = void 0;
    }
    return diffRelative(base, this.plus(padding), __spreadProps(__spreadValues({}, options), {
      numeric: "always",
      units,
      unit
    }));
  }
  toRelativeCalendar(options = {}) {
    if (!this.isValid)
      return null;
    return diffRelative(options.base || DateTime.fromObject({}, { zone: this.zone }), this, __spreadProps(__spreadValues({}, options), {
      numeric: "auto",
      units: ["years", "months", "days"],
      calendary: true
    }));
  }
  static min(...dateTimes) {
    if (!dateTimes.every(DateTime.isDateTime)) {
      throw new InvalidArgumentError("min requires all arguments be DateTimes");
    }
    return bestBy(dateTimes, (i) => i.valueOf(), Math.min);
  }
  static max(...dateTimes) {
    if (!dateTimes.every(DateTime.isDateTime)) {
      throw new InvalidArgumentError("max requires all arguments be DateTimes");
    }
    return bestBy(dateTimes, (i) => i.valueOf(), Math.max);
  }
  static fromFormatExplain(text, fmt, options = {}) {
    const { locale = null, numberingSystem = null } = options, localeToUse = Locale.fromOpts({
      locale,
      numberingSystem,
      defaultToEN: true
    });
    return explainFromTokens(localeToUse, text, fmt);
  }
  static fromStringExplain(text, fmt, options = {}) {
    return DateTime.fromFormatExplain(text, fmt, options);
  }
  static get DATE_SHORT() {
    return DATE_SHORT;
  }
  static get DATE_MED() {
    return DATE_MED;
  }
  static get DATE_MED_WITH_WEEKDAY() {
    return DATE_MED_WITH_WEEKDAY;
  }
  static get DATE_FULL() {
    return DATE_FULL;
  }
  static get DATE_HUGE() {
    return DATE_HUGE;
  }
  static get TIME_SIMPLE() {
    return TIME_SIMPLE;
  }
  static get TIME_WITH_SECONDS() {
    return TIME_WITH_SECONDS;
  }
  static get TIME_WITH_SHORT_OFFSET() {
    return TIME_WITH_SHORT_OFFSET;
  }
  static get TIME_WITH_LONG_OFFSET() {
    return TIME_WITH_LONG_OFFSET;
  }
  static get TIME_24_SIMPLE() {
    return TIME_24_SIMPLE;
  }
  static get TIME_24_WITH_SECONDS() {
    return TIME_24_WITH_SECONDS;
  }
  static get TIME_24_WITH_SHORT_OFFSET() {
    return TIME_24_WITH_SHORT_OFFSET;
  }
  static get TIME_24_WITH_LONG_OFFSET() {
    return TIME_24_WITH_LONG_OFFSET;
  }
  static get DATETIME_SHORT() {
    return DATETIME_SHORT;
  }
  static get DATETIME_SHORT_WITH_SECONDS() {
    return DATETIME_SHORT_WITH_SECONDS;
  }
  static get DATETIME_MED() {
    return DATETIME_MED;
  }
  static get DATETIME_MED_WITH_SECONDS() {
    return DATETIME_MED_WITH_SECONDS;
  }
  static get DATETIME_MED_WITH_WEEKDAY() {
    return DATETIME_MED_WITH_WEEKDAY;
  }
  static get DATETIME_FULL() {
    return DATETIME_FULL;
  }
  static get DATETIME_FULL_WITH_SECONDS() {
    return DATETIME_FULL_WITH_SECONDS;
  }
  static get DATETIME_HUGE() {
    return DATETIME_HUGE;
  }
  static get DATETIME_HUGE_WITH_SECONDS() {
    return DATETIME_HUGE_WITH_SECONDS;
  }
}
function friendlyDateTime(dateTimeish) {
  if (DateTime.isDateTime(dateTimeish)) {
    return dateTimeish;
  } else if (dateTimeish && dateTimeish.valueOf && isNumber(dateTimeish.valueOf())) {
    return DateTime.fromJSDate(dateTimeish);
  } else if (dateTimeish && typeof dateTimeish === "object") {
    return DateTime.fromObject(dateTimeish);
  } else {
    throw new InvalidArgumentError(`Unknown datetime argument: ${dateTimeish}, of type ${typeof dateTimeish}`);
  }
}
/*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
var AuthenticationDetails = /* @__PURE__ */ function() {
  function AuthenticationDetails2(data) {
    var _ref = data || {}, ValidationData = _ref.ValidationData, Username = _ref.Username, Password = _ref.Password, AuthParameters = _ref.AuthParameters, ClientMetadata = _ref.ClientMetadata;
    this.validationData = ValidationData || {};
    this.authParameters = AuthParameters || {};
    this.clientMetadata = ClientMetadata || {};
    this.username = Username;
    this.password = Password;
  }
  var _proto = AuthenticationDetails2.prototype;
  _proto.getUsername = function getUsername() {
    return this.username;
  };
  _proto.getPassword = function getPassword() {
    return this.password;
  };
  _proto.getValidationData = function getValidationData() {
    return this.validationData;
  };
  _proto.getAuthParameters = function getAuthParameters() {
    return this.authParameters;
  };
  _proto.getClientMetadata = function getClientMetadata() {
    return this.clientMetadata;
  };
  return AuthenticationDetails2;
}();
var buffer = {};
var base64Js = {};
base64Js.byteLength = byteLength;
base64Js.toByteArray = toByteArray;
base64Js.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var code$1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var i = 0, len = code$1.length; i < len; ++i) {
  lookup[i] = code$1[i];
  revLookup[code$1.charCodeAt(i)] = i;
}
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  var validLen = b64.indexOf("=");
  if (validLen === -1)
    validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
}
function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0;
  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
  var i;
  for (i = 0; i < len; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 255;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (uint8[i + 2] & 255);
    output.push(tripletToBase64(tmp));
  }
  return output.join("");
}
function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var parts = [];
  var maxChunkLength = 16383;
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
  }
  return parts.join("");
}
var ieee754 = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ieee754.read = function(buffer2, offset2, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s2 = buffer2[offset2 + i];
  i += d;
  e = s2 & (1 << -nBits) - 1;
  s2 >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer2[offset2 + i], i += d, nBits -= 8) {
  }
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer2[offset2 + i], i += d, nBits -= 8) {
  }
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s2 ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s2 ? -1 : 1) * m * Math.pow(2, e - mLen);
};
ieee754.write = function(buffer2, value, offset2, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s2 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer2[offset2 + i] = m & 255, i += d, m /= 256, mLen -= 8) {
  }
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer2[offset2 + i] = e & 255, i += d, e /= 256, eLen -= 8) {
  }
  buffer2[offset2 + i - d] |= s2 * 128;
};
var toString = {}.toString;
var isarray = Array.isArray || function(arr) {
  return toString.call(arr) == "[object Array]";
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
(function(exports) {
  var base64 = base64Js;
  var ieee754$1 = ieee754;
  var isArray = isarray;
  exports.Buffer = Buffer2;
  exports.SlowBuffer = SlowBuffer;
  exports.INSPECT_MAX_BYTES = 50;
  Buffer2.TYPED_ARRAY_SUPPORT = commonjsGlobal.TYPED_ARRAY_SUPPORT !== void 0 ? commonjsGlobal.TYPED_ARRAY_SUPPORT : typedArraySupport();
  exports.kMaxLength = kMaxLength();
  function typedArraySupport() {
    try {
      var arr = new Uint8Array(1);
      arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
        return 42;
      } };
      return arr.foo() === 42 && typeof arr.subarray === "function" && arr.subarray(1, 1).byteLength === 0;
    } catch (e) {
      return false;
    }
  }
  function kMaxLength() {
    return Buffer2.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
  }
  function createBuffer(that, length) {
    if (kMaxLength() < length) {
      throw new RangeError("Invalid typed array length");
    }
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      that = new Uint8Array(length);
      that.__proto__ = Buffer2.prototype;
    } else {
      if (that === null) {
        that = new Buffer2(length);
      }
      that.length = length;
    }
    return that;
  }
  function Buffer2(arg, encodingOrOffset, length) {
    if (!Buffer2.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer2)) {
      return new Buffer2(arg, encodingOrOffset, length);
    }
    if (typeof arg === "number") {
      if (typeof encodingOrOffset === "string") {
        throw new Error("If encoding is specified then the first argument must be a string");
      }
      return allocUnsafe(this, arg);
    }
    return from(this, arg, encodingOrOffset, length);
  }
  Buffer2.poolSize = 8192;
  Buffer2._augment = function(arr) {
    arr.__proto__ = Buffer2.prototype;
    return arr;
  };
  function from(that, value, encodingOrOffset, length) {
    if (typeof value === "number") {
      throw new TypeError('"value" argument must not be a number');
    }
    if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
      return fromArrayBuffer(that, value, encodingOrOffset, length);
    }
    if (typeof value === "string") {
      return fromString(that, value, encodingOrOffset);
    }
    return fromObject(that, value);
  }
  Buffer2.from = function(value, encodingOrOffset, length) {
    return from(null, value, encodingOrOffset, length);
  };
  if (Buffer2.TYPED_ARRAY_SUPPORT) {
    Buffer2.prototype.__proto__ = Uint8Array.prototype;
    Buffer2.__proto__ = Uint8Array;
    if (typeof Symbol !== "undefined" && Symbol.species && Buffer2[Symbol.species] === Buffer2) {
      Object.defineProperty(Buffer2, Symbol.species, {
        value: null,
        configurable: true
      });
    }
  }
  function assertSize(size) {
    if (typeof size !== "number") {
      throw new TypeError('"size" argument must be a number');
    } else if (size < 0) {
      throw new RangeError('"size" argument must not be negative');
    }
  }
  function alloc(that, size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(that, size);
    }
    if (fill !== void 0) {
      return typeof encoding === "string" ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
    }
    return createBuffer(that, size);
  }
  Buffer2.alloc = function(size, fill, encoding) {
    return alloc(null, size, fill, encoding);
  };
  function allocUnsafe(that, size) {
    assertSize(size);
    that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
    if (!Buffer2.TYPED_ARRAY_SUPPORT) {
      for (var i = 0; i < size; ++i) {
        that[i] = 0;
      }
    }
    return that;
  }
  Buffer2.allocUnsafe = function(size) {
    return allocUnsafe(null, size);
  };
  Buffer2.allocUnsafeSlow = function(size) {
    return allocUnsafe(null, size);
  };
  function fromString(that, string, encoding) {
    if (typeof encoding !== "string" || encoding === "") {
      encoding = "utf8";
    }
    if (!Buffer2.isEncoding(encoding)) {
      throw new TypeError('"encoding" must be a valid string encoding');
    }
    var length = byteLength2(string, encoding) | 0;
    that = createBuffer(that, length);
    var actual = that.write(string, encoding);
    if (actual !== length) {
      that = that.slice(0, actual);
    }
    return that;
  }
  function fromArrayLike(that, array) {
    var length = array.length < 0 ? 0 : checked(array.length) | 0;
    that = createBuffer(that, length);
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that;
  }
  function fromArrayBuffer(that, array, byteOffset, length) {
    array.byteLength;
    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError("'offset' is out of bounds");
    }
    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError("'length' is out of bounds");
    }
    if (byteOffset === void 0 && length === void 0) {
      array = new Uint8Array(array);
    } else if (length === void 0) {
      array = new Uint8Array(array, byteOffset);
    } else {
      array = new Uint8Array(array, byteOffset, length);
    }
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      that = array;
      that.__proto__ = Buffer2.prototype;
    } else {
      that = fromArrayLike(that, array);
    }
    return that;
  }
  function fromObject(that, obj) {
    if (Buffer2.isBuffer(obj)) {
      var len = checked(obj.length) | 0;
      that = createBuffer(that, len);
      if (that.length === 0) {
        return that;
      }
      obj.copy(that, 0, 0, len);
      return that;
    }
    if (obj) {
      if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
        if (typeof obj.length !== "number" || isnan(obj.length)) {
          return createBuffer(that, 0);
        }
        return fromArrayLike(that, obj);
      }
      if (obj.type === "Buffer" && isArray(obj.data)) {
        return fromArrayLike(that, obj.data);
      }
    }
    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
  }
  function checked(length) {
    if (length >= kMaxLength()) {
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
    }
    return length | 0;
  }
  function SlowBuffer(length) {
    if (+length != length) {
      length = 0;
    }
    return Buffer2.alloc(+length);
  }
  Buffer2.isBuffer = function isBuffer(b) {
    return !!(b != null && b._isBuffer);
  };
  Buffer2.compare = function compare(a, b) {
    if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
      throw new TypeError("Arguments must be Buffers");
    }
    if (a === b)
      return 0;
    var x = a.length;
    var y = b.length;
    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
      }
    }
    if (x < y)
      return -1;
    if (y < x)
      return 1;
    return 0;
  };
  Buffer2.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  Buffer2.concat = function concat(list, length) {
    if (!isArray(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    if (list.length === 0) {
      return Buffer2.alloc(0);
    }
    var i;
    if (length === void 0) {
      length = 0;
      for (i = 0; i < list.length; ++i) {
        length += list[i].length;
      }
    }
    var buffer2 = Buffer2.allocUnsafe(length);
    var pos = 0;
    for (i = 0; i < list.length; ++i) {
      var buf = list[i];
      if (!Buffer2.isBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      buf.copy(buffer2, pos);
      pos += buf.length;
    }
    return buffer2;
  };
  function byteLength2(string, encoding) {
    if (Buffer2.isBuffer(string)) {
      return string.length;
    }
    if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
      return string.byteLength;
    }
    if (typeof string !== "string") {
      string = "" + string;
    }
    var len = string.length;
    if (len === 0)
      return 0;
    var loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "ascii":
        case "latin1":
        case "binary":
          return len;
        case "utf8":
        case "utf-8":
        case void 0:
          return utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return len * 2;
        case "hex":
          return len >>> 1;
        case "base64":
          return base64ToBytes(string).length;
        default:
          if (loweredCase)
            return utf8ToBytes(string).length;
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer2.byteLength = byteLength2;
  function slowToString(encoding, start, end) {
    var loweredCase = false;
    if (start === void 0 || start < 0) {
      start = 0;
    }
    if (start > this.length) {
      return "";
    }
    if (end === void 0 || end > this.length) {
      end = this.length;
    }
    if (end <= 0) {
      return "";
    }
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
      return "";
    }
    if (!encoding)
      encoding = "utf8";
    while (true) {
      switch (encoding) {
        case "hex":
          return hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
          return utf8Slice(this, start, end);
        case "ascii":
          return asciiSlice(this, start, end);
        case "latin1":
        case "binary":
          return latin1Slice(this, start, end);
        case "base64":
          return base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return utf16leSlice(this, start, end);
        default:
          if (loweredCase)
            throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer2.prototype._isBuffer = true;
  function swap(b, n2, m) {
    var i = b[n2];
    b[n2] = b[m];
    b[m] = i;
  }
  Buffer2.prototype.swap16 = function swap16() {
    var len = this.length;
    if (len % 2 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    }
    for (var i = 0; i < len; i += 2) {
      swap(this, i, i + 1);
    }
    return this;
  };
  Buffer2.prototype.swap32 = function swap32() {
    var len = this.length;
    if (len % 4 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    }
    for (var i = 0; i < len; i += 4) {
      swap(this, i, i + 3);
      swap(this, i + 1, i + 2);
    }
    return this;
  };
  Buffer2.prototype.swap64 = function swap64() {
    var len = this.length;
    if (len % 8 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    }
    for (var i = 0; i < len; i += 8) {
      swap(this, i, i + 7);
      swap(this, i + 1, i + 6);
      swap(this, i + 2, i + 5);
      swap(this, i + 3, i + 4);
    }
    return this;
  };
  Buffer2.prototype.toString = function toString2() {
    var length = this.length | 0;
    if (length === 0)
      return "";
    if (arguments.length === 0)
      return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
  };
  Buffer2.prototype.equals = function equals(b) {
    if (!Buffer2.isBuffer(b))
      throw new TypeError("Argument must be a Buffer");
    if (this === b)
      return true;
    return Buffer2.compare(this, b) === 0;
  };
  Buffer2.prototype.inspect = function inspect() {
    var str = "";
    var max = exports.INSPECT_MAX_BYTES;
    if (this.length > 0) {
      str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
      if (this.length > max)
        str += " ... ";
    }
    return "<Buffer " + str + ">";
  };
  Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (!Buffer2.isBuffer(target)) {
      throw new TypeError("Argument must be a Buffer");
    }
    if (start === void 0) {
      start = 0;
    }
    if (end === void 0) {
      end = target ? target.length : 0;
    }
    if (thisStart === void 0) {
      thisStart = 0;
    }
    if (thisEnd === void 0) {
      thisEnd = this.length;
    }
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError("out of range index");
    }
    if (thisStart >= thisEnd && start >= end) {
      return 0;
    }
    if (thisStart >= thisEnd) {
      return -1;
    }
    if (start >= end) {
      return 1;
    }
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target)
      return 0;
    var x = thisEnd - thisStart;
    var y = end - start;
    var len = Math.min(x, y);
    var thisCopy = this.slice(thisStart, thisEnd);
    var targetCopy = target.slice(start, end);
    for (var i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break;
      }
    }
    if (x < y)
      return -1;
    if (y < x)
      return 1;
    return 0;
  };
  function bidirectionalIndexOf(buffer2, val, byteOffset, encoding, dir) {
    if (buffer2.length === 0)
      return -1;
    if (typeof byteOffset === "string") {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 2147483647) {
      byteOffset = 2147483647;
    } else if (byteOffset < -2147483648) {
      byteOffset = -2147483648;
    }
    byteOffset = +byteOffset;
    if (isNaN(byteOffset)) {
      byteOffset = dir ? 0 : buffer2.length - 1;
    }
    if (byteOffset < 0)
      byteOffset = buffer2.length + byteOffset;
    if (byteOffset >= buffer2.length) {
      if (dir)
        return -1;
      else
        byteOffset = buffer2.length - 1;
    } else if (byteOffset < 0) {
      if (dir)
        byteOffset = 0;
      else
        return -1;
    }
    if (typeof val === "string") {
      val = Buffer2.from(val, encoding);
    }
    if (Buffer2.isBuffer(val)) {
      if (val.length === 0) {
        return -1;
      }
      return arrayIndexOf(buffer2, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
      val = val & 255;
      if (Buffer2.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer2, val, byteOffset);
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer2, val, byteOffset);
        }
      }
      return arrayIndexOf(buffer2, [val], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
  }
  function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    var indexSize = 1;
    var arrLength = arr.length;
    var valLength = val.length;
    if (encoding !== void 0) {
      encoding = String(encoding).toLowerCase();
      if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
        if (arr.length < 2 || val.length < 2) {
          return -1;
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }
    function read(buf, i2) {
      if (indexSize === 1) {
        return buf[i2];
      } else {
        return buf.readUInt16BE(i2 * indexSize);
      }
    }
    var i;
    if (dir) {
      var foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1)
            foundIndex = i;
          if (i - foundIndex + 1 === valLength)
            return foundIndex * indexSize;
        } else {
          if (foundIndex !== -1)
            i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength)
        byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        var found = true;
        for (var j = 0; j < valLength; j++) {
          if (read(arr, i + j) !== read(val, j)) {
            found = false;
            break;
          }
        }
        if (found)
          return i;
      }
    }
    return -1;
  }
  Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
  };
  Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
  };
  Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
  };
  function hexWrite(buf, string, offset2, length) {
    offset2 = Number(offset2) || 0;
    var remaining = buf.length - offset2;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }
    var strLen = string.length;
    if (strLen % 2 !== 0)
      throw new TypeError("Invalid hex string");
    if (length > strLen / 2) {
      length = strLen / 2;
    }
    for (var i = 0; i < length; ++i) {
      var parsed = parseInt(string.substr(i * 2, 2), 16);
      if (isNaN(parsed))
        return i;
      buf[offset2 + i] = parsed;
    }
    return i;
  }
  function utf8Write(buf, string, offset2, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset2), buf, offset2, length);
  }
  function asciiWrite(buf, string, offset2, length) {
    return blitBuffer(asciiToBytes(string), buf, offset2, length);
  }
  function latin1Write(buf, string, offset2, length) {
    return asciiWrite(buf, string, offset2, length);
  }
  function base64Write(buf, string, offset2, length) {
    return blitBuffer(base64ToBytes(string), buf, offset2, length);
  }
  function ucs2Write(buf, string, offset2, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset2), buf, offset2, length);
  }
  Buffer2.prototype.write = function write(string, offset2, length, encoding) {
    if (offset2 === void 0) {
      encoding = "utf8";
      length = this.length;
      offset2 = 0;
    } else if (length === void 0 && typeof offset2 === "string") {
      encoding = offset2;
      length = this.length;
      offset2 = 0;
    } else if (isFinite(offset2)) {
      offset2 = offset2 | 0;
      if (isFinite(length)) {
        length = length | 0;
        if (encoding === void 0)
          encoding = "utf8";
      } else {
        encoding = length;
        length = void 0;
      }
    } else {
      throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    }
    var remaining = this.length - offset2;
    if (length === void 0 || length > remaining)
      length = remaining;
    if (string.length > 0 && (length < 0 || offset2 < 0) || offset2 > this.length) {
      throw new RangeError("Attempt to write outside buffer bounds");
    }
    if (!encoding)
      encoding = "utf8";
    var loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "hex":
          return hexWrite(this, string, offset2, length);
        case "utf8":
        case "utf-8":
          return utf8Write(this, string, offset2, length);
        case "ascii":
          return asciiWrite(this, string, offset2, length);
        case "latin1":
        case "binary":
          return latin1Write(this, string, offset2, length);
        case "base64":
          return base64Write(this, string, offset2, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ucs2Write(this, string, offset2, length);
        default:
          if (loweredCase)
            throw new TypeError("Unknown encoding: " + encoding);
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };
  Buffer2.prototype.toJSON = function toJSON() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64.fromByteArray(buf);
    } else {
      return base64.fromByteArray(buf.slice(start, end));
    }
  }
  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    var res = [];
    var i = start;
    while (i < end) {
      var firstByte = buf[i];
      var codePoint = null;
      var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (i + bytesPerSequence <= end) {
        var secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
              if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint;
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        res.push(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      res.push(codePoint);
      i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
  }
  var MAX_ARGUMENTS_LENGTH = 4096;
  function decodeCodePointsArray(codePoints) {
    var len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints);
    }
    var res = "";
    var i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
    }
    return res;
  }
  function asciiSlice(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 127);
    }
    return ret;
  }
  function latin1Slice(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret;
  }
  function hexSlice(buf, start, end) {
    var len = buf.length;
    if (!start || start < 0)
      start = 0;
    if (!end || end < 0 || end > len)
      end = len;
    var out = "";
    for (var i = start; i < end; ++i) {
      out += toHex(buf[i]);
    }
    return out;
  }
  function utf16leSlice(buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = "";
    for (var i = 0; i < bytes.length; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
  }
  Buffer2.prototype.slice = function slice2(start, end) {
    var len = this.length;
    start = ~~start;
    end = end === void 0 ? len : ~~end;
    if (start < 0) {
      start += len;
      if (start < 0)
        start = 0;
    } else if (start > len) {
      start = len;
    }
    if (end < 0) {
      end += len;
      if (end < 0)
        end = 0;
    } else if (end > len) {
      end = len;
    }
    if (end < start)
      end = start;
    var newBuf;
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      newBuf = this.subarray(start, end);
      newBuf.__proto__ = Buffer2.prototype;
    } else {
      var sliceLen = end - start;
      newBuf = new Buffer2(sliceLen, void 0);
      for (var i = 0; i < sliceLen; ++i) {
        newBuf[i] = this[i + start];
      }
    }
    return newBuf;
  };
  function checkOffset(offset2, ext, length) {
    if (offset2 % 1 !== 0 || offset2 < 0)
      throw new RangeError("offset is not uint");
    if (offset2 + ext > length)
      throw new RangeError("Trying to access beyond buffer length");
  }
  Buffer2.prototype.readUIntLE = function readUIntLE(offset2, byteLength3, noAssert) {
    offset2 = offset2 | 0;
    byteLength3 = byteLength3 | 0;
    if (!noAssert)
      checkOffset(offset2, byteLength3, this.length);
    var val = this[offset2];
    var mul = 1;
    var i = 0;
    while (++i < byteLength3 && (mul *= 256)) {
      val += this[offset2 + i] * mul;
    }
    return val;
  };
  Buffer2.prototype.readUIntBE = function readUIntBE(offset2, byteLength3, noAssert) {
    offset2 = offset2 | 0;
    byteLength3 = byteLength3 | 0;
    if (!noAssert) {
      checkOffset(offset2, byteLength3, this.length);
    }
    var val = this[offset2 + --byteLength3];
    var mul = 1;
    while (byteLength3 > 0 && (mul *= 256)) {
      val += this[offset2 + --byteLength3] * mul;
    }
    return val;
  };
  Buffer2.prototype.readUInt8 = function readUInt8(offset2, noAssert) {
    if (!noAssert)
      checkOffset(offset2, 1, this.length);
    return this[offset2];
  };
  Buffer2.prototype.readUInt16LE = function readUInt16LE(offset2, noAssert) {
    if (!noAssert)
      checkOffset(offset2, 2, this.length);
    return this[offset2] | this[offset2 + 1] << 8;
  };
  Buffer2.prototype.readUInt16BE = function readUInt16BE(offset2, noAssert) {
    if (!noAssert)
      checkOffset(offset2, 2, this.length);
    return this[offset2] << 8 | this[offset2 + 1];
  };
  Buffer2.prototype.readUInt32LE = function readUInt32LE(offset2, noAssert) {
    if (!noAssert)
      checkOffset(offset2, 4, this.length);
    return (this[offset2] | this[offset2 + 1] << 8 | this[offset2 + 2] << 16) + this[offset2 + 3] * 16777216;
  };
  Buffer2.prototype.readUInt32BE = function readUInt32BE(offset2, noAssert) {
    if (!noAssert)
      checkOffset(offset2, 4, this.length);
    return this[offset2] * 16777216 + (this[offset2 + 1] << 16 | this[offset2 + 2] << 8 | this[offset2 + 3]);
  };
  Buffer2.prototype.readIntLE = function readIntLE(offset2, byteLength3, noAssert) {
    offset2 = offset2 | 0;
    byteLength3 = byteLength3 | 0;
    if (!noAssert)
      checkOffset(offset2, byteLength3, this.length);
    var val = this[offset2];
    var mul = 1;
    var i = 0;
    while (++i < byteLength3 && (mul *= 256)) {
      val += this[offset2 + i] * mul;
    }
    mul *= 128;
    if (val >= mul)
      val -= Math.pow(2, 8 * byteLength3);
    return val;
  };
  Buffer2.prototype.readIntBE = function readIntBE(offset2, byteLength3, noAssert) {
    offset2 = offset2 | 0;
    byteLength3 = byteLength3 | 0;
    if (!noAssert)
      checkOffset(offset2, byteLength3, this.length);
    var i = byteLength3;
    var mul = 1;
    var val = this[offset2 + --i];
    while (i > 0 && (mul *= 256)) {
      val += this[offset2 + --i] * mul;
    }
    mul *= 128;
    if (val >= mul)
      val -= Math.pow(2, 8 * byteLength3);
    return val;
  };
  Buffer2.prototype.readInt8 = function readInt8(offset2, noAssert) {
    if (!noAssert)
      checkOffset(offset2, 1, this.length);
    if (!(this[offset2] & 128))
      return this[offset2];
    return (255 - this[offset2] + 1) * -1;
  };
  Buffer2.prototype.readInt16LE = function readInt16LE(offset2, noAssert) {
    if (!noAssert)
      checkOffset(offset2, 2, this.length);
    var val = this[offset2] | this[offset2 + 1] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer2.prototype.readInt16BE = function readInt16BE(offset2, noAssert) {
    if (!noAssert)
      checkOffset(offset2, 2, this.length);
    var val = this[offset2 + 1] | this[offset2] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer2.prototype.readInt32LE = function readInt32LE(offset2, noAssert) {
    if (!noAssert)
      checkOffset(offset2, 4, this.length);
    return this[offset2] | this[offset2 + 1] << 8 | this[offset2 + 2] << 16 | this[offset2 + 3] << 24;
  };
  Buffer2.prototype.readInt32BE = function readInt32BE(offset2, noAssert) {
    if (!noAssert)
      checkOffset(offset2, 4, this.length);
    return this[offset2] << 24 | this[offset2 + 1] << 16 | this[offset2 + 2] << 8 | this[offset2 + 3];
  };
  Buffer2.prototype.readFloatLE = function readFloatLE(offset2, noAssert) {
    if (!noAssert)
      checkOffset(offset2, 4, this.length);
    return ieee754$1.read(this, offset2, true, 23, 4);
  };
  Buffer2.prototype.readFloatBE = function readFloatBE(offset2, noAssert) {
    if (!noAssert)
      checkOffset(offset2, 4, this.length);
    return ieee754$1.read(this, offset2, false, 23, 4);
  };
  Buffer2.prototype.readDoubleLE = function readDoubleLE(offset2, noAssert) {
    if (!noAssert)
      checkOffset(offset2, 8, this.length);
    return ieee754$1.read(this, offset2, true, 52, 8);
  };
  Buffer2.prototype.readDoubleBE = function readDoubleBE(offset2, noAssert) {
    if (!noAssert)
      checkOffset(offset2, 8, this.length);
    return ieee754$1.read(this, offset2, false, 52, 8);
  };
  function checkInt(buf, value, offset2, ext, max, min) {
    if (!Buffer2.isBuffer(buf))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min)
      throw new RangeError('"value" argument is out of bounds');
    if (offset2 + ext > buf.length)
      throw new RangeError("Index out of range");
  }
  Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset2, byteLength3, noAssert) {
    value = +value;
    offset2 = offset2 | 0;
    byteLength3 = byteLength3 | 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
      checkInt(this, value, offset2, byteLength3, maxBytes, 0);
    }
    var mul = 1;
    var i = 0;
    this[offset2] = value & 255;
    while (++i < byteLength3 && (mul *= 256)) {
      this[offset2 + i] = value / mul & 255;
    }
    return offset2 + byteLength3;
  };
  Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset2, byteLength3, noAssert) {
    value = +value;
    offset2 = offset2 | 0;
    byteLength3 = byteLength3 | 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength3) - 1;
      checkInt(this, value, offset2, byteLength3, maxBytes, 0);
    }
    var i = byteLength3 - 1;
    var mul = 1;
    this[offset2 + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      this[offset2 + i] = value / mul & 255;
    }
    return offset2 + byteLength3;
  };
  Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset2, noAssert) {
    value = +value;
    offset2 = offset2 | 0;
    if (!noAssert)
      checkInt(this, value, offset2, 1, 255, 0);
    if (!Buffer2.TYPED_ARRAY_SUPPORT)
      value = Math.floor(value);
    this[offset2] = value & 255;
    return offset2 + 1;
  };
  function objectWriteUInt16(buf, value, offset2, littleEndian) {
    if (value < 0)
      value = 65535 + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset2, 2); i < j; ++i) {
      buf[offset2 + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
    }
  }
  Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset2, noAssert) {
    value = +value;
    offset2 = offset2 | 0;
    if (!noAssert)
      checkInt(this, value, offset2, 2, 65535, 0);
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      this[offset2] = value & 255;
      this[offset2 + 1] = value >>> 8;
    } else {
      objectWriteUInt16(this, value, offset2, true);
    }
    return offset2 + 2;
  };
  Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset2, noAssert) {
    value = +value;
    offset2 = offset2 | 0;
    if (!noAssert)
      checkInt(this, value, offset2, 2, 65535, 0);
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      this[offset2] = value >>> 8;
      this[offset2 + 1] = value & 255;
    } else {
      objectWriteUInt16(this, value, offset2, false);
    }
    return offset2 + 2;
  };
  function objectWriteUInt32(buf, value, offset2, littleEndian) {
    if (value < 0)
      value = 4294967295 + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset2, 4); i < j; ++i) {
      buf[offset2 + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 255;
    }
  }
  Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset2, noAssert) {
    value = +value;
    offset2 = offset2 | 0;
    if (!noAssert)
      checkInt(this, value, offset2, 4, 4294967295, 0);
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      this[offset2 + 3] = value >>> 24;
      this[offset2 + 2] = value >>> 16;
      this[offset2 + 1] = value >>> 8;
      this[offset2] = value & 255;
    } else {
      objectWriteUInt32(this, value, offset2, true);
    }
    return offset2 + 4;
  };
  Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset2, noAssert) {
    value = +value;
    offset2 = offset2 | 0;
    if (!noAssert)
      checkInt(this, value, offset2, 4, 4294967295, 0);
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      this[offset2] = value >>> 24;
      this[offset2 + 1] = value >>> 16;
      this[offset2 + 2] = value >>> 8;
      this[offset2 + 3] = value & 255;
    } else {
      objectWriteUInt32(this, value, offset2, false);
    }
    return offset2 + 4;
  };
  Buffer2.prototype.writeIntLE = function writeIntLE(value, offset2, byteLength3, noAssert) {
    value = +value;
    offset2 = offset2 | 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength3 - 1);
      checkInt(this, value, offset2, byteLength3, limit - 1, -limit);
    }
    var i = 0;
    var mul = 1;
    var sub = 0;
    this[offset2] = value & 255;
    while (++i < byteLength3 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset2 + i - 1] !== 0) {
        sub = 1;
      }
      this[offset2 + i] = (value / mul >> 0) - sub & 255;
    }
    return offset2 + byteLength3;
  };
  Buffer2.prototype.writeIntBE = function writeIntBE(value, offset2, byteLength3, noAssert) {
    value = +value;
    offset2 = offset2 | 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength3 - 1);
      checkInt(this, value, offset2, byteLength3, limit - 1, -limit);
    }
    var i = byteLength3 - 1;
    var mul = 1;
    var sub = 0;
    this[offset2 + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset2 + i + 1] !== 0) {
        sub = 1;
      }
      this[offset2 + i] = (value / mul >> 0) - sub & 255;
    }
    return offset2 + byteLength3;
  };
  Buffer2.prototype.writeInt8 = function writeInt8(value, offset2, noAssert) {
    value = +value;
    offset2 = offset2 | 0;
    if (!noAssert)
      checkInt(this, value, offset2, 1, 127, -128);
    if (!Buffer2.TYPED_ARRAY_SUPPORT)
      value = Math.floor(value);
    if (value < 0)
      value = 255 + value + 1;
    this[offset2] = value & 255;
    return offset2 + 1;
  };
  Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset2, noAssert) {
    value = +value;
    offset2 = offset2 | 0;
    if (!noAssert)
      checkInt(this, value, offset2, 2, 32767, -32768);
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      this[offset2] = value & 255;
      this[offset2 + 1] = value >>> 8;
    } else {
      objectWriteUInt16(this, value, offset2, true);
    }
    return offset2 + 2;
  };
  Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset2, noAssert) {
    value = +value;
    offset2 = offset2 | 0;
    if (!noAssert)
      checkInt(this, value, offset2, 2, 32767, -32768);
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      this[offset2] = value >>> 8;
      this[offset2 + 1] = value & 255;
    } else {
      objectWriteUInt16(this, value, offset2, false);
    }
    return offset2 + 2;
  };
  Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset2, noAssert) {
    value = +value;
    offset2 = offset2 | 0;
    if (!noAssert)
      checkInt(this, value, offset2, 4, 2147483647, -2147483648);
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      this[offset2] = value & 255;
      this[offset2 + 1] = value >>> 8;
      this[offset2 + 2] = value >>> 16;
      this[offset2 + 3] = value >>> 24;
    } else {
      objectWriteUInt32(this, value, offset2, true);
    }
    return offset2 + 4;
  };
  Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset2, noAssert) {
    value = +value;
    offset2 = offset2 | 0;
    if (!noAssert)
      checkInt(this, value, offset2, 4, 2147483647, -2147483648);
    if (value < 0)
      value = 4294967295 + value + 1;
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      this[offset2] = value >>> 24;
      this[offset2 + 1] = value >>> 16;
      this[offset2 + 2] = value >>> 8;
      this[offset2 + 3] = value & 255;
    } else {
      objectWriteUInt32(this, value, offset2, false);
    }
    return offset2 + 4;
  };
  function checkIEEE754(buf, value, offset2, ext, max, min) {
    if (offset2 + ext > buf.length)
      throw new RangeError("Index out of range");
    if (offset2 < 0)
      throw new RangeError("Index out of range");
  }
  function writeFloat(buf, value, offset2, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset2, 4);
    }
    ieee754$1.write(buf, value, offset2, littleEndian, 23, 4);
    return offset2 + 4;
  }
  Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset2, noAssert) {
    return writeFloat(this, value, offset2, true, noAssert);
  };
  Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset2, noAssert) {
    return writeFloat(this, value, offset2, false, noAssert);
  };
  function writeDouble(buf, value, offset2, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset2, 8);
    }
    ieee754$1.write(buf, value, offset2, littleEndian, 52, 8);
    return offset2 + 8;
  }
  Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset2, noAssert) {
    return writeDouble(this, value, offset2, true, noAssert);
  };
  Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset2, noAssert) {
    return writeDouble(this, value, offset2, false, noAssert);
  };
  Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
    if (!start)
      start = 0;
    if (!end && end !== 0)
      end = this.length;
    if (targetStart >= target.length)
      targetStart = target.length;
    if (!targetStart)
      targetStart = 0;
    if (end > 0 && end < start)
      end = start;
    if (end === start)
      return 0;
    if (target.length === 0 || this.length === 0)
      return 0;
    if (targetStart < 0) {
      throw new RangeError("targetStart out of bounds");
    }
    if (start < 0 || start >= this.length)
      throw new RangeError("sourceStart out of bounds");
    if (end < 0)
      throw new RangeError("sourceEnd out of bounds");
    if (end > this.length)
      end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }
    var len = end - start;
    var i;
    if (this === target && start < targetStart && targetStart < end) {
      for (i = len - 1; i >= 0; --i) {
        target[i + targetStart] = this[i + start];
      }
    } else if (len < 1e3 || !Buffer2.TYPED_ARRAY_SUPPORT) {
      for (i = 0; i < len; ++i) {
        target[i + targetStart] = this[i + start];
      }
    } else {
      Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
    }
    return len;
  };
  Buffer2.prototype.fill = function fill(val, start, end, encoding) {
    if (typeof val === "string") {
      if (typeof start === "string") {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === "string") {
        encoding = end;
        end = this.length;
      }
      if (val.length === 1) {
        var code2 = val.charCodeAt(0);
        if (code2 < 256) {
          val = code2;
        }
      }
      if (encoding !== void 0 && typeof encoding !== "string") {
        throw new TypeError("encoding must be a string");
      }
      if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
    } else if (typeof val === "number") {
      val = val & 255;
    }
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError("Out of range index");
    }
    if (end <= start) {
      return this;
    }
    start = start >>> 0;
    end = end === void 0 ? this.length : end >>> 0;
    if (!val)
      val = 0;
    var i;
    if (typeof val === "number") {
      for (i = start; i < end; ++i) {
        this[i] = val;
      }
    } else {
      var bytes = Buffer2.isBuffer(val) ? val : utf8ToBytes(new Buffer2(val, encoding).toString());
      var len = bytes.length;
      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len];
      }
    }
    return this;
  };
  var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
  function base64clean(str) {
    str = stringtrim(str).replace(INVALID_BASE64_RE, "");
    if (str.length < 2)
      return "";
    while (str.length % 4 !== 0) {
      str = str + "=";
    }
    return str;
  }
  function stringtrim(str) {
    if (str.trim)
      return str.trim();
    return str.replace(/^\s+|\s+$/g, "");
  }
  function toHex(n2) {
    if (n2 < 16)
      return "0" + n2.toString(16);
    return n2.toString(16);
  }
  function utf8ToBytes(string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];
    for (var i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);
      if (codePoint > 55295 && codePoint < 57344) {
        if (!leadSurrogate) {
          if (codePoint > 56319) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          } else if (i + 1 === length) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          }
          leadSurrogate = codePoint;
          continue;
        }
        if (codePoint < 56320) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          leadSurrogate = codePoint;
          continue;
        }
        codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
      } else if (leadSurrogate) {
        if ((units -= 3) > -1)
          bytes.push(239, 191, 189);
      }
      leadSurrogate = null;
      if (codePoint < 128) {
        if ((units -= 1) < 0)
          break;
        bytes.push(codePoint);
      } else if (codePoint < 2048) {
        if ((units -= 2) < 0)
          break;
        bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
      } else if (codePoint < 65536) {
        if ((units -= 3) < 0)
          break;
        bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
      } else if (codePoint < 1114112) {
        if ((units -= 4) < 0)
          break;
        bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
      } else {
        throw new Error("Invalid code point");
      }
    }
    return bytes;
  }
  function asciiToBytes(str) {
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      byteArray.push(str.charCodeAt(i) & 255);
    }
    return byteArray;
  }
  function utf16leToBytes(str, units) {
    var c, hi, lo;
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0)
        break;
      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }
    return byteArray;
  }
  function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
  }
  function blitBuffer(src, dst, offset2, length) {
    for (var i = 0; i < length; ++i) {
      if (i + offset2 >= dst.length || i >= src.length)
        break;
      dst[i + offset2] = src[i];
    }
    return i;
  }
  function isnan(val) {
    return val !== val;
  }
})(buffer);
var core = { exports: {} };
(function(module, exports) {
  (function(root, factory) {
    {
      module.exports = factory();
    }
  })(commonjsGlobal, function() {
    var CryptoJS2 = CryptoJS2 || function(Math2, undefined$1) {
      var crypto2;
      if (typeof window !== "undefined" && window.crypto) {
        crypto2 = window.crypto;
      }
      if (typeof self !== "undefined" && self.crypto) {
        crypto2 = self.crypto;
      }
      if (typeof globalThis !== "undefined" && globalThis.crypto) {
        crypto2 = globalThis.crypto;
      }
      if (!crypto2 && typeof window !== "undefined" && window.msCrypto) {
        crypto2 = window.msCrypto;
      }
      if (!crypto2 && typeof commonjsGlobal !== "undefined" && commonjsGlobal.crypto) {
        crypto2 = commonjsGlobal.crypto;
      }
      if (!crypto2 && typeof commonjsRequire === "function") {
        try {
          crypto2 = require("crypto");
        } catch (err) {
        }
      }
      var cryptoSecureRandomInt2 = function() {
        if (crypto2) {
          if (typeof crypto2.getRandomValues === "function") {
            try {
              return crypto2.getRandomValues(new Uint32Array(1))[0];
            } catch (err) {
            }
          }
          if (typeof crypto2.randomBytes === "function") {
            try {
              return crypto2.randomBytes(4).readInt32LE();
            } catch (err) {
            }
          }
        }
        throw new Error("Native crypto module could not be used to get secure random number.");
      };
      var create = Object.create || function() {
        function F() {
        }
        return function(obj) {
          var subtype;
          F.prototype = obj;
          subtype = new F();
          F.prototype = null;
          return subtype;
        };
      }();
      var C = {};
      var C_lib = C.lib = {};
      var Base = C_lib.Base = function() {
        return {
          extend: function(overrides) {
            var subtype = create(this);
            if (overrides) {
              subtype.mixIn(overrides);
            }
            if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
              subtype.init = function() {
                subtype.$super.init.apply(this, arguments);
              };
            }
            subtype.init.prototype = subtype;
            subtype.$super = this;
            return subtype;
          },
          create: function() {
            var instance = this.extend();
            instance.init.apply(instance, arguments);
            return instance;
          },
          init: function() {
          },
          mixIn: function(properties) {
            for (var propertyName in properties) {
              if (properties.hasOwnProperty(propertyName)) {
                this[propertyName] = properties[propertyName];
              }
            }
            if (properties.hasOwnProperty("toString")) {
              this.toString = properties.toString;
            }
          },
          clone: function() {
            return this.init.prototype.extend(this);
          }
        };
      }();
      var WordArray2 = C_lib.WordArray = Base.extend({
        init: function(words, sigBytes) {
          words = this.words = words || [];
          if (sigBytes != undefined$1) {
            this.sigBytes = sigBytes;
          } else {
            this.sigBytes = words.length * 4;
          }
        },
        toString: function(encoder) {
          return (encoder || Hex).stringify(this);
        },
        concat: function(wordArray) {
          var thisWords = this.words;
          var thatWords = wordArray.words;
          var thisSigBytes = this.sigBytes;
          var thatSigBytes = wordArray.sigBytes;
          this.clamp();
          if (thisSigBytes % 4) {
            for (var i = 0; i < thatSigBytes; i++) {
              var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
            }
          } else {
            for (var j = 0; j < thatSigBytes; j += 4) {
              thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
            }
          }
          this.sigBytes += thatSigBytes;
          return this;
        },
        clamp: function() {
          var words = this.words;
          var sigBytes = this.sigBytes;
          words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
          words.length = Math2.ceil(sigBytes / 4);
        },
        clone: function() {
          var clone2 = Base.clone.call(this);
          clone2.words = this.words.slice(0);
          return clone2;
        },
        random: function(nBytes) {
          var words = [];
          for (var i = 0; i < nBytes; i += 4) {
            words.push(cryptoSecureRandomInt2());
          }
          return new WordArray2.init(words, nBytes);
        }
      });
      var C_enc = C.enc = {};
      var Hex = C_enc.Hex = {
        stringify: function(wordArray) {
          var words = wordArray.words;
          var sigBytes = wordArray.sigBytes;
          var hexChars = [];
          for (var i = 0; i < sigBytes; i++) {
            var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
            hexChars.push((bite >>> 4).toString(16));
            hexChars.push((bite & 15).toString(16));
          }
          return hexChars.join("");
        },
        parse: function(hexStr) {
          var hexStrLength = hexStr.length;
          var words = [];
          for (var i = 0; i < hexStrLength; i += 2) {
            words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
          }
          return new WordArray2.init(words, hexStrLength / 2);
        }
      };
      var Latin1 = C_enc.Latin1 = {
        stringify: function(wordArray) {
          var words = wordArray.words;
          var sigBytes = wordArray.sigBytes;
          var latin1Chars = [];
          for (var i = 0; i < sigBytes; i++) {
            var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
            latin1Chars.push(String.fromCharCode(bite));
          }
          return latin1Chars.join("");
        },
        parse: function(latin1Str) {
          var latin1StrLength = latin1Str.length;
          var words = [];
          for (var i = 0; i < latin1StrLength; i++) {
            words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
          }
          return new WordArray2.init(words, latin1StrLength);
        }
      };
      var Utf8 = C_enc.Utf8 = {
        stringify: function(wordArray) {
          try {
            return decodeURIComponent(escape(Latin1.stringify(wordArray)));
          } catch (e) {
            throw new Error("Malformed UTF-8 data");
          }
        },
        parse: function(utf8Str) {
          return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
        }
      };
      var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
        reset: function() {
          this._data = new WordArray2.init();
          this._nDataBytes = 0;
        },
        _append: function(data) {
          if (typeof data == "string") {
            data = Utf8.parse(data);
          }
          this._data.concat(data);
          this._nDataBytes += data.sigBytes;
        },
        _process: function(doFlush) {
          var processedWords;
          var data = this._data;
          var dataWords = data.words;
          var dataSigBytes = data.sigBytes;
          var blockSize = this.blockSize;
          var blockSizeBytes = blockSize * 4;
          var nBlocksReady = dataSigBytes / blockSizeBytes;
          if (doFlush) {
            nBlocksReady = Math2.ceil(nBlocksReady);
          } else {
            nBlocksReady = Math2.max((nBlocksReady | 0) - this._minBufferSize, 0);
          }
          var nWordsReady = nBlocksReady * blockSize;
          var nBytesReady = Math2.min(nWordsReady * 4, dataSigBytes);
          if (nWordsReady) {
            for (var offset2 = 0; offset2 < nWordsReady; offset2 += blockSize) {
              this._doProcessBlock(dataWords, offset2);
            }
            processedWords = dataWords.splice(0, nWordsReady);
            data.sigBytes -= nBytesReady;
          }
          return new WordArray2.init(processedWords, nBytesReady);
        },
        clone: function() {
          var clone2 = Base.clone.call(this);
          clone2._data = this._data.clone();
          return clone2;
        },
        _minBufferSize: 0
      });
      C_lib.Hasher = BufferedBlockAlgorithm.extend({
        cfg: Base.extend(),
        init: function(cfg) {
          this.cfg = this.cfg.extend(cfg);
          this.reset();
        },
        reset: function() {
          BufferedBlockAlgorithm.reset.call(this);
          this._doReset();
        },
        update: function(messageUpdate) {
          this._append(messageUpdate);
          this._process();
          return this;
        },
        finalize: function(messageUpdate) {
          if (messageUpdate) {
            this._append(messageUpdate);
          }
          var hash = this._doFinalize();
          return hash;
        },
        blockSize: 512 / 32,
        _createHelper: function(hasher) {
          return function(message, cfg) {
            return new hasher.init(cfg).finalize(message);
          };
        },
        _createHmacHelper: function(hasher) {
          return function(message, key) {
            return new C_algo.HMAC.init(hasher, key).finalize(message);
          };
        }
      });
      var C_algo = C.algo = {};
      return C;
    }(Math);
    return CryptoJS2;
  });
})(core);
var CryptoJS = core.exports;
var libTypedarrays = { exports: {} };
(function(module, exports) {
  (function(root, factory) {
    {
      module.exports = factory(core.exports);
    }
  })(commonjsGlobal, function(CryptoJS2) {
    (function() {
      if (typeof ArrayBuffer != "function") {
        return;
      }
      var C = CryptoJS2;
      var C_lib = C.lib;
      var WordArray2 = C_lib.WordArray;
      var superInit = WordArray2.init;
      var subInit = WordArray2.init = function(typedArray) {
        if (typedArray instanceof ArrayBuffer) {
          typedArray = new Uint8Array(typedArray);
        }
        if (typedArray instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) {
          typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
        }
        if (typedArray instanceof Uint8Array) {
          var typedArrayByteLength = typedArray.byteLength;
          var words = [];
          for (var i = 0; i < typedArrayByteLength; i++) {
            words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
          }
          superInit.call(this, words, typedArrayByteLength);
        } else {
          superInit.apply(this, arguments);
        }
      };
      subInit.prototype = WordArray2;
    })();
    return CryptoJS2.lib.WordArray;
  });
})(libTypedarrays);
var sha256 = { exports: {} };
(function(module, exports) {
  (function(root, factory) {
    {
      module.exports = factory(core.exports);
    }
  })(commonjsGlobal, function(CryptoJS2) {
    (function(Math2) {
      var C = CryptoJS2;
      var C_lib = C.lib;
      var WordArray2 = C_lib.WordArray;
      var Hasher = C_lib.Hasher;
      var C_algo = C.algo;
      var H = [];
      var K = [];
      (function() {
        function isPrime(n3) {
          var sqrtN = Math2.sqrt(n3);
          for (var factor = 2; factor <= sqrtN; factor++) {
            if (!(n3 % factor)) {
              return false;
            }
          }
          return true;
        }
        function getFractionalBits(n3) {
          return (n3 - (n3 | 0)) * 4294967296 | 0;
        }
        var n2 = 2;
        var nPrime = 0;
        while (nPrime < 64) {
          if (isPrime(n2)) {
            if (nPrime < 8) {
              H[nPrime] = getFractionalBits(Math2.pow(n2, 1 / 2));
            }
            K[nPrime] = getFractionalBits(Math2.pow(n2, 1 / 3));
            nPrime++;
          }
          n2++;
        }
      })();
      var W = [];
      var SHA2562 = C_algo.SHA256 = Hasher.extend({
        _doReset: function() {
          this._hash = new WordArray2.init(H.slice(0));
        },
        _doProcessBlock: function(M, offset2) {
          var H2 = this._hash.words;
          var a = H2[0];
          var b = H2[1];
          var c = H2[2];
          var d = H2[3];
          var e = H2[4];
          var f = H2[5];
          var g = H2[6];
          var h = H2[7];
          for (var i = 0; i < 64; i++) {
            if (i < 16) {
              W[i] = M[offset2 + i] | 0;
            } else {
              var gamma0x = W[i - 15];
              var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
              var gamma1x = W[i - 2];
              var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
              W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
            }
            var ch = e & f ^ ~e & g;
            var maj = a & b ^ a & c ^ b & c;
            var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
            var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
            var t1 = h + sigma1 + ch + K[i] + W[i];
            var t2 = sigma0 + maj;
            h = g;
            g = f;
            f = e;
            e = d + t1 | 0;
            d = c;
            c = b;
            b = a;
            a = t1 + t2 | 0;
          }
          H2[0] = H2[0] + a | 0;
          H2[1] = H2[1] + b | 0;
          H2[2] = H2[2] + c | 0;
          H2[3] = H2[3] + d | 0;
          H2[4] = H2[4] + e | 0;
          H2[5] = H2[5] + f | 0;
          H2[6] = H2[6] + g | 0;
          H2[7] = H2[7] + h | 0;
        },
        _doFinalize: function() {
          var data = this._data;
          var dataWords = data.words;
          var nBitsTotal = this._nDataBytes * 8;
          var nBitsLeft = data.sigBytes * 8;
          dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
          dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math2.floor(nBitsTotal / 4294967296);
          dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
          data.sigBytes = dataWords.length * 4;
          this._process();
          return this._hash;
        },
        clone: function() {
          var clone2 = Hasher.clone.call(this);
          clone2._hash = this._hash.clone();
          return clone2;
        }
      });
      C.SHA256 = Hasher._createHelper(SHA2562);
      C.HmacSHA256 = Hasher._createHmacHelper(SHA2562);
    })(Math);
    return CryptoJS2.SHA256;
  });
})(sha256);
var SHA256 = sha256.exports;
var hmacSha256 = { exports: {} };
var hmac = { exports: {} };
(function(module, exports) {
  (function(root, factory) {
    {
      module.exports = factory(core.exports);
    }
  })(commonjsGlobal, function(CryptoJS2) {
    (function() {
      var C = CryptoJS2;
      var C_lib = C.lib;
      var Base = C_lib.Base;
      var C_enc = C.enc;
      var Utf8 = C_enc.Utf8;
      var C_algo = C.algo;
      C_algo.HMAC = Base.extend({
        init: function(hasher, key) {
          hasher = this._hasher = new hasher.init();
          if (typeof key == "string") {
            key = Utf8.parse(key);
          }
          var hasherBlockSize = hasher.blockSize;
          var hasherBlockSizeBytes = hasherBlockSize * 4;
          if (key.sigBytes > hasherBlockSizeBytes) {
            key = hasher.finalize(key);
          }
          key.clamp();
          var oKey = this._oKey = key.clone();
          var iKey = this._iKey = key.clone();
          var oKeyWords = oKey.words;
          var iKeyWords = iKey.words;
          for (var i = 0; i < hasherBlockSize; i++) {
            oKeyWords[i] ^= 1549556828;
            iKeyWords[i] ^= 909522486;
          }
          oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
          this.reset();
        },
        reset: function() {
          var hasher = this._hasher;
          hasher.reset();
          hasher.update(this._iKey);
        },
        update: function(messageUpdate) {
          this._hasher.update(messageUpdate);
          return this;
        },
        finalize: function(messageUpdate) {
          var hasher = this._hasher;
          var innerHash = hasher.finalize(messageUpdate);
          hasher.reset();
          var hmac2 = hasher.finalize(this._oKey.clone().concat(innerHash));
          return hmac2;
        }
      });
    })();
  });
})(hmac);
(function(module, exports) {
  (function(root, factory, undef) {
    {
      module.exports = factory(core.exports, sha256.exports, hmac.exports);
    }
  })(commonjsGlobal, function(CryptoJS2) {
    return CryptoJS2.HmacSHA256;
  });
})(hmacSha256);
var HmacSHA256 = hmacSha256.exports;
var crypto$1;
if (typeof window !== "undefined" && window.crypto) {
  crypto$1 = window.crypto;
}
if (!crypto$1 && typeof window !== "undefined" && window.msCrypto) {
  crypto$1 = window.msCrypto;
}
if (!crypto$1 && typeof global !== "undefined" && global.crypto) {
  crypto$1 = global.crypto;
}
if (!crypto$1 && typeof require === "function") {
  try {
    crypto$1 = require("crypto");
  } catch (err) {
  }
}
function cryptoSecureRandomInt() {
  if (crypto$1) {
    if (typeof crypto$1.getRandomValues === "function") {
      try {
        return crypto$1.getRandomValues(new Uint32Array(1))[0];
      } catch (err) {
      }
    }
    if (typeof crypto$1.randomBytes === "function") {
      try {
        return crypto$1.randomBytes(4).readInt32LE();
      } catch (err) {
      }
    }
  }
  throw new Error("Native crypto module could not be used to get secure random number.");
}
function hexStringify(wordArray) {
  var words = wordArray.words;
  var sigBytes = wordArray.sigBytes;
  var hexChars = [];
  for (var i = 0; i < sigBytes; i++) {
    var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
    hexChars.push((bite >>> 4).toString(16));
    hexChars.push((bite & 15).toString(16));
  }
  return hexChars.join("");
}
var WordArray = /* @__PURE__ */ function() {
  function WordArray2(words, sigBytes) {
    words = this.words = words || [];
    if (sigBytes != void 0) {
      this.sigBytes = sigBytes;
    } else {
      this.sigBytes = words.length * 4;
    }
  }
  var _proto = WordArray2.prototype;
  _proto.random = function random(nBytes) {
    var words = [];
    for (var i = 0; i < nBytes; i += 4) {
      words.push(cryptoSecureRandomInt());
    }
    return new WordArray2(words, nBytes);
  };
  _proto.toString = function toString2() {
    return hexStringify(this);
  };
  return WordArray2;
}();
function BigInteger(a, b) {
  if (a != null)
    this.fromString(a, b);
}
function nbi() {
  return new BigInteger(null);
}
var dbits;
var canary = 244837814094590;
var j_lm = (canary & 16777215) == 15715070;
function am1(i, x, w, j, c, n2) {
  while (--n2 >= 0) {
    var v = x * this[i++] + w[j] + c;
    c = Math.floor(v / 67108864);
    w[j++] = v & 67108863;
  }
  return c;
}
function am2(i, x, w, j, c, n2) {
  var xl = x & 32767, xh = x >> 15;
  while (--n2 >= 0) {
    var l2 = this[i] & 32767;
    var h = this[i++] >> 15;
    var m = xh * l2 + h * xl;
    l2 = xl * l2 + ((m & 32767) << 15) + w[j] + (c & 1073741823);
    c = (l2 >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
    w[j++] = l2 & 1073741823;
  }
  return c;
}
function am3(i, x, w, j, c, n2) {
  var xl = x & 16383, xh = x >> 14;
  while (--n2 >= 0) {
    var l2 = this[i] & 16383;
    var h = this[i++] >> 14;
    var m = xh * l2 + h * xl;
    l2 = xl * l2 + ((m & 16383) << 14) + w[j] + c;
    c = (l2 >> 28) + (m >> 14) + xh * h;
    w[j++] = l2 & 268435455;
  }
  return c;
}
var inBrowser = typeof navigator !== "undefined";
if (inBrowser && j_lm && navigator.appName == "Microsoft Internet Explorer") {
  BigInteger.prototype.am = am2;
  dbits = 30;
} else if (inBrowser && j_lm && navigator.appName != "Netscape") {
  BigInteger.prototype.am = am1;
  dbits = 26;
} else {
  BigInteger.prototype.am = am3;
  dbits = 28;
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = (1 << dbits) - 1;
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr, vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) {
  BI_RC[rr++] = vv;
}
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
  BI_RC[rr++] = vv;
}
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
  BI_RC[rr++] = vv;
}
function int2char(n2) {
  return BI_RM.charAt(n2);
}
function intAt(s2, i) {
  var c = BI_RC[s2.charCodeAt(i)];
  return c == null ? -1 : c;
}
function bnpCopyTo(r) {
  for (var i = this.t - 1; i >= 0; --i) {
    r[i] = this[i];
  }
  r.t = this.t;
  r.s = this.s;
}
function bnpFromInt(x) {
  this.t = 1;
  this.s = x < 0 ? -1 : 0;
  if (x > 0)
    this[0] = x;
  else if (x < -1)
    this[0] = x + this.DV;
  else
    this.t = 0;
}
function nbv(i) {
  var r = nbi();
  r.fromInt(i);
  return r;
}
function bnpFromString(s2, b) {
  var k;
  if (b == 16)
    k = 4;
  else if (b == 8)
    k = 3;
  else if (b == 2)
    k = 1;
  else if (b == 32)
    k = 5;
  else if (b == 4)
    k = 2;
  else
    throw new Error("Only radix 2, 4, 8, 16, 32 are supported");
  this.t = 0;
  this.s = 0;
  var i = s2.length, mi = false, sh = 0;
  while (--i >= 0) {
    var x = intAt(s2, i);
    if (x < 0) {
      if (s2.charAt(i) == "-")
        mi = true;
      continue;
    }
    mi = false;
    if (sh == 0)
      this[this.t++] = x;
    else if (sh + k > this.DB) {
      this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
      this[this.t++] = x >> this.DB - sh;
    } else
      this[this.t - 1] |= x << sh;
    sh += k;
    if (sh >= this.DB)
      sh -= this.DB;
  }
  this.clamp();
  if (mi)
    BigInteger.ZERO.subTo(this, this);
}
function bnpClamp() {
  var c = this.s & this.DM;
  while (this.t > 0 && this[this.t - 1] == c) {
    --this.t;
  }
}
function bnToString(b) {
  if (this.s < 0)
    return "-" + this.negate().toString(b);
  var k;
  if (b == 16)
    k = 4;
  else if (b == 8)
    k = 3;
  else if (b == 2)
    k = 1;
  else if (b == 32)
    k = 5;
  else if (b == 4)
    k = 2;
  else
    throw new Error("Only radix 2, 4, 8, 16, 32 are supported");
  var km = (1 << k) - 1, d, m = false, r = "", i = this.t;
  var p = this.DB - i * this.DB % k;
  if (i-- > 0) {
    if (p < this.DB && (d = this[i] >> p) > 0) {
      m = true;
      r = int2char(d);
    }
    while (i >= 0) {
      if (p < k) {
        d = (this[i] & (1 << p) - 1) << k - p;
        d |= this[--i] >> (p += this.DB - k);
      } else {
        d = this[i] >> (p -= k) & km;
        if (p <= 0) {
          p += this.DB;
          --i;
        }
      }
      if (d > 0)
        m = true;
      if (m)
        r += int2char(d);
    }
  }
  return m ? r : "0";
}
function bnNegate() {
  var r = nbi();
  BigInteger.ZERO.subTo(this, r);
  return r;
}
function bnAbs() {
  return this.s < 0 ? this.negate() : this;
}
function bnCompareTo(a) {
  var r = this.s - a.s;
  if (r != 0)
    return r;
  var i = this.t;
  r = i - a.t;
  if (r != 0)
    return this.s < 0 ? -r : r;
  while (--i >= 0) {
    if ((r = this[i] - a[i]) != 0)
      return r;
  }
  return 0;
}
function nbits(x) {
  var r = 1, t2;
  if ((t2 = x >>> 16) != 0) {
    x = t2;
    r += 16;
  }
  if ((t2 = x >> 8) != 0) {
    x = t2;
    r += 8;
  }
  if ((t2 = x >> 4) != 0) {
    x = t2;
    r += 4;
  }
  if ((t2 = x >> 2) != 0) {
    x = t2;
    r += 2;
  }
  if ((t2 = x >> 1) != 0) {
    x = t2;
    r += 1;
  }
  return r;
}
function bnBitLength() {
  if (this.t <= 0)
    return 0;
  return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
}
function bnpDLShiftTo(n2, r) {
  var i;
  for (i = this.t - 1; i >= 0; --i) {
    r[i + n2] = this[i];
  }
  for (i = n2 - 1; i >= 0; --i) {
    r[i] = 0;
  }
  r.t = this.t + n2;
  r.s = this.s;
}
function bnpDRShiftTo(n2, r) {
  for (var i = n2; i < this.t; ++i) {
    r[i - n2] = this[i];
  }
  r.t = Math.max(this.t - n2, 0);
  r.s = this.s;
}
function bnpLShiftTo(n2, r) {
  var bs = n2 % this.DB;
  var cbs = this.DB - bs;
  var bm = (1 << cbs) - 1;
  var ds = Math.floor(n2 / this.DB), c = this.s << bs & this.DM, i;
  for (i = this.t - 1; i >= 0; --i) {
    r[i + ds + 1] = this[i] >> cbs | c;
    c = (this[i] & bm) << bs;
  }
  for (i = ds - 1; i >= 0; --i) {
    r[i] = 0;
  }
  r[ds] = c;
  r.t = this.t + ds + 1;
  r.s = this.s;
  r.clamp();
}
function bnpRShiftTo(n2, r) {
  r.s = this.s;
  var ds = Math.floor(n2 / this.DB);
  if (ds >= this.t) {
    r.t = 0;
    return;
  }
  var bs = n2 % this.DB;
  var cbs = this.DB - bs;
  var bm = (1 << bs) - 1;
  r[0] = this[ds] >> bs;
  for (var i = ds + 1; i < this.t; ++i) {
    r[i - ds - 1] |= (this[i] & bm) << cbs;
    r[i - ds] = this[i] >> bs;
  }
  if (bs > 0)
    r[this.t - ds - 1] |= (this.s & bm) << cbs;
  r.t = this.t - ds;
  r.clamp();
}
function bnpSubTo(a, r) {
  var i = 0, c = 0, m = Math.min(a.t, this.t);
  while (i < m) {
    c += this[i] - a[i];
    r[i++] = c & this.DM;
    c >>= this.DB;
  }
  if (a.t < this.t) {
    c -= a.s;
    while (i < this.t) {
      c += this[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    c += this.s;
  } else {
    c += this.s;
    while (i < a.t) {
      c -= a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    c -= a.s;
  }
  r.s = c < 0 ? -1 : 0;
  if (c < -1)
    r[i++] = this.DV + c;
  else if (c > 0)
    r[i++] = c;
  r.t = i;
  r.clamp();
}
function bnpMultiplyTo(a, r) {
  var x = this.abs(), y = a.abs();
  var i = x.t;
  r.t = i + y.t;
  while (--i >= 0) {
    r[i] = 0;
  }
  for (i = 0; i < y.t; ++i) {
    r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
  }
  r.s = 0;
  r.clamp();
  if (this.s != a.s)
    BigInteger.ZERO.subTo(r, r);
}
function bnpSquareTo(r) {
  var x = this.abs();
  var i = r.t = 2 * x.t;
  while (--i >= 0) {
    r[i] = 0;
  }
  for (i = 0; i < x.t - 1; ++i) {
    var c = x.am(i, x[i], r, 2 * i, 0, 1);
    if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
      r[i + x.t] -= x.DV;
      r[i + x.t + 1] = 1;
    }
  }
  if (r.t > 0)
    r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
  r.s = 0;
  r.clamp();
}
function bnpDivRemTo(m, q, r) {
  var pm = m.abs();
  if (pm.t <= 0)
    return;
  var pt = this.abs();
  if (pt.t < pm.t) {
    if (q != null)
      q.fromInt(0);
    if (r != null)
      this.copyTo(r);
    return;
  }
  if (r == null)
    r = nbi();
  var y = nbi(), ts = this.s, ms = m.s;
  var nsh = this.DB - nbits(pm[pm.t - 1]);
  if (nsh > 0) {
    pm.lShiftTo(nsh, y);
    pt.lShiftTo(nsh, r);
  } else {
    pm.copyTo(y);
    pt.copyTo(r);
  }
  var ys = y.t;
  var y0 = y[ys - 1];
  if (y0 == 0)
    return;
  var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
  var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e = 1 << this.F2;
  var i = r.t, j = i - ys, t2 = q == null ? nbi() : q;
  y.dlShiftTo(j, t2);
  if (r.compareTo(t2) >= 0) {
    r[r.t++] = 1;
    r.subTo(t2, r);
  }
  BigInteger.ONE.dlShiftTo(ys, t2);
  t2.subTo(y, y);
  while (y.t < ys) {
    y[y.t++] = 0;
  }
  while (--j >= 0) {
    var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
    if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
      y.dlShiftTo(j, t2);
      r.subTo(t2, r);
      while (r[i] < --qd) {
        r.subTo(t2, r);
      }
    }
  }
  if (q != null) {
    r.drShiftTo(ys, q);
    if (ts != ms)
      BigInteger.ZERO.subTo(q, q);
  }
  r.t = ys;
  r.clamp();
  if (nsh > 0)
    r.rShiftTo(nsh, r);
  if (ts < 0)
    BigInteger.ZERO.subTo(r, r);
}
function bnMod(a) {
  var r = nbi();
  this.abs().divRemTo(a, null, r);
  if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0)
    a.subTo(r, r);
  return r;
}
function bnpInvDigit() {
  if (this.t < 1)
    return 0;
  var x = this[0];
  if ((x & 1) == 0)
    return 0;
  var y = x & 3;
  y = y * (2 - (x & 15) * y) & 15;
  y = y * (2 - (x & 255) * y) & 255;
  y = y * (2 - ((x & 65535) * y & 65535)) & 65535;
  y = y * (2 - x * y % this.DV) % this.DV;
  return y > 0 ? this.DV - y : -y;
}
function bnEquals(a) {
  return this.compareTo(a) == 0;
}
function bnpAddTo(a, r) {
  var i = 0, c = 0, m = Math.min(a.t, this.t);
  while (i < m) {
    c += this[i] + a[i];
    r[i++] = c & this.DM;
    c >>= this.DB;
  }
  if (a.t < this.t) {
    c += a.s;
    while (i < this.t) {
      c += this[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    c += this.s;
  } else {
    c += this.s;
    while (i < a.t) {
      c += a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    c += a.s;
  }
  r.s = c < 0 ? -1 : 0;
  if (c > 0)
    r[i++] = c;
  else if (c < -1)
    r[i++] = this.DV + c;
  r.t = i;
  r.clamp();
}
function bnAdd(a) {
  var r = nbi();
  this.addTo(a, r);
  return r;
}
function bnSubtract(a) {
  var r = nbi();
  this.subTo(a, r);
  return r;
}
function bnMultiply(a) {
  var r = nbi();
  this.multiplyTo(a, r);
  return r;
}
function bnDivide(a) {
  var r = nbi();
  this.divRemTo(a, r, null);
  return r;
}
function Montgomery(m) {
  this.m = m;
  this.mp = m.invDigit();
  this.mpl = this.mp & 32767;
  this.mph = this.mp >> 15;
  this.um = (1 << m.DB - 15) - 1;
  this.mt2 = 2 * m.t;
}
function montConvert(x) {
  var r = nbi();
  x.abs().dlShiftTo(this.m.t, r);
  r.divRemTo(this.m, null, r);
  if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0)
    this.m.subTo(r, r);
  return r;
}
function montRevert(x) {
  var r = nbi();
  x.copyTo(r);
  this.reduce(r);
  return r;
}
function montReduce(x) {
  while (x.t <= this.mt2) {
    x[x.t++] = 0;
  }
  for (var i = 0; i < this.m.t; ++i) {
    var j = x[i] & 32767;
    var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM;
    j = i + this.m.t;
    x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
    while (x[j] >= x.DV) {
      x[j] -= x.DV;
      x[++j]++;
    }
  }
  x.clamp();
  x.drShiftTo(this.m.t, x);
  if (x.compareTo(this.m) >= 0)
    x.subTo(this.m, x);
}
function montSqrTo(x, r) {
  x.squareTo(r);
  this.reduce(r);
}
function montMulTo(x, y, r) {
  x.multiplyTo(y, r);
  this.reduce(r);
}
Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;
function bnModPow(e, m, callback) {
  var i = e.bitLength(), k, r = nbv(1), z = new Montgomery(m);
  if (i <= 0)
    return r;
  else if (i < 18)
    k = 1;
  else if (i < 48)
    k = 3;
  else if (i < 144)
    k = 4;
  else if (i < 768)
    k = 5;
  else
    k = 6;
  var g = new Array(), n2 = 3, k1 = k - 1, km = (1 << k) - 1;
  g[1] = z.convert(this);
  if (k > 1) {
    var g2 = nbi();
    z.sqrTo(g[1], g2);
    while (n2 <= km) {
      g[n2] = nbi();
      z.mulTo(g2, g[n2 - 2], g[n2]);
      n2 += 2;
    }
  }
  var j = e.t - 1, w, is1 = true, r2 = nbi(), t2;
  i = nbits(e[j]) - 1;
  while (j >= 0) {
    if (i >= k1)
      w = e[j] >> i - k1 & km;
    else {
      w = (e[j] & (1 << i + 1) - 1) << k1 - i;
      if (j > 0)
        w |= e[j - 1] >> this.DB + i - k1;
    }
    n2 = k;
    while ((w & 1) == 0) {
      w >>= 1;
      --n2;
    }
    if ((i -= n2) < 0) {
      i += this.DB;
      --j;
    }
    if (is1) {
      g[w].copyTo(r);
      is1 = false;
    } else {
      while (n2 > 1) {
        z.sqrTo(r, r2);
        z.sqrTo(r2, r);
        n2 -= 2;
      }
      if (n2 > 0)
        z.sqrTo(r, r2);
      else {
        t2 = r;
        r = r2;
        r2 = t2;
      }
      z.mulTo(r2, g[w], r);
    }
    while (j >= 0 && (e[j] & 1 << i) == 0) {
      z.sqrTo(r, r2);
      t2 = r;
      r = r2;
      r2 = t2;
      if (--i < 0) {
        i = this.DB - 1;
        --j;
      }
    }
  }
  var result = z.revert(r);
  callback(null, result);
  return result;
}
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.addTo = bnpAddTo;
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.equals = bnEquals;
BigInteger.prototype.add = bnAdd;
BigInteger.prototype.subtract = bnSubtract;
BigInteger.prototype.multiply = bnMultiply;
BigInteger.prototype.divide = bnDivide;
BigInteger.prototype.modPow = bnModPow;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
/*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
function randomBytes(nBytes) {
  return buffer.Buffer.from(new WordArray().random(nBytes).toString(), "hex");
}
var HEX_MSB_REGEX = /^[89a-f]/i;
var initN = "FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AAAC42DAD33170D04507A33A85521ABDF1CBA64ECFB850458DBEF0A8AEA71575D060C7DB3970F85A6E1E4C7ABF5AE8CDB0933D71E8C94E04A25619DCEE3D2261AD2EE6BF12FFA06D98A0864D87602733EC86A64521F2B18177B200CBBE117577A615D6C770988C0BAD946E208E24FA074E5AB3143DB5BFCE0FD108E4B82D120A93AD2CAFFFFFFFFFFFFFFFF";
var newPasswordRequiredChallengeUserAttributePrefix = "userAttributes.";
var AuthenticationHelper = /* @__PURE__ */ function() {
  function AuthenticationHelper2(PoolName) {
    this.N = new BigInteger(initN, 16);
    this.g = new BigInteger("2", 16);
    this.k = new BigInteger(this.hexHash("" + this.padHex(this.N) + this.padHex(this.g)), 16);
    this.smallAValue = this.generateRandomSmallA();
    this.getLargeAValue(function() {
    });
    this.infoBits = buffer.Buffer.from("Caldera Derived Key", "utf8");
    this.poolName = PoolName;
  }
  var _proto = AuthenticationHelper2.prototype;
  _proto.getSmallAValue = function getSmallAValue() {
    return this.smallAValue;
  };
  _proto.getLargeAValue = function getLargeAValue(callback) {
    var _this = this;
    if (this.largeAValue) {
      callback(null, this.largeAValue);
    } else {
      this.calculateA(this.smallAValue, function(err, largeAValue) {
        if (err) {
          callback(err, null);
        }
        _this.largeAValue = largeAValue;
        callback(null, _this.largeAValue);
      });
    }
  };
  _proto.generateRandomSmallA = function generateRandomSmallA() {
    var hexRandom = randomBytes(128).toString("hex");
    var randomBigInt = new BigInteger(hexRandom, 16);
    return randomBigInt;
  };
  _proto.generateRandomString = function generateRandomString() {
    return randomBytes(40).toString("base64");
  };
  _proto.getRandomPassword = function getRandomPassword() {
    return this.randomPassword;
  };
  _proto.getSaltDevices = function getSaltDevices() {
    return this.SaltToHashDevices;
  };
  _proto.getVerifierDevices = function getVerifierDevices() {
    return this.verifierDevices;
  };
  _proto.generateHashDevice = function generateHashDevice(deviceGroupKey, username, callback) {
    var _this2 = this;
    this.randomPassword = this.generateRandomString();
    var combinedString = "" + deviceGroupKey + username + ":" + this.randomPassword;
    var hashedString = this.hash(combinedString);
    var hexRandom = randomBytes(16).toString("hex");
    this.SaltToHashDevices = this.padHex(new BigInteger(hexRandom, 16));
    this.g.modPow(new BigInteger(this.hexHash(this.SaltToHashDevices + hashedString), 16), this.N, function(err, verifierDevicesNotPadded) {
      if (err) {
        callback(err, null);
      }
      _this2.verifierDevices = _this2.padHex(verifierDevicesNotPadded);
      callback(null, null);
    });
  };
  _proto.calculateA = function calculateA(a, callback) {
    var _this3 = this;
    this.g.modPow(a, this.N, function(err, A) {
      if (err) {
        callback(err, null);
      }
      if (A.mod(_this3.N).equals(BigInteger.ZERO)) {
        callback(new Error("Illegal paramater. A mod N cannot be 0."), null);
      }
      callback(null, A);
    });
  };
  _proto.calculateU = function calculateU(A, B) {
    this.UHexHash = this.hexHash(this.padHex(A) + this.padHex(B));
    var finalU = new BigInteger(this.UHexHash, 16);
    return finalU;
  };
  _proto.hash = function hash(buf) {
    var str = buf instanceof buffer.Buffer ? CryptoJS.lib.WordArray.create(buf) : buf;
    var hashHex = SHA256(str).toString();
    return new Array(64 - hashHex.length).join("0") + hashHex;
  };
  _proto.hexHash = function hexHash(hexStr) {
    return this.hash(buffer.Buffer.from(hexStr, "hex"));
  };
  _proto.computehkdf = function computehkdf(ikm, salt) {
    var infoBitsWordArray = CryptoJS.lib.WordArray.create(buffer.Buffer.concat([this.infoBits, buffer.Buffer.from(String.fromCharCode(1), "utf8")]));
    var ikmWordArray = ikm instanceof buffer.Buffer ? CryptoJS.lib.WordArray.create(ikm) : ikm;
    var saltWordArray = salt instanceof buffer.Buffer ? CryptoJS.lib.WordArray.create(salt) : salt;
    var prk = HmacSHA256(ikmWordArray, saltWordArray);
    var hmac2 = HmacSHA256(infoBitsWordArray, prk);
    return buffer.Buffer.from(hmac2.toString(), "hex").slice(0, 16);
  };
  _proto.getPasswordAuthenticationKey = function getPasswordAuthenticationKey(username, password, serverBValue, salt, callback) {
    var _this4 = this;
    if (serverBValue.mod(this.N).equals(BigInteger.ZERO)) {
      throw new Error("B cannot be zero.");
    }
    this.UValue = this.calculateU(this.largeAValue, serverBValue);
    if (this.UValue.equals(BigInteger.ZERO)) {
      throw new Error("U cannot be zero.");
    }
    var usernamePassword = "" + this.poolName + username + ":" + password;
    var usernamePasswordHash = this.hash(usernamePassword);
    var xValue = new BigInteger(this.hexHash(this.padHex(salt) + usernamePasswordHash), 16);
    this.calculateS(xValue, serverBValue, function(err, sValue) {
      if (err) {
        callback(err, null);
      }
      var hkdf = _this4.computehkdf(buffer.Buffer.from(_this4.padHex(sValue), "hex"), buffer.Buffer.from(_this4.padHex(_this4.UValue), "hex"));
      callback(null, hkdf);
    });
  };
  _proto.calculateS = function calculateS(xValue, serverBValue, callback) {
    var _this5 = this;
    this.g.modPow(xValue, this.N, function(err, gModPowXN) {
      if (err) {
        callback(err, null);
      }
      var intValue2 = serverBValue.subtract(_this5.k.multiply(gModPowXN));
      intValue2.modPow(_this5.smallAValue.add(_this5.UValue.multiply(xValue)), _this5.N, function(err2, result) {
        if (err2) {
          callback(err2, null);
        }
        callback(null, result.mod(_this5.N));
      });
    });
  };
  _proto.getNewPasswordRequiredChallengeUserAttributePrefix = function getNewPasswordRequiredChallengeUserAttributePrefix() {
    return newPasswordRequiredChallengeUserAttributePrefix;
  };
  _proto.padHex = function padHex(bigInt) {
    if (!(bigInt instanceof BigInteger)) {
      throw new Error("Not a BigInteger");
    }
    var isNegative = bigInt.compareTo(BigInteger.ZERO) < 0;
    var hexStr = bigInt.abs().toString(16);
    hexStr = hexStr.length % 2 !== 0 ? "0" + hexStr : hexStr;
    hexStr = HEX_MSB_REGEX.test(hexStr) ? "00" + hexStr : hexStr;
    if (isNegative) {
      var invertedNibbles = hexStr.split("").map(function(x) {
        var invertedNibble = ~parseInt(x, 16) & 15;
        return "0123456789ABCDEF".charAt(invertedNibble);
      }).join("");
      var flippedBitsBI = new BigInteger(invertedNibbles, 16).add(BigInteger.ONE);
      hexStr = flippedBitsBI.toString(16);
      if (hexStr.toUpperCase().startsWith("FF8")) {
        hexStr = hexStr.substring(2);
      }
    }
    return hexStr;
  };
  return AuthenticationHelper2;
}();
/*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
var CognitoJwtToken = /* @__PURE__ */ function() {
  function CognitoJwtToken2(token) {
    this.jwtToken = token || "";
    this.payload = this.decodePayload();
  }
  var _proto = CognitoJwtToken2.prototype;
  _proto.getJwtToken = function getJwtToken() {
    return this.jwtToken;
  };
  _proto.getExpiration = function getExpiration() {
    return this.payload.exp;
  };
  _proto.getIssuedAt = function getIssuedAt() {
    return this.payload.iat;
  };
  _proto.decodePayload = function decodePayload() {
    var payload = this.jwtToken.split(".")[1];
    try {
      return JSON.parse(buffer.Buffer.from(payload, "base64").toString("utf8"));
    } catch (err) {
      return {};
    }
  };
  return CognitoJwtToken2;
}();
function _inheritsLoose$2(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf$2(subClass, superClass);
}
function _setPrototypeOf$2(o2, p) {
  _setPrototypeOf$2 = Object.setPrototypeOf || function _setPrototypeOf2(o3, p2) {
    o3.__proto__ = p2;
    return o3;
  };
  return _setPrototypeOf$2(o2, p);
}
var CognitoAccessToken = /* @__PURE__ */ function(_CognitoJwtToken) {
  _inheritsLoose$2(CognitoAccessToken2, _CognitoJwtToken);
  function CognitoAccessToken2(_temp) {
    var _ref = _temp === void 0 ? {} : _temp, AccessToken = _ref.AccessToken;
    return _CognitoJwtToken.call(this, AccessToken || "") || this;
  }
  return CognitoAccessToken2;
}(CognitoJwtToken);
function _inheritsLoose$1(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf$1(subClass, superClass);
}
function _setPrototypeOf$1(o2, p) {
  _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf2(o3, p2) {
    o3.__proto__ = p2;
    return o3;
  };
  return _setPrototypeOf$1(o2, p);
}
var CognitoIdToken = /* @__PURE__ */ function(_CognitoJwtToken) {
  _inheritsLoose$1(CognitoIdToken2, _CognitoJwtToken);
  function CognitoIdToken2(_temp) {
    var _ref = _temp === void 0 ? {} : _temp, IdToken = _ref.IdToken;
    return _CognitoJwtToken.call(this, IdToken || "") || this;
  }
  return CognitoIdToken2;
}(CognitoJwtToken);
/*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
var CognitoRefreshToken = /* @__PURE__ */ function() {
  function CognitoRefreshToken2(_temp) {
    var _ref = _temp === void 0 ? {} : _temp, RefreshToken = _ref.RefreshToken;
    this.token = RefreshToken || "";
  }
  var _proto = CognitoRefreshToken2.prototype;
  _proto.getToken = function getToken() {
    return this.token;
  };
  return CognitoRefreshToken2;
}();
var encBase64 = { exports: {} };
(function(module, exports) {
  (function(root, factory) {
    {
      module.exports = factory(core.exports);
    }
  })(commonjsGlobal, function(CryptoJS2) {
    (function() {
      var C = CryptoJS2;
      var C_lib = C.lib;
      var WordArray2 = C_lib.WordArray;
      var C_enc = C.enc;
      C_enc.Base64 = {
        stringify: function(wordArray) {
          var words = wordArray.words;
          var sigBytes = wordArray.sigBytes;
          var map = this._map;
          wordArray.clamp();
          var base64Chars = [];
          for (var i = 0; i < sigBytes; i += 3) {
            var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
            var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
            var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
            var triplet = byte1 << 16 | byte2 << 8 | byte3;
            for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
              base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
            }
          }
          var paddingChar = map.charAt(64);
          if (paddingChar) {
            while (base64Chars.length % 4) {
              base64Chars.push(paddingChar);
            }
          }
          return base64Chars.join("");
        },
        parse: function(base64Str) {
          var base64StrLength = base64Str.length;
          var map = this._map;
          var reverseMap = this._reverseMap;
          if (!reverseMap) {
            reverseMap = this._reverseMap = [];
            for (var j = 0; j < map.length; j++) {
              reverseMap[map.charCodeAt(j)] = j;
            }
          }
          var paddingChar = map.charAt(64);
          if (paddingChar) {
            var paddingIndex = base64Str.indexOf(paddingChar);
            if (paddingIndex !== -1) {
              base64StrLength = paddingIndex;
            }
          }
          return parseLoop(base64Str, base64StrLength, reverseMap);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
      };
      function parseLoop(base64Str, base64StrLength, reverseMap) {
        var words = [];
        var nBytes = 0;
        for (var i = 0; i < base64StrLength; i++) {
          if (i % 4) {
            var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
            var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
            var bitsCombined = bits1 | bits2;
            words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
            nBytes++;
          }
        }
        return WordArray2.create(words, nBytes);
      }
    })();
    return CryptoJS2.enc.Base64;
  });
})(encBase64);
var Base64 = encBase64.exports;
/*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
var CognitoUserSession = /* @__PURE__ */ function() {
  function CognitoUserSession2(_temp) {
    var _ref = _temp === void 0 ? {} : _temp, IdToken = _ref.IdToken, RefreshToken = _ref.RefreshToken, AccessToken = _ref.AccessToken, ClockDrift = _ref.ClockDrift;
    if (AccessToken == null || IdToken == null) {
      throw new Error("Id token and Access Token must be present.");
    }
    this.idToken = IdToken;
    this.refreshToken = RefreshToken;
    this.accessToken = AccessToken;
    this.clockDrift = ClockDrift === void 0 ? this.calculateClockDrift() : ClockDrift;
  }
  var _proto = CognitoUserSession2.prototype;
  _proto.getIdToken = function getIdToken() {
    return this.idToken;
  };
  _proto.getRefreshToken = function getRefreshToken() {
    return this.refreshToken;
  };
  _proto.getAccessToken = function getAccessToken() {
    return this.accessToken;
  };
  _proto.getClockDrift = function getClockDrift() {
    return this.clockDrift;
  };
  _proto.calculateClockDrift = function calculateClockDrift() {
    var now2 = Math.floor(new Date() / 1e3);
    var iat = Math.min(this.accessToken.getIssuedAt(), this.idToken.getIssuedAt());
    return now2 - iat;
  };
  _proto.isValid = function isValid() {
    var now2 = Math.floor(new Date() / 1e3);
    var adjusted = now2 - this.clockDrift;
    return adjusted < this.accessToken.getExpiration() && adjusted < this.idToken.getExpiration();
  };
  return CognitoUserSession2;
}();
/*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var DateHelper = /* @__PURE__ */ function() {
  function DateHelper2() {
  }
  var _proto = DateHelper2.prototype;
  _proto.getNowString = function getNowString() {
    var now2 = new Date();
    var weekDay = weekNames[now2.getUTCDay()];
    var month = monthNames[now2.getUTCMonth()];
    var day = now2.getUTCDate();
    var hours = now2.getUTCHours();
    if (hours < 10) {
      hours = "0" + hours;
    }
    var minutes = now2.getUTCMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    var seconds = now2.getUTCSeconds();
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    var year = now2.getUTCFullYear();
    var dateNow = weekDay + " " + month + " " + day + " " + hours + ":" + minutes + ":" + seconds + " UTC " + year;
    return dateNow;
  };
  return DateHelper2;
}();
/*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
var CognitoUserAttribute = /* @__PURE__ */ function() {
  function CognitoUserAttribute2(_temp) {
    var _ref = _temp === void 0 ? {} : _temp, Name = _ref.Name, Value = _ref.Value;
    this.Name = Name || "";
    this.Value = Value || "";
  }
  var _proto = CognitoUserAttribute2.prototype;
  _proto.getValue = function getValue() {
    return this.Value;
  };
  _proto.setValue = function setValue(value) {
    this.Value = value;
    return this;
  };
  _proto.getName = function getName() {
    return this.Name;
  };
  _proto.setName = function setName(name) {
    this.Name = name;
    return this;
  };
  _proto.toString = function toString2() {
    return JSON.stringify(this);
  };
  _proto.toJSON = function toJSON() {
    return {
      Name: this.Name,
      Value: this.Value
    };
  };
  return CognitoUserAttribute2;
}();
/*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
var dataMemory = {};
var MemoryStorage = /* @__PURE__ */ function() {
  function MemoryStorage2() {
  }
  MemoryStorage2.setItem = function setItem(key, value) {
    dataMemory[key] = value;
    return dataMemory[key];
  };
  MemoryStorage2.getItem = function getItem(key) {
    return Object.prototype.hasOwnProperty.call(dataMemory, key) ? dataMemory[key] : void 0;
  };
  MemoryStorage2.removeItem = function removeItem(key) {
    return delete dataMemory[key];
  };
  MemoryStorage2.clear = function clear() {
    dataMemory = {};
    return dataMemory;
  };
  return MemoryStorage2;
}();
var StorageHelper = /* @__PURE__ */ function() {
  function StorageHelper2() {
    try {
      this.storageWindow = window.localStorage;
      this.storageWindow.setItem("aws.cognito.test-ls", 1);
      this.storageWindow.removeItem("aws.cognito.test-ls");
    } catch (exception) {
      this.storageWindow = MemoryStorage;
    }
  }
  var _proto = StorageHelper2.prototype;
  _proto.getStorage = function getStorage() {
    return this.storageWindow;
  };
  return StorageHelper2;
}();
/*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
var isBrowser = typeof navigator !== "undefined";
var userAgent = isBrowser ? navigator.userAgent : "nodejs";
var CognitoUser = /* @__PURE__ */ function() {
  function CognitoUser2(data) {
    if (data == null || data.Username == null || data.Pool == null) {
      throw new Error("Username and Pool information are required.");
    }
    this.username = data.Username || "";
    this.pool = data.Pool;
    this.Session = null;
    this.client = data.Pool.client;
    this.signInUserSession = null;
    this.authenticationFlowType = "USER_SRP_AUTH";
    this.storage = data.Storage || new StorageHelper().getStorage();
    this.keyPrefix = "CognitoIdentityServiceProvider." + this.pool.getClientId();
    this.userDataKey = this.keyPrefix + "." + this.username + ".userData";
  }
  var _proto = CognitoUser2.prototype;
  _proto.setSignInUserSession = function setSignInUserSession(signInUserSession) {
    this.clearCachedUserData();
    this.signInUserSession = signInUserSession;
    this.cacheTokens();
  };
  _proto.getSignInUserSession = function getSignInUserSession() {
    return this.signInUserSession;
  };
  _proto.getUsername = function getUsername() {
    return this.username;
  };
  _proto.getAuthenticationFlowType = function getAuthenticationFlowType() {
    return this.authenticationFlowType;
  };
  _proto.setAuthenticationFlowType = function setAuthenticationFlowType(authenticationFlowType) {
    this.authenticationFlowType = authenticationFlowType;
  };
  _proto.initiateAuth = function initiateAuth(authDetails, callback) {
    var _this = this;
    var authParameters = authDetails.getAuthParameters();
    authParameters.USERNAME = this.username;
    var clientMetaData = Object.keys(authDetails.getValidationData()).length !== 0 ? authDetails.getValidationData() : authDetails.getClientMetadata();
    var jsonReq = {
      AuthFlow: "CUSTOM_AUTH",
      ClientId: this.pool.getClientId(),
      AuthParameters: authParameters,
      ClientMetadata: clientMetaData
    };
    if (this.getUserContextData()) {
      jsonReq.UserContextData = this.getUserContextData();
    }
    this.client.request("InitiateAuth", jsonReq, function(err, data) {
      if (err) {
        return callback.onFailure(err);
      }
      var challengeName = data.ChallengeName;
      var challengeParameters = data.ChallengeParameters;
      if (challengeName === "CUSTOM_CHALLENGE") {
        _this.Session = data.Session;
        return callback.customChallenge(challengeParameters);
      }
      _this.signInUserSession = _this.getCognitoUserSession(data.AuthenticationResult);
      _this.cacheTokens();
      return callback.onSuccess(_this.signInUserSession);
    });
  };
  _proto.authenticateUser = function authenticateUser(authDetails, callback) {
    if (this.authenticationFlowType === "USER_PASSWORD_AUTH") {
      return this.authenticateUserPlainUsernamePassword(authDetails, callback);
    } else if (this.authenticationFlowType === "USER_SRP_AUTH" || this.authenticationFlowType === "CUSTOM_AUTH") {
      return this.authenticateUserDefaultAuth(authDetails, callback);
    }
    return callback.onFailure(new Error("Authentication flow type is invalid."));
  };
  _proto.authenticateUserDefaultAuth = function authenticateUserDefaultAuth(authDetails, callback) {
    var _this2 = this;
    var authenticationHelper = new AuthenticationHelper(this.pool.getUserPoolId().split("_")[1]);
    var dateHelper = new DateHelper();
    var serverBValue;
    var salt;
    var authParameters = {};
    if (this.deviceKey != null) {
      authParameters.DEVICE_KEY = this.deviceKey;
    }
    authParameters.USERNAME = this.username;
    authenticationHelper.getLargeAValue(function(errOnAValue, aValue) {
      if (errOnAValue) {
        callback.onFailure(errOnAValue);
      }
      authParameters.SRP_A = aValue.toString(16);
      if (_this2.authenticationFlowType === "CUSTOM_AUTH") {
        authParameters.CHALLENGE_NAME = "SRP_A";
      }
      var clientMetaData = Object.keys(authDetails.getValidationData()).length !== 0 ? authDetails.getValidationData() : authDetails.getClientMetadata();
      var jsonReq = {
        AuthFlow: _this2.authenticationFlowType,
        ClientId: _this2.pool.getClientId(),
        AuthParameters: authParameters,
        ClientMetadata: clientMetaData
      };
      if (_this2.getUserContextData(_this2.username)) {
        jsonReq.UserContextData = _this2.getUserContextData(_this2.username);
      }
      _this2.client.request("InitiateAuth", jsonReq, function(err, data) {
        if (err) {
          return callback.onFailure(err);
        }
        var challengeParameters = data.ChallengeParameters;
        _this2.username = challengeParameters.USER_ID_FOR_SRP;
        _this2.userDataKey = _this2.keyPrefix + "." + _this2.username + ".userData";
        serverBValue = new BigInteger(challengeParameters.SRP_B, 16);
        salt = new BigInteger(challengeParameters.SALT, 16);
        _this2.getCachedDeviceKeyAndPassword();
        authenticationHelper.getPasswordAuthenticationKey(_this2.username, authDetails.getPassword(), serverBValue, salt, function(errOnHkdf, hkdf) {
          if (errOnHkdf) {
            callback.onFailure(errOnHkdf);
          }
          var dateNow = dateHelper.getNowString();
          var message = CryptoJS.lib.WordArray.create(buffer.Buffer.concat([buffer.Buffer.from(_this2.pool.getUserPoolId().split("_")[1], "utf8"), buffer.Buffer.from(_this2.username, "utf8"), buffer.Buffer.from(challengeParameters.SECRET_BLOCK, "base64"), buffer.Buffer.from(dateNow, "utf8")]));
          var key = CryptoJS.lib.WordArray.create(hkdf);
          var signatureString = Base64.stringify(HmacSHA256(message, key));
          var challengeResponses = {};
          challengeResponses.USERNAME = _this2.username;
          challengeResponses.PASSWORD_CLAIM_SECRET_BLOCK = challengeParameters.SECRET_BLOCK;
          challengeResponses.TIMESTAMP = dateNow;
          challengeResponses.PASSWORD_CLAIM_SIGNATURE = signatureString;
          if (_this2.deviceKey != null) {
            challengeResponses.DEVICE_KEY = _this2.deviceKey;
          }
          var respondToAuthChallenge = function respondToAuthChallenge2(challenge, challengeCallback) {
            return _this2.client.request("RespondToAuthChallenge", challenge, function(errChallenge, dataChallenge) {
              if (errChallenge && errChallenge.code === "ResourceNotFoundException" && errChallenge.message.toLowerCase().indexOf("device") !== -1) {
                challengeResponses.DEVICE_KEY = null;
                _this2.deviceKey = null;
                _this2.randomPassword = null;
                _this2.deviceGroupKey = null;
                _this2.clearCachedDeviceKeyAndPassword();
                return respondToAuthChallenge2(challenge, challengeCallback);
              }
              return challengeCallback(errChallenge, dataChallenge);
            });
          };
          var jsonReqResp = {
            ChallengeName: "PASSWORD_VERIFIER",
            ClientId: _this2.pool.getClientId(),
            ChallengeResponses: challengeResponses,
            Session: data.Session,
            ClientMetadata: clientMetaData
          };
          if (_this2.getUserContextData()) {
            jsonReqResp.UserContextData = _this2.getUserContextData();
          }
          respondToAuthChallenge(jsonReqResp, function(errAuthenticate, dataAuthenticate) {
            if (errAuthenticate) {
              return callback.onFailure(errAuthenticate);
            }
            return _this2.authenticateUserInternal(dataAuthenticate, authenticationHelper, callback);
          });
          return void 0;
        });
        return void 0;
      });
    });
  };
  _proto.authenticateUserPlainUsernamePassword = function authenticateUserPlainUsernamePassword(authDetails, callback) {
    var _this3 = this;
    var authParameters = {};
    authParameters.USERNAME = this.username;
    authParameters.PASSWORD = authDetails.getPassword();
    if (!authParameters.PASSWORD) {
      callback.onFailure(new Error("PASSWORD parameter is required"));
      return;
    }
    var authenticationHelper = new AuthenticationHelper(this.pool.getUserPoolId().split("_")[1]);
    this.getCachedDeviceKeyAndPassword();
    if (this.deviceKey != null) {
      authParameters.DEVICE_KEY = this.deviceKey;
    }
    var clientMetaData = Object.keys(authDetails.getValidationData()).length !== 0 ? authDetails.getValidationData() : authDetails.getClientMetadata();
    var jsonReq = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: this.pool.getClientId(),
      AuthParameters: authParameters,
      ClientMetadata: clientMetaData
    };
    if (this.getUserContextData(this.username)) {
      jsonReq.UserContextData = this.getUserContextData(this.username);
    }
    this.client.request("InitiateAuth", jsonReq, function(err, authResult) {
      if (err) {
        return callback.onFailure(err);
      }
      return _this3.authenticateUserInternal(authResult, authenticationHelper, callback);
    });
  };
  _proto.authenticateUserInternal = function authenticateUserInternal(dataAuthenticate, authenticationHelper, callback) {
    var _this4 = this;
    var challengeName = dataAuthenticate.ChallengeName;
    var challengeParameters = dataAuthenticate.ChallengeParameters;
    if (challengeName === "SMS_MFA") {
      this.Session = dataAuthenticate.Session;
      return callback.mfaRequired(challengeName, challengeParameters);
    }
    if (challengeName === "SELECT_MFA_TYPE") {
      this.Session = dataAuthenticate.Session;
      return callback.selectMFAType(challengeName, challengeParameters);
    }
    if (challengeName === "MFA_SETUP") {
      this.Session = dataAuthenticate.Session;
      return callback.mfaSetup(challengeName, challengeParameters);
    }
    if (challengeName === "SOFTWARE_TOKEN_MFA") {
      this.Session = dataAuthenticate.Session;
      return callback.totpRequired(challengeName, challengeParameters);
    }
    if (challengeName === "CUSTOM_CHALLENGE") {
      this.Session = dataAuthenticate.Session;
      return callback.customChallenge(challengeParameters);
    }
    if (challengeName === "NEW_PASSWORD_REQUIRED") {
      this.Session = dataAuthenticate.Session;
      var userAttributes = null;
      var rawRequiredAttributes = null;
      var requiredAttributes = [];
      var userAttributesPrefix = authenticationHelper.getNewPasswordRequiredChallengeUserAttributePrefix();
      if (challengeParameters) {
        userAttributes = JSON.parse(dataAuthenticate.ChallengeParameters.userAttributes);
        rawRequiredAttributes = JSON.parse(dataAuthenticate.ChallengeParameters.requiredAttributes);
      }
      if (rawRequiredAttributes) {
        for (var i = 0; i < rawRequiredAttributes.length; i++) {
          requiredAttributes[i] = rawRequiredAttributes[i].substr(userAttributesPrefix.length);
        }
      }
      return callback.newPasswordRequired(userAttributes, requiredAttributes);
    }
    if (challengeName === "DEVICE_SRP_AUTH") {
      this.Session = dataAuthenticate.Session;
      this.getDeviceResponse(callback);
      return void 0;
    }
    this.signInUserSession = this.getCognitoUserSession(dataAuthenticate.AuthenticationResult);
    this.challengeName = challengeName;
    this.cacheTokens();
    var newDeviceMetadata = dataAuthenticate.AuthenticationResult.NewDeviceMetadata;
    if (newDeviceMetadata == null) {
      return callback.onSuccess(this.signInUserSession);
    }
    authenticationHelper.generateHashDevice(dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey, dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceKey, function(errGenHash) {
      if (errGenHash) {
        return callback.onFailure(errGenHash);
      }
      var deviceSecretVerifierConfig = {
        Salt: buffer.Buffer.from(authenticationHelper.getSaltDevices(), "hex").toString("base64"),
        PasswordVerifier: buffer.Buffer.from(authenticationHelper.getVerifierDevices(), "hex").toString("base64")
      };
      _this4.verifierDevices = deviceSecretVerifierConfig.PasswordVerifier;
      _this4.deviceGroupKey = newDeviceMetadata.DeviceGroupKey;
      _this4.randomPassword = authenticationHelper.getRandomPassword();
      _this4.client.request("ConfirmDevice", {
        DeviceKey: newDeviceMetadata.DeviceKey,
        AccessToken: _this4.signInUserSession.getAccessToken().getJwtToken(),
        DeviceSecretVerifierConfig: deviceSecretVerifierConfig,
        DeviceName: userAgent
      }, function(errConfirm, dataConfirm) {
        if (errConfirm) {
          return callback.onFailure(errConfirm);
        }
        _this4.deviceKey = dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceKey;
        _this4.cacheDeviceKeyAndPassword();
        if (dataConfirm.UserConfirmationNecessary === true) {
          return callback.onSuccess(_this4.signInUserSession, dataConfirm.UserConfirmationNecessary);
        }
        return callback.onSuccess(_this4.signInUserSession);
      });
      return void 0;
    });
    return void 0;
  };
  _proto.completeNewPasswordChallenge = function completeNewPasswordChallenge(newPassword, requiredAttributeData, callback, clientMetadata) {
    var _this5 = this;
    if (!newPassword) {
      return callback.onFailure(new Error("New password is required."));
    }
    var authenticationHelper = new AuthenticationHelper(this.pool.getUserPoolId().split("_")[1]);
    var userAttributesPrefix = authenticationHelper.getNewPasswordRequiredChallengeUserAttributePrefix();
    var finalUserAttributes = {};
    if (requiredAttributeData) {
      Object.keys(requiredAttributeData).forEach(function(key) {
        finalUserAttributes[userAttributesPrefix + key] = requiredAttributeData[key];
      });
    }
    finalUserAttributes.NEW_PASSWORD = newPassword;
    finalUserAttributes.USERNAME = this.username;
    var jsonReq = {
      ChallengeName: "NEW_PASSWORD_REQUIRED",
      ClientId: this.pool.getClientId(),
      ChallengeResponses: finalUserAttributes,
      Session: this.Session,
      ClientMetadata: clientMetadata
    };
    if (this.getUserContextData()) {
      jsonReq.UserContextData = this.getUserContextData();
    }
    this.client.request("RespondToAuthChallenge", jsonReq, function(errAuthenticate, dataAuthenticate) {
      if (errAuthenticate) {
        return callback.onFailure(errAuthenticate);
      }
      return _this5.authenticateUserInternal(dataAuthenticate, authenticationHelper, callback);
    });
    return void 0;
  };
  _proto.getDeviceResponse = function getDeviceResponse(callback, clientMetadata) {
    var _this6 = this;
    var authenticationHelper = new AuthenticationHelper(this.deviceGroupKey);
    var dateHelper = new DateHelper();
    var authParameters = {};
    authParameters.USERNAME = this.username;
    authParameters.DEVICE_KEY = this.deviceKey;
    authenticationHelper.getLargeAValue(function(errAValue, aValue) {
      if (errAValue) {
        callback.onFailure(errAValue);
      }
      authParameters.SRP_A = aValue.toString(16);
      var jsonReq = {
        ChallengeName: "DEVICE_SRP_AUTH",
        ClientId: _this6.pool.getClientId(),
        ChallengeResponses: authParameters,
        ClientMetadata: clientMetadata,
        Session: _this6.Session
      };
      if (_this6.getUserContextData()) {
        jsonReq.UserContextData = _this6.getUserContextData();
      }
      _this6.client.request("RespondToAuthChallenge", jsonReq, function(err, data) {
        if (err) {
          return callback.onFailure(err);
        }
        var challengeParameters = data.ChallengeParameters;
        var serverBValue = new BigInteger(challengeParameters.SRP_B, 16);
        var salt = new BigInteger(challengeParameters.SALT, 16);
        authenticationHelper.getPasswordAuthenticationKey(_this6.deviceKey, _this6.randomPassword, serverBValue, salt, function(errHkdf, hkdf) {
          if (errHkdf) {
            return callback.onFailure(errHkdf);
          }
          var dateNow = dateHelper.getNowString();
          var message = CryptoJS.lib.WordArray.create(buffer.Buffer.concat([buffer.Buffer.from(_this6.deviceGroupKey, "utf8"), buffer.Buffer.from(_this6.deviceKey, "utf8"), buffer.Buffer.from(challengeParameters.SECRET_BLOCK, "base64"), buffer.Buffer.from(dateNow, "utf8")]));
          var key = CryptoJS.lib.WordArray.create(hkdf);
          var signatureString = Base64.stringify(HmacSHA256(message, key));
          var challengeResponses = {};
          challengeResponses.USERNAME = _this6.username;
          challengeResponses.PASSWORD_CLAIM_SECRET_BLOCK = challengeParameters.SECRET_BLOCK;
          challengeResponses.TIMESTAMP = dateNow;
          challengeResponses.PASSWORD_CLAIM_SIGNATURE = signatureString;
          challengeResponses.DEVICE_KEY = _this6.deviceKey;
          var jsonReqResp = {
            ChallengeName: "DEVICE_PASSWORD_VERIFIER",
            ClientId: _this6.pool.getClientId(),
            ChallengeResponses: challengeResponses,
            Session: data.Session
          };
          if (_this6.getUserContextData()) {
            jsonReqResp.UserContextData = _this6.getUserContextData();
          }
          _this6.client.request("RespondToAuthChallenge", jsonReqResp, function(errAuthenticate, dataAuthenticate) {
            if (errAuthenticate) {
              return callback.onFailure(errAuthenticate);
            }
            _this6.signInUserSession = _this6.getCognitoUserSession(dataAuthenticate.AuthenticationResult);
            _this6.cacheTokens();
            return callback.onSuccess(_this6.signInUserSession);
          });
          return void 0;
        });
        return void 0;
      });
    });
  };
  _proto.confirmRegistration = function confirmRegistration(confirmationCode, forceAliasCreation, callback, clientMetadata) {
    var jsonReq = {
      ClientId: this.pool.getClientId(),
      ConfirmationCode: confirmationCode,
      Username: this.username,
      ForceAliasCreation: forceAliasCreation,
      ClientMetadata: clientMetadata
    };
    if (this.getUserContextData()) {
      jsonReq.UserContextData = this.getUserContextData();
    }
    this.client.request("ConfirmSignUp", jsonReq, function(err) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, "SUCCESS");
    });
  };
  _proto.sendCustomChallengeAnswer = function sendCustomChallengeAnswer(answerChallenge, callback, clientMetadata) {
    var _this7 = this;
    var challengeResponses = {};
    challengeResponses.USERNAME = this.username;
    challengeResponses.ANSWER = answerChallenge;
    var authenticationHelper = new AuthenticationHelper(this.pool.getUserPoolId().split("_")[1]);
    this.getCachedDeviceKeyAndPassword();
    if (this.deviceKey != null) {
      challengeResponses.DEVICE_KEY = this.deviceKey;
    }
    var jsonReq = {
      ChallengeName: "CUSTOM_CHALLENGE",
      ChallengeResponses: challengeResponses,
      ClientId: this.pool.getClientId(),
      Session: this.Session,
      ClientMetadata: clientMetadata
    };
    if (this.getUserContextData()) {
      jsonReq.UserContextData = this.getUserContextData();
    }
    this.client.request("RespondToAuthChallenge", jsonReq, function(err, data) {
      if (err) {
        return callback.onFailure(err);
      }
      return _this7.authenticateUserInternal(data, authenticationHelper, callback);
    });
  };
  _proto.sendMFACode = function sendMFACode(confirmationCode, callback, mfaType, clientMetadata) {
    var _this8 = this;
    var challengeResponses = {};
    challengeResponses.USERNAME = this.username;
    challengeResponses.SMS_MFA_CODE = confirmationCode;
    var mfaTypeSelection = mfaType || "SMS_MFA";
    if (mfaTypeSelection === "SOFTWARE_TOKEN_MFA") {
      challengeResponses.SOFTWARE_TOKEN_MFA_CODE = confirmationCode;
    }
    if (this.deviceKey != null) {
      challengeResponses.DEVICE_KEY = this.deviceKey;
    }
    var jsonReq = {
      ChallengeName: mfaTypeSelection,
      ChallengeResponses: challengeResponses,
      ClientId: this.pool.getClientId(),
      Session: this.Session,
      ClientMetadata: clientMetadata
    };
    if (this.getUserContextData()) {
      jsonReq.UserContextData = this.getUserContextData();
    }
    this.client.request("RespondToAuthChallenge", jsonReq, function(err, dataAuthenticate) {
      if (err) {
        return callback.onFailure(err);
      }
      var challengeName = dataAuthenticate.ChallengeName;
      if (challengeName === "DEVICE_SRP_AUTH") {
        _this8.getDeviceResponse(callback);
        return void 0;
      }
      _this8.signInUserSession = _this8.getCognitoUserSession(dataAuthenticate.AuthenticationResult);
      _this8.cacheTokens();
      if (dataAuthenticate.AuthenticationResult.NewDeviceMetadata == null) {
        return callback.onSuccess(_this8.signInUserSession);
      }
      var authenticationHelper = new AuthenticationHelper(_this8.pool.getUserPoolId().split("_")[1]);
      authenticationHelper.generateHashDevice(dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey, dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceKey, function(errGenHash) {
        if (errGenHash) {
          return callback.onFailure(errGenHash);
        }
        var deviceSecretVerifierConfig = {
          Salt: buffer.Buffer.from(authenticationHelper.getSaltDevices(), "hex").toString("base64"),
          PasswordVerifier: buffer.Buffer.from(authenticationHelper.getVerifierDevices(), "hex").toString("base64")
        };
        _this8.verifierDevices = deviceSecretVerifierConfig.PasswordVerifier;
        _this8.deviceGroupKey = dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey;
        _this8.randomPassword = authenticationHelper.getRandomPassword();
        _this8.client.request("ConfirmDevice", {
          DeviceKey: dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceKey,
          AccessToken: _this8.signInUserSession.getAccessToken().getJwtToken(),
          DeviceSecretVerifierConfig: deviceSecretVerifierConfig,
          DeviceName: userAgent
        }, function(errConfirm, dataConfirm) {
          if (errConfirm) {
            return callback.onFailure(errConfirm);
          }
          _this8.deviceKey = dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceKey;
          _this8.cacheDeviceKeyAndPassword();
          if (dataConfirm.UserConfirmationNecessary === true) {
            return callback.onSuccess(_this8.signInUserSession, dataConfirm.UserConfirmationNecessary);
          }
          return callback.onSuccess(_this8.signInUserSession);
        });
        return void 0;
      });
      return void 0;
    });
  };
  _proto.changePassword = function changePassword(oldUserPassword, newUserPassword, callback, clientMetadata) {
    if (!(this.signInUserSession != null && this.signInUserSession.isValid())) {
      return callback(new Error("User is not authenticated"), null);
    }
    this.client.request("ChangePassword", {
      PreviousPassword: oldUserPassword,
      ProposedPassword: newUserPassword,
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
      ClientMetadata: clientMetadata
    }, function(err) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, "SUCCESS");
    });
    return void 0;
  };
  _proto.enableMFA = function enableMFA(callback) {
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback(new Error("User is not authenticated"), null);
    }
    var mfaOptions = [];
    var mfaEnabled = {
      DeliveryMedium: "SMS",
      AttributeName: "phone_number"
    };
    mfaOptions.push(mfaEnabled);
    this.client.request("SetUserSettings", {
      MFAOptions: mfaOptions,
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
    }, function(err) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, "SUCCESS");
    });
    return void 0;
  };
  _proto.setUserMfaPreference = function setUserMfaPreference(smsMfaSettings, softwareTokenMfaSettings, callback) {
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback(new Error("User is not authenticated"), null);
    }
    this.client.request("SetUserMFAPreference", {
      SMSMfaSettings: smsMfaSettings,
      SoftwareTokenMfaSettings: softwareTokenMfaSettings,
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
    }, function(err) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, "SUCCESS");
    });
    return void 0;
  };
  _proto.disableMFA = function disableMFA(callback) {
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback(new Error("User is not authenticated"), null);
    }
    var mfaOptions = [];
    this.client.request("SetUserSettings", {
      MFAOptions: mfaOptions,
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
    }, function(err) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, "SUCCESS");
    });
    return void 0;
  };
  _proto.deleteUser = function deleteUser(callback, clientMetadata) {
    var _this9 = this;
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback(new Error("User is not authenticated"), null);
    }
    this.client.request("DeleteUser", {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
      ClientMetadata: clientMetadata
    }, function(err) {
      if (err) {
        return callback(err, null);
      }
      _this9.clearCachedUser();
      return callback(null, "SUCCESS");
    });
    return void 0;
  };
  _proto.updateAttributes = function updateAttributes(attributes, callback, clientMetadata) {
    var _this10 = this;
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback(new Error("User is not authenticated"), null);
    }
    this.client.request("UpdateUserAttributes", {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
      UserAttributes: attributes,
      ClientMetadata: clientMetadata
    }, function(err) {
      if (err) {
        return callback(err, null);
      }
      return _this10.getUserData(function() {
        return callback(null, "SUCCESS");
      }, {
        bypassCache: true
      });
    });
    return void 0;
  };
  _proto.getUserAttributes = function getUserAttributes(callback) {
    if (!(this.signInUserSession != null && this.signInUserSession.isValid())) {
      return callback(new Error("User is not authenticated"), null);
    }
    this.client.request("GetUser", {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
    }, function(err, userData) {
      if (err) {
        return callback(err, null);
      }
      var attributeList = [];
      for (var i = 0; i < userData.UserAttributes.length; i++) {
        var attribute = {
          Name: userData.UserAttributes[i].Name,
          Value: userData.UserAttributes[i].Value
        };
        var userAttribute = new CognitoUserAttribute(attribute);
        attributeList.push(userAttribute);
      }
      return callback(null, attributeList);
    });
    return void 0;
  };
  _proto.getMFAOptions = function getMFAOptions(callback) {
    if (!(this.signInUserSession != null && this.signInUserSession.isValid())) {
      return callback(new Error("User is not authenticated"), null);
    }
    this.client.request("GetUser", {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
    }, function(err, userData) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, userData.MFAOptions);
    });
    return void 0;
  };
  _proto.createGetUserRequest = function createGetUserRequest() {
    return this.client.promisifyRequest("GetUser", {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
    });
  };
  _proto.refreshSessionIfPossible = function refreshSessionIfPossible(options) {
    var _this11 = this;
    if (options === void 0) {
      options = {};
    }
    return new Promise(function(resolve) {
      var refresh = _this11.signInUserSession.getRefreshToken();
      if (refresh && refresh.getToken()) {
        _this11.refreshSession(refresh, resolve, options.clientMetadata);
      } else {
        resolve();
      }
    });
  };
  _proto.getUserData = function getUserData(callback, params) {
    var _this12 = this;
    if (!(this.signInUserSession != null && this.signInUserSession.isValid())) {
      this.clearCachedUserData();
      return callback(new Error("User is not authenticated"), null);
    }
    var userData = this.getUserDataFromCache();
    if (!userData) {
      this.fetchUserData().then(function(data) {
        callback(null, data);
      })["catch"](callback);
      return;
    }
    if (this.isFetchUserDataAndTokenRequired(params)) {
      this.fetchUserData().then(function(data) {
        return _this12.refreshSessionIfPossible(params).then(function() {
          return data;
        });
      }).then(function(data) {
        return callback(null, data);
      })["catch"](callback);
      return;
    }
    try {
      callback(null, JSON.parse(userData));
      return;
    } catch (err) {
      this.clearCachedUserData();
      callback(err, null);
      return;
    }
  };
  _proto.getUserDataFromCache = function getUserDataFromCache() {
    var userData = this.storage.getItem(this.userDataKey);
    return userData;
  };
  _proto.isFetchUserDataAndTokenRequired = function isFetchUserDataAndTokenRequired(params) {
    var _ref = params || {}, _ref$bypassCache = _ref.bypassCache, bypassCache = _ref$bypassCache === void 0 ? false : _ref$bypassCache;
    return bypassCache;
  };
  _proto.fetchUserData = function fetchUserData() {
    var _this13 = this;
    return this.createGetUserRequest().then(function(data) {
      _this13.cacheUserData(data);
      return data;
    });
  };
  _proto.deleteAttributes = function deleteAttributes(attributeList, callback) {
    var _this14 = this;
    if (!(this.signInUserSession != null && this.signInUserSession.isValid())) {
      return callback(new Error("User is not authenticated"), null);
    }
    this.client.request("DeleteUserAttributes", {
      UserAttributeNames: attributeList,
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
    }, function(err) {
      if (err) {
        return callback(err, null);
      }
      return _this14.getUserData(function() {
        return callback(null, "SUCCESS");
      }, {
        bypassCache: true
      });
    });
    return void 0;
  };
  _proto.resendConfirmationCode = function resendConfirmationCode(callback, clientMetadata) {
    var jsonReq = {
      ClientId: this.pool.getClientId(),
      Username: this.username,
      ClientMetadata: clientMetadata
    };
    this.client.request("ResendConfirmationCode", jsonReq, function(err, result) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  };
  _proto.getSession = function getSession(callback, options) {
    if (options === void 0) {
      options = {};
    }
    if (this.username == null) {
      return callback(new Error("Username is null. Cannot retrieve a new session"), null);
    }
    if (this.signInUserSession != null && this.signInUserSession.isValid()) {
      return callback(null, this.signInUserSession);
    }
    var keyPrefix = "CognitoIdentityServiceProvider." + this.pool.getClientId() + "." + this.username;
    var idTokenKey = keyPrefix + ".idToken";
    var accessTokenKey = keyPrefix + ".accessToken";
    var refreshTokenKey = keyPrefix + ".refreshToken";
    var clockDriftKey = keyPrefix + ".clockDrift";
    if (this.storage.getItem(idTokenKey)) {
      var idToken = new CognitoIdToken({
        IdToken: this.storage.getItem(idTokenKey)
      });
      var accessToken = new CognitoAccessToken({
        AccessToken: this.storage.getItem(accessTokenKey)
      });
      var refreshToken = new CognitoRefreshToken({
        RefreshToken: this.storage.getItem(refreshTokenKey)
      });
      var clockDrift = parseInt(this.storage.getItem(clockDriftKey), 0) || 0;
      var sessionData = {
        IdToken: idToken,
        AccessToken: accessToken,
        RefreshToken: refreshToken,
        ClockDrift: clockDrift
      };
      var cachedSession = new CognitoUserSession(sessionData);
      if (cachedSession.isValid()) {
        this.signInUserSession = cachedSession;
        return callback(null, this.signInUserSession);
      }
      if (!refreshToken.getToken()) {
        return callback(new Error("Cannot retrieve a new session. Please authenticate."), null);
      }
      this.refreshSession(refreshToken, callback, options.clientMetadata);
    } else {
      callback(new Error("Local storage is missing an ID Token, Please authenticate"), null);
    }
    return void 0;
  };
  _proto.refreshSession = function refreshSession2(refreshToken, callback, clientMetadata) {
    var _this15 = this;
    var wrappedCallback = this.pool.wrapRefreshSessionCallback ? this.pool.wrapRefreshSessionCallback(callback) : callback;
    var authParameters = {};
    authParameters.REFRESH_TOKEN = refreshToken.getToken();
    var keyPrefix = "CognitoIdentityServiceProvider." + this.pool.getClientId();
    var lastUserKey = keyPrefix + ".LastAuthUser";
    if (this.storage.getItem(lastUserKey)) {
      this.username = this.storage.getItem(lastUserKey);
      var deviceKeyKey = keyPrefix + "." + this.username + ".deviceKey";
      this.deviceKey = this.storage.getItem(deviceKeyKey);
      authParameters.DEVICE_KEY = this.deviceKey;
    }
    var jsonReq = {
      ClientId: this.pool.getClientId(),
      AuthFlow: "REFRESH_TOKEN_AUTH",
      AuthParameters: authParameters,
      ClientMetadata: clientMetadata
    };
    if (this.getUserContextData()) {
      jsonReq.UserContextData = this.getUserContextData();
    }
    this.client.request("InitiateAuth", jsonReq, function(err, authResult) {
      if (err) {
        if (err.code === "NotAuthorizedException") {
          _this15.clearCachedUser();
        }
        return wrappedCallback(err, null);
      }
      if (authResult) {
        var authenticationResult = authResult.AuthenticationResult;
        if (!Object.prototype.hasOwnProperty.call(authenticationResult, "RefreshToken")) {
          authenticationResult.RefreshToken = refreshToken.getToken();
        }
        _this15.signInUserSession = _this15.getCognitoUserSession(authenticationResult);
        _this15.cacheTokens();
        return wrappedCallback(null, _this15.signInUserSession);
      }
      return void 0;
    });
  };
  _proto.cacheTokens = function cacheTokens() {
    var keyPrefix = "CognitoIdentityServiceProvider." + this.pool.getClientId();
    var idTokenKey = keyPrefix + "." + this.username + ".idToken";
    var accessTokenKey = keyPrefix + "." + this.username + ".accessToken";
    var refreshTokenKey = keyPrefix + "." + this.username + ".refreshToken";
    var clockDriftKey = keyPrefix + "." + this.username + ".clockDrift";
    var lastUserKey = keyPrefix + ".LastAuthUser";
    this.storage.setItem(idTokenKey, this.signInUserSession.getIdToken().getJwtToken());
    this.storage.setItem(accessTokenKey, this.signInUserSession.getAccessToken().getJwtToken());
    this.storage.setItem(refreshTokenKey, this.signInUserSession.getRefreshToken().getToken());
    this.storage.setItem(clockDriftKey, "" + this.signInUserSession.getClockDrift());
    this.storage.setItem(lastUserKey, this.username);
  };
  _proto.cacheUserData = function cacheUserData(userData) {
    this.storage.setItem(this.userDataKey, JSON.stringify(userData));
  };
  _proto.clearCachedUserData = function clearCachedUserData() {
    this.storage.removeItem(this.userDataKey);
  };
  _proto.clearCachedUser = function clearCachedUser() {
    this.clearCachedTokens();
    this.clearCachedUserData();
  };
  _proto.cacheDeviceKeyAndPassword = function cacheDeviceKeyAndPassword() {
    var keyPrefix = "CognitoIdentityServiceProvider." + this.pool.getClientId() + "." + this.username;
    var deviceKeyKey = keyPrefix + ".deviceKey";
    var randomPasswordKey = keyPrefix + ".randomPasswordKey";
    var deviceGroupKeyKey = keyPrefix + ".deviceGroupKey";
    this.storage.setItem(deviceKeyKey, this.deviceKey);
    this.storage.setItem(randomPasswordKey, this.randomPassword);
    this.storage.setItem(deviceGroupKeyKey, this.deviceGroupKey);
  };
  _proto.getCachedDeviceKeyAndPassword = function getCachedDeviceKeyAndPassword() {
    var keyPrefix = "CognitoIdentityServiceProvider." + this.pool.getClientId() + "." + this.username;
    var deviceKeyKey = keyPrefix + ".deviceKey";
    var randomPasswordKey = keyPrefix + ".randomPasswordKey";
    var deviceGroupKeyKey = keyPrefix + ".deviceGroupKey";
    if (this.storage.getItem(deviceKeyKey)) {
      this.deviceKey = this.storage.getItem(deviceKeyKey);
      this.randomPassword = this.storage.getItem(randomPasswordKey);
      this.deviceGroupKey = this.storage.getItem(deviceGroupKeyKey);
    }
  };
  _proto.clearCachedDeviceKeyAndPassword = function clearCachedDeviceKeyAndPassword() {
    var keyPrefix = "CognitoIdentityServiceProvider." + this.pool.getClientId() + "." + this.username;
    var deviceKeyKey = keyPrefix + ".deviceKey";
    var randomPasswordKey = keyPrefix + ".randomPasswordKey";
    var deviceGroupKeyKey = keyPrefix + ".deviceGroupKey";
    this.storage.removeItem(deviceKeyKey);
    this.storage.removeItem(randomPasswordKey);
    this.storage.removeItem(deviceGroupKeyKey);
  };
  _proto.clearCachedTokens = function clearCachedTokens() {
    var keyPrefix = "CognitoIdentityServiceProvider." + this.pool.getClientId();
    var idTokenKey = keyPrefix + "." + this.username + ".idToken";
    var accessTokenKey = keyPrefix + "." + this.username + ".accessToken";
    var refreshTokenKey = keyPrefix + "." + this.username + ".refreshToken";
    var lastUserKey = keyPrefix + ".LastAuthUser";
    var clockDriftKey = keyPrefix + "." + this.username + ".clockDrift";
    this.storage.removeItem(idTokenKey);
    this.storage.removeItem(accessTokenKey);
    this.storage.removeItem(refreshTokenKey);
    this.storage.removeItem(lastUserKey);
    this.storage.removeItem(clockDriftKey);
  };
  _proto.getCognitoUserSession = function getCognitoUserSession(authResult) {
    var idToken = new CognitoIdToken(authResult);
    var accessToken = new CognitoAccessToken(authResult);
    var refreshToken = new CognitoRefreshToken(authResult);
    var sessionData = {
      IdToken: idToken,
      AccessToken: accessToken,
      RefreshToken: refreshToken
    };
    return new CognitoUserSession(sessionData);
  };
  _proto.forgotPassword = function forgotPassword(callback, clientMetadata) {
    var jsonReq = {
      ClientId: this.pool.getClientId(),
      Username: this.username,
      ClientMetadata: clientMetadata
    };
    if (this.getUserContextData()) {
      jsonReq.UserContextData = this.getUserContextData();
    }
    this.client.request("ForgotPassword", jsonReq, function(err, data) {
      if (err) {
        return callback.onFailure(err);
      }
      if (typeof callback.inputVerificationCode === "function") {
        return callback.inputVerificationCode(data);
      }
      return callback.onSuccess(data);
    });
  };
  _proto.confirmPassword = function confirmPassword(confirmationCode, newPassword, callback, clientMetadata) {
    var jsonReq = {
      ClientId: this.pool.getClientId(),
      Username: this.username,
      ConfirmationCode: confirmationCode,
      Password: newPassword,
      ClientMetadata: clientMetadata
    };
    if (this.getUserContextData()) {
      jsonReq.UserContextData = this.getUserContextData();
    }
    this.client.request("ConfirmForgotPassword", jsonReq, function(err) {
      if (err) {
        return callback.onFailure(err);
      }
      return callback.onSuccess("SUCCESS");
    });
  };
  _proto.getAttributeVerificationCode = function getAttributeVerificationCode(attributeName, callback, clientMetadata) {
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback.onFailure(new Error("User is not authenticated"));
    }
    this.client.request("GetUserAttributeVerificationCode", {
      AttributeName: attributeName,
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
      ClientMetadata: clientMetadata
    }, function(err, data) {
      if (err) {
        return callback.onFailure(err);
      }
      if (typeof callback.inputVerificationCode === "function") {
        return callback.inputVerificationCode(data);
      }
      return callback.onSuccess("SUCCESS");
    });
    return void 0;
  };
  _proto.verifyAttribute = function verifyAttribute(attributeName, confirmationCode, callback) {
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback.onFailure(new Error("User is not authenticated"));
    }
    this.client.request("VerifyUserAttribute", {
      AttributeName: attributeName,
      Code: confirmationCode,
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
    }, function(err) {
      if (err) {
        return callback.onFailure(err);
      }
      return callback.onSuccess("SUCCESS");
    });
    return void 0;
  };
  _proto.getDevice = function getDevice(callback) {
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback.onFailure(new Error("User is not authenticated"));
    }
    this.client.request("GetDevice", {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
      DeviceKey: this.deviceKey
    }, function(err, data) {
      if (err) {
        return callback.onFailure(err);
      }
      return callback.onSuccess(data);
    });
    return void 0;
  };
  _proto.forgetSpecificDevice = function forgetSpecificDevice(deviceKey, callback) {
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback.onFailure(new Error("User is not authenticated"));
    }
    this.client.request("ForgetDevice", {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
      DeviceKey: deviceKey
    }, function(err) {
      if (err) {
        return callback.onFailure(err);
      }
      return callback.onSuccess("SUCCESS");
    });
    return void 0;
  };
  _proto.forgetDevice = function forgetDevice(callback) {
    var _this16 = this;
    this.forgetSpecificDevice(this.deviceKey, {
      onFailure: callback.onFailure,
      onSuccess: function onSuccess(result) {
        _this16.deviceKey = null;
        _this16.deviceGroupKey = null;
        _this16.randomPassword = null;
        _this16.clearCachedDeviceKeyAndPassword();
        return callback.onSuccess(result);
      }
    });
  };
  _proto.setDeviceStatusRemembered = function setDeviceStatusRemembered(callback) {
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback.onFailure(new Error("User is not authenticated"));
    }
    this.client.request("UpdateDeviceStatus", {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
      DeviceKey: this.deviceKey,
      DeviceRememberedStatus: "remembered"
    }, function(err) {
      if (err) {
        return callback.onFailure(err);
      }
      return callback.onSuccess("SUCCESS");
    });
    return void 0;
  };
  _proto.setDeviceStatusNotRemembered = function setDeviceStatusNotRemembered(callback) {
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback.onFailure(new Error("User is not authenticated"));
    }
    this.client.request("UpdateDeviceStatus", {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
      DeviceKey: this.deviceKey,
      DeviceRememberedStatus: "not_remembered"
    }, function(err) {
      if (err) {
        return callback.onFailure(err);
      }
      return callback.onSuccess("SUCCESS");
    });
    return void 0;
  };
  _proto.listDevices = function listDevices(limit, paginationToken, callback) {
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback.onFailure(new Error("User is not authenticated"));
    }
    var requestParams = {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
      Limit: limit
    };
    if (paginationToken) {
      requestParams.PaginationToken = paginationToken;
    }
    this.client.request("ListDevices", requestParams, function(err, data) {
      if (err) {
        return callback.onFailure(err);
      }
      return callback.onSuccess(data);
    });
    return void 0;
  };
  _proto.globalSignOut = function globalSignOut(callback) {
    var _this17 = this;
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback.onFailure(new Error("User is not authenticated"));
    }
    this.client.request("GlobalSignOut", {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
    }, function(err) {
      if (err) {
        return callback.onFailure(err);
      }
      _this17.clearCachedUser();
      return callback.onSuccess("SUCCESS");
    });
    return void 0;
  };
  _proto.signOut = function signOut(revokeTokenCallback) {
    var _this18 = this;
    if (!revokeTokenCallback || typeof revokeTokenCallback !== "function") {
      this.cleanClientData();
      return;
    }
    this.getSession(function(error, _session) {
      if (error) {
        return revokeTokenCallback(error);
      }
      _this18.revokeTokens(function(err) {
        _this18.cleanClientData();
        revokeTokenCallback(err);
      });
    });
  };
  _proto.revokeTokens = function revokeTokens(revokeTokenCallback) {
    if (revokeTokenCallback === void 0) {
      revokeTokenCallback = function revokeTokenCallback2() {
      };
    }
    if (typeof revokeTokenCallback !== "function") {
      throw new Error("Invalid revokeTokenCallback. It should be a function.");
    }
    if (!this.signInUserSession) {
      var error = new Error("User is not authenticated");
      return revokeTokenCallback(error);
    }
    if (!this.signInUserSession.getAccessToken()) {
      var _error = new Error("No Access token available");
      return revokeTokenCallback(_error);
    }
    var refreshToken = this.signInUserSession.getRefreshToken().getToken();
    var accessToken = this.signInUserSession.getAccessToken();
    if (this.isSessionRevocable(accessToken)) {
      if (refreshToken) {
        return this.revokeToken({
          token: refreshToken,
          callback: revokeTokenCallback
        });
      }
    }
    revokeTokenCallback();
  };
  _proto.isSessionRevocable = function isSessionRevocable(token) {
    if (token && typeof token.decodePayload === "function") {
      try {
        var _token$decodePayload = token.decodePayload(), origin_jti = _token$decodePayload.origin_jti;
        return !!origin_jti;
      } catch (err) {
      }
    }
    return false;
  };
  _proto.cleanClientData = function cleanClientData() {
    this.signInUserSession = null;
    this.clearCachedUser();
  };
  _proto.revokeToken = function revokeToken(_ref2) {
    var token = _ref2.token, callback = _ref2.callback;
    this.client.requestWithRetry("RevokeToken", {
      Token: token,
      ClientId: this.pool.getClientId()
    }, function(err) {
      if (err) {
        return callback(err);
      }
      callback();
    });
  };
  _proto.sendMFASelectionAnswer = function sendMFASelectionAnswer(answerChallenge, callback) {
    var _this19 = this;
    var challengeResponses = {};
    challengeResponses.USERNAME = this.username;
    challengeResponses.ANSWER = answerChallenge;
    var jsonReq = {
      ChallengeName: "SELECT_MFA_TYPE",
      ChallengeResponses: challengeResponses,
      ClientId: this.pool.getClientId(),
      Session: this.Session
    };
    if (this.getUserContextData()) {
      jsonReq.UserContextData = this.getUserContextData();
    }
    this.client.request("RespondToAuthChallenge", jsonReq, function(err, data) {
      if (err) {
        return callback.onFailure(err);
      }
      _this19.Session = data.Session;
      if (answerChallenge === "SMS_MFA") {
        return callback.mfaRequired(data.ChallengeName, data.ChallengeParameters);
      }
      if (answerChallenge === "SOFTWARE_TOKEN_MFA") {
        return callback.totpRequired(data.ChallengeName, data.ChallengeParameters);
      }
      return void 0;
    });
  };
  _proto.getUserContextData = function getUserContextData() {
    var pool = this.pool;
    return pool.getUserContextData(this.username);
  };
  _proto.associateSoftwareToken = function associateSoftwareToken(callback) {
    var _this20 = this;
    if (!(this.signInUserSession != null && this.signInUserSession.isValid())) {
      this.client.request("AssociateSoftwareToken", {
        Session: this.Session
      }, function(err, data) {
        if (err) {
          return callback.onFailure(err);
        }
        _this20.Session = data.Session;
        return callback.associateSecretCode(data.SecretCode);
      });
    } else {
      this.client.request("AssociateSoftwareToken", {
        AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
      }, function(err, data) {
        if (err) {
          return callback.onFailure(err);
        }
        return callback.associateSecretCode(data.SecretCode);
      });
    }
  };
  _proto.verifySoftwareToken = function verifySoftwareToken(totpCode, friendlyDeviceName, callback) {
    var _this21 = this;
    if (!(this.signInUserSession != null && this.signInUserSession.isValid())) {
      this.client.request("VerifySoftwareToken", {
        Session: this.Session,
        UserCode: totpCode,
        FriendlyDeviceName: friendlyDeviceName
      }, function(err, data) {
        if (err) {
          return callback.onFailure(err);
        }
        _this21.Session = data.Session;
        var challengeResponses = {};
        challengeResponses.USERNAME = _this21.username;
        var jsonReq = {
          ChallengeName: "MFA_SETUP",
          ClientId: _this21.pool.getClientId(),
          ChallengeResponses: challengeResponses,
          Session: _this21.Session
        };
        if (_this21.getUserContextData()) {
          jsonReq.UserContextData = _this21.getUserContextData();
        }
        _this21.client.request("RespondToAuthChallenge", jsonReq, function(errRespond, dataRespond) {
          if (errRespond) {
            return callback.onFailure(errRespond);
          }
          _this21.signInUserSession = _this21.getCognitoUserSession(dataRespond.AuthenticationResult);
          _this21.cacheTokens();
          return callback.onSuccess(_this21.signInUserSession);
        });
        return void 0;
      });
    } else {
      this.client.request("VerifySoftwareToken", {
        AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
        UserCode: totpCode,
        FriendlyDeviceName: friendlyDeviceName
      }, function(err, data) {
        if (err) {
          return callback.onFailure(err);
        }
        return callback.onSuccess(data);
      });
    }
  };
  return CognitoUser2;
}();
function unfetch_module(e, n2) {
  return n2 = n2 || {}, new Promise(function(t2, r) {
    var s2 = new XMLHttpRequest(), o2 = [], u = [], i = {}, a = function() {
      return { ok: (s2.status / 100 | 0) == 2, statusText: s2.statusText, status: s2.status, url: s2.responseURL, text: function() {
        return Promise.resolve(s2.responseText);
      }, json: function() {
        return Promise.resolve(s2.responseText).then(JSON.parse);
      }, blob: function() {
        return Promise.resolve(new Blob([s2.response]));
      }, clone: a, headers: { keys: function() {
        return o2;
      }, entries: function() {
        return u;
      }, get: function(e2) {
        return i[e2.toLowerCase()];
      }, has: function(e2) {
        return e2.toLowerCase() in i;
      } } };
    };
    for (var l2 in s2.open(n2.method || "get", e, true), s2.onload = function() {
      s2.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function(e2, n3, t3) {
        o2.push(n3 = n3.toLowerCase()), u.push([n3, t3]), i[n3] = i[n3] ? i[n3] + "," + t3 : t3;
      }), t2(a());
    }, s2.onerror = r, s2.withCredentials = n2.credentials == "include", n2.headers)
      s2.setRequestHeader(l2, n2.headers[l2]);
    s2.send(n2.body || null);
  });
}
var unfetch_module$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": unfetch_module
}, Symbol.toStringTag, { value: "Module" }));
var require$$0 = /* @__PURE__ */ getAugmentedNamespace(unfetch_module$1);
self.fetch || (self.fetch = require$$0.default || require$$0);
var version = "5.0.4";
var BASE_USER_AGENT = "aws-amplify/" + version;
var Platform = {
  userAgent: BASE_USER_AGENT + " js",
  product: "",
  navigator: null,
  isReactNative: false
};
if (typeof navigator !== "undefined" && navigator.product) {
  Platform.product = navigator.product || "";
  Platform.navigator = navigator || null;
  switch (navigator.product) {
    case "ReactNative":
      Platform.userAgent = BASE_USER_AGENT + " react-native";
      Platform.isReactNative = true;
      break;
    default:
      Platform.userAgent = BASE_USER_AGENT + " js";
      Platform.isReactNative = false;
      break;
  }
}
var getUserAgent = function getUserAgent2() {
  return Platform.userAgent;
};
function UserAgent() {
}
UserAgent.prototype.userAgent = getUserAgent();
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2))
      return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2))
        return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
    return _setPrototypeOf(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance = new Constructor();
      if (Class2)
        _setPrototypeOf(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _setPrototypeOf(o2, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o3, p2) {
    o3.__proto__ = p2;
    return o3;
  };
  return _setPrototypeOf(o2, p);
}
function _getPrototypeOf(o2) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o3) {
    return o3.__proto__ || Object.getPrototypeOf(o3);
  };
  return _getPrototypeOf(o2);
}
var CognitoError = /* @__PURE__ */ function(_Error) {
  _inheritsLoose(CognitoError2, _Error);
  function CognitoError2(message, code2, name, statusCode) {
    var _this;
    _this = _Error.call(this, message) || this;
    _this.code = code2;
    _this.name = name;
    _this.statusCode = statusCode;
    return _this;
  }
  return CognitoError2;
}(/* @__PURE__ */ _wrapNativeSuper(Error));
var Client = /* @__PURE__ */ function() {
  function Client2(region, endpoint, fetchOptions) {
    this.endpoint = endpoint || "https://cognito-idp." + region + ".amazonaws.com/";
    var _ref = fetchOptions || {}, credentials = _ref.credentials;
    this.fetchOptions = credentials ? {
      credentials
    } : {};
  }
  var _proto = Client2.prototype;
  _proto.promisifyRequest = function promisifyRequest(operation, params) {
    var _this2 = this;
    return new Promise(function(resolve, reject) {
      _this2.request(operation, params, function(err, data) {
        if (err) {
          reject(new CognitoError(err.message, err.code, err.name, err.statusCode));
        } else {
          resolve(data);
        }
      });
    });
  };
  _proto.requestWithRetry = function requestWithRetry(operation, params, callback) {
    var _this3 = this;
    var MAX_DELAY_IN_MILLIS = 5 * 1e3;
    jitteredExponentialRetry(function(p) {
      return new Promise(function(res, rej) {
        _this3.request(operation, p, function(error, result) {
          if (error) {
            rej(error);
          } else {
            res(result);
          }
        });
      });
    }, [params], MAX_DELAY_IN_MILLIS).then(function(result) {
      return callback(null, result);
    })["catch"](function(error) {
      return callback(error);
    });
  };
  _proto.request = function request(operation, params, callback) {
    var headers = {
      "Content-Type": "application/x-amz-json-1.1",
      "X-Amz-Target": "AWSCognitoIdentityProviderService." + operation,
      "X-Amz-User-Agent": UserAgent.prototype.userAgent
    };
    var options = Object.assign({}, this.fetchOptions, {
      headers,
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      body: JSON.stringify(params)
    });
    var response;
    fetch(this.endpoint, options).then(function(resp) {
      response = resp;
      return resp;
    }, function(err) {
      if (err instanceof TypeError) {
        throw new Error("Network error");
      }
      throw err;
    }).then(function(resp) {
      return resp.json()["catch"](function() {
        return {};
      });
    }).then(function(data) {
      if (response.ok)
        return callback(null, data);
      var code2 = (data.__type || data.code).split("#").pop();
      var error = new Error(data.message || data.Message || null);
      error.name = code2;
      error.code = code2;
      return callback(error);
    })["catch"](function(err) {
      if (response && response.headers && response.headers.get("x-amzn-errortype")) {
        try {
          var code2 = response.headers.get("x-amzn-errortype").split(":")[0];
          var error = new Error(response.status ? response.status.toString() : null);
          error.code = code2;
          error.name = code2;
          error.statusCode = response.status;
          return callback(error);
        } catch (ex) {
          return callback(err);
        }
      } else if (err instanceof Error && err.message === "Network error") {
        err.code = "NetworkError";
      }
      return callback(err);
    });
  };
  return Client2;
}();
var logger$1 = {
  debug: function debug() {
  }
};
var isNonRetryableError = function isNonRetryableError2(obj) {
  var key = "nonRetryable";
  return obj && obj[key];
};
function retry(functionToRetry, args, delayFn, attempt) {
  if (attempt === void 0) {
    attempt = 1;
  }
  if (typeof functionToRetry !== "function") {
    throw Error("functionToRetry must be a function");
  }
  logger$1.debug(functionToRetry.name + " attempt #" + attempt + " with args: " + JSON.stringify(args));
  return functionToRetry.apply(void 0, args)["catch"](function(err) {
    logger$1.debug("error on " + functionToRetry.name, err);
    if (isNonRetryableError(err)) {
      logger$1.debug(functionToRetry.name + " non retryable error", err);
      throw err;
    }
    var retryIn = delayFn(attempt, args, err);
    logger$1.debug(functionToRetry.name + " retrying in " + retryIn + " ms");
    if (retryIn !== false) {
      return new Promise(function(res) {
        return setTimeout(res, retryIn);
      }).then(function() {
        return retry(functionToRetry, args, delayFn, attempt + 1);
      });
    } else {
      throw err;
    }
  });
}
function jitteredBackoff(maxDelayMs) {
  var BASE_TIME_MS = 100;
  var JITTER_FACTOR = 100;
  return function(attempt) {
    var delay = Math.pow(2, attempt) * BASE_TIME_MS + JITTER_FACTOR * Math.random();
    return delay > maxDelayMs ? false : delay;
  };
}
var MAX_DELAY_MS = 5 * 60 * 1e3;
function jitteredExponentialRetry(functionToRetry, args, maxDelayMs) {
  if (maxDelayMs === void 0) {
    maxDelayMs = MAX_DELAY_MS;
  }
  return retry(functionToRetry, args, jitteredBackoff(maxDelayMs));
}
/*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
var USER_POOL_ID_MAX_LENGTH = 55;
var CognitoUserPool = /* @__PURE__ */ function() {
  function CognitoUserPool2(data, wrapRefreshSessionCallback) {
    var _ref = data || {}, UserPoolId = _ref.UserPoolId, ClientId = _ref.ClientId, endpoint = _ref.endpoint, fetchOptions = _ref.fetchOptions, AdvancedSecurityDataCollectionFlag = _ref.AdvancedSecurityDataCollectionFlag;
    if (!UserPoolId || !ClientId) {
      throw new Error("Both UserPoolId and ClientId are required.");
    }
    if (UserPoolId.length > USER_POOL_ID_MAX_LENGTH || !/^[\w-]+_[0-9a-zA-Z]+$/.test(UserPoolId)) {
      throw new Error("Invalid UserPoolId format.");
    }
    var region = UserPoolId.split("_")[0];
    this.userPoolId = UserPoolId;
    this.clientId = ClientId;
    this.client = new Client(region, endpoint, fetchOptions);
    this.advancedSecurityDataCollectionFlag = AdvancedSecurityDataCollectionFlag !== false;
    this.storage = data.Storage || new StorageHelper().getStorage();
    if (wrapRefreshSessionCallback) {
      this.wrapRefreshSessionCallback = wrapRefreshSessionCallback;
    }
  }
  var _proto = CognitoUserPool2.prototype;
  _proto.getUserPoolId = function getUserPoolId() {
    return this.userPoolId;
  };
  _proto.getClientId = function getClientId() {
    return this.clientId;
  };
  _proto.signUp = function signUp2(username, password, userAttributes, validationData, callback, clientMetadata) {
    var _this = this;
    var jsonReq = {
      ClientId: this.clientId,
      Username: username,
      Password: password,
      UserAttributes: userAttributes,
      ValidationData: validationData,
      ClientMetadata: clientMetadata
    };
    if (this.getUserContextData(username)) {
      jsonReq.UserContextData = this.getUserContextData(username);
    }
    this.client.request("SignUp", jsonReq, function(err, data) {
      if (err) {
        return callback(err, null);
      }
      var cognitoUser = {
        Username: username,
        Pool: _this,
        Storage: _this.storage
      };
      var returnData = {
        user: new CognitoUser(cognitoUser),
        userConfirmed: data.UserConfirmed,
        userSub: data.UserSub,
        codeDeliveryDetails: data.CodeDeliveryDetails
      };
      return callback(null, returnData);
    });
  };
  _proto.getCurrentUser = function getCurrentUser() {
    var lastUserKey = "CognitoIdentityServiceProvider." + this.clientId + ".LastAuthUser";
    var lastAuthUser = this.storage.getItem(lastUserKey);
    if (lastAuthUser) {
      var cognitoUser = {
        Username: lastAuthUser,
        Pool: this,
        Storage: this.storage
      };
      return new CognitoUser(cognitoUser);
    }
    return null;
  };
  _proto.getUserContextData = function getUserContextData(username) {
    if (typeof AmazonCognitoAdvancedSecurityData === "undefined") {
      return void 0;
    }
    var amazonCognitoAdvancedSecurityDataConst = AmazonCognitoAdvancedSecurityData;
    if (this.advancedSecurityDataCollectionFlag) {
      var advancedSecurityData = amazonCognitoAdvancedSecurityDataConst.getData(username, this.userPoolId, this.clientId);
      if (advancedSecurityData) {
        var userContextData = {
          EncodedData: advancedSecurityData
        };
        return userContextData;
      }
    }
    return {};
  };
  return CognitoUserPool2;
}();
var js_cookie = { exports: {} };
/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function(module, exports) {
  (function(factory) {
    var registeredInModuleLoader;
    {
      module.exports = factory();
      registeredInModuleLoader = true;
    }
    if (!registeredInModuleLoader) {
      var OldCookies = window.Cookies;
      var api = window.Cookies = factory();
      api.noConflict = function() {
        window.Cookies = OldCookies;
        return api;
      };
    }
  })(function() {
    function extend() {
      var i = 0;
      var result = {};
      for (; i < arguments.length; i++) {
        var attributes = arguments[i];
        for (var key in attributes) {
          result[key] = attributes[key];
        }
      }
      return result;
    }
    function decode(s2) {
      return s2.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
    }
    function init(converter) {
      function api() {
      }
      function set(key, value, attributes) {
        if (typeof document === "undefined") {
          return;
        }
        attributes = extend({
          path: "/"
        }, api.defaults, attributes);
        if (typeof attributes.expires === "number") {
          attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e5);
        }
        attributes.expires = attributes.expires ? attributes.expires.toUTCString() : "";
        try {
          var result = JSON.stringify(value);
          if (/^[\{\[]/.test(result)) {
            value = result;
          }
        } catch (e) {
        }
        value = converter.write ? converter.write(value, key) : encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
        key = encodeURIComponent(String(key)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
        var stringifiedAttributes = "";
        for (var attributeName in attributes) {
          if (!attributes[attributeName]) {
            continue;
          }
          stringifiedAttributes += "; " + attributeName;
          if (attributes[attributeName] === true) {
            continue;
          }
          stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
        }
        return document.cookie = key + "=" + value + stringifiedAttributes;
      }
      function get(key, json) {
        if (typeof document === "undefined") {
          return;
        }
        var jar = {};
        var cookies = document.cookie ? document.cookie.split("; ") : [];
        var i = 0;
        for (; i < cookies.length; i++) {
          var parts = cookies[i].split("=");
          var cookie = parts.slice(1).join("=");
          if (!json && cookie.charAt(0) === '"') {
            cookie = cookie.slice(1, -1);
          }
          try {
            var name = decode(parts[0]);
            cookie = (converter.read || converter)(cookie, name) || decode(cookie);
            if (json) {
              try {
                cookie = JSON.parse(cookie);
              } catch (e) {
              }
            }
            jar[name] = cookie;
            if (key === name) {
              break;
            }
          } catch (e) {
          }
        }
        return key ? jar[key] : jar;
      }
      api.set = set;
      api.get = function(key) {
        return get(key, false);
      };
      api.getJSON = function(key) {
        return get(key, true);
      };
      api.remove = function(key, attributes) {
        set(key, "", extend(attributes, {
          expires: -1
        }));
      };
      api.defaults = {};
      api.withConverter = init;
      return api;
    }
    return init(function() {
    });
  });
})(js_cookie);
const logger = new Logger$1();
const initialState$7 = {
  inProgress: false
};
const slice$8 = createSlice({
  initialState: initialState$7,
  name: "login",
  reducers: {
    setLoginFailure: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.success = false;
      state.error = action.payload;
      state.inProgress = false;
    },
    setLoginInProgress: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.error = void 0;
      state.success = void 0;
      state.inProgress = action.payload;
    },
    setLoginSuccess: (state) => {
      state.lastUpdated = DateTime.now().toISO();
      state.error = void 0;
      state.success = true;
      state.inProgress = false;
    }
  }
});
var login = slice$8.reducer;
const { setLoginFailure, setLoginInProgress, setLoginSuccess } = slice$8.actions;
const login$1 = ({
  username,
  password
}) => async (dispatch, getState) => {
  try {
    dispatch(setLoginInProgress(true));
    if (!username) {
      const err = new MissingArgumentException(`"username" property is required.`, {
        form: {
          field: "username",
          problem: FormValidationProblem.Required
        }
      });
      dispatch(setLoginFailure(err.toJSON()));
      return;
    }
    if (!password) {
      const err = new MissingArgumentException(`"password" property is required.`, {
        form: {
          field: "password",
          problem: FormValidationProblem.Required
        }
      });
      dispatch(setLoginFailure(err.toJSON()));
      return;
    }
    const problems = validate(username, {
      [Condition.IsEmailAddress]: true
    });
    if (problems.length > 0) {
      const err = new InvalidArgumentException(`"username" value is not valid email.`, {
        form: {
          field: "username",
          problem: FormValidationProblem.NotValidEmail
        }
      });
      dispatch(setLoginFailure(err.toJSON()));
      return;
    }
    const config2 = getState().app.config;
    const authenticationData = {
      Password: password,
      Username: username
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const poolData = {
      ClientId: config2.aws.cognito.userPoolClientId,
      UserPoolId: config2.aws.cognito.userPoolId
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Pool: userPool,
      Username: username
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onFailure: (err) => {
        const exception = new Exception("Error encountered while logging user in", {
          cause: err
        });
        dispatch(setLoginFailure(exception.toJSON()));
      },
      onSuccess: (result) => {
        const accessToken = result.getAccessToken().getJwtToken();
      }
    });
  } catch (error) {
    const exception = error instanceof Exception ? error : new AuthenticationLoginException("An unknown error occurred while logging a user in.", {
      cause: error
    });
    dispatch(setLoginFailure(exception.toJSON()));
  }
};
const refreshSession = () => async (dispatch, getState) => {
  try {
    dispatch(setLoginInProgress(true));
    const config2 = getState().app.config;
    const poolData = {
      ClientId: config2.aws.cognito.userPoolClientId,
      UserPoolId: config2.aws.cognito.userPoolId
    };
    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser === null) {
      dispatch(setLoggedOut());
      dispatch(setLoginInProgress(false));
    } else {
      cognitoUser.getSession((err, session) => {
        if (err) {
          dispatch(setLoggedOut());
          dispatch(setLoginInProgress(false));
          return;
        }
        if (!session) {
          dispatch(setLoggedOut());
          dispatch(setLoginInProgress(false));
          return;
        }
        if (!session.isValid()) {
          dispatch(setLoggedOut());
          dispatch(setLoginInProgress(false));
        } else {
          const accessToken = session.getIdToken().getJwtToken();
        }
      });
    }
  } catch (error) {
    const exception = new Exception("Error encountered getting user attributes", {
      cause: error
    });
    logger.exception(exception.toJSON());
    dispatch(setLoginFailure(exception.toJSON()));
  }
};
const logout = () => async (dispatch, getState) => {
  const config2 = getState().app.config;
  const poolData = {
    ClientId: config2.aws.cognito.userPoolClientId,
    UserPoolId: config2.aws.cognito.userPoolId
  };
  const userPool = new CognitoUserPool(poolData);
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut(() => {
      dispatch(setLoggedOut());
    });
  }
};
const initialState$6 = {
  inProgress: false
};
const slice$7 = createSlice({
  initialState: initialState$6,
  name: "signup",
  reducers: {
    setSignupFailure: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.error = action.payload;
      state.inProgress = false;
    },
    setSignupInProgress: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.inProgress = action.payload;
    },
    setSignupSuccess: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.inProgress = false;
      state.userId = action.payload.userId;
      state.success = true;
    }
  }
});
var signup = slice$7.reducer;
const { setSignupFailure, setSignupInProgress, setSignupSuccess } = slice$7.actions;
const signUp = ({
  firstName,
  lastName,
  password,
  username
}) => async (dispatch, getState) => {
  try {
    dispatch(setSignupInProgress(true));
    if (!username) {
      const err = new MissingArgumentException(`"username" property is required.`, {
        form: {
          field: "username",
          problem: FormValidationProblem.Required
        }
      });
      dispatch(setSignupFailure(err.toJSON()));
      return;
    }
    if (!password) {
      const err = new MissingArgumentException(`"password" property is required.`, {
        form: {
          field: "password",
          problem: FormValidationProblem.Required
        }
      });
      dispatch(setSignupFailure(err.toJSON()));
      return;
    }
    const problems = validate(username, {
      [Condition.IsEmailAddress]: true
    });
    if (problems.length > 0) {
      const err = new InvalidArgumentException(`"username" value is not valid email.`, {
        form: {
          field: "username",
          problem: FormValidationProblem.NotValidEmail
        }
      });
      dispatch(setSignupFailure(err.toJSON()));
      return;
    }
    const config2 = getState().app.config;
    const poolData = {
      ClientId: config2.aws.cognito.userPoolClientId,
      UserPoolId: config2.aws.cognito.userPoolId
    };
    const userPool = new CognitoUserPool(poolData);
    const attributeList = [
      new CognitoUserAttribute({
        Name: "email",
        Value: username
      }),
      new CognitoUserAttribute({
        Name: "given_name",
        Value: firstName
      }),
      new CognitoUserAttribute({
        Name: "family_name",
        Value: lastName
      })
    ];
    userPool.signUp(username, password, attributeList, [], (err, result) => {
      if (err) {
        console.log("err", err);
        const exception = new Exception("Failure when signing user up", {
          cause: err
        });
        dispatch(setSignupFailure(exception.toJSON()));
        return;
      }
      if (!result) {
        const exception = new Exception("Unknown error occurred", {});
        dispatch(setSignupFailure(exception.toJSON()));
        return;
      }
      const cognitoUser = result == null ? void 0 : result.user;
      const userSub = result.userSub;
      if (userSub) {
        dispatch(setSignupInProgress(false));
        dispatch(setSignupSuccess({ userId: userSub }));
      }
    });
  } catch (error) {
    if (error.name === AuthenticationException.name) {
      dispatch(setSignupFailure(error.toJSON()));
      return;
    }
    throw error;
  }
};
const initialState$5 = {
  inProgress: false
};
const slice$6 = createSlice({
  initialState: initialState$5,
  name: "usernameAvailability",
  reducers: {
    setCheckUsernameAvailabilityFailure: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.error = action.payload;
    },
    setCheckUsernameAvailabilityInProgress: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.inProgress = action.payload;
    },
    setCheckUsernameAvailabilitySuccess: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.available = action.payload;
    }
  }
});
var usernameAvailability = slice$6.reducer;
const {
  setCheckUsernameAvailabilityFailure,
  setCheckUsernameAvailabilityInProgress,
  setCheckUsernameAvailabilitySuccess
} = slice$6.actions;
const checkUsernameAvailability = ({ username }) => async (dispatch) => {
  try {
    dispatch(setCheckUsernameAvailabilityInProgress(true));
    dispatch(setCheckUsernameAvailabilityInProgress(false));
  } catch (error) {
    const exception = error instanceof Exception ? error : new AuthenticationUsernameAvailabilityCheckException("An exception occurred while checking username availability", {
      cause: error,
      origin: {
        file: "src/state/user/authentication/username-availability.ts"
      }
    });
    dispatch(setCheckUsernameAvailabilityFailure(exception.toJSON()));
  }
};
function formatProdErrorMessage(code2) {
  return "Minified Redux error #" + code2 + "; visit https://redux.js.org/Errors?code=" + code2 + " for the full message or use the non-minified dev environment for full errors. ";
}
var randomString = function randomString2() {
  return Math.random().toString(36).substring(7).split("").join(".");
};
var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function(key) {
    var reducer = reducers[key];
    var initialState2 = reducer(void 0, {
      type: ActionTypes.INIT
    });
    if (typeof initialState2 === "undefined") {
      throw new Error(formatProdErrorMessage(12));
    }
    if (typeof reducer(void 0, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === "undefined") {
      throw new Error(formatProdErrorMessage(13));
    }
  });
}
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);
  var shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }
  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === "undefined") {
        action && action.type;
        throw new Error(formatProdErrorMessage(14));
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}
const initialState$4 = {
  error: void 0,
  inProgress: false,
  lastUpdated: void 0,
  success: void 0
};
const slice$5 = createSlice({
  initialState: initialState$4,
  name: "resend",
  reducers: {
    setVerificationCodeResendFailure: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.inProgress = false;
      state.success = false;
      state.error = action.payload;
    },
    setVerificationCodeResendInProgress: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.error = void 0;
      state.success = void 0;
      state.inProgress = action.payload;
    },
    setVerificationCodeResendSuccess: (state) => {
      state.lastUpdated = DateTime.now().toISO();
      state.error = void 0;
      state.inProgress = false;
      state.success = true;
    }
  }
});
var resend = slice$5.reducer;
const {
  setVerificationCodeResendFailure,
  setVerificationCodeResendInProgress,
  setVerificationCodeResendSuccess
} = slice$5.actions;
const resendVerificationCode = ({ userId }) => async (dispatch, getState) => {
  try {
    dispatch(setVerificationCodeResendInProgress(true));
    const config2 = getState().app.config;
    const poolData = {
      ClientId: config2.aws.cognito.userPoolClientId,
      UserPoolId: config2.aws.cognito.userPoolId
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Pool: userPool,
      Username: userId
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        const exception = new Exception("Failure resending verification code", {
          cause: err
        });
        dispatch(setVerificationCodeResendFailure(exception.toJSON()));
        return;
      }
      console.log("resendConfirmationCode result", result);
      dispatch(setVerificationCodeResendSuccess());
    });
  } catch (err) {
    const exception = new Exception("Failure resending verification code", {
      cause: err
    });
    dispatch(setVerificationCodeResendFailure(exception.toJSON()));
  }
};
const initialState$3 = {
  delivery: void 0,
  error: void 0,
  inProgress: false,
  lastUpdated: void 0,
  status: void 0,
  success: void 0
};
const slice$4 = createSlice({
  initialState: initialState$3,
  name: "status",
  reducers: {
    setVerificationStatusLookupFailure: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.success = false;
      state.inProgress = false;
      state.error = action.payload;
    },
    setVerificationStatusLookupInProgress: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.error = void 0;
      state.success = void 0;
      state.inProgress = action.payload;
    },
    setVerificationStatusLookupSuccess: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.error = void 0;
      state.status = action.payload.status;
      state.delivery = action.payload.delivery;
      state.inProgress = false;
      state.success = true;
    }
  }
});
var status = slice$4.reducer;
const {
  setVerificationStatusLookupFailure,
  setVerificationStatusLookupInProgress,
  setVerificationStatusLookupSuccess
} = slice$4.actions;
const getVerificationDetails = ({ userId }) => async (dispatch, getState) => {
  try {
    dispatch(setVerificationStatusLookupInProgress(true));
    dispatch(setVerificationStatusLookupInProgress(false));
  } catch (error) {
    const exception = error instanceof Exception ? error : new Exception(error.message, {
      cause: error
    });
    dispatch(setVerificationStatusLookupFailure(exception.toJSON()));
    dispatch(setVerificationStatusLookupInProgress(false));
  }
};
const initialState$2 = {
  error: void 0,
  inProgress: false,
  lastUpdated: void 0,
  success: void 0
};
const slice$3 = createSlice({
  initialState: initialState$2,
  name: "verify",
  reducers: {
    setVerificationCodeVerifyFailure: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.error = action.payload;
      state.inProgress = false;
    },
    setVerificationCodeVerifyInProgress: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.inProgress = action.payload;
    },
    setVerificationCodeVerifySuccess: (state) => {
      state.lastUpdated = DateTime.now().toISO();
      state.error = void 0;
      state.success = true;
      state.inProgress = false;
    }
  }
});
var verify = slice$3.reducer;
const {
  setVerificationCodeVerifyFailure,
  setVerificationCodeVerifyInProgress,
  setVerificationCodeVerifySuccess
} = slice$3.actions;
const verifyCode = ({ code: code2, userId }) => async (dispatch, getState) => {
  dispatch(setVerificationCodeVerifyInProgress(true));
  const config2 = getState().app.config;
  const poolData = {
    ClientId: config2.aws.cognito.userPoolClientId,
    UserPoolId: config2.aws.cognito.userPoolId
  };
  const userPool = new CognitoUserPool(poolData);
  const userData = {
    Pool: userPool,
    Username: userId
  };
  const cognitoUser = new CognitoUser(userData);
  cognitoUser.confirmRegistration(code2, true, (err, result) => {
    if (err) {
      const exception = new Exception("Failure confirming verification code", {
        cause: err
      });
      dispatch(setVerificationCodeVerifyFailure(exception.toJSON()));
      return;
    }
    dispatch(setVerificationCodeVerifySuccess());
  });
};
var code = combineReducers({ resend, status, verify });
var verification = combineReducers({
  code
});
const initialState$1 = {
  initialized: false,
  lastUpdated: void 0,
  loggedIn: false
};
const slice$2 = createSlice({
  initialState: initialState$1,
  name: "authentication",
  reducers: {
    setLoggedIn: (state, action) => {
      state.lastUpdated = DateTime.now().toISO();
      state.tokens = action.payload;
      state.loggedIn = true;
    },
    setLoggedOut: (state) => {
      state.lastUpdated = DateTime.now().toISO();
      state.tokens = void 0;
      state.loggedIn = false;
    }
  }
});
const { setLoggedIn, setLoggedOut } = slice$2.actions;
var authentication = combineReducers$1({
  state: slice$2.reducer,
  login,
  signup,
  usernameAvailability,
  verification
});
const initialState = {
  inProgress: false
};
const slice$1 = createSlice({
  initialState,
  name: "details",
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setInProgress: (state, action) => {
      state.inProgress = action.payload;
    },
    setUserAttributes: (state, action) => {
      state.attributes = action.payload;
    },
    setUserDetails: (state, action) => {
      const { analytics, info, communication, preferences } = action.payload;
      state.communication = communication;
      state.info = info;
      state.analytics = analytics;
      state.preferences = preferences;
    },
    setUserPreferences: (state, action) => {
      state.preferences = action.payload;
    }
  }
});
slice$1.actions;
var details = slice$1.reducer;
var user = combineReducers$1({
  authentication,
  details
});
const createRootReducer = ({
  models,
  reducers
}) => {
  return combineReducers$1(__spreadProps(__spreadValues({}, reducers), {
    app,
    models: createModelsReducer(models),
    ui,
    user
  }));
};
const useAppDispatch = () => useDispatch();
const useAppSelector = useSelector;
const paymentMethodsAdapter = createEntityAdapter({
  selectId: (paymentMethod) => paymentMethod.id
});
paymentMethodsAdapter.getSelectors((state) => state.getState().paymentMethods);
const slice = createSlice({
  initialState: paymentMethodsAdapter.getInitialState({
    in_progress: false,
    initialized: false
  }),
  name: "payment_methods",
  reducers: {
    deletePaymentMethod: (state, action) => paymentMethodsAdapter.removeOne(state, action.payload),
    setError: (state, action) => {
      state.error = action.payload;
    },
    setInProgress: (state, action) => {
      state.in_progress = action.payload;
    },
    setPaymentMethods: (state, action) => {
      paymentMethodsAdapter.addMany(state, action.payload);
    }
  }
});
const getPaymentMethods = () => async (dispatch) => {
  dispatch(slice.actions.setInProgress(true));
  dispatch(slice.actions.setInProgress(true));
};
const deletePaymentMethod = (id) => async (dispatch) => {
  dispatch(slice.actions.setInProgress(true));
  dispatch(slice.actions.deletePaymentMethod(id));
  dispatch(slice.actions.setInProgress(false));
};
slice.reducer;
const subscriptionsAdapter = createEntityAdapter({
  selectId: (subscription) => subscription.id
});
subscriptionsAdapter.getSelectors((state) => state.getState().subscriptions);
const subscriptionsSlice = createSlice({
  initialState: subscriptionsAdapter.getInitialState({
    in_progress: false,
    initialized: false
  }),
  name: "subscriptions",
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setInProgress: (state, action) => {
      state.in_progress = action.payload;
    },
    setSubscriptions: (state, action) => subscriptionsAdapter.setAll(state, action.payload)
  }
});
const getSubscriptions = () => async (dispatch) => {
  dispatch(subscriptionsSlice.actions.setInProgress(true));
  dispatch(subscriptionsSlice.actions.setInProgress(true));
};
subscriptionsSlice.reducer;
const environment = s$1();
const history = createBrowserHistory();
const createStore = ({
  models,
  reducers,
  middleware = []
}) => configureStore({
  devTools: environment.type === EnvironmentType.Development || environment.type === EnvironmentType.NonProduction,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    ...createMiddleware(history, middleware)
  ],
  reducer: createRootReducer({ models, reducers })
});
const renderReduxWebApp = async ({
  actions,
  authentication: authentication2 = false,
  container,
  config: config2,
  httpClient,
  routes: routes2,
  store
}) => {
  var _a, _b, _c, _d;
  await store.dispatch(setConfig(config2));
  if ((_b = (_a = config2 == null ? void 0 : config2.ui) == null ? void 0 : _a.themes) == null ? void 0 : _b.custom) {
    await store.dispatch(addThemes(config2.ui.themes.custom));
  }
  if ((_d = (_c = config2 == null ? void 0 : config2.ui) == null ? void 0 : _c.themes) == null ? void 0 : _d.default) {
    await store.dispatch(setTheme(config2.ui.themes.default));
  }
  await store.dispatch(setRoutes(routes2.map((_e) => {
    var _f = _e, { component } = _f, route = __objRest(_f, ["component"]);
    return __spreadValues({}, route);
  })));
  if (authentication2) {
    await store.dispatch(refreshSession());
  }
  return ReactDOM.render(/* @__PURE__ */ React.createElement(StrictMode, null, /* @__PURE__ */ React.createElement(Provider, {
    store
  }, /* @__PURE__ */ React.createElement(BrowserRouter, null, /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, {
    path: "/",
    element: container
  }, routes2.map((route, k) => {
    if (route.role === PageRole.Index) {
      return /* @__PURE__ */ React.createElement(Route, {
        index: true,
        element: /* @__PURE__ */ React.createElement(route.component, {
          actions,
          httpClient
        }),
        key: k
      });
    }
    if (route.path) {
      return /* @__PURE__ */ React.createElement(Route, {
        element: /* @__PURE__ */ React.createElement(route.component, {
          actions,
          httpClient
        }),
        key: k,
        path: route.path
      });
    }
    return /* @__PURE__ */ React.createElement(Route, {
      element: /* @__PURE__ */ React.createElement(route.component, {
        actions,
        httpClient
      }),
      key: k
    });
  })))))), document.querySelector("#root"));
};
export { addThemes, addToastNotification, checkUsernameAvailability, closeModal, createStore, deletePaymentMethod, getPaymentMethods, getSubscriptions, getVerificationDetails, hideModelPanel, history, login$1 as login, logout, refreshSession, renderReduxWebApp, resendVerificationCode, setTheme, showModal, showModelPanel, signUp, createStore as store, useAppDispatch as useDispatch, useAppSelector as useSelector, verifyCode };
//# sourceMappingURL=index.es.js.map
