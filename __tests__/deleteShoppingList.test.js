/* eslint-env jest */
const fs = require('fs');
const path = require('path');
const httpMocks = require('node-mocks-http');
const deleteShoppingList = require('../controllers/deleteShoppingList');

it('delete an exisiting shopping list', (done) => {
  // testing at least one assertion
  expect.assertions(1);
  // add current date to filename found using path.join
  const filename = Date.now().toString();
  const filePath = path.join(__dirname, '../controllers/shoppingLists', filename);

  // writes the file contents, 'filename', with err callback
  fs.writeFile(filePath, '12345', (err) => {
    // mock a request object
    const request = httpMocks.createRequest({
      method: 'DELETE',
      url: '/shopping-lists/:filename',
      params: {
        filename,
      },
    });
    // mock a response object
    const response = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter,
    });

    // pass request/response objects into controller
    deleteShoppingList(request, response);

    // listen out for end event that signals res.send
    response.on('end', () => {
      // gives us information about a file
      fs.stat(filePath, (error, stats) => {
        // 'ENOENT' - error code for 'file not found'
        expect(error.code).toBe('ENOENT');
        done();
      });
    });
  });
});
