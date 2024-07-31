import timeout from '#helper/timeout.js';
import { removeLines, clearScreen } from '../helper/stdout_funcs.js';
import { anilistTitle } from '#helper/fonts.js';
import { anilistAPIHeaderBox, mainDescriptionBox } from '../helper/boxes.js';
import defaultCLISpinner from '#helper/spinner.js';
import { input, checkbox, confirm } from '@inquirer/prompts';
import fetchAnilistData from '#api/anilist_api.js';
import { AniListTable } from '#helper/tables.js';
const processUserSelection = (selections) => {
    const userSelection = {
        animeTitle: '',
        searchAttributes: {
            genres: false,
            supportingCharacters: false,
            mainCharacters: false,
            popularity: false,
            averageScore: false,
            description: false,
        },
        areDetailsCorrect: false,
    };
    const attributesArray = Object.keys(userSelection.searchAttributes);
    for (let selectedAttribute of selections) {
        attributesArray.forEach((attribute) => {
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
                message: 'What anime would you like to know about: ',
            });
            const userSelection = await confirm({
                message: `Is ${userAnimeInput} correct?`,
            });
            if (!userSelection) {
                await removeLines(3);
                continue;
            }
            await removeLines(3);
            const attributes = await checkbox({
                message: 'What information do you want to return about this anime?',
                choices: [
                    {
                        name: 'Genre',
                        value: 'genres',
                    },
                    {
                        name: 'Main Characters',
                        value: 'mainCharacters',
                    },
                    {
                        name: 'Supporting Characters',
                        value: 'supportingCharacters',
                    },
                    {
                        name: 'Description',
                        value: 'description',
                    },
                    {
                        name: 'User Score',
                        value: 'averageScore',
                    },
                    {
                        name: 'Popularity',
                        value: 'popularity',
                    },
                ],
            });
            const attributesSelection = processUserSelection(attributes);
            attributesSelection.animeTitle = userAnimeInput;
            resolve(attributesSelection);
            isAnimeTitleSearchActive = false;
        }
    });
};
const aniListApp = async () => {
    let isAnilistActive = true;
    const mySpinner = defaultCLISpinner('Fetching anime data...');
    const anilistTitleText = anilistTitle('AniList');
    const anilistTitleGraphic = anilistAPIHeaderBox(anilistTitleText);
    clearScreen([
        anilistTitleGraphic,
        mainDescriptionBox('Search information about your favourite anime!'),
    ]);
    await timeout(1000);
    isAnilistActive = await confirm({
        message: 'Do you want to continue?',
        default: true,
    });
    await removeLines(2);
    while (isAnilistActive) {
        if (isAnilistActive) {
            const attributesSelection = await getUserSelection();
            mySpinner.start();
            const aniListAPIResponse = await fetchAnilistData(attributesSelection);
            mySpinner.stop();
            await removeLines(1);
            if (!aniListAPIResponse.success) {
                console.error("An error occurred while fetching data from AniList API.");
                await timeout(2000);
                await removeLines(3);
                isAnilistActive = await confirm({
                    message: 'Do you want to continue?',
                    default: true,
                });
                await removeLines(3);
                continue;
            }
            console.log(AniListTable(aniListAPIResponse.data));
            await timeout(1500);
            isAnilistActive = await confirm({
                message: 'Do you want to continue?',
                default: true,
            });
            clearScreen([
                anilistTitleGraphic,
                mainDescriptionBox('Search information about your favourite anime!'),
            ]);
        }
    }
};
export default aniListApp;
//# sourceMappingURL=anilist.js.map