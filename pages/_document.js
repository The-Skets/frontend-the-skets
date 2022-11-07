import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Inter&family=Raleway:wght@500&display=swap" rel="stylesheet" />

                {/* Global Site Tag (gtag.js) - Google Analytics */}
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=G-T2P545DT5S`}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-T2P545DT5S', {
                              page_path: window.location.pathname,
                            });
                          `,
                    }}
                />
            </Head>
            <body className={"bg-gray-100 h-full"}>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}
