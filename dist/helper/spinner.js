import { createSpinner } from 'nanospinner';
const defaultCLISpinner = (inputText) => {
    const spinner = createSpinner(inputText, {
        interval: 25,
        color: 'red',
        stream: process.stderr,
    });
    return spinner;
};
export default defaultCLISpinner;
//# sourceMappingURL=spinner.js.map