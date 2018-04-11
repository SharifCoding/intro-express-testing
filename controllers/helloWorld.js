// extracted callback function from app.get (app,js) with new variable assigned
const helloWorld = (req, res) => res.send({ message: 'Hello World!' }); // returns JSON

module.exports = helloWorld;
