import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
// import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
// import { TanstackDevtools } from '@tanstack/react-devtools'
import AOS from 'aos'
import 'aos/dist/aos.css'

import Navbar from '@/components/Navbar'
import Loading from '@/components/Loading'

import appCss from '../styles.css?url'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Yonatan Afewerk : Software Engineer',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      { rel: 'icon', href: '/favicon.svg', type: 'image/x-icon' },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setHydrated(true)
    AOS.init({ once: true })
  }, [])

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var stored = localStorage.getItem('theme') || localStorage.getItem('visitor-theme');
              var theme = 'dark';
              if (stored === 'light' || stored === 'dark') {
                theme = stored;
              } else {
                var mql = window.matchMedia('(prefers-color-scheme: dark)');
                if (mql.matches === false) theme = 'light';
              }
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (e) {}
          })();
        ` }} />
      </head>
      <body suppressHydrationWarning>

        {(!hydrated || loading) ? (
          <Loading onComplete={() => setLoading(false)} />
        ) : (
          children
        )}

        <Scripts />
      </body>
    </html>
  )
}
