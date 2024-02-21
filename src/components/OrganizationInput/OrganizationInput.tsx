/* eslint-disable @typescript-eslint/no-explicit-any */
import Select, { SingleValue } from "react-select";
import { Organization, SelectOptions } from "../../types";
import "./styles.css";

interface OrganizationInputProps {
  options: SelectOptions[];
  onInputChange: (value: string) => void;
  onChange: (value: React.SetStateAction<Organization | undefined>) => void;
  isReposError: boolean;
  orgError?: string;
  value?: string;
}

const customColor = '#3B3B3B';
const color = '#E3E3E3';

// This is bad, I agree and I don't like it either.
const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: customColor,
    borderRadius: '8px',
    height: '34px',
    minHeight: '34px',
    color: '#FFF',
    cursor: 'pointer',
    fontSize: '14px',
  }),
  input: (provided: any) => ({
    ...provided,
    color: color,
    fontSize: '14px',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: color,
    paddingBottom: '4px',
    fontSize: '14px',
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: customColor,
    color: color,
    cursor: 'pointer',
    fontSize: '14px',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: color,
    paddingBottom: '4px',
  }),
  option: (provided: any) => ({
    ...provided,
    backgroundColor: customColor,
    color: color,
    cursor: 'pointer',
    fontSize: '14px',
    ':hover': {
      backgroundColor: 'darken(customColor, 10%)',
    },
    ':active': {
      backgroundColor: 'darken(customColor, 20%)',
    },
  }),
};

export const OrganizationInput: React.FC<OrganizationInputProps> = ({
  options,
  onInputChange,
  onChange,
  orgError,
  isReposError,
  value,
}) => {
  return (
    <div className="organization-input-container">
      {orgError && <span className="organization-input__error">
        {`Something is wrong with your request. ${orgError}.`}
      </span>}
      <Select
        inputValue={value}
        options={options}
        styles={customStyles}
        isDisabled={isReposError}
        placeholder="Start typing..."
        onInputChange={onInputChange}
        onChange={(option: SingleValue<SelectOptions>) =>
          onChange(option?.value)
        }
      />
    </div>
  );
};
