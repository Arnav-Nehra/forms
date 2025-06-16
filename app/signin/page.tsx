'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useState } from "react"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { callbackUrl: "/" })
    } catch (error) {
      console.error("Sign in error:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E4] to-white flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#FFE3E1] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-[#FFD1D1] rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#FF9494] rounded-full opacity-10 animate-pulse"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF9494] to-[#FFD1D1] shadow-lg">
              <span className="text-lg font-bold text-white">F</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">FormAI</span>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-600">Sign in to continue creating amazing forms</p>
        </div>

        {/* Sign In Card */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Google Sign In Button */}
              <Button
                size="lg"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-[#FFD1D1] px-6 py-4 text-lg font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                
                {isLoading ? "Signing in..." : "Continue with Google"}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Secure sign-in powered by Google</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 text-center">
                <div className="flex items-center justify-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-[#FF9494] rounded-full"></div>
                  <span>Access your saved forms instantly</span>
                </div>
                <div className="flex items-center justify-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-[#FFD1D1] rounded-full"></div>
                  <span>Sync across all your devices</span>
                </div>
                <div className="flex items-center justify-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-[#FFE3E1] rounded-full"></div>
                  <span>Enterprise-grade security</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 space-y-4">
          <p className="text-sm text-gray-500">
            New to FormAI?{" "}
            <Link href="/" className="text-[#FF9494] hover:text-[#FFD1D1] font-medium transition-colors">
              Learn more about our AI-powered forms
            </Link>
          </p>

          <div className="flex items-center justify-center space-x-6 text-xs text-gray-400">
            <Link href="#" className="hover:text-gray-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gray-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-gray-600 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
