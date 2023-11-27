import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { user } from "./user";

export class note extends Model<InferAttributes<note>, InferCreationAttributes<note>>{
    declare noteId: number;
    declare title: string;
    declare content: string;
    declare userId: number;
}

export function noteFactory(sequelize: Sequelize) {
    note.init({
        noteId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.TEXT,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
        {
            freezeTableName: true,
            tableName: 'notes',
            sequelize,
            collate: 'utf8_general_ci',
        })
}

export function AssociateUsernote() {
    user.hasMany(note, { foreignKey: "userId" });
    note.belongsTo(user, { foreignKey: "userId" });
  }
  