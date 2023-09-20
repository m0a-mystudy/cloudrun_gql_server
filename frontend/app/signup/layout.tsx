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
