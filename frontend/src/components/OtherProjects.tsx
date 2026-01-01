import othersData from '@/data/others.json'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const OtherProjects = () => {
  const getSpanClass = (index: number) => {
    const patterns = [
      'lg:col-span-2 lg:row-span-2', // Large square
      'lg:col-span-1 lg:row-span-1', // Small square
      'lg:col-span-1 lg:row-span-2', // Tall
      'lg:col-span-2 lg:row-span-1', // Wide
    ]
    return patterns[index % patterns.length]
  }

  return (
    <section className="py-20 md:py-40 bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-20 md:mb-40 space-y-10">
          <div className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-primary)]">
              UI Lab
            </span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">
              Experiments & <br />
              <span className="font-serif italic font-light">
                Micro-Interactions
              </span>
            </h2>
          </div>
          <p className="text-sm md:text-lg text-gray-500 max-w-xl leading-relaxed font-medium">
            A playground for frontend explorations, UI components, and creative
            coding experiments. Each piece is a study in motion and form.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-[220px]">
          {othersData.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: (index % 4) * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl bg-[var(--color-secondary)]/5 transition-all duration-700 ${getSpanClass(index)}`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={item.img}
                  alt={`Experiment ${index}`}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <ArrowUpRight className="w-5 h-5 text-black" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[10px] font-black uppercase tracking-widest text-white drop-shadow-md">
                  Lab_{index + 1}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OtherProjects
