import useSWR from "swr";
import { fetcher } from "../fetcher";

export const useOrganizations = (query: string | null) => {
    return useSWR(
        query ? `https://api.github.com/search/users?q=${query}+type:org` : null,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
          }
    );
};