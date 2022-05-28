# urlParams

Class that made for easy work with URL searchparams

## Table of Contents
  - [Browser Support](#browser-support)
  - [Installing](#installing)
  - [Example](#example)
  - [API](#api)
    - [set](#setname-value-savestate)
    - [append](#appendname-value-savestate)
    - [get](#getname)
    - [getAll](#getallname)
    - [getAllParams](#getallparams)
    - [delete](#deletename-savestate)
  - [Vue(2.x) mixin](#vue2x-mixin)

<!-- 
## Features
  - **vue-mixin.js** for Vue that reactively updates
  values in url -->

## browser-support
![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
49 | 44 | 14 | 36 | 17 |

## installing

Using npm:

```bash
$ npm install @trosk/url-params
```

## example

Using with custom URL
```javascript
import { URLParams } from 'url-params'
const urlParams = new URLParams('https://github.com')
console.log(
  urlParams
    .set('hello', 'world')
    .get('hello')
)
```

Using with default(window.location.href) URL
```javascript
import { urlParams } from 'url-params'
console.log(
  urlParams
    .set('hello', 'world')
    .get('hello')
)
```

## API

saveSate - using [window.history.pushState](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) instead of [window.history.replaceState](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState)

### set(name, value[, saveState])
```javascript
urlParams.set('hello', 'world') // https://github.com?hello=world
urlParams.set('hello', 'world', true) // https://github.com?hello=there
```

### append(name, value[, saveState])
```javascript
urlParams.append('hello', 'world') // https://github.com?hello=world
urlParams.append('hello', 'there', true) // https://github.com?hello=world&hello=there
```

### get(name)
```javascript
const urlParams = new URLParams('https://github.com?hello=world')
urlParams.get('hello') // "world"
urlParams.get('hi') // null
```

### getAll(name)
```javascript
const urlParams = new URLParams('https://github.com?hello=world&hello=there')
urlParams.getAll('hello') // ["world", "there"]
urlParams.getAll('hi') // []
```

### getAllParams()
```javascript
const urlParams = new URLParams('https://github.com?hello=world&hello=there&test=123')
urlParams.getAllParams() // [["hello", "world"], ["hello", "there"], ["test", "123"]]
```

### delete(name[, saveState])
```javascript
const urlParams = new URLParams('https://github.com?hello=world&hi=123')
urlParams.delete('hello') // https://github.com?hi=123
urlParams.delete('hi') // https://github.com
```

## Vue(2.x) mixin
```javascript
import urlParamsMixin from 'url-params/vue-mixin'

new Vue({
  mixins: [urlParamsMixin],

  urlMixinConfig: ['page', 'pageSize'],

  data() {
    return {
      page: 1,
      pageSize: 40
    }
  },

  methods: {
    onChangePageSize(pageSize) {
      this.pageSize = pageSize // url will be updated too
    }
  }
})
```
