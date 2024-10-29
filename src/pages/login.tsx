import { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/layouts/layout-screen";
import { useAuth } from "@/lib/use-auth";

const Login = () => {
  const router = useRouter();
  const { user, signIn, signInWithGoogle, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      router.push("/board");
    }
  }, [user, router]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await signIn(email, password);
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <Layout>
      <main className="auth-page">
        <form onSubmit={handleSubmit} className="auth-form">
          <header className="auth-form-header">Log in to Trello</header>
          <input
            type="email"
            className="auth-form-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email"
            required
          />
          <input
            type="password"
            className="auth-form-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            required
          />
          <button
            type="submit"
            className="auth-form-btn"
            disabled={loading || !email.length || !password.length}
          >
            {!loading ? "Sign In" : <p className="bi bi-arrow-clockwise"></p>}
          </button>

          <div className="auth-form-divider">
            <span>or</span>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="auth-form-btn google-btn"
            disabled={loading}
          >
            <i className="bi bi-google"></i>
            Continue with Google
          </button>

          <Link href={"/register"} className="auth-form-link">
            Sign up for an account
          </Link>
        </form>
      </main>
    </Layout>
  );
};

export default Login;
