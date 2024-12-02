import { Hero } from "@/src/components/landing/hero-section";
import { TopUniversities } from "@/src/components/landing/top-universities-section";
import { Tutorial } from "@/src/components/landing/tutorial-section";

export default function Home() {
  return (
    <main>
      <Hero/>
      <TopUniversities/>
      <Tutorial />
    </main>
  );
}
