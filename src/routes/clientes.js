import { Router } from 'express';
import Cliente from '../models/Cliente.js';

const router = Router();

// ─── GET /api/clientes ── Listar todos ───────────────────────────────────────
router.get('/', async (req, res, next) => {
  try {
    const clientes = await Cliente.findAll({ order: [['id', 'ASC']] });
    res.json(clientes);
  } catch (err) {
    next(err);
  }
});

// ─── GET /api/clientes/:id ── Obtener uno ────────────────────────────────────
router.get('/:id', async (req, res, next) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: `Cliente con id ${req.params.id} no encontrado` });
    }
    res.json(cliente);
  } catch (err) {
    next(err);
  }
});

// ─── POST /api/clientes ── Crear ─────────────────────────────────────────────
router.post('/', async (req, res, next) => {
  try {
    const { nombre, email, ciudad } = req.body;
    const cliente = await Cliente.create({ nombre, email, ciudad });
    res.status(201).json(cliente);
  } catch (err) {
    next(err);
  }
});

// ─── PUT /api/clientes/:id ── Actualizar ─────────────────────────────────────
router.put('/:id', async (req, res, next) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: `Cliente con id ${req.params.id} no encontrado` });
    }
    const { nombre, email, ciudad } = req.body;
    await cliente.update({ nombre, email, ciudad });
    res.json(cliente);
  } catch (err) {
    next(err);
  }
});

// ─── DELETE /api/clientes/:id ── Eliminar ────────────────────────────────────
router.delete('/:id', async (req, res, next) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: `Cliente con id ${req.params.id} no encontrado` });
    }
    await cliente.destroy();
    res.json({ message: `Cliente ${req.params.id} eliminado correctamente` });
  } catch (err) {
    next(err);
  }
});

export default router;
