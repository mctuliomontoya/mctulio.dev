"use client";
import { TypeAnimation } from "react-type-animation";

export default function HeroAnimatedText() {
  return (
    <TypeAnimation
      className="font-display font-bold"
      sequence={[
        "I'm a student.", // Types 'One'
        1000, // Waits 1s
        "I'm a developer.", // Deletes 'One' and types 'Two'
        2000, // Waits 2s
        "I'm a designer.",
        2000, // Types 'Three' without deleting 'Two'
        () => {
          console.log("Sequence completed");
        },
      ]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: "2em", display: "inline-block" }}
    />
  );
}
