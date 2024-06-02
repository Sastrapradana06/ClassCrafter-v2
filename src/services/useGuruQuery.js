import { useMutation, useQuery } from "@tanstack/react-query";
import { addGuru, deleteGuruById, getAllGuru, updateGuru } from "../utils/api";

export const useDataGuru = () => {
  return useQuery({
    queryKey: ["dataGuru"],
    queryFn: () => getAllGuru(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useDeleteGuruQuery = () => {
  const deleteGuru = useMutation({
    mutationFn: (id) => {
      return deleteGuruById(id);
    },
    onError: (error) => {
      return error;
    },
  });

  return deleteGuru;
};

export const useTambahGuruQuery = () => {
  const buyerGuru = useMutation({
    mutationFn: (data) => {
      return addGuru(data);
    },
    onError: (error) => {
      console.log(error, "from useBuyerGuruQuery");
      return error;
    },
  });

  return buyerGuru;
};

export const useUpdateGuruQuery = () => {
  const processQuery = useMutation({
    mutationFn: (data) => {
      return updateGuru(data);
    },
    onError: (error) => {
      console.log(error, "from useprocessQueryQuery");
      return error;
    },
  });

  return processQuery;
};
