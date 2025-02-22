import { ReactNode } from "react";

type Props = {
  result: {
    data?: { message: string };
    serverError?: string;
    validationErrors?: Record<string, string[] | undefined>;
  };
};

const MessageBox = ({
  type,
  content,
}: {
  type: "success" | "error";
  content: ReactNode;
}) => (
  <div
    className={`bg-accent px-4 py-2 my-2 rounded-lg ${
      type === "error" ? "text-red-500" : ""
    }`}
  >
    {type === "success" ? "🎉" : "🚨"} {content}
  </div>
);

const ServerActionResponse = ({ result }: Props) => {
  const { data, serverError, validationErrors } = result;

  return (
    <>
      {data?.message && (
        <MessageBox type="success" content={`Success: ${data.message}`} />
      )}
      {serverError && <MessageBox type="error" content={serverError} />}
      {validationErrors && (
        <MessageBox
          type="error"
          content={Object.entries(validationErrors).map(([key, value]) => (
            <p key={key}>{`${key}: ${value}`}</p>
          ))}
        />
      )}
    </>
  );
};

export { ServerActionResponse };
