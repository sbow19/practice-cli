import { graphqlClient } from './defaults.js';
const gql = require('@apollo/apollo-client.cjs/');

const fetchAnilistData = (
	userSelection: UserSelectionAniList,
): Promise<void> => {
	return new Promise((resolve, reject) => {
		const client = graphqlClient();

		const query = gql`
			query myQuery {
				Media(search: hello) {
					genres
				}
			}
		`;

		client
			.query({
				query, // The query defined above
			})
			.then((result) => console.log(result.data))
			.catch((error) => console.error(error));
	});
};

export default fetchAnilistData;
