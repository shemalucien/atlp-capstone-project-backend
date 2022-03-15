import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import Query from '../../database/model/query.model';
import e from 'express';

chai.use(chaiHttp);
describe('POST API /api/v1/queries', () => {
    before(() => {
        mongoose.connection.dropCollection('queries');
    })
    const query = {
        "name": "shemalucien",
        "email": "shemalucien5@gmail.com",
        "message": "message is sent"
    }

    it('it should send a query and return 201', (done) => {
        chai.request(app)
            .post('/api/v1/queries')
            .send(query)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).to.be.equal(201);

                expect(res.body).to.haveOwnProperty('data')
                return done();
            })
    });
    it('it should get all the queries and return 200', (done) => {
        chai.request(app)
            .get('/api/v1/queries')
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                return done();
            })
    });



    let queryId;
    it('it should get the query using its id and return 200', (done) => {
        chai.request(app)
            .post('/api/v1/queries')
            .send(query)
            .end((err, res) => {
                if (err) return done(err)
                queryId = res.body.data._id;
                chai.request(app).get('/api/v1/queries/' + queryId)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.status).to.be.equal(200)
                        return done();
                    })
            })
    })
    it('it should delete the query using its id and return 200', (done) => {
        chai.request(app)
            .post('/api/v1/queries')
            .send(query)
            .end((err, res) => {
                if (err) return done(err)
                queryId = res.body.data._id;
                chai.request(app)
                    .delete('/api/v1/queries/' + queryId)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.status).to.be.equal(200)
                        return done();
                    })
            })
    })
    it('it should update the query using its id and return 200', (done) => {
        chai.request(app)
            .post('/api/v1/queries')
            .send(query)
            .end((err, res) => {
                if (err) return done(err)
                queryId = res.body.data._id;
                chai.request(app)
                    .put('/api/v1/queries/' + queryId)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.status).to.be.equal(200)
                        expect(res.body).to.be.a('object');
                        return done();
                    })
            })
    })
})

