import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <ClerkProvider appearance={{ baseTheme: dark }}>
    <div className='h-full flex justify-center items-center'>{children}</div>
  </ClerkProvider>
)

export default AuthLayout
