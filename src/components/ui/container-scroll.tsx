'use client'

import React, { useRef } from 'react'
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion'

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

  const scale = useTransform(scrollYProgress, [0, 2], scaleDimensions())
  const translate = useTransform(scrollYProgress, [0, 1], [20, 0])

  return (
    <div
      className='flex justify-center relative overflow-hidden md:-mt-52 -mt-48 z-50 w-full p-10 min-h-[35vh] md:min-h-[1600px]'
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
  translate,
  children,
}: {
  scale: any
  translate: MotionValue<number>
  children: React.ReactNode
}) => {
  return (
    <motion.div
      style={{
        scale,
        transformOrigin: 'bottom',

        // rotateX: translate,
      }}
    >
      {children}
    </motion.div>
  )
}
