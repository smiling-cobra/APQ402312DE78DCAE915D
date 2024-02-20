import { useState, useMemo, ChangeEvent, useCallback } from "react";
import { BaseTable } from "../components/Table/Table";
import { debounce, filterRepos, updateOpenIssuesFilter } from "../utils";
import { useOrganizations } from "../services/hooks/useOrganizations";
import { useRepositories } from "../services/hooks/useRepositories";
import { OrganizationInput } from "../components/OrganizationInput/OrganizationInput";
import { Spinner } from "../components/Spinner/Spinner";
import { Filters } from "../components/Filters/Filters";
import {
  OpenIssuesFilter,
  Organization,
  OrganizationRepo,
  Pagination,
  SelectOptions,
} from "../types";
import "./styles.css";

export const Main = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedOrg, setSelectedOrg] = useState<Organization>();

  const [repoNameFilter, setRepoNameFilter] = useState("");
  const [openIssuesFilter, setOpenIssuesFilter] = useState<OpenIssuesFilter>({
    min: 0,
    max: 50,
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

  const handleIssueFilterChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const parsedValue = Number(value);

      setOpenIssuesFilter((prev) =>
        updateOpenIssuesFilter(prev, name, parsedValue)
      );
    },
    []
  );

  const handlePageChange = (direction: Pagination) => {
    setPage(
      (currentPage) =>
        direction === Pagination.NEXT
          ? currentPage + 1
          : Math.max(1, currentPage - 1) // Prevent negative page numbers
    );
  };

  return (
    <main>
      <div className="form">
        <OrganizationInput
          options={selectOptions}
          error={orgErrors?.message}
          onChange={setSelectedOrg}
          onInputChange={handleOrganizationChange}
        />
        <Filters
          selectedOrg={selectedOrg}
          repoNameFilter={repoNameFilter}
          openIssuesFilter={openIssuesFilter}
          handleNameFilterChange={handleNameFilterChange}
          handleIssueFilterChange={handleIssueFilterChange}
        />
      </div>
      {isReposLoading ? (
        <Spinner />
      ) : organizationRepos.length ? (
        <BaseTable
          onPageChange={handlePageChange}
          repositories={organizationRepos}
        />
      ) : null}
    </main>
  );
};
