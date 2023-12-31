const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const salesControllers = require('../../../src/controllers/sales.controllers');
const salesServices = require('../../../src/services/sales.services');
const { salesFromModel } = require('../mocks/mock.sales');
const statusCode = require('../../../src/utils/getStatusHttp');

chai.use(sinonChai);

describe('SALES CONTROLLERS TESTS', function () {
  const mockRes = {};
        
  beforeEach(function () {
    mockRes.status = sinon.stub().returnsThis();
    mockRes.json = sinon.stub();
  });

  describe('Test the findSalesById function', function () {
    it('checks if the return is an object with a specific sale and the status is equal to 200', async function () {
      const id = 1;
      const req = { params: { id } };
      const saleMock = salesFromModel.find((sale) => sale.id === id);
      
      sinon.stub(salesServices, 'findAllSales').resolves({ code: 'SUCCESS', data: saleMock });

      await salesControllers.findById(req, mockRes);

      chai.expect(mockRes.status).to.have.been.calledWith(200);
      chai.expect(mockRes).to.be.an('object');
      /* chai.expect(mockRes.json).to.be.calledWith(salesFromModel); */
    });

    it('checks if the return is an object with the key "status" and the value "NOT_FOUND" if passed an incorrect ID', async function () {
      const id = 67;
      sinon.stub(salesServices, 'findAllSales').resolves({ code: 'NOT_FOUND', data: { message: 'Sale not found' } });

      const req = { params: { id } };

      await salesControllers.findById(req, mockRes);

      chai.expect(mockRes.status).to.have.been.calledWith(statusCode('NOT_FOUND'));
      chai.expect(mockRes.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    afterEach(function () {
      sinon.restore();
    });

    it('check controllerreturn object status 201 and data sales', async function () {
      sinon.stub(salesServices, 'insertSale').resolves({ code: 'CREATED', data: salesFromModel });

      const req = { body: [
        {
          productId: 1,
          quantity: 1,
        },
      ] };
   
      await salesControllers.insertSale(req, mockRes);

      chai.expect(mockRes).to.be.an('object');
      chai.expect(mockRes.status).to.have.been.calledWith(statusCode(201));
      chai.expect(mockRes.json).to.be.calledWith(salesFromModel);
    });
  });
  it('checks if the return is an object with the key "status" and the value "BAD_REQUEST" if an invalid ID is passed', async function () {
    sinon.stub(salesServices, 'insertSale').resolves({ code: 'BAD_REQUEST', data: { message: 'productId is required' } });

    const req = { body: [
      {
        quantity: 1,
      },
    ] };

    const insertSaleResponse = await salesServices.insertSale(req, mockRes);

    chai.expect(insertSaleResponse).to.be.an('object');
    chai.expect(insertSaleResponse).to.have.a.property('data');
    chai.expect(insertSaleResponse).to.have.a.property('code', 'BAD_REQUEST');
    afterEach(function () { return sinon.restore(); });
  });

  it('checks if deleteSale the return is an object with the key "status" and the value "DELETE" if ID is passed', async function () {
    const id = 1;
    const req = { params: { id } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };

    sinon.stub(salesServices, 'deleteSale').resolves({
      code: 'DELETED',
    });

    await salesControllers.deleteSale(req, res);

    chai.expect(res.json).to.have.been.calledWith();
  });

  it('check if controller DeleteSale return 404 delete sale incorrect id', async function () {
    const id = 123456;
    const req = { params: { id } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };

    sinon.stub(salesServices, 'deleteSale').resolves({
      code: 'NOT_FOUND',
      data: { message: 'Sale not found' },
    });

    await salesControllers.deleteSale(req, res);

    chai.expect(res.status).to.have.been.calledWith(404);
    chai.expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });
});
