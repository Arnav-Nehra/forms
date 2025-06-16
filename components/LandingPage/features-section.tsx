import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, BarChart3, Eye } from "lucide-react"

export default function FeaturesSection() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm font-medium text-[#FF9494] uppercase tracking-wide">Features</p>
          <h2 className="text-4xl font-bold text-gray-900">Built for power users who want simplicity</h2>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Feature 1 - Left side */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-[#FFF5E4] px-4 py-2 rounded-full">
                <Copy className="w-4 h-4 text-[#FF9494]" />
                <span className="text-[#FF9494] font-medium text-sm">Smart Reuse</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Build on what you've already created</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                FormAI remembers your previous forms and suggests improvements. Create variations instantly or use past
                forms as templates for new projects.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Auto-save templates</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Smart suggestions</span>
                </div>
              </div>
            </div>

            {/* Feature 1 - Right side visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#FFF5E4] to-[#FFE3E1] rounded-3xl p-8 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Your Form Library</span>
                    <Badge className="bg-[#FF9494] text-white text-xs">3 templates</Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-[#FF9494]">
                      <div className="text-sm font-medium text-gray-900">Customer Feedback Survey</div>
                      <div className="text-xs text-gray-500">Used 5 times • Last: 2 days ago</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-[#FFD1D1]">
                      <div className="text-sm font-medium text-gray-900">Event Registration</div>
                      <div className="text-xs text-gray-500">Used 12 times • Last: 1 week ago</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-[#FFE3E1] opacity-50">
                      <div className="text-sm font-medium text-gray-900">Employee Survey</div>
                      <div className="text-xs text-gray-500">Template ready to use</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Feature 2 - Left side visual */}
            <div className="relative order-2 lg:order-1">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-2xl border">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Form Analytics</span>
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500">Live</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                      <div className="text-2xl font-bold text-[#FF9494]">247</div>
                      <div className="text-xs text-gray-500">Responses</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                      <div className="text-2xl font-bold text-[#FFD1D1]">12</div>
                      <div className="text-xs text-gray-500">Active Forms</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                      <div className="text-2xl font-bold text-[#FFE3E1]">89%</div>
                      <div className="text-xs text-gray-500">Completion</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Customer Survey</span>
                      <span className="text-gray-900 font-medium">156 responses</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#FF9494] to-[#FFD1D1] h-2 rounded-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 - Right side */}
            <div className="space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center space-x-2 bg-[#FFF5E4] px-4 py-2 rounded-full">
                <BarChart3 className="w-4 h-4 text-[#FF9494]" />
                <span className="text-[#FF9494] font-medium text-sm">Analytics</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Track everything that matters</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                Get real-time insights into your form performance. See response rates, completion times, and identify
                drop-off points to optimize your forms.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Real-time data</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Export reports</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Feature 3 - Left side */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-[#FFF5E4] px-4 py-2 rounded-full">
                <Eye className="w-4 h-4 text-[#FF9494]" />
                <span className="text-[#FF9494] font-medium text-sm">Live Preview</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">See exactly what your users see</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                Preview your forms in real-time as you build them. Test the user experience, check mobile
                responsiveness, and make adjustments instantly.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span>Mobile preview</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  <span>Live editing</span>
                </div>
              </div>
            </div>

            {/* Feature 3 - Right side visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="ml-4 text-gray-400 text-sm">Preview Mode</div>
                  </div>

                  <div className="bg-white rounded-xl p-6 space-y-4">
                    <h4 className="font-semibold text-gray-900">Quick Survey</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-700">How satisfied are you?</label>
                        <div className="flex space-x-2 mt-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div
                              key={i}
                              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm ${i <= 4 ? "border-[#FF9494] bg-[#FF9494] text-white" : "border-gray-300"}`}
                            >
                              {i}
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button size="sm" className="w-full bg-[#FF9494] text-white">
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
