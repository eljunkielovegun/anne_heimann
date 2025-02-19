import '@/app/globals.css'
import { Quicksand, Open_Sans, Roboto, Roboto_Mono } from 'next/font/google'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher'

const quicksand = Quicksand({ 
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-heading'
})

const openSans = Open_Sans({ 
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-body'
})

const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-sans'
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-mono'
})

export const metadata = {
  title: 'Anne Heimann',
  description: 'A customizable website for Anne Heimann',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={`${quicksand.variable} ${openSans.variable} ${roboto.variable} ${robotoMono.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased text-primary">
        <ThemeSwitcher />
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  )
}

// Add a route segment config to exclude studio
export const config = {
  matcher: ['/((?!studio).*)', '/'],
}

