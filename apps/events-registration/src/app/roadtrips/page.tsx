"use client";

import Link from "next/link";
import Image from "next/image";
import { roadtrips } from "../../data/roadtrips";
import { Reveal, RevealTitle } from "../../components/fx/Reveal";

/* per-roadtrip theme */
const TRIP_THEME: Record<string, { a: string; b: string; tag: string }> = {
	BattleUnderground: { a: "#ff8a3d", b: "#e11d48", tag: "Rap Battle" },
	synchro: { a: "#4dd8ff", b: "#7c3aed", tag: "Battle of Bands" },
	comickaun: { a: "#c7f441", b: "#ff8a3d", tag: "Stand-up Comedy" },
	junoon: { a: "#e11d48", b: "#7c3aed", tag: "Rock" },
	djwar: { a: "#7c3aed", b: "#4dd8ff", tag: "Electronic Music" },
	nationals: { a: "#c7f441", b: "#ff6ec7", tag: "Grand Finale" },
};

const STEPS = [
	{
		n: "01",
		title: "Register your act",
		desc: "Pick your battle — rock, rap, beatbox, comedy or decks — and sign up online.",
	},
	{
		n: "02",
		title: "Win your city",
		desc: "Face the best of your city at the prelims when the Antaragni caravan rolls in.",
	},
	{
		n: "03",
		title: "Finale at IIT Kanpur",
		desc: "City champions clash on the biggest stage of them all — the Nationals at Antaragni '26.",
	},
];

export default function RoadtripsPage() {
	return (
		<div className="pt-32">
			{/* ------------------------------ HERO ------------------------------ */}
			<section className="mx-auto max-w-6xl px-4 text-center">
				<Reveal>
					<p className="eyebrow mb-5">On tour &middot; Across India</p>
				</Reveal>
				<RevealTitle
					as="h1"
					text="ANTARAGNI ON TOUR"
					className="font-title text-5xl font-black leading-[1.02] md:text-8xl"
				/>
				<Reveal delay={0.15}>
					<p className="mx-auto mt-6 max-w-2xl text-foreground/70">
						Before the fest comes home, it hits the road. Six travelling
						battles storm 15+ cities hunting for India&rsquo;s loudest bands,
						sharpest comics and fiercest crews.
					</p>
				</Reveal>
			</section>

			{/* --------------------------- HOW IT WORKS -------------------------- */}
			<section className="mx-auto max-w-6xl px-4 py-20">
				<Reveal className="grid gap-6 md:grid-cols-3" stagger={0.12}>
					{STEPS.map((s) => (
						<div key={s.n} className="glass glow-card rounded-3xl p-8">
							<span className="font-title text-5xl font-black text-gradient">
								{s.n}
							</span>
							<h3 className="font-title mt-4 text-xl font-bold">{s.title}</h3>
							<p className="mt-3 text-sm leading-relaxed text-foreground/60">
								{s.desc}
							</p>
						</div>
					))}
				</Reveal>
			</section>

			{/* ------------------------------ TRIPS ------------------------------ */}
			<section className="mx-auto max-w-6xl px-4 pb-24">
				<Reveal className="mb-12 text-center">
					<p className="eyebrow mb-4">Choose your battle</p>
					<RevealTitle
						text="Six battles. One crown."
						className="font-title text-4xl font-black md:text-6xl"
					/>
				</Reveal>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{roadtrips.map((trip) => {
						const theme = TRIP_THEME[trip.slug] ?? {
							a: "#7c3aed",
							b: "#ff6ec7",
							tag: trip.category,
						};
						return (
							<Link
								key={trip.slug}
								href={`/roadtrips/${trip.slug}`}
								data-cursor-text="OPEN"
								className={`glow-card group relative block overflow-hidden rounded-3xl border border-white/10 ${
									trip.slug === "nationals"
										? "h-96 sm:col-span-2 lg:col-span-3 lg:h-[420px]"
										: "h-96"
								}`}
							>
								<Image
									src={trip.imageUrl}
									alt={trip.title}
									fill
									sizes="(max-width: 640px) 100vw, 50vw"
									className="object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-85"
								/>
								<div
									className="absolute inset-0 opacity-55 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-40"
									style={{
										background: `linear-gradient(160deg, ${theme.a}, ${theme.b})`,
									}}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-[#0a0612] via-transparent to-transparent" />

								<div className="absolute bottom-0 w-full p-7">
									<span
										className="chip mb-3 !text-[10px]"
										style={{ color: theme.a }}
									>
										{theme.tag}
									</span>
									<h3
										className={`font-title font-black leading-tight ${
											trip.slug === "nationals"
												? "text-4xl md:text-6xl"
												: "text-3xl"
										}`}
									>
										{trip.title}
									</h3>
									<span className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/60 transition-colors duration-300 group-hover:text-[var(--lime)]">
										Tour details &amp; registration
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
		</div>
	);
}
