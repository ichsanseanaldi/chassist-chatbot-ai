"use client"
import Link from "next/link"
import React from "react"
import {Pacifico} from "next/font/google"

const font = Pacifico({subsets: ["latin"], weight: "400"})

export default function Navbar() {
  return (
    <div className={`navbar ${font.className} dark`}>
      <div className='wrapper h-100 flex flex-center'>
        <p className='logo text-center'>Chassist</p>
      </div>
    </div>
  )
}
