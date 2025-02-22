import { Header } from "@/components";
import { FC, PropsWithChildren } from "react";

const RSLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="mx-auto w-full max-w-7xl">
    <Header />
    <div className="px-4 py-2">{children}</div>
  </div>
);

export default RSLayout;
