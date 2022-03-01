import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../../config/database";

export interface ProductInterface {
    id: number;
    title: string;
    type: string;
    rating: number;
    price: number;
}

export class Product extends Model implements ProductInterface {
    public id!: number;
    public title!: string;
    public type!: string;
    public rating!: number;
    public price!: number;
    public height!: number;
    public width!: number;
    public description!: string;
    public filename!: string;
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
                title: {
                    type: new DataTypes.STRING(128),
                    allowNull: false,
                },
                type: {
                    type: new DataTypes.STRING(128),
                    allowNull: false,
                },
                description: {
                    type: new DataTypes.STRING(128),
                    allowNull: false,
                },
                filename: {
                    type: new DataTypes.STRING(128),
                    allowNull: false,
                },
                height: {
                    type: new DataTypes.DOUBLE(),
                    allowNull: false,
                },
                width: {
                    type: new DataTypes.DOUBLE(),
                    allowNull: false,
                },
                rating: {
                    type: new DataTypes.DOUBLE(),
                    allowNull: false,
                },
                price: {
                    type: new DataTypes.DOUBLE(),
                    allowNull: false,
                },
            },
            {
                tableName: "Products",
                sequelize: sequelize, // this bit is important
            }
        );
    }

}

Product.prepareInit(database);


