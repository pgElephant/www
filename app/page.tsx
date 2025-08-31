import React from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Architecture from '@/components/Architecture'
import Comparison from '@/components/Comparison'
import Pricing from '@/components/Pricing'
import Community from '@/components/Community'
import Download from '@/components/Download'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700">
      <Header />
      <Hero />
      <Features />
      <Comparison />
      <Pricing />
      <Community />
      <Download />
      <Footer />
    </main>
  )
} 