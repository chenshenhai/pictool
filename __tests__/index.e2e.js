const path = require('path');
const assert = require('assert');
const http = require('http');
const fs = require('fs');
const puppeteer = require('puppeteer');
const serveHandler = require('serve-handler');
const jimp = require('jimp');
const compose = require('koa-compose');
const pixelmatch = require('pixelmatch');
const { exampleModuleList, port, width, height, } = require('./e2e.config');


const screenDir = path.join(__dirname, 'screenshot');


describe('E2E Testing', function() {
  it('testing...', function(done){

    this.timeout(1000 * 60 * 5);

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
            await sleep();
            const buf = await page.screenshot();
            const screenPicPath = path.join(screenDir, `${name}.jpg`);

            const actual = (await jimp.read(buf)).scale(1).quality(100).bitmap;
            const expected = (await jimp.read(fs.readFileSync(screenPicPath))).bitmap;
            const diff = actual;
            const failedPixel = pixelmatch(expected.data, actual.data, diff.data, actual.width, actual.height);
            const failRate = failedPixel / (width * height);
            console.log(`E2E: test [${name}] diff pixel rate: ${failRate}`) ;
            assert.ok(failRate < 0.005);
            await next();
          })
        });
        await compose(tasks)();
        
        await browser.close();
        server.close();
        done();
      } catch (err) {
        server.close();
        done(err);
        console.error(err);
        process.exit(-1);
      }
    });
    server.on('SIGINT', () => process.exit(1) );
  
  });
});


function sleep(time = 100) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}