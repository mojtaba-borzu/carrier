//libraries
import Image from 'next/image'
import { AuthService } from '../../auth/AuthService'
import Logout_icon from '../../common/icons/Logout_icon'

function NavBar({ getSummaryInfo }: { getSummaryInfo? }) {
  const authService = new AuthService()

  const handleLogout = () => {
    localStorage.clear()
    authService.logout()
  }

  return (
    <nav className="flex flex-row items-center w-full  gap-[10px] justify-between">
      <div className="flex flex-row items-center gap-[4px]">
        <Image width={40} height={40} src="/images/Profile.png" alt="profile" />
        <span className="text-[18px] ">{getSummaryInfo?.data?.fullName}</span>
      </div>
      <span
        onClick={handleLogout}
        className="mx-[16px] flex w-[40px] h-[40px] cursor-pointer items-center justify-center rounded-[8px] bg-[#DFF0FF] hover:text-red-700"
      >
        <Logout_icon />
      </span>
    </nav>
  )
}

export default NavBar
