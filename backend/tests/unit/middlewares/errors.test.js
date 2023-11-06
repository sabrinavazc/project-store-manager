const chai = require('chai');
const sinon = require('sinon');
const handleErrors = require('../../../src/middlewares/get.errors');

describe('handleErrors Tests', function () {
  it('should handle and respond with a custom error', function () {
    const err = {
      status: 404,
      message: 'Custom error message',
    };
    const mockReq = {};
    const mockRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    handleErrors(err, mockReq, mockRes, next);

    chai.expect(mockRes.status).to.be.calledWith(404);
    chai.expect(mockRes.json).to.be.calledWith({ message: 'Custom error message' });
    chai.expect(next).not.to.be.calledWith();
  });
});
