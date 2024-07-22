#!/usr/bin/env node
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

console.log(chalk.red('Hello world!'));

console.log(chalk.blue('Watch this world!'));

console.log(chalk.green('Be the best!'));

//Creating colour templates
const log = console.log;
const name = 'Sam';

const error = chalk.bold.red;
const warning = chalk.italic.underline.rgb(255, 165, 0);
const greeting = chalk.bold.bgGray.green(`Hello ${name}`);

log(error('This is an error!'));
log(warning('This is a warning!'));
log(greeting);

//Animations with Chalk Animation
let str = 'Loading.';
let stringModCount = 0;

const pulse = chalkAnimation.pulse(str, 1);

const intervalId = setInterval(() => {
	if (stringModCount >= 3) {
		stringModCount = 0;
		pulse.replace(str);
	} else {
		pulse.replace((str += '.'));
		stringModCount++;
	}
}, 1000);

setTimeout(() => {
	clearInterval(intervalId);
	pulse.stop();
	console.clear();
}, 10000);

//CLI Table
import blessed from 'blessed';

const screen = blessed.screen();

const table = blessed.table({
	top: '50%',
	left: 'left',
	width: '80%',
	height: '50%',
	border: {
		type: 'line',
	},
	columns: [
		{ header: 'Name', width: 20 },
		{ header: 'Age', width: 10 },
		{ header: 'City', width: 20 },
	],
	data: [
		['Alice', '30', 'New York'],
		['Bob', '25', 'San Francisco'],
		['Charlie', '35', 'Chicago'],
	],
	style: {
		border: {
			fg: 'cyan',
		},
		header: {
			bg: 'blue',
			fg: 'white',
		},
		cell: {
			fg: 'white',
		},
	},
});

screen.append(table);
screen.render();
