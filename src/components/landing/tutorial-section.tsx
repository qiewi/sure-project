import React from "react";
import Image from "next/image";

import Major from "@Images/person-major.png";
import Explore from "@Images/person-explore.png";
import Report from "@Images/person-report.png";
import HomeBanner from "@Images/home-banner.webp";

import { Timeline } from "../ui/Timeline";

const data = [
    {
      title: "DECIDE",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Start your journey by selecting your preferred field of study. Whether you’re passionate about Science or Humanities, this step will help narrow down the list of majors tailored to your interests.
          </p>
          <div className="">
            <Image
              src={Major}
              alt="startup template"
              className="rounded-lg object-cover h-80 w-full "
            />
          </div>
        </div>
      ),
    },
    {
      title: "EXPLORE",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Explore a list of majors within your chosen field and select the one that excites you the most. Your dream major will set the stage for university recommendations.
          </p>
          <div className="">
            <Image
              src={Explore}
              alt="startup template"
              className="rounded-lg object-cover h-80 w-full "
            />
          </div>
        </div>
      ),
    },
    {
        title: "EVALUATE",
        content: (
          <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                Based on your scores and preferences, we’ll provide you with 5 personalized university recommendations. Each recommendation is tailored to your academic goals and dream major.
            </p>
            <div className="">
                <Image
                src={Report}
                alt="startup template"
                className="rounded-lg object-cover h-80 w-full"
                />
             </div>
          </div>
        ),
      },
  ];

export const Tutorial = () => {
    return (
      <section className="bg-black w-full mt-20">
        <div className=" px-28 py-20"> 
            <Timeline data={data} />
        </div>
      </section>
    )
  }