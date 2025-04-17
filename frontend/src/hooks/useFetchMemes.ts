import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Meme } from "@/types";

const fetchMemes = async (): Promise<Meme[]> => {
  const cachedMemes = localStorage.getItem("memes");

  const url = import.meta.env.VITE_API_URL;

  try {
    const res = await axios.get(`${url}/memes`);
    const freshMemes: Meme[] = res.data;

    if (cachedMemes) {
      const parsedCached: Meme[] = JSON.parse(cachedMemes);

      const isEqual =
        JSON.stringify(parsedCached) === JSON.stringify(freshMemes);

      if (isEqual) {
        return parsedCached;
      }
    }

    localStorage.setItem("memes", JSON.stringify(freshMemes));

    return freshMemes;
  } catch (error) {
    console.error("fetching error:", error);

    if (cachedMemes) {
      return JSON.parse(cachedMemes);
    }

    return [];
  }
};

export const useFetchMemes = () => {
  return useQuery({
    queryKey: ["memes"],
    queryFn: fetchMemes,
    refetchOnWindowFocus: true,
  });
};
