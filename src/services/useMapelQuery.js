import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addMapel,
  deleteMapelById,
  deleteMapelRecords,
  getAllMapel,
  updateMapel,
} from "../utils/api";

export const useDataMapel = () => {
  return useQuery({
    queryKey: ["dataMapel"],
    queryFn: () => getAllMapel(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useDeleteMapel = () => {
  const deleteMapel = useMutation({
    mutationFn: (id) => {
      return deleteMapelById(id);
    },
    onError: (error) => {
      return error;
    },
  });

  return deleteMapel;
};

export const useDeleteMapelRecords = () => {
  const deleteMapel = useMutation({
    mutationFn: (ids) => {
      return deleteMapelRecords(ids);
    },
    onError: (error) => {
      return error;
    },
  });

  return deleteMapel;
};

export const useTambahMapel = () => {
  const tambahMapel = useMutation({
    mutationFn: (data) => {
      return addMapel(data);
    },
    onError: (error) => {
      console.log(error, "from useBuyerMapel");
      return error;
    },
  });

  return tambahMapel;
};

export const useUpdateMapel = () => {
  const editMapel = useMutation({
    mutationFn: (data) => {
      return updateMapel(data);
    },
    onError: (error) => {
      return error;
    },
  });

  return editMapel;
};
