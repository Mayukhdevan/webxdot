import Image from 'next/image'
import { preview } from '../../../public/assets/images'
import SparklesWrapper from '@/components/site/navigation/sparkles-wrapper'
import { pricingCards } from '@/lib/constants'
import { Card } from '@/components/ui/card'
import { HoverEffect as PricingCards } from '@/components/ui/card-hover-effect'
import { ContainerScroll } from '@/components/ui/container-scroll'
export default function Home() {
  return (
    <>
      <section className='w-full min-h-screen pt-36 flex relative flex-col items-center justify-center'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]' />
        <p className='text-center'>Run your agency, in one place</p>
        <div className='bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative'>
          <h1 className='text-center text-9xl font-bold text-[80px] md:text-[200px]'>
            Webx.
          </h1>
          <div className='w-full h-40 relative z-30 '>
            {/* Gradients */}
            <div className='relative -top-2 md:-top-4'>
              <div className='absolute inset-x-[5%] md:inset-x-0 stop-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] blur-sm' />
              <div className='absolute inset-x-[5%] md:inset-x-0 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px' />
              <div className='absolute inset-x-1/3 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] blur-sm' />
              <div className='absolute inset-x-1/3 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px' />
            </div>

            <SparklesWrapper />
          </div>
          <ContainerScroll>
            <div className='relative z-10 flex flex-col justify-center items-center'>
              <Image
                src={preview}
                alt='banner images'
                className='rounded-tl-2xl rounded-tr-2xl w-full border-muted'
                height={1200}
                width={1200}
              />
              <div className='bottom-0 dark:bg-gradient-to-t dark:from-background z-20 absolute inset-x-0 top-1/2' />
            </div>
          </ContainerScroll>
        </div>
      </section>
      <section className='gap-4 flex flex-col justify-center item-center'>
        <h2 className='text-4xl text-center'>Choose what fits you right</h2>
        <p className='text-center text-muted-foreground'>
          Our straight forward pricing plans are tailored to meet your needs. If{' '}
          {"you're"} not <br /> ready to commit you can get started for free.
        </p>
        <div className='flex justify-center gap-4 mt-6'>
          {/* WIP: Wire up free product from stripe */}
          <PricingCards items={pricingCards} />
        </div>
      </section>
    </>
  )
}
