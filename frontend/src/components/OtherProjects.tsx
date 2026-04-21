import othersData from '@/data/others.json'
import { ArrowUpRight } from 'lucide-react'

const OtherProjects = () => {
  return (
    <section className="py-16 bg-[var(--color-background)] border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-[var(--color-border)] pb-8">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-6">
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-[var(--color-foreground)]">
              Classifieds
            </h2>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted-foreground)] border-l border-[var(--color-border)] pl-4">
              Vol. I — UI/UX
            </span>
          </div>
          <p className="mt-6 text-sm font-light max-w-2xl border-l border-[var(--color-border)] pl-4 text-[var(--color-muted-foreground)]">
            A repository of interactive experiments and frontend explorations.
            Strictly business.
          </p>
        </div>

        <div className="border-b border-[var(--color-border)] pb-2 mb-8 text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--color-muted-foreground)]">
          Classified Index
        </div>

        <ul className="columns-1 md:columns-2 lg:columns-3 gap-8">
          {othersData.map((item, index) => (
            <li
              key={index}
              className="border border-[var(--color-border)] mb-8 break-inside-avoid bg-[var(--color-secondary)] hover:border-[var(--color-foreground)] transition-colors duration-500"
            >
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="aspect-[3/2] border-b border-[var(--color-border)] overflow-hidden">
                  <img
                    src={item.img}
                    alt={`Experiment ${index}`}
                    className="w-full h-full object-cover grayscale-[0.8] group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="p-4 flex justify-between items-center text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)] transition-colors">
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
                    Ad No.{String(index + 1).padStart(3, '0')}
                  </span>
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default OtherProjects
