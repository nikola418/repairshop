import { SearchButton } from "@/components";
import { Input } from "@/components";
import Form from "next/form";

const CustomersSearch = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { search } = await searchParams;

  return (
    <Form action="/customers" className="flex gap-2 items-center">
      <Input
        name="search"
        type="text"
        placeholder="Search Customers"
        className="w-full"
        defaultValue={search}
        autoFocus
      />
      <SearchButton />
    </Form>
  );
};

export default CustomersSearch;
