const chai = require('chai');
const digit = require('../dist/digit');
const expect = chai.expect
const algorithm = digit.algorithm;
const DigitImageData = digit.DigitImageData;

const img = require('./data/image-data-origin.json');
const imgGrayscale = require('./data/image-data-grayscrale.json');
const imgInvert = require('./data/image-data-invert.json');

describe( 'test: Pictool.digit.algorithm', ( ) => {

  it('algorithm.grayscale', ( done ) => {

    const digitImg = new DigitImageData({width: img.width, height: img.height});
    digitImg.setData(img.data);
    const digitImgRs = algorithm.grayscale(digitImg);
    
    expect(digitImgRs.width).to.deep.equal(imgGrayscale.width);
    expect(digitImgRs.height).to.deep.equal(imgGrayscale.height);
    imgGrayscale.data.forEach(function(num, i) {
      expect(digitImgRs.data[i]).to.deep.equal(num);
    });

    done()
  });

  it('algorithm.invert', ( done ) => {

    const digitImg = new DigitImageData({width: img.width, height: img.height});
    digitImg.setData(img.data);
    const digitImgRs = algorithm.invert(digitImg);
    
    expect(digitImgRs.width).to.deep.equal(imgInvert.width);
    expect(digitImgRs.height).to.deep.equal(imgInvert.height);
    imgInvert.data.forEach(function(num, i) {
      // console.log(`expect index is: ${i}`)
      expect(digitImgRs.data[i]).to.deep.equal(num);
    });

    done()
  });

})