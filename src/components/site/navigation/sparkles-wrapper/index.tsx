'use client'

import { SparklesCore } from '@/components/ui/sparkles'
import { ActiveTheme } from '@/utils/global.enums'
import { useTheme } from 'next-themes'
import React from 'react'

const SparklesWrapper = () => {
  const { theme } = useTheme()

  const particaleTheme = theme === ActiveTheme.DARK ? '#03070f' : '#FFFFFF'

  return (
    <SparklesCore
      background='transparent'
      minSize={0.4}
      maxSize={1}
      particleDensity={1000}
      className='w-full h-full relative -top-[175px]'
      particleColor={particaleTheme}
    />
  )
}

export default SparklesWrapper
