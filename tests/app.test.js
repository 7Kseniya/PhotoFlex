import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import App from './../src/components/app/app';
import ImageRotate from './../src/components/editor-actions/image-rotate';
import ToolBar from './../src/components/tool-bar/tool-bar';
import MainPage from '../src/components/pages/main-page/main-page';
import RegisterModal from '../src/components/modal/register-modal/register-modal';
import LoginModal from '../src/components/modal/login-modal/login-modal';

test('App renders MainPage component', () => {
  render(<App />);
  const mainPageElement = screen.getByTestId('main-page');
  expect(mainPageElement).toBeInTheDocument();
});

test('MainPage updates rotation when Rotate icon is clicked', () => {
  render(<MainPage />);

  const rotateIcon = screen.getByTestId('icon-2');

  fireEvent.click(rotateIcon);

  const imageRotateCanvas = screen.getByTestId('image-rotate');
  expect(imageRotateCanvas).toBeInTheDocument();
});

describe('Editor-actions tools', () => {
  it('ImageRotate Component correctly sets canvas dimensions based on rotation', async () => {
    global.Image = class {
      constructor() {
        setTimeout(() => {
          if (this.onload) this.onload();
        }, 0);
      }
    };

    const { container } = render(
      <ImageRotate imageSrc="placeholder.jpeg" rotation={90} />
    );
    const canvas = container.querySelector('canvas');

    await waitFor(() => {
      expect(canvas.width).toBeGreaterThan(0);
      expect(canvas.height).toBeGreaterThan(0);
    });
  });
});

describe('ToolBar component', () => {
  it('should render all icons', () => {
    const { getByTestId } = render(<ToolBar onRotate={jest.fn()} />);

    for (let i = 0; i < 8; i++) {
      expect(getByTestId(`icon-${i}`)).toBeInTheDocument();
    }
  });

  it('should call onRotate action when Rotate icon is clicked', () => {
    const mockRotate = jest.fn();
    const { getByTestId } = render(<ToolBar onRotate={mockRotate} />);

    fireEvent.click(getByTestId('icon-2'));

    expect(mockRotate).toHaveBeenCalled();
  });

  it('should not call action for icons without action', () => {
    const mockRotate = jest.fn();
    const { getByTestId } = render(<ToolBar onRotate={mockRotate} />);

    fireEvent.click(getByTestId('icon-0'));

    expect(mockRotate).not.toHaveBeenCalled();
  });
});

describe('LoginModal', () => {
  const mockOnSignUpClick = jest.fn();
  const mockOnSubmitted = jest.fn();

  beforeEach(() => {
    render(
      <LoginModal
        onSignUpClick={mockOnSignUpClick}
        onSubmited={mockOnSubmitted}
      />
    );
  });
});
