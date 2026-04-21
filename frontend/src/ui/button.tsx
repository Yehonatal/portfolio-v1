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
        'px-8 py-4 bg-[var(--color-background)] text-[var(--color-foreground)] rounded-none text-[10px] font-black uppercase tracking-[0.3em] border-4 border-[var(--color-foreground)] transition-none hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] focus:bg-[var(--color-foreground)] focus:text-[var(--color-background)] focus:outline-none',
        className,
      )}
    >
      {children}
    </button>
  )
}

export default Button
