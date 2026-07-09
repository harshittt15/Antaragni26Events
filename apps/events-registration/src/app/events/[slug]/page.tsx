"use client";

import { doc, getSingleDoc } from "@repo/firebase";
import { EventDetails } from "./EventDetails";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useStore } from "@repo/store";
import Link from "next/link";
import { eventsData } from "../../../data/events";
import { Reveal } from "../../../components/fx/Reveal";

/* per-category gradients — kept in sync with /events */
const CAT_THEME: Record<string, { a: string; b: string }> = {
	"Performing Arts": { a: "#7c3aed", b: "#ff6ec7" },
	"Literary Arts": { a: "#4dd8ff", b: "#7c3aed" },
	"Media Arts": { a: "#ff8a3d", b: "#ff6ec7" },
	"Visual Arts": { a: "#4dd8ff", b: "#c7f441" },
	Personality: { a: "#ff6ec7", b: "#ff8a3d" },
	Fashion: { a: "#ff6ec7", b: "#7c3aed" },
	"Special Event": { a: "#c7f441", b: "#4dd8ff" },
};

const IndividualEventPage = () => {
	const params = useParams<{ slug: string }>();
	const [eventData, setEventData] = useState<doc | null>(null);
	const { setLoading } = useStore();

	const cardInfo = eventsData.find((e) => e.slug === params.slug);
	const theme = CAT_THEME[cardInfo?.category ?? ""] ?? {
		a: "#7c3aed",
		b: "#ff6ec7",
	};

	const fetchData = async () => {
		setLoading(true);
		let data;
		if (params.slug === "ritambhara") {
			data = await getSingleDoc("WebContentsNew", `events_ritambhara_New`);
		} else {
			data = await getSingleDoc("WebContentsNew", `events_${params.slug}`);
		}
		if (data) {
			setLoading(false);
		}
		setEventData(data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		eventData && (
			<section className="min-h-screen pb-10 pt-32">
				<div className="container mx-auto px-6">
					<Reveal className="mb-14 text-center">
						<Link
							href="/events"
							className="chip mb-6 !text-[10px] hover:border-[var(--lime)]"
						>
							&larr; All events
						</Link>
						<p
							className="text-xs font-bold uppercase tracking-[0.35em]"
							style={{ color: theme.b }}
						>
							{eventData.category || cardInfo?.category}
						</p>
						<h1
							className="font-title mt-3 text-5xl font-black leading-[1.02] md:text-8xl"
							style={{
								background: `linear-gradient(92deg, ${theme.a}, ${theme.b})`,
								WebkitBackgroundClip: "text",
								backgroundClip: "text",
								color: "transparent",
							}}
						>
							{eventData.title || cardInfo?.title}
						</h1>
					</Reveal>

					<EventDetails eventData={eventData} slug={params.slug} />
				</div>
			</section>
		)
	);
};

export default IndividualEventPage;
