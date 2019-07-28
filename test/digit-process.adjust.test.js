const chai = require('chai');
const digit = require('../dist/digit');
const expect = chai.expect
const process = digit.process;
const DigitImageData = digit.DigitImageData;

const img = require('./data/image-data-origin.json');
const imgHueVal180 =  require('./data/image-data-hue.val.180.json');
const imgHuePer75 =  require('./data/image-data-hue.per.75.json');
const imgSaturationVal50 = require('./data/image-data-saturation.val.50.json');
const imgSaturationPer60 = require('./data/image-data-saturation.per.60.json');
const imgLightnessVal70 = require('./data/image-data-lightness.val.70.json')
const imgLightnessPer60 = require('./data/image-data-lightness.per.60.json')
const imgAlphaPer80 = require('./data/image-data-alpha.per.80.json')
const imgPosterizeVal10 = require('./data/image-data-posterize.val.10.json');

describe( 'test: Pictool.digit.process', ( ) => {

  it('process.hue({value: 180})', ( done ) => {
    const digitImg = new DigitImageData({width: img.width, height: img.height, data: img.data});
    const digitImgRs = process.hue(digitImg, {value: 180});
    const expectImg = imgHueVal180;
    
    expect(digitImgRs.getWidth()).to.deep.equal(expectImg.width);
    expect(digitImgRs.getHeight()).to.deep.equal(expectImg.height);
    
    const rsData = digitImgRs.getData();
    expectImg.data.forEach(function(num, i) {
      // console.log(`expect index is: ${i}`)
      expect(rsData[i]).to.deep.equal(num);
    });

    done()
  });

  it('process.hue({percent: 75})', ( done ) => {
    const digitImg = new DigitImageData({width: img.width, height: img.height, data: img.data});
    const digitImgRs = process.hue(digitImg, {percent: 75});
    const expectImg = imgHuePer75;
    
    expect(digitImgRs.getWidth()).to.deep.equal(expectImg.width);
    expect(digitImgRs.getHeight()).to.deep.equal(expectImg.height);
    
    const rsData = digitImgRs.getData();

    expectImg.data.forEach(function(num, i) {
      // console.log(`expect index is: ${i}`)
      expect(rsData[i]).to.deep.equal(num);
    });

    done()
  });

  it('process.saturation({value: 50})', ( done ) => {
    const digitImg = new DigitImageData({width: img.width, height: img.height, data: img.data});
    const digitImgRs = process.saturation(digitImg, {value: 50});
    const expectImg = imgSaturationVal50;
    
    expect(digitImgRs.getWidth()).to.deep.equal(expectImg.width);
    expect(digitImgRs.getHeight()).to.deep.equal(expectImg.height);
    
    const rsData = digitImgRs.getData();
    expectImg.data.forEach(function(num, i) {
      // console.log(`expect index is: ${i}`)
      expect(rsData[i]).to.deep.equal(num);
    });

    done()
  });

  it('process.saturation({percent: -60})', ( done ) => {
    const digitImg = new DigitImageData({width: img.width, height: img.height, data: img.data});
    const digitImgRs = process.saturation(digitImg, {percent: -60});
    const expectImg = imgSaturationPer60;
    
    expect(digitImgRs.getWidth()).to.deep.equal(expectImg.width);
    expect(digitImgRs.getHeight()).to.deep.equal(expectImg.height);
    
    const rsData = digitImgRs.getData();
    expectImg.data.forEach(function(num, i) {
      // console.log(`expect index is: ${i}`)
      expect(rsData[i]).to.deep.equal(num);
    });

    done()
  });

  it('process.lightness({value: 70})', ( done ) => {
    const digitImg = new DigitImageData({width: img.width, height: img.height, data: img.data});
    const digitImgRs = process.lightness(digitImg, {value: 70});
    const expectImg = imgLightnessVal70;
    
    expect(digitImgRs.getWidth()).to.deep.equal(expectImg.width);
    expect(digitImgRs.getHeight()).to.deep.equal(expectImg.height);
    
    const rsData = digitImgRs.getData();
    expectImg.data.forEach(function(num, i) {
      // console.log(`expect index is: ${i}`)
      expect(rsData[i]).to.deep.equal(num);
    });

    done()
  });


  it('process.lightness({percent: -60})', ( done ) => {
    const digitImg = new DigitImageData({width: img.width, height: img.height, data: img.data});
    const digitImgRs = process.lightness(digitImg, {percent: -60});
    const expectImg = imgLightnessPer60;
    
    expect(digitImgRs.getWidth()).to.deep.equal(expectImg.width);
    expect(digitImgRs.getHeight()).to.deep.equal(expectImg.height);
    
    
    const rsData = digitImgRs.getData();
    expectImg.data.forEach(function(num, i) {
      // console.log(`expect index is: ${i}`)
      expect(rsData[i]).to.deep.equal(num);
    });

    done()
  });


  it('process.alpha({percent: -80})', ( done ) => {
    const digitImg = new DigitImageData({width: img.width, height: img.height, data: img.data});
    const digitImgRs = process.alpha(digitImg, {percent: -80});
    const expectImg = imgAlphaPer80;
    
    expect(digitImgRs.getWidth()).to.deep.equal(expectImg.width);
    expect(digitImgRs.getHeight()).to.deep.equal(expectImg.height);
    
    
    const rsData = digitImgRs.getData();
    expectImg.data.forEach(function(num, i) {
      // console.log(`expect index is: ${i}`)
      expect(rsData[i]).to.deep.equal(num);
    });

    done()
  });

  it('process.posterize({value: 10})', ( done ) => {
    const digitImg = new DigitImageData({width: img.width, height: img.height, data: img.data});
    const digitImgRs = process.posterize(digitImg, {value: 10});
    const expectImg = imgPosterizeVal10;
    
    expect(digitImgRs.getWidth()).to.deep.equal(expectImg.width);
    expect(digitImgRs.getHeight()).to.deep.equal(expectImg.height);
    
    
    const rsData = digitImgRs.getData();
    expectImg.data.forEach(function(num, i) {
      // console.log(`expect index is: ${i}`)
      expect(rsData[i]).to.deep.equal(num);
    });

    done()
  });

})