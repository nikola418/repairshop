"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  searchParam: string | null;
  ms?: number;
};

const usePolling = ({ ms = 60_000, searchParam }: Props) => {
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
};
export { usePolling };
