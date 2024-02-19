import useSWR from "swr";
import { fetcher } from "../fetcher";

export const useRepositories = (url: string, page: number) => {
    return useSWR(
        url ? `${url}?page=${page}&per_page=${10}` : null,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );
};