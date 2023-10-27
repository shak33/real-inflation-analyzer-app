import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

declare global {
  var queryClient: QueryClient;
  var wrapper: QueryClientProvider;
}