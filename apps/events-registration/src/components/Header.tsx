"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@repo/store";
import { firebaseGoogleSignIn, firebaseLogout } from "@repo/firebase";
import { Magnetic } from "./fx/Magnetic";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/events", label: "Events" },
	{ href: "/roadtrips", label: "Roadtrips" },
];

/* Festival nav: lime wordmark badge + clean pill link strip + auth. */
const Header = () => {
	const pathname = usePathname();
	const { user, setUser, setLoading } = useStore();
	const [scrolled, setScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
	const profileMenuRef = useRef<HTMLDivElement | null>(null);
	const router = useRouter();

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 40);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		setIsMobileMenuOpen(false);
		setIsProfileMenuOpen(false);

		const handleClickOutside = (event: MouseEvent) => {
			if (
				profileMenuRef.current &&
				!profileMenuRef.current.contains(event.target as Node)
			) {
				setIsProfileMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [pathname]);

	useEffect(() => {
		document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isMobileMenuOpen]);

	const handleSignIn = async () => {
		setLoading(true);
		const result = await firebaseGoogleSignIn();
		if (!result) {
			setLoading(false);
		} else {
			router.push("/register");
		}
	};

	const handleSignOut = async () => {
		await firebaseLogout(setUser);
	};

	return (
		<>
			<header className="fixed left-0 right-0 top-0 z-40 px-4 pt-4 md:px-6">
				<nav className="flex items-start justify-between">
					{/* Wordmark — ivory badge */}
					<Magnetic strength={0.2}>
						<Link
							href="/"
							className={`font-title inline-block px-3.5 py-2 text-base font-black tracking-tight transition-shadow duration-300 ${
								scrolled ? "shadow-lg shadow-black/40" : ""
							}`}
							style={{ background: "var(--paper)", color: "#151112", borderRadius: 12 }}
						>
							ANTARAGNI&rsquo;26
						</Link>
					</Magnetic>

					{/* Desktop — link strip */}
					<div className="hidden items-center md:!flex">
						<div className="flex items-center rounded-full border border-white/10 bg-[var(--ink)] p-1.5 shadow-lg shadow-black/30">
							{navLinks.map((link) => {
								const isActive = pathname === link.href;
								return (
									<Link
										key={link.href}
										href={link.href}
										className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-200 ${
											isActive
												? "bg-[var(--flame)] text-[var(--bone)]"
												: "text-foreground/75 hover:text-[var(--flame)]"
										}`}
									>
										{link.label}
									</Link>
								);
							})}
						</div>

						{/* Auth — backstage pass */}
						<div className="ml-4">
							{user ? (
								<div className="relative" ref={profileMenuRef}>
									<button
										onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
										className="flex items-center gap-2 rounded-full border border-white/10 bg-[var(--ink)] px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-lg shadow-black/30"
									>
										<span
											className="h-2 w-2 rounded-full"
											style={{ background: "var(--flame)" }}
										/>
										<span className="max-w-32 truncate normal-case tracking-normal">
											{user.user.displayName || "Profile"}
										</span>
										<svg
											width="12"
											height="12"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="3"
											strokeLinecap="round"
											className={`transition-transform duration-300 ${isProfileMenuOpen ? "rotate-180" : ""}`}
										>
											<path d="m6 9 6 6 6-6" />
										</svg>
									</button>
									{isProfileMenuOpen && (
										<div
											className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[var(--ink)] shadow-2xl shadow-black/50"
										>
											<div
												className="border-b border-white/10 px-5 py-4"
												style={{ background: "rgba(239,78,35,0.06)" }}
											>
												<p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--flame)]">
													Backstage pass
												</p>
												<p className="mt-1 truncate text-sm font-bold">
													{user.user.displayName || "Welcome"}
												</p>
												<p className="truncate text-xs text-foreground/50">
													{user.user.email}
												</p>
											</div>
											<div className="p-2">
												<Link
													href={user.details ? "/dashboard" : "/register"}
													className="block px-4 py-2.5 text-sm font-bold hover:bg-white/10"
												>
													{user.details ? "Dashboard" : "Complete Registration"}
												</Link>
												<button
													onClick={handleSignOut}
													className="block w-full px-4 py-2.5 text-left text-sm font-bold text-[var(--raspberry)] hover:bg-white/10"
												>
													Sign out
												</button>
											</div>
										</div>
									)}
								</div>
							) : (
								<Magnetic strength={0.25}>
									<button
										onClick={handleSignIn}
										className="btn-primary !px-5 !py-2 !text-xs"
									>
										Sign in
									</button>
								</Magnetic>
							)}
						</div>
					</div>

					{/* Mobile burger */}
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-[var(--ink)] shadow-lg shadow-black/30 md:!hidden"
						aria-label="Menu"
					>
						<span
							className={`h-0.5 w-5 bg-foreground transition-transform duration-300 ${isMobileMenuOpen ? "translate-y-2 rotate-45" : ""}`}
						/>
						<span
							className={`h-0.5 w-5 bg-foreground transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
						/>
						<span
							className={`h-0.5 w-5 bg-foreground transition-transform duration-300 ${isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
						/>
					</button>
				</nav>
			</header>

			{/* Mobile overlay — solid poster wall */}
			<div
				className={`fixed inset-0 z-30 flex flex-col justify-between bg-[#151112] px-8 pb-10 pt-32 transition-all duration-500 md:!hidden ${
					isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
				}`}
			>
				<div className="relative flex flex-col gap-4">
					{navLinks.map((link, i) => (
						<Link
							key={link.href}
							href={link.href}
							onClick={() => setIsMobileMenuOpen(false)}
							className={`font-poster text-6xl uppercase transition-all duration-500 ${
								isMobileMenuOpen
									? "translate-y-0 opacity-100"
									: "translate-y-6 opacity-0"
							} ${pathname === link.href ? "text-[var(--flame)]" : ""}`}
							style={{ transitionDelay: `${100 + i * 80}ms` }}
						>
							{link.label}
						</Link>
					))}
					{user && (
						<Link
							href={user.details ? "/dashboard" : "/register"}
							onClick={() => setIsMobileMenuOpen(false)}
							className={`font-poster text-6xl uppercase transition-all duration-500 ${
								isMobileMenuOpen
									? "translate-y-0 opacity-100"
									: "translate-y-6 opacity-0"
							}`}
							style={{ transitionDelay: "340ms" }}
						>
							{user.details ? "Dashboard" : "Register"}
						</Link>
					)}
				</div>
				<div className="relative">
					{user ? (
						<button onClick={handleSignOut} className="btn-ghost w-full">
							Sign out
						</button>
					) : (
						<button
							onClick={() => {
								setIsMobileMenuOpen(false);
								handleSignIn();
							}}
							className="btn-primary w-full"
						>
							Sign in with Google
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default Header;
