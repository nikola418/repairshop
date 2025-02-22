import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 bg-background/80">
      <div className="w-full min-h-dvh grid place-content-center">
        <LoaderCircle className="h-48 w-48 animate-spin text-foreground/20" />
      </div>
    </div>
  );
};

export default Loading;
