import Layout from "components/layout/Layout";
import { NextPage } from "next";
import React from "react";

const Page: NextPage = () => {
  return (
    <Layout>
      <div className="container">
        <div className="grid place-content-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl my-8">Clients</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
