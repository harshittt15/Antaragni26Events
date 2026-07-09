"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@repo/store";
import { firebaseGoogleSignIn, firebaseLogout } from "@repo/firebase";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/events", label: "Events" },
	{ href: "/roadtrips", label: "Roadtrips" },
];

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
			<header className="fixed left-0 right-0 top-0 z-40 px-4 pt-4">
				<nav
					className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
						scrolled || isMobileMenuOpen ? "glass shadow-2xl" : "bg-transparent"
					}`}
				>
					{/* Wordmark */}
					<Link href="/" className="font-title text-lg font-bold tracking-tight">
						ANTARAGNI<span style={{ color: "var(--lime)" }}>&rsquo;26</span>
					</Link>

					{/* Desktop links */}
					<div className="hidden items-center gap-1 md:!flex">
						{navLinks.map((link) => {
							const isActive = pathname === link.href;
							return (
								<Link
									key={link.href}
									href={link.href}
									className={`rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-widest transition-colors duration-300 ${
										isActive
											? "bg-white/10 text-[var(--lime)]"
											: "text-foreground/70 hover:text-foreground"
									}`}
								>
									{link.label}
								</Link>
							);
						})}
					</div>

					{/* Right — auth */}
					<div className="flex items-center gap-3">
						{user ? (
							<div className="relative hidden md:!block" ref={profileMenuRef}>
								<button
									onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
									className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold"
								>
									<span
										className="h-2 w-2 rounded-full"
										style={{ background: "var(--lime)" }}
									/>
									<span className="max-w-32 truncate">
										{user.user.displayName || "Profile"}
									</span>
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										className={`transition-transform duration-300 ${isProfileMenuOpen ? "rotate-180" : ""}`}
									>
										<path d="m6 9 6 6 6-6" />
									</svg>
								</button>
								{isProfileMenuOpen && (
									<div className="glass absolute right-0 top-full mt-3 w-60 overflow-hidden rounded-2xl shadow-2xl">
										<div className="border-b border-white/10 px-5 py-4">
											<p className="truncate text-sm font-bold">
												{user.user.displayName || "Welcome"}
											</p>
											<p className="truncate text-xs text-foreground/50">
												{user.user.email}
											</p>
										</div>
										<div className="p-2">
											<Link
												href={user.details ? "/dashboard" : "/register"}
												className="block rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-white/10"
											>
												{user.details ? "Dashboard" : "Complete Registration"}
											</Link>
											<button
												onClick={handleSignOut}
												className="block w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-[var(--pink)] hover:bg-white/10"
											>
												Sign out
											</button>
										</div>
									</div>
								)}
							</div>
						) : (
							<button
								onClick={handleSignIn}
								className="btn-lime hidden !px-6 !py-2.5 !text-xs md:!inline-flex"
							>
								Sign in
							</button>
						)}

						{/* Mobile burger */}
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:!hidden"
							aria-label="Menu"
						>
							<span
								className={`h-0.5 w-6 bg-foreground transition-transform duration-300 ${isMobileMenuOpen ? "translate-y-2 rotate-45" : ""}`}
							/>
							<span
								className={`h-0.5 w-6 bg-foreground transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
							/>
							<span
								className={`h-0.5 w-6 bg-foreground transition-transform duration-300 ${isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
							/>
						</button>
					</div>
				</nav>
			</header>

			{/* Mobile overlay */}
			<div
				className={`fixed inset-0 z-30 flex flex-col justify-between bg-background/95 px-8 pb-10 pt-32 backdrop-blur-xl transition-all duration-500 md:!hidden ${
					isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
				}`}
			>
				<div className="flex flex-col gap-2">
					{navLinks.map((link, i) => (
						<Link
							key={link.href}
							href={link.href}
							onClick={() => setIsMobileMenuOpen(false)}
							className={`font-title text-4xl font-bold transition-all duration-500 ${
								isMobileMenuOpen
									? "translate-y-0 opacity-100"
									: "translate-y-6 opacity-0"
							} ${pathname === link.href ? "text-gradient" : ""}`}
							style={{ transitionDelay: `${100 + i * 80}ms` }}
						>
							{link.label}
						</Link>
					))}
					{user && (
						<Link
							href={user.details ? "/dashboard" : "/register"}
							onClick={() => setIsMobileMenuOpen(false)}
							className={`font-title text-4xl font-bold transition-all duration-500 ${
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
				<div>
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
							className="btn-lime w-full"
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
