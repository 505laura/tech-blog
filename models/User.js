const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection.js');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'Must be an email.'
                },
            },
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            is: /^[a-z]+$/i,
            validate: {
                len: [8, 64],
                // TODO: Add error messages specific to what the password is missing
            },
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                len: {
                    args: [3, 20],
                    msg: 'Must contain between 3 and 20 characters.'
                }
            },
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('User', 'Mod', 'Admin'),
            allowNull: false
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
        },
        defaultScope: {
            attributes: {
                exclude: ['password']
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;