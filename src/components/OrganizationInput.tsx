import Select, { SingleValue } from "react-select";
import { Organization, SelectOptions } from "../types";

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
    <div>
      {error && <span>{error}</span>}
      <Select
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
