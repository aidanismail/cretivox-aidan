"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollRefresh() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const body = document.body;

    const scrollToTop = () => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    };

    gsap.set(body, {
      autoAlpha: 0
    });

    scrollToTop();

    const fadeIn = gsap.to(body, {
      autoAlpha: 1,
      duration: 1.55,
      ease: "power2.out",
      delay: 0.08
    });

    const raf = requestAnimationFrame(scrollToTop);
    const timeout = window.setTimeout(scrollToTop, 120);

    const handleBeforeUnload = () => {
      gsap.set(body, {
        autoAlpha: 0
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      fadeIn.kill();
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
}
