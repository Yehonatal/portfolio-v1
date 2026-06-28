const FooterSection = () => {
  return (
    <footer className="hidden md:flex w-full py-12 border-t border-[var(--color-border)]/15 flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
      <div>
        © {new Date().getFullYear()} Yonatan Afewerk
      </div>
      <div className="flex gap-4">
        <a
          href="https://github.com/Yehonatal"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-foreground)] transition-colors"
        >
          GitHub
        </a>
        <span>•</span>
        <a
          href="https://www.linkedin.com/in/yonatan-afewerk/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-foreground)] transition-colors"
        >
          LinkedIn
        </a>
        <span>•</span>
        <a
          href="mailto:yonatanafewerk@gmail.com"
          className="hover:text-[var(--color-foreground)] transition-colors"
        >
          Email
        </a>
      </div>
    </footer>
  )
}

export default FooterSection
