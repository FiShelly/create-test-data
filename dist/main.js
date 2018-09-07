'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var util = {
    deepClone: function deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    isEmpty: function isEmpty(obj) {
        if (Array.isArray(obj)) {
            return !obj.length;
        } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
            return !obj;
        } else if (obj === undefined) {
            return true;
        } else if (typeof obj === 'string' && !obj.length) {
            return true;
        }
        return false;
    },
    isArray: function isArray(obj) {
        return Array.isArray(obj);
    },
    isObject: function isObject(obj) {
        return !this.isEmpty(obj) && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
    },
    isString: function isString(obj) {
        return typeof obj === 'string';
    },
    isNumeric: function isNumeric(obj) {
        return !isNaN(parseFloat(obj)) && isFinite(obj);
    },
    isFunction: function isFunction(obj) {
        return !this.isEmpty(obj) && typeof obj === 'function';
    },
    numberic: function numberic(obj) {
        return this.isNumeric(obj);
    },
    email: function email(obj) {
        return (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(obj)
        );
    },
    chinese: function chinese(obj) {
        return (/^[\u4e00-\u9fa5]{0,}$/.test(obj)
        );
    },
    english: function english(obj) {
        return (/^[a-zA-Z]+$/.test(obj)
        );
    },
    url: function url(obj) {
        return (/(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/.test(obj)
        );
    },
    idcard: function idcard(obj) {
        return (/(^\d{15}$)|(^\d{17}(x|X|\d)$)/.test(obj)
        );
    },
    mobile: function mobile(obj) {
        return (/^1(3|4|5|7|8)[0-9]\d{8}$/.test(obj)
        );
    },
    document: function document(obj) {
        return (/\.doc(x?)$|\.xls(x?)$|\.ppt(x?)$|\.wps$|\.pdf$|\.txt$/i.test(obj)
        );
    },
    image: function image(obj) {
        return (/\.png|\.jpg$|\.jpeg$|\.bmp$|\.gif$/i.test(obj)
        );
    },
    video: function video(obj) {
        return (/\.wmv$|\.avi$|\.mkv$|\.mp4$|\.rmvb$/i.test(obj)
        );
    },
    audio: function audio(obj) {
        return (/\.mp3/i.test(obj)
        );
    },
    archive: function archive(obj) {
        return (/\.rar$|\.zip$|\.7z$|\.gzip$|\.tar$|\.iso$/i.test(obj)
        );
    },
    hasHtml: function hasHtml(obj) {
        return (/<[^>]+>/g.test(obj)
        );
    },
    __getRandomString: function __getRandomString() {
        var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

        var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var str = '';
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            str += charSet.substring(randomPoz, randomPoz + 1);
        }
        return str;
    },
    __getRandomChinese: function __getRandomChinese() {
        var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

        var str = '';
        for (var i = 0; i < len; i++) {
            str += String.fromCodePoint(Math.round(Math.random() * 20901) + 19968);
        }
        return str;
    },
    __firstCheck: function __firstCheck() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        args = args.map(function (val) {
            return Math.abs(val);
        });
        var max = Math.max.apply(Math, _toConsumableArray(args));
        var min = Math.min.apply(Math, _toConsumableArray(args));
        if (!this.isNumeric(min) || args.length > 1 && !this.isNumeric(max)) {
            throw new Error('must use numeric');
        }
        return { max: max, min: min };
    },
    randomString: function randomString() {
        var _firstCheck = this.__firstCheck.apply(this, arguments),
            max = _firstCheck.max,
            min = _firstCheck.min;

        if (arguments.length === 1) {
            return this.__getRandomString(min);
        } else {
            var str = this.__getRandomString(max);
            var num = this.randomRangeNumber(min, max);
            num = max - num;
            return str.slice(num);
        }
    },
    randomRangeNumber: function randomRangeNumber() {
        var _firstCheck2 = this.__firstCheck.apply(this, arguments),
            max = _firstCheck2.max,
            min = _firstCheck2.min;

        var range = max - min + 1;
        return Math.floor(Math.random() * range + min);
    },
    randomNumber: function randomNumber() {
        var _firstCheck3 = this.__firstCheck.apply(this, arguments),
            max = _firstCheck3.max,
            min = _firstCheck3.min;

        if (arguments.length === 1) {
            return Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, min - 1));
        } else {
            return this.randomRangeNumber(Math.pow(10, min - 1), Math.pow(10, max - 1));
        }
    },
    randomNumberic: function randomNumberic() {
        this.randomNumber.apply(this, arguments);
    },
    randomEmail: function randomEmail() {
        var str = this.randomString.apply(this, arguments);
        return str + '@test.com';
    },
    randomUrl: function randomUrl() {
        var isHttps = this.randomNumber(1) < 5 ? 's' : '';
        var str = this.randomString.apply(this, arguments);
        return 'http' + isHttps + '://www.' + str + '.test';
    },
    randomFloat: function randomFloat() {
        var randomNum1 = this.randomNumber.apply(this, arguments);
        var randomNum2 = this.randomNumber(1);
        return Number.parseFloat(randomNum2 + '.' + randomNum1);
    },
    randomIdcard: function randomIdcard() {
        var isX = this.randomNumber(1);
        if (isX) {
            return this.randomNumber(17) + 'X';
        } else {
            var is15 = this.randomNumber(1);
            return '' + (is15 < 5 ? this.randomNumber(15) : this.randomNumber(18));
        }
    },
    randomHtml: function randomHtml() {
        return '<html><body><div>' + this.randomString.apply(this, arguments) + '</div></body></html>';
    },
    randomChinese: function randomChinese() {
        var num = this.randomNumber.apply(this, arguments);
        return this.__getRandomChinese(('' + num).length);
    },
    __firstStrUpCase: function __firstStrUpCase(str) {
        str = str.toLowerCase();
        var reg = /\b(\w)|\s(\w)/g;
        return str.replace(reg, function (m) {
            return m.toUpperCase();
        });
    }
};

