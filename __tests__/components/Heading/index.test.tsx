import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

import Heading from "@/components/Heading";

describe('Heading', () => {
  it('should render the heading', () => {
    render(
      <Heading
        title="Title"
        subtitle="Subtitle"
        center={true}
      />
    );

    expect(screen.getByText("Subtitle")).toBeInTheDocument();
  });
});