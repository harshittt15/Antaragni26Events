/* ----------------------------------------------------------------------------
   Single source of truth for per-event / per-roadtrip visual identity.
   Used by lineup lists, detail pages and generated poster art.
   motif → which generative composition PosterArt draws.
---------------------------------------------------------------------------- */

export type Motif = "bars" | "rays" | "rings" | "wave" | "dots" | "blob" | "burst";

export interface VisualTheme {
	a: string; // gradient start
	b: string; // gradient end
	tag: string; // short label shown on chips
	motif: Motif;
	tagline: string; // one-liner used in hover marquees / detail heroes
}

/* handcrafted fire-family duotones — vermilion / maroon / marigold /
   raspberry with jade as the cool counterpoint. Warm by default. */
export const CAT_THEME: Record<string, { a: string; b: string }> = {
	"Performing Arts": { a: "#ef4e23", b: "#7e2a1c" },
	"Literary Arts": { a: "#2f8a72", b: "#1d5747" },
	"Media Arts": { a: "#f2a33c", b: "#d84a6b" },
	"Visual Arts": { a: "#2f8a72", b: "#f2a33c" },
	Personality: { a: "#d84a6b", b: "#ef4e23" },
	Fashion: { a: "#d84a6b", b: "#7e2a1c" },
	"Special Event": { a: "#f2a33c", b: "#2f8a72" },
};

export const EVENT_THEME: Record<string, VisualTheme> = {
	anicon: { a: "#f2a33c", b: "#2f8a72", tag: "Special Event", motif: "dots", tagline: "Cosplay. Manga. Mayhem." },
	dance: { a: "#ef4e23", b: "#d84a6b", tag: "Performing Arts", motif: "rays", tagline: "Own the floor." },
	debate: { a: "#2f8a72", b: "#1d5747", tag: "Literary Arts", motif: "rings", tagline: "Win the argument." },
	dramatics: { a: "#d84a6b", b: "#7e2a1c", tag: "Performing Arts", motif: "burst", tagline: "Stop the crowd." },
	ele: { a: "#2f8a72", b: "#f2a33c", tag: "Literary Arts", motif: "wave", tagline: "Words that cut." },
	fnp: { a: "#f2a33c", b: "#d84a6b", tag: "Media Arts", motif: "dots", tagline: "Frame the fire." },
	finearts: { a: "#2f8a72", b: "#d84a6b", tag: "Visual Arts", motif: "blob", tagline: "Paint it loud." },
	hle: { a: "#f2a33c", b: "#7e2a1c", tag: "Literary Arts", motif: "wave", tagline: "शब्दों की आग।" },
	MnM: { a: "#d84a6b", b: "#ef4e23", tag: "Personality", motif: "rays", tagline: "Be the moment." },
	musicals: { a: "#ef4e23", b: "#7e2a1c", tag: "Performing Arts", motif: "bars", tagline: "Turn it up." },
	quiz: { a: "#2f8a72", b: "#7e2a1c", tag: "Literary Arts", motif: "rings", tagline: "Know everything." },
	ritambhara: { a: "#d84a6b", b: "#7e2a1c", tag: "Fashion", motif: "burst", tagline: "Walk like thunder." },
};

export const TRIP_THEME: Record<string, VisualTheme> = {
	BattleUnderground: { a: "#7e2a1c", b: "#d84a6b", tag: "Rap Battle", motif: "burst", tagline: "Bars over everything." },
	"bug-rap": { a: "#7e2a1c", b: "#d84a6b", tag: "Rap Battle", motif: "burst", tagline: "Bars over everything." },
	"bug-beatboxing": { a: "#7e2a1c", b: "#f2a33c", tag: "Beatboxing", motif: "bars", tagline: "No instruments. No mercy." },
	synchro: { a: "#2f8a72", b: "#ef4e23", tag: "Battle of Bands", motif: "bars", tagline: "Loudest band wins." },
	comickaun: { a: "#f2a33c", b: "#ef4e23", tag: "Stand-up Comedy", motif: "blob", tagline: "Make them cry laughing." },
	junoon: { a: "#ef4e23", b: "#7e2a1c", tag: "Rock", motif: "burst", tagline: "Feel the junoon." },
	djwar: { a: "#2f8a72", b: "#d84a6b", tag: "Electronic Music", motif: "wave", tagline: "Drop it heavy." },
	nationals: { a: "#ef4e23", b: "#f2a33c", tag: "Grand Finale", motif: "rays", tagline: "One stage. One crown." },
};

export function eventTheme(slug: string, category?: string): VisualTheme {
	return (
		EVENT_THEME[slug] ?? {
			...(CAT_THEME[category ?? ""] ?? { a: "#ef4e23", b: "#7e2a1c" }),
			tag: category ?? "Event",
			motif: "rays" as Motif,
			tagline: "Enter the arena.",
		}
	);
}

export function tripTheme(slug: string, category?: string): VisualTheme {
	const ciKey = Object.keys(TRIP_THEME).find(
		(k) => k.toLowerCase() === slug.toLowerCase()
	);
	return (
		TRIP_THEME[slug] ??
		(ciKey ? TRIP_THEME[ciKey] : undefined) ?? {
			a: "#ef4e23",
			b: "#7e2a1c",
			tag: category ?? "Roadtrip",
			motif: "rays" as Motif,
			tagline: "Antaragni on tour.",
		}
	);
}
