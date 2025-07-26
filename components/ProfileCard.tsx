import { AiFillLinkedin } from "react-icons/ai"
import { BsFillCloudArrowDownFill } from "react-icons/bs"
import { FaCoffee } from "react-icons/fa"
import { ProfileData } from "../types"
import MediaIcons from "./MediaIcons"
import MyLink from "./MyLink"
import Slide from "./Slide"
import Typing from "./Typing"
import { useState } from "react"
import { useReactiveVar } from "@apollo/client"
import { showMenu } from "../apollo-client"

interface Props {
  profileData: ProfileData
}

export default function ProfileCard({ profileData }: Props) {
  const [showPhone, setShowPhone] = useState(false)
  return (
    <div className="profile h-full lg:w-[42rem] xl:w-[48rem] bg-gray-900 rounded-lg relative lg:block hidden">
      <div className="relative z-40 w-full h-full myShadow">
        <Slide images={profileData.bgImages} />

        <div className="relative z-20 w-56 h-56 mx-auto rounded-full -mt-36 profilePic">
          <img
            src={profileData.ownersPhoto.url}
            alt="userPic"
            className="w-full h-full block p-0 z-20 relative object-cover rounded-full border-4 border-[#1c1b1b] border-solid"
          />
        </div>

        <h1 className="text-center text-gray-300 text-[3.4rem] font-medium mt-4 mb-0.5">
          {profileData.name}
        </h1>

        <Typing />
        <MediaIcons />

        <button
          type="button"
          onClick={() => { if (typeof window !== 'undefined') (window as any).__showPhoneOnMenuOpen = true; showMenu(true); }}
          className="flex items-center justify-center mx-auto mt-4 mb-2 w-56 py-2 font-semibold rounded-lg shadow transition-all duration-200 bg-[#ff9f22] text-black hover:bg-white hover:text-[#ff9f22] hover:shadow-[0_0_0_4px_#ff9f22] focus:outline-none"
        >
          <FaCoffee className="w-6 h-6 mr-2" />
          Buy Me a Coffee
        </button>

        <div className="absolute bottom-0 left-0 flex w-full h-28 borderLeft customLine">
          <MyLink
            name="download cv"
            Icon={BsFillCloudArrowDownFill}
            url={profileData.cv}
            border
          />
          <MyLink
            name="my linkedin"
            Icon={AiFillLinkedin}
            url="www.linkedin.com/in/kenzo-tchikaya"
          />
        </div>
      </div>
    </div>
  )
}
