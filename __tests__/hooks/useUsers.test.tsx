import { renderHook, waitFor } from "@testing-library/react";
import axios from 'axios';
import { useUsers } from '@/hooks/useUsers';

jest.mock('axios');

describe('useUsers', () => {
  const { wrapper } = global;

  it('should fetch users successfully', async () => {
    const data = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { data } });

    const { result } = renderHook(() => useUsers(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
      expect(result.current.data).toEqual(data);
    })
  });

  it('should handle errors', async () => {
    const error = new Error('Failed to fetch users');
    (axios.get as jest.Mock).mockRejectedValueOnce(() => Promise.reject(error));

    const { result } = renderHook(() => useUsers(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(true);
      expect(result.current.data).toBe(undefined);
    });
  });
});