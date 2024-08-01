export const AniListTable = (aniListData) => {
    let table = '';
    const aniListDataKeys = Object.keys(aniListData);
    for (let key of aniListDataKeys) {
        if (key === '__typename') {
            continue;
        }
        else if (key === 'supportingCharacters') {
            let supportingCharacterString = "Supporting Characters: \n";
            const supportingCharactersList = aniListData[key].nodes;
            supportingCharactersList.forEach((character) => {
                supportingCharacterString += `\t\t - ${character.name.full} \n`;
            });
            table += `${supportingCharacterString} \n`;
        }
        else if (key === 'mainCharacters') {
            let mainCharacterString = "Main Characters: \n";
            const mainCharactersList = aniListData[key].nodes;
            mainCharactersList.forEach((character) => {
                mainCharacterString += `\t\t - ${character.name.full} \n`;
            });
            table += `${mainCharacterString} \n`;
        }
        else {
            table += `${key}: ${aniListData[key]} \n`;
        }
        ;
    }
    return table;
};
//# sourceMappingURL=tables.js.map