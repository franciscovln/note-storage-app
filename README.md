# Simple Notes - Aplicación de Notas Sencilla

Una aplicación de notas minimalista y moderna construida con Next.js, React y JavaScript. Almacena todas las notas localmente en el navegador sin necesidad de backend, base de datos o autenticación.

## ✨ Características

- 📝 **Crear y editar notas** con límite de caracteres razonable
- 🗑️ **Eliminar notas** con confirmación
- 🔍 **Buscar notas** por título o contenido
- 📊 **Información detallada** de cada nota (fecha, palabras, caracteres)
- 💾 **Descargar notas** en formato .txt
- 📱 **Diseño responsive** para móviles y escritorio
- 🎨 **Interfaz moderna y minimalista**
- 📅 **Fecha actual** en tiempo real
- 🔗 **Enlace al repositorio** de GitHub
- 🚀 **Desplegable en Vercel** sin configuración adicional

## 🚀 Instalación

1. **Clona el repositorio:**
```bash
git clone https://github.com/tu-usuario/simple-notes.git
cd simple-notes
```

2. **Instala las dependencias:**
```bash
npm install
```

3. **Ejecuta en modo desarrollo:**
```bash
npm run dev
```

4. **Abre [http://localhost:3000](http://localhost:3000) en tu navegador**

## 📦 Scripts Disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Ejecuta la aplicación en modo producción
- `npm run lint` - Ejecuta el linter

## 🛠️ Tecnologías Utilizadas

- **Next.js 14** - Framework de React
- **React 18** - Biblioteca de interfaz de usuario
- **JavaScript** - Lenguaje de programación
- **CSS3** - Estilos modernos con variables CSS
- **LocalStorage** - Almacenamiento local de datos

## 📱 Funcionalidades

### Gestión de Notas
- Crear nuevas notas con un clic
- Editar título y contenido en tiempo real
- Eliminar notas con confirmación
- Límite de 10,000 caracteres por nota

### Interfaz de Usuario
- Sidebar con lista de notas (mostrar/ocultar)
- Búsqueda en tiempo real
- Vista previa del contenido de las notas
- Diseño responsive para todos los dispositivos

### Información de Notas
- Fecha de creación y última modificación
- Contador de palabras y caracteres
- Número de líneas
- ID único de la nota

### Exportación
- Descargar notas en formato .txt
- Nombre de archivo basado en el título de la nota

## 🔒 Seguridad

- **Sin backend**: No hay servidor que procese datos
- **Almacenamiento local**: Los datos se guardan solo en tu navegador
- **Sin autenticación**: No se requieren credenciales
- **Sin XSS**: El contenido se escapa correctamente
- **Límites de caracteres**: Previene ataques de DoS

## 🚀 Despliegue en Vercel

1. **Conecta tu repositorio a Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Next.js

2. **Configuración automática:**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Variables de entorno:**
   - No se requieren variables de entorno

## 📁 Estructura del Proyecto

```
simple-notes/
├── app/
│   ├── globals.css          # Estilos globales
│   ├── layout.js            # Layout principal
│   └── page.js              # Página principal
├── components/
│   ├── NotesApp.js          # Componente principal
│   ├── Header.js            # Header con fecha y GitHub
│   ├── Sidebar.js           # Sidebar con lista de notas
│   ├── NoteEditor.js        # Editor de notas
│   └── InfoModal.js         # Modal de información
├── package.json
├── next.config.js
└── README.md
```

## 🎨 Personalización

### Colores
Los colores se pueden personalizar editando las variables CSS en `app/globals.css`:

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #1e40af;
  --background-color: #ffffff;
  --sidebar-color: #f1f5f9;
  --text-color: #1e293b;
  --border-color: #e2e8f0;
}
```

### Límite de Caracteres
Puedes cambiar el límite de caracteres editando la constante en `components/NoteEditor.js`:

```javascript
const MAX_CHARACTERS = 10000; // Cambia este valor
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) por el framework
- [React](https://reactjs.org/) por la biblioteca de UI
- [Vercel](https://vercel.com/) por el hosting gratuito
- [Feather Icons](https://feathericons.com/) por los iconos SVG

---

**¡Disfruta escribiendo tus notas! 📝✨** 