import './globals.css'

export const metadata = {
  title: 'Simple Notes - Notas Sencillas',
  description: 'Aplicación de notas simple y minimalista',
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