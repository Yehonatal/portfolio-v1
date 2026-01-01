export type Project = {
  id: string
  images: string[]
  title: string
  description: string
  techUsed: string[]
  liveLink: string
  repoLink: string
  category: string
  date: string
  featured: boolean
}

export type Blog = {
  id: string
  cover: string
  coverSmall: string
  title: string
  description: string
  link: string
  category?: string
  date?: string
}
