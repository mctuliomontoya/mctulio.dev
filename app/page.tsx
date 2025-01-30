"use client"
import Landing from '@/app/sections/Landing'
import Hero from '@/app/sections/Hero'
import About from '@/app/sections/About'
import './globals.css'
import PortfolioGrid from '@/app/components/PortfolioGrid'
import { AnimatePresence } from "framer-motion";
import { Item } from './components/Item'
import { List } from '@/app/components/List'
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'

interface StoreProps {
  match: {
    params: {
      id: string;
    };
  };
}

function Store({ match }: StoreProps) {
  const { id } = match.params;
  const imageHasLoaded = true;

  return (
    <>
      <List selectedId={id} />
      <AnimatePresence>
        {id && imageHasLoaded && <Item id={id} key="item" />}
      </AnimatePresence>
    </>
  );
}

function StoreWrapper() {
  const params = useParams();
  // @ts-expect-error: this line needs to add a specific type in the future.
  return <Store match={{ params }} />;
}

export default function Home() {
  return (
    <>
      <div id='background'></div>
      <Landing />
      <Hero />
      <PortfolioGrid />
      <Router>
        <Routes>
          <Route path="/:id" element={<StoreWrapper />} />
          <Route path="/" element={<StoreWrapper />} />
        </Routes>
      </Router>
      <About />
    </>
  );
}