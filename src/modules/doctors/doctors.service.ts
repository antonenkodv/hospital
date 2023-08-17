import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DOCTOR_REPOSITORY } from '../../core/constants';
import { Doctor } from '../../core/models/doctors/doctor.model';
import sequelize from 'sequelize';

@Injectable()
export class DoctorsService {
    constructor(@Inject(DOCTOR_REPOSITORY) private readonly doctorRepository: typeof Doctor) {}

    addSlot(doctorId: string, newSlot: string) {
        return this.updateById(doctorId, {
            slots: sequelize.fn('array_append', sequelize.col('slots'), newSlot),
        });
    }

    removeSlot(doctorId: string, removeSlot: string) {
        return this.updateById(doctorId, {
            slots: sequelize.fn('array_remove', sequelize.col('slots'), removeSlot),
        });
    }

    async isSlotExists(doctorId: string, slot: string): Promise<boolean> {
        const doctor = await this.doctorRepository.findByPk(doctorId, {
            attributes: ['slots'],
        });

        if (!doctor) throw new NotFoundException('Doctor not found');

        const slotTimestamp = new Date(slot).getTime().toString();
        return doctor.slots.includes(slotTimestamp);
    }

    updateById(doctorId: string, data: any) {
        return this.doctorRepository.update<Doctor>(data, { where: { id: doctorId }, returning: true });
    }
}
