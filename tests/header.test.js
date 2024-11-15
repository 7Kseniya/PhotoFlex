import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from '../src/components/header/header';
import { saveAs } from 'file-saver';

jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

console.warn = jest.fn();

describe('Header Component', () => {
  const canvasRef = {
    current: {
      width: 800,
      height: 600,
      toDataURL: jest.fn((format) =>
        format === 'image/png'
          ? 'data:image/png;base64'
          : `data:${format};base64`
      ),
    },
  };
  it('renders Header component', () => {
    render(
      <MemoryRouter>
        <Header canvasRef={canvasRef} />
      </MemoryRouter>
    );
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
  });
  it('renders logo image', () => {
    render(
      <MemoryRouter>
        <Header canvasRef={canvasRef} />
      </MemoryRouter>
    );
    const logoElement = screen.getByAltText('logo');
    expect(logoElement).toBeInTheDocument();
  });

  it('renders RedoIcon components', () => {
    render(
      <MemoryRouter>
        <Header canvasRef={canvasRef} />
      </MemoryRouter>
    );
    const redoIcons = screen.getAllByTestId('RedoIcon');
    expect(redoIcons.length).toBe(2);
  });

  it('handleSave function works correctly for PNG format', () => {
    render(
      <MemoryRouter>
        <Header canvasRef={canvasRef} />
      </MemoryRouter>
    );
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'png' } });
    const saveIcon = screen.getByTestId('SaveIcon');
    fireEvent.click(saveIcon);

    expect(canvasRef.current.toDataURL).toHaveBeenCalledWith(
      'image/png'
    );
  });

  it('handleSave function works correctly for SVG format', () => {
    render(
      <MemoryRouter>
        <Header canvasRef={canvasRef} />
      </MemoryRouter>
    );
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'svg' } });
    const saveIcon = screen.getByTestId('SaveIcon');
    fireEvent.click(saveIcon);
    expect(saveAs).toHaveBeenCalledWith(
      expect.any(Blob),
      'photoflex.svg'
    );
  });

  it('renders all format options correctly', () => {
    render(
      <MemoryRouter>
        <Header canvasRef={canvasRef} />
      </MemoryRouter>
    );
    const selectElement = screen.getByRole('combobox');
    const options = Array.from(selectElement.options).map(
      (option) => option.value
    );
    expect(options).toEqual(['png', 'jpeg', 'jpg', 'webp', 'svg']);
  });
});
