export type SidebarContextType = {
	isMobile: boolean;
	isOpen: boolean;
	isOpenMobile: boolean;
	state: "collapsed" | "expanded";
	close: () => void;
	open: () => void;
	toggle: () => void;
};
