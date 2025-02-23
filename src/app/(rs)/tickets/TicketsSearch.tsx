import { Input, SearchButton } from "@/components";
import Form from "next/form";

const TicketsSearch = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { search } = await searchParams;

  return (
    <Form action="/tickets" className="flex gap-2 items-center">
      <Input
        name="search"
        type="text"
        placeholder="Search Tickets"
        className="w-full"
        defaultValue={search}
        autoFocus
      />
      <SearchButton />
    </Form>
  );
};

export default TicketsSearch;
