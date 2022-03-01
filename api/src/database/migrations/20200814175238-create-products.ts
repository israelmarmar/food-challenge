import { QueryInterface, DataTypes, Sequelize } from "sequelize";

/**
 * function that sequelize-cli runs if you want to add this migration to your database
 * */
export async function up(query: QueryInterface) {
  try {
    return query.createTable("Products", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      filename: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      height: {
        type: DataTypes.DOUBLE(),
        allowNull: false,
      },
      width: {
        type: DataTypes.DOUBLE(),
        allowNull: false,
      },
      rating: {
        type: DataTypes.DOUBLE(),
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE(),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "Date of creation",
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "Date of the last update",
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()')
      },
      deletedAt: DataTypes.DATE,
    });
  } catch (e) {
    return Promise.reject(e);
  }
}

/**
 * function that sequelize-cli runs if you want to remove this migration from your database
 * */
export async function down(query: QueryInterface) {
  try {
    return query.dropTable("Products");
  } catch (e) {
    return Promise.reject(e);
  }
}
