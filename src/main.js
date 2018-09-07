const util = {
    deepClone (obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    isEmpty (obj) {
        if (Array.isArray(obj)) {
            return !obj.length;
        } else if (typeof obj === 'object') {
            return !obj;
        } else if (obj === undefined) {
            return true;
        } else if (typeof obj === 'string' && !obj.length) {
            return true;
        }
        return false;
    },
    isArray (obj) {
        return Array.isArray(obj);
    },
    isObject (obj) {
        return !this.isEmpty(obj) && typeof obj === 'object';
    },
    isString (obj) {
        return typeof obj === 'string';
    },
    isNumeric (obj) {
        return !isNaN(parseFloat(obj)) && isFinite(obj);
    },
    isFunction (obj) {
        return !this.isEmpty(obj) && typeof obj === 'function';
    },
    numberic (obj) {
        return this.isNumeric(obj);
    },
    email (obj) {
        return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(obj);
    },
    chinese (obj) {
        return /^[\u4e00-\u9fa5]{0,}$/.test(obj);
    },
    english (obj) {
        return /^[a-zA-Z]+$/.test(obj);
    },
    url (obj) {
        return /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/.test(obj);
    },
    idcard (obj) {
        return /(^\d{15}$)|(^\d{17}(x|X|\d)$)/.test(obj);
    },
    mobile (obj) {
        return /^1(3|4|5|7|8)[0-9]\d{8}$/.test(obj);
    },
    document (obj) {
        return /\.doc(x?)$|\.xls(x?)$|\.ppt(x?)$|\.wps$|\.pdf$|\.txt$/i.test(obj);
    },
    image (obj) {
        return /\.png|\.jpg$|\.jpeg$|\.bmp$|\.gif$/i.test(obj);
    },
    video (obj) {
        return /\.wmv$|\.avi$|\.mkv$|\.mp4$|\.rmvb$/i.test(obj);
    },
    audio (obj) {
        return /\.mp3/i.test(obj);
    },
    archive (obj) {
        return /\.rar$|\.zip$|\.7z$|\.gzip$|\.tar$|\.iso$/i.test(obj);
    },
    hasHtml (obj) {
        return /<[^>]+>/g.test(obj);
    },
    __getRandomString (len = 10) {
        const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let str = '';
        for (let i = 0; i < len; i++) {
            const randomPoz = Math.floor(Math.random() * charSet.length);
            str += charSet.substring(randomPoz, randomPoz + 1);
        }
        return str;
    },
    __getRandomChinese (len = 10) {
        let str = '';
        for (let i = 0; i < len; i++) {
            str += String.fromCodePoint(Math.round(Math.random() * 20901) + 19968);
        }
        return str;
    },
    __firstCheck (...args) {
        args = args.map((val) => Math.abs(val));
        let max = Math.max(...args);
        let min = Math.min(...args);
        if (!this.isNumeric(min) || (args.length > 1 && !this.isNumeric(max))) {
            throw new Error('must use numeric');
        }
        return {max, min};
    },
    randomString (...args) {
        let {max, min} = this.__firstCheck(...args);
        if (args.length === 1) {
            return this.__getRandomString(min);
        } else {
            const str = this.__getRandomString(max);
            let num = this.randomRangeNumber(min, max);
            num = max - num;
            return str.slice(num);
        }
    },
    randomRangeNumber (...args) {
        let {max, min} = this.__firstCheck(...args);
        const range = max - min + 1;
        return Math.floor(Math.random() * range + min);
    },
    randomNumber (...args) {
        let {max, min} = this.__firstCheck(...args);
        if (args.length === 1) {
            return Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, min - 1));
        } else {
            return this.randomRangeNumber(Math.pow(10, min - 1), Math.pow(10, max - 1));
        }
    },
    randomNumberic (...args) {
        this.randomNumber(...args);
    },
    randomEmail (...args) {
        const str = this.randomString(...args);
        return `${str}@test.com`;
    },
    randomUrl (...args) {
        const isHttps = this.randomNumber(1) < 5 ? 's' : '';
        const str = this.randomString(...args);
        return `http${isHttps}://www.${str}.test`;
    },
    randomFloat (...args) {
        const randomNum1 = this.randomNumber(...args);
        const randomNum2 = this.randomNumber(1);
        return Number.parseFloat(`${randomNum2}.${randomNum1}`);
    },
    randomIdcard (...args) {
        const isX = this.randomNumber(1);
        if (isX) {
            return `${this.randomNumber(17)}X`;
        } else {
            const is15 = this.randomNumber(1);
            return `${is15 < 5 ? this.randomNumber(15) : this.randomNumber(18)}`;
        }
    },
    randomHtml (...args) {
        return `<html><body><div>${this.randomString(...args)}</div></body></html>`;
    },
    randomChinese (...args) {
        const num = this.randomNumber(...args);
        return this.__getRandomChinese(`${num}`.length);
    },
    __firstStrUpCase (str) {
        str = str.toLowerCase();
        const reg = /\b(\w)|\s(\w)/g;
        return str.replace(reg, (m) => m.toUpperCase());
    }
};

