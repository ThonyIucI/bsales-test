export default (sequelize, { STRING, INTEGER, FLOAT }) => {
  const product = sequelize.define(
    'product',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: STRING,
        allowNull: false,
      },
      url_image: {
        type: STRING,
        allowNull: false,
      },
      price: {
        type: FLOAT,
        allowNull: false,
      },
      discount: {
        type: INTEGER,
      },
    },
    {
      timestamps: false,
      tableName: 'product',
    }
  );

  //   product.associate = (models) => {
  //     product.hasmany(models.category, {
  //       foreignKey: {
  //         name: 'productId',
  //         field: 'product_id',
  //       },
  //       as: 'category',
  //     });
  //   };

  return product;
};
