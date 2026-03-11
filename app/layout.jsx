import './globals.css'

export const metadata = {
  title: 'Norman James — Portrait & Editorial Photographer',
  description: 'Photography that finds the unrepeatable moment. Portrait & editorial photographer available worldwide.',
  openGraph: {
    title: 'Norman James',
    description: 'Portrait & Editorial Photography',
    url: 'https://normanjames.com',
    siteName: 'Norman James',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
