'use client';

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// import { useAuth } from '@clerk/nextjs'; // <-- Закомментировали
import { PropsWithChildren, useMemo } from 'react';

export const ApolloProviderWrapper = ({ children, gateway }: PropsWithChildren<{ gateway: string }>): Element => {
  // const { getToken } = useAuth(); // <-- Закомментировали эту строку

  const client = useMemo(() => {
    const httpLink = createHttpLink({
      uri: gateway,
    });

    const authMiddleware = setContext(async (_, { headers }) => {
      // const token = await getToken({ template: 'test' }); // <-- Закомментировали получение токена

      // Вместо настоящего токена, мы просто не будем добавлять заголовок авторизации.
      // GraphQL-запросы будут уходить как от анонимного пользователя.
      return {
        headers: {
          ...headers,
          // authorization: token ? `Bearer ${token}` : '', // <-- Закомментировали добавление заголовка
        },
      };
    });

    return new ApolloClient({
      link: authMiddleware.concat(httpLink), // Используем .concat() вместо .from() для простоты
      cache: new InMemoryCache(),
    });
  }, [gateway]); // <-- Убрали getToken из зависимостей

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

// 'use client';
// import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, from } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import { useAuth } from '@clerk/nextjs';
// import { PropsWithChildren, useMemo } from 'react';

// export const ApolloProviderWrapper = ({ children, gateway }: PropsWithChildren<{ gateway: string }>) => {
//   const { getToken } = useAuth();

//   const httpLink = createHttpLink({
//     uri: gateway,
//   });

//   const client = useMemo(() => {
//     const authMiddleware = setContext(async (_, { headers }) => {
//       const token = await getToken({ template: 'test' });
//       return {
//         headers: {
//           ...headers,
//           authorization: `Bearer ${token}`,
//         },
//       };
//     });

//     return new ApolloClient({
//       link: from([authMiddleware, httpLink]),
//       cache: new InMemoryCache(),
//     });
//   }, [getToken, httpLink]);

//   return <ApolloProvider client={client}>{children}</ApolloProvider>;
// };
