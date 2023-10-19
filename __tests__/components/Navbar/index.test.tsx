import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Navbar } from "@/components/Navbar";

describe("Navbar", () => {
  describe('Not logged in user render', () => {
    it('should render navbar with login/register buttons', () => {
      render(<Navbar />);

      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Register')).toBeInTheDocument();
    });
  });

  describe('Interractions', () => {
    it('should show login modal when login button is clicked', () => {
      render(<Navbar />);

      userEvent.click(screen.getByText('Login'));
      expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('should show register modal when register button is clicked', () => {
      render(<Navbar />);

      userEvent.click(screen.getByText('Register'));
      expect(screen.getByText('Register')).toBeInTheDocument();
    });
  });
});