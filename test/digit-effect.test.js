const chai = require('chai');
const digit = require('../dist/digit');
const expect = chai.expect
const Effect = digit.Effect;
const DigitImageData = digit.DigitImageData;

const img = require('./data/image-data-origin.json');
const imgEffect = require('./data/image-data-effect.json');


describe( 'test: Pictool.digit.Effect', ( ) => {

  it('Effect.process(..).getDigitImageData()', ( done ) => {

    const digitImg = new DigitImageData({width: img.width, height: img.height, data: img.data});
    const expectImg = imgEffect;

    const effect = new Effect(digitImg)
    const digitImgRs = effect.process('sobel', {}).process('invert', {}).getDigitImageData();
    
    expect(digitImgRs.getWidth()).to.deep.equal(expectImg.width);
    expect(digitImgRs.getHeight()).to.deep.equal(expectImg.height);
    const rsData = digitImgRs.getData();
    expectImg.data.forEach(function(num, i) {
      // console.log(`expect index is: ${i}`)
      expect(rsData[i]).to.deep.equal(num);
    });

    done()
  });

  it('Effect.destory()', ( done ) => {

    const digitImg = new DigitImageData({width: img.width, height: img.height, data: img.data});

    const effect = new Effect(digitImg)
    const digitImgRs = effect.process('invert', {}).getDigitImageData();
    effect.destory();

    expect(digitImgRs.getWidth()).to.deep.equal(0);
    expect(digitImgRs.getHeight()).to.deep.equal(0);
    expect(digitImgRs.getData()).to.deep.equal(new Uint8ClampedArray(0));

    done()
  });

})