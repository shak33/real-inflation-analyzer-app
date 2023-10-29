import { renderHook, waitFor } from "@testing-library/react";
import {
  useProducts,
  fetchProductById,
  fetchAllProducts,
} from "@/hooks/products/useGetProducts";

jest.mock("../../hooks/products/useGetProducts", () => ({
  fetchProductById: jest.fn(),
  fetchAllProducts: jest.fn(),
}));

describe("useProducts", () => {
  it("should fetch all products if no id is provided", async () => {
    const mockedResponse = {
      data: [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
      ],
    };

    (fetchAllProducts as jest.Mock).mockResolvedValueOnce(mockedResponse);

    const response = await fetchAllProducts();

    expect(response).toEqual(mockedResponse);
  });

  it("should fetch a product by id if an id is provided", async () => {
    const mockedResult = {
      data: { id: 1, name: "Product 1" },
    };

    (fetchProductById as jest.Mock).mockResolvedValueOnce(mockedResult);

    const response = await fetchProductById("1");

    expect(response).toEqual(mockedResult);
  });
});
