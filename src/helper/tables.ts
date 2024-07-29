import readline from 'readline';

export const AniListTable = (aniListData: AniListData) => {
	let table = '';

	const aniListDataKeys = Object.keys(aniListData);

	for (let key of aniListDataKeys) {
		if (key === '__typename') {
			continue;
		} else if (key === 'supportingCharacter') {
            
            let supportingCharacterString = "Supporting Characters: "
			const supportingCharactersList = aniListData[key].nodes;
			supportingCharactersList.forEach((character) => {

                readline.moveCursor(process.stdout, 0, 1);
    
				supportingCharacterString += ` - ${character.name.full} \n`;
			});
            table += `${key}: ${supportingCharacterString} \n`

		} else if (key === 'mainCharacter') {
            let mainCharacterString = "Main Characters: "
			const mainCharactersList = aniListData[key].nodes;
			mainCharactersList.forEach((character) => {
                readline.moveCursor(process.stdout, 0, 1);
				table += ` - ${character.name.full} \n`;
                mainCharacterString += ` - ${character.name.full} \n`;
			});
		} else {

            table += `${key}: ${aniListData[key]} \n`;

        };
		
	}

	return table;
};
