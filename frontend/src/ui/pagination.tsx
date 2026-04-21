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
    <div className="flex justify-center items-center gap-4 flex-wrap pt-20">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`w-12 h-12 rounded-none flex items-center justify-center border-2 transition-none duration-0 
          ${
            currentPage === 1
              ? 'border-[var(--color-border)] text-[var(--color-muted-foreground)] opacity-50 cursor-not-allowed'
              : 'border-[var(--color-foreground)] text-[var(--color-foreground)] hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] focus:bg-[var(--color-foreground)] focus:text-[var(--color-background)]'
          }`}
      >
        <ChevronLeft size={18} />
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, idx) => {
          const page = idx + 1
          const isActive = currentPage === page
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-none text-[10px] font-black transition-none duration-0 border-2
                ${
                  isActive
                    ? 'bg-[var(--color-foreground)] border-[var(--color-foreground)] text-[var(--color-background)]'
                    : 'bg-[var(--color-background)] border-[var(--color-foreground)] text-[var(--color-foreground)] hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] focus:bg-[var(--color-foreground)] focus:text-[var(--color-background)]'
                }`}
            >
              {page}
            </button>
          )
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`w-12 h-12 rounded-none flex items-center justify-center border-2 transition-none duration-0 
          ${
            currentPage === totalPages
              ? 'border-[var(--color-border)] text-[var(--color-muted-foreground)] opacity-50 cursor-not-allowed'
              : 'border-[var(--color-foreground)] text-[var(--color-foreground)] hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] focus:bg-[var(--color-foreground)] focus:text-[var(--color-background)]'
          }`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}

export default RenderPagination
