/* eslint-disable perfectionist/sort-objects */
import animate from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";

import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	corePlugins: {
		container: false,
	},
	plugins: [
		animate,
		plugin(({ addUtilities }) => {
			addUtilities({
				".container": {
					"@apply w-full mx-auto px-4 sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] xxl:max-w-[1320px]":
						"",
				},
			});
		}),
	],
	theme: {
		screens: {
			lg: "992px",
			md: "768px",
			sm: "576px",
			xl: "1200px",
			xxl: "1400px",
		},
		extend: {
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			colors: {
				background: "hsl(var(--background))",
				border: "hsl(var(--border))",
				foreground: "hsl(var(--foreground))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				sidebar: {
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
			gridTemplateColumns: {
				iconsidebar: "calc(var(--sidebar-width) + 2rem) 1fr",
				nosidebar: "0 1fr",
				sidebar: "auto 1fr",
			},
			spacing: {
				15: "3.75rem",
			},
			width: {
				iconsidebar: "calc(var(--sidebar-icon-width) + 2rem)",
				sidebar: "var(--sidebar-width)",
			},
		},
	},
} satisfies Config;
