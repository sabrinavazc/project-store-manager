const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const productsModels = require('../../../src/models/products.models');
const productsServices = require('../../../src/services/products.services');
const { productsFromModel } = require('../mocks/mock.products');

chai.use(sinonChai);

describe('SERVICE TESTS', function () {
  describe('Check the findAllproducts function', function () {
    it('checks if the return is an object with the key "status" and the value "SUCCESSFUL"', async function () {
      sinon.stub(productsModels, 'listAllProducts').resolves(productsFromModel);

      const response = await productsServices.findAllproducts();

      chai.expect(response).to.be.deep.equal({ code: 'SUCCESS', data: productsFromModel });
    });
    afterEach(function () { return sinon.restore(); });
  });

  describe('Test the findProductsId function', function () {
    it('checks if the return is an object with the key "status" and the value "SUCCESSFUL" if passed a correct ID', async function () {
      const id = 1;
      const productMock = productsFromModel.find((product) => product.id === id);
      sinon.stub(productsModels, 'listAllProducts').resolves(productsFromModel);
  
      const listProductByIdResponse = await productsServices.findProductsId(id);
  
      chai.expect(listProductByIdResponse).to.be.deep.equal({ code: 'SUCCESS', data: productMock });
    });

    it('checks if the return is an object with the key "status" and the value "NOT_FOUND" if passed an incorrect ID', async function () {
      sinon.stub(productsModels, 'listProductsById').resolves(undefined);

      const invalidId = 67;
      const response = await productsServices.findProductsId(invalidId);

      chai.expect(response).to.be.deep.equal({ code: 'NOT_FOUND', data: { message: 'Product not found' } });
    });

    afterEach(function () { return sinon.restore(); });
  });

  it('check whether it returns the correct answer when creating a producto', async function () {
    const productMock = {
      id: 1,
      name: 'Product X',
    };

    sinon.stub(productsModels, 'createProduct').resolves(productMock);

    const createProductResponse = await productsServices.createProduct(productMock.name);

    chai.expect(createProductResponse).to.be.deep.equal({ code: 'CREATED', data: productMock });
  });

  it('check whether the correct answer is returned when creating an unnamed product', async function () {
    sinon.stub(productsModels, 'createProduct').resolves(undefined);

    const createProductResponse = await productsServices.createProduct();

    chai.expect(createProductResponse).to.be.deep.equal({
      code: 'UNPROCESSABLE',
      data: { message: '"name" is required' },
    });
  });
  afterEach(function () { return sinon.restore(); });

  describe('Test the deleteProduct function', function () {
    it('checks if the return is an object with the key "status" and the value "NO_CONTENT" if passed a correct ID', async function () {
      const id = 1;
      sinon.stub(productsModels, 'deleteProduct').resolves();
  
      const productDeleteResponse = await productsServices.deleteProduct(id);
  
      chai.expect(productDeleteResponse).to.be.an('object');
      chai.expect(productDeleteResponse).to.be.deep.equal({ code: 'NO_CONTENT' });
    });

    afterEach(function () { return sinon.restore(); });
  });
});
