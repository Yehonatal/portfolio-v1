interface BadgeProps {
  children: React.ReactNode
  className?: string
}

const Badge = ({ children, className = '' }: BadgeProps) => {
  return (
    <span
      className={`
        inline-block text-[9px] px-4 py-1.5 rounded-none
        bg-[var(--color-background)]
        text-[var(--color-foreground)]
        font-black uppercase tracking-[0.2em]
        border-2 border-[var(--color-foreground)]
        transition-none duration-0
        hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)]
        focus:bg-[var(--color-foreground)] focus:text-[var(--color-background)]
        cursor-default
        select-none
        ${className}
      `}
    >
      {children}
    </span>
  )
}

export default Badge
