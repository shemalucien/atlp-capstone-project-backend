import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';



chai.use(chaiHttp);

describe('POST API /api/v1/auth/signup', () => {
    before(() => {
        mongoose.connection.dropCollection('signup');
    })
    const user = {
        "firstName": "shema",
        "lastName": "lucien",
        "role": "admin",
        "email": "shemalucien5@gmail.com",
        "password": "123456"
    }
    it('it should successfully create an account and return 201', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).to.be.equal(400);
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
                token = res.body.token;
                expect(res.status).to.be.equal(200);
                expect(res.body).to.have.property("token");
                return done();
            })
        describe('POST API /api/v1/blog', () => {
            before(() => {
                mongoose.connection.dropCollection('blogs');
            })
            const blog = {
                title: "ATLP RWANDA",
                desc: "Andela Technical Leadership Program Rwanda",
                photo: "Photo url",
                author: "Shema Lucien"
            }
            it('it should successfully create blog and return 201', (done) => {
                chai.request(app)
                    .post('/api/v1/blogs')
                    .set("Authorization", `Bearer ${token}`)
                    .send(blog)

                    .end((err, res) => {
                        if (err) return done(err)
                        expect(res.status).to.be.equal(201);
                        expect(res.body).to.haveOwnProperty('data')
                        return done();
                    })
            });

        });
        describe('GET API /api/v1/blogs', () => {
            before(() => {
                mongoose.connection.dropCollection('blog');
            })
            const blog = {
                title: "ATLP RWANDA",
                desc: "Andela Technical Leadership Program Rwanda",
                photo: "Photo url",
                author: "Shema Lucien"
            }

            it('should get the list of blogs', (done) => {
                chai.request(app)
                    .post('/api/v1/blogs')
                    .set("Authorization", `Bearer ${token}`)
                    .send(blog)
                    .end((err, res) => {
                        if (err) return done(err)
                        chai.request(app).get('/api/v1/blogs')
                            .end((err, res) => {
                                if (err) return done(err);
                                expect(res.status).to.be.eql(200)
                                return done();
                            })
                    })
            });
        });
        describe('GET API /api/v1/blog/:id', () => {
            before(() => {
                mongoose.connection.dropCollection('blog');
            })
            const blog = {
                title: "ATLP RWANDA",
                desc: "Andela Technical Leadership Program Rwanda",
                photo: "Photo url",
                author: "Shema Lucien"
            }
            let blogId;

            it('Should get single blog by id', (done) => {
                chai.request(app)
                    .post('/api/v1/blogs')
                    .set("Authorization", `Bearer ${token}`)
                    .send(blog)
                    .end((err, res) => {
                        if (err) return done(err)
                        blogId = res.body.data._id;
                        chai.request(app).get('/api/v1/blogs/' + blogId)
                            .end((err, res) => {
                                if (err) return done(err);
                                expect(res.status).to.be.eql(200)
                                return done();
                            })
                    })
            })
            it('Should return 404 when blog does not exists', (done) => {
                const fakeId = '1229b52ca50601182da72457';
                chai.request(app).get('/api/v1/blogs/' + fakeId)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.status).to.be.eql(404)
                        return done();
                    })
            })

        });


        describe('Delete API /api/v1/blog/:id', () => {
            before(() => {
                mongoose.connection.dropCollection('blog');
            })
            const blog = {
                title: "ATLP RWANDA",
                desc: "Andela Technical Leadership Program Rwanda",
                photo: "Photo url",
                author: "Shema Lucien"
            }
            let blogId;
            it('Should get single blog by id and delete it', (done) => {
                chai.request(app)
                    .post('/api/v1/blogs')
                    .set("Authorization", `Bearer ${token}`)
                    .send(blog)

                    .end((err, res) => {
                        if (err) return done(err)

                        blogId = res.body.data._id;

                        chai.request(app).delete('/api/v1/blogs/' + blogId)
                            .set("Authorization", `Bearer ${token}`)
                            .end((err, res) => {
                                if (err) return done(err);
                                expect(res.status).to.be.eql(200)
                                return done();
                            })
                    })
            });
        });

        describe('Update API /api/v1/blogs/:id', () => {
            before(() => {
                mongoose.connection.dropCollection('blog');
            })
            const blog = {
                title: "ATLP RWANDA",
                desc: "Andela Technical Leadership Program Rwanda",
                photo: "Photo url",
                author: "Shema Lucien"
            }
            let blogId;
            it('Should get single blog by id and update it', (done) => {
                chai.request(app)
                    .post('/api/v1/blogs')
                    .set("Authorization", `Bearer ${token}`)
                    .send(blog)
                    .end((err, res) => {
                        if (err) return done(err)
                        blogId = res.body.data._id;
                        chai.request(app).put('/api/v1/blogs/' + blogId)
                            .set("Authorization", `Bearer ${token}`)
                            .end((err, res) => {
                                if (err) return done(err);
                                expect(res.status).to.be.eql(200)
                                return done();
                            })
                    })
            });

            it('Should return 404 when blog does not exists', (done) => {
                const fakeId = '1229b52ca50601182da72457';
                chai.request(app).get('/api/v1/blogs/' + fakeId)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.status).to.be.eql(404)
                        return done();
                    })
            });


        })



    });





})
