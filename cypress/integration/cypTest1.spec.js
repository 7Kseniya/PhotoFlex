describe('App Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should change button text on click', () => {
    cy.get('button').should('contain', 'Нажми на меня');
    cy.get('button').click();
    cy.get('button').should('contain', 'Не ура');
  });
  it('should have a visible button', () => {
    cy.get('button').should('be.visible');
  });
});
