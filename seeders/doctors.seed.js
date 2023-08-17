'use strict';
const { QueryInterface } = require('sequelize');
const { v4: uuid } = require('uuid');

module.exports = {
    up: async (QueryInterface) => {
        const doctorsData = [
            {
                id: uuid(),
                name: 'Dr. John Doe',
                spec: 'therapist',
                slots: [
                    new Date('2023-08-15T10:00:00Z').getTime().toString(),
                    new Date('2023-08-16T14:00:00Z').getTime().toString(),
                ],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await QueryInterface.bulkInsert('Doctors', doctorsData);
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('Doctors', null, {});
    },
};
