"use client";
import { ReactNode } from "react";
import { useStore } from "@repo/store";
import { InitialState } from "@repo/firebase";
import SessionLoader from "./SessionLoader";
import Header from "./Header";
import Footer from "./Footer";
import { CharGrid } from "./fx/CharGrid";
import { Atmosphere } from "./fx/Atmosphere";
import { Preloader } from "./Preloader";

export function ClientComponent({ children }: { children: ReactNode }) {
	const { initialAnimation, loading } = useStore();
	const showSessionLoader = loading && !initialAnimation;

	return (
		<>
			<InitialState document="eventsUsers2025" />
			{/* opening title card — manages its own lifecycle, renders null once done */}
			<Preloader />
			{showSessionLoader && <SessionLoader />}
			<div className="fixed inset-0 pointer-events-none">
				<Atmosphere />
				<CharGrid />
			</div>
			<div className="grain-overlay" />
			<div className="relative z-10">
				<Header />
				<main>{children}</main>
				<Footer />
			</div>
		</>
	);
}
