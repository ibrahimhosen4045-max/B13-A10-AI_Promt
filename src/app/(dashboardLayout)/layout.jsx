"use client"
import DashNavber from "@/component/DashBoard/DashNavber"
import Navber from "@/component/Navber"

import { authClient } from "@/lib/auth-client"

const DashboardLayout = ({children}) => {
  const {data: session, isPanding} = authClient.useSession()
  const user = session?.user
  return (
    
    <div className="min-h-screen bg-[#0a0516] text-white flex relative overflow-hidden">
      <div className="lg:w-100 xl:w-90 2xl:w-85 h-screen ">
        <div className="w-72 hidden lg:flex">

        </div>
        <DashNavber userDetails = {user}></DashNavber>
      </div>
      <div className="w-full">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
