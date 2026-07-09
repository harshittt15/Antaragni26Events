"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { eventsData } from "../../data/events";
import { Marquee } from "../../components/fx/Marquee";
import { Reveal, RevealTitle } from "../../components/fx/Reveal";

/* per-category gradient themes — Spotify-Wrapped energy */
const CAT_THEME: Record<string, { a: string; b: string }> = {
	"Performing Arts": { a: "#7c3aed", b: "#ff6ec7" },
	"Literary Arts": { a: "#4dd8ff", b: "#7c3aed" },
	"Media Arts": { a: "#ff8a3d", b: "#ff6ec7" },
	"Visual Arts": { a: "#4dd8ff", b: "#c7f441" },
	Personality: { a: "#ff6ec7", b: "#ff8a3d" },
	Fashion: { a: "#ff6ec7", b: "#7c3aed" },
	"Special Event": { a: "#c7f441", b: "#4dd8ff" },
};

const CATEGORIES = ["All", ...Array.from(new Set(eventsData.map((e) => e.category)))];

export default function EventsPage() {
	const [active, setActive] = useState("All");

	const visible =
		active === "All"
			? eventsData
			: eventsData.filter((e) => e.category === active);

	return (
		<div className="pt-32">
			{/* ------------------------------ HERO ------------------------------ */}
			<section className="mx-auto max-w-6xl px-4 text-center">
				<Reveal>
					<p className="eyebrow mb-5">The main arena &middot; On campus</p>
				</Reveal>
				<RevealTitle
					as="h1"
					text="PICK YOUR ARENA"
					className="font-title text-5xl font-black leading-[1.02] md:text-8xl"
				/>
				<Reveal delay={0.15}>
					<p className="mx-auto mt-6 max-w-2xl text-foreground/70">
						Twelve event verticals. Dozens of competitions. From street dance
						to stand-up poetry, pick the stage where you belong and register
						your act.
					</p>
				</Reveal>
			</section>

			{/* ---------------------------- FILTERS ----------------------------- */}
			<div className="sticky top-20 z-20 mx-auto mt-12 flex max-w-full justify-start gap-2 overflow-x-auto px-4 pb-2 md:justify-center">
				{CATEGORIES.map((cat) => (
					<button
						key={cat}
						onClick={() => setActive(cat)}
						className={`shrink-0 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
							active === cat
								? "text-[#0a0612]"
								: "glass text-foreground/70 hover:text-foreground"
						}`}
						style={
							active === cat ? { background: "var(--lime)" } : undefined
						}
					>
						{cat}
					</button>
				))}
			</div>

			{/* ------------------------------ GRID ------------------------------ */}
			<section className="mx-auto max-w-6xl px-4 py-14">
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{visible.map((event, i) => {
						const theme = CAT_THEME[event.category] ?? {
							a: "#7c3aed",
							b: "#ff6ec7",
						};
						return (
							<Link
								key={event.slug}
								href={`/events/${event.slug}`}
								data-cursor-text="OPEN"
								className="glow-card group relative block h-96 overflow-hidden rounded-3xl border border-white/10"
							>
								<Image
									src={event.imageUrl}
									alt={event.title}
									fill
									sizes="(max-width: 640px) 100vw, 33vw"
									className="object-cover opacity-70 transition-all duration-700 group-hover:scale-108 group-hover:opacity-85"
								/>
								<div
									className="absolute inset-0 opacity-55 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-40"
									style={{
										background: `linear-gradient(160deg, ${theme.a}, ${theme.b})`,
									}}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-[#0a0612] via-transparent to-transparent" />

								<span className="font-title absolute right-5 top-4 text-5xl font-black text-white/20">
									{String(i + 1).padStart(2, "0")}
								</span>

								<div className="absolute bottom-0 w-full p-6">
									<span
										className="chip mb-3 !text-[10px]"
										style={{ color: theme.b }}
									>
										{event.category}
									</span>
									<h3 className="font-title text-3xl font-black leading-tight">
										{event.title}
									</h3>
									<span className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/60 transition-colors duration-300 group-hover:text-[var(--lime)]">
										View details
										<span className="transition-transform duration-300 group-hover:translate-x-2">
											&rarr;
										</span>
									</span>
								</div>
							</Link>
						);
					})}
				</div>
			</section>

			{/* --------------------------- CTA STRIP ---------------------------- */}
			<section className="py-10">
				<Marquee duration={26} className="border-y border-white/10 py-6">
					{Array.from({ length: 8 }).map((_, i) => (
						<Link
							key={i}
							href="/dashboard"
							className="font-title mx-8 flex items-center gap-8 text-2xl font-bold uppercase"
						>
							<span className="text-gradient-pink">Ready to compete?</span>
							<span className="text-stroke">Register now</span>
							<span style={{ color: "var(--lime)" }}>&#10022;</span>
						</Link>
					))}
				</Marquee>
			</section>
		</div>
	);
}
