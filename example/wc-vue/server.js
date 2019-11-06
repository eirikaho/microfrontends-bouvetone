const express = require('express');
const app = express();
const port = 3002;
const path = require('path');


app.use('/', express.static(path.join(__dirname, './dist/')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
