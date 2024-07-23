import figlet from 'figlet';
import chalk from 'chalk';
import boxen from 'boxen';
export const figletTitle = (inputText) => {
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
//# sourceMappingURL=fonts.js.map