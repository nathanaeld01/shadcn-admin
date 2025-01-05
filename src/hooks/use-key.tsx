import { useEffect } from "react";

type KeyComboHandler = (event: KeyboardEvent) => void;

interface UseKeyOptions {
	enabled?: boolean;
	onKeyDown?: KeyComboHandler;
	onKeyUp?: KeyComboHandler;
	preventDefault?: boolean;
	stopPropagation?: boolean;
}

export const useKey = (keyCombo: string, options: UseKeyOptions = {}) => {
	const { enabled = true, onKeyDown, onKeyUp, preventDefault = false, stopPropagation = false } = options;

	useEffect(() => {
		if (!enabled) return;

		const parseKeyCombo = (combo: string) => {
			const parts = combo
				.toLowerCase()
				.split("+")
				.map((p) => p.trim());
			return {
				key: parts.find((p) => !["alt", "ctrl", "meta", "shift"].includes(p)) || "",
				modifiers: {
					alt: parts.includes("alt"),
					ctrl: parts.includes("ctrl"),
					meta: parts.includes("meta"),
					shift: parts.includes("shift"),
				},
			};
		};

		const { key, modifiers } = parseKeyCombo(keyCombo);

		const createHandler = (handler: KeyComboHandler | undefined) => (event: KeyboardEvent) => {
			const matchesKey = !key || event.key.toLowerCase() === key;
			const matchesModifiers =
				(!modifiers.ctrl || event.ctrlKey) &&
				(!modifiers.meta || event.metaKey) &&
				(!modifiers.shift || event.shiftKey) &&
				(!modifiers.alt || event.altKey);

			if (matchesKey && matchesModifiers) {
				if (preventDefault) event.preventDefault();
				if (stopPropagation) event.stopPropagation();
				handler?.(event);
			}
		};

		const keyDownHandler = createHandler(onKeyDown);
		const keyUpHandler = createHandler(onKeyUp);

		if (onKeyDown) window.addEventListener("keydown", keyDownHandler);
		if (onKeyUp) window.addEventListener("keyup", keyUpHandler);

		return () => {
			if (onKeyDown) window.removeEventListener("keydown", keyDownHandler);
			if (onKeyUp) window.removeEventListener("keyup", keyUpHandler);
		};
	}, [keyCombo, onKeyDown, onKeyUp, preventDefault, stopPropagation, enabled]);
};
