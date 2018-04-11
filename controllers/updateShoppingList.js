const fs = require('fs');
const path = require('path');

function updateShoppingList(req, res) {
  // request URL route will look like: /shopping-lists/:filename
  const filename = req.params.filename;
  // use JSON.stringify on the object to convert it to a JSON string
  const contents = JSON.stringify(req.body);
  // use fs.writeFile to overwrite the existing file in the shoppingLists folder
  fs.writeFile(path.join(__dirname, 'shoppingLists', filename), contents, (err) => {
    if (err) throw err;
    // send a response after the file has been created
    res.send({ filename });
  });
}

module.exports = updateShoppingList;
