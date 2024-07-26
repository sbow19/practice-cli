import readline from 'readline';
import { figletTitle } from '#helper/fonts.js';
export const removeLines = (noOfLines = 0) => {
    return new Promise((resolve, reject) => {
        if (noOfLines === 0) {
            return;
        }
        else {
            for (let i = noOfLines; i > 0; i--) {
                readline.cursorTo(process.stdout, 0);
                readline.clearLine(process.stdout, 1);
                if (i - 1 > 0) {
                    readline.moveCursor(process.stdout, 0, -1);
                }
            }
        }
        resolve(true);
    });
};
export const clearScreen = (additionalContent = []) => {
    process.stdout.write('\x1Bc');
    console.log(figletTitle('PRACTICE CLI'));
    if (additionalContent.length > 0) {
        for (let content of additionalContent) {
            console.log(content);
        }
    }
};
//# sourceMappingURL=stdout_funcs.js.map