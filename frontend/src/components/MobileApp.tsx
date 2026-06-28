import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Briefcase, ArrowUpRight, User, Cpu, BookOpen, 
  MessageSquare, Copy, Check, Linkedin, Github, Send, Sun, Moon, Search, Mail, ExternalLink
} from 'lucide-react'
import type { Project } from '@/types/types'
import TechStack, { categories as techCategories } from '@/components/TechStack'
import Education from '@/components/Education'
import blogsData from '@/data/blogs.json'

const toGeezNumeral = (num: number): string => {
  const geezUnits = ["", "፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱"]
  const geezTens = ["", "፲", "፳", "፴", "፵", "፶", "፷", "፸", "፹", "፺"]
  
  if (num === 0) return ""
  if (num < 10) return geezUnits[num]
  
  const tens = Math.floor(num / 10)
  const units = num % 10
  return geezTens[tens] + geezUnits[units]
}

const getEthiopianDate = (date: Date) => {
  const gy = date.getFullYear()
  const gm = date.getMonth()
  const gd = date.getDate()
  
  let ey = gy - 8
  let em = 0
  let ed = 0
  
  const isLeap = (gy % 4 === 0)
  const newYearDay = isLeap ? 12 : 11
  
  const d = gd
  const m = gm + 1 // 1-indexed
  
  if (m === 9) {
    if (d >= newYearDay) { ey = gy - 7; em = 1; ed = d - (newYearDay - 1); }
    else { em = 13; ed = d + (30 - (newYearDay - 1)); }
  } else if (m === 10) {
    if (d >= 11) { ey = gy - 7; em = 2; ed = d - 10; }
    else { em = 1; ed = d + 20; }
  } else if (m === 11) {
    if (d >= 10) { ey = gy - 7; em = 3; ed = d - 9; }
    else { em = 2; ed = d + 21; }
  } else if (m === 12) {
    if (d >= 10) { ey = gy - 7; em = 4; ed = d - 9; }
    else { em = 3; ed = d + 21; }
  } else if (m === 1) {
    if (d >= 9) { ey = gy - 7; em = 5; ed = d - 8; }
    else { em = 4; ed = d + 22; }
  } else if (m === 2) {
    if (d >= 8) { ey = gy - 7; em = 6; ed = d - 7; }
    else { em = 5; ed = d + 23; }
  } else if (m === 3) {
    if (d >= 10) { ey = gy - 7; em = 7; ed = d - 9; }
    else { em = 6; ed = d + 21; }
  } else if (m === 4) {
    if (d >= 9) { ey = gy - 7; em = 8; ed = d - 8; }
    else { em = 7; ed = d + 22; }
  } else if (m === 5) {
    if (d >= 9) { ey = gy - 7; em = 9; ed = d - 8; }
    else { em = 8; ed = d + 22; }
  } else if (m === 6) {
    if (d >= 8) { ey = gy - 7; em = 10; ed = d - 7; }
    else { em = 9; ed = d + 23; }
  } else if (m === 7) {
    if (d >= 8) { ey = gy - 7; em = 11; ed = d - 7; }
    else { em = 10; ed = d + 23; }
  } else if (m === 8) {
    if (d >= 7) { ey = gy - 7; em = 12; ed = d - 6; }
    else { em = 11; ed = d + 24; }
  }
  
  const monthNames = [
    "", "Meskerem", "Tikimt", "Hidar", "Tahsas", "Ter", "Yakatit",
    "Megabit", "Miyazya", "Ginbot", "Sene", "Hamle", "Nehase", "Pagume"
  ]
  
  return `${monthNames[em]} ${toGeezNumeral(ed)} (${ed}), ${ey} E.C.`
}

