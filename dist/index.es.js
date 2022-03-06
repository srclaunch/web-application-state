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
import React, { memo, useState, useEffect, StrictMode } from "react";
import { createSlice, combineReducers as combineReducers$1, createEntityAdapter, configureStore } from "@reduxjs/toolkit";
import { EnvironmentType, FormValidationProblem, Condition, PageRole } from "@srclaunch/types";
import ReactDOM from "react-dom";
import { useDispatch, useSelector, Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export { Link, NavLink, Navigate, Outlet, Route, Router, Routes, useLocation, useMatch, useNavigate, useParams, useResolvedPath, useSearchParams } from "react-router-dom";
import Logger, { Logger as Logger$1 } from "@srclaunch/logger";
import { createGlobalStyle } from "styled-components";
import { validate } from "@srclaunch/validation";
export { matchPath, matchRoutes } from "react-router";
const o$1 = { id: "dev", type: EnvironmentType.Development, public: false, name: "Development", description: "Development environment" }, t$1 = { id: "test", type: EnvironmentType.NonProduction, public: false, name: "Test", description: "Test environment" }, i$2 = { id: "prod", type: EnvironmentType.Production, public: true, name: "Production", description: "Production environment" };
function s$2() {
  if (window) {
    const n2 = window.location.hostname;
    return n2.includes("localhost") || n2.includes("127.0.0.1") ? o$1 : n2.includes("test") ? t$1 : i$2;
  }
  return t$1;
}
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var r$1, B = r$1 || (r$1 = {});
B.Pop = "POP";
B.Push = "PUSH";
B.Replace = "REPLACE";
var C = function(b) {
  return b;
};
function E(b) {
  b.preventDefault();
  b.returnValue = "";
}
function F() {
  var b = [];
  return { get length() {
    return b.length;
  }, push: function(h) {
    b.push(h);
    return function() {
      b = b.filter(function(e2) {
        return e2 !== h;
      });
    };
  }, call: function(h) {
    b.forEach(function(e2) {
      return e2 && e2(h);
    });
  } };
}
function H() {
  return Math.random().toString(36).substr(2, 8);
}
function I$1(b) {
  var h = b.pathname;
  h = h === void 0 ? "/" : h;
  var e2 = b.search;
  e2 = e2 === void 0 ? "" : e2;
  b = b.hash;
  b = b === void 0 ? "" : b;
  e2 && e2 !== "?" && (h += e2.charAt(0) === "?" ? e2 : "?" + e2);
  b && b !== "#" && (h += b.charAt(0) === "#" ? b : "#" + b);
  return h;
}
function J(b) {
  var h = {};
  if (b) {
    var e2 = b.indexOf("#");
    0 <= e2 && (h.hash = b.substr(e2), b = b.substr(0, e2));
    e2 = b.indexOf("?");
    0 <= e2 && (h.search = b.substr(e2), b = b.substr(0, e2));
    b && (h.pathname = b);
  }
  return h;
}
function createBrowserHistory(b) {
  function h() {
    var c2 = p2.location, a = m.state || {};
    return [a.idx, C({ pathname: c2.pathname, search: c2.search, hash: c2.hash, state: a.usr || null, key: a.key || "default" })];
  }
  function e2(c2) {
    return typeof c2 === "string" ? c2 : I$1(c2);
  }
  function x2(c2, a) {
    a === void 0 && (a = null);
    return C(_extends({ pathname: q.pathname, hash: "", search: "" }, typeof c2 === "string" ? J(c2) : c2, { state: a, key: H() }));
  }
  function z2(c2) {
    t2 = c2;
    c2 = h();
    v = c2[0];
    q = c2[1];
    d2.call({ action: t2, location: q });
  }
  function A(c2, a) {
    function f() {
      A(c2, a);
    }
    var l2 = r$1.Push, k = x2(c2, a);
    if (!g2.length || (g2.call({ action: l2, location: k, retry: f }), false)) {
      var n2 = [{ usr: k.state, key: k.key, idx: v + 1 }, e2(k)];
      k = n2[0];
      n2 = n2[1];
      try {
        m.pushState(k, "", n2);
      } catch (G2) {
        p2.location.assign(n2);
      }
      z2(l2);
    }
  }
  function y(c2, a) {
    function f() {
      y(c2, a);
    }
    var l2 = r$1.Replace, k = x2(c2, a);
    g2.length && (g2.call({ action: l2, location: k, retry: f }), 1) || (k = [{ usr: k.state, key: k.key, idx: v }, e2(k)], m.replaceState(k[0], "", k[1]), z2(l2));
  }
  function w(c2) {
    m.go(c2);
  }
  b === void 0 && (b = {});
  b = b.window;
  var p2 = b === void 0 ? document.defaultView : b, m = p2.history, u = null;
  p2.addEventListener("popstate", function() {
    if (u)
      g2.call(u), u = null;
    else {
      var c2 = r$1.Pop, a = h(), f = a[0];
      a = a[1];
      if (g2.length)
        if (f != null) {
          var l2 = v - f;
          l2 && (u = { action: c2, location: a, retry: function() {
            w(-1 * l2);
          } }, w(l2));
        } else
          ;
      else
        z2(c2);
    }
  });
  var t2 = r$1.Pop;
  b = h();
  var v = b[0], q = b[1], d2 = F(), g2 = F();
  v == null && (v = 0, m.replaceState(_extends({}, m.state, { idx: v }), ""));
  return { get action() {
    return t2;
  }, get location() {
    return q;
  }, createHref: e2, push: A, replace: y, go: w, back: function() {
    w(-1);
  }, forward: function() {
    w(1);
  }, listen: function(c2) {
    return d2.push(c2);
  }, block: function(c2) {
    var a = g2.push(c2);
    g2.length === 1 && p2.addEventListener("beforeunload", E);
    return function() {
      a();
      g2.length || p2.removeEventListener("beforeunload", E);
    };
  } };
}
const contextMiddleware = (store) => (next) => (action) => {
  return next(action);
};
var cn = Object.defineProperty;
var un = (a, u, A) => u in a ? cn(a, u, { enumerable: true, configurable: true, writable: true, value: A }) : a[u] = A;
var s$1 = (a, u, A) => (un(a, typeof u != "symbol" ? u + "" : u, A), A);
var ja;
(function(a) {
  a.Comment = "comment", a.Create = "create", a.Delete = "delete", a.Edit = "edit", a.Invoice = "invoice", a.Message = "message", a.PageView = "pageView", a.Paid = "paid", a.Payment = "payment", a.Purchase = "purchase", a.Referral = "referral", a.Renewal = "renewal", a.Signup = "signup", a.Subscription = "subscription", a.Upgrade = "upgrade";
})(ja || (ja = {}));
var Ra;
(function(a) {
  a.Business = "business", a.Engineering = "engineering", a.Exception = "exception", a.LogMessage = "log-message", a.Marketing = "marketing", a.PageLeave = "page-leave", a.PageView = "page-view", a.Product = "product", a.QualityManagement = "quality-management", a.UserAccess = "user-access", a.UserLogin = "user-login", a.UserLogout = "user-logout", a.UserSignup = "user-signup", a.UserPreferencesChanged = "user-preferences-changed", a.WebsiteVisit = "website-visit";
})(Ra || (Ra = {}));
var za;
(function(a) {
  a.CloseTab = "close-tab", a.ExternalLink = "external-link", a.NavigateAway = "navigate-away", a.Unknown = "unknown";
})(za || (za = {}));
var Wa;
(function(a) {
  a.Ecs = "Ecs";
})(Wa || (Wa = {}));
var Va;
(function(a) {
  a.Finished = "Finished", a.Queued = "Queued", a.Running = "Running", a.Started = "Started";
})(Va || (Va = {}));
var Ja;
(function(a) {
  a.Mobile = "mobile", a.TV = "tv", a.Watch = "watch", a.Web = "web";
})(Ja || (Ja = {}));
var Ya;
(function(a) {
  a.Development = "Development", a.NonProduction = "NonProduction", a.Production = "Production";
})(Ya || (Ya = {}));
var Za;
(function(a) {
  a.Completed = "completed", a.Started = "started", a.Uncompleted = "uncompleted";
})(Za || (Za = {}));
var Qa;
(function(a) {
  a.Build = "Build", a.Deployment = "Deployment", a.Test = "Test";
})(Qa || (Qa = {}));
var $a;
(function(a) {
  a.Canceled = "Canceled", a.Completed = "Completed", a.Failed = "Failed", a.Running = "Running", a.Queued = "Queued", a.Waiting = "Waiting";
})($a || ($a = {}));
var Xa;
(function(a) {
  a.Canceled = "Canceled", a.Completed = "Completed", a.Failed = "Failed", a.Running = "Running", a.Queued = "Queued", a.Waiting = "Waiting";
})(Xa || (Xa = {}));
var Ca;
(function(a) {
  a.ForgotPassword = "forgot_password", a.Index = "index", a.Login = "login", a.PageNotFound = "404", a.Signup = "signup", a.VerifyCode = "verify_code";
})(Ca || (Ca = {}));
var ae;
(function(a) {
  a.Info = "info", a.Warning = "warning", a.Error = "error", a.Success = "success";
})(ae || (ae = {}));
var ee;
(function(a) {
  a.Details = "details", a.Dialog = "dialog";
})(ee || (ee = {}));
var ie;
(function(a) {
  a.Info = "info", a.Warning = "warning", a.Error = "error", a.Success = "success";
})(ie || (ie = {}));
var ne;
(function(a) {
  a.AccountBalance = "AccountBalance", a.UserAssets = "UserAssets", a.UserCreditCardDebt = "UserCreditCardDebt", a.UserCreditLimit = "UserCreditLimit", a.UserCreditUtilization = "UserCreditUtilization", a.UserDebt = "UserDebt", a.UserInvestments = "UserInvestments", a.UserRetirement = "UserRetirement", a.UserSavings = "UserSavings";
})(ne || (ne = {}));
var te;
(function(a) {
  a.DateTime = "date_time", a.True = "true", a.False = "false", a.UniqueId = "unique_id";
})(te || (te = {}));
var re;
(function(a) {
  a.DomainModel = "domain_entity", a.GenericModel = "generic_entity";
})(re || (re = {}));
var se;
(function(a) {
  a.AirportCode = "airport-code", a.BankIDCode = "bank-id-code", a.BitcoinAddress = "bitcoin-address", a.Boolean = "boolean", a.City = "city", a.Color = "color", a.CountryCode = "country-code", a.CreditCard = "credit-card", a.CurrencyAmount = "currency-amount", a.CurrencyCode = "currency-code", a.DataURI = "data-uri", a.Date = "date", a.DateRange = "date-range", a.DateTime = "date-time", a.DayOfMonth = "day-of-month", a.DomainName = "domain-name", a.EmailAddress = "email-address", a.EthereumAddress = "ethereum-address", a.EAN = "european-article-number", a.EIN = "employer-identification-number", a.Float = "float", a.GeographicCoordinate = "geographic-coordinate", a.GeographicCoordinates = "geographic-coordinates", a.GitRepositoryURL = "git-repository-url", a.HSLColor = "hsl-color", a.HexColor = "hex-color", a.Hexadecimal = "hexadecimal", a.IBAN = "international-bank-account-number", a.IMEI = "international-mobile-equipment-identifier", a.IPAddress = "ip-address", a.IPAddressRange = "ip-address-range", a.ISBN = "international-standard-book-number", a.ISIN = "international-stock-number", a.ISMN = "international-standard-music-number", a.ISSN = "international-standard-serial-number", a.ISO8601 = "iso-8601", a.ISO31661Alpha2 = "iso-31661-alpha-2", a.ISO31661Alpha3 = "iso-31661-alpha-3", a.ISO4217 = "iso-4217", a.Image = "image", a.Integer = "integer", a.JSON = "json", a.LanguageCode = "language-code", a.LicensePlateNumber = "license-plate-number", a.LongText = "long-text", a.MD5 = "md5", a.Markdown = "markdown", a.Menu = "menu", a.Number = "number", a.MACAddress = "mac-address", a.MagnetURI = "magnet-uri", a.MimeType = "mime-type", a.Month = "month", a.Password = "password", a.PassportNumber = "passport-number", a.Percent = "percent", a.PhoneNumber = "phone-number", a.Port = "port", a.PostalCode = "postal-code", a.Province = "province", a.RFC3339 = "rfc-3339", a.RGBColor = "rgb-color", a.SemanticVersion = "semantic-version", a.SSN = "social-security-number", a.State = "state", a.StreetAddress = "street-address", a.String = "string", a.Tags = "tags", a.TaxIDNumber = "tax-id-number", a.Time = "time", a.TimeOfDay = "time-of-day", a.TimeRange = "time-range", a.TimezoneRegion = "timezone-region", a.URL = "url", a.URLPath = "url-path", a.UUID = "uuid", a.VATIDNumber = "value-added-tax-id-number", a.VerificationCode = "verification-code", a.Video = "video", a.Weekday = "weekday", a.Year = "year";
})(se || (se = {}));
var oe;
(function(a) {
  a.Critical = "Critical", a.Error = "Error", a.Fatal = "Fatal", a.Warning = "Warning";
})(oe || (oe = {}));
var le;
(function(a) {
  a.Contains = "contains", a.HasCharacterCount = "has-character-count", a.HasNumberCount = "has-number-count", a.HasLetterCount = "has-letter-count", a.HasLowercaseCount = "has-lowercase-count", a.HasSpacesCount = "has-spaces-count", a.HasSymbolCount = "has-symbol-count", a.HasUppercaseCount = "has-uppercase-count", a.IsAfter = "is-after", a.IsAfterOrEqual = "is-after-or-equal", a.IsAirport = "is-airport", a.IsAlpha = "is-alpha", a.IsAlphanumeric = "is-alphanumeric", a.IsAlgorithmHash = "is-algorithm-hash", a.IsAscii = "is-ascii", a.IsBase64 = "is-base-64", a.IsBefore = "is-before", a.IsBeforeOrAfter = "is-before-or-after", a.IsBeforeOrEqual = "is-before-or-equal", a.IsBetween = "is-between", a.IsBIC = "is-bic", a.IsBitcoinAddress = "is-bitcoin-address", a.IsBoolean = "is-boolean", a.IsColor = "is-color", a.IsComplexEnough = "is-complex-enough", a.IsCountry = "is-country", a.IsCreditCard = "is-credit-card", a.IsCurrency = "is-currency", a.IsDataURI = "is-data-uri", a.IsDate = "is-date", a.IsDateRange = "is-date-range", a.IsDateTime = "is-date-time", a.IsDayOfMonth = "is-day-of-month", a.IsDecimal = "is-decimal", a.IsDivisibleBy = "is-divisible-by", a.IsDomainName = "is-domain-name", a.IsEmailAddress = "is-email-address", a.IsEthereumAddress = "is-ethereum-address", a.IsEAN = "is-ean", a.IsEIN = "is-ein", a.IsEqual = "is-equal", a.IsEvenNumber = "is-even-number", a.IsFloat = "is-float", a.IsIBAN = "is-iban", a.IsGreaterThan = "greater-than", a.IsGreaterThanOrEqual = "greater-than-or-equal", a.IsHSLColor = "is-hsl-color", a.IsHexColor = "is-hex-color", a.IsHexadecimal = "is-hexadecimal", a.IsIdentityCardCode = "is-identity-card-code", a.IsIMEI = "is-imei", a.IsInIPAddressRange = "is-in-ip-address-range", a.IsInList = "is-in-list", a.IsInTheLast = "is-in-the-last", a.IsInteger = "is-integer", a.IsIPAddress = "is-ip-address", a.IsIPAddressRange = "is-ip-address-range", a.IsISBN = "is-isbn", a.IsISIN = "is-isin", a.IsISMN = "is-ismn", a.IsISRC = "is-isrc", a.IsISSN = "is-issn", a.IsISO4217 = "is-iso-4217", a.IsISO8601 = "is-iso-8601", a.IsISO31661Alpha2 = "is-iso-31661-alpha-2", a.IsISO31661Alpha3 = "is-iso-31661-alpha-3", a.IsJSON = "is-json", a.IsLanguage = "is-language", a.IsLatitude = "is-latitude", a.IsLongitude = "is-longitude", a.IsLengthEqual = "is-length-equal", a.IsLengthGreaterThan = "is-length-greater-than", a.IsLengthGreaterThanOrEqual = "is-length-great-than-or-equal", a.IsLengthLessThan = "is-length-less-than", a.IsLengthLessThanOrEqual = "is-length-less-than-or-equal", a.IsLessThan = "less-than", a.IsLessThanOrEqual = "less-than-or-equal", a.IsLicensePlateNumber = "is-license-plate-number", a.IsLowercase = "is-lowercase", a.IsOctal = "is-octal", a.IsMACAddress = "is-mac-address", a.IsMD5 = "is-md5", a.IsMagnetURI = "is-magnet-uri", a.IsMarkdown = "is-markdown", a.IsMimeType = "is-mime-type", a.IsMonth = "is-month", a.IsNegativeNumber = "is-negative-number", a.IsNotDate = "is-not-date", a.IsNotEqual = "is-not-equal", a.IsNotInIPAddressRange = "is-not-in-ip-address-range", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsNotRegexMatch = "is-not-regex-match", a.IsNotToday = "is-not-today", a.IsNumber = "is-number", a.IsNumeric = "is-numeric", a.IsOddNumber = "is-odd-number", a.IsPassportNumber = "is-passport-number", a.IsPhoneNumber = "is-phone-number", a.IsPort = "is-port", a.IsPositiveNumber = "is-positive-number", a.IsPostalCode = "is-postal-code", a.IsProvince = "is-province", a.IsRGBColor = "is-rgb-color", a.IsRegexMatch = "is-regex-match", a.IsRequired = "is-required", a.IsSemanticVersion = "is-semantic-version", a.IsSlug = "is-slug", a.IsSSN = "is-ssn", a.IsState = "is-state", a.IsStreetAddress = "is-street-address", a.IsString = "is-string", a.IsStrongPassword = "is-strong-password", a.IsTags = "is-tags", a.IsTaxIDNumber = "is-tax-id-number", a.IsThisMonth = "is-this-month", a.IsThisQuarter = "is-this-quarter", a.IsThisWeek = "is-this-week", a.IsThisWeekend = "is-this-weekend", a.IsThisYear = "is-this-year", a.IsTime = "is-time", a.IsTimeOfDay = "is-time-of-day", a.IsTimeRange = "is-time-range", a.IsToday = "is-today", a.IsURL = "is-url", a.IsUUID = "is-uuid", a.IsUppercase = "is-uppercase", a.IsUsernameAvailable = "is-username-available", a.IsValidStreetAddress = "is-valid-street-address", a.IsVATIDNumber = "is-vat-id-number", a.IsWeekday = "is-weekday", a.IsWeekend = "is-weekend", a.IsYear = "is-year";
})(le || (le = {}));
var me;
(function(a) {
  a.IsAuthenticated = "is-authenticated", a.IsNotAuthenticated = "is-not-authenticated", a.IsUsernameAvailable = "is-username-available", a.PasswordMismatch = "password-mismatch";
})(me || (me = {}));
var ce;
(function(a) {
  a.IsHSLColor = "is-hsl-color", a.IsHexColor = "is-hex-color", a.IsNotNull = "is-not-null", a.IsRGBColor = "is-rgb-color", a.IsString = "is-string";
})(ce || (ce = {}));
var ue;
(function(a) {
  a.IsBetween = "is-between", a.IsCurrency = "is-currency", a.IsDecimal = "is-decimal", a.IsDivisibleBy = "is-divisible-by", a.IsEvenNumber = "is-even-number", a.IsFloat = "is-float", a.IsGreaterThan = "greater-than", a.IsGreaterThanOrEqual = "greater-than-or-equal", a.IsInteger = "is-integer", a.IsISO8601 = "is-iso-8601", a.IsLessThan = "less-than", a.IsLessThanOrEqual = "less-than-or-equal", a.IsNegativeNumber = "is-negative-number", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null", a.IsNumber = "is-number", a.IsOddNumber = "is-odd-number", a.IsPositiveNumber = "is-positive-number";
})(ue || (ue = {}));
var de;
(function(a) {
  a.IsBitcoinAddress = "is-bitcoin-address", a.IsEqual = "is-equal", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null";
})(de || (de = {}));
var pe;
(function(a) {
  a.IsEthereumAddress = "is-ethereum-address", a.IsEqual = "is-equal", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null";
})(pe || (pe = {}));
var Ae;
(function(a) {
  a.IsEqual = "is-equal", a.IsJSON = "is-json", a.IsLanguage = "is-language", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null";
})(Ae || (Ae = {}));
var ge;
(function(a) {
  a.IsAlpha = "is-alpha", a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})(ge || (ge = {}));
var fe;
(function(a) {
  a.IsAlpha = "is-alpha", a.IsCountry = "is-country", a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})(fe || (fe = {}));
var he;
(function(a) {
  a.IsEqual = "is-equal", a.IsFloat = "is-float", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null", a.IsNumeric = "is-numeric";
})(he || (he = {}));
var _e;
(function(a) {
  a.IsEqual = "is-equal", a.IsFloat = "is-float", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null", a.IsNumeric = "is-numeric";
})(_e || (_e = {}));
var Se;
(function(a) {
  a.IsEqual = "is-equal", a.IsNotEqual = "is-not-equal", a.IsPostalCode = "is-postal-code", a.IsNotNull = "is-not-null";
})(Se || (Se = {}));
var Te;
(function(a) {
  a.IsAlpha = "is-alpha", a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsProvince = "is-province", a.IsString = "is-string";
})(Te || (Te = {}));
var ve;
(function(a) {
  a.IsAlpha = "is-alpha", a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsState = "is-state", a.IsString = "is-string";
})(ve || (ve = {}));
var be;
(function(a) {
  a.IsAlphanumeric = "is-alphanumeric", a.IsEqual = "is-equal", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null", a.IsString = "is-string", a.IsStreetAddress = "is-street-address";
})(be || (be = {}));
var Ee;
(function(a) {
  a.IsAirport = "is-airport", a.IsAlpha = "is-alpha", a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})(Ee || (Ee = {}));
var Ie;
(function(a) {
  a.IsAlgorithmHash = "is-algorithm-hash", a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})(Ie || (Ie = {}));
var xe;
(function(a) {
  a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsSemanticVersion = "is-semantic-version", a.IsString = "is-string";
})(xe || (xe = {}));
var Ue;
(function(a) {
  a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string", a.IsUUID = "is-uuid";
})(Ue || (Ue = {}));
var ye;
(function(a) {
  a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsMD5 = "is-md5", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})(ye || (ye = {}));
var Pe;
(function(a) {
  a.IsBoolean = "is-boolean", a.IsEqual = "is-equal", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null";
})(Pe || (Pe = {}));
var ke;
(function(a) {
  a.IsAfter = "is-after", a.IsAfterOrEqual = "is-after-or-equal", a.IsBefore = "is-before", a.IsBeforeOrEqual = "is-before-or-equal", a.IsBetween = "is-between", a.IsDate = "is-date", a.IsEqual = "is-equal", a.IsNotDate = "is-not-date", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null", a.IsNotToday = "is-not-today", a.IsThisWeek = "is-this-week", a.IsThisMonth = "is-this-month", a.IsThisQuarter = "is-this-quarter", a.IsThisYear = "is-this-year", a.IsToday = "is-today", a.IsWeekend = "is-weekend";
})(ke || (ke = {}));
var Me;
(function(a) {
  a.IsAfter = "is-after", a.IsBefore = "is-before", a.IsBeforeOrAfter = "is-before-or-after", a.IsBetween = "is-between", a.IsDate = "is-date", a.IsDateRange = "is-date-range", a.IsEqual = "is-equal", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null";
})(Me || (Me = {}));
var Ne;
(function(a) {
  a.IsAfter = "is-after", a.IsAfterOrEqual = "is-after-or-equal", a.IsBefore = "is-before", a.IsBeforeOrEqual = "is-before-or-equal", a.IsBetween = "is-between", a.IsDate = "is-date", a.IsEqual = "is-equal", a.IsNotDate = "is-not-date", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null", a.IsNotToday = "is-not-today", a.IsThisWeek = "is-this-week", a.IsThisMonth = "is-this-month", a.IsThisQuarter = "is-this-quarter", a.IsThisYear = "is-this-year", a.IsToday = "is-today", a.IsWeekend = "is-weekend";
})(Ne || (Ne = {}));
var Le;
(function(a) {
  a.IsAfter = "is-after", a.IsAfterOrEqual = "is-after-or-equal", a.IsBefore = "is-before", a.IsBeforeOrEqual = "is-before-or-equal", a.IsBetween = "is-between", a.IsDayOfMonth = "is-day-of-month", a.IsEvenNumber = "is-even-number", a.IsEqual = "is-equal", a.IsGreaterThan = "greater-than", a.IsGreaterThanOrEqual = "greater-than-or-equal", a.IsInteger = "is-integer", a.IsLessThan = "less-than", a.IsLessThanOrEqual = "less-than-or-equal", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null", a.IsNumber = "is-number", a.IsOddNumber = "is-odd-number", a.IsToday = "is-today", a.IsWeekday = "is-weekday", a.IsWeekend = "is-weekend";
})(Le || (Le = {}));
var Be;
(function(a) {
  a.IsAfter = "is-after", a.IsAfterOrEqual = "is-after-or-equal", a.IsBefore = "is-before", a.IsBeforeOrEqual = "is-before-or-equal", a.IsBetween = "is-between", a.IsEvenNumber = "is-even-number", a.IsEqual = "is-equal", a.IsGreaterThan = "greater-than", a.IsGreaterThanOrEqual = "greater-than-or-equal", a.IsInteger = "is-integer", a.IsLessThan = "less-than", a.IsLessThanOrEqual = "less-than-or-equal", a.IsMonth = "is-month", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null", a.IsNumber = "is-number", a.IsOddNumber = "is-odd-number", a.IsThisMonth = "is-this-month";
})(Be || (Be = {}));
var we;
(function(a) {
  a.IsAfter = "is-after", a.IsAfterOrEqual = "is-after-or-equal", a.IsBefore = "is-before", a.IsBeforeOrEqual = "is-before-or-equal", a.IsBetween = "is-between", a.IsEqual = "is-equal", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null", a.IsTime = "is-time";
})(we || (we = {}));
var De;
(function(a) {
  a.IsAfter = "is-after", a.IsBefore = "is-before", a.IsBeforeOrAfter = "is-before-or-after", a.IsBetween = "is-between", a.IsTime = "is-time", a.IsEqual = "is-equal", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null", a.IsTimeRange = "is-time-range";
})(De || (De = {}));
var Ge;
(function(a) {
  a.IsAfter = "is-after", a.IsBefore = "is-before", a.IsBeforeOrAfter = "is-before-or-after", a.IsBetween = "is-between", a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsTimeOfDay = "is-time-of-day", a.IsTimeRange = "is-time-range";
})(Ge || (Ge = {}));
var Ke;
(function(a) {
  a.IsAfter = "is-after", a.IsAfterOrEqual = "is-after-or-equal", a.IsBefore = "is-before", a.IsBeforeOrEqual = "is-before-or-equal", a.IsBetween = "is-between", a.IsEvenNumber = "is-even-number", a.IsEqual = "is-equal", a.IsGreaterThan = "greater-than", a.IsGreaterThanOrEqual = "greater-than-or-equal", a.IsLessThan = "less-than", a.IsLessThanOrEqual = "less-than-or-equal", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null", a.IsNumber = "is-number", a.IsOddNumber = "is-odd-number", a.IsWeekday = "is-weekday", a.IsWeekend = "is-weekend";
})(Ke || (Ke = {}));
var qe;
(function(a) {
  a.IsAfter = "is-after", a.IsAfterOrEqual = "is-after-or-equal", a.IsBefore = "is-before", a.IsBeforeOrEqual = "is-before-or-equal", a.IsBetween = "is-between", a.IsEvenNumber = "is-even-number", a.IsEqual = "is-equal", a.IsGreaterThan = "greater-than", a.IsGreaterThanOrEqual = "greater-than-or-equal", a.IsInteger = "is-integer", a.IsLessThan = "less-than", a.IsLessThanOrEqual = "less-than-or-equal", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null", a.IsNumber = "is-number", a.IsOddNumber = "is-odd-number", a.IsThisYear = "is-this-year", a.IsYear = "is-year";
})(qe || (qe = {}));
var Fe;
(function(a) {
  a.IsEqual = "is-equal", a.IsHexadecimal = "is-hexadecimal", a.IsLengthEqual = "is-length-equal", a.IsLengthGreaterThan = "is-length-greater-than", a.IsLengthGreaterThanOrEqual = "is-length-great-than-or-equal", a.IsLengthLessThan = "is-length-less-than", a.IsLengthLessThanOrEqual = "is-length-less-than-or-equal", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})(Fe || (Fe = {}));
var He;
(function(a) {
  a.IsEqual = "is-equal", a.IsJSON = "is-json", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null";
})(He || (He = {}));
var Oe;
(function(a) {
  a.IsEqual = "is-equal", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null", a.IsMarkdown = "is-markdown", a.IsString = "is-string";
})(Oe || (Oe = {}));
var je;
(function(a) {
  a.Contains = "contains", a.IsEqual = "is-equal", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null";
})(je || (je = {}));
var Re;
(function(a) {
  a.Contains = "contains", a.IsEqual = "is-equal", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null";
})(Re || (Re = {}));
var ze;
(function(a) {
  a.Contains = "contains", a.IsDataURI = "is-data-uri", a.IsEqual = "is-equal", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})(ze || (ze = {}));
var We;
(function(a) {
  a.Contains = "contains", a.IsDomainName = "is-domain-name", a.IsEqual = "is-equal", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})(We || (We = {}));
var Ve;
(function(a) {
  a.Contains = "contains", a.IsEmailAddress = "is-email-address", a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})(Ve || (Ve = {}));
var Je;
(function(a) {
  a.Contains = "contains", a.IsEqual = "is-equal", a.IsIPAddress = "is-ip-address", a.IsInIPAddressRange = "is-in-ip-address-range", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotInIPAddressRange = "is-not-in-ip-address-range", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})(Je || (Je = {}));
var Ye;
(function(a) {
  a.IsEqual = "is-equal", a.IsIPAddressRange = "is-ip-address-range", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotInIPAddressRange = "is-not-in-ip-address-range", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})(Ye || (Ye = {}));
var Ze;
(function(a) {
  a.IsEqual = "is-equal", a.IsGreaterThan = "greater-than", a.IsGreaterThanOrEqual = "greater-than-or-equal", a.IsInteger = "is-integer", a.IsLessThan = "less-than", a.IsLessThanOrEqual = "less-than-or-equal", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null";
})(Ze || (Ze = {}));
var Qe;
(function(a) {
  a.Contains = "contains", a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsMACAddress = "is-mac-address", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})(Qe || (Qe = {}));
var $e;
(function(a) {
  a.Contains = "contains", a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsMagnetURI = "is-magnet-uri", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})($e || ($e = {}));
var Xe;
(function(a) {
  a.Contains = "contains", a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsMimeType = "is-mime-type", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})(Xe || (Xe = {}));
var Ce;
(function(a) {
  a.Contains = "contains", a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string", a.IsSlug = "is-slug";
})(Ce || (Ce = {}));
var ai;
(function(a) {
  a.Contains = "contains", a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string", a.IsURL = "is-url";
})(ai || (ai = {}));
var ei;
(function(a) {
  a.IsAfter = "is-after", a.IsAfterOrEqual = "is-after-or-equal", a.IsBefore = "is-before", a.IsBeforeOrEqual = "is-before-or-equal", a.IsBetween = "is-between", a.IsDecimal = "is-decimal", a.IsDivisibleBy = "is-divisible-by", a.IsEAN = "is-ean", a.IsEIN = "is-ein", a.IsEqual = "is-equal", a.IsEvenNumber = "is-even-number", a.IsFloat = "is-float", a.IsGreaterThan = "greater-than", a.IsGreaterThanOrEqual = "greater-than-or-equal", a.IsInt = "is-integer", a.IsISBN = "is-isbn", a.IsISMN = "is-ismn", a.IsISSN = "is-issn", a.IsLatitude = "is-latitude", a.IsLongitude = "is-longitude", a.IsLessThan = "less-than", a.IsLessThanOrEqual = "less-than-or-equal", a.IsMACAddress = "is-mac-address", a.IsNumber = "is-number", a.IsNegativeNumber = "is-negative-number", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null", a.IsOddNumber = "is-odd-number", a.IsPassportNumber = "is-passport-number", a.IsPhoneNumber = "is-phone-number", a.IsPort = "is-port", a.IsPositiveNumber = "is-positive-number", a.IsPostalCode = "is-postal-code", a.IsSemanticVersion = "is-semantic-version", a.IsSSN = "is-ssn", a.IsTaxIDNumber = "is-tax-id-number", a.IsUUID = "is-uuid", a.IsVATIDNumber = "is-vat-id-number";
})(ei || (ei = {}));
var ii;
(function(a) {
  a.IsEqual = "is-equal", a.IsFloat = "is-float", a.IsGreaterThan = "greater-than", a.IsGreaterThanOrEqual = "greater-than-or-equal", a.IsLessThan = "less-than", a.IsLessThanOrEqual = "less-than-or-equal", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null", a.IsNumber = "is-number", a.IsNumeric = "is-numeric";
})(ii || (ii = {}));
var ni;
(function(a) {
  a.IsEqual = "is-equal", a.IsInteger = "is-integer", a.IsGreaterThan = "greater-than", a.IsGreaterThanOrEqual = "greater-than-or-equal", a.IsLessThan = "less-than", a.IsLessThanOrEqual = "less-than-or-equal", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null", a.IsNumber = "is-number", a.IsNumeric = "is-numeric";
})(ni || (ni = {}));
var ti;
(function(a) {
  a.IsCreditCard = "is-credit-card", a.IsEqual = "is-equal", a.IsLengthEqual = "is-length-equal", a.IsLengthGreaterThan = "is-length-greater-than", a.IsLengthGreaterThanOrEqual = "is-length-great-than-or-equal", a.IsLengthLessThan = "is-length-less-than", a.IsLengthLessThanOrEqual = "is-length-less-than-or-equal", a.IsNotEqual = "is-not-equal", a.IsNotNull = "is-not-null", a.IsRegexMatch = "is-regex-match", a.IsNotRegexMatch = "is-not-regex-match";
})(ti || (ti = {}));
var ri;
(function(a) {
  a.isEmailAddress = "is-email-address", a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsLengthEqual = "is-length-equal", a.IsLengthGreaterThan = "is-length-greater-than", a.IsLengthGreaterThanOrEqual = "is-length-great-than-or-equal", a.IsLengthLessThan = "is-length-less-than", a.IsLengthLessThanOrEqual = "is-length-less-than-or-equal", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsRegexMatch = "is-regex-match", a.IsNotRegexMatch = "is-not-regex-match";
})(ri || (ri = {}));
var zi;
(function(a) {
  a.IsLicensePlateNumber = "is-license-plate-number", a.IsNotNull = "is-not-null", a.IsNotRegexMatch = "is-not-regex-match", a.IsString = "is-string", a.IsRegexMatch = "is-regex-match";
})(zi || (zi = {}));
var si;
(function(a) {
  a.IsNotNull = "is-not-null", a.IsPassportNumber = "is-passport-number", a.IsString = "is-string", a.IsRegexMatch = "is-regex-match";
})(si || (si = {}));
var oi;
(function(a) {
  a.IsComplexEnough = "is-complex-enough", a.IsInList = "is-in-list", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsNotRegexMatch = "is-not-regex-match", a.IsLengthGreaterThan = "is-length-greater-than", a.IsLengthGreaterThanOrEqual = "is-length-great-than-or-equal", a.IsLengthLessThan = "is-length-less-than", a.IsLengthLessThanOrEqual = "is-length-less-than-or-equal", a.IsStrongPassword = "is-strong-password", a.IsString = "is-string", a.IsRegexMatch = "is-regex-match";
})(oi || (oi = {}));
var li;
(function(a) {
  a.IsNotNull = "is-not-null", a.IsNotRegexMatch = "is-not-regex-match", a.IsNumber = "is-number", a.IsPhoneNumber = "is-phone-number", a.IsRegexMatch = "is-regex-match";
})(li || (li = {}));
var mi;
(function(a) {
  a.IsNotNull = "is-not-null", a.IsSSN = "is-ssn", a.IsString = "is-string", a.IsRegexMatch = "is-regex-match";
})(mi || (mi = {}));
var ci;
(function(a) {
  a.Contains = "contains", a.IsBIC = "is-bic", a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})(ci || (ci = {}));
var ui$1;
(function(a) {
  a.Contains = "contains", a.IsEAN = "is-ean", a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})(ui$1 || (ui$1 = {}));
var di;
(function(a) {
  a.Contains = "contains", a.IsEIN = "is-ein", a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})(di || (di = {}));
var pi;
(function(a) {
  a.Contains = "contains", a.IsEqual = "is-equal", a.IsIBAN = "is-iban", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})(pi || (pi = {}));
var Ai;
(function(a) {
  a.Contains = "contains", a.IsEqual = "is-equal", a.IsISBN = "is-isbn", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})(Ai || (Ai = {}));
var gi;
(function(a) {
  a.Contains = "contains", a.IsEqual = "is-equal", a.IsISIN = "is-isin", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})(gi || (gi = {}));
var fi;
(function(a) {
  a.Contains = "contains", a.IsEqual = "is-equal", a.IsISMN = "is-ismn", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})(fi || (fi = {}));
var hi;
(function(a) {
  a.Contains = "contains", a.IsEqual = "is-equal", a.IsISSN = "is-issn", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string";
})(hi || (hi = {}));
var _i;
(function(a) {
  a.Contains = "contains", a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string", a.IsTaxIDNumber = "is-tax-id-number";
})(_i || (_i = {}));
var Si;
(function(a) {
  a.Contains = "contains", a.IsEqual = "is-equal", a.IsInList = "is-in-list", a.IsNotEqual = "is-not-equal", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsString = "is-string", a.IsVATIDNumber = "is-vat-id-number";
})(Si || (Si = {}));
var Ti;
(function(a) {
  a.Contains = "contains", a.HasNumberCount = "has-number-count", a.HasLowercaseCount = "has-lowercase-count", a.HasLetterCount = "has-letter-count", a.HasSpacesCount = "has-spaces-count", a.HasSymbolCount = "has-symbol-count", a.HasUppercaseCount = "has-uppercase-count", a.IsAlpha = "is-alpha", a.IsAlphanumeric = "is-alphanumeric", a.IsAscii = "is-ascii", a.IsBase64 = "is-base-64", a.IsColor = "is-color", a.IsComplexEnough = "is-complex-enough", a.IsCreditCard = "is-credit-card", a.IsDataURI = "is-data-uri", a.IsDomainName = "is-domain-name", a.IsEmailAddress = "is-email-address", a.IsEthereumAddress = "is-ethereum-address", a.IsEAN = "is-ean", a.IsEIN = "is-ein", a.IsEqual = "is-equal", a.IsIBAN = "is-iban", a.IsHSLColor = "is-hsl-color", a.IsHexColor = "is-hex-color", a.IsHexadecimal = "is-hexadecimal", a.IsIdentityCardCode = "is-identity-card-code", a.IsIMEI = "is-imei", a.IsInList = "is-in-list", a.IsIPAddress = "is-ip-address", a.IsInIPAddressRange = "is-in-ip-address-range", a.IsISBN = "is-isbn", a.IsISIN = "is-isin", a.IsISMN = "is-ismn", a.IsISRC = "is-isrc", a.IsISSN = "is-issn", a.IsLanguage = "is-language", a.IsLatitude = "is-latitude", a.IsLongitude = "is-longitude", a.IsLengthEqual = "is-length-equal", a.IsLengthGreaterThan = "is-length-greater-than", a.IsLengthGreaterThanOrEqual = "is-length-great-than-or-equal", a.IsLengthLessThan = "is-length-less-than", a.IsLengthLessThanOrEqual = "is-length-less-than-or-equal", a.IsLicensePlateNumber = "is-license-plate-number", a.IsLowercase = "is-lowercase", a.IsOctal = "is-octal", a.IsMACAddress = "is-mac-address", a.IsMD5 = "is-md5", a.IsMagnetURI = "is-magnet-uri", a.IsMarkdown = "is-markdown", a.IsMimeType = "is-mime-type", a.IsMonth = "is-month", a.IsNotInIPAddressRange = "is-not-in-ip-address-range", a.IsNotInList = "is-not-in-list", a.IsNotNull = "is-not-null", a.IsNotRegexMatch = "is-not-regex-match", a.IsNumber = "is-number", a.IsNumeric = "is-numeric", a.IsPassportNumber = "is-passport-number", a.IsPhoneNumber = "is-phone-number", a.IsPort = "is-port", a.IsPostalCode = "is-postal-code", a.IsProvince = "is-province", a.IsRegexMatch = "is-regex-match", a.IsSemanticVersion = "is-semantic-version", a.IsSlug = "is-slug", a.IsSSN = "is-ssn", a.IsState = "is-state", a.IsStreetAddress = "is-street-address", a.IsString = "is-string", a.IsTaxIDNumber = "is-tax-id-number", a.IsURL = "is-url", a.IsUUID = "is-uuid", a.IsUppercase = "is-uppercase", a.IsVATIDNumber = "is-vat-id-number", a.IsWeekday = "is-weekday", a.IsWeekend = "is-weekend", a.IsYear = "is-year";
})(Ti || (Ti = {}));
var vi;
(function(a) {
  a.Contains = "contains", a.IsAlpha = "is-alpha", a.IsAlphanumeric = "is-alphanumeric", a.IsInList = "is-in-list", a.IsMarkdown = "is-markdown", a.IsNotInList = "is-not-in-list", a.IsNumeric = "is-numeric", a.IsLowercase = "is-lowercase", a.IsString = "is-string", a.IsUppercase = "is-uppercase";
})(vi || (vi = {}));
var bi;
(function(a) {
  a.InvalidCharacters = "invalid-characters", a.InvalidPattern = "invalid-pattern", a.NotComplexEnough = "not-complex-enough", a.NotUnique = "not-unique", a.NotValidEmail = "not-valid-email", a.TooLong = "too-long", a.TooShort = "too-short", a.Required = "required";
})(bi || (bi = {}));
var Ei;
(function(a) {
  a[a.Allowed = 0] = "Allowed", a[a.Blocked = 1] = "Blocked";
})(Ei || (Ei = {}));
var Ii;
(function(a) {
  a.Canceled = "Canceled", a.Completed = "Completed", a.Created = "Created", a.Faulted = "Faulted", a.Queued = "Queued", a.Running = "Running", a.Waiting = "Waiting";
})(Ii || (Ii = {}));
var xi;
(function(a) {
  a.Archived = "ARCHIVED", a.Compromised = "COMPROMISED", a.Confirmed = "CONFIRMED", a.ForcePasswordChange = "FORCE_CHANGE_PASSWORD", a.ResetRequired = "RESET_REQUIRED", a.Unconfirmed = "UNCONFIRMED", a.Unknown = "UNKNOWN";
})(xi || (xi = {}));
var Wi;
(function(a) {
  a.Code = "code", a.Link = "link";
})(Wi || (Wi = {}));
var Ui;
(function(a) {
  a.Owner = "Owner", a.Admin = "Admin", a.User = "User", a.Visitor = "Visitor";
})(Ui || (Ui = {}));
var yi;
(function(a) {
  a.RequiresPaymentMethod = "requires_payment_method", a.RequiresConfirmation = "requires_confirmation", a.RequiresAction = "requires_action", a.Processing = "processing", a.RequiresCapture = "requires_capture", a.Canceled = "canceled", a.Succeeded = "succeeded";
})(yi || (yi = {}));
var Pi;
(function(a) {
  a.Incomplete = "incomplete", a.IncompleteExpired = "incomplete_expired", a.Trialing = "trialing", a.Active = "active", a.PastDue = "past_due", a.Canceled = "canceled", a.Unpaid = "unpaid";
})(Pi || (Pi = {}));
var ki;
(function(a) {
  a.Monthly = "monthly", a.Quarterly = "quarterly", a.Yearly = "yearly", a.Lifetime = "lifetime";
})(ki || (ki = {}));
var Mi;
(function(a) {
  a.Delivered = "delivered", a.Read = "read", a.Sending = "sending", a.Sent = "sent";
})(Mi || (Mi = {}));
var Ni;
(function(a) {
  a.Audio = "audio", a.File = "file", a.Image = "image", a.Text = "text", a.Video = "video";
})(Ni || (Ni = {}));
var Li;
(function(a) {
  a.Audio = "audio", a.File = "file", a.Image = "image", a.Video = "video";
})(Li || (Li = {}));
var Bi;
(function(a) {
  a.Angry = "angry", a.Laugh = "laugh", a.Like = "like", a.Love = "love", a.Sad = "sad", a.Wow = "wow", a.Wink = "wink", a.Yay = "yay";
})(Bi || (Bi = {}));
var wi;
(function(a) {
  a.Email = "email", a.PhoneNumber = "phone_number";
})(wi || (wi = {}));
var c;
(function(a) {
  a.Analytics = "analytics", a.Critical = "critical", a.Debug = "debug", a.Exception = "exception", a.Http = "http", a.Info = "info", a.Warning = "warning";
})(c || (c = {}));
var Di;
(function(a) {
  a.Delete = "delete", a.Get = "get", a.Head = "head", a.Patch = "patch", a.Post = "post", a.Put = "put";
})(Di || (Di = {}));
var Gi;
(function(a) {
  a[a.CONTINUE = 100] = "CONTINUE", a[a.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", a[a.PROCESSING = 102] = "PROCESSING", a[a.OK = 200] = "OK", a[a.CREATED = 201] = "CREATED", a[a.ACCEPTED = 202] = "ACCEPTED", a[a.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", a[a.NO_CONTENT = 204] = "NO_CONTENT", a[a.RESET_CONTENT = 205] = "RESET_CONTENT", a[a.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", a[a.MULTI_STATUS = 207] = "MULTI_STATUS", a[a.ALREADY_REPORTED = 208] = "ALREADY_REPORTED", a[a.IM_USED = 226] = "IM_USED", a[a.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", a[a.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", a[a.FOUND = 302] = "FOUND", a[a.SEE_OTHER = 303] = "SEE_OTHER", a[a.NOT_MODIFIED = 304] = "NOT_MODIFIED", a[a.USE_PROXY = 305] = "USE_PROXY", a[a.SWITCH_PROXY = 306] = "SWITCH_PROXY", a[a.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", a[a.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", a[a.BAD_REQUEST = 400] = "BAD_REQUEST", a[a.UNAUTHORIZED = 401] = "UNAUTHORIZED", a[a.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", a[a.FORBIDDEN = 403] = "FORBIDDEN", a[a.NOT_FOUND = 404] = "NOT_FOUND", a[a.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", a[a.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", a[a.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", a[a.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", a[a.CONFLICT = 409] = "CONFLICT", a[a.GONE = 410] = "GONE", a[a.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", a[a.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", a[a.PAYLOAD_TOO_LARGE = 413] = "PAYLOAD_TOO_LARGE", a[a.URI_TOO_LONG = 414] = "URI_TOO_LONG", a[a.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", a[a.RANGE_NOT_SATISFIABLE = 416] = "RANGE_NOT_SATISFIABLE", a[a.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", a[a.I_AM_A_TEAPOT = 418] = "I_AM_A_TEAPOT", a[a.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", a[a.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", a[a.LOCKED = 423] = "LOCKED", a[a.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", a[a.TOO_EARLY = 425] = "TOO_EARLY", a[a.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", a[a.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", a[a.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", a[a.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", a[a.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", a[a.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", a[a.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", a[a.BAD_GATEWAY = 502] = "BAD_GATEWAY", a[a.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", a[a.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", a[a.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", a[a.VARIANT_ALSO_NEGOTIATES = 506] = "VARIANT_ALSO_NEGOTIATES", a[a.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", a[a.LOOP_DETECTED = 508] = "LOOP_DETECTED", a[a.BANDWIDTH_LIMIT_EXCEEDED = 509] = "BANDWIDTH_LIMIT_EXCEEDED", a[a.NOT_EXTENDED = 510] = "NOT_EXTENDED", a[a.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED";
})(Gi || (Gi = {}));
var r;
(function(a) {
  a.Afghanistan = "AF", a.Albania = "AL", a.Algeria = "DZ", a.AmericanSamoa = "AS", a.Andorra = "AD", a.Angola = "AO", a.Anguilla = "AI", a.Antarctica = "AQ", a.AntiguaAndBarbuda = "AG", a.Argentina = "AR", a.Armenia = "AM", a.Aruba = "AW", a.Australia = "AU", a.Austria = "AT", a.Azerbaijan = "AZ", a.Bahamas = "BS", a.Bahrain = "BH", a.Bangladesh = "BD", a.Barbados = "BB", a.Belarus = "BY", a.Belgium = "BE", a.Belize = "BZ", a.Benin = "BJ", a.Bermuda = "BM", a.Bhutan = "BT", a.Bolivia = "BO", a.BosniaAndHerzegovina = "BA", a.Botswana = "BW", a.BouvetIsland = "BV", a.Brazil = "BR", a.BritishIndianOceanTerritory = "IO", a.Brunei = "BN", a.Bulgaria = "BG", a.BurkinaFaso = "BF", a.Burundi = "BI", a.Cambodia = "KH", a.Cameroon = "CM", a.Canada = "CA", a.CapeVerde = "CV", a.CaymanIslands = "KY", a.CentralAfricanRepublic = "CF", a.Chad = "TD", a.Chile = "CL", a.China = "CN", a.ChristmasIsland = "CX", a.CocosKeelingIslands = "CC", a.Colombia = "CO", a.Comoros = "KM", a.Congo = "CG", a.CongoTheDemocraticRepublicOfThe = "CD", a.CookIslands = "CK", a.CostaRica = "CR", a.CoteDIvoire = "CI", a.Croatia = "HR", a.Cuba = "CU", a.Cyprus = "CY", a.CzechRepublic = "CZ", a.Denmark = "DK", a.Djibouti = "DJ", a.Dominica = "DM", a.DominicanRepublic = "DO", a.Ecuador = "EC", a.Egypt = "EG", a.ElSalvador = "SV", a.EquatorialGuinea = "GQ", a.Eritrea = "ER", a.Estonia = "EE", a.Ethiopia = "ET", a.FalklandIslands = "FK", a.FaroeIslands = "FO", a.Fiji = "FJ", a.Finland = "FI", a.France = "FR", a.FrenchGuiana = "GF", a.FrenchPolynesia = "PF", a.FrenchSouthernTerritories = "TF", a.Gabon = "GA", a.Gambia = "GM", a.Georgia = "GE", a.Germany = "DE", a.Ghana = "GH", a.Gibraltar = "GI", a.Greece = "GR", a.Greenland = "GL", a.Grenada = "GD", a.Guadeloupe = "GP", a.Guam = "GU", a.Guatemala = "GT", a.Guernsey = "GG", a.Guinea = "GN", a.GuineaBissau = "GW", a.Guyana = "GY", a.Haiti = "HT", a.HeardIslandMcdonaldIslands = "HM", a.HolySeeVaticanCityState = "VA", a.Honduras = "HN", a.HongKong = "HK", a.Hungary = "HU", a.Iceland = "IS", a.India = "IN", a.Indonesia = "ID", a.Iran = "IR", a.Iraq = "IQ", a.Ireland = "IE", a.IsleOfMan = "IM", a.Israel = "IL", a.Italy = "IT", a.Jamaica = "JM", a.Japan = "JP", a.Jersey = "JE", a.Jordan = "JO", a.Kazakhstan = "KZ", a.Kenya = "KE", a.Kiribati = "KI", a.Kuwait = "KW", a.Kyrgyzstan = "KG", a.Laos = "LA", a.Latvia = "LV", a.Lebanon = "LB", a.Lesotho = "LS", a.Liberia = "LR", a.Libya = "LY", a.Liechtenstein = "LI", a.Lithuania = "LT", a.Luxembourg = "LU", a.Macau = "MO", a.Madagascar = "MG", a.Malawi = "MW", a.Malaysia = "MY", a.Maldives = "MV", a.Mali = "ML", a.Malta = "MT", a.MarshallIslands = "MH", a.Martinique = "MQ", a.Mauritania = "MR", a.Mauritius = "MU", a.Mayotte = "YT", a.Mexico = "MX", a.MicronesiaFederatedStatesOf = "FM", a.Moldova = "MD", a.Monaco = "MC", a.Mongolia = "MN", a.Montenegro = "ME", a.Montserrat = "MS", a.Morocco = "MA", a.Mozambique = "MZ", a.Myanmar = "MM", a.Namibia = "NA", a.Nauru = "NR", a.Nepal = "NP", a.Netherlands = "NL", a.NetherlandsAntilles = "AN", a.NewCaledonia = "NC", a.NewZealand = "NZ", a.NorthKorea = "KP", a.Nicaragua = "NI", a.Niger = "NE", a.Nigeria = "NG", a.Niue = "NU", a.NorfolkIsland = "NF", a.NorthMacedonia = "MK", a.NorthernMarianaIslands = "MP", a.Norway = "NO", a.Oman = "OM", a.Pakistan = "PK", a.Palau = "PW", a.PalestinianTerritoryOccupied = "PS", a.Panama = "PA", a.PapuaNewGuinea = "PG", a.Paraguay = "PY", a.Peru = "PE", a.Philippines = "PH", a.Pitcairn = "PN", a.Poland = "PL", a.Portugal = "PT", a.PuertoRico = "PR", a.Qatar = "QA", a.Reunion = "RE", a.Romania = "RO", a.RussianFederation = "RU", a.Rwanda = "RW", a.SaintBarthelemy = "BL", a.SaintHelena = "SH", a.SaintKittsAndNevis = "KN", a.SaintLucia = "LC", a.SaintMartin = "MF", a.SaintPierreAndMiquelon = "PM", a.SaintVincentAndTheGrenadines = "VC", a.Samoa = "WS", a.SanMarino = "SM", a.SaoTomeAndPrincipe = "ST", a.SaudiArabia = "SA", a.Senegal = "SN", a.Serbia = "RS", a.SerbiaAndMontenegro = "CS", a.Seychelles = "SC", a.SierraLeone = "SL", a.Singapore = "SG", a.Slovakia = "SK", a.Slovenia = "SI", a.SolomonIslands = "SB", a.Somalia = "SO", a.SouthAfrica = "ZA", a.SouthGeorgiaAndTheSouthSandwichIslands = "GS", a.SouthKorea = "KR", a.Spain = "ES", a.SriLanka = "LK", a.Sudan = "SD", a.Suriname = "SR", a.SvalbardAndJanMayen = "SJ", a.Swaziland = "SZ", a.Sweden = "SE", a.Switzerland = "CH", a.Syria = "SY", a.Taiwan = "TW", a.Tajikistan = "TJ", a.Tanzania = "TZ", a.Thailand = "TH", a.TimorLeste = "TL", a.Togo = "TG", a.Tokelau = "TK", a.Tonga = "TO", a.TrinidadAndTobago = "TT", a.Tunisia = "TN", a.Turkey = "TR", a.Turkmenistan = "TM", a.TurksAndCaicosIslands = "TC", a.Tuvalu = "TV", a.Uganda = "UG", a.Ukraine = "UA", a.UnitedArabEmirates = "AE", a.UnitedKingdom = "GB", a.UnitedStates = "US", a.UnitedStatesMinorOutlyingIslands = "UM", a.Uruguay = "UY", a.Uzbekistan = "UZ", a.Vanuatu = "VU", a.Venezuela = "VE", a.Vietnam = "VN", a.VirginIslandsBritish = "VG", a.VirginIslandsUS = "VI", a.WallisAndFutuna = "WF", a.WesternSahara = "EH", a.Yemen = "YE", a.Zambia = "ZM", a.Zimbabwe = "ZW";
})(r || (r = {}));
var l$1;
(function(a) {
  a.AfghanistanAfghani = "AFN", a.AlbaniaLek = "ALL", a.ArmeniaDram = "AMD", a.AlgeriaDinar = "DZD", a.AmericanSamoaTala = "WST", a.AngolaKwanza = "AOA", a.ArgentinaPeso = "ARS", a.AustraliaDollar = "AUD", a.ArubaFlorin = "AWG", a.AzerbaijanNewManat = "AZN", a.BosniaAndHerzegovinaConvertibleMark = "BAM", a.BahrainDinar = "BHD", a.BarbadosDollar = "BBD", a.BangladeshTaka = "BDT", a.BelgiumFranc = "BGN", a.BermudaDollar = "BMD", a.BruneiDollar = "BND", a.BoliviaBoliviano = "BOB", a.BrazilReal = "BRL", a.BahamasDollar = "BSD", a.BhutanNgultrum = "BTN", a.BotswanaPula = "BWP", a.BelarusRuble = "BYN", a.BelizeDollar = "BZD", a.BulgariaLev = "BGN", a.BurundiFranc = "BIF", a.BritishPound = "GBP", a.CanadaDollar = "CAD", a.CambodiaRiel = "KHR", a.ComorosFranc = "KMF", a.CaymanIslandsDollar = "KYD", a.ChilePeso = "CLP", a.ChinaYuan = "CNY", a.ColombiaPeso = "COP", a.CostaRicaColon = "CRC", a.CroatiaKuna = "HRK", a.CubaConvertiblePeso = "CUC", a.CubaPeso = "CUP", a.CapeVerdeEscudo = "CVE", a.CyprusPound = "CYP", a.CzechRepublicKoruna = "CZK", a.DjiboutiFranc = "DJF", a.DenmarkKrone = "DKK", a.DominicaDollar = "XCD", a.DominicanRepublicPeso = "DOP", a.EastCaribbeanDollar = "XCD", a.EgyptPound = "EGP", a.ElSalvadorColon = "SVC", a.EquatorialGuineaEkwele = "GQE", a.EritreaNakfa = "ERN", a.EstoniaKroon = "EEK", a.EthiopiaBirr = "ETB", a.Euro = "EUR", a.FijiDollar = "FJD", a.FalklandIslandsPound = "FKP", a.GambiaDalasi = "GMD", a.GabonFranc = "GMD", a.GeorgiaLari = "GEL", a.GhanaCedi = "GHS", a.GibraltarPound = "GIP", a.GuatemalaQuetzal = "GTQ", a.GuernseyPound = "GGP", a.GuineaBissauPeso = "GWP", a.GuyanaDollar = "GYD", a.HongKongDollar = "HKD", a.HondurasLempira = "HNL", a.HaitiGourde = "HTG", a.HungaryForint = "HUF", a.IndonesiaRupiah = "IDR", a.IsleOfManPound = "IMP", a.IsraelNewShekel = "ILS", a.IndiaRupee = "INR", a.IraqDinar = "IQD", a.IranRial = "IRR", a.IcelandKrona = "ISK", a.JamaicaDollar = "JMD", a.JapanYen = "JPY", a.JerseyPound = "JEP", a.JordanDinar = "JOD", a.KazakhstanTenge = "KZT", a.KenyaShilling = "KES", a.KyrgyzstanSom = "KGS", a.NorthKoreaWon = "KPW", a.SouthKoreaWon = "KRW", a.KuwaitDinar = "KWD", a.LaosKip = "LAK", a.LebanonPound = "LBP", a.LiberiaDollar = "LRD", a.LesothoLoti = "LSL", a.LibyanDinar = "LYD", a.LithuaniaLitas = "LTL", a.LatviaLats = "LVL", a.LibyaDinar = "LYD", a.MacauPataca = "MOP", a.MaldivesRufiyaa = "MVR", a.MalawiKwacha = "MWK", a.MaltaLira = "MTL", a.MauritiusRupee = "MUR", a.MongoliaTughrik = "MNT", a.MoroccoDirham = "MAD", a.MoldovaLeu = "MDL", a.MozambiqueMetical = "MZN", a.MadagascarAriary = "MGA", a.MacedoniaDenar = "MKD", a.MexicoPeso = "MXN", a.MalaysiaRinggit = "MYR", a.MyanmarKyat = "MMK", a.MicronesiaFederatedStatesDollar = "USD", a.NicaraguaCordoba = "NIO", a.NamibiaDollar = "NAD", a.NetherlandsAntillesGuilder = "ANG", a.NewCaledoniaFranc = "XPF", a.NigeriaNaira = "NGN", a.NicaraguaCordobaOro = "NIO", a.NigerCFAFranc = "XOF", a.NorwayKrone = "NOK", a.NepalRupee = "NPR", a.NewZealandDollar = "NZD", a.OmanRial = "OMR", a.PanamaBalboa = "PAB", a.PeruNuevoSol = "PEN", a.PapuaNewGuineaKina = "PGK", a.PhilippinesPeso = "PHP", a.PakistanRupee = "PKR", a.PeruNuevo = "PEN", a.PolandZloty = "PLN", a.ParaguayGuarani = "PYG", a.QatarRial = "QAR", a.RomaniaNewLeu = "RON", a.SerbiaDinar = "RSD", a.SriLankaRupee = "LKR", a.RussiaRuble = "RUB", a.RwandaFranc = "RWF", a.SaudiArabiaRiyal = "SAR", a.SlovakiaKoruna = "SKK", a.SloveniaTolar = "SIT", a.SolomonIslandsDollar = "SBD", a.SeychellesRupee = "SCR", a.SudanPound = "SDG", a.SwedenKrona = "SEK", a.SingaporeDollar = "SGD", a.SaintHelenaPound = "SHP", a.SierraLeoneLeone = "SLL", a.SomaliaShilling = "SOS", a.SurinameDollar = "SRD", a.SintMaartenPound = "SXD", a.SyriaPound = "SYP", a.SwazilandLilangeni = "SZL", a.SwitzerlandFranc = "CHF", a.ThailandBaht = "THB", a.TajikistanSomoni = "TJS", a.TurkmenistanManat = "TMT", a.TunisiaDinar = "TND", a.TongaPaanga = "TOP", a.TurkeyLira = "TRY", a.TrinidadAndTobagoDollar = "TTD", a.TaiwanNewDollar = "TWD", a.TanzaniaShilling = "TZS", a.UnitedArabEmiratesDirham = "AED", a.UkraineHryvnia = "UAH", a.UgandaShilling = "UGX", a.UnitedKingdomPound = "GBP", a.UnitedStatesDollar = "USD", a.UruguayPeso = "UYU", a.UzbekistanSom = "UZS", a.VenezuelaBolivar = "VEF", a.VietnamDong = "VND", a.VanuatuVatu = "VUV", a.SamoaTala = "WST", a.YemenRial = "YER", a.SouthAfricaRand = "ZAR", a.ZambiaKwacha = "ZMW", a.ZimbabweDollar = "ZWL";
})(l$1 || (l$1 = {}));
({ AfghanistanAfghani: { code: l$1.AfghanistanAfghani, countries: [r.Afghanistan], decimal_digits: 2, decimal_separator: ".", name: "Afghan Afghani", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u060B", symbol_native: "\u060B", symbol_placement: "before", thousands_separator: "," }, AlbaniaLek: { code: l$1.AlbaniaLek, countries: [r.Albania], decimal_digits: 2, decimal_separator: ",", name: "Albanian Lek", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "Lek", symbol_native: "Lek", symbol_placement: "before", thousands_separator: "." }, AlgeriaDinar: { code: l$1.AlgeriaDinar, countries: [r.Algeria], decimal_digits: 2, decimal_separator: ".", name: "Algerian Dinar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u062F.\u062C", symbol_native: "\u062F.\u062C", symbol_placement: "before", thousands_separator: "," }, ArgentinaPeso: { code: l$1.ArgentinaPeso, countries: [r.Argentina], decimal_digits: 2, decimal_separator: ".", name: "Argentine Peso", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "," }, ArmeniaDram: { code: l$1.ArmeniaDram, countries: [r.Armenia], decimal_digits: 2, decimal_separator: ",", name: "Armenian Dram", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u0564\u0580.", symbol_native: "\u0564\u0580.", symbol_placement: "before", thousands_separator: "." }, ArubaFlorin: { code: l$1.ArubaFlorin, countries: [r.Aruba], decimal_digits: 2, decimal_separator: ".", name: "Aruban Florin", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u0192", symbol_native: "\u0192", symbol_placement: "before", thousands_separator: "," }, AustraliaDollar: { code: l$1.AustraliaDollar, countries: [r.Australia], decimal_digits: 2, decimal_separator: ".", name: "Australian Dollar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "," }, AzerbaijanManat: { code: l$1.AzerbaijanNewManat, countries: [r.Azerbaijan], decimal_digits: 2, decimal_separator: ".", name: "Azerbaijani Manat", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u043C\u0430\u043D", symbol_native: "\u043C\u0430\u043D", symbol_placement: "before", thousands_separator: "," }, BahrainDinar: { code: l$1.BahrainDinar, countries: [r.Bahrain], decimal_digits: 3, decimal_separator: ".", name: "Bahraini Dinar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: ".\u062F.\u0628", symbol_native: ".\u062F.\u0628", symbol_placement: "before", thousands_separator: "," }, BangladeshTaka: { code: l$1.BangladeshTaka, countries: [r.Bangladesh], decimal_digits: 2, decimal_separator: ".", name: "Bangladeshi Taka", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u09F3", symbol_native: "\u09F3", symbol_placement: "before", thousands_separator: "," }, BarbadosDollar: { code: l$1.BarbadosDollar, countries: [r.Barbados], decimal_digits: 2, decimal_separator: ".", name: "Barbadian Dollar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "," }, BelarusRuble: { code: l$1.BelarusRuble, countries: [r.Belarus], decimal_digits: 2, decimal_separator: ".", name: "Belarusian Ruble", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "Br", symbol_native: "Br", symbol_placement: "before", thousands_separator: "." }, BelizeDollar: { code: l$1.BelizeDollar, countries: [r.Belize], decimal_digits: 2, decimal_separator: ".", name: "Belize Dollar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "BZ$", symbol_native: "BZ$", symbol_placement: "before", thousands_separator: "," }, BermudaDollar: { code: l$1.BermudaDollar, countries: [r.Bermuda], decimal_digits: 2, decimal_separator: ".", name: "Bermudian Dollar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "," }, BoliviaBoliviano: { code: l$1.BoliviaBoliviano, countries: [r.Bolivia], decimal_digits: 2, decimal_separator: ".", name: "Bolivian Boliviano", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$b", symbol_native: "$b", symbol_placement: "before", thousands_separator: "," }, BosniaAndHerzegovinaConvertibleMarka: { code: l$1.BosniaAndHerzegovinaConvertibleMark, countries: [r.BosniaAndHerzegovina], decimal_digits: 2, decimal_separator: ",", name: "Bosnia and Herzegovina Convertible Marka", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "KM", symbol_native: "KM", symbol_placement: "before", thousands_separator: "." }, BotswanaPula: { code: l$1.BotswanaPula, countries: [r.Botswana], decimal_digits: 2, decimal_separator: ".", name: "Botswana Pula", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "P", symbol_native: "P", symbol_placement: "before", thousands_separator: "," }, BrazilReal: { code: l$1.BrazilReal, countries: [r.Brazil], decimal_digits: 2, decimal_separator: ",", name: "Brazilian Real", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "R$", symbol_native: "R$", symbol_placement: "before", thousands_separator: "." }, BruneiDollar: { code: l$1.BruneiDollar, countries: [r.Brunei], decimal_digits: 2, decimal_separator: ".", name: "Brunei Dollar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "," }, BulgariaLev: { code: l$1.BulgariaLev, countries: [r.Bulgaria], decimal_digits: 2, decimal_separator: ".", name: "Bulgarian Lev", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u043B\u0432", symbol_native: "\u043B\u0432", symbol_placement: "before", thousands_separator: "." }, BurundiFranc: { code: l$1.BurundiFranc, countries: [r.Burundi], decimal_digits: 0, decimal_separator: ".", name: "Burundian Franc", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "FBu", symbol_native: "FBu", symbol_placement: "before", thousands_separator: "," }, CambodiaRiel: { code: l$1.CambodiaRiel, countries: [r.Cambodia], decimal_digits: 2, decimal_separator: ",", name: "Cambodian Riel", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u17DB", symbol_native: "\u17DB", symbol_placement: "before", thousands_separator: "." }, CanadaDollar: { code: l$1.CanadaDollar, countries: [r.Canada], decimal_digits: 2, decimal_separator: ".", name: "Canadian Dollar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "," }, CapeVerdeEscudo: { code: l$1.CapeVerdeEscudo, countries: [r.CapeVerde], decimal_digits: 2, decimal_separator: ".", name: "Cape Verde Escudo", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "Esc", symbol_native: "Esc", symbol_placement: "before", thousands_separator: "," }, CaymanIslandsDollar: { code: l$1.CaymanIslandsDollar, countries: [r.CaymanIslands], decimal_digits: 2, decimal_separator: ".", name: "Cayman Islands Dollar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "," }, ChilePeso: { code: l$1.ChilePeso, countries: [r.Chile], decimal_digits: 0, decimal_separator: ".", name: "Chilean Peso", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "," }, ChinaYuanRenminbi: { code: l$1.ChinaYuan, countries: [r.China], decimal_digits: 2, decimal_separator: ".", name: "Chinese Yuan", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\xA5", symbol_native: "\xA5", symbol_placement: "before", thousands_separator: "," }, ColombiaPeso: { code: l$1.ColombiaPeso, countries: [r.Colombia], decimal_digits: 2, decimal_separator: ".", name: "Colombian Peso", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "," }, ComorosFranc: { code: l$1.ComorosFranc, countries: [r.Comoros], decimal_digits: 0, decimal_separator: ".", name: "Comoros Franc", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "CF", symbol_native: "CF", symbol_placement: "before", thousands_separator: "," }, CostaRicaColon: { code: l$1.CostaRicaColon, countries: [r.CostaRica], decimal_digits: 2, decimal_separator: ".", name: "Costa Rican Colon", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20A1", symbol_native: "\u20A1", symbol_placement: "before", thousands_separator: "," }, CroatiaKuna: { code: l$1.CroatiaKuna, countries: [r.Croatia], decimal_digits: 2, decimal_separator: ",", name: "Croatian Kuna", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "kn", symbol_native: "kn", symbol_placement: "before", thousands_separator: "." }, CubaConvertiblePeso: { code: l$1.CubaConvertiblePeso, countries: [r.Cuba], decimal_digits: 2, decimal_separator: ",", name: "Cuba Convertible Peso", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "." }, CubaPeso: { code: l$1.CubaPeso, countries: [r.Cuba], decimal_digits: 2, decimal_separator: ",", name: "Cuba Peso", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "." }, CyprusPound: { code: l$1.CyprusPound, countries: [r.Cyprus], decimal_digits: 2, decimal_separator: ",", name: "Cyprus Pound", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\xA3", symbol_native: "\xA3", symbol_placement: "before", thousands_separator: "." }, CzechRepublicKoruna: { code: l$1.CzechRepublicKoruna, countries: [r.CzechRepublic], decimal_digits: 2, decimal_separator: ",", name: "Czech Republic Koruna", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "K\u010D", symbol_native: "K\u010D", symbol_placement: "before", thousands_separator: "." }, DenmarkKrone: { code: l$1.DenmarkKrone, countries: [r.Denmark], decimal_digits: 2, decimal_separator: ",", name: "Denmark Krone", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "kr", symbol_native: "kr", symbol_placement: "before", thousands_separator: "." }, DjiboutiFranc: { code: l$1.DjiboutiFranc, countries: [r.Djibouti], decimal_digits: 0, decimal_separator: ".", name: "Djibouti Franc", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "Fdj", symbol_native: "Fdj", symbol_placement: "before", thousands_separator: "," }, DominicanRepublicPeso: { code: l$1.DominicanRepublicPeso, countries: [r.DominicanRepublic], decimal_digits: 2, decimal_separator: ",", name: "Dominican Republic Peso", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "RD$", symbol_native: "RD$", symbol_placement: "before", thousands_separator: "." }, EastCaribbeanDollar: { code: l$1.EastCaribbeanDollar, countries: [r.AntiguaAndBarbuda, r.Dominica, r.Grenada, r.SaintKittsAndNevis, r.SaintLucia, r.SaintVincentAndTheGrenadines], decimal_digits: 2, decimal_separator: ".", name: "East Caribbean Dollar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "," }, EgyptPound: { code: l$1.EgyptPound, countries: [r.Egypt], decimal_digits: 2, decimal_separator: ".", name: "Egypt Pound", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\xA3", symbol_native: "\xA3", symbol_placement: "before", thousands_separator: "," }, ElSalvadorColon: { code: l$1.ElSalvadorColon, countries: [r.ElSalvador], decimal_digits: 2, decimal_separator: ",", name: "El Salvador Colon", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20A1", symbol_native: "\u20A1", symbol_placement: "before", thousands_separator: "." }, EquatorialGuineaEkwele: { code: l$1.EquatorialGuineaEkwele, countries: [r.EquatorialGuinea], decimal_digits: 0, decimal_separator: ".", name: "Equatorial Guinea Ekwele", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "GQE", symbol_native: "GQE", symbol_placement: "before", thousands_separator: "," }, EritreaNakfa: { code: l$1.EritreaNakfa, countries: [r.Eritrea], decimal_digits: 2, decimal_separator: ",", name: "Eritrea Nakfa", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "Nfk", symbol_native: "Nfk", symbol_placement: "before", thousands_separator: "." }, EstoniaKroon: { code: l$1.EstoniaKroon, countries: [r.Estonia], decimal_digits: 2, decimal_separator: ",", name: "Estonia Kroon", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "kr", symbol_native: "kr", symbol_placement: "before", thousands_separator: "." }, EthiopiaBirr: { code: l$1.EthiopiaBirr, countries: [r.Ethiopia], decimal_digits: 2, decimal_separator: ",", name: "Ethiopia Birr", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "Br", symbol_native: "Br", symbol_placement: "before", thousands_separator: "." }, Euro: { code: l$1.Euro, countries: [r.Andorra, r.Austria, r.Belgium, r.Cyprus, r.Estonia, r.Finland, r.France, r.Germany, r.Greece, r.Ireland, r.Italy, r.Latvia, r.Lithuania, r.Luxembourg, r.Malta, r.Monaco, r.Netherlands, r.Portugal, r.Spain, r.Sweden, r.UnitedKingdom], decimal_digits: 2, decimal_separator: ",", name: "Euro", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20AC", symbol_native: "\u20AC", symbol_placement: "before", thousands_separator: "." }, FalklandIslandsPound: { code: l$1.FalklandIslandsPound, countries: [r.FalklandIslands], decimal_digits: 2, decimal_separator: ",", name: "Equatorial Guinea Ekwele", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\xA3", symbol_native: "\xA3", symbol_placement: "before", thousands_separator: "." }, FijiDollar: { code: l$1.FijiDollar, countries: [r.Fiji], decimal_digits: 2, decimal_separator: ",", name: "Fiji Dollar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "." }, GambiaDalasi: { code: l$1.GambiaDalasi, countries: [r.Gambia], decimal_digits: 2, decimal_separator: ",", name: "Gambia Dalasi", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "D", symbol_native: "D", symbol_placement: "before", thousands_separator: "." }, GeorgiaLari: { code: l$1.GeorgiaLari, countries: [r.Georgia], decimal_digits: 2, decimal_separator: ",", name: "Georgia Lari", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20BE", symbol_native: "\u20BE", symbol_placement: "before", thousands_separator: "." }, GhanaCedi: { code: l$1.GhanaCedi, countries: [r.Ghana], decimal_digits: 2, decimal_separator: ",", name: "Ghana Cedi", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20B5", symbol_native: "\u20B5", symbol_placement: "before", thousands_separator: "." }, GibraltarPound: { code: l$1.GibraltarPound, countries: [r.Gibraltar], decimal_digits: 2, decimal_separator: ",", name: "Gibraltar Pound", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\xA3", symbol_native: "\xA3", symbol_placement: "before", thousands_separator: "." }, GuatemalaQuetzal: { code: l$1.GuatemalaQuetzal, countries: [r.Guatemala], decimal_digits: 2, decimal_separator: ",", name: "Guatemala Quetzal", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "Q", symbol_native: "Q", symbol_placement: "before", thousands_separator: "." }, GuernseyPound: { code: l$1.GuernseyPound, countries: [r.Guernsey], decimal_digits: 2, decimal_separator: ",", name: "Guernsey Pound", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\xA3", symbol_native: "\xA3", symbol_placement: "before", thousands_separator: "." }, GuineaBissauPeso: { code: l$1.GuineaBissauPeso, countries: [r.GuineaBissau], decimal_digits: 2, decimal_separator: ",", name: "Guinea-Bissau Peso", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20B5", symbol_native: "\u20B5", symbol_placement: "before", thousands_separator: "." }, GuyanaDollar: { code: l$1.GuyanaDollar, countries: [r.Guyana], decimal_digits: 2, decimal_separator: ",", name: "Guyana Dollar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "." }, HaitiGourde: { code: l$1.HaitiGourde, countries: [r.Haiti], decimal_digits: 2, decimal_separator: ",", name: "Haiti Gourde", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "G", symbol_native: "G", symbol_placement: "before", thousands_separator: "." }, HondurasLempira: { code: l$1.HondurasLempira, countries: [r.Honduras], decimal_digits: 2, decimal_separator: ",", name: "Honduras Lempira", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "L", symbol_native: "L", symbol_placement: "before", thousands_separator: "." }, HongKongDollar: { code: l$1.HongKongDollar, countries: [r.HongKong], decimal_digits: 2, decimal_separator: ",", name: "Hong Kong Dollar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "." }, HungaryForint: { code: l$1.HungaryForint, countries: [r.Hungary], decimal_digits: 2, decimal_separator: ",", name: "Hungary Forint", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "Ft", symbol_native: "Ft", symbol_placement: "before", thousands_separator: "." }, IcelandKrona: { code: l$1.IcelandKrona, countries: [r.Iceland], decimal_digits: 0, decimal_separator: ",", name: "Iceland Krona", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "kr", symbol_native: "kr", symbol_placement: "before", thousands_separator: "." }, IndianRupee: { code: l$1.IndiaRupee, countries: [r.India, r.Bhutan], decimal_digits: 2, decimal_separator: ",", name: "Indian Rupee", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20B9", symbol_native: "\u20B9", symbol_placement: "before", thousands_separator: "." }, IndonesiaRupiah: { code: l$1.IndonesiaRupiah, countries: [r.Indonesia], decimal_digits: 0, decimal_separator: ",", name: "Indonesia Rupiah", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "Rp", symbol_native: "Rp", symbol_placement: "before", thousands_separator: "." }, IranRial: { code: l$1.IranRial, countries: [r.Iran], decimal_digits: 0, decimal_separator: ",", name: "Iran Rial", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\uFDFC", symbol_native: "\uFDFC", symbol_placement: "before", thousands_separator: "." }, IsleOfManPound: { code: l$1.IsleOfManPound, countries: [r.IsleOfMan], decimal_digits: 2, decimal_separator: ",", name: "Isle of Man Pound", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\uFDFC", symbol_native: "\uFDFC", symbol_placement: "before", thousands_separator: "." }, IsraeliShekel: { code: l$1.IsraelNewShekel, countries: [r.Israel], decimal_digits: 2, decimal_separator: ",", name: "Israeli Shekel", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20AA", symbol_native: "\u20AA", symbol_placement: "before", thousands_separator: "." }, JamaicaDollar: { code: l$1.JamaicaDollar, countries: [r.Jamaica], decimal_digits: 2, decimal_separator: ",", name: "Jamaica Dollar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "J$", symbol_native: "J$", symbol_placement: "before", thousands_separator: "." }, JapanYen: { code: l$1.JapanYen, countries: [r.Japan], decimal_digits: 0, decimal_separator: ",", name: "Japan Yen", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\xA5", symbol_native: "\uFFE5", symbol_placement: "before", thousands_separator: "." }, JerseyPound: { code: l$1.JerseyPound, countries: [r.Jersey], decimal_digits: 2, decimal_separator: ",", name: "Jersey Pound", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\xA3", symbol_native: "\xA3", symbol_placement: "before", thousands_separator: "." }, JordanDinar: { code: l$1.JordanDinar, countries: [r.Jordan], decimal_digits: 3, decimal_separator: ",", name: "Jordan Dinar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "JD", symbol_native: "JD", symbol_placement: "before", thousands_separator: "." }, KazakhstanTenge: { code: l$1.KazakhstanTenge, countries: [r.Kazakhstan], decimal_digits: 2, decimal_separator: ",", name: "Kazakhstan Tenge", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20B8", symbol_native: "\u20B8", symbol_placement: "before", thousands_separator: "." }, KenyaShilling: { code: l$1.KenyaShilling, countries: [r.Kenya], decimal_digits: 2, decimal_separator: ",", name: "Kenya Shilling", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "KSh", symbol_native: "KSh", symbol_placement: "before", thousands_separator: "." }, KuwaitDinar: { code: l$1.KuwaitDinar, countries: [r.Kuwait], decimal_digits: 3, decimal_separator: ",", name: "Kuwait Dinar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "KD", symbol_native: "KD", symbol_placement: "before", thousands_separator: "." }, KyrgyzstanSom: { code: l$1.KyrgyzstanSom, countries: [r.Kyrgyzstan], decimal_digits: 2, decimal_separator: ",", name: "Kyrgyzstan Som", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "KGS", symbol_native: "KGS", symbol_placement: "before", thousands_separator: "." }, LaosKip: { code: l$1.LaosKip, countries: [r.Laos], decimal_digits: 0, decimal_separator: ",", name: "Laos Kip", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20AD", symbol_native: "\u20AD", symbol_placement: "before", thousands_separator: "." }, LatviaLats: { code: l$1.LatviaLats, countries: [r.Latvia], decimal_digits: 2, decimal_separator: ",", name: "Latvia Lat", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "Ls", symbol_native: "Ls", symbol_placement: "before", thousands_separator: "." }, LebanonPound: { code: l$1.LebanonPound, countries: [r.Lebanon], decimal_digits: 0, decimal_separator: ",", name: "Lebanon Pound", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\xA3", symbol_native: "\xA3", symbol_placement: "before", thousands_separator: "." }, LesothoLoti: { code: l$1.LesothoLoti, countries: [r.Lesotho], decimal_digits: 2, decimal_separator: ",", name: "Lesotho Loti", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "M", symbol_native: "M", symbol_placement: "before", thousands_separator: "." }, LiberiaDollar: { code: l$1.LiberiaDollar, countries: [r.Liberia], decimal_digits: 2, decimal_separator: ",", name: "Liberia Dollar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "." }, LibyanDinar: { code: l$1.LibyanDinar, countries: [r.Libya], decimal_digits: 3, decimal_separator: ",", name: "Libyan Dinar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "LD", symbol_native: "LD", symbol_placement: "before", thousands_separator: "." }, LithuaniaLitas: { code: l$1.LithuaniaLitas, countries: [r.Lithuania], decimal_digits: 2, decimal_separator: ",", name: "Lithuania Litas", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "Lt", symbol_native: "Lt", symbol_placement: "before", thousands_separator: "." }, MacauPataca: { code: l$1.MacauPataca, countries: [r.Macau], decimal_digits: 2, decimal_separator: ",", name: "Macau Pataca", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "MOP$", symbol_native: "MOP$", symbol_placement: "before", thousands_separator: "." }, MacedoniaDenar: { code: l$1.MacedoniaDenar, countries: [r.NorthMacedonia], decimal_digits: 2, decimal_separator: ",", name: "Macedonia Denar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u0434\u0435\u043D", symbol_native: "\u0434\u0435\u043D", symbol_placement: "before", thousands_separator: "." }, MadagascarAriary: { code: l$1.MadagascarAriary, countries: [r.Madagascar], decimal_digits: 0, decimal_separator: ",", name: "Madagascar Ariary", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "Ar", symbol_native: "Ar", symbol_placement: "before", thousands_separator: "." }, MalawiKwacha: { code: l$1.MalawiKwacha, countries: [r.Malawi], decimal_digits: 2, decimal_separator: ",", name: "Malawi Kwacha", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "MK", symbol_native: "MK", symbol_placement: "before", thousands_separator: "." }, MalaysiaRinggit: { code: l$1.MalaysiaRinggit, countries: [r.Malaysia], decimal_digits: 2, decimal_separator: ",", name: "Malaysia Ringgit", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "RM", symbol_native: "RM", symbol_placement: "before", thousands_separator: "." }, MaldivesRufiyaa: { code: l$1.MaldivesRufiyaa, countries: [r.Maldives], decimal_digits: 2, decimal_separator: ",", name: "Maldives Rufiyaa", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "Rf", symbol_native: "Rf", symbol_placement: "before", thousands_separator: "." }, MaltaLira: { code: l$1.MaltaLira, countries: [r.Malta], decimal_digits: 2, decimal_separator: ",", name: "Malta Lira", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "Lm", symbol_native: "Lm", symbol_placement: "before", thousands_separator: "." }, MauritiusRupee: { code: l$1.MauritiusRupee, countries: [r.Mauritius], decimal_digits: 2, decimal_separator: ",", name: "Mauritius Rupee", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20A8", symbol_native: "\u20A8", symbol_placement: "before", thousands_separator: "." }, MexicoPeso: { code: l$1.MexicoPeso, countries: [r.Mexico], decimal_digits: 2, decimal_separator: ",", name: "Mexico Peso", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "." }, MoldovaLeu: { code: l$1.MoldovaLeu, countries: [r.Moldova], decimal_digits: 2, decimal_separator: ",", name: "Moldova Leu", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "L", symbol_native: "L", symbol_placement: "before", thousands_separator: "." }, MongoliaTughrik: { code: l$1.MongoliaTughrik, countries: [r.Mongolia], decimal_digits: 2, decimal_separator: ",", name: "Mongolia Tughrik", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20AE", symbol_native: "\u20AE", symbol_placement: "before", thousands_separator: "." }, MoroccoDirham: { code: l$1.MoroccoDirham, countries: [r.Morocco], decimal_digits: 2, decimal_separator: ",", name: "Morocco Dirham", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "DH", symbol_native: "DH", symbol_placement: "before", thousands_separator: "." }, MozambiqueMetical: { code: l$1.MozambiqueMetical, countries: [r.Mozambique], decimal_digits: 2, decimal_separator: ",", name: "Mozambique Metical", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "MT", symbol_native: "MT", symbol_placement: "before", thousands_separator: "." }, MyanmarKyat: { code: l$1.MyanmarKyat, countries: [r.Myanmar], decimal_digits: 0, decimal_separator: ",", name: "Myanmar Kyat", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "K", symbol_native: "K", symbol_placement: "before", thousands_separator: "." }, NamibiaDollar: { code: l$1.NamibiaDollar, countries: [r.Namibia], decimal_digits: 2, decimal_separator: ",", name: "Namibia Dollar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "." }, NepalRupee: { code: l$1.NepalRupee, countries: [r.Nepal], decimal_digits: 2, decimal_separator: ",", name: "Nepal Rupee", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20A8", symbol_native: "\u20A8", symbol_placement: "before", thousands_separator: "." }, NetherlandsAntillesGuilder: { code: l$1.NetherlandsAntillesGuilder, countries: [r.NetherlandsAntilles], decimal_digits: 2, decimal_separator: ",", name: "Netherlands Antilles Guilder", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u0192", symbol_native: "\u0192", symbol_placement: "before", thousands_separator: "." }, NewCaledoniaFranc: { code: l$1.NewCaledoniaFranc, countries: [r.NewCaledonia], decimal_digits: 0, decimal_separator: ",", name: "New Caledonia Franc", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20A3", symbol_native: "\u20A3", symbol_placement: "before", thousands_separator: "." }, NewZealandDollar: { code: l$1.NewZealandDollar, countries: [r.NewZealand], decimal_digits: 2, decimal_separator: ",", name: "New Zealand Dollar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "." }, NicaraguaCordoba: { code: l$1.NicaraguaCordoba, countries: [r.Nicaragua], decimal_digits: 2, decimal_separator: ",", name: "Nicaragua Cordoba", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "C$", symbol_native: "C$", symbol_placement: "before", thousands_separator: "." }, NigerCFAFranc: { code: l$1.NigerCFAFranc, countries: [r.Niger], decimal_digits: 0, decimal_separator: ",", name: "Niger CFA Franc", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "CFA", symbol_native: "CFA", symbol_placement: "before", thousands_separator: "." }, NigeriaNaira: { code: l$1.NigeriaNaira, countries: [r.Nigeria], decimal_digits: 2, decimal_separator: ",", name: "Nigeria Naira", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20A6", symbol_native: "\u20A6", symbol_placement: "before", thousands_separator: "." }, NorthKoreaWon: { code: l$1.NorthKoreaWon, countries: [r.NorthKorea], decimal_digits: 0, decimal_separator: ",", name: "North Korea Won", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20A9", symbol_native: "\u20A9", symbol_placement: "before", thousands_separator: "." }, NorwayKrone: { code: l$1.NorwayKrone, countries: [r.Norway], decimal_digits: 2, decimal_separator: ",", name: "Norway Krone", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "kr", symbol_native: "kr", symbol_placement: "before", thousands_separator: "." }, OmanRial: { code: l$1.OmanRial, countries: [r.Oman], decimal_digits: 3, decimal_separator: ",", name: "Oman Rial", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\uFDFC", symbol_native: "\uFDFC", symbol_placement: "before", thousands_separator: "." }, PakistanRupee: { code: l$1.PakistanRupee, countries: [r.Pakistan], decimal_digits: 2, decimal_separator: ",", name: "Pakistan Rupee", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20A8", symbol_native: "\u20A8", symbol_placement: "before", thousands_separator: "." }, PanamaBalboa: { code: l$1.PanamaBalboa, countries: [r.Panama], decimal_digits: 2, decimal_separator: ",", name: "Panama Balboa", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "B/.", symbol_native: "B/.", symbol_placement: "before", thousands_separator: "." }, ParaguayGuarani: { code: l$1.ParaguayGuarani, countries: [r.Paraguay], decimal_digits: 0, decimal_separator: ",", name: "Paraguay Guarani", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "Gs", symbol_native: "Gs", symbol_placement: "before", thousands_separator: "." }, PeruvianNuevo: { code: l$1.PeruNuevo, countries: [r.Peru], decimal_digits: 2, decimal_separator: ",", name: "Peruvian Nuevo", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "S/.", symbol_native: "S/.", symbol_placement: "before", thousands_separator: "." }, PhilippinesPeso: { code: l$1.PhilippinesPeso, countries: [r.Philippines], decimal_digits: 2, decimal_separator: ",", name: "Philippines Peso", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20B1", symbol_native: "\u20B1", symbol_placement: "before", thousands_separator: "." }, PolandZloty: { code: l$1.PolandZloty, countries: [r.Poland], decimal_digits: 2, decimal_separator: ",", name: "Poland Zloty", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "z\u0142", symbol_native: "z\u0142", symbol_placement: "before", thousands_separator: "." }, QatarRial: { code: l$1.QatarRial, countries: [r.Qatar], decimal_digits: 2, decimal_separator: ",", name: "Qatar Rial", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\uFDFC", symbol_native: "\uFDFC", symbol_placement: "before", thousands_separator: "." }, RomaniaNewLeu: { code: l$1.RomaniaNewLeu, countries: [r.Romania], decimal_digits: 2, decimal_separator: ",", name: "Romania New Leu", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "lei", symbol_native: "lei", symbol_placement: "before", thousands_separator: "." }, RussiaRuble: { code: l$1.RussiaRuble, countries: [r.RussianFederation], decimal_digits: 2, decimal_separator: ",", name: "Russia Ruble", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20BD", symbol_native: "\u20BD", symbol_placement: "before", thousands_separator: "." }, RwandaFranc: { code: l$1.RwandaFranc, countries: [r.Rwanda], decimal_digits: 0, decimal_separator: ",", name: "Rwanda Franc", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "RF", symbol_native: "RF", symbol_placement: "before", thousands_separator: "." }, SaudiArabiaRiyal: { code: l$1.SaudiArabiaRiyal, countries: [r.SaudiArabia], decimal_digits: 2, decimal_separator: ",", name: "Saudi Arabia Riyal", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\uFDFC", symbol_native: "\uFDFC", symbol_placement: "before", thousands_separator: "." }, SerbiaDinar: { code: l$1.SerbiaDinar, countries: [r.Serbia], decimal_digits: 0, decimal_separator: ",", name: "Serbia Dinar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u0414\u0438\u043D.", symbol_native: "\u0414\u0438\u043D.", symbol_placement: "before", thousands_separator: "." }, SeychellesRupee: { code: l$1.SeychellesRupee, countries: [r.Seychelles], decimal_digits: 2, decimal_separator: ",", name: "Seychelles Rupee", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20A8", symbol_native: "\u20A8", symbol_placement: "before", thousands_separator: "." }, SingaporeDollar: { code: l$1.SingaporeDollar, countries: [r.Singapore], decimal_digits: 2, decimal_separator: ",", name: "Singapore Dollar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "." }, SlovakiaKoruna: { code: l$1.SlovakiaKoruna, countries: [r.Slovakia], decimal_digits: 2, decimal_separator: ",", name: "Slovakia Koruna", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "Sk", symbol_native: "Sk", symbol_placement: "before", thousands_separator: "." }, SloveniaTolar: { code: l$1.SloveniaTolar, countries: [r.Slovenia], decimal_digits: 2, decimal_separator: ",", name: "Slovenia Tolar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "SIT", symbol_native: "SIT", symbol_placement: "before", thousands_separator: "." }, SolomonIslandsDollar: { code: l$1.SolomonIslandsDollar, countries: [r.SolomonIslands], decimal_digits: 2, decimal_separator: ",", name: "Solomon Islands Dollar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "." }, SomaliaShilling: { code: l$1.SomaliaShilling, countries: [r.Somalia], decimal_digits: 0, decimal_separator: ",", name: "Somalia Shilling", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "S", symbol_native: "S", symbol_placement: "before", thousands_separator: "." }, SouthAfricaRand: { code: l$1.SouthAfricaRand, countries: [r.SouthAfrica], decimal_digits: 2, decimal_separator: ",", name: "South Africa Rand", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "R", symbol_native: "R", symbol_placement: "before", thousands_separator: "." }, SouthKoreaWon: { code: l$1.SouthKoreaWon, countries: [r.SouthKorea], decimal_digits: 0, decimal_separator: ",", name: "South Korea Won", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20A9", symbol_native: "\u20A9", symbol_placement: "before", thousands_separator: "." }, SriLankaRupee: { code: l$1.SriLankaRupee, countries: [r.SriLanka], decimal_digits: 2, decimal_separator: ",", name: "Sri Lanka Rupee", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20A8", symbol_native: "\u20A8", symbol_placement: "before", thousands_separator: "." }, SudanPound: { code: l$1.SudanPound, countries: [r.Sudan], decimal_digits: 2, decimal_separator: ",", name: "Sudan Pound", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\xA3", symbol_native: "\xA3", symbol_placement: "before", thousands_separator: "." }, SurinameDollar: { code: l$1.SurinameDollar, countries: [r.Suriname], decimal_digits: 2, decimal_separator: ",", name: "Suriname Dollar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "." }, SwazilandLilangeni: { code: l$1.SwazilandLilangeni, countries: [r.Swaziland], decimal_digits: 2, decimal_separator: ",", name: "Swaziland Lilangeni", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "E", symbol_native: "E", symbol_placement: "before", thousands_separator: "." }, SwedenKrona: { code: l$1.SwedenKrona, countries: [r.Sweden], decimal_digits: 2, decimal_separator: ",", name: "Sweden Krona", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "kr", symbol_native: "kr", symbol_placement: "before", thousands_separator: "." }, SwitzerlandFranc: { code: l$1.SwitzerlandFranc, countries: [r.Switzerland], decimal_digits: 2, decimal_separator: ",", name: "Switzerland Franc", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "CHF", symbol_native: "CHF", symbol_placement: "before", thousands_separator: "." }, SyriaPound: { code: l$1.SyriaPound, countries: [r.Syria], decimal_digits: 2, decimal_separator: ",", name: "Syria Pound", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\xA3", symbol_native: "\xA3", symbol_placement: "before", thousands_separator: "." }, TaiwanNewDollar: { code: l$1.TaiwanNewDollar, countries: [r.Taiwan], decimal_digits: 2, decimal_separator: ",", name: "Taiwan New Dollar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "NT$", symbol_native: "NT$", symbol_placement: "before", thousands_separator: "." }, TajikistanSomoni: { code: l$1.TajikistanSomoni, countries: [r.Tajikistan], decimal_digits: 2, decimal_separator: ",", name: "Tajikistan Somoni", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "TJS", symbol_native: "TJS", symbol_placement: "before", thousands_separator: "." }, TanzaniaShilling: { code: l$1.TanzaniaShilling, countries: [r.Tanzania], decimal_digits: 2, decimal_separator: ",", name: "Tanzania Shilling", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "TSh", symbol_native: "TSh", symbol_placement: "before", thousands_separator: "." }, ThailandBaht: { code: l$1.ThailandBaht, countries: [r.Thailand], decimal_digits: 2, decimal_separator: ",", name: "Thailand Baht", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u0E3F", symbol_native: "\u0E3F", symbol_placement: "before", thousands_separator: "." }, TunisiaDinar: { code: l$1.TunisiaDinar, countries: [r.Tunisia], decimal_digits: 3, decimal_separator: ",", name: "Tunisia Dinar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u062F.\u062A", symbol_native: "\u062F.\u062A", symbol_placement: "before", thousands_separator: "." }, TurkeyLira: { code: l$1.TurkeyLira, countries: [r.Turkey], decimal_digits: 2, decimal_separator: ",", name: "Turkey Lira", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20BA", symbol_native: "\u20BA", symbol_placement: "before", thousands_separator: "." }, TurkmenistanManat: { code: l$1.TurkmenistanManat, countries: [r.Turkmenistan], decimal_digits: 2, decimal_separator: ",", name: "Turkmenistan Manat", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "m", symbol_native: "m", symbol_placement: "before", thousands_separator: "." }, UgandaShilling: { code: l$1.UgandaShilling, countries: [r.Uganda], decimal_digits: 0, decimal_separator: ",", name: "Uganda Shilling", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "USh", symbol_native: "USh", symbol_placement: "before", thousands_separator: "." }, UkraineHryvnia: { code: l$1.UkraineHryvnia, countries: [r.Ukraine], decimal_digits: 2, decimal_separator: ",", name: "Ukraine Hryvnia", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20B4", symbol_native: "\u20B4", symbol_placement: "before", thousands_separator: "." }, UnitedArabEmiratesDirham: { code: l$1.UnitedArabEmiratesDirham, countries: [r.UnitedArabEmirates], decimal_digits: 2, decimal_separator: ",", name: "United Arab Emirates Dirham", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u062F.\u0625", symbol_native: "\u062F.\u0625", symbol_placement: "before", thousands_separator: "." }, UnitedKingdomPound: { code: l$1.UnitedKingdomPound, countries: [r.UnitedKingdom], decimal_digits: 2, decimal_separator: ",", name: "United Kingdom Pound", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\xA3", symbol_native: "\xA3", symbol_placement: "before", thousands_separator: "." }, UnitedStatesDollar: { code: l$1.UnitedStatesDollar, countries: [r.UnitedStates], decimal_digits: 2, decimal_separator: ",", name: "United States Dollar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$", symbol_native: "$", symbol_placement: "before", thousands_separator: "." }, UruguayPeso: { code: l$1.UruguayPeso, countries: [r.Uruguay], decimal_digits: 2, decimal_separator: ",", name: "Uruguay Peso", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "$U", symbol_native: "$U", symbol_placement: "before", thousands_separator: "." }, UzbekistanSom: { code: l$1.UzbekistanSom, countries: [r.Uzbekistan], decimal_digits: 2, decimal_separator: ",", name: "Uzbekistan Som", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "UZS", symbol_native: "UZS", symbol_placement: "before", thousands_separator: "." }, VanuatuVatu: { code: l$1.VanuatuVatu, countries: [r.Vanuatu], decimal_digits: 0, decimal_separator: ",", name: "Vanuatu Vatu", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "VT", symbol_native: "VT", symbol_placement: "before", thousands_separator: "." }, VenezuelaBolivar: { code: l$1.VenezuelaBolivar, countries: [r.Venezuela], decimal_digits: 2, decimal_separator: ",", name: "Venezuela Bolivar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "Bs. F", symbol_native: "Bs. F", symbol_placement: "before", thousands_separator: "." }, VietnamDong: { code: l$1.VietnamDong, countries: [r.Vietnam], decimal_digits: 0, decimal_separator: ",", name: "Vietnam Dong", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20AB", symbol_native: "\u20AB", symbol_placement: "before", thousands_separator: "." }, YemenRial: { code: l$1.YemenRial, countries: [r.Yemen], decimal_digits: 2, decimal_separator: ",", name: "Yemen Rial", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\uFDFC", symbol_native: "\uFDFC", symbol_placement: "before", thousands_separator: "." }, ZambiaKwacha: { code: l$1.ZambiaKwacha, countries: [r.Zambia], decimal_digits: 2, decimal_separator: ",", name: "Zambia Kwacha", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "ZK", symbol_native: "ZK", symbol_placement: "before", thousands_separator: "." }, ZimbabweDollar: { code: l$1.ZimbabweDollar, countries: [r.Zimbabwe], decimal_digits: 2, decimal_separator: ",", name: "Zimbabwe Dollar", negative_sign: "-", positive_sign: "", rounding: 0, symbol: "\u20AB", symbol_native: "\u20AB", symbol_placement: "before", thousands_separator: "." } });
var Ki;
(function(a) {
  a.Bitcoin = "BTC", a.Ethereum = "ETH", a.Litecoin = "LTC", a.Ripple = "XRP", a.Dash = "DASH", a.Zcash = "ZEC", a.Dogecoin = "DOGE", a.Monero = "XMR", a.BitcoinCash = "BCH", a.EOS = "EOS", a.Binance = "BNB", a.Stellar = "XLM", a.Cardano = "ADA", a.IOTA = "IOTA", a.Tezos = "XTZ", a.NEO = "NEO", a.TRON = "TRX", a.EOSClassic = "EOSC", a.Ontology = "ONT", a.VeChain = "VEN", a.QTUM = "QTUM", a.Lisk = "LSK", a.Waves = "WAVES", a.OmiseGO = "OMG", a.Zilliqa = "ZIL", a.BitcoinGold = "BTG", a.Decred = "DCR", a.Stratis = "STRAT", a.Populous = "PPT", a.Augur = "REP", a.Golem = "GNT", a.Siacoin = "SC", a.BasicAttentionToken = "BAT", a.ZCoin = "XZC", a.StratisHedged = "SNT", a.VeChainHedged = "VEN", a.PowerLedger = "POWR", a.WavesHedged = "WAVE", a.ZilliqaHedged = "ZRX", a.BitcoinDiamond = "BCD", a.DigiByte = "DGB", a.DigiByteHedged = "DGB", a.Bytecoin = "BCN", a.BytecoinHedged = "BCN";
})(Ki || (Ki = {}));
var o;
(function(a) {
  a.Afrikaans = "af", a.Albanian = "sq", a.Amharic = "am", a.Arabic = "ar", a.Armenian = "hy", a.Azerbaijani = "az", a.Bashkir = "ba", a.Basque = "eu", a.Belarusian = "be", a.Bengali = "bn", a.Berber = "ber", a.Bhutani = "dz", a.Bihari = "bh", a.Bislama = "bi", a.Bosnian = "bs", a.Breten = "br", a.Bulgarian = "bg", a.Burmese = "my", a.Cantonese = "yue", a.Catalan = "ca", a.Chinese = "zh", a.Chuvash = "cv", a.Corsican = "co", a.Croatian = "hr", a.Czech = "cs", a.Danish = "da", a.Dari = "prs", a.Divehi = "dv", a.Dutch = "nl", a.English = "en", a.Esperanto = "eo", a.Estonian = "et", a.Faroese = "fo", a.Farsi = "fa", a.Filipino = "fil", a.Finnish = "fi", a.French = "fr", a.Frisian = "fy", a.Galician = "gl", a.Georgian = "ka", a.German = "de", a.Greek = "el", a.Greenlandic = "kl", a.Gujarati = "gu", a.Haitian = "ht", a.Hausa = "ha", a.Hebrew = "he", a.Hindi = "hi", a.Hungarian = "hu", a.Icelandic = "is", a.Igbo = "ig", a.Indonesian = "id", a.Irish = "ga", a.Italian = "it", a.Japanese = "ja", a.Javanese = "jv", a.Kannada = "kn", a.Karelian = "krl", a.Kazakh = "kk", a.Khmer = "km", a.Komi = "kv", a.Konkani = "kok", a.Korean = "ko", a.Kurdish = "ku", a.Kyrgyz = "ky", a.Lao = "lo", a.Latin = "la", a.Latvian = "lv", a.Lithuanian = "lt", a.Luxembourgish = "lb", a.Ossetian = "os", a.Macedonian = "mk", a.Malagasy = "mg", a.Malay = "ms", a.Malayalam = "ml", a.Maltese = "mt", a.Maori = "mi", a.Marathi = "mr", a.Mari = "mhr", a.Mongolian = "mn", a.Montenegrin = "me", a.Nepali = "ne", a.NorthernSotho = "nso", a.Norwegian = "no", a.NorwegianBokmal = "nb", a.NorwegianNynorsk = "nn", a.Oriya = "or", a.Pashto = "ps", a.Persian = "fa", a.Polish = "pl", a.Portuguese = "pt", a.Punjabi = "pa", a.Quechua = "qu", a.Romanian = "ro", a.Russian = "ru", a.Sakha = "sah", a.Sami = "se", a.Samoan = "sm", a.Sanskrit = "sa", a.Scots = "gd", a.Serbian = "sr", a.SerbianCyrillic = "sr-Cyrl", a.Sesotho = "st", a.Shona = "sn", a.Sindhi = "sd", a.Sinhala = "si", a.Slovak = "sk", a.Slovenian = "sl", a.Somali = "so", a.Spanish = "es", a.Sudanese = "su", a.Sutu = "sx", a.Swahili = "sw", a.Swedish = "sv", a.Syriac = "syr", a.Tagalog = "tl", a.Tajik = "tg", a.Tamazight = "tmh", a.Tamil = "ta", a.Tatar = "tt", a.Telugu = "te", a.Thai = "th", a.Tibetan = "bo", a.Tsonga = "ts", a.Tswana = "tn", a.Turkish = "tr", a.Turkmen = "tk", a.Ukrainian = "uk", a.Urdu = "ur", a.Uzbek = "uz", a.Vietnamese = "vi", a.Welsh = "cy", a.Xhosa = "xh", a.Yiddish = "yi", a.Yoruba = "yo", a.Zulu = "zu";
})(o || (o = {}));
var e;
(function(a) {
  a.Afrikaans = "af", a.AfrikaansSouthAfrica = "af-ZA", a.Albanian = "sq", a.AlbanianAlbania = "sq-AL", a.Amharic = "am", a.AmharicEthiopia = "am-ET", a.Arabic = "ar", a.ArabicAlgeria = "ar-DZ", a.ArabicBahrain = "ar-BH", a.ArabicEgypt = "ar-EG", a.ArabicIraq = "ar-IQ", a.ArabicJordan = "ar-JO", a.ArabicKuwait = "ar-KW", a.ArabicLebanon = "ar-LB", a.ArabicLibya = "ar-LY", a.ArabicMorocco = "ar-MA", a.ArabicOman = "ar-OM", a.ArabicQatar = "ar-QA", a.ArabicSaudiArabia = "ar-SA", a.ArabicSyria = "ar-SY", a.ArabicTunisia = "ar-TN", a.ArabicUnitedArabEmirates = "ar-AE", a.ArabicYemen = "ar-YE", a.Armenian = "hy", a.ArmenianArmenia = "hy-AM", a.Azerbaijani = "az", a.AzerbaijaniAzerbaijan = "az-AZ", a.AzerbaijaniCyrillicAzerbaijan = "az-Cyrl-AZ", a.Bashkir = "ba", a.Basque = "eu", a.BasqueSpain = "eu-ES", a.Belarusian = "be", a.BelarusianBelarus = "be-BY", a.Bengali = "bn", a.BengaliBangladesh = "bn-BD", a.BengaliIndia = "bn-IN", a.Berber = "ber", a.Bhutani = "dz", a.BhutaniBhutan = "dz-BT", a.Bosnian = "bs", a.BosnianBosniaAndHerzegovina = "bs-BA", a.Breton = "br", a.Bulgarian = "bg", a.BulgarianBosniaAndHerzegovina = "bg-BG", a.BulgarianBulgaria = "bg-BG", a.Burmese = "my", a.BurmeseMyanmar = "my-MM", a.Cantonese = "yue", a.CantoneseHongKong = "yue-HK", a.Catalan = "ca", a.CatalanSpain = "ca-ES", a.Chechen = "ce", a.Cherokee = "chr", a.Chinese = "zh", a.ChineseSimplified = "zh-Hans", a.ChineseSimplifiedChina = "zh-Hans-CN", a.ChineseSimplifiedHongKong = "zh-Hans-HK", a.ChineseSimplifiedMacau = "zh-Hans-MO", a.ChineseSimplifiedSingapore = "zh-Hans-SG", a.ChineseTraditional = "zh-Hant", a.ChineseTraditionalHongKong = "zh-Hant-HK", a.ChineseTraditionalMacau = "zh-Hant-MO", a.ChineseTraditionalSingapore = "zh-Hant-SG", a.ChineseTraditionalTaiwan = "zh-Hant-TW", a.Chuvash = "cv", a.CorsicanFrance = "co-FR", a.Croatian = "hr", a.CroatianBosniaAndHerzegovina = "hr-BA", a.CroatianCroatia = "hr-HR", a.Czech = "cs", a.CzechCzechRepublic = "cs-CZ", a.Danish = "da", a.DanishDenmark = "da-DK", a.Dari = "prs", a.DariAfghanistan = "prs-AF", a.Divehi = "dv", a.DivehiMaldives = "dv-MV", a.Dutch = "nl", a.DutchBelgium = "nl-BE", a.DutchNetherlands = "nl-NL", a.English = "en", a.EnglishAustralia = "en-AU", a.EnglishBelgium = "en-BE", a.EnglishBelize = "en-BZ", a.EnglishCanada = "en-CA", a.EnglishCaribbean = "en-029", a.EnglishIreland = "en-IE", a.EnglishJamaica = "en-JM", a.EnglishNewZealand = "en-NZ", a.EnglishPhilippines = "en-PH", a.EnglishSingapore = "en-SG", a.EnglishSouthAfrica = "en-ZA", a.EnglishTrinidadAndTobago = "en-TT", a.EnglishUnitedKingdom = "en-GB", a.EnglishUnitedStates = "en-US", a.EnglishZimbabwe = "en-ZW", a.Esperanto = "eo", a.Estonian = "et", a.EstonianEstonia = "et-EE", a.Faroese = "fo", a.FaroeseFaroeIslands = "fo-FO", a.Farsi = "fa", a.FarsiIran = "fa-IR", a.Filipino = "fil", a.FilipinoPhilippines = "fil-PH", a.Finnish = "fi", a.FinnishFinland = "fi-FI", a.French = "fr", a.FrenchBelgium = "fr-BE", a.FrenchCanada = "fr-CA", a.FrenchFrance = "fr-FR", a.FrenchLuxembourg = "fr-LU", a.FrenchMonaco = "fr-MC", a.FrenchReunion = "fr-RE", a.FrenchSwitzerland = "fr-CH", a.Frisian = "fy", a.FrisianNetherlands = "fy-NL", a.Galician = "gl", a.GalicianSpain = "gl-ES", a.Georgian = "ka", a.GeorgianGeorgia = "ka-GE", a.German = "de", a.GermanAustria = "de-AT", a.GermanBelgium = "de-BE", a.GermanGermany = "de-DE", a.GermanLiechtenstein = "de-LI", a.GermanLuxembourg = "de-LU", a.GermanSwitzerland = "de-CH", a.Greenlandic = "kl", a.GreenlandicGreenland = "kl-GL", a.Greek = "el", a.GreekGreece = "el-GR", a.Gujarati = "gu", a.GujaratiIndia = "gu-IN", a.Haitian = "ht", a.Hausa = "ha", a.HausaGhana = "ha-GH", a.HausaNiger = "ha-NE", a.HausaNigeria = "ha-NG", a.Hebrew = "he", a.HebrewIsrael = "he-IL", a.Hindi = "hi", a.HindiIndia = "hi-IN", a.Hungarian = "hu", a.HungarianHungary = "hu-HU", a.Icelandic = "is", a.IcelandicIceland = "is-IS", a.Igbo = "ig", a.IgboNigeria = "ig-NG", a.Indonesian = "id", a.IndonesianIndonesia = "id-ID", a.Irish = "ga", a.IrishIreland = "ga-IE", a.Italian = "it", a.ItalianItaly = "it-IT", a.ItalianSwitzerland = "it-CH", a.Japanese = "ja", a.JapaneseJapan = "ja-JP", a.Javanese = "jv", a.Kannada = "kn", a.KannadaIndia = "kn-IN", a.Karelian = "krl", a.Kazakh = "kk", a.KazakhKazakhstan = "kk-KZ", a.Khmer = "km", a.KhmerCambodia = "km-KH", a.KinyarwandaRwanda = "rw-RW", a.Komi = "kv", a.Konkani = "kok", a.KonkaniIndia = "kok-IN", a.Korean = "ko", a.KoreanSouthKorea = "ko-KR", a.Kurdish = "ku", a.KurdishIraq = "ku-IQ", a.KurdishTurkey = "ku-TR", a.Kyrgyz = "ky", a.KyrgyzKyrgyzstan = "ky-KG", a.Lao = "lo", a.LaoLaos = "lo-LA", a.Latin = "la", a.Latvian = "lv", a.LatvianLatvia = "lv-LV", a.Lithuanian = "lt", a.LithuanianLithuania = "lt-LT", a.Luxembourgish = "lb", a.LuxembourgishBelgium = "lb-LU", a.LuxembourgishLuxembourg = "lb-LU", a.Macedonian = "mk", a.MacedonianNorthMacedonia = "mk-MK", a.Malagasy = "mg", a.Malay = "ms", a.MalayBrunei = "ms-BN", a.MalayIndia = "ms-IN", a.MalayMalaysia = "ms-MY", a.MalaySingapore = "ms-SG", a.Malayalam = "ml", a.MalayalamIndia = "ml-IN", a.Maltese = "mt", a.MalteseMalta = "mt-MT", a.Maori = "mi", a.MaoriNewZealand = "mi-NZ", a.Marathi = "mr", a.MarathiIndia = "mr-IN", a.Mari = "chm", a.Mongolian = "mn", a.MongolianMongolia = "mn-MN", a.Montenegrin = "me", a.MontenegrinMontenegro = "me-ME", a.Nepali = "ne", a.NepaliNepal = "ne-NP", a.NorthernSotho = "ns", a.NorthernSothoSouthAfrica = "ns-ZA", a.Norwegian = "nb", a.NorwegianBokmalNorway = "nb-NO", a.NorwegianNynorskNorway = "nn-NO", a.Oriya = "or", a.OriyaIndia = "or-IN", a.Ossetian = "os", a.Pashto = "ps", a.PashtoAfghanistan = "ps-AF", a.Persian = "fa", a.PersianIran = "fa-IR", a.Polish = "pl", a.PolishPoland = "pl-PL", a.Portuguese = "pt", a.PortugueseBrazil = "pt-BR", a.PortuguesePortugal = "pt-PT", a.Punjabi = "pa", a.PunjabiIndia = "pa-IN", a.PunjabiPakistan = "pa-PK", a.Quechua = "qu", a.QuechuaBolivia = "qu-BO", a.QuechuaEcuador = "qu-EC", a.QuechuaPeru = "qu-PE", a.Romanian = "ro", a.RomanianRomania = "ro-RO", a.Russian = "ru", a.RussianKazakhstan = "ru-KZ", a.RussianKyrgyzstan = "ru-KG", a.RussianRussia = "ru-RU", a.RussianUkraine = "ru-UA", a.Sakha = "sah", a.Sanskrit = "sa", a.SanskritIndia = "sa-IN", a.Sami = "se", a.SamiNorway = "se-NO", a.SamiSweden = "se-SE", a.SamiFinland = "se-FI", a.Samoan = "sm", a.SamoanSamoa = "sm-WS", a.Scots = "gd", a.Serbian = "sr", a.SerbianBosniaAndHerzegovina = "sr-BA", a.SerbianSerbiaAndMontenegro = "sr-SP", a.SerbianCyrillic = "sr-SP-Cyrl", a.SerbianCyrillicBosniaAndHerzegovina = "sr-Cyrl-BA", a.SerbianCyrillicSerbiaAndMontenegro = "sr-Cyrl-SP", a.Sesotho = "st", a.SesothoSouthAfrica = "st-ZA", a.Shona = "sn", a.ShonaZimbabwe = "sn-ZW", a.Sindhi = "sd", a.SindhiPakistan = "sd-PK", a.Sinhala = "si", a.SinhalaSriLanka = "si-LK", a.Slovak = "sk", a.SlovakSlovakia = "sk-SK", a.Slovenian = "sl", a.SlovenianSlovenia = "sl-SI", a.Somali = "so", a.SomaliSomalia = "so-SO", a.Spanish = "es", a.SpanishArgentina = "es-AR", a.SpanishBolivia = "es-BO", a.SpanishChile = "es-CL", a.SpanishColombia = "es-CO", a.SpanishCostaRica = "es-CR", a.SpanishCuba = "es-CU", a.SpanishDominicanRepublic = "es-DO", a.SpanishEcuador = "es-EC", a.SpanishEquatorialGuinea = "es-GQ", a.SpanishElSalvador = "es-SV", a.SpanishGuatemala = "es-GT", a.SpanishHonduras = "es-HN", a.SpanishMexico = "es-MX", a.SpanishNicaragua = "es-NI", a.SpanishPanama = "es-PA", a.SpanishParaguay = "es-PY", a.SpanishPeru = "es-PE", a.SpanishPuertoRico = "es-PR", a.SpanishSpain = "es-ES", a.SpanishUnitedStates = "es-US", a.SpanishUruguay = "es-UY", a.SpanishVenezuela = "es-VE", a.Sudanese = "su", a.Sutu = "st", a.SutuSouthAfrica = "st-ZA", a.Swahili = "sw", a.SwahiliKenya = "sw-KE", a.Swedish = "sv", a.SwedishFinland = "sv-FI", a.SwedishSweden = "sv-SE", a.Syriac = "syr", a.SyriacSyria = "syr-SY", a.Tajik = "tg", a.TajikTajikistan = "tg-TJ", a.Tagalog = "tl", a.TagalogPhilippines = "tl-PH", a.Tamazight = "tmh", a.Tamil = "ta", a.TamilIndia = "ta-IN", a.Tatar = "tt", a.Telugu = "te", a.TeluguIndia = "te-IN", a.Thai = "th", a.ThaiThailand = "th-TH", a.Tibetan = "bo", a.TibetanBhutan = "bo-BT", a.TibetanChina = "bo-CN", a.TibetanIndia = "bo-IN", a.Tsonga = "ts", a.Tswana = "tn", a.TswanaSouthAfrica = "tn-ZA", a.Turkish = "tr", a.TurkishTurkey = "tr-TR", a.Turkmen = "tk", a.Ukrainian = "uk", a.UkrainianUkraine = "uk-UA", a.Urdu = "ur", a.UrduAfghanistan = "ur-AF", a.UrduIndia = "ur-IN", a.UrduPakistan = "ur-PK", a.Uzbek = "uz", a.UzbekCyrillic = "uz-Cyrl-UZ", a.UzbekLatin = "uz-Latn-UZ", a.UzbekUzbekistan = "uz-UZ", a.Vietnamese = "vi", a.VietnameseVietnam = "vi-VN", a.Welsh = "cy", a.WelshUnitedKingdom = "cy-GB", a.Xhosa = "xh", a.XhosaSouthAfrica = "xh-ZA", a.Yiddish = "yi", a.Yoruba = "yo", a.YorubaNigeria = "yo-NG", a.ZhuyinMandarinChina = "yue-Hant-CN", a.Zulu = "zu", a.ZuluSouthAfrica = "zu-ZA";
})(e || (e = {}));
var t;
(function(a) {
  a.AfricaAbidjan = "Africa/Abidjan", a.AfricaAccra = "Africa/Accra", a.AfricaAddisAbaba = "Africa/Addis_Ababa", a.AfricaAlgiers = "Africa/Algiers", a.AfricaAsmara = "Africa/Asmara", a.AfricaBamako = "Africa/Bamako", a.AfricaBangui = "Africa/Bangui", a.AfricaBanjul = "Africa/Banjul", a.AfricaBissau = "Africa/Bissau", a.AfricaBlantyre = "Africa/Blantyre", a.AfricaBrazzaville = "Africa/Brazzaville", a.AfricaBujumbura = "Africa/Bujumbura", a.AfricaCairo = "Africa/Cairo", a.AfricaCasablanca = "Africa/Casablanca", a.AfricaCeuta = "Africa/Ceuta", a.AfricaConakry = "Africa/Conakry", a.AfricaDakar = "Africa/Dakar", a.AfricaDarEsSalaam = "Africa/Dar_es_Salaam", a.AfricaDjibouti = "Africa/Djibouti", a.AfricaDouala = "Africa/Douala", a.AfricaElAaiun = "Africa/El_Aaiun", a.AfricaFreetown = "Africa/Freetown", a.AfricaGaborone = "Africa/Gaborone", a.AfricaHarare = "Africa/Harare", a.AfricaJohannesburg = "Africa/Johannesburg", a.AfricaJuba = "Africa/Juba", a.AfricaKampala = "Africa/Kampala", a.AfricaKhartoum = "Africa/Khartoum", a.AfricaKigali = "Africa/Kigali", a.AfricaKinshasa = "Africa/Kinshasa", a.AfricaLagos = "Africa/Lagos", a.AfricaLibreville = "Africa/Libreville", a.AfricaLome = "Africa/Lome", a.AfricaLuanda = "Africa/Luanda", a.AfricaLubumbashi = "Africa/Lubumbashi", a.AfricaLusaka = "Africa/Lusaka", a.AfricaMalabo = "Africa/Malabo", a.AfricaMaputo = "Africa/Maputo", a.AfricaMaseru = "Africa/Maseru", a.AfricaMbabane = "Africa/Mbabane", a.AfricaMogadishu = "Africa/Mogadishu", a.AfricaMonrovia = "Africa/Monrovia", a.AfricaNairobi = "Africa/Nairobi", a.AfricaNdjamena = "Africa/Ndjamena", a.AfricaNiamey = "Africa/Niamey", a.AfricaNouakchott = "Africa/Nouakchott", a.AfricaOuagadougou = "Africa/Ouagadougou", a.AfricaPortoNovo = "Africa/Porto-Novo", a.AfricaSaoTome = "Africa/Sao_Tome", a.AfricaTripoli = "Africa/Tripoli", a.AfricaTunis = "Africa/Tunis", a.AfricaWindhoek = "Africa/Windhoek", a.AmericaAdak = "America/Adak", a.AmericaAnchorage = "America/Anchorage", a.AmericaAnguilla = "America/Anguilla", a.AmericaAntigua = "America/Antigua", a.AmericaAraguaina = "America/Araguaina", a.AmericaArgentinaBuenosAires = "America/Argentina/Buenos_Aires", a.AmericaArgentinaCatamarca = "America/Argentina/Catamarca", a.AmericaArgentinaCordoba = "America/Argentina/Cordoba", a.AmericaArgentinaJujuy = "America/Argentina/Jujuy", a.AmericaArgentinaLaRioja = "America/Argentina/La_Rioja", a.AmericaArgentinaMendoza = "America/Argentina/Mendoza", a.AmericaArgentinaRioGallegos = "America/Argentina/Rio_Gallegos", a.AmericaArgentinaSalta = "America/Argentina/Salta", a.AmericaArgentinaSanJuan = "America/Argentina/San_Juan", a.AmericaArgentinaSanLuis = "America/Argentina/San_Luis", a.AmericaArgentinaTucuman = "America/Argentina/Tucuman", a.AmericaArgentinaUshuaia = "America/Argentina/Ushuaia", a.AmericaAruba = "America/Aruba", a.AmericaAsuncion = "America/Asuncion", a.AmericaAtikokan = "America/Atikokan", a.AmericaAtka = "America/Atka", a.AmericaBahia = "America/Bahia", a.AmericaBahiaBanderas = "America/Bahia_Banderas", a.AmericaBarbados = "America/Barbados", a.AmericaBelem = "America/Belem", a.AmericaBelize = "America/Belize", a.AmericaBlancSablon = "America/Blanc-Sablon", a.AmericaBoaVista = "America/Boa_Vista", a.AmericaBogota = "America/Bogota", a.AmericaBoise = "America/Boise", a.AmericaCambridgeBay = "America/Cambridge_Bay", a.AmericaCampoGrande = "America/Campo_Grande", a.AmericaCancun = "America/Cancun", a.AmericaCaracas = "America/Caracas", a.AmericaCayenne = "America/Cayenne", a.AmericaCayman = "America/Cayman", a.AmericaChicago = "America/Chicago", a.AmericaChihuahua = "America/Chihuahua", a.AmericaCoralHarbour = "America/Coral_Harbour", a.AmericaCordoba = "America/Cordoba", a.AmericaCostaRica = "America/Costa_Rica", a.AmericaCreston = "America/Creston", a.AmericaCuiaba = "America/Cuiaba", a.AmericaCuracao = "America/Curacao", a.AmericaDanmarkshavn = "America/Danmarkshavn", a.AmericaDawson = "America/Dawson", a.AmericaDawsonCreek = "America/Dawson_Creek", a.AmericaDenver = "America/Denver", a.AmericaDetroit = "America/Detroit", a.AmericaDominica = "America/Dominica", a.AmericaEdmonton = "America/Edmonton", a.AmericaEirunepe = "America/Eirunepe", a.AmericaElSalvador = "America/El_Salvador", a.AmericaFortaleza = "America/Fortaleza", a.AmericaGlaceBay = "America/Glace_Bay", a.AmericaGodthab = "America/Godthab", a.AmericaGooseBay = "America/Goose_Bay", a.AmericaGrandTurk = "America/Grand_Turk", a.AmericaGrenada = "America/Grenada", a.AmericaGuadeloupe = "America/Guadeloupe", a.AmericaGuatemala = "America/Guatemala", a.AmericaGuayaquil = "America/Guayaquil", a.AmericaGuyana = "America/Guyana", a.AmericaHalifax = "America/Halifax", a.AmericaHavana = "America/Havana", a.AmericaHermosillo = "America/Hermosillo", a.AmericaIndianaIndianapolis = "America/Indiana/Indianapolis", a.AmericaIndianaKnox = "America/Indiana/Knox", a.AmericaIndianaMarengo = "America/Indiana/Marengo", a.AmericaIndianaPetersburg = "America/Indiana/Petersburg", a.AmericaIndianaTellCity = "America/Indiana/Tell_City", a.AmericaIndianaVevay = "America/Indiana/Vevay", a.AmericaIndianaVincennes = "America/Indiana/Vincennes", a.AmericaIndianaWinamac = "America/Indiana/Winamac", a.AmericaInuvik = "America/Inuvik", a.AmericaIqaluit = "America/Iqaluit", a.AmericaJamaica = "America/Jamaica", a.AmericaJuneau = "America/Juneau", a.AmericaKentuckyLouisville = "America/Kentucky/Louisville", a.AmericaKentuckyMonticello = "America/Kentucky/Monticello", a.AmericaKralendijk = "America/Kralendijk", a.AmericaLaPaz = "America/La_Paz", a.AmericaLima = "America/Lima", a.AmericaLosAngeles = "America/Los_Angeles", a.AmericaLouisville = "America/Louisville", a.AmericaLowerPrinces = "America/Lower_Princes", a.AmericaMaceio = "America/Maceio", a.AmericaManagua = "America/Managua", a.AmericaManaus = "America/Manaus", a.AmericaMarigot = "America/Marigot", a.AmericaMartinique = "America/Martinique", a.AmericaMatamoros = "America/Matamoros", a.AmericaMazatlan = "America/Mazatlan", a.AmericaMenominee = "America/Menominee", a.AmericaMerida = "America/Merida", a.AmericaMetlakatla = "America/Metlakatla", a.AmericaMexicoCity = "America/Mexico_City", a.AmericaMiquelon = "America/Miquelon", a.AmericaMoncton = "America/Moncton", a.AmericaMonterrey = "America/Monterrey", a.AmericaMontevideo = "America/Montevideo", a.AmericaMontserrat = "America/Montserrat", a.AmericaMontreal = "America/Montreal", a.AmericaNassau = "America/Nassau", a.AmericaNewYork = "America/New_York", a.AmericaNipigon = "America/Nipigon", a.AmericaNome = "America/Nome", a.AmericaNoronha = "America/Noronha", a.AmericaNorthDakotaBeulah = "America/North_Dakota/Beulah", a.AmericaNorthDakotaCenter = "America/North_Dakota/Center", a.AmericaNorthDakotaNewSalem = "America/North_Dakota/New_Salem", a.AmericaOjinaga = "America/Ojinaga", a.AmericaPanama = "America/Panama", a.AmericaPangnirtung = "America/Pangnirtung", a.AmericaParamaribo = "America/Paramaribo", a.AmericaPhoenix = "America/Phoenix", a.AmericaPortAuPrince = "America/Port-au-Prince", a.AmericaPortOfSpain = "America/Port_of_Spain", a.AmericaPortoVelho = "America/Porto_Velho", a.AmericaPuertoRico = "America/Puerto_Rico", a.AmericaRainyRiver = "America/Rainy_River", a.AmericaRankinInlet = "America/Rankin_Inlet", a.AmericaRecife = "America/Recife", a.AmericaRegina = "America/Regina", a.AmericaResolute = "America/Resolute", a.AmericaRioBranco = "America/Rio_Branco", a.AmericaSantaIsabel = "America/Santa_Isabel", a.AmericaSantarem = "America/Santarem", a.AmericaSantiago = "America/Santiago", a.AmericaSantoDomingo = "America/Santo_Domingo", a.AmericaSaoPaulo = "America/Sao_Paulo", a.AmericaScoresbysund = "America/Scoresbysund", a.AmericaShiprock = "America/Shiprock", a.AmericaSitka = "America/Sitka", a.AmericaStBarthelemy = "America/St_Barthelemy", a.AmericaStJohns = "America/St_Johns", a.AmericaStKitts = "America/St_Kitts", a.AmericaStLucia = "America/St_Lucia", a.AmericaStThomas = "America/St_Thomas", a.AmericaStVincent = "America/St_Vincent", a.AmericaSwiftCurrent = "America/Swift_Current", a.AmericaTegucigalpa = "America/Tegucigalpa", a.AmericaThule = "America/Thule", a.AmericaThunderBay = "America/Thunder_Bay", a.AmericaTijuana = "America/Tijuana", a.AmericaToronto = "America/Toronto", a.AmericaTortola = "America/Tortola", a.AmericaVancouver = "America/Vancouver", a.AmericaWhitehorse = "America/Whitehorse", a.AmericaWinnipeg = "America/Winnipeg", a.AmericaYakutat = "America/Yakutat", a.AmericaYellowknife = "America/Yellowknife", a.AntarcticaCasey = "Antarctica/Casey", a.AntarcticaDavis = "Antarctica/Davis", a.AntarcticaDumontDUrville = "Antarctica/DumontDUrville", a.AntarcticaMacquarie = "Antarctica/Macquarie", a.AntarcticaMawson = "Antarctica/Mawson", a.AntarcticaMcMurdo = "Antarctica/McMurdo", a.AntarcticaPalmer = "Antarctica/Palmer", a.AntarcticaRothera = "Antarctica/Rothera", a.AntarcticaSyowa = "Antarctica/Syowa", a.AntarcticaTroll = "Antarctica/Troll", a.AntarcticaVostok = "Antarctica/Vostok", a.ArcticLongyearbyen = "Arctic/Longyearbyen", a.AsiaAden = "Asia/Aden", a.AsiaAlmaty = "Asia/Almaty", a.AsiaAmman = "Asia/Amman", a.AsiaAnadyr = "Asia/Anadyr", a.AsiaAqtau = "Asia/Aqtau", a.AsiaAqtobe = "Asia/Aqtobe", a.AsiaAshgabat = "Asia/Ashgabat", a.AsiaBaghdad = "Asia/Baghdad", a.AsiaBahrain = "Asia/Bahrain", a.AsiaBaku = "Asia/Baku", a.AsiaBangkok = "Asia/Bangkok", a.AsiaBarnaul = "Asia/Barnaul", a.AsiaBeirut = "Asia/Beirut", a.AsiaBishkek = "Asia/Bishkek", a.AsiaBrunei = "Asia/Brunei", a.AsiaChita = "Asia/Chita", a.AsiaChoibalsan = "Asia/Choibalsan", a.AsiaColombo = "Asia/Colombo", a.AsiaDamascus = "Asia/Damascus", a.AsiaDhaka = "Asia/Dhaka", a.AsiaDili = "Asia/Dili", a.AsiaDubai = "Asia/Dubai", a.AsiaDushanbe = "Asia/Dushanbe", a.AsiaFamagusta = "Asia/Famagusta", a.AsiaGaza = "Asia/Gaza", a.AsiaHebron = "Asia/Hebron", a.AsiaHoChiMinh = "Asia/Ho_Chi_Minh", a.AsiaHongKong = "Asia/Hong_Kong", a.AsiaHovd = "Asia/Hovd", a.AsiaIrkutsk = "Asia/Irkutsk", a.AsiaJakarta = "Asia/Jakarta", a.AsiaJayapura = "Asia/Jayapura", a.AsiaJerusalem = "Asia/Jerusalem", a.AsiaKabul = "Asia/Kabul", a.AsiaKamchatka = "Asia/Kamchatka", a.AsiaKarachi = "Asia/Karachi", a.AsiaKathmandu = "Asia/Kathmandu", a.AsiaKhandyga = "Asia/Khandyga", a.AsiaKolkata = "Asia/Kolkata", a.AsiaKrasnoyarsk = "Asia/Krasnoyarsk", a.AsiaKualaLumpur = "Asia/Kuala_Lumpur", a.AsiaKuching = "Asia/Kuching", a.AsiaKuwait = "Asia/Kuwait", a.AsiaMacau = "Asia/Macau", a.AsiaMagadan = "Asia/Magadan", a.AsiaMakassar = "Asia/Makassar", a.AsiaManila = "Asia/Manila", a.AsiaMuscat = "Asia/Muscat", a.AsiaNicosia = "Asia/Nicosia", a.AsiaNovokuznetsk = "Asia/Novokuznetsk", a.AsiaNovosibirsk = "Asia/Novosibirsk", a.AsiaOmsk = "Asia/Omsk", a.AsiaOral = "Asia/Oral", a.AsiaPhnomPenh = "Asia/Phnom_Penh", a.AsiaPontianak = "Asia/Pontianak", a.AsiaPyongyang = "Asia/Pyongyang", a.AsiaQatar = "Asia/Qatar", a.AsiaQyzylorda = "Asia/Qyzylorda", a.AsiaRangoon = "Asia/Rangoon", a.AsiaRiyadh = "Asia/Riyadh", a.AsiaSakhalin = "Asia/Sakhalin", a.AsiaSamarkand = "Asia/Samarkand", a.AsiaSeoul = "Asia/Seoul", a.AsiaShanghai = "Asia/Shanghai", a.AsiaSingapore = "Asia/Singapore", a.AsiaSrednekolymsk = "Asia/Srednekolymsk", a.AsiaTaipei = "Asia/Taipei", a.AsiaTashkent = "Asia/Tashkent", a.AsiaTbilisi = "Asia/Tbilisi", a.AsiaTehran = "Asia/Tehran", a.AsiaThimphu = "Asia/Thimphu", a.AsiaTokyo = "Asia/Tokyo", a.AsiaTomsk = "Asia/Tomsk", a.AsiaUlaanbaatar = "Asia/Ulaanbaatar", a.AsiaUrumqi = "Asia/Urumqi", a.AsiaUstNera = "Asia/Ust-Nera", a.AsiaVientiane = "Asia/Vientiane", a.AsiaVladivostok = "Asia/Vladivostok", a.AsiaYakutsk = "Asia/Yakutsk", a.AsiaYekaterinburg = "Asia/Yekaterinburg", a.AsiaYerevan = "Asia/Yerevan", a.AtlanticAzores = "Atlantic/Azores", a.AtlanticBermuda = "Atlantic/Bermuda", a.AtlanticCanary = "Atlantic/Canary", a.AtlanticCapeVerde = "Atlantic/Cape_Verde", a.AtlanticFaroe = "Atlantic/Faroe", a.AtlanticMadeira = "Atlantic/Madeira", a.AtlanticReykjavik = "Atlantic/Reykjavik", a.AtlanticSouthGeorgia = "Atlantic/South_Georgia", a.AtlanticStHelena = "Atlantic/St_Helena", a.AtlanticStanley = "Atlantic/Stanley", a.AustraliaAdelaide = "Australia/Adelaide", a.AustraliaBrisbane = "Australia/Brisbane", a.AustraliaBrokenHill = "Australia/Broken_Hill", a.AustraliaCanberra = "Australia/Canberra", a.AustraliaCurrie = "Australia/Currie", a.AustraliaDarwin = "Australia/Darwin", a.AustraliaEucla = "Australia/Eucla", a.AustraliaHobart = "Australia/Hobart", a.AustraliaLindeman = "Australia/Lindeman", a.AustraliaLordHowe = "Australia/Lord_Howe", a.AustraliaMelbourne = "Australia/Melbourne", a.AustraliaPerth = "Australia/Perth", a.AustraliaSydney = "Australia/Sydney", a.EuropeAmsterdam = "Europe/Amsterdam", a.EuropeAndorra = "Europe/Andorra", a.EuropeAthens = "Europe/Athens", a.EuropeBelgrade = "Europe/Belgrade", a.EuropeBerlin = "Europe/Berlin", a.EuropeBratislava = "Europe/Bratislava", a.EuropeBrussels = "Europe/Brussels", a.EuropeBucharest = "Europe/Bucharest", a.EuropeBudapest = "Europe/Budapest", a.EuropeBusingen = "Europe/Busingen", a.EuropeChisinau = "Europe/Chisinau", a.EuropeCopenhagen = "Europe/Copenhagen", a.EuropeDublin = "Europe/Dublin", a.EuropeGibraltar = "Europe/Gibraltar", a.EuropeGuernsey = "Europe/Guernsey", a.EuropeHelsinki = "Europe/Helsinki", a.EuropeIsleOfMan = "Europe/Isle_of_Man", a.EuropeIstanbul = "Europe/Istanbul", a.EuropeJersey = "Europe/Jersey", a.EuropeKaliningrad = "Europe/Kaliningrad", a.EuropeKiev = "Europe/Kiev", a.EuropeKirov = "Europe/Kirov", a.EuropeLisbon = "Europe/Lisbon", a.EuropeLjubljana = "Europe/Ljubljana", a.EuropeLondon = "Europe/London", a.EuropeLuxembourg = "Europe/Luxembourg", a.EuropeMadrid = "Europe/Madrid", a.EuropeMalta = "Europe/Malta", a.EuropeMariehamn = "Europe/Mariehamn", a.EuropeMinsk = "Europe/Minsk", a.EuropeMonaco = "Europe/Monaco", a.EuropeMoscow = "Europe/Moscow", a.EuropeOslo = "Europe/Oslo", a.EuropeParis = "Europe/Paris", a.EuropePodgorica = "Europe/Podgorica", a.EuropePrague = "Europe/Prague", a.EuropeRiga = "Europe/Riga", a.EuropeRome = "Europe/Rome", a.EuropeSamara = "Europe/Samara", a.EuropeSanMarino = "Europe/San_Marino", a.EuropeSarajevo = "Europe/Sarajevo", a.EuropeSimferopol = "Europe/Simferopol", a.EuropeSkopje = "Europe/Skopje", a.EuropeSofia = "Europe/Sofia", a.EuropeStockholm = "Europe/Stockholm", a.EuropeTallinn = "Europe/Tallinn", a.EuropeTirane = "Europe/Tirane", a.EuropeUzhgorod = "Europe/Uzhgorod", a.EuropeVaduz = "Europe/Vaduz", a.EuropeVatican = "Europe/Vatican", a.EuropeVienna = "Europe/Vienna", a.EuropeVilnius = "Europe/Vilnius", a.EuropeVolgograd = "Europe/Volgograd", a.EuropeWarsaw = "Europe/Warsaw", a.EuropeZagreb = "Europe/Zagreb", a.EuropeZaporozhye = "Europe/Zaporozhye", a.EuropeZurich = "Europe/Zurich", a.GMT = "GMT", a.IndianAntananarivo = "Indian/Antananarivo", a.IndianChagos = "Indian/Chagos", a.IndianChristmas = "Indian/Christmas", a.IndianCocos = "Indian/Cocos", a.IndianComoro = "Indian/Comoro", a.IndianKerguelen = "Indian/Kerguelen", a.IndianMahe = "Indian/Mahe", a.IndianMaldives = "Indian/Maldives", a.IndianMauritius = "Indian/Mauritius", a.IndianMayotte = "Indian/Mayotte", a.IndianReunion = "Indian/Reunion", a.PacificApia = "Pacific/Apia", a.PacificAuckland = "Pacific/Auckland", a.PacificBougainville = "Pacific/Bougainville", a.PacificChatham = "Pacific/Chatham", a.PacificChuuk = "Pacific/Chuuk", a.PacificEaster = "Pacific/Easter", a.PacificEfate = "Pacific/Efate", a.PacificEnderbury = "Pacific/Enderbury", a.PacificFakaofo = "Pacific/Fakaofo", a.PacificFiji = "Pacific/Fiji", a.PacificFunafuti = "Pacific/Funafuti", a.PacificGalapagos = "Pacific/Galapagos", a.PacificGambier = "Pacific/Gambier", a.PacificGuadalcanal = "Pacific/Guadalcanal", a.PacificGuam = "Pacific/Guam", a.PacificHonolulu = "Pacific/Honolulu", a.PacificJohnston = "Pacific/Johnston", a.PacificKiritimati = "Pacific/Kiritimati", a.PacificKosrae = "Pacific/Kosrae", a.PacificKwajalein = "Pacific/Kwajalein", a.PacificMajuro = "Pacific/Majuro", a.PacificMarquesas = "Pacific/Marquesas", a.PacificMidway = "Pacific/Midway", a.PacificNauru = "Pacific/Nauru", a.PacificNiue = "Pacific/Niue", a.PacificNorfolk = "Pacific/Norfolk", a.PacificNoumea = "Pacific/Noumea", a.PacificPagoPago = "Pacific/Pago_Pago", a.PacificPalau = "Pacific/Palau", a.PacificPitcairn = "Pacific/Pitcairn", a.PacificPohnpei = "Pacific/Pohnpei", a.PacificPonape = "Pacific/Ponape", a.PacificPortMoresby = "Pacific/Port_Moresby", a.PacificRarotonga = "Pacific/Rarotonga", a.PacificSaipan = "Pacific/Saipan", a.PacificSamoa = "Pacific/Samoa", a.PacificTahiti = "Pacific/Tahiti", a.PacificTarawa = "Pacific/Tarawa", a.PacificTongatapu = "Pacific/Tongatapu", a.PacificTruk = "Pacific/Truk", a.PacificWake = "Pacific/Wake", a.PacificWallis = "Pacific/Wallis", a.PacificYap = "Pacific/Yap";
})(t || (t = {}));
var i$1;
(function(a) {
  a.UTC_MINUS_12 = "UTC-12", a.UTC_MINUS_11_30 = "UTC-11:30", a.UTC_MINUS_11 = "UTC-11", a.UTC_MINUS_10_30 = "UTC-10:30", a.UTC_MINUS_10 = "UTC-10", a.UTC_MINUS_9_30 = "UTC-9:30", a.UTC_MINUS_9 = "UTC-09", a.UTC_MINUS_8_45 = "UTC-8:45", a.UTC_MINUS_8 = "UTC-08", a.UTC_MINUS_7 = "UTC-07", a.UTC_MINUS_6_30 = "UTC-6:30", a.UTC_MINUS_6 = "UTC-06", a.UTC_MINUS_5_45 = "UTC-5:45", a.UTC_MINUS_5_30 = "UTC-5:30", a.UTC_MINUS_5 = "UTC-05", a.UTC_MINUS_4_30 = "UTC-4:30", a.UTC_MINUS_4 = "UTC-04", a.UTC_MINUS_3_30 = "UTC-3:30", a.UTC_MINUS_3 = "UTC-03", a.UTC_MINUS_2_30 = "UTC-2:30", a.UTC_MINUS_2 = "UTC-02", a.UTC_MINUS_1 = "UTC-01", a.UTC_0 = "UTC+00", a.UTC_PLUS_1 = "UTC+01", a.UTC_PLUS_2 = "UTC+02", a.UTC_PLUS_3 = "UTC+03", a.UTC_PLUS_3_30 = "UTC+3:30", a.UTC_PLUS_4 = "UTC+04", a.UTC_PLUS_4_30 = "UTC+4:30", a.UTC_PLUS_5 = "UTC+05", a.UTC_PLUS_5_30 = "UTC+5:30", a.UTC_PLUS_5_45 = "UTC+5:45", a.UTC_PLUS_6 = "UTC+06", a.UTC_PLUS_6_30 = "UTC+6:30", a.UTC_PLUS_7 = "UTC+07", a.UTC_PLUS_8 = "UTC+08", a.UTC_PLUS_8_45 = "UTC+8:45", a.UTC_PLUS_9 = "UTC+09", a.UTC_PLUS_9_30 = "UTC+9:30", a.UTC_PLUS_10 = "UTC+10", a.UTC_PLUS_10_30 = "UTC+10:30", a.UTC_PLUS_11 = "UTC+11", a.UTC_PLUS_11_30 = "UTC+11:30", a.UTC_PLUS_12 = "UTC+12", a.UTC_PLUS_12_45 = "UTC+12:45", a.UTC_PLUS_13 = "UTC+13", a.UTC_PLUS_13_45 = "UTC+13:45", a.UTC_PLUS_14 = "UTC+14";
})(i$1 || (i$1 = {}));
var n$1;
(function(a) {
  a.AcreTime = "ACT", a.AfghanistanTime = "AFT", a.AIXCentralEuropeanTime = "DFT", a.AlaskaDaylightTime = "AKDT", a.AlaskaStandardTime = "AKST", a.AlmaAtaTime = "ALMT", a.AmazonSummerTime = "AMST", a.AmazonTime = "AMT", a.AnadyrTime = "ANAT", a.AqtobeTime = "AQTT", a.ArabiaStandardTime = "AST", a.ArgentinaTime = "ART", a.ArmeniaTime = "AMT", a.ASEANCommonTime = "ASEAN", a.AtlanticDaylightTime = "ADT", a.AtlanticStandardTime = "AST", a.AustralianCentralDaylightSavingTime = "ACDT", a.AustralianCentralStandardTime = "ACST", a.AustralianCentralWesternStandardTime = "ACWST", a.AustralianEasternDaylightSavingTime = "AEDT", a.AustralianEasternStandardTime = "AEST", a.AustralianEasternTime = "AET", a.AustralianWesternStandardTime = "AWST", a.AzerbaijanTime = "AZT", a.AzoresStandardTime = "AZOT", a.AzoresSummerTime = "AZOST", a.BakerIslandTime = "BIT", a.BangladeshStandardTime = "BST", a.BhutanTime = "BTT", a.BoliviaTime = "BOT", a.BougainvilleStandardTime = "BST", a.BrasiliaSummerTime = "BRST", a.BrasiliaTime = "BRT", a.BritishIndianOceanTime = "BIOT", a.BritishSummerTime = "BST", a.BruneiTime = "BNT", a.CapeVerdeTime = "CVT", a.CentralAfricaTime = "CAT", a.CentralDaylightTime = "CDT", a.CentralEuropeanSummerTime = "CEST", a.CentralEuropeanTime = "CET", a.CentralIndonesiaTime = "WITA", a.CentralStandardTime = "CST", a.CentralTime = "CT", a.CentralWesternStandardTime = "CWST", a.ChamorroStandardTime = "CHST", a.ChathamDaylightTime = "CHADT", a.ChathamStandardTime = "CHAST", a.ChileStandardTime = "CLT", a.ChileSummerTime = "CLST", a.ChinaStandardTime = "CST", a.ChoibalsanStandardTime = "CHOT", a.ChoibalsanSummerTime = "CHOST", a.ChristmasIslandTime = "CXT", a.ChuukTime = "CHUT", a.ClipptertonIslandStandardTime = "CIST", a.CocosIslandsTime = "CCT", a.ColombiaSummerTime = "COST", a.ColombiaTime = "COT", a.CookIslandTime = "CKT", a.CoordinatedUniversalTime = "UTC", a.CubaDaylightTime = "CDT", a.CubaStandardTime = "CST", a.DavisTime = "DAVT", a.DumontDUrvilleTime = "DDUT", a.EastAfricaTime = "EAT", a.EasterIslandStandardTime = "EAST", a.EasterIslandSummerTime = "EASST", a.EasternCaribbeanTime = "ECT", a.EasternDaylightTime = "EDT", a.EasternEuropeanSummerTime = "EEST", a.EasternEuropeanTime = "EET", a.EasternGreenlandSummerTime = "EGST", a.EasternGreenlandTime = "EGT", a.EasternIndonesianTime = "WIT", a.EasternStandardTime = "EST", a.EasternTime = "ET", a.EcuadorTime = "ECT", a.FalklandIslandsSummerTime = "FKST", a.FalklandIslandsTime = "FKT", a.FernandoDeNoronhaTime = "FNT", a.FijiTime = "FJT", a.FrenchGuianaTime = "GFT", a.FrenchSouthernAndAntarcticTime = "TFT", a.FurtherEasternEuropeanTime = "FET", a.GalapagosTime = "GALT", a.GambierIslandTime = "GIT", a.GambierIslandsTime = "GAMT", a.GeorgiaStandardTime = "GET", a.GilbertIslandTime = "GILT", a.GreenwichMeanTime = "GMT", a.GulfStandardTime = "GST", a.GuyanaTime = "GYT", a.HawaiiAleutianDaylightTime = "HDT", a.HawaiiAleutianStandardTime = "HST", a.HeardAndMcDonaldIslandsTime = "HMT", a.HeureAvanceeDEuropeCentraleTime = "HAEC", a.HongKongTime = "HKT", a.HovdSummerTime = "HOVST", a.HovdTime = "HOVT", a.IndianOceanTime = "IOT", a.IndianStandardTime = "IST", a.IndochinaTime = "ICT", a.InternationalDayLineWestTime = "IDLW", a.IranDaylightTime = "IRDT", a.IranStandardTime = "IRST", a.IrishStandardTime = "IST", a.IrkutskSummerTime = "IRKST", a.IrkutskTime = "IRKT", a.IsraelDaylightTime = "IDT", a.IsraelStandardTime = "IST", a.JapanStandardTime = "JST", a.KaliningradTime = "KALT", a.KamchatkaTime = "KAMT", a.KoreaStandardTime = "KST", a.KosraeTime = "KOST", a.KrasnoyarskSummerTime = "KRAST", a.KrasnoyarskTime = "KRAT", a.KyrgyzstanTime = "KGT", a.LineIslandsTime = "LINT", a.KazakhstanStandardTime = "KAST", a.LordHoweStandardTime = "LHST", a.LordHoweSummerTime = "LHST", a.MacquarieIslandStationTime = "MIST", a.MagadanTime = "MAGT", a.MalaysiaStandardTime = "MST", a.MalaysiaTime = "MYT", a.MaldivesTime = "MVT", a.MarquesasIslandsTime = "MART", a.MarshallIslandsTime = "MHT", a.MauritiusTime = "MUT", a.MawsonStationTime = "MAWT", a.MiddleEuropeanSummerTime = "MEDT", a.MiddleEuropeanTime = "MET", a.MoscowTime = "MSK", a.MountainDaylightTime = "MDT", a.MountainStandardTime = "MST", a.MyanmarStandardTime = "MMT", a.NepalTime = "NCT", a.NauruTime = "NRT", a.NewCaledoniaTime = "NCT", a.NewZealandDaylightTime = "NZDT", a.NewZealandStandardTime = "NZST", a.NewfoundlandDaylightTime = "NDT", a.NewfoundlandStandardTime = "NST", a.NewfoundlandTime = "NT", a.NiueTime = "NUT", a.NorfolkIslandTime = "NFT", a.NovosibirskTime = "NOVT", a.OmskTime = "OMST", a.OralTime = "ORAT", a.PacificDaylightTime = "PDT", a.PacificStandardTime = "PST", a.PakistanStandardTime = "PKT", a.PalauTime = "PWT", a.PapuaNewGuineaTime = "PGT", a.ParaguaySummerTime = "PYST", a.ParaguayTime = "PYT", a.PeruTime = "PET", a.PhilippineStandardTime = "PHST", a.PhilippineTime = "PHT", a.PhoenixIslandTime = "PHOT", a.PitcairnTime = "PST", a.PohnpeiStandardTime = "PONT", a.ReunionTime = "RET", a.RotheraResearchStationTime = "ROTT", a.SaintPierreAndMiquelonDaylightTime = "PMDT", a.SaintPierreAndMiquelonStandardTime = "PMST", a.SakhalinIslandTime = "SAKT", a.SamaraTime = "SAMT", a.SamoaDaylightTime = "SDT", a.SamoaStandardTime = "SST", a.SeychellesTime = "SCT", a.ShowaStationTime = "SYOT", a.SingaporeStandardTime = "SST", a.SingaporeTime = "SGT", a.SolomonIslandsTime = "SBT", a.SouthAfricanStandardTime = "SAST", a.SouthGeorgiaAndTheSouthSandwichIslandsTime = "GST", a.SrednekolymskTime = "SRET", a.SriLankaStandardTime = "SLST", a.SurinameTime = "SRT", a.TahitiTime = "TAHT", a.TajikistanTime = "TJT", a.ThailandStandardTime = "THA", a.TimorLesteTime = "TLT", a.TokelauTime = "TKT", a.TongaTime = "TOT", a.TurkeyTime = "TRT", a.TurkmenistanTime = "TMT", a.TuvaluTime = "TVT", a.UlaanbaatarStandardTime = "ULAT", a.UlaanbaatarSummerTime = "ULAST", a.UruguayStandardTime = "UYT", a.UruguaySummerTime = "UYST", a.UzbekistanTime = "UZT", a.VanuatuTime = "VUT", a.VenezuelaStandardTime = "VET", a.VladivostokTime = "VLAT", a.VolgogradTime = "VOLT", a.VostokStationTime = "VOST", a.WakeIslandTime = "WAKT", a.WestAfricaSummerTime = "WAST", a.WestAfricaTime = "WAT", a.WestGreenlandSummerTime = "WGST", a.WestGreenlandTime = "WGT", a.WestKazakhstanTime = "WKT", a.WesternEuropeanSummerTime = "WEDT", a.WesternEuropeanTime = "WET", a.WesternIndonesianTime = "WIT", a.WesternStandardTime = "WST", a.YakutskTime = "YAKT", a.YekaterinburgTime = "YEKT";
})(n$1 || (n$1 = {}));
({ dst: { is: false, uses: true }, id: n$1.AcreTime, name: "Acre Time", offset: i$1.UTC_MINUS_5 });
({ dst: { is: false, uses: true }, id: n$1.AfghanistanTime, name: "Afghanistan Time", offset: i$1.UTC_PLUS_4_30 });
({ dst: { is: false, uses: true }, id: n$1.AIXCentralEuropeanTime, name: "AIX Central European Time", offset: i$1.UTC_PLUS_1 });
({ dst: { is: true, uses: true }, id: n$1.AlaskaDaylightTime, name: "Alaska Daylight Time", offset: i$1.UTC_MINUS_8 });
({ dst: { is: false, uses: true }, id: n$1.AlaskaStandardTime, name: "Alaska Standard Time", offset: i$1.UTC_MINUS_9 });
({ dst: { is: false, uses: true }, id: n$1.AlmaAtaTime, name: "Alma-Ata Time", offset: i$1.UTC_PLUS_6 });
({ dst: { is: false, uses: true }, id: n$1.AmazonSummerTime, name: "Amazon Summer Time", offset: i$1.UTC_MINUS_3 });
({ dst: { is: false, uses: true }, id: n$1.AmazonTime, name: "Amazon Time", offset: i$1.UTC_MINUS_4 });
({ dst: { is: false, uses: true }, id: n$1.AnadyrTime, name: "Anadyr Time", offset: i$1.UTC_PLUS_12 });
({ dst: { is: false, uses: true }, id: n$1.AqtobeTime, name: "Aqtobe Time", offset: i$1.UTC_PLUS_5 });
({ dst: { is: false, uses: true }, id: n$1.ArabiaStandardTime, name: "Arabia Standard Time", offset: i$1.UTC_PLUS_3 });
({ dst: { is: false, uses: true }, id: n$1.ArgentinaTime, name: "Argentina Time", offset: i$1.UTC_MINUS_3 });
({ dst: { is: false, uses: true }, id: n$1.ArmeniaTime, name: "Armenia Time", offset: i$1.UTC_PLUS_4 });
({ dst: { is: true, uses: true }, id: n$1.AtlanticDaylightTime, name: "Atlantic Daylight Time", offset: i$1.UTC_MINUS_3 });
({ dst: { is: false, uses: true }, id: n$1.AtlanticStandardTime, name: "Atlantic Standard Time", offset: i$1.UTC_MINUS_4 });
({ dst: { is: true, uses: true }, id: n$1.AustralianCentralDaylightSavingTime, name: "Australian Central Daylight Saving Time", offset: i$1.UTC_PLUS_10_30 });
({ dst: { is: false, uses: true }, id: n$1.AustralianCentralStandardTime, name: "Australian Central Standard Time", offset: i$1.UTC_PLUS_9_30 });
({ dst: { is: false, uses: true }, id: n$1.AustralianCentralWesternStandardTime, name: "Australian Central Western Standard Time", offset: i$1.UTC_PLUS_8_45 });
({ dst: { is: true, uses: true }, id: n$1.AustralianEasternDaylightSavingTime, name: "Australian Eastern Daylight Saving Time", offset: i$1.UTC_PLUS_11 });
({ dst: { is: false, uses: true }, id: n$1.AustralianEasternStandardTime, name: "Australian Eastern Standard Time", offset: i$1.UTC_PLUS_10 });
({ dst: { is: false, uses: true }, id: n$1.AustralianEasternTime, name: "Australian Eastern Time", offset: i$1.UTC_PLUS_10 });
({ dst: { is: false, uses: true }, id: n$1.AustralianWesternStandardTime, name: "Australian Western Standard Time", offset: i$1.UTC_PLUS_8 });
({ dst: { is: false, uses: true }, id: n$1.AzerbaijanTime, name: "Azerbaijan Time", offset: i$1.UTC_PLUS_4 });
({ dst: { is: false, uses: true }, id: n$1.AzoresStandardTime, name: "Azores Standard Time", offset: i$1.UTC_MINUS_1 });
({ dst: { is: true, uses: true }, id: n$1.AzoresSummerTime, name: "Azores Summer Time", offset: i$1.UTC_0 });
({ dst: { is: false, uses: true }, id: n$1.BakerIslandTime, name: "Baker Island Time", offset: i$1.UTC_MINUS_12 });
({ dst: { is: false, uses: true }, id: n$1.BangladeshStandardTime, name: "Bangladesh Standard Time", offset: i$1.UTC_PLUS_6 });
({ dst: { is: false, uses: true }, id: n$1.BhutanTime, name: "Bhutan Time", offset: i$1.UTC_PLUS_6 });
({ dst: { is: false, uses: true }, id: n$1.BoliviaTime, name: "Bolivia Time", offset: i$1.UTC_MINUS_4 });
({ dst: { is: false, uses: true }, id: n$1.BougainvilleStandardTime, name: "Bougainville Standard Time", offset: i$1.UTC_PLUS_11 });
({ dst: { is: true, uses: true }, id: n$1.BrasiliaSummerTime, name: "Brasilia Summer Time", offset: i$1.UTC_MINUS_2 });
({ dst: { is: false, uses: true }, id: n$1.BrasiliaTime, name: "Brasilia Time", offset: i$1.UTC_MINUS_3 });
({ dst: { is: false, uses: true }, id: n$1.BritishIndianOceanTime, name: "British Indian Ocean Time", offset: i$1.UTC_PLUS_6 });
({ dst: { is: true, uses: true }, id: n$1.BritishSummerTime, name: "British Summer Time", offset: i$1.UTC_PLUS_1 });
({ dst: { is: false, uses: true }, id: n$1.BruneiTime, name: "Brunei Time", offset: i$1.UTC_PLUS_8 });
({ dst: { is: false, uses: true }, id: n$1.CapeVerdeTime, name: "Cape Verde Time", offset: i$1.UTC_MINUS_1 });
({ dst: { is: false, uses: true }, id: n$1.CentralAfricaTime, name: "Central Africa Time", offset: i$1.UTC_PLUS_2 });
({ dst: { is: true, uses: true }, id: n$1.CentralDaylightTime, name: "Central Daylight Time", offset: i$1.UTC_MINUS_5 });
({ dst: { is: true, uses: true }, id: n$1.CentralEuropeanSummerTime, name: "Central European Summer Time", offset: i$1.UTC_PLUS_2 });
({ dst: { is: false, uses: true }, id: n$1.CentralEuropeanTime, name: "Central European Time", offset: i$1.UTC_PLUS_1 });
({ dst: { is: false, uses: true }, id: n$1.CentralIndonesiaTime, name: "Central Indonesia Time", offset: i$1.UTC_PLUS_8 });
({ dst: { is: false, uses: true }, id: n$1.CentralStandardTime, name: "Central Standard Time", offset: i$1.UTC_MINUS_6 });
({ dst: { is: false, uses: true }, id: n$1.CentralTime, name: "Central Time", offset: i$1.UTC_MINUS_5 });
({ dst: { is: false, uses: true }, id: n$1.CentralWesternStandardTime, name: "Central Western Standard Time", offset: i$1.UTC_PLUS_8_45 });
({ dst: { is: false, uses: true }, id: n$1.ChamorroStandardTime, name: "Chamorro Standard Time", offset: i$1.UTC_PLUS_10 });
({ dst: { is: true, uses: true }, id: n$1.ChathamDaylightTime, name: "Chatham Daylight Time", offset: i$1.UTC_PLUS_13_45 });
({ dst: { is: false, uses: true }, id: n$1.ChathamStandardTime, name: "Chatham Standard Time", offset: i$1.UTC_PLUS_12_45 });
({ dst: { is: false, uses: true }, id: n$1.ChileStandardTime, name: "Chile Standard Time", offset: i$1.UTC_MINUS_4 });
({ dst: { is: true, uses: true }, id: n$1.ChileSummerTime, name: "Chile Summer Time", offset: i$1.UTC_MINUS_3 });
({ dst: { is: false, uses: true }, id: n$1.ChinaStandardTime, name: "China Standard Time", offset: i$1.UTC_PLUS_8 });
({ dst: { is: false, uses: true }, id: n$1.ChoibalsanStandardTime, name: "Choibalsan Standard Time", offset: i$1.UTC_PLUS_8 });
({ dst: { is: true, uses: true }, id: n$1.ChoibalsanSummerTime, name: "Choibalsan Summer Time", offset: i$1.UTC_PLUS_9 });
({ dst: { is: false, uses: true }, id: n$1.ChristmasIslandTime, name: "Christmas Island Time", offset: i$1.UTC_PLUS_7 });
({ dst: { is: false, uses: true }, id: n$1.ChuukTime, name: "Chuuk Time", offset: i$1.UTC_PLUS_10 });
({ dst: { is: false, uses: true }, id: n$1.ClipptertonIslandStandardTime, name: "Clippterton Island Standard Time", offset: i$1.UTC_MINUS_8 });
({ dst: { is: false, uses: true }, id: n$1.CocosIslandsTime, name: "Cocos Standard Time", offset: i$1.UTC_PLUS_6_30 });
({ dst: { is: true, uses: true }, id: n$1.ColombiaSummerTime, name: "Colombia Summer Time", offset: i$1.UTC_MINUS_4 });
({ dst: { is: false, uses: true }, id: n$1.ColombiaTime, name: "Colombia Time", offset: i$1.UTC_MINUS_5 });
({ dst: { is: false, uses: true }, id: n$1.CookIslandTime, name: "Cook Island Time", offset: i$1.UTC_MINUS_10 });
({ dst: { is: false, uses: true }, id: n$1.CoordinatedUniversalTime, name: "Coordinated Universal Time", offset: i$1.UTC_0 });
({ dst: { is: true, uses: true }, id: n$1.CubaDaylightTime, name: "Cuba Daylight Time", offset: i$1.UTC_MINUS_4 });
({ dst: { is: false, uses: true }, id: n$1.CubaStandardTime, name: "Cuba Standard Time", offset: i$1.UTC_MINUS_5 });
({ dst: { is: false, uses: true }, id: n$1.DavisTime, name: "Davis Time", offset: i$1.UTC_PLUS_7 });
({ dst: { is: false, uses: true }, id: n$1.DumontDUrvilleTime, name: "Dumont D'Urville Time", offset: i$1.UTC_PLUS_10 });
({ dst: { is: false, uses: true }, id: n$1.EastAfricaTime, name: "East Africa Time", offset: i$1.UTC_PLUS_3 });
({ dst: { is: false, uses: true }, id: n$1.EasterIslandStandardTime, name: "Easter Island Standard Time", offset: i$1.UTC_MINUS_6 });
({ dst: { is: true, uses: true }, id: n$1.EasterIslandSummerTime, name: "Easter Island Summer Time", offset: i$1.UTC_MINUS_5 });
({ dst: { is: false, uses: true }, id: n$1.EasternCaribbeanTime, name: "Eastern Caribbean Time", offset: i$1.UTC_MINUS_4 });
({ dst: { is: true, uses: true }, id: n$1.EasternDaylightTime, name: "Eastern Daylight Time", offset: i$1.UTC_MINUS_4 });
({ dst: { is: true, uses: true }, id: n$1.EasternEuropeanSummerTime, name: "Eastern European Summer Time", offset: i$1.UTC_PLUS_3 });
({ dst: { is: false, uses: true }, id: n$1.EasternEuropeanTime, name: "Eastern European Time", offset: i$1.UTC_PLUS_2 });
({ dst: { is: true, uses: true }, id: n$1.EasternGreenlandSummerTime, name: "Eastern Greenland Summer Time", offset: i$1.UTC_0 });
({ dst: { is: false, uses: true }, id: n$1.EasternGreenlandTime, name: "Eastern Greenland Time", offset: i$1.UTC_MINUS_1 });
({ dst: { is: false, uses: true }, id: n$1.EasternIndonesianTime, name: "Eastern Indonesian Time", offset: i$1.UTC_PLUS_9 });
({ dst: { is: false, uses: true }, id: n$1.EasternStandardTime, name: "Eastern Standard Time", offset: i$1.UTC_MINUS_5 });
({ dst: { is: false, uses: true }, id: n$1.EasternTime, name: "Eastern Time", offset: i$1.UTC_MINUS_5 });
({ dst: { is: false, uses: true }, id: n$1.EcuadorTime, name: "Ecuador Time", offset: i$1.UTC_MINUS_5 });
({ dst: { is: true, uses: true }, id: n$1.FalklandIslandsSummerTime, name: "Falkland Islands Summer Time", offset: i$1.UTC_MINUS_3 });
({ dst: { is: false, uses: true }, id: n$1.FalklandIslandsTime, name: "Falkland Islands Time", offset: i$1.UTC_MINUS_4 });
({ dst: { is: false, uses: true }, id: n$1.FernandoDeNoronhaTime, name: "Fernando de Noronha Time", offset: i$1.UTC_MINUS_2 });
({ dst: { is: false, uses: true }, id: n$1.FijiTime, name: "Fiji Time", offset: i$1.UTC_PLUS_12 });
({ dst: { is: false, uses: true }, id: n$1.FrenchGuianaTime, name: "French Guiana Time", offset: i$1.UTC_MINUS_3 });
({ dst: { is: false, uses: true }, id: n$1.FrenchSouthernAndAntarcticTime, name: "French Southern and Antarctic Time", offset: i$1.UTC_PLUS_5 });
({ dst: { is: false, uses: true }, id: n$1.FurtherEasternEuropeanTime, name: "Further Eastern European Time", offset: i$1.UTC_PLUS_3 });
({ dst: { is: false, uses: true }, id: n$1.GalapagosTime, name: "Galapagos Time", offset: i$1.UTC_MINUS_6 });
({ dst: { is: false, uses: true }, id: n$1.GambierIslandTime, name: "Gambier Island Time", offset: i$1.UTC_MINUS_9 });
({ dst: { is: false, uses: true }, id: n$1.GambierIslandsTime, name: "Gambier Islands Time", offset: i$1.UTC_MINUS_9 });
({ dst: { is: false, uses: true }, id: n$1.GeorgiaStandardTime, name: "Georgia Standard Time", offset: i$1.UTC_PLUS_4 });
({ dst: { is: false, uses: true }, id: n$1.GilbertIslandTime, name: "Gilbert Island Time", offset: i$1.UTC_PLUS_12 });
({ dst: { is: false, uses: true }, id: n$1.GreenwichMeanTime, name: "Greenwich Mean Time", offset: i$1.UTC_0 });
({ dst: { is: false, uses: true }, id: n$1.GulfStandardTime, name: "Gulf Standard Time", offset: i$1.UTC_PLUS_4 });
({ dst: { is: false, uses: true }, id: n$1.GuyanaTime, name: "Guyana Time", offset: i$1.UTC_MINUS_4 });
({ dst: { is: true, uses: true }, id: n$1.HawaiiAleutianDaylightTime, name: "Hawaii-Aleutian Daylight Time", offset: i$1.UTC_MINUS_9 });
({ dst: { is: false, uses: true }, id: n$1.HawaiiAleutianStandardTime, name: "Hawaii-Aleutian Standard Time", offset: i$1.UTC_MINUS_10 });
({ dst: { is: false, uses: true }, id: n$1.HeardAndMcDonaldIslandsTime, name: "Heard and McDonald Islands Time", offset: i$1.UTC_PLUS_5 });
({ dst: { is: false, uses: true }, id: n$1.HongKongTime, name: "Hong Kong Time", offset: i$1.UTC_PLUS_8 });
({ dst: { is: true, uses: true }, id: n$1.HovdSummerTime, name: "Hovd Summer Time", offset: i$1.UTC_PLUS_8 });
({ dst: { is: false, uses: true }, id: n$1.HovdTime, name: "Hovd Time", offset: i$1.UTC_PLUS_7 });
({ dst: { is: false, uses: true }, id: n$1.IndianOceanTime, name: "Indian Ocean Time", offset: i$1.UTC_PLUS_3 });
({ dst: { is: false, uses: true }, id: n$1.IndianStandardTime, name: "Indian Standard Time", offset: i$1.UTC_PLUS_5_30 });
({ dst: { is: false, uses: true }, id: n$1.IndochinaTime, name: "Indochina Time", offset: i$1.UTC_PLUS_7 });
({ dst: { is: false, uses: true }, id: n$1.InternationalDayLineWestTime, name: "International Day Line West Time", offset: i$1.UTC_MINUS_12 });
({ dst: { is: true, uses: true }, id: n$1.IranDaylightTime, name: "Iran Daylight Time", offset: i$1.UTC_PLUS_4_30 });
({ dst: { is: false, uses: true }, id: n$1.IranStandardTime, name: "Iran Standard Time", offset: i$1.UTC_PLUS_3_30 });
({ dst: { is: false, uses: true }, id: n$1.IrishStandardTime, name: "Irish Standard Time", offset: i$1.UTC_PLUS_1 });
({ dst: { is: false, uses: true }, id: n$1.IrkutskTime, name: "Irkutsk Time", offset: i$1.UTC_PLUS_8 });
({ dst: { is: true, uses: true }, id: n$1.IsraelDaylightTime, name: "Israel Daylight Time", offset: i$1.UTC_PLUS_3 });
({ dst: { is: false, uses: true }, id: n$1.IsraelStandardTime, name: "Israel Standard Time", offset: i$1.UTC_PLUS_2 });
({ dst: { is: false, uses: true }, id: n$1.JapanStandardTime, name: "Japan Standard Time", offset: i$1.UTC_PLUS_9 });
({ dst: { is: false, uses: true }, id: n$1.KaliningradTime, name: "Kaliningrad Time", offset: i$1.UTC_PLUS_2 });
({ dst: { is: false, uses: true }, id: n$1.KamchatkaTime, name: "Kamchatka Time", offset: i$1.UTC_PLUS_12 });
({ dst: { is: false, uses: true }, id: n$1.KoreaStandardTime, name: "Korea Standard Time", offset: i$1.UTC_PLUS_9 });
({ dst: { is: false, uses: true }, id: n$1.KosraeTime, name: "Kosrae Time", offset: i$1.UTC_PLUS_11 });
({ dst: { is: false, uses: true }, id: n$1.KrasnoyarskTime, name: "Krasnoyarsk Time", offset: i$1.UTC_PLUS_7 });
({ dst: { is: false, uses: true }, id: n$1.KyrgyzstanTime, name: "Kyrgyzstan Time", offset: i$1.UTC_PLUS_6 });
({ dst: { is: false, uses: true }, id: n$1.LineIslandsTime, name: "Line Islands Time", offset: i$1.UTC_PLUS_14 });
({ dst: { is: false, uses: true }, id: n$1.LordHoweStandardTime, name: "Lord Howe Standard Time", offset: i$1.UTC_PLUS_10_30 });
({ dst: { is: false, uses: true }, id: n$1.LordHoweSummerTime, name: "Lord Howe Summer Time", offset: i$1.UTC_PLUS_11 });
({ dst: { is: false, uses: true }, id: n$1.MacquarieIslandStationTime, name: "Macquarie Island Station Time", offset: i$1.UTC_PLUS_11 });
({ dst: { is: false, uses: true }, id: n$1.MagadanTime, name: "Magadan Time", offset: i$1.UTC_PLUS_12 });
({ dst: { is: false, uses: true }, id: n$1.MalaysiaStandardTime, name: "Malaysia Standard Time", offset: i$1.UTC_PLUS_8 });
({ dst: { is: false, uses: true }, id: n$1.MalaysiaTime, name: "Malaysia Time", offset: i$1.UTC_PLUS_8 });
({ dst: { is: false, uses: true }, id: n$1.MaldivesTime, name: "Maldives Time", offset: i$1.UTC_PLUS_5 });
({ dst: { is: false, uses: true }, id: n$1.MarquesasIslandsTime, name: "Marquesas Islands Time", offset: i$1.UTC_PLUS_9_30 });
({ dst: { is: false, uses: true }, id: n$1.MarshallIslandsTime, name: "Marshall Islands Time", offset: i$1.UTC_PLUS_12 });
({ dst: { is: false, uses: true }, id: n$1.MauritiusTime, name: "Mauritius Time", offset: i$1.UTC_PLUS_4 });
({ dst: { is: false, uses: true }, id: n$1.MawsonStationTime, name: "Mawson Station Time", offset: i$1.UTC_PLUS_5 });
({ dst: { is: false, uses: true }, id: n$1.MiddleEuropeanSummerTime, name: "Middle European Summer Time", offset: i$1.UTC_PLUS_2 });
({ dst: { is: false, uses: true }, id: n$1.MiddleEuropeanTime, name: "Middle European Time", offset: i$1.UTC_PLUS_1 });
({ dst: { is: false, uses: true }, id: n$1.MoscowTime, name: "Moscow Time", offset: i$1.UTC_PLUS_3 });
({ dst: { is: false, uses: true }, id: n$1.MountainDaylightTime, name: "Mountain Daylight Time", offset: i$1.UTC_MINUS_6 });
({ dst: { is: false, uses: true }, id: n$1.MountainStandardTime, name: "Mountain Standard Time", offset: i$1.UTC_MINUS_7 });
({ dst: { is: false, uses: true }, id: n$1.MyanmarStandardTime, name: "Myanmar Standard Time", offset: i$1.UTC_PLUS_6_30 });
({ dst: { is: false, uses: true }, id: n$1.NepalTime, name: "Nepal Time", offset: i$1.UTC_PLUS_5_45 });
({ dst: { is: false, uses: true }, id: n$1.NauruTime, name: "Nauru Time", offset: i$1.UTC_PLUS_12 });
({ dst: { is: false, uses: true }, id: n$1.NewCaledoniaTime, name: "New Caledonia Time", offset: i$1.UTC_PLUS_11 });
({ dst: { is: false, uses: true }, id: n$1.NewZealandDaylightTime, name: "New Zealand Daylight Time", offset: i$1.UTC_PLUS_13 });
({ dst: { is: false, uses: true }, id: n$1.NewZealandStandardTime, name: "New Zealand Standard Time", offset: i$1.UTC_PLUS_12 });
({ dst: { is: false, uses: true }, id: n$1.NewfoundlandDaylightTime, name: "Newfoundland Daylight Time", offset: i$1.UTC_MINUS_2_30 });
({ dst: { is: false, uses: true }, id: n$1.NewfoundlandTime, name: "Newfoundland Time", offset: i$1.UTC_MINUS_3_30 });
({ dst: { is: false, uses: true }, id: n$1.NiueTime, name: "Niue Time", offset: i$1.UTC_MINUS_11 });
({ dst: { is: false, uses: true }, id: n$1.NorfolkIslandTime, name: "Norfolk Island Time", offset: i$1.UTC_PLUS_11 });
({ dst: { is: false, uses: true }, id: n$1.NovosibirskTime, name: "Novosibirsk Time", offset: i$1.UTC_PLUS_7 });
({ dst: { is: false, uses: true }, id: n$1.OmskTime, name: "Omsk Time", offset: i$1.UTC_PLUS_6 });
({ dst: { is: false, uses: true }, id: n$1.OralTime, name: "Oral Time", offset: i$1.UTC_PLUS_5 });
({ dst: { is: false, uses: true }, id: n$1.PacificDaylightTime, name: "Pacific Daylight Time", offset: i$1.UTC_MINUS_7 });
({ dst: { is: false, uses: true }, id: n$1.PacificStandardTime, name: "Pacific Standard Time", offset: i$1.UTC_MINUS_8 });
({ dst: { is: false, uses: true }, id: n$1.PakistanStandardTime, name: "Pakistan Standard Time", offset: i$1.UTC_PLUS_5 });
({ dst: { is: false, uses: true }, id: n$1.PalauTime, name: "Palau Time", offset: i$1.UTC_PLUS_9 });
({ dst: { is: false, uses: true }, id: n$1.PapuaNewGuineaTime, name: "Papua New Guinea Time", offset: i$1.UTC_PLUS_10 });
({ dst: { is: false, uses: true }, id: n$1.ParaguaySummerTime, name: "Paraguay Summer Time", offset: i$1.UTC_MINUS_3 });
({ dst: { is: false, uses: true }, id: n$1.ParaguayTime, name: "Paraguay Time", offset: i$1.UTC_MINUS_4 });
({ dst: { is: false, uses: true }, id: n$1.PeruTime, name: "Peru Time", offset: i$1.UTC_MINUS_5 });
({ dst: { is: false, uses: true }, id: n$1.PhilippineStandardTime, name: "Philippine Standard Time", offset: i$1.UTC_PLUS_8 });
({ dst: { is: false, uses: true }, id: n$1.PhilippineTime, name: "Philippine Time", offset: i$1.UTC_PLUS_8 });
({ dst: { is: false, uses: true }, id: n$1.PhoenixIslandTime, name: "Phoenix Island Time", offset: i$1.UTC_PLUS_13 });
({ dst: { is: false, uses: true }, id: n$1.PitcairnTime, name: "Pitcairn Time", offset: i$1.UTC_MINUS_8 });
({ dst: { is: false, uses: true }, id: n$1.PohnpeiStandardTime, name: "Pohnpei Standard Time", offset: i$1.UTC_PLUS_11 });
({ dst: { is: false, uses: true }, id: n$1.ReunionTime, name: "Reunion Time", offset: i$1.UTC_PLUS_4 });
({ dst: { is: false, uses: true }, id: n$1.RotheraResearchStationTime, name: "Rothera Research Station Time", offset: i$1.UTC_MINUS_3 });
({ dst: { is: false, uses: true }, id: n$1.SaintPierreAndMiquelonDaylightTime, name: "Saint Pierre and Miquelon Daylight Time", offset: i$1.UTC_MINUS_2 });
({ dst: { is: false, uses: true }, id: n$1.SaintPierreAndMiquelonStandardTime, name: "Saint Pierre and Miquelon Standard Time", offset: i$1.UTC_MINUS_3 });
({ dst: { is: false, uses: true }, id: n$1.SakhalinIslandTime, name: "Sakhalin Island Time", offset: i$1.UTC_PLUS_11 });
({ dst: { is: false, uses: true }, id: n$1.SamaraTime, name: "Samara Time", offset: i$1.UTC_PLUS_4 });
({ dst: { is: false, uses: true }, id: n$1.SamoaDaylightTime, name: "Samoa Daylight Time", offset: i$1.UTC_MINUS_10 });
({ dst: { is: false, uses: true }, id: n$1.SamoaStandardTime, name: "Samoa Standard Time", offset: i$1.UTC_MINUS_11 });
({ dst: { is: false, uses: true }, id: n$1.SeychellesTime, name: "Seychelles Time", offset: i$1.UTC_PLUS_4 });
({ dst: { is: false, uses: true }, id: n$1.ShowaStationTime, name: "Showa Station Time", offset: i$1.UTC_PLUS_3 });
({ dst: { is: false, uses: true }, id: n$1.SingaporeStandardTime, name: "Singapore Standard Time", offset: i$1.UTC_PLUS_8 });
({ dst: { is: false, uses: true }, id: n$1.SingaporeTime, name: "Singapore Time", offset: i$1.UTC_PLUS_8 });
({ dst: { is: false, uses: true }, id: n$1.SolomonIslandsTime, name: "Solomon Islands Time", offset: i$1.UTC_PLUS_11 });
({ dst: { is: false, uses: true }, id: n$1.SouthAfricanStandardTime, name: "South African Standard Time", offset: i$1.UTC_PLUS_2 });
({ dst: { is: false, uses: true }, id: n$1.SouthGeorgiaAndTheSouthSandwichIslandsTime, name: "South Georgia and the South Sandwich Islands Time", offset: i$1.UTC_MINUS_2 });
({ dst: { is: false, uses: true }, id: n$1.SrednekolymskTime, name: "Srednekolymsk Time", offset: i$1.UTC_PLUS_11 });
({ dst: { is: false, uses: true }, id: n$1.SriLankaStandardTime, name: "Sri Lanka Standard Time", offset: i$1.UTC_PLUS_5_30 });
({ dst: { is: false, uses: true }, id: n$1.SurinameTime, name: "Suriname Time", offset: i$1.UTC_MINUS_3 });
({ dst: { is: false, uses: true }, id: n$1.TahitiTime, name: "Tahiti Time", offset: i$1.UTC_MINUS_10 });
({ dst: { is: false, uses: true }, id: n$1.TajikistanTime, name: "Tajikistan Time", offset: i$1.UTC_PLUS_5 });
({ dst: { is: false, uses: true }, id: n$1.ThailandStandardTime, name: "Thailand Standard Time", offset: i$1.UTC_PLUS_7 });
({ dst: { is: false, uses: true }, id: n$1.TimorLesteTime, name: "Timor-Leste Time", offset: i$1.UTC_PLUS_9 });
({ dst: { is: false, uses: true }, id: n$1.TokelauTime, name: "Tokelau Time", offset: i$1.UTC_PLUS_13 });
({ dst: { is: false, uses: true }, id: n$1.TongaTime, name: "Tonga Time", offset: i$1.UTC_PLUS_13 });
({ dst: { is: false, uses: true }, id: n$1.TurkeyTime, name: "Turkey Time", offset: i$1.UTC_PLUS_3 });
({ dst: { is: false, uses: true }, id: n$1.TurkmenistanTime, name: "Turkmenistan Time", offset: i$1.UTC_PLUS_5 });
({ dst: { is: false, uses: true }, id: n$1.TuvaluTime, name: "Tuvalu Time", offset: i$1.UTC_PLUS_12 });
({ dst: { is: false, uses: true }, id: n$1.UlaanbaatarStandardTime, name: "Ulaanbaatar Standard Time", offset: i$1.UTC_PLUS_8 });
({ dst: { is: false, uses: true }, id: n$1.UlaanbaatarSummerTime, name: "Ulaanbaatar Summer Time", offset: i$1.UTC_PLUS_9 });
({ dst: { is: false, uses: true }, id: n$1.UruguayStandardTime, name: "Uruguay Standard Time", offset: i$1.UTC_MINUS_3 });
({ dst: { is: false, uses: true }, id: n$1.UruguaySummerTime, name: "Uruguay Summer Time", offset: i$1.UTC_MINUS_2 });
({ dst: { is: false, uses: true }, id: n$1.UzbekistanTime, name: "Uzbekistan Time", offset: i$1.UTC_PLUS_5 });
({ dst: { is: false, uses: true }, id: n$1.VanuatuTime, name: "Vanuatu Time", offset: i$1.UTC_PLUS_11 });
({ dst: { is: false, uses: true }, id: n$1.VenezuelaStandardTime, name: "Venezuela Standard Time", offset: i$1.UTC_MINUS_4 });
({ dst: { is: false, uses: true }, id: n$1.VladivostokTime, name: "Vladivostok Time", offset: i$1.UTC_PLUS_10 });
({ dst: { is: false, uses: true }, id: n$1.VolgogradTime, name: "Volgograd Time", offset: i$1.UTC_PLUS_4 });
({ dst: { is: false, uses: true }, id: n$1.VostokStationTime, name: "Vostok Station Time", offset: i$1.UTC_PLUS_6 });
({ dst: { is: false, uses: true }, id: n$1.WakeIslandTime, name: "Wake Island Time", offset: i$1.UTC_PLUS_12 });
({ dst: { is: false, uses: true }, id: n$1.WestAfricaSummerTime, name: "West Africa Summer Time", offset: i$1.UTC_PLUS_2 });
({ dst: { is: false, uses: true }, id: n$1.WestAfricaTime, name: "West Africa Time", offset: i$1.UTC_PLUS_1 });
({ dst: { is: false, uses: true }, id: n$1.WestGreenlandSummerTime, name: "West Greenland Summer Time", offset: i$1.UTC_MINUS_2 });
({ dst: { is: false, uses: true }, id: n$1.WestGreenlandTime, name: "West Greenland Time", offset: i$1.UTC_MINUS_3 });
({ dst: { is: false, uses: true }, id: n$1.WestKazakhstanTime, name: "West Kazakhstan Time", offset: i$1.UTC_PLUS_5 });
({ dst: { is: false, uses: true }, id: n$1.WesternEuropeanSummerTime, name: "Western European Summer Time", offset: i$1.UTC_PLUS_1 });
({ dst: { is: false, uses: true }, id: n$1.WesternEuropeanTime, name: "Western European Time", offset: i$1.UTC_0 });
({ dst: { is: false, uses: true }, id: n$1.WesternIndonesianTime, name: "Western Indonesian Time", offset: i$1.UTC_PLUS_7 });
({ dst: { is: false, uses: true }, id: n$1.WesternStandardTime, name: "Western Standard Time", offset: i$1.UTC_PLUS_8 });
({ dst: { is: false, uses: true }, id: n$1.YakutskTime, name: "Yakutsk Time", offset: i$1.UTC_PLUS_9 });
({ dst: { is: false, uses: true }, id: n$1.YekaterinburgTime, name: "Yekaterinburg Time", offset: i$1.UTC_PLUS_5 });
var I;
(function(a) {
  a.Africa = "Africa", a.Americas = "Americas", a.Asia = "Asia", a.Europe = "Europe", a.Oceania = "Oceania", a.Polar = "Polar";
})(I || (I = {}));
var x;
(function(a) {
  a.CentralAmerica = "Central America", a.EasternAsia = "Eastern Asia", a.EasternEurope = "Eastern Europe", a.EasternAfrica = "Eastern Africa", a.MiddleAfrica = "Middle Africa", a.MiddleEast = "Middle East", a.NorthernAfrica = "Northern Africa", a.NorthernAmerica = "Northern America", a.NorthernEurope = "Northern Europe", a.Polynesia = "Polynesia", a.SouthAmerica = "South America", a.SouthernAfrica = "Southern Africa", a.SouthernAsia = "Southern Asia", a.SouthernEurope = "Southern Europe", a.WesternAfrica = "Western Africa", a.WesternAsia = "Western Asia", a.WesternEurope = "Western Europe", a.WesternAustralia = "Western Australia";
})(x || (x = {}));
({ Afghanistan: { i18n: { calling_codes: [93], currencies: [l$1.AfghanistanAfghani], languages: [e.Pashto, e.Dari, e.Turkmen, e.Uzbek], tz: { offsets: [i$1.UTC_PLUS_4_30], regions: [t.AsiaKabul], timezones: [n$1.AfghanistanTime] } }, id: r.Afghanistan, info: { flag: { emoji: "\u{1F1E6}\u{1F1EB}", emoji_unicode: "U+1F1E6 U+1F1EB", svg: "https://www.countryflags.io/af/flat/64.svg" }, tld: [".af"] }, iso: { alpha2: r.Afghanistan, alpha3: "AFG", numeric: "004" }, name: { alt_spellings: ["AF", "Af\u0121\u0101nist\u0101n"], demonym: "Afghan", native: { endonym: "\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646" }, official: "Islamic Republic of Afghanistan", short: "Afghanistan", translations: { [e.Afrikaans]: "Afghanistan", [e.Albanian]: "Shqip\xEBri", [e.Amharic]: "\u12A0\u134D\u130B\u1295", [e.Arabic]: "\u0623\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646", [e.Armenian]: "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576", [e.Azerbaijani]: "Az\u0259rbaycan", [e.Bashkir]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D", [e.Basque]: "Afganist\xE1n", [e.Belarusian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D", [e.Bengali]: "\u0986\u09AB\u0997\u09BE\u09A8\u09BF\u09B8\u09CD\u09A4\u09BE\u09A8", [e.Berber]: "\u0623\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646", [e.Bhutani]: "\u0F60\u0F56\u0FB2\u0F74\u0F42\u0F0B\u0F61\u0F74\u0F63\u0F0B\u0F66\u0FA4\u0FB2\u0F7C\u0F51\u0F0B\u0F40\u0FB1\u0F72\u0F0B\u0F51\u0F7C\u0F53\u0F0B\u0F63\u0F7A\u0F0B\u0F66\u0F90\u0F51\u0F0B\u0F46\u0F0D", [e.Bosnian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D", [e.Breton]: "Afganistan", [e.Bulgarian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D", [e.Burmese]: "\u1021\u102C\u1019\u1001\u103B\u1004\u103A\u1010\u1031\u102C\u103A", [e.Catalan]: "Afganistan", [e.Chinese]: "\u963F\u5BCC\u6C57", [e.Croatian]: "Afganistan", [e.Czech]: "Afganistan", [e.Danish]: "Afghanistan", [e.Dutch]: "Afghanistan", [e.English]: "Afghanistan", [e.Esperanto]: "Afganistan", [e.Estonian]: "Afganistan", [e.Finnish]: "Afghanistan", [e.French]: "Afghanistan", [e.Frisian]: "Afghanistan", [e.Galician]: "Afganist\xE1n", [e.Georgian]: "\u10D0\u10D5\u10E6\u10D0\u10DC\u10D4\u10D7\u10D8", [e.German]: "Afghanistan", [e.Greenlandic]: "Afghanistan", [e.Greek]: "\u0391\u03C6\u03B3\u03B1\u03BD\u03B9\u03C3\u03C4\u03AC\u03BD", [e.Gujarati]: "\u0A85\u0AAB\u0A97\u0ABE\u0AA8\u0ABF\u0AB8\u0ACD\u0AA4\u0ABE\u0AA8", [e.Haitian]: "Afghanistan", [e.Hausa]: "Afghanistan", [e.Hebrew]: "\u05D0\u05E4\u05D2\u05E0\u05D9\u05E1\u05D8\u05DF", [e.Hindi]: "\u0905\u092B\u0917\u093E\u0928\u093F\u0938\u094D\u0924\u093E\u0928", [e.Hungarian]: "Afganistan", [e.Icelandic]: "Afghanistan", [e.Igbo]: "Afghanistan", [e.Indonesian]: "Afghanistan", [e.Irish]: "Afghanistan", [e.Italian]: "Afghanistan", [e.Japanese]: "\u30A2\u30D5\u30AC\u30CB\u30B9\u30BF\u30F3", [e.Javanese]: "Afghanistan", [e.Kannada]: "\u0C85\u0CAB\u0C97\u0CBE\u0CA8\u0CBF\u0CB8\u0CCD\u0CA4\u0CBE\u0CA8", [e.Kazakh]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D", [e.Khmer]: "\u17A2\u17B6\u17A0\u17D2\u179C\u17D2\u179A\u17B7\u1780", [e.Korean]: "\uC544\uD504\uAC00\uB2C8\uC2A4\uD0C4", [e.Kurdish]: "Afghanistan", [e.Kyrgyz]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D", [e.Lao]: "\u0EAD\u0EB2\u0E9F\u0EB2\u0EA5\u0EBD\u0E99", [e.Latin]: "Afghanistan", [e.Latvian]: "Afghanistan", [e.Lithuanian]: "Afganistanas", [e.Luxembourgish]: "Afghanistan", [e.Macedonian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D", [e.Malagasy]: "Afghanistan", [e.Malay]: "Afghanistan", [e.Malayalam]: "\u0D05\u0D2B\u0D17\u0D3E\u0D28\u0D3F\u0D38\u0D4D\u0D24\u0D3E\u0D28", [e.Maltese]: "Afghanistan", [e.Maori]: "Afghanistan", [e.Marathi]: "\u0905\u092B\u0917\u093E\u0928\u093F\u0938\u094D\u0924\u093E\u0928", [e.Mongolian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D", [e.Nepali]: "\u0905\u092B\u0917\u093E\u0928\u093F\u0938\u094D\u0924\u093E\u0928", [e.Norwegian]: "Afghanistan", [e.Pashto]: "\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646", [e.Persian]: "\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646", [e.Polish]: "Afganistan", [e.Portuguese]: "Afghanistan", [e.Punjabi]: "Afghanistan", [e.Romanian]: "Afghanistan", [e.Polish]: "Afganistan", [e.Russian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D", [e.Samoan]: "Afghanistan", [e.Sanskrit]: "\u0905\u092B\u0917\u093E\u0928\u093F\u0938\u094D\u0924\u093E\u0928", [e.Scots]: "Afghanistan", [e.Serbian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D", [e.Sesotho]: "Afghanistan", [e.Shona]: "Afghanistan", [e.Sindhi]: "Afghanistan", [e.Sinhala]: "\u0D86\u0D9C\u0DCA\u200D\u0DBB\u0DDC\u0D9A\u0DCA\u0D9A\u0DD2\u0DBA\u0DCF\u0DC0", [e.Slovak]: "Afganistan", [e.Slovenian]: "Afganistan", [e.Somali]: "Afghanistan", [e.Spanish]: "Afganist\xE1n", [e.Sudanese]: "Afghanistan", [e.Swahili]: "Afghanistan", [e.Swedish]: "Afghanistan", [e.Tagalog]: "Afghanistan", [e.Tajik]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D", [e.Tatar]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D", [e.Tamil]: "\u0B86\u0BAA\u0BCD\u0BAA\u0B95\u0BBE\u0BA9\u0BBF\u0BB8\u0BCD\u0BA4\u0BBE\u0BA9\u0BCD", [e.Telugu]: "\u0C06\u0C2B\u0C4D\u0C18\u0C28\u0C3F\u0C38\u0C4D\u0C24\u0C3E\u0C28\u0C4D", [e.Thai]: "\u0E2D\u0E31\u0E1F\u0E01\u0E32\u0E19\u0E34\u0E2A\u0E16\u0E32\u0E19", [e.Tibetan]: "\u0F68\u0F55\u0F0B\u0F42\u0F7A\u0F0B\u0F53\u0F72\u0F66\u0F72\u0F0B\u0F4F\u0F7A\u0F53\u0F66\u0F72\u0F0D", [e.Turkish]: "Afganistan", [e.Ukrainian]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D", [e.Urdu]: "\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646", [e.Uzbek]: "\u0410\u0444\u0433\u0430\u043D\u0438\u0441\u0442\u0430\u043D", [e.Vietnamese]: "Afghanistan", [e.Welsh]: "Afghanistan", [e.Xhosa]: "Afghanistan", [e.Yiddish]: "Afghanistan", [e.Yoruba]: "Afghanistan", [e.Zulu]: "Afghanistan" } }, statistics: { demographics: { age: { distribution: [{ age: "0 to 14 years", percentage: 15.3 }, { age: "15 to 64 years", percentage: 66.7 }, { age: "65 years and over", percentage: 14.6 }], median_age: 35.5 }, population: { largest_city: "Kabul", total: 341e5 } }, geography: { area: 652230, region: I.Asia, sub_region: x.SouthernAsia }, government: { capital: "Kabul", type: "Islamic Emirate" } } }, Albania: { i18n: { calling_codes: [355], currencies: [l$1.AlbaniaLek], languages: [e.Albanian, e.Greek, e.Turkish], tz: { offsets: [i$1.UTC_PLUS_1], regions: [t.EuropeBrussels], timezones: [n$1.CentralEuropeanTime] } }, id: r.Albania, info: { flag: { emoji: "\u{1F1E6}\u{1F1F1}", emoji_unicode: "U+1F1E6 U+1F1F1", svg: "https://www.countryflags.io/al/flat/64.svg" }, tld: [".al"] }, iso: { alpha2: r.Albania, alpha3: "ALB", numeric: "008" }, name: { alt_spellings: ["AL", "Shqip\xEBri", "Shqip\xEBria", "Shqipnia"], demonym: "Albanian", native: { endonym: "Shqip\xEBri" }, official: "Republic of Albania", short: "Albania", translations: { [e.Afrikaans]: "Albania", [e.Albanian]: "Albania", [e.Amharic]: "\u12A0\u120D\u1263\u1295\u12EB", [e.Arabic]: "\u0623\u0644\u0628\u0627\u0646\u064A\u0627", [e.Armenian]: "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576", [e.Azerbaijani]: "Az\u0259rbaycan", [e.Bashkir]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F", [e.Basque]: "Albania", [e.Belarusian]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F", [e.Bengali]: "\u0986\u09B2\u09AC\u09BE\u09A8\u09BF\u09AF\u09BC\u09BE", [e.Berber]: "\u0623\u0644\u0628\u0627\u0646\u064A\u0627", [e.Bhutani]: "\u0F60\u0F56\u0FB2\u0F74\u0F42\u0F0B\u0F61\u0F74\u0F63\u0F0B", [e.Bosnian]: "Albanija", [e.Breton]: "Albania", [e.Bulgarian]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F", [e.Burmese]: "\u1021\u102C\u1019\u1001\u103B\u1004\u103A\u1010\u1031\u102C\u103A", [e.Catalan]: "Alb\xE0nia", [e.Chinese]: "\u963F\u5C14\u5DF4\u5C3C\u4E9A", [e.Croatian]: "Albanija", [e.Czech]: "Alb\xE1nie", [e.Danish]: "Albanien", [e.Dutch]: "Albani\xEB", [e.English]: "Albania", [e.Esperanto]: "Albanio", [e.Estonian]: "Albaania", [e.Finnish]: "Albania", [e.French]: "Albanie", [e.Frisian]: "Albani\xEB", [e.Galician]: "Alb\xE2nia", [e.Georgian]: "\u10D0\u10DA\u10D1\u10D0\u10DC\u10D8\u10D0", [e.German]: "Albanien", [e.Greenlandic]: "Albania", [e.Greek]: "\u0391\u03BB\u03B2\u03B1\u03BD\u03AF\u03B1", [e.Gujarati]: "\u0A85\u0AB2\u0AAC\u0AA8\u0ABF\u0AAF\u0ABE", [e.Haitian]: "Albanais", [e.Hausa]: "Albania", [e.Hebrew]: "\u05D0\u05DC\u05D1\u05E0\u05D9\u05D4", [e.Hindi]: "\u0905\u0932\u094D\u092C\u093E\u0928\u093F\u092F\u093E", [e.Hungarian]: "Alb\xE1nia", [e.Icelandic]: "Alb\xFAnir", [e.Igbo]: "Albania", [e.Indonesian]: "Albania", [e.Irish]: "Alb\xE1in", [e.Italian]: "Albania", [e.Japanese]: "\u30A2\u30EB\u30D0\u30CB\u30A2", [e.Javanese]: "Albania", [e.Kannada]: "\u0C85\u0CB2\u0CCD\u0CAC\u0CBE\u0CA8\u0CBF\u0CAF\u0CBE", [e.Kazakh]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F", [e.Khmer]: "\u17A2\u17B6\u17A0\u17D2\u179C\u17D2\u179A\u17C1\u179F\u17CA\u17B8", [e.Korean]: "\uC54C\uBC14\uB2C8\uC544", [e.Kurdish]: "\u0622\u0644\u0628\u0627\u0646\u06CC\u0627", [e.Kyrgyz]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F", [e.Lao]: "\u0EAD\u0EB2\u0EA5\u0EB2\u0E99\u0EB5", [e.Latin]: "Albania", [e.Latvian]: "Alb\u0101nija", [e.Lithuanian]: "Albanija", [e.Luxembourgish]: "Albani\xEB", [e.Macedonian]: "\u0410\u043B\u0431\u0430\u043D\u0438\u0458\u0430", [e.Malagasy]: "Albania", [e.Malay]: "Albania", [e.Malayalam]: "\u0D05\u0D32\u0D4D\u0D2C\u0D3E\u0D28\u0D3F\u0D2F\u0D3E", [e.Maltese]: "Albania", [e.Maori]: "Albania", [e.Marathi]: "\u0905\u0932\u094D\u092C\u093E\u0928\u093F\u092F\u093E", [e.Mongolian]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F", [e.Nepali]: "\u0905\u0932\u094D\u092C\u093E\u0928\u093F\u092F\u093E", [e.Norwegian]: "Albania", [e.Pashto]: "\u0627\u0627\u0644\u0628\u0627\u0646\u06CC", [e.Persian]: "\u0622\u0644\u0628\u0627\u0646\u06CC", [e.Polish]: "Albania", [e.Portuguese]: "Alb\xE2nia", [e.Punjabi]: "\u0A05\u0A32\u0A2C\u0A28\u0A40\u0A06", [e.Romanian]: "Alb\u0103n", [e.Russian]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F", [e.Samoan]: "Albania", [e.Sanskrit]: "Albani", [e.Scots]: "Alb\xE0inia", [e.Serbian]: "\u0410\u043B\u0431\u0430\u043D\u0438\u0458\u0430", [e.Sesotho]: "Albania", [e.Shona]: "Albania", [e.Sindhi]: "Albania", [e.Sinhala]: "\u0D87\u0DBD\u0DCA\u0DB6\u0DCF\u0DB1\u0DD2\u0DBA", [e.Slovak]: "Alb\xE1nsko", [e.Slovenian]: "Albanija", [e.Somali]: "Albania", [e.Spanish]: "Albania", [e.Sudanese]: "Albania", [e.Swahili]: "Albania", [e.Swedish]: "Albanien", [e.Tagalog]: "Albania", [e.Tajik]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F", [e.Tamil]: "\u0B85\u0BB2\u0BCD\u0BAA\u0BBE\u0BA9\u0BBF\u0BAF\u0BBE", [e.Tatar]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F", [e.Telugu]: "\u0C05\u0C32\u0C4D\u0C2C\u0C3E\u0C28\u0C3F\u0C2F\u0C3E", [e.Thai]: "\u0E2D\u0E31\u0E25\u0E41\u0E1A\u0E19\u0E34\u0E19\u0E35", [e.Tibetan]: "\u0F68\u0F63\u0F0B\u0F56\u0F72\u0F0B\u0F53\u0F72\u0F0B\u0F61\u0F72", [e.Turkish]: "Albaniye", [e.Ukrainian]: "\u0410\u043B\u0431\u0430\u043D\u0456\u044F", [e.Urdu]: "\u0622\u0644\u0628\u0627\u0646\u06CC", [e.Uzbek]: "\u0410\u043B\u0431\u0430\u043D\u0438\u044F", [e.Vietnamese]: "Albanie", [e.Welsh]: "Albania", [e.Xhosa]: "Albania", [e.Yiddish]: "\u05D0\u05DC\u05D1\u05E0\u05D9\u05E9", [e.Yoruba]: "Albania", [e.Zulu]: "Albania" } }, statistics: { demographics: { age: { distribution: [{ age: "0 to 14 years", percentage: 15.3 }, { age: "15 to 64 years", percentage: 66.7 }, { age: "65 years and over", percentage: 14.6 }], median_age: 35.5 }, population: { largest_city: "Tirana", total: 2853e3 } }, geography: { area: 28748, region: I.Europe, sub_region: x.SouthernEurope }, government: { capital: "Tirana", type: "Republic" } } }, Algeria: { i18n: { calling_codes: [213], currencies: [l$1.AlgeriaDinar], languages: [e.Arabic, e.French, e.Berber, e.Tamazight], tz: { offsets: [i$1.UTC_PLUS_1, i$1.UTC_PLUS_2], regions: [t.AfricaAlgiers], timezones: [n$1.CentralEuropeanTime] } }, id: r.Algeria, info: { flag: { emoji: "\u{1F1E9}\u{1F1FF}", emoji_unicode: "U+1F1E9 U+1F1FF", svg: "https://www.countryflags.io/dz/flat/64.svg" }, tld: [".dz", ".\u062C\u0632\u0627\u0626\u0631"] }, iso: { alpha2: r.Algeria, alpha3: "DZA", numeric: "012" }, name: { alt_spellings: ["DZ", "Dzayer", "Alg\xE9rie"], demonym: "Algerian", native: { endonym: "\u0627\u0644\u062C\u0632\u0627\u0626\u0631" }, official: "People's Democratic Republic of Algeria", short: "Algeria", translations: { [e.Afrikaans]: "Algerije", [e.Albanian]: "Algeria", [e.Amharic]: "\u12A0\u120D\u1300\u122D\u1235", [e.Arabic]: "\u0627\u0644\u062C\u0632\u0627\u0626\u0631", [e.Armenian]: "\u0531\u056C\u0563\u0578\u0580\u056B\u0561", [e.Azerbaijani]: "Az\u0259rbaycan", [e.Bashkir]: "\u0410\u043B\u0436\u0438\u0440", [e.Basque]: "Algeria", [e.Belarusian]: "\u0410\u043B\u0436\u0438\u0440", [e.Bengali]: "\u0986\u09B2\u099C\u09C7\u09B0", [e.Berber]: "\u062C\u0632\u0627\u0626\u0631", [e.Bhutani]: "\u0F62\u0FAB\u0F7C\u0F44\u0F0B\u0F41", [e.Bosnian]: "Al\u017Eir", [e.Breton]: "Algeria", [e.Bulgarian]: "\u0410\u043B\u0436\u0438\u0440", [e.Burmese]: "\u1021\u102C\u101B\u1015\u103A", [e.Catalan]: "Alg\xE8ria", [e.Chinese]: "\u963F\u5C14\u53CA\u5229\u4E9A", [e.Croatian]: "Al\u017Eir", [e.Czech]: "Al\u017E\xEDrsko", [e.Danish]: "Algeriet", [e.Dutch]: "Algerije", [e.English]: "Algeria", [e.Esperanto]: "Al\u011Derio", [e.Estonian]: "Al\u017Eira", [e.Finnish]: "Algeria", [e.French]: "Alg\xE9rie", [e.Frisian]: "Algeri\xEB", [e.Galician]: "Alxeria", [e.Georgian]: "\u10D0\u10DA\u10D2\u10D8\u10E3\u10E0\u10D8", [e.German]: "Algerien", [e.Greenlandic]: "Algeria", [e.Greek]: "\u0391\u03BB\u03B3\u03B5\u03C1\u03AF\u03B1", [e.Gujarati]: "\u0A86\u0AB2\u0AC7\u0A97\u0AB0\u0ABF\u0AAF\u0ABE", [e.Haitian]: "Alg\xE9rie", [e.Hausa]: "Algeria", [e.Hebrew]: "\u05D0\u05DC\u05D2\u05F3\u05D9\u05E8\u05D9\u05D4", [e.Hindi]: "\u0906\u0932\u094D\u0917\u0947\u0930\u093F\u092F\u093E", [e.Hungarian]: "Alg\xE1r", [e.Icelandic]: "Alg\xFAra", [e.Igbo]: "Algeria", [e.Indonesian]: "Aljir", [e.Irish]: "Alg\xE9rie", [e.Italian]: "Algeria", [e.Japanese]: "\u30A2\u30EB\u30B8\u30A7\u30EA\u30A2", [e.Javanese]: "Aljir", [e.Kannada]: "\u0C86\u0CB2\u0CCD\u0C97\u0CC7\u0CB0\u0CBF\u0CAF\u0CA8\u0CCD", [e.Kazakh]: "\u0410\u043B\u0436\u0438\u0440", [e.Khmer]: "\u17A2\u17B6\u179B\u17CB\u1794\u17B6\u1793\u17B8", [e.Korean]: "\uC54C\uC81C\uB9AC", [e.Kurdish]: "\u062C\u0632\u0627\u06CC\u0631 \u0627\u0644\u062C\u0632\u0627\u06CC\u0631", [e.Kyrgyz]: "\u0410\u043B\u0436\u0438\u0440", [e.Lao]: "\u0EAD\u0EB2\u0EA5\u0EB2\u0E88\u0EB5\u0E99", [e.Latin]: "Algeria", [e.Latvian]: "Al\u017E\u012Brija", [e.Lithuanian]: "Al\u017Eyras", [e.Luxembourgish]: "Algeria", [e.Macedonian]: "\u0410\u043B\u0436\u0438\u0440", [e.Malagasy]: "Alg\xE9rie", [e.Malay]: "Aljir", [e.Malayalam]: "\u0D06\u0D32\u0D02\u0D17\u0D47\u0D30\u0D3F\u0D2F\u0D7B", [e.Maltese]: "Alg\xE9rie", [e.Maori]: "Algeria", [e.Marathi]: "\u0906\u0932\u094D\u0917\u0947\u0930\u093F\u092F\u093E", [e.Mongolian]: "\u0410\u043B\u0436\u0438\u0440", [e.Nepali]: "\u0906\u0932\u094D\u0917\u0947\u0930\u093F\u092F\u093E", [e.Norwegian]: "Algeria", [e.Pashto]: "\u0627\u0644\u062C\u0632\u0627\u0626\u0631", [e.Persian]: "\u062C\u0632\u0627\u06CC\u0631 \u0627\u0644\u0639\u0631\u0628", [e.Polish]: "Algieria", [e.Portuguese]: "Alg\xE9ria", [e.Punjabi]: "\u0A06\u0A32\u0A47\u0A17\u0A40\u0A06", [e.Romanian]: "Algeria", [e.Russian]: "\u0410\u043B\u0436\u0438\u0440", [e.Samoan]: "Algeria", [e.Sanskrit]: "\u0906\u0932\u094D\u0917\u0947\u0930\u093F\u092F\u093E", [e.Scots]: "Algeria", [e.Serbian]: "\u0410\u043B\u0436\u0438\u0440", [e.Sesotho]: "Algeria", [e.Shona]: "Algeria", [e.Sindhi]: "Algeria", [e.Sinhala]: "\u0D86\u0DBD\u0DCA\u0DB6\u0DCF\u0DB1\u0DD2\u0DBA", [e.Slovak]: "Al\u017E\xEDrsko", [e.Slovenian]: "Al\u017Eir", [e.Somali]: "Algeria", [e.Spanish]: "Algeria", [e.Sudanese]: "Aljir", [e.Swahili]: "Aljir", [e.Swedish]: "Algeriet", [e.Tagalog]: "Algeria", [e.Tajik]: "\u0410\u043B\u0436\u0438\u0440", [e.Tamil]: "\u0B86\u0BB2\u0BCD\u0B95\u0BC7\u0BB0\u0BBF\u0BAF\u0BBE", [e.Tatar]: "\u0410\u043B\u0436\u0438\u0440", [e.Telugu]: "\u0C06\u0C32\u0C4D\u0C17\u0C47\u0C30\u0C3F\u0C2F\u0C3E", [e.Thai]: "\u0E2D\u0E32\u0E23\u0E32\u0E01\u0E2D\u0E19", [e.Tibetan]: "\u0F68\u0F63\u0F9F\u0F72\u0F0B\u0F62\u0F72\u0F0B\u0F61\u0F72", [e.Turkish]: "Cezayir", [e.Ukrainian]: "\u0410\u043B\u0436\u0438\u0440", [e.Urdu]: "\u0622\u0644\u062C\u06CC\u0631", [e.Uzbek]: "\u0410\u043B\u0436\u0438\u0440", [e.Vietnamese]: "\u1EA2\u0301\u1EA1\u1EA3\u1EAD\u1EB5", [e.Welsh]: "Algeria", [e.Xhosa]: "Algeria", [e.Yiddish]: "\u05D0\u05DC\u05D2\u05F3\u05D9\u05E8\u05D9\u05D4", [e.Yoruba]: "Algeria", [e.Zulu]: "Algeria" } }, statistics: { demographics: { age: { distribution: [{ age: "0 to 14 years", percentage: 15.3 }, { age: "15 to 64 years", percentage: 66.7 }, { age: "65 years and over", percentage: 14.6 }], median_age: 35.5 }, population: { largest_city: "Oran", total: 371e5 } }, geography: { area: 2381740, region: I.Africa, sub_region: x.NorthernAfrica }, government: { capital: "Algiers", type: "Republic" } } }, AmericanSamoa: { i18n: { calling_codes: [1684], currencies: [l$1.AmericanSamoaTala], languages: [e.English, e.Samoan], tz: { offsets: [i$1.UTC_MINUS_11], regions: [t.PacificSamoa], timezones: [n$1.SamoaStandardTime] } }, id: r.AmericanSamoa, info: { flag: { emoji: "\u{1F1E6}\u{1F1F8}", emoji_unicode: "U+1F1E6 U+1F1F8", svg: "https://www.countryflags.io/as/flat/64.svg" }, tld: [".as"] }, iso: { alpha2: r.AmericanSamoa, alpha3: "ASM", numeric: "016" }, name: { alt_spellings: ["AS", "Amerika S\u0101moa", "Amelika S\u0101moa", "S\u0101moa Amelika"], demonym: "American Samoan", native: { endonym: "American Samoa" }, official: "American Samoa", short: "American Samoa", translations: { [e.Afrikaans]: "Amerikaans Samoa", [e.Albanian]: "Samoa Amerikane", [e.Amharic]: "\u1233\u121E\u12A0\u122D", [e.Arabic]: "\u0633\u0627\u0645\u0648\u0627 \u0627\u0644\u0623\u0645\u0631\u064A\u0643\u064A\u0629", [e.Armenian]: "\u054D\u0561\u0570\u0561\u0574\u0561\u056C\u056B\u0561", [e.Azerbaijani]: "Samoa Amerikana", [e.Bashkir]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438 \u0421\u0430\u043C\u043E\u0430", [e.Basque]: "Samoa Amerikana", [e.Belarusian]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0430\u044F \u0421\u0430\u043C\u043E\u0430", [e.Bengali]: "\u0986\u09AE\u09C7\u09B0\u09BF\u0995\u09BE\u09A8 \u09B8\u09BE\u09AE\u09CB\u09AF\u09BC\u09BE", [e.Berber]: "\u062C\u0632\u0631 \u0633\u0627\u0645\u0648\u0627 \u0627\u0644\u0623\u0645\u0631\u064A\u0643\u064A\u0629", [e.Bhutani]: "\u0F68\u0F62\u0F92\u0FB1\u0F0B\u0F58\u0F72\u0F0B\u0F51\u0F58\u0F44\u0F66\u0F0B\u0F66\u0FA4\u0FB2\u0F7C\u0F51\u0F0B\u0F40\u0FB1\u0F72\u0F0B\u0F66\u0F90\u0F56\u0F66\u0F0B\u0F62\u0F92\u0FB1\u0F74\u0F51\u0F0B\u0F46\u0F7A\u0F53\u0F0B\u0F54\u0F7C\u0F0D", [e.Bosnian]: "Ameri\u010Dka Samoa", [e.Breton]: "Samoa Amerikan", [e.Bulgarian]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0430 \u0421\u0430\u043C\u043E\u0430", [e.Burmese]: "\u1021\u1019\u1039\u1038\u1019\u101B\u102D\u102F\u1018\u102C\u101E\u102C", [e.Catalan]: "Samoa Americana", [e.Chinese]: "\u7F8E\u5C5E\u8428\u6469\u4E9A", [e.Croatian]: "Ameri\u010Dka Samoa", [e.Czech]: "Americk\xE1 Samoa", [e.Danish]: "Amerikansk Samoa", [e.Dutch]: "Amerikaans Samoa", [e.English]: "American Samoa", [e.Esperanto]: "Samoa Amerika", [e.Estonian]: "Ameerika Samoa", [e.Finnish]: "Amerikka Samoa", [e.French]: "American Samoa", [e.Frisian]: "Amerikaans Samoa", [e.Galician]: "Samoa Americana", [e.Georgian]: "\u10D0\u10DB\u10D4\u10E0\u10D8\u10D9\u10D8\u10E1 \u10E1\u10D0\u10DB\u10DD\u10D0", [e.German]: "Amerikanisch-Samoa", [e.Greenlandic]: "Amerikaans Samoa", [e.Greek]: "\u0391\u03BC\u03B5\u03C1\u03B9\u03BA\u03B1\u03BD\u03B9\u03BA\u03AE \u03A3\u03B1\u03BC\u03CC\u03B1", [e.Gujarati]: "\u0A86\u0AAE\u0AC7\u0AB0\u0ABF\u0A95\u0AA8 \u0AB8\u0ABE\u0AAE\u0ACB\u0AAF\u0ABE", [e.Haitian]: "Amerikaans Samoa", [e.Hausa]: "Amerikaans Samoa", [e.Hebrew]: "\u05D0\u05DE\u05E8\u05D9\u05E7\u05E0\u05D9\u05D4 \u05E1\u05DE\u05D5\u05D0\u05D4", [e.Hindi]: "\u0905\u092E\u0947\u0930\u093F\u0915\u093E \u0938\u092E\u094B\u0906", [e.Hungarian]: "Amerikai Szamoa", [e.Icelandic]: "Amerikai Szamoa", [e.Igbo]: "Ikina Amerika", [e.Indonesian]: "Samoa Amerika", [e.Irish]: "Samoa Amerikana", [e.Italian]: "Samoa Americane", [e.Japanese]: "\u30A2\u30E1\u30EA\u30AB\u9818\u30B5\u30E2\u30A2", [e.Javanese]: "Samoa Amerika", [e.Kannada]: "\u0C85\u0CAE\u0CC7\u0CB0\u0CBF\u0C95\u0CA8\u0CCD \u0CB8\u0CAE\u0CCB\u0C86", [e.Kazakh]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438\u0439 \u0421\u0430\u043C\u043E\u0430", [e.Khmer]: "\u17A2\u17B6\u1798\u17C9\u17B6\u179A\u17B8\u179F\u17D2\u178F\u1784\u17CB", [e.Korean]: "\uC544\uBA54\uB9AC\uCE74 \uC0AC\uBAA8\uC544", [e.Kurdish]: "Amerikaans Samoa", [e.Kyrgyz]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438\u0439 \u0421\u0430\u043C\u043E\u0430", [e.Lao]: "\u0EAD\u0EB2\u0EA1\u0EB2\u0E99\u0EB2\u0E94\u0EB2\u0EA1\u0EB2\u0E99\u0EB2\u0E94", [e.Latin]: "Samoa Amerikana", [e.Latvian]: "Amerikas Samoa", [e.Lithuanian]: "Amerikos Samoa", [e.Luxembourgish]: "Amerikaans Samoa", [e.Macedonian]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0430 \u0421\u0430\u043C\u043E\u0430", [e.Malagasy]: "Samoa Amerika", [e.Malay]: "Amerika Samo", [e.Malayalam]: "\u0D05\u0D2E\u0D47\u0D30\u0D3F\u0D15\u0D4D\u0D15\u0D28\u0D4D\u0D31\u0D4D \u0D38\u0D2E\u0D4B\u0D06", [e.Maltese]: "Samoa Amerika", [e.Maori]: "Samoa Amerika", [e.Marathi]: "\u0905\u092E\u0947\u0930\u093F\u0915\u093E \u0938\u092E\u094B\u0906", [e.Mongolian]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438\u0439 \u0421\u0430\u043C\u043E\u0430", [e.Nepali]: "\u0905\u092E\u0947\u0930\u093F\u0915\u093E \u0938\u092E\u094B\u0906", [e.Norwegian]: "Amerikansk Samoa", [e.Pashto]: "\u0627\u0645\u0631\u06CC\u06A9\u0627\u06CC \u0633\u0645\u0648\u0627", [e.Persian]: "\u0622\u0645\u0631\u06CC\u06A9\u0627\u06CC \u0633\u0645\u0648\u0627", [e.Polish]: "Samoa Ameryka\u0144skie", [e.Portuguese]: "Samoa Americana", [e.Punjabi]: "\u0A05\u0A2E\u0A30\u0A40\u0A15\u0A40 \u0A38\u0A3E\u0A2E\u0A4B\u0A06", [e.Romanian]: "Samoa americane", [e.Russian]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0430\u044F \u0421\u0430\u043C\u043E\u0430", [e.Samoan]: "Samoa Amerika", [e.Sanskrit]: "\u0905\u092E\u0947\u0930\u093F\u0915\u093E \u0938\u092E\u094B\u0906", [e.Scots]: "Amerikaans Samoa", [e.Serbian]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0430 \u0421\u0430\u043C\u043E\u0430", [e.Sesotho]: "Amerikaans Samoa", [e.Shona]: "Amerikaans Samoa", [e.Sindhi]: "Amerikaans Samoa", [e.Sinhala]: "\u0D86\u0DBB\u0DCA\u0DA2\u0DD2\u0DB1\u0DCF\u0DB1\u0DD4 \u0DC3\u0DD0\u0DB8\u0DD0\u0DBD\u0DCA\u0DC0", [e.Slovak]: "Amerikaans Samoa", [e.Slovenian]: "Amerikaans Samoa", [e.Somali]: "Amerikaans Samoa", [e.Spanish]: "Samoa Americana", [e.Sudanese]: "Amerikaans Samoa", [e.Swahili]: "Amerikaans Samoa", [e.Swedish]: "Amerikansk Samoa", [e.Tagalog]: "Amerikaans Samoa", [e.Tajik]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438 \u0441\u0430\u043C\u043E\u0430", [e.Tamil]: "\u0B85\u0BAE\u0BC6\u0BB0\u0BBF\u0B95\u0BCD \u0B9A\u0BAE\u0BCB\u0BB5\u0BBE", [e.Tatar]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438 \u0441\u0430\u043C\u043E\u0430", [e.Telugu]: "\u0C05\u0C2E\u0C46\u0C30\u0C3F\u0C15\u0C4D \u0C38\u0C2E\u0C4B\u0C35\u0C3E", [e.Thai]: "\u0E2A\u0E2B\u0E23\u0E32\u0E0A\u0E2D\u0E32\u0E13\u0E32\u0E08\u0E31\u0E01\u0E23\u0E41\u0E2D\u0E1F\u0E23\u0E34\u0E01\u0E32", [e.Tibetan]: "\u0F68\u0F7A\u0F0B\u0F62\u0F72\u0F0B\u0F40\u0F0B\u0F68\u0F7A\u0F0B\u0F58\u0F72\u0F0B\u0F51\u0F74\u0F0B\u0F61\u0F72\u0F0B\u0F62\u0F72\u0F0B\u0F40", [e.Turkish]: "Amerikan Samoas\u0131", [e.Ukrainian]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u044C\u043A\u0430 \u0421\u0430\u043C\u043E\u0430", [e.Urdu]: "\u0627\u0645\u0631\u06CC\u06A9\u06CC \u0633\u0645\u0648\u0627", [e.Uzbek]: "\u0410\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438 \u0441\u0430\u043C\u043E\u0430", [e.Vietnamese]: "Amerikaans Samoa", [e.Welsh]: "Amerikaans Samoa", [e.Xhosa]: "Amerikaans Samoa", [e.Yiddish]: "Amerikaans Samoa", [e.Yoruba]: "Amerikaans Samoa", [e.Zulu]: "Amerikaans Samoa" } }, statistics: { demographics: { age: { distribution: [{ age: "0 to 14 years", percentage: 15.3 }, { age: "15 to 64 years", percentage: 66.7 }, { age: "65 years and over", percentage: 14.6 }], median_age: 35.5 }, population: { largest_city: "Pago Pago", total: 558e3 } }, geography: { area: 199, region: I.Oceania, sub_region: x.Polynesia }, government: { capital: "Pago Pago", type: "Nonmetropolitan Territory of the US" } } }, Andorra: { i18n: { calling_codes: [376], currencies: [l$1.Euro], languages: [e.Catalan, e.Spanish], tz: { offsets: [i$1.UTC_PLUS_1, i$1.UTC_PLUS_2], regions: [t.EuropeAndorra], timezones: [n$1.CentralEuropeanTime] } }, id: r.Andorra, info: { flag: { emoji: "\u{1F1E6}\u{1F1F4}", emoji_unicode: "U+1F1E6 U+1F1F4", svg: "https://www.countryflags.io/ad/flat/64.svg" }, tld: [".ad"] }, iso: { alpha2: r.Andorra, alpha3: "AND", numeric: "020" }, name: { alt_spellings: ["AD", "Principality of Andorra", "Principat d'Andorra"], demonym: "Andorran", native: { endonym: "Andorra" }, official: "Principality of Andorra", short: "Andorra", translations: { [e.Afrikaans]: "Andorra", [e.Albanian]: "Andorra", [e.Amharic]: "\u12A0\u1295\u12F6\u122B", [e.Arabic]: "\u0623\u0646\u062F\u0648\u0631\u0627", [e.Armenian]: "\u0540\u0561\u0576\u0564\u0561\u0580\u0561\u057E\u0561\u0575\u0584", [e.Azerbaijani]: "Andorra", [e.Bashkir]: "\u0410\u043D\u0434\u043E\u0440\u0430", [e.Basque]: "Andorra", [e.Belarusian]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430", [e.Bengali]: "\u0985\u09A8\u09CD\u09A1\u09CB\u09B0\u09BE", [e.Berber]: "\u0623\u0646\u062F\u0648\u0631\u0627", [e.Bhutani]: "\u0F68\u0F53\u0F0B\u0F4C\u0F7C\u0F0B", [e.Bosnian]: "Andora", [e.Breton]: "Andorra", [e.Bulgarian]: "\u0410\u043D\u0434\u043E\u0440\u0430", [e.Burmese]: "\u1021\u1014\u1039\u1010\u102C\u101B\u102D\u102F\u1038", [e.Catalan]: "Andorra", [e.Chinese]: "\u5B89\u9053\u5C14", [e.Croatian]: "Andora", [e.Czech]: "Andorra", [e.Danish]: "Andorra", [e.Dutch]: "Andorra", [e.English]: "Andorra", [e.Esperanto]: "Andora", [e.Estonian]: "Andorra", [e.Finnish]: "Andorra", [e.French]: "Andorra", [e.Frisian]: "Andorra", [e.Galician]: "Andorra", [e.Georgian]: "\u12A0\u1295\u12F6\u122B", [e.German]: "Andorra", [e.Greek]: "\u0391\u03BD\u03B4\u03CC\u03C1\u03B1", [e.Hebrew]: "\u05D0\u05E0\u05D3\u05D5\u05E8\u05D4", [e.Hindi]: "\u0905\u0902\u0921\u094B\u0930\u093E", [e.Hungarian]: "Andorra", [e.Icelandic]: "Andorra", [e.Igbo]: "Andorra", [e.Indonesian]: "Andorra", [e.Irish]: "Andorra", [e.Italian]: "Andorra", [e.Japanese]: "\u30A2\u30F3\u30C9\u30E9", [e.Javanese]: "Andorra", [e.Kannada]: "\u0C85\u0C82\u0CA1\u0CCB\u0CB0\u0CBF\u0CAF\u0CA8\u0CCD", [e.Kazakh]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430", [e.Khmer]: "\u17A2\u1784\u17CB\u178A\u17B6\u179A\u17B6", [e.Korean]: "\uC548\uB3C4\uB77C", [e.Kurdish]: "Andorra", [e.Kyrgyz]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430", [e.Lao]: "\u0EAD\u0EB1\u0E99\u0EC2\u0E94\u0EA3\u0EB2", [e.Latin]: "Andorra", [e.Latvian]: "Andora", [e.Lithuanian]: "Andora", [e.Luxembourgish]: "Andorra", [e.Macedonian]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430", [e.Malagasy]: "Andorra", [e.Malay]: "Andorra", [e.Malayalam]: "\u0D05\u0D02\u0D21\u0D4B\u0D30\u0D3F\u0D2F\u0D28\u0D4D", [e.Maltese]: "Andorra", [e.Maori]: "Andorra", [e.Marathi]: "\u0905\u0902\u0921\u094B\u0930\u093E", [e.Mongolian]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430", [e.Nepali]: "\u0905\u0902\u0921\u094B\u0930\u093E", [e.Norwegian]: "Andorra", [e.Pashto]: "\u0622\u0646\u062F\u0648\u0631\u0627", [e.Persian]: "\u0622\u0646\u062F\u0648\u0631\u0627", [e.Polish]: "Andora", [e.Portuguese]: "Andorra", [e.Punjabi]: "\u0A05\u0A70\u0A21\u0A4B\u0A30\u0A3E", [e.Romanian]: "Andorra", [e.Russian]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430", [e.Samoan]: "Andorra", [e.Sanskrit]: "\u0905\u0902\u0921\u094B\u0930\u093E", [e.Scots]: "Andorra", [e.Serbian]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430", [e.Sesotho]: "Andorra", [e.Shona]: "Andorra", [e.Sindhi]: "\u0905\u0902\u0921\u094B\u0930\u093E", [e.Sinhala]: "\u0D86\u0DB1\u0DCA\u0DAF\u0DDA", [e.Slovak]: "Andorra", [e.Slovenian]: "Andora", [e.Somali]: "Andorra", [e.Spanish]: "Andorra", [e.Sudanese]: "Andorra", [e.Swahili]: "Andorra", [e.Swedish]: "Andorra", [e.Tagalog]: "Andorra", [e.Tajik]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430", [e.Tamil]: "\u0B85\u0BA9\u0BCB\u0BB0\u0BCD\u0B9F\u0BBE", [e.Tatar]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430", [e.Telugu]: "\u0C05\u0C02\u0C21\u0C4B\u0C30\u0C4D\u0C30\u0C3E", [e.Thai]: "\u0E2D\u0E31\u0E19\u0E14\u0E2D\u0E23\u0E4C\u0E23\u0E32", [e.Tibetan]: "\u0F68\u0F53\u0F0B\u0F4C\u0F7C\u0F0B", [e.Turkish]: "Andora", [e.Ukrainian]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430", [e.Urdu]: "\u0622\u0646\u062F\u0648\u0631\u0627", [e.Uzbek]: "\u0410\u043D\u0434\u043E\u0440\u0440\u0430", [e.Vietnamese]: "Andorra", [e.Welsh]: "Andorra", [e.Xhosa]: "Andorra", [e.Yiddish]: "\u05D0\u05E0\u05D3\u05D5\u05E8\u05D4", [e.Yoruba]: "Andorra", [e.Zulu]: "Andorra" } }, statistics: { demographics: { age: { distribution: [{ age: "0 to 14 years", percentage: 15.3 }, { age: "15 to 64 years", percentage: 66.7 }, { age: "65 years and over", percentage: 14.6 }], median_age: 35.5 }, population: { largest_city: "Andorra la Vella", total: 78e3 } }, geography: { area: 468, region: I.Europe, sub_region: x.SouthernEurope }, government: { capital: "Andorra la Vella", type: "Constitutional Monarchy" } } }, Angola: { i18n: { calling_codes: [244], currencies: [l$1.AngolaKwanza], languages: [e.Portuguese, e.Spanish, e.French, e.Italian, e.German, e.English], tz: { offsets: [i$1.UTC_0, i$1.UTC_PLUS_1, i$1.UTC_PLUS_2], regions: [t.AfricaLuanda], timezones: [n$1.WestAfricaTime] } }, id: r.Angola, info: { flag: { emoji: "\u{1F1E6}\u{1F1EC}", emoji_unicode: "U+1F1E6 U+1F1EC", svg: "https://www.countryflags.io/ao/flat/64.svg" }, tld: [".ao"] }, iso: { alpha2: r.Angola, alpha3: "AGO", numeric: "024" }, name: { alt_spellings: ["AO", "Rep\xFAblica de Angola", "\u0281\u025Bpublika de an"], demonym: "Angolan", native: { endonym: "Angola" }, official: "Republic of Angola", short: "Angola", translations: { [e.Afrikaans]: "Angola", [e.Albanian]: "Ang\xF2la", [e.Amharic]: "\u12A0\u1295\u130E\u120A\u12EB", [e.Arabic]: "\u0623\u0646\u063A\u0648\u0644\u0627", [e.Armenian]: "\u0540\u0561\u0576\u0563\u0561\u056C\u0561\u056F\u0561", [e.Azerbaijani]: "Ang\u0259l", [e.Bashkir]: "\u0410\u043D\u0433\u043E\u043B\u0430", [e.Basque]: "Angola", [e.Belarusian]: "\u0410\u043D\u0433\u043E\u043B\u0430", [e.Bengali]: "\u0985\u0999\u09CD\u0997\u09B2\u09BE", [e.Berber]: "Angola", [e.Bhutani]: "\u0F60\u0F56\u0FB2\u0F74\u0F42", [e.Bosnian]: "Angola", [e.Breton]: "Angola", [e.Bulgarian]: "\u0410\u043D\u0433\u043E\u043B\u0430", [e.Burmese]: "\u1021\u1004\u103A\u1039\u1002\u101C\u102D\u1010\u103A", [e.Catalan]: "Angola", [e.Chinese]: "\u5B89\u54E5\u62C9", [e.Croatian]: "Angola", [e.Czech]: "Angola", [e.Danish]: "Angola", [e.Dutch]: "Angola", [e.English]: "Angola", [e.Esperanto]: "Angolo", [e.Estonian]: "Angola", [e.Finnish]: "Angola", [e.French]: "Angola", [e.Frisian]: "Angola", [e.Galician]: "Angola", [e.Georgian]: "\u10D0\u10DC\u10D2\u10DD\u10DA\u10D0", [e.German]: "Angola", [e.Greenlandic]: "Angola", [e.Greek]: "\u0391\u03B3\u03BA\u03CC\u03BB\u03B1", [e.Gujarati]: "\u0A85\u0A82\u0A97\u0ACB\u0AB2\u0ABE", [e.Haitian]: "Angola", [e.Hausa]: "Angola", [e.Hebrew]: "\u05D0\u05E0\u05D2\u05D5\u05DC\u05D4", [e.Hindi]: "\u0905\u0919\u094D\u0917\u094B\u0932\u093E", [e.Hungarian]: "Angola", [e.Icelandic]: "Angola", [e.Igbo]: "Angola", [e.Indonesian]: "Angola", [e.Irish]: "Angola", [e.Italian]: "Angola", [e.Japanese]: "\u30A2\u30F3\u30B4\u30E9", [e.Javanese]: "Anggol", [e.Kannada]: "\u0C85\u0C82\u0C97\u0CCB\u0CB2\u0CBE", [e.Kazakh]: "\u0410\u043D\u0433\u043E\u043B\u0430", [e.Khmer]: "\u17A2\u1784\u17CB\u1780\u17B6\u179B\u17A2\u1784\u17CB\u1782\u17D2\u179B\u17C1\u179F", [e.Korean]: "\uC559\uACE8\uB77C", [e.Kurdish]: "Angola", [e.Kyrgyz]: "\u0410\u043D\u0433\u043E\u043B\u0430", [e.Lao]: "\u0EAD\u0EB0\u0E99\u0EB2\u0E94\u0EB2", [e.Latin]: "Angola", [e.Latvian]: "Angola", [e.Lithuanian]: "Angola", [e.Luxembourgish]: "Angola", [e.Macedonian]: "\u0410\u043D\u0433\u043E\u043B\u0430", [e.Malagasy]: "Angola", [e.Malay]: "Angola", [e.Malayalam]: "\u0D05\u0D02\u0D17\u0D4B\u0D33\u0D3E", [e.Maltese]: "Angola", [e.Maori]: "Angola", [e.Marathi]: "\u0905\u0919\u094D\u0917\u094B\u0932\u093E", [e.Mongolian]: "\u0410\u043D\u0433\u043E\u043B\u0430", [e.Nepali]: "\u0905\u0919\u094D\u0917\u094B\u0932\u093E", [e.Norwegian]: "Angola", [e.Pashto]: "\u0627\u0646\u06AB\u0648\u0644\u0627", [e.Persian]: "\u0622\u0646\u06AF\u0648\u0644\u0627", [e.Polish]: "Angola", [e.Portuguese]: "Angola", [e.Punjabi]: "\u0A05\u0A19\u0A4D\u0A17\u0A4B\u0A32\u0A3E", [e.Romanian]: "Angole", [e.Russian]: "\u0410\u043D\u0433\u043E\u043B\u0430", [e.Samoan]: "Angola", [e.Sanskrit]: "\u0905\u0919\u094D\u0917\u094B\u0932\u093E", [e.Scots]: "Angola", [e.Serbian]: "\u0410\u043D\u0433\u043E\u043B\u0430", [e.Sesotho]: "Angola", [e.Shona]: "Angola", [e.Sindhi]: "\u0905\u0919\u094D\u0917\u094B\u0932\u093E", [e.Sinhala]: "\u0D86\u0D9C\u0DBD\u0DD2\u0DBA\u0DCF\u0DC0", [e.Slovak]: "Angola", [e.Slovenian]: "Angola", [e.Somali]: "Angola", [e.Spanish]: "Angola", [e.Sudanese]: "Angola", [e.Swahili]: "Angola", [e.Swedish]: "Angola", [e.Tagalog]: "Angola", [e.Tajik]: "\u0410\u043D\u0433\u043E\u043B\u0430", [e.Tamil]: "\u0B85\u0B99\u0BCD\u0B95\u0BCB\u0BB2\u0BBE", [e.Tatar]: "\u0410\u043D\u0433\u043E\u043B\u0430", [e.Telugu]: "\u0C05\u0C02\u0C17\u0C4B\u0C32\u0C3E", [e.Thai]: "\u0E2D\u0E07\u0E04\u0E4C\u0E01\u0E32\u0E23\u0E2D\u0E32\u0E19\u0E32\u0E21\u0E34\u0E2A\u0E16\u0E32\u0E19", [e.Tibetan]: "\u0F68\u0F44\u0F0B\u0F63\u0F7C\u0F0B", [e.Turkish]: "Angola", [e.Ukrainian]: "\u0410\u043D\u0433\u043E\u043B\u0430", [e.Urdu]: "\u0627\u0646\u06AF\u0648\u0644\u0627", [e.Uzbek]: "Angola", [e.Vietnamese]: "Angola", [e.Xhosa]: "Angola", [e.Welsh]: "Angola", [e.Yiddish]: "\u05D0\u05E0\u05D2\u05D5\u05DC\u05D4", [e.Yoruba]: "Angola", [e.Zulu]: "Angola" } } }, Anguilla: { i18n: { calling_codes: [1264], currencies: [l$1.DominicaDollar, l$1.EastCaribbeanDollar, l$1.Euro, l$1.UnitedStatesDollar, l$1.BritishPound], languages: [e.English, e.Spanish], tz: { offsets: [i$1.UTC_MINUS_4], regions: [t.AmericaAnguilla], timezones: [n$1.AtlanticStandardTime] } }, id: r.Anguilla, info: { flag: { emoji: "\u{1F1E6}\u{1F1EC}", emoji_unicode: "U+1F1E6 U+1F1EC", svg: "https://www.countryflags.io/ai/flat/64.svg" }, tld: [".ai"] }, iso: { alpha2: r.Anguilla, alpha3: "AIA", numeric: "660" }, name: { alt_spellings: ["AI"], demonym: "Anguillian", native: { endonym: "Anguilla" }, official: "Anguilla", short: "Anguilla", translations: { [e.Afrikaans]: "Anguilla", [e.Albanian]: "Anguilla", [e.Amharic]: "\u12A0\u1295\u1309\u120B", [e.Arabic]: "\u0623\u0646\u063A\u0648\u064A\u0644\u0627", [e.Armenian]: "\u0531\u0576\u0563\u056B\u056C\u0561", [e.Azerbaijani]: "Az\u0259rbaycan", [e.Bashkir]: "\u0410\u043D\u0433\u0438\u043B\u0438", [e.Basque]: "Angila", [e.Belarusian]: "\u0410\u043D\u0433\u0438\u043B\u0438", [e.Bengali]: "\u0985\u0999\u09CD\u0997\u09C0\u09B2\u09BE", [e.Berber]: "\u0623\u0646\u063A\u0648\u064A\u0644\u0627", [e.Bhutani]: "\u0F68\u0F44\u0F0B\u0F63\u0F7C\u0F0B", [e.Bosnian]: "Angila", [e.Breton]: "Angila", [e.Bulgarian]: "\u0410\u043D\u0433\u0438\u043B\u0438", [e.Burmese]: "\u1021\u1004\u103A\u1039\u1002\u101C\u102D\u1010\u103A", [e.Catalan]: "Angilla", [e.Chinese]: "\u5B89\u572D\u62C9", [e.Croatian]: "Angila", [e.Czech]: "Anguilla", [e.Danish]: "Anguilla", [e.Dutch]: "Anguilla", [e.English]: "Anguilla", [e.Esperanto]: "Angila", [e.Estonian]: "Anguilla", [e.Finnish]: "Anguilla", [e.French]: "Anguilla", [e.Frisian]: "Angila", [e.Galician]: "Anguilla", [e.Georgian]: "\u10D0\u10DC\u10D2\u10D8\u10DA\u10D0", [e.German]: "Anguilla", [e.Greenlandic]: "Anguilla", [e.Greek]: "\u0391\u03BD\u03B3\u03BA\u03C5\u03BB\u03AC", [e.Gujarati]: "\u0A85\u0A82\u0A97\u0ACD\u0AAF\u0ABE\u0AB2\u0ABE", [e.Haitian]: "Anguilla", [e.Hausa]: "Anguilla", [e.Hebrew]: "\u05D0\u05E0\u05D2\u05D5\u05D9\u05D0\u05DC\u05D4", [e.Hindi]: "\u0905\u0902\u0917\u094D\u0935\u0947\u0932\u093E", [e.Hungarian]: "Anguilla", [e.Icelandic]: "Anguilla", [e.Igbo]: "Anguilla", [e.Indonesian]: "Anguilla", [e.Irish]: "Anguilla", [e.Italian]: "Anguilla", [e.Japanese]: "\u30A2\u30F3\u30AE\u30E9", [e.Javanese]: "Anguilla", [e.Kannada]: "\u0C85\u0C82\u0C97\u0CCD\u0CB5\u0CC7\u0CB2\u0CBE", [e.Kazakh]: "\u0410\u043D\u0433\u0438\u043B\u0438", [e.Khmer]: "\u17A2\u1784\u17CB\u1780\u17B6\u179A\u17A0\u17D2\u1782\u17B8\u1798", [e.Korean]: "\uC575\uADC8\uB77C", [e.Kurdish]: "Anguilla", [e.Kyrgyz]: "\u0410\u043D\u0433\u0438\u043B\u0438", [e.Lao]: "\u0EAD\u0EB0\u0E99\u0EB0\u0E88\u0EB3", [e.Latin]: "Anguilla", [e.Latvian]: "Anguilla", [e.Lithuanian]: "Anguilla", [e.Luxembourgish]: "Angilla", [e.Macedonian]: "\u0410\u043D\u0433\u0438\u043B\u0438", [e.Malagasy]: "Angila", [e.Malay]: "Anguilla", [e.Malayalam]: "\u0D05\u0D02\u0D17\u0D4D\u0D35\u0D47\u0D32\u0D3E", [e.Maltese]: "Anguilla", [e.Maori]: "Anguilla", [e.Marathi]: "\u0905\u0902\u0917\u094D\u0935\u0947\u0932\u093E", [e.Mongolian]: "\u0410\u043D\u0433\u0438\u043B\u0438", [e.Nepali]: "\u0905\u0902\u0917\u094D\u0935\u0947\u0932\u093E", [e.Norwegian]: "Anguilla", [e.Pashto]: "\u0622\u0646\u06AF\u0648\u0644\u0627", [e.Persian]: "\u0622\u0646\u06AF\u0648\u0644\u0627", [e.Polish]: "Anguilla", [e.Portuguese]: "Anguilla", [e.Punjabi]: "\u0A05\u0A02\u0A17\u0A40\u0A32\u0A3E", [e.Romanian]: "Anguilla", [e.Russian]: "\u0410\u043D\u0433\u0438\u043B\u0438", [e.Samoan]: "Anguilla", [e.Sanskrit]: "\u0905\u0902\u0917\u094D\u0935\u0947\u0932\u093E", [e.Scots]: "Anguilla", [e.Serbian]: "\u0410\u043D\u0433\u0438\u043B\u0438", [e.Sesotho]: "Anguilla", [e.Shona]: "Anguilla", [e.Sindhi]: "\u0905\u0902\u0917\u094D\u0935\u0947\u0932\u093E", [e.Sinhala]: "\u0D86\u0D82\u0D9C\u0DD2\u0DBD\u0DCF\u0DC0", [e.Slovak]: "Anguilla", [e.Slovenian]: "Anguilla", [e.Somali]: "Anguilla", [e.Spanish]: "Anguilla", [e.Sudanese]: "Anguilla", [e.Swahili]: "Anguilla", [e.Swedish]: "Anguilla", [e.Tagalog]: "Anguilla", [e.Tajik]: "\u0410\u043D\u0433\u0438\u043B\u0438", [e.Tamil]: "\u0B85\u0B99\u0BCD\u0B95\u0BC8\u0BB2\u0BBE", [e.Tatar]: "\u0410\u043D\u0433\u0438\u043B\u0438", [e.Telugu]: "\u0C05\u0C02\u0C17\u0C4D\u0C35\u0C47\u0C32\u0C3E", [e.Thai]: "\u0E2D\u0E31\u0E07\u0E01\u0E32\u0E25\u0E32", [e.Tibetan]: "\u0F68\u0F44\u0F0B\u0F63\u0F72\u0F0B", [e.Turkish]: "Anguilla", [e.Ukrainian]: "\u0410\u043D\u0433\u0438\u043B\u0438", [e.Urdu]: "\u0622\u0646\u06AF\u0648\u0644\u0627", [e.Uzbek]: "\u0410\u043D\u0433\u0438\u043B\u0438", [e.Vietnamese]: "Anguilla", [e.Welsh]: "Anguilla", [e.Xhosa]: "Anguilla", [e.Yiddish]: "Anguilla", [e.Yoruba]: "Anguilla", [e.Zulu]: "Anguilla" } } }, Antarctica: { i18n: { calling_codes: [672], currencies: [l$1.UnitedStatesDollar, l$1.Euro], languages: [e.English, e.Spanish, e.French, e.Portuguese, e.Italian, e.Dutch, e.German, e.Swedish, e.Norwegian, e.Danish, e.Finnish], tz: { offsets: [i$1.UTC_PLUS_1, i$1.UTC_PLUS_2], regions: [t.AntarcticaCasey, t.AntarcticaDavis, t.AntarcticaMcMurdo, t.AntarcticaPalmer, t.AntarcticaRothera], timezones: [n$1.AtlanticStandardTime, n$1.CentralTime, n$1.EasternTime, n$1.AtlanticStandardTime, n$1.AzoresStandardTime, n$1.NewfoundlandStandardTime] } }, id: r.Antarctica, info: { flag: { emoji: "\u{1F1E6}\u{1F1F6}", emoji_unicode: "U+1F1E6 U+1F1F6", svg: "https://www.countryflags.io/aq/flat/64.svg" }, tld: [".aq"] }, iso: { alpha2: r.Antarctica, alpha3: "ATA", numeric: "010" }, name: { alt_spellings: ["AQ"], demonym: "Antarctican", native: { endonym: "Antarctica" }, official: "Antarctica", short: "Antarctica", translations: { [e.Afrikaans]: "Antarctica", [e.Albanian]: "Antarktika", [e.Amharic]: "\u12A0\u1295\u1272\u120D\u12AB\u1293", [e.Arabic]: "\u0623\u0646\u062A\u0627\u0631\u0643\u062A\u064A\u0643\u0627", [e.Armenian]: "\u0540\u0561\u0576\u0561\u0580\u0561\u057F\u056F\u0578", [e.Azerbaijani]: "Az\u0259rbaycan", [e.Bashkir]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430", [e.Basque]: "Antarktika", [e.Belarusian]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430", [e.Bengali]: "\u0985\u09A8\u09CD\u09A4\u09B0\u09BE\u09B6\u09CD\u09AC\u09C0", [e.Berber]: "\u0623\u0646\u062A\u0627\u0631\u0643\u062A\u064A\u0643\u0627", [e.Bhutani]: "\u0F68\u0F44\u0F0B\u0F63\u0F72\u0F0B", [e.Bosnian]: "Antarktika", [e.Breton]: "Antarktika", [e.Bulgarian]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430", [e.Burmese]: "\u1021\u1014\u1039\u1010\u102C\u101B\u102E\u1038\u101A\u102C\u1038", [e.Catalan]: "Ant\xE0rtida", [e.Chinese]: "\u5357\u6781\u6D32", [e.Croatian]: "Antarktika", [e.Czech]: "Antarktida", [e.Danish]: "Antarktis", [e.Dutch]: "Antarctica", [e.English]: "Antarctica", [e.Esperanto]: "Antarktika", [e.Estonian]: "Antarktika", [e.Finnish]: "Antarktis", [e.French]: "Antarctica", [e.Frisian]: "Antarktis", [e.Galician]: "Ant\xE1rtida", [e.Georgian]: "\u10D0\u10DC\u10E2\u10D0\u10E0\u10E5\u10E2\u10D8\u10D9\u10D0", [e.German]: "Antarktis", [e.Greenlandic]: "Antarktis", [e.Greek]: "\u0391\u03BD\u03C4\u03B1\u03C1\u03BA\u03C4\u03B9\u03BA\u03AE", [e.Gujarati]: "\u0A85\u0AA8\u0ACD\u0AA4\u0AB0\u0ABE\u0AB6\u0ACD\u0AB5\u0AC0", [e.Haitian]: "Antarctica", [e.Hausa]: "Antarktika", [e.Hebrew]: "\u05D0\u05E0\u05D8\u05E8\u05E7\u05D8\u05D9\u05E7\u05D4", [e.Hindi]: "\u0905\u0928\u094D\u0924\u0930\u0915\u094D\u0937\u0947\u0924\u094D\u0930", [e.Hungarian]: "Antarktika", [e.Icelandic]: "Antarktis", [e.Igbo]: "Antarktika", [e.Indonesian]: "Antarktika", [e.Irish]: "Antarktika", [e.Italian]: "Antartide", [e.Japanese]: "\u5357\u6975", [e.Javanese]: "Antarktika", [e.Kannada]: "\u0C85\u0CA8\u0CCD\u0CA4\u0CB0\u0CBE\u0CB6\u0CCD\u0CB5\u0CBF", [e.Kazakh]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430", [e.Khmer]: "\u17A2\u1784\u17CB\u179F\u17D2\u1780\u179A\u17A2\u17B6\u1798\u17C9\u17BB\u1799", [e.Korean]: "\uC564\uD2F0\uCE74\uD1A0\uB2C9", [e.Kurdish]: "Antarktika", [e.Kyrgyz]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430", [e.Lao]: "\u0EAD\u0EB0\u0E99\u0EAD\u0EA5\u0EB2\u0E81\u0EB4\u0EAA\u0EB0", [e.Latin]: "Antarctica", [e.Latvian]: "Antarktika", [e.Lithuanian]: "Antarktis", [e.Luxembourgish]: "Antarktis", [e.Macedonian]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430", [e.Malagasy]: "Antarctica", [e.Malay]: "Antarktika", [e.Malayalam]: "\u0D05\u0D28\u0D4D\u0D24\u0D30\u0D3E\u0D36\u0D4D\u0D35\u0D3F", [e.Maltese]: "Antarktika", [e.Maori]: "Antarktika", [e.Marathi]: "\u0905\u0928\u094D\u0924\u0930\u093E\u0936\u094D\u0935\u093F\u0915\u093E", [e.Mongolian]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430", [e.Nepali]: "\u0905\u0928\u094D\u0924\u0930\u093E\u0936\u094D\u0935\u093F\u0915\u093E", [e.Norwegian]: "Antarktis", [e.Pashto]: "\u0627\u0646\u062A\u0627\u0631\u0643\u062A\u064A\u0643\u0627", [e.Persian]: "\u0622\u0646\u062A\u0627\u0631\u06A9\u062A\u06CC\u06A9\u0627", [e.Polish]: "Antarktyka", [e.Portuguese]: "Ant\xE1rtida", [e.Punjabi]: "\u0A05\u0A28\u0A4D\u0A24\u0A30\u0A3E\u0A36\u0A3F\u0A15\u0A3E", [e.Romanian]: "Antarctica", [e.Russian]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430", [e.Samoan]: "Antarktika", [e.Sanskrit]: "\u0905\u0928\u094D\u0924\u0930\u093E\u0936\u094D\u0935\u093F\u0915\u093E", [e.Scots]: "Antarktika", [e.Serbian]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430", [e.Sesotho]: "Antarktika", [e.Shona]: "Antarktika", [e.Sindhi]: "Antarktika", [e.Sinhala]: "\u0D86\u0DB1\u0DCA\u0DA7\u0DCA\u0DA7\u0DD2\u0D9A\u0DCF\u0DC0", [e.Slovak]: "Antarktika", [e.Slovenian]: "Antarktika", [e.Somali]: "Antarktika", [e.Spanish]: "Ant\xE1rtida", [e.Sudanese]: "Antarktika", [e.Swahili]: "Antarktika", [e.Swedish]: "Antarktis", [e.Tagalog]: "Antarktika", [e.Tajik]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430", [e.Tamil]: "\u0B85\u0BA9\u0BCD\u0BA4\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BBF\u0B95\u0BCD", [e.Tatar]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430", [e.Telugu]: "\u0C05\u0C28\u0C4D\u0C24\u0C30\u0C3E\u0C36\u0C4D\u0C35\u0C3F\u0C15\u0C3E", [e.Thai]: "\u0E20\u0E39\u0E21\u0E34\u0E20\u0E32\u0E04\u0E2D\u0E32\u0E19\u0E31\u0E19\u0E15\u0E34\u0E01\u0E32", [e.Tibetan]: "\u0F68\u0F7A\u0F53\u0F0B\u0F4A\u0F72\u0F4A\u0F7A\u0F53\u0F0B\u0F40\u0F72\u0F66\u0F72\u0F0B\u0F68\u0F7A\u0F53\u0F0B\u0F4A\u0F72\u0F4A\u0F7A\u0F53\u0F0B\u0F40\u0F72\u0F66\u0F72", [e.Turkish]: "Antarktika", [e.Ukrainian]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430", [e.Urdu]: "\u0627\u0646\u062A\u0627\u0631\u06A9\u062A\u06CC\u06A9\u0627", [e.Uzbek]: "\u0410\u043D\u0442\u0430\u0440\u043A\u0442\u0438\u043A\u0430", [e.Vietnamese]: "\u0110\u1EA5t Antarktik", [e.Welsh]: "Antarktika", [e.Xhosa]: "Antarktika", [e.Yiddish]: "Antarktika", [e.Yoruba]: "Antarktika", [e.Zulu]: "Antarktika" } } }, Armenia: { i18n: { calling_codes: [374], currencies: [l$1.ArmeniaDram], languages: [e.Armenian], tz: { offsets: [i$1.UTC_PLUS_4], regions: [t.AsiaJakarta], timezones: [n$1.ArmeniaTime] } }, id: r.Armenia, info: { flag: { emoji: "\u{1F1E6}\u{1F1F2}", emoji_unicode: "U+1F1E6 U+1F1F2", svg: "https://www.countryflags.io/am/flat/64.svg" }, tld: [".am"] }, iso: { alpha2: r.Armenia, alpha3: "ARM", numeric: "051" }, name: { alt_spellings: ["AM", "Hayastan", "Republic of Armenia", "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576"], demonym: "Armenian", native: { endonym: "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576" }, official: "Republic of Armenia", short: "Armenia", translations: { [e.Afrikaans]: "Armeni\xEB", [e.Albanian]: "Armenia", [e.Amharic]: "\u12A0\u121B\u122D\u129B", [e.Arabic]: "\u0623\u0631\u0645\u064A\u0646\u064A\u0627", [e.Armenian]: "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576", [e.Azerbaijani]: "Az\u0259rbaycan", [e.Bashkir]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F", [e.Basque]: "Arm\xE9nia", [e.Belarusian]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F", [e.Bengali]: "\u0986\u09B0\u09CD\u09AE\u09C7\u09A8\u09BF", [e.Berber]: "\u0623\u0631\u0645\u064A\u0646\u064A\u0627", [e.Bhutani]: "\u0F62\u0F92\u0FB1\u0F0B\u0F53\u0F42", [e.Bosnian]: "Armenija", [e.Breton]: "Armeni\xEB", [e.Bulgarian]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F", [e.Burmese]: "\u1021\u102C\u1019\u1010\u102D\u1010\u1039", [e.Catalan]: "Arm\xE8nia", [e.Chinese]: "\u4E9A\u7F8E\u5C3C\u4E9A", [e.Croatian]: "Armenija", [e.Czech]: "Arm\xE9nie", [e.Danish]: "Armenien", [e.Dutch]: "Armeni\xEB", [e.English]: "Armenia", [e.Esperanto]: "Armenia", [e.Estonian]: "Armeenia", [e.Finnish]: "Armenia", [e.French]: "Armenia", [e.Frisian]: "Armeenia", [e.Galician]: "Arm\xE9nia", [e.Georgian]: "\u10D0\u10E0\u10DB\u10DD\u10DC\u10D8", [e.German]: "Armenien", [e.Greenlandic]: "Armenia", [e.Greek]: "\u0391\u03C1\u03BC\u03B5\u03BD\u03AF\u03B1", [e.Gujarati]: "\u0A85\u0AB0\u0ACD\u0AAE\u0AC7\u0AA8\u0ABF", [e.Haitian]: "Armenia", [e.Hausa]: "Armenia", [e.Hebrew]: "\u05D0\u05E8\u05DE\u05E0\u05D9\u05D4", [e.Hindi]: "\u0905\u05E8\u05DE\u05E0\u093F\u092F\u093E", [e.Hungarian]: "\xD6rm\xE9nyorsz\xE1g", [e.Icelandic]: "Armenia", [e.Igbo]: "Armenia", [e.Indonesian]: "Armenia", [e.Irish]: "Armenia", [e.Italian]: "Armenia", [e.Japanese]: "\u30A2\u30EB\u30E1\u30CB\u30A2", [e.Javanese]: "Armenia", [e.Kannada]: "\u0C85\u0CB0\u0CCD\u0CAE\u0CC7\u0CA8\u0CBF", [e.Kazakh]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F", [e.Khmer]: "\u17A2\u17B6\u1798\u17C9\u17C1\u179A\u17B8", [e.Korean]: "\uC544\uB974\uBA54\uB2C8\uC544", [e.Kurdish]: "Armenia", [e.Kyrgyz]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F", [e.Lao]: "\u0EAD\u0EB2\u0EAB\u0EBC\u0E99\u0EB2", [e.Latin]: "Armenia", [e.Latvian]: "Armeenia", [e.Lithuanian]: "Arm\u0117nija", [e.Luxembourgish]: "Armenien", [e.Macedonian]: "\u0410\u0440\u043C\u0435\u043D\u0438\u0458\u0430", [e.Malagasy]: "Armenia", [e.Malay]: "Armenia", [e.Malayalam]: "\u0D05\u0D30\u0D4D\u200D\u0D2E\u0D47\u0D28\u0D3F", [e.Maltese]: "Armenia", [e.Maori]: "Armenia", [e.Marathi]: "\u0905\u0930\u094D\u092E\u0947\u0928\u093F", [e.Mongolian]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F", [e.Nepali]: "\u0905\u0930\u094D\u092E\u0947\u0928\u093F", [e.Norwegian]: "Armenia", [e.Pashto]: "\u0622\u0631\u0645\u06CC\u0646\u06CC\u0627", [e.Persian]: "\u0627\u0631\u0645\u0646\u0633\u062A\u0627\u0646", [e.Polish]: "Armenia", [e.Portuguese]: "Armenia", [e.Punjabi]: "\u0A05\u0A30\u0A2E\u0A40\u0A28\u0A40", [e.Romanian]: "Armenia", [e.Russian]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F", [e.Samoan]: "Armenia", [e.Sanskrit]: "Armenia", [e.Scots]: "Armenia", [e.Serbian]: "\u0410\u0440\u043C\u0435\u043D\u0438\u0458\u0430", [e.Sesotho]: "Armenia", [e.Shona]: "Armenia", [e.Sindhi]: "Armenia", [e.Sinhala]: "\u0D86\u0DBB\u0DCA\u0DB8\u0DD3\u0DB1\u0DD2", [e.Slovak]: "Armenia", [e.Slovenian]: "Armenija", [e.Somali]: "Armenia", [e.Spanish]: "Armenia", [e.Sudanese]: "Armenia", [e.Swahili]: "Armenia", [e.Swedish]: "Armenien", [e.Tagalog]: "Armenia", [e.Tajik]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F", [e.Tamil]: "\u0B85\u0BB0\u0BCD\u0BAE\u0BC7\u0BA9\u0BBF\u0BAF\u0BA9\u0BCD", [e.Tatar]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F", [e.Telugu]: "\u0C05\u0C30\u0C4D\u0C2E\u0C47\u0C28\u0C3F", [e.Thai]: "\u0E2D\u0E32\u0E23\u0E4C\u0E40\u0E21\u0E19\u0E34\u0E2A\u0E16\u0E32\u0E19", [e.Tibetan]: "\u0F68\u0F62\u0F0B\u0F58\u0F7A\u0F0B\u0F53\u0F72\u0F0B\u0F61\u0F74\u0F0D", [e.Turkish]: "Ermenistan", [e.Ukrainian]: "\u0410\u0440\u043C\u0435\u043D\u0456\u044F", [e.Urdu]: "\u0627\u0631\u0645\u0646\u0633\u062A\u0627\u0646", [e.Uzbek]: "\u0410\u0440\u043C\u0435\u043D\u0438\u044F", [e.Vietnamese]: "Armenia", [e.Welsh]: "Armenia", [e.Xhosa]: "Armenia", [e.Yiddish]: "\u05D0\u05E8\u05DE\u05E0\u05D9\u05D4", [e.Yoruba]: "Armenia", [e.Zulu]: "Armenia" } } }, SomeCountry: { i18n: { calling_codes: [], currencies: [], languages: [], tz: { offsets: [], regions: [], timezones: [] } }, id: r.AmericanSamoa, info: { flag: { emoji: "", emoji_unicode: "", svg: "" }, tld: [] }, iso: { alpha2: r.AmericanSamoa, alpha3: "", numeric: "" }, name: { alt_spellings: [], demonym: "", native: { endonym: "" }, official: "", short: "", translations: { [e.Afrikaans]: "", [e.Albanian]: "", [e.Amharic]: "", [e.Arabic]: "", [e.Armenian]: "", [e.Azerbaijani]: "", [e.Bashkir]: "", [e.Basque]: "", [e.Belarusian]: "", [e.Bengali]: "", [e.Berber]: "", [e.Bhutani]: "", [e.Bosnian]: "", [e.Breton]: "", [e.Bulgarian]: "", [e.Burmese]: "", [e.Catalan]: "", [e.Chinese]: "", [e.Croatian]: "", [e.Czech]: "", [e.Danish]: "", [e.Dutch]: "", [e.English]: "", [e.Esperanto]: "", [e.Estonian]: "", [e.Finnish]: "", [e.French]: "", [e.Frisian]: "", [e.Galician]: "", [e.Georgian]: "", [e.German]: "", [e.Greenlandic]: "", [e.Greek]: "", [e.Gujarati]: "", [e.Haitian]: "", [e.Hausa]: "", [e.Hebrew]: "", [e.Hindi]: "", [e.Hungarian]: "", [e.Icelandic]: "", [e.Igbo]: "", [e.Indonesian]: "", [e.Irish]: "", [e.Italian]: "", [e.Japanese]: "", [e.Javanese]: "", [e.Kannada]: "", [e.Kazakh]: "", [e.Khmer]: "", [e.Korean]: "", [e.Kurdish]: "", [e.Kyrgyz]: "", [e.Lao]: "", [e.Latin]: "", [e.Latvian]: "", [e.Lithuanian]: "", [e.Luxembourgish]: "", [e.Macedonian]: "", [e.Malagasy]: "", [e.Malay]: "", [e.Malayalam]: "", [e.Maltese]: "", [e.Maori]: "", [e.Marathi]: "", [e.Mongolian]: "", [e.Nepali]: "", [e.Norwegian]: "", [e.Pashto]: "", [e.Persian]: "", [e.Polish]: "", [e.Portuguese]: "", [e.Punjabi]: "", [e.Romanian]: "", [e.Russian]: "", [e.Samoan]: "", [e.Sanskrit]: "", [e.Scots]: "", [e.Serbian]: "", [e.Sesotho]: "", [e.Shona]: "", [e.Sindhi]: "", [e.Sinhala]: "", [e.Slovak]: "", [e.Slovenian]: "", [e.Somali]: "", [e.Spanish]: "", [e.Sudanese]: "", [e.Swahili]: "", [e.Swedish]: "", [e.Tagalog]: "", [e.Tajik]: "", [e.Tamil]: "", [e.Tatar]: "", [e.Telugu]: "", [e.Thai]: "", [e.Tibetan]: "", [e.Turkish]: "", [e.Ukrainian]: "", [e.Urdu]: "", [e.Uzbek]: "", [e.Vietnamese]: "", [e.Welsh]: "", [e.Xhosa]: "", [e.Yiddish]: "", [e.Yoruba]: "", [e.Zulu]: "" } } } });
({ id: e.Afrikaans, language: { code: o.Afrikaans, name: "Afrikaans", native: "Afrikaans" }, name: "Afrikaans", native_name: "Afrikaans", rtl: false });
({ country: { code: r.SouthAfrica, name: "South Africa", native: "South Africa" }, id: e.AfrikaansSouthAfrica, language: { code: o.Afrikaans, name: "Afrikaans", native: "Afrikaans" }, name: "Afrikaans (South Africa)", native_name: "Afrikaans (Suid-Afrika)", rtl: false });
({ id: e.Albanian, language: { code: o.Albanian, name: "Albanian", native: "Shqip" }, name: "Albanian", native_name: "Shqip", rtl: false });
({ country: { code: r.Albania, name: "Albania", native: "Shqip\xEBria" }, id: e.AlbanianAlbania, language: { code: o.Albanian, name: "Albanian", native: "Shqip" }, name: "Albanian (Albania)", native_name: "Shqip (Shqip\xEBria)", rtl: false });
({ id: e.Amharic, language: { code: o.Amharic, name: "Amharic", native: "\u12A0\u121B\u122D\u129B" }, name: "Amharic", native_name: "\u12A0\u121B\u122D\u129B", rtl: false });
({ country: { code: r.Ethiopia, name: "Ethiopia", native: "\u12A2\u1275\u12EE\u1335\u12EB" }, id: e.AmharicEthiopia, language: { code: o.Amharic, name: "Amharic", native: "\u12A0\u121B\u122D\u129B" }, name: "Amharic (Ethiopia)", native_name: "\u12A0\u121B\u122D\u129B (\u12A2\u1275\u12EE\u1335\u12EB)", rtl: false });
({ id: e.Arabic, language: { code: o.Arabic, name: "Arabic", native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" }, name: "Arabic", native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629", rtl: true });
({ country: { code: r.Algeria, name: "Algeria", native: "\u0627\u0644\u062C\u0632\u0627\u0626\u0631" }, id: e.ArabicAlgeria, language: { code: o.Arabic, name: "Arabic", native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" }, name: "Arabic (Algeria)", native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u062C\u0632\u0627\u0626\u0631)", rtl: true });
({ country: { code: r.Bahrain, name: "Bahrain", native: "\u0627\u0644\u0628\u062D\u0631\u064A\u0646" }, id: e.ArabicBahrain, language: { code: o.Arabic, name: "Arabic", native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" }, name: "Arabic (Bahrain)", native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0628\u062D\u0631\u064A\u0646)", rtl: true });
({ country: { code: r.Egypt, name: "Egypt", native: "\u0645\u0635\u0631" }, id: e.ArabicEgypt, language: { code: o.Arabic, name: "Arabic", native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" }, name: "Arabic (Egypt)", native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0645\u0635\u0631)", rtl: true });
({ country: { code: r.Iraq, name: "Iraq", native: "\u0627\u0644\u0639\u0631\u0627\u0642" }, id: e.ArabicIraq, language: { code: o.Arabic, name: "Arabic", native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" }, name: "Arabic (Iraq)", native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0639\u0631\u0627\u0642)", rtl: true });
({ country: { code: r.Jordan, name: "Jordan", native: "\u0627\u0644\u0623\u0631\u062F\u0646" }, id: e.ArabicJordan, language: { code: o.Arabic, name: "Arabic", native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" }, name: "Arabic (Jordan)", native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0623\u0631\u062F\u0646)", rtl: true });
({ country: { code: r.Kuwait, name: "Kuwait", native: "\u0627\u0644\u0643\u0648\u064A\u062A" }, id: e.ArabicKuwait, language: { code: o.Arabic, name: "Arabic", native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" }, name: "Arabic (Kuwait)", native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0643\u0648\u064A\u062A)", rtl: true });
({ country: { code: r.Lebanon, name: "Lebanon", native: "\u0644\u0628\u0646\u0627\u0646" }, id: e.ArabicLebanon, language: { code: o.Arabic, name: "Arabic", native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" }, name: "Arabic (Lebanon)", native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0644\u0628\u0646\u0627\u0646)", rtl: true });
({ country: { code: r.Libya, name: "Libya", native: "\u0644\u064A\u0628\u064A\u0627" }, id: e.ArabicLibya, language: { code: o.Arabic, name: "Arabic", native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" }, name: "Arabic (Libya)", native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0644\u064A\u0628\u064A\u0627)", rtl: true });
({ country: { code: r.Morocco, name: "Morocco", native: "\u0627\u0644\u0645\u063A\u0631\u0628" }, id: e.ArabicMorocco, language: { code: o.Arabic, name: "Arabic", native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" }, name: "Arabic (Morocco)", native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0645\u063A\u0631\u0628)", rtl: true });
({ country: { code: r.Oman, name: "Oman", native: "\u0639\u0645\u0627\u0646" }, id: e.ArabicOman, language: { code: o.Arabic, name: "Arabic", native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" }, name: "Arabic (Oman)", native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0639\u0645\u0627\u0646)", rtl: true });
({ country: { code: r.Qatar, name: "Qatar", native: "\u0642\u0637\u0631" }, id: e.ArabicQatar, language: { code: o.Arabic, name: "Arabic", native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" }, name: "Arabic (Qatar)", native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0642\u0637\u0631)", rtl: true });
({ country: { code: r.SaudiArabia, name: "Saudi Arabia", native: "\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629" }, id: e.ArabicSaudiArabia, language: { code: o.Arabic, name: "Arabic", native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" }, name: "Arabic (Saudi Arabia)", native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629)", rtl: true });
({ country: { code: r.Tunisia, name: "Tunisia", native: "\u062A\u0648\u0646\u0633" }, id: e.ArabicTunisia, language: { code: o.Arabic, name: "Arabic", native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" }, name: "Arabic (Tunisia)", native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u062A\u0648\u0646\u0633)", rtl: true });
({ country: { code: r.UnitedArabEmirates, name: "United Arab Emirates", native: "\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0645\u062A\u062D\u062F\u0629" }, id: e.ArabicUnitedArabEmirates, language: { code: o.Arabic, name: "Arabic", native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" }, name: "Arabic (United Arab Emirates)", native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0645\u062A\u062D\u062F\u0629)", rtl: true });
({ country: { code: r.Yemen, name: "Yemen", native: "\u0627\u0644\u064A\u0645\u0646" }, id: e.ArabicYemen, language: { code: o.Arabic, name: "Arabic", native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" }, name: "Arabic (Yemen)", native_name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u064A\u0645\u0646)", rtl: true });
({ id: e.Armenian, language: { code: o.Armenian, name: "Armenian", native: "\u0540\u0561\u0575\u0565\u0580\u0565\u0576" }, name: "Armenian", native_name: "\u0540\u0561\u0575\u0565\u0580\u0565\u0576", rtl: false });
({ country: { code: r.Armenia, name: "Armenia", native: "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576" }, id: e.ArmenianArmenia, language: { code: o.Armenian, name: "Armenian", native: "\u0570\u0561\u0575\u0565\u0580\u0565\u0576" }, name: "Armenian (Armenia)", native_name: "\u0570\u0561\u0575\u0565\u0580\u0565\u0576 (\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576)", rtl: false });
({ id: e.Azerbaijani, language: { code: o.Azerbaijani, name: "Azeribaijani", native: "Az\u0259rbaycan" }, name: "Azeri", native_name: "Az\u0259rbaycan", rtl: false });
({ country: { code: r.Azerbaijan, name: "Azerbaijan", native: "Az\u0259rbaycan" }, id: e.AzerbaijaniAzerbaijan, language: { code: o.Azerbaijani, name: "Azerbaijani", native: "Az\u0259rbaycan" }, name: "Azeri (Azerbaijan)", native_name: "Az\u0259rbaycan (Az\u0259rbaycan)", rtl: false });
({ id: e.Basque, language: { code: o.Basque, name: "Basque", native: "Euskara" }, name: "Basque", native_name: "Euskara", rtl: false });
({ country: { code: r.Spain, name: "Spain", native: "Espa\xF1a" }, id: e.BasqueSpain, language: { code: o.Basque, name: "Basque", native: "Euskara" }, name: "Basque (Spain)", native_name: "Euskara (Espa\xF1a)", rtl: false });
({ id: e.Belarusian, language: { code: o.Belarusian, name: "Belarusian", native: "\u0411\u0435\u043B\u0430\u0440\u0443\u0441\u043A\u0430\u044F" }, name: "Belarusian", native_name: "\u0411\u0435\u043B\u0430\u0440\u0443\u0441\u043A\u0430\u044F", rtl: false });
({ country: { code: r.Belarus, name: "Belarus", native: "\u0411\u0435\u043B\u0430\u0440\u0443\u0441\u044C" }, id: e.BelarusianBelarus, language: { code: o.Belarusian, name: "Belarusian", native: "\u0431\u0435\u043B\u0430\u0440\u0443\u0441\u043A\u0430\u044F" }, name: "Belarusian (Belarus)", native_name: "\u0431\u0435\u043B\u0430\u0440\u0443\u0441\u043A\u0430\u044F (\u0411\u0435\u043B\u0430\u0440\u0443\u0441\u044C)", rtl: false });
({ id: e.Bengali, language: { code: o.Bengali, name: "Bengali", native: "\u09AC\u09BE\u0982\u09B2\u09BE" }, name: "Bengali", native_name: "\u09AC\u09BE\u0982\u09B2\u09BE", rtl: false });
({ country: { code: r.Bangladesh, name: "Bangladesh", native: "\u09AC\u09BE\u0982\u09B2\u09BE\u09A6\u09C7\u09B6" }, id: e.BengaliBangladesh, language: { code: o.Bengali, name: "Bengali", native: "\u09AC\u09BE\u0982\u09B2\u09BE" }, name: "Bengali (Bangladesh)", native_name: "\u09AC\u09BE\u0982\u09B2\u09BE (\u09AC\u09BE\u0982\u09B2\u09BE\u09A6\u09C7\u09B6)", rtl: false });
({ id: e.Bhutani, language: { code: o.Bhutani, name: "Bhutani", native: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42" }, name: "Bhutani", native_name: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42", rtl: false });
({ country: { code: r.Bhutan, name: "Bhutan", native: "\u0F60\u0F56\u0FB2\u0F74\u0F42" }, id: e.BhutaniBhutan, language: { code: o.Bhutani, name: "Bhutani", native: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42" }, name: "Bhutani (Bhutan)", native_name: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42 (\u0F60\u0F56\u0FB2\u0F74\u0F42)", rtl: false });
({ id: e.Bulgarian, language: { code: o.Bulgarian, name: "Bulgarian", native: "\u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438" }, name: "Bulgarian", native_name: "\u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438", rtl: false });
({ country: { code: r.Bulgaria, name: "Bulgaria", native: "\u0411\u044A\u043B\u0433\u0430\u0440\u0438\u044F" }, id: e.BulgarianBulgaria, language: { code: o.Bulgarian, name: "Bulgarian", native: "\u0431\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438" }, name: "Bulgarian (Bulgaria)", native_name: "\u0431\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438 (\u0411\u044A\u043B\u0433\u0430\u0440\u0438\u044F)", rtl: false });
({ id: e.Burmese, language: { code: o.Burmese, name: "Burmese", native: "\u1017\u1019\u102C\u1005\u102C" }, name: "Burmese", native_name: "\u1017\u1019\u102C\u1005\u102C", rtl: false });
({ country: { code: r.Myanmar, name: "Myanmar", native: "\u1019\u103C\u1014\u103A\u1019\u102C" }, id: e.BurmeseMyanmar, language: { code: o.Burmese, name: "Burmese", native: "\u1017\u1019\u102C\u1005\u102C" }, name: "Burmese (Myanmar)", native_name: "\u1017\u1019\u102C\u1005\u102C (\u1019\u103C\u1014\u103A\u1019\u102C)", rtl: false });
({ id: e.Cantonese, language: { code: o.Cantonese, name: "Cantonese", native: "\u5EE3\u6771\u8A71" }, name: "Cantonese", native_name: "\u5EE3\u6771\u8A71", rtl: false });
({ country: { code: r.HongKong, name: "Hong Kong", native: "\u9999\u6E2F" }, id: e.CantoneseHongKong, language: { code: o.Cantonese, name: "Cantonese", native: "\u5EE3\u6771\u8A71" }, name: "Cantonese (Hong Kong)", native_name: "\u5EE3\u6771\u8A71 (\u9999\u6E2F)", rtl: false });
({ id: e.Catalan, language: { code: o.Catalan, name: "Catalan", native: "Catal\xE0" }, name: "Catalan", native_name: "Catal\xE0", rtl: false });
({ country: { code: r.Spain, name: "Spain", native: "Espa\xF1a" }, id: e.CatalanSpain, language: { code: o.Catalan, name: "Catalan", native: "Catal\xE0" }, name: "Catalan (Spain)", native_name: "Catal\xE0 (Espanya)", rtl: false });
({ id: e.ChineseSimplified, language: { code: o.Chinese, name: "Chinese", native: "\u4E2D\u6587" }, name: "Chinese (Simplified)", native_name: "\u4E2D\u6587", rtl: false });
({ country: { code: r.China, name: "China", native: "\u4E2D\u56FD" }, id: e.ChineseSimplifiedChina, language: { code: o.Chinese, name: "Chinese", native: "\u4E2D\u6587" }, name: "Chinese (Simplified/China)", native_name: "\u4E2D\u6587 (\u4E2D\u56FD)", rtl: false });
({ country: { code: r.HongKong, name: "Hong Kong", native: "\u9999\u6E2F" }, id: e.ChineseSimplifiedHongKong, language: { code: o.Chinese, name: "Chinese", native: "\u4E2D\u6587" }, name: "Chinese (Simplified/Hong Kong)", native_name: "\u4E2D\u6587 (\u9999\u6E2F)", rtl: false });
({ country: { code: r.Macau, name: "Macau", native: "\u6FB3\u9580" }, id: e.ChineseSimplifiedMacau, language: { code: o.Chinese, name: "Chinese", native: "\u4E2D\u6587" }, name: "Chinese (Simplified/Macau)", native_name: "\u4E2D\u6587 (\u6FB3\u9580)", rtl: false });
({ country: { code: r.Singapore, name: "Singapore", native: "\u65B0\u52A0\u5761" }, id: e.ChineseSimplifiedSingapore, language: { code: o.Chinese, name: "Chinese", native: "\u4E2D\u6587" }, name: "Chinese (Simplified/Singapore)", native_name: "\u4E2D\u6587 (\u65B0\u52A0\u5761)", rtl: false });
({ id: e.ChineseTraditional, language: { code: o.Chinese, name: "Chinese", native: "\u4E2D\u6587" }, name: "Chinese (Traditional)", native_name: "\u4E2D\u6587", rtl: false });
({ country: { code: r.HongKong, name: "Hong Kong", native: "\u9999\u6E2F" }, id: e.ChineseTraditionalHongKong, language: { code: o.Chinese, name: "Chinese (Traditional/Hong Kong)", native: "\u4E2D\u6587" }, name: "Chinese (Hong Kong)", native_name: "\u4E2D\u6587 (\u9999\u6E2F)", rtl: false });
({ country: { code: r.Macau, name: "Macau", native: "\u6FB3\u9580" }, id: e.ChineseTraditionalMacau, language: { code: o.Chinese, name: "Chinese (Traditional/Macau)", native: "\u4E2D\u6587" }, name: "Chinese (Macau)", native_name: "\u4E2D\u6587 (\u6FB3\u9580)", rtl: false });
({ country: { code: r.Singapore, name: "Singapore", native: "\u65B0\u52A0\u5761" }, id: e.ChineseTraditionalSingapore, language: { code: o.Chinese, name: "Chinese (Traditional/Singapore)", native: "\u4E2D\u6587" }, name: "Chinese (Singapore)", native_name: "\u4E2D\u6587 (\u65B0\u52A0\u5761)", rtl: false });
({ id: e.Croatian, language: { code: o.Croatian, name: "Croatian", native: "Hrvatski" }, name: "Croatian", native_name: "Hrvatski", rtl: false });
({ country: { code: r.BosniaAndHerzegovina, name: "Bosnia and Herzegovina", native: "Bosna i Hercegovina" }, id: e.CroatianBosniaAndHerzegovina, language: { code: o.Croatian, name: "Croatian", native: "Hrvatski" }, name: "Croatian (Bosnia and Herzegovina)", native_name: "Hrvatski (Bosna i Hercegovina)", rtl: false });
({ country: { code: r.Croatia, name: "Croatia", native: "Hrvatska" }, id: e.CroatianCroatia, language: { code: o.Croatian, name: "Croatian", native: "Hrvatski" }, name: "Croatian (Croatia)", native_name: "Hrvatski (Hrvatska)", rtl: false });
({ id: e.Czech, language: { code: o.Czech, name: "Czech", native: "\u010Ce\u0161tina" }, name: "Czech", native_name: "\u010Ce\u0161tina", rtl: false });
({ country: { code: r.CzechRepublic, name: "Czech Republic", native: "\u010Cesk\xE1 republika" }, id: e.CzechCzechRepublic, language: { code: o.Czech, name: "Czech", native: "\u010Ce\u0161tina" }, name: "Czech (Czech Republic)", native_name: "\u010Ce\u0161tina (\u010Cesk\xE1 republika)", rtl: false });
({ id: e.Danish, language: { code: o.Danish, name: "Danish", native: "Dansk" }, name: "Danish", native_name: "Dansk", rtl: false });
({ country: { code: r.Denmark, name: "Denmark", native: "Danmark" }, id: e.DanishDenmark, language: { code: o.Danish, name: "Danish", native: "Dansk" }, name: "Danish (Denmark)", native_name: "Dansk (Danmark)", rtl: false });
({ id: e.Divehi, language: { code: o.Divehi, name: "Divehi", native: "\u078B\u07A8\u0788\u07AC\u0780\u07A8\u0784\u07A6\u0790\u07B0" }, name: "Divehi", native_name: "\u078B\u07A8\u0788\u07AC\u0780\u07A8\u0784\u07A6\u0790\u07B0", rtl: true });
({ country: { code: r.Maldives, name: "Maldives", native: "\u078B\u07A8\u0788\u07AC\u0780\u07A8 \u0783\u07A7\u0787\u07B0\u0796\u07AC" }, id: e.DivehiMaldives, language: { code: o.Divehi, name: "Divehi", native: "\u078B\u07A8\u0788\u07AC\u0780\u07A8\u0784\u07A6\u0790\u07B0" }, name: "Divehi (Maldives)", native_name: "\u078B\u07A8\u0788\u07AC\u0780\u07A8\u0784\u07A6\u0790\u07B0 (\u078B\u07A8\u0788\u07AC\u0780\u07A8 \u0783\u07A7\u0787\u07B0\u0796\u07AC)", rtl: true });
({ id: e.Dutch, language: { code: o.Dutch, name: "Dutch", native: "Nederlands" }, name: "Dutch", native_name: "Nederlands", rtl: false });
({ country: { code: r.Belgium, name: "Belgium", native: "Belgi\xEB" }, id: e.DutchBelgium, language: { code: o.Dutch, name: "Dutch", native: "Nederlands" }, name: "Dutch (Belgium)", native_name: "Nederlands (Belgi\xEB)", rtl: false });
({ country: { code: r.Netherlands, name: "Netherlands", native: "Nederland" }, id: e.DutchNetherlands, language: { code: o.Dutch, name: "Dutch", native: "Nederlands" }, name: "Dutch (Netherlands)", native_name: "Nederlands (Nederland)", rtl: false });
({ id: e.English, language: { code: o.English, name: "English", native: "English" }, name: "English", native_name: "English", rtl: false });
({ country: { code: r.Australia, name: "Australia", native: "Australia" }, id: e.EnglishAustralia, language: { code: o.English, name: "English", native: "English" }, name: "English (Australia)", native_name: "English (Australia)", rtl: false });
({ country: { code: r.Belgium, name: "Belgium", native: "Belgi\xEB" }, id: e.EnglishBelgium, language: { code: o.English, name: "English", native: "English" }, name: "English (Belgium)", native_name: "English (Belgi\xEB)", rtl: false });
({ country: { code: r.Canada, name: "Canada", native: "Canada" }, id: e.EnglishCanada, language: { code: o.English, name: "English", native: "English" }, name: "English (Canada)", native_name: "English (Canada)", rtl: false });
({ country: { code: r.Ireland, name: "Ireland", native: "\xC9ire" }, id: e.EnglishIreland, language: { code: o.English, name: "English", native: "English" }, name: "English (Ireland)", native_name: "English (\xC9ire)", rtl: false });
({ country: { code: r.Jamaica, name: "Jamaica", native: "Jamaica" }, id: e.EnglishJamaica, language: { code: o.English, name: "English", native: "English" }, name: "English (Jamaica)", native_name: "English (Jamaica)", rtl: false });
({ country: { code: r.NewZealand, name: "New Zealand", native: "New Zealand" }, id: e.EnglishNewZealand, language: { code: o.English, name: "English", native: "English" }, name: "English (New Zealand)", native_name: "English (New Zealand)", rtl: false });
({ country: { code: r.Philippines, name: "Philippines", native: "Philippines" }, id: e.EnglishPhilippines, language: { code: o.English, name: "English", native: "English" }, name: "English (Philippines)", native_name: "English (Philippines)", rtl: false });
({ country: { code: r.Singapore, name: "Singapore", native: "Singapore" }, id: e.EnglishSingapore, language: { code: o.English, name: "English", native: "English" }, name: "English (Singapore)", native_name: "English (Singapore)", rtl: false });
({ country: { code: r.SouthAfrica, name: "South Africa", native: "South Africa" }, id: e.EnglishSouthAfrica, language: { code: o.English, name: "English", native: "English" }, name: "English (South Africa)", native_name: "English (South Africa)", rtl: false });
({ country: { code: r.TrinidadAndTobago, name: "Trinidad and Tobago", native: "Trinidad and Tobago" }, id: e.EnglishTrinidadAndTobago, language: { code: o.English, name: "English", native: "English" }, name: "English (Trinidad and Tobago)", native_name: "English (Trinidad and Tobago)", rtl: false });
({ country: { code: r.UnitedKingdom, name: "United Kingdom", native: "United Kingdom" }, id: e.EnglishUnitedKingdom, language: { code: o.English, name: "English", native: "English" }, name: "English (United Kingdom)", native_name: "English (United Kingdom)", rtl: false });
({ country: { code: r.UnitedStates, name: "United States", native: "United States" }, id: e.EnglishUnitedStates, language: { code: o.English, name: "English", native: "English" }, name: "English (United States)", native_name: "English (United States)", rtl: false });
({ country: { code: r.Zimbabwe, name: "Zimbabwe", native: "Zimbabwe" }, id: e.EnglishZimbabwe, language: { code: o.English, name: "English", native: "English" }, name: "English (Zimbabwe)", native_name: "English (Zimbabwe)", rtl: false });
({ id: e.Esperanto, language: { code: o.Esperanto, name: "Esperanto", native: "Esperanto" }, name: "Esperanto", native_name: "Esperanto", rtl: false });
({ id: e.Estonian, language: { code: o.Estonian, name: "Estonian", native: "Eesti" }, name: "Estonian", native_name: "Eesti", rtl: false });
({ country: { code: r.Estonia, name: "Estonia", native: "Eesti" }, id: e.EstonianEstonia, language: { code: o.Estonian, name: "Estonian", native: "Eesti" }, name: "Estonian (Estonia)", native_name: "Eesti (Eesti)", rtl: false });
({ id: e.Faroese, language: { code: o.Faroese, name: "Faroese", native: "F\xF8royskt" }, name: "Faroese", native_name: "F\xF8royskt", rtl: false });
({ country: { code: r.FaroeIslands, name: "Faroe Islands", native: "F\xF8royar" }, id: e.FaroeseFaroeIslands, language: { code: o.Faroese, name: "Faroese", native: "F\xF8royskt" }, name: "Faroese (Faroe Islands)", native_name: "F\xF8royskt (F\xF8royar)", rtl: false });
({ id: e.Farsi, language: { code: o.Farsi, name: "Farsi", native: "\u0641\u0627\u0631\u0633\u06CC" }, name: "Farsi", native_name: "\u0641\u0627\u0631\u0633\u06CC", rtl: true });
({ country: { code: r.Iran, name: "Iran", native: "\u0627\u06CC\u0631\u0627\u0646" }, id: e.FarsiIran, language: { code: o.Farsi, name: "Farsi", native: "\u0641\u0627\u0631\u0633\u06CC" }, name: "Farsi (Iran)", native_name: "\u0641\u0627\u0631\u0633\u06CC (\u0627\u06CC\u0631\u0627\u0646)", rtl: true });
({ id: e.Filipino, language: { code: o.Filipino, name: "Filipino", native: "Filipino" }, name: "Filipino", native_name: "Filipino", rtl: false });
({ country: { code: r.Philippines, name: "Philippines", native: "Pilipinas" }, id: e.FilipinoPhilippines, language: { code: o.Filipino, name: "Filipino", native: "Filipino" }, name: "Filipino (Philippines)", native_name: "Filipino (Pilipinas)", rtl: false });
({ id: e.Finnish, language: { code: o.Finnish, name: "Finnish", native: "Suomi" }, name: "Finnish", native_name: "Suomi", rtl: false });
({ country: { code: r.Finland, name: "Finland", native: "Suomi" }, id: e.FinnishFinland, language: { code: o.Finnish, name: "Finnish", native: "Suomi" }, name: "Finnish (Finland)", native_name: "Suomi (Suomi)", rtl: false });
({ id: e.French, language: { code: o.French, name: "French", native: "Fran\xE7ais" }, name: "French", native_name: "Fran\xE7ais", rtl: false });
({ country: { code: r.Belgium, name: "Belgium", native: "Belgique" }, id: e.FrenchBelgium, language: { code: o.French, name: "French", native: "Fran\xE7ais" }, name: "French (Belgium)", native_name: "Fran\xE7ais (Belgique)", rtl: false });
({ country: { code: r.Canada, name: "Canada", native: "Canada" }, id: e.FrenchCanada, language: { code: o.French, name: "French", native: "Fran\xE7ais" }, name: "French (Canada)", native_name: "Fran\xE7ais (Canada)", rtl: false });
({ country: { code: r.France, name: "France", native: "France" }, id: e.FrenchFrance, language: { code: o.French, name: "French", native: "Fran\xE7ais" }, name: "French (France)", native_name: "Fran\xE7ais (France)", rtl: false });
({ country: { code: r.Luxembourg, name: "Luxembourg", native: "Luxembourg" }, id: e.FrenchLuxembourg, language: { code: o.French, name: "French", native: "Fran\xE7ais" }, name: "French (Luxembourg)", native_name: "Fran\xE7ais (Luxembourg)", rtl: false });
({ country: { code: r.Monaco, name: "Monaco", native: "Monaco" }, id: e.FrenchMonaco, language: { code: o.French, name: "French", native: "Fran\xE7ais" }, name: "French (Monaco)", native_name: "Fran\xE7ais (Monaco)", rtl: false });
({ country: { code: r.Reunion, name: "Reunion", native: "La R\xE9union" }, id: e.FrenchReunion, language: { code: o.French, name: "French", native: "Fran\xE7ais" }, name: "French (Reunion)", native_name: "Fran\xE7ais (La R\xE9union)", rtl: false });
({ country: { code: r.Switzerland, name: "Switzerland", native: "Suisse" }, id: e.FrenchSwitzerland, language: { code: o.French, name: "French", native: "Fran\xE7ais" }, name: "French (Switzerland)", native_name: "Fran\xE7ais (Suisse)", rtl: false });
({ id: e.Frisian, language: { code: o.Frisian, name: "Frisian", native: "Frysk" }, name: "Frisian", native_name: "Frysk", rtl: false });
({ country: { code: r.Netherlands, name: "Netherlands", native: "Nederland" }, id: e.FrisianNetherlands, language: { code: o.Frisian, name: "Frisian", native: "Frysk" }, name: "Frisian (Netherlands)", native_name: "Frysk (Nederland)", rtl: false });
({ id: e.Galician, language: { code: o.Galician, name: "Galician", native: "Galego" }, name: "Galician", native_name: "Galego", rtl: false });
({ country: { code: r.Spain, name: "Spain", native: "Espa\xF1a" }, id: e.GalicianSpain, language: { code: o.Galician, name: "Galician", native: "Galego" }, name: "Galician (Spain)", native_name: "Galego (Espa\xF1a)", rtl: false });
({ id: e.Georgian, language: { code: o.Georgian, name: "Georgian", native: "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8" }, name: "Georgian", native_name: "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8", rtl: false });
({ country: { code: r.Georgia, name: "Georgia", native: "\u10E1\u10D0\u10E5\u10D0\u10E0\u10D7\u10D5\u10D4\u10DA\u10DD" }, id: e.GeorgianGeorgia, language: { code: o.Georgian, name: "Georgian", native: "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8" }, name: "Georgian (Georgia)", native_name: "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8 (\u10E1\u10D0\u10E5\u10D0\u10E0\u10D7\u10D5\u10D4\u10DA\u10DD)", rtl: false });
({ id: e.German, language: { code: o.German, name: "German", native: "Deutsch" }, name: "German", native_name: "Deutsch", rtl: false });
({ country: { code: r.Austria, name: "Austria", native: "\xD6sterreich" }, id: e.GermanAustria, language: { code: o.German, name: "German", native: "Deutsch" }, name: "German (Austria)", native_name: "Deutsch (\xD6sterreich)", rtl: false });
({ country: { code: r.Belgium, name: "Belgium", native: "Belgi\xEB" }, id: e.GermanBelgium, language: { code: o.German, name: "German", native: "Deutsch" }, name: "German (Belgium)", native_name: "Deutsch (Belgi\xEB)", rtl: false });
({ country: { code: r.Switzerland, name: "Switzerland", native: "Suisse" }, id: e.GermanSwitzerland, language: { code: o.German, name: "German", native: "Deutsch" }, name: "German (Switzerland)", native_name: "Deutsch (Suisse)", rtl: false });
({ country: { code: r.Liechtenstein, name: "Liechtenstein", native: "Liechtenstein" }, id: e.GermanLiechtenstein, language: { code: o.German, name: "German", native: "Deutsch" }, name: "German (Liechtenstein)", native_name: "Deutsch (Liechtenstein)", rtl: false });
({ country: { code: r.Luxembourg, name: "Luxembourg", native: "Luxembourg" }, id: e.GermanLuxembourg, language: { code: o.German, name: "German", native: "Deutsch" }, name: "German (Luxembourg)", native_name: "Deutsch (Luxembourg)", rtl: false });
({ id: e.Greek, language: { code: o.Greek, name: "Greek", native: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC" }, name: "Greek", native_name: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC", rtl: false });
({ country: { code: r.Greece, name: "Greece", native: "\u0395\u03BB\u03BB\u03AC\u03B4\u03B1" }, id: e.GreekGreece, language: { code: o.Greek, name: "Greek", native: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC" }, name: "Greek (Greece)", native_name: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC (\u0395\u03BB\u03BB\u03AC\u03B4\u03B1)", rtl: false });
({ id: e.Greenlandic, language: { code: o.Greenlandic, name: "Greenlandic", native: "Kalaallisut" }, name: "Greenlandic", native_name: "Kalaallisut", rtl: false });
({ country: { code: r.Greenland, name: "Greenland", native: "Kalaallit Nunaat" }, id: e.GreenlandicGreenland, language: { code: o.Greenlandic, name: "Greenlandic", native: "Kalaallisut" }, name: "Greenlandic (Greenland)", native_name: "Kalaallisut (Kalaallit Nunaat)", rtl: false });
({ id: e.Gujarati, language: { code: o.Gujarati, name: "Gujarati", native: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0" }, name: "Gujarati", native_name: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0", rtl: false });
({ country: { code: r.India, name: "India", native: "\u092D\u093E\u0930\u0924" }, id: e.GujaratiIndia, language: { code: o.Gujarati, name: "Gujarati", native: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0" }, name: "Gujarati (India)", native_name: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0 (\u092D\u093E\u0930\u0924)", rtl: false });
({ id: e.Hausa, language: { code: o.Hausa, name: "Hausa", native: "\u0647\u064E\u0648\u064F\u0633\u064E" }, name: "Hausa", native_name: "\u0647\u064E\u0648\u064F\u0633\u064E", rtl: false });
({ country: { code: r.Ghana, name: "Ghana", native: "Ghana" }, id: e.HausaGhana, language: { code: o.Hausa, name: "Hausa", native: "\u0647\u064E\u0648\u064F\u0633\u064E" }, name: "Hausa (Ghana)", native_name: "\u0647\u064E\u0648\u064F\u0633\u064E (Ghana)", rtl: false });
({ country: { code: r.Niger, name: "Niger", native: "Niger" }, id: e.HausaNiger, language: { code: o.Hausa, name: "Hausa", native: "\u0647\u064E\u0648\u064F\u0633\u064E" }, name: "Hausa (Niger)", native_name: "\u0647\u064E\u0648\u064F\u0633\u064E (Niger)", rtl: false });
({ country: { code: r.Nigeria, name: "Nigeria", native: "Nigeria" }, id: e.HausaNigeria, language: { code: o.Hausa, name: "Hausa", native: "\u0647\u064E\u0648\u064F\u0633\u064E" }, name: "Hausa (Nigeria)", native_name: "\u0647\u064E\u0648\u064F\u0633\u064E (Nigeria)", rtl: false });
({ id: e.Hebrew, language: { code: o.Hebrew, name: "Hebrew", native: "\u05E2\u05D1\u05E8\u05D9\u05EA" }, name: "Hebrew", native_name: "\u05E2\u05D1\u05E8\u05D9\u05EA", rtl: true });
({ country: { code: r.Israel, name: "Hebrew", native: "" }, id: e.HebrewIsrael, language: { code: o.Hebrew, name: "Hebrew", native: "" }, name: "Hebrew (Israel)", native_name: "", rtl: true });
({ id: e.Hindi, language: { code: o.Hindi, name: "Hindi", native: "\u0939\u093F\u0928\u094D\u0926\u0940" }, name: "Hindi", native_name: "\u0939\u093F\u0928\u094D\u0926\u0940", rtl: false });
({ country: { code: r.India, name: "India", native: "\u092D\u093E\u0930\u0924" }, id: e.HindiIndia, language: { code: o.Hindi, name: "Hindi", native: "\u092D\u093E\u0930\u0924\u0940\u092F" }, name: "Hindi (India)", native_name: "\u092D\u093E\u0930\u0924\u0940\u092F", rtl: false });
({ id: e.Hungarian, language: { code: o.Hungarian, name: "Hungarian", native: "Magyar" }, name: "Hungarian", native_name: "Magyar", rtl: false });
({ country: { code: r.Hungary, name: "Hungary", native: "Magyarorsz\xE1g" }, id: e.HungarianHungary, language: { code: o.Hungarian, name: "Hungarian", native: "Magyar" }, name: "Hungarian (Hungary)", native_name: "Magyar (Magyarorsz\xE1g)", rtl: false });
({ id: e.Icelandic, language: { code: o.Icelandic, name: "Icelandic", native: "\xCDslenska" }, name: "Icelandic", native_name: "\xCDslenska", rtl: false });
({ country: { code: r.Iceland, name: "Iceland", native: "\xCDsland" }, id: e.IcelandicIceland, language: { code: o.Icelandic, name: "Icelandic", native: "\xCDslenska" }, name: "Icelandic (Iceland)", native_name: "\xCDslenska (\xCDsland)", rtl: false });
({ id: e.Igbo, language: { code: o.Igbo, name: "Igbo", native: "Igbo" }, name: "Igbo", native_name: "Igbo", rtl: false });
({ id: e.Indonesian, language: { code: o.Indonesian, name: "Indonesian", native: "Bahasa Indonesia" }, name: "Indonesian", native_name: "Bahasa Indonesia", rtl: false });
({ country: { code: r.Indonesia, name: "Indonesia", native: "Indonesia" }, id: e.IndonesianIndonesia, language: { code: o.Indonesian, name: "Indonesian", native: "Bahasa Indonesia" }, name: "Indonesian (Indonesia)", native_name: "Bahasa Indonesia (Indonesia)", rtl: false });
({ id: e.Irish, language: { code: o.Irish, name: "Irish", native: "Gaeilge" }, name: "Irish", native_name: "Gaeilge", rtl: false });
({ country: { code: r.Ireland, name: "Ireland", native: "\xC9ire" }, id: e.IrishIreland, language: { code: o.Irish, name: "Irish", native: "Gaeilge" }, name: "Irish (Ireland)", native_name: "Gaeilge (\xC9ire)", rtl: false });
({ id: e.Italian, language: { code: o.Italian, name: "Italian", native: "Italiano" }, name: "Italian", native_name: "Italiano", rtl: false });
({ country: { code: r.Italy, name: "Italy", native: "Italia" }, id: e.ItalianItaly, language: { code: o.Italian, name: "Italian", native: "Italiano" }, name: "Italian (Italy)", native_name: "Italiano (Italia)", rtl: false });
({ country: { code: r.Switzerland, name: "Switzerland", native: "Schweiz" }, id: e.ItalianSwitzerland, language: { code: o.Italian, name: "Italian", native: "Italiano" }, name: "Italian (Switzerland)", native_name: "Italiano (Svizzera)", rtl: false });
({ id: e.Japanese, language: { code: o.Japanese, name: "Japanese", native: "\u65E5\u672C\u8A9E" }, name: "Japanese", native_name: "\u65E5\u672C\u8A9E", rtl: false });
({ country: { code: r.Japan, name: "Japan", native: "\u65E5\u672C" }, id: e.JapaneseJapan, language: { code: o.Japanese, name: "Japanese", native: "\u65E5\u672C\u8A9E" }, name: "Japanese (Japan)", native_name: "\u65E5\u672C\u8A9E (\u65E5\u672C)", rtl: false });
({ id: e.Kannada, language: { code: o.Kannada, name: "Kannada", native: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1" }, name: "Kannada", native_name: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1", rtl: false });
({ country: { code: r.India, name: "India", native: "\u0CAD\u0CBE\u0CB0\u0CA4" }, id: e.KannadaIndia, language: { code: o.Kannada, name: "Kannada", native: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1" }, name: "Kannada (India)", native_name: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1 (\u0CAD\u0CBE\u0CB0\u0CA4)", rtl: false });
({ id: e.Kazakh, language: { code: o.Kazakh, name: "Kazakh", native: "\u049A\u0430\u0437\u0430\u049B \u0442\u0456\u043B\u0456" }, name: "Kazakh", native_name: "\u049A\u0430\u0437\u0430\u049B \u0442\u0456\u043B\u0456", rtl: false });
({ country: { code: r.Kazakhstan, name: "Kazakhstan", native: "\u049A\u0430\u0437\u0430\u049B\u0441\u0442\u0430\u043D" }, id: e.KazakhKazakhstan, language: { code: o.Kazakh, name: "Kazakh", native: "\u049A\u0430\u0437\u0430\u049B \u0442\u0456\u043B\u0456" }, name: "Kazakh (Kazakhstan)", native_name: "\u049A\u0430\u0437\u0430\u049B \u0442\u0456\u043B\u0456 (\u049A\u0430\u0437\u0430\u049B\u0441\u0442\u0430\u043D)", rtl: false });
({ id: e.Khmer, language: { code: o.Khmer, name: "Khmer", native: "\u1797\u17B6\u179F\u17B6\u1781\u17D2\u1798\u17C2\u179A" }, name: "Khmer", native_name: "\u1797\u17B6\u179F\u17B6\u1781\u17D2\u1798\u17C2\u179A", rtl: false });
({ country: { code: r.Cambodia, name: "Cambodia", native: "\u1780\u1798\u17D2\u1796\u17BB\u1787\u17B6" }, id: e.KhmerCambodia, language: { code: o.Khmer, name: "Khmer", native: "\u1797\u17B6\u179F\u17B6\u1781\u17D2\u1798\u17C2\u179A" }, name: "Khmer (Cambodia)", native_name: "\u1797\u17B6\u179F\u17B6\u1781\u17D2\u1798\u17C2\u179A (\u1780\u1798\u17D2\u1796\u17BB\u1787\u17B6)", rtl: false });
({ id: e.Konkani, language: { code: o.Konkani, name: "Konkani", native: "\u0915\u094B\u0902\u0915\u0923\u0940" }, name: "Konkani", native_name: "\u0915\u094B\u0902\u0915\u0923\u0940", rtl: false });
({ country: { code: r.India, name: "India", native: "\u092D\u093E\u0930\u0924" }, id: e.KonkaniIndia, language: { code: o.Konkani, name: "Konkani", native: "\u0915\u094B\u0902\u0915\u0923\u0940" }, name: "Konkani (India)", native_name: "\u0915\u094B\u0902\u0915\u0923\u0940 (\u092D\u093E\u0930\u0924)", rtl: false });
({ id: e.Korean, language: { code: o.Korean, name: "Korean", native: "\uD55C\uAD6D\uC5B4" }, name: "Korean", native_name: "\uD55C\uAD6D\uC5B4", rtl: false });
({ country: { code: r.SouthKorea, name: "South Korea", native: "\uB300\uD55C\uBBFC\uAD6D" }, id: e.KoreanSouthKorea, language: { code: o.Korean, name: "Korean", native: "\uD55C\uAD6D\uC5B4" }, name: "Korean (South Korea)", native_name: "\uD55C\uAD6D\uC5B4 (\uB300\uD55C\uBBFC\uAD6D)", rtl: false });
({ id: e.Kurdish, language: { code: o.Kurdish, name: "Kurdish", native: "Kurd\xEE" }, name: "Kurdish", native_name: "Kurd\xEE", rtl: false });
({ country: { code: r.Iraq, name: "Iraq", native: "\u0627\u0644\u0639\u0631\u0627\u0642" }, id: e.KurdishIraq, language: { code: o.Kurdish, name: "Kurdish", native: "Kurd\xEE" }, name: "Kurdish (Iraq)", native_name: "Kurd\xEE (\u0627\u0644\u0639\u0631\u0627\u0642)", rtl: false });
({ country: { code: r.Turkey, name: "Turkey", native: "T\xFCrkiye" }, id: e.KurdishTurkey, language: { code: o.Kurdish, name: "Kurdish", native: "Kurd\xEE" }, name: "Kurdish (Turkey)", native_name: "Kurd\xEE (T\xFCrkiye)", rtl: false });
({ id: e.Kyrgyz, language: { code: o.Kyrgyz, name: "Kyrgyz", native: "\u041A\u044B\u0440\u0433\u044B\u0437\u0447\u0430" }, name: "Kyrgyz", native_name: "\u041A\u044B\u0440\u0433\u044B\u0437\u0447\u0430", rtl: false });
({ country: { code: r.Kyrgyzstan, name: "Kyrgyzstan", native: "\u041A\u044B\u0440\u0433\u044B\u0437\u0441\u0442\u0430\u043D" }, id: e.KyrgyzKyrgyzstan, language: { code: o.Kyrgyz, name: "Kyrgyz", native: "\u041A\u044B\u0440\u0433\u044B\u0437\u0447\u0430" }, name: "Kyrgyz (Kyrgyzstan)", native_name: "\u041A\u044B\u0440\u0433\u044B\u0437\u0447\u0430 (\u041A\u044B\u0440\u0433\u044B\u0437\u0441\u0442\u0430\u043D)", rtl: false });
({ id: e.Lao, language: { code: o.Lao, name: "Lao", native: "\u0EA5\u0EB2\u0EA7" }, name: "Lao", native_name: "\u0EA5\u0EB2\u0EA7", rtl: false });
({ country: { code: r.Laos, name: "Laos", native: "\u0EAA.\u0E9B.\u0E9B\u0EB0\u0E8A\u0EB2\u0E97\u0EB4\u0E9B\u0EB0\u0EC4\u0E95" }, id: e.LaoLaos, language: { code: o.Lao, name: "Lao", native: "\u0EA5\u0EB2\u0EA7" }, name: "Lao (Laos)", native_name: "\u0EA5\u0EB2\u0EA7 (\u0EAA.\u0E9B.\u0E9B\u0EB0\u0E8A\u0EB2\u0E97\u0EB4\u0E9B\u0EB0\u0EC4\u0E95)", rtl: false });
({ id: e.Latvian, language: { code: o.Latvian, name: "Latvian", native: "Latvie\u0161u" }, name: "Latvian", native_name: "Latvie\u0161u", rtl: false });
({ country: { code: r.Latvia, name: "Latvia", native: "Latvija" }, id: e.LatvianLatvia, language: { code: o.Latvian, name: "Latvian", native: "Latvie\u0161u" }, name: "Latvian (Latvia)", native_name: "Latvie\u0161u (Latvija)", rtl: false });
({ id: e.Lithuanian, language: { code: o.Lithuanian, name: "Lithuanian", native: "Lietuvi\u0173" }, name: "Lithuanian", native_name: "Lietuvi\u0173", rtl: false });
({ country: { code: r.Lithuania, name: "Lithuania", native: "Lietuva" }, id: e.LithuanianLithuania, language: { code: o.Lithuanian, name: "Lithuanian", native: "Lietuvi\u0173" }, name: "Lithuanian (Lithuania)", native_name: "Lietuvi\u0173 (Lietuva)", rtl: false });
({ id: e.Luxembourgish, language: { code: o.Luxembourgish, name: "Luxembourgish", native: "L\xEBtzebuergesch" }, name: "Luxembourgish", native_name: "L\xEBtzebuergesch", rtl: false });
({ country: { code: r.Belgium, name: "Belgium", native: "Belgi\xEB" }, id: e.LuxembourgishBelgium, language: { code: o.Luxembourgish, name: "Luxembourgish", native: "L\xEBtzebuergesch" }, name: "Luxembourgish (Belgium)", native_name: "L\xEBtzebuergesch (Belgi\xEB)", rtl: false });
({ country: { code: r.Luxembourg, name: "Luxembourg", native: "Luxembourg" }, id: e.LuxembourgishLuxembourg, language: { code: o.Luxembourgish, name: "Luxembourgish", native: "L\xEBtzebuergesch" }, name: "Luxembourgish (Luxembourg)", native_name: "L\xEBtzebuergesch (Luxembourg)", rtl: false });
({ id: e.Macedonian, language: { code: o.Macedonian, name: "Macedonian", native: "\u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438" }, name: "Macedonian", native_name: "\u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438", rtl: false });
({ country: { code: r.NorthMacedonia, name: "Macedonia", native: "\u0421\u0435\u0432\u0435\u0440\u043D\u0430 \u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0438\u0458\u0430" }, id: e.MacedonianNorthMacedonia, language: { code: o.Macedonian, name: "Macedonian", native: "\u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438" }, name: "Macedonian (North Macedonia)", native_name: "\u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438 (\u0421\u0435\u0432\u0435\u0440\u043D\u0430 \u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0438\u0458\u0430)", rtl: false });
({ id: e.Malay, language: { code: o.Malay, name: "Malay", native: "Bahasa Melayu" }, name: "Malay", native_name: "Bahasa Melayu", rtl: false });
({ country: { code: r.Brunei, name: "Brunei", native: "Negara Brunei Darussalam" }, id: e.MalayBrunei, language: { code: o.Malay, name: "Malay", native: "Bahasa Melayu" }, name: "Malay (Brunei)", native_name: "Bahasa Melayu (Negara Brunei Darussalam)", rtl: false });
({ country: { code: r.Malaysia, name: "Malaysia", native: "Malaysia" }, id: e.MalayMalaysia, language: { code: o.Malay, name: "Malay", native: "Bahasa Melayu" }, name: "Malay (Malaysia)", native_name: "Bahasa Melayu (Malaysia)", rtl: false });
({ country: { code: r.Singapore, name: "Singapore", native: "Singapore" }, id: e.MalaySingapore, language: { code: o.Malay, name: "Malay", native: "Bahasa Melayu" }, name: "Malay (Singapore)", native_name: "Bahasa Melayu (Singapore)", rtl: false });
({ country: { code: r.India, name: "India", native: "\u092D\u093E\u0930\u0924" }, id: e.MalayIndia, language: { code: o.Malay, name: "Malay", native: "Bahasa Melayu" }, name: "Malay (India)", native_name: "Bahasa Melayu (\u092D\u093E\u0930\u0924)", rtl: false });
({ id: e.Maltese, language: { code: o.Maltese, name: "Maltese", native: "Malti" }, name: "Maltese", native_name: "Malti", rtl: false });
({ country: { code: r.Malta, name: "Malta", native: "Malta" }, id: e.MalteseMalta, language: { code: o.Maltese, name: "Maltese", native: "Malti" }, name: "Maltese (Malta)", native_name: "Malti (Malta)", rtl: false });
({ id: e.Maori, language: { code: o.Maori, name: "Maori", native: "M\u0101ori" }, name: "Maori", native_name: "M\u0101ori", rtl: false });
({ country: { code: r.NewZealand, name: "New Zealand", native: "New Zealand" }, id: e.MaoriNewZealand, language: { code: o.Maori, name: "Maori", native: "M\u0101ori" }, name: "Maori (New Zealand)", native_name: "M\u0101ori (New Zealand)", rtl: false });
({ id: e.Marathi, language: { code: o.Marathi, name: "Marathi", native: "\u092E\u0930\u093E\u0920\u0940" }, name: "Marathi", native_name: "\u092E\u0930\u093E\u0920\u0940", rtl: false });
({ country: { code: r.India, name: "India", native: "\u092D\u093E\u0930\u0924" }, id: e.MarathiIndia, language: { code: o.Marathi, name: "Marathi", native: "\u092E\u0930\u093E\u0920\u0940" }, name: "Marathi (India)", native_name: "\u092E\u0930\u093E\u0920\u0940 (\u092D\u093E\u0930\u0924)", rtl: false });
({ id: e.Mongolian, language: { code: o.Mongolian, name: "Mongolian", native: "\u041C\u043E\u043D\u0433\u043E\u043B" }, name: "Mongolian", native_name: "\u041C\u043E\u043D\u0433\u043E\u043B", rtl: false });
({ country: { code: r.Mongolia, name: "Mongolia", native: "\u041C\u043E\u043D\u0433\u043E\u043B \u0443\u043B\u0441" }, id: e.MongolianMongolia, language: { code: o.Mongolian, name: "Mongolian", native: "\u041C\u043E\u043D\u0433\u043E\u043B" }, name: "Mongolian (Mongolia)", native_name: "\u041C\u043E\u043D\u0433\u043E\u043B (\u041C\u043E\u043D\u0433\u043E\u043B \u0443\u043B\u0441)", rtl: false });
({ id: e.Montenegrin, language: { code: o.Montenegrin, name: "Montenegrin", native: "\u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430\u043A" }, name: "Montenegrin", native_name: "\u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430\u043A", rtl: false });
({ country: { code: r.Montenegro, name: "Montenegro", native: "\u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430\u043A" }, id: e.MontenegrinMontenegro, language: { code: o.Montenegrin, name: "Montenegrin", native: "\u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430\u043A" }, name: "Montenegrin (Montenegro)", native_name: "\u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430\u043A (\u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430\u043A)", rtl: false });
({ id: e.Nepali, language: { code: o.Nepali, name: "Nepali", native: "\u0928\u0947\u092A\u093E\u0932\u0940" }, name: "Nepali", native_name: "\u0928\u0947\u092A\u093E\u0932\u0940", rtl: false });
({ country: { code: r.Nepal, name: "Nepal", native: "\u0928\u0947\u092A\u093E\u0932" }, id: e.NepaliNepal, language: { code: o.Nepali, name: "Nepali", native: "\u0928\u0947\u092A\u093E\u0932\u0940" }, name: "Nepali (Nepal)", native_name: "\u0928\u0947\u092A\u093E\u0932\u0940 (\u0928\u0947\u092A\u093E\u0932)", rtl: false });
({ id: e.NorthernSotho, language: { code: o.NorthernSotho, name: "Northern Sotho", native: "Sesotho sa Leboa" }, name: "Northern Sotho", native_name: "Sesotho sa Leboa", rtl: false });
({ country: { code: r.SouthAfrica, name: "South Africa", native: "South Africa" }, id: e.NorthernSothoSouthAfrica, language: { code: o.NorthernSotho, name: "Northern Sotho", native: "Sesotho sa Leboa" }, name: "Northern Sotho (South Africa)", native_name: "Sesotho sa Leboa (South Africa)", rtl: false });
({ id: e.Norwegian, language: { code: o.Norwegian, name: "Norwegian", native: "Norsk" }, name: "Norwegian", native_name: "Norsk", rtl: false });
({ country: { code: r.Norway, name: "Norway", native: "Norge" }, id: e.NorwegianBokmalNorway, language: { code: o.NorwegianBokmal, name: "Norwegian", native: "Norsk" }, name: "Norwegian (Bokmal)", native_name: "Norsk (Bokm\xE5l)", rtl: false });
({ country: { code: r.Norway, name: "Norway", native: "Norge" }, id: e.NorwegianNynorskNorway, language: { code: o.NorwegianNynorsk, name: "Norwegian", native: "Norsk" }, name: "Norwegian (Nynorsk)", native_name: "Norsk (Nynorsk)", rtl: false });
({ id: e.Oriya, language: { code: o.Oriya, name: "Oriya", native: "\u0B13\u0B21\u0B3C\u0B3F\u0B06" }, name: "Oriya", native_name: "\u0B13\u0B21\u0B3C\u0B3F\u0B06", rtl: false });
({ country: { code: r.India, name: "India", native: "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE" }, id: e.OriyaIndia, language: { code: o.Oriya, name: "Oriya", native: "\u0B13\u0B21\u0B3C\u0B3F\u0B06" }, name: "Oriya (India)", native_name: "\u0B13\u0B21\u0B3C\u0B3F\u0B06 (\u0B2D\u0B3E\u0B30\u0B24)", rtl: false });
({ id: e.Pashto, language: { code: o.Pashto, name: "Pashto", native: "\u067E\u069A\u062A\u0648" }, name: "Pashto", native_name: "\u067E\u069A\u062A\u0648", rtl: true });
({ country: { code: r.Afghanistan, name: "Afghanistan", native: "\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646" }, id: e.PashtoAfghanistan, language: { code: o.Pashto, name: "Pashto", native: "\u067E\u069A\u062A\u0648" }, name: "Pashto (Afghanistan)", native_name: "\u067E\u069A\u062A\u0648 (\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646)", rtl: true });
({ id: e.Persian, language: { code: o.Persian, name: "Persian", native: "\u0641\u0627\u0631\u0633\u06CC" }, name: "Persian", native_name: "\u0641\u0627\u0631\u0633\u06CC", rtl: true });
({ country: { code: r.Iran, name: "Iran", native: "\u0627\u06CC\u0631\u0627\u0646" }, id: e.PersianIran, language: { code: o.Persian, name: "Persian", native: "\u0641\u0627\u0631\u0633\u06CC" }, name: "Persian (Iran)", native_name: "\u0641\u0627\u0631\u0633\u06CC (\u0627\u06CC\u0631\u0627\u0646)", rtl: true });
({ id: e.Polish, language: { code: o.Polish, name: "Polish", native: "Polski" }, name: "Polish", native_name: "Polski", rtl: false });
({ country: { code: r.Poland, name: "Poland", native: "Polska" }, id: e.PolishPoland, language: { code: o.Polish, name: "Polish", native: "Polski" }, name: "Polish (Poland)", native_name: "Polski (Polska)", rtl: false });
({ id: e.Portuguese, language: { code: o.Portuguese, name: "Portuguese", native: "Portugu\xEAs" }, name: "Portuguese", native_name: "Portugu\xEAs", rtl: false });
({ country: { code: r.Brazil, name: "Brazil", native: "Brasil" }, id: e.PortugueseBrazil, language: { code: o.Portuguese, name: "Portuguese", native: "Portugu\xEAs" }, name: "Portuguese (Brazil)", native_name: "Portugu\xEAs (Brasil)", rtl: false });
({ country: { code: r.Portugal, name: "Portugal", native: "Portugal" }, id: e.PortuguesePortugal, language: { code: o.Portuguese, name: "Portuguese", native: "Portugu\xEAs" }, name: "Portuguese (Portugal)", native_name: "Portugu\xEAs (Portugal)", rtl: false });
({ id: e.Punjabi, language: { code: o.Punjabi, name: "Punjabi", native: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40" }, name: "Punjabi", native_name: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40", rtl: true });
({ country: { code: r.Pakistan, name: "Pakistan", native: "\u067E\u0627\u06A9\u0633\u062A\u0627\u0646" }, id: e.PunjabiPakistan, language: { code: o.Punjabi, name: "Punjabi", native: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40" }, name: "Punjabi (Pakistan)", native_name: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40 (\u067E\u0627\u06A9\u0633\u062A\u0627\u0646)", rtl: true });
({ country: { code: r.India, name: "India", native: "\u0A2D\u0A3E\u0A30\u0A24" }, id: e.PunjabiIndia, language: { code: o.Punjabi, name: "Punjabi", native: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40" }, name: "Punjabi (India)", native_name: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40 (\u0A2D\u0A3E\u0A30\u0A24)", rtl: true });
({ id: e.Quechua, language: { code: o.Quechua, name: "Quechua", native: "Runa Simi" }, name: "Quechua", native_name: "Runa Simi", rtl: false });
({ country: { code: r.Bolivia, name: "Bolivia", native: "Bolivia" }, id: e.QuechuaBolivia, language: { code: o.Quechua, name: "Quechua", native: "Runa Simi" }, name: "Quechua (Bolivia)", native_name: "Runa Simi (Bolivia)", rtl: false });
({ country: { code: r.Ecuador, name: "Ecuador", native: "Ecuador" }, id: e.QuechuaEcuador, language: { code: o.Quechua, name: "Quechua", native: "Runa Simi" }, name: "Quechua (Ecuador)", native_name: "Runa Simi (Ecuador)", rtl: false });
({ country: { code: r.Peru, name: "Peru", native: "Per\xFA" }, id: e.QuechuaPeru, language: { code: o.Quechua, name: "Quechua", native: "Runa Simi" }, name: "Quechua (Peru)", native_name: "Runa Simi (Per\xFA)", rtl: false });
({ id: e.Romanian, language: { code: o.Romanian, name: "Romanian", native: "Rom\xE2n\u0103" }, name: "Romanian", native_name: "Rom\xE2n\u0103", rtl: false });
({ country: { code: r.Romania, name: "Romania", native: "Rom\xE2nia" }, id: e.RomanianRomania, language: { code: o.Romanian, name: "Romanian", native: "Rom\xE2n\u0103" }, name: "Romanian (Romania)", native_name: "Rom\xE2n\u0103 (Rom\xE2nia)", rtl: false });
({ id: e.Russian, language: { code: o.Russian, name: "Russian", native: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439" }, name: "Russian", native_name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439", rtl: false });
({ country: { code: r.RussianFederation, name: "Russian Federation", native: "\u0420\u043E\u0441\u0441\u0438\u044F" }, id: e.RussianRussia, language: { code: o.Russian, name: "Russian", native: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439" }, name: "Russian (Russia)", native_name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439 (\u0420\u043E\u0441\u0441\u0438\u044F)", rtl: false });
({ country: { code: r.Ukraine, name: "Ukraine", native: "\u0423\u043A\u0440\u0430\u0457\u043D\u0430" }, id: e.RussianUkraine, language: { code: o.Russian, name: "Russian", native: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439" }, name: "Russian (Ukraine)", native_name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439 (\u0423\u043A\u0440\u0430\u0457\u043D\u0430)", rtl: false });
({ country: { code: r.Kazakhstan, name: "Kazakhstan", native: "\u049A\u0430\u0437\u0430\u049B\u0441\u0442\u0430\u043D" }, id: e.RussianKazakhstan, language: { code: o.Russian, name: "Russian", native: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439" }, name: "Russian (Kazakhstan)", native_name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439 (\u049A\u0430\u0437\u0430\u049B\u0441\u0442\u0430\u043D)", rtl: false });
({ country: { code: r.Kyrgyzstan, name: "Kyrgyzstan", native: "\u041A\u044B\u0440\u0433\u044B\u0437\u0447\u0430" }, id: e.RussianKyrgyzstan, language: { code: o.Russian, name: "Russian", native: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439" }, name: "Russian (Kyrgyzstan)", native_name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439 (\u041A\u044B\u0440\u0433\u044B\u0437\u0447\u0430)", rtl: false });
({ id: e.Sanskrit, language: { code: o.Sanskrit, name: "Sanskrit", native: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924\u092E\u094D" }, name: "Sanskrit", native_name: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924\u092E\u094D", rtl: false });
({ country: { code: r.India, name: "India", native: "\u092D\u093E\u0930\u0924" }, id: e.SanskritIndia, language: { code: o.Sanskrit, name: "Sanskrit", native: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924\u092E\u094D" }, name: "Sanskrit (India)", native_name: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924\u092E\u094D (\u092D\u093E\u0930\u0924)", rtl: false });
({ id: e.Sami, language: { code: o.Sami, name: "Sami", native: "S\xE1megiella" }, name: "Sami", native_name: "S\xE1megiella", rtl: false });
({ country: { code: r.Finland, name: "Finland", native: "Suomi" }, id: e.SamiFinland, language: { code: o.Sami, name: "Sami", native: "S\xE1megiella" }, name: "Sami (Finland)", native_name: "S\xE1megiella (Suomi)", rtl: false });
({ country: { code: r.Norway, name: "Norway", native: "Norge" }, id: e.SamiNorway, language: { code: o.Sami, name: "Sami", native: "S\xE1megiella" }, name: "Sami (Norway)", native_name: "S\xE1megiella (Norge)", rtl: false });
({ country: { code: r.Sweden, name: "Sweden", native: "Sverige" }, id: e.SamiSweden, language: { code: o.Sami, name: "Sami", native: "S\xE1megiella" }, name: "Sami (Sweden)", native_name: "S\xE1megiella (Sverige)", rtl: false });
({ id: e.Samoan, language: { code: o.Samoan, name: "Samoan", native: "Gagana fa\u2019a S\u0101moa" }, name: "Samoan", native_name: "Gagana fa\u2019a S\u0101moa", rtl: false });
({ country: { code: r.Samoa, name: "Samoa", native: "Samoa" }, id: e.SamoanSamoa, language: { code: o.Samoan, name: "Samoan", native: "Gagana fa\u2019a S\u0101moa" }, name: "Samoan (Samoa)", native_name: "Gagana fa\u2019a S\u0101moa (Samoa)", rtl: false });
({ id: e.Serbian, language: { code: o.Serbian, name: "Serbian (Latin)", native: "Srpski (Latinica)" }, name: "Serbian (Latin)", native_name: "Srpski (Latinica)", rtl: false });
({ country: { code: r.BosniaAndHerzegovina, name: "Bosnia and Herzegovina", native: "Bosna i Hercegovina" }, id: e.SerbianBosniaAndHerzegovina, language: { code: o.Serbian, name: "Serbian (Latin)", native: "Srpski (Latinica)" }, name: "Serbian (Latin) (Bosnia and Herzegovina)", native_name: "Srpski (Latinica) (Bosna i Hercegovina)", rtl: false });
({ country: { code: r.SerbiaAndMontenegro, name: "Serbia and Montenegro", native: "Srbija i Crna Gora" }, id: e.SerbianSerbiaAndMontenegro, language: { code: o.Serbian, name: "Serbian (Latin)", native: "Srpski (Latinica)" }, name: "Serbian (Latin) (Serbia and Montenegro)", native_name: "Srpski (Latinica) (Srbija i Crna Gora)", rtl: false });
({ id: e.SerbianCyrillic, language: { code: o.SerbianCyrillic, name: "Serbian", native: "\u0421\u0440\u043F\u0441\u043A\u0438" }, name: "Serbian (Cyrillic)", native_name: "\u0421\u0440\u043F\u0441\u043A\u0438 (\u040B\u0438\u0440\u0438\u043B\u0438\u0446\u0430)", rtl: false });
({ country: { code: r.BosniaAndHerzegovina, name: "Bosnia and Herzegovina", native: "\u0411\u043E\u0441\u043D\u0430 \u0438 \u0425\u0435\u0440\u0446\u0435\u0433\u043E\u0432\u0438\u043D\u0430" }, id: e.SerbianCyrillicBosniaAndHerzegovina, language: { code: o.SerbianCyrillic, name: "Serbian", native: "\u0421\u0440\u043F\u0441\u043A\u0438" }, name: "Serbian (Cyrillic, Bosnia and Herzegovina)", native_name: "\u0421\u0440\u043F\u0441\u043A\u0438 (\u040B\u0438\u0440\u0438\u043B\u0438\u0446\u0430, \u0411\u043E\u0441\u043D\u0430 \u0438 \u0425\u0435\u0440\u0446\u0435\u0433\u043E\u0432\u0438\u043D\u0430)", rtl: false });
({ country: { code: r.SerbiaAndMontenegro, name: "Serbia and Montenegro", native: "\u0421\u0440\u0431\u0438\u0458\u0430 \u0438 \u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430" }, id: e.SerbianCyrillicSerbiaAndMontenegro, language: { code: o.SerbianCyrillic, name: "Serbian", native: "\u0421\u0440\u043F\u0441\u043A\u0438" }, name: "Serbian (Cyrillic, Serbia and Montenegro)", native_name: "\u0421\u0440\u043F\u0441\u043A\u0438 (\u040B\u0438\u0440\u0438\u043B\u0438\u0446\u0430, \u0421\u0440\u0431\u0438\u0458\u0430 \u0438 \u0426\u0440\u043D\u0430 \u0413\u043E\u0440\u0430)", rtl: false });
({ id: e.Slovak, language: { code: o.Slovak, name: "Slovak", native: "Sloven\u010Dina" }, name: "Slovak", native_name: "Sloven\u010Dina", rtl: false });
({ country: { code: r.Slovakia, name: "Slovakia", native: "Slovensko" }, id: e.SlovakSlovakia, language: { code: o.Slovak, name: "Slovak", native: "Sloven\u010Dina" }, name: "Slovak (Slovakia)", native_name: "Sloven\u010Dina (Slovensko)", rtl: false });
({ id: e.Slovenian, language: { code: o.Slovenian, name: "Slovenian", native: "Sloven\u0161\u010Dina" }, name: "Slovenian", native_name: "Sloven\u0161\u010Dina", rtl: false });
({ country: { code: r.Slovenia, name: "Slovenia", native: "Slovenija" }, id: e.SlovenianSlovenia, language: { code: o.Slovenian, name: "Slovenian", native: "Sloven\u0161\u010Dina" }, name: "Slovenian (Slovenia)", native_name: "Sloven\u0161\u010Dina (Slovenija)", rtl: false });
({ id: e.Somali, language: { code: o.Somali, name: "Somali", native: "Soomaaliga" }, name: "Somali", native_name: "Soomaaliga", rtl: true });
({ country: { code: r.Somalia, name: "Somalia", native: "Soomaaliya" }, id: e.SomaliSomalia, language: { code: o.Somali, name: "Somali", native: "Soomaaliga" }, name: "Somali (Somalia)", native_name: "Soomaaliga (Soomaaliya)", rtl: true });
({ id: e.Spanish, language: { code: o.Spanish, name: "Spanish", native: "Espa\xF1ol" }, name: "Spanish", native_name: "Espa\xF1ol", rtl: false });
({ country: { code: r.Argentina, name: "Argentina", native: "Argentina" }, id: e.SpanishArgentina, language: { code: o.Spanish, name: "Spanish", native: "Espa\xF1ol" }, name: "Spanish (Argentina)", native_name: "Espa\xF1ol (Argentina)", rtl: false });
({ country: { code: r.Bolivia, name: "Bolivia", native: "Bolivia" }, id: e.SpanishBolivia, language: { code: o.Spanish, name: "Spanish", native: "Espa\xF1ol" }, name: "Spanish (Bolivia)", native_name: "Espa\xF1ol (Bolivia)", rtl: false });
({ country: { code: r.Chile, name: "Chile", native: "Chile" }, id: e.SpanishChile, language: { code: o.Spanish, name: "Spanish", native: "Espa\xF1ol" }, name: "Spanish (Chile)", native_name: "Espa\xF1ol (Chile)", rtl: false });
({ country: { code: r.Colombia, name: "Colombia", native: "Colombia" }, id: e.SpanishColombia, language: { code: o.Spanish, name: "Spanish", native: "Espa\xF1ol" }, name: "Spanish (Colombia)", native_name: "Espa\xF1ol (Colombia)", rtl: false });
({ country: { code: r.CostaRica, name: "Costa Rica", native: "Costa Rica" }, id: e.SpanishCostaRica, language: { code: o.Spanish, name: "Spanish", native: "Espa\xF1ol" }, name: "Spanish (Costa Rica)", native_name: "Espa\xF1ol (Costa Rica)", rtl: false });
({ country: { code: r.Cuba, name: "Cuba", native: "Cuba" }, id: e.SpanishCuba, language: { code: o.Spanish, name: "Spanish", native: "Espa\xF1ol" }, name: "Spanish (Cuba)", native_name: "Espa\xF1ol (Cuba)", rtl: false });
({ country: { code: r.DominicanRepublic, name: "Dominican Republic", native: "Rep\xFAblica Dominicana" }, id: e.SpanishDominicanRepublic, language: { code: o.Spanish, name: "Spanish", native: "Espa\xF1ol" }, name: "Spanish (Dominican Republic)", native_name: "Espa\xF1ol (Rep\xFAblica Dominicana)", rtl: false });
({ country: { code: r.Ecuador, name: "Ecuador", native: "Ecuador" }, id: e.SpanishEcuador, language: { code: o.Spanish, name: "Spanish", native: "Espa\xF1ol" }, name: "Spanish (Ecuador)", native_name: "Espa\xF1ol (Ecuador)", rtl: false });
({ country: { code: r.ElSalvador, name: "El Salvador", native: "El Salvador" }, id: e.SpanishElSalvador, language: { code: o.Spanish, name: "Spanish", native: "Espa\xF1ol" }, name: "Spanish (El Salvador)", native_name: "Espa\xF1ol (El Salvador)", rtl: false });
({ country: { code: r.EquatorialGuinea, name: "Equatorial Guinea", native: "Guinea Ecuatorial" }, id: e.SpanishEquatorialGuinea, language: { code: o.Spanish, name: "Spanish", native: "Espa\xF1ol" }, name: "Spanish (Equatorial Guinea)", native_name: "Espa\xF1ol (Guinea Ecuatorial)", rtl: false });
({ country: { code: r.Guatemala, name: "Guatemala", native: "Guatemala" }, id: e.SpanishGuatemala, language: { code: o.Spanish, name: "Spanish", native: "Espa\xF1ol" }, name: "Spanish (Guatemala)", native_name: "Espa\xF1ol (Guatemala)", rtl: false });
({ country: { code: r.Honduras, name: "Honduras", native: "Honduras" }, id: e.SpanishHonduras, language: { code: o.Spanish, name: "Spanish", native: "Espa\xF1ol" }, name: "Spanish (Honduras)", native_name: "Espa\xF1ol (Honduras)", rtl: false });
({ country: { code: r.Mexico, name: "Mexico", native: "M\xE9xico" }, id: e.SpanishMexico, language: { code: o.Spanish, name: "Spanish", native: "Espa\xF1ol" }, name: "Spanish (Mexico)", native_name: "Espa\xF1ol (M\xE9xico)", rtl: false });
({ country: { code: r.Nicaragua, name: "Nicaragua", native: "Nicaragua" }, id: e.SpanishNicaragua, language: { code: o.Spanish, name: "Spanish", native: "Espa\xF1ol" }, name: "Spanish (Nicaragua)", native_name: "Espa\xF1ol (Nicaragua)", rtl: false });
({ country: { code: r.Panama, name: "Panama", native: "Panam\xE1" }, id: e.SpanishPanama, language: { code: o.Spanish, name: "Spanish", native: "Espa\xF1ol" }, name: "Spanish (Panama)", native_name: "Espa\xF1ol (Panam\xE1)", rtl: false });
({ country: { code: r.Paraguay, name: "Paraguay", native: "Paraguay" }, id: e.SpanishParaguay, language: { code: o.Spanish, name: "Spanish", native: "Espa\xF1ol" }, name: "Spanish (Paraguay)", native_name: "Espa\xF1ol (Paraguay)", rtl: false });
({ country: { code: r.Peru, name: "Peru", native: "Per\xFA" }, id: e.SpanishPeru, language: { code: o.Spanish, name: "Spanish", native: "Espa\xF1ol" }, name: "Spanish (Peru)", native_name: "Espa\xF1ol (Per\xFA)", rtl: false });
({ country: { code: r.PuertoRico, name: "Puerto Rico", native: "Puerto Rico" }, id: e.SpanishPuertoRico, language: { code: o.Spanish, name: "Spanish", native: "Espa\xF1ol" }, name: "Spanish (Puerto Rico)", native_name: "Espa\xF1ol (Puerto Rico)", rtl: false });
({ country: { code: r.Uruguay, name: "Uruguay", native: "Uruguay" }, id: e.SpanishUruguay, language: { code: o.Spanish, name: "Spanish", native: "Espa\xF1ol" }, name: "Spanish (Uruguay)", native_name: "Espa\xF1ol (Uruguay)", rtl: false });
({ country: { code: r.Venezuela, name: "Venezuela", native: "Venezuela" }, id: e.SpanishVenezuela, language: { code: o.Spanish, name: "Spanish", native: "Espa\xF1ol" }, name: "Spanish (Venezuela)", native_name: "Espa\xF1ol (Venezuela)", rtl: false });
({ country: { code: r.SouthAfrica, name: "South Africa", native: "South Africa" }, id: e.SutuSouthAfrica, language: { code: o.Sutu, name: "Sutu", native: "Sesotho" }, name: "Sutu (South Africa)", native_name: "Sesotho (Afrika Borwa)", rtl: false });
({ id: e.Swahili, language: { code: o.Swahili, name: "Swahili", native: "Kiswahili" }, name: "Swahili", native_name: "Kiswahili", rtl: false });
({ country: { code: r.Kenya, name: "Kenya", native: "Kenya" }, id: e.SwahiliKenya, language: { code: o.Swahili, name: "Swahili", native: "Kiswahili" }, name: "Swahili (Kenya)", native_name: "Kiswahili (Kenya)", rtl: false });
({ id: e.Swedish, language: { code: o.Swedish, name: "Swedish", native: "Svenska" }, name: "Swedish", native_name: "Svenska", rtl: false });
({ country: { code: r.Finland, name: "Finland", native: "Suomi" }, id: e.SwedishFinland, language: { code: o.Swedish, name: "Swedish", native: "Svenska" }, name: "Swedish (Finland)", native_name: "Svenska (Finland)", rtl: false });
({ country: { code: r.Sweden, name: "Sweden", native: "Sverige" }, id: e.SwedishSweden, language: { code: o.Swedish, name: "Swedish", native: "Svenska" }, name: "Swedish (Sweden)", native_name: "Svenska (Sverige)", rtl: false });
({ id: e.Syriac, language: { code: o.Syriac, name: "Syriac", native: "\u0723\u0718\u072A\u071D\u071D\u0710" }, name: "Syriac", native_name: "\u0723\u0718\u072A\u071D\u071D\u0710", rtl: true });
({ country: { code: r.Syria, name: "Syria", native: "\u0633\u0648\u0631\u064A\u0627" }, id: e.SyriacSyria, language: { code: o.Syriac, name: "Syriac", native: "\u0723\u0718\u072A\u071D\u071D\u0710" }, name: "Syriac (Syria)", native_name: "\u0723\u0718\u072A\u071D\u071D\u0710 (\u0633\u0648\u0631\u064A\u0627)", rtl: true });
({ id: e.Tajik, language: { code: o.Tajik, name: "Tajik", native: "\u0422\u043E\u04B7\u0438\u043A\u04E3" }, name: "Tajik", native_name: "\u0422\u043E\u04B7\u0438\u043A\u04E3", rtl: false });
({ country: { code: r.Tajikistan, name: "Tajikistan", native: "\u0422\u043E\u04B7\u0438\u043A\u0438\u0441\u0442\u043E\u043D" }, id: e.TajikTajikistan, language: { code: o.Tajik, name: "Tajik", native: "\u0422\u043E\u04B7\u0438\u043A\u04E3" }, name: "Tajik (Tajikistan)", native_name: "\u0422\u043E\u04B7\u0438\u043A\u04E3 (\u0422\u043E\u04B7\u0438\u043A\u0438\u0441\u0442\u043E\u043D)", rtl: false });
({ id: e.Tagalog, language: { code: o.Tagalog, name: "Tagalog", native: "Tagalog" }, name: "Tagalog", native_name: "Tagalog", rtl: false });
({ country: { code: r.Philippines, name: "Philippines", native: "Pilipinas" }, id: e.TagalogPhilippines, language: { code: o.Tagalog, name: "Tagalog", native: "Tagalog" }, name: "Tagalog (Philippines)", native_name: "Tagalog (Pilipinas)", rtl: false });
({ id: e.Tamil, language: { code: o.Tamil, name: "Tamil", native: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD" }, name: "Tamil", native_name: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD", rtl: false });
({ country: { code: r.India, name: "India", native: "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE" }, id: e.TamilIndia, language: { code: o.Tamil, name: "Tamil", native: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD" }, name: "Tamil (India)", native_name: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD (\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE)", rtl: false });
({ id: e.Telugu, language: { code: o.Telugu, name: "Telugu", native: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41" }, name: "Telugu", native_name: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41", rtl: false });
({ country: { code: r.India, name: "India", native: "\u0C2D\u0C3E\u0C30\u0C24\u0C26\u0C47\u0C36\u0C02" }, id: e.TeluguIndia, language: { code: o.Telugu, name: "Telugu", native: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41" }, name: "Telugu (India)", native_name: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41 (\u0C2D\u0C3E\u0C30\u0C24\u0C26\u0C47\u0C36\u0C02)", rtl: false });
({ id: e.Thai, language: { code: o.Thai, name: "Thai", native: "\u0E44\u0E17\u0E22" }, name: "Thai", native_name: "\u0E44\u0E17\u0E22", rtl: false });
({ country: { code: r.Thailand, name: "Thailand", native: "\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28\u0E44\u0E17\u0E22" }, id: e.ThaiThailand, language: { code: o.Thai, name: "Thai", native: "\u0E44\u0E17\u0E22" }, name: "Thai (Thailand)", native_name: "\u0E44\u0E17\u0E22 (\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28\u0E44\u0E17\u0E22)", rtl: false });
({ id: e.Tibetan, language: { code: o.Tibetan, name: "Tibetan", native: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42" }, name: "Tibetan", native_name: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42", rtl: false });
({ country: { code: r.China, name: "China", native: "\u4E2D\u56FD" }, id: e.TibetanChina, language: { code: o.Tibetan, name: "Tibetan", native: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42" }, name: "Tibetan (China)", native_name: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42 (\u0F62\u0F92\u0FB1\u0F0B\u0F53\u0F42)", rtl: false });
({ country: { code: r.Bhutan, name: "Bhutan", native: "\u0F60\u0F56\u0FB2\u0F74\u0F42\u0F0B\u0F61\u0F74\u0F63\u0F0B\u0F66\u0FA4\u0FB1\u0F72\u0F0B\u0F63\u0F7A\u0F53\u0F4C\u0F0D" }, id: e.TibetanBhutan, language: { code: o.Tibetan, name: "Tibetan", native: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42" }, name: "Tibetan (Bhutan)", native_name: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42 (\u0F60\u0F56\u0FB2\u0F74\u0F42\u0F0B\u0F61\u0F74\u0F63\u0F0B\u0F66\u0FA4\u0FB1\u0F72\u0F0B\u0F63\u0F7A\u0F53\u0F4C\u0F0D)", rtl: false });
({ country: { code: r.India, name: "India", native: "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE" }, id: e.TibetanIndia, language: { code: o.Tibetan, name: "Tibetan", native: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42" }, name: "Tibetan (India)", native_name: "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42 (\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE)", rtl: false });
({ id: e.Tsonga, language: { code: o.Tsonga, name: "Tsonga", native: "Xitsonga" }, name: "Tsonga", native_name: "Xitsonga", rtl: false });
({ id: e.Tswana, language: { code: o.Tswana, name: "Tswana", native: "Setswana" }, name: "Tswana", native_name: "Setswana", rtl: false });
({ country: { code: r.SouthAfrica, name: "South Africa", native: "South Africa" }, id: e.TswanaSouthAfrica, language: { code: o.Tswana, name: "Tswana", native: "Setswana" }, name: "Tswana (South Africa)", native_name: "Setswana (South Africa)", rtl: false });
({ id: e.Turkish, language: { code: o.Turkish, name: "Turkish", native: "T\xFCrk\xE7e" }, name: "Turkish", native_name: "T\xFCrk\xE7e", rtl: false });
({ country: { code: r.Turkey, name: "Turkey", native: "T\xFCrkiye" }, id: e.TurkishTurkey, language: { code: o.Turkish, name: "Turkish", native: "T\xFCrk\xE7e" }, name: "Turkish (Turkey)", native_name: "T\xFCrk\xE7e (T\xFCrkiye)", rtl: false });
({ id: e.Ukrainian, language: { code: o.Ukrainian, name: "Ukrainian", native: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430" }, name: "Ukrainian", native_name: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430", rtl: false });
({ country: { code: r.Ukraine, name: "Ukraine", native: "\u0423\u043A\u0440\u0430\u0457\u043D\u0430" }, id: e.UkrainianUkraine, language: { code: o.Ukrainian, name: "Ukrainian", native: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430" }, name: "Ukrainian (Ukraine)", native_name: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430 (\u0423\u043A\u0440\u0430\u0457\u043D\u0430)", rtl: false });
({ id: e.Urdu, language: { code: o.Urdu, name: "Urdu", native: "\u0627\u0631\u062F\u0648" }, name: "Urdu", native_name: "\u0627\u0631\u062F\u0648", rtl: true });
({ country: { code: r.Afghanistan, name: "Afghanistan", native: "\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646" }, id: e.UrduAfghanistan, language: { code: o.Urdu, name: "Urdu", native: "\u0627\u0631\u062F\u0648" }, name: "Urdu (Afghanistan)", native_name: "\u0627\u0631\u062F\u0648 (\u0627\u0641\u063A\u0627\u0646\u0633\u062A\u0627\u0646)", rtl: true });
({ country: { code: r.India, name: "India", native: "\u092D\u093E\u0930\u0924" }, id: e.UrduIndia, language: { code: o.Urdu, name: "Urdu", native: "\u0627\u0631\u062F\u0648" }, name: "Urdu (India)", native_name: "\u0627\u0631\u062F\u0648 (\u092D\u093E\u0930\u0924)", rtl: true });
({ country: { code: r.Pakistan, name: "Pakistan", native: "\u067E\u0627\u06A9\u0633\u062A\u0627\u0646" }, id: e.UrduPakistan, language: { code: o.Urdu, name: "Urdu", native: "\u0627\u0631\u062F\u0648" }, name: "Urdu (Pakistan)", native_name: "\u0627\u0631\u062F\u0648 (\u067E\u0627\u06A9\u0633\u062A\u0627\u0646)", rtl: true });
({ id: e.Uzbek, language: { code: o.Uzbek, name: "Uzbek", native: "O\u02BBzbekcha" }, name: "Uzbek", native_name: "O\u02BBzbekcha", rtl: false });
({ country: { code: r.Uzbekistan, name: "Uzbekistan", native: "O\u02BBzbekiston" }, id: e.UzbekUzbekistan, language: { code: o.Uzbek, name: "Uzbek", native: "O\u02BBzbekcha" }, name: "Uzbek (Latin, Uzbekistan)", native_name: "O\u02BBzbekcha (O\u02BBzbekiston)", rtl: false });
({ country: { code: r.Uzbekistan, name: "Uzbekistan", native: "\u040E\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u043E\u043D" }, id: e.UzbekCyrillic, language: { code: o.Uzbek, name: "Uzbek", native: "\u040E\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u043E\u043D" }, name: "Uzbek (Cyrillic)", native_name: "\u040E\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u043E\u043D (\u040E\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u043E\u043D)", rtl: false });
({ id: e.Vietnamese, language: { code: o.Vietnamese, name: "Vietnamese", native: "Ti\u1EBFng Vi\u1EC7t" }, name: "Vietnamese", native_name: "Ti\u1EBFng Vi\u1EC7t", rtl: false });
({ country: { code: r.Vietnam, name: "Vietnam", native: "Vi\u1EC7t Nam" }, id: e.VietnameseVietnam, language: { code: o.Vietnamese, name: "Vietnamese", native: "Ti\u1EBFng Vi\u1EC7t" }, name: "Vietnamese (Vietnam)", native_name: "Ti\u1EBFng Vi\u1EC7t (Vi\u1EC7t Nam)", rtl: false });
({ id: e.Welsh, language: { code: o.Welsh, name: "Welsh", native: "Cymraeg" }, name: "Welsh", native_name: "Cymraeg", rtl: false });
({ country: { code: r.UnitedKingdom, name: "United Kingdom", native: "United Kingdom" }, id: e.WelshUnitedKingdom, language: { code: o.Welsh, name: "Welsh", native: "Cymraeg" }, name: "Welsh (United Kingdom)", native_name: "Cymraeg (United Kingdom)", rtl: false });
({ id: e.Xhosa, language: { code: o.Xhosa, name: "Xhosa", native: "isiXhosa" }, name: "Xhosa", native_name: "isiXhosa", rtl: false });
({ country: { code: r.SouthAfrica, name: "South Africa", native: "South Africa" }, id: e.XhosaSouthAfrica, language: { code: o.Xhosa, name: "Xhosa", native: "isiXhosa" }, name: "Xhosa (South Africa)", native_name: "isiXhosa (South Africa)", rtl: false });
({ id: e.Yiddish, language: { code: o.Yiddish, name: "Yiddish", native: "\u05D9\u05D9\u05B4\u05D3\u05D9\u05E9" }, name: "Yiddish", native_name: "\u05D9\u05D9\u05B4\u05D3\u05D9\u05E9", rtl: false });
({ id: e.Yoruba, language: { code: o.Yoruba, name: "Yoruba", native: "Yor\xF9b\xE1" }, name: "Yoruba", native_name: "Yor\xF9b\xE1", rtl: false });
({ country: { code: r.Nigeria, name: "Nigeria", native: "Nigeria" }, id: e.YorubaNigeria, language: { code: o.Yoruba, name: "Yoruba", native: "Yor\xF9b\xE1" }, name: "Yoruba (Nigeria)", native_name: "Yor\xF9b\xE1 (Nigeria)", rtl: false });
({ id: e.Zulu, language: { code: o.Zulu, name: "Zulu", native: "isiZulu" }, name: "Zulu", native_name: "isiZulu", rtl: false });
({ country: { code: r.SouthAfrica, name: "South Africa", native: "South Africa" }, id: e.ZuluSouthAfrica, language: { code: o.Zulu, name: "Zulu", native: "isiZulu" }, name: "Zulu (South Africa)", native_name: "isiZulu (South Africa)", rtl: false });
({ id: t.AfricaAbidjan, name: "Africa/Abidjan", offset: i$1.UTC_0, timezone: n$1.CoordinatedUniversalTime });
({ id: t.AfricaAccra, name: "Africa/Accra", offset: i$1.UTC_0, timezone: n$1.CoordinatedUniversalTime });
({ id: t.AfricaAddisAbaba, name: "Africa/Addis_Ababa", offset: i$1.UTC_PLUS_3, timezone: n$1.EastAfricaTime });
({ id: t.AfricaAlgiers, name: "Africa/Algiers", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.AfricaAsmara, name: "Africa/Asmara", offset: i$1.UTC_PLUS_3, timezone: n$1.EastAfricaTime });
({ id: t.AfricaBamako, name: "Africa/Bamako", offset: i$1.UTC_0, timezone: n$1.CoordinatedUniversalTime });
({ id: t.AfricaBangui, name: "Africa/Bangui", offset: i$1.UTC_PLUS_1, timezone: n$1.WestAfricaTime });
({ id: t.AfricaBanjul, name: "Africa/Banjul", offset: i$1.UTC_0, timezone: n$1.CoordinatedUniversalTime });
({ id: t.AfricaBissau, name: "Africa/Bissau", offset: i$1.UTC_0, timezone: n$1.CoordinatedUniversalTime });
({ id: t.AfricaBlantyre, name: "Africa/Blantyre", offset: i$1.UTC_PLUS_2, timezone: n$1.CentralAfricaTime });
({ id: t.AfricaBrazzaville, name: "Africa/Brazzaville", offset: i$1.UTC_PLUS_1, timezone: n$1.WestAfricaTime });
({ id: t.AfricaBujumbura, name: "Africa/Bujumbura", offset: i$1.UTC_PLUS_2, timezone: n$1.CentralAfricaTime });
({ id: t.AfricaCairo, name: "Africa/Cairo", offset: i$1.UTC_PLUS_2, timezone: n$1.EasternEuropeanTime });
({ id: t.AfricaCasablanca, name: "Africa/Casablanca", offset: i$1.UTC_PLUS_1, timezone: n$1.WesternEuropeanTime });
({ id: t.AfricaCeuta, name: "Africa/Ceuta", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.AfricaConakry, name: "Africa/Conakry", offset: i$1.UTC_0, timezone: n$1.CoordinatedUniversalTime });
({ id: t.AfricaDakar, name: "Africa/Dakar", offset: i$1.UTC_0, timezone: n$1.CoordinatedUniversalTime });
({ id: t.AfricaDarEsSalaam, name: "Africa/Dar_es_Salaam", offset: i$1.UTC_PLUS_3, timezone: n$1.EastAfricaTime });
({ id: t.AfricaDjibouti, name: "Africa/Djibouti", offset: i$1.UTC_PLUS_3, timezone: n$1.EastAfricaTime });
({ id: t.AfricaDouala, name: "Africa/Douala", offset: i$1.UTC_PLUS_1, timezone: n$1.WestAfricaTime });
({ id: t.AfricaElAaiun, name: "Africa/El_Aaiun", offset: i$1.UTC_PLUS_1, timezone: n$1.WestAfricaTime });
({ id: t.AfricaFreetown, name: "Africa/Freetown", offset: i$1.UTC_0, timezone: n$1.CoordinatedUniversalTime });
({ id: t.AfricaGaborone, name: "Africa/Gaborone", offset: i$1.UTC_PLUS_2, timezone: n$1.CentralAfricaTime });
({ id: t.AfricaHarare, name: "Africa/Harare", offset: i$1.UTC_PLUS_2, timezone: n$1.CentralAfricaTime });
({ id: t.AfricaJohannesburg, name: "Africa/Johannesburg", offset: i$1.UTC_PLUS_2, timezone: n$1.SouthAfricanStandardTime });
({ id: t.AfricaJuba, name: "Africa/Juba", offset: i$1.UTC_PLUS_3, timezone: n$1.EastAfricaTime });
({ id: t.AfricaKampala, name: "Africa/Kampala", offset: i$1.UTC_PLUS_3, timezone: n$1.EastAfricaTime });
({ id: t.AfricaKhartoum, name: "Africa/Khartoum", offset: i$1.UTC_PLUS_2, timezone: n$1.EastAfricaTime });
({ id: t.AfricaKigali, name: "Africa/Kigali", offset: i$1.UTC_PLUS_2, timezone: n$1.CentralAfricaTime });
({ id: t.AfricaKinshasa, name: "Africa/Kinshasa", offset: i$1.UTC_PLUS_1, timezone: n$1.WestAfricaTime });
({ id: t.AfricaLagos, name: "Africa/Lagos", offset: i$1.UTC_PLUS_1, timezone: n$1.WestAfricaTime });
({ id: t.AfricaLibreville, name: "Africa/Libreville", offset: i$1.UTC_PLUS_1, timezone: n$1.WestAfricaTime });
({ id: t.AfricaLome, name: "Africa/Lome", offset: i$1.UTC_0, timezone: n$1.CoordinatedUniversalTime });
({ id: t.AfricaLuanda, name: "Africa/Luanda", offset: i$1.UTC_PLUS_1, timezone: n$1.WestAfricaTime });
({ id: t.AfricaLubumbashi, name: "Africa/Lubumbashi", offset: i$1.UTC_PLUS_2, timezone: n$1.CentralAfricaTime });
({ id: t.AfricaLusaka, name: "Africa/Lusaka", offset: i$1.UTC_PLUS_2, timezone: n$1.CentralAfricaTime });
({ id: t.AfricaMalabo, name: "Africa/Malabo", offset: i$1.UTC_PLUS_1, timezone: n$1.WestAfricaTime });
({ id: t.AfricaMaputo, name: "Africa/Maputo", offset: i$1.UTC_PLUS_2, timezone: n$1.CentralAfricaTime });
({ id: t.AfricaMaseru, name: "Africa/Maseru", offset: i$1.UTC_PLUS_2, timezone: n$1.SouthAfricanStandardTime });
({ id: t.AfricaMbabane, name: "Africa/Mbabane", offset: i$1.UTC_PLUS_2, timezone: n$1.SouthAfricanStandardTime });
({ id: t.AfricaMogadishu, name: "Africa/Mogadishu", offset: i$1.UTC_PLUS_3, timezone: n$1.EastAfricaTime });
({ id: t.AfricaMonrovia, name: "Africa/Monrovia", offset: i$1.UTC_0, timezone: n$1.CoordinatedUniversalTime });
({ id: t.AfricaNairobi, name: "Africa/Nairobi", offset: i$1.UTC_PLUS_3, timezone: n$1.EastAfricaTime });
({ id: t.AfricaNdjamena, name: "Africa/Ndjamena", offset: i$1.UTC_PLUS_1, timezone: n$1.WestAfricaTime });
({ id: t.AfricaNiamey, name: "Africa/Niamey", offset: i$1.UTC_PLUS_1, timezone: n$1.WestAfricaTime });
({ id: t.AfricaNouakchott, name: "Africa/Nouakchott", offset: i$1.UTC_0, timezone: n$1.GreenwichMeanTime });
({ id: t.AfricaOuagadougou, name: "Africa/Ouagadougou", offset: i$1.UTC_0, timezone: n$1.CoordinatedUniversalTime });
({ id: t.AfricaPortoNovo, name: "Africa/Porto-Novo", offset: i$1.UTC_PLUS_1, timezone: n$1.WestAfricaTime });
({ id: t.AfricaSaoTome, name: "Africa/SaoTome", offset: i$1.UTC_0, timezone: n$1.CoordinatedUniversalTime });
({ id: t.AfricaTripoli, name: "Africa/Tripoli", offset: i$1.UTC_0, timezone: n$1.CoordinatedUniversalTime });
({ id: t.AfricaTunis, name: "Africa/Tunis", offset: i$1.UTC_0, timezone: n$1.CoordinatedUniversalTime });
({ id: t.AfricaWindhoek, name: "Africa/Windhoek", offset: i$1.UTC_PLUS_2, timezone: n$1.WestAfricaTime });
({ id: t.AmericaAdak, name: "America/Adak", offset: i$1.UTC_PLUS_10, timezone: n$1.HawaiiAleutianStandardTime });
({ id: t.AmericaAnchorage, name: "America/Anchorage", offset: i$1.UTC_PLUS_9, timezone: n$1.AlaskaStandardTime });
({ id: t.AmericaAnguilla, name: "America/Anguilla", offset: i$1.UTC_0, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaAntigua, name: "America/Antigua", offset: i$1.UTC_0, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaAraguaina, name: "America/Araguaina", offset: i$1.UTC_MINUS_3, timezone: n$1.BrasiliaTime });
({ id: t.AmericaArgentinaBuenosAires, name: "America/Argentina/Buenos_Aires", offset: i$1.UTC_MINUS_3, timezone: n$1.ArgentinaTime });
({ id: t.AmericaArgentinaCatamarca, name: "America/Argentina/Catamarca", offset: i$1.UTC_MINUS_3, timezone: n$1.ArgentinaTime });
({ id: t.AmericaArgentinaCordoba, name: "America/Argentina/Cordoba", offset: i$1.UTC_MINUS_3, timezone: n$1.ArgentinaTime });
({ id: t.AmericaArgentinaJujuy, name: "America/Argentina/Jujuy", offset: i$1.UTC_MINUS_3, timezone: n$1.ArgentinaTime });
({ id: t.AmericaArgentinaLaRioja, name: "America/Argentina/La_Rioja", offset: i$1.UTC_MINUS_3, timezone: n$1.ArgentinaTime });
({ id: t.AmericaArgentinaMendoza, name: "America/Argentina/Mendoza", offset: i$1.UTC_MINUS_3, timezone: n$1.ArgentinaTime });
({ id: t.AmericaArgentinaRioGallegos, name: "America/Argentina/Rio_Gallegos", offset: i$1.UTC_MINUS_3, timezone: n$1.ArgentinaTime });
({ id: t.AmericaArgentinaSalta, name: "America/Argentina/Salta", offset: i$1.UTC_MINUS_3, timezone: n$1.ArgentinaTime });
({ id: t.AmericaArgentinaSanJuan, name: "America/Argentina/San_Juan", offset: i$1.UTC_MINUS_3, timezone: n$1.ArgentinaTime });
({ id: t.AmericaArgentinaSanLuis, name: "America/Argentina/San_Luis", offset: i$1.UTC_MINUS_3, timezone: n$1.ArgentinaTime });
({ id: t.AmericaArgentinaTucuman, name: "America/Argentina/Tucuman", offset: i$1.UTC_MINUS_3, timezone: n$1.ArgentinaTime });
({ id: t.AmericaArgentinaUshuaia, name: "America/Argentina/Ushuaia", offset: i$1.UTC_MINUS_3, timezone: n$1.ArgentinaTime });
({ id: t.AmericaAruba, name: "America/Aruba", offset: i$1.UTC_0, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaAsuncion, name: "America/Asuncion", offset: i$1.UTC_MINUS_4, timezone: n$1.ParaguayTime });
({ id: t.AmericaAtikokan, name: "America/Atikokan", offset: i$1.UTC_0, timezone: n$1.EasternStandardTime });
({ id: t.AmericaAtka, name: "America/Atka", offset: i$1.UTC_MINUS_10, timezone: n$1.HawaiiAleutianStandardTime });
({ id: t.AmericaBahia, name: "America/Bahia", offset: i$1.UTC_MINUS_3, timezone: n$1.BrasiliaTime });
({ id: t.AmericaBahiaBanderas, name: "America/Bahia_Banderas", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaBarbados, name: "America/Barbados", offset: i$1.UTC_MINUS_4, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaBelem, name: "America/Belem", offset: i$1.UTC_MINUS_3, timezone: n$1.BrasiliaTime });
({ id: t.AmericaBelize, name: "America/Belize", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaBlancSablon, name: "America/Blanc-Sablon", offset: i$1.UTC_MINUS_4, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaBoaVista, name: "America/Boa_Vista", offset: i$1.UTC_MINUS_4, timezone: n$1.AmazonTime });
({ id: t.AmericaBogota, name: "America/Bogota", offset: i$1.UTC_MINUS_5, timezone: n$1.ColombiaTime });
({ id: t.AmericaBoise, name: "America/Boise", offset: i$1.UTC_MINUS_7, timezone: n$1.MountainStandardTime });
({ id: t.AmericaCambridgeBay, name: "America/Cambridge_Bay", offset: i$1.UTC_MINUS_7, timezone: n$1.MountainStandardTime });
({ id: t.AmericaCampoGrande, name: "America/Campo_Grande", offset: i$1.UTC_MINUS_4, timezone: n$1.AmazonTime });
({ id: t.AmericaCancun, name: "America/Cancun", offset: i$1.UTC_MINUS_5, timezone: n$1.EasternStandardTime });
({ id: t.AmericaCaracas, name: "America/Caracas", offset: i$1.UTC_MINUS_4, timezone: n$1.VenezuelaStandardTime });
({ id: t.AmericaCayenne, name: "America/Cayenne", offset: i$1.UTC_MINUS_3, timezone: n$1.FrenchGuianaTime });
({ id: t.AmericaCayman, name: "America/Cayman", offset: i$1.UTC_0, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaChicago, name: "America/Chicago", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaChihuahua, name: "America/Chihuahua", offset: i$1.UTC_MINUS_7, timezone: n$1.MountainStandardTime });
({ id: t.AmericaCoralHarbour, name: "America/Coral_Harbour", offset: i$1.UTC_MINUS_5, timezone: n$1.EasternStandardTime });
({ id: t.AmericaCordoba, name: "America/Cordoba", offset: i$1.UTC_MINUS_3, timezone: n$1.ArgentinaTime });
({ id: t.AmericaCostaRica, name: "America/Costa_Rica", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaCreston, name: "America/Creston", offset: i$1.UTC_MINUS_7, timezone: n$1.MountainStandardTime });
({ id: t.AmericaCuiaba, name: "America/Cuiaba", offset: i$1.UTC_MINUS_4, timezone: n$1.AmazonTime });
({ id: t.AmericaCuracao, name: "America/Curacao", offset: i$1.UTC_MINUS_4, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaDanmarkshavn, name: "America/Danmarkshavn", offset: i$1.UTC_0, timezone: n$1.GreenwichMeanTime });
({ id: t.AmericaDawson, name: "America/Dawson", offset: i$1.UTC_MINUS_8, timezone: n$1.PacificStandardTime });
({ id: t.AmericaDawsonCreek, name: "America/Dawson_Creek", offset: i$1.UTC_MINUS_8, timezone: n$1.PacificStandardTime });
({ id: t.AmericaDenver, name: "America/Denver", offset: i$1.UTC_MINUS_7, timezone: n$1.MountainStandardTime });
({ id: t.AmericaDetroit, name: "America/Detroit", offset: i$1.UTC_MINUS_5, timezone: n$1.EasternStandardTime });
({ id: t.AmericaDominica, name: "America/Dominica", offset: i$1.UTC_0, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaEdmonton, name: "America/Edmonton", offset: i$1.UTC_MINUS_7, timezone: n$1.MountainStandardTime });
({ id: t.AmericaEirunepe, name: "America/Eirunepe", offset: i$1.UTC_MINUS_5, timezone: n$1.AcreTime });
({ id: t.AmericaElSalvador, name: "America/El_Salvador", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaFortaleza, name: "America/Fortaleza", offset: i$1.UTC_MINUS_3, timezone: n$1.BrasiliaTime });
({ id: t.AmericaGlaceBay, name: "America/Glace_Bay", offset: i$1.UTC_0, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaGodthab, name: "America/Godthab", offset: i$1.UTC_MINUS_3, timezone: n$1.WestGreenlandTime });
({ id: t.AmericaGooseBay, name: "America/Goose_Bay", offset: i$1.UTC_0, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaGrandTurk, name: "America/Grand_Turk", offset: i$1.UTC_0, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaGrenada, name: "America/Grenada", offset: i$1.UTC_0, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaGuadeloupe, name: "America/Guadeloupe", offset: i$1.UTC_0, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaGuatemala, name: "America/Guatemala", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaGuayaquil, name: "America/Guayaquil", offset: i$1.UTC_MINUS_5, timezone: n$1.EcuadorTime });
({ id: t.AmericaGuyana, name: "America/Guyana", offset: i$1.UTC_0, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaHalifax, name: "America/Halifax", offset: i$1.UTC_0, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaHavana, name: "America/Havana", offset: i$1.UTC_MINUS_5, timezone: n$1.CubaStandardTime });
({ id: t.AmericaHermosillo, name: "America/Hermosillo", offset: i$1.UTC_MINUS_7, timezone: n$1.MountainStandardTime });
({ id: t.AmericaIndianaIndianapolis, name: "America/Indiana/Indianapolis", offset: i$1.UTC_MINUS_5, timezone: n$1.EasternStandardTime });
({ id: t.AmericaIndianaKnox, name: "America/Indiana/Knox", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaIndianaMarengo, name: "America/Indiana/Marengo", offset: i$1.UTC_MINUS_5, timezone: n$1.EasternStandardTime });
({ id: t.AmericaIndianaPetersburg, name: "America/Indiana/Petersburg", offset: i$1.UTC_MINUS_5, timezone: n$1.EasternStandardTime });
({ id: t.AmericaIndianaTellCity, name: "America/Indiana/Tell_City", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaIndianaVevay, name: "America/Indiana/Vevay", offset: i$1.UTC_MINUS_5, timezone: n$1.EasternStandardTime });
({ id: t.AmericaIndianaVincennes, name: "America/Indiana/Vincennes", offset: i$1.UTC_MINUS_5, timezone: n$1.EasternStandardTime });
({ id: t.AmericaIndianaWinamac, name: "America/Indiana/Winamac", offset: i$1.UTC_MINUS_5, timezone: n$1.EasternStandardTime });
({ id: t.AmericaInuvik, name: "America/Inuvik", offset: i$1.UTC_MINUS_7, timezone: n$1.MountainStandardTime });
({ id: t.AmericaIqaluit, name: "America/Iqaluit", offset: i$1.UTC_0, timezone: n$1.EasternStandardTime });
({ id: t.AmericaJamaica, name: "America/Jamaica", offset: i$1.UTC_MINUS_4, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaJuneau, name: "America/Juneau", offset: i$1.UTC_MINUS_9, timezone: n$1.AlaskaStandardTime });
({ id: t.AmericaKentuckyLouisville, name: "America/Kentucky/Louisville", offset: i$1.UTC_MINUS_5, timezone: n$1.EasternStandardTime });
({ id: t.AmericaKentuckyMonticello, name: "America/Kentucky/Monticello", offset: i$1.UTC_MINUS_5, timezone: n$1.EasternStandardTime });
({ id: t.AmericaKralendijk, name: "America/Kralendijk", offset: i$1.UTC_MINUS_4, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaLaPaz, name: "America/La_Paz", offset: i$1.UTC_MINUS_4, timezone: n$1.BoliviaTime });
({ id: t.AmericaLima, name: "America/Lima", offset: i$1.UTC_MINUS_5, timezone: n$1.PeruTime });
({ id: t.AmericaLosAngeles, name: "America/Los_Angeles", offset: i$1.UTC_MINUS_8, timezone: n$1.PacificStandardTime });
({ id: t.AmericaLouisville, name: "America/Louisville", offset: i$1.UTC_MINUS_5, timezone: n$1.EasternStandardTime });
({ id: t.AmericaLowerPrinces, name: "America/Lower_Princes", offset: i$1.UTC_MINUS_4, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaMaceio, name: "America/Maceio", offset: i$1.UTC_MINUS_3, timezone: n$1.BrasiliaTime });
({ id: t.AmericaManagua, name: "America/Managua", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaManaus, name: "America/Manaus", offset: i$1.UTC_MINUS_4, timezone: n$1.AmazonTime });
({ id: t.AmericaMarigot, name: "America/Marigot", offset: i$1.UTC_MINUS_4, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaMartinique, name: "America/Martinique", offset: i$1.UTC_MINUS_4, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaMatamoros, name: "America/Matamoros", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaMazatlan, name: "America/Mazatlan", offset: i$1.UTC_MINUS_7, timezone: n$1.MountainStandardTime });
({ id: t.AmericaMenominee, name: "America/Menominee", offset: i$1.UTC_MINUS_5, timezone: n$1.CentralStandardTime });
({ id: t.AmericaMerida, name: "America/Merida", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaMetlakatla, name: "America/Metlakatla", offset: i$1.UTC_MINUS_9, timezone: n$1.AlaskaStandardTime });
({ id: t.AmericaMexicoCity, name: "America/Mexico_City", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaMiquelon, name: "America/Miquelon", offset: i$1.UTC_MINUS_3, timezone: n$1.SaintPierreAndMiquelonStandardTime });
({ id: t.AmericaMoncton, name: "America/Moncton", offset: i$1.UTC_MINUS_4, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaMonterrey, name: "America/Monterrey", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaMontevideo, name: "America/Montevideo", offset: i$1.UTC_MINUS_3, timezone: n$1.UruguayStandardTime });
({ id: t.AmericaMontreal, name: "America/Montreal", offset: i$1.UTC_MINUS_5, timezone: n$1.EasternStandardTime });
({ id: t.AmericaMontserrat, name: "America/Montserrat", offset: i$1.UTC_MINUS_4, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaNassau, name: "America/Nassau", offset: i$1.UTC_MINUS_5, timezone: n$1.EasternStandardTime });
({ id: t.AmericaNewYork, name: "America/New_York", offset: i$1.UTC_MINUS_5, timezone: n$1.EasternStandardTime });
({ id: t.AmericaNipigon, name: "America/Nipigon", offset: i$1.UTC_MINUS_5, timezone: n$1.EasternStandardTime });
({ id: t.AmericaNome, name: "America/Nome", offset: i$1.UTC_MINUS_9, timezone: n$1.AlaskaStandardTime });
({ id: t.AmericaNoronha, name: "America/Noronha", offset: i$1.UTC_MINUS_2, timezone: n$1.FernandoDeNoronhaTime });
({ id: t.AmericaNorthDakotaBeulah, name: "America/North_Dakota/Beulah", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaNorthDakotaCenter, name: "America/North_Dakota/Center", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaNorthDakotaNewSalem, name: "America/North_Dakota/New_Salem", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaOjinaga, name: "America/Ojinaga", offset: i$1.UTC_MINUS_7, timezone: n$1.MountainStandardTime });
({ id: t.AmericaPanama, name: "America/Panama", offset: i$1.UTC_MINUS_5, timezone: n$1.EasternStandardTime });
({ id: t.AmericaPangnirtung, name: "America/Pangnirtung", offset: i$1.UTC_MINUS_5, timezone: n$1.EasternStandardTime });
({ id: t.AmericaParamaribo, name: "America/Paramaribo", offset: i$1.UTC_MINUS_3, timezone: n$1.SurinameTime });
({ id: t.AmericaPhoenix, name: "America/Phoenix", offset: i$1.UTC_MINUS_7, timezone: n$1.MountainStandardTime });
({ id: t.AmericaPortAuPrince, name: "America/Port-au-Prince", offset: i$1.UTC_MINUS_5, timezone: n$1.EasternStandardTime });
({ id: t.AmericaPortOfSpain, name: "America/Port_of_Spain", offset: i$1.UTC_MINUS_4, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaPortoVelho, name: "America/Porto_Velho", offset: i$1.UTC_MINUS_4, timezone: n$1.AmazonTime });
({ id: t.AmericaPuertoRico, name: "America/Puerto_Rico", offset: i$1.UTC_MINUS_4, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaRainyRiver, name: "America/Rainy_River", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaRankinInlet, name: "America/Rankin_Inlet", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaRecife, name: "America/Recife", offset: i$1.UTC_MINUS_3, timezone: n$1.BrasiliaTime });
({ id: t.AmericaRegina, name: "America/Regina", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaResolute, name: "America/Resolute", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaRioBranco, name: "America/Rio_Branco", offset: i$1.UTC_MINUS_5, timezone: n$1.AcreTime });
({ id: t.AmericaSantaIsabel, name: "America/Santa_Isabel", offset: i$1.UTC_MINUS_8, timezone: n$1.PacificStandardTime });
({ id: t.AmericaSantarem, name: "America/Santarem", offset: i$1.UTC_MINUS_3, timezone: n$1.BrasiliaTime });
({ id: t.AmericaSantiago, name: "America/Santiago", offset: i$1.UTC_MINUS_4, timezone: n$1.ChileStandardTime });
({ id: t.AmericaSantoDomingo, name: "America/Santo_Domingo", offset: i$1.UTC_MINUS_4, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaSaoPaulo, name: "America/Sao_Paulo", offset: i$1.UTC_MINUS_3, timezone: n$1.BrasiliaTime });
({ id: t.AmericaScoresbysund, name: "America/Scoresbysund", offset: i$1.UTC_MINUS_1, timezone: n$1.EasternGreenlandTime });
({ id: t.AmericaShiprock, name: "America/Shiprock", offset: i$1.UTC_MINUS_7, timezone: n$1.MountainStandardTime });
({ id: t.AmericaSitka, name: "America/Sitka", offset: i$1.UTC_MINUS_9, timezone: n$1.AlaskaStandardTime });
({ id: t.AmericaStBarthelemy, name: "America/St_Barthelemy", offset: i$1.UTC_MINUS_4, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaStJohns, name: "America/St_Johns", offset: i$1.UTC_MINUS_3, timezone: n$1.NewfoundlandStandardTime });
({ id: t.AmericaStKitts, name: "America/St_Kitts", offset: i$1.UTC_MINUS_4, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaStLucia, name: "America/St_Lucia", offset: i$1.UTC_MINUS_4, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaStThomas, name: "America/St_Thomas", offset: i$1.UTC_MINUS_4, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaStVincent, name: "America/St_Vincent", offset: i$1.UTC_MINUS_4, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaSwiftCurrent, name: "America/Swift_Current", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaTegucigalpa, name: "America/Tegucigalpa", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaThule, name: "America/Thule", offset: i$1.UTC_MINUS_4, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaThunderBay, name: "America/Thunder_Bay", offset: i$1.UTC_MINUS_4, timezone: n$1.EasternStandardTime });
({ id: t.AmericaTijuana, name: "America/Tijuana", offset: i$1.UTC_MINUS_8, timezone: n$1.PacificStandardTime });
({ id: t.AmericaToronto, name: "America/Toronto", offset: i$1.UTC_MINUS_5, timezone: n$1.EasternStandardTime });
({ id: t.AmericaTortola, name: "America/Tortola", offset: i$1.UTC_MINUS_4, timezone: n$1.AtlanticStandardTime });
({ id: t.AmericaVancouver, name: "America/Vancouver", offset: i$1.UTC_MINUS_8, timezone: n$1.PacificStandardTime });
({ id: t.AmericaWhitehorse, name: "America/Whitehorse", offset: i$1.UTC_MINUS_8, timezone: n$1.PacificStandardTime });
({ id: t.AmericaWinnipeg, name: "America/Winnipeg", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AmericaYakutat, name: "America/Yakutat", offset: i$1.UTC_MINUS_9, timezone: n$1.AlaskaStandardTime });
({ id: t.AmericaYellowknife, name: "America/Yellowknife", offset: i$1.UTC_MINUS_6, timezone: n$1.MountainStandardTime });
({ id: t.AntarcticaCasey, name: "Antarctica/Casey", offset: i$1.UTC_MINUS_8, timezone: n$1.WesternStandardTime });
({ id: t.AntarcticaDavis, name: "Antarctica/Davis", offset: i$1.UTC_MINUS_7, timezone: n$1.NewfoundlandStandardTime });
({ id: t.AntarcticaDumontDUrville, name: "Antarctica/DumontDUrville", offset: i$1.UTC_MINUS_10, timezone: n$1.CentralStandardTime });
({ id: t.AntarcticaMacquarie, name: "Antarctica/Macquarie", offset: i$1.UTC_MINUS_11, timezone: n$1.CentralStandardTime });
({ id: t.AntarcticaMawson, name: "Antarctica/Mawson", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.AntarcticaMcMurdo, name: "Antarctica/McMurdo", offset: i$1.UTC_MINUS_12, timezone: n$1.NewZealandStandardTime });
({ id: t.AntarcticaPalmer, name: "Antarctica/Palmer", offset: i$1.UTC_MINUS_4, timezone: n$1.ChathamStandardTime });
({ id: t.AntarcticaRothera, name: "Antarctica/Rothera", offset: i$1.UTC_MINUS_3, timezone: n$1.RotheraResearchStationTime });
({ id: t.AntarcticaSyowa, name: "Antarctica/Syowa", offset: i$1.UTC_MINUS_3, timezone: n$1.ShowaStationTime });
({ id: t.AntarcticaTroll, name: "Antarctica/Troll", offset: i$1.UTC_MINUS_2, timezone: n$1.CentralStandardTime });
({ id: t.AntarcticaVostok, name: "Antarctica/Vostok", offset: i$1.UTC_MINUS_6, timezone: n$1.CentralStandardTime });
({ id: t.ArcticLongyearbyen, name: "Arctic/Longyearbyen", offset: i$1.UTC_MINUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.AsiaAden, name: "Asia/Aden", offset: i$1.UTC_PLUS_3, timezone: n$1.ArabiaStandardTime });
({ id: t.AsiaAlmaty, name: "Asia/Almaty", offset: i$1.UTC_PLUS_6, timezone: n$1.AlmaAtaTime });
({ id: t.AsiaAmman, name: "Asia/Amman", offset: i$1.UTC_PLUS_2, timezone: n$1.EasternEuropeanTime });
({ id: t.AsiaAnadyr, name: "Asia/Anadyr", offset: i$1.UTC_PLUS_12, timezone: n$1.NewCaledoniaTime });
({ id: t.AsiaAqtau, name: "Asia/Aqtau", offset: i$1.UTC_PLUS_5, timezone: n$1.AqtobeTime });
({ id: t.AsiaAqtobe, name: "Asia/Aqtobe", offset: i$1.UTC_PLUS_5, timezone: n$1.AqtobeTime });
({ id: t.AsiaAshgabat, name: "Asia/Ashgabat", offset: i$1.UTC_PLUS_5, timezone: n$1.TurkmenistanTime });
({ id: t.AsiaBaghdad, name: "Asia/Baghdad", offset: i$1.UTC_PLUS_3, timezone: n$1.ArabiaStandardTime });
({ id: t.AsiaBahrain, name: "Asia/Bahrain", offset: i$1.UTC_PLUS_3, timezone: n$1.ArabiaStandardTime });
({ id: t.AsiaBaku, name: "Asia/Baku", offset: i$1.UTC_PLUS_4, timezone: n$1.AzerbaijanTime });
({ id: t.AsiaBangkok, name: "Asia/Bangkok", offset: i$1.UTC_PLUS_7, timezone: n$1.IndochinaTime });
({ id: t.AsiaBarnaul, name: "Asia/Barnaul", offset: i$1.UTC_PLUS_7, timezone: n$1.KrasnoyarskTime });
({ id: t.AsiaBeirut, name: "Asia/Beirut", offset: i$1.UTC_PLUS_2, timezone: n$1.EasternEuropeanTime });
({ id: t.AsiaBishkek, name: "Asia/Bishkek", offset: i$1.UTC_PLUS_6, timezone: n$1.KyrgyzstanTime });
({ id: t.AsiaBrunei, name: "Asia/Brunei", offset: i$1.UTC_PLUS_8, timezone: n$1.BruneiTime });
({ id: t.AsiaChita, name: "Asia/Chita", offset: i$1.UTC_PLUS_9, timezone: n$1.YakutskTime });
({ id: t.AsiaChoibalsan, name: "Asia/Choibalsan", offset: i$1.UTC_PLUS_8, timezone: n$1.ChoibalsanStandardTime });
({ id: t.AsiaColombo, name: "Asia/Colombo", offset: i$1.UTC_PLUS_5, timezone: n$1.IndianStandardTime });
({ id: t.AsiaDamascus, name: "Asia/Damascus", offset: i$1.UTC_PLUS_2, timezone: n$1.EasternEuropeanTime });
({ id: t.AsiaDhaka, name: "Asia/Dhaka", offset: i$1.UTC_PLUS_6, timezone: n$1.BangladeshStandardTime });
({ id: t.AsiaDili, name: "Asia/Dili", offset: i$1.UTC_PLUS_9, timezone: n$1.JapanStandardTime });
({ id: t.AsiaDubai, name: "Asia/Dubai", offset: i$1.UTC_PLUS_4, timezone: n$1.GulfStandardTime });
({ id: t.AsiaDushanbe, name: "Asia/Dushanbe", offset: i$1.UTC_PLUS_5, timezone: n$1.TajikistanTime });
({ id: t.AsiaFamagusta, name: "Asia/Famagusta", offset: i$1.UTC_PLUS_2, timezone: n$1.EasternEuropeanTime });
({ id: t.AsiaGaza, name: "Asia/Gaza", offset: i$1.UTC_PLUS_2, timezone: n$1.EasternEuropeanTime });
({ id: t.AsiaHebron, name: "Asia/Hebron", offset: i$1.UTC_PLUS_2, timezone: n$1.EasternEuropeanTime });
({ id: t.AsiaHoChiMinh, name: "Asia/Ho_Chi_Minh", offset: i$1.UTC_PLUS_7, timezone: n$1.IndochinaTime });
({ id: t.AsiaHongKong, name: "Asia/Hong_Kong", offset: i$1.UTC_PLUS_8, timezone: n$1.HongKongTime });
({ id: t.AsiaHovd, name: "Asia/Hovd", offset: i$1.UTC_PLUS_7, timezone: n$1.HovdTime });
({ id: t.AsiaIrkutsk, name: "Asia/Irkutsk", offset: i$1.UTC_PLUS_8, timezone: n$1.IrkutskTime });
({ id: t.AsiaJakarta, name: "Asia/Jakarta", offset: i$1.UTC_PLUS_7, timezone: n$1.WesternIndonesianTime });
({ id: t.AsiaJayapura, name: "Asia/Jayapura", offset: i$1.UTC_PLUS_9, timezone: n$1.JapanStandardTime });
({ id: t.AsiaJerusalem, name: "Asia/Jerusalem", offset: i$1.UTC_PLUS_2, timezone: n$1.EasternEuropeanTime });
({ id: t.AsiaKabul, name: "Asia/Kabul", offset: i$1.UTC_PLUS_4, timezone: n$1.AfghanistanTime });
({ id: t.AsiaKamchatka, name: "Asia/Kamchatka", offset: i$1.UTC_PLUS_12, timezone: n$1.KamchatkaTime });
({ id: t.AsiaKarachi, name: "Asia/Karachi", offset: i$1.UTC_PLUS_5, timezone: n$1.PakistanStandardTime });
({ id: t.AsiaKathmandu, name: "Asia/Kathmandu", offset: i$1.UTC_PLUS_5, timezone: n$1.NepalTime });
({ id: t.AsiaKhandyga, name: "Asia/Khandyga", offset: i$1.UTC_PLUS_9, timezone: n$1.YakutskTime });
({ id: t.AsiaKolkata, name: "Asia/Kolkata", offset: i$1.UTC_PLUS_5, timezone: n$1.IndianStandardTime });
({ id: t.AsiaKrasnoyarsk, name: "Asia/Krasnoyarsk", offset: i$1.UTC_PLUS_7, timezone: n$1.KrasnoyarskTime });
({ id: t.AsiaKualaLumpur, name: "Asia/Kuala_Lumpur", offset: i$1.UTC_PLUS_8, timezone: n$1.MalaysiaStandardTime });
({ id: t.AsiaKuching, name: "Asia/Kuching", offset: i$1.UTC_PLUS_8, timezone: n$1.MalaysiaStandardTime });
({ id: t.AsiaKuwait, name: "Asia/Kuwait", offset: i$1.UTC_PLUS_3, timezone: n$1.ArabiaStandardTime });
({ id: t.AsiaMacau, name: "Asia/Macau", offset: i$1.UTC_PLUS_8, timezone: n$1.ChinaStandardTime });
({ id: t.AsiaMagadan, name: "Asia/Magadan", offset: i$1.UTC_PLUS_11, timezone: n$1.MagadanTime });
({ id: t.AsiaMakassar, name: "Asia/Makassar", offset: i$1.UTC_PLUS_8, timezone: n$1.MalaysiaTime });
({ id: t.AsiaManila, name: "Asia/Manila", offset: i$1.UTC_PLUS_8, timezone: n$1.PhilippineTime });
({ id: t.AsiaMuscat, name: "Asia/Muscat", offset: i$1.UTC_PLUS_4, timezone: n$1.GulfStandardTime });
({ id: t.AsiaNovokuznetsk, name: "Asia/Novokuznetsk", offset: i$1.UTC_PLUS_6, timezone: n$1.NovosibirskTime });
({ id: t.AsiaNovosibirsk, name: "Asia/Novosibirsk", offset: i$1.UTC_PLUS_6, timezone: n$1.NovosibirskTime });
({ id: t.AsiaOmsk, name: "Asia/Omsk", offset: i$1.UTC_PLUS_6, timezone: n$1.OmskTime });
({ id: t.AsiaOral, name: "Asia/Oral", offset: i$1.UTC_PLUS_5, timezone: n$1.OralTime });
({ id: t.AsiaPhnomPenh, name: "Asia/Phnom_Penh", offset: i$1.UTC_PLUS_7, timezone: n$1.IndochinaTime });
({ id: t.AsiaPontianak, name: "Asia/Pontianak", offset: i$1.UTC_PLUS_7, timezone: n$1.WesternIndonesianTime });
({ id: t.AsiaPyongyang, name: "Asia/Pyongyang", offset: i$1.UTC_PLUS_9, timezone: n$1.KoreaStandardTime });
({ id: t.AsiaQatar, name: "Asia/Qatar", offset: i$1.UTC_PLUS_3, timezone: n$1.ArabiaStandardTime });
({ id: t.AsiaQyzylorda, name: "Asia/Qyzylorda", offset: i$1.UTC_PLUS_5, timezone: n$1.WestKazakhstanTime });
({ id: t.AsiaRangoon, name: "Asia/Rangoon", offset: i$1.UTC_PLUS_6, timezone: n$1.MyanmarStandardTime });
({ id: t.AsiaRiyadh, name: "Asia/Riyadh", offset: i$1.UTC_PLUS_3, timezone: n$1.ArabiaStandardTime });
({ id: t.AsiaSakhalin, name: "Asia/Sakhalin", offset: i$1.UTC_PLUS_11, timezone: n$1.SakhalinIslandTime });
({ id: t.AsiaSamarkand, name: "Asia/Samarkand", offset: i$1.UTC_PLUS_5, timezone: n$1.UzbekistanTime });
({ id: t.AsiaSeoul, name: "Asia/Seoul", offset: i$1.UTC_PLUS_9, timezone: n$1.KoreaStandardTime });
({ id: t.AsiaShanghai, name: "Asia/Shanghai", offset: i$1.UTC_PLUS_8, timezone: n$1.ChinaStandardTime });
({ id: t.AsiaSingapore, name: "Asia/Singapore", offset: i$1.UTC_PLUS_8, timezone: n$1.SingaporeStandardTime });
({ id: t.AsiaSrednekolymsk, name: "Asia/Srednekolymsk", offset: i$1.UTC_PLUS_11, timezone: n$1.SrednekolymskTime });
({ id: t.AsiaTaipei, name: "Asia/Taipei", offset: i$1.UTC_PLUS_8, timezone: n$1.ChinaStandardTime });
({ id: t.AsiaTashkent, name: "Asia/Tashkent", offset: i$1.UTC_PLUS_5, timezone: n$1.UzbekistanTime });
({ id: t.AsiaTbilisi, name: "Asia/Tbilisi", offset: i$1.UTC_PLUS_4, timezone: n$1.GeorgiaStandardTime });
({ id: t.AsiaTehran, name: "Asia/Tehran", offset: i$1.UTC_PLUS_3, timezone: n$1.IranStandardTime });
({ id: t.AsiaThimphu, name: "Asia/Thimphu", offset: i$1.UTC_PLUS_6, timezone: n$1.BhutanTime });
({ id: t.AsiaTokyo, name: "Asia/Tokyo", offset: i$1.UTC_PLUS_9, timezone: n$1.JapanStandardTime });
({ id: t.AsiaTomsk, name: "Asia/Tomsk", offset: i$1.UTC_PLUS_6, timezone: n$1.KrasnoyarskTime });
({ id: t.AsiaUlaanbaatar, name: "Asia/Ulaanbaatar", offset: i$1.UTC_PLUS_8, timezone: n$1.UlaanbaatarStandardTime });
({ id: t.AsiaUrumqi, name: "Asia/Urumqi", offset: i$1.UTC_PLUS_8, timezone: n$1.ChinaStandardTime });
({ id: t.AsiaUstNera, name: "Asia/Ust-Nera", offset: i$1.UTC_PLUS_10, timezone: n$1.VladivostokTime });
({ id: t.AsiaVientiane, name: "Asia/Vientiane", offset: i$1.UTC_PLUS_7, timezone: n$1.IndochinaTime });
({ id: t.AsiaVladivostok, name: "Asia/Vladivostok", offset: i$1.UTC_PLUS_10, timezone: n$1.VladivostokTime });
({ id: t.AsiaYakutsk, name: "Asia/Yakutsk", offset: i$1.UTC_PLUS_9, timezone: n$1.YakutskTime });
({ id: t.AsiaYekaterinburg, name: "Asia/Yekaterinburg", offset: i$1.UTC_PLUS_5, timezone: n$1.YekaterinburgTime });
({ id: t.AsiaYerevan, name: "Asia/Yerevan", offset: i$1.UTC_PLUS_4, timezone: n$1.ArmeniaTime });
({ id: t.AtlanticAzores, name: "Atlantic/Azores", offset: i$1.UTC_MINUS_1, timezone: n$1.AzoresStandardTime });
({ id: t.AtlanticBermuda, name: "Atlantic/Bermuda", offset: i$1.UTC_MINUS_4, timezone: n$1.AtlanticStandardTime });
({ id: t.AtlanticCanary, name: "Atlantic/Canary", offset: i$1.UTC_MINUS_1, timezone: n$1.WesternEuropeanTime });
({ id: t.AtlanticCapeVerde, name: "Atlantic/Cape_Verde", offset: i$1.UTC_0, timezone: n$1.CapeVerdeTime });
({ id: t.AtlanticFaroe, name: "Atlantic/Faroe", offset: i$1.UTC_0, timezone: n$1.GreenwichMeanTime });
({ id: t.AtlanticMadeira, name: "Atlantic/Madeira", offset: i$1.UTC_0, timezone: n$1.WesternEuropeanTime });
({ id: t.AtlanticReykjavik, name: "Atlantic/Reykjavik", offset: i$1.UTC_0, timezone: n$1.GreenwichMeanTime });
({ id: t.AtlanticSouthGeorgia, name: "Atlantic/South_Georgia", offset: i$1.UTC_0, timezone: n$1.CoordinatedUniversalTime });
({ id: t.AtlanticStHelena, name: "Atlantic/St_Helena", offset: i$1.UTC_0, timezone: n$1.GreenwichMeanTime });
({ id: t.AtlanticStanley, name: "Atlantic/Stanley", offset: i$1.UTC_0, timezone: n$1.FalklandIslandsTime });
({ id: t.AustraliaAdelaide, name: "Australia/Adelaide", offset: i$1.UTC_PLUS_9_30, timezone: n$1.AustralianCentralStandardTime });
({ id: t.AustraliaBrisbane, name: "Australia/Brisbane", offset: i$1.UTC_PLUS_10, timezone: n$1.AustralianEasternStandardTime });
({ id: t.AustraliaBrokenHill, name: "Australia/Broken_Hill", offset: i$1.UTC_PLUS_9_30, timezone: n$1.AustralianCentralStandardTime });
({ id: t.AustraliaCanberra, name: "Australia/Canberra", offset: i$1.UTC_PLUS_10, timezone: n$1.AustralianEasternStandardTime });
({ id: t.AustraliaCurrie, name: "Australia/Currie", offset: i$1.UTC_PLUS_10, timezone: n$1.AustralianEasternStandardTime });
({ id: t.AustraliaDarwin, name: "Australia/Darwin", offset: i$1.UTC_PLUS_9_30, timezone: n$1.AustralianCentralStandardTime });
({ id: t.AustraliaEucla, name: "Australia/Eucla", offset: i$1.UTC_PLUS_8_45, timezone: n$1.AustralianCentralWesternStandardTime });
({ id: t.AustraliaHobart, name: "Australia/Hobart", offset: i$1.UTC_PLUS_10, timezone: n$1.AustralianEasternStandardTime });
({ id: t.AustraliaLindeman, name: "Australia/Lindeman", offset: i$1.UTC_PLUS_10, timezone: n$1.AustralianEasternStandardTime });
({ id: t.AustraliaLordHowe, name: "Australia/Lord_Howe", offset: i$1.UTC_PLUS_10_30, timezone: n$1.LordHoweStandardTime });
({ id: t.AustraliaMelbourne, name: "Australia/Melbourne", offset: i$1.UTC_PLUS_10, timezone: n$1.AustralianEasternStandardTime });
({ id: t.AustraliaPerth, name: "Australia/Perth", offset: i$1.UTC_PLUS_8, timezone: n$1.AustralianWesternStandardTime });
({ id: t.AustraliaSydney, name: "Australia/Sydney", offset: i$1.UTC_PLUS_10, timezone: n$1.AustralianEasternStandardTime });
({ id: t.EuropeAmsterdam, name: "Europe/Amsterdam", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeAndorra, name: "Europe/Andorra", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeAthens, name: "Europe/Athens", offset: i$1.UTC_PLUS_2, timezone: n$1.EasternEuropeanTime });
({ id: t.EuropeBelgrade, name: "Europe/Belgrade", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeBerlin, name: "Europe/Berlin", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeBratislava, name: "Europe/Bratislava", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeBrussels, name: "Europe/Brussels", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeBucharest, name: "Europe/Bucharest", offset: i$1.UTC_PLUS_2, timezone: n$1.EasternEuropeanTime });
({ id: t.EuropeBudapest, name: "Europe/Budapest", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeBusingen, name: "Europe/Busingen", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeChisinau, name: "Europe/Chisinau", offset: i$1.UTC_PLUS_2, timezone: n$1.EasternEuropeanTime });
({ id: t.EuropeCopenhagen, name: "Europe/Copenhagen", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeDublin, name: "Europe/Dublin", offset: i$1.UTC_0, timezone: n$1.GreenwichMeanTime });
({ id: t.EuropeGibraltar, name: "Europe/Gibraltar", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeGuernsey, name: "Europe/Guernsey", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeHelsinki, name: "Europe/Helsinki", offset: i$1.UTC_PLUS_2, timezone: n$1.EasternEuropeanTime });
({ id: t.EuropeIsleOfMan, name: "Europe/Isle_of_Man", offset: i$1.UTC_0, timezone: n$1.GreenwichMeanTime });
({ id: t.EuropeIstanbul, name: "Europe/Istanbul", offset: i$1.UTC_PLUS_3, timezone: n$1.EasternEuropeanTime });
({ id: t.EuropeJersey, name: "Europe/Jersey", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeKaliningrad, name: "Europe/Kaliningrad", offset: i$1.UTC_PLUS_2, timezone: n$1.EasternEuropeanTime });
({ id: t.EuropeKiev, name: "Europe/Kiev", offset: i$1.UTC_PLUS_2, timezone: n$1.EasternEuropeanTime });
({ id: t.EuropeLisbon, name: "Europe/Lisbon", offset: i$1.UTC_0, timezone: n$1.GreenwichMeanTime });
({ id: t.EuropeLjubljana, name: "Europe/Ljubljana", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeLondon, name: "Europe/London", offset: i$1.UTC_0, timezone: n$1.GreenwichMeanTime });
({ id: t.EuropeLuxembourg, name: "Europe/Luxembourg", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeMadrid, name: "Europe/Madrid", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeMalta, name: "Europe/Malta", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeMariehamn, name: "Europe/Mariehamn", offset: i$1.UTC_PLUS_2, timezone: n$1.EasternEuropeanTime });
({ id: t.EuropeMinsk, name: "Europe/Minsk", offset: i$1.UTC_PLUS_3, timezone: n$1.EasternEuropeanTime });
({ id: t.EuropeMonaco, name: "Europe/Monaco", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeMoscow, name: "Europe/Moscow", offset: i$1.UTC_PLUS_3, timezone: n$1.EasternEuropeanTime });
({ id: t.EuropeOslo, name: "Europe/Oslo", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeParis, name: "Europe/Paris", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropePodgorica, name: "Europe/Podgorica", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropePrague, name: "Europe/Prague", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeRiga, name: "Europe/Riga", offset: i$1.UTC_PLUS_2, timezone: n$1.EasternEuropeanTime });
({ id: t.EuropeRome, name: "Europe/Rome", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeSamara, name: "Europe/Samara", offset: i$1.UTC_PLUS_4, timezone: n$1.EasternEuropeanTime });
({ id: t.EuropeSanMarino, name: "Europe/San_Marino", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeSarajevo, name: "Europe/Sarajevo", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeSimferopol, name: "Europe/Simferopol", offset: i$1.UTC_PLUS_3, timezone: n$1.EasternEuropeanTime });
({ id: t.EuropeSkopje, name: "Europe/Skopje", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeSofia, name: "Europe/Sofia", offset: i$1.UTC_PLUS_2, timezone: n$1.EasternEuropeanTime });
({ id: t.EuropeStockholm, name: "Europe/Stockholm", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeTallinn, name: "Europe/Tallinn", offset: i$1.UTC_PLUS_2, timezone: n$1.EasternEuropeanTime });
({ id: t.EuropeTirane, name: "Europe/Tirane", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeUzhgorod, name: "Europe/Uzhgorod", offset: i$1.UTC_PLUS_2, timezone: n$1.EasternEuropeanTime });
({ id: t.EuropeVaduz, name: "Europe/Vaduz", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeVatican, name: "Europe/Vatican", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeVienna, name: "Europe/Vienna", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeVilnius, name: "Europe/Vilnius", offset: i$1.UTC_PLUS_2, timezone: n$1.EasternEuropeanTime });
({ id: t.EuropeVolgograd, name: "Europe/Volgograd", offset: i$1.UTC_PLUS_4, timezone: n$1.EasternEuropeanTime });
({ id: t.EuropeWarsaw, name: "Europe/Warsaw", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeZagreb, name: "Europe/Zagreb", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.EuropeZaporozhye, name: "Europe/Zaporozhye", offset: i$1.UTC_PLUS_2, timezone: n$1.EasternEuropeanTime });
({ id: t.EuropeZurich, name: "Europe/Zurich", offset: i$1.UTC_PLUS_1, timezone: n$1.CentralEuropeanTime });
({ id: t.IndianAntananarivo, name: "Indian/Antananarivo", offset: i$1.UTC_PLUS_3, timezone: n$1.EastAfricaTime });
({ id: t.IndianChagos, name: "Indian/Chagos", offset: i$1.UTC_PLUS_6, timezone: n$1.IndianOceanTime });
({ id: t.IndianChristmas, name: "Indian/Christmas", offset: i$1.UTC_PLUS_7, timezone: n$1.ChristmasIslandTime });
({ id: t.IndianCocos, name: "Indian/Cocos", offset: i$1.UTC_PLUS_6, timezone: n$1.CocosIslandsTime });
({ id: t.IndianComoro, name: "Indian/Comoro", offset: i$1.UTC_PLUS_3, timezone: n$1.EastAfricaTime });
({ id: t.IndianKerguelen, name: "Indian/Kerguelen", offset: i$1.UTC_PLUS_5, timezone: n$1.FrenchSouthernAndAntarcticTime });
({ id: t.IndianMahe, name: "Indian/Mahe", offset: i$1.UTC_PLUS_4, timezone: n$1.SeychellesTime });
({ id: t.IndianMaldives, name: "Indian/Maldives", offset: i$1.UTC_PLUS_5, timezone: n$1.MaldivesTime });
({ id: t.IndianMauritius, name: "Indian/Mauritius", offset: i$1.UTC_PLUS_4, timezone: n$1.MauritiusTime });
({ id: t.IndianMayotte, name: "Indian/Mayotte", offset: i$1.UTC_PLUS_3, timezone: n$1.EastAfricaTime });
({ id: t.IndianReunion, name: "Indian/Reunion", offset: i$1.UTC_PLUS_4, timezone: n$1.ReunionTime });
({ id: t.PacificApia, name: "Pacific/Apia", offset: i$1.UTC_PLUS_13, timezone: n$1.SamoaStandardTime });
({ id: t.PacificAuckland, name: "Pacific/Auckland", offset: i$1.UTC_PLUS_13, timezone: n$1.NewZealandStandardTime });
({ id: t.PacificChatham, name: "Pacific/Chatham", offset: i$1.UTC_PLUS_13, timezone: n$1.ChathamStandardTime });
({ id: t.PacificEaster, name: "Pacific/Easter", offset: i$1.UTC_PLUS_6, timezone: n$1.EasterIslandStandardTime });
({ id: t.PacificEfate, name: "Pacific/Efate", offset: i$1.UTC_PLUS_11, timezone: n$1.VanuatuTime });
({ id: t.PacificEnderbury, name: "Pacific/Enderbury", offset: i$1.UTC_PLUS_13, timezone: n$1.TongaTime });
({ id: t.PacificFakaofo, name: "Pacific/Fakaofo", offset: i$1.UTC_PLUS_13, timezone: n$1.TongaTime });
({ id: t.PacificFiji, name: "Pacific/Fiji", offset: i$1.UTC_PLUS_12, timezone: n$1.FijiTime });
({ id: t.PacificFunafuti, name: "Pacific/Funafuti", offset: i$1.UTC_PLUS_12, timezone: n$1.TuvaluTime });
({ id: t.PacificGalapagos, name: "Pacific/Galapagos", offset: i$1.UTC_PLUS_6, timezone: n$1.GalapagosTime });
({ id: t.PacificGambier, name: "Pacific/Gambier", offset: i$1.UTC_PLUS_9, timezone: n$1.GambierIslandTime });
({ id: t.PacificGuadalcanal, name: "Pacific/Guadalcanal", offset: i$1.UTC_PLUS_11, timezone: n$1.SolomonIslandsTime });
({ id: t.PacificGuam, name: "Pacific/Guam", offset: i$1.UTC_PLUS_10, timezone: n$1.ChamorroStandardTime });
({ id: t.PacificHonolulu, name: "Pacific/Honolulu", offset: i$1.UTC_PLUS_10, timezone: n$1.HawaiiAleutianStandardTime });
({ id: t.PacificJohnston, name: "Pacific/Johnston", offset: i$1.UTC_PLUS_10, timezone: n$1.HawaiiAleutianStandardTime });
({ id: t.PacificKiritimati, name: "Pacific/Kiritimati", offset: i$1.UTC_PLUS_14, timezone: n$1.LineIslandsTime });
({ id: t.PacificKosrae, name: "Pacific/Kosrae", offset: i$1.UTC_PLUS_11, timezone: n$1.KosraeTime });
({ id: t.PacificKwajalein, name: "Pacific/Kwajalein", offset: i$1.UTC_PLUS_12, timezone: n$1.MarshallIslandsTime });
({ id: t.PacificMajuro, name: "Pacific/Majuro", offset: i$1.UTC_PLUS_12, timezone: n$1.MarshallIslandsTime });
({ id: t.PacificMarquesas, name: "Pacific/Marquesas", offset: i$1.UTC_PLUS_9, timezone: n$1.MarquesasIslandsTime });
({ id: t.PacificMidway, name: "Pacific/Midway", offset: i$1.UTC_PLUS_11, timezone: n$1.SamoaStandardTime });
({ id: t.PacificNauru, name: "Pacific/Nauru", offset: i$1.UTC_PLUS_12, timezone: n$1.NauruTime });
({ id: t.PacificNiue, name: "Pacific/Niue", offset: i$1.UTC_PLUS_11, timezone: n$1.NiueTime });
({ id: t.PacificNorfolk, name: "Pacific/Norfolk", offset: i$1.UTC_PLUS_11, timezone: n$1.NorfolkIslandTime });
({ id: t.PacificNoumea, name: "Pacific/Noumea", offset: i$1.UTC_PLUS_11, timezone: n$1.NewCaledoniaTime });
({ id: t.PacificPagoPago, name: "Pacific/Pago_Pago", offset: i$1.UTC_PLUS_11, timezone: n$1.SamoaStandardTime });
({ id: t.PacificPalau, name: "Pacific/Palau", offset: i$1.UTC_PLUS_9, timezone: n$1.PalauTime });
({ id: t.PacificPitcairn, name: "Pacific/Pitcairn", offset: i$1.UTC_PLUS_8, timezone: n$1.PitcairnTime });
({ id: t.PacificPonape, name: "Pacific/Ponape", offset: i$1.UTC_PLUS_11, timezone: n$1.PohnpeiStandardTime });
({ id: t.PacificPortMoresby, name: "Pacific/Port_Moresby", offset: i$1.UTC_PLUS_10, timezone: n$1.PapuaNewGuineaTime });
({ id: t.PacificRarotonga, name: "Pacific/Rarotonga", offset: i$1.UTC_PLUS_10, timezone: n$1.CookIslandTime });
({ id: t.PacificSaipan, name: "Pacific/Saipan", offset: i$1.UTC_PLUS_10, timezone: n$1.ChamorroStandardTime });
({ id: t.PacificTahiti, name: "Pacific/Tahiti", offset: i$1.UTC_PLUS_10, timezone: n$1.TahitiTime });
({ id: t.PacificTarawa, name: "Pacific/Tarawa", offset: i$1.UTC_PLUS_12, timezone: n$1.GilbertIslandTime });
({ id: t.PacificTongatapu, name: "Pacific/Tongatapu", offset: i$1.UTC_PLUS_13, timezone: n$1.TongaTime });
({ id: t.PacificChuuk, name: "Pacific/Chuuk", offset: i$1.UTC_PLUS_10, timezone: n$1.ChuukTime });
({ id: t.PacificPohnpei, name: "Pacific/Pohnpei", offset: i$1.UTC_PLUS_11, timezone: n$1.PohnpeiStandardTime });
({ id: t.PacificYap, name: "Pacific/Yap", offset: i$1.UTC_PLUS_10, timezone: n$1.ChuukTime });
var Vi = (a = 21) => {
  let u = "", A = crypto.getRandomValues(new Uint8Array(a));
  for (; a--; ) {
    let f = A[a] & 63;
    f < 36 ? u += f.toString(36) : f < 62 ? u += (f - 26).toString(36).toUpperCase() : f < 63 ? u += "_" : u += "-";
  }
  return u;
};
var fn = [{ property: "name", enumerable: false }, { property: "message", enumerable: false }, { property: "stack", enumerable: false }, { property: "code", enumerable: true }], qi = Symbol(".toJSON was called"), hn = (a) => {
  a[qi] = true;
  let u = a.toJSON();
  return delete a[qi], u;
}, Ji = ({ from: a, seen: u, to_: A, forceEnumerable: f, maxDepth: U, depth: E2 }) => {
  let v = A || (Array.isArray(a) ? [] : {});
  if (u.push(a), E2 >= U)
    return v;
  if (typeof a.toJSON == "function" && a[qi] !== true)
    return hn(a);
  for (let [_, S] of Object.entries(a)) {
    if (typeof Buffer == "function" && Buffer.isBuffer(S)) {
      v[_] = "[object Buffer]";
      continue;
    }
    if (typeof S == "object" && typeof S.pipe == "function") {
      v[_] = "[object Stream]";
      continue;
    }
    if (typeof S != "function") {
      if (!S || typeof S != "object") {
        v[_] = S;
        continue;
      }
      if (!u.includes(a[_])) {
        E2++, v[_] = Ji({ from: a[_], seen: [...u], forceEnumerable: f, maxDepth: U, depth: E2 });
        continue;
      }
      v[_] = "[Circular]";
    }
  }
  for (let { property: _, enumerable: S } of fn)
    typeof a[_] == "string" && Object.defineProperty(v, _, { value: a[_], enumerable: f ? true : S, configurable: true, writable: true });
  return v;
};
function Yi(a, u = {}) {
  let { maxDepth: A = Number.POSITIVE_INFINITY } = u;
  return typeof a == "object" && a !== null ? Ji({ from: a, seen: [], forceEnumerable: true, maxDepth: A, depth: 0 }) : typeof a == "function" ? `[Function: ${a.name || "anonymous"}]` : a;
}
var g = ((m) => (m[m.Warning = 999] = "Warning", m[m.Exception = 1e3] = "Exception", m[m.UnmanagedException = 1001] = "UnmanagedException", m[m.CaughtException = 1002] = "CaughtException", m[m.UncaughtException = 1003] = "UncaughtException", m[m.UnhandledPromiseRejectionException = 1004] = "UnhandledPromiseRejectionException", m[m.AuthenticationException = 2e3] = "AuthenticationException", m[m.AuthenticationExpiredAccessTokenException = 2001] = "AuthenticationExpiredAccessTokenException", m[m.AuthenticationInvalidAccessTokenException = 2002] = "AuthenticationInvalidAccessTokenException", m[m.AuthenticationMissingAccessTokenException = 2003] = "AuthenticationMissingAccessTokenException", m[m.AuthenticationExpiredRefreshTokenException = 2004] = "AuthenticationExpiredRefreshTokenException", m[m.AuthenticationInvalidRefreshTokenException = 2005] = "AuthenticationInvalidRefreshTokenException", m[m.AuthenticationMissingRefreshTokenException = 2006] = "AuthenticationMissingRefreshTokenException", m[m.AuthenticationMissingDeviceKeyException = 2007] = "AuthenticationMissingDeviceKeyException", m[m.AuthenticationUnAuthorizedAccessException = 2008] = "AuthenticationUnAuthorizedAccessException", m[m.AuthenticationCodeMismatchException = 2009] = "AuthenticationCodeMismatchException", m[m.AuthenticationExpiredCodeException = 2010] = "AuthenticationExpiredCodeException", m[m.AuthenticationLoginException = 2011] = "AuthenticationLoginException", m[m.AuthenticationLoginInvalidCredentialsException = 2012] = "AuthenticationLoginInvalidCredentialsException", m[m.AuthenticationLoginTooManyFailedAttemptsException = 2013] = "AuthenticationLoginTooManyFailedAttemptsException", m[m.AuthenticationLimitExceededException = 2014] = "AuthenticationLimitExceededException", m[m.AuthenticationUnauthorizedAccessException = 2015] = "AuthenticationUnauthorizedAccessException", m[m.AuthenticationTooManyRequestsException = 2016] = "AuthenticationTooManyRequestsException", m[m.AuthenticationUserNotFoundException = 2017] = "AuthenticationUserNotFoundException", m[m.AuthenticationSignupException = 2018] = "AuthenticationSignupException", m[m.AuthenticationUsernameAvailabilityCheckException = 2019] = "AuthenticationUsernameAvailabilityCheckException", m[m.AuthenticationUsernameExistsException = 2020] = "AuthenticationUsernameExistsException", m[m.AuthenticationAliasExistException = 2021] = "AuthenticationAliasExistException", m[m.AuthenticationCodeDeliveryFailureException = 2022] = "AuthenticationCodeDeliveryFailureException", m[m.AuthenticationMFAMethodNotFoundException = 2023] = "AuthenticationMFAMethodNotFoundException", m[m.AuthenticationNotAuthorizedException = 2024] = "AuthenticationNotAuthorizedException", m[m.AuthenticationPasswordResetRequiredException = 2025] = "AuthenticationPasswordResetRequiredException", m[m.AuthenticationUserNotConfirmedException = 2026] = "AuthenticationUserNotConfirmedException", m[m.DatabaseException = 3e3] = "DatabaseException", m[m.SequelizeNotInitializedException = 3001] = "SequelizeNotInitializedException", m[m.ProcessException = 4e3] = "ProcessException", m[m.ProcessWarningException = 4001] = "ProcessWarningException", m[m.KillProcessException = 4002] = "KillProcessException", m[m.FatalException = 4003] = "FatalException", m[m.ProcessSigTermException = 4004] = "ProcessSigTermException", m[m.ProcessSigIntException = 4005] = "ProcessSigIntException", m[m.MissingEnvironmentVariable = 4006] = "MissingEnvironmentVariable", m[m.NetworkException = 5e3] = "NetworkException", m[m.HttpException = 5001] = "HttpException", m[m.HttpRequestException = 5002] = "HttpRequestException", m[m.HttpRequestResourceNotFoundException = 5003] = "HttpRequestResourceNotFoundException", m[m.HttpResponseException = 5004] = "HttpResponseException", m[m.ServiceProviderException = 6e3] = "ServiceProviderException", m[m.AWSException = 6001] = "AWSException", m[m.AWSMissingAccessKeyException = 6002] = "AWSMissingAccessKeyException", m[m.AWSMissingSecretKeyException = 6003] = "AWSMissingSecretKeyException", m[m.CognitoException = 6004] = "CognitoException", m[m.CognitoInternalErrorException = 6005] = "CognitoInternalErrorException", m[m.CognitoInvalidEmailRoleAccessPolicyException = 6006] = "CognitoInvalidEmailRoleAccessPolicyException", m[m.CognitoInvalidLambdaResponseException = 6007] = "CognitoInvalidLambdaResponseException", m[m.CognitoUserLambdaValidationException = 6008] = "CognitoUserLambdaValidationException", m[m.CognitoInvalidParameterException = 6009] = "CognitoInvalidParameterException", m[m.CognitoInvalidSmsRoleAccessPolicyException = 6010] = "CognitoInvalidSmsRoleAccessPolicyException", m[m.CognitoInvalidSmsRoleTrustRelationshipException = 6011] = "CognitoInvalidSmsRoleTrustRelationshipException", m[m.CognitoInvalidUserPoolConfigurationException = 6012] = "CognitoInvalidUserPoolConfigurationException", m[m.CognitoResourceNotFoundException = 6013] = "CognitoResourceNotFoundException", m[m.CognitoMissingUserPoolClientIdException = 6014] = "CognitoMissingUserPoolClientIdException", m[m.CognitoMissingUserPoolIdException = 6015] = "CognitoMissingUserPoolIdException", m[m.CognitoUnexpectedLambdaException = 6016] = "CognitoUnexpectedLambdaException", m[m.StripeException = 6017] = "StripeException", m[m.StripeMissingSecretKeyException = 6018] = "StripeMissingSecretKeyException", m[m.StripeSubscriptionCreationFailedException = 6019] = "StripeSubscriptionCreationFailedException", m[m.StripePaymentMethodRequiredException = 6020] = "StripePaymentMethodRequiredException", m[m.UserException = 7e3] = "UserException", m[m.NullUserException = 7001] = "NullUserException", m[m.UserStateConflictException = 7002] = "UserStateConflictException", m[m.NullAccountException = 7003] = "NullAccountException", m[m.ValidationException = 8e3] = "ValidationException", m[m.InvalidTypeException = 8001] = "InvalidTypeException", m[m.MissingArgumentException = 8002] = "MissingArgumentException", m[m.MissingPropertyException = 8003] = "MissingPropertyException", m[m.InvalidArgumentException = 8004] = "InvalidArgumentException", m[m.InvalidPropertyException = 8005] = "InvalidPropertyException", m[m.MissingRequestBodyPropertyException = 8006] = "MissingRequestBodyPropertyException", m[m.MissingRequestUrlParameterException = 8007] = "MissingRequestUrlParameterException", m[m.MissingCookieException = 8008] = "MissingCookieException", m))(g || {});
var d = class extends Error {
  constructor(u, A) {
    super(u);
    var _a, _b, _c, _d;
    s$1(this, "cause");
    s$1(this, "code", 1e3);
    s$1(this, "context");
    s$1(this, "created");
    s$1(this, "data");
    s$1(this, "description");
    s$1(this, "model");
    s$1(this, "form");
    s$1(this, "friendlyMessage", "An unknown error has occurred. :(");
    s$1(this, "id");
    s$1(this, "logLevel", c.Exception);
    s$1(this, "origin");
    s$1(this, "pii");
    s$1(this, "request");
    s$1(this, "response");
    s$1(this, "scope");
    s$1(this, "remediation");
    s$1(this, "tags");
    s$1(this, "task");
    s$1(this, "user");
    s$1(this, "__proto__");
    let f = new.target.prototype;
    if (this.__proto__ = f, Error.captureStackTrace && Error.captureStackTrace((_a = A == null ? void 0 : A.cause) != null ? _a : this, d), this.id = Vi(), this.name = this.constructor.name, this.created = new Date().toString(), this.description = (_b = A == null ? void 0 : A.description) != null ? _b : this.description, this.remediation = (_c = A == null ? void 0 : A.remediation) != null ? _c : this.remediation, this.scope = (_d = A == null ? void 0 : A.scope) != null ? _d : this.scope, A) {
      let { cause: U, context: E2, data: v, model: _, form: S, origin: nn, pii: tn, request: rn, response: sn, tags: on, task: ln, user: mn } = A;
      this.cause = U, this.context = E2, this.data = v, this.model = _, this.form = S, this.origin = nn, this.pii = tn, this.request = rn, this.response = sn, this.task = ln, this.tags = on, this.user = mn;
    }
  }
  toJSON() {
    return Yi(this);
  }
};
var T = ((f) => (f.Simple = "simple", f.ExponentialBackoff = "exponential", f.CircuitBreaker = "circuit_breaker", f))(T || {});
var z = class extends d {
  constructor() {
    super(...arguments);
    s$1(this, "code", 1003);
    s$1(this, "description", "An uncaught exception bubbled up and was caught automatically.");
    s$1(this, "logLevel", c.Exception);
    s$1(this, "remediation", { response: { code: 500 }, retry: { limit: 3 } });
  }
};
var p = class extends d {
  constructor() {
    super(...arguments);
    s$1(this, "code", 2e3);
    s$1(this, "description", "Generic or unknown exceptions associated with user authentication.");
    s$1(this, "friendlyMessage", "An unknown error occurred.");
    s$1(this, "logLevel", c.Warning);
    s$1(this, "remediation", { response: { code: 401 }, retry: { limit: 3, strategy: "circuit_breaker" } });
  }
};
var aa = class extends p {
  constructor() {
    super(...arguments);
    s$1(this, "code", 2011);
    s$1(this, "description", "An exception occurred while logging a user in.");
    s$1(this, "friendlyMessage", "An unknown error occurred.");
    s$1(this, "logLevel", c.Critical);
    s$1(this, "remediation", { response: { code: 500 }, retry: true });
  }
};
var G = class extends p {
  constructor() {
    super(...arguments);
    s$1(this, "code", 2019);
    s$1(this, "description", "An exception occurred while checking if a username is available.");
    s$1(this, "friendlyMessage", "An error occurred while checking if a username is available.");
    s$1(this, "logLevel", c.Critical);
    s$1(this, "remediation", { response: { code: 500 }, retry: true });
  }
};
var qa = class extends d {
  constructor() {
    super(...arguments);
    s$1(this, "code", 8002);
    s$1(this, "description", "A required argument is missing.");
    s$1(this, "logLevel", c.Exception);
    s$1(this, "remediation", { response: { code: 400 }, retry: false });
  }
}, Ha = class extends d {
  constructor() {
    super(...arguments);
    s$1(this, "code", 8004);
    s$1(this, "description", "An argument is invalid.");
    s$1(this, "logLevel", c.Exception);
    s$1(this, "remediation", { response: { code: 400 }, retry: false });
  }
};
const logger$2 = new Logger();
const exceptionLogger = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (err) {
    const exception = new z(err.name, { cause: err });
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
    var d2 = Object.getOwnPropertyDescriptor(n2, k);
    Object.defineProperty(a, k, d2.get ? d2 : {
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
  !function(e2, t2) {
    t2(exports);
  }(commonjsGlobal, function(e2) {
    function t2(e3, t3) {
      e3.super_ = t3, e3.prototype = Object.create(t3.prototype, { constructor: { value: e3, enumerable: false, writable: true, configurable: true } });
    }
    function r2(e3, t3) {
      Object.defineProperty(this, "kind", { value: e3, enumerable: true }), t3 && t3.length && Object.defineProperty(this, "path", { value: t3, enumerable: true });
    }
    function n2(e3, t3, r3) {
      n2.super_.call(this, "E", e3), Object.defineProperty(this, "lhs", { value: t3, enumerable: true }), Object.defineProperty(this, "rhs", { value: r3, enumerable: true });
    }
    function o2(e3, t3) {
      o2.super_.call(this, "N", e3), Object.defineProperty(this, "rhs", { value: t3, enumerable: true });
    }
    function i(e3, t3) {
      i.super_.call(this, "D", e3), Object.defineProperty(this, "lhs", { value: t3, enumerable: true });
    }
    function a(e3, t3, r3) {
      a.super_.call(this, "A", e3), Object.defineProperty(this, "index", { value: t3, enumerable: true }), Object.defineProperty(this, "item", { value: r3, enumerable: true });
    }
    function f(e3, t3, r3) {
      var n3 = e3.slice((r3 || t3) + 1 || e3.length);
      return e3.length = t3 < 0 ? e3.length + t3 : t3, e3.push.apply(e3, n3), e3;
    }
    function u(e3) {
      var t3 = typeof e3 == "undefined" ? "undefined" : N(e3);
      return t3 !== "object" ? t3 : e3 === Math ? "math" : e3 === null ? "null" : Array.isArray(e3) ? "array" : Object.prototype.toString.call(e3) === "[object Date]" ? "date" : typeof e3.toString == "function" && /^\/.*\//.test(e3.toString()) ? "regexp" : "object";
    }
    function l2(e3, t3, r3, c3, s3, d3, p3) {
      s3 = s3 || [], p3 = p3 || [];
      var g3 = s3.slice(0);
      if (typeof d3 != "undefined") {
        if (c3) {
          if (typeof c3 == "function" && c3(g3, d3))
            return;
          if ((typeof c3 == "undefined" ? "undefined" : N(c3)) === "object") {
            if (c3.prefilter && c3.prefilter(g3, d3))
              return;
            if (c3.normalize) {
              var h2 = c3.normalize(g3, d3, e3, t3);
              h2 && (e3 = h2[0], t3 = h2[1]);
            }
          }
        }
        g3.push(d3);
      }
      u(e3) === "regexp" && u(t3) === "regexp" && (e3 = e3.toString(), t3 = t3.toString());
      var y2 = typeof e3 == "undefined" ? "undefined" : N(e3), v2 = typeof t3 == "undefined" ? "undefined" : N(t3), b2 = y2 !== "undefined" || p3 && p3[p3.length - 1].lhs && p3[p3.length - 1].lhs.hasOwnProperty(d3), m2 = v2 !== "undefined" || p3 && p3[p3.length - 1].rhs && p3[p3.length - 1].rhs.hasOwnProperty(d3);
      if (!b2 && m2)
        r3(new o2(g3, t3));
      else if (!m2 && b2)
        r3(new i(g3, e3));
      else if (u(e3) !== u(t3))
        r3(new n2(g3, e3, t3));
      else if (u(e3) === "date" && e3 - t3 !== 0)
        r3(new n2(g3, e3, t3));
      else if (y2 === "object" && e3 !== null && t3 !== null)
        if (p3.filter(function(t4) {
          return t4.lhs === e3;
        }).length)
          e3 !== t3 && r3(new n2(g3, e3, t3));
        else {
          if (p3.push({ lhs: e3, rhs: t3 }), Array.isArray(e3)) {
            var w2;
            e3.length;
            for (w2 = 0; w2 < e3.length; w2++)
              w2 >= t3.length ? r3(new a(g3, w2, new i(void 0, e3[w2]))) : l2(e3[w2], t3[w2], r3, c3, g3, w2, p3);
            for (; w2 < t3.length; )
              r3(new a(g3, w2, new o2(void 0, t3[w2++])));
          } else {
            var x3 = Object.keys(e3), S2 = Object.keys(t3);
            x3.forEach(function(n3, o3) {
              var i2 = S2.indexOf(n3);
              i2 >= 0 ? (l2(e3[n3], t3[n3], r3, c3, g3, n3, p3), S2 = f(S2, i2)) : l2(e3[n3], void 0, r3, c3, g3, n3, p3);
            }), S2.forEach(function(e4) {
              l2(void 0, t3[e4], r3, c3, g3, e4, p3);
            });
          }
          p3.length = p3.length - 1;
        }
      else
        e3 !== t3 && (y2 === "number" && isNaN(e3) && isNaN(t3) || r3(new n2(g3, e3, t3)));
    }
    function c2(e3, t3, r3, n3) {
      return n3 = n3 || [], l2(e3, t3, function(e4) {
        e4 && n3.push(e4);
      }, r3), n3.length ? n3 : void 0;
    }
    function s2(e3, t3, r3) {
      if (r3.path && r3.path.length) {
        var n3, o3 = e3[t3], i2 = r3.path.length - 1;
        for (n3 = 0; n3 < i2; n3++)
          o3 = o3[r3.path[n3]];
        switch (r3.kind) {
          case "A":
            s2(o3[r3.path[n3]], r3.index, r3.item);
            break;
          case "D":
            delete o3[r3.path[n3]];
            break;
          case "E":
          case "N":
            o3[r3.path[n3]] = r3.rhs;
        }
      } else
        switch (r3.kind) {
          case "A":
            s2(e3[t3], r3.index, r3.item);
            break;
          case "D":
            e3 = f(e3, t3);
            break;
          case "E":
          case "N":
            e3[t3] = r3.rhs;
        }
      return e3;
    }
    function d2(e3, t3, r3) {
      if (e3 && t3 && r3 && r3.kind) {
        for (var n3 = e3, o3 = -1, i2 = r3.path ? r3.path.length - 1 : 0; ++o3 < i2; )
          typeof n3[r3.path[o3]] == "undefined" && (n3[r3.path[o3]] = typeof r3.path[o3] == "number" ? [] : {}), n3 = n3[r3.path[o3]];
        switch (r3.kind) {
          case "A":
            s2(r3.path ? n3[r3.path[o3]] : n3, r3.index, r3.item);
            break;
          case "D":
            delete n3[r3.path[o3]];
            break;
          case "E":
          case "N":
            n3[r3.path[o3]] = r3.rhs;
        }
      }
    }
    function p2(e3, t3, r3) {
      if (r3.path && r3.path.length) {
        var n3, o3 = e3[t3], i2 = r3.path.length - 1;
        for (n3 = 0; n3 < i2; n3++)
          o3 = o3[r3.path[n3]];
        switch (r3.kind) {
          case "A":
            p2(o3[r3.path[n3]], r3.index, r3.item);
            break;
          case "D":
            o3[r3.path[n3]] = r3.lhs;
            break;
          case "E":
            o3[r3.path[n3]] = r3.lhs;
            break;
          case "N":
            delete o3[r3.path[n3]];
        }
      } else
        switch (r3.kind) {
          case "A":
            p2(e3[t3], r3.index, r3.item);
            break;
          case "D":
            e3[t3] = r3.lhs;
            break;
          case "E":
            e3[t3] = r3.lhs;
            break;
          case "N":
            e3 = f(e3, t3);
        }
      return e3;
    }
    function g2(e3, t3, r3) {
      if (e3 && t3 && r3 && r3.kind) {
        var n3, o3, i2 = e3;
        for (o3 = r3.path.length - 1, n3 = 0; n3 < o3; n3++)
          typeof i2[r3.path[n3]] == "undefined" && (i2[r3.path[n3]] = {}), i2 = i2[r3.path[n3]];
        switch (r3.kind) {
          case "A":
            p2(i2[r3.path[n3]], r3.index, r3.item);
            break;
          case "D":
            i2[r3.path[n3]] = r3.lhs;
            break;
          case "E":
            i2[r3.path[n3]] = r3.lhs;
            break;
          case "N":
            delete i2[r3.path[n3]];
        }
      }
    }
    function h(e3, t3, r3) {
      if (e3 && t3) {
        var n3 = function(n4) {
          r3 && !r3(e3, t3, n4) || d2(e3, t3, n4);
        };
        l2(e3, t3, n3);
      }
    }
    function y(e3) {
      return "color: " + F2[e3].color + "; font-weight: bold";
    }
    function v(e3) {
      var t3 = e3.kind, r3 = e3.path, n3 = e3.lhs, o3 = e3.rhs, i2 = e3.index, a2 = e3.item;
      switch (t3) {
        case "E":
          return [r3.join("."), n3, "\u2192", o3];
        case "N":
          return [r3.join("."), o3];
        case "D":
          return [r3.join(".")];
        case "A":
          return [r3.join(".") + "[" + i2 + "]", a2];
        default:
          return [];
      }
    }
    function b(e3, t3, r3, n3) {
      var o3 = c2(e3, t3);
      try {
        n3 ? r3.groupCollapsed("diff") : r3.group("diff");
      } catch (e4) {
        r3.log("diff");
      }
      o3 ? o3.forEach(function(e4) {
        var t4 = e4.kind, n4 = v(e4);
        r3.log.apply(r3, ["%c " + F2[t4].text, y(t4)].concat(P(n4)));
      }) : r3.log("\u2014\u2014 no diff \u2014\u2014");
      try {
        r3.groupEnd();
      } catch (e4) {
        r3.log("\u2014\u2014 diff end \u2014\u2014 ");
      }
    }
    function m(e3, t3, r3, n3) {
      switch (typeof e3 == "undefined" ? "undefined" : N(e3)) {
        case "object":
          return typeof e3[n3] == "function" ? e3[n3].apply(e3, P(r3)) : e3[n3];
        case "function":
          return e3(t3);
        default:
          return e3;
      }
    }
    function w(e3) {
      var t3 = e3.timestamp, r3 = e3.duration;
      return function(e4, n3, o3) {
        var i2 = ["action"];
        return i2.push("%c" + String(e4.type)), t3 && i2.push("%c@ " + n3), r3 && i2.push("%c(in " + o3.toFixed(2) + " ms)"), i2.join(" ");
      };
    }
    function x2(e3, t3) {
      var r3 = t3.logger, n3 = t3.actionTransformer, o3 = t3.titleFormatter, i2 = o3 === void 0 ? w(t3) : o3, a2 = t3.collapsed, f2 = t3.colors, u2 = t3.level, l3 = t3.diff, c3 = typeof t3.titleFormatter == "undefined";
      e3.forEach(function(o4, s3) {
        var d3 = o4.started, p3 = o4.startedTime, g3 = o4.action, h2 = o4.prevState, y2 = o4.error, v2 = o4.took, w2 = o4.nextState, x3 = e3[s3 + 1];
        x3 && (w2 = x3.prevState, v2 = x3.started - d3);
        var S2 = n3(g3), k2 = typeof a2 == "function" ? a2(function() {
          return w2;
        }, g3, o4) : a2, j2 = D(p3), E3 = f2.title ? "color: " + f2.title(S2) + ";" : "", A2 = ["color: gray; font-weight: lighter;"];
        A2.push(E3), t3.timestamp && A2.push("color: gray; font-weight: lighter;"), t3.duration && A2.push("color: gray; font-weight: lighter;");
        var O2 = i2(S2, j2, v2);
        try {
          k2 ? f2.title && c3 ? r3.groupCollapsed.apply(r3, ["%c " + O2].concat(A2)) : r3.groupCollapsed(O2) : f2.title && c3 ? r3.group.apply(r3, ["%c " + O2].concat(A2)) : r3.group(O2);
        } catch (e4) {
          r3.log(O2);
        }
        var N2 = m(u2, S2, [h2], "prevState"), P2 = m(u2, S2, [S2], "action"), C3 = m(u2, S2, [y2, h2], "error"), F3 = m(u2, S2, [w2], "nextState");
        if (N2)
          if (f2.prevState) {
            var L2 = "color: " + f2.prevState(h2) + "; font-weight: bold";
            r3[N2]("%c prev state", L2, h2);
          } else
            r3[N2]("prev state", h2);
        if (P2)
          if (f2.action) {
            var T3 = "color: " + f2.action(S2) + "; font-weight: bold";
            r3[P2]("%c action    ", T3, S2);
          } else
            r3[P2]("action    ", S2);
        if (y2 && C3)
          if (f2.error) {
            var M = "color: " + f2.error(y2, h2) + "; font-weight: bold;";
            r3[C3]("%c error     ", M, y2);
          } else
            r3[C3]("error     ", y2);
        if (F3)
          if (f2.nextState) {
            var _ = "color: " + f2.nextState(w2) + "; font-weight: bold";
            r3[F3]("%c next state", _, w2);
          } else
            r3[F3]("next state", w2);
        l3 && b(h2, w2, r3, k2);
        try {
          r3.groupEnd();
        } catch (e4) {
          r3.log("\u2014\u2014 log end \u2014\u2014");
        }
      });
    }
    function S() {
      var e3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t3 = Object.assign({}, L, e3), r3 = t3.logger, n3 = t3.stateTransformer, o3 = t3.errorTransformer, i2 = t3.predicate, a2 = t3.logErrors, f2 = t3.diffPredicate;
      if (typeof r3 == "undefined")
        return function() {
          return function(e4) {
            return function(t4) {
              return e4(t4);
            };
          };
        };
      if (e3.getState && e3.dispatch)
        return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"), function() {
          return function(e4) {
            return function(t4) {
              return e4(t4);
            };
          };
        };
      var u2 = [];
      return function(e4) {
        var r4 = e4.getState;
        return function(e5) {
          return function(l3) {
            if (typeof i2 == "function" && !i2(r4, l3))
              return e5(l3);
            var c3 = {};
            u2.push(c3), c3.started = O.now(), c3.startedTime = new Date(), c3.prevState = n3(r4()), c3.action = l3;
            var s3 = void 0;
            if (a2)
              try {
                s3 = e5(l3);
              } catch (e6) {
                c3.error = o3(e6);
              }
            else
              s3 = e5(l3);
            c3.took = O.now() - c3.started, c3.nextState = n3(r4());
            var d3 = t3.diff && typeof f2 == "function" ? f2(r4, l3) : t3.diff;
            if (x2(u2, Object.assign({}, t3, { diff: d3 })), u2.length = 0, c3.error)
              throw c3.error;
            return s3;
          };
        };
      };
    }
    var k, j, E2 = function(e3, t3) {
      return new Array(t3 + 1).join(e3);
    }, A = function(e3, t3) {
      return E2("0", t3 - e3.toString().length) + e3;
    }, D = function(e3) {
      return A(e3.getHours(), 2) + ":" + A(e3.getMinutes(), 2) + ":" + A(e3.getSeconds(), 2) + "." + A(e3.getMilliseconds(), 3);
    }, O = typeof performance != "undefined" && performance !== null && typeof performance.now == "function" ? performance : Date, N = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e3) {
      return typeof e3;
    } : function(e3) {
      return e3 && typeof Symbol == "function" && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
    }, P = function(e3) {
      if (Array.isArray(e3)) {
        for (var t3 = 0, r3 = Array(e3.length); t3 < e3.length; t3++)
          r3[t3] = e3[t3];
        return r3;
      }
      return Array.from(e3);
    }, C2 = [];
    k = (typeof commonjsGlobal == "undefined" ? "undefined" : N(commonjsGlobal)) === "object" && commonjsGlobal ? commonjsGlobal : typeof window != "undefined" ? window : {}, j = k.DeepDiff, j && C2.push(function() {
      typeof j != "undefined" && k.DeepDiff === c2 && (k.DeepDiff = j, j = void 0);
    }), t2(n2, r2), t2(o2, r2), t2(i, r2), t2(a, r2), Object.defineProperties(c2, { diff: { value: c2, enumerable: true }, observableDiff: { value: l2, enumerable: true }, applyDiff: { value: h, enumerable: true }, applyChange: { value: d2, enumerable: true }, revertChange: { value: g2, enumerable: true }, isConflict: { value: function() {
      return typeof j != "undefined";
    }, enumerable: true }, noConflict: { value: function() {
      return C2 && (C2.forEach(function(e3) {
        e3();
      }), C2 = null), c2;
    }, enumerable: true } });
    var F2 = { E: { color: "#2196F3", text: "CHANGED:" }, N: { color: "#4CAF50", text: "ADDED:" }, D: { color: "#F44336", text: "DELETED:" }, A: { color: "#2196F3", text: "ARRAY:" } }, L = { level: "log", logger: console, logErrors: true, collapsed: void 0, predicate: void 0, duration: false, timestamp: true, stateTransformer: function(e3) {
      return e3;
    }, actionTransformer: function(e3) {
      return e3;
    }, errorTransformer: function(e3) {
      return e3;
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
    } }, diff: false, diffPredicate: void 0, transformer: void 0 }, T2 = function() {
      var e3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t3 = e3.dispatch, r3 = e3.getState;
      return typeof t3 == "function" || typeof r3 == "function" ? S()({ dispatch: t3, getState: r3 }) : void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n");
    };
    e2.defaults = L, e2.createLogger = S, e2.logger = T2, e2.default = T2, Object.defineProperty(e2, "__esModule", { value: true });
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
var styles$1 = "html,\nbody,\n#root {\n  background-color: var(--bg-color-default);\n\n  /* Proportions */\n  --amount-none: 0px;\n  --amount-least: 5.5px;\n  --amount-less: 11px;\n  --amount-default: 16.5px;\n  --amount-more: 22px;\n  --amount-most: 27.5px;\n  --amount-all: 33px;\n\n  --size-smallest: 10px;\n  --size-smaller: 14px;\n  --size-small: 24px;\n  --size-default: 32px;\n  --size-large: 42px;\n  --size-larger: 52px;\n  --size-largest: 56px;\n\n  /* Colors */\n  --color-primary-rgb: 76, 62, 196;\n  --color-primary: rgb(var(--color-primary-rgb));\n  --color-primary-contrast-rgb: 255, 255, 255;\n  --color-primary-contrast: rgb(var(--color-primary-contrast-rgb));\n  --color-default-rgb: var(--color-black-rgb);\n  --color-default: rgb(var(--color-default-rgb));\n  --color-default-contrast-rgb: var(--color-default-rgb);\n  --color-default-contrast: var(--color-default-rgb);\n  --color-secondary-rgb: 230, 232, 235;\n  --color-secondary: rgb(var(--color-secondary-rgb));\n  --color-secondary-contrast-rgb: 35, 37, 40;\n  --color-secondary-contrast: rgb(var(--color-secondary-contrast-rgb));\n  --color-black-rgb: 50, 52, 55;\n  --color-black: rgb(var(--color-black-rgb));\n  --color-black-contrast-rgb: var(--color-white-rgb);\n  --color-black-contrast: rgb(var(--color-black-contrast-rgb));\n  --color-white-rgb: 238, 240, 243;\n  --color-white: rgb(var(--color-white-rgb));\n  --color-white-contrast-rgb: var(--color-white-rgb);\n  --color-white-contrast: rgb(var(--color-white-contrast-rgb));\n  --color-error-rgb: 236, 79, 79;\n  --color-error: rgb(var(--color-error-rgb));\n  --color-error-contrast-rgb: var(--color-white-rgb);\n  --color-error-contrast: rgb(var(--color-error-contrast-rgb));\n  --color-info-rgb: 15, 193, 223;\n  --color-info: rgb(var(--color-info-rgb));\n  --color-info-contrast-rgb: var(--color-white-rgb);\n  --color-info-contrast: rgb(var(--color-info-contrast-rgb));\n  --color-success-rgb: 131, 210, 126;\n  --color-success: rgb(var(--color-success-rgb));\n  --color-success-contrast-rgb: var(--color-white-rgb);\n  --color-success-contrast: rgb(var(--color-success-contrast-rgb));\n  --color-warning-rgb: 255, 209, 0;\n  --color-warning: rgb(var(--color-warning-rgb));\n  --color-warning-contrast-rgb: var(--color-white-rgb);\n  --color-warning-contrast: rgb(var(--color-warning-contrast-rgb));\n\n  --bg-color-lightest-rgb: 245, 245, 245;\n  --bg-color-lightest: rgb(var(--bg-color-lightest-rgb));\n  --bg-color-lighter-rgb: 235, 235, 235;\n  --bg-color-lighter: rgb(var(--bg-color-lighter-rgb));\n  --bg-color-light-rgb: 225, 225, 225;\n  --bg-color-light: rgb(var(--bg-color-light-rgb));\n  --bg-color-default-rgb: 220, 220, 220;\n  --bg-color-default: rgb(var(--bg-color-default-rgb));\n  --bg-color-dark-rgb: 200, 200, 200;\n  --bg-color-dark: rgb(var(--bg-color-dark-rgb));\n  --bg-color-darker-rgb: 190, 190, 190;\n  --bg-color-darker: rgb(var(--bg-color-darker-rgb));\n  --bg-color-darkest-rgb: 180, 180, 180;\n  --bg-color-darkest: rgb(var(--bg-color-darkest-rgb));\n\n  --border-color-lightest-rgb: 240, 243, 247;\n  --border-color-lightest: rgb(var(--border-color-lightest-rgb));\n  --border-color-lighter-rgb: 230, 233, 237;\n  --border-color-lighter: rgb(var(--border-color-lighter-rgb));\n  --border-color-light-rgb: 220, 223, 227;\n  --border-color-light: rgb(var(--border-color-light-rgb));\n  --border-color-default-rgb: 210, 213, 217;\n  --border-color-default: rgb(var(--border-color-default-rgb));\n  --border-color-dark-rgb: 200, 203, 207;\n  --border-color-dark: rgb(var(--border-color-dark-rgb));\n  --border-color-darker-rgb: 190, 193, 197;\n  --border-color-darker: rgb(var(--border-color-darker-rgb));\n  --border-color-darkest-rgb: 180, 183, 187;\n  --border-color-darkest: rgb(var(--border-color-darkest-rgb));\n\n  --fg-color-lightest-rgb: 210, 212, 215;\n  --fg-color-lightest: rgb(var(--fg-color-lightest-rgb));\n  --fg-color-lighter-rgb: 190, 192, 195;\n  --fg-color-lighter: rgb(var(--fg-color-lighter-rgb));\n  --fg-color-light-rgb: 160, 162, 165;\n  --fg-color-light: rgb(var(--fg-color-light-rgb));\n  --fg-color-default-rgb: 130, 132, 135;\n  --fg-color-default: rgb(var(--fg-color-default-rgb));\n  --fg-color-dark-rgb: 100, 102, 105;\n  --fg-color-dark: rgb(var(--fg-color-dark-rgb));\n  --fg-color-darker-rgb: 60, 62, 65;\n  --fg-color-darker: rgb(var(--fg-color-darker-rgb));\n  --fg-color-darkest-rgb: var(--color-black-rgb);\n  --fg-color-darkest: rgb(var(--fg-color-darkest-rgb));\n\n  /* Text */\n  --text-color-lightest-rgb: var(--color-white-rgb);\n  --text-color-lightest: rgb(var(--text-color-lightest-rgb));\n  --text-color-lighter-rgb: 170, 172, 175;\n  --text-color-lighter: rgb(var(--text-color-lighter-rgb));\n  --text-color-light-rgb: 140, 142, 145;\n  --text-color-light: rgb(var(--text-color-light-rgb));\n  --text-color-default-rgb: 90, 92, 95;\n  --text-color-default: rgb(var(--text-color-default-rgb));\n  --text-color-dark-rgb: 70, 72, 75;\n  --text-color-dark: rgb(var(--text-color-dark-rgb));\n  --text-color-darker-rgb: 50, 52, 55;\n  --text-color-darker: rgb(var(--text-color-darker-rgb));\n  --text-color-darkest-rgb: var(--color-black-rgb);\n  --text-color-darkest: rgb(var(--text-color-darkest-rgb));\n\n  --text-font-button: 'Helvetica Neue', -apple-system, blinkmacsystemfont,\n    'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',\n    'Droid Sans', sans-serif;\n  --text-font-text: 'Helvetica Neue', -apple-system, blinkmacsystemfont,\n    'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',\n    'Droid Sans', sans-serif;\n\n  /* Text sizes */\n  --text-size-smallest: 9px;\n  --text-size-smaller: 11px;\n  --text-size-small: 12px;\n  --text-size-default: 13px;\n  --text-size-large: 18px;\n  --text-size-larger: 20px;\n  --text-size-largest: 24px;\n\n  --text-weight-least: 300;\n  --text-weight-less: 400;\n  --text-weight-default: 500;\n  --text-weight-more: 600;\n  --text-weight-most: 700;\n\n  /* Shadows */\n  --shadow-depth-lowest: inset 0 -20px 60px rgba(0, 0, 0, 0.1);\n  --shadow-depth-lower: inset 0 2px 5px rgba(0, 0, 0, 0.1);\n  --shadow-depth-low: inset 0 1px 3px rgba(0, 0, 0, 0.1);\n  --shadow-depth-surface: none;\n  --shadow-depth-high: 0 1px 3px rgba(0, 0, 0, 0.05);\n  --shadow-depth-higher: 0 4px 27px rgba(0, 0, 0, 0.16);\n  --shadow-depth-highest: 0 10px 62px rgba(0, 0, 0, 0.1);\n\n  /* Layout */\n  --z-index-depth-lowest: -300;\n  --z-index-depth-lower: -200;\n  --z-index-depth-low: -100;\n  --z-index-depth-surface: 0;\n  --z-index-depth-high: 100;\n  --z-index-depth-higher: 200;\n  --z-index-depth-highest: 300;\n\n  /* Element styles */\n  --bg-color-card-rgb: var(--bg-color-lightest-rgb);\n  --bg-color-close-button-rgb: var(--bg-color-default-rgb);\n  --bg-color-data-grid-rgb: var(--bg-color-default-rgb);\n  --bg-color-data-grid-header-rgb: var(--bg-color-default-rgb);\n  --bg-color-data-grid-column-headers-rgb: var(--bg-color-lighter-rgb);\n  --bg-color-data-grid-cell-rgb: var(--bg-color-lightest-rgb);\n  --bg-color-data-grid-row-rgb: var(--bg-color-lighter-rgb);\n  --bg-color-dropdown-menu-rgb: var(--bg-color-lightest-rgb);\n  --bg-color-input-control-rgb: var(--bg-color-lightest-rgb);\n  --bg-color-menu-button-rgb: var(--bg-color-lightest-rgb);\n  --bg-color-more-menu-rgb: var(--bg-color-default-rgb);\n  --bg-color-navigation-bar-rgb: var(--bg-color-lightest-rgb);\n  --bg-color-navigation-menu-rgb: var(--bg-color-lightest-rgb);\n  --bg-color-page-rgb: var(--bg-color-lighter-rgb);\n  --bg-color-slide-panel-rgb: var(--bg-color-lightest-rgb);\n  --bg-color-workspace-rgb: var(--bg-color-lighter-rgb);\n\n  --border-color-input-control-rgb: var(--border-color-default-rgb);\n\n  --fg-color-close-button-rgb: var(--fg-color-dark-rgb);\n  --fg-color-more-menu-rgb: var(--fg-color-dark-rgb);\n\n  --text-color-data-grid-column-headers-rgb: var(--text-color-lighter-rgb);\n  --text-color-data-grid-cell-rgb: var(--text-color-light-rgb);\n  --text-color-dropdown-menu-rgb: var(--text-color-light-rgb);\n  --text-color-input-control-rgb: var(--text-color-default-rgb);\n  --text-color-input-label-rgb: var(--text-color-light-rgb);\n  --text-color-input-placeholder-rgb: var(--text-color-lighter-rgb);\n  --text-color-link-rgb: var(--color-primary-rgb);\n  --text-color-menu-button-rgb: var(--text-color-light-rgb);\n  --text-color-paragraph-rgb: var(--text-color-lighter-rgb);\n  --text-color-text-rgb: var(--text-color-default-rgb);\n  --text-color-title-rgb: var(--text-color-dark-rgb);\n  --text-color-sub-title-rgb: var(--text-color-default-rgb);\n}\n";
const AppLabLightTheme = {
  css: styles$1,
  description: "Default AppLab Light theme",
  id: "applab-light",
  name: "AppLab Light"
};
var styles = "html,\nbody,\n#root {\n  background-color: var(--bg-color-default);\n\n  --amount-none: 0px;\n  --amount-least: 5.5px;\n  --amount-less: 11px;\n  --amount-default: 16.5px;\n  --amount-more: 22px;\n  --amount-most: 27.5px;\n  --amount-all: 33px;\n\n  --size-smallest: 10px;\n  --size-smaller: 14px;\n  --size-small: 24px;\n  --size-default: 32px;\n  --size-large: 42px;\n  --size-larger: 52px;\n  --size-largest: 56px;\n\n  /* Colors */\n  --color-primary-rgb: 76, 62, 196;\n  /* --color-primary-rgb: 128, 60, 187; */\n  /* --color-primary-rgb: 212, 23, 82; */\n  --color-primary: rgb(var(--color-primary-rgb));\n  --color-primary-contrast-rgb: 255, 255, 255;\n  --color-primary-contrast: rgb(var(--color-primary-contrast-rgb));\n  --color-default-rgb: var(--color-black-rgb);\n  --color-default: rgb(var(--color-default-rgb));\n  --color-default-contrast-rgb: var(--color-default-rgb);\n  --color-default-contrast: var(--color-default-rgb);\n  --color-secondary-rgb: var(--bg-color-lightest-rgb);\n  --color-secondary: rgb(var(--color-secondary-rgb));\n  --color-secondary-contrast-rgb: var(--color-white-rgb);\n  --color-secondary-contrast: rgb(var(--color-secondary-contrast-rgb));\n  --color-black-rgb: 35, 37, 40;\n  --color-black: rgb(var(--color-black-rgb));\n  --color-black-contrast-rgb: var(--color-white-rgb);\n  --color-black-contrast: rgb(var(--color-black-contrast-rgb));\n  --color-white-rgb: 238, 240, 243;\n  --color-white: rgb(var(--color-white-rgb));\n  --color-white-contrast-rgb: var(--color-white-rgb);\n  --color-white-contrast: rgb(var(--color-white-contrast-rgb));\n  --color-error-rgb: 236, 79, 79;\n  --color-error: rgb(var(--color-error-rgb));\n  --color-error-contrast-rgb: var(--color-white-rgb);\n  --color-error-contrast: rgb(var(--color-error-contrast-rgb));\n  --color-info-rgb: 15, 193, 223;\n  --color-info: rgb(var(--color-info-rgb));\n  --color-info-contrast-rgb: var(--color-white-rgb);\n  --color-info-contrast: rgb(var(--color-info-contrast-rgb));\n  --color-success-rgb: 131, 210, 126;\n  --color-success: rgb(var(--color-success-rgb));\n  --color-success-contrast-rgb: var(--color-white-rgb);\n  --color-success-contrast: rgb(var(--color-success-contrast-rgb));\n  --color-warning-rgb: 255, 209, 0;\n  --color-warning: rgb(var(--color-warning-rgb));\n  --color-warning-contrast-rgb: var(--color-white-rgb);\n  --color-warning-contrast: rgb(var(--color-warning-contrast-rgb));\n\n  --bg-color-lightest-rgb: 54, 54, 62;\n  --bg-color-lightest: rgb(var(--bg-color-lightest-rgb));\n  --bg-color-lighter-rgb: 48, 48, 56;\n  --bg-color-lighter: rgb(var(--bg-color-lighter-rgb));\n  --bg-color-light-rgb: 42, 42, 50;\n  --bg-color-light: rgb(var(--bg-color-light-rgb));\n  --bg-color-default-rgb: 36, 36, 44;\n  --bg-color-default: rgb(var(--bg-color-default-rgb));\n  --bg-color-dark-rgb: 30, 30, 38;\n  --bg-color-dark: rgb(var(--bg-color-dark-rgb));\n  --bg-color-darker-rgb: 24, 24, 32;\n  --bg-color-darker: rgb(var(--bg-color-darker-rgb));\n  --bg-color-darkest-rgb: 16, 16, 24;\n  --bg-color-darkest: rgb(var(--bg-color-darkest-rgb));\n\n  --border-color-lightest-rgb: 56, 56, 64;\n  --border-color-lightest: rgb(var(--border-color-lightest-rgb));\n  --border-color-lighter-rgb: 48, 48, 56;\n  --border-color-lighter: rgb(var(--border-color-lighter-rgb));\n  --border-color-light-rgb: 40, 40, 48;\n  --border-color-light: rgb(var(--border-color-light-rgb));\n  --border-color-default-rgb: 32, 32, 40;\n  --border-color-default: rgb(var(--border-color-default-rgb));\n  --border-color-dark-rgb: 24, 24, 32;\n  --border-color-dark: rgb(var(--border-color-dark-rgb));\n  --border-color-darker-rgb: 16, 16, 24;\n  --border-color-darker: rgb(var(--border-color-darker-rgb));\n  --border-color-darkest-rgb: 8, 8, 16;\n  --border-color-darkest: rgb(var(--border-color-darkest-rgb));\n\n  --fg-color-lightest-rgb: 210, 212, 215;\n  --fg-color-lightest: rgb(var(--fg-color-lightest-rgb));\n  --fg-color-lighter-rgb: 190, 192, 195;\n  --fg-color-lighter: rgb(var(--fg-color-lighter-rgb));\n  --fg-color-light-rgb: 160, 162, 165;\n  --fg-color-light: rgb(var(--fg-color-light-rgb));\n  --fg-color-default-rgb: 130, 132, 135;\n  --fg-color-default: rgb(var(--fg-color-default-rgb));\n  --fg-color-dark-rgb: 100, 102, 105;\n  --fg-color-dark: rgb(var(--fg-color-dark-rgb));\n  --fg-color-darker-rgb: 60, 62, 65;\n  --fg-color-darker: rgb(var(--fg-color-darker-rgb));\n  --fg-color-darkest-rgb: var(--color-black-rgb);\n  --fg-color-darkest: rgb(var(--fg-color-darkest-rgb));\n\n  /* Text */\n  --text-color-lightest-rgb: var(--color-white-rgb);\n  --text-color-lightest: rgb(var(--text-color-lightest-rgb));\n  --text-color-lighter-rgb: 190, 192, 195;\n  --text-color-lighter: rgb(var(--text-color-lighter-rgb));\n  --text-color-light-rgb: 140, 142, 145;\n  --text-color-light: rgb(var(--text-color-light-rgb));\n  --text-color-default-rgb: 90, 92, 95;\n  --text-color-default: rgb(var(--text-color-default-rgb));\n  --text-color-dark-rgb: 70, 72, 75;\n  --text-color-dark: rgb(var(--text-color-dark-rgb));\n  --text-color-darker-rgb: 50, 52, 55;\n  --text-color-darker: rgb(var(--text-color-darker-rgb));\n  --text-color-darkest-rgb: var(--color-black-rgb);\n  --text-color-darkest: rgb(var(--text-color-darkest-rgb));\n\n  --text-font-button: 'Helvetica Neue', -apple-system, blinkmacsystemfont,\n    'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',\n    'Droid Sans', sans-serif;\n  --text-font-text: 'Helvetica Neue', -apple-system, blinkmacsystemfont,\n    'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',\n    'Droid Sans', sans-serif;\n\n  /* Text sizes */\n  --text-size-smallest: 9px;\n  --text-size-smaller: 11px;\n  --text-size-small: 12px;\n  --text-size-default: 13px;\n  --text-size-large: 18px;\n  --text-size-larger: 20px;\n  --text-size-largest: 24px;\n\n  --text-weight-least: 300;\n  --text-weight-less: 400;\n  --text-weight-default: 500;\n  --text-weight-more: 600;\n  --text-weight-most: 700;\n\n  /* Shadows */\n  --shadow-depth-lowest: inset 0 20px 60px rgba(0, 0, 0, 0.05);\n  --shadow-depth-lower: inset 0 17px 25px rgba(0, 0, 0, 0.1);\n  --shadow-depth-low: inset 0 1px 3px rgba(0, 0, 0, 0.2);\n  --shadow-depth-surface: none;\n  --shadow-depth-high: 0 1px 3px rgba(0, 0, 0, 0.13);\n  --shadow-depth-higher: 0 4px 27px rgba(0, 0, 0, 0.2);\n  --shadow-depth-highest: 0 20px 60px rgba(0, 0, 0, 0.12);\n\n  /* Layout */\n  --z-index-depth-lowest: -300;\n  --z-index-depth-lower: -200;\n  --z-index-depth-low: -100;\n  --z-index-depth-surface: 0;\n  --z-index-depth-high: 100;\n  --z-index-depth-higher: 200;\n  --z-index-depth-highest: 300;\n\n  /* --bg-color-button: rgb(); */\n\n  /* --bg-color-menu-item: rgb(); */\n  /* --bg-color-workspace: rgb(); */\n  /* --bg-color-workspace-title: rgb(); */\n\n  /* Element styles */\n  --bg-color-card-rgb: var(--bg-color-default-rgb);\n  --bg-color-close-button-rgb: var(--bg-color-default-rgb);\n  --bg-color-data-grid-rgb: var(--bg-color-default-rgb);\n  --bg-color-data-grid-header-rgb: var(--bg-color-default-rgb);\n  --bg-color-data-grid-column-headers-rgb: var(--bg-color-light-rgb);\n  --bg-color-data-grid-cell-rgb: var(--bg-color-lightest-rgb);\n  --bg-color-data-grid-row-rgb: var(--bg-color-lighter-rgb);\n  --bg-color-dropdown-menu-rgb: var(--bg-color-dark-rgb);\n  --bg-color-input-control-rgb: var(--bg-color-dark-rgb);\n  --bg-color-menu-button-rgb: var(--bg-color-lightest-rgb);\n  --bg-color-more-menu-rgb: var(--bg-color-default-rgb);\n  --bg-color-navigation-bar-rgb: var(--bg-color-default-rgb);\n  --bg-color-navigation-menu-rgb: var(--bg-color-default-rgb);\n  --bg-color-page-rgb: var(--bg-color-darker-rgb);\n  --bg-color-slide-panel-rgb: var(--bg-color-light-rgb);\n  --bg-color-workspace-rgb: var(--bg-color-darker-rgb);\n\n  --border-color-input-control-rgb: var(--border-color-light-rgb);\n\n  --fg-color-close-button-rgb: var(--fg-color-light-rgb);\n  --fg-color-more-menu-rgb: var(--fg-color-light-rgb);\n\n  --text-color-data-grid-column-headers-rgb: var(--text-color-light-rgb);\n  --text-color-data-grid-cell-rgb: var(--text-color-lightest-rgb);\n  --text-color-dropdown-menu-rgb: var(--text-color-lightest-rgb);\n  --text-color-input-control-rgb: var(--text-color-lightest-rgb);\n  --text-color-input-placeholder-rgb: var(--text-color-dark-rgb);\n  --text-color-input-label-rgb: var(--text-color-light-rgb);\n  --text-color-link-rgb: var(--color-primary-rgb);\n  --text-color-menu-button-rgb: var(--text-color-lighter-rgb);\n  --text-color-paragraph-rgb: var(--text-color-default-rgb);\n  --text-color-text-rgb: var(--text-color-default-rgb);\n  --text-color-title-rgb: var(--text-color-lightest-rgb);\n  --text-color-sub-title-rgb: var(--text-color-default-rgb);\n}\n";
const AppLabDarkTheme = {
  css: styles,
  description: "AppLab dark theme",
  id: "applab-dark",
  name: "AppLab Dark"
};
memo(({
  className = "",
  children,
  theme,
  themes: themes2
}) => {
  var _a;
  const [currentTheme, setTheme2] = useState((_a = themes2 == null ? void 0 : themes2.find((t2) => t2.id === theme)) != null ? _a : AppLabLightTheme);
  useEffect(() => {
    if (theme && themes2) {
      const match2 = themes2.find((t2) => t2.id === theme);
      if (match2) {
        setTheme2(match2);
      } else {
        setTheme2(AppLabLightTheme);
      }
    } else {
      setTheme2(AppLabLightTheme);
    }
  }, [theme]);
  return /* @__PURE__ */ React.createElement("div", {
    className: `${currentTheme.id} ${className} theme-provider`
  }, /* @__PURE__ */ React.createElement(GlobalStyle, {
    theme: currentTheme
  }), children);
});
const GlobalStyle = createGlobalStyle`
  ${(props) => props.theme.css};

`;
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
  } catch (e2) {
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
function floorMod(x2, n2) {
  return x2 - n2 * Math.floor(x2 / n2);
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
  let d2 = Date.UTC(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute, obj.second, obj.millisecond);
  if (obj.year < 100 && obj.year >= 0) {
    d2 = new Date(d2);
    d2.setUTCFullYear(d2.getUTCFullYear() - 1900);
  }
  return +d2;
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
      const c2 = fmt.charAt(i);
      if (c2 === "'") {
        if (currentFull.length > 0) {
          splits.push({ literal: bracketed, val: currentFull });
        }
        current = null;
        currentFull = "";
        bracketed = !bracketed;
      } else if (bracketed) {
        currentFull += c2;
      } else if (c2 === current) {
        currentFull += c2;
      } else {
        if (currentFull.length > 0) {
          splits.push({ literal: false, val: currentFull });
        }
        currentFull = c2;
        current = c2;
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
  num(n2, p2 = 0) {
    if (this.opts.forceSimple) {
      return padStart(n2, p2);
    }
    const opts = __spreadValues({}, this.opts);
    if (p2 > 0) {
      opts.padTo = p2;
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
    } catch (e2) {
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
      const r2 = s2.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (r2) {
        return new FixedOffsetZone(signedOffset(r2[1], r2[2]));
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
    } catch (e2) {
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
    let z2;
    if (dt.zone.isUniversal) {
      const gmtOffset = -1 * (dt.offset / 60);
      const offsetZ = gmtOffset >= 0 ? `Etc/GMT+${gmtOffset}` : `Etc/GMT${gmtOffset}`;
      if (dt.offset !== 0 && IANAZone.create(offsetZ).valid) {
        z2 = offsetZ;
        this.dt = dt;
      } else {
        z2 = "UTC";
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
      z2 = dt.zone.name;
    }
    const intlOpts = __spreadValues({}, this.opts);
    if (z2) {
      intlOpts.timeZone = z2;
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
  const full = regexes.reduce((f, r2) => f + r2.source, "");
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
  mapUnits(fn2) {
    if (!this.isValid)
      return this;
    const result = {};
    for (const k of Object.keys(this.values)) {
      result[k] = asNumber(fn2(this.values[k], k));
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
    const [s2, e2] = (text || "").split("/", 2);
    if (s2 && e2) {
      let start, startIsValid;
      try {
        start = DateTime.fromISO(s2, opts);
        startIsValid = start.isValid;
      } catch (e3) {
        startIsValid = false;
      }
      let end, endIsValid;
      try {
        end = DateTime.fromISO(e2, opts);
        endIsValid = end.isValid;
      } catch (e3) {
        endIsValid = false;
      }
      if (startIsValid && endIsValid) {
        return Interval.fromDateTimes(start, end);
      }
      if (startIsValid) {
        const dur = Duration.fromISO(e2, opts);
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
    const sorted = dateTimes.map(friendlyDateTime).filter((d2) => this.contains(d2)).sort(), results = [];
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
      const added = this.start.plus(dur.mapUnits((x2) => x2 * idx));
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
    const s2 = this.s > other.s ? this.s : other.s, e2 = this.e < other.e ? this.e : other.e;
    if (s2 >= e2) {
      return null;
    } else {
      return Interval.fromDateTimes(s2, e2);
    }
  }
  union(other) {
    if (!this.isValid)
      return this;
    const s2 = this.s < other.s ? this.s : other.s, e2 = this.e > other.e ? this.e : other.e;
    return Interval.fromDateTimes(s2, e2);
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
  const re2 = units.map((u) => u.regex).reduce((f, r2) => `${f}(${r2.source})`, "");
  return [`^${re2}$`, units];
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
  const vals = Object.keys(matches).reduce((r2, k) => {
    const f = toField(k);
    if (f) {
      r2[f] = matches[k];
    }
    return r2;
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
  const tokens = parts.map((p2) => tokenForPart(p2, locale, formatOpts));
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
  const d2 = new Date(ts);
  return {
    year: d2.getUTCFullYear(),
    month: d2.getUTCMonth() + 1,
    day: d2.getUTCDate(),
    hour: d2.getUTCHours(),
    minute: d2.getUTCMinutes(),
    second: d2.getUTCSeconds(),
    millisecond: d2.getUTCMilliseconds()
  };
}
function objToTS(obj, offset2, zone) {
  return fixOffset(objToLocalTS(obj), offset2, zone);
}
function adjustTime(inst, dur) {
  const oPre = inst.o, year = inst.c.year + Math.trunc(dur.years), month = inst.c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3, c2 = __spreadProps(__spreadValues({}, inst.c), {
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
  }).as("milliseconds"), localTS = objToLocalTS(c2);
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
  let c2 = "";
  if (longFormat && o2.c.year >= 0)
    c2 += "+";
  c2 += padStart(o2.c.year, longFormat ? 6 : 4);
  if (extended) {
    c2 += "-";
    c2 += padStart(o2.c.month);
    c2 += "-";
    c2 += padStart(o2.c.day);
  } else {
    c2 += padStart(o2.c.month);
    c2 += padStart(o2.c.day);
  }
  return c2;
}
function toISOTime(o2, extended, suppressSeconds, suppressMilliseconds, includeOffset) {
  let c2 = padStart(o2.c.hour);
  if (extended) {
    c2 += ":";
    c2 += padStart(o2.c.minute);
    if (o2.c.second !== 0 || !suppressSeconds) {
      c2 += ":";
    }
  } else {
    c2 += padStart(o2.c.minute);
  }
  if (o2.c.second !== 0 || !suppressSeconds) {
    c2 += padStart(o2.c.second);
    if (o2.c.millisecond !== 0 || !suppressMilliseconds) {
      c2 += ".";
      c2 += padStart(o2.c.millisecond, 3);
    }
  }
  if (includeOffset) {
    if (o2.isOffsetFixed && o2.offset === 0) {
      c2 += "Z";
    } else if (o2.o < 0) {
      c2 += "-";
      c2 += padStart(Math.trunc(-o2.o / 60));
      c2 += ":";
      c2 += padStart(Math.trunc(-o2.o % 60));
    } else {
      c2 += "+";
      c2 += padStart(Math.trunc(o2.o / 60));
      c2 += ":";
      c2 += padStart(Math.trunc(o2.o % 60));
    }
  }
  return c2;
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
  const round = isUndefined(opts.round) ? true : opts.round, format = (c2, unit) => {
    c2 = roundTo(c2, round || opts.calendary ? 0 : 2, true);
    const formatter = end.loc.clone(opts).relFormatter(opts);
    return formatter.format(c2, unit);
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
    let c2 = null, o2 = null;
    if (!invalid) {
      const unchanged = config2.old && config2.old.ts === this.ts && config2.old.zone.equals(zone);
      if (unchanged) {
        [c2, o2] = [config2.old.c, config2.old.o];
      } else {
        const ot = zone.offset(this.ts);
        c2 = tsToObj(this.ts, ot);
        invalid = Number.isNaN(c2.year) ? new Invalid("invalid input") : null;
        c2 = invalid ? null : c2;
        o2 = invalid ? null : ot;
      }
    }
    this._zone = zone;
    this.loc = config2.loc || Locale.create();
    this.invalid = invalid;
    this.weekData = null;
    this.c = c2;
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
    let c2 = toISODate(this, ext);
    c2 += "T";
    c2 += toISOTime(this, ext, suppressSeconds, suppressMilliseconds, includeOffset);
    return c2;
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
    let c2 = includePrefix ? "T" : "";
    return c2 + toISOTime(this, format === "extended", suppressSeconds, suppressMilliseconds, includeOffset);
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
  var e2, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d2 = isLE ? -1 : 1;
  var s2 = buffer2[offset2 + i];
  i += d2;
  e2 = s2 & (1 << -nBits) - 1;
  s2 >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e2 = e2 * 256 + buffer2[offset2 + i], i += d2, nBits -= 8) {
  }
  m = e2 & (1 << -nBits) - 1;
  e2 >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer2[offset2 + i], i += d2, nBits -= 8) {
  }
  if (e2 === 0) {
    e2 = 1 - eBias;
  } else if (e2 === eMax) {
    return m ? NaN : (s2 ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e2 = e2 - eBias;
  }
  return (s2 ? -1 : 1) * m * Math.pow(2, e2 - mLen);
};
ieee754.write = function(buffer2, value, offset2, isLE, mLen, nBytes) {
  var e2, m, c2;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d2 = isLE ? 1 : -1;
  var s2 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e2 = eMax;
  } else {
    e2 = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c2 = Math.pow(2, -e2)) < 1) {
      e2--;
      c2 *= 2;
    }
    if (e2 + eBias >= 1) {
      value += rt / c2;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c2 >= 2) {
      e2++;
      c2 /= 2;
    }
    if (e2 + eBias >= eMax) {
      m = 0;
      e2 = eMax;
    } else if (e2 + eBias >= 1) {
      m = (value * c2 - 1) * Math.pow(2, mLen);
      e2 = e2 + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e2 = 0;
    }
  }
  for (; mLen >= 8; buffer2[offset2 + i] = m & 255, i += d2, m /= 256, mLen -= 8) {
  }
  e2 = e2 << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer2[offset2 + i] = e2 & 255, i += d2, e2 /= 256, eLen -= 8) {
  }
  buffer2[offset2 + i - d2] |= s2 * 128;
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
    } catch (e2) {
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
    var x2 = a.length;
    var y = b.length;
    for (var i = 0, len = Math.min(x2, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x2 = a[i];
        y = b[i];
        break;
      }
    }
    if (x2 < y)
      return -1;
    if (y < x2)
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
    var x2 = thisEnd - thisStart;
    var y = end - start;
    var len = Math.min(x2, y);
    var thisCopy = this.slice(thisStart, thisEnd);
    var targetCopy = target.slice(start, end);
    for (var i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x2 = thisCopy[i];
        y = targetCopy[i];
        break;
      }
    }
    if (x2 < y)
      return -1;
    if (y < x2)
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
    var c2, hi2, lo;
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0)
        break;
      c2 = str.charCodeAt(i);
      hi2 = c2 >> 8;
      lo = c2 % 256;
      byteArray.push(lo);
      byteArray.push(hi2);
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
        function F2() {
        }
        return function(obj) {
          var subtype;
          F2.prototype = obj;
          subtype = new F2();
          F2.prototype = null;
          return subtype;
        };
      }();
      var C2 = {};
      var C_lib = C2.lib = {};
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
      var C_enc = C2.enc = {};
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
          } catch (e2) {
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
      var C_algo = C2.algo = {};
      return C2;
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
      var C2 = CryptoJS2;
      var C_lib = C2.lib;
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
      var C2 = CryptoJS2;
      var C_lib = C2.lib;
      var WordArray2 = C_lib.WordArray;
      var Hasher = C_lib.Hasher;
      var C_algo = C2.algo;
      var H2 = [];
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
              H2[nPrime] = getFractionalBits(Math2.pow(n2, 1 / 2));
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
          this._hash = new WordArray2.init(H2.slice(0));
        },
        _doProcessBlock: function(M, offset2) {
          var H3 = this._hash.words;
          var a = H3[0];
          var b = H3[1];
          var c2 = H3[2];
          var d2 = H3[3];
          var e2 = H3[4];
          var f = H3[5];
          var g2 = H3[6];
          var h = H3[7];
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
            var ch = e2 & f ^ ~e2 & g2;
            var maj = a & b ^ a & c2 ^ b & c2;
            var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
            var sigma1 = (e2 << 26 | e2 >>> 6) ^ (e2 << 21 | e2 >>> 11) ^ (e2 << 7 | e2 >>> 25);
            var t1 = h + sigma1 + ch + K[i] + W[i];
            var t2 = sigma0 + maj;
            h = g2;
            g2 = f;
            f = e2;
            e2 = d2 + t1 | 0;
            d2 = c2;
            c2 = b;
            b = a;
            a = t1 + t2 | 0;
          }
          H3[0] = H3[0] + a | 0;
          H3[1] = H3[1] + b | 0;
          H3[2] = H3[2] + c2 | 0;
          H3[3] = H3[3] + d2 | 0;
          H3[4] = H3[4] + e2 | 0;
          H3[5] = H3[5] + f | 0;
          H3[6] = H3[6] + g2 | 0;
          H3[7] = H3[7] + h | 0;
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
      C2.SHA256 = Hasher._createHelper(SHA2562);
      C2.HmacSHA256 = Hasher._createHmacHelper(SHA2562);
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
      var C2 = CryptoJS2;
      var C_lib = C2.lib;
      var Base = C_lib.Base;
      var C_enc = C2.enc;
      var Utf8 = C_enc.Utf8;
      var C_algo = C2.algo;
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
function am1(i, x2, w, j, c2, n2) {
  while (--n2 >= 0) {
    var v = x2 * this[i++] + w[j] + c2;
    c2 = Math.floor(v / 67108864);
    w[j++] = v & 67108863;
  }
  return c2;
}
function am2(i, x2, w, j, c2, n2) {
  var xl = x2 & 32767, xh = x2 >> 15;
  while (--n2 >= 0) {
    var l2 = this[i] & 32767;
    var h = this[i++] >> 15;
    var m = xh * l2 + h * xl;
    l2 = xl * l2 + ((m & 32767) << 15) + w[j] + (c2 & 1073741823);
    c2 = (l2 >>> 30) + (m >>> 15) + xh * h + (c2 >>> 30);
    w[j++] = l2 & 1073741823;
  }
  return c2;
}
function am3(i, x2, w, j, c2, n2) {
  var xl = x2 & 16383, xh = x2 >> 14;
  while (--n2 >= 0) {
    var l2 = this[i] & 16383;
    var h = this[i++] >> 14;
    var m = xh * l2 + h * xl;
    l2 = xl * l2 + ((m & 16383) << 14) + w[j] + c2;
    c2 = (l2 >> 28) + (m >> 14) + xh * h;
    w[j++] = l2 & 268435455;
  }
  return c2;
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
  var c2 = BI_RC[s2.charCodeAt(i)];
  return c2 == null ? -1 : c2;
}
function bnpCopyTo(r2) {
  for (var i = this.t - 1; i >= 0; --i) {
    r2[i] = this[i];
  }
  r2.t = this.t;
  r2.s = this.s;
}
function bnpFromInt(x2) {
  this.t = 1;
  this.s = x2 < 0 ? -1 : 0;
  if (x2 > 0)
    this[0] = x2;
  else if (x2 < -1)
    this[0] = x2 + this.DV;
  else
    this.t = 0;
}
function nbv(i) {
  var r2 = nbi();
  r2.fromInt(i);
  return r2;
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
  var i = s2.length, mi2 = false, sh = 0;
  while (--i >= 0) {
    var x2 = intAt(s2, i);
    if (x2 < 0) {
      if (s2.charAt(i) == "-")
        mi2 = true;
      continue;
    }
    mi2 = false;
    if (sh == 0)
      this[this.t++] = x2;
    else if (sh + k > this.DB) {
      this[this.t - 1] |= (x2 & (1 << this.DB - sh) - 1) << sh;
      this[this.t++] = x2 >> this.DB - sh;
    } else
      this[this.t - 1] |= x2 << sh;
    sh += k;
    if (sh >= this.DB)
      sh -= this.DB;
  }
  this.clamp();
  if (mi2)
    BigInteger.ZERO.subTo(this, this);
}
function bnpClamp() {
  var c2 = this.s & this.DM;
  while (this.t > 0 && this[this.t - 1] == c2) {
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
  var km = (1 << k) - 1, d2, m = false, r2 = "", i = this.t;
  var p2 = this.DB - i * this.DB % k;
  if (i-- > 0) {
    if (p2 < this.DB && (d2 = this[i] >> p2) > 0) {
      m = true;
      r2 = int2char(d2);
    }
    while (i >= 0) {
      if (p2 < k) {
        d2 = (this[i] & (1 << p2) - 1) << k - p2;
        d2 |= this[--i] >> (p2 += this.DB - k);
      } else {
        d2 = this[i] >> (p2 -= k) & km;
        if (p2 <= 0) {
          p2 += this.DB;
          --i;
        }
      }
      if (d2 > 0)
        m = true;
      if (m)
        r2 += int2char(d2);
    }
  }
  return m ? r2 : "0";
}
function bnNegate() {
  var r2 = nbi();
  BigInteger.ZERO.subTo(this, r2);
  return r2;
}
function bnAbs() {
  return this.s < 0 ? this.negate() : this;
}
function bnCompareTo(a) {
  var r2 = this.s - a.s;
  if (r2 != 0)
    return r2;
  var i = this.t;
  r2 = i - a.t;
  if (r2 != 0)
    return this.s < 0 ? -r2 : r2;
  while (--i >= 0) {
    if ((r2 = this[i] - a[i]) != 0)
      return r2;
  }
  return 0;
}
function nbits(x2) {
  var r2 = 1, t2;
  if ((t2 = x2 >>> 16) != 0) {
    x2 = t2;
    r2 += 16;
  }
  if ((t2 = x2 >> 8) != 0) {
    x2 = t2;
    r2 += 8;
  }
  if ((t2 = x2 >> 4) != 0) {
    x2 = t2;
    r2 += 4;
  }
  if ((t2 = x2 >> 2) != 0) {
    x2 = t2;
    r2 += 2;
  }
  if ((t2 = x2 >> 1) != 0) {
    x2 = t2;
    r2 += 1;
  }
  return r2;
}
function bnBitLength() {
  if (this.t <= 0)
    return 0;
  return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
}
function bnpDLShiftTo(n2, r2) {
  var i;
  for (i = this.t - 1; i >= 0; --i) {
    r2[i + n2] = this[i];
  }
  for (i = n2 - 1; i >= 0; --i) {
    r2[i] = 0;
  }
  r2.t = this.t + n2;
  r2.s = this.s;
}
function bnpDRShiftTo(n2, r2) {
  for (var i = n2; i < this.t; ++i) {
    r2[i - n2] = this[i];
  }
  r2.t = Math.max(this.t - n2, 0);
  r2.s = this.s;
}
function bnpLShiftTo(n2, r2) {
  var bs = n2 % this.DB;
  var cbs = this.DB - bs;
  var bm = (1 << cbs) - 1;
  var ds = Math.floor(n2 / this.DB), c2 = this.s << bs & this.DM, i;
  for (i = this.t - 1; i >= 0; --i) {
    r2[i + ds + 1] = this[i] >> cbs | c2;
    c2 = (this[i] & bm) << bs;
  }
  for (i = ds - 1; i >= 0; --i) {
    r2[i] = 0;
  }
  r2[ds] = c2;
  r2.t = this.t + ds + 1;
  r2.s = this.s;
  r2.clamp();
}
function bnpRShiftTo(n2, r2) {
  r2.s = this.s;
  var ds = Math.floor(n2 / this.DB);
  if (ds >= this.t) {
    r2.t = 0;
    return;
  }
  var bs = n2 % this.DB;
  var cbs = this.DB - bs;
  var bm = (1 << bs) - 1;
  r2[0] = this[ds] >> bs;
  for (var i = ds + 1; i < this.t; ++i) {
    r2[i - ds - 1] |= (this[i] & bm) << cbs;
    r2[i - ds] = this[i] >> bs;
  }
  if (bs > 0)
    r2[this.t - ds - 1] |= (this.s & bm) << cbs;
  r2.t = this.t - ds;
  r2.clamp();
}
function bnpSubTo(a, r2) {
  var i = 0, c2 = 0, m = Math.min(a.t, this.t);
  while (i < m) {
    c2 += this[i] - a[i];
    r2[i++] = c2 & this.DM;
    c2 >>= this.DB;
  }
  if (a.t < this.t) {
    c2 -= a.s;
    while (i < this.t) {
      c2 += this[i];
      r2[i++] = c2 & this.DM;
      c2 >>= this.DB;
    }
    c2 += this.s;
  } else {
    c2 += this.s;
    while (i < a.t) {
      c2 -= a[i];
      r2[i++] = c2 & this.DM;
      c2 >>= this.DB;
    }
    c2 -= a.s;
  }
  r2.s = c2 < 0 ? -1 : 0;
  if (c2 < -1)
    r2[i++] = this.DV + c2;
  else if (c2 > 0)
    r2[i++] = c2;
  r2.t = i;
  r2.clamp();
}
function bnpMultiplyTo(a, r2) {
  var x2 = this.abs(), y = a.abs();
  var i = x2.t;
  r2.t = i + y.t;
  while (--i >= 0) {
    r2[i] = 0;
  }
  for (i = 0; i < y.t; ++i) {
    r2[i + x2.t] = x2.am(0, y[i], r2, i, 0, x2.t);
  }
  r2.s = 0;
  r2.clamp();
  if (this.s != a.s)
    BigInteger.ZERO.subTo(r2, r2);
}
function bnpSquareTo(r2) {
  var x2 = this.abs();
  var i = r2.t = 2 * x2.t;
  while (--i >= 0) {
    r2[i] = 0;
  }
  for (i = 0; i < x2.t - 1; ++i) {
    var c2 = x2.am(i, x2[i], r2, 2 * i, 0, 1);
    if ((r2[i + x2.t] += x2.am(i + 1, 2 * x2[i], r2, 2 * i + 1, c2, x2.t - i - 1)) >= x2.DV) {
      r2[i + x2.t] -= x2.DV;
      r2[i + x2.t + 1] = 1;
    }
  }
  if (r2.t > 0)
    r2[r2.t - 1] += x2.am(i, x2[i], r2, 2 * i, 0, 1);
  r2.s = 0;
  r2.clamp();
}
function bnpDivRemTo(m, q, r2) {
  var pm = m.abs();
  if (pm.t <= 0)
    return;
  var pt = this.abs();
  if (pt.t < pm.t) {
    if (q != null)
      q.fromInt(0);
    if (r2 != null)
      this.copyTo(r2);
    return;
  }
  if (r2 == null)
    r2 = nbi();
  var y = nbi(), ts = this.s, ms = m.s;
  var nsh = this.DB - nbits(pm[pm.t - 1]);
  if (nsh > 0) {
    pm.lShiftTo(nsh, y);
    pt.lShiftTo(nsh, r2);
  } else {
    pm.copyTo(y);
    pt.copyTo(r2);
  }
  var ys = y.t;
  var y0 = y[ys - 1];
  if (y0 == 0)
    return;
  var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
  var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e2 = 1 << this.F2;
  var i = r2.t, j = i - ys, t2 = q == null ? nbi() : q;
  y.dlShiftTo(j, t2);
  if (r2.compareTo(t2) >= 0) {
    r2[r2.t++] = 1;
    r2.subTo(t2, r2);
  }
  BigInteger.ONE.dlShiftTo(ys, t2);
  t2.subTo(y, y);
  while (y.t < ys) {
    y[y.t++] = 0;
  }
  while (--j >= 0) {
    var qd = r2[--i] == y0 ? this.DM : Math.floor(r2[i] * d1 + (r2[i - 1] + e2) * d2);
    if ((r2[i] += y.am(0, qd, r2, j, 0, ys)) < qd) {
      y.dlShiftTo(j, t2);
      r2.subTo(t2, r2);
      while (r2[i] < --qd) {
        r2.subTo(t2, r2);
      }
    }
  }
  if (q != null) {
    r2.drShiftTo(ys, q);
    if (ts != ms)
      BigInteger.ZERO.subTo(q, q);
  }
  r2.t = ys;
  r2.clamp();
  if (nsh > 0)
    r2.rShiftTo(nsh, r2);
  if (ts < 0)
    BigInteger.ZERO.subTo(r2, r2);
}
function bnMod(a) {
  var r2 = nbi();
  this.abs().divRemTo(a, null, r2);
  if (this.s < 0 && r2.compareTo(BigInteger.ZERO) > 0)
    a.subTo(r2, r2);
  return r2;
}
function bnpInvDigit() {
  if (this.t < 1)
    return 0;
  var x2 = this[0];
  if ((x2 & 1) == 0)
    return 0;
  var y = x2 & 3;
  y = y * (2 - (x2 & 15) * y) & 15;
  y = y * (2 - (x2 & 255) * y) & 255;
  y = y * (2 - ((x2 & 65535) * y & 65535)) & 65535;
  y = y * (2 - x2 * y % this.DV) % this.DV;
  return y > 0 ? this.DV - y : -y;
}
function bnEquals(a) {
  return this.compareTo(a) == 0;
}
function bnpAddTo(a, r2) {
  var i = 0, c2 = 0, m = Math.min(a.t, this.t);
  while (i < m) {
    c2 += this[i] + a[i];
    r2[i++] = c2 & this.DM;
    c2 >>= this.DB;
  }
  if (a.t < this.t) {
    c2 += a.s;
    while (i < this.t) {
      c2 += this[i];
      r2[i++] = c2 & this.DM;
      c2 >>= this.DB;
    }
    c2 += this.s;
  } else {
    c2 += this.s;
    while (i < a.t) {
      c2 += a[i];
      r2[i++] = c2 & this.DM;
      c2 >>= this.DB;
    }
    c2 += a.s;
  }
  r2.s = c2 < 0 ? -1 : 0;
  if (c2 > 0)
    r2[i++] = c2;
  else if (c2 < -1)
    r2[i++] = this.DV + c2;
  r2.t = i;
  r2.clamp();
}
function bnAdd(a) {
  var r2 = nbi();
  this.addTo(a, r2);
  return r2;
}
function bnSubtract(a) {
  var r2 = nbi();
  this.subTo(a, r2);
  return r2;
}
function bnMultiply(a) {
  var r2 = nbi();
  this.multiplyTo(a, r2);
  return r2;
}
function bnDivide(a) {
  var r2 = nbi();
  this.divRemTo(a, r2, null);
  return r2;
}
function Montgomery(m) {
  this.m = m;
  this.mp = m.invDigit();
  this.mpl = this.mp & 32767;
  this.mph = this.mp >> 15;
  this.um = (1 << m.DB - 15) - 1;
  this.mt2 = 2 * m.t;
}
function montConvert(x2) {
  var r2 = nbi();
  x2.abs().dlShiftTo(this.m.t, r2);
  r2.divRemTo(this.m, null, r2);
  if (x2.s < 0 && r2.compareTo(BigInteger.ZERO) > 0)
    this.m.subTo(r2, r2);
  return r2;
}
function montRevert(x2) {
  var r2 = nbi();
  x2.copyTo(r2);
  this.reduce(r2);
  return r2;
}
function montReduce(x2) {
  while (x2.t <= this.mt2) {
    x2[x2.t++] = 0;
  }
  for (var i = 0; i < this.m.t; ++i) {
    var j = x2[i] & 32767;
    var u0 = j * this.mpl + ((j * this.mph + (x2[i] >> 15) * this.mpl & this.um) << 15) & x2.DM;
    j = i + this.m.t;
    x2[j] += this.m.am(0, u0, x2, i, 0, this.m.t);
    while (x2[j] >= x2.DV) {
      x2[j] -= x2.DV;
      x2[++j]++;
    }
  }
  x2.clamp();
  x2.drShiftTo(this.m.t, x2);
  if (x2.compareTo(this.m) >= 0)
    x2.subTo(this.m, x2);
}
function montSqrTo(x2, r2) {
  x2.squareTo(r2);
  this.reduce(r2);
}
function montMulTo(x2, y, r2) {
  x2.multiplyTo(y, r2);
  this.reduce(r2);
}
Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;
function bnModPow(e2, m, callback) {
  var i = e2.bitLength(), k, r2 = nbv(1), z2 = new Montgomery(m);
  if (i <= 0)
    return r2;
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
  var g2 = new Array(), n2 = 3, k1 = k - 1, km = (1 << k) - 1;
  g2[1] = z2.convert(this);
  if (k > 1) {
    var g22 = nbi();
    z2.sqrTo(g2[1], g22);
    while (n2 <= km) {
      g2[n2] = nbi();
      z2.mulTo(g22, g2[n2 - 2], g2[n2]);
      n2 += 2;
    }
  }
  var j = e2.t - 1, w, is1 = true, r22 = nbi(), t2;
  i = nbits(e2[j]) - 1;
  while (j >= 0) {
    if (i >= k1)
      w = e2[j] >> i - k1 & km;
    else {
      w = (e2[j] & (1 << i + 1) - 1) << k1 - i;
      if (j > 0)
        w |= e2[j - 1] >> this.DB + i - k1;
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
      g2[w].copyTo(r2);
      is1 = false;
    } else {
      while (n2 > 1) {
        z2.sqrTo(r2, r22);
        z2.sqrTo(r22, r2);
        n2 -= 2;
      }
      if (n2 > 0)
        z2.sqrTo(r2, r22);
      else {
        t2 = r2;
        r2 = r22;
        r22 = t2;
      }
      z2.mulTo(r22, g2[w], r2);
    }
    while (j >= 0 && (e2[j] & 1 << i) == 0) {
      z2.sqrTo(r2, r22);
      t2 = r2;
      r2 = r22;
      r22 = t2;
      if (--i < 0) {
        i = this.DB - 1;
        --j;
      }
    }
  }
  var result = z2.revert(r2);
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
  _proto.calculateU = function calculateU(A, B2) {
    this.UHexHash = this.hexHash(this.padHex(A) + this.padHex(B2));
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
      var invertedNibbles = hexStr.split("").map(function(x2) {
        var invertedNibble = ~parseInt(x2, 16) & 15;
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
function _setPrototypeOf$2(o2, p2) {
  _setPrototypeOf$2 = Object.setPrototypeOf || function _setPrototypeOf2(o3, p3) {
    o3.__proto__ = p3;
    return o3;
  };
  return _setPrototypeOf$2(o2, p2);
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
function _setPrototypeOf$1(o2, p2) {
  _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf2(o3, p3) {
    o3.__proto__ = p3;
    return o3;
  };
  return _setPrototypeOf$1(o2, p2);
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
      var C2 = CryptoJS2;
      var C_lib = C2.lib;
      var WordArray2 = C_lib.WordArray;
      var C_enc = C2.enc;
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
function unfetch_module(e2, n2) {
  return n2 = n2 || {}, new Promise(function(t2, r2) {
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
      }, get: function(e3) {
        return i[e3.toLowerCase()];
      }, has: function(e3) {
        return e3.toLowerCase() in i;
      } } };
    };
    for (var l2 in s2.open(n2.method || "get", e2, true), s2.onload = function() {
      s2.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function(e3, n3, t3) {
        o2.push(n3 = n3.toLowerCase()), u.push([n3, t3]), i[n3] = i[n3] ? i[n3] + "," + t3 : t3;
      }), t2(a());
    }, s2.onerror = r2, s2.withCredentials = n2.credentials == "include", n2.headers)
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
  } catch (e2) {
    return false;
  }
}
function _isNativeFunction(fn2) {
  return Function.toString.call(fn2).indexOf("[native code]") !== -1;
}
function _setPrototypeOf(o2, p2) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o3, p3) {
    o3.__proto__ = p3;
    return o3;
  };
  return _setPrototypeOf(o2, p2);
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
    jitteredExponentialRetry(function(p2) {
      return new Promise(function(res, rej) {
        _this3.request(operation, p2, function(error, result) {
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
        } catch (e2) {
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
              } catch (e2) {
              }
            }
            jar[name] = cookie;
            if (key === name) {
              break;
            }
          } catch (e2) {
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
      const err = new qa(`"username" property is required.`, {
        form: {
          field: "username",
          problem: FormValidationProblem.Required
        }
      });
      dispatch(setLoginFailure(err.toJSON()));
      return;
    }
    if (!password) {
      const err = new qa(`"password" property is required.`, {
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
      const err = new Ha(`"username" value is not valid email.`, {
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
        const exception = new d("Error encountered while logging user in", {
          cause: err
        });
        dispatch(setLoginFailure(exception.toJSON()));
      },
      onSuccess: (result) => {
        const accessToken = result.getAccessToken().getJwtToken();
      }
    });
  } catch (error) {
    const exception = error instanceof d ? error : new aa("An unknown error occurred while logging a user in.", {
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
    const exception = new d("Error encountered getting user attributes", {
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
      const err = new qa(`"username" property is required.`, {
        form: {
          field: "username",
          problem: FormValidationProblem.Required
        }
      });
      dispatch(setSignupFailure(err.toJSON()));
      return;
    }
    if (!password) {
      const err = new qa(`"password" property is required.`, {
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
      const err = new Ha(`"username" value is not valid email.`, {
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
        const exception = new d("Failure when signing user up", {
          cause: err
        });
        dispatch(setSignupFailure(exception.toJSON()));
        return;
      }
      if (!result) {
        const exception = new d("Unknown error occurred", {});
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
    if (error.name === p.name) {
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
    const exception = error instanceof d ? error : new G("An exception occurred while checking username availability", {
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
  } catch (e2) {
    shapeAssertionError = e2;
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
    for (var _i2 = 0; _i2 < finalReducerKeys.length; _i2++) {
      var _key = finalReducerKeys[_i2];
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
        const exception = new d("Failure resending verification code", {
          cause: err
        });
        dispatch(setVerificationCodeResendFailure(exception.toJSON()));
        return;
      }
      console.log("resendConfirmationCode result", result);
      dispatch(setVerificationCodeResendSuccess());
    });
  } catch (err) {
    const exception = new d("Failure resending verification code", {
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
    const exception = error instanceof d ? error : new d(error.message, {
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
      const exception = new d("Failure confirming verification code", {
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
const environment = s$2();
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
  await store.dispatch(setRoutes(routes2.map((_e2) => {
    var _f = _e2, { component } = _f, route = __objRest(_f, ["component"]);
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
