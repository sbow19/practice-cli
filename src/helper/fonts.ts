import figlet from 'figlet';
import chalk from 'chalk';
import boxen from 'boxen';

//ASCII DEFAULT STYLES
export const figletTitle = (inputText: string) => {
	const ASCII = figlet.textSync(inputText, {
		font: 'Slant',
		horizontalLayout: 'controlled smushing',
		verticalLayout: 'default',
		width: 100,
		whitespaceBreak: true,
	});

	const ASCIIColor = chalk.red(ASCII);

	const title = boxen(ASCIIColor, {
		padding: 1,
		margin: 1,
		borderStyle: 'none',
	});

	return title;
};

export const anilistTitle = (inputText: string) =>{
	const ASCII = figlet.textSync(inputText, {
		font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 50,
        whitespaceBreak: true,
	});

	const ASCIIColor = chalk.red(ASCII);

	return ASCIIColor;
}
