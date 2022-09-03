export default (sequelize, { STRING, INTEGER }) => {
  const category = sequelize.define(
    'category',
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
    },
    {
      timestamps: false,
      tableName: 'category',
    }
  );

  return category;
};
