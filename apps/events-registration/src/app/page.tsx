"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Marquee } from "../components/fx/Marquee";
import { Reveal, RevealTitle } from "../components/fx/Reveal";
import { PosterArt } from "../components/fx/PosterArt";
import { Magnetic } from "../components/fx/Magnetic";
import { eventTheme, tripTheme } from "../data/themes";
import { Contact } from "../components/Contact";
import { useStore } from "@repo/store";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ---------------------------------- HERO ----------------------------------
   An album cover, not a landing page: left-anchored giant bone wordmark
   with its last letter set alight, a whisper of repeated outline type
   behind, date stamp top-right. */

const TITLE = "ANTARAGNI";

function Hero() {
	const ref = useRef<HTMLDivElement>(null);
	const { initialAnimation } = useStore();

	useGSAP(
		() => {
			/* hold the entrance while the preloader curtain is still up —
			   it releases initialAnimation as the curtain starts to lift,
			   so this plays as one continuous reveal */
			if (initialAnimation) return;

			if (!document.hidden) {
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
					.from(".hero-stamp", { opacity: 0, y: -16, duration: 0.6, ease: "power3.out" }, "-=0.6")
					.from(".hero-scroll", { opacity: 0, duration: 1 }, "-=0.2");
			}

			gsap.to(".hero-title", {
				yPercent: -16,
				opacity: 0.3,
				ease: "none",
				scrollTrigger: {
					trigger: ref.current,
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			});
			gsap.to(".hero-backdrop", {
				yPercent: 22,
				ease: "none",
				scrollTrigger: {
					trigger: ref.current,
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			});
		},
		{ scope: ref, dependencies: [initialAnimation] }
	);

	return (
		<section
			ref={ref}
			className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 md:px-12"
		>
			{/* whisper of outline type behind everything */}
			<div className="hero-backdrop pointer-events-none absolute inset-0 flex flex-col justify-center gap-10">
				{[0, 1].map((row) => (
					<div
						key={row}
						className="backdrop-word font-poster text-[11vw] uppercase"
						style={{
							transform: `translateX(${row % 2 ? -6 : -16}%)`,
						}}
					>
						{Array.from({ length: 4 })
							.map(() => "ANTARAGNI ")
							.join("")}
					</div>
				))}
			</div>

			{/* date stamp, pinned top-right */}
			<div className="hero-stamp absolute right-5 top-24 md:right-14 md:top-28">
				<div className="flex flex-col items-end gap-1.5">
					<span className="tape">OCT 2026</span>
					<span className="tape tape-flame">IIT KANPUR</span>
					<span className="tape tape-marigold">61st Edition</span>
				</div>
			</div>

			<div className="relative max-w-[1500px]">
				<p className="hero-eyebrow mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-foreground/70">
					<span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--flame)" }} />
					North India&rsquo;s biggest college cultural festival
				</p>

				{/* the identity — solid bone type, one unified wordmark */}
				<div className="hero-title relative w-fit select-none">
					<h1
						className="hero-word font-title relative text-[10.5vw] font-black md:text-[9.3vw]"
						aria-label={TITLE}
					>
						{TITLE.split("").map((ch, i) => (
							<span
								key={i}
								className="inline-block overflow-hidden align-bottom"
								aria-hidden
							>
								<span className="hero-letter inline-block">{ch}</span>
							</span>
						))}
					</h1>
				</div>

				<div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
					<p className="hero-sub max-w-md text-base leading-relaxed text-foreground/70 md:text-lg">
						Four days. Hundreds of stages. One incredible story. And
						you&rsquo;re in it. The 61st edition returns louder than ever.
					</p>

					<div className="flex flex-wrap items-center gap-5">
						<Magnetic>
							<Link href="/events" className="hero-cta btn-primary" data-cursor-text="GO">
								Explore Events
							</Link>
						</Magnetic>
						<Magnetic>
							<Link href="/roadtrips" className="hero-cta btn-paper" data-cursor-text="GO">
								Ride the Roadtrips
							</Link>
						</Magnetic>
					</div>
				</div>
			</div>

			<div className="hero-scroll absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-foreground/40">
				<span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
				<span className="block h-10 w-px animate-pulse bg-gradient-to-b from-foreground/60 to-transparent" />
			</div>
		</section>
	);
}

/* ----------------------------- MARQUEE BAND ------------------------------- */

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
		<div className="relative z-10 overflow-hidden py-14">
			<div style={{ background: "var(--marigold)" }}>
				<Marquee duration={22} className="py-3">
					{WORDS.map((w) => (
						<span
							key={w}
							className="font-title mx-4 flex items-center gap-8 text-xl font-bold uppercase tracking-wide text-[#151112]"
						>
							{w}
							<span className="text-[#151112]/40">&bull;</span>
						</span>
					))}
				</Marquee>
			</div>
		</div>
	);
}

