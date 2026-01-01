import { Github, LucideFolderHeart, Moon, Sun, Menu, X } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const Navbar = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'
    const initialTheme = savedTheme || systemTheme
    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  }

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    }),
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-8 pt-4 pb-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between ">
          <Link
            to="/"
            className="text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-all duration-500 hover:scale-110 relative z-[110]"
            onClick={() => setIsOpen(false)}
          >
            <LucideFolderHeart className="w-7 h-7" />
          </Link>

          <div className="hidden md:flex items-center gap-12">
            <Link
              to="/projects"
              className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 hover:text-[var(--color-foreground)] transition-colors [&.active]:text-[var(--color-foreground)]"
            >
              Projects
            </Link>
            <Link
              to="/blogs"
              className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 hover:text-[var(--color-foreground)] transition-colors [&.active]:text-[var(--color-foreground)]"
            >
              Blogs
            </Link>
            <button
              onClick={toggleTheme}
              className="text-gray-400 hover:text-[var(--color-foreground)] transition-all duration-500 hover:scale-110"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            <a
              href="https://github.com/yehonatal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[var(--color-foreground)] transition-all duration-500 hover:scale-110"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          <button
            className="md:hidden p-3 rounded-full bg-[var(--color-secondary)] text-[var(--color-foreground)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 shadow-sm"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[200] bg-[var(--color-background)]/98 backdrop-blur-xl md:hidden flex flex-col"
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="flex items-center justify-between px-6 py-6 relative z-10">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="text-sm font-black uppercase tracking-[0.2em] text-[var(--color-foreground)]"
              >
                Yonatan Afewerk
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-[var(--color-secondary)] text-[var(--color-foreground)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-12">
              <motion.div custom={0} variants={linkVariants}>
                <Link
                  to="/projects"
                  onClick={() => setIsOpen(false)}
                  className="text-5xl font-black tracking-tighter text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Projects
                </Link>
              </motion.div>
              <motion.div custom={1} variants={linkVariants}>
                <Link
                  to="/blogs"
                  onClick={() => setIsOpen(false)}
                  className="text-5xl font-black tracking-tighter text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Blogs
                </Link>
              </motion.div>

              <motion.div
                custom={2}
                variants={linkVariants}
                className="flex items-center gap-8 mt-8"
              >
                <button
                  onClick={toggleTheme}
                  className="p-4 rounded-full bg-[var(--color-secondary)] text-[var(--color-foreground)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
                >
                  {theme === 'light' ? (
                    <Moon className="w-6 h-6" />
                  ) : (
                    <Sun className="w-6 h-6" />
                  )}
                </button>
                <a
                  href="https://github.com/yehonatal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full bg-[var(--color-secondary)] text-[var(--color-foreground)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
                >
                  <Github className="w-6 h-6" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
