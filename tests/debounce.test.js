const { debounce } = require('../src/debounce');

describe('Debounce test', () => {
    test('should call function after timeout', () => {
        jest.useFakeTimers();
        const mockFn = jest.fn();
        const debouncedMockFn = debounce(mockFn);
        debouncedMockFn();
        jest.runAllTimers();

        expect(mockFn).toHaveBeenCalled();
    })
})