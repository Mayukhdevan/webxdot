import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries'
import React from 'react'

type Props = {}

const Page = async (props: Props) => {
  const userDetails = await verifyAndAcceptInvitation()
  console.log('user details:', userDetails)

  // get user details
  const user = await getAuthUserDetails()

  return <div>Agency Dashboard</div>
}

export default Page
