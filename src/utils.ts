import { FilterName, OpenIssuesFilter, OrganizationRepo } from "./types";

export const debounce = <T extends unknown[]>(
    func: (...args: T) => void,
    delay: number
) => {
    let timeout: ReturnType<typeof setTimeout>;
    return function(...args: T) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
};

export const filterRepos = (
  repos: OrganizationRepo[],
  repoName: string,
  openIssuesFilter: OpenIssuesFilter
) => {
  return repos.filter(repo => {
    const repoNameMatch = repo.name.includes(repoName); // Filter by repo name
    const openIssuesMatch =
      repo.open_issues >= openIssuesFilter.min &&
      repo.open_issues <= openIssuesFilter.max; // Filter by open issues
    return repoNameMatch && openIssuesMatch;
  });
};

export const updateOpenIssuesFilter = (
  prevState: OpenIssuesFilter,
  filterName: string,
  value: number
) => {
  const newState = { ...prevState };

  if (filterName === FilterName.MIN) {
    newState.min = value;
    return newState;
  } else if (filterName === FilterName.MAX) {
    newState.max = value;
    return newState;
  }

  return newState;
};