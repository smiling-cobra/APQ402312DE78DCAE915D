import { useState, useMemo, ChangeEvent } from "react";
import { BaseTable } from "../components/Table/Table";
import { debounce, filterRepos } from "../utils";
import { useOrganizations } from "../services/hooks/useOrganizations";
import { useRepositories } from "../services/hooks/useRepositories";
import { OrganizationInput } from "../components/OrganizationInput";
import { OpenIssuesFilter, Organization, OrganizationRepo, SelectOptions } from "../types";
import { BaseInput } from "../components/BaseInput";


export const Main = () => {
  const [page] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedOrg, setSelectedOrg] = useState<Organization>();

  const [repoNameFilter, setRepoNameFilter] = useState("");
  const [openIssuesFilter, setOpenIssuesFilter] = useState<OpenIssuesFilter>({
    min: 0,
    max: 0,
  });

  const { data: allOrganizations, error: orgErrors } = useOrganizations(query);

  const {
    data: allRepositories,
    error: reposErrors,
    isLoading: isReposLoading,
  } = useRepositories(selectedOrg?.repos_url ?? "", page);

  console.info("reposErrors", reposErrors);

  const organizationRepos: OrganizationRepo[] = useMemo(() => {
    if (!allRepositories) return [];
    return filterRepos(allRepositories, repoNameFilter, openIssuesFilter);
  }, [repoNameFilter, allRepositories, openIssuesFilter]);

  const selectOptions: SelectOptions[] = useMemo(() => {
    if (!allOrganizations?.items?.length) return [];

    return allOrganizations.items.map((org: Organization) => ({
      value: org,
      label: org?.login ?? "Unknown organization",
    }));
  }, [allOrganizations]);

  const handleOrganizationChange = debounce((selectedOption: string) => {
    setQuery(selectedOption);
  }, 2000);

  const handleNameFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepoNameFilter(e.target.value);
  };

  const handleIssueFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = Number(value);

    setOpenIssuesFilter(prev => {
      const newState = { ...prev };

      if (name === "min") {
        newState.min = parsedValue;
        return newState;
      } else if (name === "max") {
        newState.max = parsedValue;
        return newState;
      }

      return newState;
    });
  };

  return (
    <main className="main-container">
      <OrganizationInput
        options={selectOptions}
        error={orgErrors?.message}
        onInputChange={handleOrganizationChange}
        onChange={setSelectedOrg}
      />
      {selectedOrg ? (
        <div className="filters-container">
          <BaseInput
            type="text"
            value={repoNameFilter}
            onChange={handleNameFilterChange}
          />
          <div>
            <BaseInput
              name="min"
              min={0}
              type="number"
              max={openIssuesFilter.max}
              labelname="Min issues"
              value={openIssuesFilter.min}
              onChange={handleIssueFilterChange}
            />
            <BaseInput
              name="max"
              min={openIssuesFilter.min}
              max={Infinity}
              type="number"
              labelname="Max issues"
              value={openIssuesFilter.max}
              onChange={handleIssueFilterChange}
            />
          </div>
        </div>
      ) : null}
      {isReposLoading ? (
        <span>Repos loading...</span>
      ) : organizationRepos.length ? (
        <BaseTable repositories={organizationRepos} />
      ) : <span>Nothing has been found... Keep tweaking filters!</span>}
    </main>
  );
};
