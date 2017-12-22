var express = require('express');

var routes = function(){
    var router = express.Router();

    router.route('/')
        .get(function(req,res){
            res.json("Hello Node.js");
        });


    return router;
};

module.exports = routes;

