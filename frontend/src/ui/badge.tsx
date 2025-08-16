interface BadgeProps {
  children: React.ReactNode
  className?: string
}

const Badge = ({ children, className = '' }: BadgeProps) => {
  return (
    <span
      className={`
        inline-block text-sm px-3 py-1 rounded-lg
        border-2 border-b-5
        border-[var(--color-accent)]
        bg-[var(--color-background)]
        text-[var(--color-card-foreground)]
        shadow-md
        hover:translate-y-[1px]
        active:translate-y-[2px]
        hover:border-b-3
        transition-all duration-150
        hover:shadow-lg
        cursor-pointer
        select-none
        ${className}
      `}
    >
      {children}
    </span>
  )
}

export default Badge
