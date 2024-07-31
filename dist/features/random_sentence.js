import { mainDescriptionBox, sentenceHeaderBox } from '#helper/boxes.js';
import { sentenceTitle } from '#helper/fonts.js';
import { clearScreen, removeLines } from '#helper/stdout_funcs.js';
import timeout from '#helper/timeout.js';
import { confirm } from '@inquirer/prompts';
const refreshScreen = async () => {
    const sentenceTitleText = sentenceTitle('Random Sentence Generator');
    const sentenceTitleGraphic = sentenceHeaderBox(sentenceTitleText);
    clearScreen([
        sentenceTitleGraphic,
        mainDescriptionBox('Generate random sentences!'),
    ]);
};
const randomSentenceApp = async () => {
    let isSentenceActive = true;
    await refreshScreen();
    await timeout(1000);
    isSentenceActive = await confirm({
        message: 'Do you want to continue?',
        default: true,
    });
    await removeLines(2);
    while (isSentenceActive) {
        isSentenceActive = await confirm({
            message: 'Do you want to continue?',
            default: true,
        });
    }
};
export default randomSentenceApp;
//# sourceMappingURL=random_sentence.js.map