const { expect } = require('chai');
const camelcase = require('../../../src/utils/camelcase');

describe('Camelcase Utility Function', function () {
  it('should camelcase keys in an object with space-separated words', function () {
    const input = {
      firstName: 'John',
      lastName: 'Doe',
    };

    const result = camelcase(input);

    expect(result).to.deep.equal({
      firstName: 'John',
      lastName: 'Doe',
    });
  });

  it('should camelcase keys in an object with BabelCase words', function () {
    const input = {
      camelCasedKey: 'value',
      anotherCamelCasedKey: 'another_value',
    };

    const result = camelcase(input);

    expect(result).to.deep.equal({
      camelCasedKey: 'value',
      anotherCamelCasedKey: 'another_value',
    });
  });

  it('should not modify keys if they are already camelcased', function () {
    const input = {
      camelCasedKey: 'value',
      anotherCamelCasedKey: 'another_value',
    };

    const result = camelcase(input);

    expect(result).to.deep.equal(input);
  });

  it('should return an empty object if input is an empty object', function () {
    const input = {};

    const result = camelcase(input);

    expect(result).to.deep.equal({});
  });

  it('should trim values in keys with space-separated words', function () {
    const input = {
      '  key  with  spaces  ': 'value',
    };

    const result = camelcase(input);

    expect(result).to.deep.equal({
      keyWithSpaces: 'value',
    });
  });
});
