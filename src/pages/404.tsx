import { Metadata } from "next";

import Layout from "@/components/layouts/layout-screen";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested board could not be found.",
};

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          This board doesn't exist
        </h1>
        <h2 className="text-xl text-gray-600">
          Please make sure you typed the URL correctly
        </h2>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
