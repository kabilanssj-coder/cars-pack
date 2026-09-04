import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import FeaturedVehicles from "../components/FeaturedVehicles";
import ExploreCategories from "../components/ExploreCategories";
import WhyChooseUs from "../components/WhyChooseUs";
import {
  SellYourCarTeaser,
  CoimbatoreShowroom,
  ErodeBranchSection,
  InstagramSection,
} from "../components/HomeSections";
import { FinalCinematic, ContactCTA } from "../components/FinalSections";
import { fetchCars } from "../services/carService";
import { fetchBranches } from "../services/dataService";

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erodeBranch, setErodeBranch] = useState(null);

  useEffect(() => {
    fetchCars({ featured: true, limit: 4, sort: "newest" })
      .then((res) => setFeaturedCars(res.data))
      .catch(() => setFeaturedCars([]))
      .finally(() => setLoading(false));

    fetchBranches()
      .then((res) => setErodeBranch(res.data.find((b) => b.key === "ERODE")))
      .catch(() => {});
  }, []);

  return (
    <>
      <Hero />
      <FeaturedVehicles cars={featuredCars} loading={loading} />
      <ExploreCategories />
      <WhyChooseUs />
      <SellYourCarTeaser />
      <CoimbatoreShowroom />
      <ErodeBranchSection branch={erodeBranch} />
      <InstagramSection />
      <FinalCinematic />
      <ContactCTA />
    </>
  );
};

export default Home;
