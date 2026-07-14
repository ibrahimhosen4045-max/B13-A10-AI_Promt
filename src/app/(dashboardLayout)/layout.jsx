"use client"
import DashNavber from "@/component/DashBoard/DashNavber"
import Navber from "@/component/Navber"

import { authClient } from "@/lib/auth-client"

const DashboardLayout = ({children}) => {
  const {data: session, isPanding} = authClient.useSession()
  const user = session?.user
  return (
    
    <div className="min-h-screen bg-[#0a0516] text-white flex relative overflow-hidden">
      <DashNavber userDetails = {user}></DashNavber>
      {children}
    </div>
  )
}

export default DashboardLayout
