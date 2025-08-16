import TechStack from './TechStack'
import EducationSection from './Education'

type HeroProp = {
  name?: string
  title?: string
  contact?: string
  description?: string
}

const Hero = ({
  name = 'Yonatan Afewerk',
  title = 'Open to Remote | Part-Time | Full-Time',
  contact = '+251 966 339 226 • yonatanafewerk@gmail.com',
  description = 'Building is my passion, and programming is how I turn ideas into reality. From crafting sleek interfaces to tackling tricky problems, I love seeing projects come to life one line of code at a time.',
}: HeroProp) => {
  return (
    <>
      <section className="py-20 max-w-5xl mx-auto mt-2 text-[var(--color-foreground)] dark:text-[var(--color-foreground)]">
        <div className="flex justify-between flex-wrap">
          <div data-aos="fade-up" data-aos-delay="150">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              Hey, I’m {name} 👋
            </h1>

            <p className="text-sm text-[var(--color-secondary-foreground)] mb-1">
              {title}
            </p>
            <p className="text-sm text-[var(--color-muted-foreground)] mb-6">
              {contact}
            </p>

            <p className="max-w-xl text-base text-[var(--color-muted-foreground)] mb-8">
              {description} <br />
            </p>
            <div>
              <a
                href="https://drive.google.com/file/d/1XikLskYXweus7u48pK1IhFYRJ7vpTV4R/view?usp=sharing"
                download
                className="underline text-sm text-[var(--color-secondary-foreground)] hover:text-[var(--color-primary)] "
              >
                Download Resume
              </a>
            </div>
          </div>

          <section>
            <EducationSection />
          </section>
        </div>
      </section>

      <section>
        <TechStack />
      </section>
    </>
  )
}

export default Hero
