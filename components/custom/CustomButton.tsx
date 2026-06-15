"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CustomButtonProps {
  loading?: boolean;
  loadingText?: string;

  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;

  fullWidth?: boolean;

  labelClassName?: string;

  children: React.ReactNode;
  className?: string;
  disabled?: boolean;

}

export function CustomButton({
  loading = false,
  loadingText,

  startIcon,
  endIcon,

  fullWidth = false,

  labelClassName,

  className,
  disabled,
  children,

  ...props
}: CustomButtonProps) {
  return (
    <Button
      className={cn(fullWidth && "w-full", className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />

          <span className={labelClassName}>{loadingText ?? children}</span>
        </>
      ) : (
        <>
          {startIcon}

          <span className={labelClassName}>{children}</span>

          {endIcon}
        </>
      )}
    </Button>
  );
}
