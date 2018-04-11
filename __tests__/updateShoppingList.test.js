/* eslint-env jest */
const fs = require('fs');
const path = require('path');
const httpMocks = require('node-mocks-http');
const updateShoppingList = require('../controllers/updateShoppingList');

it('update an exisiting shopping list', (done) => {
  // testing at least one assertion
  expect.assertions(1);
  // add current date to filename found using path.join
  const filename = Date.now().toString();
  const filePath = path.join(__dirname, '../controllers/shoppingLists', filename);

  const body = {
    items: ['carrots', 'crunchies', 'cornflakes'],
  };
  // writes the file contents, convert to JSON string, with error callback
  fs.writeFile(filePath, JSON.stringify(body), (err) => {
    // mock a request object
    const request = httpMocks.createRequest({
      method: 'PUT',
      url: '/shopping-lists/:filename',
      params: {
        filename,
      },
      body,
    });
    // mock a response object
    const response = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter,
    });

    // pass request/response objects into controller
    updateShoppingList(request, response);

    // listen out for end event that signals res.send
    response.on('end', () => {
      // reads the file contents
      fs.readFile(filePath, 'utf8', (error, data) => {
        expect(data).toBe(JSON.stringify(request.body));
        done();
      });
    });
  });
});
