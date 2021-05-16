import { html } from './html';

export function layout(content: string) {
  return html`
    <!DOCTYPE html>
    <html lang="en" class="no-js">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />

        <title>Unique page title - My Site</title>

        <meta name="description" content="Page description" />
        <meta property="og:title" content="Unique page title - My Site" />
        <meta property="og:description" content="Page description" />
        <meta property="og:image" content="https://www.mywebsite.com/image.jpg" />
        <meta property="og:image:alt" content="Image description" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:url" content="https://www.mywebsite.com/page" />
        <link rel="canonical" href="https://www.mywebsite.com/page" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#FF00FF" />
      </head>

      <body>
        ${content}
      </body>
    </html>
  `;
}
