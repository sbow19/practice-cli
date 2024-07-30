import defaultCLISpinner from "#helper/spinner.js";
import { hangmanTitle } from "#helper/fonts.js";
import { mainDescriptionBox, hangmanHeaderBox } from "#helper/boxes.js";
import { clearScreen } from "#helper/stdout_funcs.js";
import timeout from "#helper/timeout.js";
import { confirm } from '@inquirer/prompts';
import { removeLines } from "#helper/stdout_funcs.js";
const hangmanApp = () => {
    return new Promise(async (resolve, reject) => {
        let isHangmanActive = true;
        const mySpinner = defaultCLISpinner('Loading...');
        const anilistTitleText = hangmanTitle('Hangman');
        const anilistTitleGraphic = hangmanHeaderBox(anilistTitleText);
        clearScreen([
            anilistTitleGraphic,
            mainDescriptionBox("Let's play hangman!"),
        ]);
        await timeout(1000);
        isHangmanActive = await confirm({
            message: 'Do you want to continue?',
            default: true,
        });
        await removeLines(2);
        while (isHangmanActive) {
            if (isHangmanActive) {
            }
        }
        resolve();
    });
};
export default hangmanApp;
//# sourceMappingURL=hangman.js.map