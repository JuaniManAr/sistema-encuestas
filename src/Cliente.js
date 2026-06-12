import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El nombre no puede estar vacío' },
      len: { args: [2, 100], msg: 'El nombre debe tener entre 2 y 100 caracteres' },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: 'Ya existe un cliente con ese email' },
    validate: {
      isEmail: { msg: 'El email no tiene un formato válido' },
    },
  },
  ciudad: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'La ciudad no puede estar vacía' },
    },
  },
}, {
  tableName: 'clientes',
  timestamps: true,
});

export default Cliente;