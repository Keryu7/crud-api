import request from 'supertest';
import { server } from '../index';

describe('User API Tests', () => {
    afterAll((done) => {
        server.close(done);
    });
    it('should return an empty array for GET /users', async () => {
        const response = await request(server).get('/users');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('should create a new user with POST /users', async () => {
        const newUser = {
            username: 'U. Karatkevich',
            age: 43,
            hobbies: ['Book writer'],
        };

        const response = await request(server).post('/users').send(newUser);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.username).toBe(newUser.username);
        expect(response.body.age).toBe(newUser.age);
        expect(response.body.hobbies).toEqual(newUser.hobbies);
    });

    it('should get a user by ID with GET /users/{userId}', async () => {
        const newUser = {
            username: 'S. Aleksievich',
            age: 43,
            hobbies: ['Nobel laureate'],
        };

        const postResponse = await request(server).post('/users').send(newUser);
        const userId = postResponse.body.id;

        const response = await request(server).get(`/users/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(postResponse.body);
    });

    it('should update a user with PUT /users/{userId}', async () => {
        const newUser = {
            username: 'Old Username',
            age: 25,
            hobbies: ['Old hobby'],
        };

        const postResponse = await request(server).post('/users').send(newUser);
        const userId = postResponse.body.id;

        const updatedUser = {
            username: 'New Username',
            age: 30,
            hobbies: ['New hobby'],
        };

        const response = await request(server).put(`/users/${userId}`).send(updatedUser);
        expect(response.status).toBe(200);
        expect(response.body.username).toBe(updatedUser.username);
        expect(response.body.age).toBe(updatedUser.age);
        expect(response.body.hobbies).toEqual(updatedUser.hobbies);
    });

    it('should delete a user with DELETE /users/{userId}', async () => {
        const newUser = {
            username: 'User to Delete',
            age: 50,
            hobbies: ['Hobby to Delete'],
        };

        const postResponse = await request(server).post('/users').send(newUser);
        const userId = postResponse.body.id;

        const deleteResponse = await request(server).delete(`/users/${userId}`);
        expect(deleteResponse.status).toBe(204);

        const getResponse = await request(server).get(`/users/${userId}`);
        expect(getResponse.status).toBe(404);
    });
});