import { PropsWithChildren } from "react";

export const PageContainer = ({ children }: PropsWithChildren) => {
  return <div className="my-24">{children}</div>;
};
