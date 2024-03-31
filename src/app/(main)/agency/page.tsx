import AgencyDetails from '@/components/forms/agency-details'
import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries'
import { currentUser } from '@clerk/nextjs'
import { Plan } from '@prisma/client'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  searchParams: {
    plan: Plan
    state: string
    code: string
  }
}

const Page = async ({ searchParams }: Props) => {
  const agencyId = await verifyAndAcceptInvitation()
  console.log('user details:', agencyId)

  // get user details
  const user = await getAuthUserDetails()

  if (agencyId) {
    if (user?.role === 'SUBACCOUNT_USER' || user?.role === 'SUBACCOUNT_GUEST') {
      return redirect('/subaccount')
    } else if (user?.role === 'AGENCY_OWNER' || user?.role === 'AGENCY_ADMIN') {
      if (searchParams.plan) {
        return redirect(`/agency/${agencyId}/billing?plan=${searchParams.plan}`)
      }

      if (searchParams.state) {
        const stateArray = searchParams.state.split('___')
        const statePath = stateArray[0]
        const stateAgencyId = stateArray[1]

        if (!stateAgencyId) return <div>Not authorized</div>

        return redirect(
          `/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`
        )
      } else {
        return redirect(`/agency/${agencyId}`)
      }
    } else {
      return <div>Not authorized</div>
    }
  }

  const authUser = await currentUser()

  return (
    <div className='mt-4 flex justify-center items-center'>
      <div className='max-w-[850px] border-[1px] rounded-xl p-4 '>
        <h1 className='text-4xl'>Create An Agency</h1>
        <AgencyDetails data={{companyEmail: authUser?.emailAddresses[0].emailAddress}}/>
      </div>
    </div>
  )
}

export default Page
