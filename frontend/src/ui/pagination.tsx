import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProp = {
  totalPages: number
  currentPage: number
  setCurrentPage: (page: number) => void
}

const RenderPagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProp) => {
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <div className="flex justify-center items-center gap-2 flex-wrap">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg border-2 transition-all duration-200 
          ${
            currentPage === 1
              ? 'bg-[var(--color-card)] border-[var(--color-accent)] text-gray-400 cursor-not-allowed'
              : 'bg-[var(--color-card)] border-[var(--color-accent)] text-[var(--color-foreground)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:scale-[0.98] hover:shadow-md'
          }`}
      >
        <ChevronLeft size={16} />
      </button>

      {Array.from({ length: totalPages }, (_, idx) => {
        const page = idx + 1
        const isActive = currentPage === page
        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1.5 text-sm rounded-lg cursor-pointer border-2 transition-all duration-200
              ${
                isActive
                  ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-[var(--color-primary-foreground)] font-extrabold shadow-md'
                  : 'bg-[var(--color-card)] border-[var(--color-accent)] text-[var(--color-foreground)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:scale-[0.98] hover:shadow-md'
              }`}
          >
            {page}
          </button>
        )
      })}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg border-2 transition-all duration-200 cursor-pointer
          ${
            currentPage === totalPages
              ? 'bg-[var(--color-card)] border-[var(--color-accent)] text-gray-400 cursor-not-allowed'
              : 'bg-[var(--color-card)] border-[var(--color-accent)] text-[var(--color-foreground)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:scale-[0.98] hover:shadow-md'
          }`}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}

export default RenderPagination
