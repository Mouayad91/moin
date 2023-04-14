/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = __webpack_require__(2),
    test = _require.test,
    assert = _require.assert;

var WIN = global.window;
var kjua = WIN.kjua;
test('global access', function () {
  assert.equal(kjua, global.kjua);
  assert.equal(kjua, WIN.kjua);
  assert.equal(_typeof(kjua), 'function');
});
test('returns image element', function () {
  var res = kjua();
  assert.ok(res instanceof WIN.HTMLElement);
  assert.equal(res.tagName.toUpperCase(), 'IMG');
});
test('returns canvas element', function () {
  var res = kjua({
    render: 'canvas'
  });
  assert.ok(res instanceof WIN.HTMLElement);
  assert.equal(res.tagName.toUpperCase(), 'CANVAS');
});
test.cli();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Test = __webpack_require__(3);
const Suite = __webpack_require__(5);
const reporter = __webpack_require__(6);
const cli = __webpack_require__(8);

const scar = () => {
    const tests = [];

    const test = (...args) => {
        tests.push(new Test(...args));
    };

    test.skip = (...args) => test(...args, {skip: true});
    test.sync = (...args) => test(...args, {sync: true});

    test.run = options => {
        options = {reporter, ...options, tests};
        return new Suite(options).run();
    };

    test.cli = options => cli(test.run, options);

    return test;
};

module.exports = {
    scar,
    test: scar(),
    assert: __webpack_require__(9),
    insp: __webpack_require__(10),
    spy: __webpack_require__(11),
    uniq: __webpack_require__(12)
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const {is_str, is_num, is_fn, as_fn} = __webpack_require__(4);

const timeout = (promise, millis) => {
    if (!is_num(millis) || millis <= 0) {
        return promise;
    }
    return Promise.race([
        promise,
        new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error(`Timeout (${millis}ms)`)), millis);
        })
    ]);
};

class Test {
    constructor(...args) {
        this.desc = '[No Description]';
        this.fn = null;
        this.skip = false;
        this.sync = false;
        this.timeout = null;
        args.forEach(arg => {
            if (is_str(arg)) {
                this.desc = arg;
            } else if (is_fn(arg)) {
                this.fn = arg;
            } else {
                Object.assign(this, arg);
            }
        });
        this.status = Test.WAITING;
        this.err = null;
        this.starttime = null;
        this.duration = null;
        this.promise = null;
    }

    __TRACE_MARKER__() {
        return as_fn(this.fn)();
    }

    run() {
        this.promise = this.promise || Promise.resolve()
            .then(() => {
                this.starttime = Date.now();
                this.status = Test.PENDING;

                if (this.skip) {
                    return null;
                }

                const pr = Promise.resolve().then(() => this.__TRACE_MARKER__());
                return timeout(pr, this.timeout);
            })
            .then(() => {
                this.status = this.skip ? Test.SKIPPED : Test.PASSED;
            })
            .catch(err => {
                this.status = Test.FAILED;
                this.err = err;
            })
            .then(() => {
                this.duration = Date.now() - this.starttime;
            });
        return this.promise;
    }
}

Test.WAITING = 'WAITING';
Test.PENDING = 'PENDING';
Test.PASSED = 'PASSED';
Test.FAILED = 'FAILED';
Test.SKIPPED = 'SKIPPED';

module.exports = Test;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

const is_bool = x => typeof x === 'boolean';
const is_num = x => typeof x === 'number';
const is_str = x => typeof x === 'string';
const is_arr = x => Array.isArray(x);
const is_fn = x => typeof x === 'function';
const as_fn = x => is_fn(x) ? x : () => x;
const is_regexp = x => x instanceof RegExp;
const is_plain_obj = x => Reflect.apply(Object.prototype.toString, x, []) === '[object Object]';

const run_seq = fns => fns.reduce((p, fn) => p.then(fn), Promise.resolve());

const run_conc = (fns, max = 1024) => {
    if (max < 2) {
        return run_seq(fns);
    }

    return new Promise(resolve => {
        fns = Array.from(fns);
        let awaiting = fns.length;
        let pending = 0;

        const run_fn = fn => {
            return Promise.resolve()
                .then(fn)
                .catch(() => {})
                .then(() => {
                    pending -= 1;
                    awaiting -= 1;
                });
        };

        const check = () => {
            while (fns.length && pending < max) {
                run_fn(fns.shift()).then(check);
                pending += 1;
            }
            if (!awaiting) {
                resolve();
            }
        };

        check();
    });
};

