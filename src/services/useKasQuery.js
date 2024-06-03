import { useMutation, useQuery } from "@tanstack/react-query";
import { addKas, deleteKasById, getAllKas, updateKas } from "../utils/api";

export const useDataKas = () => {
  return useQuery({
    queryKey: ["dataKas"],
    queryFn: () => getAllKas(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useTambahKas = () => {
  const tambah = useMutation({
    mutationFn: (data) => {
      return addKas(data);
    },
    onError: (error) => {
      return error;
    },
  });

  return tambah;
};

export const useUpdateKas = () => {
  const update = useMutation({
    mutationFn: (data) => {
      return updateKas(data);
    },
    onError: (error) => {
      return error;
    },
  });
  return update;
};

export const useDeleteKas = () => {
  const deleteKas = useMutation({
    mutationFn: (id) => {
      return deleteKasById(id);
    },
    onError: (error) => {
      return error;
    },
  });
  return deleteKas;
};
