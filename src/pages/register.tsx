import { FormEvent, useReducer, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Layout from "@/components/layouts/layout-screen";

import { useAuth } from "@/lib/use-auth";

interface Credentials {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const router = useRouter();

  const { user, signUp } = useAuth();

  const [loading, setLoading] = useState(false);

  const [credentials, updateCredentials] = useReducer(
    (prev: Credentials, next: { [key: string]: string }) => ({
      ...prev,
      ...next,
    }),
    {
      name: "",
      email: "",
      password: "",
    }
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    signUp(credentials.name, credentials.email, credentials.password);
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
          <header className="auth-form-header">Sign up for your account</header>
          <input
            type="name"
            className="auth-form-input"
            value={credentials.name}
            onChange={(event) =>
              updateCredentials({ name: event.target.value })
            }
            placeholder="Enter name"
            maxLength={15}
            required
          />
          <input
            type="email"
            className="auth-form-input"
            value={credentials.email}
            onChange={(event) =>
              updateCredentials({ email: event.target.value })
            }
            placeholder="Enter email"
            required
          />
          <input
            type="password"
            className="auth-form-input"
            value={credentials.password}
            onChange={(event) =>
              updateCredentials({ password: event.target.value })
            }
            placeholder="Enter password"
            required
          />
          <button
            type="submit"
            className="auth-form-btn"
            disabled={
              loading ||
              !credentials.name.length ||
              !credentials.email.length ||
              !credentials.password.length
            }
          >
            {!loading ? "Submit" : <p className="bi bi-arrow-clockwise"></p>}
          </button>

          <Link href={"/login"}>
            <button className="auth-form-link">
              Already have an account? Log In
            </button>
          </Link>
        </form>
      </main>
    </Layout>
  );
};

export default Register;
