const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection.model');
const productsModels = require('../../../src/models/products.models');
const { productsFromDB, productsFromModel, productFromDB, productFromModel } = require('../mocks/mock.products');

chai.use(sinonChai);

describe('MODELS TESTS', function () {
  describe('listAllproductsProducts function tests', function () {
    it('checks if an array with all products is returned', async function () {
      sinon.stub(connection, 'execute').resolves(productsFromDB);
      const response = await productsModels.listAllProducts();
      expect(response).to.be.an('array');
      expect(response).to.be.deep.equal(productsFromModel);
      connection.execute.restore();
    });

    it('checks whether an empty array is returned if there is no product registered', async function () {
      sinon.stub(connection, 'execute').resolves([]);
      const response = await productsModels.listAllProducts();
      expect(response).to.be.equal(undefined);
    });
    afterEach(function () { return sinon.restore(); });
  });

  describe('tests the findProductsById function', function () {
    it('checks if an object with the correct product is returned when passing a valid ID', async function () {
      sinon.stub(connection, 'execute').resolves(productFromDB);
      const correctId = 2;
      const response = await productsModels.listProductsById(correctId);
      expect(response).to.be.an('object');
      expect(response).to.be.deep.equal(productFromModel);
    });

    it('checks if it returns undefined when passing an invalid ID', async function () {
      sinon.stub(connection, 'execute').resolves([[]]);
      const invalidId = 66;
      const response = await productsModels.listProductsById(invalidId);
      chai.expect(response).to.be.equal(undefined);
    });

    afterEach(function () { return sinon.restore(); });
  });

  it('check whether you create a product correctly', async function () {
    const productMock = {
      id: 1,
      name: 'Product X',
    };

    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const product = await productsModels.createProduct(productMock.name);

    chai.expect(product).to.be.an('object');
    chai.expect(product).to.be.deep.equal(productMock);
  });

  it('verifica se é retorna undefined ao passar um nome inválido', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const invalidName = '';
    const response = await productsModels.createProduct(invalidName);

    chai.expect(response.name).to.equal('');
  });

  afterEach(function () { return sinon.restore(); });
});