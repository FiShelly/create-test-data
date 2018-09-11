# create-test-data

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

## Features

- A lib for create test data which you can use in javascript.

## Installation

```sh
$ npm install create-test-data
```

## before use

the default config like this:
```
const defaultOpts = {
*    key: '', // the object key, and create data will use it as key.
*    type: CONSTANT.TYPE[0], //data type, you can set it as one of ['string', 'number', 'numberic', 'email', 'url', 'float', 'idcard', 'html', 'chinese'].
*    max: CONSTANT.DEFAULT_MAX_NUM, // the value max length.
*    min: CONSTANT.DEFAULT_MIN_NUM, // the value min length.
    isFixed: true // if you set it true, the value is random in min to max. if false, the value will fixed.
};
```

## how to use

ex1. use object as args and default config.(create data is all about string)

```JavaScript
import { CreateTestData } from 'create-test-data';

const tplData = {aaa: 1, bbb: 2, ccc: 3}

const data = CreateTestData.createData(tplData);

//output:

{ aaa: '9rrRoAj1xN1RhEpK4ipZ',
  bbb: 'zNJpFoAJWkwxiRxz3b6P',
  ccc: 'nMs3e21YqrUpgeOc85e3' }

```

e2. use array as args and default config.(create data is all about string)

If you use array as args and the array element is not reach the specifications for the config, you will get the object will meger all element.

```JavaScript
import { CreateTestData } from 'create-test-data';

const tplData = [{aaa: 1, bbb: 2, ccc: 3}, {qqq: 1, www: 2, eee: 3}]

const data = CreateTestData.createData(tplData);

//output:

{ aaa: 'eDLqRy3DwQYN1xJmqHAU',
  bbb: 'F4Dfu0AwM69odpuJFi8r',
  ccc: 't3rMe1EibyHSV8fMSxrA',
  qqq: '2D7hMbrl1maPyhksv7Di',
  www: 'fED83pQODvOtk2Ln3Nsg',
  eee: 'XPnts5D429OtsOehafNL' }

```

ex3. use config options.

```JavaScript
import { CreateTestData } from 'create-test-data';

const data1 = CreateTestData.createData(
    {key: 'aaa', type: 'number', max: 10, min: 1}
);

const data2 = CreateTestData.createData(
    [{key: 'aaa', type: 'number', max: 10, min: 1}, {key: '',type:'string',max: 10, min: 2}]
);
// or

const data2 = CreateTestData.createData(
    [
        {key: 'aaa', type: 'number', max: 10, min: 1},
        {key: 'bbb', type: 'string', max: 10, min: 2},
        {key: 'ccc', type: 'string', max: 10, min: 2}
    ]
);

//or

const data3 = CreateTestData.createData(
    [
        {key: 'aaa', type: 'number', max: 10, min: 1},
        {key: 'bbb', type: 'string', max: 10, min: 2},
        {key: 'ccc', type: 'string', max: 10, min: 2},
        {ddd:2,fff:3,eee:4}
    ]
);

//out put
data1: 
    { 
        aaa: 979332569 
    }

data2: 
    {   aaa: 914083701, 
        bbb: 'EysBiTp1J', 
        ccc: 'LGCl73iYM' 
    }

ddd3: 
    { 
        aaa: 874249513,
        bbb: 'T5Rnb7SI91',
        ccc: 'U75Uc62',
        ddd: '7JOpIdz3Jsx85aKSKx7a',
        fff: 'Y5ffgIf10n5HevHRLu6Z',
        eee: 'GU2Nq8xILIkwcqMSEn0G' 
        
    }
```
## The last.
 If you have any question, you can submit issuse for me.
 
## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/create-test-data.svg
[npm-url]: https://npmjs.org/package/create-test-data
[downloads-image]: https://img.shields.io/npm/dm/create-test-data.svg
[downloads-url]: https://npmjs.org/package/create-test-data



