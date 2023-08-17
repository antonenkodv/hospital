'use strict';
const { DataTypes } = require('sequelize');
const { DataType } = require('sequelize-typescript');

const Speciality = {
    THERAPIST: 'therapist',
    DENTIST: 'dentis',
    SURGEON: 'surgeon',
};

module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable('Doctors', {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            spec: {
                type: DataTypes.ENUM(Object.values(Speciality)),
                allowNull: false,
                unique: false,
            },
            slots: {
                type: DataTypes.ARRAY(DataType.STRING),
                allowNull: true,
                defaultValue: [],
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    },
};
