import { StrictMode, startTransition } from 'react'
import { createRoot } from 'react-dom/client'
import { getRouter } from './router'
import { RouterProvider } from '@tanstack/react-router'

startTransition(() => {
  const router = getRouter()
  
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
})