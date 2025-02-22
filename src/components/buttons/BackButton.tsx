"use client";

import type { VariantProps } from "class-variance-authority";
import { FC } from "react";
import { Button, buttonVariants } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  className?: HTMLButtonElement["className"];
  variant?: VariantProps<typeof buttonVariants>["variant"];
};

const BackButton: FC<Props> = ({ variant, title, className }) => {
  const router = useRouter();

  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => router.back()}
      title={title}
      aria-label={title}
    >
      {title}
    </Button>
  );
};

export { BackButton };
