const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { validateProductName, validateProductExists } = require('../../../src/middlewares/products.middlewares');

chai.use(sinonChai);

describe('MIDDLEWARE VALIDADE PRODUCTS TEST', function () {
  const mockRes = {};

  beforeEach(function () {
    mockRes.status = sinon.stub().returns(mockRes);
    mockRes.json = sinon.stub().returns();
  });
 
  describe('test middleware validateName', function () {
    it('check call middleware', function () {
      const mockReq = {
        body: {
          name: 'Product',
        },
      };

      const next = sinon.stub();

      validateProductName(mockReq, mockRes, next);

      chai.expect(next.called).to.be.equal(true);
    });

    it('check return status 400 and message error', function () {
      const mockReq = {
        body: {},
      };
      const next = sinon.stub();

      validateProductName(mockReq, mockRes, next);

      chai.expect(mockRes.status).to.be.calledWith(400);
      chai.expect(mockRes.json).to.be.calledWith({ message: '"name" is required' });
    });

    it('check return status 400 and message error, where "name" have 5 caracters', function () {
      const mockReq = { body: { name: 'Prod' } };
      const next = sinon.stub();

      validateProductName(mockReq, mockRes, next);

      chai.expect(next).not.to.be.calledWith();
      chai.expect(mockRes.status).to.have.been.calledWith(422);
      chai.expect(mockRes.json).to.have.been.calledWith({
        message: '"name" length must be at least 5 characters long',
      });
    });
  });
  
  describe('test middleware  validateProductExists', function () {
    it('check called Middleware', function () {
      const mockReq = {
        body:
          {
            name: 'Martelo do Batman',
          },
      };
  
      const next = sinon.stub();
  
      validateProductExists(mockReq, mockRes, next);
  
      chai.expect(next).not.to.be.calledWith();
    });
  });
});