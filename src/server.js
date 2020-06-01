const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./database');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.listen(port, function() {
    console.log(`API LISTENING ON PORT ${port}`);
});
