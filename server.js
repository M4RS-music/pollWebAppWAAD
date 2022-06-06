const express = require('express');
const app = express();
const port  = process.env.PORT || 8080;
const router = require('./api/routes.js');
//Use to start running server
app.use(express.static('public'));
app.use(express.json());
app.use('/api', router);
app.listen(port, () => {
  console.log('server running on localhost:8080');
});
