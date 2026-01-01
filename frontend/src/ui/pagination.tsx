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
        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 
          ${
            currentPage === 1
              ? 'border-[var(--color-border)] text-[var(--color-muted-foreground)] opacity-50 cursor-not-allowed'
              : 'border-[var(--color-border)] text-[var(--color-foreground)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:scale-110'
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
              className={`w-10 h-10 rounded-full text-[10px] font-black transition-all duration-500 border
                ${
                  isActive
                    ? 'bg-[var(--color-foreground)] border-[var(--color-foreground)] text-[var(--color-background)] shadow-lg'
                    : 'bg-transparent border-transparent text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:border-[var(--color-border)]'
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
        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 
          ${
            currentPage === totalPages
              ? 'border-[var(--color-border)] text-[var(--color-muted-foreground)] opacity-50 cursor-not-allowed'
              : 'border-[var(--color-border)] text-[var(--color-foreground)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:scale-110'
          }`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}

export default RenderPagination
