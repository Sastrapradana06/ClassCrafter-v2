import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addSiswa,
  deleteSiswaById,
  getAllSiswa,
  updateSiswa,
} from "../utils/api";

export const useDataSiswa = () => {
  return useQuery({
    queryKey: ["dataSiswa"],
    queryFn: () => getAllSiswa(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useTambahSiswa = () => {
  const tambahSiswa = useMutation({
    mutationFn: (item) => {
      return addSiswa(item);
    },
    onError: (error) => {
      return error;
    },
  });

  return tambahSiswa;
};

export const useUpdateSiswa = () => {
  const editSiswa = useMutation({
    mutationFn: (item) => {
      return updateSiswa(item);
    },
    onError: (error) => {
      return error;
    },
  });

  return editSiswa;
};

export const useDeleteSiswa = () => {
  const deleteSiswa = useMutation({
    mutationFn: (id) => {
      return deleteSiswaById(id);
    },
    onError: (error) => {
      return error;
    },
  });

  return deleteSiswa;
};
