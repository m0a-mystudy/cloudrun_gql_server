import {
  cacheExchange,
  createClient,
  errorExchange,
  fetchExchange,
} from 'urql';

export const urqlClient = createClient({
  url: `${process.env.GQL_SERVER_HTTPCONNECTION}/query`,
  exchanges: [
    cacheExchange,
    errorExchange({
      onError: (error: { toString: () => string }) =>
        console.log(error.toString()),
    }),
    fetchExchange,
  ],
  fetchOptions: () => {
    const token = 'sample token' // getToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});
