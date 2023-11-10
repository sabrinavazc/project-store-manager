const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {
  validateInputSale,
  validateProductExists,
  validateQuantity,
} = require('../../../src/middlewares/sales.middlewares');

chai.use(sinonChai);

describe('MIDDLEWARE VALIDADE SALES TEST', function () {
  const mockRes = {};

  beforeEach(function () {
    mockRes.status = sinon.stub().returns(mockRes);
    mockRes.json = sinon.stub().returns();
  });

  describe('test middleware validateInputSale', function () {
    it('check call middleware', function () {
      const mockReq = {
        body:
        [
          {
            productId: 2,
            quantity: 1,
          },
        ],
      };

      const next = sinon.stub();

      validateInputSale(mockReq, mockRes, next);

      chai.expect(next.called).to.be.equal(true);
    });

    it('check return status 400 and message error', function () {
      const mockReq = {
        body:
                [
                  {
                    quantity: 1,
                  },
                ],
      };
      
      const next = sinon.stub();

      validateInputSale(mockReq, mockRes, next);

      chai.expect(next).not.to.be.calledWith();
      chai.expect(mockRes.status).to.have.been.calledWith(400);
      chai.expect(mockRes.json).to.be.calledWith({ message: '"productId" is required' });
    });
  });

  it('check return status 404 and message error, where product not found', function () {
    const mockReq = {
      body: [
        {
          productId: 23444,
          quantity: 1,
        },
      ],
    };
  
    const next = sinon.stub();
  
    validateProductExists(mockReq, mockRes, next);
  
    chai.expect(next).not.to.be.calledWith();
  });

  it('check return status 400 and message error Quantity', function () {
    const mockReq = {
      body: [
        {
          productId: 2,
        },
      ],
    };

    const next = sinon.stub();

    validateQuantity(mockReq, mockRes, next);

    chai.expect(mockRes.status).to.have.been.calledWith(400);
    chai.expect(mockRes.json).to.be.calledWith({ message: '"quantity" is required' });
  });
  
  it('check return status 400 and message error "quantity" must be greater than or equal to 1', function () {
    const mockReq = {
      body: [
        {
          productId: 2,
          quantity: 0,
        },
      ],
    };

    const next = sinon.stub();

    validateQuantity(mockReq, mockRes, next);

    chai.expect(mockRes.status).to.have.been.calledWith(422);
    chai.expect(mockRes.json).to.be.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });
  
  describe('test middleware validateQuantity', function () {
    it('check return status 400 and message error "quantity" is required', function () {
      const mockReq = {
        body: [
          {
            productId: 1,
          },
        ],
      };

      const next = sinon.stub();

      validateQuantity(mockReq, mockRes, next);

      chai.expect(mockRes.status).to.have.been.calledWith(400);
      chai.expect(mockRes.json).to.be.calledWith({ message: '"quantity" is required' });
    });

    it('check return status 422 and message error when quantity is less than or equal to 0', function () {
      const mockReq = {
        body: [
          {
            productId: 1,
            quantity: 0,
          },
        ],
      };

      const next = sinon.stub();

      validateQuantity(mockReq, mockRes, next);

      chai.expect(mockRes.status).to.have.been.calledWith(422);
      chai.expect(mockRes.json).to.be.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });
  });
});