module.exports = {
    is_bool,
    is_num,
    is_str,
    is_arr,
    is_fn,
    is_regexp,
    is_plain_obj,
    as_fn,
    run_seq,
    run_conc
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const {as_fn, run_seq, run_conc} = __webpack_require__(4);
const Test = __webpack_require__(3);

class Suite {
    constructor(options) {
        this.sync = false;
        this.reporter = null;
        this.filter = null;
        this.max_conc = 64;
        this.tests = [];
        Object.assign(this, options);
        this.status = Test.WAITING;
        this.starttime = null;
        this.duration = null;
        this.promise = null;
    }

    run_test(test) {
        return Promise.resolve()
            .then(() => as_fn(this.reporter)('before_test', this, test))
            .then(() => {
                this.run_count += 1;
                test.run_idx = this.run_count;
            })
            .then(() => test.run())
            .then(() => {
                this.settled_count += 1;
                test.settled_idx = this.settled_count;
                if (test.status === Test.PASSED) {
                    this.passed_count += 1;
                    test.passed_idx = this.passed_count;
                } else if (test.status === Test.SKIPPED) {
                    this.skipped_count += 1;
                    test.skipped_idx = this.skipped_count;
                } else {
                    this.failed_count += 1;
                    test.failed_idx = this.failed_count;
                }
            })
            .then(() => as_fn(this.reporter)('after_test', this, test));
    }

    run() {
        this.promise = this.promise || Promise.resolve()
            .then(() => {
                this.tests.forEach((test, idx) => {test.def_idx = idx + 1;});
                this.total = this.tests.length;
                this.filtered_tests = this.tests.filter(as_fn(this.filter || true));
                this.filtered_total = this.filtered_tests.length;
                this.run_count = 0;
                this.settled_count = 0;
                this.passed_count = 0;
                this.failed_count = 0;
                this.skipped_count = 0;
            })
            .then(() => as_fn(this.reporter)('before_all', this))
            .then(() => {
                this.starttime = Date.now();
                this.status = Test.PENDING;

                const test_to_fn = test => () => this.run_test(test);

                const tests = this.filtered_tests;
                const sync_tests = this.sync ? tests : tests.filter(t => !!t.sync);
                const async_tests = this.sync ? [] : tests.filter(t => !t.sync);

                const sync_fns = sync_tests.map(test_to_fn);
                const async_fns = async_tests.map(test_to_fn);

                return run_seq(sync_fns).then(() => run_conc(async_fns, this.max_conc));
            })
            .then(() => {
                this.status = this.failed_count ? Test.FAILED : Test.PASSED;
                this.duration = Date.now() - this.starttime;
            })
            .then(() => as_fn(this.reporter)('after_all', this))
            .then(() => this);

        return this.promise;
    }
}

module.exports = Suite;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {const format_err = __webpack_require__(7);
const Test = __webpack_require__(3);

const DOC = global.window && global.window.document;
const ICON_TPL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH3wsZER*AAAAAElFTkSuQmCC';
const ICON_RED = ICON_TPL.replace('*', 'Y0VbWlewAAAB1JREFUOMtj/OJs9p+BAsDEQCEYNWDUgFEDBosBABZOAow9yV0y');
const ICON_GREEN = ICON_TPL.replace('*', 'kM+i8BKgAAAB1JREFUOMtj9Fkf8J+BAsDEQCEYNWDUgFEDBosBAIuhAmqCXURi');
const ICON_GREY = ICON_TPL.replace('*', 'kjUf48cwAAAB1JREFUOMtjDA0N/c9AAWBioBCMGjBqwKgBg8UAAFduAh79mcom');

const log = x => console.log(x);
const set_title = !DOC ? () => null : (() => {
    const head = DOC.querySelector('head');
    const rel = 'shortcut icon';
    return (title, href) => {
        DOC.title = title;
        const el = head.querySelector(`link[rel="${rel}"]`);
        if (el) {
            head.removeChild(el);
        }
        head.appendChild(Object.assign(DOC.createElement('link'), {rel, href}));
    };
})();

module.exports = (type, suite, test) => {
    if (type === 'before_all') {
        let str = 'running ';
        if (suite.filtered_total !== suite.total) {
            str += `${suite.filtered_total} of `;
        }
        str += `${suite.total} tests\n `;
        log(str);
        set_title(`running ${suite.filtered_total} tests...`, ICON_GREY);

        // take time to update icon
        return new Promise(resolve => setTimeout(() => resolve(), 30));
    }

    if (type === 'after_test') {
        const status = test.status === Test.PASSED ? ' ok ' : test.status === Test.SKIPPED ? 'skip' : 'FAIL';
        log(` ${status} ${test.desc}`);
    }

    if (type === 'after_all') {
        suite.tests.filter(t => t.status === Test.FAILED).forEach(t => {
            const str = format_err(t.err, '  ');
            log(`\n[${t.failed_idx}] ${t.desc}\n${str}`);
        });
        let resume = '\n';
        if (suite.failed_count) {
            resume += `${suite.failed_count} failed, `;
        }
        if (suite.skipped_count) {
            resume += `${suite.skipped_count} skipped, `;
        }
        resume += `${suite.passed_count} passed (${suite.duration}ms)`;
        log(resume);
        set_title(resume, suite.failed_count ? ICON_RED : ICON_GREEN);
    }

    return null;
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

const LINE_PATTERNS = [
    // v8: ' at <method> (<url>:<line>:<col>)'
    {
        re: /^\s*at\s+(.*?)\s+\((.*?)(?::(\d+))?(?::(\d+))?\)\s*$/,
        method: 1, url: 2, line: 3, column: 4
    },

    // v8 no method: ' at <url>:<line>:<col>'
    {
        re: /^\s*at\s+(.*?)(?::(\d+))?(?::(\d+))?\s*$/,
        method: null, url: 1, line: 2, column: 3
    },

    // spidermonkey: '<method>@<url>:<line>:<col>'
    {
        re: /^(.*?)@(.*?)(?::(\d+))?(?::(\d+))?\s*$/,
        method: 1, url: 2, line: 3, column: 4
    }
];
const RE_MARKER = /\b__TRACE_MARKER__\b|^process\._tickCallback$/;

const parse_frame = line => {
    for (const pattern of LINE_PATTERNS) {
        const match = pattern.re.exec(line);
        if (match) {
            return {
                method: match[pattern.method] || '',
                url: match[pattern.url],
                basename: match[pattern.url].replace(/^.*\//, ''),
                line: parseInt(match[pattern.line], 10),
                column: parseInt(match[pattern.column], 10),
                drop: false
            };
        }
    }
    return null;
};

const parse_frames = (sequence, drop) => {
    drop = Number(drop) || 0;
    const lines = sequence.split('\n');
    const frames = lines.map(line => parse_frame(line)).filter(x => x);
    let drop_frames = false;
    frames.forEach((frame, idx) => {
        drop_frames = drop_frames || RE_MARKER.test(frame.method);
        frame.drop = idx < drop || drop_frames;
    });
    return frames;
};

const format_frames = (frames, short, full_stack) => {
    frames = frames.filter(frame => full_stack || !frame.drop);
    return frames.map(frame => {
        let str = frame.drop ? '      ' : '  ->  ';
        str += [short ? frame.basename : frame.url, frame.line, frame.column].filter(x => x).join('  ');
        if (frame.method) {
            str += `  (${frame.method})`;
        }
        return str;
    }).join('\n');
};

const format_err = (err, prefix = '', short = false, full_stack = false) => {
    const frames = parse_frames(err.stack, err.drop);
    const str = `${err.name}: ${err.message}\n` + format_frames(frames, short, full_stack);
    return prefix + str.replace(/\n/g, '\n' + prefix);
};

module.exports = format_err;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {const PROC = global.process;
const WIN = global.window;
const HELP = `scar - a test runner for node and the browser

Usage:
  node tests.js [opt...] [arg...]
  tests.html?opt&...&arg&...

Options:
  -h: show this help message

Arguments:
  all arguments are used as test filters
`;

const log = console.log.bind(console);
const create_filter_fn = strs => test => strs.every(s => test.desc.includes(s));

const parse_args = () => {
    let args = [];
    if (PROC) {
        args = PROC.argv.slice(2);
    } else if (WIN) {
        args = WIN.location.href.split(/[\?&]+/).slice(1);
    }

    return {
        show_help: args.includes('-h'),
        filters: args.filter(arg => arg.length && arg[0] !== '-')
    };
};

const cli = (run, options) => {
    return Promise.resolve()
        .then(() => {
            return !WIN ? null : new Promise(resolve => {
                WIN.addEventListener('load', () => resolve());
            });
        })
        .then(() => {
            const cli_opts = parse_args();

            if (cli_opts.show_help) {
                log(HELP);
                return null;
            }

            options = {
                ...options,
                filter: create_filter_fn(cli_opts.filters)
            };
            return run(options)
                .then(suite => {
                    if (PROC && suite.failed_count) {
                        PROC.exit(1);
                    }
                })
                .catch(err => {
                    log(`\n${err.stack}\n`);
                    if (PROC) {
                        PROC.exit(2);
                    }
                });
        });
};

module.exports = cli;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const {is_fn, is_regexp} = __webpack_require__(4);
const insp = __webpack_require__(10);

const get_type = x => Reflect.apply(Object.prototype.toString, x, []);

const deep_equal = (a, b) => {
    if (a === b || Number.isNaN(a) && Number.isNaN(b)) {
        return true;
    }

    let type = typeof a;
    if (type !== 'object' && type === typeof b) {
        return a === b;
    }

    type = get_type(a);
    if (type !== get_type(b)) {
        return false;
    }

    if (type === '[object Array]') {
        return a.length === b.length && a.every((_, idx) => {
            return deep_equal(a[idx], b[idx]);
        });
    }

    if (type === '[object Object]') {
        const keys = Object.keys(a);
        return deep_equal(keys.sort(), Object.keys(b).sort()) && keys.every(key => {
            return deep_equal(a[key], b[key]);
        });
    }

    return false;
};

const asrt = (expr, msg, drop = 2) => {
    if (!expr) {
        throw Object.assign(new Error(msg), {name: 'AssertionError', drop});
    }
};

const asrt_err = (err, exp, msg) => {
    if (is_regexp(exp)) {
        err = String(err);
        asrt(exp.test(err), msg || `expected error ${insp(err)} to be matched by ${insp(exp)}`, 3);
    } else if (is_fn(exp)) {
        exp(err);
    } else if (exp !== undefined) {
        asrt(err === exp, msg || `expected error ${insp(err)} to be ${insp(exp)}`, 3);
    }
};

const assert = (expr, msg) => {
    asrt(expr, msg);
};

assert.fail = msg => {
    asrt(false, msg);
};

assert.ok = (act, msg) => {
    asrt(!!act, msg || `expected ${insp(act)} to be truthy`);
};

assert.not_ok = (act, msg) => {
    asrt(!act, msg || `expected ${insp(act)} to be falsy`);
};

assert.equal = (act, exp, msg) => {
    asrt(act === exp, msg || `expected ${insp(act)} to equal ${insp(exp)}`);
};

assert.not_equal = (act, ref, msg) => {
    asrt(act !== ref, msg || `expected ${insp(act)} not to equal ${insp(ref)}`);
};

assert.deep_equal = (act, exp, msg) => {
    asrt(deep_equal(act, exp), msg || `expected ${insp(act)} to deeply equal ${insp(exp)}`);
};

assert.not_deep_equal = (act, ref, msg) => {
    asrt(!deep_equal(act, ref), msg || `expected ${insp(act)} not to deeply equal ${insp(ref)}`);
};

assert.throws = (fn, exp, msg) => {
    asrt(is_fn(fn), `expected ${insp(fn)} to be a function`);

    const none = {};
    let val = none;

    try {
        val = fn();
    } catch (err) {
        asrt_err(err, exp, msg);
    }

    asrt(val === none, msg || `expected fn to throw but returned ${val}`);
};

assert.rejects = (promise, exp, msg) => {
    return Promise.resolve(promise).then(
        val => asrt(false, msg || `expected rejection but resolved to ${val}`),
        err => asrt_err(err, exp, msg)
    );
};

module.exports = assert;

// deprecated
assert.notOk = assert.not_ok;
assert.notEqual = assert.not_equal;
assert.deepEqual = assert.deep_equal;
assert.notDeepEqual = assert.not_deep_equal;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const {is_str, is_fn, is_arr, is_plain_obj} = __webpack_require__(4);

const insp = (x, visited = []) => {
    if (visited.includes(x)) {
        return '[circular]';
    }
    visited.push(x);

    if (is_str(x)) {
        return `'${x}'`;
    }
    if (is_fn(x)) {
        return String(x).split(')')[0] + ')';
    }
    if (is_arr(x)) {
        return '[' + Array.from(x, el => insp(el, visited)).join(', ') + ']';
    }
    if (is_plain_obj(x)) {
        return '{' + Object.keys(x).map(key => `${key}: ${insp(x[key], visited)}`).join(', ') + '}';
    }
    return String(x);
};

module.exports = insp;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const {as_fn} = __webpack_require__(4);

const spy = fn => {
    const calls = [];

    function wrapper() {
        'use strict'; // eslint-disable-line strict

        const call = {
            idx: calls.length,
            time: Date.now(),
            ctx: this, // eslint-disable-line no-invalid-this
            args: Array.from(arguments)
        };

        calls.push(call);
        call.ret = as_fn(fn)(call, calls);
        call.done = Date.now();

        return call.ret;
    }

    wrapper.calls = calls;
    return wrapper;
};

module.exports = spy;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

const PREFIX = 'UNIQ-';
const SUFFIX = '-ID';
const LENGTH = 4;
const ZEROPAD = '0000';
const RE_ID = new RegExp(`^${PREFIX}\\d{${LENGTH}}${SUFFIX}$`);

let counter = 0;

const id = () => {
    counter += 1;
    return PREFIX + (ZEROPAD + counter).substr(-LENGTH) + SUFFIX;
};

const is_id = sequence => RE_ID.test(sequence);
const obj = () => ({_uniq_id: id()});
const path = (ext = '') => '_uniq_path/' + id() + ext;

module.exports = {
    id,
    is_id,
    isId: is_id, // deprecated
    obj,
    path
};


/***/ })
/******/ ]);