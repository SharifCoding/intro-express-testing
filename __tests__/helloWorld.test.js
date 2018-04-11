/* eslint-env jest */
/* eslint no-underscore-dangle: 0 */
const httpMocks = require('node-mocks-http');
const helloWorld = require('../controllers/helloWorld');

it('returns a Hello World object', () => {
  // testing at least one assertion
  expect.assertions(1);
  // mock request object
  const request = httpMocks.createRequest({
    method: 'GET',
    url: '/',
  });
  // mock response object
  const response = httpMocks.createResponse();
  // call helloWorld controller passing in request and response
  helloWorld(request, response);

  // response._getData() will return { message: 'Hello World!'}
  expect(response._getData().message).toBe('Hello World!');
});
