import AboutMarketplace from "@/component/AboutMarketplace";
import Banner from "@/component/Banner";
import FeaturedPrompts from "@/component/FeaturedPrompts";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Banner/>
      <FeaturedPrompts></FeaturedPrompts>
      <AboutMarketplace></AboutMarketplace>
    </div>
  );
}
