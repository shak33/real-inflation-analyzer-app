import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

global.queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

global.wrapper = ({ children }) => (
  <QueryClientProvider client={global.queryClient}>
    {children}
  </QueryClientProvider>
);

beforeEach(() => {
  jest.resetAllMocks();
  queryClient.clear();
});