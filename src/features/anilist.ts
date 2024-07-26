import { client } from './anilist_client.js';
import { gql } from '@apollo/client/core';
import timeout from '../helper/timeout.js';
import { removeLines, clearScreen } from '../helper/stdout_funcs.js';
import { anilistTitle } from '../helper/fonts.js';
import { anilistAPIHeaderBox, mainDescriptionBox } from '../helper/boxes.js';
import defaultCLISpinner from '../helper/spinner.js';
import { input, checkbox, confirm } from '@inquirer/prompts';
import fetchAnilistData from '#api/anilist_api.js';

const processUserSelection = (selections: string[]): UserSelectionAniList =>{
    const userSelection: UserSelectionAniList = {
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

    for(let selectedAttribute of selections){
        attributesArray.forEach(attribute =>{
            if(selectedAttribute === attribute){
                userSelection.searchAttributes[selectedAttribute] = true;
            }
        })
    }

    return userSelection

}

const getUserSelection = ():Promise<UserSelectionAniList> =>{
    return new Promise(async(resolve)=>{

        //Is anime title select acitve?
        let isAnimeTitleSearchActive = true;

        while(isAnimeTitleSearchActive){

            //Prompt use to add input and select data about the searched anime;
            const userAnimeInput = await input({
                message: "What anime would you like to know about: "
            });

            const userSelection = await confirm({
                message: `Is ${userAnimeInput} correct?`
            });

            if(!userSelection){
                await removeLines(3);
                continue
            }

            await removeLines(3);

            //Prompt user to select attributes to return
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

            //Break out of loop
            isAnimeTitleSearchActive = false;
        }

        ;

    })
}

const aniListApp = (): Promise<void> => {
	return new Promise(async(resolve, reject) => {
		//Main event loop variable
		let isAnilistActive = true;

        //Create spinner to be user in app
        const mySpinner = defaultCLISpinner("Fetching anime data...");
		

		//print title and description boc
		const anilistTitleText = anilistTitle('AniList');
		const anilistTitleGraphic = anilistAPIHeaderBox(anilistTitleText);
        clearScreen([
            anilistTitleGraphic,
            mainDescriptionBox('Search information about your favourite anime!')
        ]);

        await timeout(1000);

		while (isAnilistActive) {
            //Prompt for continue
            isAnilistActive = await confirm({
                message: 'Do you want to continue?',
                default: true,
            });

            await removeLines(2);

            if (isAnilistActive){
                const attributesSelection = await getUserSelection();
                
                mySpinner.start();
                
                //Make API call
                await fetchAnilistData(attributesSelection);

            };
		}

        resolve(); //go back to home page
	});
};

export default aniListApp;
