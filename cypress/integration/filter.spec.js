import 'cypress-file-upload';

describe('Функциональность инструмента Filters', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="upload-container"]').should('be.visible');
    cy.get('[data-testid="upload-container-button"]').attachFile(
      './../fixtures/2-test.jpeg'
    );
    cy.get('[data-testid="canvasMain"]').should('be.visible');

    cy.get('[data-testid="icon-4"]').should('be.visible').click();
    cy.get('[data-testid="filters-component"]').should('be.visible');
  });

  it('должны отображаться первые 4 фильтра', () => {
    for (let i = 0; i < 4; i++) {
      cy.get(`[data-testid="filter-${i}"]`).should('be.visible');
    }
  });

  it('должен применяться выбранный фильтр и обновляться состояние', () => {
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.window().then((win) => {
      // eslint-disable-next-line jest/valid-expect
      expect(win.store.getState().image.filter).to.eq('none');
    });

    cy.get('[data-testid="filter-3"]').click();

    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.window().then((win) => {
      // eslint-disable-next-line jest/valid-expect
      expect(win.store.getState().image.filter).to.eq('invert');
    });
  });

  it('должен корректно переключаться между несколькими фильтрами', () => {
    const filtersToCheck = [1, 2, 3, 0];

    filtersToCheck.forEach((filterIndex, idx) => {
      cy.get(`[data-testid="filter-${filterIndex}"]`).click();
      cy.window().then((win) => {
        const expectedFilter = win.store.getState().image.filter;
        const filterNames = [
          'none',
          'grayscale',
          'sepia',
          'invert',
          'outerspace',
          'refulgence',
          'pink',
        ];
        // eslint-disable-next-line jest/valid-expect
        expect(expectedFilter).to.eq(filterNames[filterIndex]);
      });
    });
  });
});
