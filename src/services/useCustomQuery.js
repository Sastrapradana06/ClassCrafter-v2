import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserLogin } from "../utils/api";

export const useUserLogin = () => {
  return useQuery({
    queryKey: ["userLogin"],
    queryFn: () => {
      return getUserLogin();
    },
    staleTime: 10 * 60 * 1000,
  });
};

export function useInvalidate() {
  const query = useQueryClient();

  const invalidateListQuery = async (key) => {
    await query.invalidateQueries([key]);
  };

  return { invalidateListQuery };
}
