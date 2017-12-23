const axios = require("axios");
const qs = require('qs');

const API_URL = 'https://api.github.com';
const USER_AGENT = 'RisingStack-Bootcamp';
const options =  {
    headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': USER_AGENT
    }
};

const gitHubService = function () {

    const searchRepositories = async function (query = {}) {
        let reqUrl = `${API_URL}/search/repositories?` + qs.stringify(query);
        return await axios.get(reqUrl,options);
    };

    const getContributors = async function (repository, query = {}) {
        let reqUrl = `${API_URL}/repos/${repository}/stats/contributors?`+ qs.stringify(query);
        return await axios.get(reqUrl,options);
    };

    return {
        searchRepositories: searchRepositories ,
        getContributors: getContributors
    };
};

module.exports = gitHubService;