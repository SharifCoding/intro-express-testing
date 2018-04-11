/* eslint-env jest */
/* eslint no-underscore-dangle: 0 */
const fs = require('fs');
const path = require('path');
const httpMocks = require('node-mocks-http');
const createShoppingList = require('../controllers/createShoppingList');

it('create a new shopping list', (done) => {
  // testing at least one assertion
  expect.assertions(1);

  // mock a request object
  const request = httpMocks.createRequest({
    method: 'POST',
    url: '/shopping-lists',
    // object represent POST data
    body: {
      items: ['broccoli', 'bread', 'bananas'],
    },
  });
  // mock a response object
  const response = httpMocks.createResponse({
    eventEmitter: require('events').EventEmitter,
  });

  // pass request/response objects into controller
  createShoppingList(request, response);

  // listen out for end event that signals res.send
  response.on('end', () => {
    // use path.join to get exact location once filename found
    const filename = response._getData().filename;
    const filePath = path.join(__dirname, '../controllers/shoppingLists', filename);

    // reads the file contents
    fs.readFile(filePath, 'utf8', (error, data) => {
      expect(data).toBe(JSON.stringify(request.body));
      done();
    });
  });
});
