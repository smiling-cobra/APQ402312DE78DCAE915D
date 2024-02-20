import React, { ChangeEvent } from "react";
import { FilterName, OpenIssuesFilter } from "../../types";
import { BaseInput } from "../Input/BaseInput";
import "./styles.css";

interface FiltersProps {
  repoNameFilter: string;
  handleNameFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleIssueFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
  openIssuesFilter: OpenIssuesFilter;
  isOrgPresent: boolean;
}

export const Filters: React.FC<FiltersProps> = ({
  isOrgPresent,
  repoNameFilter,
  openIssuesFilter,
  handleNameFilterChange,
  handleIssueFilterChange,
}) => {
  return (
    <div className="form-filters">
      {isOrgPresent ? (
        <React.Fragment>
          <BaseInput
            type="text"
            value={repoNameFilter}
            placeholder="Type repo name..."
            onChange={handleNameFilterChange}
          />
          <BaseInput
            type="number"
            min={0}
            name={FilterName.MIN}
            max={openIssuesFilter.max}
            value={openIssuesFilter.min}
            onChange={handleIssueFilterChange}
          />
          <BaseInput
            type="number"
            name={FilterName.MAX}
            min={openIssuesFilter.min}
            max={Infinity}
            value={openIssuesFilter.max}
            onChange={handleIssueFilterChange}
          />
        </React.Fragment>
      ) : null}
    </div>
  );
};
