interface BadgeProps {
  children: React.ReactNode
  className?: string
}

const Badge = ({ children, className = '' }: BadgeProps) => {
  return (
    <span
      className={`
        inline-block text-[9px] px-4 py-1.5 rounded-full
        bg-[var(--color-secondary)]/5
        text-[var(--color-muted-foreground)]
        font-black uppercase tracking-[0.2em]
        border border-[var(--color-border)]
        transition-all duration-300
        hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]
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
