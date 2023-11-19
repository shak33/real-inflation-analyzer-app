import { renderHook, act, waitFor } from '@testing-library/react';
import { useDebounce } from '@/hooks/utils/useDebounce';

describe('useDebounce', () => {
  it('should return the initial value', () => {
    const { result } = renderHook(() => useDebounce({ value: 'hello', delay: 500 }));
    expect(result.current).toBe('hello');
  });

  it('should debounce the value', async () => {
    jest.useFakeTimers();
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce({ value, delay }), {
      initialProps: { value: 'hello', delay: 500 },
    });

    expect(result.current).toBe('hello');

    act(() => {
      rerender({ value: 'world', delay: 500 });
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(result.current).toBe('world');
    })
  });
});