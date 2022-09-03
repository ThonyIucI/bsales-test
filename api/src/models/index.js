import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import category from './category.js';
import product from './product.js';

const modelProduct = product(sequelize, DataTypes);
const modelCategory = category(sequelize, DataTypes);

// modelProduct.belongsTo(modelCategory);
modelCategory.hasMany(modelProduct, {
  foreignKey: 'category',
});
export { modelCategory, modelProduct };
