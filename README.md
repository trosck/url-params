# url-params

Makes your work with search params in URL easy.

Instead of:
```js
const url = new URL(window.location.href)
url.searchParams.set("hello", "world")
url.searchParams.set("test", "123")
window.location.href = url.toString()
```
you can do this:
```js
urlParams
  .set("hello", "world")
  .set("test", "123")
```
or even this:
```js
urlParams.setAll({
  hello: "world",
  test: 123
})
```

[![ci](https://github.com/trosck/url-params/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/trosck/url-params/actions/workflows/ci.yml)
[![npm publish](https://github.com/trosck/url-params/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/trosck/url-params/actions/workflows/npm-publish.yml)
[![](https://img.shields.io/github/last-commit/trosck/url-params/main)](https://github.com/trosck/url-params/commits/main)

[![](https://img.shields.io/npm/v/@trosckey/url-params.svg?logo=npm)](https://www.npmjs.com/package/@trosckey/url-params)
![](https://img.shields.io/github/languages/code-size/trosck/url-params)
![](https://img.shields.io/npm/dt/@trosckey/url-params)
[![](https://img.shields.io/npm/l/@trosckey/url-params)](https://github.com/trosck/url-params/blob/main/LICENSE.md)

## Table of Contents
  - [Browser Support](#browser-support)
  - [Installing](#installing)
  - [Usage](#usage)
    - [Creating an instance](#creating-an-instance)
    - [Using urlParams function](#using-urlparams-function)
    - [Using urlParams proxy](#using-urlparams-proxy)
    - [Import minified version](#import-minified-version)
  - [API](#api)
    - [set](#setname-value-savestate)
    - [setAll](#setallproperties-savestate)
    - [append](#appendname-value-savestate)
    - [get](#getname)
    - [getAll](#getallname)
    - [getAllParams](#getallparams)
    - [delete](#deletename-savestate)
    - [toString](#tostring)
  - [License](#license)

<!-- 
## Features
  - **vue-mixin.js** for Vue that reactively updates
  values in url -->

## Browser support
![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png) |
--- | --- | --- | --- | --- |
49 | 44 | 14 | 36 | 17 |

## Installing

Using npm:

```bash
npm install @trosckey/url-params
```

Using yarn:

```bash
yarn add @trosckey/url-params
```


## Usage

Methods **delete**, **set** and **append** returns *this* for   
call chain. To get URL string you can use instance   
property **url** or **toString()**.

If first argument is not defined, *window.location.href* will be used.

```javascript
urlParams('https://github.com')
  .set('hello', 'world')
  .append('hello', 'web')
  .url // https://github.com?hello=world&hello=web
```

### Creating an instance

```javascript
import { URLParams } from '@trosckey/url-params'

new URLParams('https://github.com')
  .set('hello', 'world')
  .get('hello') // "world"
```

### Using urlParams function

```javascript
import { urlParams } from '@trosckey/url-params'

urlParams('https://github.com')
  .set('hello', 'world')
  .get('hello') // "world"
```

### Using urlParams Proxy

creates instance on every call,
uses window.location.href

```javascript
import { urlParams } from '@trosckey/url-params'

// window.location.href = 'https://github.com'

urlParams
  .set('hello', 'world')
  .get('hello') // "world"
```

### Import minified version

```javascript
import {
  URLParams,
  urlParams
} from '@trosckey/url-params/dist/index.min.js'

// ...

new URLParams().url

// ...

urlParams().url

// ...

urlParams.url
```

## API

saveSate(default false) - using [window.history.pushState](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)   
instead of [window.history.replaceState](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState)

replaces window.location.href if none   
of methods above is not available   

### url

Returns url string

### set(name, value[, saveState])

Sets value with the given key

```javascript
urlParams('https://github.com')
  .set('hello', 'world')
  .set('hi', 'web')
  .url // https://github.com?hello=world&hi=web
```

### setAll(properties[, saveState])

Sets many values from object

```javascript
urlParams('https://github.com')
  .setAll({
    hello: "world",
    hi: "web",
  })
  .url // https://github.com?hello=world&hi=web
```

### append(name, value[, saveState])

Appends value with the given key

```javascript
urlParams('https://github.com')
  .append('hello', 'world')
  .append('hello', 'there', true)
  .url // https://github.com?hello=world&hello=there
```

### get(name)

Returns first searched item from left, otherwise null

```javascript
urlParams('https://github.com?hello=world&hello=there')
  .get('hello') // "world"

urlParams('https://github.com')
  .get('hi') // null
```

### getAll(name)

Returns all values of query param in array

```javascript
urlParams('https://github.com?hello=world&hello=there')
  .getAll('hello') // ["world", "there"]

urlParams('https://github.com')
  .getAll('hello') // []
```

### getAllParams()

Returns all query params in two-dimensional array

```javascript
urlParams('https://github.com?hello=world&hello=there&test=123')
  .getAllParams() // [["hello", "world"], ["hello", "there"], ["test", "123"]]
```

### delete(name[, saveState])

Deleting query param from url

```javascript
urlParams('https://github.com?hello=world')
  .delete('hello')
  .url // https://github.com
```

### toString()

Returns url string, can be used for [auto cast to string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#description)

## License

[MIT](LICENSE.md)
