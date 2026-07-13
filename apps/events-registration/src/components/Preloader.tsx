"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useStore } from "@repo/store";

/* ----------------------------------------------------------------------------
   Preloader — the opening signature.
   The official Antaragni flame ignites from its base: a bottom-to-top mask
   wipe reveals the mark while an ember glow builds behind it, then a soft
   light passes over the flame (masked to the logo's own shape). Once the
   intro has played AND the page is ready, the stage blurs away and the
   curtain lifts straight into the hero, whose entrance is gated on
   `initialAnimation`. Plays once per session; honors prefers-reduced-motion.
---------------------------------------------------------------------------- */

const SESSION_KEY = "ag-preloader-shown";
const LOGO = "/logo.webp";

export function Preloader() {
	const ref = useRef<HTMLDivElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);
	const [gone, setGone] = useState(false);
	const { setInitialAnimation } = useStore();

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		/* one showing per session */
		if (sessionStorage.getItem(SESSION_KEY)) {
			setInitialAnimation(false);
			setGone(true);
			return;
		}

		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;
		const html = document.documentElement;
		html.style.overflow = "hidden";

		const done = () => {
			sessionStorage.setItem(SESSION_KEY, "1");
			setGone(true);
			html.style.overflow = "";
		};

		const ctx = gsap.context(() => {
			/* hidden tab or reduced motion: no theatrics — dismiss synchronously
			   (rAF is paused in hidden tabs, so tweens would never complete) */
			if (reduced || document.hidden) {
				setInitialAnimation(false);
				gsap.set(el, { autoAlpha: 0 });
				done();
				return;
			}

			/* build the ignition paused; strike the match once the logo has
			   decoded so the wipe never reveals an empty frame */
			const tl = gsap.timeline({ paused: true });
			tl.fromTo(
				".pre-mark",
				{ clipPath: "inset(100% 0% 0% 0%)" },
				{
					clipPath: "inset(0% 0% 0% 0%)",
					duration: 1.0,
					ease: "power2.inOut",
				},
				0.15
			)
				.fromTo(
					".pre-logo",
					{ scale: 1.06, filter: "blur(6px)" },
					{ scale: 1, filter: "blur(0px)", duration: 1.1, ease: "power2.out" },
					0.15
				)
				/* ember glow builds behind the flame as it catches */
				.fromTo(
					".pre-glow",
					{ opacity: 0, scale: 0.85 },
					{ opacity: 0.75, scale: 1, duration: 1.0, ease: "power2.out" },
					0.3
				)
				/* soft light passes over the flame — clipped to the logo shape */
				.fromTo(
					".pre-sheen",
					{ xPercent: -130 },
					{ xPercent: 130, duration: 0.8, ease: "power2.inOut" },
					"-=0.35"
				)
				/* glow settles to a quiet, steady burn */
				.to(".pre-glow", { opacity: 0.45, duration: 0.4, ease: "power1.out" }, "-=0.2");

			const logoReady = imgRef.current
				? imgRef.current.decode().catch(() => {})
				: Promise.resolve();
			logoReady.then(() => tl.play());

			const pageLoaded = new Promise<void>((res) => {
				if (document.readyState === "complete") res();
				else window.addEventListener("load", () => res(), { once: true });
			});
			const introPlayed = new Promise<void>((res) => {
				tl.eventCallback("onComplete", () => res());
			});
			const minHold = new Promise<void>((res) => setTimeout(res, 1600));

			/* failsafe: if the tab is backgrounded mid-intro, rAF pauses and the
			   timeline freezes — never strand the user behind the curtain */
			const cap = new Promise<"cap">((res) =>
				setTimeout(() => res("cap"), 4500)
			);

			Promise.race([
				Promise.all([pageLoaded, introPlayed, minHold]).then(() => "ok" as const),
				cap,
			]).then((how) => {
				if (how === "cap" || document.hidden) {
					tl.kill();
					setInitialAnimation(false);
					gsap.set(el, { autoAlpha: 0 });
					done();
					return;
				}
				gsap
					.timeline({ onComplete: done })
					.to(".pre-stage", {
						scale: 0.94,
						filter: "blur(10px)",
						opacity: 0,
						duration: 0.5,
						ease: "power2.in",
						/* release the hero entrance as the curtain starts to lift,
						   so the reveal reads as one continuous motion */
						onStart: () => setInitialAnimation(false),
					})
					.to(el, { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, "-=0.1");
			});
		}, el);

		return () => {
			ctx.revert();
			html.style.overflow = "";
		};
	}, [setInitialAnimation]);

	if (gone) return null;

	return (
		<div
			ref={ref}
			className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
			style={{ background: "#131114" }}
			aria-hidden
		>
			{/* faint ember light pooling at the floor of the stage */}
			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
				style={{
					background:
						"radial-gradient(70% 90% at 50% 100%, rgba(239,78,35,0.07), transparent 70%)",
				}}
			/>

			<div className="pre-stage relative flex items-center justify-center">
				{/* ember glow building behind the flame */}
				<div
					className="pre-glow pointer-events-none absolute opacity-0"
					style={{
						width: "min(66vw, 460px)",
						height: "min(66vw, 460px)",
						background:
							"radial-gradient(circle, rgba(239,78,35,0.26) 0%, rgba(126,42,28,0.12) 40%, transparent 74%)",
						filter: "blur(26px)",
					}}
				/>

				{/* the mark — ignites from the base upward */}
				<div className="pre-mark relative" style={{ clipPath: "inset(100% 0% 0% 0%)" }}>
					<img
						ref={imgRef}
						src={LOGO}
						alt=""
						width={503}
						height={752}
						fetchPriority="high"
						decoding="async"
						draggable={false}
						className="pre-logo relative select-none"
						style={{
							height: "min(38vh, 330px)",
							width: "auto",
							filter: "blur(6px)",
						}}
					/>
					{/* soft light sweep, masked to the flame itself */}
					<div
						className="pointer-events-none absolute inset-0 overflow-hidden"
						style={{
							WebkitMaskImage: `url(${LOGO})`,
							maskImage: `url(${LOGO})`,
							WebkitMaskRepeat: "no-repeat",
							maskRepeat: "no-repeat",
							WebkitMaskSize: "contain",
							maskSize: "contain",
							WebkitMaskPosition: "center",
							maskPosition: "center",
						}}
					>
						<div
							className="pre-sheen absolute inset-0"
							style={{
								background:
									"linear-gradient(105deg, transparent 34%, rgba(243,237,226,0.5) 50%, transparent 66%)",
								transform: "skewX(-10deg)",
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
