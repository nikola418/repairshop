import { getTickets } from "@/lib";
import { isEmpty, isUndefined } from "lodash";
import { Metadata } from "next";
import TicketsSearch from "./TicketsSearch";
import TicketsTable from "./TicketsTable";

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
    isCompleted: isUndefined(search) || isEmpty(search) ? false : undefined,
  });

  return (
    <>
      <TicketsSearch searchParams={searchParams} />
      <TicketsTable data={results} />
    </>
  );
};

export default Tickets;
