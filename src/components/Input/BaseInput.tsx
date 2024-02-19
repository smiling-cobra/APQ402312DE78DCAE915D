import React from "react";
import "./styles.css";

interface BaseInputProps {
  id?: string;
  ref?: React.Ref<HTMLInputElement>;
  max?: number;
  min?: number;
  type?: string;
  name?: string;
  value?: string | number;
  labelname?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  (props: BaseInputProps, ref: React.Ref<HTMLInputElement>) => {
    return (
      <div className="base-input__container">
        <label htmlFor={props.id}>{props.labelname}</label>
        <input className={`base-input ${props.className ?? ""}`} {...props} ref={ref} />
      </div>
    );
  }
);
