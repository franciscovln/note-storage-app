import './globals.css'

export const metadata = {
  title: 'ThinkBin - Save your notes locally',
  description: 'ThinkBin - Save your notes locally',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  )
} 
