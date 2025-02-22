import { getTickets } from "@/lib";
import { isUndefined } from "lodash";
import { Metadata } from "next";
import TicketSearch from "./TicketSearch";

export const metadata: Metadata = {
  title: "Ticket Search",
};

const Tickets = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { search } = await searchParams;

  const results = await getTickets({
    search,
    isCompleted: isUndefined(search) ? false : undefined,
  });

  return (
    <>
      <TicketSearch />
      <p>{JSON.stringify(results)}</p>
    </>
  );
};

export default Tickets;
