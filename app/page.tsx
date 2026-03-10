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
import { supabase } from '@/lib/supabase'

export const revalidate = 60

export default async function Home() {
  const [
    { data: skillsData },
    { data: projectsData },
    { data: appsData },
    { data: learningData }
  ] = await Promise.all([
    supabase.from('skills').select('*').order('name', { ascending: true }),
    supabase.from('projects').select('*').order('created_at', { ascending: true }),
    supabase.from('apps').select('*').order('created_at', { ascending: true }),
    supabase.from('learning').select('text').eq('id', 1).single()
  ])

  const mappedApps = (appsData || []).map((app: any) => ({
    id: app.id,
    name: app.name,
    description: app.description,
    platform: app.platform,
    playStoreUrl: app.play_store_url,
    appStoreUrl: app.app_store_url,
    tags: app.tags,
    createdAt: app.created_at
  }))

  return (
    <SmoothScroll>
      <Header />
      <Hero />
      <About />
      <Skills skills={skillsData || []} />
      <Projects projects={projectsData || []} />
      <LiveApps apps={mappedApps} />
      <Learning text={learningData?.text || ''} />
      <Contact />
      <Footer />
    </SmoothScroll>
  )
}

