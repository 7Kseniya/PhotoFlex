describe('service is available', function () {
  // eslint-disable-next-line jest/expect-expect
  it('should be available on GithubPages', function () {
    cy.visit('https://webdevPhotoFlex.github.io/PhotoFlex');
  });
});
