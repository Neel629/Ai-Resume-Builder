import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Features from "@/components/features";
import TemplatePreview from "@/components/template-preview";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <TemplatePreview />
      <Footer />
    </div>
  );
}
