import React from "react";
import { TableRowItem } from "./TableRowItem";
import { OrganizationRepo, Pagination } from "../../types";
import './styles.css';

interface BaseTableProps {
    onPageChange: (direction: Pagination) => void;
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
                    {repositories.map(repo => <TableRowItem key={`${repo.name}`} {...repo} />)}
                </tbody>
            </table>
            <div className="table-pagination__container">
                <button
                    className="table-pagination__button"
                    onClick={() => onPageChange(Pagination.PREV)}
                >
                    Previous
                </button>
                <button
                    className="table-pagination__button"
                    onClick={() => onPageChange(Pagination.NEXT)}
                >
                    Next
                </button>
            </div>
        </div>
    )
};