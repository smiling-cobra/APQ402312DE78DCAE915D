import { Pagination } from "../../types";
import { BaseButton } from "../Button/BaseButton";
import "./styles.css";

interface PaginationControlProps {
  currentPage: number;
  onPageChange: (direction: Pagination) => void;
  lastPage?: number | null;
}

export const PaginationControl: React.FC<PaginationControlProps> = ({
  lastPage,
  currentPage,
  onPageChange,
}) => {
  return (
    <div className="pagination__container">
      <BaseButton
        label="Previous"
        className="pagination__button"
        onHandleClick={() => onPageChange(Pagination.PREV)}
        isDisabled={currentPage === 1}
      />
      <BaseButton
        label="Next"
        className="pagination__button"
        onHandleClick={() => onPageChange(Pagination.NEXT)}
        isDisabled={lastPage === null}
      />
    </div>
  );
};
