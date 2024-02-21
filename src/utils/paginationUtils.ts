/***
    This file contains utility function that are used
    to get the last page of the paginated Github API response
    and parse the response data.
***/

const parseLinkHeader = (header: string | null) => {
  if (!header || header.length === 0) return {};

  const links: { [key: string]: string } = {};
  const parts = header.split(",");

  // Parse each part into a named link
  parts.forEach((part) => {
    const section = part.split(";");
    if (section.length !== 2) {
      throw new Error("section could not be split on ';'");
    }
    const url = section[0].replace(/<(.*)>/, "$1").trim();
    const name = section[1].replace(/rel="(.*)"/, "$1").trim();
    links[name] = url;
  });

  return links;
};

const retrieveLastPage = (link: string | null) => {
  if (!link) return null;

  const headerLinks = parseLinkHeader(link);
  const lastPageLink = headerLinks["last"];

  if (!lastPageLink) return null;

  const queryParams = new URL(lastPageLink).searchParams;
  const pageValue = queryParams.get("page");
  const lastPage = pageValue !== null ? Number(pageValue) : null;

  return lastPage;
};

export const parseResponse = async (response: Response) => {
  const data = await response.json();
  const headerLink = response.headers.get("link");
  const lastPage = retrieveLastPage(headerLink);
  return { data, lastPage };
};
