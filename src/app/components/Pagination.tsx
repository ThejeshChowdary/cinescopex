'use client';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const delta = 2;
        const range: number[] = [];
        const left = Math.max(1, currentPage - delta);
        const right = Math.min(totalPages, currentPage + delta);

        for (let i = left; i <= right; i++) range.push(i);

        if (left > 1) {
            range.unshift(-1);
            range.unshift(1);
        }
        if (right < totalPages) {
            range.push(-2);
            range.push(totalPages);
        }

        return range;
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-10 mb-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-md bg-gray-800 text-white cursor-pointer hover:bg-red-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
                ← Prev
            </button>

            {getPageNumbers().map((page, idx) =>
                page < 0 ? (
                    <span key={`ellipsis-${idx}`} className="text-gray-500 px-1">…</span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-2 rounded-md transition font-medium ${currentPage === page
                            ? "bg-red-600 text-white"
                            : "bg-gray-800 text-white hover:bg-red-600 cursor-pointer"
                            }`}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-md bg-gray-800 text-white cursor-pointer hover:bg-red-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
                Next →
            </button>
        </div>
    );
}