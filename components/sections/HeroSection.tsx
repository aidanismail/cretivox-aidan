"use client";

import { useRef, type CSSProperties, type MouseEvent } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const faces = [
  {
    id: "kiri",
    bw: "/Faces/face-left.png",
    color: "/Faces/fierce-left.png",
    alt: "Fierce Left"
  },
  {
    id: "depan",
    bw: "/Faces/face-front.png",
    color: "/Faces/fierce-front.png",
    alt: "Fierce Front"
  },
  {
    id: "kanan",
    bw: "/Faces/face-right.png",
    color: "/Faces/fierce-right.png",
    alt: "Fierce Right"
  }
];

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set(".hero-text", {
        opacity: 0.25,
        yPercent: 0
      });

      gsap.set(".name-aidan", {
        xPercent: 0
      });

      gsap.set(".name-ismail", {
        xPercent: 0
      });

      gsap.set(".hero-faces", {
        opacity: 1,
        yPercent: 0
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=130%",
          scrub: 0.7,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      timeline

        .to(
          ".hero-faces",
          {
            opacity: 0,
            yPercent: -12,
            ease: "none",
            duration: 0.28
          },
          "intro"
        )
        .to(
          ".hero-text",
          {
            opacity: 1,
            yPercent: 8,
            ease: "none",
            duration: 0.28
          },
          "intro"
        )

        .to({}, { duration: 0.16 })

        .to(
          ".name-aidan",
          {
            xPercent: -130,
            ease: "none",
            duration: 0.56
          },
          "split"
        )
        .to(
          ".name-ismail",
          {
            xPercent: 130,
            ease: "none",
            duration: 0.56
          },
          "split"
        );
    },
    { scope: containerRef }
  );

  const handleMouseMoveCard = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  const handleMouseEnterCard = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;

    gsap.to(card.querySelector(".bw-img"), {
      opacity: 0.1
    });

    gsap.to(card, {
      "--mask-size": "150px",
      duration: 0.5,
      ease: "power2.out"
    });

    gsap.to(card, {
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out",
      zIndex: 10
    });
  };

  const handleMouseLeaveCard = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;

    gsap.to(card.querySelector(".bw-img"), {
      opacity: 1
    });

    gsap.to(card, {
      "--mask-size": "0px",
      duration: 0.4,
      ease: "power2.out"
    });

    gsap.to(card, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
      zIndex: 1
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-screen max-w-none -translate-x-1/2 h-screen flex items-center justify-center bg-white overflow-hidden"
    >
      <div className="hero-text absolute inset-0 w-full h-screen flex flex-col items-center justify-center z-0 pointer-events-none select-none space-y-[3vw] text-black text-center overflow-hidden will-change-transform">
        <h1 className="name-aidan text-[20vw] leading-[0.8] font-black uppercase will-change-transform">
          AIDAN
        </h1>

        <h1 className="name-ismail text-[20vw] leading-[0.8] font-black uppercase tracking-tight will-change-transform">
          ISMAIL
        </h1>
      </div>

      <div className="hero-faces relative z-10 flex items-center justify-center gap-4 md:gap-8 w-full max-w-7xl px-4 will-change-transform">
        {faces.map((face) => (
          <div
            key={face.id}
            style={
              {
                "--mask-size": "0px",
                "--x": "50%",
                "--y": "50%"
              } as CSSProperties
            }
            className="face-card group relative w-1/3 max-w-75 aspect-9/16 overflow-hidden border border-black"
            onMouseMove={handleMouseMoveCard}
            onMouseEnter={handleMouseEnterCard}
            onMouseLeave={handleMouseLeaveCard}
          >
            <Image
              src={face.bw}
              alt={`${face.alt} BW`}
              fill
              className="bw-img object-cover"
              sizes="(max-width: 768px) 33vw, 300px"
              priority
              unoptimized
            />

            <Image
              src={face.color}
              alt={`${face.alt} Color`}
              fill
              unoptimized
              className="object-cover pointer-events-none"
              style={{
                WebkitMaskImage:
                  "radial-gradient(circle var(--mask-size) at var(--x) var(--y), black 60%, transparent 100%)",
                maskImage:
                  "radial-gradient(circle var(--mask-size) at var(--x) var(--y), black 60%, transparent 100%)"
              }}
            />

            <div
              className="absolute pointer-events-none rounded-full border border-black z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                width: "calc(var(--mask-size) * 2)",
                height: "calc(var(--mask-size) * 2)",
                left: "calc(var(--x) - var(--mask-size))",
                top: "calc(var(--y) - var(--mask-size))"
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
