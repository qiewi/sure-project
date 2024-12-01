import Image from "next/image";
import { FloatingNav } from "../components/layout/FloatingNavbar";
import { navItems } from "@/data";
import { HeroSection } from "../components/landing/hero-section";

export default function Home() {
  return (
    <main>
      <HeroSection/>
    </main>
  );
}
