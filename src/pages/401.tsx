import { Metadata } from "next";

import Layout from "@/components/layouts/layout-screen";

export const metadata: Metadata = {
  title: "Unauthorized Access",
  description: "You do not have permission to access this board.",
};

const UnauthorizedPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Unauthorized Access
        </h1>
        <h2 className="text-xl text-gray-600">
          The owner of this board has set its permissions to private
        </h2>
      </div>
    </Layout>
  );
};

export default UnauthorizedPage;
