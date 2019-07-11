const chai = require('chai');
const digit = require('../dist/digit');
const expect = chai.expect

const DigitImageData = digit.DigitImageData;

const img = require('./data/image-data-origin.json');


describe( 'test: Pictool.digit.DigitImageData', ( ) => {

  it('DigitImageData init', ( done ) => {
    const digitImgRs = new DigitImageData({width: img.width, height: img.height});
    const expectImg = img;

    expect(digitImgRs.width).to.deep.equal(expectImg.width);
    expect(digitImgRs.height).to.deep.equal(expectImg.height);
    done()
  });

  it('DigitImageData.setData(..)', ( done ) => {
    const digitImgRs = new DigitImageData({width: img.width, height: img.height});
    digitImgRs.setData(img.data);
    const expectImg = img;

    expectImg.data.forEach(function(num, i) {
      // console.log(`expect index is: ${i}`)
      expect(digitImgRs.data[i]).to.deep.equal(num);
    });

    done()
  });

  it('DigitImageData.pixelAt(..)', ( done ) => {
    const digitImgRs = new DigitImageData({width: img.width, height: img.height});
    digitImgRs.setData(img.data);
    const x = 3;
    const y = 4;
    const i = (y * img.width + x) * 4;
    const pixel = digitImgRs.pixelAt(x, y);
    const expectImg = img;
    
    expect(pixel.r).to.deep.equal(expectImg.data[i]);
    expect(pixel.g).to.deep.equal(expectImg.data[i + 1]);
    expect(pixel.b).to.deep.equal(expectImg.data[i + 2]);
    expect(pixel.a).to.deep.equal(expectImg.data[i + 3]);

    done()
  });

  it('DigitImageData.destory()', ( done ) => {
    const digitImgRs = new DigitImageData({width: img.width, height: img.height});
    digitImgRs.setData(img.data);
    digitImgRs.destory();

    expect(digitImgRs.width).to.deep.equal(null);
    expect(digitImgRs.height).to.deep.equal(null);
    expect(digitImgRs.data).to.deep.equal(null);
    done()
  });

})