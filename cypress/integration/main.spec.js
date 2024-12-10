describe('Функциональность главной страницы', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('должна корректно отображаться главная страница', () => {
    cy.get('[data-testid="header"]').should('be.visible');
    cy.get('[data-testid="tools-component"]').should('be.visible');
    cy.get('[data-testid="upload-container"]').should('be.visible');
  });

  it('должно отображаться модальное окно логина при клике на кнопку "Персональный аккаунт"', () => {
    cy.get('[data-testid="PersonAddIcon"]').click();
    cy.get('[data-testid="login-modal"]').should('be.visible');
  });

  it('должно отображаться модальное окно регистрации при переключении на регистрацию', () => {
    cy.get('[data-testid="PersonAddIcon"]').click();
    cy.get('[data-testid="login-modal"]').should('be.visible');
    cy.get(
      '[data-testid="login-modal"] [data-testid="signup-link"]'
    ).click();
    cy.get('[data-testid="register-modal"]').should('be.visible');
  });

  it('должно переключаться обратно на модальное окно логина при клике на "Войти"', () => {
    cy.get('[data-testid="PersonAddIcon"]').click();
    cy.get('[data-testid="login-modal"]').should('be.visible');
    cy.get(
      '[data-testid="login-modal"] [data-testid="signup-link"]'
    ).click();
    cy.get('[data-testid="register-modal"]').should('be.visible');
    cy.get(
      '[data-testid="register-modal"] [data-testid="signin-link"]'
    ).click();
    cy.get('[data-testid="login-modal"]').should('be.visible');
  });

  it('должен отображаться инструмент Tunes при нажатии на иконку с активным инструментом 0', () => {
    cy.get('[data-testid="tunes-component"]').click();
    cy.get('[data-testid="tunes-component"]').should('be.visible');
  });
});
