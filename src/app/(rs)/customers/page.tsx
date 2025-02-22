import { getCustomers } from "@/lib";
import { Metadata } from "next";
import CustomersSearch from "./CustomersSearch";
import * as Sentry from "@sentry/nextjs";
import CustomersTable from "./CustomersTable";

export const metadata: Metadata = {
  title: "Customer Search",
};

const Customers = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { search } = await searchParams;

  const span = Sentry.startInactiveSpan({
    name: "getCustomers-2",
  });

  const results = await getCustomers({ search });
  span.end();

  return (
    <>
      <CustomersSearch searchParams={searchParams} />
      <CustomersTable data={results} />
    </>
  );
};

export default Customers;
