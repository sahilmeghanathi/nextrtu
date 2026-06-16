import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignInForm from "./signInForm";


describe("SignInForm", () => {
  describe("Rendering", () => {
    it("renders all form elements", () => {
      render(<SignInForm />);

      expect(
        screen.getByRole("textbox", {
          name: /email/i,
        }),
      ).toBeInTheDocument();

      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

      expect(
        screen.getByRole("button", {
          name: /sign in/i,
        }),
      ).toBeInTheDocument();
    });

    it("renders placeholders correctly", () => {
      render(<SignInForm />);

      expect(
        screen.getByPlaceholderText(/enter your email/i),
      ).toBeInTheDocument();

      expect(
        screen.getByPlaceholderText(/enter your password/i),
      ).toBeInTheDocument();
    });
  });

  describe("Validation", () => {
   it("shows required validation messages when submitted empty", async () => {
     const user = userEvent.setup();

     render(<SignInForm />);

     await user.click(
       screen.getByRole("button", {
         name: /sign in/i,
       }),
     );

     expect(
       await screen.findByText("Please enter a valid email address"),
     ).toBeInTheDocument();

     expect(
       await screen.findByText("Password must be at least 8 characters"),
     ).toBeInTheDocument();
   });

    it("shows invalid email error", async () => {
      const user = userEvent.setup();

      render(<SignInForm />);

      const emailInput = screen.getByLabelText(/email/i);

      await user.type(emailInput, "invalid-email");

      await user.tab();

      expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
    });

    it("removes email error after entering valid email", async () => {
      const user = userEvent.setup();

      render(<SignInForm />);

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

it("shows password validation error", async () => {
  const user = userEvent.setup();

  render(<SignInForm />);

  const passwordInput = screen.getByLabelText(/password/i);

  await user.type(passwordInput, "123");

  await user.tab();

  expect(
    await screen.findByText("Password must be at least 8 characters"),
  ).toBeInTheDocument();
});
  });

  describe("Input Behaviour", () => {
    it("updates email value correctly", async () => {
      const user = userEvent.setup();

      render(<SignInForm />);

      const emailInput = screen.getByLabelText(/email/i);

      await user.type(emailInput, "john@example.com");

      expect(emailInput).toHaveValue("john@example.com");
    });

    it("updates password value correctly", async () => {
      const user = userEvent.setup();

      render(<SignInForm />);

      const passwordInput = screen.getByLabelText(/password/i);

      await user.type(passwordInput, "Password123");

      expect(passwordInput).toHaveValue("Password123");
    });
  });

  describe("Submission", () => {
    it("allows form submission with valid values", async () => {
      const user = userEvent.setup();

      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      render(<SignInForm />);

      await user.type(screen.getByLabelText(/email/i), "john@example.com");

      await user.type(screen.getByLabelText(/password/i), "Password123");

      await user.click(
        screen.getByRole("button", {
          name: /sign in/i,
        }),
      );

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith({
          email: "john@example.com",
          password: "Password123",
        });
      });

      consoleSpy.mockRestore();
    });

    it("does not submit invalid form", async () => {
      const user = userEvent.setup();

      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      render(<SignInForm />);

      await user.type(screen.getByLabelText(/email/i), "wrong-email");

      await user.click(
        screen.getByRole("button", {
          name: /sign in/i,
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
      render(<SignInForm />);

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it("has submit button", () => {
      render(<SignInForm />);

      expect(
        screen.getByRole("button", {
          name: /sign in/i,
        }),
      ).toHaveAttribute("type", "submit");
    });
  });
});
