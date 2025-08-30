import { FC, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { HamburgerButton } from "./HamburgerButton";
import { Overlay } from "./Overlay";
import { ShareButton } from "./ShareButton";

export const Navbar: FC = () => {
	const pageYOffset = useRef(window.pageYOffset);
	const [className, setClassName] = useState("top-0");
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();

	useEffect(() => {
		function cb() {
			const currentPageYOffset = window.pageYOffset;
			if (currentPageYOffset > 200) {
				if (pageYOffset.current > currentPageYOffset) {
					setClassName("top-0");
				} else {
					setClassName("-top-14");
					setIsMenuOpen(false); // Close menu when navbar hides
				}
			}
			pageYOffset.current = currentPageYOffset;
		}
		window.addEventListener("scroll", cb);
		return () => window.removeEventListener("scroll", cb);
	}, []);

	// Close menu when route changes
	useEffect(() => {
		setIsMenuOpen(false);
	}, [location.pathname]);

	const navItems = [
		{ to: "/", label: "Sākums" },
		{ to: "/new", label: "Jauna spēle" },
		{ to: "/history", label: "Vēsture" },
	];

	return (
		<>
			<nav
				className={`fixed z-20 h-14 w-full border-b border-white/10 bg-gradient-to-r from-emerald-600/90 via-emerald-700/90 to-teal-700/90 shadow-lg transition-[top] ${className}`}
			>
				<div className="flex h-full items-center justify-between px-4">
					<Link
						to="/"
						className="text-lg font-bold text-white transition-colors hover:text-emerald-100"
					>
						Zolītes punktu tabula
					</Link>
					<HamburgerButton
						isOpen={isMenuOpen}
						onClick={() => setIsMenuOpen((prev) => !prev)}
					/>
				</div>
			</nav>
			<Overlay
				onClick={() => setIsMenuOpen(false)}
				visible={isMenuOpen}
			/>

			{/* Mobile Menu */}
			<div
				className={`fixed top-14 right-0 z-15 w-64 transform border-l border-white/10 bg-gradient-to-br from-emerald-600/95 via-emerald-700/95 to-teal-700/95 shadow-xl transition-transform duration-300 ${
					isMenuOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="py-2">
					{navItems.map((item) => (
						<Link
							key={item.to}
							to={item.to}
							className={`block px-6 py-3 text-white transition-all duration-200 hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10`}
							activeProps={{
								className:
									"border-r-2 border-emerald-200 bg-gradient-to-r from-white/25 to-white/15 font-semibold",
							}}
						>
							{item.label}
						</Link>
					))}
					<ShareButton />

					<hr className="mx-6 my-2 border-white/20" />

					<a
						href="https://github.com/leqwasd/zolite"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-3 px-6 py-3 text-white transition-all duration-200 hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10"
					>
						<svg
							className="h-5 w-5"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								fillRule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								clipRule="evenodd"
							/>
						</svg>
						<span>GitHub</span>
						<svg
							className="ml-auto h-4 w-4 opacity-60"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</a>
				</div>
			</div>
		</>
	);
};
