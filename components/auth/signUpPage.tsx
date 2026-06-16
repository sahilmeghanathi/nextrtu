"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { CustomInput } from "@/components/custom/FormInput";
import { CustomButton } from "@/components/custom/CustomButton";
import { SignUpFormValues, signUpSchema } from "@/src/validations/signup.schema";



export default function SignUpForm() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <CustomInput
          control={form.control}
          name="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          required
        />

        <CustomInput
          control={form.control}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />

        <CustomInput
          control={form.control}
          name="password"
          label="Password"
          type="password"
          placeholder="Create a password"
          required
        />

        <CustomInput
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          required
        />

        <CustomButton
          className="w-full bg-primary-foreground text-background h-12 rounded-full text-lg"
          loading={form.formState.isSubmitting}
          loadingText="Creating Account..."
        >
          Create Account
        </CustomButton>
      </form>
    </Form>
  );
}
