import AboutMarketplace from "@/component/AboutMarketplace";
import Banner from "@/component/Banner";
import FeaturedPrompts from "@/component/FeaturedPrompts";
import Testimonials from "@/component/Testimonials";
import TopSellers from "@/component/TopSellers";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Banner/>
      <TopSellers></TopSellers>
      <FeaturedPrompts></FeaturedPrompts>
      <AboutMarketplace></AboutMarketplace>
      <Testimonials></Testimonials>
    </div>
  );
}
