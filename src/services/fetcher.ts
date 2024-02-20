import { parseResponse } from "./paginationUtils";

const accessToken = import.meta.env.VITE_GIT_ACCESS_TOKEN;

const requestConfig = {
  method: 'GET',
  headers: {
    'Authorization': `token ${accessToken}`,
    'Accept': 'application/vnd.github.v3+json',
  },
}

export const fetcher = async (url: string) => {
  const response = await fetch(url, requestConfig);

  if (!response.ok) {
    const error = new Error('Failed to fetch data');
    error.message = await response.json();
    throw error.message;
  }

  return response.json();
};

export const fetchWithPagination = async (url: string) => {
  try {
    const response = await fetch(url, requestConfig);
    const parsedResponse = parseResponse(response);
    return parsedResponse;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}