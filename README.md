# Pictool

## A front-end image processing gadget

[![Build Status](https://travis-ci.com/chenshenhai/pictool.svg?branch=master)](https://travis-ci.com/chenshenhai/pictool)
[![npm-version](https://img.shields.io/npm/l/pictool.svg)](./LICENSE)
[![](https://img.shields.io/npm/v/pictool.svg)](https://www.npmjs.com/package/pictool)

![pictool-logo](https://user-images.githubusercontent.com/8216630/61581603-28ffd180-ab53-11e9-9461-a24d31643ec7.png)

## Installation

### Prerequisites

- Operating System: Windows，macOS，Linux
- Node.js Runtime: `12.3+`


### NPM Usage

```sh
npm i --save pictool
```


```js
import Pictool from 'pictool';
```

or

```js
import PictoolBrowser from 'pictool/dist/browser';
import PictoolUI from 'pictool/dist/ui';
import PictoolDigit from 'pictool/dist/digit';
```

### CDN Usage


```html
<script src="https://unpkg.com/pictool/dist/index.js"></script>
```

or

```html
<script src="https://unpkg.com/pictool/dist/browser.js"></script>
<script src="https://unpkg.com/pictool/dist/digit.js"></script>
<script src="https://unpkg.com/pictool/dist/ui.js"></script>
```


## Getting started

### JavaScript Code

```js
import Pictool from 'pictool';

const src = './image/test.jpg';
const Sandbox = Pictool.browser.Sandbox;
const sandbox = new Sandbox(src);
const dom = document.querySelector('#J_Example_01');

sandbox.queueProcess([
  {
    process: 'sobel',
    options: {},
  },
  {
    process: 'invert',
    options: {},
  }
]).then(function(base64) {
  dom.innerHTML = `<img src="${base64}" />`;
}).catch(function(err) {
  console.log(err);
});
```

### HTML Code

```html
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <style>
      .box {float: left; margin-right: 10px;}
      img { max-height: 200px; min-width: 100px;}
    </style>
  </head>
  <body>
    <div class="box">
      <img src="./image/test.jpg" />
    </div>

    <div class="box" id="J_Example_01">
      <img />
    </div>
    <script src="./index.js"></script>
  </body>
</html>
```

### Browser Result


![001](https://user-images.githubusercontent.com/8216630/61582779-bb0ed680-ab61-11e9-8830-01fbf59edb94.jpg)



## Features

- ✔︎ Brightness
- ✔︎ Hue
- ✔︎ Saturation
- ✔︎ Alpha
- ✔︎ Invert
- ✔︎ Grayscale
- ✔︎ Sobel
- ✔︎ Sepia


## Documentation

- [中文文档](https://chenshenhai.github.io/pictool-doc/)
- [English Documents](https://chenshenhai.github.io/pictool-doc/page/en-US/) //TODO

## Testing

```sh
npm run test
```

## License

[MIT](./LICENSE)