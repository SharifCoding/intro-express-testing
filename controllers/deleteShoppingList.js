const fs = require('fs');
const path = require('path');

function deleteShoppingList(req, res) {
  // request URL route will look like: /shopping-lists/:filename
  const filename = req.params.filename;
  // fs.writeFile takes two arguments: the file path; and a callback function;
  fs.unlink(path.join(__dirname, 'shoppingLists', filename), (err) => {
    // throw an error if there is one
    if (err) throw err;
    // send a response after the file has been deleted
    res.send({ success: true });
  });
}

module.exports = deleteShoppingList;
