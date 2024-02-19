import React from "react";
import { TableRowItem } from "./TableRowItem";
import { OrganizationRepo } from "../../types";
import './styles.css';

interface BaseTableProps {
    onPageChange: (direction: string) => void;
    repositories: OrganizationRepo[];
}

export const BaseTable: React.FC<BaseTableProps> = ({ repositories, onPageChange }) => {
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
            <div className="table-pagination__container">
                <button
                    className="table-pagination__button"
                    onClick={() => onPageChange('previous')}
                >
                    Previous
                </button>
                <button
                    className="table-pagination__button"
                    onClick={() => onPageChange('next')}
                >
                    Next
                </button>
            </div>
        </div>
    )
};