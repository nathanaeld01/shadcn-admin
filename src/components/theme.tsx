"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "./ui/button";

type Props = {
	defaultTheme?: Theme;
	theme?: Theme;
};

type Theme = "dark" | "light";

export const ThemeToggle = ({ defaultTheme, theme: themeProp }: Props) => {
	const [theme, setTheme] = useState(themeProp ?? defaultTheme ?? "light");

	const disableTransitions = () => {
		const style = document.createElement("style");
		style.textContent = `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`;
		document.head.appendChild(style);
		window.getComputedStyle(document.body);

		return style;
	};

	const toggleTheme = useCallback(() => {
		const newTheme = theme === "dark" ? "light" : "dark";
		const style = disableTransitions();

		document.documentElement.classList.toggle("dark", newTheme === "dark");
		document.cookie = `theme=${newTheme}; path=/; max-age=31536000; SameSite=None; Secure`;

		setTheme(newTheme);
		setTimeout(() => style.remove(), 1);
	}, [theme]);

	return (
		<Button className="bg-foreground text-lg text-background [&_svg]:size-5" icon onClick={toggleTheme} size="sm">
			{theme === "dark" ? <SunIcon /> : <MoonIcon />}
		</Button>
	);
};
