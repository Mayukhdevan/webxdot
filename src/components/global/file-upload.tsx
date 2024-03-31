import { FileIcon, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { UploadDropzone } from '@/lib/uploadthing'

type Props = {
  apiEndpoint: 'agencyLogo' | 'avatar' | 'subAccountLogo' | 'media'
  onChange: (url?: string) => void
  value?: string
}

const FileUpload = ({ apiEndpoint, onChange, value }: Props) => {
  if (value) {
    const type = value.split('.').pop()

    return (
      <div className='flex flex-col justify-center items-center'>
        {type !== 'pdf' ? (
          <div className='w-40 h-40 relative'>
            <Image
              src={value}
              alt='uploaded image'
              className='object-contain'
              fill
            />
          </div>
        ) : (
          <div className='relative flex items-center p-2 mt-2 rounded-md bg-background/10'>
            <FileIcon />
            <a
              href={value}
              target='_blank'
              rel='noopener_norefferer'
              className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline'
            >
              View PDF
            </a>
          </div>
        )}

        <Button variant='ghost' onClick={() => onChange('')} type='button'>
          <X className='h-4 w-4' />
          Remove Logo
        </Button>
      </div>
    )
  }
  return (
    <div className='w-full bg-muted/30'>
      <UploadDropzone
        endpoint={apiEndpoint}
        onClientUploadComplete={res => res?.[0].url}
        onUploadError={(error: Error) => console.log(error)}
      />
    </div>
  )
}

export default FileUpload
