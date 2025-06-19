import { getSliders } from "@/libs/getSliders";
import HeroSlider from "./HeroSlider";

export default async function HeroSection() {
  const sliders = await getSliders();
  return <HeroSlider sliders={sliders} />;
}
