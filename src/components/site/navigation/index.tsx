import Image from 'next/image'
import React from 'react'
import { brandLogo } from '../../../../public/assets/svg'
import Link from 'next/link'
import { User } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'
import { ModeToggle } from '@/components/global/mode-toggle'

type Props = {
  user?: null | User
}

const Navigation = ({ user }: Props) => {
  return (
    <div className='p-4 flex items-center justify-between top-0'>
      <aside className='flex items-center justify-center'>
        <Image src={brandLogo} alt='brand logo' height={40} width={40} />
        <span className='text-center text-xl font-bold bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative'>
          Webx.
        </span>
      </aside>
      <nav className='hidden md:block'>
        <ul className='flex items-center gap-8 justify-center'>
          <Link href='#'>Pricing</Link>
          <Link href='#'>About</Link>
          <Link href='#'>Documentation</Link>
          <Link href='#'>Features</Link>
        </ul>
      </nav>
      <aside className='flex gap-2 item-center'>
        <Link
          href='/agency'
          className='bg-primary text-white px-4 p-2 rounded-md hover:bg-primary/80'
        >
          Login
        </Link>
        <UserButton />
        <ModeToggle />
      </aside>
    </div>
  )
}

export default Navigation
