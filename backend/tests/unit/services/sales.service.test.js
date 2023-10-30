const sinon = require('sinon');

const chai = require('chai');
const sinonChai = require('sinon-chai');
const salesModels = require('../../../src/models/sales.models');
const salesServices = require('../../../src/services/sales.services');
const { salesFromModel, saleFromModel } = require('../mocks/mock.sales');

chai.use(sinonChai);

describe('SALES SERVICE TESTS', function () {
  describe('Check the findAllSales function', function () {
    it('checks if the return is an object with the key "status" and the value "SUCCESSFUL"', async function () {
      sinon.stub(salesModels, 'listAllSales').resolves(salesFromModel);

      const response = await salesServices.findAllSales();

      chai.expect(response).to.deep.equal({ code: 'SUCCESS', data: salesFromModel });
    });
    afterEach(function () { return sinon.restore(); });
  });

  describe('Test the findSalesId function', function () {
    it('checks if the return is an object with the key "status" and the value "SUCCESSFUL" if passed a correct ID', async function () {
      const id = 1;
      sinon.stub(salesModels, 'listSalesById').resolves(saleFromModel);
  
      const response = await salesServices.findSalesId(id);
  
      chai.expect(response).to.be.an('object');
      chai.expect(response).to.have.a.property('data');
      chai.expect(response).to.deep.equal({ code: 'SUCCESS', data: saleFromModel });
    });

    it('checks if the return is an object with the key "status" and the value "NOT_FOUND" if passed an incorrect ID', async function () {
      sinon.stub(salesModels, 'listSalesById').resolves(undefined);

      const invalidId = 67;
      const response = await salesServices.findSalesId(invalidId);

      chai.expect(response).to.be.deep.equal({ code: 'NOT_FOUND', data: { message: 'Sale not found' } });
    });

    afterEach(function () { return sinon.restore(); });
  });
});
