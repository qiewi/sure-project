import React from "react";
import Image from "next/image";

import DECIDE from "@Images/tutorial-decide.jpg";
import EXPLORE from "@Images/tutorial-explore.jpg";
import REVIEW from "@Images/tutorial-review.jpeg";

import { Timeline } from "../ui/Timeline";

const data = [
    {
      title: "DECIDE",
      content: (
        <div className="relative">
          {/* Image */}
          <Image
            src={DECIDE}
            alt="startup template"
            className="rounded-lg object-cover h-80 w-full"
          />

          {/* Text with Glassmorphism */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/30 backdrop-blur-md rounded-lg p-4">
            <p className="text-neutral-200 text-sm font-normal">
              DECIDE YOUR FIELD
            </p>
            <p className="text-white text-md font-normal">Start your journey by selecting your preferred field of study. Whether you’re passionate about Science or Humanities, this step will help narrow down the list of majors tailored to your interests.</p>
          </div>
        </div>
      ),
    },
    {
      title: "EXPLORE",
      content: (
        <div className="relative">
          {/* Image */}
          <Image
            src={EXPLORE}
            alt="startup template"
            className="rounded-lg object-cover h-80 w-full"
          />

          {/* Text with Glassmorphism */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/30 backdrop-blur-md rounded-lg p-4">
            <p className="text-neutral-200 text-sm font-normal">
              EXPLORE YOUR MAJORS
            </p>
            <p className="text-white text-md font-normal">Explore a list of majors within your chosen field and select the one that excites you the most. Your dream major will set the stage for university recommendations.</p>
          </div>
        </div>
      ),
    },
    {
        title: "REVIEW",
        content: (
          <div className="relative">
            {/* Image */}
            <Image
              src={REVIEW}
              alt="startup template"
              className="rounded-lg object-cover h-80 w-full"
            />
  
            {/* Text with Glassmorphism */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/30 backdrop-blur-md rounded-lg p-4">
              <p className="text-neutral-200 text-sm font-normal">
                REVIEW OUR RECOMMENDATIONS
              </p>
              <p className="text-white text-md font-normal">Based on your scores and preferences, we’ll provide you with 5 personalized university recommendations. Each recommendation is tailored to your academic goals and dream major.</p>
            </div>
          </div>
        ),
      },
  ];

export const Tutorial = () => {
    return (
      <section className="bg-gray-100 w-full">
        <div className=""> 
            <Timeline data={data} />
        </div>
      </section>
    )
  }