/* ------------------------------ PORTAL POSTERS ----------------------------
   Two full-bleed gig posters, side by side — the site's two doors. */

function Portals() {
	return (
		<section className="relative mx-auto max-w-6xl px-4 py-32">
			<div className="backdrop-word font-poster pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 text-[16vw] uppercase">
				Two Worlds
			</div>

			<Reveal className="relative mb-20 max-w-lg">
				<span className="eyebrow mb-4 inline-block" style={{ color: "var(--raspberry)" }}>
					Pick your universe
				</span>
				<h2 className="font-title text-4xl font-black uppercase leading-none md:text-6xl">
					One fest.
					<br />
					<span className="text-[var(--flame)]">Two worlds.</span>
				</h2>
			</Reveal>

			<div className="relative grid gap-10 md:grid-cols-2 md:gap-8">
				{/* Events poster */}
				<Reveal>
					<Link
						href="/events"
						data-cursor-text="ENTER"
						className="group relative block overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50 transition-transform duration-500 hover:-translate-y-2"
					>
						<span className="tape absolute left-6 top-6 z-10">On campus</span>
						<div className="relative h-[520px] overflow-hidden">
							<PosterArt
								slug="events-portal"
								title="Events"
								a="#ef4e23"
								b="#7e2a1c"
								motif="rays"
								className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-[#151112] via-transparent to-transparent" />
							<div className="absolute bottom-0 w-full p-7">
								<h3 className="font-poster text-7xl uppercase leading-none">
									Events
								</h3>
								<p className="mt-3 max-w-sm text-sm text-foreground/75">
									40+ competitions across dance, music, drama, literary arts,
									quizzing and fashion. The main arena awaits.
								</p>
								<span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--flame)]">
									Enter the arena
									<span className="transition-transform duration-300 group-hover:translate-x-2">
										&rarr;
									</span>
								</span>
							</div>
						</div>
					</Link>
				</Reveal>

				{/* Roadtrips poster — offset lower for rhythm */}
				<Reveal delay={0.12} className="md:mt-20">
					<Link
						href="/roadtrips"
						data-cursor-text="ENTER"
						className="group relative block overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50 transition-transform duration-500 hover:-translate-y-2"
					>
						<span className="tape tape-marigold absolute right-6 top-6 z-10">
							Across India
						</span>
						<div className="relative h-[520px] overflow-hidden">
							<PosterArt
								slug="roadtrips-portal"
								title="Roadtrips"
								a="#f2a33c"
								b="#d84a6b"
								motif="burst"
								className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-[#151112] via-transparent to-transparent" />
							<div className="absolute bottom-0 w-full p-7">
								<h3 className="font-poster text-7xl uppercase leading-none">
									Roadtrips
								</h3>
								<p className="mt-3 max-w-sm text-sm text-foreground/75">
									Rock, rap, beatboxing, comedy and DJ battles hit your city
									before the grand finale at IIT Kanpur.
								</p>
								<span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--raspberry)]">
									Hit the road
									<span className="transition-transform duration-300 group-hover:translate-x-2">
										&rarr;
									</span>
								</span>
							</div>
						</div>
					</Link>
				</Reveal>
			</div>
		</section>
	);
}

/* --------------------------------- NUMBERS --------------------------------
   No boxes. The numbers ARE the layout — a giant typographic stack. */

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

	return <span ref={ref}>0{suffix}</span>;
}

const STATS = [
	{ to: 60, suffix: "+", label: "years of legacy", style: "solid" },
	{ to: 300, suffix: "+", label: "colleges", style: "outline" },
	{ to: 40, suffix: "+", label: "competitions", style: "gradient" },
	{ to: 15, suffix: "+", label: "roadtrip cities", style: "solid" },
];

