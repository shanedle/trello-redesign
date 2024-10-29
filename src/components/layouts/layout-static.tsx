import { ReactNode } from "react";

import BaseLayout from "./base-layout";

const LayoutStatic = ({ children }: { children: ReactNode }) => {
  return <BaseLayout>{children}</BaseLayout>;
};

export default LayoutStatic;
