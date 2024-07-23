import { Spinner, createSpinner } from 'nanospinner';

const defaultCLISpinner = (inputText: string): Spinner => {
	const spinner = createSpinner(inputText, {
		interval: 25,
		color: 'red',
		stream: process.stderr,
	});

	return spinner;
};

export default defaultCLISpinner;
