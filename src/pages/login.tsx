import { FormEvent, useReducer, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Layout from "@/components/layouts/layout-screen";

import { useAuth } from "@/lib/use-auth";

interface Credentials {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();

  const { user, signIn } = useAuth();

  const [loading, setLoading] = useState(false);

  const [credentials, updateCredentials] = useReducer((prev: Credentials, next: { [key: string]: string }) => ({ ...prev, ...next }), { email: "", password: "" });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    signIn(credentials.email, credentials.password);
    setLoading(false);
  };

  if (user) {
    router.push("/board");
    return null;
  }

  return (
    <Layout>
      <main className="auth-page">
        <form onSubmit={handleSubmit} className="auth-form">
          <header className="auth-form-header">Log in to Trello</header>
          <input type="email" className="auth-form-input" value={credentials.email} onChange={(event) => updateCredentials({ email: event.target.value })} placeholder="Enter email" required />
          <input
            type="password"
            className="auth-form-input"
            value={credentials.password}
            onChange={(event) => updateCredentials({ password: event.target.value })}
            placeholder="Enter password"
            required
          />
          <button type="submit" className="auth-form-btn" disabled={loading || !credentials.email.length || !credentials.password.length}>
            {!loading ? "Sign In" : <p className="bi bi-arrow-clockwise"></p>}
          </button>

          <Link href={"/register"}>
            <button className="auth-form-link">Sign up for an account</button>
          </Link>
        </form>
      </main>
    </Layout>
  );
};

export default Login;
