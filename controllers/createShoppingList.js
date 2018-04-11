const fs = require('fs');
const path = require('path');

function createShoppingList(req, res) {
  // create a string for the filename using Date.now(), which converted a number to string
  const filename = Date.now().toString();
  // use JSON.stringify on the object to convert it to a JSON string
  const contents = JSON.stringify(req.body);
  // fs.writeFile takes three arguments: the file path; the file contents; and a callback function;
  fs.writeFile(path.join(__dirname, 'shoppingLists', filename), contents, (err) => {
    if (err) throw err;
    // send a response after the file has been created
    res.send({ filename });
  });
}

module.exports = createShoppingList;
