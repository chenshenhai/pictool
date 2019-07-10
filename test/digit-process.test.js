const chai = require('chai');
const digit = require('../dist/digit');
const expect = chai.expect
const process = digit.process;
const DigitImageData = digit.DigitImageData;

const img = require('./data/image-data-origin.json');
const imgGrayscale = require('./data/image-data-grayscrale.json');
const imgInvert = require('./data/image-data-invert.json');
const imgSobel = require('./data/image-data-sobel.json');
const imgHueVal180 =  require('./data/image-data-hue.val.180.json');
const imgHuePer75 =  require('./data/image-data-hue.per.75.json');
const imgSaturationVal50 = require('./data/image-data-saturation.val.50.json');
const imgSaturationPer60 = require('./data/image-data-saturation.per.60.json');


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


  it('process.hue({value: 180})', ( done ) => {
    const digitImg = new DigitImageData({width: img.width, height: img.height});
    digitImg.setData(img.data);
    const digitImgRs = process.hue(digitImg, {value: 180});
    const expectImg = imgHueVal180;
    
    expect(digitImgRs.width).to.deep.equal(expectImg.width);
    expect(digitImgRs.height).to.deep.equal(expectImg.height);
    expectImg.data.forEach(function(num, i) {
      // console.log(`expect index is: ${i}`)
      expect(digitImgRs.data[i]).to.deep.equal(num);
    });
    done()
  });

  it('process.hue({percent: 75})', ( done ) => {
    const digitImg = new DigitImageData({width: img.width, height: img.height});
    digitImg.setData(img.data);
    const digitImgRs = process.hue(digitImg, {percent: 75});
    const expectImg = imgHuePer75;
    
    expect(digitImgRs.width).to.deep.equal(expectImg.width);
    expect(digitImgRs.height).to.deep.equal(expectImg.height);
    expectImg.data.forEach(function(num, i) {
      // console.log(`expect index is: ${i}`)
      expect(digitImgRs.data[i]).to.deep.equal(num);
    });
    done()
  });

  it('process.saturation({value: 50})', ( done ) => {
    const digitImg = new DigitImageData({width: img.width, height: img.height});
    digitImg.setData(img.data);
    const digitImgRs = process.saturation(digitImg, {value: 50});
    const expectImg = imgSaturationVal50;
    
    expect(digitImgRs.width).to.deep.equal(expectImg.width);
    expect(digitImgRs.height).to.deep.equal(expectImg.height);
    expectImg.data.forEach(function(num, i) {
      // console.log(`expect index is: ${i}`)
      expect(digitImgRs.data[i]).to.deep.equal(num);
    });
    done()
  });

  it('process.saturation({percent: -60})', ( done ) => {
    const digitImg = new DigitImageData({width: img.width, height: img.height});
    digitImg.setData(img.data);
    const digitImgRs = process.saturation(digitImg, {percent: -60});
    const expectImg = imgSaturationPer60;
    
    expect(digitImgRs.width).to.deep.equal(expectImg.width);
    expect(digitImgRs.height).to.deep.equal(expectImg.height);
    expectImg.data.forEach(function(num, i) {
      // console.log(`expect index is: ${i}`)
      expect(digitImgRs.data[i]).to.deep.equal(num);
    });
    done()
  });

})