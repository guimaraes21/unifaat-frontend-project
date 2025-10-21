import { PaginationProps } from "./Pagination.types";

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const handlePrevious = () => {
        if (!isFirstPage) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (!isLastPage) {
            onPageChange(currentPage + 1);
        }
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav aria-label="Navegação de páginas">
            <ul className="pagination justify-content-center mb-0">
                <li className={`page-item ${isFirstPage ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={handlePrevious}
                        disabled={isFirstPage}
                        aria-label="Anterior"
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>

                <li className="page-item active">
                    <span className="page-link">
                        Página {currentPage} de {totalPages}
                    </span>
                </li>

                <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={handleNext}
                        disabled={isLastPage}
                        aria-label="Próxima"
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
}
