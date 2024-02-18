import React from "react";

interface BaseInputProps {
  id: string;
  ref: React.Ref<HTMLInputElement>;
  type: string;
  name: string;
  value: string;
  labelname: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  (props: BaseInputProps, ref: React.Ref<HTMLInputElement>) => {
    return (
      <div className={props.className}>
        <label htmlFor={props.id}>{props.labelname}</label>
        <input {...props} ref={ref} />
      </div>
    );
  }
);
