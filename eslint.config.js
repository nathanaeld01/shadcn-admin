import jslint from "@eslint/js";
import pluginPrefectionist from "eslint-plugin-perfectionist";
import pluginPrettier from "eslint-plugin-prettier/recommended";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default tslint.config(
	jslint.configs.recommended,
	...tslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	pluginPrefectionist.configs["recommended-natural"],
	pluginPrettier,
	{
		files: ["**/*.{js,ts,jsx,tsx}"],
		languageOptions: {
			globals: globals.browser,
		},
		rules: {
			"prettier/prettier": "warn",
			"react/react-in-jsx-scope": "off",
			"perfectionist/sort-imports": [
				"warn",
				{
					internalPattern: ["^@/"],
					groups: [
						"side-effect-style",
						["builtin", "external"],
						["internal", "parent", "sibling", "index"],
						["builtin-type", "external-type", "internal-type", "parent-type", "sibling-type", "index-type"],
					],
				},
			],
			"perfectionist/sort-object-types": [
				"warn",
				{
					groups: ["unknown", "multiline", "method"],
				},
			],
			"perfectionist/sort-objects": [
				"warn",
				{
					groups: ["unknown", "multiline", "method"],
				},
			],
		},
	},
);
