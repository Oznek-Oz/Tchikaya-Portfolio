import Price from "./Price"
import { FaReact } from "react-icons/fa"
import PriceSkeleton from "./PriceSkeleton"
import { useQuery } from "@apollo/client"
import profileOperations from "../../graphqlOperations/profile"
import { PriceData } from "../../types"
import { DiCodeigniter } from "react-icons/di"
import { GiCondorEmblem } from "react-icons/gi"
import { FaEnvelope } from "react-icons/fa"
import { useReactiveVar } from "@apollo/client"
import { currentMenu } from "../../apollo-client"

interface GetPricesData {
  prices: PriceData[]
}

export default function Prices() {
  const { data, loading, error } = useQuery<GetPricesData>(
    profileOperations.Queries.getPrices
  )

  const handleContactClick = () => {
    currentMenu(6) // 6 est l'ID du menu contact dans data.ts
  }

  return (
    <div>
      <ul className="prices grid sm:grid-cols-2 grid-cols-1">
        <li className="relative vCustomLine sm:before:block before:hidden before:right-0">
          <>
            {data?.prices?.[0] && <Price Icon={DiCodeigniter} price={data.prices[0]} />}
            {loading || error || (data === undefined && <PriceSkeleton />)}
          </>
        </li>

        <li>
          <>
            {data?.prices?.[1] && <Price Icon={GiCondorEmblem} price={data.prices[1]} />}
            {loading || error || (data === undefined && <PriceSkeleton />)}
          </>
        </li>
      </ul>

      {/* Message "Contact me for more" */}
      <div className="flex flex-col items-center justify-center py-12 px-8">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <FaEnvelope className="mx-auto text-5xl text-[#ff9f22] opacity-80" />
          </div>
          <h3 className="text-2xl font-bold text-gray-300 mb-4">
            Besoin d&apos;un projet personnalisé ?
          </h3>
          <p className="text-lg text-gray-500 mb-8 leading-relaxed">
            Contactez-moi pour discuter de vos besoins spécifiques et obtenir un devis personnalisé.
          </p>
          <button
            onClick={handleContactClick}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#ff9f22] hover:bg-[#e68a0a] text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <FaEnvelope className="text-xl" />
            Contactez-moi
          </button>
        </div>
      </div>
    </div>
  )
}