var CONSTANT = {
    DEFAULT_MIN_NUM: 1,
    DEFAULT_MAX_NUM: 20,
    TYPE: ['string', 'number', 'numberic', 'email', 'url', 'float', 'idcard', 'html', 'chinese']

};

var defaultOpts = {
    key: '',
    type: CONSTANT.TYPE[0],
    max: CONSTANT.DEFAULT_MAX_NUM,
    min: CONSTANT.DEFAULT_MIN_NUM,
    isFixed: true
};

var CreateTestData = {
    createData: function createData(option) {
        if (util.isEmpty(option)) {
            throw new Error('the options must be object or array');
        }
        var repeat = 0;
        var func = null;
        if ((arguments.length <= 1 ? 0 : arguments.length - 1) >= 1) {
            if (util.isNumeric(arguments.length <= 1 ? undefined : arguments[1])) {
                repeat = arguments.length <= 1 ? undefined : arguments[1];
            }
            if (util.isFunction(arguments.length <= 1 ? undefined : arguments[1])) {
                func = arguments.length <= 1 ? undefined : arguments[1];
            } else if (util.isFunction(arguments.length <= 2 ? undefined : arguments[2])) {
                func = arguments.length <= 2 ? undefined : arguments[2];
            }
        }
        var optType = ['Array', 'Object', 'String', 'Numeric'];
        for (var i = 0; i < optType.length; i++) {
            if (util['is' + optType[i]](option)) {
                return this['useBy' + optType[i]](option, repeat, func);
            }
        }
    },
    modifyConstant: function modifyConstant(option) {
        Object.keys(option).forEach(function (val) {
            CONSTANT[val] = option[val];
        });
        return this;
    },
    packData: function packData(key, value, opt) {
        if (opt) {
            opt[key] = value;
            return opt;
        }
        return { key: key, value: value };
    },
    useByNumeric: function useByNumeric(num, repeat, func) {
        var _this = this;

        func = (func || function () {
            return _this.packData(num, util.randomString(CONSTANT.DEFAULT_MIN_NUM));
        }).bind(this);
        return this.__commonRepeat(func, repeat);
    },
    useByString: function useByString(key, repeat, func) {
        var _this2 = this;

        func = (func || function () {
            return _this2.packData(key, util.randomString(CONSTANT.DEFAULT_MIN_NUM));
        }).bind(this);
        return this.__commonRepeat(func, repeat);
    },
    useByArray: function useByArray(option, repeat, func) {
        var _this3 = this;

        option = option.filter(function (val) {
            return util.isObject(val);
        }).map(function (val) {
            return _this3.__checkOption(val);
        });

        var newOpts = [];
        option.forEach(function (val) {
            newOpts = [].concat(_toConsumableArray(newOpts), _toConsumableArray(val));
        });
        func = (func || this.__commonArrayAndObjectHandle).bind(this);
        return func(newOpts, repeat);
    },
    useByObject: function useByObject(option, repeat, func) {
        option = this.__checkOption(option);

        func = (func || this.__commonArrayAndObjectHandle).bind(this);

        return func(option, repeat);
    },
    __commonRepeat: function __commonRepeat(func, repeat) {
        var result = repeat ? [] : {};
        if (repeat) {
            for (var i = 0; i < repeat; i++) {
                result.push(func({}));
            }
        } else {
            func(result);
        }
        return result;
    },
    __commonArrayAndObjectHandle: function __commonArrayAndObjectHandle(option, repeat) {
        var _this4 = this;

        var func = function func(res) {
            option.forEach(function (val) {
                _this4.__genData(val, res);
            });
            return res;
        };

        return this.__commonRepeat(func, repeat);
    },
    __useDefault2GenOption: function __useDefault2GenOption(option) {
        var opts = {};
        Object.keys(defaultOpts).forEach(function (value) {
            opts[value] = option[value];
        });
        if (!CONSTANT.TYPE.includes(opts.type)) {
            opts.type = CONSTANT.TYPE[0];
        }
        opts.type = util.__firstStrUpCase(opts.type);
        return opts;
    },
    __useKey2GenOption: function __useKey2GenOption(key) {
        var defaultOptions = _extends({}, defaultOpts);
        defaultOptions.key = key;
        defaultOptions.type = util.__firstStrUpCase(defaultOptions.type);
        return defaultOptions;
    },
    __checkOption: function __checkOption(option) {
        var _this5 = this;

        var opt_keys = Object.keys(option);
        var opt_len = opt_keys.length;
        var default_keys = Object.keys(defaultOpts);
        var default_len = default_keys.length;
        var mapHandle = function mapHandle(val) {
            return _this5.__useKey2GenOption(val);
        };

        if (opt_len < default_len) {
            return opt_keys.map(mapHandle);
        } else {
            if (default_keys.filter(function (val) {
                return opt_keys.includes(val);
            }).length === default_len) {
                var newOpts = opt_keys.filter(function (val) {
                    return default_keys !== val;
                }).map(mapHandle);
                return [].concat(_toConsumableArray(newOpts), [this.__useDefault2GenOption(option)]);
            } else {
                return opt_keys.map(mapHandle);
            }
        }
    },
    __genData: function __genData(option, result) {
        var val = null;
        if (option.isFixed) {
            val = util['random' + option.type](option.max);
        } else {
            val = util['random' + option.type](option.min, option.max);
        }
        this.packData(option.key, val, result);
    }
};

exports.CreateTestData = CreateTestData;
exports.util = util;