import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteImage,
  getUserLogin,
  updatePasswordUser,
  uploadFile,
} from "../utils/api";

export const useUserLogin = () => {
  return useQuery({
    queryKey: ["userLogin"],
    queryFn: () => {
      return getUserLogin();
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (data) => {
      return updatePasswordUser(data);
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useUploadUserProfile = () => {
  return useMutation({
    mutationFn: (data) => {
      return uploadFile(data);
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useDeleteImage = () => {
  return useMutation({
    mutationFn: (data) => {
      return deleteImage(data);
    },
    onError: (error) => {
      return error;
    },
  });
};

export function useInvalidate() {
  const query = useQueryClient();

  const invalidateListQuery = async (key) => {
    await query.invalidateQueries([key]);
  };

  return { invalidateListQuery };
}
