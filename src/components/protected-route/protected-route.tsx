import { ReactNode } from "react";
import { useRouter } from "next/router";

import { useAuth } from "@/lib/use-auth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();
  if (!user) {
    router.push("/login");
    return null;
  } else return <>{children}</>;
};

export default ProtectedRoute;
