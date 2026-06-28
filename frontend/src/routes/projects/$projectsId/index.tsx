import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/$projectsId/')({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/visitor',
      search: {
        project: params.projectsId,
      },
    })
  },
})

