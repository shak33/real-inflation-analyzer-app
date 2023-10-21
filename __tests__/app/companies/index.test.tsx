import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import CompaniesPage from "@/app/admin/companies/page";

const queryClient = new QueryClient();

describe('CompaniesPage', () => {
  it('should render the page title', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CompaniesPage />
      </QueryClientProvider>
    );

    expect(screen.getByText("Companies")).toBeInTheDocument();
  });

  it('should render the CompaniesForm component', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CompaniesPage />
      </QueryClientProvider>
    );

    expect(screen.getByTestId("companies-form")).toBeInTheDocument();
  });
});