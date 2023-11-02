import './globals.css'
import type { Metadata } from 'next'
import { Inter, Nunito } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { preload } from 'react-dom'
import {Analytics} from '@vercel/analytics/react';

const font = Inter({
  subsets:['latin'],
  weight:['200','400','700','900'],
  display:'swap',
  preload:true
})

export const metadata: Metadata = {
  title: 'Chassist | Chatbot AI',
  description: "Chassist is a chatting bot app which uses ChatGPT AI from OpenAI, it's free to use and doesn't require Login. Hosted in Vercel",
  generator:"Next.js",
  publisher:"Vercel",
  applicationName:"Chassist | Chatbot AI",
  robots:"index, follow",
  keywords:["Chatbot","AI","Chassist","ChatGPT","Vercel","OpenAI"],
  referrer:"origin",
  creator:"Ichsan Seanaldi Permana",
  alternates:{canonical:"https://chassist.vercel.app/"},
  verification:{
    google:"VPJMCbyK5vNMPtSxKkB6x261bchSwi7bZ-B4VvkgM08"
  },
  icons:'/icon.ico'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <body className={font.className}>
        <Analytics/>
        <Navbar/>
        <div className="children-wrapper">
          {children}
        </div>
      </body>
    </html>
  )
}
