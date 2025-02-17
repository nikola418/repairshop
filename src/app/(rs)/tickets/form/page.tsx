import BackButton from "@/components/back-button";
import { getCustomer } from "@/lib/queries/customers/get-customer";
import { getTicket } from "@/lib/queries/tickets/get-ticket";
import * as Sentry from "@sentry/nextjs";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | undefined }>;

const TicketFormPage = async ({
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => {
  try {
    const { customerId, ticketId } = await searchParams;

    if (!customerId && !ticketId) {
      return (
        <div className="m-auto flex flex-col items-center">
          <h2 className="text-2xl mb-2">
            Ticket ID or Customer ID required to load ticket form
          </h2>
          <BackButton title="Go Back" />
        </div>
      );
    }

    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <div className="m-auto flex flex-col items-center">
            <h2 className="text-2xl mb-2">
              Customer with ID #{customerId} not found!
            </h2>
            <BackButton title="Go Back" />
          </div>
        );
      }

      if (!customer.active) {
        return (
          <div className="m-auto flex flex-col items-center">
            <h2 className="text-2xl mb-2">
              Customer with ID #{customerId} is not active!
            </h2>
            <BackButton title="Go Back" />
          </div>
        );
      }
    }

    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId));

      if (!ticket) {
        return (
          <div className="m-auto flex flex-col items-center">
            <h2 className="text-2xl mb-2">
              Ticket with ID #{ticketId} not found!
            </h2>
            <BackButton title="Go Back" />
          </div>
        );
      }

      const customer = await getCustomer(ticket.customerId);

      console.log(customer, ticket);

      return <>Edit Ticket Form</>;
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
};

export default TicketFormPage;
