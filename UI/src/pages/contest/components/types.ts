export interface ContestFormInputs {
	contestName: string;
	hostedBy: string;
	desc: string;
	duration: number;
}

export interface ContestFormProps {
	defaultValues?: Partial<ContestFormInputs>;
	editMode?: boolean;
	onSubmit: (data: ContestFormInputs) => void;
}
