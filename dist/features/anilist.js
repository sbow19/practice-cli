import timeout from '../helper/timeout.js';
import { removeLines, clearScreen } from '../helper/stdout_funcs.js';
import { anilistTitle } from '../helper/fonts.js';
import { anilistAPIHeaderBox, mainDescriptionBox } from '../helper/boxes.js';
import defaultCLISpinner from '../helper/spinner.js';
import { input, checkbox, confirm } from '@inquirer/prompts';
import fetchAnilistData from '#api/anilist_api.js';
const processUserSelection = (selections) => {
    const userSelection = {
        animeTitle: "",
        searchAttributes: {
            genre: false,
            "supporting character": false,
            "main_character": false,
            popularity: false,
            averageScore: false,
            description: false
        },
        areDetailsCorrect: false
    };
    const attributesArray = Object.keys(userSelection.searchAttributes);
    for (let selectedAttribute of selections) {
        attributesArray.forEach(attribute => {
            if (selectedAttribute === attribute) {
                userSelection.searchAttributes[selectedAttribute] = true;
            }
        });
    }
    return userSelection;
};
const getUserSelection = () => {
    return new Promise(async (resolve) => {
        let isAnimeTitleSearchActive = true;
        while (isAnimeTitleSearchActive) {
            const userAnimeInput = await input({
                message: "What anime would you like to know about: "
            });
            const userSelection = await confirm({
                message: `Is ${userAnimeInput} correct?`
            });
            if (!userSelection) {
                await removeLines(3);
                continue;
            }
            await removeLines(3);
            const attributes = await checkbox({
                message: "What information do you want to return about this anime?",
                choices: [
                    {
                        name: "Genre",
                        value: "genres"
                    },
                    {
                        name: "Main Characters",
                        value: "main characters"
                    },
                    {
                        name: "Supporting Characters",
                        value: "supporting characters"
                    },
                    {
                        name: "Description",
                        value: "description"
                    },
                    {
                        name: "User Score",
                        value: "averageScore"
                    },
                    {
                        name: "Popularity",
                        value: "popularity"
                    }
                ]
            });
            const attributesSelection = processUserSelection(attributes);
            resolve(attributesSelection);
            isAnimeTitleSearchActive = false;
        }
        ;
    });
};
const aniListApp = () => {
    return new Promise(async (resolve, reject) => {
        let isAnilistActive = true;
        const mySpinner = defaultCLISpinner("Fetching anime data...");
        const anilistTitleText = anilistTitle('AniList');
        const anilistTitleGraphic = anilistAPIHeaderBox(anilistTitleText);
        clearScreen([
            anilistTitleGraphic,
            mainDescriptionBox('Search information about your favourite anime!')
        ]);
        await timeout(1000);
        while (isAnilistActive) {
            isAnilistActive = await confirm({
                message: 'Do you want to continue?',
                default: true,
            });
            await removeLines(2);
            if (isAnilistActive) {
                const attributesSelection = await getUserSelection();
                mySpinner.start();
                await fetchAnilistData(attributesSelection);
            }
            ;
        }
        resolve();
    });
};
export default aniListApp;
//# sourceMappingURL=anilist.js.map