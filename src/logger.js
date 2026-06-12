/**
 * Middleware logger propio.
 * Registra método, URL, status y tiempo de respuesta en cada request.
 */
export function logger(req, res, next) {
  const start = Date.now();

  // Se ejecuta cuando la respuesta termina de enviarse
  res.on('finish', () => {
    const ms      = Date.now() - start;
    const status  = res.statusCode;
    const color   = status < 400 ? '\x1b[32m' : '\x1b[31m'; // verde / rojo
    const reset   = '\x1b[0m';
    const time    = new Date().toISOString();

    console.log(
      `[${time}] ${color}${req.method}${reset} ${req.originalUrl} → ${color}${status}${reset} (${ms}ms)`
    );
  });

  next();
}