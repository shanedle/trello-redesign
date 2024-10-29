import { ReactNode } from "react";

import BaseLayout from "./base-layout";

const LayoutScreen = ({ children }: { children: ReactNode }) => {
  return (
    <BaseLayout className="absolute inset-0 flex flex-col overflow-hidden">
      {children}
    </BaseLayout>
  );
};

export default LayoutScreen;
