import express from 'express';
import cors from 'cors';
import sequelize from './db.js';
import Cliente from './models/Cliente.js';
import clientesRouter from './routes/clientes.js';
import { logger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── Middlewares globales ─────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(logger);

// ─── Rutas ────────────────────────────────────────────────────────────────────
app.use('/api/clientes', clientesRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', mensaje: 'API de Clientes funcionando 🚀' });
});

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.originalUrl} no encontrada` });
});

// ─── Error handler (SIEMPRE al final) ────────────────────────────────────────
app.use(errorHandler);

// ─── Iniciar servidor ─────────────────────────────────────────────────────────
async function iniciar() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a SQLite establecida');

    // sync({ force: false }) → crea tablas si no existen, no las borra
    await sequelize.sync({ force: false });
    console.log('✅ Modelos sincronizados');

    // Seed inicial si la tabla está vacía
    const count = await Cliente.count();
    if (count === 0) {
      await Cliente.bulkCreate([
        { nombre: 'María García',    email: 'maria@ejemplo.com',  ciudad: 'Córdoba' },
        { nombre: 'Juan López',      email: 'juan@ejemplo.com',   ciudad: 'Buenos Aires' },
        { nombre: 'Laura Martínez',  email: 'laura@ejemplo.com',  ciudad: 'Rosario' },
        { nombre: 'Carlos Sánchez',  email: 'carlos@ejemplo.com', ciudad: 'Mendoza' },
        { nombre: 'Ana Rodríguez',   email: 'ana@ejemplo.com',    ciudad: 'Córdoba' },
      ]);
      console.log('✅ Datos de ejemplo cargados');
    }

    app.listen(PORT, () => {
      console.log(`🚀 API corriendo en http://localhost:${PORT}`);
      console.log(`   Endpoints disponibles:`);
      console.log(`   GET    /api/clientes`);
      console.log(`   GET    /api/clientes/:id`);
      console.log(`   POST   /api/clientes`);
      console.log(`   PUT    /api/clientes/:id`);
      console.log(`   DELETE /api/clientes/:id`);
    });
  } catch (err) {
    console.error('❌ Error al iniciar:', err);
    process.exit(1);
  }
}

iniciar();
