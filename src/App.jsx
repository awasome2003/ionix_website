import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Partners from './components/Partners'
import Story from './components/Story'
import Founders from './components/Founders'
import Ecosystem from './components/Ecosystem'
import CoachingCenters from './components/CoachingCenters'
import Portfolio from './components/Portfolio'
import EventServices from './components/EventServices'
import Sports from './components/Sports'
import Platform from './components/Platform'
import Consultation from './components/Consultation'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import CtaBanner from './components/CtaBanner'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import FixedBackground from './components/FixedBackground'
import Preloader from './components/Preloader'
import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useTiltCards } from './hooks/useTiltCards'
import { useMagnetic } from './hooks/useMagnetic'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [loaded, setLoaded] = useState(false)
  useSmoothScroll()
  useTiltCards('.tilt')
  useMagnetic('.magnetic')

  // Recalculate ScrollTrigger positions once fonts/images finish loading,
  // so scroll-reveal animations never get stuck due to stale measurements.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = setTimeout(refresh, 700)
    return () => {
      window.removeEventListener('load', refresh)
      clearTimeout(t)
    }
  }, [])

  return (
    <>
      <Preloader onReveal={() => setLoaded(true)} />
      <CustomCursor />
      <ScrollProgress />
      <FixedBackground />
      <main className="relative z-10 min-h-screen overflow-x-clip">
      <Navbar />
      <Hero started={loaded} />
      <Story />
      <Partners />
      <Founders />
      <Ecosystem />
      <EventServices />
      <Sports />
      <CoachingCenters />
      <Portfolio />
      <Platform />
      <Gallery />
      <Consultation />
      <Testimonials />
      <Contact />
      <CtaBanner />
      <Footer />
      </main>
    </>
  )
}

export default App
