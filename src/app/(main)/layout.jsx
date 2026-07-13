import Footer from "@/component/Footer"
import Navber from "@/component/Navber"

const RootLayout = ({children}) => {
  return (
    <div>
      <Navber></Navber>
      {children}
      <Footer></Footer>
    </div>
  )
}

export default RootLayout
