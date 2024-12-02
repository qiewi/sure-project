import Image from "next/image";
import { FloatingNav } from "../components/layout/FloatingNavbar";
import { navItems } from "@/data";
import { Hero } from "../components/landing/hero-section";
import { TopUniversities } from "../components/landing/top-universities-section";
import { Tutorial } from "../components/landing/tutorial-section";

export default function Home() {
  return (
    <main>
      <Hero/>
      <TopUniversities/>
      <Tutorial />
    </main>
  );
}
