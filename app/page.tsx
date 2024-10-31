import { FloatingNav } from '@/components/ui/FloatingNavbar'
import Hero from './_components/Hero'
import Grid from './_components/Grid'
import Approach from './_components/Approach'
import Footer from './_components/Footer'
import SecondGrid from './_components/SecondGrid'

export default function page() {
  return (
    <main className="w-full bg-black-100 overflow-hidden flex justify-center items-center flex-col mx-auto sm:px-10 px-5">
      <div className="flex flex-col items-center max-w-7xl w-full">
        <FloatingNav
          navItems={[
            { name: 'Home', link: '/' },
            { name: 'About', link: '/#about' },
            { name: 'AW Academy', link: '/academy' },
            {
              name: 'AW Conferencing App',
              link: 'https://aeternum-conferencing-app.vercel.app',
            },
          ]}
        />
        <Hero />
        <Grid />
        <Approach />
        <SecondGrid />
        <Footer />
      </div>
    </main>
  )
}
