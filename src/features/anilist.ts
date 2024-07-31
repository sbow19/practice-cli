import timeout from '#helper/timeout.js';
import { removeLines, clearScreen } from '../helper/stdout_funcs.js';
import { anilistTitle } from '#helper/fonts.js';
import { anilistAPIHeaderBox, mainDescriptionBox } from '../helper/boxes.js';
import defaultCLISpinner from '#helper/spinner.js';
import { input, checkbox, confirm } from '@inquirer/prompts';
import fetchAnilistData from '#api/anilist_api.js';
import { AniListTable } from '#helper/tables.js';

const processUserSelection = (selections: string[]): UserSelectionAniList => {
	const userSelection: UserSelectionAniList = {
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

const getUserSelection = (): Promise<UserSelectionAniList> => {
	return new Promise(async (resolve) => {
		//Is anime title select acitve?
		let isAnimeTitleSearchActive = true;

		while (isAnimeTitleSearchActive) {
			//Prompt use to add input and select data about the searched anime;
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

			//Prompt user to select attributes to return
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

			//Break out of loop
			isAnimeTitleSearchActive = false;
		}
	});
};


const aniListApp = async(): Promise<void> => {
	
	//Main event loop variable
	let isAnilistActive = true;

	//Create spinner to be user in app
	const mySpinner = defaultCLISpinner('Fetching anime data...');

	//print title and description boc
	const anilistTitleText = anilistTitle('AniList');
	const anilistTitleGraphic = anilistAPIHeaderBox(anilistTitleText);
	clearScreen([
		anilistTitleGraphic,
		mainDescriptionBox('Search information about your favourite anime!'),
	]);

	await timeout(1000);

	//Prompt for continue
	isAnilistActive = await confirm({
		message: 'Do you want to continue?',
		default: true,
	});

	await removeLines(2);

	while (isAnilistActive) {

		if (isAnilistActive) {
			const attributesSelection = await getUserSelection();

			mySpinner.start();

			//Make API call
			const aniListAPIResponse = await fetchAnilistData(attributesSelection);

			mySpinner.stop();
			await removeLines(1)

			if(!aniListAPIResponse.success){
				console.error("An error occurred while fetching data from AniList API.");
				await timeout(2000);
				await removeLines(3);
				//Prompt user to continue with AniApp
				isAnilistActive = await confirm({
					message: 'Do you want to continue?',
					default: true,
				});
				await removeLines(3);
				continue;
			}
			
			//Process aniList data
			console.log(AniListTable(aniListAPIResponse.data));
			await timeout(1500);

			//Prompt user to continue with AniApp
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
