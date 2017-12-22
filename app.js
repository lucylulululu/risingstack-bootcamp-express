const express = require ('express');
const router = require('./routes/router')();

const app = new express();
const port = process.env.PORT || 3000;

app.use('/hello', router);

app.listen(port, function(){
    console.log("listening port " + port);
});

module.exports = app


