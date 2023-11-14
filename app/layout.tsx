import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { MantineProvider, ColorSchemeScript } from '@mantine/core';

//Styles
import './globals.css'
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/carousel/styles.css';

// Custom Componenets
import Header from './components/Header'
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

import { getCurrentUserByEmail } from './api/serverActions';

export default async function RootLayout({ children }: LayoutProps) {
  const supabase = await myCreateServerClient();
  const { data } = await supabase.auth.getSession()
  let user: {};

  if(data.session?.user){
    user = await getCurrentUserByEmail(data.session.user.email)
  }

  console.log(user)
  return (

      <html lang="en">
        <head>
          <ColorSchemeScript />
        </head>
          <body className={inter.className}>
            <MantineProvider>
              <Header user={user && user[0]}/>
                {children}
              <Footer />
            </MantineProvider>
          </body>
      </html>

  )
}
