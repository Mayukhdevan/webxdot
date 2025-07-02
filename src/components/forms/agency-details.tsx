'use client'

import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Agency } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { NumberInput } from '@tremor/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { AlertDialog } from '../ui/alert-dialog'
import { useToast } from '../ui/use-toast'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import FileUpload from '../global/file-upload'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'
import {
  saveActivityLogsNotification,
  updateAgencyDetails,
} from '@/lib/queries'
import { Button } from '../ui/button'
import Loading from '../global/loading'

type Props = {
  data: Partial<Agency>
}

const FormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Agency name must be atleast 2 characters' }),
  companyEmail: z.string().min(1),
  companyPhone: z.string().min(1),
  whiteLabel: z.boolean(),
  address: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  agencyLogo: z.string().min(1),
})

const AgencyDetails = ({ data }: Props) => {
  const { toast } = useToast()
  const router = useRouter()
  const [deletingAgency, setDeletingAgency] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: data?.name,
      companyEmail: data?.companyEmail,
      companyPhone: data?.companyPhone,
      whiteLabel: data?.whiteLabel || false,
      address: data?.address,
      city: data?.city,
      zipCode: data?.zipCode,
      state: data?.state,
      country: data?.country,
      agencyLogo: data?.agencyLogo,
    },
  })

  const isLoading = form.formState.isSubmitting

  useEffect(() => {
    console.log('data changed ------->  caused re-render')
    if (data) {
      form.reset(data)
    }
  }, [data, form])

  const handleSubmit = () => {
    console.log('form submitted')
  }

  return (
    <AlertDialog>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Agency Information</CardTitle>
          <CardDescription>
            Lets create an agency for your business. You can edit agency
            settings later from agency settings tab.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='space-y-4'
            >
              <FormField
                disabled={isLoading}
                control={form.control}
                name='agencyLogo'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agency Logo</FormLabel>
                    <FileUpload
                      apiEndpoint='agencyLogo'
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormItem>
                )}
              />
              <div className='flex md:flex-row gap-4'>
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Agency Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Your Agency Name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name='companyEmail'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Agency Email</FormLabel>
                      <FormControl>
                        <Input placeholder='webx@example.com' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                disabled={isLoading}
                control={form.control}
                name='whiteLabel'
                render={({ field }) => (
                  <FormItem className='flex items-center justify-between rounded-lg border gap-4 p-4'>
                    <div>
                      <FormLabel>Whitelabel Agency</FormLabel>
                      <FormDescription>
                        Turning on whitelabel will mode will show your agency
                        logo to all subaccounts by default. You can overwrite
                        this functionality through subaccount settings.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name='companyPhone'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Agency Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder='Phone' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder='3.141 st...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex md:flex-row gap-4'>
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name='city'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder='City' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name='state'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder='State' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name='zipCode'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Zipcode</FormLabel>
                      <FormControl>
                        <Input placeholder='123456' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                disabled={isLoading}
                control={form.control}
                name='country'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder='Country' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {data?.id && (
                <div className='flex flex-col gap-2'>
                  <FormLabel>Create A Goal</FormLabel>
                  <FormDescription>
                    ✨ Create a goal for your agency. As your business grows
                    your goals grow too so dont forget to set the bar higher!
                  </FormDescription>
                  <NumberInput
                    defaultValue={data?.goal}
                    onValueChange={async (val: number) => {
                      if (!data?.id) return
                      await updateAgencyDetails(data.id, { goal: val })
                      await saveActivityLogsNotification({
                        agencyId: data.id,
                        description: `Updated the agency goal to | ${val} Sub Account`,
                        subAccountId: undefined,
                      })
                      router.refresh()
                    }}
                    min={1}
                    className='bg-background !border !border-input'
                    placeholder='Sub Account Goal...'
                  />
                </div>
              )}
              <Button disabled={isLoading} type='submit'>
                {isLoading ? <Loading /> : 'Save Agency Information'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  )
}

export default AgencyDetails
