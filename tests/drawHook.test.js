import { render, act } from '@testing-library/react';
import React from 'react';
import useImageDrawer from '../src/hooks/drawHook';

console.warn = jest.fn();
global.HTMLCanvasElement.prototype.getContext = jest
  .fn()
  .mockReturnValue({
    clearRect: jest.fn(),
    drawImage: jest.fn(),
    beginPath: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
    translate: jest.fn(),
    rotate: jest.fn(),
    globalCompositeOperation: '',
    filter: '',
  });

describe('useImageDrawer', () => {
  let canvasRef;
  let image;
  let originalImage;

  beforeEach(() => {
    canvasRef = { current: document.createElement('canvas') };
    image = new Image();
    image.src = 'path_to_image';
    originalImage = image;
  });

  it('should call drawImage function when the hook is used', () => {
    const Component = () => {
      useImageDrawer({
        canvasRef,
        image,
        originalImage,
        showOriginal: true,
        filter: 'none',
        resizeDimensions: { width: 500, height: 500 },
        rotationAngle: 45,
        mask: [],
        appliedMask: [],
        brushSize: 10,
      });
      return <canvas ref={canvasRef}></canvas>;
    };

    render(<Component />);

    act(() => {});

    const ctx = canvasRef.current.getContext('2d');
    expect(ctx.drawImage).toHaveBeenCalledTimes(1);
  });

  it('should apply grayscale filter when filter is set to grayscale', () => {
    const Component = () => {
      useImageDrawer({
        canvasRef,
        image,
        originalImage,
        showOriginal: false,
        filter: 'grayscale',
        resizeDimensions: { width: 500, height: 500 },
        rotationAngle: 45,
        mask: [],
        appliedMask: [],
        brushSize: 10,
      });
      return <canvas ref={canvasRef}></canvas>;
    };

    render(<Component />);

    act(() => {});

    const ctx = canvasRef.current.getContext('2d');
    expect(ctx.filter).toBe('grayscale(100%)');
  });

  it('should apply no filter when filter is set to none', () => {
    const Component = () => {
      useImageDrawer({
        canvasRef,
        image,
        originalImage,
        showOriginal: false,
        filter: 'none',
        resizeDimensions: { width: 500, height: 500 },
        rotationAngle: 45,
        mask: [],
        appliedMask: [],
        brushSize: 10,
      });
      return <canvas ref={canvasRef}></canvas>;
    };

    render(<Component />);

    act(() => {});

    const ctx = canvasRef.current.getContext('2d');
    expect(ctx.filter).toBe('none');
  });

  it('should draw mask when mask array is provided', () => {
    const mask = [{ x: 100, y: 100, brushSize: 10 }];
    const Component = () => {
      useImageDrawer({
        canvasRef,
        image,
        originalImage,
        showOriginal: false,
        filter: 'none',
        resizeDimensions: { width: 500, height: 500 },
        rotationAngle: 45,
        mask,
        appliedMask: [],
        brushSize: 10,
      });
      return <canvas ref={canvasRef}></canvas>;
    };

    render(<Component />);

    act(() => {});

    const ctx = canvasRef.current.getContext('2d');
    expect(ctx.beginPath).toHaveBeenCalledTimes(1);
    expect(ctx.arc).toHaveBeenCalledTimes(1);
  });

  it('should correctly apply rotation when rotationAngle is provided', () => {
    const Component = () => {
      useImageDrawer({
        canvasRef,
        image,
        originalImage,
        showOriginal: false,
        filter: 'none',
        resizeDimensions: { width: 500, height: 500 },
        rotationAngle: 90,
        mask: [],
        appliedMask: [],
        brushSize: 10,
      });
      return <canvas ref={canvasRef}></canvas>;
    };

    render(<Component />);

    act(() => {});

    const ctx = canvasRef.current.getContext('2d');
    expect(ctx.rotate).toHaveBeenCalledWith((90 * Math.PI) / 180);
  });
});
