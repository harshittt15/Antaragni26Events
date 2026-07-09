"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Marquee } from "../components/fx/Marquee";
import { Reveal, RevealTitle } from "../components/fx/Reveal";
import { Contact } from "../components/Contact";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ---------------------------------- HERO ---------------------------------- */

const TITLE = "ANTARAGNI";

function Hero() {
	const ref = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
			tl.from(".hero-letter", {
				yPercent: 120,
				rotate: 6,
				stagger: 0.055,
				duration: 1.2,
				delay: 0.25,
			})
				.from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.7 }, "-=0.7")
				.from(".hero-sub", { opacity: 0, y: 24, duration: 0.8 }, "-=0.5")
				.from(
					".hero-cta",
					{ opacity: 0, y: 24, stagger: 0.12, duration: 0.7 },
					"-=0.55"
				)
				.from(".hero-scroll", { opacity: 0, duration: 1 }, "-=0.2");

			// slow parallax drift of the title on scroll
			gsap.to(".hero-title", {
				yPercent: -18,
				opacity: 0.25,
				ease: "none",
				scrollTrigger: {
					trigger: ref.current,
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			});
		},
		{ scope: ref }
	);

	return (
		<section
			ref={ref}
			className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center"
		>
			<p className="hero-eyebrow eyebrow mb-6">
				IIT Kanpur &middot; 61st Edition &middot; October 2026
			</p>

			<h1
				className="hero-title font-title select-none text-[16vw] font-black leading-[0.95] tracking-tight md:text-[11vw]"
				aria-label={TITLE}
			>
				{TITLE.split("").map((ch, i) => (
					<span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden>
						<span
							className={`hero-letter inline-block ${i % 3 === 1 ? "text-gradient" : ""} ${i % 3 === 2 ? "text-stroke" : ""}`}
						>
							{ch}
						</span>
					</span>
				))}
			</h1>

			<p className="hero-sub mt-6 max-w-xl text-base text-foreground/70 md:text-lg">
				North India&rsquo;s biggest celebration of culture. Four days, hundreds
				of stages, one incredible story &mdash; and you&rsquo;re in it.
			</p>

			<div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
				<Link href="/events" className="hero-cta btn-festival" data-cursor-text="GO">
					Explore Events
				</Link>
				<Link href="/roadtrips" className="hero-cta btn-ghost" data-cursor-text="GO">
					Ride the Roadtrips
				</Link>
			</div>

			<div className="hero-scroll absolute bottom-8 flex flex-col items-center gap-2 text-foreground/40">
				<span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
				<span className="block h-10 w-px animate-pulse bg-gradient-to-b from-foreground/60 to-transparent" />
			</div>
		</section>
	);
}

/* ------------------------------ MARQUEE BAND ------------------------------ */

const WORDS = [
	"Music",
	"Dance",
	"Dramatics",
	"Comedy",
	"Fashion",
	"Quiz",
	"Fine Arts",
	"Literary",
	"Films",
	"Rock",
	"Rap",
	"EDM",
];

function Band() {
	return (
		<div className="relative z-10 py-4">
			<Marquee
				duration={22}
				className="py-3"
			>
				{WORDS.map((w) => (
					<span
						key={w}
						className="font-title mx-4 flex items-center gap-8 text-xl font-bold uppercase tracking-wide text-[#0a0612]"
					>
						{w}
						<span className="text-[#0a0612]/60">&#10022;</span>
					</span>
				))}
			</Marquee>
		</div>
	);
}

/* ------------------------------ PORTAL CARDS ------------------------------ */

function Portals() {
	return (
		<section className="mx-auto max-w-6xl px-4 py-24">
			<Reveal className="mb-14 text-center">
				<p className="eyebrow mb-4">Pick your universe</p>
				<RevealTitle
					text="Two worlds. One fest."
					className="font-title text-4xl font-black md:text-6xl"
				/>
			</Reveal>

			<div className="grid gap-6 md:grid-cols-2">
				{/* Events portal */}
				<Reveal>
					<Link
						href="/events"
						data-cursor-text="ENTER"
						className="glow-card group relative block h-[480px] overflow-hidden rounded-3xl border border-white/10"
					>
						<Image
							src="/events/dance.jpeg"
							alt="Events at Antaragni"
							fill
							className="object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-75"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-[#0a0612] via-[#0a0612]/30 to-transparent" />
						<div className="absolute inset-0 bg-gradient-to-tr from-[var(--violet)]/40 to-transparent mix-blend-color" />
						<div className="absolute bottom-0 p-8">
							<span className="chip mb-4" style={{ color: "var(--lime)" }}>
								On Campus
							</span>
							<h3 className="font-title text-5xl font-black">EVENTS</h3>
							<p className="mt-3 max-w-sm text-sm text-foreground/70">
								40+ competitions across dance, music, drama, literary arts,
								quizzing, fashion and more. The main arena awaits.
							</p>
							<span className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--lime)]">
								Explore events
								<span className="transition-transform duration-300 group-hover:translate-x-2">
									&rarr;
								</span>
							</span>
						</div>
					</Link>
				</Reveal>

				{/* Roadtrips portal */}
				<Reveal delay={0.12}>
					<Link
						href="/roadtrips"
						data-cursor-text="ENTER"
						className="glow-card group relative block h-[480px] overflow-hidden rounded-3xl border border-white/10"
					>
						<Image
							src="/roadtrips/nationals.jpg"
							alt="Roadtrips across India"
							fill
							className="object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-75"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-[#0a0612] via-[#0a0612]/30 to-transparent" />
						<div className="absolute inset-0 bg-gradient-to-tr from-[var(--pink)]/40 to-transparent mix-blend-color" />
						<div className="absolute bottom-0 p-8">
							<span className="chip mb-4" style={{ color: "var(--pink)" }}>
								Across India
							</span>
							<h3 className="font-title text-5xl font-black">ROADTRIPS</h3>
							<p className="mt-3 max-w-sm text-sm text-foreground/70">
								Antaragni on tour &mdash; rock, rap, beatboxing, comedy and DJ
								battles hit your city before the grand finale at IIT Kanpur.
							</p>
							<span className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--pink)]">
								Explore roadtrips
								<span className="transition-transform duration-300 group-hover:translate-x-2">
									&rarr;
								</span>
							</span>
						</div>
					</Link>
				</Reveal>
			</div>
		</section>
	);
}

