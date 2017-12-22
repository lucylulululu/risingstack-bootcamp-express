var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    agent = request.agent(app);


describe('Get /hello', function(){
    it('should response with `Hello Node.js`', function(done){
        agent.get('/hello')
            .end(function(err, results){
                results.body.should.equal('Hello Node.js');
                done()
            })
    })

    afterEach(function(done){
        done();
    })
})