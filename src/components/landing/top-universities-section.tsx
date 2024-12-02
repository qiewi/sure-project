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

const DummyContent = ({
  description,
  image,
  founded,
  location,
  ranking,
}: {
  description: string;
  image: StaticImageData;
  founded: string;
  location: string;
  ranking: string;
}) => {
  return (
    <div className=" rounded-3xl mb-4 px-8 h-full">
      {/* <Image src={image} alt="Universitas Indonesia" className="w-full"/> */}
      <p className="text-black text-xl font-normal">
        {description}
      </p>
      <div className="mt-6 text-xl text-black">
        <p><strong>Founded:</strong> {founded}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>QS World Ranking:</strong> {ranking}</p>
      </div>
    </div>
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
    content: (
      <DummyContent
        description="Universitas Indonesia, the oldest university in Indonesia, is a leading academic institution known for its excellence in education and research."
        image={UI}
        founded="1849"
        location="Depok, Jawa Barat"
        ranking="206th (QS World Ranking 2025)"
      />
    ),
  },
  {
    category: "Depok, Yogyakarta",
    title: "Universitas Gadjah Mada",
    src: UGM.src, 
    content: (
      <DummyContent
        description="Universitas Gadjah Mada is a prestigious university with a strong emphasis on fostering community development and research."
        image={UGM}
        founded="1949"
        location="Yogyakarta, Indonesia"
        ranking="239th (QS World Ranking 2025)"
      />
    ),
  },
  {
    category: "Bandung, Jawa Barat",
    title: "Institut Teknologi Bandung",
    src: ITB.src, 
    content: (
      <DummyContent
        description="Institut Teknologi Bandung is Indonesia's leading institution for science and technology, inspiring innovation and creativity."
        image={ITB}
        founded="1920"
        location="Bandung, Jawa Barat"
        ranking="256th (QS World Ranking 2025)"
      />
    ),
  },
  {
    category: "Mulyorejo, Surabaya",
    title: "Universitas Airlangga",
    src: UNAIR.src, 
    content: (
      <DummyContent
        description="Universitas Airlangga excels in health and social sciences, nurturing leaders who strive to make a positive impact in the world."
        image={UNAIR}
        founded="1954"
        location="Surabaya, Jawa Timur"
        ranking="308th (QS World Ranking 2025)"
      />
    ),
  },
  {
    category: "Bogor, Jawa Barat",
    title: "Institut Pertanian Bogor",
    src: IPB.src, 
    content: (
      <DummyContent
        description="Institut Pertanian Bogor is a leader in agricultural education and research, driving sustainable practices for the future."
        image={IPB}
        founded="1963"
        location="Bogor, Jawa Barat"
        ranking="426th (QS World Ranking 2025)"
      />
    ),
  },
];



const cards = data.map((card, index) => (
  <Card key={index} card={card} index={index} />
));