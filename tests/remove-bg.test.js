import { render, screen, fireEvent } from '@testing-library/react';
import RemoveBgTool from '../src/components/tools/remove-bg-tool/remove-bg-tool';
import React from 'react';
import '@testing-library/jest-dom';
describe('RemoveBgTool', () => {
  it('changes brush size when slider value is changed', () => {
    const onBrushSizeChange = jest.fn();
    const initialBrushSize = 10;

    render(
      <RemoveBgTool
        brushSize={initialBrushSize}
        onBrushSizeChange={onBrushSizeChange}
        onRemoveBackground={jest.fn()}
        onReset={jest.fn()}
      />
    );
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '20' } });
    expect(onBrushSizeChange).toHaveBeenCalledWith(20);
  });

  it('calls onRemoveBackground when "Удалить фон" button is clicked', () => {
    const onRemoveBackground = jest.fn();
    const initialBrushSize = 10;

    render(
      <RemoveBgTool
        brushSize={initialBrushSize}
        onBrushSizeChange={jest.fn()}
        onRemoveBackground={onRemoveBackground}
        onReset={jest.fn()}
      />
    );
    const removeBgButton = screen.getByText('Удалить фон');
    fireEvent.click(removeBgButton);
    expect(onRemoveBackground).toHaveBeenCalled();
  });

  it('calls onReset when "Сброс" button is clicked', () => {
    const onReset = jest.fn();
    const initialBrushSize = 10;

    render(
      <RemoveBgTool
        brushSize={initialBrushSize}
        onBrushSizeChange={jest.fn()}
        onRemoveBackground={jest.fn()}
        onReset={onReset}
      />
    );
    const resetButton = screen.getByText('Сброс');
    fireEvent.click(resetButton);
    expect(onReset).toHaveBeenCalled();
  });
});
