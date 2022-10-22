import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactElement, StrictMode } from "react";
import { RecoilRoot } from "recoil";

import { ErrorBoundary } from "./error";

const client = new ApolloClient({
    cache: new InMemoryCache(),
});

export function App(): ReactElement {
    return (
        <StrictMode>
            <RecoilRoot>
                <ApolloProvider client={client}>
                    <ErrorBoundary>
                        <div>Hello,World!</div>;
                    </ErrorBoundary>
                </ApolloProvider>
            </RecoilRoot>
        </StrictMode>
    );
}
