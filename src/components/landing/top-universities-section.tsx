import Image, { StaticImageData } from "next/image";
import React from "react";

import UI from "@Images/univ-ui.jpeg";
import UGM from "@Images/univ-ugm.jpg";
import ITB from "@Images/univ-itb.jpeg";
import UNAIR from "@Images/univ-unair.jpg";
import IPB from "@Images/univ-ipb.jpg";

import { Carousel, Card } from "../ui/Carousel";

export const TopUniversities = () => {
  return (
    <section className="bg-white w-full flex flex-col relative">
      {/* Description */}
      <div className="flex pt-20 justify-between">
        <div className="justify-center pl-20">
          <h1 className=" text-neutral-400 text-left font-normal text-[2.5rem] pt-[1rem]">
              TOP 5
          </h1>
          <h1 className="max-lg:text-transparent text-black text-left font-semibold text-[3rem]">
              Indonesian Universities
          </h1>
        </div>
        <div className="pt-20 text-right pr-20 w-[40%]">
          <h3 className=" text-neutral-400 font-normal text-lg">
            Unlock your academic potential, explore top universities, and find the perfect fit for your future.
          </h3>
        </div>
      </div>

      {/* Carousel */}
      <div className="flex px-16">
      <Carousel items={cards} />
      </div>
      
      
    </section>
  )
}

const DummyContent = () => {
  return (
    <>
      <div
        key={"dummy-content"}
        className="py-8 rounded-3xl mb-4 px-8 h-full"
      >
        <Image src={UI} alt="Universitas Indonesia" className="w-full h-[14rem] object-cover" />
        <p className="text-neutral-600 dark:text-neutral-400 md:text-2xl font-sans mx-auto pt-10">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            The first rule of Apple club is that you boast about Apple club.
          </span>{" "}
            Keep a journal, quickly jot down a grocery list, and take amazing
            class notes. Want to convert those notes to text? No problem.
            Langotiya jeetu ka mara hua yaar is ready to capture every
            thought.
        </p>
      </div>
    </>
  );
};

interface CardData {
  category: string;
  title: string;
  src: string; 
  content: JSX.Element;
}

const data: CardData[] = [
  {
    category: "Depok, Jawa Barat",
    title: "Universitas Indonesia",
    src: UI.src, 
    content: <DummyContent />,
  },
  {
    category: "Depok, Yogyakarta",
    title: "Universitas Gadjah Mada",
    src: UGM.src, 
    content: <DummyContent />,
  },
  {
    category: "Bandung, Jawa Barat",
    title: "Institut Teknologi Bandung",
    src: ITB.src, 
    content: <DummyContent />,
  },
  {
    category: "Mulyorejo, Surabaya",
    title: "Universitas Airlangga",
    src: UNAIR.src, 
    content: <DummyContent />,
  },
  {
    category: "Bogor, Jawa Barat",
    title: "Insitut Pertanian Bogor",
    src: IPB.src,
    content: <DummyContent />,
  },
];

const cards = data.map((card, index) => (
  <Card key={index} card={card} index={index} />
));