import readline from "readline";
export const removeLines = (noOfLines = 0) => {
    return new Promise((resolve, reject) => {
        if (noOfLines === 0) {
            return;
        }
        else {
            for (let i = 0; i < noOfLines; i++) {
                readline.cursorTo(process.stdout, 0);
                readline.clearLine(process.stdout, 0);
                readline.moveCursor(process.stdout, 0, -1);
            }
        }
        resolve(true);
    });
};
//# sourceMappingURL=stdout_funcs.js.map