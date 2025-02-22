import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  ms: number;
  searchParam?: string;
};

const usePolling = ({ ms = 60000, searchParam }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(`interval running`);
      if (!searchParam) {
        console.log("refreshing");
        router.refresh();
      }
    }, ms);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ms, searchParam]);

  return [];
};
export default usePolling;
