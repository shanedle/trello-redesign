import { ReactNode } from "react";

import Navbar from "@/components/navbar/regular";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
