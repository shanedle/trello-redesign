import { Metadata } from "next";
import Layout from "@/components/layouts/layout-screen";

export const metadata: Metadata = {
  title: "Server Error",
  description: "An unexpected error occurred on the server.",
};

const ServerErrorPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Internal Server Error
        </h1>
        <h2 className="text-xl text-gray-600">
          Something went wrong on our servers. Please try again later.
        </h2>
      </div>
    </Layout>
  );
};

export default ServerErrorPage;
