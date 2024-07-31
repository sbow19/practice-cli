import { hangmanTitle } from "#helper/fonts.js";
import { mainDescriptionBox, hangmanHeaderBox } from "#helper/boxes.js";
import { clearScreen } from "#helper/stdout_funcs.js";
import timeout from "#helper/timeout.js";
import { confirm, select } from '@inquirer/prompts';
import { removeLines } from "#helper/stdout_funcs.js";
import onePlayer from "#features/hangman_one.js";
import twoPlayer from "#features/hangman_two.js";
const hangmanApp = async () => {
    let isHangmanActive = true;
    const hangmanTitleText = hangmanTitle('Hangman');
    const hangmanTitleGraphic = hangmanHeaderBox(hangmanTitleText);
    clearScreen([
        hangmanTitleGraphic,
        mainDescriptionBox("Let's play hangman!"),
    ]);
    await timeout(1000);
    isHangmanActive = await confirm({
        message: 'Do you want to continue?',
        default: true,
    });
    await removeLines(2);
    while (isHangmanActive) {
        const playerMode = await select({
            message: 'Do you want to play one player or two player?',
            choices: [
                {
                    name: "One Player",
                    value: "one"
                },
                {
                    name: "Two Player",
                    value: "two"
                }
            ],
        });
        await removeLines(2);
        playerMode === "one" ? await onePlayer() : await twoPlayer();
        clearScreen([
            hangmanTitleGraphic,
            mainDescriptionBox("Let's play hangman!"),
        ]);
        isHangmanActive = await confirm({
            message: 'Do you want to continue?',
            default: true,
        });
        await removeLines(2);
    }
};
export default hangmanApp;
//# sourceMappingURL=hangman.js.map