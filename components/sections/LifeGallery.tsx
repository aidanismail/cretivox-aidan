"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { id: 1, src: "/Gallery/kelulusan.jpeg", caption: "Highschool Graduation" },
  {
    id: 2,
    src: "/Gallery/cartil.jpeg",
    caption: "Abis lulus osjur, ke Cartil yuk"
  },
  {
    id: 3,
    src: "/Gallery/sporty.jpeg",
    caption: "Sporty yang kau minta"
  },
  { id: 4, src: "/Gallery/berhimpun.jpeg", caption: "Berhimpun!" },
  { id: 5, src: "/Gallery/ngeband.JPG", caption: "Jadi George Harrison" }
];

export default function LifeGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const strip = stripRef.current;
      if (!strip) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",

          end: () => `+=${strip.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      tl.from(".intro-text", {
        y: 80,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      })

        .to(
          ".intro-text",
          {
            y: -80,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in"
          },
          "+=0.25"
        )

        .to(
          strip,
          {
            x: () => -(strip.scrollWidth - window.innerWidth),
            duration: 3,
            ease: "none"
          },
          "+=0.1"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-white overflow-hidden text-black "
    >
      {/* text */}
      <div className="intro-text absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight text-center">
          But... I don&apos;t <br /> just write codes.
        </h2>
      </div>

      {/* Gallery strip */}
      <div
        ref={stripRef}
        className="gallery-strip absolute top-0 left-0 flex h-full items-center gap-10 pl-[100vw] pr-[20vw] w-max will-change-transform"
      >
        {galleryItems.map((item) => (
          <div key={item.id} className="flex flex-col gap-4 group">
            <div className="relative w-[75vw] max-w-125 aspect-4/3 border border-black overflow-hidden bg-gray-100">
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover "
                unoptimized
              />
            </div>

            <p className="text-lg md:text-xl font-medium tracking-tight text-black max-w-125">
              {item.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
