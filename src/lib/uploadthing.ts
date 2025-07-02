import {
  generateReactHelpers,
  generateUploadButton,
  generateUploadDropzone,
} from '@uploadthing/react'
import type { OurFileRouter } from '@/app/api/uploadthing/core'

export const UploadBtn = generateUploadButton<OurFileRouter>()
export const UploadDropzone = generateUploadDropzone<OurFileRouter>()
export const { uploadFiles, useUploadThing } =
  generateReactHelpers<OurFileRouter>()
