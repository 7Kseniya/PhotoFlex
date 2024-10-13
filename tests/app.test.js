import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import App from './../src/components/app/app';
import ImageRotate from './../src/components/editor-actions/image-rotate';
test('renders MainPage component', () => {
  render(<App />);
  const mainPageElement = screen.getByTestId('main-page');
  expect(mainPageElement).toBeInTheDocument();
});

test('ImageRotate Component correctly sets canvas dimensions based on rotation', async () => {
  global.Image = class {
    constructor() {
      setTimeout(() => {
        if (this.onload) this.onload();
      }, 0);
    }
  };

  const { container } = render(
    <ImageRotate imageSrc="test-image.jpg" rotation={45} />
  );
  const canvas = container.querySelector('canvas');

  await waitFor(() => {
    expect(canvas.width).toBeGreaterThan(0);
    expect(canvas.height).toBeGreaterThan(0);
  });
});
