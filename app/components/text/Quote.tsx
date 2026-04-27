import React, { useEffect, useRef } from 'react'
import {gsap} from 'gsap'
import "./styles.css"

export const Quote = () => {
  const wrapperRef = useRef(null);
  const lines = [{text: 'Lorem ipsum dolor sit amet,'},{text: 'consectetur adipiscing elit.'}, {text: 'Sed non risus.'},{text: 'Suspendisse lectus tortor, dignissim vel,'}, {text: '-ThePrimeagen'}];

  useEffect(() => {
    if (wrapperRef.current) {
      const chars = gsap.utils.toArray(".char");
      gsap
        .timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "center center",
            scrub: true,
            pin: ".textRevealWrapper",
          }
        })
        .to(
          chars,
          {
            opacity: 1,
            stagger: 0.08
          },
          0
        );
    }
  }, []);

  return (
    <div className="page">
      <div className="color"></div>
      <div className="textRevealWrapper bg-foreground">
        <div ref={wrapperRef} className="text">
          {lines.map((line, lineKey) => (
            <div className="line text-black font-pixel text-xl" key={lineKey}>
              {line.text.split("").map((char, charKey) => (
                <span className="char" key={`${lineKey}-${charKey}`}>
                  {char}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="color"></div>
    </div>
  );
};

