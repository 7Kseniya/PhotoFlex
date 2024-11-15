import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from '../src/components/header/header';
console.warn = jest.fn();

describe('Header Component', () => {
  const canvasRef = {
    current: {
      toDataURL: jest.fn().mockReturnValue('data:image/png;base64'),
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

  it('handleSave function works correctly', () => {
    render(
      <MemoryRouter>
        <Header canvasRef={canvasRef} />
      </MemoryRouter>
    );
    const saveIcon = screen.getByTestId('SaveIcon');
    fireEvent.click(saveIcon);

    expect(canvasRef.current.toDataURL).toHaveBeenCalledWith(
      'image/png'
    );
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
});
