import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
    return (
        <Html lang="ru">
            <Head>
                <meta charSet="UTF-8" />
                <link rel="icon" href="/images/favicon.ico" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
            </Head>
            <body style={{margin: 0}}>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}

export default Document