// components/Button.tsx
import { cn } from '../lib/utils' // optional: for merging Tailwind classes easily

type ButtonProps = {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  className?: string
  onClick?: () => void
}

const Button = ({ children, className, onClick, type }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        'px-8 py-4 bg-[var(--color-foreground)] text-[var(--color-background)] rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:shadow-[var(--color-primary)]/20 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] focus:outline-none',
        className,
      )}
    >
      {children}
    </button>
  )
}

export default Button
