const chai = require('chai');
const digit = require('../dist/digit');
const expect = chai.expect
const algorithm = digit.algorithm;
const DigitImageData = digit.DigitImageData;

const img = require('./data/image-data-origin.json');
const imgGrayscale = require('./data/image-data-grayscrale.json');

describe( 'test: Pictool.digit.algorithm', ( ) => {

  it('algorithm.grayscale', ( done ) => {

    const digitImg = new DigitImageData({width: img.width, height: img.height});
    digitImg.setData(img.data);
    const digitImgGrayscale = algorithm.grayscale(digitImg);
    
    expect(digitImgGrayscale.width).to.deep.equal(imgGrayscale.width);
    expect(digitImgGrayscale.height).to.deep.equal(imgGrayscale.height);
    imgGrayscale.data.forEach(function(num, i) {
      // console.log(`expect index is: ${i}`)
      expect(digitImgGrayscale.data[i]).to.deep.equal(num);
    });

    done()
  });

})