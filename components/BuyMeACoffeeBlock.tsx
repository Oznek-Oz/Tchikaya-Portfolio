import { FaCoffee } from "react-icons/fa"
import { useState } from "react"

export default function BuyMeACoffeeBlock() {
  const [showPhone, setShowPhone] = useState(false)
  return (
    <section className="h-full flex flex-col items-center justify-center bg-gray-900 rounded-lg p-12">
      <div className="flex flex-col items-center">
        <FaCoffee className="text-[4rem] text-[#ff9f22] mb-4 drop-shadow-lg" />
        <h2 className="text-3xl font-bold text-gray-200 mb-6 uppercase tracking-wide">Buy Me a Coffee</h2>
        <button
          type="button"
          onClick={() => setShowPhone((v) => !v)}
          className="flex items-center justify-center w-56 py-2 font-semibold rounded-lg shadow transition-all duration-200 bg-[#ff9f22] text-black hover:bg-white hover:text-[#ff9f22] hover:shadow-[0_0_0_4px_#ff9f22] focus:outline-none text-lg"
        >
          <FaCoffee className="w-6 h-6 mr-2" />
          Buy Me a Coffee
        </button>
        {showPhone && (
          <div className="mt-5 w-56 p-4 rounded-lg bg-gray-800 text-gray-100 text-center shadow-lg border border-[#ff9f22]">
            <div className="text-lg font-bold mb-1">Tchikaya Kenzo</div>
            <div className="text-xl font-mono">+237 690 456 422</div>
          </div>
        )}
      </div>
    </section>
  )
} 