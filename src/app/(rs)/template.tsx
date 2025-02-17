import { FC, PropsWithChildren } from "react";

const RSTemplate: FC<PropsWithChildren> = ({ children }) => (
  <div className="animate-appear">{children}</div>
);

export default RSTemplate;
