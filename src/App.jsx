
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedGame from "./components/FeaturedGame";
import FeaturedProjects from "./components/FeaturedProjects";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Journey from "./components/Journey";
import QASection from "./components/QASection";
import GithubSection from "./components/GithubSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <FeaturedGame />
        <FeaturedProjects />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Journey />
        <QASection />
        <GithubSection />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
