import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";

import { useAuth } from "@/lib/use-auth";

interface ProtectedRouteProps {
  children: ReactNode;
  loadingComponent?: ReactNode;
  redirectUrl?: string;
}

const DefaultLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
  </div>
);

const ProtectedRoute = ({
  children,
  loadingComponent = <DefaultLoader />,
  redirectUrl = "/login",
}: ProtectedRouteProps) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(redirectUrl);
    }
  }, [user, loading, router, redirectUrl]);

  if (loading) {
    return <>{loadingComponent}</>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
