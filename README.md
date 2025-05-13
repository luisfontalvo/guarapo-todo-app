# 📝 Guarapo To-do App

Aplicación fullstack de tareas personales desarrollada como prueba técnica. Permite a los usuarios registrarse, iniciar sesión, crear listas de tareas y gestionar tareas por lista. El diseño es responsive, limpio y mobile-first.

---

## 🚀 Tecnologías utilizadas

### 🛠 Backend:
- **Node.js + TypeScript**
- **AWS Lambda** con **Serverless Framework**
- **Prisma ORM** con **MySQL**
- **JWT** para autenticación

### 🖥 Frontend:
- **React 18** + **Vite**
- **Tailwind CSS**
- **React Router DOM**
- **shadcn/ui** para componentes accesibles y reutilizables
  - `<Card>`, `<Button>`, `<Input>`, `<Label>`

---

## ✅ Funcionalidades implementadas

- Registro e inicio de sesión con autenticación JWT
- Creación de listas personales por usuario
- Agregado, completado y eliminación de tareas por lista
- Diseño SPA responsive (mobile-first)
- Layout base con botón de cerrar sesión
- Manejo de errores y estados de carga
- Navegación protegida si no hay token
- Formularios y vistas estilizados completamente con `shadcn/ui`

---

## 📁 Estructura del proyecto
guarapo-todo-app/
├── backend/ # API REST con Serverless + Prisma + JWT
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── services/
│ │ └── middlewares/
│ └── prisma/schema.prisma
├── frontend/ # SPA con React + Tailwind + shadcn
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── services/
│ │ ├── routes/
│ │ └── hooks/

---
## ⚙️ Instalación y ejecución local

### 1️⃣ Clona el repositorio

```bash
git clone https://github.com/luisfontalvo/guarapo-todo-app.git
cd guarapo-todo-app
```

### 2️⃣ Configura el backend
```bash
cd backend
npm install
cp .env.example .env
```

Edita el archivo .env:
```bash
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/guarapo_db"
JWT_SECRET="clave_super_secreta"
```

Inicializa Prisma y ejecuta migraciones:
```bash
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

### 3️⃣ Configura el frontend
```bash
cd ../frontend
npm install
npm run dev
```

## 🧪 Prueba rápida
Accede a /register para registrarte.

Luego inicia sesión desde /login.

Accede a /dashboard para ver tus listas.

Haz clic en una lista para gestionar tareas.

Agrega, marca como completadas o elimina tareas.

## 🗂 Rutas del frontend

| Ruta         | Descripción                             |
| ------------ | --------------------------------------- |
| `/register`  | Formulario de registro de usuario       |
| `/login`     | Formulario de inicio de sesión          |
| `/dashboard` | Vista general de todas las listas       |
| `/lists/:id` | Vista de tareas de una lista específica |

## 🧑‍🎓 Autor
Desarrollado por [Luis Fontalvo].