import {
  useState,
  useMemo,
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { BaseTable } from "../components/Table/Table";
import {
  debounce,
  filterRepos,
  updateOpenIssuesFilter,
} from "../utils/commonUtils";
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
import { BaseButton } from "../components/Button/BaseButton";
import { Spinner } from "../components/Spinner/Spinner";
import React from "react";

export const Main = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<Organization>();
  const [manualOrgError, setManualOrgError] = useState<Error | null>(null);

  const [repoNameFilter, setRepoNameFilter] = useState("");
  const [openIssuesFilter, setOpenIssuesFilter] = useState<OpenIssuesFilter>({
    min: 0,
    max: 50,
  });

  const {
    data: allOrganizations,
    error: orgErrors,
    isLoading: isOrgLoading,
  } = useOrganizations(query);

  useEffect(() => {
    if (orgErrors) {
      setManualOrgError(orgErrors);
    }

    if (allOrganizations?.items?.length > 0) {
      setManualOrgError(null);
    }
  }, [orgErrors, allOrganizations, setManualOrgError]);

  const {
    data: allRepositories,
    error: reposError,
    isLoading: isReposLoading,
  } = useRepositories(selectedOrg?.repos_url, page);

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
    // Reset pagination when a new organization is selected
    setPage(1);
  }, 1000);

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
    [setOpenIssuesFilter]
  );

  const handlePageChange = (direction: Pagination) => {
    setPage(
      (currentPage) =>
        direction === Pagination.NEXT
          ? currentPage + 1
          : Math.max(1, currentPage - 1) // Prevent negative page numbers
    );
  };

  // Below is a workaround to handle the refetching after an error
  // Definitely not the best way to handle this
  // But I didn't design it properly from the start
  // And I don't have time to come up with a better solution
  const lastValidQuery = useRef(query);

  useEffect(() => {
    if (!query?.length) return;
    lastValidQuery.current = query;
  }, [query]);

  const handleRefetch = () => {
    const validQuery = query?.length ? query : lastValidQuery?.current;

    // Trigger a refetch with the last valid query
    if (validQuery) {
      handleOrganizationChange(validQuery);
    }

    // Trigger a refetch for the repositories
    if (allOrganizations?.items?.length > 0) {
      setSelectedOrg(allOrganizations?.items?.[0]);
    }
  };

  return (
    <main>
      <div className="form">
        {manualOrgError && (
          <BaseButton
            label="R"
            className="refetch-button"
            onHandleClick={handleRefetch}
          />
        )}
        <OrganizationInput
          value={selectedOrg?.name}
          options={selectOptions}
          orgError={manualOrgError?.message}
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
      {isOrgLoading ? (
        <Spinner />
      ) : (
        <React.Fragment>
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
        </React.Fragment>
      )}
    </main>
  );
};
