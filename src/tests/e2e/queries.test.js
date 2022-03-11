import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

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

});