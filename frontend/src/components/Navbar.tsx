// import { useState } from 'react'
// import { MenuIcon, XIcon } from 'lucide-react'
import { Github, LucideFolderHeart } from 'lucide-react'
import { Link } from '@tanstack/react-router'

// const navLinks = [
//   { to: '/', label: 'Home' },
//   { to: '/projects', label: 'Projects' },
//   { to: '/blogs', label: 'Blogs' },
//   { to: '/contact', label: 'Contact' },
// ]

const Navbar = () => {
  return (
    <nav className="border-b border-dashed border-gray-300 dark:border-gray-400sticky top-0 z-50">
      <div className="max-w-5xl mx-auto py-3 flex items-center justify-between">
        <Link to="/" className="text-black flex items-center gap-2">
          <span className="font-bold text-sm">
            <LucideFolderHeart className="w-5 h-5" />
          </span>
        </Link>

        <div className="flex gap-6">
          <Link to="/projects">Projects</Link>
          <a
            href="https://github.com/yehonatal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
