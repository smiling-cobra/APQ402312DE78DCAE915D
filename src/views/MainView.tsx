import { useState, useMemo, ChangeEvent, useCallback } from "react";
import { BaseTable } from "../components/Table/Table";
import { debounce, filterRepos, updateOpenIssuesFilter } from "../utils";
import { useOrganizations } from "../services/hooks/useOrganizations";
import { useRepositories } from "../services/hooks/useRepositories";
import { OrganizationInput } from "../components/OrganizationInput/OrganizationInput";
import { PaginationControl } from "../components/Pagination/PaginationControl";
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
    error: reposError,
    isLoading: isReposLoading,
  } = useRepositories(selectedOrg?.repos_url ?? "", page);

  const organizationRepos: OrganizationRepo[] = useMemo(() => {
    if (!allRepositories) return [];
    return filterRepos(allRepositories.data, repoNameFilter, openIssuesFilter);
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
          orgError={orgErrors?.message}
          onChange={setSelectedOrg}
          // if reposError is present, disable the input
          isReposError={reposError?.message.length > 0}
          onInputChange={handleOrganizationChange}
        />
        <Filters
          isOrgPresent={Boolean(selectedOrg)}
          repoNameFilter={repoNameFilter}
          openIssuesFilter={openIssuesFilter}
          handleNameFilterChange={handleNameFilterChange}
          handleIssueFilterChange={handleIssueFilterChange}
        />
      </div>
      <BaseTable
        isOrgPresent={Boolean(selectedOrg)}
        isLoading={isReposLoading}
        repositories={organizationRepos}
        reposErrorMessage={reposError?.message}
      />
      {organizationRepos.length > 0 && (
        <PaginationControl
          currentPage={page}
          onPageChange={handlePageChange}
          lastPage={allRepositories?.lastPage}
        />
      )}
    </main>
  );
};
