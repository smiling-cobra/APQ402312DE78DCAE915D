import { ChangeEvent } from "react";
import { OpenIssuesFilter, Organization } from "../../types";
import { BaseInput } from "../Input/BaseInput";
import "./styles.css";

interface FiltersProps {
  repoNameFilter: string;
  handleNameFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleIssueFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
  openIssuesFilter: OpenIssuesFilter;
  selectedOrg?: Organization;
}

export const Filters: React.FC<FiltersProps> = ({
  selectedOrg,
  repoNameFilter,
  openIssuesFilter,
  handleNameFilterChange,
  handleIssueFilterChange,
}) => {
  if (!selectedOrg) return null;
  return (
    <div className="form-filters">
      <BaseInput
        type="text"
        value={repoNameFilter}
        placeholder="Type repo name..."
        onChange={handleNameFilterChange}
      />
      <BaseInput
        name="min"
        type="number"
        min={0}
        max={openIssuesFilter.max}
        value={openIssuesFilter.min}
        onChange={handleIssueFilterChange}
      />
      <BaseInput
        name="max"
        type="number"
        min={openIssuesFilter.min}
        max={Infinity}
        value={openIssuesFilter.max}
        onChange={handleIssueFilterChange}
      />
    </div>
  );
};
