"use client"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { TextPlugin } from "gsap/TextPlugin"
import { useEffect, useRef, useState } from "react"
import "./styles.css"
import GitHubContributions from "@/app/components/GitHubContributions"

gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin)

export function GradientLanding() {
  const navRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLDivElement>(null)
  const [cellSize, setCellSize] = useState(50)

  useEffect(() => {
    if (window.innerWidth <= 768) setCellSize(38)
  }, [])

  useGSAP(() => {
    const isMobile = () => window.innerWidth <= 768

    // Logo initial position — desktop: left-anchored vertically centered; mobile: top-centered horizontally
    gsap.set("#logo", {
      xPercent: isMobile() ? -50 : 0,
      yPercent: isMobile() ? 0 : -50,
      opacity: 0,
    })

    // Top gradient
    ScrollTrigger.create({
      trigger: ".gradient_trigger.top",
      start: "top bottom",
      end: "bottom bottom",
      animation: gsap.timeline().from(".top img", {
        rotationX: 90,
        transformOrigin: "50% 0%",
        duration: 3,
        ease: "linear",
      }),
      scrub: true,
    })

    // Guards onLeaveBack from firing during GSAP's init/refresh phase
    let hasEntered = false

    // Combined slide pin
    ScrollTrigger.create({
      trigger: ".combined_trigger",
      start: "top top",
      end: "+=1100",
      pin: true,
      anticipatePin: 1,

      onEnter: () => {
        hasEntered = true
        gsap.set("#logo", { text: "Marco Montoya", opacity: 0 })
        gsap.to("#logo", { opacity: 1, duration: 1.2, ease: "power2.out" })
      },

      onLeaveBack: () => {
        // Skip if GSAP fired this during initialization before the user actually entered
        if (!hasEntered) return
        gsap.killTweensOf("#logo")
        gsap.to("#logo", { text: "", duration: 0.25, ease: "none" })
        gsap.to("#logo", { opacity: 0, duration: 0.2, delay: 0.2 })
      },

      onLeave: () => {
        document.querySelector<HTMLElement>("#logo")?.classList.add("logo-nav")
        const mobile = isMobile()
        gsap.to("#logo", {
          top: "16px",
          left: mobile ? "50%" : "24px",
          xPercent: mobile ? -50 : 0,
          yPercent: 0,
          duration: 0.8,
          ease: "power3.inOut",
        })
        gsap.to("#logo", { text: "Mm", delay: 0.5, duration: 0.3, ease: "none" })
        gsap.to("#menuSticky", { autoAlpha: 1, delay: 0.7, duration: 0.4 })
      },

      onEnterBack: () => {
        gsap.killTweensOf("#logo")
        document.querySelector<HTMLElement>("#logo")?.classList.remove("logo-nav")
        const mobile = isMobile()
        gsap.to("#logo", { text: "Marco Montoya", duration: 0.80, ease: "none" })
        gsap.to("#logo", {
          top: mobile ? "22%" : "50%",
          left: mobile ? "50%" : "8vw",
          xPercent: mobile ? -50 : 0,
          yPercent: mobile ? 0 : -50,
          duration: 0.1,
          ease: "power2.inOut",
        })
        gsap.to("#menuSticky", { autoAlpha: 0, duration: 0.3 })
      },
    })

    // Bottom gradient
    ScrollTrigger.create({
      trigger: ".gradient_trigger.bottom",
      start: "top bottom",
      end: "bottom bottom",
      animation: gsap.timeline().from(".bottom img", {
        rotationX: 90,
        transformOrigin: "50% 0%",
        duration: 3,
        ease: "linear",
      }),
      scrub: true,
    })

    // Background fades in after the gradient sequence is fully done.
    // Uses a sentinel div placed at the exact end of the intro to avoid pin-offset miscalculations.
    gsap.fromTo("#background",
      { opacity: 0 },
      {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#gradient-end",
          start: "top 100%",
          end: "top 0%",
          scrub: 1,
        },
      }
    )

    // Fade out scroll indicator on first scroll
    gsap.to(".scroll-indicator", {
      opacity: 0,
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: ".scroll-slide",
        start: "top top",
        end: "+=200",
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  })

  // Menu toggle
  useEffect(() => {
    const nav = navRef.current
    const menuButton = menuButtonRef.current
    if (!nav || !menuButton) return

    gsap.set(nav, { xPercent: -50, yPercent: 0, autoAlpha: 1 })

    const menu = gsap
      .timeline({ paused: true, reversed: true })
      .from(nav, { xPercent: 100, duration: 1, ease: "power2.inOut" })
      .from(
        nav.querySelectorAll(".navLink"),
        { autoAlpha: 0, x: -25, duration: 0.2, stagger: 0.1 },
        0.2
      )
      .to(".menuButton", { text: " CLOSE", duration: 0.5, ease: "none" }, 0.5)

    const menuButtonEl = document.querySelector<HTMLElement>("#menuButton")
    const logoEl = document.querySelector<HTMLElement>("#logo")

    const toggleMenu = () => {
      if (menu.reversed()) {
        menu.timeScale(1).play()
        menuButtonEl?.classList.add("anegro")
        logoEl?.classList.add("anegro",)
      } else {
        menu.timeScale(2).reverse()
        menuButtonEl?.classList.remove("anegro")
        logoEl?.classList.remove("anegro")
      }
    }

    menuButton.addEventListener("click", toggleMenu)
    nav.addEventListener("click", toggleMenu)

    nav
      .querySelectorAll("a")
      .forEach(link => link.addEventListener("click", e => e.stopPropagation()))

    return () => {
      menuButton.removeEventListener("click", toggleMenu)
      nav.removeEventListener("click", toggleMenu)
    }
  }, [])

  return (
    <div className="relative">
      {/* Fixed logo — starts centered in combined slide, flies to nav after pin */}
      <h1
        id="logo"
        className="font-pixel select-none mb-10 pointer-events-none"
      >
        Marco Montoya
      </h1>

      {/* Menu bar — hidden until logo incorporates */}
      <div id="menuSticky" style={{ opacity: 0, visibility: "hidden" }}>
        <div
          id="menuButton"
          role="button"
          className="menuButton font-pixel mt-5 cursor-pointer"
          ref={menuButtonRef}
        >
          MENU
        </div>
      </div>

      {/* Full-screen nav overlay */}
      <nav ref={navRef} id="menu" className="flex items-center">
        <div className="flex mt-24 flex-row gap-2">
          <div className="menuCol one w-10">
            <a
              href="https://www.linkedin.com/in/mctulio-montoya/"
              target="_blank"
              className="font-pixel navLink"
            >
              [lin]
            </a>
            <a href="https://github.com/mctuliomontoya" target="_blank" className="navLink">
              [gh]
            </a>
            <a href="/Resume.pdf" target="_blank" className="navLink">
              [cv]
            </a>
          </div>
          <div className="menuCol two w-10">
            <a href="mailto:mctulio.dev@gmail.com" className="navLink">
              [mail]
            </a>
            <a
              href="#link5"
              className="relative text-align-left font-pixel text-black/50 cursor-pointer text-[28px] mt-[7.5px]"
            >
              [blog]
            </a>
          </div>
        </div>
      </nav>

      {/* Slide 1 — Scroll indicator */}
      <div className="spacer-a scroll-slide">
        <div className="scroll-indicator">
          <span className="font-pixel text-[10px] tracking-[0.6em] text-foreground/35 uppercase">
            scroll
          </span>
          <div className="scroll-track">
            <div className="scroll-thumb" />
          </div>
        </div>
      </div>

      {/* Top gradient — 3D flip reveal */}
      <div className="gradient_trigger top">
        <div className="gradient_wrapper">
          <img src="/gradient-green.png" style={{ backgroundColor: "#0a0a0a" }} alt="" />
        </div>
      </div>

      {/* Combined slide — logo (#logo fixed) on left, grid on right */}
      <div className="spacer combined_trigger">
        <div className="combined-layout">
          <div className="grid-col">
            <GitHubContributions weeksToShow={5} cellSize={cellSize} />
          </div>
        </div>
      </div>

      {/* Bottom gradient — 3D flip reveal */}
      <div className="gradient_trigger bottom">
        <div className="gradient_wrapper">
          <img src="/gradient-green.png" alt="" />
        </div>
      </div>

      {/* Sentinel — marks the exact end of the gradient intro for the #background trigger */}
      <div id="gradient-end" style={{ height: 0 }} />
    </div>
  )
}