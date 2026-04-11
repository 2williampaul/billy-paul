import type { Metadata } from "next";
import HeroScrollAnimation from "./components/ui/hero-scroll-animation";
import ProfileAbout from "./components/sections/ProfileAbout";
import ProfileExperience from "./components/sections/ProfileExperience";
import Solution from "./components/sections/Solution";
import ProfileClose from "./components/sections/ProfileClose";

export const metadata: Metadata = {
  title: "Billy Paul — Design Systems Designer",
  description:
    "Design Systems Lead Designer with 13+ years delivering for global brands. From Figma to AI infrastructure.",
};

export default function Home() {
  return (
    <main>
      <HeroScrollAnimation />
      <ProfileAbout />
      <ProfileExperience />
      <ProfileClose />
      <Solution />
    </main>
  );
}
