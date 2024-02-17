import React from "react";

interface BaseTableProps {
    children: React.ReactNode;
}

export const BaseTable = (props: BaseTableProps) => {
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
                {props.children}
            </tbody>
        </table>
    )
};