"use client";

import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

function useGetCurrentLocation() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["current-location"],
    queryFn: async () => {
      const res = await axiosInstance.get("/client/current_location");
      if (res.status === 200) {
        return res.data?.data;
      } else {
        throw new Error("Failed to fetch sliders");
      }
    },
  });

  return { isLoading, data, error };
}

export default useGetCurrentLocation;
