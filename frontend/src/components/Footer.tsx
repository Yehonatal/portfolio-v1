const FooterSection = () => {
  return (
    <footer className="py-20 md:py-40 px-6 ">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-20 md:mb-40">
          <div className="space-y-10">
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-primary)]">
                Contact
              </span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                Let’s Talk <br />
                <span className="font-serif italic font-light">Future</span>
              </h2>
            </div>
            <p className="text-sm md:text-lg text-[var(--color-muted-foreground)] max-w-md leading-relaxed font-medium">
              Currently open to remote opportunities, collaborations, and
              interesting projects.
            </p>
          </div>

          <div className="flex flex-col lg:items-end gap-8">
            <a
              href="mailto:yonatanafewerk@gmail.com"
              className="text-xl md:text-4xl font-black tracking-tighter hover:text-[var(--color-primary)] transition-colors duration-500"
            >
              yonatanafewerk@gmail.com
            </a>
            <div className="flex flex-wrap gap-6 md:gap-10">
              {[
                {
                  name: 'LinkedIn',
                  url: 'https://www.linkedin.com/in/yonatan-afewerk/',
                },
                { name: 'GitHub', url: 'https://github.com/Yehonatal' },
                { name: 'Telegram', url: 'https://t.me/Jehonatal' },
                { name: 'Medium', url: 'https://medium.com/@yonatanafewerk' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-muted-foreground)]">
            © {new Date().getFullYear()} Yonatan Afewerk
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-muted-foreground)]">
            Built with{' '}
            <span className="text-[var(--color-primary)]">Passion</span> & Code
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
