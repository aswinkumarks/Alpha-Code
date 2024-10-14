export interface QuestionPanelProps {
	question: any;
}

export interface NavBarProps {
	onNext: () => void;
	onPrev: () => void;
	onRunBtnClick: () => void;
	disableNextBtn: boolean;
	disablePrevBtn: boolean;
}
