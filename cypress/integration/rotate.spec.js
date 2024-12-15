import 'cypress-file-upload';

describe('Функциональность инструмента Rotate', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="upload-container"]').should('be.visible');
    cy.get('[data-testid="upload-container-button"]').attachFile(
      './../fixtures/2-test.jpeg'
    );
    cy.get('[data-testid="canvasMain"]').should('be.visible');

    cy.get('[data-testid="icon-2"]').should('be.visible').click();
    cy.get('[data-testid="rotate-component"]').should('be.visible');
  });

  it('должны отображаться элементы управления поворотом', () => {
    cy.get('[data-testid="rotate-left-icon"]').should('be.visible');
    cy.get('[data-testid="rotate-right-icon"]').should('be.visible');
    cy.get('[data-testid="rotation-slider"]').should('be.visible');
    cy.get('[data-testid="reset-button"]').should('be.visible');
  });

  it('кнопка поворота влево должна изменять угол поворота на -90 градусов', () => {
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.window().then((win) => {
      // eslint-disable-next-line jest/valid-expect
      expect(win.store.getState().image.rotationAngle).to.eq(0);
    });

    cy.get('[data-testid="rotate-left-icon"]').click();
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.window().then((win) => {
      // eslint-disable-next-line jest/valid-expect
      expect(win.store.getState().image.rotationAngle).to.eq(270); // (0 - 90) % 360 = 270
    });

    cy.get('[data-testid="rotate-left-icon"]').click();
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.window().then((win) => {
      // eslint-disable-next-line jest/valid-expect
      expect(win.store.getState().image.rotationAngle).to.eq(180);
    });
  });

  it('кнопка поворота вправо должна изменять угол поворота на +90 градусов', () => {
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.window().then((win) => {
      // eslint-disable-next-line jest/valid-expect
      expect(win.store.getState().image.rotationAngle).to.eq(0);
    });

    cy.get('[data-testid="rotate-right-icon"]').click();
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.window().then((win) => {
      // eslint-disable-next-line jest/valid-expect
      expect(win.store.getState().image.rotationAngle).to.eq(90);
    });

    cy.get('[data-testid="rotate-right-icon"]').click();
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.window().then((win) => {
      // eslint-disable-next-line jest/valid-expect
      expect(win.store.getState().image.rotationAngle).to.eq(180);
    });
  });

  it('кнопка "Сброс" возвращает угол поворота к 0', () => {
    cy.get('[data-testid="rotate-right-icon"]').click();

    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.window().then((win) => {
      // eslint-disable-next-line jest/valid-expect
      expect(win.store.getState().image.rotationAngle).to.not.eq(0);
    });

    cy.get('[data-testid="reset-button"]').click();

    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.window().then((win) => {
      // eslint-disable-next-line jest/valid-expect
      expect(win.store.getState().image.rotationAngle).to.eq(0);
    });
  });
});
