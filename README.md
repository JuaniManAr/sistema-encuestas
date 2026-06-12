# 02 - API REST de Clientes 🗂️

API RESTful con Node.js, Express, Sequelize y SQLite.

## Tecnologías
- **Express** — servidor HTTP + Router
- **Sequelize** — ORM para base de datos
- **SQLite** — base de datos embebida (archivo `database.sqlite`)
- **cors** — habilita peticiones cross-origin
- **nodemon** — recarga automática en desarrollo

## Estructura

```
src/
├── index.js                  ← punto de entrada, middlewares, arranque
├── db.js                     ← conexión Sequelize
├── models/
│   └── Cliente.js            ← modelo con validaciones
├── routes/
│   └── clientes.js           ← Express Router (CRUD completo)
└── middlewares/
    ├── logger.js             ← logger propio (método + URL + status + ms)
    └── errorHandler.js       ← manejador global de errores (4 params)
```

## Endpoints

| Método | URL | Descripción |
|--------|-----|-------------|
| GET    | `/api/clientes` | Listar todos |
| GET    | `/api/clientes/:id` | Obtener uno (404 si no existe) |
| POST   | `/api/clientes` | Crear nuevo |
| PUT    | `/api/clientes/:id` | Actualizar |
| DELETE | `/api/clientes/:id` | Eliminar |

## Cómo correr

```bash
npm install
npm run dev
```

## Probar con curl

```bash
# Listar
curl http://localhost:3000/api/clientes

# Crear
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Pérez","email":"juan@test.com","ciudad":"Córdoba"}'

# Actualizar
curl -X PUT http://localhost:3000/api/clientes/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan P.","email":"juan@test.com","ciudad":"Rosario"}'

# Eliminar
curl -X DELETE http://localhost:3000/api/clientes/1
```