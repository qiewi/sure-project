import React from 'react'
import Image from 'next/image'

import HomeBanner from '@Images/home-banner.webp'

export const HeroSection = () => {
  return (
    <section className="relative">
      <div className="flex w-full">
        <Image
          src={HomeBanner}
          alt="Home Banner"
          className="object-cover w-full h-auto rounded-b-3xl"
        />
        {/* Overlay */}
        <div className="absolute bg-black/30 inset-0 items-center justify-center align-middle pt-60 px-60 rounded-b-3xl">
          <h1 className="text-[2rem] font-semibold absolute top-12 left-12 text-white">
            SURE
          </h1>
          <h1 className="text-[5rem] text-white font-bold text-center">
            Discover Your Ideal University Match
          </h1>
          <h3 className="text-[1.5rem] text-white font-normal text-center">
            Your Academic Success Starts with the Right University
          </h3>
        </div>
      </div>
    </section>
  )
}
