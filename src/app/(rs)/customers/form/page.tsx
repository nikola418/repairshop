import BackButton from "@/components/back-button";
import { getCustomer } from "@/lib/queries/customers/get-customer";
import * as Sentry from "@sentry/nextjs";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | undefined }>;

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
      return <></>;
    }

    return <>new customer</>;
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
};

export default CustomerFormPage;
