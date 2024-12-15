import 'cypress-file-upload';

describe('Функциональность инструмента RemoveBgTool', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('authToken', 'validToken');
    });
    cy.visit('/');
    cy.reload();
    cy.get('[data-testid="upload-container"]').should('be.visible');

    cy.get('[data-testid="upload-container-button"]').attachFile(
      './../fixtures/2-test.jpeg'
    );
    cy.get('[data-testid="canvasMain"]').should('be.visible');

    cy.get('[data-testid="icon-5"]').should('be.visible').click();
    cy.get('[data-testid="remove-bg-component"]').should(
      'be.visible'
    );
  });

  it('должен отображать слайдер для изменения размера кисти', () => {
    cy.get('input[aria-label="brush size"]').should('be.visible');
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.window().then((win) => {
      const brushSize = win.store.getState().image.brushSize;
      // eslint-disable-next-line jest/valid-expect
      expect(brushSize).to.be.a('number');
    });
  });

  it('кнопка "Удалить фон" должна быть активна', () => {
    cy.contains('Удалить фон').should('not.be.disabled');
  });

  it('кнопка "Сброс" должна быть активна', () => {
    cy.contains('Сброс').should('not.be.disabled');
  });

  it('кнопка "Сброс" должна вернуть изображение к состоянию до удаления фона', () => {
    cy.contains('Удалить фон').click();

    cy.contains('Сброс').click();

    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.window().then((win) => {
      const { image, imageBeforeRemove } = win.store.getState().image;
      // eslint-disable-next-line jest/valid-expect
      expect(image).to.equal(imageBeforeRemove);
    });
  });
});
