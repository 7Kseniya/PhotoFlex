export function createCanvasMock() {
    return {
        getContext: jest.fn(() => ({
            clearRect: jest.fn(),
            translate: jest.fn(),
            rotate: jest.fn(),
            drawImage: jest.fn(),
            setTransform: jest.fn(),
        })),
    };
}