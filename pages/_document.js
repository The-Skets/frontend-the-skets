import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
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
