import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignUpForm from "./signUpForm";

describe("SignUpForm", () => {
  describe("Rendering", () => {
    it("renders all form elements", () => {
      render(<SignUpForm />);

      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

      expect(
        screen.getByPlaceholderText(/create a password/i),
      ).toBeInTheDocument();

      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();

      expect(
        screen.getByRole("button", {
          name: /create account/i,
        }),
      ).toBeInTheDocument();
    });

    it("renders placeholders correctly", () => {
      render(<SignUpForm />);

      expect(
        screen.getByPlaceholderText(/enter your full name/i),
      ).toBeInTheDocument();

      expect(
        screen.getByPlaceholderText(/enter your email/i),
      ).toBeInTheDocument();

      expect(
        screen.getByPlaceholderText(/create a password/i),
      ).toBeInTheDocument();

      expect(
        screen.getByPlaceholderText(/confirm your password/i),
      ).toBeInTheDocument();
    });
  });

  describe("Validation", () => {
    it("shows validation messages when submitted empty", async () => {
      const user = userEvent.setup();

      render(<SignUpForm />);

      await user.click(
        screen.getByRole("button", {
          name: /create account/i,
        }),
      );

      expect(await screen.findByText(/full name must/i)).toBeInTheDocument();

      expect(await screen.findByText(/valid email/i)).toBeInTheDocument();

      expect(await screen.findByText(/password must/i)).toBeInTheDocument();
    });

    it("shows invalid email error", async () => {
      const user = userEvent.setup();

      render(<SignUpForm />);

      const emailInput = screen.getByLabelText(/email/i);

      await user.type(emailInput, "invalid-email");
      await user.tab();

      expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
    });

    it("shows password validation error", async () => {
      const user = userEvent.setup();

      render(<SignUpForm />);

      const passwordInput = screen.getByPlaceholderText(/create a password/i);

      await user.type(passwordInput, "123");
      await user.tab();

      expect(await screen.findByText(/password must/i)).toBeInTheDocument();
    });

    it("shows password mismatch error", async () => {
      const user = userEvent.setup();

      render(<SignUpForm />);

      await user.type(
        screen.getByPlaceholderText(/create a password/i),
        "Password123",
      );

      await user.type(
        screen.getByLabelText(/confirm password/i),
        "Password456",
      );

      await user.click(
        screen.getByRole("button", {
          name: /create account/i,
        }),
      );

      expect(
        await screen.findByText(/passwords do not match/i),
      ).toBeInTheDocument();
    });

    it("removes email error after entering valid email", async () => {
      const user = userEvent.setup();

      render(<SignUpForm />);

      const emailInput = screen.getByLabelText(/email/i);

      await user.type(emailInput, "wrong");
      await user.tab();

      expect(await screen.findByText(/valid email/i)).toBeInTheDocument();

      await user.clear(emailInput);

      await user.type(emailInput, "john@example.com");
      await user.tab();

      await waitFor(() => {
        expect(screen.queryByText(/valid email/i)).not.toBeInTheDocument();
      });
    });
  });

  describe("Input Behaviour", () => {
    it("updates full name correctly", async () => {
      const user = userEvent.setup();

      render(<SignUpForm />);

      const input = screen.getByLabelText(/full name/i);

      await user.type(input, "John Doe");

      expect(input).toHaveValue("John Doe");
    });

    it("updates email correctly", async () => {
      const user = userEvent.setup();

      render(<SignUpForm />);

      const input = screen.getByLabelText(/email/i);

      await user.type(input, "john@example.com");

      expect(input).toHaveValue("john@example.com");
    });

    it("updates password correctly", async () => {
      const user = userEvent.setup();

      render(<SignUpForm />);

      const input = screen.getByPlaceholderText(/create a password/i);

      await user.type(input, "Password123");

      expect(input).toHaveValue("Password123");
    });

    it("updates confirm password correctly", async () => {
      const user = userEvent.setup();

      render(<SignUpForm />);

      const input = screen.getByLabelText(/confirm password/i);

      await user.type(input, "Password123");

      expect(input).toHaveValue("Password123");
    });
  });

  describe("Submission", () => {
    it("allows form submission with valid values", async () => {
      const user = userEvent.setup();

      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      render(<SignUpForm />);

      await user.type(screen.getByLabelText(/full name/i), "John Doe");

      await user.type(screen.getByLabelText(/email/i), "john@example.com");

      await user.type(
        screen.getByPlaceholderText(/create a password/i),
        "Password123",
      );

      await user.type(
        screen.getByLabelText(/confirm password/i),
        "Password123",
      );

      await user.click(
        screen.getByRole("button", {
          name: /create account/i,
        }),
      );

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith({
          fullName: "John Doe",
          email: "john@example.com",
          password: "Password123",
          confirmPassword: "Password123",
        });
      });

      consoleSpy.mockRestore();
    });

    it("does not submit invalid form", async () => {
      const user = userEvent.setup();

      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      render(<SignUpForm />);

      await user.type(screen.getByLabelText(/email/i), "invalid-email");

      await user.click(
        screen.getByRole("button", {
          name: /create account/i,
        }),
      );

      await waitFor(() => {
        expect(consoleSpy).not.toHaveBeenCalled();
      });

      consoleSpy.mockRestore();
    });
  });

  describe("Accessibility", () => {
    it("has accessible labels", () => {
      render(<SignUpForm />);

      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

      expect(
        screen.getByPlaceholderText(/create a password/i),
      ).toBeInTheDocument();

      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    });

    it("has submit button", () => {
      render(<SignUpForm />);

      expect(
        screen.getByRole("button", {
          name: /create account/i,
        }),
      ).toHaveAttribute("type", "submit");
    });
  });
});
