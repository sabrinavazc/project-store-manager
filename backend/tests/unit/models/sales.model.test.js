const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection.model');
const salesModels = require('../../../src/models/sales.models');
const { salesFromDB, salesFromModel } = require('../mocks/mock.sales');

chai.use(sinonChai);

describe('SALES TESTS MODELS', function () {
  describe('listAllsales function tests', function () {
    it('checks if an array with all sales is returned', async function () {
      sinon.stub(connection, 'execute').resolves(salesFromDB);
      const response = await salesModels.listAllSales();
      expect(response).to.be.an('array');
      expect(response).to.be.deep.equal(salesFromModel);
      connection.execute.restore();
    });

    it('checks whether an empty array is returned if there is no sale registered', async function () {
      sinon.stub(connection, 'execute').resolves([[]]);
      const response = await salesModels.listAllSales();
      expect(response).to.be.an('array');
    });
    afterEach(function () { return sinon.restore(); });
  });

  describe('tests the findSalesById function', function () {
    it('checks if an object with the correct sale is returned when passing a valid ID', async function () {
      const id = 1;
      const salesMockId = salesFromModel.filter((sale) => sale.id === id);

      sinon.stub(connection, 'execute').resolves([salesMockId, []]);

      const listSalesResponse = await salesModels.listSalesById(id);

      chai.expect(listSalesResponse).to.deep.equal(salesMockId);
    });

    it('checks if it returns undefined when passing an invalid ID', async function () {
      sinon.stub(connection, 'execute').resolves([[]]);
      const invalidId = 66;
      const response = await salesModels.listSalesById(invalidId);
      expect(response).to.be.an('array');
    });

    afterEach(function () { return sinon.restore(); });
  });
});