type MobileAppProps = {
  localTime: string
  categories: string[]
  selectedCategory: string
  setSelectedCategory: (val: string) => void
  filteredProjects: Project[]
  activeDeckIndex: number
  setActiveDeckIndex: React.Dispatch<React.SetStateAction<number>>
  searchQuery: string
  setSearchQuery: (val: string) => void
  mobileTab: 'home' | 'works' | 'skills' | 'writing' | 'contact'
  setMobileTab: (val: 'home' | 'works' | 'skills' | 'writing' | 'contact') => void
  emailCopied: boolean
  handleCopyEmail: () => void
  onInspectProject: (projectId: string) => void
}

export default function MobileApp({
  localTime,
  categories,
  selectedCategory,
  setSelectedCategory,
  filteredProjects,
  activeDeckIndex,
  setActiveDeckIndex,
  searchQuery,
  setSearchQuery,
  mobileTab,
  setMobileTab,
  emailCopied,
  handleCopyEmail,
  onInspectProject,
}: MobileAppProps) {
  
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [contactMessage, setContactMessage] = useState('')

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setTheme(isDark ? 'dark' : 'light')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const getMailtoLink = () => {
    return `mailto:yonatanafewerk@gmail.com?body=${encodeURIComponent(contactMessage)}`
  }

  const getTelegramLink = () => {
    return `https://t.me/yonatanafewerk?text=${encodeURIComponent(contactMessage)}`
  }

  return (
    <div className="min-h-screen text-[var(--color-foreground)] pb-24 relative selection:bg-[var(--color-foreground)] selection:text-[var(--color-background)] overflow-x-hidden flex flex-col font-sans">
      
      {/* Editorial Minimal Header - No Borders, No Shadows */}
      <header className="sticky top-0 z-[100] w-full px-6 py-5 flex items-center justify-between bg-[var(--color-background)]/85 backdrop-blur-xl">
        <span className="font-display font-bold text-xs uppercase tracking-[0.25em] text-[var(--color-foreground)]">
          yonatan afewerk.
        </span>
        
        <button
          onClick={toggleTheme}
          className="p-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors active:scale-90 cursor-pointer"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </header>

      {/* Tab Content Area - Flat, Typography Driven spacing */}
      <main className="px-6 py-2 flex-1">
        <AnimatePresence mode="wait">
          {mobileTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Profile Image & Brand Header - Completely Borderless & Flat */}
              <div className="flex flex-col items-center text-center space-y-5 pt-4">
                
                {/* Circular Profile Portrait */}
                <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 bg-[var(--color-primary)] rounded-full overflow-hidden flex items-center justify-center opacity-90">
                    <svg className="w-full h-full opacity-10 stroke-white fill-none" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" strokeWidth="2" />
                      <path d="M 0 50 Q 50 10 100 50" strokeWidth="2" />
                    </svg>
                  </div>
                  
                  <img
                    src="/me.jpg"
                    alt="Yonatan"
                    className="w-32 h-32 rounded-full object-cover relative z-10"
                  />
                  
                  {/* Floating minimalist tags */}
                  <div className="absolute -left-4 top-6 z-20 bg-[var(--color-secondary)] px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider text-[var(--color-foreground)]">
                    3+ Yrs Exp
                  </div>
                  <div className="absolute -right-4 bottom-6 z-20 bg-[var(--color-secondary)] px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider text-[var(--color-foreground)]">
                    20+ Works
                  </div>
                </div>

                {/* Flat Typographic Intro */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                    Full-Stack Engineer
                  </span>
                  <h2 className="text-3xl font-black font-display tracking-tight text-[var(--color-foreground)] leading-none">
                    Yonatan Afewerk
                  </h2>
                  <p className="text-[13px] text-[var(--color-muted-foreground)] leading-relaxed font-light max-w-sm mx-auto">
                    I build elegant, high-performance web applications. Combining clean digital architecture with modern design systems to make products feel simple and delightful.
                  </p>
                </div>

                {/* Flat Pill CTA Actions */}
                <div className="flex gap-3 w-full max-w-xs pt-2">
                  <a
                    href="https://drive.google.com/file/d/1lFQogpWl42L-UE5DvY_40laKmA_0sXlf/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex justify-center items-center gap-1 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-bold text-xs uppercase tracking-wider py-3 rounded-full active:scale-95 transition-transform"
                  >
                    <span>Resume</span>
                    <ArrowUpRight size={14} />
                  </a>
                  
                  <button
                    onClick={() => setMobileTab('contact')}
                    className="flex-1 flex justify-center items-center gap-1.5 py-3 bg-[var(--color-secondary)] rounded-full text-xs font-bold uppercase tracking-wider text-[var(--color-foreground)] active:scale-95 transition-transform"
                  >
                    <span>Let's Talk</span>
                  </button>
                </div>
              </div>

              {/* Minimal Text Indicators - Borderless */}
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[var(--color-border)]/20">
                <div className="space-y-1">
                  <span className="block text-[8px] font-mono font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
                    Local Time
                  </span>
                  <span className="block text-base font-bold font-mono tracking-tight text-[var(--color-foreground)]">
                    {localTime || '15:42:00'}
                  </span>
                  <span className="block text-[8px] font-bold uppercase tracking-wider text-[var(--color-muted-foreground)]">
                    Addis Ababa, ET
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="block text-[8px] font-mono font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
                    Ethiopic Date
                  </span>
                  <span className="block text-xs font-bold text-[var(--color-foreground)] uppercase tracking-tight leading-snug">
                    {getEthiopianDate(new Date())}
                  </span>
                  <span className="block text-[8px] font-mono font-bold uppercase text-[var(--color-muted-foreground)]">
                    Ge'ez Calendar
                  </span>
                </div>
              </div>

              {/* Social Directories Horizontal Row - Flat Pills */}
              <div className="space-y-3 pt-4 border-t border-[var(--color-border)]/20">
                <span className="block text-[8px] font-mono font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  Social Channels
                </span>
                
                <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x">
                  {[
                    { name: 'GitHub', desc: 'Code', url: 'https://github.com/Yehonatal', icon: <Github size={13} /> },
                    { name: 'LinkedIn', desc: 'Connect', url: 'https://www.linkedin.com/in/yonatan-afewerk/', icon: <Linkedin size={13} /> },
                    { name: 'Telegram', desc: 'Chat', url: 'https://t.me/yonatanafewerk', icon: <Send size={13} /> },
                    { name: 'Medium', desc: 'Articles', url: 'https://medium.com/@yonatanafewerk', icon: <BookOpen size={13} /> },
                  ].map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 bg-[var(--color-secondary)]/60 rounded-full px-4 py-2.5 min-w-[110px] snap-center active:scale-95 transition-transform"
                    >
                      <span className="text-[var(--color-muted-foreground)]">{item.icon}</span>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold uppercase text-[var(--color-foreground)] leading-none">{item.name}</span>
                        <span className="text-[7px] font-bold text-[var(--color-muted-foreground)] uppercase tracking-wider mt-0.5">{item.desc}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {mobileTab === 'works' && (
            <motion.div
              key="works"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6 pb-6"
            >
              <div>
                <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  Selected projects
                </span>
                <h2 className="text-2xl font-extrabold font-display tracking-tight mt-1 text-[var(--color-foreground)]">
                  All Creative Works
                </h2>
              </div>

              {/* Categories filter pills - Flat */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none shrink-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                        : 'bg-[var(--color-secondary)] text-[var(--color-muted-foreground)]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Editorial Split Project Rows - No Borders, No Shadows */}
              <div className="space-y-6 pt-2">
                {filteredProjects.length === 0 ? (
                  <div className="text-xs text-[var(--color-muted-foreground)] text-center py-8">No projects found.</div>
                ) : (
                  filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => onInspectProject(project.id)}
                      className="flex gap-4 items-center py-4 border-b border-[var(--color-border)]/15 active:opacity-80 transition-opacity cursor-pointer"
                    >
                      {/* Left Side: Info */}
                      <div className="flex-1 flex flex-col justify-between h-24">
                        <div className="space-y-1">
                          <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary)]">
                            {project.category}
                          </span>
                          <h3 className="text-base font-extrabold text-[var(--color-foreground)] tracking-tight leading-tight line-clamp-1">
                            {project.title}
                          </h3>
                          <p className="text-xs text-[var(--color-muted-foreground)] font-light leading-snug line-clamp-2 mt-1">
                            {project.description}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-mono font-bold uppercase text-[var(--color-primary)]">
                          See More <ArrowUpRight size={10} />
                        </span>
                      </div>
                      
                      {/* Right Side: Flat Portrait Thumbnail */}
                      <div className="w-20 h-24 rounded-lg bg-[var(--color-secondary)] overflow-hidden shrink-0">
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {mobileTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  Capability Directory
                </span>
                <h2 className="text-2xl font-extrabold font-display tracking-tight mt-1 text-[var(--color-foreground)]">
                  Skills & Tech
                </h2>
              </div>

              {/* Flat Search Input */}
              <div className="relative flex items-center">
                <Search size={14} className="absolute left-4 text-[var(--color-muted-foreground)]" />
                <input
                  type="text"
                  placeholder="Filter by technology..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[var(--color-secondary)]/60 pl-10 pr-4 py-3 rounded-full text-xs text-[var(--color-foreground)] focus:outline-none placeholder-[var(--color-muted-foreground)]/50"
                />
              </div>

              {/* Editorial flat lists - No Boxes */}
              <div className="space-y-6 pt-2">
                {techCategories.map((cat) => {
                  const filteredTech = cat.tech.filter(t => 
                    t.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  if (searchQuery && filteredTech.length === 0) return null

                  return (
                    <div key={cat.name} className="space-y-2 pb-4 border-b border-[var(--color-border)]/15">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-foreground)] font-display block">
                        {cat.name}
                      </span>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {filteredTech.map((tech) => (
                          <span 
                            key={tech.name} 
                            className="text-[9px] font-mono font-semibold uppercase tracking-[0.05em] px-2.5 py-1 rounded-md bg-[var(--color-secondary)] text-[var(--color-muted-foreground)]"
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {mobileTab === 'writing' && (
            <motion.div
              key="writing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  Thoughts & Articles
                </span>
                <h2 className="text-2xl font-extrabold font-display tracking-tight mt-1 text-[var(--color-foreground)]">
                  Journal
                </h2>
              </div>

              {/* Flat Editorial Publication Rows */}
              <div className="space-y-4 pt-2">
                {blogsData.map((blog, idx) => (
                  <a
                    key={idx}
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-5 border-b border-[var(--color-border)]/15 active:opacity-80 transition-opacity space-y-2"
                  >
                    <div className="flex justify-between items-center text-[8px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary)]">
                      <span>Medium Post</span>
                      <span>#{String(idx + 1).padStart(2, '0')}</span>
                    </div>
                    
                    <h3 className="text-base font-extrabold tracking-tight text-[var(--color-foreground)] leading-snug">
                      {blog.title}
                    </h3>

                    <p className="text-xs text-[var(--color-muted-foreground)] line-clamp-3 leading-relaxed font-light">
                      {blog.description}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[8.5px] font-mono font-bold uppercase text-[var(--color-muted-foreground)]">
                      <span>5 min read</span>
                      <span className="flex items-center gap-0.5 text-[var(--color-primary)]">
                        Read Story <ArrowUpRight size={10} />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}

          {mobileTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6 pb-4"
            >
              <div>
                <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  Connect Directly
                </span>
                <h2 className="text-2xl font-extrabold font-display tracking-tight mt-1 text-[var(--color-foreground)]">
                  Get In Touch
                </h2>
              </div>

              <Education />

              {/* Direct Mail Pill */}
              <button
                onClick={handleCopyEmail}
                className="w-full bg-[var(--color-secondary)]/50 rounded-2xl p-4 flex justify-between items-center active:scale-[0.98] transition-transform"
              >
                <div className="space-y-0.5">
                  <span className="block text-[8px] font-mono font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
                    Primary Mailbox
                  </span>
                  <span className="text-xs font-semibold tracking-wide text-[var(--color-foreground)] font-mono">
                    yonatanafewerk@gmail.com
                  </span>
                </div>
                <div className="p-2 rounded-full bg-[var(--color-background)] text-[var(--color-foreground)] border border-[var(--color-border)]/20">
                  {emailCopied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                </div>
              </button>

              {/* Message composer box - Flat Fills */}
              <div className="bg-[var(--color-secondary)]/30 rounded-2xl p-5 space-y-4">
                <div className="space-y-0.5">
                  <span className="block text-[8px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary)]">
                    Quick Composer
                  </span>
                  <h3 className="text-xs font-extrabold text-[var(--color-foreground)] font-display uppercase tracking-wider">
                    Draft a quick message
                  </h3>
                </div>
                <textarea
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Hey Yonatan, I'd love to chat about a project..."
                  className="w-full h-24 bg-[var(--color-background)]/60 p-3 rounded-xl text-xs text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)]/50 focus:outline-none transition-all resize-none font-light border-0"
                />
                <div className="flex gap-2">
                  <a
                    href={getMailtoLink()}
                    className="flex-1 flex justify-center items-center gap-1 py-2.5 rounded-full bg-[var(--color-secondary)] text-[9px] font-bold uppercase tracking-wider text-[var(--color-foreground)] active:scale-0.97 transition-transform"
                  >
                    Send Email
                  </a>
                  <a
                    href={getTelegramLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex justify-center items-center gap-1 py-2.5 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-[9px] font-bold uppercase tracking-wider active:scale-0.97 transition-transform"
                  >
                    Telegram
                  </a>
                </div>
              </div>

              {/* Minimalist directories */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/yonatan-afewerk/', icon: <Linkedin size={13} /> },
                  { name: 'GitHub', url: 'https://github.com/Yehonatal', icon: <Github size={13} /> },
                  { name: 'Telegram', url: 'https://t.me/yonatanafewerk', icon: <Send size={13} /> },
                  { name: 'Medium', url: 'https://medium.com/@yonatanafewerk', icon: <BookOpen size={13} /> },
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[var(--color-secondary)]/50 rounded-xl p-3 flex items-center justify-between text-[11px] font-bold text-[var(--color-foreground)] uppercase tracking-wider active:scale-95"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--color-muted-foreground)]">{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                    <ArrowUpRight size={10} className="text-[var(--color-muted-foreground)] opacity-60" />
                  </a>
                ))}
              </div>


            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Glassmorphic Tab Bar Navigation - Flat (No Borders, No Shadows) */}
      <nav className="fixed bottom-5 inset-x-5 max-w-md mx-auto h-12 bg-[var(--color-background)]/85 backdrop-blur-xl rounded-full px-2 flex items-center justify-between z-[130] overflow-hidden border-t border-[var(--color-border)]/10">
        {[
          { id: 'home', label: 'Home', icon: <User size={16} /> },
          { id: 'works', label: 'Works', icon: <Briefcase size={16} /> },
          { id: 'skills', label: 'Skills', icon: <Cpu size={16} /> },
          { id: 'writing', label: 'Journal', icon: <BookOpen size={16} /> },
          { id: 'contact', label: 'Contact', icon: <MessageSquare size={16} /> },
        ].map((tab) => {
          const isActive = mobileTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setMobileTab(tab.id as any)}
              className="relative flex items-center justify-center transition-all cursor-pointer h-9 px-3 rounded-full focus:outline-none"
            >
              {/* Flat active background pill */}
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-[var(--color-primary)] rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              
              <div className={`z-10 flex items-center gap-1.5 transition-colors duration-200 ${
                isActive ? 'text-[var(--color-primary-foreground)] font-bold' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
              }`}>
                <span>{tab.icon}</span>
                {isActive && (
                  <motion.span 
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="text-[9px] font-black uppercase tracking-widest overflow-hidden whitespace-nowrap"
                  >
                    {tab.label}
                  </motion.span>
                )}
              </div>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
