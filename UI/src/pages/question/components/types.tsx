export interface QuestionPanelProps {
	question: any;
}

export interface NavBarProps {
	onNext: () => void;
	onPrev: () => void;
	disableNextBtn: boolean;
	disablePrevBtn: boolean;
}
