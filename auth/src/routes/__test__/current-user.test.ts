import request from 'supertest';
import { app } from '../../app';

it('responds with details about the current user', async () => {
  // browser and postman both have functionality to automatically manage cookies and send it in follow up request but supertest doesn't
  // to circumvent this we create a helper function in setup.ds that returns a cookie upon signup
  const cookie = await global.signin();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
