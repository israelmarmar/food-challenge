import { QueryInterface, DataTypes } from "sequelize";

/**
 * function that sequelize-cli runs if you want to add this migration to your database
 * */
export async function up(query: QueryInterface) {
  try {
    return query.bulkInsert('Users', [
      {
        "username": "luiz",
        "password": "$2a$10$Zl6gBK7UMw5AVThbDqFnpOOPLnEtBVUlTrA//ya6W2YBjD6j/UXpW",
      }
    ]);
  }catch (e) {
    return Promise.reject(e);
  }
}

/**
 * function that sequelize-cli runs if you want to remove this migration from your database
 * */
export async function down(query: QueryInterface) {
  try {
    return query.dropTable("Users");
  } catch (e) {
    return Promise.reject(e);
  }
}