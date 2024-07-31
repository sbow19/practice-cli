import { mainDescriptionBox, hangmanHeaderBox } from "#helper/boxes.js";
import { hangmanTitle } from "#helper/fonts.js";
import { clearScreen } from "#helper/stdout_funcs.js";
import timeout from "#helper/timeout.js";
import { confirm } from '@inquirer/prompts';
const randomSentenceApp = async () => {
    let isSentenceActive = true;
    const sentenceTitleText = hangmanTitle('RandomSentenceGenerator');
    const sentenceTitleGraphic = hangmanHeaderBox(sentenceTitleText);
    clearScreen([
        sentenceTitleGraphic,
        mainDescriptionBox("Generate random sentences!"),
    ]);
    await timeout(1000);
    isSentenceActive = await confirm({
        message: 'Do you want to continue?',
        default: true,
    });
};
export default randomSentenceApp;
//# sourceMappingURL=random_sentence.js.map