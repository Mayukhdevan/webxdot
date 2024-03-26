'use client'

import React, { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

export const ContainerScroll = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const containerRef = useRef<any>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
  })
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const scaleDimensions = () => {
    return isMobile ? [1.1, 1] : [1, 1.1]
  }

  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions())
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div
      className='h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20 md:mt-[-460px] mt-[-350px] w-full'
      ref={containerRef}
    >
      <div
        className='w-full relative'
        style={{
          perspective: '1000px',
        }}
      >
        <Card translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  )
}

export const Card = ({
  scale,
  children,
}: {
  scale: any
  translate: any
  children: React.ReactNode
}) => {
  return (
    <motion.div
      style={{
        scale,
        transformOrigin: 'bottom',
      }}
    >
      {children}
    </motion.div>
  )
}
