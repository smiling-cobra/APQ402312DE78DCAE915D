import React from "react";
import { TableRowItem } from "./TableRowItem";
import './styles.css';
import { OrganizationRepo } from "../../types";

interface BaseTableProps {
    repositories: OrganizationRepo[];
}

export const BaseTable: React.FC<BaseTableProps> = ({ repositories }) => {
    return (
        <div className="table-container">
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
        </div>
    )
};