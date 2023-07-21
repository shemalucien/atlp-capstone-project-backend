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

})
describe('POST API /api/v1/auth/login', () => {
    before(() => {
        mongoose.connection.dropCollection('login');
    })
    const user = {
        email: "shemalucien5@gmail.com",
        password: "123456"
    }
    const query = {
        "name": "shemalucien",
        "email": "shemalucien5@gmail.com",
        "message": "message is sent"
    }
    let token = "";
    it('it should successfully login and return 200', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
            .set("Authorization", `Bearer ${token}`)
            .send(user)
            .end((err, res) => {
                if (err) return done(err)
                token = res.body.token;
                expect(res.status).to.be.equal(200);
                expect(res.body).to.have.property("token");
                return done();
            })
        describe('POST API /api/v1/queries', () => {
            before(() => {
                mongoose.connection.dropCollection('queries');
            })
            const query = {
                "name": "shemalucien",
                "email": "shemalucien5@gmail.com",
                "message": "message is sent"
            }

            it('it should get all the queries and return 200', (done) => {
                chai.request(app)
                    .get('/api/v1/queries')
                    .set("Authorization", `Bearer ${token}`)
                    .end((err, res) => {
                        if (err) return done(err)
                        expect(res.status).to.be.equal(200);
                        expect(res.body).to.be.a('object');
                        return done();
                    })
            });
        });
        describe('POST API /api/v1/queries', () => {
            before(() => {
                mongoose.connection.dropCollection('queries');
            })
            const query = {
                "name": "shemalucien",
                "email": "shemalucien5@gmail.com",
                "message": "message is sent"
            }
            let queryId;
            it('it should get the query using its id and return 200', (done) => {
                chai.request(app)
                    .post('/api/v1/queries')
                    .send(query)
                    .end((err, res) => {
                        if (err) return done(err)
                        queryId = res.body.data._id;
                        chai.request(app).get('/api/v1/queries/' + queryId)
                            .set("Authorization", `Bearer ${token}`)
                            .end((err, res) => {
                                if (err) return done(err);
                                expect(res.status).to.be.equal(200)
                                return done();
                            })
                    })
            });
        });
        describe('POST API /api/v1/queries', () => {
            before(() => {
                mongoose.connection.dropCollection('queries');
            })
            const query = {
                "name": "shemalucien",
                "email": "shemalucien5@gmail.com",
                "message": "message is sent"
            }
            let queryId;
            it('it should delete the query using its id and return 200', (done) => {
                chai.request(app)
                    .post('/api/v1/queries')
                    .set("Authorization", `Bearer ${token}`)
                    .send(query)
                    .end((err, res) => {
                        if (err) return done(err)
                        queryId = res.body.data._id;
                        chai.request(app)
                            .delete('/api/v1/queries/' + queryId)
                            .set("Authorization", `Bearer ${token}`)
                            .end((err, res) => {
                                if (err) return done(err);
                                expect(res.status).to.be.equal(200)
                                return done();
                            })
                    })
            });
        });
        describe('POST API /api/v1/queries', () => {
            before(() => {
                mongoose.connection.dropCollection('queries');
            })
            const query = {
                "name": "shemalucien",
                "email": "shemalucien5@gmail.com",
                "message": "message is sent"
            }
            let queryId;
            it('it should update the query using its id and return 200', (done) => {
                chai.request(app)
                    .post('/api/v1/queries')
                    .send(query)
                    .end((err, res) => {
                        if (err) return done(err)
                        queryId = res.body.data._id;
                        chai.request(app)
                            .put('/api/v1/queries/' + queryId)
                            .set("Authorization", `Bearer ${token}`)
                            .end((err, res) => {
                                if (err) return done(err);
                                expect(res.status).to.be.equal(200)
                                expect(res.body).to.be.a('object');
                                return done();
                            })
                    })
            });
        });

    })
})
