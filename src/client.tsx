import { StrictMode, startTransition } from 'react'
import { createRoot } from 'react-dom/client'
import { getRouter } from './router'
import { RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LangProvider } from './lib/i18n'
import { Toaster } from './components/ui/sonner'

startTransition(async () => {
  const router = getRouter()
  console.log('[BOL] Router created, loading...')
  await router.load()
  console.log('[BOL] Router loaded, current location:', router.state.location)
  console.log('[BOL] Route matches:', router.state.matches.map(m => m.route.id))
  
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={router.context.queryClient}>
        <LangProvider>
          <RouterProvider router={router} />
          <Toaster />
        </LangProvider>
      </QueryClientProvider>
    </StrictMode>
  )
  console.log('[BOL] App rendered')
})