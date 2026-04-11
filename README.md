# EQUORA

Plataforma de e-commerce para productos ecuestres. Construida con Next.js 16, React 19 y TypeScript, con panel de administración integrado.

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| Next.js 16 (App Router) | Framework principal |
| React 19 | UI |
| TypeScript | Tipado estático |
| Tailwind CSS v4 | Estilos (sin archivo de config, vía CSS) |
| MongoDB + Mongoose | Base de datos |
| Cloudinary | Almacenamiento de imágenes |
| JWT | Autenticación |
| Nodemailer | Envío de correos de verificación |

---

## Requisitos

- Node.js 18+
- Cuenta MongoDB Atlas
- Cuenta Cloudinary
- Cuenta de correo SMTP (Gmail u otro proveedor)

---

## Instalación

```bash
git clone <repositorio>
cd equora
npm install
```

Crea el archivo `.env.local` en la raíz con las siguientes variables:

```env
```

---

## Comandos

```bash
npm run dev      # Servidor de desarrollo → http://localhost:3000
npm run build    # Build de producción
npm run lint     # Linter ESLint
```

---

## Estructura del proyecto

```
equora/
├── app/
│   ├── api/                  # API Routes (Next.js)
│   │   ├── auth/             # Login, logout, recuperación, cambio de email/contraseña
│   │   ├── categories/       # CRUD categorías
│   │   ├── products/         # CRUD productos
│   │   ├── testimonials/     # CRUD testimonios
│   │   └── upload/           # Subida de imágenes a Cloudinary
│   ├── categorias/           # Página de categorías y filtrado por categoría
│   ├── dashboard/            # Panel de administración
│   │   └── login/            # Login del dashboard
│   ├── producto/[id]/        # Detalle de producto
│   ├── productos/            # Catálogo de productos
│   ├── globals.css           # Estilos globales y tema Tailwind v4
│   ├── layout.tsx            # Layout raíz
│   └── page.tsx              # Página de inicio (landing)
├── components/
│   ├── dashboard/            # Componentes del panel de administración
│   ├── landing/              # Secciones de la página de inicio
│   ├── categories/           # Páginas de categorías
│   ├── products/             # Catálogo y detalle de producto
│   └── ui/                   # Componentes reutilizables (Button, Modal, Badge, etc.)
├── lib/
│   ├── axios.ts              # Cliente HTTP
│   ├── auth.ts               # Utilidades JWT
│   ├── mongodb.ts            # Conexión a MongoDB
│   ├── cloudinary.ts         # Configuración Cloudinary
│   ├── mailer.ts             # Envío de correos
│   └── verificationCodes.ts  # Gestión de códigos de verificación
├── models/                   # Modelos Mongoose
│   ├── Product.ts
│   ├── Category.ts
│   ├── Testimonial.ts
│   ├── User.ts
│   ├── Counter.ts
│   └── VerificationCode.ts
├── types/                    # Tipos TypeScript globales
├── utils/                    # Utilidades (formatPrice, generateProductCode)
└── proxy.ts                  # Middleware Next.js (protección de rutas)
```

---

## Páginas principales

| Ruta | Descripción |
|---|---|
| `/` | Landing page con hero, productos destacados, categorías, testimonios y FAQ |
| `/productos` | Catálogo completo con búsqueda y filtro por categoría |
| `/categorias` | Vista de todas las categorías |
| `/categorias/[slug]` | Productos filtrados por categoría |
| `/producto/[id]` | Detalle de producto con carrusel de imágenes |
| `/dashboard` | Panel de administración (requiere autenticación) |
| `/dashboard/login` | Inicio de sesión del administrador |

---

## Panel de administración

Accesible en `/dashboard/login`. Funcionalidades:

- **Productos** — Crear, editar, eliminar productos. Cambiar estado (Disponible / Agotado). Subida de múltiples imágenes.
- **Categorías** — Gestión de categorías con imagen y slug.
- **Destacados** — Selección de productos y categorías que aparecen en la página de inicio.
- **Testimonios** — Gestión de reseñas de clientes con activación/desactivación.
- **Mi cuenta** — Cambio de email y contraseña con verificación por código.

---

## Creación del administrador

Ejecutar una vez en producción para crear el usuario admin:

```bash
curl -X POST https://<tu-dominio>/api/auth/seed
```

Utiliza las variables `ADMIN_EMAIL` y `ADMIN_PASSWORD` definidas en `.env.local`.

---

## Despliegue

El proyecto está configurado para desplegarse en **Vercel**.

1. Conecta el repositorio en [vercel.com](https://vercel.com)
2. Agrega todas las variables de entorno en el panel de Vercel
3. Despliega — Vercel detecta automáticamente Next.js

> Las variables con prefijo `NEXT_PUBLIC_` son las únicas accesibles desde el cliente.

---

## Licencia

Proyecto privado — EQUORA © 2026. Todos los derechos reservados.
