import useSWR from "swr";
import { fetchWithPagination } from "../fetcher";

export const useRepositories = (url: string, page: number) => {
    return useSWR(
        url ? `${url}?page=${page}&per_page=${10}` : null,
        fetchWithPagination,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: true
        }
    );
};