import { PageWrapper } from './components/layout/PageWrapper';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';
import { MiniGame } from './components/ui/MiniGame';
import { RockPaperScissors } from './components/ui/RockPaperScissors';
import { ReactQuiz } from './components/ui/ReactQuiz';
import { BackendQuiz } from './components/ui/BackendQuiz';
import { AIChatBot } from './components/ui/AIChatBot';

function App() {
  return (
    <PageWrapper>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <MiniGame />
      <RockPaperScissors />
      <ReactQuiz />
      <BackendQuiz />
      <AIChatBot />
    </PageWrapper>
  );
}

export default App;
