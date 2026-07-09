"use client";

import { useState } from "react";
import { StaggeredFadeIn } from "../../../components/FadeIn";
import { doc } from "@repo/firebase";
import { Guidelines } from "../../../components/Guidelines";
import { Overview } from "../../../components/Overview";
import { Competitions } from "../../../components/Competitions";
import { Contacts } from "../../../components/Contacts";
interface inter {
	content: string;
	type: string;
}

interface Competition{
	name: string;
	desc: string;
}

interface EventData {
	Id: string;
	desc: inter;
	flag: inter;
	title: inter;
}

const TABS = ["Overview", "Guidelines", "Competitions", "Contacts"];

export function EventDetails({ eventData, slug }: { eventData: doc, slug: string }) {
	const [activeTab, setActiveTab] = useState(TABS[0]);
	const [openCompetition, setOpenCompetition] = useState<string | null>(null);

	const details = eventData.data as EventData[];

	const overview = details
		.map((detail) => {
			if (detail.flag.content === "overview") {
				return detail.desc.content;
			}
		})
		.join("\n");

	const title = details
		.map((detail) => {
			if (detail.flag.content === "heading") {
				return detail.title.content;
			}
		})
		.join("\n");

	const competitions: Competition[] = [];
	details.forEach((detail) => {
		if (detail.flag.content === "comp") {
			competitions.push({
				name: detail.title.content,
				desc: detail.desc.content,
			});
		}
	});

	const contacts = details
		.map((detail) => {
			if (detail.flag.content === "contacts") {
				return detail.desc.content;
			}
		})
		.join("\n");

	const handleCompetitionClick = (competitionName: string) => {
		setActiveTab(TABS[2]);
		setOpenCompetition(competitionName);
	};

	const visibleTabs = slug === "MnM" ? TABS.filter(tab => tab !== "Competitions") : TABS;

	return (
		<div className="max-w-4xl mx-auto">
			<div className="glass mx-auto mb-10 flex w-fit max-w-full justify-center gap-1 overflow-x-auto rounded-full p-1.5">
				{visibleTabs.map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`shrink-0 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
							activeTab === tab ?
								"text-[#0a0612]"
							:	"text-foreground/60 hover:text-foreground"
						}`}
						style={activeTab === tab ? { background: "var(--lime)" } : undefined}
					>
						{tab}
					</button>
				))}
			</div>

			<div className="prose prose-invert prose-lg max-w-none text-foreground/80">
				{activeTab === "Overview" && (
					<StaggeredFadeIn>
						<Overview content={overview} title={title} handleCompetitionClick={handleCompetitionClick} competitions={competitions} slug={slug} />
					</StaggeredFadeIn>
				)}

				{activeTab === "Guidelines" && (
					<StaggeredFadeIn>
						<Guidelines />
					</StaggeredFadeIn>
				)}

				{activeTab === "Competitions" && (
					<StaggeredFadeIn>
						<Competitions competitions={competitions} openCompetition={openCompetition} setOpenCompetition={setOpenCompetition} />
					</StaggeredFadeIn>
				)}

				{activeTab === "Contacts" && (
					<StaggeredFadeIn>
						<Contacts contacts={contacts} />
					</StaggeredFadeIn>
				)}
			</div>
		</div>
	);
}
