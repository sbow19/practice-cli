import { ApolloClient, InMemoryCache } from "@apollo/client/core/core.cjs";
import { HttpLink } from "@apollo/client/link/http/http.cjs";
import fetch from 'cross-fetch';
export const graphQLClient = new ApolloClient({
    link: new HttpLink({ uri: 'https://graphql.anilist.co', fetch }),
    cache: new InMemoryCache()
});
//# sourceMappingURL=anilist_client.js.map