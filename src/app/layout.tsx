import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from '@/components/Navbar'

const nunito = Nunito({
  subsets:['latin'],
  weight:['400','700','900'],
  display:'swap'
})

export const metadata: Metadata = {
  title: 'Chassist | Chatbot AI',
  description: "Chassis is a chatting bot app which uses AI from OpenAi, it's free to use and doesn't require Login.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <body className={nunito.className}>
        <Navbar/>
        <div className="children-wrapper">
          {children}
        </div>
      </body>
    </html>
  )
}
