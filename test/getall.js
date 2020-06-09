let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');

chai.use(chaiHttp);
chai.should();

describe('Get All', () => {
    describe('Get all employee', () => {
        it('missing minSalary', (done) => {
            chai.request(server)
            .get('/users?maxSalary=4000&offset=0&limit=30&sort=+name')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('missing maxSalary', (done) => {
            chai.request(server)
            .get('/users?minSalary=0&offset=0&limit=30&sort=+name')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('missing offset', (done) => {
            chai.request(server)
            .get('/users?minSalary=0&maxSalary=4000&limit=30&sort=+name')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('missing sort', (done) => {
            chai.request(server)
            .get('/users?minSalary=0&maxSalary=4000&offset=0&limit=30')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('incorrect format minSalary', (done) => {
            chai.request(server)
            .get('/users?minSalary=aa&maxSalary=4000&offset=0&limit=30&sort=+name')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('incorrect format maxSalary', (done) => {
            chai.request(server)
            .get('/users?minSalary=0&maxSalary=bb&offset=0&limit=30&sort=+name')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('minSalary < 0', (done) => {
            chai.request(server)
            .get('/users?minSalary=-20&maxSalary=4000&offset=0&limit=30&sort=+name')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('maxSalary < 0', (done) => {
            chai.request(server)
            .get('/users?minSalary=0&maxSalary=-20&offset=0&limit=30&sort=+name')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('maxSalary < minSalary', (done) => {
            chai.request(server)
            .get('/users?minSalary=4000&maxSalary=200&offset=0&limit=30&sort=+name')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('correct parameter', (done) => {
            chai.request(server)
            .get('/users?minSalary=0&maxSalary=4000&offset=0&limit=30&sort=+name')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done(); 
            })
        }).timeout(10000);
    })
    describe('Paginate all employees', () => {
        it('correct parameter', (done) => {
            chai.request(server)
            .get('/paginate?page=0&minSalary=0&maxSalary=4000&rowsperpage=30&sort=+name')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done(); 
            })
        }).timeout(10000);
    })
})