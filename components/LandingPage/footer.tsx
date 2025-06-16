import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <p className="text-gray-600 flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-[#FF9494] fill-current" />
            <span>by Arnav Nehra</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
