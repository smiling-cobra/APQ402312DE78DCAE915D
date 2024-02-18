import React from "react";
import { TableRowItem } from "./TableRowItem";


interface OrganizationRepo {
    name: string;
    open_issues: string;
    stargazers_count: number;
}

interface BaseTableProps {
    repositories: OrganizationRepo[];
}

export const BaseTable: React.FC<BaseTableProps> = ({ repositories }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Issues</th>
                    <th>Stars</th>
                </tr>
            </thead>
            <tbody>
                {repositories.map((repo, index) => <TableRowItem key={index} {...repo} />)}
            </tbody>
        </table>
    )
};