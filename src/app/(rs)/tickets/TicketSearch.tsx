import { SearchButton } from "@/components";
import { Input } from "@/components";
import Form from "next/form";

const TicketSearch = () => {
  return (
    <Form action="/tickets" className="flex gap-2 items-center">
      <Input
        name="search"
        type="text"
        placeholder="Search Tickets"
        className="w-full"
      />
      <SearchButton />
    </Form>
  );
};

export default TicketSearch;
