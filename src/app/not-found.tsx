import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The Page on the route is not found",
};

const NotFound = () => {
  return (
    <div className="px-2 w-full">
      <div className="mx-auto py-4 flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl">Page Not Found</h2>
        <Image
          src="/images/not-found-1024x1024.png"
          width="300"
          height="300"
          sizes="300px"
          alt="Not Found"
          priority
          title="Page Not Found"
        />
      </div>
    </div>
  );
};

export default NotFound;
