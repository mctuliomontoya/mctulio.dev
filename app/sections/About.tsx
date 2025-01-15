"use client";
import { motion } from "framer-motion";
import { AboutAsciiPhoto} from '@/app/components/AboutAsciiPhoto'

export default function About() {
  return (
    <div className="border-b border-foreground/40 pb-4 pt-4 lg:pt-20 items-center justify-around lg:pb-36 overflow-x-hidden ">
      <h4 className="my-10 md:my-16 text-center text-4xl">About Me</h4>
      <div className="flex flex-wrap">
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 lg:p-8"
        >
          <div className="flex items-center justify-center">
            <div
            className=" font-mono text-[6px] md:text-[8px] md:leading-[0.66rem] lg:text-[11px] lg:leading-[0.9rem] leading-[0.5rem]"
            dangerouslySetInnerHTML={{ __html: AboutAsciiPhoto }}></div>
          </div>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 flex justify-center items-center"
        >
          <div className="flex text-justify justify-center lg:pl-8 xl:pl-0 lg:justify-start flex-col">
            <p className="my-2 max-w-xl py-6 text-lg lg:text-xl md:mx-0 font-light tracking-tighter mx-4">I am a 8th semester Computer Engineering student, looking for new experiences and learning from all over the internet.</p>
            <p className="my-2 max-w-xl py-6 text-lg lg:text-xl md:mx-0 font-light tracking-tighter mx-4">I am an extremely curious person, so during my brief journey through the world of programming, I have tried many tools, languages, technologies, approaches and frameworks to work on what I love, some of them (my favorites) are: Python, Next.js, React, Typescript, Cloud Computing etc...</p>
            <p className="my-2 max-w-xl py-6 text-lg lg:text-xl md:mx-0 font-light tracking-tighter mx-4">I am in search of finding my ideal path, but while that happens, I will make sure to keep looking for things that expand my curiosity.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
