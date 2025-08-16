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
        'bg-earthy-light  text-sm cursor-pointer text-earthy-dark  border-2 border-b-6 border-earthy  px-4 py-2 rounded-xl active:border-b-[2px] focus:outline-none shadow-md hover:translate-y-[1px] active:translate-y-[2px] hover:border-b-3 transition-all duration-150 hover:shadow-lg',
        className,
      )}
    >
      {children}
    </button>
  )
}

export default Button
