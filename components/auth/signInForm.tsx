"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { SignInFormValues, signInSchema } from "@/src/validations/signin.schema";
import { CustomInput } from "@/components/custom/FormInput";
import { CustomButton } from "@/components/custom/CustomButton";

export default function SignInForm() {

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
          placeholder="Enter your password"
          required
        />

        <CustomButton
        type="submit"
          className="w-full bg-primary-foreground text-background h-12 rounded-full text-lg"
          loading={form.formState.isSubmitting}
          loadingText="Signing In..."
        >
          Sign In
        </CustomButton>
      </form>
    </Form>
  );
  
}
