import styles from "./page.module.css";
import Preloader from "@/components/common/Preloader";
import HeroSection from "@/components/features/HeroSection";
import DeeperLookSection from "@/components/features/DeeperLookSection";
import FeaturedProductSection from "@/components/features/FeaturedProductSection";
import ProductGridSection from "@/components/features/ProductGridSection";
import VisionSection from "@/components/features/VisionSection";
import VideoScrubSection from "@/components/features/VideoScrubSection";
import AllLooksSection from "@/components/features/AllLooksSection";
import HorizontalShopSection from "@/components/features/HorizontalShopSection";
import ParallaxBannerSection from "@/components/features/ParallaxBannerSection";
import BrandPerksSection from "@/components/features/BrandPerksSection";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <main className={styles.main}>
      <Preloader />
      <HeroSection />
      <VideoScrubSection />
      <DeeperLookSection />
      <VisionSection />
      <FeaturedProductSection />
      <HorizontalShopSection />
      <ProductGridSection />
      <ParallaxBannerSection />
      <AllLooksSection />
      <BrandPerksSection />
      <Footer />
    </main>
  );
}
