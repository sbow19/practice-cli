import axios from "axios";
const ApolloClient = require("@apollo/client/apollo-client.cjs");
const HttpLink = require("@apollo/client/apollo-client.cjs");
const InMemoryCache = require("@apollo/client/apollo-client.cjs");
const configureAxiosDefaults = (config) => {
    axios.defaults.timeout = 3000;
};
export const graphqlClient = () => {
    const client = new ApolloClient({
        link: new HttpLink({ uri: 'https://graphql.anilist.co', fetch }),
        cache: new InMemoryCache()
    });
    return client;
};
export default configureAxiosDefaults;
//# sourceMappingURL=defaults.js.map