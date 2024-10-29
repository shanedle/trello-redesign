import { memo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/use-auth";

type NavbarProps = {
  className?: string;
};

type User = ReturnType<typeof useAuth>["user"];

export default function Navbar({ className = "" }: NavbarProps) {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const brandLink = user ? "/board" : "/";

  return (
    <nav
      className={`w-full bg-white p-5 shadow-sm ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex items-center justify-between gap-5 text-xl">
        <Link
          href={brandLink}
          className="mr-10 text-2xl font-extrabold text-blue-900 hover:text-blue-800 transition-colors"
          aria-label="Trello Home"
        >
          Trello
        </Link>

        {loading ? (
          <div
            className="h-10 w-20 animate-pulse bg-gray-200 rounded"
            aria-label="Loading"
          />
        ) : (
          <AuthButton user={user} onSignOut={handleSignOut} />
        )}
      </div>
    </nav>
  );
}

type AuthButtonProps = {
  user: User;
  onSignOut: () => Promise<void>;
};

const AuthButton = memo(function AuthButton({
  user,
  onSignOut,
}: AuthButtonProps) {
  if (!user) {
    return (
      <Link
        href="/login"
        className="btn navbar-link-btn hover:bg-blue-50 transition-colors"
      >
        Log In
      </Link>
    );
  }

  return (
    <button
      className="btn navbar-link-btn hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
      onClick={onSignOut}
      type="button"
      aria-label="Sign out"
    >
      <span>Log Out</span>
      <i className="bi bi-box-arrow-right text-lg" aria-hidden="true" />
    </button>
  );
});
