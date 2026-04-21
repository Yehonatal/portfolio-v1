const FooterSection = () => {
  return (
    <footer className="bg-[var(--color-background)] text-[var(--color-foreground)] border-t border-[var(--color-border)] pt-16 pb-10 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 border-b border-[var(--color-border)] pb-12 gap-12">
          <div className="md:pr-12 md:border-r border-[var(--color-border)] md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight leading-none mb-6 text-[var(--color-foreground)]">
              The Dispatch
            </h2>
            <p className="text-sm font-light max-w-md leading-relaxed text-[var(--color-muted-foreground)]">
              Currently open to remote opportunities, collaborations, and
              architectural discourse.
            </p>
          </div>

          <div className="md:w-1/2 md:pl-4 w-full grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] border-b border-[var(--color-border)] pb-2 text-[var(--color-muted-foreground)]">
                Directory
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    name: 'LinkedIn',
                    url: 'https://www.linkedin.com/in/yonatan-afewerk/',
                  },
                  { name: 'GitHub', url: 'https://github.com/Yehonatal' },
                  { name: 'Telegram', url: 'https://t.me/Jehonatal' },
                  { name: 'Medium', url: 'https://medium.com/@yonatanafewerk' },
                  {
                    name: 'Resume',
                    url: 'https://drive.google.com/file/d/1lFQogpWl42L-UE5DvY_40laKmA_0sXlf/view?usp=sharing',
                  },
                ].map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium uppercase tracking-[0.1em] text-[var(--color-foreground)] hover:text-[var(--color-muted-foreground)] transition-colors"
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] border-b border-[var(--color-border)] pb-2 text-[var(--color-muted-foreground)]">
                Direct Line
              </h3>
              <div>
                <span className="block text-[10px] font-medium uppercase tracking-widest mb-2 text-[var(--color-muted-foreground)]">
                  Wire
                </span>
                <a
                  href="mailto:yonatanafewerk@gmail.com"
                  className="text-xs font-medium break-all text-[var(--color-foreground)] hover:text-[var(--color-muted-foreground)] transition-colors"
                >
                  yonatanafewerk@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
            Vol. I — © {new Date().getFullYear()} Yonatan Afewerk
          </div>
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] px-4 py-2 border border-[var(--color-border)] text-[var(--color-muted-foreground)]">
            Published globally
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
