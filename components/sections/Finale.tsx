"use client";

import { FormEvent, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { loginUser, type LoginResponse } from "@/lib/LoginFetcher";

gsap.registerPlugin(ScrollTrigger);

const RANDOM_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@!?";

export default function Finale() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const scrambleText = () => {
    const target = textRef.current;
    if (!target) return;

    const finalText = "AUTHENTICATE";
    let frame = 0;
    const totalFrames = 24;

    const interval = window.setInterval(() => {
      const progress = frame / totalFrames;

      target.innerText = finalText
        .split("")
        .map((char, index) => {
          if (progress > index / finalText.length) return char;

          return RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
        })
        .join("");

      frame += 1;

      if (frame > totalFrames) {
        window.clearInterval(interval);
        target.innerText = finalText;
      }
    }, 40);
  };

  useGSAP(
    () => {
      gsap.set(".final-content", {
        opacity: 0,
        y: 70
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
        onEnter: scrambleText
      });
    },
    { scope: sectionRef }
  );

  const revealFinale = () => {
    gsap
      .timeline()
      .to(".lock-layer", {
        opacity: 0,
        y: -30,
        duration: 0.55,
        ease: "power3.inOut",
        pointerEvents: "none"
      })
      .to(
        ".final-content",
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power4.out"
        },
        "-=0.15"
      );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) return;

    if (!username.trim() || !password) {
      setError("Username dan password wajib diisi.");
      scrambleText();
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const loggedInUser = await loginUser({
        username: username.trim(),
        password,
        expiresInMins: 30
      });

      setUser(loggedInUser);
      requestAnimationFrame(revealFinale);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login gagal.");
      scrambleText();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-white px-5 py-8 text-black sm:px-6 md:px-12 md:py-20"
    >
      <div className="final-content relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl flex-col justify-center">
        <h2 className="text-[15vw] font-black uppercase leading-[0.78] md:text-[10vw] lg:text-[8vw]">
          You made it!
        </h2>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <p className="text-sm font-black uppercase tracking-[0.28em] md:text-base">
            Aidan Ismail
          </p>

          <span className="h-px w-12 bg-black/30" />

          <Image
            src="/logo-cretivox.png"
            alt="Cretivox"
            width={120}
            height={24}
            className="h-6 w-auto object-contain"
          />
        </div>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
          Access granted for{" "}
          <span className="font-bold text-black">{user?.firstName}</span>. Now
          let&apos;s make this internship happen.
        </p>
      </div>

      <div className="lock-layer absolute inset-0 z-30 flex min-h-screen items-center justify-center bg-white px-5 py-8 backdrop-blur-[32px] sm:px-6">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-sm flex-col gap-4"
        >
          <h3
            ref={textRef}
            className="mb-2 text-center text-4xl font-black uppercase tracking-[-0.06em] md:text-5xl"
          >
            AUTHENTICATE
          </h3>

          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="username"
            autoComplete="username"
            className="w-full border border-black/10 bg-white/70 px-5 py-4 text-sm font-bold text-black outline-none backdrop-blur-md placeholder:text-gray-400 focus:border-black"
          />

          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="password"
            autoComplete="current-password"
            className="w-full border border-black/10 bg-white/70 px-5 py-4 text-sm font-bold text-black outline-none backdrop-blur-md placeholder:text-gray-400 focus:border-black"
          />

          {error && (
            <p className="text-center text-sm font-semibold text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer bg-black px-5 py-4 text-sm font-black uppercase tracking-[0.25em] text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
          >
            {isLoading ? "Checking..." : "Authenticate"}
          </button>
        </form>
      </div>
    </section>
  );
}
