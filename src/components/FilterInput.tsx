import React from "react";
import { FieldValues } from "react-hook-form";
import Select from 'react-select';

interface OrganisationInputProps {
  name: string;
  value: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

export const OrganisationInput = React.forwardRef<
  HTMLInputElement,
  OrganisationInputProps
>((props: FieldValues) => {
    // const { data, error, isLoading } = useSWR('/api/user', fetcher)

    return (
        <Select
            {...props}
            isClearable
            isSearchable
            options={options}
        />
    )
});
