"use client";

import Layout from "./components/Layout";
import PuzzleText from './components/PuzzleAnimation'
import './css/index.css';
import Contact from "./components/Contact";
import Carousel from "./components/Carousel";

export default function Home() {
  return (
      // <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Layout>
          <main>
            <div className='landing-page'>
              <p>Hello, I'm Takehito Sumimura. A passionate Web Developer.</p>
              <PuzzleText></PuzzleText>
              <Contact></Contact>
              {/* <Carousel></Carousel> */}
            </div>
          </main>
        </Layout>
      // </main>

  );
}
