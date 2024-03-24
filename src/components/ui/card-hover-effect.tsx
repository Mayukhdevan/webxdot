'use client'

import { cn } from '@/lib/utils'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'
import { Check } from 'lucide-react'

type HoverEffectPros = {
  items: PricingCards[]
  className?: string
}

export const HoverEffect = ({ items, className }: HoverEffectPros) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 py-10', className)}>
      {items.map((item, idx) => (
        <Link
          href={`/agency?plan=${item.priceId}`}
          key={item?.title}
          className='relative group block p-2 h-full w-full'
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className='absolute inset-0 h-full w-full bg-primary/80 dark:bg-blue-300/80 block rounded-3xl'
                layoutId='hoverBackground'
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card
            className={clsx(
              'max-w-[300px] w-full h-full flex-col rounded-3xl justify-between relative z-20',
              {
                'border-2 border-primary': item.title === 'Unlimited Saas',
              }
            )}
          >
            <CardHeader>
              <CardTitle
                className={clsx('', {
                  'text-muted-foreground': item.title !== 'Unlimited Saas',
                })}
              >
                {item.title}
              </CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <span className='text-4xl font-bold'>{item.price}</span>
              <span className='text-muted-foreground'>/m</span>
            </CardContent>
            <CardFooter className='flex flex-col items-start gap-4'>
              {item.features.map(feature => (
                <div key={feature} className='flex gap-2 items-center'>
                  <Check className='text-muted-foreground' />
                  <p>{feature}</p>
                </div>
              ))}
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

// export const Card = ({
//   className,
//   children,
// }: {
//   className?: string
//   children: React.ReactNode
// }) => {
//   return (
//     <div
//       className={cn(
//         'rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20',
//         className
//       )}
//     >
//       <div className='relative z-50'>
//         <div className='p-4'>{children}</div>
//       </div>
//     </div>
//   )
// }
// export const CardTitle = ({
//   className,
//   children,
// }: {
//   className?: string
//   children: React.ReactNode
// }) => {
//   return (
//     <h4 className={cn('text-zinc-100 font-bold tracking-wide mt-4', className)}>
//       {children}
//     </h4>
//   )
// }
// export const CardDescription = ({
//   className,
//   children,
// }: {
//   className?: string
//   children: React.ReactNode
// }) => {
//   return (
//     <p
//       className={cn(
//         'mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm',
//         className
//       )}
//     >
//       {children}
//     </p>
//   )
// }
