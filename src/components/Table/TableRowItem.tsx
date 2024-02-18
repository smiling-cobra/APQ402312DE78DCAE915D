import React from 'react';
interface OrganizationRepo {
    name: string;
    open_issues: string;
    stargazers_count: number;
}

export const TableRowItem: React.FC<OrganizationRepo> = ({
    name,
    open_issues,
    stargazers_count
}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{open_issues}</td>
            <td>{stargazers_count}</td>
        </tr>
    )
};