import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import fetch from 'cross-fetch';
export const client = new ApolloClient({
    link: new HttpLink({ uri: 'https://graphql.anilist.co', fetch }),
    cache: new InMemoryCache()
});
//# sourceMappingURL=anilist_client.js.map