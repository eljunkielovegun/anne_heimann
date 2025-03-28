import { createClient } from 'next-sanity';
import { Quicksand, Open_Sans, Roboto, Roboto_Mono } from 'next/font/google';
import './globals.css'; // This will be loaded first
import { ThemeProvider } from '@/context/ThemeContext';
import ClientWrapper from '@/components/ui/ClientWrapper';

const themeQuery = `*[_type == "themeSettings"][0]`;

// This approach disables all caching to ensure we always have fresh data
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export default async function RootLayout({ children }) {
  // Fetching theme data from Sanity with no caching
  const theme = await createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2023-03-01',
    useCdn: false, // Never use CDN for layout
    next: { 
      tags: ['themeSettings'],
      revalidate: 0 // Always fetch fresh data
    },
  }).fetch(themeQuery, {}, {
    cache: 'no-store' // Force fresh data
  });
  
  // Resolving fonts based on the theme
  const fonts = resolveFont(theme?.fontPair);

  // Inject dynamic CSS for theme and fonts
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(fonts.heading)}:wght@${theme?.headingWeight ?? '700'}&family=${encodeURIComponent(fonts.body)}:wght@${theme?.bodyWeight ?? '400'}&display=swap`}
        />
        <style>{`
          :root {
            --background: ${theme?.backgroundColor?.hex ?? '#f8f9ff'};
            --foreground: ${theme?.textColor?.hex ?? '#333'};
            --primary: ${theme?.primaryColor?.hex ?? '#364182'};
            --secondary: ${theme?.secondaryColor?.hex ?? '#e07dd1'};
            --surface: ${theme?.surfaceColor?.hex ?? '#ebeffe'};
            --accent: ${theme?.secondaryColor?.hex ?? '#e07dd1'}; /* Using secondaryColor as accent */
            --accent-light: #f2bce7;
            
            --card: #ffffff;
            --card-foreground: #364182;
            
            --popover: #ffffff;
            --popover-foreground: #364182;
            
            --muted: #959ce8;
            --muted-foreground: #364182;
            
            --border: transparent;
            --input: #959ce8;
            
            --radius: 0.5rem;
            
            --font-heading: '${fonts.heading}';
            --font-body: '${fonts.body}';
            --font-mono: 'Roboto Mono';
            --font-sans: 'Roboto';
            --font-heading-weight: ${theme?.headingWeight ?? '700'};
            --font-body-weight: ${theme?.bodyWeight ?? '400'};
          }
        `}</style>
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ClientWrapper>
          <ThemeProvider>
            <main>{children}</main>
          </ThemeProvider>
        </ClientWrapper>
      </body>
    </html>
  );
}

// Function to resolve font pair
function resolveFont(fontPair) {
  const pairs = {
    'quicksand_open-sans': { heading: 'Quicksand', body: 'Open Sans' },
    // Add other font pairs if necessary
  };
  return pairs[fontPair] ?? pairs['quicksand_open-sans'];
}
