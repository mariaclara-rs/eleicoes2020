const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const app = express();

//conectar à base de dados mongoDB
mongoose.connect('mongodb+srv://maria_vinicius:maria_vinicius123@cluster0.svdpe.mongodb.net/Trab1B?retryWrites=true&w=majority',
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3344);