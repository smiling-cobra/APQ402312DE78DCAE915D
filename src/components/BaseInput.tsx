import React from "react";

interface BaseInputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BaseInput = (props: BaseInputProps) => {
    return (
        <input {...props} />
    )
};