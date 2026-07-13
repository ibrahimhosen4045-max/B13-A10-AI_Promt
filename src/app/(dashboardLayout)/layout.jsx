
import DashNavber from "@/component/DashBoard/DashNavber"
import Navber from "@/component/Navber"

const DashboardLayout = ({children}) => {
  return (
    
    <div className="min-h-screen bg-[#0a0516] text-white flex relative overflow-hidden">
      <DashNavber></DashNavber>
      {children}
    </div>
  )
}

export default DashboardLayout
