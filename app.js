// IMPORT LIBRARY
const express = require('express');
const helloWorld = require('./controllers/helloWorld');
const bodyParser = require('body-parser');
const createShoppingList = require('./controllers/createShoppingList');
const updateShoppingList = require('./controllers/updateShoppingList');
const deleteShoppingList = require('./controllers/deleteShoppingList');

// INSTANTIATE APP
const app = express();

// BODY-PARSER MIDDLEWARE
app.use(bodyParser.json());

// GET ROUTE
app.get('/', helloWorld);

// POST ROUTE
app.post('/shopping-lists', createShoppingList);

// PUT ROUTE
app.put('/shopping-lists/:filename', updateShoppingList);

// DELETE ROUTE
app.delete('/shopping-lists/:filename', deleteShoppingList);

// FIRES UP WEB SERVER
app.listen(3000, () => console.log('Example app listening on port 3000!'));
