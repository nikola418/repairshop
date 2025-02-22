import { getCustomers } from "@/lib";
import { Metadata } from "next";
import CustomerSearch from "./CustomerSearch";

export const metadata: Metadata = {
  title: "Customer Search",
};

const Customers = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { searchText } = await searchParams;

  if (!searchText) return <CustomerSearch />;

  const results = await getCustomers(searchText);

  return (
    <>
      <CustomerSearch />
      <p>{JSON.stringify(results)}</p>
    </>
  );
};

export default Customers;
