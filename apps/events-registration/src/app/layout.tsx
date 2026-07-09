import type { Metadata } from "next";
import { Unbounded, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@repo/ui/lenisProvider";
import { ClientComponent } from "../components/clientComponent";
import { Cursor } from "../components/fx/Cursor";
import { Toaster } from "react-hot-toast";

/* Display face — mapped onto the shared --font-rakkas slot so every
   font-title usage across shared packages picks it up. */
const unbounded = Unbounded({
	subsets: ["latin"],
	weight: ["400", "500", "700", "900"],
	variable: "--font-rakkas",
});

/* Body face — mapped onto the shared --font-inter slot. */
const grotesk = Space_Grotesk({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Antaragni '26 — Events & Roadtrips | IIT Kanpur",
	description:
		"The 61st edition of Antaragni, the annual cultural festival of IIT Kanpur. Compete, perform, belong.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${unbounded.variable} ${grotesk.variable} antialiased`}>
				<Cursor />
				<Toaster
					toastOptions={{
						style: {
							background: "rgba(20, 12, 34, 0.92)",
							color: "#f4f1fa",
							border: "1px solid rgba(255,255,255,0.12)",
							backdropFilter: "blur(12px)",
						},
					}}
				/>
				<LenisProvider>
					<ClientComponent>{children}</ClientComponent>
				</LenisProvider>
			</body>
		</html>
	);
}
