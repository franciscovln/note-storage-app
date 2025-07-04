import './globals.css'

export const metadata = {
  title: 'ThinkBin - Guarda tus notas localmente',
  description: 'ThinkBin - Guarda tus notas localmente',
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