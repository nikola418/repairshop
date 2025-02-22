import { Button } from "@/components";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { FC } from "react";

const Login: FC = () => (
  <main className="h-dvh flex flex-col items-center gap-6 p-4">
    <h1 className="text-4xl">Repair Shop</h1>
    <Button asChild>
      <LoginLink>Sign In</LoginLink>
    </Button>
  </main>
);

export default Login;
