# Frido API

API REST desarrollada con **NestJS** para la gestión de lecturas educativas, preguntas, opciones de respuesta y seguimiento del progreso de alumnos. Incluye autenticación JWT, control de permisos por rol y pruebas unitarias.

---

## Tecnologías utilizadas

* **Node.js**
* **NestJS** (Framework backend)
* **TypeScript**
* **Prisma ORM**
* **PostgreSQL / MySQL** (según configuración)
* **JWT** para autenticación
* **Jest** para pruebas unitarias

---

## Arquitectura general

La API sigue una arquitectura modular basada en NestJS:

* **Controllers**: Definen los endpoints HTTP
* **Services**: Contienen la lógica de negocio
* **DTOs**: Validan y tipan la entrada de datos
* **Guards**: Protegen rutas (JWT y roles)
* **PrismaService**: Acceso a base de datos

---

## Autenticación y autorización

* Autenticación mediante **JWT**
* Protección de rutas con `JwtAuthGuard`
* Control de permisos por rol usando `RolesGuard`

Roles utilizados:

* `tutor`
* `alumno`

---

## Instalación

```bash
# Clonar repositorio
git clone <repo-url>

# Entrar al proyecto
cd fridoapi

# Instalar dependencias
npm install
```

---

## Ejecución del proyecto

```bash
# Desarrollo
npm run start:dev

# Producción
npm run start:prod
```

---

## Pruebas

```bash
# Tests unitarios
npm run test

# Coverage
npm run test:cov
```

✔️ Los tests unitarios cubren **controllers y services** con dependencias mockeadas.

---

## Endpoints de la API

### Auth

| Método | Endpoint       | Descripción                  |
| ------ | -------------- | ---------------------------- |
| POST   | /auth/login    | Inicia sesión y devuelve JWT |
| POST   | /auth/register | Registro de usuario          |

---

### Usuario

| Método | Endpoint     | Descripción        |
| ------ | ------------ | ------------------ |
| GET    | /usuario     | Listar usuarios    |
| GET    | /usuario/:id | Obtener usuario    |
| PATCH  | /usuario/:id | Actualizar usuario |
| DELETE | /usuario/:id | Eliminar usuario   |

---

### Lecturas

| Método | Endpoint      | Descripción           |
| ------ | ------------- | --------------------- |
| POST   | /lecturas     | Crear lectura (tutor) |
| GET    | /lecturas     | Listar lecturas       |
| GET    | /lecturas/:id | Obtener lectura       |
| PATCH  | /lecturas/:id | Actualizar lectura    |
| DELETE | /lecturas/:id | Eliminar lectura      |

---

### Secciones

| Método | Endpoint               | Descripción                  |
| ------ | ---------------------- | ---------------------------- |
| GET    | /secciones/lectura/:id | Listar secciones por lectura |
| GET    | /secciones/:id         | Obtener sección              |
| POST   | /secciones             | Crear sección (tutor dueño)  |
| PATCH  | /secciones/:id         | Actualizar sección           |
| DELETE | /secciones/:id         | Eliminar sección             |

---

### Preguntas

| Método | Endpoint               | Descripción                  |
| ------ | ---------------------- | ---------------------------- |
| POST   | /preguntas             | Crear pregunta               |
| GET    | /preguntas/lectura/:id | Listar preguntas por lectura |
| PATCH  | /preguntas/:id         | Actualizar pregunta          |
| DELETE | /preguntas/:id         | Eliminar pregunta            |

---

### Opciones de respuesta

| Método | Endpoint      | Descripción       |
| ------ | ------------- | ----------------- |
| POST   | /opciones     | Crear opción      |
| PATCH  | /opciones/:id | Actualizar opción |
| DELETE | /opciones/:id | Eliminar opción   |

---

### Alumno

| Método | Endpoint | Descripción    |
| ------ | -------- | -------------- |
| POST   | /alumno  | Crear alumno   |
| GET    | /alumno  | Listar alumnos |

---

### Alumno - Lectura

| Método | Endpoint                   | Descripción                |
| ------ | -------------------------- | -------------------------- |
| POST   | /alumno-lectura            | Asignar lectura a alumno   |
| GET    | /alumno-lectura/alumno/:id | Listar lecturas del alumno |
| PATCH  | /alumno-lectura/:id        | Actualizar progreso        |

---

### Respuestas del alumno

| Método | Endpoint                              | Descripción          |
| ------ | ------------------------------------- | -------------------- |
| POST   | /respuestas-alumno                    | Registrar respuesta  |
| GET    | /respuestas-alumno/alumno-lectura/:id | Listar respuestas    |
| PATCH  | /respuestas-alumno/:id                | Actualizar respuesta |

---

## Seguridad

* Validación de permisos por usuario
* Un tutor solo puede modificar recursos que creó
* Un alumno solo puede modificar su propio progreso

---

## Buenas prácticas aplicadas

* Separación de responsabilidades
* DTOs para validación
* Guards para seguridad
* Tests unitarios aislados
* Prisma como capa de persistencia

---

## Autor

Desarrollado por **Dani** usando NestJS 🚀
