"use client";

import Link from "next/link";
import { Marquee } from "./fx/Marquee";

const Footer = () => {
	return (
		<footer className="relative mt-24 border-t border-white/10">
			{/* Marquee strip */}
			<Marquee duration={24} className="border-b border-white/10 py-5">
				{Array.from({ length: 6 }).map((_, i) => (
					<span
						key={i}
						className="font-title mx-6 flex items-center gap-6 text-2xl font-bold uppercase"
					>
						<span className="text-gradient">Antaragni &rsquo;26</span>
						<span
							className="inline-block h-2 w-2 rounded-full"
							style={{ background: "var(--lime)" }}
						/>
						<span className="text-stroke">IIT Kanpur</span>
						<span
							className="inline-block h-2 w-2 rounded-full"
							style={{ background: "var(--pink)" }}
						/>
					</span>
				))}
			</Marquee>

			<div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-3">
				<div>
					<p className="font-title text-2xl font-bold">
						ANTARAGNI<span style={{ color: "var(--lime)" }}>&rsquo;26</span>
					</p>
					<p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/60">
						The 61st edition of the annual cultural festival of IIT Kanpur.
						Compete, perform, belong.
					</p>
				</div>

				<div>
					<p className="eyebrow mb-5">Explore</p>
					<ul className="space-y-3 text-sm font-semibold text-foreground/70">
						<li>
							<Link href="/events" className="hover:text-[var(--lime)]">
								Events
							</Link>
						</li>
						<li>
							<Link href="/roadtrips" className="hover:text-[var(--lime)]">
								Roadtrips
							</Link>
						</li>
						<li>
							<a
								href="https://antaragni.in"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-[var(--lime)]"
							>
								Main Website
							</a>
						</li>
						<li>
							<a
								href="https://ca.antaragni.in"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-[var(--lime)]"
							>
								CA Portal
							</a>
						</li>
					</ul>
				</div>

				<div>
					<p className="eyebrow mb-5">Connect</p>
					<ul className="space-y-3 text-sm font-semibold text-foreground/70">
						<li>
							<a
								href="https://www.instagram.com/antaragni.iitkanpur/"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-[var(--pink)]"
							>
								Instagram
							</a>
						</li>
						<li>
							<a
								href="https://www.facebook.com/antaragni.iitk"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-[var(--pink)]"
							>
								Facebook
							</a>
						</li>
						<li>
							<a
								href="https://www.youtube.com/user/antaragniiitkanpur"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-[var(--pink)]"
							>
								YouTube
							</a>
						</li>
						<li>
							<a
								href="mailto:events@antaragni.in"
								className="hover:text-[var(--pink)]"
							>
								events@antaragni.in
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="border-t border-white/10 py-6 text-center text-xs uppercase tracking-[0.3em] text-foreground/40">
				Made with love by the Antaragni Web Team &middot; IIT Kanpur
			</div>
		</footer>
	);
};

export default Footer;
