import React from "react";
import { useState, useMemo, ChangeEvent } from "react";
import { BaseTable } from "../components/Table/Table";
import { debounce, filterRepos } from "../utils";
import { useOrganizations } from "../services/hooks/useOrganizations";
import { useRepositories } from "../services/hooks/useRepositories";
import { OrganizationInput } from "../components/OrganizationInput/OrganizationInput";
import { BaseInput } from "../components/Input/BaseInput";
import {
  OpenIssuesFilter,
  Organization,
  OrganizationRepo,
  SelectOptions,
} from "../types";
import "./styles.css";
import { Spinner } from "../components/Spinner/Spinner";

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

  const handleIssueFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = Number(value);

    setOpenIssuesFilter((prev) => {
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

  const handlePageChange = (direction: string) => {
    setPage((currentPage) =>
      direction === "next" ? currentPage + 1 : Math.max(0, currentPage - 1)
    );
  };

  return (
    <main>
      <div className="form">
        <OrganizationInput
          options={selectOptions}
          error={orgErrors?.message}
          onInputChange={handleOrganizationChange}
          onChange={setSelectedOrg}
        />
        <div className="form-filters">
          {selectedOrg ? (
            <React.Fragment>
              <BaseInput
                type="text"
                value={repoNameFilter}
                placeholder="Type repo name..."
                onChange={handleNameFilterChange}
              />
              <div className="issues-filter-container">
                <BaseInput
                  name="min"
                  min={0}
                  type="number"
                  max={openIssuesFilter.max}
                  value={openIssuesFilter.min}
                  onChange={handleIssueFilterChange}
                />
                <BaseInput
                  name="max"
                  min={openIssuesFilter.min}
                  max={Infinity}
                  type="number"
                  value={openIssuesFilter.max}
                  onChange={handleIssueFilterChange}
                />
              </div>
            </React.Fragment>
          ) : null}
        </div>
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