const CONSTANT = {
    DEFAULT_MIN_NUM: 1,
    DEFAULT_MAX_NUM: 20,
    TYPE: ['string', 'number', 'numberic', 'email', 'url', 'float', 'idcard', 'html', 'chinese']

};

const defaultOpts = {
    key: '',
    type: CONSTANT.TYPE[0],
    max: CONSTANT.DEFAULT_MAX_NUM,
    min: CONSTANT.DEFAULT_MIN_NUM,
    isFixed: true
};

const CreateTestData = {
    createData (option, ...args) {
        if (util.isEmpty(option)) {
            throw new Error('the options must be object or array');
        }
        let repeat = 0;
        let func = null;
        if (args.length >= 1) {
            if (util.isNumeric(args[0])) {
                repeat = args[0];
            }
            if (util.isFunction(args[0])) {
                func = args[0];
            } else if (util.isFunction(args[1])) {
                func = args[1];
            }
        }
        const optType = ['Array', 'Object', 'String', 'Numeric'];
        for (let i = 0; i < optType.length; i++) {
            if (util[`is${optType[i]}`](option)) {
                return this[`useBy${optType[i]}`](option, repeat, func);
            }
        }

    },

    modifyConstant (option) {
        Object.keys(option).forEach(val => {
            CONSTANT[val] = option[val];
        });
        return this;
    },

    packData (key, value, opt) {
        if (opt) {
            opt[key] = value;
            return opt;
        }
        return {key, value};
    },

    useByNumeric (num, repeat, func) {
        func = (func || (() => this.packData(num, util.randomString(CONSTANT.DEFAULT_MIN_NUM)))).bind(this);
        return this.__commonRepeat(func, repeat);
    },

    useByString (key, repeat, func) {
        func = (func || (() => this.packData(key, util.randomString(CONSTANT.DEFAULT_MIN_NUM)))).bind(this);
        return this.__commonRepeat(func, repeat);
    },

    useByArray (option, repeat, func) {
        option = option.filter(val => util.isObject(val)).map(val => this.__checkOption(val));

        let newOpts = [];
        option.forEach(val => {
            newOpts = [...newOpts, ...val];
        });
        func = (func || this.__commonArrayAndObjectHandle).bind(this);
        return func(newOpts, repeat);
    },

    useByObject (option, repeat, func) {
        option = this.__checkOption(option);

        func = (func || this.__commonArrayAndObjectHandle).bind(this);

        return func(option, repeat);
    },

    __commonRepeat (func, repeat) {
        const result = repeat ? [] : {};
        if (repeat) {
            for (let i = 0; i < repeat; i++) {
                result.push(func({}));
            }
        } else {
            func(result);
        }
        return result;
    },

    __commonArrayAndObjectHandle (option, repeat) {
        const func = (res) => {
            option.forEach(val => {
                this.__genData(val, res);
            });
            return res;
        };

        return this.__commonRepeat(func, repeat);
    },

    __useDefault2GenOption (option) {
        const opts = {};
        Object.keys(defaultOpts).forEach(value => {
            opts[value] = option[value];
        });
        if (!CONSTANT.TYPE.includes(opts.type)) {
            opts.type = CONSTANT.TYPE[0];
        }
        opts.type = util.__firstStrUpCase(opts.type);
        return opts;
    },

    __useKey2GenOption (key) {
        const defaultOptions = {...defaultOpts};
        defaultOptions.key = key;
        defaultOptions.type = util.__firstStrUpCase(defaultOptions.type);
        return defaultOptions;
    },

    __checkOption (option) {
        const opt_keys = Object.keys(option);
        const opt_len = opt_keys.length;
        const default_keys = Object.keys(defaultOpts);
        const default_len = default_keys.length;
        const mapHandle = val => this.__useKey2GenOption(val);

        if (opt_len < default_len) {
            return opt_keys.map(mapHandle);
        } else {
            if (default_keys.filter(val => opt_keys.includes(val)).length === default_len) {
                const newOpts = opt_keys.filter(val => default_keys !== val).map(mapHandle);
                return [...newOpts, this.__useDefault2GenOption(option)];
            } else {
                return opt_keys.map(mapHandle);
            }
        }
    },
    __genData (option, result) {
        let val = null;
        if (option.isFixed) {
            val = util[`random${option.type}`](option.max);
        } else {
            val = util[`random${option.type}`](option.min, option.max);
        }
        this.packData(option.key, val, result);
    }
};

export { CreateTestData, util };