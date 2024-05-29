const request = require('supertest');
const app = require('../src/app');

describe('Auth Endpoints', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/users/register')
            .send({
                username: 'supriya',
                password: 'supriya123',
                email: 'supriya@gmail.com',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('user');
    });

    it('should login a user', async () => {
        const res = await request(app)
            .post('/users/login')
            .send({
                username: 'supriya',
                password: 'supriya123',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
