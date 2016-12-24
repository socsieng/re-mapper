import * as chai from 'chai';
import Mapper from './mapper';

const expect = chai.expect;

describe('Mapper', () => {
  it('should directly map an object', () => {
    const mapper = new Mapper();
    const result = mapper.map({ hello: 'world' });
    expect(result).to.eql({ hello: 'world' });
  });

  it('should map an object with configuration', () => {
    const mapper = new Mapper({
      hello: 'hi',
    });
    const result = mapper.map({ hello: 'world' });
    expect(result).to.eql({ hi: 'world' });
  });

  it('should reverse map an object with configuration', () => {
    const mapper = new Mapper({
      hello: 'hi',
    });
    const result = mapper.map({ hi: 'world' }, true);
    expect(result).to.eql({ hello: 'world' });
  });

  it('should map an object with configuration with default value', () => {
    const mapper = new Mapper({}, {
      hello: 'hi',
    });
    const result = mapper.map({});
    expect(result).to.eql({ hello: 'hi' });
  });

  it('should reverse map an object with configuration with default value', () => {
    const mapper = new Mapper({
      hello: 'hi',
    }, {
      other: [],
    });
    const result = mapper.map({ hi: 'world' }, true);
    expect(result).to.eql({ hello: 'world', other: [] });
  });

  it('should reverse map an object with configuration with default value and alternate name', () => {
    const mapper = new Mapper({
      hello: 'hi',
      arr: 'list',
    }, {
      arr: [],
    });
    const result = mapper.map({ hi: 'world' }, true);
    expect(result).to.eql({ hello: 'world', list: [] });
  });
});
