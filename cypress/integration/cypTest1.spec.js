describe('service is available', function () {
  // eslint-disable-next-line jest/expect-expect
  it('should be available on localhost:3000', function () {
    cy.visit('http://localhost:3000');
  });
});
