import 'cypress-file-upload';

describe('Функциональность инструмента Crop', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="upload-container"]').should('be.visible');
    cy.get('[data-testid="upload-container-button"]').attachFile(
      './../fixtures/2-test.jpeg'
    );
    cy.get('[data-testid="canvasMain"]').should('be.visible');
  });

  it('должен отобразиться компонент Crop при выборе соответствующего инструмента', () => {
    cy.get('[data-testid="icon-1"]').click();
    cy.get('[data-testid="crop-component"]').should('be.visible');
  });

  it('должны корректно обновляться значения X и Y при вводе в поля ввода', () => {
    cy.get('[data-testid="icon-1"]').click();
    cy.get('[data-testid="crop-component"]').should('be.visible');

    cy.get('[aria-label="X Coordinate"]').should('have.value', '0');
    cy.get('[aria-label="Y Coordinate"]').should('have.value', '0');

    cy.get('[aria-label="X Coordinate"]').clear().type('50');
    cy.get('[aria-label="Y Coordinate"]').clear().type('100');

    cy.get('[aria-label="X Coordinate"]').should('have.value', '50');
    cy.get('[aria-label="Y Coordinate"]').should('have.value', '100');

    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.window().then((win) => {
      const currentCropArea = win.store.getState().image.cropArea;
      // eslint-disable-next-line jest/valid-expect
      expect(currentCropArea.x).to.eq(50);
      // eslint-disable-next-line jest/valid-expect
      expect(currentCropArea.y).to.eq(100);
    });
  });

  it('кнопка "Сброс" должна сбрасывать значения X и Y в 0', () => {
    cy.get('[data-testid="icon-1"]').click();
    cy.get('[data-testid="crop-component"]').should('be.visible');

    cy.get('[aria-label="X Coordinate"]').clear().type('20');
    cy.get('[aria-label="Y Coordinate"]').clear().type('30');

    cy.get('[data-testid="reset-button"]').click();

    cy.get('[aria-label="X Coordinate"]').should('have.value', '0');
    cy.get('[aria-label="Y Coordinate"]').should('have.value', '0');

    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.window().then((win) => {
      const currentCropArea = win.store.getState().image.cropArea;
      // eslint-disable-next-line jest/valid-expect
      expect(currentCropArea.x).to.eq(0);
      // eslint-disable-next-line jest/valid-expect
      expect(currentCropArea.y).to.eq(0);
    });
  });

  it('нельзя установить отрицательные значения для X и Y', () => {
    cy.get('[data-testid="icon-1"]').click();

    cy.get('[aria-label="X Coordinate"]').clear().type('-10');
    cy.get('[aria-label="Y Coordinate"]').clear().type('-5');

    cy.get('[aria-label="X Coordinate"]').should('have.value', '0');
    cy.get('[aria-label="Y Coordinate"]').should('have.value', '0');

    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.window().then((win) => {
      const currentCropArea = win.store.getState().image.cropArea;
      // eslint-disable-next-line jest/valid-expect
      expect(currentCropArea.x).to.eq(0);
      // eslint-disable-next-line jest/valid-expect
      expect(currentCropArea.y).to.eq(0);
    });
  });
});
