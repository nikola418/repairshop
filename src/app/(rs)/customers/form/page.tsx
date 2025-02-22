import { BackButton } from "@/components";
import { getCustomer } from "@/lib";
import * as Sentry from "@sentry/nextjs";
import CustomerForm from "./CustomerForm";
import { Metadata } from "next";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | undefined }>;

export const generateMetadata = async ({
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}): Promise<Metadata> => {
  const { customerId } = await searchParams;

  if (!customerId) {
    return { title: "New Customer" };
  }

  return { title: `Edit Customer #${customerId}` };
};

const CustomerFormPage = async ({
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => {
  try {
    const { customerId } = await searchParams;

    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <div className="m-auto flex flex-col items-center">
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found!
            </h2>
            <BackButton title="Go Back" variant="default" />
          </div>
        );
      }

      return <CustomerForm customer={customer} />;
    }

    return <CustomerForm />;
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
};

export default CustomerFormPage;
