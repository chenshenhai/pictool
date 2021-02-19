const path = require('path');
const http = require('http');
const fs = require('fs');
const puppeteer = require('puppeteer');
const serveHandler = require('serve-handler');
const jimp = require('jimp');
const compose = require('koa-compose');
const { exampleModuleList, port, width, height, } = require('./e2e.config');
const screenDir = path.join(__dirname, 'screenshot');

main();

async function main() {

  const server = http.createServer((req, res) => serveHandler(req, res, {
    public: path.join(__dirname, '..'),
  }));
  server.listen(port, async () => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setViewport( { width: width, height: height } );

      const tasks = [];
      exampleModuleList.forEach((mod) => {
        const name = mod.replace(/.html$/, '');
        const pagePath = `/example/module/${mod}`;
        tasks.push(async (ctx, next) => {
          await page.goto(`http://127.0.0.1:${port}${pagePath}`);
          await sleep(1000);
          const buf = await page.screenshot();
          const screenPicPath = path.join(screenDir, `${name}.jpg`);
          (await jimp.read(buf)).scale(1).quality(100).write(screenPicPath);
          console.log(`create screenshot [${name}] scuccess.`) ;
          await next();
        })
      });
      await compose(tasks)();
      
      await browser.close();
      server.close();
    } catch (err) {
      server.close();
      console.error(err);
      process.exit(-1);
    }
  });
  server.on('SIGINT', () => process.exit(1) );
}


function sleep(time = 100) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}