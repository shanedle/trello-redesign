import { ReactNode } from "react";

import Navbar from "@/components/navbars/navbar-regular";

interface BaseLayoutProps {
  children: ReactNode;
  className?: string;
}

const BaseLayout = ({ children, className = "" }: BaseLayoutProps) => {
  return (
    <div className={className}>
      <Navbar />
      {children}
    </div>
  );
};

export default BaseLayout;