function About() {
	return (
		<section className="relative mx-auto max-w-6xl overflow-hidden px-4 py-28">
			<div className="grid items-start gap-16 md:grid-cols-[1.1fr_1fr]">
				<Reveal>
					<span className="eyebrow mb-5 inline-block">
						The rebirth of culture
					</span>
					<h2 className="font-title text-4xl font-black leading-tight md:text-5xl">
						Six decades of{" "}
						<span className="marker-flame marker inline-block">
							goosebumps.
						</span>
					</h2>
					<p className="mt-6 leading-relaxed text-foreground/70">
						Since 1966, Antaragni has been where India&rsquo;s most fearless
						performers collide. From midnight jam sessions to roaring pronites,
						from street plays that stop crowds to quizzes that break brains,
						this is the stage where legends take their first bow.
					</p>
					<p className="mt-4 leading-relaxed text-foreground/70">
						In 2026 we return <span className="marker">louder, brighter and bolder</span>.
						Register, compete, and write yourself into the story.
					</p>
				</Reveal>

				{/* typographic stat stack */}
				<Reveal className="flex flex-col gap-5" stagger={0.12}>
					{STATS.map((s) => (
						<div key={s.label} className="flex items-baseline gap-5">
							<span
								className={`font-poster w-56 text-right text-7xl leading-[0.9] md:text-8xl ${
									s.style === "gradient"
										? "text-[var(--marigold)]"
										: s.style === "outline"
											? "text-stroke-flame"
											: ""
								}`}
							>
								<Counter to={s.to} suffix={s.suffix} />
							</span>
							<span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.25em] text-foreground/50">
								{s.label}
							</span>
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

/* poster wall — generated art, one per marquee slot */
const WALL = [
	{ slug: "musicals", title: "Music" },
	{ slug: "junoon", title: "Junoon", trip: true },
	{ slug: "dance", title: "Dance" },
	{ slug: "djwar", title: "DJ Wars", trip: true },
	{ slug: "dramatics", title: "Dramatics" },
	{ slug: "nationals", title: "Nationals", trip: true },
	{ slug: "ritambhara", title: "Ritambhara" },
	{ slug: "comickaun", title: "ComicKaun", trip: true },
];

function Legacy() {
	return (
		<section className="relative overflow-hidden py-28">
			<div className="backdrop-word font-poster pointer-events-none absolute left-0 top-6 w-full text-center text-[13vw] uppercase">
				Legends
			</div>

			<Reveal className="relative mx-auto mb-16 max-w-6xl px-4">
				<span className="eyebrow mb-4 inline-block" style={{ color: "var(--marigold)" }}>
					The wall of legends
				</span>
				<h2 className="font-title max-w-xl text-4xl font-black uppercase leading-none md:text-6xl">
					They played <span className="text-[var(--marigold)]">our stage.</span>
				</h2>
			</Reveal>

			{/* poster wall */}
			<Marquee duration={45} pauseOnHover className="mb-12">
				{WALL.map((p, i) => {
					const t = p.trip ? tripTheme(p.slug) : eventTheme(p.slug);
					return (
						<div
							key={i}
							className={`relative mx-4 h-64 w-48 shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/50 md:h-80 md:w-60 ${
								i % 2 ? "translate-y-4" : "-translate-y-2"
							}`}
						>
							<PosterArt
								slug={p.slug}
								title={p.title}
								a={t.a}
								b={t.b}
								motif={t.motif}
								index={i}
								className="h-full w-full"
							/>
						</div>
					);
				})}
			</Marquee>

			{/* artist name marquee */}
			<Marquee duration={30} reverse className="py-2">
				{ARTISTS.map((a) => (
					<span
						key={a}
						className="font-poster mx-6 flex items-center gap-12 text-4xl uppercase md:text-6xl"
					>
						<span className="text-stroke transition-colors duration-300 hover:text-[var(--flame)]">
							{a}
						</span>
						<span style={{ color: "var(--raspberry)" }}>&bull;</span>
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
			<Band />
			<Portals />
			<About />
			<Legacy />
			<Contact />
		</>
	);
}
