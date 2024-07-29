import { graphQLClient } from '#features/anilist_client.js';
import { gql } from '@apollo/client/core/core.cjs';

const fetchAnilistData = (
	userSelection: UserSelectionAniList,
): Promise<AniListAPIResponse> => {
	return new Promise(async (resolve) => {
		const AniListAPIResponse: AniListAPIResponse = {
			success: false,
			data: {}
		};

		//Parse user selection here
		const query = gql`
			query myQuery(
				$search: String!
				$includeGenres: Boolean!
				$includeAverageScore: Boolean!
				$includePopularity: Boolean!
				$includeDescription: Boolean!
				$includeMainCharacters: Boolean!
				$includeSupportingCharacters: Boolean!
			) {
				Media(search: $search) {
					genres @include(if: $includeGenres)
					averageScore @include(if: $includeAverageScore)
					popularity @include(if: $includePopularity)
					description @include(if: $includeDescription)
					mainCharacters: characters(role: MAIN)
						@include(if: $includeMainCharacters) {
						nodes {
							name {
								full
							}
						}
					}
					supportingCharacters: characters(role: SUPPORTING)
						@include(if: $includeSupportingCharacters) {
						nodes {
							name {
								full
							}
						}
					}
				}
			}
		`;

		const queryVariables = {
			search: userSelection.animeTitle,
			includeGenres: userSelection.searchAttributes.genres,
            includeAverageScore: userSelection.searchAttributes.averageScore,
            includePopularity: userSelection.searchAttributes.popularity,
            includeDescription: userSelection.searchAttributes.description,
            includeMainCharacters: userSelection.searchAttributes.mainCharacters,
			includeSupportingCharacters: userSelection.searchAttributes.supportingCharacters,
		};

		// Execute the GraphQL query using the Apollo Client
		graphQLClient
			.query({
				query: query, // The query defined above
				variables: queryVariables,
			})
			.then((result) => {
				AniListAPIResponse.data = result.data.Media
				AniListAPIResponse.success = true;
				resolve(AniListAPIResponse);
			})
			.catch((error) => {
				//Error with connecting with backend, process error types later
				resolve(AniListAPIResponse);
			});
	});
};

export default fetchAnilistData;
