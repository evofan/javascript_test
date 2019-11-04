// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/array_from.js":[function(require,module,exports) {
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/from
// Array.from()
// Array.from()メソッドは、★配列風オブジェクトや反復可能オブジェクトから、新しい、浅いコピーの Arrayインスタンスを生成します。
console.log(Array.from("foo")); // ["f", "o", "o"]

console.log(Array.from([1, 2, 3], function (x) {
  return x + x;
})); // [2, 4, 6]

console.log(""); // ■ Syntax
// Array.from(arrayLike[, mapFn[, thisArg]])
// □ 引数
// ・arrayLike ... 配列に変換する配列風オブジェクト又は反復可能オブジェクト、関数内で{}で生成する場合も（すぐmap()適用）
// ・mapFn() ... 配列の全ての要素に対して呼び出されるMap関数
// ・thisArg ... mapFn()を実行する時にthisとして使用される値
// □ 返り値
// ”新しい”arrayインスタンス
// ■ 説明
// Array.from() は、以下のものからArrayを生成します。
// ・配列風オブジェクト (length プロパティおよびインデックス付けされた要素を持つオブジェクト) もしくは
// ・反復可能オブジェクト (Map や Set のような要素を取得するオブジェクト)
// Array.from() は任意の引数 mapFn()を持ちます。これは、作成した配列 (もしくは、サブクラスオブジェクト) のすべての要素に対して
// map関数を実行出来ます。より明確に言うと、中間配列を生成しない事を除いて、Array.from(obj, mapFn, thisArg) は
// Array.from(obj).map(mapFn, thisArg) と同じ結果です。
// 中間配列は、適切な型に合うように丸められた値を持つ必要があるため、typed arrays(型付き配列、Int8Array等)のような配列サブクラスにとっては特に重要です。
// from() メソッドの length プロパティは 1 です。
// ES2015 では、class構文により定義済みクラスとユーザー定義クラスの両方をサブクラス化する事が出来ます。
// 結果として、Array.fromのような静的メソッドは Array のサブクラスに「継承」され、Array ではなくサブクラスのインスタンスを生成します。
// ■ 例
// □ String からの配列の生成

console.log(Array.from("ABC")); // ["A", "B", "C"]
// □ Set からの配列の生成

var set1 = new Set(["foo", "bar", "baz", "foo"]);
console.log(Array.from(set1)); // ["foo", "bar", "baz"]
// □ Map からの配列の生成

var map1 = new Map([[1, 2], [2, 4], [4, 8]]);
console.log(Array.from(map1)); // [ [1, 2], [2, 4], [4, 8] ]

var mapper1 = new Map([["1", "a"], ["2", "b"]]);
console.log(Array.from(mapper1.values())); // ["a", "b"]

console.log(Array.from(mapper1.keys())); // ["1", "2"]
// □ 配列風オブジェクト (引数) からの配列の生成

function f1() {
  return Array.from(arguments);
}

console.log(f1(1, 2, 3)); // [1, 2, 3]
// □ アロー関数と Array.from の使用
// 要素を操作するためにマップ関数として、アロー関数を使用

console.log(Array.from([1, 3, 5], function (x) {
  return x * 2;
})); // [2, 6, 10]
// 連番の生成
// 配列のそれぞれの場所が、"undefined"で初期化されるため、以下の"v"の値は"undefined"になる
// ★配列長さx5 → undefined埋め → map(currentValue, index)でundefinedにindex番号を上書き

console.log(Array.from({
  length: 5
}, function (v, i) {
  return i;
})); // [0, 1, 2, 3, 4]
// □ 連番の生成 (範囲指定)
// ★連番の生成関数（ClojureやPHP等でよくrange()と呼ばれるカスタム関数）

var range = function range(start, stop, step) {
  return Array.from({
    length: (stop - start) / step + 1
  }, function (_, i) {
    return start + i * step;
  });
}; // 0～4の範囲の数値を生成


console.log(range(0, 4, 1)); // [0, 1, 2, 3, 4]
// 1～10の範囲の数値を、2毎に生成

console.log(range(1, 10, 2)); // [1, 3, 5, 7, 9]
// Array.from()を使用して、順番通りになるようアルファベットを生成

console.log(range("A".charCodeAt(0), "Z".charCodeAt(0), 1).map(function (x) {
  return String.fromCharCode(x);
})); // (26) ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

console.log("");
},{}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57325" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","src/array_from.js"], null)
//# sourceMappingURL=/array_from.7ee50658.js.map