const chai = require('chai');
const digit = require('../dist/digit');
const expect = chai.expect

const algorithm = digit.algorithm;
const imgData = {
  data: []
}

describe( 'test: Pictool.digit.algorithm', ( ) => {

  it('algorithm.grayscale', ( done ) => {
    const rgb = {r: 12, g: 15, b: 10};
    const hsl = algorithm.RGB2HSL(rgb);
    const expectResult = {h:96, s:20, l:5};
    expect(hsl).to.deep.equal(expectResult)
    done()
  });

})