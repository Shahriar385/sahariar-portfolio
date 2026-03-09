import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import LiveApps from '@/components/LiveApps'
import Learning from '@/components/Learning'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <LiveApps />
      <Learning />
      <Contact />
      <Footer />
    </SmoothScroll>
  )
}

