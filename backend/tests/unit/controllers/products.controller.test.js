const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const productsControllers = require('../../../src/controllers/products.controllers');
const productsServices = require('../../../src/services/products.services');
const { productsFromModel } = require('../mocks/mock.products');
const statusCode = require('../../../src/utils/getStatusHttp');

chai.use(sinonChai);

describe('PRODUCTS CONTROLLERS TESTS', function () {
  const mockRes = {};
        
  beforeEach(function () {
    mockRes.status = sinon.stub().returnsThis();
    mockRes.json = sinon.stub();
  });

  describe('Test the findById function', function () {
    it('checks if the return is an object with a specific product and the status is equal to 200', async function () {
      const id = 1;
      const productMock = productsFromModel.find((product) => product.id === id);
      sinon.stub(productsServices, 'findProductsId').resolves({ code: 'SUCCESS', data: productMock });

      const req = { params: { id } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };

      await productsControllers.findById(req, res);

      chai.expect(res.status).to.have.been.calledWith(200);
      chai.expect(res.json).to.have.been.calledWith(productMock);
    });

    it('check function findAll', async function () {
      sinon.stub(productsServices, 'findAllproducts').resolves({ code: 'SUCCESSFUL', data: productsFromModel });
      const req = {};

      await productsControllers.findAll(req, mockRes);

      chai.expect(mockRes).to.be.an('object');
      // chai.expect(mockRes.status).to.be.calledWith(200);
      chai.expect(mockRes.json).to.be.calledWith(productsFromModel);
    });

    it('checks if the return is an object with the key "status" and the value "NOT_FOUND" if passed an incorrect ID', async function () {
      const id = 67;
      
      sinon.stub(productsServices, 'findProductsId').resolves({ code: 'NOT_FOUND', data: { message: 'Product not found' } });

      const req = { params: { id } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };

      await productsControllers.findById(req, res);

      chai.expect(res.status).to.have.been.calledWith(statusCode('NOT_FOUND'));
      chai.expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    afterEach(function () {
      sinon.restore();
    });
  });
  
  it('check whether the correct answer is returned when registering a product', async function () {
    const productMock = {
      id: 1,
      name: 'Product X',
    };

    sinon.stub(productsServices, 'createProduct').resolves({ code: 'CREATED', data: productMock });

    const req = {
      body: { name: productMock.name },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };

    await productsControllers.createProduct(req, res);

    chai.expect(res).to.be.an('object');
    chai.expect(res.status).to.have.been.calledWith(201);
    chai.expect(res.json).to.have.been.calledWith(productMock);
  });
  
  it('check function deleteProduct', async function () {
    sinon.stub(productsServices, 'deleteProduct').resolves({ status: 'NO_CONTENT' });
    
    const req = { params: { id: 1 } };

    await productsControllers.deleteProduct(req, mockRes);

    chai.expect(mockRes).to.be.an('object');
    chai.expect(mockRes.json).to.be.calledWith();
  });

  it('check function updateProduct', async function () {
    sinon.stub(productsServices, 'updateProduct').resolves({ status: 'SUCCESSFUL', data: productsFromModel });

    const req = { params: { id: 1 }, body: { name: 'product' } };

    await productsControllers.updateProduct(req, mockRes);

    chai.expect(mockRes).to.be.an('object');
    chai.expect(mockRes.json).to.be.calledWith(productsFromModel);
  });
});
