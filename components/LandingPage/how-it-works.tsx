import { Button } from "@/components/ui/button"
import { Edit, Zap } from "lucide-react"

export default function HowItWorks() {
  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm font-medium text-[#FF9494] uppercase tracking-wide">How it works</p>
          <h2 className="text-4xl font-bold text-gray-900">From idea to form in under 60 seconds</h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF9494] via-[#FFD1D1] to-[#FFE3E1] transform -translate-y-1/2"></div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-4 relative">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100 hover:border-[#FFE3E1] transition-all duration-300 group">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF9494] to-[#FFD1D1] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                </div>

                <div className="pt-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FFF5E4] to-[#FFE3E1] rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-[#FF9494]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Connect Google</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    One-click secure connection to your Google account
                  </p>

                  {/* Mini demo */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Connected securely</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100 hover:border-[#FFE3E1] transition-all duration-300 group">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FFD1D1] to-[#FFE3E1] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                </div>

                <div className="pt-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FFE3E1] to-[#FFD1D1] rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Edit className="w-8 h-8 text-[#FF9494]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Describe Your Form</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Tell us what you need in plain English</p>

                  {/* Mini demo */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                    <div className="text-left">
                      <div className="text-xs text-gray-400 mb-1">You type:</div>
                      <div className="text-xs text-gray-700 italic">"Event registration with dietary preferences"</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100 hover:border-[#FFE3E1] transition-all duration-300 group">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FFE3E1] to-[#FF9494] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                </div>

                <div className="pt-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FFD1D1] to-[#FF9494] rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Get Your Form</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">AI creates it instantly, ready to share</p>

                  {/* Mini demo */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-[#FFF5E4] to-[#FFE3E1] rounded-xl">
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2 text-xs">
                        <Zap className="w-3 h-3 text-[#FF9494]" />
                        <span className="text-[#FF9494] font-medium">Form created!</span>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-600">Ready to share in Google Forms</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-[#FF9494] hover:bg-[#FFD1D1] text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Try it now — it's free
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
