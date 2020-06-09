let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');

chai.use(chaiHttp);
chai.should();

describe('CRUD', () => {
    describe('Create an employee', () => {
        it('missing id parameter', (done) => {
            chai.request(server)
            .post('/user/xx001')
            .send({"name":"Peter Pan", "login": "ppan", "salary": 123.5})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('missing login parameter', (done) => {
            chai.request(server)
            .post('/user/xx001')
            .send({"id":"xx001", "name":"Peter Pan", "salary": 123.5})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('missing name parameter', (done) => {
            chai.request(server)
            .post('/user/xx001')
            .send({"id":"xx001", "login": "ppan", "salary": 123.5})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('missing salary parameter', (done) => {
            chai.request(server)
            .post('/user/xx001')
            .send({"id":"xx001", "name":"Peter Pan", "login": "ppan"})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('id is not alphanumeric', (done) => {
            chai.request(server)
            .post('/user/xx001')
            .send({"id":"xx001$", "name":"Peter Pan", "login": "ppan", "salary": 123.5})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('login is not alphanumeric', (done) => {
            chai.request(server)
            .post('/user/xx001')
            .send({"id":"xx001", "name":"Peter Pan", "login": "ppan#$", "salary": 123.5})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('salary is not decimal', (done) => {
            chai.request(server)
            .post('/user/xx001')
            .send({"id":"xx001", "name":"Peter Pan","login": "ppan", "salary": "test"})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('salary is less than 0', (done) => {
            chai.request(server)
            .post('/user/xx001')
            .send({"id":"xx001", "name":"Peter Pan", "login": "ppan", "salary": -23.4})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('correct data save employee', (done) => {
            chai.request(server)
            .post('/user/xx001')
            .send({"id":"xx001", "name":"Peter Pan", "login": "ppan", "salary": 123.5})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                res.body.should.have.property('login');
                res.body.should.have.property('salary');
                done(); 
            })
        }).timeout(10000);
    });
    describe('Edit an employee', () => {
        it('missing login parameter', (done) => {
            chai.request(server)
            .patch('/user/xx001')
            .send({"name":"Peter Pan", "salary": 123.5})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('missing name parameter', (done) => {
            chai.request(server)
            .patch('/user/xx001')
            .send({"login": "ppan", "salary": 123.5})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('missing salary parameter', (done) => {
            chai.request(server)
            .patch('/user/xx001')
            .send({"name":"Peter Pan", "login": "ppan"})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('login is not alphanumeric', (done) => {
            chai.request(server)
            .patch('/user/xx001')
            .send({"name":"Peter Pan", "login": "ppan#$", "salary": 123.5})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('salary is not decimal', (done) => {
            chai.request(server)
            .patch('/user/xx001')
            .send({"name":"Peter Pan","login": "ppan", "salary": "test"})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('salary is less than 0', (done) => {
            chai.request(server)
            .patch('/user/xx001')
            .send({"name":"Peter Pan", "login": "ppan", "salary": -23.4})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('correct data update employee', (done) => {
            chai.request(server)
            .patch('/user/xx001')
            .send({"name":"Peter Andersen Pan", "login": "ptrpan", "salary": 89.5})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                res.body.should.have.property('login');
                res.body.should.have.property('salary');
                done(); 
            })
        }).timeout(10000);
    });
    describe('Get an Employee record', () => {
        it('Get an employee record with specific ID', (done) => {
            chai.request(server)
            .get('/user/xx001')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                res.body.should.have.property('login');
                res.body.should.have.property('salary');
                done(); 
            })
        }).timeout(10000);
    });
    describe('Delete an Employee record', () => {
        it('Delete an employee record with specific ID', (done) => {
            chai.request(server)
            .delete('/user/xx001')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                res.body.should.have.property('login');
                res.body.should.have.property('salary');
                done(); 
            })
        }).timeout(10000);
    });
})