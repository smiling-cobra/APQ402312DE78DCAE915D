import React from 'react';
import { OrganizationRepo } from '../../types';

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