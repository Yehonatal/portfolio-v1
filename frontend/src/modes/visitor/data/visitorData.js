export const VISITOR_DATA = {
  name: { first: "Yonatan", last: "Afewerk" },
  initials: "YA",
  title: ["Software Engineer", "Creative Developer"],
  location: "Addis Ababa, Ethiopia",
  availability: "Open to Work",
  bio: `I build things that sit at the edge of what software
is supposed to do. From Addis Ababa, working everywhere.
Equal parts engineer and creative — the tension between
those two things is where all the interesting work lives.`,
  linesOfCode: 247832,
  email: "yonatanafewerk@gmail.com",
  links: {
    github: "https://github.com/Yehonatal",
    linkedin: "https://linkedin.com/in/yonatan-afewerk",
  },
  projects: [
    {
      id: "01",
      name: "Awash Feed",
      year: "2026",
      role: "Engineering + Design",
      description: "A privacy-first RSS reader and newsletter aggregator that consolidates content into a local reading space. Features tracker stripping, local AI summarization, and offline-first database syncing.",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "Better Auth"],
      liveUrl: "https://awash-feed.vercel.app/",
      codeUrl: "https://github.com/Yehonatal/awash-feed",
      imagePath: "/covers/projects/awash/home.png"
    },
    {
      id: "02",
      name: "Fidel Tools",
      year: "2025",
      role: "NLP Engineering",
      description: "A modular, schema-driven NLP pre-processing library published on npm for Amharic and Ethiopic text pipelines. Resolves prefixes, stemming, stopword removal, and transliterations.",
      stack: ["TypeScript", "Next.js", "TailwindCSS", "pnpm", "npm"],
      liveUrl: "https://fidel-tools.vercel.app/",
      codeUrl: "https://github.com/Yehonatal/fidel-tools",
      imagePath: "/covers/projects/fideltools/home.png"
    },
    {
      id: "03",
      name: "CourseHub",
      year: "2024",
      role: "Fullstack Architecture",
      description: "Adaptive academic ecosystem for Ethiopian universities. Centralizes curriculum resources, community moderation tools, and integrates client-side Google Gemini AI study aids.",
      stack: ["Next.js", "Supabase", "PostgreSQL", "MongoDB", "Drizzle ORM"],
      liveUrl: "https://coursehub-brown.vercel.app/",
      codeUrl: "https://github.com/Yehonatal/coursehub",
      imagePath: "/covers/projects/coursehub_preview/home.png"
    },
    {
      id: "04",
      name: "RAG Chatbot Benchmarker",
      year: "2024",
      role: "AI & Benchmarking",
      description: "Retrieval-Augmented Generation platform comparing Haystack Python pipelines against Node.js RAG modules. Features client-side embeddings and parallel benchmarking metrics.",
      stack: ["Python", "Node.js", "WebSockets", "VectorDB", "React"],
      liveUrl: "https://github.com/Yehonatal/Chatbot",
      codeUrl: "https://github.com/Yehonatal/Chatbot",
      imagePath: "/covers/projects/chatbot_preview/chat.png"
    }
  ],
  process: [
    { id: "A", label: "Problem" },
    { id: "B", label: "Break It" },
    { id: "C", label: "Build the\nWrong Thing" },
    { id: "D", label: "Build the\nRight Thing" },
    { id: "E", label: "Ship It\nAnyway" },
  ],
  consoleMessage: `if you're reading this, you're probably\nthe kind of person I want to work with.\n→ yonatanafewerk@gmail.com`,
}
