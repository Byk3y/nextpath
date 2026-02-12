import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#181616", color: "#FFFFDB" }}>
      <Navbar />
      <Hero />
      <About />
      <Footer />
    </main>
  );
}
