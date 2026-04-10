import type { Metadata } from "next";
import HeroScrollAnimation from "../components/ui/hero-scroll-animation";
import ProfileAbout from "../components/sections/ProfileAbout";
import ProfileExperience from "../components/sections/ProfileExperience";
import Solution from "../components/sections/Solution";
import ProfileClose from "../components/sections/ProfileClose";

export const metadata: Metadata = {
  title: "Profile — Billy Paul",
  description:
    "Design Systems Lead Designer with 13+ years delivering for global brands. From Figma to AI infrastructure.",
  robots: { index: false, follow: false },
};

export default function ProfilePage() {
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
