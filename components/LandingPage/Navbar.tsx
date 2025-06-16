import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF9494] to-[#FFD1D1]">
            <span className="text-sm font-bold text-white">F</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">FormAI</span>
        </div>

        <div className="flex items-center space-x-3">
          <Link href="/signin" className="text-gray-600 hover:text-gray-900">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-md">Get started</Button>
        </div>
      </div>
    </nav>
  )
}
