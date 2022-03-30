import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../../config/database";

export interface UserInterface {
    id: number;
    username: string;
    password: string;
}

export class User extends Model implements UserInterface {
    public id!: number;
    public username!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static prepareInit(sequelize: Sequelize) {
        this.init(
            {
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                },
                username: {
                    type: new DataTypes.STRING(128),
                    allowNull: false,
                },
                password: {
                    type: new DataTypes.STRING(128),
                    allowNull: false,
                }
            },
            {
                tableName: "Users",
                sequelize: sequelize, // this bit is important
            }
        );
    }

}

User.prepareInit(database);


