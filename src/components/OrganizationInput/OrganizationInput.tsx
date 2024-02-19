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
      <Select
        className="organization-input"
        placeholder="Start typing..."
        options={options}
        onInputChange={onInputChange}
        onChange={(option: SingleValue<SelectOptions>) =>
          onChange(option?.value)
        }
      />
      {error && <span className="organization-input__error">{error}</span>}
    </div>
  );
};
