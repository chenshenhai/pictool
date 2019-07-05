const chai = require('chai');
const transform = require('./../dist/core/digit/transform');
const expect = chai.expect


describe( 'test: core-digit-transform', ( ) => {
  it('transform.RGB2HSL', ( done ) => {
    const rgb = {r: 12, g: 15, b: 10};
    const hsl = transform.RGB2HSL(rgb);
    const expectResult = {h:96, s:20, l:5};
    expect(hsl).to.deep.equal(expectResult)
    done()
  })
})