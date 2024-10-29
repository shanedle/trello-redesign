import { memo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAuth } from "@/lib/use-auth";

import type { NavbarProps } from "@/types/interfaces";

const Navbar = memo(({ className = "" }: NavbarProps) => {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getBrandLink = () => (user ? "/board" : "/");

  return (
    <nav
      className={`w-full bg-white p-5 shadow-sm ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex items-center justify-between gap-5 text-xl">
        <Link
          href={getBrandLink()}
          className="mr-10 text-2xl font-extrabold text-blue-900 hover:text-blue-800 transition-colors"
          aria-label="Trello Home"
        >
          Trello
        </Link>

        {loading ? (
          <div className="h-10 w-20 animate-pulse bg-gray-200 rounded" />
        ) : (
          <AuthButton user={user} onSignOut={handleSignOut} />
        )}
      </div>
    </nav>
  );
});

interface AuthButtonProps {
  user: ReturnType<typeof useAuth>["user"];
  onSignOut: () => Promise<void>;
}

const AuthButton = memo(({ user, onSignOut }: AuthButtonProps) => {
  if (!user) {
    return (
      <Link
        href="/login"
        className="btn navbar-link-btn hover:bg-blue-50 transition-colors"
      >
        Log in
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
      <span>Log out</span>
      <i className="bi bi-box-arrow-right text-lg" aria-hidden="true" />
    </button>
  );
});

Navbar.displayName = "Navbar";
AuthButton.displayName = "AuthButton";

export default Navbar;
