describe('end2end functional tests', () => {
  it('should return home v3', async () => {
    const { body, status } = await global.testRequest.get('/');
    expect(status).toBe(200);
    expect(body).toStrictEqual({ msg: 'Home v3' });
  });
});
