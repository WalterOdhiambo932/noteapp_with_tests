

const request = require('supertest');
const app = require('../walter_notes_app_backend/server'); 

describe('API Test Suite for Note Management Backend', () => {
    let authToken = '';
    let createdItemId = ''; 

    beforeAll(async () => {
        const res = await request(app)
            .post('/login')
            .send({ username: 'testuser', password: 'testpass' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        authToken = res.body.token;
        console.log('Login successful, token obtained for test suite.');
    });


    describe('Authentication (POST /login)', () => {
        test('Positive: Successful login with valid credentials - should return 200 and a token', async () => {
            const res = await request(app)
                .post('/login')
                .send({ username: 'testuser', password: 'testpass' });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
            expect(res.body.token).toEqual('fake-token'); 
            expect(res.body.message).toEqual('Login successful!');
        });

        test('Negative: Failed login with invalid credentials - should return 401', async () => {
            const res = await request(app)
                .post('/login')
                .send({ username: 'wronguser', password: 'wrongpassword' });

            expect(res.statusCode).toEqual(401);
            expect(res.body.message).toEqual('Invalid credentials');
        });

        test('Negative: Failed login with missing username - should return 401', async () => {
            const res = await request(app)
                .post('/login')
                .send({ password: 'testpass' });

            expect(res.statusCode).toEqual(401);
            expect(res.body.message).toEqual('Invalid credentials');
        });

        test('Negative: Failed login with missing password - should return 401', async () => {
            const res = await request(app)
                .post('/login')
                .send({ username: 'testuser' });

            expect(res.statusCode).toEqual(401);
            expect(res.body.message).toEqual('Invalid credentials');
        });
    });

    describe('Item Creation (POST /items)', () => {
        test('Positive: Successfully creating a new item - should return 201 and the new item', async () => {
            const newItem = {
                title: 'My New Test Item',
                content: 'This is the content of my new test item for creation.'
            };
            const res = await request(app)
                .post('/items')
                .set('Authorization', `Bearer ${authToken}`) 
                .send(newItem);

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.title).toEqual(newItem.title);
            expect(res.body.content).toEqual(newItem.content);
            createdItemId = res.body.id; 
            console.log(`Created new item with ID: ${createdItemId}`);
        });

        test('Negative: Attempting to create an item with missing title - should return 400', async () => {
            const res = await request(app)
                .post('/items')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ content: 'Content without title.' });

            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toEqual('Title and content are required.');
        });

        test('Negative: Attempting to create an item with missing content - should return 400', async () => {
            const res = await request(app)
                .post('/items')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ title: 'Title without content.' });

            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toEqual('Title and content are required.');
        });

        test('Negative: Attempting to create an item without authentication - should return 401', async () => {
            const res = await request(app)
                .post('/items')
                .send({ title: 'Unauthorized Item', content: 'Content.' }); 

            expect(res.statusCode).toEqual(401);
            expect(res.body).toEqual({}); 
        });
    });

    
    describe('Items Retrieval (GET /items, GET /items/:id)', () => {
        test('Positive: Fetching all items - should retrieve all items for an authenticated user', async () => {
            const res = await request(app)
                .get('/items')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body.length).toBeGreaterThanOrEqual(1); 
        });

        

        test('Negative: Fetching all items - should return 401 if no token is provided', async () => {
            const res = await request(app).get('/items'); 

            expect(res.statusCode).toEqual(401);
            expect(res.body).toEqual({}); 
        });

        test('Negative: Fetching all items - should return 401 for an invalid token', async () => {
            const res = await request(app)
                .get('/items')
                .set('Authorization', `Bearer invalid_token_xyz`);

            expect(res.statusCode).toEqual(401);
            expect(res.body).toEqual({});
        });
    });

    describe('Item Update (PUT /items/:id)', () => {
        let updateTargetId = ''; 

        beforeAll(async () => {
     
            if (!createdItemId) {
                const resPost = await request(app)
                    .post('/items')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send({ title: 'Item for Update Test', content: 'Initial content for update.' });
                expect(resPost.statusCode).toEqual(201);
                createdItemId = resPost.body.id;
            }
            updateTargetId = createdItemId; 
        });

        test('Positive: Successfully updating an existing item - should return 200 and the updated item', async () => {
            const updatedItemData = {
                title: 'Updated Test Item Title',
                content: 'Updated content for the test item.'
            };
            const res = await request(app)
                .put(`/items/${updateTargetId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send(updatedItemData);

            expect(res.statusCode).toEqual(200);
            expect(res.body.id).toEqual(updateTargetId);
            expect(res.body.title).toEqual(updatedItemData.title);
            expect(res.body.content).toEqual(updatedItemData.content);
        });

        test('Negative: Attempting to update a non-existent item - should return 404', async () => {
            const nonExistentId = 'nonExistentIdForUpdate';
            const res = await request(app)
                .put(`/items/${nonExistentId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({ title: 'Non Existent', content: 'Test' });

            expect(res.statusCode).toEqual(404);
            expect(res.body.message).toEqual('Note not found.');
        });

        test('Negative: Attempting to update an item with missing title - should return 400', async () => {
            const res = await request(app)
                .put(`/items/${updateTargetId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({ content: 'Missing Title Update' });

            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toEqual('Title and content are required.');
        });

        test('Negative: Attempting to update an item with missing content - should return 400', async () => {
            const res = await request(app)
                .put(`/items/${updateTargetId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({ title: 'Missing Content Update' });

            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toEqual('Title and content are required.');
        });

        test('Negative: Attempting to update an item without authentication - should return 401', async () => {
            const res = await request(app)
                .put(`/items/${updateTargetId}`)
                .send({ title: 'Unauthorized Update', content: 'Content.' });

            expect(res.statusCode).toEqual(401);
            expect(res.body).toEqual({});
        });
    });


    describe('Item Deletion (DELETE /items/:id)', () => {
        let deleteTargetId = ''; 

        beforeEach(async () => { 
            const resPost = await request(app)
                .post('/items')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ title: 'Item to Delete', content: 'Content to be deleted.' });
            expect(resPost.statusCode).toEqual(201);
            deleteTargetId = resPost.body.id;
        });

        test('Positive: Successfully deleting an existing item - should return 204 No Content', async () => {
            expect(deleteTargetId).toBeDefined();

            const res = await request(app)
                .delete(`/items/${deleteTargetId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.statusCode).toEqual(204);
            expect(res.body).toEqual({}); 

            const getRes = await request(app)
                .get('/items')
                .set('Authorization', `Bearer ${authToken}`);
            expect(getRes.statusCode).toEqual(200);
            expect(getRes.body.some(item => item.id === deleteTargetId)).toBeFalsy();
        });

        test('Negative: Attempting to delete a non-existent item - should return 404', async () => {
            const nonExistentId = 'nonExistentIdToDelete';
            const res = await request(app)
                .delete(`/items/${nonExistentId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.statusCode).toEqual(404);
            expect(res.body.message).toEqual('Note not found.');
        });

        test('Negative: Attempting to delete an item without authentication - should return 401', async () => {
            const res = await request(app)
                .delete(`/items/${deleteTargetId}`); 

            expect(res.statusCode).toEqual(401);
            expect(res.body).toEqual({});
        });
    });
});