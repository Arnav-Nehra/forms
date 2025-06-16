import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Play, ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)] py-12">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <Badge variant="outline" className="text-[#FF9494] border-[#FFD1D1]">
              FormAI launches v2.0 →
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Turn simple sentences into smart <span className="text-[#FF9494]">Google Forms</span> — instantly.
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              No more dragging, dropping, and formatting — just prompt.
            </p>

            <p className="text-lg text-gray-500">Built for teachers, teams, and anyone who hates building forms.</p>
          </div>

          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-lg font-medium rounded-md"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </Button>
          </div>

          <p className="text-sm text-gray-500">No credit card required.</p>
        </div>

        {/* Right Content - Interactive Demo */}
        <div className="relative">
          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-0">
              {/* Form Creation Interface */}
              <div className="bg-gradient-to-br from-[#FFF5E4] to-[#FFE3E1] p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <Badge className="bg-[#FF9494] text-white animate-pulse">AI Generating...</Badge>
                </div>

                <div className="space-y-3">
                  <div className="text-sm text-gray-600">Tell FormAI what you need:</div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-gray-900 font-medium animate-pulse">
                      "Create a customer feedback survey for my restaurant"
                    </div>
                  </div>
                </div>
              </div>

              {/* Generated Form Preview */}
              <div className="p-6 bg-white">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Customer Feedback Survey</h3>
                    <Button size="sm" variant="outline" className="text-[#FF9494] border-[#FFD1D1]">
                      <Play className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {/* Continuously animated form fields */}
                    <div className="p-3 bg-gray-50 rounded-lg animate-pulse">
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        How would you rate your overall experience?
                      </div>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-4 h-4 text-yellow-400 fill-current animate-bounce"
                            style={{ animationDelay: `${star * 200}ms` }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg animate-pulse" style={{ animationDelay: "1s" }}>
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        What did you enjoy most about your visit?
                      </div>
                      <div className="h-8 bg-white rounded border"></div>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg animate-pulse" style={{ animationDelay: "2s" }}>
                      <div className="text-sm font-medium text-gray-700 mb-1">Would you recommend us to others?</div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full border-2 border-[#FF9494] animate-ping"></div>
                          <span className="text-sm text-gray-600">Yes, definitely</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full border-2 border-gray-300"></div>
                          <span className="text-sm text-gray-600">Maybe</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-[#FF9494] hover:bg-[#FFD1D1] text-white animate-pulse">
                    Create in Google Forms
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Floating elements with continuous animation */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#FFE3E1] rounded-full opacity-60 animate-bounce"></div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#FFD1D1] rounded-full opacity-40 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
