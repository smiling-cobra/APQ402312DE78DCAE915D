import "./styles.css";

interface BaseButtonProps {
  onHandleClick: () => void;
  label: string;
  className: string;
  isDisabled?: boolean;
}

export const BaseButton: React.FC<BaseButtonProps> = ({
  onHandleClick,
  isDisabled,
  label,
  className,
}) => {
  return (
    <button
      className={`base-button ${className}`}
      onClick={onHandleClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};
