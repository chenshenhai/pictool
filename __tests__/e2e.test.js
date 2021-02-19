const fs = require('fs');
const path = require('path');
const assert = require('assert');
const jimp = require('jimp');
const pixelmatch = require('pixelmatch');
const { createScreenshotBuffer, width, height } = require('./screenshot');

const snapshotPicPath = path.join(__dirname, 'snapshot', 'page.png');

describe('Screenshot testing', function() {
  it('testing...', function(done){
    this.timeout(1000 * 60);
    createScreenshotBuffer('/index.html').then(async (buf) => {

      const actual = (await jimp.read(buf)).scale(1).quality(100).bitmap;
      const expected = (await jimp.read(fs.readFileSync(snapshotPicPath))).bitmap;
      const diff = actual;
      const failedPixel = pixelmatch(expected.data, actual.data, diff.data, actual.width, actual.height);
      const failRate = failedPixel / (width * height);
      assert.ok(failRate < 0.005);
      done();
    }).catch(done);
  });
});