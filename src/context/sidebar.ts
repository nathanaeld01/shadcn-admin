import { create } from "zustand";

import { SIDEBAR_COOKIE_MAX_AGE, SIDEBAR_COOKIE_NAME } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarContextType } from "@/types/sidebar";

type Props = { defaultOpen?: boolean };
type SetType = (open: boolean) => { isMobileOpen?: boolean; isOpen?: boolean; state: "collapsed" | "expanded" };

export const useSidebarStore = ({ defaultOpen }: Props) => {
	const initialState = defaultOpen ?? true;
	const isMobile = useIsMobile();

	const setSidebarCookie = (value: boolean) => {
		if (typeof window !== "undefined") {
			document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}; SameSite=None; Secure`;
		}
	};

	return create<SidebarContextType>((set) => {
		const setState: SetType = (open) => {
			const state = open ? "expanded" : "collapsed";

			if (isMobile) return { isOpenMobile: open, state };

			setSidebarCookie(open);
			return { isOpen: open, state };
		};

		return {
			isMobile,
			isOpen: initialState,
			isOpenMobile: false,
			state: initialState ? "expanded" : "collapsed",
			close: () => set(() => setState(false)),
			open: () => set(() => setState(true)),
			toggle: () => set((state) => setState(isMobile ? !state.isOpenMobile : !state.isOpen)),
		};
	});
};
