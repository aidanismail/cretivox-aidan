"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const labels = gsap.utils.toArray<HTMLElement>(".about-label");
      const lines = gsap.utils.toArray<HTMLElement>(".about-line");
      const bodyLines = gsap.utils.toArray<HTMLElement>(".about-body-line");
      const stickers = gsap.utils.toArray<HTMLElement>(".about-sticker");

      gsap.set([...labels, ...lines, ...bodyLines, ...stickers], {
        autoAlpha: 0,
        y: 30
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true
          // markers: true,
        }
      });

      tl.to(labels, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out"
      })
        .to(
          lines,
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.18,
            duration: 0.75,
            ease: "power3.out"
          },
          "-=0.2"
        )
        .to(
          bodyLines,
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.6,
            ease: "power3.out"
          },
          "-=0.2"
        )
        .to(
          stickers,
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.45,
            ease: "back.out(1.5)"
          },
          "-=0.2"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-black px-6 py-10md:py-1 text-white md:px-10 lg:px-16"
    >
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="space-y-2 text-[6vw] font-black uppercase leading-[0.98] tracking-[-0.08em] md:text-[8vw] lg:text-[5.2vw]">
              <p className="about-line">
                Hi, I&apos;m{" "}
                <span className="bg-[#E60108] px-2 text-white">Aidan.</span>
              </p>

              <p className="about-line">
                I study{" "}
                <span className="bg-[#FADC1A] px-2 text-black">
                  computer science,
                </span>
              </p>

              <p className="about-line">but I&apos;m mostly trying</p>

              <p className="about-line">
                to make{" "}
                <span className="bg-[#58DE57] px-2 text-black">
                  Digital Solutions.
                </span>
              </p>
            </div>
          </div>

          <div className="relative pt-4 lg:pt-10">
            <div className="space-y-3 text-md leading-relaxed text-white md:text-xl">
              <p className="about-body-line">
                Born in <span className="font-black ">Bandung</span>. Currently
                surviving Computer Science at{" "}
                <span className="font-black">Unpad</span>.
              </p>

              <p className="about-body-line">
                I like interfaces with rhythm, messy ideas that become clear,
                and tiny interactions that make people stop for one more second.
              </p>

              <p className="about-body-line">
                I&apos;m not here to build another safe portfolio template. I
                want to make things that feel{" "}
                <span className="font-black">intentional</span>, a little
                playful, and alive.
              </p>

              <p className="about-body-line">
                When I&apos;m not<span> </span>
                <a
                  href="https://github.com/aidanismail"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-black text-[#58DE57] underline underline-offset-4 transition-colors hover:text-white"
                >
                  centering divs
                </a>
                , you can find me{" "}
                <a
                  href="https://letterboxd.com/aidanismail/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-black text-[#E60108] underline underline-offset-4 transition-colors hover:text-white"
                >
                  watching movies
                </a>{" "}
                or{" "}
                <a
                  href="https://open.spotify.com/user/21cxsxefbqs3zvrv5zcyyrq5q?si=c0e92ba18fcb4864"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-black text-[#FADC1A] underline underline-offset-4 transition-colors hover:text-white"
                >
                  listening to music
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