/* --------------------------------- ABOUT ---------------------------------- */

function Counter({ to, suffix }: { to: number; suffix: string }) {
	const ref = useRef<HTMLSpanElement>(null);

	useGSAP(() => {
		if (!ref.current) return;
		const obj = { v: 0 };
		gsap.to(obj, {
			v: to,
			duration: 2,
			ease: "power2.out",
			scrollTrigger: { trigger: ref.current, start: "top 90%" },
			onUpdate: () => {
				if (ref.current)
					ref.current.textContent = `${Math.round(obj.v)}${suffix}`;
			},
		});
	});

	return (
		<span ref={ref} className="font-title text-5xl font-black text-gradient md:text-6xl">
			0{suffix}
		</span>
	);
}

const STATS = [
	{ to: 60, suffix: "+", label: "Years of legacy" },
	{ to: 300, suffix: "+", label: "Colleges represented" },
	{ to: 40, suffix: "+", label: "Competitions" },
	{ to: 15, suffix: "+", label: "Roadtrip cities" },
];

function About() {
	return (
		<section className="mx-auto max-w-6xl px-4 py-24">
			<div className="grid items-center gap-16 md:grid-cols-2">
				<Reveal>
					<p className="eyebrow mb-4">The rebirth of culture</p>
					<RevealTitle
						text="Six decades of goosebumps."
						className="font-title text-4xl font-black leading-tight md:text-5xl"
					/>
					<p className="mt-6 leading-relaxed text-foreground/70">
						Since 1966, Antaragni has been where India&rsquo;s most fearless
						performers collide. From midnight jam sessions to roaring
						pronites, from street plays that stop crowds to quizzes that
						break brains &mdash; this is the stage where legends take their
						first bow.
					</p>
					<p className="mt-4 leading-relaxed text-foreground/70">
						In 2026 we return louder, brighter and bolder. Register, compete,
						and write yourself into the story.
					</p>
				</Reveal>

				<Reveal className="grid grid-cols-2 gap-6" stagger={0.12}>
					{STATS.map((s) => (
						<div
							key={s.label}
							className="glass glow-card rounded-3xl p-8 text-center"
						>
							<Counter to={s.to} suffix={s.suffix} />
							<p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/50">
								{s.label}
							</p>
						</div>
					))}
				</Reveal>
			</div>
		</section>
	);
}

/* ------------------------------ LEGACY WALL ------------------------------- */

const ARTISTS = [
	"Sunidhi Chauhan",
	"Amit Trivedi",
	"Farhan Akhtar",
	"Mohit Chauhan",
	"KK",
	"Javed Ali",
	"Nucleya",
	"The Local Train",
	"Shaan",
	"Salim–Sulaiman",
];

const GALLERY = [
	"/roadtrips/gallery-junoon/junoon-img1.jpg",
	"/events/music.jpeg",
	"/roadtrips/gallery-junoon/junoon-img3.jpg",
	"/events/dramatics.jpg",
	"/roadtrips/gallery-junoon/junoon-img5.jpg",
	"/events/fineArts.jpg",
	"/roadtrips/gallery-junoon/junoon-img2.jpg",
	"/events/mnm.jpg",
];

function Legacy() {
	return (
		<section className="py-24">
			<Reveal className="mx-auto mb-14 max-w-6xl px-4 text-center">
				<p className="eyebrow mb-4">The wall of legends</p>
				<RevealTitle
					text="They played our stage."
					className="font-title text-4xl font-black md:text-6xl"
				/>
			</Reveal>

			{/* photo marquee */}
			<Marquee duration={45} pauseOnHover className="mb-10">
				{GALLERY.map((src, i) => (
					<div
						key={i}
						className={`relative mx-3 h-64 w-48 shrink-0 overflow-hidden rounded-2xl border border-white/10 md:h-80 md:w-60 ${i % 2 ? "translate-y-4" : "-translate-y-2"}`}
					>
						<Image
							src={src}
							alt="Antaragni moments"
							fill
							sizes="240px"
							className="object-cover transition-transform duration-700 hover:scale-110"
						/>
					</div>
				))}
			</Marquee>

			{/* artist name marquee */}
			<Marquee duration={30} reverse className="py-2">
				{ARTISTS.map((a) => (
					<span
						key={a}
						className="font-title mx-6 flex items-center gap-12 text-3xl font-bold uppercase md:text-5xl"
					>
						<span className="text-stroke transition-colors duration-300 hover:text-[var(--lime)]">
							{a}
						</span>
						<span style={{ color: "var(--pink)" }}>&#10022;</span>
					</span>
				))}
			</Marquee>
		</section>
	);
}

/* ---------------------------------- PAGE ---------------------------------- */

export default function Home() {
	return (
		<>
			<Hero />
			<div style={{ background: "var(--lime)" }} className="-rotate-1 scale-[1.02]">
				<Band />
			</div>
			<Portals />
			<About />
			<Legacy />
			<Contact />
		</>
	);
}
