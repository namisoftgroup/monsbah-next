"use client";

import clientAxios from "@/libs/axios/clientAxios";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

function useGetCategories() {
  const lang = useLocale().split("-")[1];
  console.log("iam in the get Categories here ");

  const { isLoading, data, error } = useQuery({
    queryKey: ["categories", lang],
    queryFn: async () => {
      try {
        const res = await clientAxios.get("/client/categories", {
          headers: {
            lang,
          },
        });

        if (res.status === 200) {
          console.log(res);

          return res.data?.data?.data;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  return { isLoading, data, error };
}

export default useGetCategories;
