const accessToken = import.meta.env.VITE_GIT_ACCESS_TOKEN;

export const baseFetcher = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `token ${accessToken}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    const error = new Error('Failed to fetch data');
    error.message = await response.json();
    throw error.message;
  }

  return response.json();
};