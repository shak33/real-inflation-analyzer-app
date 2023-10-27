import "@testing-library/jest-dom";
import { QueryClient } from "@tanstack/react-query";

global.queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

beforeEach(() => {
  jest.resetAllMocks();
  queryClient.clear();
});