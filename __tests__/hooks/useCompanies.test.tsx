import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import { useGetCompanies } from "@/hooks/companies/useGetCompanies";

jest.mock("axios");

describe("useCompanies", () => {
  const { wrapper } = global;

  it("should fetch companies successfully", async () => {
    const data = [
      { id: 1, name: "Company 1" },
      { id: 2, name: "Company 2" },
    ];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { data } });

    const { result } = renderHook(() => useGetCompanies(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
      expect(result.current.data).toEqual(data);
    });
  });

  it("should handle errors", async () => {
    const error = new Error("Failed to fetch companies");
    (axios.get as jest.Mock).mockRejectedValueOnce(() => Promise.reject(error));

    const { result } = renderHook(() => useGetCompanies(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(true);
      expect(result.current.data).toBe(undefined);
    });
  });
});
