import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Meme } from "@/types";

export const useUpdateMeme = (id: number, onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  const url = import.meta.env.VITE_API_URL;

  return useMutation({
    mutationFn: async (updatedData: Partial<Meme>) => {
      return await axios.put(`${url}/memes/${id}`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memes"] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      console.error("Updating error", error);
    },
  });
};
