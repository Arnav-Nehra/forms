'use client'

import FeaturesSection from "@/components/LandingPage/features-section"
import Footer from "@/components/LandingPage/footer"
import HeroSection from "@/components/LandingPage/hero-section"
import HowItWorks from "@/components/LandingPage/how-it-works"
import Navbar from "@/components/LandingPage/Navbar"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
    const { status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/create-form")
        }
    }, [status, router])

    return (
        <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <HeroSection />
          <HowItWorks />
          <FeaturesSection />
        </main>
        <Footer />
      </div>
)}