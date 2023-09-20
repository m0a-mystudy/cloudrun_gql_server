'use client';

const isServerSide = typeof window === 'undefined';

import { useMemo } from 'react';
import {
  UrqlProvider,
  ssrExchange,
  cacheExchange,
  fetchExchange,
  createClient,
} from '@urql/next';

// for debug
// console.log({NEXT_PUBLIC_GQL_SERVER_HTTPCONNECTION: process.env.NEXT_PUBLIC_GQL_SERVER_HTTPCONNECTION});

export default function Layout({ children }: React.PropsWithChildren) {
  const [client, ssr] = useMemo(() => {
    
    const ssr = ssrExchange({
      isClient: !isServerSide,
    });

    
    const client = createClient({
      url: `${process.env.NEXT_PUBLIC_GQL_SERVER_HTTPCONNECTION}/query`,
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: true,
    });

    return [client, ssr];
  }, []);

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  );
}
