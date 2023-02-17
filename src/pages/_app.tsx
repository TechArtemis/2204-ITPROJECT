import "@/styles/globals.sass";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const theme = extendTheme({
    fonts: {
        heading: "Raleway",
        body: "Raleway",
    }
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <SessionProvider session={ session }>
                <Component {...pageProps} />
            </SessionProvider>
        </ChakraProvider>
    );
}
