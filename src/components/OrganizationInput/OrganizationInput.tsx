import Select, {
  ControlProps,
  InputProps,
  MenuProps,
  OptionProps,
  PlaceholderProps,
  SingleValue,
  SingleValueProps,
} from "react-select";
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

const backgroundColor = "#3B3B3B";
const color = "#E3E3E3";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customStyles: any = {
  control: (provided: ControlProps) => ({
    ...provided,
    backgroundColor: backgroundColor,
    borderRadius: "8px",
    height: "34px",
    minHeight: "34px",
    color: "#FFF",
    cursor: "pointer",
    fontSize: "14px",
  }),
  input: (provided: InputProps) => ({
    ...provided,
    color: color,
    fontSize: "14px",
  }),
  singleValue: (provided: SingleValueProps) => ({
    ...provided,
    color: color,
    paddingBottom: "4px",
    fontSize: "14px",
  }),
  menu: (provided: MenuProps) => ({
    ...provided,
    backgroundColor: backgroundColor,
    color: color,
    cursor: "pointer",
    fontSize: "14px",
  }),
  placeholder: (provided: PlaceholderProps) => ({
    ...provided,
    color: color,
    paddingBottom: "4px",
  }),
  option: (provided: OptionProps) => ({
    ...provided,
    backgroundColor: backgroundColor,
    color: color,
    cursor: "pointer",
    fontSize: "14px",
    ":hover": {
      backgroundColor: "gray",
    },
    ":active": {
      backgroundColor: "gray",
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
      {orgError && (
        <span className="organization-input__error">
          {`Something is wrong with your request. ${orgError}.`}
        </span>
      )}
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
