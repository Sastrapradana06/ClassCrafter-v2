import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteSiswaById } from "../utils/api";

export const useDataQuery = (key, api) => {
  return useQuery({
    queryKey: [key],
    queryFn: api,
    staleTime: 5 * 60 * 1000,
  });
};

export const useDeleteQuery = () => {
  const deleteData = useMutation(deleteSiswaById, {
    onError: (error) => {
      // Menangani error saat penghapusan siswa
      console.error("Error deleting student:", error);
      return error;
    },
  });

  return deleteData;
};

export function useInvalidate() {
  const query = useQueryClient();

  const invalidateListQuery = async (key) => {
    await query.invalidateQueries([key]);
  };

  return { invalidateListQuery };
}
