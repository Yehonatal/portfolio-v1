import Hero from '@/components/Hero'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <>
      <section className="p-4 bg-[var(--color-accent)] text-[var(--on-primary)]">
        <Hero />
      </section>
    </>
  )
}
