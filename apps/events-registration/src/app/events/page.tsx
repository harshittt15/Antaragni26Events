"use client";

import Link from "next/link";
import { eventsData } from "../../data/events";
import { eventTheme, CAT_THEME } from "../../data/themes";
import { Marquee } from "../../components/fx/Marquee";
import { Reveal, RevealTitle } from "../../components/fx/Reveal";
import { TiltCard } from "../../components/fx/TiltCard";
import { PosterArt } from "../../components/fx/PosterArt";

/* ----------------------------------------------------------------------------
   Festival lineup reveal — categories are STAGES, each its own zone:
   tinted atmosphere, huge zone typography, and a horizontal rail of
   collectible posters you flick through like a crate of records.
---------------------------------------------------------------------------- */

const STAGES: Record<string, { stage: string; blurb: string }> = {
	"Performing Arts": {
		stage: "Performing Arts Stage",
		blurb: "Dance, music and drama under the biggest lights on campus.",
	},
	"Literary Arts": {
		stage: "Literary Arena",
		blurb: "Words as weapons: debates, quizzes and poetry that cuts.",
	},
	"Media Arts": {
		stage: "Media District",
		blurb: "Lenses, frames and stories told at 24 frames a second.",
	},
	"Visual Arts": {
		stage: "Visual District",
		blurb: "Wet paint, loud walls and galleries that shout.",
	},
	Personality: {
		stage: "Spotlight Stage",
		blurb: "One mic, one runway, all eyes on you.",
	},
	Fashion: {
		stage: "The Runway",
		blurb: "Walk like thunder. India's boldest college fashion battle.",
	},
	"Special Event": {
		stage: "After Dark Zone",
		blurb: "The weird, the wonderful, the unmissable.",
	},
};

const CATEGORIES = Array.from(new Set(eventsData.map((e) => e.category)));

export default function EventsPage() {
	return (
		<div className="pt-36">
			{/* ------------------------------ HERO ------------------------------ */}
			<section className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-10 md:px-8">
				<Reveal>
					<span className="eyebrow mb-5 inline-block">
						The main arena &middot; On campus
					</span>
				</Reveal>
				<RevealTitle
					as="h1"
					text="THE LINEUP"
					className="font-poster text-[18vw] uppercase leading-[0.85] md:text-[11rem]"
				/>
				<Reveal delay={0.15}>
					<p className="mt-6 max-w-xl text-foreground/70">
						Seven stages. Forty-plus battles. Flick through each crate, find
						your stage, and put your name on the bill.
					</p>
				</Reveal>

				{/* stage jump rail */}
				<Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
					{CATEGORIES.map((cat, i) => {
						const theme = CAT_THEME[cat] ?? { a: "#ef4e23", b: "#7e2a1c" };
						return (
							<a
								key={cat}
								href={`#stage-${i}`}
								data-cursor-text="JUMP"
								className="ticket px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-transform duration-200 hover:-translate-y-1"
								style={{ color: theme.b }}
							>
								{STAGES[cat]?.stage ?? cat}
							</a>
						);
					})}
				</Reveal>
			</section>

			{/* ----------------------------- ZONES ------------------------------ */}
			{CATEGORIES.map((cat, i) => {
				const theme = CAT_THEME[cat] ?? { a: "#ef4e23", b: "#7e2a1c" };
				const stage = STAGES[cat] ?? { stage: cat, blurb: "" };
				const items = eventsData.filter((e) => e.category === cat);
				return (
					<section
						key={cat}
						id={`stage-${i}`}
						className="relative scroll-mt-24 overflow-hidden py-16"
					>
						{/* zone atmosphere — each stage has its own light */}
						<div
							className="pointer-events-none absolute inset-0"
							style={{
								background: `radial-gradient(90% 70% at ${i % 2 ? "85%" : "15%"} 20%, ${theme.a}1f 0%, transparent 60%), radial-gradient(70% 60% at ${i % 2 ? "10%" : "90%"} 90%, ${theme.b}17 0%, transparent 65%)`,
							}}
							aria-hidden
						/>
						<div
							className="backdrop-word font-poster pointer-events-none absolute top-2 text-[9rem] uppercase md:text-[14rem]"
							style={{ [i % 2 ? "right" : "left"]: "-0.5rem" }}
							aria-hidden
						>
							{String(i + 1).padStart(2, "0")}
						</div>

						<div className="relative mx-auto max-w-7xl px-4 md:px-8">
							{/* zone header */}
							<Reveal className={i % 2 ? "md:ml-auto md:w-fit md:text-right" : ""}>
								<span
									className="text-[10px] font-bold uppercase tracking-[0.35em]"
									style={{ color: theme.b }}
								>
									Stage {String(i + 1).padStart(2, "0")} &middot;{" "}
									{items.length} {items.length === 1 ? "event" : "events"}
								</span>
								<h2
									className="font-poster mt-1 text-5xl uppercase leading-[0.9] md:text-8xl"
									style={{
										color: theme.a,
									}}
								>
									{stage.stage}
								</h2>
								{stage.blurb && (
									<p className={`mt-2 max-w-md text-sm text-foreground/60 ${i % 2 ? "md:ml-auto" : ""}`}>
										{stage.blurb}
									</p>
								)}
							</Reveal>

							{/* the crate — horizontal poster rail */}
							<Reveal delay={0.1}>
								<div className="rail" data-cursor-text="DRAG">
									{items.map((e, j) => {
										const t = eventTheme(e.slug, e.category);
										return (
											<Link
												key={e.slug}
												href={`/events/${e.slug}`}
												data-cursor-text="OPEN"
												className="group block"
											>
												<TiltCard className="h-[300px] w-[228px] md:h-[356px] md:w-[270px]">
													<div className="h-full w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/50 transition-transform duration-300 group-hover:-translate-y-1">
														<PosterArt
															slug={e.slug}
															title={e.title}
															a={t.a}
															b={t.b}
															motif={t.motif}
															index={j}
															className="h-full w-full"
														/>
													</div>
												</TiltCard>
											</Link>
										);
									})}
									{/* end-of-crate cap */}
									<div className="flex w-40 items-center justify-center">
										<span
											className="font-poster rotate-90 whitespace-nowrap text-2xl uppercase tracking-widest text-foreground/25"
										>
											{stage.stage} &rarr;
										</span>
									</div>
								</div>
							</Reveal>
						</div>
					</section>
				);
			})}

			{/* --------------------------- CTA STRIP ---------------------------- */}
			<section className="py-12">
				<div style={{ background: "var(--flame)" }}>
					<Marquee duration={26} className="py-5">
						{Array.from({ length: 8 }).map((_, i) => (
							<Link
								key={i}
								href="/dashboard"
								className="font-poster mx-8 flex items-center gap-8 text-3xl uppercase text-[var(--bone)]"
							>
								<span>Ready to compete?</span>
								<span className="underline decoration-4 underline-offset-4">
									Register now
								</span>
								<span>&bull;</span>
							</Link>
						))}
					</Marquee>
				</div>
			</section>
		</div>
	);
}
