import React, { memo } from "react";
import { OrganizationRepo } from "../../types";

export const TableRowItem: React.FC<OrganizationRepo> = memo(
  ({ name, open_issues, stargazers_count }) => (
    <tr>
      <td>{name}</td>
      <td>{open_issues}</td>
      <td>{stargazers_count}</td>
    </tr>
  )
);
