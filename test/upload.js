let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
const path = require('path');

chai.use(chaiHttp);
chai.should();

describe('CSV', () => {
    describe('Upload csv file', () => { 
        it('columns too few', (done) => {
            chai.request(server)
            .post('/users/upload')
            .set('Content-Type', 'multipart/form-data')
            .attach('file', path.resolve(__dirname, "asset/test1_too_few.csv"))
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('columns too many', (done) => {
            chai.request(server)
            .post('/users/upload')
            .set('Content-Type', 'multipart/form-data')
            .attach('file', path.resolve(__dirname, "asset/test2_too_many.csv"))
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('salary less than 0', (done) => {
            chai.request(server)
            .post('/users/upload')
            .set('Content-Type', 'multipart/form-data')
            .attach('file', path.resolve(__dirname, "asset/test3_salary_minus.csv"))
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('salary not decimal', (done) => {
            chai.request(server)
            .post('/users/upload')
            .set('Content-Type', 'multipart/form-data')
            .attach('file', path.resolve(__dirname, "asset/test4_salary_not_decimal.csv"))
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('empty files', (done) => {
            chai.request(server)
            .post('/users/upload')
            .set('Content-Type', 'multipart/form-data')
            .attach('file', path.resolve(__dirname, "asset/test5_empty.csv"))
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('not csv', (done) => {
            chai.request(server)
            .post('/users/upload')
            .set('Content-Type', 'multipart/form-data')
            .attach('file', path.resolve(__dirname, "asset/test6.pdf"))
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('login repeated in another row', (done) => {
            chai.request(server)
            .post('/users/upload')
            .set('Content-Type', 'multipart/form-data')
            .attach('file', path.resolve(__dirname, "asset/test7_repeated.csv"))
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done(); 
            })
        }).timeout(10000);
        it('correct file with comment', (done) => {
            chai.request(server)
            .post('/users/upload')
            .set('Content-Type', 'multipart/form-data')
            .attach('file', path.resolve(__dirname, "asset/test8_comment.csv"))
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done(); 
            })
        }).timeout(10000);
        it('correct file without comment', (done) => {
            chai.request(server)
            .post('/users/upload')
            .set('Content-Type', 'multipart/form-data')
            .attach('file', path.resolve(__dirname, "asset/test9_correct_file.csv"))
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done(); 
            })
        }).timeout(10000);
    })
})