const Education = () => (
  <section
    data-aos="fade-up"
    data-aos-delay="150"
    className="max-w-5xl mx-auto"
  >
    <div className="mb-6">
      <h3 className="text-xl font-bold text-[var(--color-secondary-foreground)]">
        Haramaya University
      </h3>
      <p className="italic text-[var(--color-muted-foreground)]">
        Bachelor of Science in Software Engineering
      </p>
      <p className="mt-1 text-[var(--color-muted-foreground)]">
        Expected Graduation:{' '}
        <span className="font-semibold text-[var(--color-foreground)]">
          January 2026
        </span>
      </p>
      <p className="font-extralight text-[var(--color-muted-foreground)]">
        CGPA:{' '}
        <span className="font-semibold text-[var(--color-foreground)]">
          3.93 (<span className="font-extralight">Dean’s List</span>)
        </span>
      </p>
    </div>
  </section>
)

export default Education
