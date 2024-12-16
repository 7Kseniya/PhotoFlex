import 'cypress-file-upload';

describe('Функциональность инструмента Resize', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="upload-container"]').should('be.visible');
    cy.get('[data-testid="upload-container-button"]').attachFile(
      './../fixtures/2-test.jpeg'
    );
    cy.get('[data-testid="canvasMain"]').should('be.visible');

    cy.get('[data-testid="icon-3"]').should('be.visible').click();
    cy.get('[data-testid="resize-component"]').should('be.visible');
  });

  it('должны отображаться поля для ввода ширины и высоты', () => {
    cy.get('[data-testid="resize-width"]').should('be.visible');
    cy.get('[data-testid="resize-height"]').should('be.visible');
  });

  it('должны корректно меняться ширина и высота при вводе значений', () => {
    cy.get('[data-testid="resize-width"]').clear().type('800');
    cy.get('[data-testid="resize-height"]').clear().type('600');

    cy.get('[data-testid="resize-width"]').should(
      'have.value',
      '800'
    );
    cy.get('[data-testid="resize-height"]').should(
      'have.value',
      '600'
    );

    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.window().then((win) => {
      const { width, height } =
        win.store.getState().image.resizeDimensions;
      // eslint-disable-next-line jest/valid-expect
      expect(width).to.eq(800);
      // eslint-disable-next-line jest/valid-expect
      expect(height).to.eq(600);
    });
  });

  it('должны работать пресеты размеров', () => {
    cy.get('[data-testid="resize-16:9"]').click();
    cy.get('[data-testid="resize-width"]').should(
      'have.value',
      '900'
    );
    cy.get('[data-testid="resize-height"]').should(
      'have.value',
      '506'
    );
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.window().then((win) => {
      const { width, height } =
        win.store.getState().image.resizeDimensions;
      // eslint-disable-next-line jest/valid-expect
      expect(width).to.eq(900);
      // eslint-disable-next-line jest/valid-expect
      expect(height).to.eq(506);
    });

    cy.get('[data-testid="resize-4:4"]').click();
    cy.get('[data-testid="resize-width"]').should(
      'have.value',
      '600'
    );
    cy.get('[data-testid="resize-height"]').should(
      'have.value',
      '600'
    );
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.window().then((win) => {
      const { width, height } =
        win.store.getState().image.resizeDimensions;
      // eslint-disable-next-line jest/valid-expect
      expect(width).to.eq(600);
      // eslint-disable-next-line jest/valid-expect
      expect(height).to.eq(600);
    });
  });

  it('кнопка "Сброс" должна возвращать значения к оригинальным размерам', () => {
    cy.get('[data-testid="resize-width"]').clear().type('800');
    cy.get('[data-testid="resize-height"]').clear().type('600');

    cy.get('[data-testid="reset-button"]').click();

    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.window().then((win) => {
      const { width, height } =
        win.store.getState().image.originalImage;
      const { width: currentWidth, height: currentHeight } =
        win.store.getState().image.resizeDimensions;
      // eslint-disable-next-line jest/valid-expect
      expect(currentWidth).to.eq(width);
      // eslint-disable-next-line jest/valid-expect
      expect(currentHeight).to.eq(height);
      cy.get('[data-testid="resize-width"]').should(
        'have.value',
        String(width)
      );
      cy.get('[data-testid="resize-height"]').should(
        'have.value',
        String(height)
      );
    });
  });
});
