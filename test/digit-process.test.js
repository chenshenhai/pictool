const chai = require('chai');
const digit = require('../dist/digit');
const expect = chai.expect
const process = digit.process;
const DigitImageData = digit.DigitImageData;

const img = require('./data/image-data-origin.json');
const imgGrayscale = require('./data/image-data-grayscrale.json');
const imgInvert = require('./data/image-data-invert.json');
const imgSobel = require('./data/image-data-sobel.json');

describe( 'test: Pictool.digit.process', ( ) => {

  it('process.grayscale', ( done ) => {

    const digitImg = new DigitImageData({width: img.width, height: img.height});
    digitImg.setData(img.data);
    const digitImgRs = process.grayscale(digitImg);
    const expectImg = imgGrayscale;
    
    expect(digitImgRs.width).to.deep.equal(expectImg.width);
    expect(digitImgRs.height).to.deep.equal(expectImg.height);
    expectImg.data.forEach(function(num, i) {
      // console.log(`expect index is: ${i}`)
      expect(digitImgRs.data[i]).to.deep.equal(num);
    });

    done()
  });


  it('process.invert', ( done ) => {

    const digitImg = new DigitImageData({width: img.width, height: img.height});
    digitImg.setData(img.data);
    const digitImgRs = process.invert(digitImg);
    const expectImg = imgInvert;
    
    expect(digitImgRs.width).to.deep.equal(expectImg.width);
    expect(digitImgRs.height).to.deep.equal(expectImg.height);
    expectImg.data.forEach(function(num, i) {
      // console.log(`expect index is: ${i}`)
      expect(digitImgRs.data[i]).to.deep.equal(num);
    });

    done()
  });

  it('process.sobel', ( done ) => {

    const digitImg = new DigitImageData({width: img.width, height: img.height});
    digitImg.setData(img.data);
    const digitImgRs = process.sobel(digitImg);
    const expectImg = imgSobel;
    
    expect(digitImgRs.width).to.deep.equal(expectImg.width);
    expect(digitImgRs.height).to.deep.equal(expectImg.height);
    expectImg.data.forEach(function(num, i) {
      // console.log(`expect index is: ${i}`)
      expect(digitImgRs.data[i]).to.deep.equal(num);
    });

    done()
  });

})