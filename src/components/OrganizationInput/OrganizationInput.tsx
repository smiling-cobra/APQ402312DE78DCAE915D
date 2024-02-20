import Select, { SingleValue } from "react-select";
import { Organization, SelectOptions } from "../../types";
import "./styles.css";

interface OrganizationInputProps {
  options: SelectOptions[];
  onInputChange: (value: string) => void;
  onChange: (value: React.SetStateAction<Organization | undefined>) => void;
  error: string;
}

export const OrganizationInput: React.FC<OrganizationInputProps> = ({
  options,
  onInputChange,
  onChange,
  error,
}) => {
  return (
    <div className="organization-input-container">
      {error && <span className="organization-input__error">
        {`Something wrong with your request. ${error}.`}
      </span>}
      <Select
        className="organization-input"
        placeholder="Start typing..."
        options={options}
        onInputChange={onInputChange}
        onChange={(option: SingleValue<SelectOptions>) =>
          onChange(option?.value)
        }
      />
    </div>
  );
};
