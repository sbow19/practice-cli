import { graphqlClient } from './defaults.js';
const gql = require('@apollo/apollo-client.cjs/');
const fetchAnilistData = (userSelection) => {
    return new Promise((resolve, reject) => {
        const client = graphqlClient();
        const query = gql `
			query myQuery {
				Media(search: hello) {
					genres
				}
			}
		`;
        client
            .query({
            query,
        })
            .then((result) => console.log(result.data))
            .catch((error) => console.error(error));
    });
};
export default fetchAnilistData;
//# sourceMappingURL=anilist_api.js.map