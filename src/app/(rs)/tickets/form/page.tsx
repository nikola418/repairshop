import BackButton from "@/components/back-button";
import { SelectOptions } from "@/components/inputs/select-with-label";
import { getCustomer } from "@/lib/queries/customers/get-customer";
import { getTicket } from "@/lib/queries/tickets/get-ticket";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as kindeInit } from "@kinde/management-api-js";
import * as Sentry from "@sentry/nextjs";
import { Metadata } from "next";
import TicketForm from "./ticket-form";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | undefined }>;

export const generateMetadata = async ({
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}): Promise<Metadata> => {
  const { customerId, ticketId } = await searchParams;

  if (customerId) {
    return { title: `New Ticket for Customer #${customerId}` };
  } else if (ticketId) {
    return { title: `Edit Ticket #${ticketId}` };
  }

  return { title: "Missing Ticket or Customer ID" };
};

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

    const { getPermission, getUser } = getKindeServerSession();
    const [managerPermission, user] = await Promise.all([
      getPermission("manager"),
      getUser(),
    ]);

    const isManager = managerPermission?.isGranted;
    if (isManager) {
      kindeInit({
        kindeDomain: process.env.KINDE_M2M_DOMAIN!,
        clientId: process.env.KINDE_M2M_CLIENT_ID!,
        clientSecret: process.env.KINDE_M2M_CLIENT_SECRET!,
      });
    }

    const techs: SelectOptions[] | undefined = isManager
      ? (await Users.getUsers()).users?.map((user) => ({
          name: user.email ?? "Unknown",
          value: user.email ?? "Unknown",
        }))
      : [];

    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));

      if (!customer || !customer.active) {
        return (
          <div className="m-auto flex flex-col items-center">
            <h2 className="text-2xl mb-2">
              {`Customer with ID #${customerId} ${
                !customer ? "is not found" : "is not active"
              }!`}
            </h2>
            <BackButton title="Go Back" />
          </div>
        );
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

        if (isManager) {
          return (
            <TicketForm customer={customer} ticket={ticket} techs={techs} />
          );
        }

        const isEditable =
          user.email?.toLowerCase() === ticket.tech.toLowerCase();

        return (
          <TicketForm
            customer={customer}
            ticket={ticket}
            isEditable={isEditable}
          />
        );
      }

      if (!isManager) {
        return (
          <div className="m-auto flex flex-col items-center">
            <h2 className="text-2xl mb-2">
              No permission to create New Ticket
            </h2>
            <BackButton title="Go Back" />
          </div>
        );
      }

      return <TicketForm customer={customer} techs={techs} />;
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
};

export default TicketFormPage;
