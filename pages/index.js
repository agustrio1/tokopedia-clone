import Image from 'next/image'
import { Inter } from 'next/font/google'
import HomePage from './home'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='flex flex-row items-center justify-center max-w-screen-md mx-auto'>
      <HomePage/>
    </div>
  )
}
