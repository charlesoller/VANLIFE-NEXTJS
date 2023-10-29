import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <section className='home'>
      <h1 className='home__title'>You got the travel plans, we got the travel vans.</h1>
      <p className='home__subtext'>Add adventure to your life by joining the #vanlife movement.<br />Rent the perfect van to make your perfect road trip.</p>
      <Link href="/vans">
        <button className='home__button'>Find your van</button>
      </Link>
    </section>
  )
}
