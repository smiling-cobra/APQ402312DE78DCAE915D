import { Pagination } from "../../types";
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
    <div className="table-pagination__container">
      <button
        className="table-pagination__button"
        onClick={() => onPageChange(Pagination.PREV)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        className="table-pagination__button"
        onClick={() => onPageChange(Pagination.NEXT)}
        disabled={lastPage === null}
      >
        Next
      </button>
    </div>
  );
};
