import App from '@src/app';
import supertest from 'supertest';

beforeAll(() => {
  const app = new App();
  app.init();
  global.testRequest = supertest(app.getApp());
});
