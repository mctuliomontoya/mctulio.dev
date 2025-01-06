'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './styles/Scroll.css'
import './styles/Navbar.css'

const Landing = () => {

  // Animation for the logo scroll
  useEffect(() => {
    console.clear()
    gsap.registerPlugin(ScrollTrigger, TextPlugin)

    ScrollTrigger.create({
      animation: gsap.to('#logo', {
        top: '24px',
        width: '236px',
      }),
      id: 'snap',
      scrub: true,
      trigger: '#hero',
      start: '24px',
      endTrigger: '#hero',
      end: 'bottom',
      onEnter: () => {
        gsap.to('#logo', { text: 'Mm', fontSize: '42px', duration: 0.8 })
      },
      onLeaveBack: () => {
        gsap.to('#logo', { text: 'Marco Montoya.', fontSize: '14.67738507vw', duration: 0.5 })
      },
      pin: false,
      pinSpacing: false,
      snap: {
        snapTo: 1,
        duration: 0.5,
        delay: 0,
        ease: 'power4.out',
      },
    })

    const showAnim1 = gsap.timeline({
      scrollTrigger: {
        id: 'max',
        start: () => `${window.innerHeight * 1.5} top`,
        end: 'max',
        onUpdate: (self) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          self.direction === 1 ? showAnim1.play() : showAnim1.reverse()
        },
      },
    })

    showAnim1.to('#menuSticky', {
      yPercent: -100,
    })
    showAnim1.to(
      '#logo',
      {
        y: -200,
      },
      '<',
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, []) // Empty dependency array to run only on mount

  // Animation for the menu
  const navRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(TextPlugin)

    const nav = navRef.current
    const menuButton = menuButtonRef.current

    const logo = document.querySelector('#logo')
    const menuButtonDOM = document.querySelector('#menuButton')
    if (!nav || !menuButton) return

    gsap.set(nav, { xPercent: -50, yPercent: 0, autoAlpha: 1 })

    const menu = gsap.timeline({ paused: true, reversed: true })
      .from(nav, { xPercent: 100, duration: 1, ease: 'power2.inOut' })
      .from(nav.querySelectorAll('.navLink'), 0.2, { autoAlpha: 0, x: -25, duration: 0.2, stagger: 0.1 })
      .to('.menuButton', { text: ' CLOSE', duration: 0.5, ease: 'none' }, 0.5)

    const toggleMenu = () => {
      if (menu.reversed()) {
        menu.timeScale(1).play()
        if (logo && menuButtonDOM) {
          logo.classList.toggle('anegro')
          menuButtonDOM.classList.toggle('anegro')
        }
      } else {
        menu.timeScale(2).reverse()
        if (logo && menuButtonDOM) {
          logo.classList.toggle('anegro')
          menuButtonDOM.classList.toggle('anegro')
        }
      }
    }

    // Prevent menu from closing when clicking on links
    const handleLinkClick = (event: MouseEvent) => {
      event.stopPropagation() // Stop the click event from bubbling up
    }

    menuButton.addEventListener('click', toggleMenu)
    nav.addEventListener('click', toggleMenu)

    // Add event listeners to links
    const links = nav.querySelectorAll('a')
    links.forEach(link => {
      link.addEventListener('click', handleLinkClick)
    })

    return () => {
      menuButton.removeEventListener('click', toggleMenu)
      nav.removeEventListener('click', toggleMenu)
    }
  }, [])

  return (
    <React.Fragment>
      <div id="hero"></div>
      <div id="greatLogo">
        <h1 className="font-pixel text-5xl w-full text-center text-[14.67738507vw]" id="logo">Marco Montoya.</h1>
      </div>
      <div id="menuSticky">
        <div id="menuButton" className="menuButton font-pixel mt-5" ref={menuButtonRef}> MENU</div>
      </div>
      <nav ref={navRef} id="menu" className="flex items-center">
        <div className="flex mt-24 flex-row gap-2">
          <div className="menuCol one w-10">
            <a href="https://www.linkedin.com/in/mctulio-montoya/" target="_blank" className="font-pixel navLink">[lin]</a>
            <a href="https://github.com/mctuliomontoya" target="_blank" className="navLink">[gh]</a>
            <a href="" className="navLink">[cv]</a>
          </div>
          <div className="menuCol two w-10">
            <a href="mailto:mctulio.dev@gmail.com" className="navLink">[mail]</a>
            <a href="#link5" className="navLink">[blog]</a>
          </div>
        </div>
      </nav>
    </React.Fragment>
  )
}

export default Landing