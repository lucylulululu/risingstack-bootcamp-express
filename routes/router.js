const express = require('express');
const gitHubService = require('../services/gitHubService');

const routes = function(){
    const router = express.Router();
    const gitHubAPI = gitHubService();

    router.route('/hello')
        .get(function(req,res){
            res.json("Hello Node.js");
        });
    
    router.route('/api/searchRepositories')
        .get(function(req,res){
            const promiseObj = gitHubAPI.searchRepositories({ q: 'language:javascript' });
            promiseObj.then(function(response){
                res.json(response.data);
            }).catch(function(error){
                res.send(error);
            });
        });
    
    router.route('/api/getContributors')
        .get(function(req,res){
            const repository = 'owner/repository';
            res.json(gitHubAPI.getContributors(repository));
        });


    return router;
};

module.exports = routes;

