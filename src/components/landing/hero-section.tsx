"use client";

import React from "react";
import Image from "next/image";

import HomeBanner from "@Images/home-banner.webp";
import { placeholders, CardProps } from "@/../data/landing";
import { VanishInput } from "../ui/VanishInput";
import { Button } from "../ui/Button";

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("submitted");
};

export const Hero = () => {
  return (
    <section className="relative">
      <div className="flex flex-col w-full h-[86vh]">
        <div className="relative">
            <Image
            src={HomeBanner}
            alt="Home Banner"
            className="object-cover w-full rounded-b-3xl"
            />
            {/* Overlay */}
            <div className="absolute bg-black/30 inset-0 items-center justify-center align-middle pt-48 px-60 rounded-b-3xl">
              <h1 className="text-[2rem] font-semibold absolute top-12 left-12 text-white">
                  SURE
              </h1>
              <h1 className="text-[4.2rem] text-white font-bold text-center leading-normal">
                  Discover Your Ideal Dream University
              </h1>
              <h3 className="text-[1.3rem] text-white font-normal text-center">
                  Your Academic Success Starts with the Right University
              </h3>
              <div className="mt-12">
                  <VanishInput
                  placeholders={placeholders}
                  onChange={handleChange}
                  onSubmit={onSubmit}
                  />
            </div>
        </div>
        
        </div>

        {/* Cards Section */}
        <div className="flex relative justify-center -mt-36 z-10">
          <div className="flex space-x-4">
            {CardProps.map((card, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center w-[200px] sm:w-[250px]">
                    <h2 className="text-3xl font-bold text-gray-800">{card.number}</h2>
                    <p className="text-gray-500 text-sm">{card.description}</p>
                </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
