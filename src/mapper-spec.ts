import { expect } from 'chai';
import Mapper from './mapper';

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

  it('should ignore mapping when property not exists', () => {
    const mapper = new Mapper({
      other: 'other',
    });
    const result = mapper.map({ hello: 'world' });
    expect(result).to.eql({ hello: 'world' });
  });

  it('should not map a null property', () => {
    const mapper = new Mapper({
      no_map: null,
    });
    const result = mapper.map({ no_map: 'value' });
    expect(result).to.eql({ });
  });

  it('should not map an undefined property', () => {
    const mapper = new Mapper({
      no_map: undefined,
    });
    const result = mapper.map({ no_map: 'value' });
    expect(result).to.eql({ });
  });

  describe('default values', () => {
    it('should map an object with configuration with default value', () => {
      const mapper = new Mapper({}, {
        hello: 'hi',
      });
      const result = mapper.map({});
      expect(result).to.eql({ hello: 'hi' });
    });

    it('should not modifiy existing value with default value', () => {
      const mapper = new Mapper({}, {
        hello: 'hi',
      });
      const result = mapper.map({ hello: 'world' });
      expect(result).to.eql({ hello: 'world' });
    });
  });

  describe('reverse mapping', () => {
    it('should reverse map an object with configuration', () => {
      const mapper = new Mapper({
        hello: 'hi',
      });

      let result = mapper.map({ hello: 'world' });
      expect(result).to.eql({ hi: 'world' });

      result = mapper.map(result, true);
      expect(result).to.eql({ hello: 'world' });
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

    it('should not fail when reverse mapping null properties', () => {
      const mapper = new Mapper({
        no_map1: null,
        no_map2: null,
        no_map3: undefined,
        no_map4: undefined,
      });
      let result = mapper.map({ hello: 'world', no_map1: 'value' });
      expect(result).to.eql({ hello: 'world' });
      result = mapper.reverseMap(result);
      expect(result).to.eql({ hello: 'world' });
    });
  });

  describe('array mapping', () => {
    it('should map items in an array', () => {
      const mapper = new Mapper({
        name: 'id',
      });
      const list = [{ name: 1 }, { name: 2 }];

      const result = list.map(mapper.map);
      expect(result).to.eql([{ id: 1 }, { id: 2 }]);
    });

    it('should revers map items in an array', () => {
      const mapper = new Mapper({
        name: 'id',
      });
      const list = [{ name: 1 }, { name: 2 }];

      let result = list.map(mapper.map);
      expect(result).to.eql([{ id: 1 }, { id: 2 }]);

      result = result.map(mapper.reverseMap);
      expect(result).to.eql([{ name: 1 }, { name: 2 }]);
    });
  });
});
