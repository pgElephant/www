import React from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Architecture from '@/components/Architecture'
import Comparison from '@/components/Comparison'
import Community from '@/components/Community'
// ...existing code...
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700">
      <Header />
      <Hero />
      <Features />
      <Comparison />
      <Community />
// ...existing code...
      <Footer />
    </main>
  )
} 