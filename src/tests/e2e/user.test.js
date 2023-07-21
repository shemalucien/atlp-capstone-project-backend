import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
chai.use(chaiHttp);
describe('POST API /api/v1/auth/signup', () => {
    before(() => {
        mongoose.connection.dropCollection('users');
    })
    const user = {
        "firstName": "shema",
        "lastName": "lucien",
        "role": "admin",
        "email": "shemalucien5@gmail.com",
        "password": "123456"
    }

    it('it should save a user and return 201', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).to.be.equal(201);

                expect(res.body).to.haveOwnProperty('data')
                return done();
            })
    });

    it('Should return 400 when email exists', (done) => {
        const oldUser = user.email
        chai.request(app).post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (oldUser) return done(err);
                expect(res.status).to.be.eql(400)
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
    let token = "";
    it('it should successfully login and return 200', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send(user)
            .end((err, res) => {
                if (err) return done(err)
                token = res.body.token
                expect(res.status).to.be.equal(200);
                expect(res.body).to.have.property("token");
                return done();
            })
    });

    it('Should return 401 when email does not exists', (done) => {
        const oldUser = user.email
        chai.request(app).post('/api/v1/auth/login')
            .send(user)
            .end((err, res) => {
                if (oldUser) return done(err);
                expect(res.status).to.be.equal(401)
                return done();
            })

    });
    it('Should return 401 when password is invalid', (done) => {
        const oldUser = user.password
        chai.request(app).post('/api/v1/auth/login')
            .send(user)
            .end((err, res) => {
                if (oldUser) return done(err);
                expect(res.status).to.be.equal(401)
                return done();
            })

    });
});

describe('GET API /api/v1/auth/user-profile', () => {
    before(() => {
        mongoose.connection.dropCollection('user-profile');
    })
    const user = {
        email: "shemalucien5@gmail.com",
        password: "123456"
    }
    let token = "";
    it('should login', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send(user)
            .end((err, res) => {
                if (err) return done(err)
                token = res.body.token;
                chai.request(app).get('/api/v1/auth/user-profile')
                    .set("Authorization", `Bearer ${token}`)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.status).to.be.eql(200)
                        return done();
                    })
            })
    });
    describe('GET API /api/v1/auth/allUsers', () => {
        before(() => {
            mongoose.connection.dropCollection('user-profile');
        })
        const user = {
            email: "shemalucien5@gmail.com",
            password: "123456"
        }
        let token = "";
        it('should login', (done) => {
            chai.request(app)
                .post('/api/v1/auth/login')
                .send(user)
                .end((err, res) => {
                    if (err) return done(err)
                    token = res.body.token;
                    chai.request(app).get('/api/v1/auth/allUsers')
                        .set("Authorization", `Bearer ${token}`)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res.status).to.be.eql(200)
                            return done();
                        })
                })
        });
      
    it('Should return 401 when user is not authorized', (done) => {
        const oldUser = { email: user.email, password: user.password }
        chai.request(app).post('/api/v1/auth/user-profile')
            .send(user)
            .end((err, res) => {
                if (oldUser) return done(err);
                expect(res.status).to.be.equal(401)
                return done();
            })

    });
});
});


