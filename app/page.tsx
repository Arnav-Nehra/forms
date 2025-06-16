'use client'


import FeaturesSection from "@/components/LandingPage/features-section"
import Footer from "@/components/LandingPage/footer"
import HeroSection from "@/components/LandingPage/hero-section"
import HowItWorks from "@/components/LandingPage/how-it-works"
import Navbar from "@/components/LandingPage/Navbar"
import { signIn, useSession } from "next-auth/react"
import { Sree_Krushnadevaraya } from "next/font/google"
import Link from "next/link"

export default function Home() {
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