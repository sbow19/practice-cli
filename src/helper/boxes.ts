import boxen from 'boxen';
import chalk from 'chalk';

export const mainDescriptionBox = (inputText: string, title = '') => {
	const mainText = chalk.red(inputText);

	return boxen(mainText, {
		padding: 1,
		margin: {
			bottom: 1,
		},
		title: title,
		titleAlignment: 'center',
		borderStyle: {
			left: '#',
			right: '#',
			top: '-',
			bottom: '-',
			topLeft: '#',
			topRight: '#',
			bottomLeft: '#',
			bottomRight: '#',
		},
		align: 'center',
		borderColor: 'white',
		backgroundColor: 'black',
	});
};

export const anilistAPIHeaderBox = (inputText: string) => {
	return boxen(inputText, {
		padding: 1,
		margin: {
			bottom: 1,
		},
		title: 'AniList API',
		titleAlignment: 'left',
		borderStyle: 'round',
		align: 'left',
		borderColor: 'red',
		backgroundColor: 'black',
	});
};

export const hangmanHeaderBox = (inputText: string) => {
	return boxen(inputText, {
		padding: 1,
		margin: {
			bottom: 1,
		},
		titleAlignment: 'left',
		borderStyle: 'round',
		align: 'left',
		borderColor: 'red',
		backgroundColor: 'black',
	});
};

export const weatherBox = (inputText: string) => {
	return boxen(inputText, {
		padding: 1,
		margin: {
			bottom: 1,
		},
		title: 'Weather',
		titleAlignment: 'left',
		borderStyle: 'round',
		align: 'left',
		borderColor: 'white',
		backgroundColor: 'black',
	});
};

export const settingsHeaderBox = (inputText: string) => {
	return boxen(inputText, {
		padding: 1,
		margin: {
			bottom: 1,
		},
		title: 'Settings',
		titleAlignment: 'left',
		borderStyle: 'doubleSingle',
		align: 'left',
		borderColor: 'white',
		backgroundColor: 'black',
	});
};

export const settingsValuesBox = (configSettings: ConfigSettings | null) => {
	const configSetingsString = `Name: ${configSettings?.name}\n
    Country: ${configSettings?.country}\n"
    City: ${configSettings?.city.name}\n`;

	return boxen(configSetingsString, {
		padding: 1,
		margin: {
			bottom: 1,
		},
		title: 'Settings',
		titleAlignment: 'left',
		borderStyle: 'classic',
		align: 'center',
		borderColor: 'white',
		backgroundColor: 'black',
	});
};
