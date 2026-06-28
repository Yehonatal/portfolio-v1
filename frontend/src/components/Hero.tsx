import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, FileText, Clock, Calendar as CalendarIcon } from 'lucide-react'

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
  const m = gm + 1
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

type HeroProp = {
  name?: string
  title?: string
  description?: string
}

const Hero = ({
  name = 'Yonatan Afewerk',
  title = 'Software Engineer',
  description = 'I specialize in crafting high-performance, responsive web applications with clean architecture. From designing immersive interfaces to writing highly scalable backend systems, I build digital products that are simple, fast, and delightful to use.',
}: HeroProp) => {
  const [localTime, setLocalTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Addis_Ababa',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }
      setLocalTime(new Date().toLocaleTimeString('en-US', options))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="about" className="py-16 md:py-24 border-b border-[var(--color-border)]/15 w-full">
      <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-12 md:gap-16">
        
        {/* Bio Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 space-y-8 text-center md:text-left"
        >
          <div className="space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[var(--color-primary)]">
              {title}
            </span>
            <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-[var(--color-foreground)] leading-none">
              {name}
            </h1>
          </div>

          <p className="text-base md:text-lg leading-relaxed text-[var(--color-muted-foreground)] font-light max-w-xl">
            {description}
          </p>

          {/* Minimalist actions */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-2">
            <motion.a
              href="https://drive.google.com/file/d/1lFQogpWl42L-UE5DvY_40laKmA_0sXlf/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-none border border-[var(--color-foreground)] text-[var(--color-foreground)] bg-transparent text-xs font-bold uppercase tracking-wider hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] transition-colors duration-150"
            >
              <FileText className="w-4 h-4" />
              View Resume
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>
            
            <motion.a
              href="mailto:yonatanafewerk@gmail.com"
              whileHover={{ x: 3 }}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors underline underline-offset-4 decoration-[var(--color-primary)]"
            >
              <Mail className="w-4 h-4" />
              Get In Touch
            </motion.a>
          </div>
        </motion.div>

        {/* Headshot & Live Metadata Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-48 md:w-60 shrink-0 space-y-6 flex flex-col items-center md:items-stretch"
        >
          {/* Flat Headshot */}
          <div className="w-44 h-44 md:w-52 md:h-52 rounded-none bg-[var(--color-secondary)]/50 overflow-hidden group relative border border-[var(--color-border)]">
            {/* Soft backdrop circle */}
            <div className="absolute inset-0 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
              <svg className="w-full h-full stroke-[var(--color-primary)]/20 fill-none opacity-20" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" strokeWidth="1" />
                <path d="M 0 50 Q 50 15 100 50" strokeWidth="1" />
              </svg>
            </div>
            
            <img
              src="/me.jpg"
              alt="Yonatan Afewerk"
              className="w-40 h-40 md:w-48 md:h-48 rounded-none object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700 ease-out absolute inset-0 m-auto z-10"
            />
          </div>

          {/* Typographic widgets - Flat Column */}
          <div className="w-full text-left hidden md:block space-y-4 pt-2 border-t border-[var(--color-border)]/15">
            <div className="flex justify-between items-start">
              <div className="space-y-0.5">
                <span className="block text-[8px] font-mono font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  Addis Ababa, ET
                </span>
                <span className="block text-sm font-bold font-mono tracking-tight text-[var(--color-foreground)]">
                  {localTime || '15:42:00'}
                </span>
              </div>
              <div className="p-1 rounded-md bg-[var(--color-secondary)] text-[var(--color-primary)]">
                <Clock size={12} />
              </div>
            </div>

            <div className="flex justify-between items-start">
              <div className="space-y-0.5">
                <span className="block text-[8px] font-mono font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  Ethiopic Date
                </span>
                <span className="block text-xs font-semibold tracking-tight text-[var(--color-foreground)]">
                  {getEthiopianDate(new Date())}
                </span>
              </div>
              <div className="p-1 rounded-md bg-[var(--color-secondary)] text-[var(--color-primary)]">
                <CalendarIcon size={12} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
