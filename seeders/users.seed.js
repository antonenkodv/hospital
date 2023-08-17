'use strict';
const { QueryInterface } = require('sequelize');
const { v4: uuid } = require('uuid');

module.exports = {
    up: async (QueryInterface) => {
        await QueryInterface.bulkInsert('Users', [
            {
                id: uuid(),
                name: 'Vasiliy',
                phone: '+380-96-123-32-21',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('users', null, {});
    },
};
