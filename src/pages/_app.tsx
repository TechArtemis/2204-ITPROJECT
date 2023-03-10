import "@/styles/globals.sass";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";


const theme = extendTheme({
    fonts: {
        heading: "Raleway",
        body: "Raleway",
    }
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>

        </ChakraProvider>
    );
}
