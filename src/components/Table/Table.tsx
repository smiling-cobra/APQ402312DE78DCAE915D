import React from "react";
import { TableRowItem } from "./TableRowItem";
import { OrganizationRepo } from "../../types";
import { Spinner } from "../Spinner/Spinner";
import "./styles.css";

interface BaseTableProps {
  reposErrorMessage: string;
  isOrgPresent: boolean;
  isLoading: boolean;
  repositories: OrganizationRepo[];
}

export const BaseTable: React.FC<BaseTableProps> = ({
  reposErrorMessage,
  isLoading,
  repositories,
  isOrgPresent,
}) => {
  if (isLoading) return <Spinner />;

  const hasRepos = repositories.length > 0;
  const hasErrorMessage = reposErrorMessage?.length > 0;
  const errorMessage = hasErrorMessage
    ? `${reposErrorMessage}. Check your connection`
    : "No repos were found! Try to tweak filters.";

  return (
    <div className="table-container">
      {hasRepos ? (
        <React.Fragment>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Issues</th>
                <th>Stars</th>
              </tr>
            </thead>
            <tbody>
              {repositories.map((repo) => (
                <TableRowItem key={`${repo.name}`} {...repo} />
              ))}
            </tbody>
          </table>
        </React.Fragment>
      ) : (
        isOrgPresent && <span className="error-message">{errorMessage}</span>
      )}
    </div>
  );
};
