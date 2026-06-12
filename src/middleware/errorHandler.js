/**
 * Manejador de errores global de Express.
 * Debe tener exactamente 4 parámetros (err, req, res, next).
 * Se monta ÚLTIMO en index.js con app.use(errorHandler).
 */
export function errorHandler(err, req, res, next) {
  console.error('[ERROR]', err);

  // Errores de validación de Sequelize
  if (err.name === 'SequelizeValidationError') {
    const messages = err.errors.map(e => e.message);
    return res.status(400).json({ error: 'Validación fallida', detalles: messages });
  }

  // Constraint de unicidad
  if (err.name === 'SequelizeUniqueConstraintError') {
    const campo = err.errors[0]?.path ?? 'campo';
    return res.status(409).json({ error: `El ${campo} ya está en uso` });
  }

  // Cualquier otro error → 500
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Error interno del servidor',
  });
}
