import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { MantineProvider, ColorSchemeScript } from '@mantine/core';

//Styles
import './globals.css'
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';

// Custom Componenets
import NavBar from './components/Navbar'
import Footer from './components/Footer'

// Custom Function
import { myCreateServerClient } from './api/customHooks'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Van Life',
  description: 'Generated by create next app',
}

type LayoutProps = {
  children: ReactNode
}

export default async function RootLayout({ children }: LayoutProps) {
  const supabase = await myCreateServerClient();
  const { data } = await supabase.auth.getSession()
  return (

      <html lang="en">
        <head>
          <ColorSchemeScript />
        </head>
          <body className={inter.className}>
            <MantineProvider>
              <NavBar user={data.session?.user}/>
                {children}
              <Footer />
            </MantineProvider>
          </body>
      </html>

  )
}
