import axiosInstance from "@/utils/axiosInstance";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

function useGetCountries() {
  const lang = usePathname().split("/")[1];

  const { isLoading, data, error } = useQuery({
    queryKey: ["countries", lang],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/client/countries", {
          headers: {
            lang,
          },
        });

        if (res.status === 200) {
          return res.data?.data;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  return { isLoading, data, error };
}

export default useGetCountries;
