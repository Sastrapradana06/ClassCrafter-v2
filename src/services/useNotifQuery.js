import { useMutation } from "@tanstack/react-query";
import { sendNotif } from "../utils/api";

export const useSendNotif = () => {
  const processQuery = useMutation({
    mutationFn: (data) => sendNotif(data),
    onError: (error) => {
      console.log(error, "from notif");
      return error;
    },
  });

  return processQuery;
};
