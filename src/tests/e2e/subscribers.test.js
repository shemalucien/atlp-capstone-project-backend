import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import Subscriber from "../../database/model/subscriber.model";

chai.use(chaiHttp);

describe('POST API /api/v1/subscribers', () => {
    before(() => {
        mongoose.connection.dropCollection('subscribers');
    })
    const subscriber = {
        "email": "shemalucien5@gmail.com",
    }
    const invalidEmail = {
        "email": "shemagmail.com",
    }
    const oldSubscriber =
    {
        "email": "shemalucien5@gmail.com",
    }
    it('it should send a subscription and return 201', (done) => {
        chai.request(app)
            .post('/api/v1/subscribers/subscribe')
            .send(subscriber)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).to.be.equal(201);
                expect(res.body).to.have.property("success");
                expect(res.body).to.have.property("data");
                return done();
            })
    });

    it('it should not send a subscription and return 400', (done) => {

        chai.request(app)
            .post('/api/v1/subscribers/subscribe')
            .send(invalidEmail)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).to.be.equal(400);
                return done();
            })
    });
    it('it should return 400 when the user has already subscribed', (done) => {

        chai.request(app)
            .post('/api/v1/subscribers/subscribe')
            .send(oldSubscriber)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).to.be.equal(400);
                return done();
            })
    });
})

describe('POST API /api/v1/auth/signup', () => {
    before(() => {
        mongoose.connection.dropCollection('signup');
    })
    const user = {
        "firstName": "shema",
        "lastName": "lucien",
        "role": "admin",
        "email": "shemalucien@gmail.com",
        "password": "123456"
    }
    it('it should successfully create an account and return 201', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).to.be.equal(201);

                expect(res.body).to.haveOwnProperty('data')
                return done();
            })
    })
    it('Should return 400 when email exists', (done) => {
        const oldUser = user.email
        chai.request(app).post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (oldUser) return done(err);
                expect(res.status).to.be.eql(400)
                return done();
            })

    })

})

describe('POST API /api/v1/auth/login', () => {
    before(() => {
        mongoose.connection.dropCollection('login');
    })
    const user = {
        email: "shemalucien5@gmail.com",
        password: "123456"
    }
    const fakeUser = {
        email: "shemaluciengmail.com",
        password: "123456"
    }
    const subscriber = {
        "email": "shemalucien5@gmail.com",
    }
    let token = "";
    it('it should successfully login and return 200', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send(user)
            .end((err, res) => {
                if (err) return done(err)
                token = res.body.token;
                expect(res.status).to.be.equal(200);
                expect(res.body).to.have.property("token");
                return done();
            })

    });
    it('it should return subscription removed successfully 200', (done) => {
        chai.request(app)
            .delete('/api/v1/subscribers/unsubscribe/:id')
            .set("Authorization", `Bearer ${token}`)
            .send(subscriber)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).to.be.equal(200);

                return done();
            })
    });
    it('it should return a list of all subscribers ', (done) => {
        chai.request(app)
            .get('/api/v1/subscribers/')
            .set("Authorization", `Bearer ${token}`)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).to.be.equal(200);

                return done();
            })
    });
    it('it should not successfully  login and return 401', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send(fakeUser)
            .end((err, res) => {
                if (err) return done(err)
                token = res.body.token;
                expect(res.status).to.be.equal(401);

                return done();
            })
    });
    it('it should return user not found 404', (done) => {
        chai.request(app)
            .post('/api/v1/subscribers/unsubscribe')
            .set("Authorization", `Bearer ${token}`)
            .send(subscriber)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).to.be.equal(404);

                return done();
            })
    });
   


})

