const chai = require('chai');
const digit = require('../dist/digit');
const expect = chai.expect
const Effect = digit.Effect;
const DigitImageData = digit.DigitImageData;

const img = require('./data/image-data-origin.json');
const imgEffect = require('./data/image-data-effect.json');


describe( 'test: Pictool.digit.Effect', ( ) => {

  it('Effect.process(..).getDigitImageData()', ( done ) => {

    const digitImg = new DigitImageData({width: img.width, height: img.height});
    digitImg.setData(img.data);
    const expectImg = imgEffect;

    const effect = new Effect(digitImg)
    const digitImgRs = effect.process('sobel', {}).process('invert', {}).getDigitImageData();
    
    expect(digitImgRs.width).to.deep.equal(expectImg.width);
    expect(digitImgRs.height).to.deep.equal(expectImg.height);
    expectImg.data.forEach(function(num, i) {
      // console.log(`expect index is: ${i}`)
      expect(digitImgRs.data[i]).to.deep.equal(num);
    });

    done()
  });

  it('Effect.destory()', ( done ) => {

    const digitImg = new DigitImageData({width: img.width, height: img.height});
    digitImg.setData(img.data);

    const effect = new Effect(digitImg)
    const digitImgRs = effect.process('invert', {}).getDigitImageData();
    digitImgRs.destory();

    expect(digitImgRs.width).to.deep.equal(null);
    expect(digitImgRs.height).to.deep.equal(null);
    expect(digitImgRs.data).to.deep.equal(null);

    done()
  });

})