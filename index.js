const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT_EXPRESS || 3000


app.use(morgan('[:date[web]] [:response-time ms] [:status] :method :url'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());


// Recupera todas as rotas
app.use(require('./routes'));

app.listen(port, () => {
    console.log('Crawler is up on port ' + port);
});